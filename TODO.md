
#TODO:

  + GENERALS
    + FF in case markup breaks (like linebreak with br or unwraped text when typing) just rewrap from current range.
    + Check double clicks on first p

  + SANITIZE PROCESS

  + MENU
    + Filter inner tags (except a, b, i ... ) when convert to blockquote
    + OK ~~Relocate menu when exec command~~
    + Quitar las opciones B/i cuando el elemento seleccionado es un header

  + DELETE
    + handle remove from PRE tag, it set rare span, just remove it
    + clean node when remove one

  + IMAGES:
    + upload, show progress, complete
    + mantain image ratio
    + handle enter (linebreak) when selected in caption (build new P)
      + Fix problem in FF when linebreak or arrow down to new P , is typing backwards!! (could be a range 1 char problem ?)

  + EMBEDS:
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


