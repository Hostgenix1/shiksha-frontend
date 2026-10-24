/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a5f7a",
        secondary: "#2a9d8f",
        accent: "#e76f51",
        dark: "#1a1a2e",
        light: "#f4f4f4",
      },
    },
  },
  plugins: [],
}
