class Dante.Article extends Dante.View
  
  el: "body"

  events:
    # TODO: this events should be in tooltip class
    "mouseover .markup--anchor" : "displayPopOver"
    "mouseout  .markup--anchor" : "hidePopOver"

  initialize: (opts={})->
    @options = opts
    @popovers  = []
    opts.base_popovers ||= ["anchor", "card"]

  start: ()=>
    @render()
    @appendMenus()

  appendMenus: ->
    @intializePopOvers(@options)
    @removeEditables()

  render: ->

  removeEditables: ->
    $(@el).find("[contenteditable]").removeAttr("contenteditable")

  intializePopOvers: (opts)->

    base_popovers = opts.base_popovers
    self = @

    if base_popovers.indexOf("anchor") >= 0
      @pop_over = new Dante.Editor.PopOver(editor: @)
      @popovers.push @pop_over

    if base_popovers.indexOf("card") >= 0
      @pop_over_card = new Dante.Editor.PopOverCard(editor: @)
      @popovers.push @pop_over_card

    # add extra widgets
    if opts.extra_popovers
      _.each opts.extra_popovers, (w)=>
        if !w.current_editor
          w.current_editor = self
        @popovers.push w

    # render and hide
    @popovers.forEach (p)->
      p.render().hide()

  displayPopOver: (ev)->
    @pop_over.displayAt(ev)

  hidePopOver: (ev)->
    @pop_over.hide(ev)