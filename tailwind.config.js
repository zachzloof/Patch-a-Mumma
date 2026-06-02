/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#1B4332',
          800: '#2D6A4F',
          700: '#40916C',
          600: '#52B788',
          200: '#95D5B2',
          100: '#D8F3DC',
        },
        earth: {
          900: '#5C3D2E',
          700: '#7B5E45',
          500: '#A07850',
          300: '#C4A882',
          100: '#EDD9C0',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          dark: '#F0E8D9',
        },
        bark: '#2C1810',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
