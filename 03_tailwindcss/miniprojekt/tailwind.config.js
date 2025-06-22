module.exports = {
  purge: {
    content: ['./dist/index.html'],
    enabled: false,
  },
  darkMode: false,
  theme: {
    extend: {
      debugScreens: {
        position: ['top', 'left'], // <- RICHTIG HIER
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
