/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#f9f9f9',
          dark: '#111111',
          accent: '#3b82f6'
        }
      }
    },
  },
  plugins: [],
}