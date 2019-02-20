import autoprefixer from 'autoprefixer';
import customProp from 'postcss-custom-properties';
import flecbugs from 'postcss-flexbugs-fixes';
import flexibility from 'postcss-flexibility';
import postcssimport from 'postcss-import';
import mixin from 'postcss-mixins';
import nested from 'postcss-nested';
import preset from 'postcss-preset-env';
import vars from 'postcss-simple-vars';
import sorting from 'postcss-sorting';

export default [
  customProp(),
  flecbugs(),
  flexibility(),
  autoprefixer({
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
  }),
  postcssimport(),
  mixin(),
  nested(),
  preset(),
  vars(),
  sorting()
];
