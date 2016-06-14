utils = Dante.utils

class Dante.View.Behavior.Image extends Dante.View.Behavior

  events:
    "click .graf--figure .aspectRatioPlaceholder" : "handleGrafFigureSelectImg"
    "click .graf--figure figcaption"   : "handleGrafFigureSelectCaption"
    "keyup .graf--figure figcaption"   : "handleGrafCaptionTyping"

    # TODO: this is from embed! move this to embed behavior
    "mouseover .graf--figure.graf--iframe" : "handleGrafFigureSelectIframe"
    "mouseleave .graf--figure.graf--iframe" : "handleGrafFigureUnSelectIframe"

  initialize: (opts={})->
    @editor = opts.current_editor

  handleGrafFigureSelectImg: (ev)->
    utils.log "FIGURE SELECT"
    element = ev.currentTarget
    @editor.markAsSelected( element )
    $(element).parent(".graf--figure").addClass("is-selected is-mediaFocused")
    @editor.selection().removeAllRanges()

    @showAlignPopover(ev)

  showAlignPopover: (ev)->
    target = $(ev.currentTarget)
    @editor.pop_over_align.positionPopOver(target)

  handleGrafFigureSelectCaption: (ev)->
    utils.log "FIGCAPTION"
    element = ev.currentTarget
    $(element).parent(".graf--figure").removeClass("is-mediaFocused")

  handleGrafCaptionTyping: (ev)->
    if _.isEmpty(utils.getNode().textContent.trim())
      $(@editor.getNode()).addClass("is-defaultValue")
    else
      $(@editor.getNode()).removeClass("is-defaultValue")


  #TODO: this is from embed! move this to embed behavior
  handleGrafFigureSelectIframe: (ev)->
    utils.log "FIGURE IFRAME SELECT"
    element = ev.currentTarget
    @iframeSelected = element
    @editor.markAsSelected( element )
    $(element).addClass("is-selected is-mediaFocused")
    @editor.selection().removeAllRanges()

  handleGrafFigureUnSelectIframe: (ev)->
    utils.log "FIGURE IFRAME UNSELECT"
    element = ev.currentTarget
    @iframeSelected = null
    $(element).removeClass("is-selected is-mediaFocused")

