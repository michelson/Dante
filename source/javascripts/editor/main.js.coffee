window.Editor = {

}

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
    $("<div id='editor-menu' class='editor-menu' style='display: none;'></div>").insertAfter(@el)
    @editor_menu = new Editor.Menu()
    @editor_menu.delegateEvents()

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
    return unless sel.type is "Range"
    if sel.extentOffset > 0 and sel.baseOffset > 0
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



class Editor.Menu extends Backbone.View
  el: "#editor-menu"

  initialize: ()=>

  template: ()=>
    '<i class="editor-icon icon-blockquote" data-action="blockquote"></i>
      <i class="editor-icon icon-h2" data-action="h2"></i>
      <i class="editor-icon icon-h3" data-action="h3"></i>'
  render: ()=>
    console.log "RENDER"
    $(@el).html(@template())
    console.log $(@el).length
    @show()

  show: ()->
    $(@el).show()

  hide: ()->
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
