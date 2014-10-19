window.Editor = {

}

###
#TODO:
+ OK set selected <p> like medium
+ OK shows the + when selected <p> is empty
+ detect enter key between words to split and duplicate tags
+ actions over text
###

# make it accessible
window.selection = 0

class Editor.MainEditor extends Backbone.View
  el: "#editor"

  events:
    "blur"    : "handleBlur"
    "mouseup" : "handleTextSelection"
    "keydown" : "handleKeyDown"
    "keyup"   : "handleCarriageReturn"

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

    $("<div id='editor-menu' class='editor-menu' style='opacity: 0;'></div>").insertAfter(@el)
    $("<div class='inlineTooltip2 button-scalableGroup is-active'></div>").insertAfter(@el)

    @editor_menu = new Editor.Menu()

    @tooltip_view = new Editor.Tooltip()
    @tooltip_view.render()

  handleBlur: (ev)=>
    console.log(ev)
    #@editor_menu.hide()
    @tooltip_view.hide()

  handleFocus: (ev)=>
    console.log("Handle focus #{ev}")

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

  #get the element that wraps Caret position
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
    @handleCaret()
    @editor_menu.render()
    @editor_menu.show()

  #get text of selected and displays menu
  handleTextSelection: (ev)->
    @editor_menu.hide()
    text = @getSelectedText()
    @.displayMenu() unless _.isEmpty text

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

  handleKeyDown: (e)->
    e.preventDefault() if _.contains([13], e.which)

  #shows the (+) tooltip at current element
  displayTooltipAt: (element)->
    console.log $(element)

    @tooltip_view.hide()
    return unless _.isEmpty( $(element).text() )
    @position = $(element).offset()
    @tooltip_view.render()
    @tooltip_view.move(left: @position.left - 60 , top: @position.top - 5 )

  #mak the current row as selected
  markAsSelected: (element)->
    #console.log "selecting."
    #console.log $(element)
    $(@el).find(".is-selected").removeClass("is-selected")
    $(element).addClass("is-selected")

  #set focus and caret position on element
  setRangeAt: (element)->
    range = document.createRange()
    sel = window.getSelection()

    range.setStart(element, 0);
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
    @el.focus()

  handleCarriageReturn: (e)->
    @editor_menu.hide() #hides menu just in case

    anchor_node = @getNode() #current node on which cursor is positioned
    previous_node = anchor_node.previousSibling
    next_node = anchor_node.nextSibling

    #enter key
    if (e.which == 13)
      e.preventDefault() #http://stackoverflow.com/questions/6023307/dealing-with-line-breaks-on-contenteditable-div

      #removes all childs
      $(@el).find(".is-selected").removeClass("is-selected")

      #range = @selection().getRangeAt(0)

      parent = $(anchor_node)

      if parent.prop("tagName") != "P"
        #TODO: we block more enters because we don't now how to handle this yet
        return

      current_node = $("<p class='graf--p graf--empty is-selected'><br/></p>")
      current_node.insertAfter(parent)

      #set caret on new <p>
      @setRangeAt(current_node[0])

      #shows tooltip
      @displayTooltipAt($(current_node))

    #delete key
    if (e.which == 8)
      @tooltip_view.hide()

      if $(anchor_node).text() is ""
        @position = $(anchor_node).offset()
        setTimeout(
          ()=>
            @tooltip_view.render()
            @tooltip_view.move(left: @position.left - 60 , top: @position.top - 10 )
        , 200)

    #arrows key
    if _.contains([37,38,39,40], e.which)
      @handleArrow(e)



class Editor.Menu extends Backbone.View
  el: "#editor-menu"

  events:
    "click .editor-icon" : "handleClick"

  initialize: (opts={})=>
    @config = opts.buttons || @default_config()

  default_config: ()->
    buttons: ["blockquote", "h2", "h3", "code", "bold", "italic", "underline", "createlink"]

  template: ()=>
    html = ""
    _.each @config.buttons, (item)->
      html += "<i class=\"editor-icon icon-#{item}\" data-action=\"#{item}\"></i>"
    html

  render: ()=>
    $(@el).html(@template())
    @show()
    @delegateEvents()

  handleClick: ()->
    console.log("uya")
    false

  show: ()->
    $(@el).css("opacity", 1)

  hide: ()->
    $(@el).css("opacity", 0)


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
