module.exports =

  paths:
    public: 'public'

  files:
    javascripts:
      joinTo:
        'application.js': /^app/
        'vendor.js': /^(?!app)/

    stylesheets:
      joinTo:
        'application.css': /^app|bower_components/

  plugins: 
    babel: 
      presets: ['es2015', 'es2016', 'react'], # es2015, es2016 are defaults
      ignore: [
        /^(bower_components|vendor)/,
        'app/legacyES5Code/**/*'
      ],
      pattern: /\.(es6|jsx)$/ # js and jsx are defaults.
    postcss: processors: [ require('autoprefixer') ]

