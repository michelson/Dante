
utils = Dante.utils

class Dante.Editor extends Dante.View

  #Named constants for javascript key codes
  BACKSPACE  = 8
  TAB        = 9
  ENTER      = 13
  SPACEBAR   = 32
  LEFTARROW  = 37
  UPARROW    = 38
  RIGHTARROW = 39
  DOWNARROW  = 40

  events:
    "mouseup"  : "handleMouseUp"
    "keydown"  : "handleKeyDown"
    "keyup"    : "handleKeyUp"
    "paste"    : "handlePaste"
    "dblclick" : "handleDblclick"
    "dragstart": "handleDrag"
    "drop"     : "handleDrag"
    "click .graf--figure .aspectRatioPlaceholder" : "handleGrafFigureSelectImg"
    "click .graf--figure figcaption"   : "handleGrafFigureSelectCaption"

    "mouseover .graf--figure.graf--iframe" : "handleGrafFigureSelectIframe"
    "mouseleave .graf--figure.graf--iframe" : "handleGrafFigureUnSelectIframe"
    "keyup .graf--figure figcaption"   : "handleGrafCaptionTyping"

    "mouseover .markup--anchor" : "displayPopOver"
    "mouseout  .markup--anchor" : "hidePopOver"

  initialize: (opts = {})=>
    @editor_options = opts
    #globals for selected text and node
    @initial_html    = $(@el).html()
    @current_range   = null
    @current_node    = null
    @el = opts.el || "#editor"
    @upload_url      = opts.upload_url  || "/uploads.json"
    @upload_callback = opts.upload_callback
    @oembed_url      = opts.oembed_url  || "http://api.embed.ly/1/oembed?url="
    @extract_url     = opts.extract_url || "http://api.embed.ly/1/extract?key=86c28a410a104c8bb58848733c82f840&url="
    @default_loading_placeholder = opts.default_loading_placeholder || Dante.defaults.image_placeholder
    @store_url       = opts.store_url
    @store_method    = opts.store_method || "POST"
    @spell_check     = opts.spellcheck || false
    @disable_title   = opts.disable_title || false
    @store_interval  = opts.store_interval || 15000
    @paste_element_id = "#dante-paste-div"
    @tooltip_class   = opts.tooltip_class || Dante.Editor.Tooltip

    opts.base_widgets ||= ["uploader", "embed", "embed_extract"]

    @widgets = []

    window.debugMode = opts.debug || false

    $(@el).addClass("debug") if window.debugMode

    if (localStorage.getItem('contenteditable'))
      $(@el).html  localStorage.getItem('contenteditable')

    @store()

    titleplaceholder    = opts.title_placeholder  || 'Title'
    @title_placeholder  = "<span class='defaultValue defaultValue--root'>#{titleplaceholder}</span><br>"
    title               = opts.title              || ''
    @title              = title
    bodyplaceholder     = opts.body_placeholder   || 'Tell your story…'
    @body_placeholder   = "<span class='defaultValue defaultValue--root'>#{bodyplaceholder}</span><br>"
    embedplaceholder    = opts.embed_placeholder  || 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter'
    @embed_placeholder  = "<span class='defaultValue defaultValue--root'>#{embedplaceholder}</span><br>"
    extractplaceholder  = opts.extract_placeholder|| "Paste a link to embed content from another site (e.g. Twitter) and press Enter"
    @extract_placeholder= "<span class='defaultValue defaultValue--root'>#{extractplaceholder}</span><br>"

    @initializeWidgets(opts)

  initializeWidgets: (opts)->
    #TODO: this could be a hash to access widgets without var
    #Base widgets
    base_widgets = opts.base_widgets
    self = @

    if base_widgets.indexOf("uploader") >= 0
      @uploader_widget      = new Dante.View.TooltipWidget.Uploader(current_editor: @)
      @widgets.push @uploader_widget

    if base_widgets.indexOf("embed") >= 0
      @embed_widget         = new Dante.View.TooltipWidget.Embed(current_editor: @)
      @widgets.push @embed_widget

    if base_widgets.indexOf("embed_extract") >= 0
      @embed_extract_widget = new Dante.View.TooltipWidget.EmbedExtract(current_editor: @)
      @widgets.push @embed_extract_widget

    #add extra widgets
    if opts.extra_tooltip_widgets
      _.each opts.extra_tooltip_widgets, (w)=>
        if !w.current_editor
          w.current_editor = self
        @widgets.push w

  store: ()->
    #localStorage.setItem("contenteditable", $(@el).html() )
    return unless @store_url
    setTimeout ()=>
      @checkforStore()
    , @store_interval

  checkforStore: ()->
    if @content is @getContent()
      utils.log "content not changed skip store"
      @store()
    else
      utils.log "content changed! update"
      @content = @getContent()
      $.ajax
        url: @store_url
        method: @store_method
        data:
          body: @getContent()
        success: (res)->
          utils.log "store!"
          utils.log res
        complete: (jxhr) =>
          @store()

  getContent: ()->
    $(@el).find(".section-inner").html()

  renderTitle: ()->
    "<h3 class='graf graf--h3'>#{if @title.length > 0 then @title else @title_placeholder}</h3>"

  template: ()=>
    "<section class='section--first section--last'>

      <div class='section-divider layoutSingleColumn'>
        <hr class='section-divider'>
      </div>

      <div class='section-content'>
        <div class='section-inner layoutSingleColumn'>
          #{if @disable_title then '' else @renderTitle()}
          <p class='graf graf--p'>#{@body_placeholder}<p>
        </div>
      </div>

    </section>"

  baseParagraphTmpl: ()->
    "<p class='graf--p' name='#{utils.generateUniqueName()}'><br></p>"

  appendMenus: ()=>
    $("<div id='dante-menu' class='dante-menu'></div>").insertAfter(@el)
    $("<div class='inlineTooltip'></div>").insertAfter(@el)
    @editor_menu = new Dante.Editor.Menu(editor: @)
    @tooltip_view = new @tooltip_class(editor: @ , widgets: @widgets)
    @pop_over = new Dante.Editor.PopOver(editor: @)
    @pop_over.render().hide()
    @tooltip_view.render().hide()

  appendInitialContent: ()=>
    $(@el).find(".section-inner").html(@initial_html)
    $(@el).attr("spellcheck", @spell_check)

  start: ()=>
    @render()
    $(@el).attr("contenteditable", "true")
    $(@el).addClass("postField postField--body editable smart-media-plugin")
    $(@el).wrap("<article class='postArticle'><div class='postContent'><div class='notesSource'></div></div></article>")
    @appendMenus()
    @appendInitialContent() unless _.isEmpty @initial_html.trim()
    @parseInitialMess()

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
      range.collapse(false) # set to end

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
    $(@getNode()).text().trim().length is @getCharacterPrecedingCaret().trim().length

  isFirstChar: ()->
    @getCharacterPrecedingCaret().trim().length is 0

  isSelectingAll: (element)->
    a = @getSelectedText().killWhiteSpace().length
    b = $(element).text().killWhiteSpace().length
    a is b

  #set focus and caret position on element
  setRangeAt: (element, pos=0)->
    range = document.createRange()
    sel = window.getSelection()
    #node = element.firstChild;
    range.setStart(element, pos); #DANGER this is supported by IE 9
    #range.setStartAfter(element)
    #range.setEnd(element, int);
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
    element.focus()

  #set focus and caret position on element
  setRangeAtText: (element, pos=0)->
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

    #node = node.parentNode while node and (node.nodeType isnt 1) and (node.parentNode isnt root)
    #node = node.parentNode while node and (node.parentNode isnt root)

    node = node.parentNode  while node and (node.nodeType isnt 1 or not $(node).hasClass("graf")) and (node.parentNode isnt root)
    if not $(node).hasClass("graf--li")
      node = node.parentNode  while node and (node.parentNode isnt root)

    (if root && root.contains(node) then node else null)

  displayMenu: (sel)->
    setTimeout ()=>
      @editor_menu.render()
      pos = utils.getSelectionDimensions()
      @relocateMenu(pos)
      @editor_menu.show()
    , 10

  handleDrag: ()->
    return false

  handleGrafCaptionTyping: (ev)->
    if _.isEmpty(utils.getNode().textContent.trim())
      $(@getNode()).addClass("is-defaultValue")
    else
      $(@getNode()).removeClass("is-defaultValue")

  #get text of selected and displays menu
  handleTextSelection: (anchor_node)->
    @editor_menu.hide()
    text = @getSelectedText()
    if !$(anchor_node).is(".graf--mixtapeEmbed, .graf--figure") && !_.isEmpty text.trim()
        @current_node  = anchor_node
        @.displayMenu()

  relocateMenu: (position)->
    height = @editor_menu.$el.outerHeight()
    padd   = @editor_menu.$el.width() / 2
    top    = position.top + $(window).scrollTop() - height
    left   = position.left + (position.width / 2) - padd
    @editor_menu.$el.offset({ left: left , top: top })

  hidePlaceholder: (element)->
    $(element).find("span.defaultValue").remove().html("<br>")

  displayEmptyPlaceholder: (element)->
    $(".graf--first").html(@title_placeholder)
    $(".graf--last").html(@body_placeholder)

  displayPopOver: (ev)->
    @pop_over.displayAt(ev)

  hidePopOver: (ev)->
    @pop_over.hide(ev)

  handleGrafFigureSelectImg: (ev)->
    utils.log "FIGURE SELECT"
    element = ev.currentTarget
    @markAsSelected( element )
    $(element).parent(".graf--figure").addClass("is-selected is-mediaFocused")
    @selection().removeAllRanges()

  handleGrafFigureSelectIframe: (ev)->
    utils.log "FIGURE IFRAME SELECT"
    element = ev.currentTarget
    @iframeSelected = element
    @markAsSelected( element )
    $(element).addClass("is-selected is-mediaFocused")
    @selection().removeAllRanges()

  handleGrafFigureUnSelectIframe: (ev)->
    utils.log "FIGURE IFRAME UNSELECT"
    element = ev.currentTarget
    @iframeSelected = null
    $(element).removeClass("is-selected is-mediaFocused")

  handleGrafFigureSelectCaption: (ev)->
    utils.log "FIGCAPTION"
    element = ev.currentTarget
    $(element).parent(".graf--figure").removeClass("is-mediaFocused")

  handleMouseUp: (ev)=>
    utils.log "MOUSE UP"
    anchor_node = @getNode()

    return if _.isNull(anchor_node)

    @prev_current_node = anchor_node

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
    if current_node.length > 0
      @markAsSelected( current_node )
      @displayTooltipAt( current_node )

  #handle arrow direction from keyDown.
  handleArrowForKeyDown: (ev)=>
    caret_node   = @getNode()
    current_node = $(caret_node)
    utils.log(ev)
    ev_type = ev.originalEvent.key || ev.originalEvent.keyIdentifier

    utils.log("ENTER ARROW for key #{ev_type}")

    #handle keys for image figure
    switch ev_type

      when "Down"
        #when graff-image selected but none selection is found
        if _.isUndefined(current_node) or !current_node.exists()
          if $(".is-selected").exists()
            current_node = $(".is-selected")

        next_node = current_node.next()

        utils.log "NEXT NODE IS #{next_node.attr('class')}"
        utils.log "CURRENT NODE IS #{current_node.attr('class')}"

        return unless $(current_node).hasClass("graf")
        return unless current_node.hasClass("graf--figure") or $(current_node).editableCaretOnLastLine()

        utils.log "ENTER ARROW PASSED RETURNS"

        #if next element is embed select & focus it
        if next_node.hasClass("graf--figure") && caret_node
          n = next_node.find(".imageCaption")
          @scrollTo(n)
          utils.log "1 down"
          utils.log n[0]
          @skip_keyup = true
          @selection().removeAllRanges()
          @markAsSelected(next_node)
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
          @scrollTo(next_node)
          utils.log "3 down, from figure to next graf"
          #@skip_keyup = true
          @markAsSelected(next_node)
          @setRangeAt next_node[0]
          return false

      when "Up"
        prev_node = current_node.prev()
        utils.log "PREV NODE IS #{prev_node.attr('class')} #{prev_node.attr('name')}"
        utils.log "CURRENT NODE IS up #{current_node.attr('class')}"

        return unless $(current_node).hasClass("graf")
        return unless $(current_node).editableCaretOnFirstLine()

        utils.log "ENTER ARROW PASSED RETURNS"

        if prev_node.hasClass("graf--figure")
          utils.log "1 up"
          n = prev_node.find(".imageCaption")
          @scrollTo(n)
          @skip_keyup = true
          @selection().removeAllRanges()
          @markAsSelected(prev_node)
          prev_node.addClass("is-mediaFocused")
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
          @scrollTo(n)
          utils.log "4 up"
          @skip_keyup = true
          @markAsSelected(prev_node)
          return false

  #parse text for initial mess
  parseInitialMess: ()->
    @setupElementsClasses $(@el).find('.section-inner') , (e)=>
      @handleUnwrappedImages(e)

  handleDblclick: ()->
    utils.log "handleDblclick"
    node =  @getNode()
    if _.isNull node
      @setRangeAt(@prev_current_node)
    return false

  #detects html data , creates a hidden node to paste ,
  #then clean up the content and copies to currentNode, very clever uh?
  handlePaste: (ev)=>
    utils.log("pasted!")
    @aa = @getNode()

    pastedText = undefined
    if (window.clipboardData && window.clipboardData.getData) #IE
      pastedText = window.clipboardData.getData('Text')
    else if (ev.originalEvent.clipboardData && ev.originalEvent.clipboardData.getData)
      cbd = ev.originalEvent.clipboardData
      pastedText = if _.isEmpty(cbd.getData('text/html')) then cbd.getData('text/plain') else cbd.getData('text/html')

    utils.log("Process and handle text...")
    #detect if is html
    if pastedText.match(/<\/*[a-z][^>]+?>/gi)
      utils.log("HTML DETECTED ON PASTE")
      pastedText = pastedText.replace(/&.*;/g, "")

      #convert pasted divs in p before copy contents into div
      pastedText = pastedText.replace(/<div>([\w\W]*?)<\/div>/gi, '<p>$1</p>')

      #create the placeholder element and assign pasted content
      document.body.appendChild( $("<div id='#{@paste_element_id.replace('#', '')}' class='dante-paste'></div>")[0] )
      $(@paste_element_id).html("<span>#{pastedText}</span>")

      #clean pasted content

      @setupElementsClasses $(@paste_element_id), (e)=>
        # e is the target object which is cleaned
        nodes = $(e.html()).insertAfter($(@aa))
        #remove paste div since we wont use it until the next paste
        e.remove()
        #set caret on newly created node
        last_node = nodes.last()[0]
        num = last_node.childNodes.length
        @setRangeAt(last_node, num)
        #select new node
        new_node = $(@getNode())
        @markAsSelected(new_node)
        @displayTooltipAt($(@el).find(".is-selected"))

        @handleUnwrappedImages(nodes)

        #scroll to element top
        top = new_node.offset().top
        $('html, body').animate
          scrollTop: top
        , 20


      return false # Prevent the default handler from running.

  handleUnwrappedImages: (elements)->
    #http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
    _.each elements.find("img"), (image)=>
      utils.log ("process image here!")
      @uploader_widget.uploadExistentImage(image)

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
      utils.log "PREV NODE"
      utils.log prev
      if prev.hasClass("graf")
        @setRangeAt(prev[0], num)
        node.remove()
        @markAsSelected(@getNode())
      else if prev.hasClass("graf--mixtapeEmbed")
        @setRangeAt(prev[0], num)
        node.remove()
        @markAsSelected(@getNode())
      else if prev.hasClass("postList")
        @.setRangeAt(prev.find("li").last()[0])
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
    parent = $(anchor_node)

    @markAsSelected( anchor_node ) if anchor_node

    if e.which is TAB
      @handleTab(anchor_node)
      return false

    if e.which is ENTER

      #removes previous selected nodes
      $(@el).find(".is-selected").removeClass("is-selected")

      utils.log @isLastChar()

      #smart list support
      if parent.hasClass("graf--p")
        li = @handleSmartList(parent, e)
        anchor_node = li if li
      else if parent.hasClass("graf--li")
        @handleListLineBreak(parent, e)

      #handle keydowns for each widget
      utils.log("HANDLING WIDGET KEYDOWNS");
      _.each @widgets, (w)=>
        if w.handleEnterKey
          w.handleEnterKey(e, parent);

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
          utils.log "new paragraph if it's the last character"
          e.preventDefault()
          @handleLineBreakWith("p", parent)

      setTimeout ()=>
        node = @getNode()
        return if _.isUndefined(node)
        #set name on new element
        @setElementName($(node))

        if node.nodeName.toLowerCase() is "div"
          node = @replaceWith("p", $(node))[0]
        @markAsSelected( $(node) ) #if anchor_node
        @setupFirstAndLast()

        #empty childs if text is empty
        if _.isEmpty $(node).text().trim()
          _.each $(node).children(), (n)->
            $(n).remove()
          $(node).append("<br>")

        #shows tooltip
        @displayTooltipAt($(@el).find(".is-selected"))
      , 2

    #delete key
    if (e.which is BACKSPACE)
      eventHandled = false;
      @tooltip_view.hide()
      utils.log("removing from down")
      utils.log "REACHED TOP" if @reachedTop
      return false if @prevented or @reachedTop && @isFirstChar()
      #return false if !anchor_node or anchor_node.nodeType is 3
      utils.log("pass initial validations")
      anchor_node = @getNode()
      utils_anchor_node = utils.getNode()

      utils.log(anchor_node);
      utils.log(utils_anchor_node);

      #check if any of the widgets can handle a backspace keydown
      utils.log("HANDLING WIDGET BACKSPACES")
      _.each @widgets, (w)=>
        if _.isFunction(w.handleBackspaceKey) && !eventHandled
          eventHandled = w.handleBackspaceKey(e, anchor_node)
          utils.log(eventHandled)

      if (eventHandled)
        e.preventDefault()
        utils.log("SCAPE FROM BACKSPACE HANDLER")
        return false;

      if(parent.hasClass("graf--li") and @getCharacterPrecedingCaret().length is 0)
        return this.handleListBackspace(parent, e);

      #select an image if backspacing into it from a paragraph
      if($(anchor_node).hasClass("graf--p") && @isFirstChar() )
        if($(anchor_node).prev().hasClass("graf--figure") && @getSelectedText().length == 0)
          e.preventDefault();
          $(anchor_node).prev().find("img").click();
          utils.log("Focus on the previous image");

      if $(utils_anchor_node).hasClass("section-content") || $(utils_anchor_node).hasClass("graf--first")
        utils.log "SECTION DETECTED FROM KEYDOWN #{_.isEmpty($(utils_anchor_node).text())}"
        return false if _.isEmpty($(utils_anchor_node).text())

      if anchor_node && anchor_node.nodeType is 3
        #@displayEmptyPlaceholder()
        utils.log("TextNode detected from Down!")
        #return false

      #supress del into & delete embed if empty content found on delete key
      if $(anchor_node).hasClass("graf--mixtapeEmbed") or $(anchor_node).hasClass("graf--iframe")
        if _.isEmpty $(anchor_node).text().trim() or @isFirstChar()
          utils.log("Check for inmediate deletion on empty embed text")
          @inmediateDeletion = @isSelectingAll(anchor_node)
          @handleInmediateDeletion($(anchor_node)) if @inmediateDeletion
          return false

      #TODO: supress del when the prev el is embed and current_node is at first char
      if $(anchor_node).prev().hasClass("graf--mixtapeEmbed")
        return false if @isFirstChar() && !_.isEmpty( $(anchor_node).text().trim() )

    #spacebar
    if (e.which is SPACEBAR)
      utils.log("SPACEBAR")
      if (parent.hasClass("graf--p"))
        @handleSmartList(parent, e)
    
    #arrows key
    #up & down
    if _.contains([UPARROW, DOWNARROW], e.which)
      utils.log e.which
      @handleArrowForKeyDown(e)
      #return false

    #hides tooltip if anchor_node text is empty
    if anchor_node
      unless _.isEmpty($(anchor_node).text())
        @tooltip_view.hide()
        $(anchor_node).removeClass("graf--empty")

    #when user types over a selected image (graf--figure)
    #unselect image , and set range on caption
    if _.isUndefined(anchor_node) && $(".is-selected").hasClass("is-mediaFocused")
      @setRangeAt $(".is-selected").find("figcaption")[0]
      $(".is-selected").removeClass("is-mediaFocused")
      return false

  handleKeyUp: (e , node)->

    if @skip_keyup
      @skip_keyup = null
      utils.log "SKIP KEYUP"
      return false

    utils.log "KEYUP"

    @editor_menu.hide() #hides menu just in case
    @reachedTop = false
    anchor_node = @getNode() #current node on which cursor is positioned
    utils_anchor_node = utils.getNode()

    @handleTextSelection(anchor_node)

    if (_.contains([BACKSPACE, SPACEBAR, ENTER], e.which))
      if $(anchor_node).hasClass("graf--li")
        @removeSpanTag($(anchor_node));

    if (e.which == BACKSPACE)

      #if detect all text deleted , re render
      if $(utils_anchor_node).hasClass("postField--body")
        utils.log "ALL GONE from UP"
        @handleCompleteDeletion($(@el))
        if @completeDeletion
          @completeDeletion = false
          return false

      if $(utils_anchor_node).hasClass("section-content") || $(utils_anchor_node).hasClass("graf--first")
        utils.log "SECTION DETECTED FROM KEYUP #{_.isEmpty($(utils_anchor_node).text())}"
        if _.isEmpty($(utils_anchor_node).text())
          next_graf =  $(utils_anchor_node).next(".graf")[0]
          if next_graf
            @setRangeAt next_graf
            $(utils_anchor_node).remove()
            @setupFirstAndLast()
          return false

      if _.isNull(anchor_node)
        @handleNullAnchor()
        return false

      if $(anchor_node).hasClass("graf--first")
        utils.log "THE FIRST ONE! UP"

        if @.getSelectedText() is @.getNode().textContent
          utils.log "remove selection dectected"
          @.getNode().innerHTML = "<br>"

        @markAsSelected(anchor_node)
        @setupFirstAndLast()
        false

      #if anchor_node
      #  @markAsSelected(anchor_node)
      #  @setupFirstAndLast()
      #  @displayTooltipAt($(@el).find(".is-selected"))


    #arrows key
    if _.contains([LEFTARROW, UPARROW, RIGHTARROW, DOWNARROW], e.which)
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
    @scrollTo new_paragraph

  replaceWith: (element_type, from_element)->
    new_paragraph = $("<#{element_type} class='graf graf--#{element_type} graf--empty is-selected'><br/></#{element_type}>")
    from_element.replaceWith(new_paragraph)
    @setRangeAt(new_paragraph[0])
    @scrollTo new_paragraph
    new_paragraph

  #shows the (+) tooltip at current element
  displayTooltipAt: (element)->
    utils.log ("POSITION FOR TOOLTIP")
    #utils.log $(element)
    element = $(element)
    return if !element || _.isUndefined(element) || _.isEmpty(element) || element[0].tagName is "LI"
    @tooltip_view.hide()
    return unless _.isEmpty( element.text() )
    @positions = element.offset()
    @tooltip_view.render()
    @tooltip_view.move(@positions)

  #mark the current row as selected
  markAsSelected: (element)->
    utils.log element
    return if _.isUndefined element

    $(@el).find(".is-selected").removeClass("is-mediaFocused is-selected")
    $(element).addClass("is-selected")

    $(element).find(".defaultValue").remove()
    #set reached top if element is first!
    if $(element).hasClass("graf--first")
      @reachedTop = true
      $(element).append("<br>") if $(element).find("br").length is 0

  addClassesToElement: (element)=>
    n = element
    name = n.nodeName.toLowerCase()
    switch name
      when "p", "pre", "div"
        unless $(n).hasClass("graf--mixtapeEmbed")
          $(n).removeClass().addClass("graf graf--#{name}")

        if name is "p" and $(n).find("br").length is 0
          $(n).append("<br>")

      when "h1", "h2", "h3", "h4", "h5", "h6"
        if name is "h1"
          new_el = $("<h2 class='graf graf--h2'>#{$(n).text()}</h2>")
          $(n).replaceWith(new_el)
          @setElementName(n)
        else
          $(n).removeClass().addClass("graf graf--#{name}")

      when "code"
        #utils.log n
        $(n).unwrap().wrap("<p class='graf graf--pre'></p>")
        n = $(n).parent()

      when "ol", "ul"
        utils.log "lists"
        $(n).removeClass().addClass("postList")
        _.each $(n).find("li"), (li)->
          $(li).removeClass().addClass("graf graf--li")
        #postList , and li as graf

      when "img"
        utils.log "images"
        @uploader_widget.uploadExistentImage(n)
        #set figure non editable

      when "a", 'strong', 'em', 'br', 'b', 'u', 'i'
        utils.log "links"
        $(n).wrap("<p class='graf graf--p'></p>")
        n = $(n).parent()
        #dont know

      when "blockquote"
        #TODO remove inner elements like P
        #$(n).find("p").unwrap()
        n = $(n).removeClass().addClass("graf graf--#{name}")

      when "figure"
        if $(n).hasClass(".graf--figure")
          n = $(n)
      else
        #TODO: for now leave this relaxed, because this is
        #overwriting embeds
        #wrap all the rest
        $(n).wrap("<p class='graf graf--#{name}'></p>")
        n = $(n).parent()

    return n

  setupElementsClasses: (element, cb)->
    if _.isUndefined(element)
      element = $(@el).find('.section-inner')
    else
      element = element

    #setTimeout ()=>
    #clean context and wrap text nodes
    @cleanContents(element)
    @wrapTextNodes(element)
    #setup classes
    _.each  element.children(), (n)=>
      name = $(n).prop("tagName").toLowerCase()
      n = @addClassesToElement(n)
      @setElementName(n)

    @setupLinks(element.find("a"))
    @setupFirstAndLast()
    cb(element) if _.isFunction(cb)
    #, 20

  cleanContents: (element)->
    #TODO: should config tags
    utils.log "ti"
    utils.log element
    if _.isUndefined(element)
      element = $(@el).find('.section-inner')
    else
      element = element

    paste_div = @paste_element_id
    s = new Sanitize
      elements: ['strong','img', 'em', 'br', 'a', 'blockquote', 'b', 'u', 'i', 'pre', 'p', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li']

      attributes:
        '__ALL__': ['class']
        a: ['href', 'title', 'target']
        img: ['src']

      protocols:
        a: { href: ['http', 'https', 'mailto'] }

      transformers: [(input)->
                      if (input.node_name == "span" && $(input.node).hasClass("defaultValue") )
                        return whitelist_nodes: [input.node]
                      if( $(input.node).hasClass("dante-paste") )
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

                      else if(input.node_name == 'div' && ( $(input.node).hasClass("aspectRatioPlaceholder") && $(input.node).parent(".graf--figure").exists() ))
                        return whitelist_nodes: [input.node]

                      else if(input.node_name == 'div' && ( $(input.node).hasClass("aspect-ratio-fill") && $(input.node).parent(".aspectRatioPlaceholder").exists() ))
                        return whitelist_nodes: [input.node]

                      else if(input.node_name == 'img' && $(input.node).parent(".graf--figure").exists() )
                        return whitelist_nodes: [input.node]

                      else if(input.node_name == 'a' && $(input.node).parent(".graf--mixtapeEmbed").exists() )
                        return attr_whitelist: ["style"]

                      else if(input.node_name == 'figcaption' && $(input.node).parent(".graf--figure").exists())
                        return whitelist_nodes: [input.node]

                      else if(input.node_name == 'span' && $(input.node).parent(".imageCaption").exists())
                        return whitelist_nodes: [input.node]
                      else
                        return null
                    ]

    if element.exists()
      utils.log "CLEAN HTML #{element[0].tagName}"
      element.html(s.clean_node( element[0] ))

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
      elements: ['strong', 'em', 'br', 'a', 'b', 'u', 'i', 'ul', 'ol', 'li']

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

  # LIST METHODS

  listify: ($paragraph, listType, regex)->

    utils.log "LISTIFY PARAGRAPH"

    @removeSpanTag($paragraph);

    content = $paragraph.html().replace(/&nbsp;/g, " ").replace(regex, "")

    switch(listType)
      when "ul" then $list = $("<ul></ul>")
      when "ol" then $list = $("<ol></ol>")
      else return false

    @addClassesToElement($list[0])
    @replaceWith("li", $paragraph)
    $li = $(".is-selected")

    @setElementName($li[0])

    $li.html(content).wrap($list)

    if($li.find("br").length == 0)
      $li.append("<br/>")

    @setRangeAt($li[0])

    $li[0]

  handleSmartList: ($item, e)->
    utils.log("HANDLE A SMART LIST")

    chars = @getCharacterPrecedingCaret()
    match = chars.match(/^\s*(\-|\*)\s*$/)
    if(match)
        utils.log("CREATING LIST ITEM")
        e.preventDefault()
        regex = new RegExp(/\s*(\-|\*)\s*/)
        $li = @listify($item, "ul", regex)
    else
      match = chars.match(/^\s*1(\.|\))\s*$/)
      if(match)
        utils.log("CREATING LIST ITEM")
        e.preventDefault()

        regex = new RegExp(/\s*1(\.|\))\s*/)
        $li = @listify($item, "ol", regex)
    $li

  handleListLineBreak: ($li, e)->
    utils.log("LIST LINE BREAK")
    @tooltip_view.hide()
    $list = $li.parent("ol, ul")
    $paragraph = $("<p></p>")
    utils.log($li.prev());
    if($list.children().length is 1 and $li.text() is "")
      @replaceWith("p", $list)

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
      @addClassesToElement($paragraph[0])
      @setRangeAt($paragraph[0])
      @markAsSelected($paragraph[0])
      @scrollTo($paragraph)

  handleListBackspace: ($li, e)->

    $list = $li.parent("ol, ul")
    utils.log("LIST BACKSPACE")

    if($li.prev().length is 0)
      e.preventDefault()

      $list.before($li)
      content = $li.html()
      @replaceWith("p", $li)
      $paragraph = $(".is-selected")
      $paragraph.removeClass("graf--empty").html(content).attr("name", utils.generateUniqueName());

      if($list.children().length is 0)
        $list.remove()

      @setupFirstAndLast()

  #Remove Non-default Spans From Elements
  removeSpanTag: ($item)->

    $spans = $item.find("span")
    $(span).replaceWith($(span).html()) for span in $spans when not $(span).hasClass("defaultValue")
    $item

