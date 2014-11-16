
window.Editor = {

}

utils = {}

# make it accessible
window.selection = 0
selected_menu = false
debugMode = true

String.prototype.killWhiteSpace = ()->
  this.replace(/\s/g, '')

String.prototype.reduceWhiteSpace = ()->
  this.replace(/\s+/g, ' ')

utils.log = (message, force) ->
  if (window.debugMode || force)
    #console.log('%cDANTE DEBUGGER: %c' + message, 'font-family:arial,sans-serif;color:#1abf89;line-height:2em;', 'font-family:cursor,monospace;color:#333;');
    #console.log('%cDANTE DEBUGGER: %c', 'font-family:arial,sans-serif;color:#1abf89;line-height:2em;', 'font-family:cursor,monospace;color:#333;');
    console.log( message );

utils.getBase64Image = (img) ->
  canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = img.height
  ctx = canvas.getContext("2d")
  ctx.drawImage img, 0, 0
  dataURL = canvas.toDataURL("image/png")

  # escape data:image prefix
  # dataURL.replace /^data:image\/(png|jpg);base64,/, ""

  # or just return dataURL
  return dataURL

utils.generateUniqueName = ()->
  Math.random().toString(36).slice(8)

#http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
utils.saveSelection = ()->
  if window.getSelection
    sel = window.getSelection()
    if sel.getRangeAt and sel.rangeCount
      ranges = []
      i = 0
      len = sel.rangeCount

      while i < len
        ranges.push sel.getRangeAt(i)
        ++i
      return ranges
  else return document.selection.createRange()  if document.selection and document.selection.createRange
  null

utils.restoreSelection = (savedSel) ->
  if savedSel
    if window.getSelection
      sel = window.getSelection()
      sel.removeAllRanges()
      i = 0
      len = savedSel.length

      while i < len
        sel.addRange savedSel[i]
        ++i
    else savedSel.select()  if document.selection and savedSel.select
  return

utils.getNode = ()->
  range = undefined
  sel = undefined
  container = undefined
  if document.selection and document.selection.createRange

    # IE case
    range = document.selection.createRange()
    range.parentElement()
  else if window.getSelection
    sel = window.getSelection()
    if sel.getRangeAt
      range = sel.getRangeAt(0)  if sel.rangeCount > 0
    else

      # Old WebKit selection object has no getRangeAt, so
      # create a range from other selection properties
      range = document.createRange()
      range.setStart sel.anchorNode, sel.anchorOffset
      range.setEnd sel.focusNode, sel.focusOffset

      # Handle the case when the selection was selected backwards (from the end to the start in the document)
      if range.collapsed isnt sel.isCollapsed
        range.setStart sel.focusNode, sel.focusOffset
        range.setEnd sel.anchorNode, sel.anchorOffset
    if range
      container = range.commonAncestorContainer

      # Check if the container is a text node and return its parent if so
      (if container.nodeType is 3 then container.parentNode else container)

#http://stackoverflow.com/questions/12603397/calculate-width-height-of-the-selected-text-javascript
utils.getSelectionDimensions = ->
  sel = document.selection
  range = undefined
  width = 0
  height = 0
  left = 0
  top = 0
  if sel
    unless sel.type is "Control"
      range = sel.createRange()
      width = range.boundingWidth
      height = range.boundingHeight
  else if window.getSelection
    sel = window.getSelection()
    if sel.rangeCount
      range = sel.getRangeAt(0).cloneRange()
      if range.getBoundingClientRect
        rect = range.getBoundingClientRect()
        width = rect.right - rect.left
        height = rect.bottom - rect.top

  width: width
  height: height
  top: rect.top
  left: rect.left

#http://stackoverflow.com/questions/3972014/get-caret-position-in-contenteditable-div
utils.getCaretPosition = (editableDiv) ->
  caretPos = 0
  containerEl = null
  sel = undefined
  range = undefined
  if window.getSelection
    sel = window.getSelection()
    if sel.rangeCount
      range = sel.getRangeAt(0)
      caretPos = range.endOffset  if range.commonAncestorContainer.parentNode is editableDiv
  else if document.selection and document.selection.createRange
    range = document.selection.createRange()
    if range.parentElement() is editableDiv
      tempEl = document.createElement("span")
      editableDiv.insertBefore tempEl, editableDiv.firstChild
      tempRange = range.duplicate()
      tempRange.moveToElementText tempEl
      tempRange.setEndPoint "EndToEnd", range
      caretPos = tempRange.text.length
  caretPos

#http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
utils.isElementInViewport = (el) ->
  #special bonus for those using jQuery
  el = el[0]  if typeof jQuery is "function" and el instanceof jQuery
  rect = el.getBoundingClientRect()
  #or $(window).height()
  rect.top >= 0 and rect.left >= 0 and rect.bottom <= (window.innerHeight or document.documentElement.clientHeight) and rect.right <= (window.innerWidth or document.documentElement.clientWidth) #or $(window).width()

#http://brianmhunt.github.io/articles/taming-contenteditable/

LINE_HEIGHT = 20

is_caret_at_start_of_node = (node, range) ->
  # See: http://stackoverflow.com/questions/7451468
  pre_range = document.createRange()
  pre_range.selectNodeContents(node)
  pre_range.setEnd(range.startContainer, range.startOffset)
  return pre_range.toString().trim().length == 0

is_caret_at_end_of_node = (node, range) ->
  post_range = document.createRange()
  post_range.selectNodeContents(node)
  post_range.setStart(range.endContainer, range.endOffset)
  return post_range.toString().trim().length == 0

$.fn.editableIsCaret = ->
  return window.getSelection().type == 'Caret'
  # alt test:
  # return sel.rangeCount == 1 and sel.getRangeAt(0).collapsed

$.fn.editableRange = ->
  # Return the range for the selection
  sel = window.getSelection()
  return unless sel.rangeCount > 0
  return sel.getRangeAt(0)

$.fn.editableCaretRange = ->
  return unless @editableIsCaret()
  return @editableRange()

$.fn.editableSetRange = (range) ->
  sel = window.getSelection()
  sel.removeAllRanges() if sel.rangeCount > 0
  sel.addRange(range)

$.fn.editableFocus = (at_start=true) ->
  return unless @attr('contenteditable')
  sel = window.getSelection()
  sel.removeAllRanges() if sel.rangeCount > 0
  range = document.createRange()
  range.selectNodeContents(@[0])
  range.collapse(at_start)
  sel.addRange(range)

