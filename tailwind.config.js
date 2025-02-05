module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './examples/**/*.{vue,js,ts,jsx,tsx}',
    './docs/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      textOpacity: ['dark'],
      backgroundColor: ['dark']
    }
  },
  corePlugins: {
    preflight: true
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '.n-button': {
          'background-color': 'var(--n-color);'
        }
      })
    }
  ]
}
