/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/*.html"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "main-layout": "minmax(0, 200px) minmax(0, 1fr)",
      },
      gridTemplateRows: {
        "main-layout": "4rem minmax(0, 1fr)",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease",
        "fade-out": "fade-out 0.5s ease ",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "fade-out": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
