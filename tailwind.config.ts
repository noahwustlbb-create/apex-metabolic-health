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
        bg: '#0A0A0A',
        surface: '#111111',
        elevated: '#161616',
        'elevated-high': '#1E1E1E',
        'apex-border': '#1E1E1E',
        gold: {
          DEFAULT: '#C8A96E',
          dark: '#B8935A',
          light: '#D4B97E',
          glow: 'rgba(200,169,110,0.15)',
        },
        primary: '#F5F5F5',
        secondary: '#888888',
        muted: '#555555',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        grotesk: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 0 20px rgba(200,169,110,0.12)',
        'gold-md': '0 0 40px rgba(200,169,110,0.2)',
        'gold-lg': '0 0 80px rgba(200,169,110,0.3)',
        'card': '0 12px 32px rgba(0,0,0,0.6)',
        'ambient': '0 12px 32px rgba(0,0,0,0.5)',
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
