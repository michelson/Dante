#Dante Editor

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/michelson/Dante?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

(This library is free and will stay free, but needs your support to sustain its development. There are lots of desirable new features and maintenance to do. If you work for a company using Dante or have the means to do so, please consider financial support)

[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QVH5DXB326YQG)

####Just another Medium editor clone.

##Motivation:

So far I have tried all the Medium.com wysiwyg clones out there, these are really great, and each have their pros and cons. [But none of them has all the features that the real medium editor provides.](http://howtox.com/medium-editor-clones-in-js/)
so I wonder, How complicated could it be to write my own Medium wysiwyg clone?

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
+ Suggest data when type @
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

#### Basic:
+ **el:**          default: #editor
+ **debug:**   default: false
+ **spellcheck:**  default: false
+ **default_loading_placeholder:** image placeholder to show when uploaded/pasted images are loading , defaults to a grey background
+ **disable_title** default: false, will hide the initial heading placeholder for initial text
+ **title_placeholder** default: 'Title'
+ **title** default: none, pass a pre-existing title to the editor here
+ **body_placeholder** default: 'Tell your story…'

#### Widgets & Tooltips
+ **base_widgets:** default: ["uploader", "embed", "embed-extract"],
+ **extra_tooltip_widgets:** an array of new Dante.TooltipWidget instances.

#### Behaviors
+ **base_behaviors:** default: ["save", "image","list", "suggest"]
+ **extra_behaviors:** an array of new Dante.Behavior instances.

#### Store Behavior: 
+ **store_url:**   default: to none , url to store data with interval
+ **store_method** default: to POST , http verb to use when store_url is present.
+ **store_success_handler** default: to none. Option to set a function to handle success response for save operation, works only if store_url is present.
+ **store_interval:** default: 1500 (1.5 secs), used when store_url is present.

#### Uploader:

+ **upload_url:**  default: /uploads.json
+ **upload_callback** default: empty, allows optional way to handle the server response when image is uploaded This is useful when you don't have control on the backend response.
+ **image_delete_callback**: default: none, returns the image data before deletion. use this if you want to destroy image from the server.
+ **image_caption_placeholder** default: "Type caption for image (optional)"


#### Embed tool:

+ **oembed_url:**  default: http://api.embed.ly/1/oembed?url="
+ **extract_url:** default: http://api.embed.ly/1/extract?url="
+ **embed_placeholder** default: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter'
+ **embed_caption_placeholder** default: "Type caption for embed (optional)"
+ **extract_placeholder** default: 'Paste a link to embed content from another site (e.g. Twitter) and press Enter'

#### Suggest Behavior (new!)
+ **suggest_url**: default: "/api/suggest.json"
+ **suggest_query_param:** default: "q"
+ **suggest_query_timeout:** default: 300
+ **suggest_handler:** default: none. Handler function to handle response of suggest request
+ **suggest_resource_handler:** default: null. Handler function to handle the selected resource (when hover a link)


### Initialization

#### title
 Use the title option in the initializer to pass a title to Dante.
   
#### body
  Use the following code to get your text into the Dante editor's body:
```html

  <div id="editor editable" > 
    <%= @post.excerpt %> 
  </div>

```

### Rails / AssetPippeline

in Gemfile

```gem "dante-editor"```

### stylesheets:

```@import "dante";```

### javascripts:

```//= require 'dante'```


## Donate

**Can I donate to support the development of Dante Editor?**

[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QVH5DXB326YQG)

if you want to donate you will enable us to spend more time improving the library and we will be greatly thankful with you. If your company uses Dante please consider making a contribution. We are available for hire to work on or with Dante. Thanks!


## Disclaimer:

This Library will work fine on latest versions of Chrome/Safari/FF/IE.
We don't have any intention to target all browsers versions, really... if you like this library and you need backward compatibility with an specific version you can submit a patch to help with the development or just upgrade your shitty browser :D

**BTW , this library is an official beta release, so there are known bugs that we are currently working on.
see TODO list below.**

## Dependencies:

Some dependencies are required in order to Dante editor works properly:

+ Jquery
+ [Underscore](https://github.com/jashkenas/underscore)
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

+ [Miguel Michelson](https://github.com/michelson)
+ [Cristian Ferrari](https://github.com/cristianferrarig)

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
