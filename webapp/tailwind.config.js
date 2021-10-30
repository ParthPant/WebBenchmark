module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}',
          './src/components/*.{js,jsx,ts,tsx}',
          './src/*.{js,jsx,ts,tsx}',
          './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      textColor: ['disabled']
    },
  },
  plugins: [],
}
