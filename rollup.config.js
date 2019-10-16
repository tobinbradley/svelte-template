import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import autoPreprocess from 'svelte-preprocess'
import workbox from 'rollup-plugin-workbox-build'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      preprocess: autoPreprocess({
        postcss: true
      }),
      css: css => {
        css.write('public/components.css')
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),

    babel({
      exclude: 'node_modules/**'
    }),
    postcss({
      extract: 'public/utils.css',
      minimize: production,
      sourceMap: true
    }),

    !production && livereload('public'),
    production && terser(),

    production &&
      workbox({
        mode: 'generateSW',
        options: {
          swDest: 'public/service-worker.js',
          globDirectory: 'public'
        },
        render: ({ swDest, count, size }) => {
          console.log('Service Worker: ', swDest)
          console.log('File Count: ', count)
          console.log('File Size: ', (size / 1024).toFixed(2), 'kb')
        }
      })
  ],
  watch: {
    clearScreen: false
  }
}
