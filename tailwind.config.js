/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        chart: {
          light: '#ffffff',
          dark: '#264553',
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
