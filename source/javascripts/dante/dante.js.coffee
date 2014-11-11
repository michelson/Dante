
window.Editor = {

}

utils = {}

# make it accessible
window.selection = 0
selected_menu = false
window.current_editor = null
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

class Editor.MainEditor extends Backbone.View
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
    window.current_editor = @
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
          <p class='graf--h3'>#{@title_placeholder}</p>
          <p class='graf--p'>#{@body_placeholder}<p>
        </div>
      </div>

    </section>"

  baseParagraphTmpl: ()->
    "<p class='graf--p' name='#{utils.generateUniqueName()}'><br></p>"

  appendMenus: ()=>
    $("<div id='editor-menu' class='editor-menu' style='opacity: 0;'></div>").insertAfter(@el)
    $("<div class='inlineTooltip2 button-scalableGroup'></div>").insertAfter(@el)
    @editor_menu = new Editor.Menu()
    @tooltip_view = new Editor.Tooltip()
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
    range.setStart(element, int); #DANGER this is supported by IE 9
    #range.setStartAfter(element)
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
    return if @selection().rangeCount < 1
    range = @selection().getRangeAt(0)
    node = range.commonAncestorContainer
    return null  if not node or node is root
    node = node.parentNode  while node and (node.nodeType isnt 1) and (node.parentNode isnt root)
    node = node.parentNode  while node and (node.parentNode isnt root)
    (if root && root.contains(node) then node else null)

  displayMenu: (sel)->
    #TODO: find out why this isn't propperly positioned the first time
    setTimeout ()=>
      @editor_menu.render()
      pos = @getSelectionDimensions()
      @relocateMenu(pos)
      @editor_menu.show()
    , 10

  #http://stackoverflow.com/questions/12603397/calculate-width-height-of-the-selected-text-javascript
  getSelectionDimensions: ->
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

  #get text of selected and displays menu
  handleTextSelection: (anchor_node)->
    @editor_menu.hide()
    text = @getSelectedText()
    unless _.isEmpty text.trim()
      @current_range = @getRange()
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
    #utils.log(ev)
    #hide menu only if is not in use
    setTimeout ()=>
      @editor_menu.hide() unless selected_menu
    , 200

    #@tooltip_view.hide()
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
    top = node.offset().top
    #scroll to element top
    $('html, body').animate
      scrollTop: top
    , 20

  #handle arrow direction from key up.
  handleArrow: (ev)=>
    current_node = $(@getNode())
    if current_node
      @markAsSelected( current_node )
      @displayTooltipAt( current_node )

  #handle arrow direction from key down.
  handleArrowDown: (ev)=>
    current_node = $(@getNode())
    utils.log(ev)
    ev_type = ev.originalEvent.key || ev.originalEvent.keyIdentifier

    utils.log("ENTER ARROW DOWN #{ev.which} #{ev_type}")

    #handle keys for image figure
    switch ev_type

      when "Down"
        next_node = current_node.next()
        utils.log "NEXT NODE IS #{next_node.attr('class')}"
        utils.log "CURRENT NODE IS #{current_node.attr('class')}"
        #if next element is embed select & focus it
        if next_node.hasClass("graf--figure")
          n = next_node.find(".imageCaption")
          @setRangeAt n[0]
          @scrollTo(n)
          utils.log "1 down"
          next_node.addClass("is-mediaFocused is-selected")
          false
        #if current node is embed
        else if next_node.hasClass("graf--mixtapeEmbed")
          n = current_node.next(".graf--mixtapeEmbed")
          num = n[0].childNodes.length
          @setRangeAt n[0], num
          @scrollTo(n)
          utils.log "2 down"
          false

        if current_node.hasClass("graf--figure") && next_node.hasClass("graf")
          @setRangeAt next_node[0]
          @scrollTo(next_node)
          utils.log "3 down"
          false

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

        return unless @isFirstChar()

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
          #return false

        utils.log "noting"

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

  handleInmediateDeletion: (element)->
    @inmediateDeletion = false
    new_node = $( @baseParagraphTmpl() ).insertBefore( $(element) )
    new_node.addClass("is-selected")
    @setRangeAt($(element).prev()[0])
    $(element).remove()

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

  handleNullAnchor: ()->
    utils.log "ALARM ALARM this is an empty node"
    sel = window.getSelection();
    #this is a rare hack only for FF (I hope),
    #when there is no range create a new element,
    #and find previous element and focus it
    #and finnaly remove the newly created.
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
      if prev.hasClass("graf")
        @setRangeAt(prev[0], num)
        node.remove()
        @markAsSelected(@getNode())
      else if prev.hasClass("graf--mixtapeEmbed")
        @setRangeAt(prev[0], num)
        node.remove()
        @markAsSelected(@getNode())
      else if !prev
        utils.log "NO PREV"

      @displayTooltipAt($(@el).find(".is-selected"))

  handleCompleteDeletion: (element)->
    if _.isEmpty( $(element).text().trim() )
      utils.log "HANDLE COMPLETE DELETION"
      @render()
      setTimeout =>
        @setRangeAt($(@el).find(".section-inner p")[0])
      , 20
      @completeDeletion = true

  handleKeyDown: (e)->
    utils.log "KEYDOWN"

    anchor_node = @getNode() #current node on which cursor is positioned

    @markAsSelected( anchor_node ) if anchor_node

    #enter key
    if (e.which == 13)
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
        return false unless @isLastChar()

      #supress linebreak or create new <p> into embed caption unless last char el
      if parent.hasClass("graf--iframe") or parent.hasClass("graf--figure")
        if @isLastChar()
          @handleLineBreakWith("p", parent)
          @setRangeAt($(".is-selected")[0])
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
        else
          #@handleLineBreakWith(parent.prop("tagName").toLowerCase(), parent  )
      else if !anchor_node
        utils.log "creating new line break"
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
      utils.log anchor_node

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
          else
            utils.log "NORMAL"

      #TODO: supress del when the prev el is embed and current_node is at first char
      if $(anchor_node).prev().hasClass("graf--mixtapeEmbed")
        return false if @isFirstChar() && !_.isEmpty( $(anchor_node).text().trim() )

    #arrows key
    #if _.contains([37,38,39,40], e.which)
    #up & down
    if _.contains([38, 40], e.which)
      utils.log e.which
      @handleArrowDown(e)

  handleKeyUp: (e , node)->
    utils.log "KEYUP"

    @editor_menu.hide() #hides menu just in case
    @reachedTop = false
    anchor_node = @getNode() #current node on which cursor is positioned

    @handleTextSelection(anchor_node)

    if (e.which == 8)

      #if detect all text deleted , re render
      @handleCompleteDeletion($(@el))
      if @completeDeletion
        @completeDeletion = false
        return false

      #when user select all text delete complete node
      if @inmediateDeletion
        @handleInmediateDeletion(anchor_node)

      if anchor_node && anchor_node.nodeType is 3
        utils.log "HANDLE UNWRAPPED"
        @handleUnwrappedNode(anchor_node)
        return false

      if _.isNull(anchor_node)
        @handleNullAnchor()
        #return false

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
        @tooltip_view.uploadExistentImage(n)
        #set figure non editable
      when "a"
        #utils.log "links"
        $(n).wrap("<p class='graf graf--#{name}'></p>")
        n = $(n).parent()
        #dont know
      when "blockquote"
        #TODO remove inner elements like P
        #$(n).find("p").unwrap()
        n = $(n).removeClass().addClass("graf graf--#{name}")
      else
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
      @cleanContents(@element)
      @wrapTextNodes(@element)

      _.each  @element.children(), (n)=>
        name = $(n).prop("tagName").toLowerCase()
        #n = @preCleanNode n
        n = @addClassesToElement(n)

        @setElementName(n)

      @setupLinks(@element.find("a"))
      @setupFirstAndLast()
      #node = @getNode()
      #@markAsSelected( node ) #set selected
      #@displayTooltipAt( node )
      cb() if _.isFunction(cb)
    , 20

  cleanContents: (element)->
    #TODO: should config tags
    if _.isUndefined(element)
      @element = $(@el).find('.section-inner')
    else
      @element = element

    s = new Sanitize
      elements: ['strong', 'em', 'br', 'a', 'blockquote', 'b', 'u', 'i', 'pre', 'p', 'h2', 'h3']
      attributes:
        '__ALL__': ['class']
        a: ['href', 'title', 'target']
      protocols:
        a: { href: ['http', 'https', 'mailto'] }
      transformers: [(input)->
                      if (input.node_name == "span" && $(input.node).hasClass("defaultValue"))
                        return whitelist_nodes: [input.node]
                      else
                        return null
                    (input)->
                      #page embeds
                      if(input.node_name == 'div' && $(input.node).hasClass("graf--mixtapeEmbed") )
                        return whitelist_nodes: [input.node]
                      else if(input.node_name == 'a' && $(input.node).parent(".graf--mixtapeEmbed") )
                        return attr_whitelist: ["style"]
                      else
                        return null
                    ,
                    (input)->
                      #embeds
                      if( input.node_name == 'figure' && $(input.node).hasClass("graf--iframe") )
                        return whitelist_nodes: [input.node]
                      else if(input.node_name == 'div' && $(input.node).hasClass("iframeContainer") && $(input.node).parent(".graf--iframe") )
                        return whitelist_nodes: [input.node]
                      else if(input.node_name == 'iframe' && $(input.node).parent(".iframeContainer") )
                        return whitelist_nodes: [input.node]
                      else if(input.node_name == 'figcaption' && $(input.node).parent(".graf--iframe") )
                        return whitelist_nodes: [input.node]
                      else
                        return null
                    ,
                    (input)->
                      #image embeds
                      if(input.node_name == 'figure' && $(input.node).hasClass("graf--figure") )
                        return whitelist_nodes: [input.node]

                      else if(input.node_name == 'div' && ($(input.node).hasClass("aspect-ratio-fill") || $(input.node).hasClass("aspectRatioPlaceholder")) && $(input.node).parent(".graf--figure") )
                        return whitelist_nodes: [input.node]

                      else if(input.node_name == 'img' && $(input.node).parent(".graf--figure") )
                        return whitelist_nodes: [input.node]

                      else if(input.node_name == 'a' && $(input.node).parent(".graf--mixtapeEmbed") )
                        return attr_whitelist: ["style"]

                      else if(input.node_name == 'span' && $(input.node).parent(".imageCaption"))
                        return whitelist_nodes: [input.node]
                      else
                        return null
                    ]

    unless _.isEmpty @element
      utils.log "CLEAN HTML"
      @element.html(s.clean_node( @element[0] ))

  setupLinks: (elems)->
    _.each elems, (n)->
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
    ###
    buttons: [
        'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule',
        'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
      ]
    ###

    buttons: ['blockquote', 'h2', 'h3', 'bold', 'italic', 'createlink']

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

    utils.log("menu #{name} item clicked!")

    if @commandsReg.block.test(name)
      utils.log "block here"
      @commandBlock name
    else if @commandsReg.inline.test(name) or @commandsReg.source.test(name)
      utils.log "overall here"
      @commandOverall name, value
    else if @commandsReg.insert.test(name)
      utils.log "insert here"
      @commandInsert name
    else if @commandsReg.wrap.test(name)
      utils.log "wrap here"
      @commandWrap name
    else
      utils.log "can't find command function for name: " + name

    @setupInsertedElement(current_editor.getNode())
    false

  setupInsertedElement: (element)->
    n = current_editor.addClassesToElement(element)
    current_editor.setElementName(n)

  cleanContents: ()->
    current_editor.cleanContents()

  commandOverall: (cmd, val) ->
    message = " to exec 「" + cmd + "」 command" + ((if val then (" with value: " + val) else ""))
    if document.execCommand(cmd, false, val)
      utils.log "success" + message
    else
      utils.log "fail" + message, true
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

  events:
    "click .button--inlineTooltipControl" : "toggleOptions"
    "click .inlineTooltip2-menu .button" : "handleClick"

  initialize: ()=>
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
        <div style='padding-bottom: 62.5%;' class='aspect-ratio-fill'></div>
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
        <br>
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
    tmpl_img = tmpl.find("img").attr('src', image_element.src )
    tmpl.find(".aspectRatioPlaceholder").css
      'max-width': image_element.width
      'max-height': image_element.height
    #is a child element or a first level element ?
    if $(image_element).parents(".graf").length > 0
      #return if its already wrapped in graf--figure
      return if $(image_element).parents(".graf").hasClass("graf--figure")
      tmpl.insertBefore( $(image_element).parents(".graf") )
      node = current_editor.getNode()
      current_editor.preCleanNode($(node))
      current_editor.addClassesToElement(node)
    else
      $(image_element).replaceWith(tmpl)

    #tmpl.insertBefore( $(image_element).parents(".graf") )
    #node = current_editor.getNode()
    #current_editor.preCleanNode(node)
    #displayAndUploadImages(blob)

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
    @node = current_editor.getNode()
    current_editor.tooltip_view.hide()

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
      url: current_editor.upload_url
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
    ph = current_editor.embed_placeholder
    @node = current_editor.getNode()
    $(@node).html(ph).addClass("is-embedable")

    current_editor.setRangeAt(@node)
    @hide()
    false

  getEmbedFromNode: (node)=>
    @node_name = $(node).attr("name")
    $.getJSON("#{current_editor.oembed_url}#{$(@node).text()}").success (data)=>
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
    ph = current_editor.extract_placeholder
    @node = current_editor.getNode()
    $(@node).html(ph).addClass("is-extractable")

    current_editor.setRangeAt(@node)
    @hide()
    false

  getExtractFromNode: (node)=>
    @node_name = $(node).attr("name")
    $.getJSON("#{current_editor.extract_url}#{$(@node).text()}").success (data)=>
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
    $.getJSON("#{current_editor.extract_url}#{url}").done (data)->
      utils.log(data)

  cleanOperationClasses: (node)->
    node.removeClass("is-embedable is-extractable")

  hide: ()=>
    $(@el).hide()
    $(@el).removeClass("is-active is-scaled")


