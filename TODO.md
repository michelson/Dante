
#TODO:

  + GENERALS
    + OK ~~handle paste properly , copy to invisible div , clean and copy to new node~~
    + OK ~~on paste set caret to the last element~~
    + OK ~~parse existing images or objects including embeds~~
    + OK ~~shows the + when selected P is empty~~
      + OK ~~check from key 8~~
    + OK ~~navigate between paragraphs with TAB~~
    + OK ~~Get rid of global current_editor, inject dependency into menu & tooltip instead~~
    + FF in case markup breaks (like linebreak with br or unwraped text when typing) just rewrap from current range.

  + SANITIZE PROCESS:
    + OK ~~WRAP INTO PARAGRAPHS ORPHANS~~
    + OK ~~a, wrap with p~~
    + OK ~~remove inner spans and other shits (except for embeds, placeholders)~~
    + OK ~~convert divs into p (except for embeds)~~
    + childs links inside first level elements clean & add classes ie

      a target="_blank" href="#" data-href="#" class="markup--anchor markup--p-anchor" data-tooltip="#" data-tooltip-position="bottom" data-tooltip-type="link">example link</a>

  + MENU
    + OK ~~Set classes when execCommand , ie:. when convert an <a> tag to h2 tag add graf--h2 class~~
    + OK ~~Fix position top when text selected.~~
    + OK ~~Actions over text LINKS!!~~
    + OK ~~mantain Range after click on action button, in order to toggle style~~
    + Display btn as selected when selected nodes matches action-link types
    + Filter inner tags (except a, b, i ... ) when convert to blockquote

  + DELETE

    + OK ~~fix FF delete , somethimes it don't let delete more paragraphs
      this can be due the mix of @handleCompleteDeletion and @handleNullAnchor functions~~

    + handle remove from PRE tag, it set rare span, just remove it
    + clean node when remove one

  + IMAGES:
    + OK ~~handle focus on image when click , focus on caption~~
    + OK ~~Generate image markup when paste html with images~~
    + OK ~~Generate image markup when load html with images~~
    + OK ~~control arrows, detect selected~~
      + OK ~~focus caption~~
      + OK ~~mark selected~~
    + upload, show progress, complete
    + when image is uploaded update blob src to image src if upload post success
    + handle enter (linebreak) when selected in caption (build new P)
      + Fix problem in FF when linebreak or arrow down to new P , is typing backwards!! (could be a range 1 char problem ?)

  + EMBEDS:
    + OK ~~fix embed captions, they don't load propperly~~
    + OK ~~embed connect with oembed service~~
    + OK ~~break deletion of paragraph when is after an embed, just set caret on embed~~
    + fix navigation arrows when up or down through them
      + problem FF when linebreak or arrow down to new P , is typing backwards!! (could be a range 1 char problem ?)

  + SUBMIT:
    get clean version of content


## ROADMAP

+ 0.0.5
  + TODO LIST COMPLETE!
+ 0.1.0
  + implement layout changes on embeds & uploads.
+ 0.2.0
  + implement creation of new sections
+ 1.0.0
  + use Rangy for better selection & range support.


