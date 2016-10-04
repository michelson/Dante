String.prototype.killWhiteSpace = ()->
  this.replace(/\s/g, '')

String.prototype.reduceWhiteSpace = ()->
  this.replace(/\s+/g, ' ')

utils = {}
#window.Dante.utils = utils


## NEW ONES from react-text-editor

utils.getSelectionRange = () =>
  selection = window.getSelection();
  return null if (selection.rangeCount is 0)
  return selection.getRangeAt(0);

utils.getSelectedBlockElement = (range) =>
  node = range.startContainer;
  while (node isnt null)
    nodeIsDataBlock = if node.getAttribute then node.getAttribute('data-block') else null;
    #return node if (nodeIsDataBlock)
    node = node.parentNode;
  
  return null;

utils.getSelectedNode = (range) =>
  #debugger
  node = range.startContainer;
  while (node isnt null)
    #nodeIsDataBlock = if node.getAttribute then node.getAttribute('data-block') else null;
    #return node if (nodeIsDataBlock)
    node = node.parentNode
    return node
  
  return null;

utils.getSelectionCoords = (selectionRange) =>
  editorBounds = document.getElementById('richEditor').getBoundingClientRect();
  rangeBounds = selectionRange.getBoundingClientRect();
  rangeWidth = rangeBounds.right - rangeBounds.left;
  rangeHeight = rangeBounds.bottom - rangeBounds.top;
  offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2) - (72 / 2);
  # 42px is height of inline toolbar (35px) + 5px center triangle and 2px for spacing
  offsetTop = rangeBounds.top - editorBounds.top - 42;
  return { offsetLeft, offsetTop };


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

utils.getNodeDIS = ()->
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
utils.getSelectionDimensionsDIS = ->
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

    return rect

utils.getSelectionDimensions = (selected) =>
  _rect = selected.getRangeAt(0).getBoundingClientRect();
  #selected.getRangeAt(0).getBoundingClientRect()
  rect = _rect && _rect.top ? _rect : selected.getRangeAt(0).getClientRects()[0];
  if (!rect)
    if (selected.anchorNode && selected.anchorNode.getBoundingClientRect)
      rect = selected.anchorNode.getBoundingClientRect()
      rect.isEmptyline = true
    else
      return null
  return rect

utils.getNode = (root= window) =>
  t = null;
  if (root.getSelection)
    t = root.getSelection();
  else if (root.document.getSelection)
    t = root.document.getSelection();
  else if (root.document.selection)
    t = root.document.selection.createRange().text;
  return t;

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

utils.getSelectedText = () ->
  text = ""
  if typeof window.getSelection != "undefined"
    text = window.getSelection().toString()
  else if typeof document.selection != "undefined" && document.selection.type == "Text"
    text = document.selection.createRange().text
  text

utils.selection = ()=>
  selection
  if (window.getSelection)
    selection = window.getSelection()
  else if (document.selection && document.selection.type != "Control")
    selection = document.selection

utils.getSelectionStart = ->
  node = document.getSelection().anchorNode
  return if node is null
  if node.nodeType == 3 then node.parentNode else node

utils.getRange = () ->
  editor = $(@el)[0]
  range = selection && selection.rangeCount && selection.getRangeAt(0)
  range = document.createRange() if (!range)
  if !editor.contains(range.commonAncestorContainer)
    range.selectNodeContents(editor)
    range.collapse(false)
  range

utils.setRange = (range)->
  range = range || this.current_range
  if !range
    range = this.getRange()
    range.collapse(false) # set to end

  @selection().removeAllRanges()
  @selection().addRange(range)
  @

utils.getCharacterPrecedingCaret = ->
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

utils.isLastChar = ()->
  $(@getNode()).text().trim().length is @getCharacterPrecedingCaret().trim().length

utils.isFirstChar = ()->
  @getCharacterPrecedingCaret().trim().length is 0

utils.isSelectingAll = (element)->
  a = @getSelectedText().killWhiteSpace().length
  b = $(element).text().killWhiteSpace().length
  a is b

#set focus and caret position on element
utils.setRangeAt = (element, pos=0)->
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
utils.setRangeAtText = (element, pos=0)->
  range = document.createRange()
  sel = window.getSelection()
  node = element.firstChild;
  range.setStart(node, 0); #DANGER this is supported by IE 9
  range.setEnd(node, 0);
  range.collapse(true)
  sel.removeAllRanges()
  sel.addRange(range)
  element.focus()


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


### DOM UTILS ###

# http://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
utils.scrollTop = (element, to, duration)->
  return if (duration <= 0) 

  difference = to - element.scrollTop;
  perTick = difference / duration * 10;

  setTimeout( ()->
      element.scrollTop = element.scrollTop + perTick;
      return if (element.scrollTop is to)
      scrollTo(element, to, duration - 10);
  , 10);

utils.outerHeight = (el)->
  height = el.offsetHeight
  style = getComputedStyle(el)

  height += parseInt(style.marginTop) + parseInt(style.marginBottom)
  return height

###
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
###




module.exports = utils