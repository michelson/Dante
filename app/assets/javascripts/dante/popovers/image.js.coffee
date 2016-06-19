utils = Dante.utils

class Dante.Editor.ImageTooltip extends Dante.Editor.PopOver

  el: "body"

  events:
    "click .graf" : "handleHide"
    "click .dante-menu-button.align-left": "alignLeft"
    "click .dante-menu-button.align-center": "alignCenter"

  initialize: (opts = {})->
    utils.log("initialized popover")
    @pop_over_element = ".popover--Aligntooltip"
    @editor = opts.editor
    @hideTimeout
    @settings = {timeout: 100}

  alignLeft: (ev)->
    @activateLink $(ev.currentTarget)
    @findSelectedImage().addClass("graf--layoutOutsetLeft")

  handleHide: (ev)->
    target = $(ev.currentTarget)
    @hide(ev) unless target.hasClass("graf--figure") and target.hasClass("is-mediaFocused")

  alignCenter: (ev)->
    @activateLink $(ev.currentTarget)
    @findSelectedImage().removeClass("graf--layoutOutsetLeft")
    @repositionWithActiveImage()

  handleActiveClass: ->
    @findElement().find(".dante-menu-button").removeClass("active")
    if @findSelectedImage().hasClass("graf--layoutOutsetLeft")
      @findElement().find(".icon-image-left").parent().addClass("active")
    else
      @findElement().find(".icon-image-center").parent().addClass("active")

  activateLink: (element)->
    setTimeout =>
      @repositionWithActiveImage()
    , 20

  repositionWithActiveImage: ->
    # pass the same element that is passed from click event
    @positionPopOver(@findSelectedImage().find("div") )

  template: ()->
    "<div class='dante-popover popover--Aligntooltip popover--top'>

      <div class='popover-inner'>

        <ul class='dante-menu-buttons'>

          <li class='dante-menu-button align-left'>
            <span class='tooltip-icon icon-image-left'></span>
          </li>

          <li class='dante-menu-button align-wide hidden'>
            <span class='tooltip-icon icon-image-wide'></span>
          </li>

          <li class='dante-menu-button align-fill hidden'>
            <span class='tooltip-icon icon-image-fill'></span>
          </li>

          <li class='dante-menu-button align-center'>
            <span class='tooltip-icon icon-image-center'></span>
          </li>

        </ul>

      </div>

      <div class='popover-arrow'>
      </div>
    </div>"

  positionPopOver: (target)->
    target_offset    = target.offset()
    target_position  = target.parent().position()
    target_width     = target.outerWidth()
    target_height    = target.outerHeight()
    popover_width    = @findElement().outerWidth()

    # hacky hack
    pad_top = if @findSelectedImage().hasClass("graf--layoutOutsetLeft") then 72 else 74

    top_value  = target_position.top - pad_top # target_positions.top + target_height
    left_value = target_offset.left + (target_width/2) - (popover_width/2)

    @findElement()
      .css("top", top_value)
      .css("left",  left_value )
      .show()
      .addClass("is-active")

    @handleActiveClass()

  hide: (ev)->
    @cancelHide()
    @hideTimeout = setTimeout ()=>
      @findElement()
      .hide()
      .removeClass("is-active")
    , @settings.timeout

  findSelectedImage: ->
    $(".graf--figure.is-mediaFocused")

  render: ()->
    $(@template()).insertAfter(@editor.$el)
