
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
    "keypress" : "handleKeyPress"
    "paste"    : "handlePaste"
    "dblclick" : "handleDblclick"
    "dragstart": "handleDrag"
    "drop"     : "handleDrag"
    
    # TODO: this events should be in tooltip class
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
    @image_delete_callback = opts.image_delete_callback
    @image_caption_placeholder = opts.image_caption_placeholder || "Type caption for image (optional)"

    @oembed_url      = opts.oembed_url  || "http://api.embed.ly/1/oembed?key=#{opts.api_key}&url="
    @extract_url     = opts.extract_url || "http://api.embed.ly/1/extract?key=#{opts.api_key}&url="
    @default_loading_placeholder = opts.default_loading_placeholder || Dante.defaults.image_placeholder
    @embed_caption_placeholder = opts.embed_caption_placeholder || "Type caption for embed (optional)"

    @store_url       = opts.store_url
    @store_method    = opts.store_method || "POST"
    @store_success_handler = opts.store_success_handler
    
    @spell_check     = opts.spellcheck || false
    @disable_title   = opts.disable_title || false
    @store_interval  = opts.store_interval || 1500
    @paste_element_id = "#dante-paste-div"
    @tooltip_class   = opts.tooltip_class || Dante.Editor.Tooltip
    
    # suggest feature options
    @suggest_url              = opts.suggest_url || "/api/suggest.json"
    @suggest_query_param      = opts.suggest_query_param || "q"
    @suggest_query_timeout    = opts.suggest_query_timeout || 300
    @suggest_handler          = opts.suggest_handler || null
    @suggest_resource_handler = opts.suggest_resource_handler || null
    
    opts.base_widgets   ||= ["uploader", "embed", "embed_extract"]
    opts.base_behaviors ||= ["save", "image", "paste", "list", "suggest"]
    opts.base_popovers  ||= ["anchor", "typeahead", "card", "align"]

    @widgets   = []
    @behaviors = []
    @popovers  = []

    window.debugMode = opts.debug || false

    $(@el).addClass("debug") if window.debugMode

    titleplaceholder    = opts.title_placeholder  || 'Title'
    @title_placeholder  = "<span class='defaultValue defaultValue--root'>#{titleplaceholder}</span><br>"
    @title              = opts.title              || ''
    bodyplaceholder     = opts.body_placeholder   || 'Tell your story…'
    @body_placeholder   = "<span class='defaultValue defaultValue--root'>#{bodyplaceholder}</span><br>"
    embedplaceholder    = opts.embed_placeholder  || 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter'
    @embed_placeholder  = "<span class='defaultValue defaultValue--root'>#{embedplaceholder}</span><br>"
    extractplaceholder  = opts.extract_placeholder|| "Paste a link to embed content from another site (e.g. Twitter) and press Enter"
    @extract_placeholder= "<span class='defaultValue defaultValue--root'>#{extractplaceholder}</span><br>"
    
    @initializeWidgets(opts)

  initializeBehaviors: (opts)->
    base_behaviors = opts.base_behaviors
    self = @

    if base_behaviors.indexOf("suggest") >= 0
      @suggest_behavior = new Dante.View.Behavior.Suggest(current_editor: @, el: @el)
      @behaviors.push @suggest_behavior

    if base_behaviors.indexOf("save") >= 0
      @save_behavior = new Dante.View.Behavior.Save(current_editor: @, el: @el)
      @behaviors.push @save_behavior

    if base_behaviors.indexOf("paste") >= 0
      @paste_behavior = new Dante.View.Behavior.Paste(current_editor: @, el: @el)
      @behaviors.push @paste_behavior

    if base_behaviors.indexOf("image") >= 0
      @image_behavior = new Dante.View.Behavior.Image(current_editor: @, el: @el)
      @behaviors.push @image_behavior

    if base_behaviors.indexOf("list") >= 0
      @list_behavior = new Dante.View.Behavior.List(current_editor: @, el: @el)
      @behaviors.push @list_behavior

    # add extra behaviors
    if opts.extra_behaviors
      _.each opts.extra_behaviors, (w)=>
        if !w.current_editor
          w.current_editor = self
        @behaviors.push w

  initializeWidgets: (opts)->
    # TODO: this could be a hash to access widgets without var
    # Base widgets
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

    # add extra widgets
    if opts.extra_tooltip_widgets
      _.each opts.extra_tooltip_widgets, (w)=>
        if !w.current_editor
          w.current_editor = self
        @widgets.push w

  intializePopOvers: (opts)->

    base_popovers = opts.base_popovers
    self = @

    if base_popovers.indexOf("anchor") >= 0
      @pop_over = new Dante.Editor.PopOver(editor: @)
      @pop_over.render().hide()

    if base_popovers.indexOf("typeahead") >= 0
      @pop_over_typeahead  = new Dante.Editor.PopOverTypeAhead(editor: @)
      @popovers.push @pop_over_typeahead

    if base_popovers.indexOf("card") >= 0
      @pop_over_card = new Dante.Editor.PopOverCard(editor: @)
      @popovers.push @pop_over_card

    if base_popovers.indexOf("align") >= 0
      @pop_over_align = new Dante.Editor.ImageTooltip(editor: @)
      @popovers.push @pop_over_align

    # add extra widgets
    if opts.extra_popovers
      _.each opts.extra_popovers, (w)=>
        if !w.current_editor
          w.current_editor = self
        @popovers.push w

    # render and hide
    @popovers.forEach (p)->
      p.render().hide()

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
          <p class='graf graf--p'>#{@body_placeholder}</p>
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
    
    @intializePopOvers(@editor_options)

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
    @initializeBehaviors(@editor_options)

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

  getSelectionStart: ->
    node = document.getSelection().anchorNode
    return if node is null
    if node.nodeType == 3 then node.parentNode else node

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
    return null if not node or node is root

    #node = node.parentNode while node and (node.nodeType isnt 1) and (node.parentNode isnt root)
    #node = node.parentNode while node and (node.parentNode isnt root)

    node = node.parentNode while node and (node.nodeType isnt 1 or not $(node).hasClass("graf")) and (node.parentNode isnt root)
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

  # get text of selected and displays menu
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
  handleArrowForKeyUp: (ev)=>
    current_node = $(@getNode())
    if current_node.length > 0
      @markAsSelected( current_node )
      @displayTooltipAt( current_node )

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
  handlePaste: (e)=>
    @continue = true
    #handle paste for each widget
    utils.log("HANDLING PASTE");
    parent = @getNode()

    _.each @behaviors, (b)=>
      if b.handlePaste
        b.handlePaste(e, parent);

    return false unless @continue

  handleUnwrappedImages: (elements)->
    # http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
    _.each elements.find("img"), (image)=>
      utils.log ("process image here!")
      @uploader_widget.uploadExistentImage(image)

  handleInmediateDeletion: (element)->
    @inmediateDeletion = false
    new_node = $( @baseParagraphTmpl() ).insertBefore( $(element) )
    new_node.addClass("is-selected")
    @setRangeAt($(element).prev()[0])
    $(element).remove()

  # TODO: not used anymore, remove this
  # when found that the current node is text node
  # create a new <p> and focus
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

      @displayTooltipAt(@findSelected())

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

    @continue = true

    anchor_node = @getNode() #current node on which cursor is positioned
    parent = $(anchor_node)

    @markAsSelected( anchor_node ) if anchor_node

    #handle keyups for each widget
    utils.log("HANDLING Behavior KEYDOWN");

    if e.which is TAB
      @handleTab(anchor_node)
      return false

    if e.which is ENTER

      #removes previous selected nodes
      @findSelected().removeClass("is-selected")

      utils.log @isLastChar()

      #handle keydowns for each widget
      utils.log("HANDLING WIDGET ENTER");
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
          @setRangeAtText(@findSelected()[0])

          @findSelected().trigger("mouseup") #is not making any change
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
        # set name on new element
        @setElementName($(node))

        if node.nodeName.toLowerCase() is "div"
          node = @replaceWith("p", $(node))[0]
        @markAsSelected( $(node) ) #if anchor_node
        @setupFirstAndLast()

        # empty childs if text is empty
        if _.isEmpty $(node).text().trim()
          _.each $(node).children(), (n)->
            $(n).remove()
          $(node).append("<br>")

        # shows tooltip
        @displayTooltipAt(@findSelected())
      , 2

    # delete key
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

      #select an image if backspacing into it from a paragraph
      #if($(anchor_node).hasClass("graf--p") && @isFirstChar() )
      #  if($(anchor_node).prev().hasClass("graf--figure") && @getSelectedText().length == 0)
      #    e.preventDefault();
      #    $(anchor_node).prev().find("img").click();
      #    utils.log("Focus on the previous image");

      if $(utils_anchor_node).hasClass("section-content") || $(utils_anchor_node).hasClass("graf--first")
        utils.log "SECTION DETECTED FROM KEYDOWN #{_.isEmpty($(utils_anchor_node).text())}"
        return false if _.isEmpty($(utils_anchor_node).text())

      if anchor_node && anchor_node.nodeType is 3
        # @displayEmptyPlaceholder()
        utils.log("TextNode detected from Down!")
        #return false
    
    #hides tooltip if anchor_node text is empty
    if anchor_node
      if !_.isEmpty($(anchor_node).text())
        @tooltip_view.hide()
        $(anchor_node).removeClass("graf--empty")

    _.each @behaviors, (b)=>
      if b.handleKeyDown
        b.handleKeyDown(e, parent);

    return false unless @continue

  handleKeyUp: (e , node)->

    @continue = true

    if @skip_keyup
      @skip_keyup = null
      utils.log "SKIP KEYUP"
      return false

    utils.log "ENTER KEYUP"

    @editor_menu.hide() #hides menu just in case
    @reachedTop = false
    anchor_node = @getNode() #current node on which cursor is positioned
    utils_anchor_node = utils.getNode()

    @handleTextSelection(anchor_node)

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
      @handleArrowForKeyUp(e)
      #return false

    # handle keyups for each widget
    utils.log("HANDLING Behavior KEYUPS");
    _.each @behaviors, (b)=>
      if b.handleKeyUp
        b.handleKeyUp(e)

    return false unless @continue

  handleKeyPress: (e, node)->
    anchor_node = @getNode()
    parent = $(anchor_node)

    @hidePlaceholder(parent)

    # handle keyups for each widget
    utils.log("HANDLING Behavior KEYPRESS");
    _.each @behaviors, (b)=>
      if b.handleKeyPress
        b.handleKeyPress(e, parent);

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
    utils.log "MARK AS SELECTED"

    return if _.isUndefined element

    @findSelected().removeClass("is-mediaFocused is-selected")

    $(element).addClass("is-selected")

    #$(element).find(".defaultValue").remove()
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
    _.each element.children(), (n)=>
      name = $(n).prop("tagName").toLowerCase()
      n = @addClassesToElement(n)
      @setElementName(n)

    @setupLinks(element.find("a"))
    @setupFirstAndLast()
    cb(element) if _.isFunction(cb)
    #, 20

  cleanContents: (element)->
    # TODO: should config tags
    if _.isUndefined(element)
      element = $(@el).find('.section-inner')
    else
      element = element

    paste_div = @paste_element_id
    s = new Sanitize
      elements: ['strong','img', 'em', 'br', 'a', 'blockquote', 'b', 'u', 'i', 'pre', 'p', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li']

      attributes:
        '__ALL__': ['class']
        a: ['href', 'title', 'target', 'data-id', 'data-type', 'data-href', 'data-avatar']
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
    unless $(n).data("type") is "user"
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
    childs.removeClass("graf--last, graf--first")
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

  # Remove Non-default Spans From Elements
  removeSpanTag: ($item)->
    $spans = $item.find("span")
    $(span).replaceWith($(span).html()) for span in $spans when not $(span).hasClass("defaultValue")
    $item

  findSelected: ->
    $(@el).find(".is-selected")
