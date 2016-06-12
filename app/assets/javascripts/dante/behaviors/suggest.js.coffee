utils = Dante.utils

class Dante.View.Behavior.Suggest extends Dante.View.Behavior

  initialize: (opts={})->
    @actionEvent = opts.title
    @editor = opts.current_editor
    @_name = null
    @fetch_results = []

    # TODO: this has to be pluggable too!
    #@pop_over_typeahead = new Dante.Editor.PopOverTypeAhead(editor: @)
    #@pop_over_typeahead.render().hide()

  displayPopOver: (ev)->
    @editor.pop_over_typeahead.displayAt(@editor.getSelectionStart())

  hidePopOver: (ev)->
    console.log "display popover from typeahead"
    @editor.pop_over_typeahead.displayAt(ev)

  desintegratePopOver: (e)->
    $(@.editor.getSelectionStart()).remove()
    @pasteHtmlAtCaret(@.editor.getSelectionStart().textContent, false)

  handleKeyPress: (e)->
    if !@insideQuery()
      if e.keyCode is 64
        e.preventDefault()
        @pasteHtmlAtCaret(@wrapperTemplate("@"), false)
    else
      console.log "ok let's search"
      @getResults (e)=>
        @fetchResults(e)

  handleKeyUp: (e)->
    if @insideQuery()
      @fetchResults(e)
      
  fetchResults: (e)->
    @desintegratePopOver(e) if @getResults.length < 1
    
    @json_request.abort() if @json_request
    
    @getResults (e)=>
      @displayPopOver(e)
      @editor.pop_over_typeahead.appendData(@fetch_results)

  getResults: (cb, e)->
    q = @editor.getSelectionStart().textContent.replace("@", "")
    
    clearTimeout(@timeout)
    
    @timeout = setTimeout =>
      @json_request = $.ajax 
        url: "#{@editor.suggest_url}?#{@editor.suggest_query_param}=#{q}"
        method: "get"
        dataType: "json"
        #data: { "#{@editor.suggest_query_param}": q }
      .success (data)=>
        if @editor.suggest_handler
          @fetch_results = @editor.suggest_handler(data)
        else
          @fetch_results = data
        cb(e) if cb
      .error (data, err)=>
        console.log "error fetching results"
    , @editor.suggest_query_timeout

  insideQuery: ()->
    $(@editor.getSelectionStart()).hasClass("markup--query")

  wrapperTemplate: (name)->
    "<span class='markup--query'>#{name}</span>"

  # http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
  pasteHtmlAtCaret: (html, selectPastedContent) ->
    sel = undefined
    range = undefined
    if window.getSelection
      # IE9 and non-IE
      sel = window.getSelection()
      if sel.getRangeAt and sel.rangeCount
        range = sel.getRangeAt(0)
        range.deleteContents()
        # Range.createContextualFragment() would be useful here but is
        # only relatively recently standardized and is not supported in
        # some browsers (IE9, for one)
        el = document.createElement('div')
        el.innerHTML = html
        frag = document.createDocumentFragment()
        node = undefined
        lastNode = undefined
        while node = el.firstChild
          lastNode = frag.appendChild(node)
        firstNode = frag.firstChild
        range.insertNode frag

        # Preserve the selection
        if lastNode
          range = range.cloneRange()
          range.setStartAfter lastNode
          if selectPastedContent
            range.setStartBefore firstNode
          else
            range.collapse true
          sel.removeAllRanges()
          sel.addRange range
    else if (sel = document.selection) and sel.type != 'Control'
      # IE < 9
      originalRange = sel.createRange()
      originalRange.collapse true
      sel.createRange().pasteHTML html
      if selectPastedContent
        range = sel.createRange()
        range.setEndPoint 'StartToStart', originalRange
        range.select()
    return
