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
    "<div class='popover popover--typeahead js-popover typeahead typeahead--mention popover--maxWidth360 popover--bottom is-active'>
      <div class='popover-inner js-popover-inner' style='height: 138px;'>
        <ul></ul>    
      </div>
      <div class='popover-arrow' style='left: 297px;'></div>
    </div>"

  popoverItem: (item)->
    "<li class='typeahead-item' 
      data-action-value='#{item.text}' 
      data-action='typeahead-populate' data-id='#{item.id}' 
      data-type='#{item.type}'>
      <div class='avatar'>
        <img src='#{item.avatar}' class='avatar-image avatar-image--icon' alt='#{item.text}'>
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
      John Doe
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

  template: ->
    "<div class='popover popover--card js-popover popover--animated popover--flexible popover--top is-active'>
      
      <div class='popover-inner js-popover-inner'>
        <div class='popoverCard'>
            <div class='u-clearfix'>
                
                <div class='u-floatLeft popoverCard-meta'>
                    <h4 class='popoverCard-title'>
                        <a class='link u-baseColor--link' 
                          href='#' 
                          title='' 
                          aria-label='' 
                          data-user-id='' 
                          dir='auto'>
                          miguel michelson
                        </a>
                    </h4>
                    <div class='popoverCard-description'>
                      artista visual, desarrollador de aplicaciones web, escucho mucho Zappa
                    </div>
                </div>

                <div class='u-floatRight popoverCard-avatar'>
                  <a class='link avatar u-baseColor--link' 
                    href='https://medium.com/@michelson' 
                    title='Go to the profile of miguel michelson' 
                    aria-label='Go to the profile of miguel michelson' 
                    data-user-id='dd80df097b95' 
                    dir='auto'>
                    <img src='https://cdn-images-1.medium.com/fit/c/60/60/0*lpLY8594SBOEmJrb.jpg' 
                    class='avatar-image avatar-image--small' 
                      alt='Go to the profile of miguel michelson'>
                  </a>
                </div>
            </div>
            
            <div class='popoverCard-actions u-clearfix'>
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
            </div>
            
        </div>
        <div class='popover-arrow'></div>
      </div>
    </div>"


  displayPopOver: (ev)->
    @.displayAt(ev)

  displayAt: (ev)->
    @cancelHide()
    @positionAt(ev)

  hidePopOver: (ev)->
    @.hide(ev)


