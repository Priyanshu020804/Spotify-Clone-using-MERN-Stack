/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height:{
        "1/10" : "10%",
        "9/10" : "90%",
      },
      backgroundColor:{
        "app-black" : "#121212"
      },
      width:{
        "6/25" : "24%",
        "99/100" : "99%"
      },
    },
  },
  plugins: [],
}