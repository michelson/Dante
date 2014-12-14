
#TODO:

  + GENERALS
    + FF in case markup breaks (like linebreak with br or unwraped text when typing) just rewrap from current range.

  + SANITIZE PROCESS

  + MENU
    + Filter inner tags (except a, b, i ... ) when convert to blockquote
    + blockquote works like crap

  + DELETE
    + handle remove from PRE tag, it set rare span, just remove it
    + clean node when remove one
    + don't remove entire graf-image when delete text from caption
    + handle delete from link embeds . when text is empty , remove embed on next del key press.

  + IMAGES:
    + upload, show progress, complete
    + handle enter (linebreak) when selected in caption (build new P)
      + Fix problem in FF when linebreak or arrow down to new P , is typing backwards!! (could be a range 1 char problem ?)

  + EMBEDS:
    + fix navigation arrows when up or down through them
      + problem FF when linebreak or arrow down to new P , is typing backwards!! (could be a range 1 char problem ?)

  + SUBMIT:
    get clean version of content

