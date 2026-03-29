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
        bg: '#0c131f',
        surface: '#151c28',
        elevated: '#19202c',
        'elevated-high': '#2e3542',
        'apex-border': 'rgba(255,255,255,0.06)',
        teal: {
          DEFAULT: '#2C74E8',
          light: '#7AB8FF',
          glow: 'rgba(44,116,232,0.15)',
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
        'teal-sm': '0 0 20px rgba(72,144,247,0.15)',
        'teal-md': '0 0 40px rgba(72,144,247,0.25)',
        'teal-lg': '0 0 80px rgba(72,144,247,0.35)',
        'card': '0 12px 32px rgba(7,14,26,0.5)',
        'ambient': '0 12px 32px rgba(7,14,26,0.4)',
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
