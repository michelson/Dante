axios = require("axios")
Immutable = require('immutable')

class SaveBehavior 
  constructor: (options)->
    @getLocks = options.getLocks
    @config = options.config
    @editorContent = options.editorContent
    @editorState = options.editorState

  handleStore: (ev)->
    @store()

  store: (content)->
    return unless @config.data_storage.url
    return if @getLocks() > 0

    clearTimeout(@timeout)
    
    @timeout = setTimeout =>
      @checkforStore(content)
    , @config.data_storage.interval

  getTextFromEditor: (content)->
    content.blocks.map (o)=>
        o.text
      .join("\n")

  getUrl: ->
    url = @config.data_storage.url
    if typeof(url) is "function" then url() else url

  getMethod: ->
    method = @config.data_storage.method
    if typeof(method) is "function" then method() else method


  checkforStore: (content)->
    # ENTER DATA STORE
    isChanged = !Immutable.is(Immutable.fromJS(@.editorContent), Immutable.fromJS(content))
    # console.log("CONTENT CHANGED:", isChanged)
    
    return unless isChanged

    @config.xhr.before_handler() if @config.xhr.before_handler
    # console.log "SAVING TO: #{@getMethod()} #{@getUrl()}"
    
    axios
      method: @getMethod()
      url: @getUrl()
      data: 
        editor_content: JSON.stringify(content)
        text_content: @getTextFromEditor(content)
    .then (result)=> 
      # console.log "STORING CONTENT", result
      @config.data_storage.success_handler(result) if @config.data_storage.success_handler
      @config.xhr.success_handler(result) if @config.xhr.success_handler
    .catch (error)=>
      # console.log("ERROR: got error saving content at #{@config.data_storage.url} - #{error}")
      @config.xhr.failure_handler(error) if @config.xhr.failure_handler


module.exports = SaveBehavior
