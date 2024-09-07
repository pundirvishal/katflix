/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        'custom-h-80': '300px',
        'custom-490': '490px',
      },
      screens: {
        'custom-sm': '601px',
        'custom-xs': '475px',
        'custom-max': {'max': '600px'},
        'custom-max-md': {'max': '840px'},
        'custom-max-xl': {'max': '1200px'},
        'custom-max-lg': {'max': '1000px'},
        'custom-xl': '1199px',
      },
    },
  },
  plugins: [],
}
