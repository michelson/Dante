utils = Dante.utils

class Dante.Editor.PopOverTypeAhead extends Dante.Editor.PopOver
  el: "body"

  events:
    "mouseover .popover--typeahead": "cancelHide"
    "mouseout  .popover--typeahead": "hide"

    "click .typeahead-item": "handleOptionSelection"

  initialize: (opts = {})->
    @pop_over_element = "popover--typeahead"
    utils.log("initialized popover")
    @editor = opts.editor
    @hideTimeout
    @settings = {timeout: 300}
    @typeaheadStyles()

  template: ()->
    "<div class='dante-popover popover--typeahead js-popover typeahead typeahead--mention popover--maxWidth360 popover--bottom is-active'>
      <div class='popover-inner js-popover-inner'>
        <ul></ul>
      </div>
      <div class='popover-arrow' style='left: 297px;'></div>
    </div>"

  popoverItem: (item)->
    "<li class='typeahead-item'
      data-action-value='#{item.text}'
      data-action='typeahead-populate' data-id='#{item.id}'
      data-type='#{item.type}'
      data-href='#{item.href}'>

      <div class='dante-avatar'>
        <img src='#{item.avatar}'
          class='avatar-image avatar-image--icon'
          alt='#{item.text}'>

        <span class='avatar-text'>#{item.text}</span>
        <em class='avatar-description'>#{item.description}</em>

      </div>

    </li>"

  typeaheadStyles: ->
    @classesForCurrent = "typeahead typeahead--mention popover--maxWidth360"

  handleOptionSelection: (ev)->
    ev.preventDefault
    console.log "Select option here!"
    data = $(ev.currentTarget).data()
    $(".markup--query").replaceWith(@linkTemplate(data))
    @hide(0)
    #@setRangeAt(new_paragraph[0])

  linkTemplate: (data)->
    "<a href='#'
      data-type='#{data.type}'
      data-href='#{data.href}'
      data-id='#{data.id}'
      class='markup--user markup--p-user'>
      #{data.actionValue}
    </a>"

  #display & copy original link
  positionAt: (target)->
    target           = $(target)
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
    #target = $(ev.currentTarget)
    #$(@el).find(".popover-inner a").text( target.attr('href') ).attr('href', target.attr("href") )
    @positionAt(ev)
    #$(@el).find(".popover--tooltip").css("pointer-events", "auto")
    #$(@el).show()

  cancelHide: ()->
    utils.log "Cancel Hide"
    clearTimeout @hideTimeout

  findElement: ->
    $(@el).find(".#{@pop_over_element}")

  hide: (ev, timeout = @settings.timeout)->
    @cancelHide()
    @hideTimeout = setTimeout ()=>
      @findElement().hide()
    , timeout

  appendData: (data)->
    @findElement().find(".popover-inner ul").html("")
    _.each data, (item)=>
      @findElement().find(".popover-inner ul").append(@popoverItem(item))

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

  render: ()->
    $(@template()).insertAfter(@editor.$el)
