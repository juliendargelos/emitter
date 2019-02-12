import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import path from 'path'
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: [
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'es'}
    ],
    plugins: [
      babel({exclude: ['node_modules/**']})
    ]
  },
  {
    input: 'src/index.js',
    output: {file: pkg.browser, name: 'Emitter', format: 'umd'},
    plugins: [
      resolve(),
      babel({exclude: ['node_modules/**']}),
      commonjs(),
      uglify()
    ]
  }
]
