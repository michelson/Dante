axios = require("axios")
Immutable = require('immutable')

class SaveBehavior 
  constructor: (options)->
    @getLocks = options.getLocks
    @config = options.config
    @editorContent = options.editorContent

  handleStore: (ev)->
    @store()

  store: (content)->
    return unless @config.store_url
    console.log "CHECK FOR LOCKS", @getLocks()
    if @getLocks() > 0
      console.log "LOCKED!!"
    return if @getLocks() > 0

    clearTimeout(@timeout)
    
    @timeout = setTimeout =>
      @checkforStore(content)
    , @config.store_interval

  checkforStore: (content)->
    # console.log "ENTER DATA STORE"

    isChanged = !Immutable.is(Immutable.fromJS(@.editorContent), Immutable.fromJS(content))
    console.log("CONTENT CHANGED:", isChanged)
    
    return unless isChanged

    @config.before_xhr_handler() if @config.before_xhr_handler
    console.log "SAVING TO: #{@config.store_url}"
    
    axios
      method: @config.store_method
      url: @config.store_url
      data: 
        data: JSON.stringify(content)
    .then (result)=> 
      console.log "STORING CONTENT", result
      @config.store_success_handler(result) if @config.store_success_handler
      @config.success_xhr_handler(result) if @config.success_xhr_handler
    .catch (error)=>
      console.log("ERROR: got error saving content at #{@config.store_url} - #{error}")
      @config.failure_xhr_handler(error) if @config.failure_xhr_handler


module.exports = SaveBehavior
