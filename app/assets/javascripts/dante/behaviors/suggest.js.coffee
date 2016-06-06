utils = Dante.utils

class Dante.View.Behavior.Suggest extends Dante.View.Behavior

  "keyup"    : "handleKeyUp"

  initialize: (opts={})->
    @actionEvent = opts.title
    @current_editor = opts.current_editor
    @_name = null

  # idea:
  # detectar si existe el markup--query, 
  # si existe checkear si estoy dentro tipeando
  # si estoy dentro no hacer nada (osea buscar)
  # si no estoy dentro, borrar (reemplazar por texto) y crear el nuevo
  handleKeyPress: (e)->
    
    #if @_name
    # e.preventDefault()
 
    if e.keyCode is 64
      e.preventDefault()

      # unless inside markup
      unless @checkQuery()
        # debugger
        @pasteHtmlAtCaret(@wrapperTemplate("@"), false)

  getSelectionStart: ->
    node = document.getSelection().anchorNode
    if node.nodeType == 3 then node.parentNode else node

  checkQuery: (node)->
    $(@getSelectionStart()).hasClass(".markup--query")

  wrapperTemplate: (name)->
    "<span class='markup--query'>#{name}</span>"

  linkTemplate: ()->
    "<a href='https://medium.com/u/ac63ac3175a7' 
      data-href='https://medium.com/u/ac63ac3175a'
      data-anchor-type='2'
      data-user-id='ac63ac3175a7' 
      data-action='show-user-card' 
      data-action-type='hover' 
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



