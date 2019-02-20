import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import server from 'rollup-plugin-server';
import livereload from 'rollup-plugin-livereload';
import filesize from 'rollup-plugin-filesize';

export default {
  input: './src/index.js',
  output: {
    file: './src/f-drawer.js',
    format: 'iife',
    moduleName: 'f-drawer',
  },
  sourceMap: true,
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    postcss({
      map: true
    }),
    babel({
      // exclude: 'node_modules/**',
      runtimeHelpers: true,
      presets: [[
        '@babel/preset-env',
        {
          exclude: ['transform-classes'],
          targets: {
            'chrome': 60,
            'safari': 10,
            'android': 4.4,
          },
          debug: true
        }
      ]],
      plugins: [
        [
          '@babel/plugin-transform-template-literals',
          {
            'loose': true
          }
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            'corejs': false,
            'helpers': true,
            'regenerator': true,
            'useESModules': true,
          }
        ],
        [
          '@babel/plugin-external-helpers',
        ]
      ],
    }),
    filesize({
      showBrotliSize: true,
    }),
    server({
      contentBase: './src/',
      port: 3008,
      open: true,
    }),
    livereload()
  ]
}
