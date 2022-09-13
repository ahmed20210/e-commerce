/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5bb300",
        secondary: "rgba(0,0,0, 0.5)",
        tertiary: "#050327",
      },
      maxWidth: {
        xxs: "18rem",
      },
      width: {
        "3/13": "30%",
        "4/13": "22%",
        "2/13": "24%",
        "5/13": "45%",
      },
      height: {
        98: "450PX",
        97: "420PX",
        100: "800PX",
        "11/12": "98%",
        "16/16": "6.25%",
      },
      borderWidth: {
        1: "1px",
      },
      screens: {
        smd: "950px",
        xs: "480px",
      },
      spacing: {
        105: "105%",
      },
    },
    plugins: [],
  },
};
