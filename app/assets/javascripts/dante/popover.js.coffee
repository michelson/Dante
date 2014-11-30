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
    #debugger
    target = $(ev.currentTarget)
    $(@el).find(".popover-inner a").text( target.attr('href') ).attr('href', target.attr("href") )

    pos    = target.position()
    offset = target.offset()
    rect   = ev.currentTarget.getBoundingClientRect()
    popover_w = $(@el).find(".popover").width()
    utils.log pos
    utils.log rect
    utils.log popover_w
    $(@el).find(".popover")
    .css("top", pos.top + rect.height)
    .css("left",  pos.left + (rect.width/2) - (popover_w/2) ).show()
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