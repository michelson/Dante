module.exports =

  paths:
    public: 'docs'

  files:
    javascripts:
      joinTo:
        'application.js': /^app/
        'vendor.js': /^(?!app)/

    stylesheets:
      joinTo:
        'application.css': /^app|bower_components|fonts/

  plugins: 
    copycat:
      fonts: ["app/fonts"]
      images: ["app/images"]
      verbose: true, #shows each file that is copied to the destination directory 
      onlyChanged: true #only copy a file if it's modified time has changed (only effective when using brunch watch) 

    babel: 
      presets: ['es2015', 'es2016', 'react'], # es2015, es2016 are defaults
      ignore: [
        /^(bower_components|vendor)/,
        'app/legacyES5Code/**/*'
      ],
      pattern: /\.(es6|jsx)$/ # js and jsx are defaults.
    postcss: processors: [ require('autoprefixer') ]

