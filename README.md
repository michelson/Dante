#Dante Editor

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/michelson/Dante?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

####Just another Medium editor clone.

##Motivation:

So far I have tried all the Medium.com wysiwyg clones out there, these are really great, and each have their pros and cons. [But none of them has all the features that the real medium editor provides.](http://howtox.com/medium-editor-clones-in-js/)
so I wonder, How complicated could be write my own Medium wysiwyg clone?

## Demo:

[http://michelson.github.io/Dante/](http://michelson.github.io/Dante/)

Until now I´ve been able to implement the following features:

## Features:

+ HTML sanitizer for pasted or loaded text.
+ Image upload for paste events.
+ Image upload for legacy images on existent texts.
+ The medium (+) Tooltip to embed or upload media.
+ Tab navigation.
+ Embeds:
  + Image Uploader with *preview* and caption option.
  + Embed data for pasted link through OEmbed services.
  + Embed media information for pasted links through OEmbed services.
  + Add or remove tooltip buttons with ease with plugin system.
+ List creation with shorcuts ie:. 1. , - , 1) with spacebar or return key
+ Custom tooltip bottons support
+ CSS tries to use the same fonts used in Medium, (if you have already setup those fonts) or fallbacks to open fonts (by Google fonts) or system fonts.
  + serif: freight-text-pro fallbacks to Merriweather or Georgia,
  + sans:  jaf-bernino-sans fallbacks to Open Sans or Lucida Grande


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

+ **el:**          default: #editor
+ **debug:**   default: false
+ **upload_url:**  default: /uploads.json
+ **upload_callback** default: empty, allows optional way to handle the server response when image is uploaded This is useful when you don't have control on the backend response.
+ **oembed_url:**  default: http://api.embed.ly/1/oembed?url="
+ **extract_url:** default: http://api.embed.ly/1/extract?url="
+ **store_url:**   default: to none , url to store data with interval
+ **store_method** default: to POST , http verb to use when store_url is present.
+ **store_interval:** default: 15000 (15 secs), used when store_url is present.
+ **spellcheck:**  default: false
+ **default_loading_placeholder:** image placeholder to show when uploaded/pasted images are loading , defaults to a grey background
+ **disable_title** default: false, will hide the initial heading placeholder for initial text
+ **title_placeholder** default: 'Title'
+ **title** default: none, pass a pre-existing title to the editor here
+ **body_placeholder** default: 'Tell your story…'
+ **embed_placeholder** default: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter'
+ **extract_placeholder** default: 'Paste a link to embed content from another site (e.g. Twitter) and press Enter'
+ **base_widgets:** default: ["uploader", "embed", "embed-extract"],
+ **extra_tooltip_widgets:** and array of new Dante.TooltipWidget instances.

### Initialization

#### title
 Use the title option in the initializer to pass a title to Dante.
   
#### body
  Use the following code to get your text into the Dante editor's body:
```html

  <div id="editor editable" > <%= clean_dante_post( @post.excerpt ).try(:html_safe) %> </div>

```

### Rails / AssetPippeline

in Gemfile

```gem "dante-editor"```

### stylesheets:

```@import "dante";```

### javascripts:

```//= require 'dante'```

## Disclaimer:

This Library will work fine on latest versions of Chrome/Safari/FF/IE.
We don't have any intention to target all browsers versions, really... if you like this library and you need backward compatibility with an specific version you can submit a patch to help with the development or just upgrade your shitty browser :D

**BTW , this library is an official beta release, so there are known bugs that we are currently working on.
see TODO list below.**

## Dependencies:

Some dependencies are required in order to Dante editor works properly:

+ Jquery
+ [Underscore](https://github.com/documentcloud/underscore)
+ [Sanitize.js](https://github.com/gbirke/sanitize.js)


**Drop underscore and jquery dependencies are on our roadmap.**


## Development:

There is a web app for development to work with the source files and make the proper tests. To use application:

### Installation:

+ install ruby
+ execute `bundle install`
+ execute `bower install`

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

## MAINTAINERS:

+ [Miguel Michelson](http://github.com/michelson)
+ [Cristian Ferrari](http://github.com/cristianferrarig)

### CONTRIBUTORS

Big kudos to our valued contributors. Check them all at:

https://github.com/michelson/dante/graphs/contributors

### ALTERNATIVES

+ https://github.com/sofish/pen
+ https://github.com/orthes/medium-editor-insert-plugin

### ACKNOWLEDGMENTS:

+ Inline menu features was written taking some ideas and code from [pen.js](https://github.com/sofish/pen)
+ [Sanitize.js](https://github.com/gbirke/sanitize.js) allows us to clean HTML like pros.
+ No animals were harmed in the making of this ~~film~~ wysiwyg

### LICENSE

[Licensed under MIT.](./license.md) 2014
