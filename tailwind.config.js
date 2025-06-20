/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563EB', // Blue color used in the UI
        'primary-dark': '#1D4ED8',
      },
    },
  },
  plugins: [],
}
