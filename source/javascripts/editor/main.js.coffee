window.Editor = {

}

###
#TODO:
+ OK set selected <p> like medium
+ OK shows the + when selected <p> is empty
+ detect enter key between words to split and duplicate tags
+ actions over text
+ placeholders for first (empty) node
+ on paste set caret to the last (or first?) element
###

# make it accessible
window.selection = 0
selected_menu = false
window.current_editor = null

class Editor.MainEditor extends Backbone.View
  el: "#editor"

  events:
    "blur"    : "handleBlur"
    "mouseup" : "handleMouseUp"
    "keydown" : "handleKeyDown"
    "keyup"   : "handleCarriageReturn"
    "paste"   : "handlePaste"
    "destroyed .graf--first" : "handleDeletedContainer"

    #".graf--p focus"   : "handleFocus"

  initialize: (opts = {})=>
    @editor_options = opts
    window.current_editor = @
    #globals for selected text and node
    @current_range = null
    @current_node = null

    if (localStorage.getItem('contenteditable'))
      $(@el).html  localStorage.getItem('contenteditable')

    @store()
    @setupElementsClasses()

    @title_placeholder = "<span class='defaultValue defaultValue--root'>Title…</span><br>"
    @body_placeholder  = "<span class='defaultValue defaultValue--root'>Tell your story…</span><br>"

  store: ()->
    localStorage.setItem("contenteditable", $(@el).html() )
    setTimeout ()=>
      console.log("storing")
      @store()
    , 5000

  template: ()=>
    "<section class='section-content'>
      <div class='section-inner'>
        <p class='graf--h3'>#{@title_placeholder}</p>
        <p class='graf--p'>#{@body_placeholder}<p>
      </div>
    </section>"

  appendMenus: ()=>
    $("<div id='editor-menu' class='editor-menu' style='opacity: 0;'></div>").insertAfter(@el)
    $("<div class='inlineTooltip2 button-scalableGroup is-active'></div>").insertAfter(@el)
    @editor_menu = new Editor.Menu()
    @tooltip_view = new Editor.Tooltip()
    @tooltip_view.render()

  start: ()=>
    @render()
    $(@el).attr("contenteditable", "true")
    $(@el).addClass("postField--body")
    $(@el).wrap("<div class='notesSource'></div>")
    @appendMenus()

  restart: ()=>
    @render()

  render: ()=>
    @template()
    $(@el).html @template()


  handleDeletedContainer: ()->
    #only forefox ctrl+a or select all delete
    alert("deleted")

  getSelectedText: () ->
    text = ""
    if typeof window.getSelection != "undefined"
      text = window.getSelection().toString()
    else if typeof document.selection != "undefined" && document.selection.type == "Text"
      text = document.selection.createRange().text
    text
    #text

  selection: ()=>
    selection
    if (window.getSelection)
      selection = window.getSelection()
    else if (document.selection && document.selection.type != "Control")
      selection = document.selection

  getRange: () ->
    editor = $(@el)[0]
    range = selection && selection.rangeCount && selection.getRangeAt(0)
    range = document.createRange() if (!range)
    if !editor.contains(range.commonAncestorContainer)
      range.selectNodeContents(editor)
      range.collapse(false)
    range

  setRange: (range)->
    range = range || this.current_range
    if !range
      range = this.getRange()
      range.collapse(false); # set to end

    @selection().removeAllRanges()
    @selection().addRange(range)
    @

  getCharacterPrecedingCaret: ->
    precedingChar = ""
    sel = undefined
    range = undefined
    precedingRange = undefined
    if window.getSelection
      sel = window.getSelection()
      if sel.rangeCount > 0
        range = sel.getRangeAt(0).cloneRange()
        range.collapse true
        range.setStart @getNode(), 0
        precedingChar = range.toString().slice(0)
    else if (sel = document.selection) and sel.type isnt "Control"
      range = sel.createRange()
      precedingRange = range.duplicate()
      precedingRange.moveToElementText containerEl
      precedingRange.setEndPoint "EndToStart", range
      precedingChar = precedingRange.text.slice(0)
    precedingChar

  isLastChar: ()->
    $(@getNode()).text().length is @getCharacterPrecedingCaret().length

  #set focus and caret position on element
  setRangeAt: (element)->
    range = document.createRange()
    sel = window.getSelection()

    range.setStart(element, 0);
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
    #@el.focus()
    element.focus()

  focus: (focusStart) ->
    @.setRange() if (!focusStart)
    $(@el).focus()
    @

  #NOT USED
  focusNode: (node, range)->
    range.setStartAfter(node)
    range.setEndBefore(node)
    range.collapse(false)
    @.setRange(range)

  #get the element that wraps Caret position
  getNode: ()->
    node = undefined
    root = $(@el).find(".section-inner")[0]
    range = @selection().getRangeAt(0)
    node = range.commonAncestorContainer
    return null  if not node or node is root
    node = node.parentNode  while node and (node.nodeType isnt 1) and (node.parentNode isnt root)
    node = node.parentNode  while node and (node.parentNode isnt root)
    (if root && root.contains(node) then node else null)

  displayMenu: (sel)->
    #TODO: find out why this isn't propperly positioned the first time
    setTimeout ()=>
      @handleCaret()
      @editor_menu.render()
      @editor_menu.show()
    , 10

  resetOffset: ($textField)=>
    offset = $textField.caret('offset');
    position = $textField.caret('position');
    @resizeBox(offset, position)
    offset

  resizeBox: (offset, position)->
    padd = @editor_menu.$el.width() / 2
    padd = padd + (padd * 0.1)
    top =  offset.top - offset.height - 16
    @editor_menu.$el.offset({left: offset.left - padd, top: top })

  hidePlaceholder: (element)->
    $(element).find("span.defaultValue").remove().html("<br>")
    #element.focus()
    #@setRangeAt(element)


  displayEmptyPlaceholder: (element)->
    $(".graf--first").html(@title_placeholder)
    $(".graf--last").html(@body_placeholder)

  handleBlur: (ev)=>
    #console.log(ev)
    #hide menu only if is not in use
    setTimeout ()=>
      @editor_menu.hide() unless selected_menu
    , 200

    @tooltip_view.hide()
    false

  handleMouseUp: (ev)=>
    anchor_node = @getNode()
    @handleTextSelection(anchor_node)
    console.log anchor_node
    @hidePlaceholder(anchor_node)
    @markAsSelected( anchor_node )


  #get text of selected and displays menu
  handleTextSelection: (anchor_node)->
    @editor_menu.hide()
    text = @getSelectedText()
    unless _.isEmpty text
      @current_range = @getRange()
      @current_node  = anchor_node
      @.displayMenu()

  handleCaret: ()->
    @resetOffset($(@el));

  handleArrow: (ev)=>
    console.log("ENTER ARROWS")
    #console.log @getNode()
    current_node = $(@getNode())
    if current_node
      @markAsSelected( current_node )
      @displayTooltipAt( current_node )

  handlePaste: (ev)=>
    console.log("pasted!")

    setTimeout ()=>
      @aa =  @getNode()
      @setupElementsClasses ()=>
        debugger
        $(@aa).prev('[class^="graf--"]').focus()
    , 20
    #@setupElementsClasses ()=>
    #  $(@el).find(".section-inner").focus()

  ###
  handlepaste: (elem, e) ->
    savedcontent = elem.innerHTML
    console.log("pasted! #{elem.innerHTML}")
    if e and e.clipboardData and e.clipboardData.getData # Webkit - get data from clipboard, put into editdiv, cleanup, then cancel event
      if /text\/html/.test(e.clipboardData.types)
        elem.innerHTML = e.clipboardData.getData("text/html")
      else if /text\/plain/.test(e.clipboardData.types)
        elem.innerHTML = e.clipboardData.getData("text/plain")
      else
        elem.innerHTML = ""
      @waitforpastedata elem, savedcontent
      if e.preventDefault
        e.stopPropagation()
        e.preventDefault()
      false
    else # Everything else - empty editdiv and allow browser to paste content into it, then cleanup
      elem.innerHTML = ""
      @waitforpastedata elem, savedcontent
      true

  waitforpastedata: (elem, savedcontent) ->
    if elem.childNodes and elem.childNodes.length > 0
      @processpaste elem, savedcontent
    else
      that =
        e: elem
        s: savedcontent

      that.callself = =>
        @waitforpastedata that.e, that.s
        return

      setTimeout that.callself, 20
    return

  processpaste: (elem, savedcontent) ->
    pasteddata = elem.innerHTML
    console.log savedcontent
    #^^Alternatively loop through dom (elem.childNodes or elem.getElementsByTagName) here
    elem.innerHTML = savedcontent

    # Do whatever with gathered data;
    alert pasteddata

    #@setupElementsClasses
    #()=>
    #$(@el).focus()

    return
  ###

  #overrides default behavior
  handleKeyDown: (e)->
    #e.preventDefault() if _.contains([13], e.which)

    anchor_node = @getNode() #current node on which cursor is positioned
    #previous_node = anchor_node.previousSibling
    #next_node = anchor_node.nextSibling

    @markAsSelected( anchor_node ) if anchor_node

    #enter key
    if (e.which == 13)
      #removes all childs
      $(@el).find(".is-selected").removeClass("is-selected")

      parent = $(anchor_node)

      #debugger
      console.log @isLastChar()

      #if parent.prop("tagName") != "P"
      #if matches the linebreak match
      if (anchor_node && @editor_menu.lineBreakReg.test(anchor_node.nodeName))
        #new paragraph is it the last character
        if @isLastChar()
          e.preventDefault()
          @handleLineBreakWith("p", parent)
        else
          #@handleLineBreakWith(parent.prop("tagName").toLowerCase(), parent  )
      else if !anchor_node
        console.log "AYAYAY"
        e.preventDefault()
        @handleLineBreakWith("p", parent)

      #@setupElementsClasses()

    #delete key

    if (e.which == 8)
      @tooltip_view.hide()

      if $(anchor_node).text() is ""
        @displayEmptyPlaceholder()
        @position = $(anchor_node).offset()
        setTimeout(
          ()=>
            return unless @position
            @tooltip_view.render()
            @tooltip_view.move(left: @position.left - 60 , top: @position.top - 10 )
        , 200)

      #@setupElementsClasses()

      if !anchor_node
        console.log("preventing now!")
        e.preventDefault()


  handleCarriageReturn: (e , node)->
    @editor_menu.hide() #hides menu just in case

    anchor_node = @getNode() #current node on which cursor is positioned
    #previous_node = anchor_node.previousSibling
    #next_node = anchor_node.nextSibling

    if (e.which == 8)
      console.log "DELETING"
      console.log anchor_node
      console.log $(anchor_node).parent() #if !$(anchor_node).parent()


      if !anchor_node
        console.log("preventing now!")
        e.preventDefault()

      #if there is no anchor and is only a text node
      if !anchor_node or anchor_node.nodeType is 3
        console.log "HADLING TXT NODES"
        e.preventDefault()
        #debugger

        #case when anchor is text and is a previous grap-- class

        if !_.isNull(anchor_node) && $(anchor_node).prev().is('[class^="graf--"]')
          console.log anchor_node.textContent
          console.log $(anchor_node).prev()
          content = anchor_node.textContent
          prev = $(anchor_node).prev()
          prev.append(content)
          console.log("appended content to p")

          return


        existent = $(@el).find('.section-inner').children('[class^="graf--"]').first()
        #when
        if !_.isEmpty(existent)
          #@render()
          console.log "setting new range"
          @setupElementsClasses ()=>
            #new_node = $(@el).find('.section-inner').children().first()
            new_node = $("<p class='graf graf--p graf--empty is-selected'><br/></p>")
            $(@el).find('.section-inner').prepend(new_node)
            console.log("hogi")
            console.log existent
            new_node.focus()
            @setRangeAt(new_node[0])
            @wrapTextNodes()
        else
          console.log "setting existing range"
          console.log existent
          existent.focus()
          @setRangeAt(existent[0])
          #@wrapTextNodes()
        false

      else if !anchor_node

        console.log "HADLING EMPTY NODE"

        existent = $(@el).find('.section-inner').find("p:first")
        console.log(existent)
        if !_.isEmpty(existent)
          @setupElementsClasses ()=>
            existent = $(@el).find('.section-inner').children().first()
            existent.focus()
            @setRangeAt(existent[0])

        false


    #arrows key
    if _.contains([37,38,39,40], e.which)
      @handleArrow(e)

    #@cleanContents()

    #hides or display placeholder
    #debugger
    #if anchor_node and !_.isEmpty $(anchor_node).text()
    #  @hidePlaceholder(anchor_node)


  #TODO: Separate in little functions
  handleLineBreakWith: (element_type, from_element)->
    new_paragraph = $("<#{element_type} class='graf graf--#{element_type} graf--empty is-selected'><br/></#{element_type}>")

    if from_element.parent().is('[class^="graf--"]')
      new_paragraph.insertAfter(from_element.parent())
    else
      new_paragraph.insertAfter(from_element)

    #set caret on new <p>
    @setRangeAt(new_paragraph[0])
    #shows tooltip

    @displayTooltipAt($(new_paragraph))

  #shows the (+) tooltip at current element
  displayTooltipAt: (element)->
    #console.log $(element)
    return if !element
    @tooltip_view.hide()
    return unless _.isEmpty( $(element).text() )
    @position = $(element).offset()
    @tooltip_view.render()
    @tooltip_view.move(left: @position.left - 60 , top: @position.top - 5 )

  #mak the current row as selected
  markAsSelected: (element)->
    $(@el).find(".is-selected").removeClass("is-selected")
    $(element).addClass("is-selected")

  setupElementsClasses: (cb)->
    setTimeout ()=>
      _.each  $(@el).find(".section-inner").children(), (n)->
        name = $(n).prop("tagName").toLowerCase()
        $(n).removeClass().addClass("graf--#{name}")

      childs = $(@el).find(".section-inner").children()
      childs.removeClass("graf--last , graf--first")
      childs.first().addClass("graf--first")
      childs.last().addClass("graf--last")
      #childs.first().addClass("graf--first").attr('data-placeholder', "chualo");
      node = @getNode()
      @cleanContents()
      @markAsSelected( node ) #set selected
      @displayTooltipAt( node )
      cb() if _.isFunction(cb)
    , 200

  cleanContents: ()->
    #TODO: should config tags
    console.log("CLEAN CONTENTS NAW")
    s = new Sanitize
      elements: ['a', 'blockquote', 'b', 'u', 'i' ,  'span', 'pre', 'p', 'h1', 'h2', 'h3']
      attributes:
          '__ALL__': ['class']
          a: ['href', 'title']
      protocols:
          a: { href: ['http', 'https', 'mailto'] }

    console.log "CLEAN HTML"
    $(@el).find('.section-inner').html(s.clean_node( $(@el).find('.section-inner')[0] ))
    #.contents().unwrap()

  getTextNodesIn: (node, includeWhitespaceNodes) ->
    getTextNodes = (node) ->
      if node.nodeType is 3
        textNodes.push node  if includeWhitespaceNodes or not whitespace.test(node.nodeValue)
      else
        i = 0
        len = node.childNodes.length
        while i < len
          getTextNodes node.childNodes[i]
          ++i
      return
    textNodes = []
    whitespace = /^\s*$/
    getTextNodes node
    textNodes

  wrapTextNodes: ()->
    @textnodes = @getTextNodesIn($(@el).find(".section-inner")[0])
    _.each @textnodes.length , (num, index)=>
      if $(@textnodes[i]).parent().is(".section-inner")
        $(@textnodes[i]).wrap("<p>")

