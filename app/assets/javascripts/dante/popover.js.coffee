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
  displayAt: (ev)->
    @cancelHide()
    target = $(ev.currentTarget)
    pos    = target.position()
    $(@el).find(".popover").css("top", pos.top + 20).css("left", pos.left).show()
    $(@el).find(".popover-inner a").text( target.attr('href') ).attr('href', target.attr("href") )
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

  render: ()->
    $(@template()).insertAfter(@editor.$el)