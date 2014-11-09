
#TODO:

  + OK ~~handle paste properly , copy to invisible div , clean and copy to new node~~
  + OK ~~on paste set caret to the last element~~
  + OK ~~parse existing images or objects including embeds~~
  + OK ~~shows the + when selected P is empty~~
    + OK ~~check from key 8~~

  + SANITIZE PROCESS:
    + OK ~~WRAP INTO PARAGRAPHS ORPHANS~~
    + OK ~~a,  wrap with p~~

    + OK ~~remove inner spans and other shits (except for embeds, placeholders)~~
    + OK ~~convert divs into p (except for embeds)~~
    + inner images add classes ie

      a target="_blank" href="#" data-href="#" class="markup--anchor markup--p-anchor" data-tooltip="#" data-tooltip-position="bottom" data-tooltip-type="link">example link</a>

  + MENU
    + OK ~~Set classes when execCommand , ie:. when convert an <a> tag to h2 tag add graf--h2 class~~
    + filter inner tags (except a, b, i ... ) when convert to blockquote
    + OK ~~Fix position top when text selected.~~
    + Actions over text LINKS!!

  + DELETE

    + OK ~~fix FF delete , somethimes it don't let delete more paragraphs
      this can be due the mix of @handleCompleteDeletion and @handleNullAnchor functions~

    + handle remove from pre, it set rare span, just remove it
    + clean node when remove one

  + IMAGES:
    + upload complete
    + when image is uploaded update blob src to image src
    + control arrows, detect selected
      + focus caption
      + mark selected
    + handle enter (linebreak) when selected in caption (build new P)
      + Fix problem in FF when linebreak or arrow down to new P , is typing backwards!! (could be a range 1 char problem ?)

  + EMBEDS:
    + OK ~~fix embed captions, they don't load propperly~~
    + OK ~~embed connect with oembed service~~
    + OK ~~break deletion of paragraph when is after an embed, just set caret on embed~
    + fix navigation arrows when up or down through them
      + problem FF when linebreak or arrow down to new P , is typing backwards!! (could be a range 1 char problem ?)


