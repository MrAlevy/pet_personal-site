module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundSize: {
        '100%': '100% 100%',
      },
      backgroundImage: () => ({
        'img-desktop': "url('/laptop/desktop.png')",
        'img-start-menu': "url('/laptop/start-menu.png')",
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
