/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        transfera: {
          dark: '#120e0e',
          darker: '#0a0808',
          panel: '#140f0f',
          glass: 'rgba(255, 255, 255, 0.04)',
          glassBorder: 'rgba(255, 255, 255, 0.08)',
          neonBlue: '#c84040',
          neonPurple: '#9a6060',
          neonPink: '#b41e1e',
          accent: '#b41e1e',
          red: '#b41e1e',
          redLight: '#c84040',
        }
      },
      fontFamily: {
        orbitron: ['Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif'],
        serif: ['EB Garamond', 'serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 30% 0%, rgba(180, 30, 30, 0.12) 0%, transparent 55%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
