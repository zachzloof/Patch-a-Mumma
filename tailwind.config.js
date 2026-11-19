/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        // Survey paper and ink
        paper: { DEFAULT: '#FAF9F4', deep: '#F1EFE6' },
        ink: { DEFAULT: '#10291C', soft: '#3E5546', faint: '#6B7A6F' },
        // Soil strata
        humus: { DEFAULT: '#3A2518', light: '#4B3223', dark: '#2A1A10' },
        clay: { DEFAULT: '#C08A3E', light: '#D6A55F', dark: '#9C6A2A' },
        chalk: { DEFAULT: '#ECE6D7', dark: '#D8D0BC' },
        flint: '#4F4A44',
        gley: '#8B989D',
        // Growth
        leaf: {
          900: '#173D1F',
          700: '#2F6B2A',
          500: '#4E8E35',
          300: '#8DBF5A',
          100: '#DDEBC4',
        },
        bean: '#D93A2B',
        tomato: '#D8432E',
        squash: '#E8A33A',
        beet: '#8E1F45',
        carrot: '#E87A24',
        // Action
        rust: { DEFAULT: '#B23C1C', dark: '#92301A', light: '#F3D9CF' },
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '78rem',
      },
    },
  },
  plugins: [],
}
