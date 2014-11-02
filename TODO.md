
#TODO:

  + OK set selected <p> like medium
  + OK shows the + when selected <p> is empty
    + check from key 8
    + check from enter
  + detect enter key between words to split and duplicate tags
  + actions over text
  + OK placeholders for first (empty) node
  + on paste set caret to the last (or first?) element
  + parse existing images or objects
  + handle remove from pre, it set rare span, just remove it
    + clean node when remove one
  + remove inner spans and other shits
  + CLEAN PROCESS:
    + OK WRAP INTO PARAGRAPHS ORPHANS
    + OK convert divs into p
    + OK a,  wrap with p
    + inner images add classes (ie <a target="_blank" href="http://kb2.adobe.com/cps/161/tn_16194.html" data-href="http://kb2.adobe.com/cps/161/tn_16194.html" class="markup--anchor markup--p-anchor" data-tooltip="http://kb2.adobe.com/cps/161/tn_16194.html" data-tooltip-position="bottom" data-tooltip-type="link">Local Shared Objects</a>)

  + IMAGES:
    + upload complete, add figure and bla bla
    + control arrows, detect selected
      + focus caption
      + mark selected
      + when image is uploaded update blob src to image src
    + handle enter (linebreak) when selected in caption (build new <p>)
    + embed connect with oembed service
