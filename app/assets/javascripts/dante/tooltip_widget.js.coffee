class Dante.View.TooltipWidget extends Dante.View

  initialize: (opts={})->
    @icon        = opts.icon
    @title       = opts.title
    @actionEvent = opts.title

  hide: ()=>
    @.current_editor.tooltip_view.hide()

