module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundSize: {
        '100%': '100% 100%',
      },
      backgroundImage: theme => ({
        'img-desktop': "url('/desktop.png')",
        'img-start-menu': "url('/start-menu.png')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['active'],
      transform: ['hover'],
    },
  },
  plugins: [],
}
