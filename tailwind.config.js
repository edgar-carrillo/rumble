module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sunset-orange': '#FF6161',
        'limed-spruce': '#37474F',
        'dark-jungle-green': '#1F2427',
        'white': '#FFFFFF',
        'light-white': 'rgba(255, 255, 255, .5)',
        'star-dust': '#A59E9E',
        'star-dust-dark': '#9D9D9D',
        'reef-gold': '#A48111',
        'moccasin': '#8D733F',
        'black': '#000000',
        'military-green': '#65793E',
        'flat-blue': '#3074AB',
        'amber': '#ffbf00',
        'dark-red': '#58181F',
      },
      fontFamily: {
        'regular': ['Roboto-Regular'],
        'bold': ['Roboto-Bold'],
        'dark': ['Roboto-Black'],
        'light': ['Roboto-Light'],
        'logo': ['Bebas-Neue'],
      },
    },
  },
  plugins: [],
}