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

  getLocks: ->
    @editor.locks

  checkforStore: ()->
    utils.log "ENTER DATA STORE"

    return unless @editor.store_url

    # check upload in progress
    if @getLocks() > 0
      Debug "LOCKED!!"
    return if @getLocks() > 0

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
        beforeSend: (res)=>
          @editor.before_xhr_handler(res) if @editor.before_xhr_handler
        success: (res)=>
          utils.log "STORING CONTENT"
          @editor.store_success_handler(res) if @editor.store_success_handler
          @editor.success_xhr_handler(res) if @editor.success_xhr_handler
        error: (status)=>
          utils.log "FAIL STORING CONTENT"
          @editor.failure_xhr_handler(status) if @editor.failure_xhr_handler
