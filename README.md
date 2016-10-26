# Dante 2


## Dante wysiwyg, another medium clone built on top of DraftJs


Dante 2 is a complete rewrite of Dante. This version is built on top of Facebook's DraftJs. This pre release reaches all Dante's features using draft technology.

### Why rewrite another Dante on DraftJs ?

The previous version of Dante relies a lot on DOM manipulation. So separate the presentation from the logic even with the modular plugin system it has is a very complex task, a redesign was needed. Some of the historic features requested by Dante users will never going to never take place with this approach.

By the other hand, DraftJs handles selection, ranges and markup blocks as a data layer. Stacking states of it making the task of paste, undo/redo, replace blocks and insert then on certain selection a trivial taskwith zero DOM manipulation. Just managing data and composing new blocks as React components.

That said this version have some dependencies which are included in source. DraftJs, React, Immutable. no Jquery.

This is a pre release, many code to refactor yet.

## New Features:

+ Improved undo/redo
+ Save Content as a data structure
+ Load Content as a data structure
+[ ] Load Data as Html
+ Handle image blocks on Copy/Paste and Drop

## Features:

+ Image upload for paste html.
+[ ] Image upload for legacy images on existent texts.
+ The medium (+) Tooltip to embed or upload media.
+[ ] Tab navigation.

## Embeds:

+ Image Uploader with preview and caption option.
+ Embed data for pasted link through OEmbed services.
+ Embed media information for pasted links through OEmbed services.
+[ ] Add or remove tooltip buttons with ease with plugin system.


## Usage

The interface to initialize is almost the Dante as the previous version.

```javascript

new Dante(
  {
    upload_url: "http://localhost:9292/uploads/new",
    store_url: "http://localhost:3333/store.json",
    el: "app"
  }
)

```

see wiki for options: 



### Installation for development

node + brunch

+ npm install
+ npm start

then open http://localhost:3333

#### upload test server (ruby, optional)

+ bundle install
+ rackup

this server is to serve assets on http://localhost:9292




