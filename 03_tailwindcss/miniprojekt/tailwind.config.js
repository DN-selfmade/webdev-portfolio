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
