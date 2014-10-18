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
    "keydown" : "handleCarriageReturn"

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

  handleFocus: (ev)=>
    console.log("Handle focus #{ev}")

  getSelection: (ev)->
    _this = @
    $(document).one 'mouseup', ()->
      _this.displayMenu @.getSelection()

  displayMenu: (sel)->
    #we only display menu if sel.type is "Range"
    console.log sel
    #return unless sel.type is "Range"
    if sel.baseOffset > 0 or sel.focusOffset > 0
      @handleCaret()
      @editor_menu.render()
    else
      @editor_menu.hide()

  handleCaret: ()->
    @resetOffset($(@el));

  resetOffset: ($textField)=>
    offset = $textField.caret('offset');
    position = $textField.caret('position');
    @resizeBox(offset, position)
    offset

  resizeBox: (offset, position)->
    @editor_menu.$el.offset({left: offset.left-50, top: offset.top + offset.height + 2})
    ###
    $('.indicators')
      .offset({left: offset.left, top: offset.top + offset.height + 2})
      .find('.offset-indicator')
      .html("Offset: left: " + offset.left + ", " + "top: " + offset.top + "&nbsp;" + "height: " + offset.height);

    $('.position-indicator')
      .html("Position: left: " + position.left + ", " + "top: " + position.top + "&nbsp;");
    ###

  handleCarriageReturn: (e)->
    #console.log e.which

    #e.preventDefault() #http://stackoverflow.com/questions/6023307/dealing-with-line-breaks-on-contenteditable-div

    selection
    if (window.getSelection)
      selection = window.getSelection()
    else if (document.selection && document.selection.type != "Control")
      selection = document.selection

    anchor_node = selection.anchorNode #current node on which cursor is positioned
    previous_node = anchor_node.previousSibling
    next_node = anchor_node.nextSibling

    if (e.which == 13) #enter key
      e.preventDefault() #http://stackoverflow.com/questions/6023307/dealing-with-line-breaks-on-contenteditable-div

      #removes all childs
      $(@el).find(".graf--p").removeClass("is-selected")

      range = selection.getRangeAt(0)

      parent = $(range.commonAncestorContainer.parentElement)
      current_node = $("<p class='graf--p graf--empty is-selected'></p>")
      current_node.insertAfter(parent)

      #set caret on new <p>
      range = document.createRange()
      sel = window.getSelection()
      range.setStart(current_node[0], 0);
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
      @el.focus()

      #shows tooltip ###if _.isEmpty $(anchor_node).text()
      @position = $(current_node).offset()
      @tooltip_view.move(left: @position.left - 60 , top: @position.top - 5 )


    if (e.which == 8) #delete key
      node = document.getSelection().anchorNode;
      #current_node = $(if node.nodeType == 3 then node.parentNode else node)
      if $(anchor_node).text() is ""
        @position = $(anchor_node).offset()
        setTimeout(
          ()=>
            @tooltip_view.move(left: @position.left - 60 , top: @position.top - 55 )
        , 200)


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
    console.log $(@el).length

  template: ()->
    '<button class="button button--small button--circle button--neutral button--inlineTooltipControl" title="Add an image, video, embed, or new part" data-action="inline-menu">
        <span class="fa fa-plus"></span>
    </button>'

  render: ()=>
    #console.log @template()
    $(@el).html(@template())

  move: (coords)->
    $(@el).offset(coords)



###
addEvent(document.getElementById('clear'), 'click', function () {
  localStorage.clear();
  window.location = window.location; // refresh
});

if (localStorage.getItem('contenteditable')) {
  editable.innerHTML = localStorage.getItem('contenteditable');
}
###
