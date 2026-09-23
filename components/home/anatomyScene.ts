// The 3D half of the hero, kept out of React.
//
// Three.js owns a mutable scene graph and a render loop; React owns a
// declarative tree it may re-run at any time. Putting the scene in a component
// means fighting that every render. So this file is a plain class with an
// imperative API, and the component in AnatomyHero.tsx only ever calls
// methods on it.
//
// The figures are real anatomy, not primitives: a body reconstruction
// (Meta SAM 3D Body via Higgsfield) cleaned and decimated in Blender to
// ~14k triangles and ~300KB each. Geometry only — the look is entirely in the
// shader below, so the same mesh serves the light page without a texture
// download.

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export type Sex = 'male' | 'female'

export interface SceneHotspot {
  id: string
  /** Position in the figure's own space: x across, y up from the feet, z depth. */
  pos: [number, number, number]
}

/** Where each system sits on a 1.76m figure, measured off the mesh. */
export const HOTSPOT_POS: Record<Sex, Record<string, [number, number, number]>> = {
  male: {
    brain:     [0, 1.70, 0.02],
    hair:      [0, 1.77, -0.01],
    skin:      [0.10, 1.60, 0.05],
    thyroid:   [0, 1.53, 0.07],
    heart:     [-0.05, 1.33, 0.09],
    muscle:    [-0.17, 1.36, 0.06],
    liver:     [0.10, 1.18, 0.10],
    metabolic: [0, 1.08, 0.11],
    joint:     [0.14, 0.72, 0.06],
    repro:     [0, 0.92, 0.08],
    sexual:    [0, 0.83, 0.09],
  },
  female: {
    brain:     [0, 1.65, 0.02],
    hair:      [0, 1.72, -0.01],
    skin:      [0.09, 1.56, 0.05],
    thyroid:   [0, 1.49, 0.06],
    heart:     [-0.05, 1.30, 0.09],
    muscle:    [-0.155, 1.32, 0.06],
    liver:     [0.09, 1.15, 0.09],
    metabolic: [0, 1.05, 0.10],
    joint:     [0.13, 0.70, 0.06],
    repro:     [0, 0.90, 0.08],
    sexual:    [0, 0.82, 0.09],
  },
}

/**
 * Translucent body shader.
 *
 * Fresnel rim plus a soft interior wash, so the figure reads as frosted glass
 * on a light page rather than a grey mannequin. Written by hand because
 * MeshPhysicalMaterial transmission costs a render target per frame, which is
 * the single most expensive thing you can put on a mid-range phone.
 */
const bodyVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying float vHeight;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - world.xyz);
    vHeight = position.y;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const bodyFragment = /* glsl */ `
  uniform vec3 uCore;
  uniform vec3 uRim;
  uniform float uOpacity;
  uniform float uPulse;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying float vHeight;

  void main() {
    float ndv = clamp(dot(normalize(vNormalW), normalize(vViewDir)), 0.0, 1.0);
    float fres = pow(1.0 - ndv, 2.8);

    // Frosted glass, not a painted solid. The body stays mostly white where it
    // faces the camera and only gains colour as it turns away, which is what
    // makes it read as a volume on a white page instead of a blue silhouette.
    vec3 col = mix(uCore, uRim, fres * 0.85);
    col += uRim * pow(fres, 2.0) * 0.40;
    col += uRim * uPulse * 0.035;

    // Faint horizontal banding, like a scan passing over the form. Subtle
    // enough to be felt rather than seen.
    float scan = 0.028 * sin(vHeight * 62.0 - uPulse * 2.2);

    float a = uOpacity * (0.34 + fres * 0.62) + scan;
    gl_FragColor = vec4(col, clamp(a, 0.0, 0.96));
  }
`

interface Opts {
  container: HTMLElement
  onReady?: () => void
  onPick?: (id: string | null) => void
  reducedMotion?: boolean
}

