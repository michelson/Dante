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
    target_positions = @resolveTargetPosition(target)
    target_offset    = target.offset()
    target_width     = target.outerWidth()
    target_height    = target.outerHeight()
    popover_width    = @findElement().outerWidth()
    top_value        = target_positions.top + target_height
    left_value       = target_offset.left + (target_width/2) - (popover_width/2)

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
    target_positions = @resolveTargetPosition(target)
    target_offset    = target.offset()
    target_width     = target.outerWidth()
    target_height    = target.outerHeight()
    popover_width    = @findElement().outerWidth()
    top_value        = target_positions.top + target_height
    left_value       = target_offset.left + (target_width/2) - (popover_width/2)

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

class Dante.Editor.PopOverCard extends Dante.Editor.PopOver

  el: "body"

  events:
    "mouseover .popover--card": "cancelHide"
    "mouseout  .popover--card": "hide"
    "mouseover .markup--user" : "displayPopOver"
    "mouseout  .markup--user" : "hidePopOver"
    #"click .typeahead-item": "handleOptionSelection"

  initialize: (opts = {})->
    @pop_over_element = ".popover--card"
    utils.log("initialized popover")
    @editor = opts.editor
    @hideTimeout
    @settings = {timeout: 300}
    @card_data = {}

  template: ()->
    "<div class='dante-popover popover--card js-popover popover--animated popover--flexible popover--top is-active'>
      <div class='popover-inner js-popover-inner'>
      </div>
    </div>"

  cardTemplate: ->
    "<div class='popoverCard'>
        <div class='u-clearfix'>

            <div class='u-floatLeft popoverCard-meta'>
                <h4 class='popoverCard-title'>
                    <a class='link u-baseColor--link'
                      href='#{@card_data.href}'
                      title='#{@card_data.text}'
                      aria-label='#{@card_data.text}'
                      data-user-id='#{@card_data.id}'
                      dir='auto'>
                      #{@card_data.text}
                    </a>
                </h4>
                <div class='popoverCard-description'>
                  #{@card_data.description}
                </div>
            </div>

            <div class='u-floatRight popoverCard-avatar'>
              <a class='link dante-avatar u-baseColor--link'
                href='#{@card_data.href}'
                title='#{@card_data.text}'
                aria-label='#{@card_data.text}'
                data-user-id='#{@card_data.id}'
                dir='auto'>
                <img src='#{@card_data.avatar}'
                class='avatar-image avatar-image--small'
                  alt='#{@card_data.text}'>
              </a>
            </div>
        </div>
        #{ @footerTemplate() }
        <div class='popover-arrow'></div>

    </div>"

  # TODO: implement footer
  footerTemplate: ->
    ""
    ###
    "<div class='popoverCard-actions u-clearfix'>
      <div class='u-floatLeft popoverCard-stats'>
          <span class='popoverCard-stat'>
              Following
              <span class='popoverCard-count js-userFollowingCount'>124</span>
          </span>
          <span class='popoverCard-stat'>
              Followers
              <span class='popoverCard-count js-userFollowersCount'>79</span>
          </span>
      </div>
    </div>"
    ###

  displayPopOver: (ev)->
    @.displayAt(ev)

  displayAt: (ev)->
    @cancelHide()

    $.getJSON($(ev.currentTarget).data().href)
    .success (data)=>
      if @editor.suggest_resource_handler
        @card_data =  @editor.suggest_resource_handler(data)
      else
        @card_data = data

      @refreshTemplate()
      @positionAt(ev)

  hidePopOver: (ev)->
    @.hide(ev)

  refreshTemplate: ->
    $(".popover--card .popover-inner").html(@cardTemplate())

class Dante.Editor.ImageTooltip extends Dante.Editor.PopOver

  el: "body"

  events:
    "click .graf" : "handleHide"
    "click .dante-menu-button.align-left": "alignLeft"
    "click .dante-menu-button.align-center": "alignCenter"

  #  #"click": ""
  #  #"mouseover .popover--tooltip": "cancelHide"
  #  #"mouseout  .popover--tooltip": "hide"

  initialize: (opts = {})->
    utils.log("initialized popover")
    @pop_over_element = ".popover--Aligntooltip"
    @editor = opts.editor
    @hideTimeout
    @settings = {timeout: 300}

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

  activateLink: (element)->
    @findElement().find(".dante-menu-button").removeClass("active")
    element.addClass("active")
    setTimeout =>
      @repositionWithActiveImage()
    , 20

  repositionWithActiveImage: ->
    @positionPopOver(@findSelectedImage())

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

          <li class='dante-menu-button align-center active'>
            <span class='tooltip-icon icon-image-center'></span>
          </li>

        </ul>

      </div>

      <div class='popover-arrow'>
      </div>
    </div>"

  positionPopOver: (target)->
    target_offset    = target.offset()
    target_width     = target.outerWidth()
    target_height    = target.outerHeight()
    popover_width    = @findElement().outerWidth()

    # hacky hack
    pad_top = if @findSelectedImage().hasClass("graf--layoutOutsetLeft") then -30 else 30

    top_value        = target_offset.top - target_height - pad_top # target_positions.top + target_height
    left_value       = target_offset.left + (target_width/2) - (popover_width/2)

    @findElement()
      .css("top", top_value)
      .css("left",  left_value )
      .show()
      .addClass("is-active")

    # @handleDirection(target)

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
