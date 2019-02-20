module.export = {
  extensions: ['.pcss'],
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-custom-properties': {
      'warnings': true
    },
    'postcss-flexbugs-fixes': {},
    'postcss-flexibility': {},
    'autoprefixer': {
      'browsers': [
        'last 2 Edge versions',
        'last 2 Firefox versions',
        'last 2 Chrome versions',
        'last 2 Safari versions',
        'last 2 Opera versions',
        'iOS >= 10',
        'Android > 4.4',
        'last 2 ChromeAndroid versions'
      ]
    },
    'postcss-nested': {},
    'postcss-sorting': {},
    'postcss-simple-vars': {},
  }
};
