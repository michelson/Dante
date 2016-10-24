axios = require("axios")
Immutable = require('immutable')
# ReactDOM = require('react-dom')

class SaveBehavior 
  constructor: (options)->
    @config = options.config
    @editorContent = options.editorContent

  handleStore: (ev)->
    @store()

  store: (content)->
    return unless @config.store_url
    
    clearTimeout(@timeout)
    
    @timeout = setTimeout =>
      @checkforStore(content)
    , @config.store_interval

  checkforStore: (content)->
    console.log "ENTER DATA STORE"
  
    # TODO check of content was changed!!
    # console.log 'editor:', @.editorContent
    # console.log 'content', content

    isChanged = !Immutable.is(Immutable.fromJS(@.editorContent), Immutable.fromJS(content))
    console.log("CONTENT CHANGED:", isChanged)
    
    return unless isChanged

    @config.before_xhr_handler() if @config.before_xhr_handler

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
      console.log("ERROR: got error uploading file #{error}")
      @config.failure_xhr_handler(error) if @config.failure_xhr_handler


module.exports = SaveBehavior
