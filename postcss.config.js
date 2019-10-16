const production = !process.env.ROLLUP_WATCH
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    require('postcss-import')(),
    require('tailwindcss'),
    require('postcss-preset-env')({
      "features": {
        "nesting-rules": true
      }
    }),
    production &&
      purgecss({
        content: ['./public/**/*.html', './src/**/*.svelte'],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
      })
  ]
}
