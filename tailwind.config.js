/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
				outfit: ['outfit', 'sans-serif'],
				poppins: ['poppins', 'sans-serif'],
				orienta: ['orienta', 'sans-serif'], 
			},
    },
  },
  
  plugins: [],
}