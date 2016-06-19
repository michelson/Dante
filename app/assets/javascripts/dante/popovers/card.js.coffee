utils = Dante.utils

class Dante.Editor.PopOverCard extends Dante.Editor.PopOver

  el: "body"

  events:
    "mouseover .popover--card": "cancelHide"
    "mouseout  .popover--card": "hide"
    "mouseover .markup--user" : "displayPopOver"
    "mouseout  .markup--user" : "hidePopOver"

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
