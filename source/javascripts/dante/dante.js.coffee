
window.Editor = {

}

utils = {}

###
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
###

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

class Editor.MainEditor extends Backbone.View
  #el: "#editor"

  events:
    "blur"    : "handleBlur"
    "mouseup" : "handleMouseUp"
    "keydown" : "handleKeyDown"
    "keyup"   : "handleKeyUp"
    "paste"   : "handlePaste"
    "destroyed .graf--first" : "handleDeletedContainer"
    "focus .graf" : "handleFocus"

  initialize: (opts = {})=>
    @editor_options = opts
    window.current_editor = @
    #globals for selected text and node
    @initial_html = $(@el).html()
    @current_range = null
    @current_node = null
    @el = opts.el || "#editor"
    window.debugMode = opts.debug || false
    @upload_url  = opts.upload_url  || "/images.json"
    @oembed_url  = opts.oembed_url  || "http://api.embed.ly/1/oembed?url="
    @extract_url = opts.extract_url || "http://api.embed.ly/1/extract?key=86c28a410a104c8bb58848733c82f840&url="

    if (localStorage.getItem('contenteditable'))
      $(@el).html  localStorage.getItem('contenteditable')

    @store()
    @setupElementsClasses()

    @title_placeholder    = "<span class='defaultValue defaultValue--root'>Title…</span><br>"
    @body_placeholder     = "<span class='defaultValue defaultValue--root'>Tell your story…</span><br>"
    @embed_placeholder    = "<span class='defaultValue defaultValue--prompt'>Paste a YouTube, Vine, Vimeo, or other video link, and press Enter</span><br>"
    @extract_placeholder  = "<span class='defaultValue defaultValue--prompt'>Paste a link to embed content from another site (e.g. Twitter) and press Enter</span><br>"

  store: ()->
    localStorage.setItem("contenteditable", $(@el).html() )
    setTimeout ()=>
      #utils.log("storing")
      #@store()
      1 +1
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
    "<p class='graf--p' name='#{@generateUniqueName()}'><br></p>"

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
    unless _.isEmpty text
      @current_range = @getRange()
      @current_node  = anchor_node
      @.displayMenu()

  relocateMenu: (position)->
    padd = @editor_menu.$el.width() / 2
    top = position.top + $('body').scrollTop() - 43
    console.log position
    l = position.left + (position.width / 2) - padd
    @editor_menu.$el.offset({left: l , top: top  })

  hidePlaceholder: (element)->
    $(element).find("span.defaultValue").remove().html("<br>")

  displayEmptyPlaceholder: (element)->
    $(".graf--first").html(@title_placeholder)
    $(".graf--last").html(@body_placeholder)

  handleFocus: (ev)=>
    @markAsSelected(ev.currentTarget)
    @displayTooltipAt( ev.currentTarget )

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
    @handleTextSelection(anchor_node)
    utils.log anchor_node
    @hidePlaceholder(anchor_node)
    @markAsSelected( anchor_node )
    @displayTooltipAt( anchor_node )

  handleArrow: (ev)=>
    current_node = $(@getNode())
    if current_node
      @markAsSelected( current_node )
      @displayTooltipAt( current_node )

  handleArrowDown: (ev)=>
    utils.log("ENTER ARROW DOWN #{ev.key}")

    current_node = $(@getNode())
    utils.log(ev)
    ev_type = ev.originalEvent.key

    #handle keys for image figure
    switch ev_type

      when "Down"
        figure = current_node.next()
        if figure.hasClass("graf--figure")
          utils.log "IS FIGURE!"
          @setRangeAt current_node.next().find(".imageCaption")[0]
          figure.addClass("is-mediaFocused is-selected")
          false
        else if current_node.hasClass("graf--figure")
          @setRangeAt current_node.next(".graf")[0]
          figure.removeClass("is-mediaFocused is-selected")
          false

        #if graf--mixtapeEmbed
        #if graf--iframe

      when "Up"
        figure = current_node.prev()
        if figure.hasClass("graf--figure")
          utils.log "IS FIGURE!"
          @setRangeAt current_node.prev().find(".imageCaption")[0]
          figure.addClass("is-mediaFocused is-selected")
          false
        else if current_node.hasClass("graf--figure")
          @setRangeAt current_node.prev(".graf")[0]
          figure.removeClass("is-mediaFocused is-selected")
          false

  handlePaste: (ev)=>
    utils.log("pasted!")
    setTimeout ()=>
      @aa =  @getNode()
      #@setupElementsClasses ()=>
      #  #debugger
      #  #$(@aa).next('[class^="graf--"]').focus()
    , 20

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

      #supress linebreak into embed unless last char
      if parent.hasClass("graf--mixtapeEmbed") or parent.hasClass("graf--iframe")
        return false unless @isLastChar()

      @tooltip_view.cleanOperationClasses($(anchor_node))

      if (anchor_node && @editor_menu.lineBreakReg.test(anchor_node.nodeName))
        #new paragraph is it the last character
        if @isLastChar()
          utils.log "new paragraph is it the last character"
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

    #arrows key
    if _.contains([37,38,39,40], e.which)
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

  setupElementsClasses: (cb)->
    setTimeout ()=>
      @cleanContents()
      @wrapTextNodes()

      _.each  $(@el).find(".section-inner").children(), (n)=>
        name = $(n).prop("tagName").toLowerCase()
        #n = @preCleanNode n
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
            #set figure non editable
          when "a"
            #utils.log "links"
            $(n).wrap("<p class='graf graf--#{name}'></p>")
            n = $(n).parent()
            #dont know

        @setElementName(n)

      @setupLinks($(@el).find(".section-inner a"))
      @setupFirstAndLast()
      #node = @getNode()
      #@markAsSelected( node ) #set selected
      #@displayTooltipAt( node )
      cb() if _.isFunction(cb)
    , 20

  cleanContents: ()->
    #TODO: should config tags
    s = new Sanitize
      elements: ['div', 'strong', 'em', 'br', 'a', 'span', 'blockquote', 'b', 'u', 'i', 'pre', 'p', 'h2', 'h3']
      attributes:
          '__ALL__': ['class']
          a: ['href', 'title']
      protocols:
          a: { href: ['http', 'https', 'mailto'] }
    ###
    transformers: [(input)->
                    if(input.node_name == 'p')
                      return whitelist_nodes: [input.node]
                  ,
                  (input)->
                    if(input.node_name == 'pre')
                      debugger
                      return null
                  ]
    ###

    utils.log "CLEAN HTML"
    unless _.isEmpty $(@el).find('.section-inner')
      $(@el).find('.section-inner').html(s.clean_node( $(@el).find('.section-inner')[0] ))
    #.contents().unwrap()

  setupLinks: (elems)->
    _.each elems, (n)->
      parent_name = $(n).parent().prop("tagName").toLowerCase()
      $(n).addClass("markup--anchor markup--#{parent_name}-anchor")
      href = $(n).attr("href")
      $(n).attr("data-href", href)

  preCleanNode: (element)->
    s = new Sanitize
      elements: ['a', 'b', 'u', 'i', 'pre', 'blockquote']
      attributes:
        a: ['href', 'title']
    #debugger
    $(element).html(s.clean_node( $($(element).html())[0] ))
    $(element)

  setupFirstAndLast: ()=>
    childs = $(@el).find(".section-inner").children()
    childs.removeClass("graf--last , graf--first")
    childs.first().addClass("graf--first")
    childs.last().addClass("graf--last")

  wrapTextNodes: ()->
    $(@el).find(".section-inner").contents().filter(->
      @nodeType is 3 and @data.trim().length > 0
    ).wrap "<p class='graf grap--p'></p>"

  setElementName: (element)->
    $(element).attr("name", @generateUniqueName())

  generateUniqueName: (element)->
     Math.random().toString(36).slice(8)

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

    #@cleanContents()
    false

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
    "<figure contenteditable='false' class='graf graf--figure is-defaultValue' name='' tabindex='0'>
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
    utils.log "OLI!!"
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
  imageSelect: (ev)->
    $selectFile = $('<input type="file" multiple="multiple">').click()
    self = @
    $selectFile.change ()->
      t = this
      self.uploadFiles(t.files)

  displayCachedImage: (file)->
    @node = current_editor.getNode()
    replaced_node = $(@node).replaceWith(@insertTemplate())
    current_editor.tooltip_view.hide()
    reader = new FileReader()
    reader.onload = (e)->
      $('img.graf-image').attr('src', e.target.result)
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
        @displayCachedImage(file)
        @uploadFile file
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
  ##

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
      replaced_node.find(".markup--anchor").attr("href", data.url ).text(data.url)
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


