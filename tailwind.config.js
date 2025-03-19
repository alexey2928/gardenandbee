/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        portrait: { raw: "(orientation: portrait)" },
        landscape: { raw: "(orientation: landscape)" },
      },
      colors: {
        primary: "#956C3F",
        primary_dark: "#704415",
        secondary: "#d4c1a1",
        background: "#f5eff2",
      },
      fontFamily: {
        fitz: ["Playfair Display", "serif"],
        old: ["Old Standard TT", "serif"],
      },
    },
  },
  plugins: [],
};
