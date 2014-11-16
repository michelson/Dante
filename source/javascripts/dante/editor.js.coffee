
selected_menu = false
utils = Dante.utils

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
          <h3 class='graf graf--h3'>#{@title_placeholder}</h3>
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
    @tooltip_view.render().hide()

  appendInitialContent: ()=>
    $(@el).find(".section-inner").html(@initial_html)

  start: ()=>
    wrapper =
      "<div class='postContent'>
        <div class='postContent-inner'>
          <div class='notesSource'>
            <div class='postField postField--body editable smart-media-plugin' contenteditable='true'>
            </div>
          </div>
        </div>
      </div>"

    @render()
    $(@el).wrapInner(wrapper)

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