/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#09090B',
          surface: '#111114',
          elevated: '#17171B',
        },
        text: {
          primary: '#F4F4F5',
          secondary: '#A1A1AA',
          muted: '#71717A',
        },
        border: {
          subtle: '#27272A',
          strong: '#3F3F46',
        },
        accent: {
          DEFAULT: '#F00064',
          hover: '#FF1F7A',
          muted: 'rgba(240, 0, 100, 0.12)',
        },
        success: '#10B981',
      },
      fontFamily: {
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
