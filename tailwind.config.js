/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        "primary-dark": "#1E3A8A",
        "primary-light": "#DBEAFE",
        accent: "#F59E0B",
        "accent-dark": "#D97706",
        dark: "#0F172A",
        muted: "#64748B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
