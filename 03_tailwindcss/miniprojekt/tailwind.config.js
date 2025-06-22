module.exports = {
  purge: {
    content: ['./dist/index.html'],
    enabled: false,
  },
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald']
      },
      colors: {
        primary: '#212f49'
      },
      fontSize: {
        '2xs': '0.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  require('@vicgutt/tailwindcss-debug').screens({
    position: ['top', 'left']
  })
],
};
