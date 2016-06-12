utils = Dante.utils

class Dante.View.Behavior.Save extends Dante.View.Behavior

  events:
    "input" : "handleStore"

  initialize: (opts={})->
    @actionEvent = opts.title
    @editor      = opts.current_editor
    @content     = @editor.getContent()

  handleStore: (ev)->
    @store()

  store: ()->
    return unless @editor.store_url
    utils.log "HANDLE DATA STORE"
    clearTimeout(@timeout)
    @timeout = setTimeout =>
      @checkforStore()
    , @editor.store_interval

  checkforStore: ()->
    utils.log "ENTER DATA STORE"
    if @content is @editor.getContent()
      utils.log "content not changed skip store"
      @store()
    else
      utils.log "content changed! update"
      @content = @editor.getContent()
      $.ajax
        url: @editor.store_url
        method: @editor.store_method
        dataType: "json"
        data:
          body: @editor.getContent()
        success: (res)=>
          utils.log "STORING CONTENT"
          @editor.store_success_handler(res) if @editor.store_success_handler
