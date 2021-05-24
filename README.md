# Dante 3 - This is it!

## just another medium clone built on top of ProseMirror (TipTap)

> Dante3 is a ProseMirror port of [Dante2 (Draftjs) ](https://michelson.github.io/Dante2). 
This version is built on top of TipTap's Prosemirror and reaches all Dante2's features with a shiny ultra mega super uber maintainable architecture.

See the demo at: [https://michelson.github.io/dante2/](https://michelson.github.io/dante2/)

## Why rewrite a new version of Dante?

The previous version (Dante2) was made on DraftJs, that's a facebook library to build WYSIWYG editor, I'd choose that technology because it implemented a very interesting data model and abstracted many parts of the heuristics implementation that Dante1 (the previous version) built as a naive implementation relying a lot on DOM manipulation, So Dante2 was great and is working on a ton of production websites. Sadly over the last years this library has not received much attention from maintainers. Among the ~700 unattended reported issues there are some that have become a deal breaker for me:

+ bad mobile support
+ not built for realtime / collab

## My bet, ProseMirror/TipTap

After shoping many editors libraries, I mean after tried to implement Dante on almost all of them **(Trix, Editorjs, Quilljs, Slate, Prosemirror)** I've choosen Prosemirror's TipTap library., I guess all editors libraries have their own flaws but after review it all TipTap is the best of it's class, very well designed/architectured, so that's it.

**Features:**
+ configurable and extensible extensions / plugins / components
+ undo/redo.
+ Save Content as a data JSON/HTML structure.
+ Load Content as a data JSON/HTML structure.
+ Styled components Theme support (built in light/dark themes).

**Block based content**:

Dante blocks are customized (React) components to be used on the editor 

+ Image upload for paste html.
+ Video.
+ Video Recorder
+ Embed
+ Divider
+ Speech
+ Giphy

## Status

> Dante3 is on beta , actively maintained, with all the features that Dante2. As is relying in Prosemirror/TipTap this has better browser support and mobile support. Also has realtime collab capabilities.
## Installation

`npm install dante3` or `yarn add dante3`

## Usage

Since version 0.5.x there is only a component based way to use the editor. If you need a non component based use versions below 0.5.x

```
Component Based
```javascript
<DanteEditor
  content={'hello world'}
/>
```

### Options:

Many configuration options and plugin usage can be found on the documentation page:

See [https://michelson.github.io/dante](https://michelson.github.io/dante)


## Development

### Installation
+ `git clone https://github.com/michelson/dante`

**dependencies**
 
+ `npm install` or `yarn install`
 
### Building

+ `npm dante3_build` or `yarn dante3_build`

#### dev install:

+ lerna bootstrap
+ yarn dev

### Open source license

MIT
### Acknowledgments

Prosemirror library & Tiptap authors
