#Dante Editor

####Just another Medium editor clone.

##Motivation:

I´ve tried all the medium clones out there, they are really great and all have it´s pros & cons, but none of them have all the features that medium wysywig provides, so I wonder, how difficult could be build my own Medium clone?

Until now I´ve been able to implement the following features:

## Features:

+ HTML sanitizer when paste text or initial load.
+ Image formatting/upload for paste events.
+ Add an unique name to elements on page.
+ Implementation of the famous tooltip on each paragraph when selected
+ Tab navigation.
+ Embeds:
  + Image Uploader with *preview* and caption option.
  + Embed data for pasted link through OEmbed services.
  + Embed media information for pasted links through OEmbed services.
+ CSS tries to use the same fonts used in Medium, if you have setup those fonts, or fallbacks to open fonts (by Google fonts) or system fonts.
  + serif: freight-text-pro fallbacks to Merriweather or Georgia,
  + sans:  jaf-bernino-sans fallbacks to Open Sans or Lucida Grande

## Demo:

[http://michelson.github.io/Dante/](http://michelson.github.io/Dante/)

## Usage:

### HTML:

```html
  <div id="editor">
    your content here
  </div>
```

### Javascript:

```html
  <script type="text/javascript">
    editor = new Dante.Editor(
      {
        el: "#editor",
        upload_url: "/images.json", //it expect an url string in response like /your/server/image.jpg or http://app.com/images/image.jpg
        store_url: "/save" //post to save

      }
    );
    editor.start()
  </script>
```

### Configuration options:

    el:          default: #editor
    debugMode:   default: false
    upload_url:  default: /uploads.json
    oembed_url:  default: http://api.embed.ly/1/oembed?url="
    extract_url: default: http://api.embed.ly/1/extract?url="

### Rails / AssetPippeline

in Gemfile

```gem "dante-editor"```

### stylesheets:

```@import "dante";```

### javascripts:

```//= require 'dante'```

## Disclaimer:

This Library will work on early versions of Chrome/Safari/FF/IE.
I don't have any intentions to target all browsers versions, really... if you like this library and need backwards support for an specific version you can submit a patch to help with the development or just upgrade your shitty browser :D

## Dependencies:

Some dependencies are required in order to Dante editor to work propperly:

+ Jquery
+ [Underscore](https://github.com/documentcloud/underscore)
+ [Sanitize.js](https://github.com/gbirke/sanitize.js)


drop underscore and jquery dependencies is on the roadmap.


## Development:

There is a development web app middleman/sinatra to work with the source files and make the proper tests.
To use application:

### Installation:

+ install ruby
+ execute `bundle install`

### Start app:

`bundle exec rackup config.ru` and visit http://localhost:9292

or

`bundle exec middleman ` (this is without upload server)
and visit localhost:4567

or

`foreman start` and visit http://localhost:9292

### Tests:

tests are located in source/tests and /source/assets/spec folder and accessible by visit host/tests

## TODO

  [read todo](./TODO.md)


### LICENSE

Miguel Michelson Martinez [Licensed under MIT.](./license.md) 2014