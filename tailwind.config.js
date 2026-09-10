/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        craft: {
          terracotta: '#C2410C',
          terracottaLight: '#EA580C',
          terracottaDark: '#9A3412',
          sand: '#D97706',
          sandLight: '#F59E0B',
          sandDark: '#B45309',
          cream: '#FDFBF7',
          creamDark: '#F5EFE6',
          earth: '#451A03',
          earthLight: '#78350F',
          clay: '#7C2D12',
          leaf: '#15803D',
          leafLight: '#16A34A',
          indigo: '#1E3A8A',
          ochre: '#CA8A04'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        display: ['Outfit', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'craft': '0 4px 20px -2px rgba(69, 26, 3, 0.08)',
        'craft-lg': '0 10px 30px -4px rgba(69, 26, 3, 0.12)',
        'warm': '0 4px 14px 0 rgba(194, 65, 12, 0.15)'
      },
      animation: {
        'scan': 'scan 2.5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
