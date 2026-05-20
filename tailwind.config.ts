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
        bg: '#ffffff',
        surface: '#f8f9ff',
        elevated: '#ffffff',
        'elevated-high': '#f0f5ff',
        'apex-border': 'rgba(72,144,247,0.14)',
        blue: {
          DEFAULT: '#4890f7',
          dark: '#2563eb',
          light: '#6ba8ff',
          glow: 'rgba(72,144,247,0.15)',
        },
        primary: '#0a0e1a',
        secondary: '#4a5878',
        muted: '#7a90a8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        grotesk: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'blue-sm': '0 0 20px rgba(72,144,247,0.12)',
        'blue-md': '0 0 40px rgba(72,144,247,0.2)',
        'card': '0 4px 24px rgba(72,144,247,0.08)',
        'ambient': '0 8px 32px rgba(0,0,0,0.06)',
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
