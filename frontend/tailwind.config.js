/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
      extend: {
        fontFamily: {
            'montserrat': ['Montserrat'],
            'lato': ['Lato'],
            'garamond': ['Garamond']
        }
      },
    },
    plugins: [],
  }