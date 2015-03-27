utils = Dante.utils

class Dante.Editor.Tooltip extends Dante.View
  el: ".inlineTooltip"

  events:
    "click .inlineTooltip-button.control" : "toggleOptions"
    "click .inlineTooltip-menu button" : "handleClick"

  initialize: (opts = {})=>
    @current_editor = opts.editor
    @widgets        = opts.widgets

  template: ()->
    menu = ""

    _.each @widgets, (b)->
      data_action_value = if b.action_value then "data-action-value='#{b.action_value}'" else  ""
      menu += "<button class='inlineTooltip-button scale' title='#{b.title}' data-action='inline-menu-#{b.action}' #{data_action_value}>
        <span class='tooltip-icon #{b.icon}'></span>
      </button>"

    "<button class='inlineTooltip-button control' title='Close Menu' data-action='inline-menu'>
        <span class='tooltip-icon icon-plus'></span>
    </button>
    <div class='inlineTooltip-menu'>
      #{menu}
    </div>"

  findWidgetByAction: (name)->

    _.find @widgets, (e)->
      e.action == name
    

  render: ()=>
    $(@el).html(@template())
    $(@el).addClass("is-active")
    @

  toggleOptions: ()=>
    utils.log "Toggle Options!!"
    $(@el).toggleClass("is-scaled")
    return false

  move: (coords)->
    tooltip         = $(@el)
    control_width   = tooltip.find(".control").css("width")
    control_spacing = tooltip.find(".inlineTooltip-menu").css("padding-left")
    pull_size       = parseInt(control_width.replace(/px/,"")) + parseInt(control_spacing.replace(/px/,""))
    coord_left      = coords.left - pull_size
    coord_top       = coords.top

    $(@el).offset(top: coord_top, left: coord_left)

  handleClick: (ev)->
    name = $(ev.currentTarget).data('action')
    utils.log name
    ###
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
    ###
    #debugger
    sub_name = name.replace("inline-menu-", "")
    if detected_widget = @findWidgetByAction(sub_name)
      detected_widget.handleClick(ev)

    return false

  cleanOperationClasses: (node)->
    node.removeClass("is-embedable is-extractable")

  hide: ()=>
    $(@el).removeClass("is-active is-scaled")
