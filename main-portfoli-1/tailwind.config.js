/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "#CCD7F7",
        secondary: "#08fdd8",
        primaryLight: "#909096",
        inputBox: "#8d8d8d",
      },
    },
    backgroundColor: {
      primary: "#1d1d1d",
      primaryLight: "#181818",
      secondary: "#08fdd8",
      inputBox: "#2b2b2b",
    },
    fontFamily: {
      laBelleAurore: ["La Belle Aurore", "cursive"],
      nunitoSans: ["Nunito Sans", "sans-serif"],
    },
    gradientColorStopPositions: {
      50: "50%",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