$.fn.editableCaretAtStart = ->
  range = @editableRange()
  return false unless range
  return is_caret_at_start_of_node(@[0], range)

$.fn.editableCaretAtEnd = ->
  range = @editableRange()
  return false unless range
  return is_caret_at_end_of_node(@[0], range)

$.fn.editableCaretOnFirstLine = ->
  range = @editableRange()
  return false unless range
  # At the start of a node, the getClientRects() is [], so we have to
  # use the getBoundingClientRect (which seems to work).
  if is_caret_at_start_of_node(@[0], range)
    return true
  else if is_caret_at_end_of_node(@[0], range)
    ctop = @[0].getBoundingClientRect().bottom - LINE_HEIGHT
  else
    ctop = range.getClientRects()[0].top
  etop = @[0].getBoundingClientRect().top
  return ctop < etop + LINE_HEIGHT

$.fn.editableCaretOnLastLine = ->
  range = @editableRange()
  return false unless range
  if is_caret_at_end_of_node(@[0], range)
    return true
  else if is_caret_at_start_of_node(@[0], range)
    # We are on the first line.
    cbtm = @[0].getBoundingClientRect().top + LINE_HEIGHT
  else
    cbtm = range.getClientRects()[0].bottom
  ebtm = @[0].getBoundingClientRect().bottom
  return cbtm > ebtm - LINE_HEIGHT

$.fn.exists = ->
  @.length > 0

Editor.utils = utils

window.utils = utils

