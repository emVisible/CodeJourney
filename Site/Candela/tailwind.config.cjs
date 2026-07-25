/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins:{
    preflight:false
  },
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "train":"url('src/assets/train.png')"
      }
    },
  },
  plugins: [],
}