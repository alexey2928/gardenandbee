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
        secondary: "#d4c1a1",
        background: "#f5eff2",
        primary_dark: "#704415",
      },
    },
  },
  plugins: [],
};
// primary: "#704415",
