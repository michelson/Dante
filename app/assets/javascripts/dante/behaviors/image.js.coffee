utils = Dante.utils

class Dante.View.Behavior.Image extends Dante.View.Behavior

  events:
    "click .graf--figure .aspectRatioPlaceholder" : "handleGrafFigureSelectImg"
    "click .graf--figure figcaption" : "handleGrafFigureSelectCaption"
    "mouseover .graf--figure.graf--iframe" : "handleGrafFigureSelectIframe"
    "mouseleave .graf--figure.graf--iframe" : "handleGrafFigureUnSelectIframe"
    "keyup .graf--figure figcaption"   : "handleGrafCaptionTyping"

  initialize: (opts={})->
    @actionEvent = opts.title
    @editor = opts.current_editor
    @_name = null
    @fetch_results = []

    # TODO: this has to be pluggable too!
    #@pop_over_typeahead = new Dante.Editor.PopOverTypeAhead(editor: @)
    #@pop_over_typeahead.render().hide()

  handleGrafFigureSelectImg: (ev)->
    utils.log "FIGURE SELECT"
    element = ev.currentTarget
    @editor.markAsSelected( element )
    $(element).parent(".graf--figure").addClass("is-selected is-mediaFocused")
    @editor.selection().removeAllRanges()

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

  handleGrafFigureSelectCaption: (ev)->
    utils.log "FIGCAPTION"
    element = ev.currentTarget
    $(element).parent(".graf--figure").removeClass("is-mediaFocused")

  handleGrafCaptionTyping: (ev)->
    if _.isEmpty(utils.getNode().textContent.trim())
      $(@editor.getNode()).addClass("is-defaultValue")
    else
      $(@editor.getNode()).removeClass("is-defaultValue")

