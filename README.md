#Dante Editor

just another Medium Editor

##Motivation:

I´ve tried all the medium clones out there, they are really great and all have it´s pros & cons, but none of them have all the features that medium wysywig provides, so I wonder, how difficult could be build my own Medium clone?

Until now I´ve been able to implement the following features:

## Features:

+ Cleaning Html when pasted and loaded.
+ Add an unique name to elements on page.
+ Implementation of the famous tooltip on each paragraph when selected
+ Upload of Images with Preview and caption option.
+ Add page links with extraction of data through OEmbed services
+ Add embed links with extraction if data through OEmbed services

## Disclaimer:

This Library will work on early versions of Chrome/Safari/FF/IE.
I don't have any intentions to target all browsers versions, really... if you like this library and need backwards support for an specific version you can submit a patch to help with the development or just upgrade your shitty browser :D

## Demo:

todo

## Usage:

```html
  <div id="editor">
  </div>

  <script type="text/javascript">
    editor = new Editor.MainEditor(
      {
        el: "#editor",
        upload_url: "/images.json"
      }
    );
    editor.start()
  </script>

```

## config options

    el:          default: #editor
    debugMode:   default: false
    upload_url:  default: /images.json
    oembed_url:  default: http://api.embed.ly/1/oembed?url="
    extract_url: default: http://api.embed.ly/1/extract?url="

## TODO

  [read todo](./TODO.md)

### References

+ icon:

  https://www.iconfinder.com/icons/281089/highlighter_stationery_writting_tool_icon#size=128

+ handle paste

  http://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser/6804718#6804718

### LICENSE

[Licensed under MIT.](./license.md)