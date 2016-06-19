utils = Dante.utils

class Dante.Editor.PopOver extends Dante.View
  el: "body"

  events:
    "mouseover .popover--tooltip": "cancelHide"
    "mouseout  .popover--tooltip": "hide"

  initialize: (opts = {})->
    utils.log("initialized popover")
    @pop_over_element = ".popover--tooltip"
    @editor = opts.editor
    @hideTimeout
    @settings = {timeout: 300}

  template: ()->
    "<div class='dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active'>
      <div class='popover-inner'>
        <a href='#' target='_blank'> Link </a>
      </div>
      <div class='popover-arrow'>
      </div>
    </div>"

  #display & copy original link
  positionAt: (ev)->
    target           = $(ev.currentTarget)
    wrapperOffset    = target.closest('article.postArticle').offset()
    target_positions = @resolveTargetPosition(target)
    target_offset    = target.offset()
    target_width     = target.outerWidth()
    target_height    = target.outerHeight()
    popover_width    = @findElement().outerWidth()
    top_value        = target_positions.top + target_height
    left_value       = target_offset.left + (target_width/2) - (popover_width/2) - wrapperOffset.left

    @findElement()
      .css("top", top_value)
      .css("left",  left_value )
      .show()

    @handleDirection(target)

  displayAt: (ev)->
    @cancelHide()
    target = $(ev.currentTarget)
    @findElement()
      .find(".popover-inner a")
      .text( target.attr('href') )
      .attr('href', target.attr("href") )
    @positionAt(ev)
    @findElement().css("pointer-events", "auto")
    $(@el).show()

  cancelHide: ()->
    utils.log "Cancel Hide"
    clearTimeout @hideTimeout

  hide: (ev)->
    @cancelHide()
    @hideTimeout = setTimeout ()=>
      @findElement().hide()
    , @settings.timeout

  resolveTargetPosition: (target)->
    if target.parents(".graf--mixtapeEmbed").exists()
      target.parents(".graf--mixtapeEmbed").position()
    else
      target.position()

  handleDirection: (target)->
    if target.parents(".graf--mixtapeEmbed").exists()
      @findElement().removeClass("popover--bottom").addClass("popover--top")
    else
      @findElement().removeClass("popover--top").addClass("popover--bottom")

  findElement: ()->
    $(@el).find(@pop_over_element)

  render: ()->
    $(@template()).insertAfter(@editor.$el)