class Dante.Editor extends Dante.View
  #el: "#editor"

  events:
    "blur"    : "handleBlur"
    "mouseup" : "handleMouseUp"
    "keydown" : "handleKeyDown"
    "keyup"   : "handleKeyUp"
    "paste"   : "handlePaste"
    "click .graf--figure" : "handleGrafFigureSelect"

  initialize: (opts = {})=>
    @editor_options = opts
    #globals for selected text and node
    @initial_html = $(@el).html()
    @current_range = null
    @current_node = null
    @el = opts.el || "#editor"
    window.debugMode = opts.debug || false
    $(@el).addClass("debug") if window.debugMode
    @upload_url  = opts.upload_url  || "/images.json"
    @oembed_url  = opts.oembed_url  || "http://api.embed.ly/1/oembed?url="
    @extract_url = opts.extract_url || "http://api.embed.ly/1/extract?key=86c28a410a104c8bb58848733c82f840&url="
    @default_loading_placeholder = opts.default_loading_placeholder || "/images/media-loading-placeholder.png"
    if (localStorage.getItem('contenteditable'))
      $(@el).html  localStorage.getItem('contenteditable')

    @store()

    @title_placeholder    = "<span class='defaultValue defaultValue--root'>Title…</span><br>"
    @body_placeholder     = "<span class='defaultValue defaultValue--root'>Tell your story…</span><br>"
    @embed_placeholder    = "<span class='defaultValue defaultValue--prompt'>Paste a YouTube, Vine, Vimeo, or other video link, and press Enter</span><br>"
    @extract_placeholder  = "<span class='defaultValue defaultValue--prompt'>Paste a link to embed content from another site (e.g. Twitter) and press Enter</span><br>"

  store: ()->
    localStorage.setItem("contenteditable", $(@el).html() )
    setTimeout ()=>
      #utils.log("storing")
      #@store()
      1 + 1
    , 5000

  template: ()=>
    "<section class='section--first section--last'>

      <div class='section-divider layoutSingleColumn'>
        <hr class='section-divider'>
      </div>

      <div class='section-content'>
        <div class='section-inner'>
          <p class='graf graf--h3'>#{@title_placeholder}</p>
          <p class='graf graf--p'>#{@body_placeholder}<p>
        </div>
      </div>

    </section>"

  baseParagraphTmpl: ()->
    "<p class='graf--p' name='#{utils.generateUniqueName()}'><br></p>"

  appendMenus: ()=>
    $("<div id='dante-menu' class='dante-menu' style='opacity: 0;'></div>").insertAfter(@el)
    $("<div class='inlineTooltip2 button-scalableGroup'></div>").insertAfter(@el)
    @editor_menu = new Dante.Editor.Menu(editor: @)
    @tooltip_view = new Dante.Editor.Tooltip(editor: @)
    @tooltip_view.render()

  appendInitialContent: ()=>
    $(@el).find(".section-inner").html(@initial_html)

  start: ()=>
    @render()
    $(@el).attr("contenteditable", "true")
    $(@el).addClass("postField--body")
    $(@el).wrap("<div class='notesSource'></div>")
    @appendMenus()
    @appendInitialContent() unless _.isEmpty @initial_html.trim()
    @setupElementsClasses()

  restart: ()=>
    @render()

  render: ()=>
    @template()
    $(@el).html @template()

  getSelectedText: () ->
    text = ""
    if typeof window.getSelection != "undefined"
      text = window.getSelection().toString()
    else if typeof document.selection != "undefined" && document.selection.type == "Text"
      text = document.selection.createRange().text
    text

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
    #utils.log "#{$(@getNode()).text().trim().length} | #{@getCharacterPrecedingCaret().trim().length}"
    $(@getNode()).text().trim().length is @getCharacterPrecedingCaret().trim().length

  isFirstChar: ()->
    @getCharacterPrecedingCaret().trim().length is 0

  isSelectingAll: (element)->
    a = @getSelectedText().killWhiteSpace().length
    b = $(element).text().killWhiteSpace().length
    a is b

  #set focus and caret position on element
  setRangeAt: (element, int=0)->
    range = document.createRange()
    sel = window.getSelection()
    #node = element.firstChild;
    range.setStart(element, int); #DANGER this is supported by IE 9
    #range.setStartAfter(element)
    #range.setEnd(element, int);
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
    #@el.focus()
    element.focus()

  #set focus and caret position on element
  setRangeAtText: (element, int=0)->
    range = document.createRange()
    sel = window.getSelection()
    node = element.firstChild;
    range.setStart(node, 0); #DANGER this is supported by IE 9
    range.setEnd(node, 0);
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
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

  #get the element that wraps Caret position while is inside section
  getNode: ()->
    node = undefined
    root = $(@el).find(".section-inner")[0]
    return if @selection().rangeCount < 1
    range = @selection().getRangeAt(0)
    node = range.commonAncestorContainer
    return null  if not node or node is root
    node = node.parentNode  while node and (node.nodeType isnt 1) and (node.parentNode isnt root)
    node = node.parentNode  while node and (node.parentNode isnt root)
    (if root && root.contains(node) then node else null)

  displayMenu: (sel)->
    setTimeout ()=>
      @editor_menu.render()
      pos = utils.getSelectionDimensions()
      @relocateMenu(pos)
      @editor_menu.show()
    , 10

  #get text of selected and displays menu
  handleTextSelection: (anchor_node)->
    @editor_menu.hide()
    text = @getSelectedText()
    unless _.isEmpty text.trim()
      #@current_range = @getRange()
      @current_node  = anchor_node
      @.displayMenu()

  relocateMenu: (position)->
    padd = @editor_menu.$el.width() / 2
    top = position.top + $(window).scrollTop() - 43
    l = position.left + (position.width / 2) - padd
    @editor_menu.$el.offset({left: l , top: top  })

  hidePlaceholder: (element)->
    $(element).find("span.defaultValue").remove().html("<br>")

  displayEmptyPlaceholder: (element)->
    $(".graf--first").html(@title_placeholder)
    $(".graf--last").html(@body_placeholder)

  handleGrafFigureSelect: (ev)->
    element = ev.currentTarget
    @markAsSelected( element )
    @setRangeAt( $(element).find('.imageCaption')[0] )

  handleBlur: (ev)=>
    #hide menu only if is not in use
    setTimeout ()=>
      @editor_menu.hide() unless selected_menu
    , 200
    false

  handleMouseUp: (ev)=>
    utils.log "MOUSE UP"
    anchor_node = @getNode()
    utils.log anchor_node
    utils.log ev.currentTarget
    return if _.isNull(anchor_node)
    @handleTextSelection(anchor_node)
    @hidePlaceholder(anchor_node)
    @markAsSelected( anchor_node )
    @displayTooltipAt( anchor_node )

  scrollTo: (node)->
    return if utils.isElementInViewport($(node))

    top = node.offset().top
    #scroll to element top
    $('html, body').animate
      scrollTop: top
    , 20

  #handle arrow direction from keyUp.
  handleArrow: (ev)=>
    current_node = $(@getNode())
    if current_node
      @markAsSelected( current_node )
      @displayTooltipAt( current_node )

  #handle arrow direction from keyDown.
  handleArrowForKeyDown: (ev)=>
    current_node = $(@getNode())
    utils.log(ev)
    ev_type = ev.originalEvent.key || ev.originalEvent.keyIdentifier

    utils.log("ENTER ARROW for key #{ev_type}")

    #handle keys for image figure
    switch ev_type

      when "Down"
        next_node = current_node.next()
        utils.log "NEXT NODE IS #{next_node.attr('class')}"
        utils.log "CURRENT NODE IS #{current_node.attr('class')}"

        return unless $(current_node).hasClass("graf")
        return unless $(current_node).editableCaretOnLastLine()

        utils.log "ENTER ARROW PASSED RETURNS"

        #if next element is embed select & focus it
        if next_node.hasClass("graf--figure")
          n = next_node.find(".imageCaption")
          @setRangeAt n[0]
          @scrollTo(n)
          utils.log "1 down"
          utils.log n[0]
          next_node.addClass("is-mediaFocused is-selected")
          return false
        #if current node is embed
        else if next_node.hasClass("graf--mixtapeEmbed")
          n = current_node.next(".graf--mixtapeEmbed")
          num = n[0].childNodes.length
          @setRangeAt n[0], num
          @scrollTo(n)
          utils.log "2 down"
          return false

        if current_node.hasClass("graf--figure") && next_node.hasClass("graf")
          @setRangeAt next_node[0]
          @scrollTo(next_node)
          utils.log "3 down"
          return false

        ###
        else if next_node.hasClass("graf")
          n = current_node.next(".graf")
          @setRangeAt n[0]
          @scrollTo(n)
          false
        ###

      when "Up"
        prev_node = current_node.prev()
        utils.log "PREV NODE IS #{prev_node.attr('class')}"
        utils.log "CURRENT NODE IS up #{current_node.attr('class')}"

        return unless $(current_node).hasClass("graf")
        return unless $(current_node).editableCaretOnFirstLine()

        utils.log "ENTER ARROW PASSED RETURNS"

        if prev_node.hasClass("graf--figure")
          utils.log "1 up"
          n = prev_node.find(".imageCaption")
          @setRangeAt n[0]
          @scrollTo(n)
          prev_node.addClass("is-mediaFocused is-selected")
          return false

        else if prev_node.hasClass("graf--mixtapeEmbed")
          n = current_node.prev(".graf--mixtapeEmbed")
          num = n[0].childNodes.length
          @setRangeAt n[0], num
          @scrollTo(n)
          utils.log "2 up"
          return false

        if current_node.hasClass("graf--figure") && prev_node.hasClass("graf")
          @setRangeAt prev_node[0]
          @scrollTo(prev_node)
          utils.log "3 up"
          return false

        else if prev_node.hasClass("graf")
          n = current_node.prev(".graf")
          num = n[0].childNodes.length
          @setRangeAt n[0], num
          @scrollTo(n)
          utils.log "4 up"
          return false

        utils.log "noting"

  #detects html data , creates a hidden node to paste ,
  #then clean up the content and copies to currentNode, very clever uh?
  handlePaste: (ev)=>
    utils.log("pasted!")
    @aa =  @getNode()

    pastedText = undefined
    if (window.clipboardData && window.clipboardData.getData) #IE
      pastedText = window.clipboardData.getData('Text')
    else if (ev.originalEvent.clipboardData && ev.originalEvent.clipboardData.getData)
      cbd = ev.originalEvent.clipboardData
      pastedText = if _.isEmpty(cbd.getData('text/html')) then cbd.getData('text/plain') else cbd.getData('text/html')

    #alert(pastedText) # Process and handle text...
    #detect if is html
    if pastedText.match(/<\/*[a-z][^>]+?>/gi)
      utils.log("HTML DETECTED ON PASTE")
      $(pastedText)

      document.body.appendChild($("<div id='paste'></div>")[0])
      $("#paste").html(pastedText)
      @setupElementsClasses $("#paste"), ()=>
        nodes = $($("#paste").html()).insertAfter($(@aa))
        $("#paste").remove()
        #set caret on newly created node
        last_node = nodes.last()[0]
        num = last_node.childNodes.length
        @setRangeAt(last_node, num)
        new_node = $(@getNode())
        top = new_node.offset().top
        @markAsSelected(new_node)
        @displayTooltipAt($(@el).find(".is-selected"))
        #scroll to element top
        @handleUnwrappedImages(nodes)
        $('html, body').animate
          scrollTop: top
        , 200

      return false # Prevent the default handler from running.

  handleUnwrappedImages: (elements)->
    #http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
    _.each elements.find("img"), (image)=>
      utils.log ("process image here!")
      @tooltip_view.uploadExistentImage(image)

  #TODO: remove this, not used
  handleInmediateDeletion: (element)->
    @inmediateDeletion = false
    new_node = $( @baseParagraphTmpl() ).insertBefore( $(element) )
    new_node.addClass("is-selected")
    @setRangeAt($(element).prev()[0])
    $(element).remove()

  #TODO: not used anymore, remove this
  #when found that the current node is text node
  #create a new <p> and focus
  handleUnwrappedNode: (element)->
    tmpl = $(@baseParagraphTmpl())
    @setElementName(tmpl)
    $(element).wrap(tmpl)
    new_node = $("[name='#{tmpl.attr('name')}']")
    new_node.addClass("is-selected")
    @setRangeAt(new_node[0])
    return false

  ###
  This is a rare hack only for FF (I hope),
  when there is no range it creates a new element as a placeholder,
  then finds previous element from that placeholder,
  then it focus the prev and removes the placeholder.
  a nasty nasty one...
  ###
  handleNullAnchor: ()->
    utils.log "WARNING! this is an empty node"
    sel = @selection();

    if (sel.isCollapsed && sel.rangeCount > 0)
      range = sel.getRangeAt(0)
      span = $( @baseParagraphTmpl())[0]
      range.insertNode(span)
      range.setStart(span, 0)
      range.setEnd(span, 0)
      sel.removeAllRanges()
      sel.addRange(range)

      node = $(range.commonAncestorContainer)
      prev = node.prev()
      num = prev[0].childNodes.length
      utils.log prev
      if prev.hasClass("graf")
        @setRangeAt(prev[0], num)
        node.remove()
        @markAsSelected(@getNode())
      else if prev.hasClass("graf--mixtapeEmbed")
        @setRangeAt(prev[0], num)
        node.remove()
        @markAsSelected(@getNode())
      else if !prev
        @.setRangeAt(@.$el.find(".section-inner p")[0])

      @displayTooltipAt($(@el).find(".is-selected"))

  #used when all the content is removed, then it re render
  handleCompleteDeletion: (element)->
    if _.isEmpty( $(element).text().trim() )
      utils.log "HANDLE COMPLETE DELETION"
      @selection().removeAllRanges()
      @render()

      setTimeout =>
        @setRangeAt($(@el).find(".section-inner p")[0])
      , 20
      @completeDeletion = true

  #handles tab navigation
  handleTab: (anchor_node)->
    utils.log "HANDLE TAB"
    classes = ".graf, .graf--mixtapeEmbed, .graf--figure, .graf--figure"
    next = $(anchor_node).next(classes)

    if $(next).hasClass("graf--figure")
      next = $(next).find("figcaption")
      @setRangeAt next[0]
      @markAsSelected $(next).parent(".graf--figure")
      @displayTooltipAt next
      @scrollTo $(next)
      return false

    if _.isEmpty(next) or _.isUndefined(next[0])
      next = $(".graf:first")

    @setRangeAt next[0]
    @markAsSelected next
    @displayTooltipAt next
    @scrollTo $(next)

  handleKeyDown: (e)->
    utils.log "KEYDOWN"

    anchor_node = @getNode() #current node on which cursor is positioned

    @markAsSelected( anchor_node ) if anchor_node

    if e.which is 9

      @handleTab(anchor_node)
      return false

    if e.which == 13

      #removes previous selected nodes
      $(@el).find(".is-selected").removeClass("is-selected")

      parent = $(anchor_node)

      utils.log @isLastChar()

      #embeds or extracts
      if parent.hasClass("is-embedable")
        @tooltip_view.getEmbedFromNode($(anchor_node))
      else if parent.hasClass("is-extractable")
        @tooltip_view.getExtractFromNode($(anchor_node))


      #supress linebreak into embed page text unless last char
      if parent.hasClass("graf--mixtapeEmbed") or parent.hasClass("graf--iframe") or parent.hasClass("graf--figure")
        utils.log("supress linebreak from embed !(last char)")
        return false unless @isLastChar()

      #supress linebreak or create new <p> into embed caption unless last char el
      if parent.hasClass("graf--iframe") or parent.hasClass("graf--figure")
        if @isLastChar()
          @handleLineBreakWith("p", parent)
          @setRangeAtText($(".is-selected")[0])

          $(".is-selected").trigger("mouseup") #is not making any change
          return false
        else
          return false

      @tooltip_view.cleanOperationClasses($(anchor_node))


      if (anchor_node && @editor_menu.lineBreakReg.test(anchor_node.nodeName))
        #new paragraph if it the last character
        if @isLastChar()
          utils.log "new paragraph if it the last character"
          e.preventDefault()
          @handleLineBreakWith("p", parent)

      setTimeout ()=>
        node = @getNode()
        @markAsSelected( @getNode() ) #if anchor_node
        @setupFirstAndLast()
        #set name on new element
        @setElementName($(node))

        #empty childs if text is empty
        if _.isEmpty $(node).text().trim()
          _.each $(node).children(), (n)->
            $(n).remove()
          $(node).append("<br>")

        #shows tooltip
        @displayTooltipAt($(@el).find(".is-selected"))
      , 2


    #delete key
    if (e.which == 8)
      @tooltip_view.hide()
      utils.log("removing from down")
      utils.log "REACHED TOP" if @reachedTop
      return false if @prevented or @reachedTop && @isFirstChar()
      #return false if !anchor_node or anchor_node.nodeType is 3
      utils.log("pass initial validations")
      anchor_node = @getNode()
      utils.log "anchor_node"
      utils.log anchor_node
      utils.log "UTILS anchor_node"
      utils_anchor_node = utils.getNode()
      utils.log utils_anchor_node

      if $(utils_anchor_node).hasClass("section-content") || $(utils_anchor_node).hasClass("graf--first")
        utils.log "SECTION DETECTED FROM KEYDOWN #{_.isEmpty($(utils_anchor_node).text())}"
        return false if _.isEmpty($(utils_anchor_node).text())

      if anchor_node && anchor_node.nodeType is 3
        #@displayEmptyPlaceholder()
        utils.log("TextNode detected from Down!")
        #return false

      #supress del into embed if first char or delete if empty content
      if $(anchor_node).hasClass("graf--mixtapeEmbed") or $(anchor_node).hasClass("graf--iframe")
        if _.isEmpty $(anchor_node).text().trim()
          utils.log "EMPTY CHAR"
          return false
        else
          if @isFirstChar()
            utils.log "FIRST CHAR"
            @inmediateDeletion = true if @isSelectingAll(anchor_node)
            return false

      #TODO: supress del when the prev el is embed and current_node is at first char
      if $(anchor_node).prev().hasClass("graf--mixtapeEmbed")
        return false if @isFirstChar() && !_.isEmpty( $(anchor_node).text().trim() )

    #arrows key
    #if _.contains([37,38,39,40], e.which)
    #up & down
    if _.contains([38, 40], e.which)
      utils.log e.which
      @handleArrowForKeyDown(e)
      #return false

  handleKeyUp: (e , node)->
    utils.log "KEYUP"

    @editor_menu.hide() #hides menu just in case
    @reachedTop = false
    anchor_node = @getNode() #current node on which cursor is positioned
    utils_anchor_node = utils.getNode()

    @handleTextSelection(anchor_node)

    if (e.which == 8)

      #if detect all text deleted , re render
      if $(utils_anchor_node).hasClass("postField--body")
        utils.log "ALL GONE from UP"
        @handleCompleteDeletion($(@el))
        if @completeDeletion
          @completeDeletion = false
          return false

      if $(utils_anchor_node).hasClass("section-content") || $(utils_anchor_node).hasClass("graf--first")
        utils.log "SECTION DETECTED FROM KEYUP #{_.isEmpty($(utils_anchor_node).text())}"
        return false if _.isEmpty($(utils_anchor_node).text())

      if _.isNull(anchor_node)
        @handleNullAnchor()
        return false

      if $(anchor_node).hasClass("graf--first")
        utils.log "THE FIRST ONE! UP"
        @markAsSelected(anchor_node)
        @setupFirstAndLast()
        false

      if anchor_node
        @markAsSelected(anchor_node)
        @setupFirstAndLast()
        @displayTooltipAt($(@el).find(".is-selected"))

    #arrows key
    if _.contains([37,38,39,40], e.which)
      @handleArrow(e)
      #return false

  #TODO: Separate in little functions
  handleLineBreakWith: (element_type, from_element)->
    new_paragraph = $("<#{element_type} class='graf graf--#{element_type} graf--empty is-selected'><br/></#{element_type}>")
    if from_element.parent().is('[class^="graf--"]')
      new_paragraph.insertAfter(from_element.parent())
    else
      new_paragraph.insertAfter(from_element)
    #set caret on new <p>
    @setRangeAt(new_paragraph[0])

  #shows the (+) tooltip at current element
  displayTooltipAt: (element)->
    utils.log ("POSITION FOR TOOLTIP")
    #utils.log $(element)
    return if !element
    @tooltip_view.hide()
    return unless _.isEmpty( $(element).text() )
    @position = $(element).offset()
    @tooltip_view.render()
    @tooltip_view.move(left: @position.left - 60 , top: @position.top - 5 )

  #mark the current row as selected
  markAsSelected: (element)->

    return if _.isUndefined element

    $(@el).find(".is-selected").removeClass("is-mediaFocused is-selected")
    $(element).addClass("is-selected")

    if $(element).prop("tagName").toLowerCase() is "figure"
      $(element).addClass("is-mediaFocused")

    $(element).find(".defaultValue").remove()
    #set reached top if element is first!
    if $(element).hasClass("graf--first")
      @reachedTop = true
      $(element).append("<br>") if $(element).find("br").length is 0

  addClassesToElement: (element)=>
    n = element
    name = $(n).prop("tagName").toLowerCase()
    switch name
      when "p", "h2", "h3", "pre", "div"
        #utils.log n
        unless $(n).hasClass("graf--mixtapeEmbed")
          $(n).removeClass().addClass("graf graf--#{name}")

        if name is "p" and $(n).find("br").length is 0
          $(n).append("<br>")

      when "code"
        #utils.log n
        $(n).unwrap().wrap("<p class='graf graf--pre'></p>")
        n = $(n).parent()

      when "ol", "ul"
        #utils.log "lists"
        $(n).removeClass().addClass("postList")
        _.each $(n).find("li"), (li)->
          $(n).removeClass().addClass("graf graf--li")
        #postList , and li as graf

      when "img"
        utils.log "images"
        #@handleUnwrappedImages(n)
        #@handleUnwrappedImages(nodes)
        @tooltip_view.uploadExistentImage(n)
        #set figure non editable

      when "a", 'strong', 'em', 'br', 'b', 'u', 'i'
        utils.log "links"
        $(n).wrap("<p class='graf graf--#{name}'></p>")
        n = $(n).parent()
        #dont know

      when "blockquote"
        #TODO remove inner elements like P
        #$(n).find("p").unwrap()
        n = $(n).removeClass().addClass("graf graf--#{name}")

      else
        #TODO: for now leave this relaxed, because this is
        #overwriting embeds
        #wrap all the rest
        $(n).wrap("<p class='graf graf--#{name}'></p>")
        n = $(n).parent()

    return n

  setupElementsClasses: (element, cb)->
    if _.isUndefined(element)
      @element = $(@el).find('.section-inner')
    else
      @element = element

    setTimeout ()=>
      #clean context and wrap text nodes
      @cleanContents(@element)
      @wrapTextNodes(@element)
      #setup classes
      _.each  @element.children(), (n)=>
        name = $(n).prop("tagName").toLowerCase()
        n = @addClassesToElement(n)

        @setElementName(n)

      @setupLinks(@element.find("a"))
      @setupFirstAndLast()

      cb() if _.isFunction(cb)
    , 20

  cleanContents: (element)->
    #TODO: should config tags
    if _.isUndefined(element)
      @element = $(@el).find('.section-inner')
    else
      @element = element

    s = new Sanitize
      elements: ['strong','img', 'em', 'br', 'a', 'blockquote', 'b', 'u', 'i', 'pre', 'p', 'h2', 'h3']

      attributes:
        '__ALL__': ['class']
        a: ['href', 'title', 'target']
        img: ['src']

      protocols:
        a: { href: ['http', 'https', 'mailto'] }

      transformers: [(input)->
                      if (input.node_name == "span" && $(input.node).hasClass("defaultValue") )
                        return whitelist_nodes: [input.node]
                      else
                        return null
                    (input)->
                      #page embeds
                      if(input.node_name == 'div' && $(input.node).hasClass("graf--mixtapeEmbed") )
                        return whitelist_nodes: [input.node]
                      else if(input.node_name == 'a' && $(input.node).parent(".graf--mixtapeEmbed").exists() )
                        return attr_whitelist: ["style"]
                      else
                        return null
                    ,
                    (input)->
                      #embeds
                      if( input.node_name == 'figure' && $(input.node).hasClass("graf--iframe") )
                        return whitelist_nodes: [input.node]
                      else if(input.node_name == 'div' && $(input.node).hasClass("iframeContainer") && $(input.node).parent(".graf--iframe").exists() )
                        return whitelist_nodes: [input.node]
                      else if(input.node_name == 'iframe' && $(input.node).parent(".iframeContainer").exists() )
                        return whitelist_nodes: [input.node]
                      else if(input.node_name == 'figcaption' && $(input.node).parent(".graf--iframe").exists() )
                        return whitelist_nodes: [input.node]
                      else
                        return null
                    ,
                    (input)->
                      #image embeds
                      if(input.node_name == 'figure' && $(input.node).hasClass("graf--figure") )
                        return whitelist_nodes: [input.node]

                      else if(input.node_name == 'div' && ($(input.node).hasClass("aspect-ratio-fill") || $(input.node).hasClass("aspectRatioPlaceholder")) && $(input.node).parent(".graf--figure").exists() )
                        return whitelist_nodes: [input.node]

                      else if(input.node_name == 'img' && $(input.node).parent(".graf--figure").exists() )
                        return whitelist_nodes: [input.node]

                      else if(input.node_name == 'a' && $(input.node).parent(".graf--mixtapeEmbed").exists() )
                        return attr_whitelist: ["style"]

                      else if(input.node_name == 'span' && $(input.node).parent(".imageCaption").exists())
                        return whitelist_nodes: [input.node]
                      else
                        return null
                    ]

    if @element.exists()
      utils.log "CLEAN HTML"
      @element.html(s.clean_node( @element[0] ))

  setupLinks: (elems)->
    _.each elems, (n)=>
      @setupLink(n)

  setupLink: (n)->
    parent_name = $(n).parent().prop("tagName").toLowerCase()
    $(n).addClass("markup--anchor markup--#{parent_name}-anchor")
    href = $(n).attr("href")
    $(n).attr("data-href", href)

  preCleanNode: (element)->
    s = new Sanitize
      elements: ['strong', 'em', 'br', 'a', 'b', 'u', 'i']

      attributes:
        a: ['href', 'title', 'target']

      protocols:
        a: { href: ['http', 'https', 'mailto'] }

    $(element).html s.clean_node( element[0] )

    element = @addClassesToElement( $(element)[0] )

    $(element)

  setupFirstAndLast: ()=>
    childs = $(@el).find(".section-inner").children()
    childs.removeClass("graf--last , graf--first")
    childs.first().addClass("graf--first")
    childs.last().addClass("graf--last")

  wrapTextNodes: (element)->
    if _.isUndefined(element)
      element = $(@el).find('.section-inner')
    else
      element = element

    element.contents().filter(->
      @nodeType is 3 and @data.trim().length > 0
    ).wrap "<p class='graf grap--p'></p>"

  setElementName: (element)->
    $(element).attr("name", utils.generateUniqueName())

class Dante.Editor.Menu extends Dante.View
  el: "#dante-menu"

  events:
    "mousedown i" : "handleClick"
    #"click .dante-icon" : "handleClick"
    "mouseenter" : "handleOver"
    "mouseleave" : "handleOut"
    "keypress input": "handleInputEnter"

  initialize: (opts={})=>
    @config = opts.buttons || @default_config()
    @current_editor = opts.editor

    @commandsReg = {
      block: /^(?:p|h[1-6]|blockquote|pre)$/
      inline: /^(?:bold|italic|underline|insertorderedlist|insertunorderedlist|indent|outdent)$/,
      source: /^(?:insertimage|createlink|unlink)$/
      insert: /^(?:inserthorizontalrule|insert)$/
      wrap: /^(?:code)$/
    }

    @lineBreakReg = /^(?:blockquote|pre|div|p)$/i;

    @effectNodeReg = /(?:[pubia]|h[1-6]|blockquote|[uo]l|li)/i;

    @strReg =
      whiteSpace: /(^\s+)|(\s+$)/g,
      mailTo: /^(?!mailto:|.+\/|.+#|.+\?)(.*@.*\..+)$/,
      http: /^(?!\w+?:\/\/|mailto:|\/|\.\/|\?|#)(.*)$/

  default_config: ()->
    ###
    buttons: [
        'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule',
        'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
      ]
    ###

    buttons: ['blockquote', 'h2', 'h3', 'bold', 'italic', 'createlink']

  template: ()=>
    html = "<input class='dante-input' placeholder='http://' style='display: none;'>"
    _.each @config.buttons, (item)->
      html += "<i class=\"dante-icon icon-#{item}\" data-action=\"#{item}\"></i>"
    html

  render: ()=>
    $(@el).html(@template())
    @show()
    #@delegateEvents()

  handleClick: (ev)->
    element = $(ev.currentTarget)
    action = element.data("action")
    input = $(@el).find("input.dante-input")
    utils.log("menu #{action} item clicked!")
    @savedSel = utils.saveSelection()

    if /(?:createlink)/.test(action)
      input.show()
      input.focus()
    else
      @menuApply action

    return false

  handleInputEnter: (e)=>
    if (e.which is 13)
      utils.restoreSelection(@savedSel)
      return @createlink( $(e.target) )

  createlink: (input) =>
    input.hide()
    if input.val()
      inputValue = input.val()
      .replace(@strReg.whiteSpace, "")
      .replace(@strReg.mailTo, "mailto:$1")
      .replace(@strReg.http, "http://$1")
      return @menuApply("createlink", inputValue)
    action = "unlink"
    @menuApply action

  menuApply: (action, value)->

    if @commandsReg.block.test(action)
      utils.log "block here"
      @commandBlock action
    else if @commandsReg.inline.test(action) or @commandsReg.source.test(action)
      utils.log "overall here"
      @commandOverall action, value
    else if @commandsReg.insert.test(action)
      utils.log "insert here"
      @commandInsert action
    else if @commandsReg.wrap.test(action)
      utils.log "wrap here"
      @commandWrap action
    else
      utils.log "can't find command function for action: " + action

    return false

  setupInsertedElement: (element)->
    n = @current_editor.addClassesToElement(element)
    @current_editor.setElementName(n)
    @current_editor.markAsSelected(n)

  cleanContents: ()->
    @current_editor.cleanContents()

  commandOverall: (cmd, val) ->
    message = " to exec 「" + cmd + "」 command" + ((if val then (" with value: " + val) else ""))

    if document.execCommand(cmd, false, val)
      utils.log "success" + message
      n = @current_editor.getNode()
      @current_editor.setupLinks($(n).find("a"))
      @displayHighlights()
    else
      utils.log "fail" + message, true
    return

  commandInsert: (name) ->
    node = @current_editor.current_node
    return unless node
    @current_editor.current_range.selectNode node
    @current_editor.current_range.collapse false
    @commandOverall node, name

  commandBlock: (name) ->
    node = @current_editor.current_node
    list = @effectNode(@current_editor.getNode(node), true)
    name = "p" if list.indexOf(name) isnt -1
    @commandOverall "formatblock", name

  commandWrap: (tag) ->
    node = @current_editor.current_node
    val = "<" + tag + ">" + selection + "</" + tag + ">"
    @commandOverall "insertHTML", val

  # node effects
  effectNode: (el, returnAsNodeName) ->
    nodes = []
    el = el or @current_editor.$el[0]
    while el isnt @current_editor.$el[0]
      if el.nodeName.match(@effectNodeReg)
        nodes.push (if returnAsNodeName then el.nodeName.toLowerCase() else el)
      el = el.parentNode
    nodes

  handleOut: ()->
    selected_menu = false

  handleOver: ()->
    selected_menu = true

  displayHighlights: ()->
    #remove all active links
    $(@el).find(".active").removeClass("active")

    nodes = @effectNode(utils.getNode())
    utils.log(nodes)
    _.each nodes, (node)=>
      tag = node.nodeName.toLowerCase()
      switch tag
        when "a"
          menu.querySelector("input").value = item.getAttribute("href")
          tag = "createlink"
        when "img"
          menu.querySelector("input").value = item.getAttribute("src")
          tag = "insertimage"
        when "i"
          tag = "italic"
        when "u"
          tag = "underline"
        when "b"
          tag = "bold"
        when "code"
          tag = "code"
        when "ul"
          tag = "insertunorderedlist"
        when "ol"
          tag = "insertorderedlist"
        when "li"
          tag = "indent"
          utils.log "nothing to select"

      @highlight(tag)

  highlight: (tag)->
    $(".icon-#{tag}").addClass("active")

  show: ()->
    $(@el).css("opacity", 1)
    $(@el).css('visibility', 'visible')
    @displayHighlights()

  hide: ()->
    $(@el).css("opacity", 0)
    $(@el).css('visibility', 'hidden')

class Dante.Editor.Tooltip extends Dante.View
  el: ".inlineTooltip2"

  events:
    "click .button--inlineTooltipControl" : "toggleOptions"
    "click .inlineTooltip2-menu .button" : "handleClick"

  initialize: (opts = {})=>
    @current_editor = opts.editor
    @buttons = [
      {icon: "fa-camera", title: "Add an image", action: "image"  },
      {icon: "fa-play", title: "Add a video", action: "embed"  },
      {icon: "fa-code", title: "Add an embed", action: "embed-extract"},
      {icon: "fa-minus", title: "Add a new part", action: "hr"  }
    ]
    #utils.log $(@el).length

  template: ()->
    menu = ""
    _.each @buttons, (b)->
      data_action_value = if b.action_value then "data-action-value='#{b.action_value}'" else  ""
      menu += "<button class='button button--small button--circle button--neutral button--scale u-transitionSeries' title='#{b.title}' data-action='inline-menu-#{b.action}' #{data_action_value}>
        <span class='fa #{b.icon}'></span>
      </button>"

    "<button class='button button--small button--circle button--neutral button--inlineTooltipControl' title='Close Menu' data-action='inline-menu'>
        <span class='fa fa-plus'></span>
    </button>
    <div class='inlineTooltip2-menu'>
      #{menu}
    </div>"

  insertTemplate: ()->
    "<figure contenteditable='false' class='graf graf--figure is-defaultValue' name='#{utils.generateUniqueName()}' tabindex='0'>
      <div style='max-width: 600px; max-height: 375px;' class='aspectRatioPlaceholder is-locked'>
        <div style='/*padding-bottom: 100%;*/' class='aspect-ratio-fill'></div>
        <img src='' data-height='375' data-width='600' data-image-id='' class='graf-image' data-delayed-src=''>
      </div>
      <figcaption contenteditable='true' data-default-value='Type caption for image (optional)' class='imageCaption'>
        <span class='defaultValue'>Type caption for image (optional)</span>
        <br>
      </figcaption>
    </figure>"

  extractTemplate: ()->
    "<div class='graf graf--mixtapeEmbed is-selected' name=''>
      <a target='_blank' data-media-id='' class='js-mixtapeImage mixtapeImage mixtapeImage--empty u-ignoreBlock' href=''>
      </a>
      <a data-tooltip-type='link' data-tooltip-position='bottom' data-tooltip='' title='' class='markup--anchor markup--mixtapeEmbed-anchor' data-href='' href='' target='_blank'>
        <strong class='markup--strong markup--mixtapeEmbed-strong'></strong>
        <em class='markup--em markup--mixtapeEmbed-em'></em>
      </a>
    </div>"

  embedTemplate: ()->
    "<figure contenteditable='false' class='graf--figure graf--iframe graf--first' name='504e' tabindex='0'>
      <div class='iframeContainer'>
        <iframe frameborder='0' width='700' height='393' data-media-id='' src='' data-height='480' data-width='854'>
        </iframe>
      </div>
      <figcaption contenteditable='true' data-default-value='Type caption for embed (optional)' class='imageCaption'>
        <a rel='nofollow' class='markup--anchor markup--figure-anchor' data-href='' href='' target='_blank'>

        </a>
      </figcaption>
    </figure>"

  render: ()=>
    $(@el).html(@template())
    $(@el).show()

  toggleOptions: ()=>
    utils.log "Toggle Options!!"
    $(@el).toggleClass("is-active is-scaled")

  move: (coords)->
    $(@el).offset(coords)

  handleClick: (ev)->
    name = $(ev.currentTarget).data('action')
    utils.log name
    switch name
      when "inline-menu-image"
        @placeholder = "<p>PLACEHOLDER</p>"
        @imageSelect(ev)
      when "inline-menu-embed"
        @displayEmbedPlaceHolder()
      when "inline-menu-embed-extract"
        @displayExtractPlaceHolder()
      when "inline-menu-hr"
        @splitSection()

  #UPLOADER

  #replace existing img tag , and wrap it in insertTamplate
  #TODO: take the url and upload it
  uploadExistentImage: (image_element, opts = {})->

    utils.log ("process image here!")
    tmpl = $(@insertTemplate())
    tmpl.find("img").attr('src', @current_editor.default_loading_placeholder )
    #is a child element or a first level element ?
    if $(image_element).parents(".graf").length > 0
      #return if its already wrapped in graf--figure
      if $(image_element).parents(".graf").hasClass("graf--figure")
        return

      utils.log "UNO"
      tmpl.insertBefore( $(image_element).parents(".graf") )
      node = @current_editor.getNode()
      @current_editor.preCleanNode($(node))
      @current_editor.addClassesToElement(node)
    else
      utils.log "DOS"
      $(image_element).replaceWith(tmpl)

    utils.log tmpl.attr('name')
    @replaceImg(image_element, $("[name='#{tmpl.attr('name')}']"))

  replaceImg: (image_element, figure)->
    #set image dimensions
    #TODO: maybe limit with default max-heigth ?
    utils.log figure.attr("name")
    utils.log figure

    $(image_element).remove()

    img = new Image()
    img.onload = ()->
      console.log "and here comes the water!"
      console.log(figure)
      console.log(this.width + 'x' + this.height);
      figure.find(".aspectRatioPlaceholder").css
        'max-width': this.width
        'max-height': this.height
        'height': this.height
      figure.find("img").attr({'data-height': this.height, 'data-width': this.width})
      figure.find("img").attr('src', image_element.src )
    img.src = image_element.src

  displayAndUploadImages: (file)->
    @displayCachedImage file
    @uploadFile file

  imageSelect: (ev)->
    $selectFile = $('<input type="file" multiple="multiple">').click()
    self = @
    $selectFile.change ()->
      t = this
      self.uploadFiles(t.files)

  displayCachedImage: (file)->
    @node = @current_editor.getNode()
    @current_editor.tooltip_view.hide()

    reader = new FileReader()
    reader.onload = (e)=>
      i = new Image
      i.src = e.target.result

      new_tmpl = $(@insertTemplate())

      replaced_node = $( new_tmpl ).insertBefore($(@node))

      img_tag = new_tmpl.find('img.graf-image').attr('src', e.target.result)
      img_tag.height = i.height
      img_tag.width  = i.width
      unless i.width is 0 || i.height is 0
        $('img.graf-image').parent(".aspectRatioPlaceholder").css
          'max-width': i.width
          'max-height': i.height

    reader.readAsDataURL(file)

  formatData: (file)->
    formData = new FormData()
    formData.append('file', file)
    return formData

  uploadFiles: (files)=>
    acceptedTypes =
      "image/png": true
      "image/jpeg": true
      "image/gif": true

    i = 0
    while i < files.length
      file = files[i]
      if acceptedTypes[file.type] is true
        $(@placeholder).append "<progress class=\"progress\" min=\"0\" max=\"100\" value=\"0\">0</progress>"
        @displayAndUploadImages(file)
      i++

  uploadFile: (file)=>

    $.ajax
      type: "post"
      url: @current_editor.upload_url
      xhr: =>
        xhr = new XMLHttpRequest()
        xhr.upload.onprogress = @updateProgressBar
        xhr
      cache: false
      contentType: false
      complete: (jqxhr) =>
        @uploadCompleted jqxhr
        return

      processData: false
      data: @formatData(file)

  updateProgressBar: (e)=>
    $progress = $('.progress:first', this.$el)
    complete = ""

    if (e.lengthComputable)
      complete = e.loaded / e.total * 100
      complete = complete ? complete : 0
      #$progress.attr('value', complete)
      #$progress.html(complete)
      utils.log "complete"
      utils.log complete

  uploadCompleted: (jqxhr)=>
    utils.log jqxhr

  ## EMBED
  displayEmbedPlaceHolder: ()->
    ph = @current_editor.embed_placeholder
    @node = @current_editor.getNode()
    $(@node).html(ph).addClass("is-embedable")

    @current_editor.setRangeAt(@node)
    @hide()
    false

  getEmbedFromNode: (node)=>
    @node_name = $(node).attr("name")
    $.getJSON("#{@current_editor.oembed_url}#{$(@node).text()}").success (data)=>
      @node = $("[name=#{@node_name}]")
      iframe_src = $(data.html).prop("src")
      tmpl = $(@embedTemplate())
      tmpl.attr("name", @node.attr("name"))
      $(@node).replaceWith(tmpl)
      replaced_node = $(".graf--iframe[name=#{@node.attr("name")}]")
      replaced_node.find("iframe").attr("src", iframe_src)
      url = data.url || data.author_url
      utils.log "URL IS #{url}"
      replaced_node.find(".markup--anchor").attr("href", url ).text(url)
      @hide()

  ##EXTRACT
  displayExtractPlaceHolder: ()->
    ph = @current_editor.extract_placeholder
    @node = @current_editor.getNode()
    $(@node).html(ph).addClass("is-extractable")

    @current_editor.setRangeAt(@node)
    @hide()
    false

  getExtractFromNode: (node)=>
    @node_name = $(node).attr("name")
    $.getJSON("#{@current_editor.extract_url}#{$(@node).text()}").success (data)=>
      @node = $("[name=#{@node_name}]")
      iframe_src = $(data.html).prop("src")
      tmpl = $(@extractTemplate())
      tmpl.attr("name", @node.attr("name"))
      $(@node).replaceWith(tmpl)
      replaced_node = $(".graf--mixtapeEmbed[name=#{@node.attr("name")}]")
      replaced_node.find("strong").text(data.title)
      replaced_node.find("em").text(data.description)
      replaced_node.append(data.provider_url)
      replaced_node.find(".markup--anchor").attr("href", data.url )
      unless _.isEmpty data.images
        image_node = replaced_node.find(".mixtapeImage")
        image_node.css("background-image", "url(#{data.images[0].url})")
        image_node.removeClass("mixtapeImage--empty u-ignoreBlock")
      @hide()

  getExtract: (url)=>
    $.getJSON("#{@current_editor.extract_url}#{url}").done (data)->
      utils.log(data)

  cleanOperationClasses: (node)->
    node.removeClass("is-embedable is-extractable")

  hide: ()=>
    $(@el).hide()
    $(@el).removeClass("is-active is-scaled")


