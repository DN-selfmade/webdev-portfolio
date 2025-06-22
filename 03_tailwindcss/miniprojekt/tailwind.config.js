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
