utils = Dante.utils

class Dante.View.Behavior.Save extends Dante.View.Behavior

  events:
    "input" : "handleStore"

  initialize: (opts={})->
    @actionEvent = opts.title
    @editor = opts.current_editor

  handleStore: (ev)->
    utils.log "persist dante content"

  store: ()->
    return unless @editor.store_url
    clearTimeout(@timeout)
    @timeout = setTimeout =>
      @checkforStore()
    , @editor.store_interval

  checkforStore: ()->
    if @content is @editor.getContent()
      utils.log "content not changed skip store"
      @store()
    else
      utils.log "content changed! update"
      @content = @editor.getContent()
      $.ajax
        url: @editor.store_url
        method: @editor.store_method
        data:
          body: @editor.getContent()
        success: (res)->
          utils.log "STORING CONTENT"
          # TODO: handle store redirect
          utils.log res
        complete: (jxhr) =>
          @store()