class Editor.Menu extends Backbone.View
  el: "#editor-menu"

  events:
    "mousedown i" : "handleClick"
    #"click .editor-icon" : "handleClick"
    "mouseenter" : "handleOver"
    "mouseleave" : "handleOut"

  initialize: (opts={})=>
    @config = opts.buttons || @default_config()

    @commandsReg = {
      block: /^(?:p|h[1-6]|blockquote|pre)$/
      inline: /^(?:bold|italic|underline|insertorderedlist|insertunorderedlist|indent|outdent)$/,
      source: /^(?:insertimage|createlink|unlink)$/
      insert: /^(?:inserthorizontalrule|insert)$/
      wrap: /^(?:code)$/
    }

    @lineBreakReg = /^(?:blockquote|pre|div)$/i;

    @effectNodeReg = /(?:[pubia]|h[1-6]|blockquote|[uo]l|li)/i;

  default_config: ()->
    buttons: [
        'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule',
        'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
      ]

  template: ()=>
    html = ""
    _.each @config.buttons, (item)->
      html += "<i class=\"editor-icon icon-#{item}\" data-action=\"#{item}\"></i>"
    html

  render: ()=>
    $(@el).html(@template())
    @show()
    @delegateEvents()

  handleClick: (ev)->
    element = $(ev.currentTarget)
    name = element.data("action")
    value = $(@el).find("input").val()

    console.log("menu #{name} item clicked!")

    if @commandsReg.block.test(name)
      console.log "block here"
      @commandBlock name
    else if @commandsReg.inline.test(name) or @commandsReg.source.test(name)
      console.log "overall here"
      @commandOverall name, value
    else if @commandsReg.insert.test(name)
      console.log "insert here"
      @commandInsert name
    else if @commandsReg.wrap.test(name)
      console.log "wrap here"
      @commandWrap name
    else
      console.log "can't find command function for name: " + name

    #@cleanContents()
    false

  cleanContents: ()->
    current_editor.cleanContents()

  commandOverall: (cmd, val) ->
    message = " to exec 「" + cmd + "」 command" + ((if val then (" with value: " + val) else ""))
    if document.execCommand(cmd, false, val)
      console.log "success" + message
    else
      console.log "fail" + message, true
    return

  commandInsert: (name) ->
    node = current_editor.current_node
    return  unless node
    current_editor.current_range.selectNode node
    current_editor.current_range.collapse false
    @commandOverall node, name

  commandBlock: (name) ->
    node = current_editor.current_node
    list = @effectNode(current_editor.getNode(node), true)
    name = "p" if list.indexOf(name) isnt -1
    @commandOverall "formatblock", name

  commandWrap: (tag) ->
    node = current_editor.current_node
    val = "<" + tag + ">" + selection + "</" + tag + ">"
    @commandOverall "insertHTML", val

  # node effects
  effectNode: (el, returnAsNodeName) ->
    nodes = []
    el = el or current_editor.$el[0]
    while el isnt current_editor.$el[0]
      nodes.push (if returnAsNodeName then el.nodeName.toLowerCase() else el)  if el.nodeName.match(@effectNodeReg)
      el = el.parentNode
    nodes

  handleOut: ()->
    selected_menu = false

  handleOver: ()->
    selected_menu = true

  show: ()->
    $(@el).css("opacity", 1)
    $(@el).css('visibility', 'visible')

  hide: ()->
    $(@el).css("opacity", 0)
    $(@el).css('visibility', 'hidden')


class Editor.Tooltip extends Backbone.View
  el: ".inlineTooltip2"

  initialize: ()=>
    #console.log $(@el).length

  template: ()->
    '<button class="button button--small button--circle button--neutral button--inlineTooltipControl" title="Add an image, video, embed, or new part" data-action="inline-menu">
        <span class="fa fa-plus"></span>
    </button>'

  render: ()=>
    #console.log @template()
    $(@el).html(@template())
    $(@el).show()

  move: (coords)->
    $(@el).offset(coords)

  hide: ()=>
    $(@el).hide()

