import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#070a0d',
        surface: '#0d1117',
        elevated: '#111820',
        'apex-border': '#1e2d3d',
        teal: {
          DEFAULT: '#00c2b8',
          glow: 'rgba(0,194,184,0.15)',
        },
        gold: '#c9a84c',
        primary: '#f0f4f8',
        secondary: '#8899aa',
        muted: '#4a5a6a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        grotesk: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'teal-sm': '0 0 20px rgba(0,194,184,0.15)',
        'teal-md': '0 0 40px rgba(0,194,184,0.25)',
        'teal-lg': '0 0 80px rgba(0,194,184,0.35)',
        'card': '0 4px 32px rgba(0,0,0,0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
        'line-draw': 'lineDraw 1.5s ease-out forwards',
      },
      keyframes: {
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.5' },
        },
        lineDraw: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
