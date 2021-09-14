module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      minHeight: {
        'screen-nav': 'calc(100vh - 3rem)',
      },
      height: {
        tall: '36rem',
      },
    },
  },
  variants: {
    extend: {
      scale: ['active'],
      translate: ['active'],
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['disabled', 'active'],
    },
  },
  plugins: [],
};
