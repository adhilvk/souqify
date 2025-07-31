/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 Enable class-based dark mode
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
