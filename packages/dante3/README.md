**Dante 3 - This is it!**
=========================

**Just another medium clone built on top of ProseMirror's / TipTap**
--------------------------------------------------------------------

> Dante3 is a ProseMirror port of [Dante2 (Draftjs) ](https://github.com/michelson/Dante/tree/master/packages/dante2). This version is built on top of [TipTap's Prosemirror](https://www.tiptap.dev/) and reaches all Dante2's features with a shiny ultra mega super uber maintainable architecture.

See the demo at: [dante-editor.dev](https://dante.vercel.com/)

**Why rewrite a new version of Dante?**
---------------------------------------

The previous version (Dante2) was made on DraftJs, that's a facebook library to build WYSIWYG editor, I'd choose that technology because it implemented a very interesting data model and abstracted many parts of the heuristics implementation that [Dante1 (the previous version)](https://github.com/michelson/Dante/tree/master/packages/dante1-legacy) built as a naive implementation relying a lot on DOM manipulation, So Dante2 was great and is working on a ton of production websites. Sadly over the last years this library has not received much attention from maintainers. Among the ~700 unattended reported issues there are some that have become a deal breaker for me:

-   Bad mobile support.

-   ~1MB added to your bundle (immutablejs is heavy)

-   Not created for realtime collab.

**sfpoksdf**

**sdsdokdaspok**

**My bet, ProseMirror/TipTap**

After shopping many editors libraries, I mean after tried to implement Dante on almost all of them **(Trix, Editorjs, Quilljs, Slate, Prosemirror)** I've choosen Prosemirror's **TipTap** library., I guess all editors libraries have their own flaws but after review it all TipTap is the best of it's class, very well designed/architectured, and I love the community around their ecosystem. So that's it.

**Features:**

-   Configurable and extensible extensions / plugins / components

-   Undo/redo.

-   Save Content as a data JSON/HTML structure.

-   Load Content as a data JSON/HTML structure.

-   Styled components Theme support (built in light/dark themes).

**Block based content**:

Dante editor can be extended with (React) components to, currently there are default components to be used as is:

-   Image upload for paste html.

-   Video embed.

-   Video Recorder.

-   Embed.

-   Divider.

-   Speech.

-   Giphy.

**Installation**
----------------

`npm install dante3` or `yarn add dante3`

**Usage**
---------

Component Based

```
<DanteEditor
  content={'hello world'}
/>
```

### **Options:**

Many configuration options and plugin usage can be found on the documentation page:

See [dante-editor.dev](https://dante.vercel.com/)

**Development**
---------------

### **Installation**

-   `git clone https://github.com/michelson/dante`

**dependencies**

-   `npm install` or `yarn install`

### **Building**

-   `npm dante3_build` or `yarn dante3_build`

### **dev install:**

-   lerna bootstrap

-   yarn dev

**Status**
----------

> Dante3 is on beta, actively maintained, with all the features that Dante2 has. As is relying in Prosemirror/TipTap this has better browser support and mobile support. Also has realtime collab capabilities.

**Monorepo**
------------

This repository now contains prior Dante versions, located in the [packages](https://github.com/michelson/Dante/tree/master/packages) folder. so Dante1*, Dante2 and Dante3 lives in the same repo.

> * Dante(1) is not maintained anymore.

### **Open source license**

Dante is licensed under MIT, so you are free to do whatever you want. If you are using it commercially, become one of our wonderful sponsors to fund the maintenance, support and development of Dante now and in the future.

### **💓 Your sponsorship**

> Your sponsorship helps to maintain, update, support and develop all of our open source projects, including tiptap and many more.

### **Acknowledgments**

Prosemirror library & Tiptap authors


### deploy

+ lerna publish --force-publish=dante3
