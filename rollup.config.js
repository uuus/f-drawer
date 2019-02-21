import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

import postcssPlugins from './postcss.plugins.js';

export default {
  input: './src/index.js',
  output: {
    file: './src/f-drawer.min.js',
    format: 'iife',
    moduleName: 'f-drawer',
  },
  sourceMap: true,
  plugins: [
    resolve({
      jsnext: true,
    }),
    terser({
      warnings: true,
      compress: {
        drop_console: true
      },
      mangle: {
        module: true,
      },
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: [[
        '@babel/preset-env',
        {
          exclude: ['transform-classes'],
          targets: {
            'chrome': 60,
            'safari': 10,
            'android': 4.4,
          },
          debug: false
        }
      ]],
      plugins: [
        ['@babel/plugin-transform-template-literals', {
          'loose': true
        }]
      ],
    }),
    postcss({
      plugins: postcssPlugins
    }),
  ]
}
