window.Editor = {

}

###
#TODO:
+ set selected <p> like medium
+ shows the + when selected <p> is empty
###

# make it accessible
window.selection = 0

class Editor.MainEditor extends Backbone.View
  el: "#editor"

  events:
    "blur"    : "handleBlur"
    #"focus"   : "handleCaret"
    #"keyup"   : "handleCaret"
    #"mouseup" : "handleCaret"
    "selectstart": "getSelection"
    "mousedown": "getSelection"
    "keydown" : "handleKeyDown"
    "keyup" : "handleCarriageReturn"

  initialize: (opts = {})=>
    @editor_options = opts

  template: ()=>
    "<section class='section-content'>
      <div class='section-inner'>
        <h3 class='graf--h3'>title here</h3>
        <p class='graf--p'>body here<p>
      </div>
    </section>"

  render: ()=>
    @template()
    $(@el).html @template()
    $(@el).attr("contenteditable", "true")

    $(@el).wrap("<div class='notesSource'></div>")

    $("<div id='editor-menu' class='editor-menu' style='display: none;'></div>").insertAfter(@el)
    $("<div class='inlineTooltip2 button-scalableGroup is-active'></div>").insertAfter(@el)

    @editor_menu = new Editor.Menu()

    @tooltip_view = new Editor.Tooltip()
    @tooltip_view.render()

  handleBlur: (ev)=>
    console.log("Handle blur #{ev}")
    @editor_menu.hide()
    @tooltip_view.hide()

  handleFocus: (ev)=>
    console.log("Handle focus #{ev}")

  getSelection: (ev)->
    _this = @
    $(document).one 'mouseup', ()->
      _this.displayMenu @.getSelection()

  getNode: ()->

    node = undefined
    root = @el
    range = @selection().getRangeAt(0)
    node = range.commonAncestorContainer
    return null  if not node or node is root
    node = node.parentNode  while node and (node.nodeType isnt 1) and (node.parentNode isnt root)
    #node = node.parentNode  while node and (node.parentNode isnt root)
    (if root.contains(node) then node else null)

  displayMenu: (sel)->
    #we only display menu if sel.type is "Range"
    #console.log sel
    return if _.isEmpty(sel.anchorNode.textContent)
    #return unless sel.type is "Range"
    if sel.baseOffset > 0 or sel.focusOffset > 0
      @handleCaret()
      @editor_menu.render()
    else
      @editor_menu.hide()

  handleCaret: ()->
    @resetOffset($(@el));

  handleArrow: (ev)=>
    console.log("ENTER ARROWS")
    console.log @getNode()
    #range = @selection().getRangeAt(0)
    #debugger
    current_node = $(@getNode())

    @displayTooltipAt( current_node )
    @markAsSelected( current_node )

  resetOffset: ($textField)=>
    offset = $textField.caret('offset');
    position = $textField.caret('position');
    @resizeBox(offset, position)
    offset

  resizeBox: (offset, position)->
    @editor_menu.$el.offset({left: offset.left-50, top: offset.top + offset.height + 2})

  selection: ()=>
    selection
    if (window.getSelection)
      selection = window.getSelection()
    else if (document.selection && document.selection.type != "Control")
      selection = document.selection

  handleKeyDown: (e)->
    e.preventDefault() if _.contains([13], e.which)

  displayTooltipAt: (element)->
    console.log $(element)

    @tooltip_view.hide()
    return unless _.isEmpty( $(element).text() )
    @position = $(element).offset()
    @tooltip_view.render()
    @tooltip_view.move(left: @position.left - 60 , top: @position.top - 5 )

  markAsSelected: (element)->
    console.log "selecting."
    console.log $(element)
    $(@el).find(".is-selected").removeClass("is-selected")
    $(element).addClass("is-selected")

  handleCarriageReturn: (e)->
    @editor_menu.hide() #hides menu just in case

    anchor_node = @selection().anchorNode #current node on which cursor is positioned
    previous_node = anchor_node.previousSibling
    next_node = anchor_node.nextSibling

    #enter key
    if (e.which == 13)
      e.preventDefault() #http://stackoverflow.com/questions/6023307/dealing-with-line-breaks-on-contenteditable-div

      #removes all childs
      $(@el).find(".graf--p").removeClass("is-selected")

      range = @selection().getRangeAt(0)

      console.log("here it is parent")
      parent = $(range.commonAncestorContainer.parentElement)

      if parent.prop("tagName") != "P"
        #TODO: we block more enters because we don't now how to handle this yet
        return

      current_node = $("<p class='graf--p graf--empty is-selected'><br/></p>")
      current_node.insertAfter(parent)

      #set caret on new <p>
      range = document.createRange()
      sel = window.getSelection()

      range.setStart(current_node[0], 0);
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
      @el.focus()

      #shows tooltip
      @displayTooltipAt($(current_node))

    #delete key
    if (e.which == 8)
      @tooltip_view.hide()
      node = document.getSelection().anchorNode;
      #current_node = $(if node.nodeType == 3 then node.parentNode else node)
      if $(anchor_node).text() is ""
        @position = $(anchor_node).offset()
        setTimeout(
          ()=>
            @tooltip_view.render()
            @tooltip_view.move(left: @position.left - 60 , top: @position.top - 55 )
        , 200)

    #arrows key
    if _.contains([37,38,39,40], e.which)
      @handleArrow(e)



class Editor.Menu extends Backbone.View
  el: "#editor-menu"

  initialize: ()=>

  template: ()=>
    '<i class="editor-icon icon-blockquote" data-action="blockquote"></i>
    <i class="editor-icon icon-h2" data-action="h2"></i>
    <i class="editor-icon icon-h3" data-action="h3"></i>'

  render: ()=>
    #console.log "RENDER"
    $(@el).html(@template())
    #console.log $(@el).length
    @show()

  show: ()->
    $(@el).show()

  hide: ()->
    $(@el).hide()


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



###
addEvent(document.getElementById('clear'), 'click', function () {
  localStorage.clear();
  window.location = window.location; // refresh
});

if (localStorage.getItem('contenteditable')) {
  editable.innerHTML = localStorage.getItem('contenteditable');
}
###
