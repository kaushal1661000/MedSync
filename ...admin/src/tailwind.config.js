/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust paths to your project
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5f6fff", // fallback/base color from config
      },
    },
  },
  plugins: [],
}