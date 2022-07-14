/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00FFF7',
        secondary: '#EBFF00',
        background: '#274DE5'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
}
