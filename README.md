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
        upload_url: "/images.json"
      }
    );
    editor.start()
  </script>
```

### Configuration options:

    el:          default: #editor
    debugMode:   default: false
    upload_url:  default: /images.json
    oembed_url:  default: http://api.embed.ly/1/oembed?url="
    extract_url: default: http://api.embed.ly/1/extract?url="

## Disclaimer:

This Library will work on early versions of Chrome/Safari/FF/IE.
I don't have any intentions to target all browsers versions, really... if you like this library and need backwards support for an specific version you can submit a patch to help with the development or just upgrade your shitty browser :D

## TODO

  [read todo](./TODO.md)

### References

+ handle paste

  http://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser/6804718#6804718

### LICENSE

Miguel Michelson Martinez [Licensed under MIT.](./license.md) 2014