export class AnatomyScene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private figures: Partial<Record<Sex, THREE.Group>> = {}
  private pivot = new THREE.Group()
  private markers = new THREE.Group()
  private raycaster = new THREE.Raycaster()
  private pointer = new THREE.Vector2(-2, -2)
  private clock = new THREE.Clock()
  private frame = 0
  private disposed = false
  private container: HTMLElement
  private onPick?: (id: string | null) => void
  private reduced: boolean

  private sex: Sex = 'male'
  private activeId: string | null = null
  private hoverId: string | null = null
  /** Target and current yaw, so pointer movement eases instead of snapping. */
  private yawTarget = 0
  private yaw = 0
  private scrollYaw = 0
  private running = true
  private material!: THREE.ShaderMaterial

  constructor(opts: Opts) {
    this.container = opts.container
    this.onPick = opts.onPick
    this.reduced = !!opts.reducedMotion

    const w = this.container.clientWidth || 1
    const h = this.container.clientHeight || 1

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    this.renderer.setSize(w, h)
    // Capped at 2: beyond that a phone renders four times the pixels for a
    // difference nobody can see on a translucent figure.
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.setClearColor(0x000000, 0)
    this.container.appendChild(this.renderer.domElement)
    this.renderer.domElement.style.touchAction = 'pan-y'

    this.camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100)
    this.camera.position.set(0, 0.92, 3.95)
    this.camera.lookAt(0, 0.88, 0)

    this.scene.add(this.pivot)
    this.pivot.add(this.markers)

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uCore: { value: new THREE.Color('#dce9fb') },
        uRim: { value: new THREE.Color('#1d4fd8') },
        uOpacity: { value: 1.0 },
        uPulse: { value: 0 },
      },
      vertexShader: bodyVertex,
      fragmentShader: bodyFragment,
      transparent: true,
      depthWrite: true,
      side: THREE.FrontSide,
      blending: THREE.NormalBlending,
    })

    void this.load(opts.onReady)
    this.bind()
    this.tick()
  }

  private async load(onReady?: () => void) {
    const loader = new GLTFLoader()
    const paths: Record<Sex, string> = {
      male: '/models/apex-figure-male.glb',
      female: '/models/apex-figure-female.glb',
    }
    // The visible figure first, so the hero paints as early as possible; the
    // other one afterwards so switching sex is instant.
    for (const sex of ['male', 'female'] as Sex[]) {
      try {
        const gltf = await loader.loadAsync(paths[sex])
        if (this.disposed) return
        const group = new THREE.Group()
        gltf.scene.traverse(obj => {
          if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh
            mesh.material = this.material
            mesh.frustumCulled = false
          }
        })
        group.add(gltf.scene)
        group.visible = sex === this.sex
        this.figures[sex] = group
        this.pivot.add(group)
        if (sex === this.sex) { this.buildMarkers(); onReady?.() }
      } catch {
        // A missing model must not take the page down; the DOM fallback in
        // AnatomyHero stays visible and the hero still converts.
        onReady?.()
      }
    }
  }

  /**
   * One node per system. Quiet by default — a hairline ring and a small core,
   * closer to a survey mark than a map pin. Nothing is pre-opened, so the
   * figure reads as a body first and an interface second; the rings only gain
   * weight under the pointer or once chosen.
   */
  private buildMarkers() {
    this.markers.clear()
    const coreGeo = new THREE.SphereGeometry(0.016, 16, 16)
    const ringGeo = new THREE.RingGeometry(0.030, 0.0335, 48)
    const haloGeo = new THREE.RingGeometry(0.030, 0.075, 48)

    for (const [id, pos] of Object.entries(HOTSPOT_POS[this.sex])) {
      const core = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({
        color: new THREE.Color('#1d4fd8'), transparent: true, opacity: 0.42, depthTest: false,
      }))
      core.position.set(pos[0], pos[1], pos[2])
      core.renderOrder = 12
      core.userData.id = id
      this.markers.add(core)

      const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
        color: new THREE.Color('#1d4fd8'), transparent: true, opacity: 0.24,
        side: THREE.DoubleSide, depthTest: false,
      }))
      ring.position.copy(core.position)
      ring.renderOrder = 11
      ring.userData.ringFor = id
      this.markers.add(ring)

      // The halo only exists for the chosen node; it stays at zero opacity
      // otherwise, so eleven of them cost nothing visually.
      const halo = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({
        color: new THREE.Color('#4890f7'), transparent: true, opacity: 0,
        side: THREE.DoubleSide, depthTest: false, blending: THREE.AdditiveBlending,
      }))
      halo.position.copy(core.position)
      halo.renderOrder = 10
      halo.userData.haloFor = id
      this.markers.add(halo)
    }
  }

  /** Screen position of a hotspot, for the DOM label. Null when behind the body. */
  projectHotspot(id: string): { x: number; y: number } | null {
    const p = HOTSPOT_POS[this.sex][id]
    if (!p) return null
    const v = new THREE.Vector3(p[0], p[1], p[2])
    this.pivot.localToWorld(v)
    // Facing away from the camera means the label would point at the far side
    // of the body, so it is withheld rather than drawn in the wrong place.
    const toCam = new THREE.Vector3().subVectors(this.camera.position, v).normalize()
    const outward = new THREE.Vector3(p[0], 0, p[2]).normalize().applyQuaternion(this.pivot.quaternion)
    if (p[2] < 0.2 && outward.lengthSq() > 0 && toCam.dot(outward) < -0.35) return null
    v.project(this.camera)
    const w = this.renderer.domElement.clientWidth
    const h = this.renderer.domElement.clientHeight
    return { x: (v.x * 0.5 + 0.5) * w, y: (-v.y * 0.5 + 0.5) * h }
  }

  /** Extra yaw from page scroll. The page always scrolls; the body just listens. */
  setScroll(progress: number) {
    this.scrollYaw = (progress - 0.5) * 0.7
  }

  /**
   * Stop rendering entirely when the hero is off-screen or the tab is hidden.
   *
   * Resuming paints one frame straight away rather than waiting on the next
   * animation frame. A tab returning to the foreground otherwise shows the
   * last frame from before it was hidden — or, on a first load in a
   * background tab, an empty canvas — until rAF starts again.
   */
  setRunning(on: boolean) {
    if (on === this.running) return
    this.running = on
    if (on) {
      this.clock.getDelta()
      this.renderer.render(this.scene, this.camera)
      this.tick()
    } else {
      cancelAnimationFrame(this.frame)
    }
  }

  private bind() {
    this.renderer.domElement.addEventListener('pointermove', this.handleMove)
    this.renderer.domElement.addEventListener('pointerleave', this.handleLeave)
    this.renderer.domElement.addEventListener('pointerdown', this.handleDown)
    window.addEventListener('resize', this.handleResize)
  }

  private handleMove = (e: PointerEvent) => {
    const r = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1
    this.pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1
    if (e.pointerType === 'mouse' && !this.reduced) {
      this.yawTarget = ((e.clientX - r.left) / r.width - 0.5) * 0.9
    }
  }

  private handleLeave = () => {
    this.pointer.set(-2, -2)
    this.yawTarget = 0
    if (this.hoverId) { this.hoverId = null; this.renderer.domElement.style.cursor = 'default' }
  }

  private handleDown = () => {
    const hit = this.pickAt()
    // Tapping the body away from a marker clears the selection, which is what
    // a visitor expects from a tap on empty space.
    this.onPick?.(hit)
  }

  private pickAt(): string | null {
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const hits = this.raycaster.intersectObjects(this.markers.children, false)
    for (const h of hits) {
      const id = (h.object.userData.id ?? h.object.userData.ringFor ?? h.object.userData.haloFor) as string | undefined
      if (id) return id
    }
    return null
  }

  private handleResize = () => {
    if (this.disposed) return
    const w = this.container.clientWidth || 1
    const h = this.container.clientHeight || 1
    this.renderer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  private tick = () => {
    if (this.disposed || !this.running) return
    this.frame = requestAnimationFrame(this.tick)
    const t = this.clock.getElapsedTime()

    // Ease toward the pointer, and drift gently when nobody is pointing.
    const idle = this.reduced ? 0 : Math.sin(t * 0.22) * 0.13
    this.yaw += ((this.yawTarget + idle + this.scrollYaw) - this.yaw) * 0.045
    this.pivot.rotation.y = this.yaw

    this.material.uniforms.uPulse.value = this.reduced ? 0 : (Math.sin(t * 1.5) * 0.5 + 0.5)

    // Hover feedback, mouse only; on touch the tap is the feedback.
    const hit = this.pointer.x > -1.5 ? this.pickAt() : null
    if (hit !== this.hoverId) {
      this.hoverId = hit
      this.renderer.domElement.style.cursor = hit ? 'pointer' : 'default'
    }

    for (const child of this.markers.children) {
      const mesh = child as THREE.Mesh
      const ud = mesh.userData
      const id = (ud.id ?? ud.ringFor ?? ud.haloFor) as string
      const isActive = id === this.activeId
      const isHover = id === this.hoverId
      const mat = mesh.material as THREE.MeshBasicMaterial

      if (ud.haloFor) {
        mesh.lookAt(this.camera.position)
        const beat = this.reduced ? 1 : 1 + Math.sin(t * 1.9) * 0.14
        mesh.scale.setScalar(isActive ? beat : 1)
        mat.opacity += ((isActive ? 0.30 : 0) - mat.opacity) * 0.14
      } else if (ud.ringFor) {
        mesh.lookAt(this.camera.position)
        const target = isActive ? 1.55 : isHover ? 1.22 : 1
        mesh.scale.setScalar(mesh.scale.x + (target - mesh.scale.x) * 0.16)
        const o = isActive ? 0.95 : isHover ? 0.58 : 0.24
        mat.opacity += (o - mat.opacity) * 0.16
      } else {
        const target = isActive ? 1.45 : isHover ? 1.2 : 1
        mesh.scale.setScalar(mesh.scale.x + (target - mesh.scale.x) * 0.16)
        const o = isActive ? 1 : isHover ? 0.78 : 0.42
        mat.opacity += (o - mat.opacity) * 0.16
      }
    }

    this.renderer.render(this.scene, this.camera)
  }

  // ─── imperative API used by the component ─────────────────────────────────

  setSex(sex: Sex) {
    if (sex === this.sex) return
    this.sex = sex
    for (const [key, g] of Object.entries(this.figures)) if (g) g.visible = key === sex
    this.buildMarkers()
  }

  setActive(id: string | null) {
    this.activeId = id
  }

  /** Turn the figure toward a system, so selecting from the list moves the body too. */
  faceHotspot(id: string) {
    const p = HOTSPOT_POS[this.sex][id]
    if (!p) return
    this.yawTarget = Math.max(-0.55, Math.min(0.55, -p[0] * 1.6))
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.frame)
    this.renderer.domElement.removeEventListener('pointermove', this.handleMove)
    this.renderer.domElement.removeEventListener('pointerleave', this.handleLeave)
    this.renderer.domElement.removeEventListener('pointerdown', this.handleDown)
    window.removeEventListener('resize', this.handleResize)
    this.scene.traverse(o => {
      const m = o as THREE.Mesh
      if (m.isMesh) {
        m.geometry?.dispose()
        const mat = m.material as THREE.Material | THREE.Material[]
        if (Array.isArray(mat)) mat.forEach(x => x.dispose()); else mat?.dispose()
      }
    })
    this.material.dispose()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}
