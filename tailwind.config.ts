import formKitTailwind from '@formkit/themes/tailwindcss'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './src/**.{html,js},vue.json', './formkit.config.ts' ],
  theme: {
    extend: {}
  },
  plugins: [ formKitTailwind ]
}
