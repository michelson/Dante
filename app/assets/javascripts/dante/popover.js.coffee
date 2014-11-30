utils = Dante.utils

class Dante.Editor.PopOver extends Dante.View
  el: "body"

  initialize: (opts = {})->
    utils.log("initialized popover")
    @editor = opts.editor

  template: ()->
    "<div class='popover popover--tooltip popover--Linktooltip popover--bottom is-active'>
      <div class='popover-inner'>
        <a href='#' target='_blank'> Link </a>
      </div>
      <div class='popover-arrow'>
      </div>
    </div>"

  render: ()->
    $(@template()).insertAfter(@editor.$el)