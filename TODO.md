
#TODO:

  + OK ~~handle paste properly , copy to invisible div , clean and copy to new node~~
  + OK ~~on paste set caret to the last element~~
  + parse existing images or objects
  + shows the + when selected <p> is empty
    + check from key 8

  + SANITIZE PROCESS:
    + OK ~~WRAP INTO PARAGRAPHS ORPHANS~~
    + OK ~~a,  wrap with p~~

    + remove inner spans and other shits (except for embeds, placeholders)
    + convert divs into p (except for embeds)
    + inner images add classes (ie <a target="_blank" href="http://kb2.adobe.com/cps/161/tn_16194.html" data-href="http://kb2.adobe.com/cps/161/tn_16194.html" class="markup--anchor markup--p-anchor" data-tooltip="http://kb2.adobe.com/cps/161/tn_16194.html" data-tooltip-position="bottom" data-tooltip-type="link">Local Shared Objects</a>)

  + MENU
    + Set classes when execCommand , ie:. when convert an <a> tag to h2 tag add graf--h2 class
    + actions over text LINKS!!

  + DELETE

    + OK ~~fix FF delete , somethimes it don't let delete more paragraphs
      this can be due the mix of @handleCompleteDeletion and @handleNullAnchor functions~

    + handle remove from pre, it set rare span, just remove it
    + clean node when remove one

  + IMAGES:
    + upload complete, add figure and bla bla
    + control arrows, detect selected
      + focus caption
      + mark selected
      + when image is uploaded update blob src to image src
    + handle enter (linebreak) when selected in caption (build new <p>)

  + EMBEDS:
    + OK ~~fix embed captions, they don't load propperly~~
    + OK ~~embed connect with oembed service~~
    + fix navigation arrows when up or down through them
    + embeds:
      + break deletion of paragraph when is after an embed, just set caret on embed
    + pages:
      + OK ~~break deletion of paragraph when is after an embed~~

