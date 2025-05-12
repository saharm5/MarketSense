/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif'],
      },
      colors: {
        'chart-bg': '#081122',
        chart: {
          light: '#ffffff',
          dark: '#081122',
        },
        text: {
          light: '#000000',
          dark: '#ffffff',
        }
      }
    }
  },
  plugins: [],
}
