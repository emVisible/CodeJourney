/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        arrow: {
          'from': {
            transform: 'rotateZ(0deg) scale(1)',
          },
          '40%': {
            transform: 'rotateZ(35deg) scale(1.2)',
          },
          '80%': {
            transform: 'rotateZ(-30deg) scale(1.4)',
          },
          'to': {
            transform: 'rotateZ(0deg) scale(1.6)' ,
          }
        }
      },
      animation: {
        "arrow": "arrow .5s forwards cubic-bezier(.31, .72, .57, .81)"
      }
    },
  },
  plugins: [],
}