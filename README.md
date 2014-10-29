#Dante Editor

just another Medium Editor

##Motivation:

I´ve tried all the medium clones out there, they are really great and all have it´s pros & cons, but none of them have all the features that medium wysywig have, so I wonder, how difficult could be to build my own Medium clone?, Well, I'm not a js gurú, so I´ve use some dependences to ease this task - jQuery, Backbone/Underscore & Sanitize - perhaps in the future I could get rid of those , but for the moment this dependencies let me write less LOC and makes the base code in order.

Also I´ve build this library with one thing in mind, clone Medium editor as Verbatim as I can, I´ve re-interpreted the js front-end logic but I've used Medium styles & markup to be the closest as possible to the source. If you aren't as obsessed like me with Medium you can change the design to fit your needs ff course.


## Features:

+ Cleaning Html when pasted and loaded
+ Upload of Images with Preview and caption option

## Disclaimer:

This Library will work on early versions of Chrome/Safari/FF/IE I don't have any intentions to target all browsers versions, really... if you like this library and need backwards support for an specific version you can submit a patch to help with the development or just upgrade your shitty browser :D

## Usage:

```html
  <div id="editor">
  </div>

  <script type="text/javascript">
    editor = new Editor.MainEditor(
      {upload_url: "/images.json"}
    );
    editor.start()
  </script>

```

## Testing Demo

  TODO

## Usage

  TODO

### References

+ icon:

  https://www.iconfinder.com/icons/281089/highlighter_stationery_writting_tool_icon#size=128


+ handle paste

  http://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser/6804718#6804718