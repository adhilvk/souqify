/** @type {import('tailwindcss').Config} */
import { withUt } from "uploadthing/tw";
export default withUt({
    darkMode: 'class', // 👈 Enable class-based dark mode
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [ require("tailwindcss-animate"), require('@tailwindcss/forms')],

});


