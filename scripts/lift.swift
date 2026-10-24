import Foundation
import Vision
import CoreImage
import AppKit
// usage: lift <in> <outmask.png>   writes a grayscale soft mask
let args = CommandLine.arguments
let url = URL(fileURLWithPath: args[1])
guard let ci = CIImage(contentsOf: url) else { fatalError("read") }
let req = VNGenerateForegroundInstanceMaskRequest()
let h = VNImageRequestHandler(ciImage: ci)
try h.perform([req])
guard let r = req.results?.first else { fatalError("no subject") }
let buf = try r.generateScaledMaskForImage(forInstances: r.allInstances, from: h)
let m = CIImage(cvPixelBuffer: buf)
let ctx = CIContext()
let cg = ctx.createCGImage(m, from: m.extent)!
let rep = NSBitmapImageRep(cgImage: cg)
try rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: args[2]))
