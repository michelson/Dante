utils = Dante.utils

class Dante.Editor.PopOver extends Dante.View
  el: "body"

  events:
    "mouseover .popover": "cancelHide"
    "mouseout  .popover": "hide"

  initialize: (opts = {})->
    utils.log("initialized popover")
    @editor = opts.editor
    @hideTimeout
    @settings = {timeout: 300}

  template: ()->
    "<div class='popover popover--tooltip popover--Linktooltip popover--bottom is-active'>
      <div class='popover-inner'>
        <a href='#' target='_blank'> Link </a>
      </div>
      <div class='popover-arrow'>
      </div>
    </div>"

  #display & copy original link
  positionAt: (ev)->
    target           = $(ev.currentTarget)
    target_positions = @resolveTargetPosition(target)
    target_offset    = target.offset()
    target_width     = target.outerWidth()
    target_height    = target.outerHeight()
    popover_width    = $(@el).find(".popover").outerWidth()
    top_value        = target_positions.top + target_height
    left_value       = target_offset.left + (target_width/2) - (popover_width/2)

    $(@el).find(".popover")
      .css("top", top_value)
      .css("left",  left_value )
      .show()

    @handleDirection(target)

  displayAt: (ev)->
    @cancelHide()
    target = $(ev.currentTarget)
    $(@el).find(".popover-inner a").text( target.attr('href') ).attr('href', target.attr("href") )
    @positionAt(ev)
    $(@el).find(".popover--tooltip").css("pointer-events", "auto")
    $(@el).show()

  cancelHide: ()->
    utils.log "Cancel Hide"
    clearTimeout @hideTimeout

  hide: (ev)->
    @cancelHide()
    @hideTimeout = setTimeout ()=>
      $(@el).find(".popover").hide()
    , @settings.timeout

  resolveTargetPosition: (target)->
    if target.parents(".graf--mixtapeEmbed").exists()
      target.parents(".graf--mixtapeEmbed").position()
    else
      target.position()


  handleDirection: (target)->
    if target.parents(".graf--mixtapeEmbed").exists()
      $(@el).find(".popover").removeClass("popover--bottom").addClass("popover--top")
    else
      $(@el).find(".popover").removeClass("popover--top").addClass("popover--bottom")

  render: ()->
    $(@template()).insertAfter(@editor.$el)