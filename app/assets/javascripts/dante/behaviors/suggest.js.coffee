utils = Dante.utils

class Dante.View.Behavior.Suggest extends Dante.View.Behavior

  el: "body"
  #"keyup"    : "handleKeyUp"

  #events:
  #  "mouseover .markup--query" : "displayPopOver"
  #  "mouseout  .markup--query" : "hidePopOver"

  events:
    "click .typeahead-item": "handleOptionSelection"

  initialize: (opts={})->
    @actionEvent = opts.title
    @current_editor = opts.current_editor
    @_name = null
    @fetch_results = []

    # TODO: this has to be pluggable too!
    #@pop_over_typeahead = new Dante.Editor.PopOverTypeAhead(editor: @)
    #@pop_over_typeahead.render().hide()

  displayPopOver: (ev)->
    @current_editor.pop_over_typeahead.displayAt(@getSelectionStart())

  hidePopOver: (ev)->
    console.log "display popover from typeahead"
    @current_editor.pop_over_typeahead.displayAt(ev)

  handleOptionSelection: (ev)->
    debugger
    @current_editor.pop_over_typeahead.handleOptionSelection()
  
  # idea:
  # detectar si existe el markup--query, 
  # si existe checkear si estoy dentro tipeando
  # si estoy dentro no hacer nada (osea buscar)
  # si no estoy dentro, borrar (reemplazar por texto) y crear el nuevo
  handleKeyPress: (e)->
    
    #if @_name
    # e.preventDefault()
    if !@insideQuery()
      if e.keyCode is 64
        e.preventDefault()
        @pasteHtmlAtCaret(@wrapperTemplate("@"), false)
    else    
      console.log "ok let's search"
      if @getResults()
        @displayPopOver(e)
        @current_editor.pop_over_typeahead.appendData(@fetch_results)
        console.log @fetch_results
      
  getResults: ->
    @fetch_results = @fakeResults()

  fakeResults: ->
    [{text: "John Lennon", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg", description: "@john"},
    {text: "Ringo Star", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/iannnnn/128.jpg", description: "@ringo"},
    {text: "Paul McCartney", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg", description: "@paul"}]

  getSelectionStart: ->
    node = document.getSelection().anchorNode
    if node.nodeType == 3 then node.parentNode else node

  insideQuery: ()->
    console.log $(@getSelectionStart())
    #debugger
    $(@getSelectionStart()).hasClass("markup--query")

  wrapperTemplate: (name)->
    "<span class='markup--query'>#{name}</span>"

  linkTemplate: ()->
    "<a href='#' 
      data-href='#'
      class='markup--user markup--p-user'>
      John Doe
    </a>"

  # not used
  placeCaretAtEnd: (el) ->
    el.focus()
    if typeof window.getSelection != 'undefined' and typeof document.createRange != 'undefined'
      range = document.createRange()
      range.selectNodeContents el
      range.collapse false
      sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange range
    else if typeof document.body.createTextRange != 'undefined'
      textRange = document.body.createTextRange()
      textRange.moveToElementText el
      textRange.collapse false
      textRange.select()
    return

  # http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
  pasteHtmlAtCaret: (html, selectPastedContent) ->
    sel = undefined
    range = undefined
    if window.getSelection
      # IE9 and non-IE
      sel = window.getSelection()
      if sel.getRangeAt and sel.rangeCount
        range = sel.getRangeAt(0)
        range.deleteContents()
        # Range.createContextualFragment() would be useful here but is
        # only relatively recently standardized and is not supported in
        # some browsers (IE9, for one)
        el = document.createElement('div')
        el.innerHTML = html
        frag = document.createDocumentFragment()
        node = undefined
        lastNode = undefined
        while node = el.firstChild
          lastNode = frag.appendChild(node)
        firstNode = frag.firstChild
        range.insertNode frag

        # Preserve the selection
        if lastNode
          range = range.cloneRange()
          range.setStartAfter lastNode
          if selectPastedContent
            range.setStartBefore firstNode
          else
            range.collapse true
          sel.removeAllRanges()
          sel.addRange range
    else if (sel = document.selection) and sel.type != 'Control'
      # IE < 9
      originalRange = sel.createRange()
      originalRange.collapse true
      sel.createRange().pasteHTML html
      if selectPastedContent
        range = sel.createRange()
        range.setEndPoint 'StartToStart', originalRange
        range.select()
    return

