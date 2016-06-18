utils = Dante.utils

class Dante.View.Behavior.List extends Dante.View.Behavior

  # TODO. dry up this!, call constants from @editor
  BACKSPACE  = 8
  TAB        = 9
  ENTER      = 13
  SPACEBAR   = 32
  LEFTARROW  = 37
  UPARROW    = 38
  RIGHTARROW = 39
  DOWNARROW  = 40

  #events:

  initialize: (opts={})->
    @editor = opts.current_editor

  # LIST METHODS

  handleKeyDown: (e, parent)->
    if e.which is ENTER
          #smart list support
      if parent.hasClass("graf--p")
        li = @handleSmartList(parent, e)
        anchor_node = li if li
      else if parent.hasClass("graf--li")
        @handleListLineBreak(parent, e)

    # spacebar
    if (e.which is SPACEBAR)
      utils.log("SPACEBAR")
      if (parent.hasClass("graf--p"))
        @handleSmartList(parent, e)

    if e.which is BACKSPACE
      if(parent.hasClass("graf--li") and @editor.getCharacterPrecedingCaret().length is 0)
        return @.handleListBackspace(parent, e)

  handleKeyUp: (e)->
    anchor_node = @editor.getNode()

    if (_.contains([BACKSPACE, SPACEBAR, ENTER], e.which))
      if $(anchor_node).hasClass("graf--li")
        @editor.removeSpanTag($(anchor_node));

  buildList: ($paragraph, listType, regex)->

    utils.log "LISTIFY PARAGRAPH"

    @editor.removeSpanTag($paragraph);

    content = $paragraph.html().replace(/&nbsp;/g, " ").replace(regex, "")

    switch(listType)
      when "ul" then $list = $("<ul></ul>")
      when "ol" then $list = $("<ol></ol>")
      else return false

    @editor.addClassesToElement($list[0])
    @editor.replaceWith("li", $paragraph)
    $li = @editor.findSelected()

    @editor.setElementName($li[0])

    $li.html(content).wrap($list)

    if($li.find("br").length == 0)
      $li.append("<br/>")

    @editor.setRangeAt($li[0])

    $li[0]

  handleSmartList: ($item, e)->
    utils.log("HANDLE A SMART LIST")
    chars = @editor.getCharacterPrecedingCaret()
    match = chars.match(/^\s*(\-|\*)\s*$/)
    if(match)
      utils.log("CREATING LIST ITEM")
      e.preventDefault()
      regex = new RegExp(/\s*(\-|\*)\s*/)
      $li = @buildList($item, "ul", regex)
    else
      match = chars.match(/^\s*1(\.|\))\s*$/)
      if(match)
        utils.log("CREATING LIST ITEM")
        e.preventDefault()

        regex = new RegExp(/\s*1(\.|\))\s*/)
        $li = @buildList($item, "ol", regex)
    $li

  handleListLineBreak: ($li, e)->
    utils.log("LIST LINE BREAK")
    @editor.tooltip_view.hide()
    $list = $li.parent("ol, ul")
    $paragraph = $("<p></p>")
    utils.log($li.prev());
    if($list.children().length is 1 and $li.text() is "")
      @editor.replaceWith("p", $list)

    else if $li.text() is "" and ($li.next().length isnt 0)
      e.preventDefault()

    else if ($li.next().length is 0)
      if($li.text() is "")
        e.preventDefault()
        utils.log("BREAK FROM LIST")
        $list.after($paragraph)
        $li.addClass("graf--removed").remove()

      else if ($li.prev().length isnt 0 and $li.prev().text() is "" and @getCharacterPrecedingCaret() is "")
        e.preventDefault()
        utils.log("PREV IS EMPTY")
        content = $li.html()
        $list.after($paragraph)
        $li.prev().remove()
        $li.addClass("graf--removed").remove()
        $paragraph.html(content)

    if $list and $list.children().length is 0 then $list.remove()

    utils.log($li);
    if ($li.hasClass("graf--removed"))
      utils.log("ELEMENT REMOVED")
      @editor.addClassesToElement($paragraph[0])
      @editor.setRangeAt($paragraph[0])
      @editor.markAsSelected($paragraph[0])
      @editor.scrollTo($paragraph)

  handleListBackspace: ($li, e)->

    $list = $li.parent("ol, ul")
    utils.log("LIST BACKSPACE")

    if($li.prev().length is 0)
      e.preventDefault()

      $list.before($li)
      content = $li.html()
      @editor.replaceWith("p", $li)
      $paragraph = @editor.findSelected()
      $paragraph.removeClass("graf--empty").html(content).attr("name", utils.generateUniqueName());

      if($list.children().length is 0)
        $list.remove()

      @editor.setupFirstAndLast()
