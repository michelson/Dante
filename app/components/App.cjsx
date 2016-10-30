
React = require('react')
ReactDOM = require('react-dom')
Immutable = require('immutable')
{ Map } = require('immutable')
{
  convertToRaw
  convertFromRaw
  CompositeDecorator
  getVisibleSelectionRect
  getDefaultKeyBinding
  getSelectionOffsetKeyForNode
  KeyBindingUtil
  ContentState
  Editor
  EditorState
  Entity
  RichUtils
  DefaultDraftBlockRenderMap
  SelectionState
  Modifier
  BlockMapBuilder
  getSafeBodyFromHTML
} = require('draft-js')

DraftPasteProcessor = require('draft-js/lib/DraftPasteProcessor')

{stateToHTML} = require('draft-js-export-html')
{
  convertToHTML
  convertFromHTML
} = require('draft-convert')

toHTML = require("../utils/convert_html.js.es6")

isSoftNewlineEvent = require('draft-js/lib/isSoftNewlineEvent')

{ 
  addNewBlock
  resetBlockWithType
  updateDataOfBlock
  getCurrentBlock
  addNewBlockAt
} = require('../model/index.js.es6')

createEditorState = require('../model/content.js.es6')
{ updateDataOfBlock } = require('../model/index.js.es6')

DanteImagePopover = require('./popovers/image')
DanteAnchorPopover = require('./popovers/link')

KeyCodes = 
  BACKSPACE: 8
  TAB: 9
  ENTER: 13
  SPACEBAR: 32
  LEFTARROW: 37
  UPARROW: 38
  RIGHTARROW: 39
  DOWNARROW: 40

# window.utils = require('../utils/utils.coffee')
{ 
  getSelectionRect
  getSelection
} = require("../utils/selection.js.es6")
DanteInlineTooltip = require('./inlineTooltip.cjsx')
DanteTooltip = require('./toolTip.cjsx')
Link = require('./link.cjsx')
findEntities = require('../utils/find_entities.coffee')
ImageBlock = require('./blocks/image.cjsx')
EmbedBlock = require('./blocks/embed.cjsx')
VideoBlock = require('./blocks/video.cjsx')
PlaceholderBlock = require('./blocks/placeholder.cjsx')

SaveBehavior = require('../utils/save_content.coffee')
customHTML2Content = require('../utils/convert_html2.coffee')

PocData = require('../data/poc.js')

class Dante 
  constructor: (options={})->
    console.log "init editor!"
    @options = options
    @options.el = options.el || 'app'

    @options.content = options.content

    @options.read_only = options.read_only || false
    @options.spellcheck = options.spellcheck || false
    @options.title_placeholder = options.title_placeholder || "Title"
    @options.body_placeholder = options.body_placeholder || "Write your story"

    @options.api_key = options.api_key || "86c28a410a104c8bb58848733c82f840"

    @options.widgets = [
      {
        icon: 'image'
        title: 'add a image'
        insertion: "upload"
        insert_block: "image"
        type: 'image'
        block: 'ImageBlock'
        renderable: true
        breakOnContinuous: true
        wrapper_class: "graf graf--figure"
        selected_class:" is-selected is-mediaFocused"
        selectedFn: (block)=>
          direction = block.getData().toJS().direction
          switch direction
            when "left" then "graf--layoutOutsetLeft"
            when "center" then ""
            when "wide" then "sectionLayout--fullWidth"
            when "fill" then "graf--layoutFillWidth"
            else
      
        displayOnInlineTooltip: true
        options:
          upload_url: options.upload_url or 'uploads.json'
          upload_callback: @options.image_upload_callabck
          image_delete_callback: @options.image_delete_callback
          image_caption_placeholder: options.image_caption_placeholder
      }
      {
        name: 'embed'
        icon: 'embed'
        title: 'insert embed'
        insertion: "placeholder"
        insert_block: "embed"
        type: 'embed'
        block: 'EmbedBlock'
        renderable: true
        breakOnContinuous: true
        wrapper_class: "graf graf--mixtapeEmbed"
        displayOnInlineTooltip: true
        selected_class:" is-selected is-mediaFocused"
        options:
          endpoint: "http://api.embed.ly/1/extract?key=#{@options.api_key}&url="
          placeholder: 'Paste a link to embed content from another site (e.g. Twitter) and press Enter'
      }
      {
        name: 'video'
        icon: 'video'
        title: 'insert video'
        insertion: "placeholder"
        insert_block: "video"
        type: 'video'
        block: 'VideoBlock'
        renderable: true
        breakOnContinuous: true
        wrapper_class: "graf--figure graf--iframe" 
        selected_class:" is-selected is-mediaFocused"
        displayOnInlineTooltip: true
        options:
          endpoint: "http://api.embed.ly/1/oembed?key=#{@options.api_key}&url="
          placeholder: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter'
          caption: 'Type caption for embed (optional)'
      }
      {
        name: 'placeholder'
        renderable: true
        block: 'PlaceholderBlock'
        type: 'placeholder'
        wrapper_class: "is-embedable"
        selected_class:" is-selected is-mediaFocused"
        displayOnInlineTooltip: false
      }
    ]

    @options.xhr = {
      before_handler: options.before_xhr_handler
      success_handler: options.success_xhr_handler
      error_handler: options.success_xhr_handler
    }

    @options.data_storage = {
      url: options.store_url || null
      method: options.store_method || "POST"
      success_handler: options.store_success_handler || null
      failure_handler: options.store_failure_handler || null
      interval: options.store_interval || 1500
    }

    @options.continuousBlocks = [
        "unstyled"
        "blockquote"
        "ordered-list"
        "unordered-list"
        "unordered-list-item"
        "ordered-list-item"
        "code-block"
    ]

    @options.tooltipables = [
        "unstyled"
        "blockquote"
        "ordered-list"
        "unordered-list"
        "unordered-list-item"
        "ordered-list-item"
        "code-block"
        'header-one'
        'header-two'
        'header-three'        
    ]

    @options.block_types = [
      # {label: 'p', style: 'unstyled'},
      {label: 'h3', style: 'header-one'},
      {label: 'h4', style: 'header-two'},
      {label: 'blockquote', style: 'blockquote'},
      {label: 'insertunorderedlist', style: 'unordered-list-item'},
      {label: 'insertorderedlist', style: 'ordered-list-item'},
      {label: 'code', style: 'code-block'}
    ]

    @options.inline_styles = [
      {label: 'bold', style: 'BOLD'},
      {label: 'italic', style: 'ITALIC'},
      # {label: 'underline', style: 'UNDERLINE'},
      # {label: 'monospace', style: 'CODE'},
      # {label: 'strikethrough', style: 'STRIKETHROUGH'}
    ]

  getContent: ->
    console.log @options.content
    console.log "IS POC DATA?", @options.content is PocData

    console.log @options.content , PocData

    PocData
    #@options.content

  render: ->
    ReactDOM.render(<DanteEditor content={@getContent()} 
      config={@options}/>, document.getElementById(@options.el))

class DanteEditor extends React.Component
  constructor: (props) ->
    super props
    window.main_editor = @

    @decorator = new CompositeDecorator([
      {
        strategy: findEntities.bind(null, 'link'),
        component: Link
      }
    ])

    @.blockRenderMap = Map({
        "image":
          element: 'figure'
        "video":
          element: 'figure'
        "embed":
          element: 'div'
        'unstyled':
          wrapper: null
          element: 'div'
        'paragraph': 
          wrapper: null
          element: 'div'
        'placeholder':
          wrapper: null
          element: 'div'
    }) 
    #.merge(DefaultDraftBlockRenderMap);

    @extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(@blockRenderMap);

    @state = 
      editorState: @initializeState() #EditorState.createEmpty(@decorator)
      display_toolbar: false
      read_only: @props.read_only
      showURLInput: false
      blockRenderMap: @extendedBlockRenderMap #@blockRenderMap
      locks: 0

      widgets: props.config.widgets

      inlineTooltip:
        show: true
        position: {}

      #current_component: ""

      display_tooltip: false      
      position:  
        top: 0
        left: 0

      display_image_popover: false
      image_popover_position:
        top: 0
        left: 0 

      anchor_popover_url: ""
      display_anchor_popover: false 
      anchor_popover_position: 
        left: 0
        top: 0

      menu:
        show: false
        position: {}

      #embed_url: ""

    @continuousBlocks = @props.config.continuousBlocks

    @tooltipables =  @props.config.tooltipables

    @block_types = @props.config.block_types

    @inline_styles = @props.config.inline_styles

    @save = new SaveBehavior
      getLocks: @getLocks
      config: 
        xhr: @props.config.xhr
        data_storage: @props.config.data_storage
      editorState: @state.editorState
      editorContent: @emitSerializedOutput()

    optionsForDecorator: ()->
      @state

  initializeState: ()=>
    if @.props.content #and @.props.content.trim() isnt ""
      #processedHTML = DraftPasteProcessor.processHTML(@.props.content)
      #contentState = ContentState.createFromBlockArray(processedHTML)
      # move focus to the end. 
      #editorState = EditorState.createWithContent(contentState)
      #editorState = EditorState.moveFocusToEnd(editorState)
      
      ###
      #TODO: support entities
      html = convertFromHTML(
        htmlToEntity: (nodeName, node) =>
          if nodeName is 'avv'
            return Entity.create(
              'LINK',
              'MUTABLE',
              {url: node.href}
            )
      )(@.props.content)
      ###


      #editorState = EditorState.createWithContent(html, @decorator)

      @decodeEditorContent(@props.content)
            
      #debugger
      #createEditorState.default(@props.content, @decorator)
    else 
      EditorState.createEmpty(@decorator)

  refreshSelection: (newEditorState)=>
    editorState     = @.state.editorState
    # Setting cursor position after inserting to content
    s = @.state.editorState.getSelection()
    c = editorState.getCurrentContent()

    selectionState = SelectionState.createEmpty(s.getAnchorKey())
    focusOffset = s.getFocusOffset()
    anchorKey = s.getAnchorKey()
    console.log anchorKey, focusOffset
    selectionState = selectionState.merge({
      anchorOffset: focusOffset,
      focusKey: anchorKey,
      focusOffset: focusOffset,
    })

    newState = EditorState.forceSelection(newEditorState, selectionState)
    
    @onChange(newState)
  
  forceRender: (editorState)=>
    #editorState     = @.state.editorState
    selection       = @.state.editorState.getSelection()
    content         = editorState.getCurrentContent()
    newEditorState  = EditorState.createWithContent(content, @decorator)

    # @onChange(newEditorState)

    @refreshSelection(newEditorState)
    
    #setTimeout =>
    #  @getPositionForCurrent()
    #, 0
  
  onChange: (editorState) =>
    @setPreContent()
    
    # console.log "BB", editorState.toJS()
    @.setState({editorState})
    #console.log "changed at", editorState.getSelection().getAnchorKey()
    #console.log "collapsed?", editorState.getSelection().isCollapsed()

    currentBlock = getCurrentBlock(@state.editorState);
    blockType = currentBlock.getType()

    if (!editorState.getSelection().isCollapsed())

      return if @.tooltipables.indexOf(blockType) < 0

      @.setState
        menu:
          show: true
          position: @state.menu.position
        display_tooltip: false
      , @handleOnChange
    else
      @.setState
        menu:
          show: false
          position: @state.menu.position

    setTimeout ()=>
      @getPositionForCurrent()
    , 0
    
    # @setState({ editorState });
    @dispatchChangesToSave()    
  
    console.log "CHANGES!"

  dispatchChangesToSave: =>
    clearTimeout @saveTimeout
    @saveTimeout = setTimeout =>
      @save.store(@emitSerializedOutput())
    , 100

  setPreContent: =>
    content = @emitSerializedOutput()
    # console.log "SET PRE CONTENT", content
    @save.editorContent = content

  emitHTML: (editorState)=>

    options =
      blockRenderers:
        #TODO: ver como funciona con los blocks
        ATOMIC: (block) =>
          data = block.getData();
          if data.foo is 'bar'
            return '<div>' + escape(block.getText()) + '</div>'
        image: (block) =>
          debugger
          return "<div>aca va tu foto oe</div>"

    #.state.editorState.getCurrentContent()
    #raw = convertToRaw( @state.editorState.getCurrentContent() )
    #html = stateToHTML(this.state.editorState.getCurrentContent(), options)
    #html = stateToHTML(@state.editorState);
    #html = draftRawToHtml(raw);
    #this.props.onChange(html);

    html = toHTML(@state.editorState.getCurrentContent())

    console.log html
    return false

  emitSerializedOutput: =>
    #s = @state.editorState.getCurrentContent()
    
    raw = convertToRaw( @state.editorState.getCurrentContent() )
    # console.log raw

    #raw_as_json = JSON.stringify(raw)
    #console.log raw_as_json
    #raw_as_json
    raw

  decodeEditorContent: (raw_as_json)=>
    console.log "CONTENT", raw_as_json
    #new_content = convertFromRaw(JSON.parse(raw_as_json))
    new_content = convertFromRaw(raw_as_json)
    editorState = EditorState.createWithContent(new_content, @decorator)

  testEmitAndDecode: =>
    raw_as_json = @emitSerializedOutput()

    @setState
      editorState: @decodeEditorContent(raw_as_json)

    false

  emitHTML2: ()->

    html = convertToHTML(
      entityToHTML: (entity, originalText) => 
        if entity.type is 'LINK'
          return "<a href=\"#{entity.data.url}\">#{originalText}</a>"
        else
          return originalText
 
    )(@.state.editorState.getCurrentContent())
    #html = convertToHTML(@.state.editorState.getCurrentContent())

  getLocks: =>
    @state.locks

  addLock: =>
    @setState
      locks: @state.locks +=1

  removeLock: =>
    #return unless @state.locks < 0
    @setState
      locks: @state.locks -=1

  renderableBlocks: =>
    @props.config.widgets.filter (o)->
      o.renderable
    .map (o)->
      o.type

  blockRenderer: (block)=>

    switch block.getType()

      when "atomic"

        entity = block.getEntityAt(0)

        #return null unless entity
        entity_type = Entity.get(entity).getType()

    if @renderableBlocks().includes(block.getType())
      return @handleBlockRenderer(block)

    return null;

  handleBlockRenderer: (block)=>
    dataBlock = @getDataBlock(block)

    return null unless dataBlock
    return (
      component: eval(dataBlock.block)
      editable: !@state.read_only
      props:
        data: block.getData()
        getEditorState: @getEditorState
        setEditorState: @onChange
        addLock: @addLock
        removeLock: @removeLock
        getLocks: @getLocks
        config: dataBlock.options 
    )
    
    return null
   
  blockStyleFn: (block)=>
    currentBlock = getCurrentBlock(@.state.editorState)
    is_selected = if currentBlock.getKey() is block.getKey() then "is-selected" else ""
    
    console.log "BLOCK STYLE:", block.getType()

    if @renderableBlocks().includes(block.getType())
      return @styleForBlock(block, currentBlock, is_selected) 
    else
      return "graf graf--p #{is_selected}"

  getDataBlock: (block)=>
    @props.config.widgets.find (o)=>
      o.type is block.getType()

  styleForBlock: (block, currentBlock, is_selected)=>
    dataBlock = @getDataBlock(block)

    return null unless dataBlock

    selectedFn = if dataBlock.selectedFn then dataBlock.selectedFn(block) else null
    selected_class = if is_selected then dataBlock.selected_class else ''
    
    return "#{dataBlock.wrapper_class} #{selected_class} #{selectedFn}"

  ### from medium-draft
  By default, it handles return key for inserting soft breaks (BRs in HTML) and
  also instead of inserting a new empty block after current empty block, it first check
  whether the current block is of a type other than `unstyled`. If yes, current block is
  simply converted to an unstyled empty block. If RETURN is pressed on an unstyled block
  default behavior is executed.
  ###

  handleReturn: (e) =>
    if this.props.handleReturn
      if this.props.handleReturn()
        return true;

    editorState = @state.editorState
    
    ###
    if (isSoftNewlineEvent(e)) {
      this.onChange(RichUtils.insertSoftNewline(editorState));
      return true;
    }
    ###

    if !e.altKey && !e.metaKey && !e.ctrlKey
      currentBlock = getCurrentBlock(editorState);
      blockType = currentBlock.getType();

      config_block = @getDataBlock(currentBlock)

      if blockType.indexOf('atomic') is 0
        @.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
        return true;
      
      if currentBlock.getText().length is 0
        switch (blockType)
          when "header-one"
            @.onChange(resetBlockWithType(editorState, "unstyled"));
            return true;
          else
            return false;
      
      if currentBlock.getText().length > 0
        # TODO: check how can we make this configurable
        switch (blockType)
          when "placeholder"
            @setState
              display_tooltip: false
            opts =
              provisory_text: currentBlock.getText()
              endpoint: currentBlock.getData().get('endpoint')

            @.onChange(resetBlockWithType(
              editorState, 
              currentBlock.getData().get('type'), 
              opts)
            )
            return true    

      selection = editorState.getSelection();
      
      # selection.isCollapsed() and # should we check collapsed here?
      
      if ((currentBlock.getLength() is selection.getStartOffset()) or (config_block && config_block.breakOnContinuous))
        # it will match the unstyled for custom blocks
        if @continuousBlocks.indexOf(blockType) < 0
          @.onChange(addNewBlockAt(editorState, currentBlock.getKey()))
          return true;
        return false;
      return false;
    
    return false;

  handleBeforeInput: (chars)=>
    currentBlock = getCurrentBlock(@state.editorState);

    if currentBlock.getText().length isnt 0
      @closeInlineButton()

    ###
    switch currentBlock.getType()
      when "placeholder"
        @setState
          current_input: 
            placeholder: "aa"
            embed_url:"http://api.embed.ly/1/oembed?key=86c28a410a104c8bb58848733c82f840&url="
            provisory_text:"http://twitter.com/michelson"
        
        @.onChange(resetBlockWithType(@state.editorState, "placeholder"));
        return false
    ###
    return false

  focus: () => 
    document.getElementById('richEditor').focus()

  getEditorState: =>
    @state.editorState

  handleOnChange: ->
    @relocateMenu()

  # send new blocks to changes
  dispatchChanges: (body)=>
    @onChange(body)

  stateHandler: (option)=>
    @.setState
      editorState: option

  handlePasteText: (text, html)=>

    # https://github.com/facebook/draft-js/issues/685
    ###
    html = "<p>chao</p>
    <avv>aaa</avv>
    <p>oli</p>
    <img src='x'/>"
    ###

    # if not html then fallback to default handler
    return false unless html

    newContentState = customHTML2Content(html, @extendedBlockRenderMap)

    currentBlock = getCurrentBlock(@state.editorState)
    selection = @state.editorState.getSelection();
    endKey = selection.getEndKey()
    
    content = @state.editorState.getCurrentContent();
    blocksBefore = content.blockMap.toSeq().takeUntil((v) => (v.key is endKey))
    blocksAfter = content.blockMap.toSeq().skipUntil((v) => (v.key is endKey)).rest()

    newBlockKey = newContentState.blockMap.first().getKey()

    newBlockMap = blocksBefore.concat(
        newContentState.blockMap,
        blocksAfter
      ).toOrderedMap();

    newContent = content.merge({
      blockMap: newBlockMap,
      selectionBefore: selection,
      selectionAfter: selection.merge({
      anchorKey: newBlockKey,
      anchorOffset: 0,
      focusKey: newBlockKey,
      focusOffset: 0,
      isBackward: false,
      })
    });

    pushedContentState = EditorState.push(
      @state.editorState, 
      newContent, 
      'insert-fragment'
    )
   
    @onChange(pushedContentState)

    true

  handlePasteImage: (files)=>
    #TODO: check file types
    files.map (file)=>
      opts =  
        url: URL.createObjectURL(file)

      @onChange(addNewBlock(@state.editorState, 'image', opts))

  handleDroppedFiles: (state, files)=>
    files.map (file)=>
      opts =  
        url: URL.createObjectURL(file)

      @onChange(addNewBlock(@state.editorState, 'image', opts))

  handleUpArrow: (e)=>
    setTimeout =>
      @forceRender(@state.editorState)
    , 10

  handleDownArrow: (e)=>
    setTimeout =>
      @forceRender(@state.editorState)
    , 10

  ## title utils
  getTextFromEditor: =>
    c = @.state.editorState.getCurrentContent()
    out = c.getBlocksAsArray().map (o)=>
        o.getText()
      .join("\n")
    
    console.log out
    return out

  _toggleBlockType: (blockType)=>
    
    @onChange(
      RichUtils.toggleInlineStyle(
        @state.editorState,
        blockType
      )
    )

  disableMenu: =>
    @setState
      display_toolbar: false

  handleKeyCommand: (command)=>
    #console.log "command:",  command
    if command is 'dante-save'
      # Perform a request to save your contents, set
      # a new `editorState`, etc.
      console.log "SAVING!!"
      return 'not-handled'
    if command is 'dante-keyup'
      return 'not-handled'
    if command is 'dante-uparrow'
      debugger
      return 'not-handled'
      #return 'not-handled'
    #if command is 'dante-enter'
    #  #@relocateTooltipPosition()
    #  return 'handled'
    #return 'not-handled'
    newState = RichUtils.handleKeyCommand(@state.editorState, command);
    if newState
      @.onChange(newState);
      return true;
    
    return false;

  closeInlineButton: =>
    @setState
      display_tooltip: false

  KeyBindingFn: (e)=>
    #console.log "KEY CODE: #{e.keyCode}"
    if e.keyCode is 83 # `S` key */ && hasCommandModifier(e)) {
      #return 'dante-save'
      console.log "TODO: save in this point"

    if e.keyCode is KeyCodes.UPARROW
      console.log "UPARROW"
      return 'dante-uparrow'
    #if e.keyCode is KeyCodes.ENTER
    #  @closeInlineButton()
    #  #return 'dante-enteriji' 

    return getDefaultKeyBinding(e)
   
  getNode:  (root=window) =>
    t = null
    if (root.getSelection)
      t = root.getSelection()
    else if (root.document.getSelection)
      t = root.document.getSelection()
    else if (root.document.selection)
      t = root.document.selection.createRange().text
    return t

  # will update block state todo: movo to utils
  updateBlockData: (block, options)=>
    data = block.getData()
    newData = data.merge(options)
    newState = updateDataOfBlock(@state.editorState, block, newData)
    # @onChange(newState)
    # this fixes enter from image caption
    @forceRender(newState)

  ## TODO methods to move ##
  relocateMenu: =>

    currentBlock = getCurrentBlock(@state.editorState);
    blockType    = currentBlock.getType()
    # display tooltip only for unstyled
    if @.tooltipables.indexOf(blockType) < 0
      @disableMenu()
      return

    return if !@state.menu.show
    el = document.querySelector("#dante-menu")
    padd   = el.offsetWidth / 2

    # eslint-disable-next-line no-undef
    nativeSelection = getSelection(window);
    if !nativeSelection.rangeCount
      return;
    
    selectionBoundary = getSelectionRect(nativeSelection);

    # eslint-disable-next-line react/no-find-dom-node
    toolbarNode = ReactDOM.findDOMNode(@);
    toolbarBoundary = toolbarNode.getBoundingClientRect();

    # eslint-disable-next-line react/no-find-dom-node
    parent = ReactDOM.findDOMNode(@);
    parentBoundary = parent.getBoundingClientRect();

    top    = selectionBoundary.top - parentBoundary.top - -90 - 5
    left   = selectionBoundary.left + (selectionBoundary.width / 2) - padd

    if !top or !left
      return

    @setState
      menu:
        show: true
        position: { left: left , top: top }

  getPositionForCurrent: ->
    
    if @state.editorState.getSelection().isCollapsed()

      currentBlock = getCurrentBlock(@state.editorState)
      blockType = currentBlock.getType()
      
      # console.log  "POSITION CURRENT BLOCK", currentBlock.getType(), currentBlock.getKey()

      contentState = @state.editorState.getCurrentContent()
      selectionState = @state.editorState.getSelection()
      # console.log contentState
      # console.log selectionState
      block = contentState.getBlockForKey(selectionState.anchorKey);
      # console.log block.getText().length, block.getText()

      # eslint-disable-next-line no-undef
      nativeSelection = getSelection(window);
      if !nativeSelection.rangeCount
        return;
      #selectionBoundary = getSelectionRect(nativeSelection);
      #debugger
      
      node = @getNode()
      #console.log "ANCHOR NODE", node.anchorNode
      #console.log "PARENT ANCHOR", node.anchorNode.parentNode.parentNode.parentNode

      selectionBoundary = getSelectionRect(nativeSelection);
      coords = selectionBoundary #utils.getSelectionDimensions(node)
      if blockType is "image"
        selectionBoundary = node.anchorNode.parentNode.parentNode.parentNode.getBoundingClientRect()
        el = document.querySelector("#dante_image_popover")
        padd   = el.offsetWidth / 2
      # eslint-disable-next-line react/no-find-dom-node
      toolbarNode = ReactDOM.findDOMNode(@);
      toolbarBoundary = toolbarNode.getBoundingClientRect();

      # eslint-disable-next-line react/no-find-dom-node
      parent = ReactDOM.findDOMNode(@);
      parentBoundary = parent.getBoundingClientRect();

      #console.log "SB", selectionBoundary
      #console.log "PB", parentBoundary
      # checkeamos si esta vacio
      @setState
        display_tooltip: block.getText().length is 0 and blockType is "unstyled"
        position:  
          top: coords.top + window.scrollY
          left: coords.left + window.scrollX - 60
        display_image_popover: blockType is "image"

      if blockType is "image"
        @setState
          image_popover_position: 
            top: selectionBoundary.top - parentBoundary.top + 60
            left: selectionBoundary.left + (selectionBoundary.width / 2) - padd

    else
      @closeInlineButton()

  relocateImageTooltipPosition: (coords)=>
    @setState
      display_image_popover: true

  positionForTooltip: (node)=>
    #debugger
    #if !@state.editorState.getSelection().isCollapsed()

    currentBlock = getCurrentBlock(@state.editorState)
    blockType = currentBlock.getType()
    
    # console.log  "ANCHOR POSITION CURRENT BLOCK", currentBlock.getType(), currentBlock.getKey()

    contentState = @state.editorState.getCurrentContent()
    selectionState = @state.editorState.getSelection()

    selectionBoundary = node.getBoundingClientRect() #getSelectionRect(nativeSelection);
    coords = selectionBoundary #utils.getSelectionDimensions(node)
    #if blockType is "image"
    #selectionBoundary = node.anchorNode.parentNode.parentNode.parentNode.getBoundingClientRect()
    el = document.querySelector("#dante-popover")
    padd   = el.offsetWidth / 2
    # eslint-disable-next-line react/no-find-dom-node
    toolbarNode = ReactDOM.findDOMNode(@)
    toolbarBoundary = toolbarNode.getBoundingClientRect()

    # eslint-disable-next-line react/no-find-dom-node
    parent = ReactDOM.findDOMNode(@);
    parentBoundary = parent.getBoundingClientRect()


    # selectionBoundary.left + (selectionBoundary.width / 2) - padd
    {
      top: selectionBoundary.top - parentBoundary.top + 160
      left: selectionBoundary.left - (selectionBoundary.width) #- padd
    }

  setDirection: (direction_type)=>
    
    contentState = @state.editorState.getCurrentContent()
    selectionState = @state.editorState.getSelection()
    block = contentState.getBlockForKey(selectionState.anchorKey);

    @updateBlockData(block, {direction: direction_type})

  handleShowPopLinkOver: (e)=>
    @showPopLinkOver()

  handleHidePopLinkOver: (e)=>
    @hidePopLinkOver()

  showPopLinkOver: (el)=>
    # handles popover display 
    # using anchor or from popover
    coords = @positionForTooltip(el) if el
    @isHover = true
    @cancelHide()
    @setState
      anchor_popover_url: if el then el.href else @state.anchor_popover_url
      display_anchor_popover: true
      anchor_popover_position: if el then coords else @state.anchor_popover_position

  hidePopLinkOver: ()=>
    @hideTimeout = setTimeout ()=>
      @setState
        display_anchor_popover: false
    , 300

  cancelHide: ()->
    console.log "Cancel Hide"
    clearTimeout @hideTimeout

  ## close popovers
  closePopOvers: ()=>
    @setState
      menu:
          show: false
          position: {}
      display_toolbar: false
      display_tooltip: false
      display_image_popover: false
      display_anchor_popover: false

  ## read only utils
  toggleReadOnly: (e)=>
    e.preventDefault()
    @toggleEditable()
  
  toggleEditable: =>
    @closePopOvers()

    @setState
      read_only: !@state.read_only
    , @testEmitAndDecode
  ##

  render: =>

    return (
      <div id="content" suppressContentEditableWarning={true}>

        <article className="postArticle">
          <div className="postContent">
            <div className="notesSource">
              <div id="editor" 
                className="postField postField--body">

                <section className="section--first section--last"> 
                  <div className="section-divider layoutSingleColumn"> 
                    <hr className="section-divider"/> 
                  </div> 

                  <div className="section-content"> 
                    <div id="richEditor" className="section-inner layoutSingleColumn" onClick={@.focus}>
                      <Editor 
                        blockRendererFn={@.blockRenderer}
                        editorState={@state.editorState} 
                        onChange={@onChange}
                        onUpArrow={@handleUpArrow}
                        onDownArrow={@handleDownArrow}
                        handleReturn={@handleReturn}
                        blockRenderMap={@state.blockRenderMap}
                        blockStyleFn={@.blockStyleFn}
                        handlePastedText={@handlePasteText}
                        handlePastedFiles={@handlePasteImage}
                        handleDroppedFiles={@handleDroppedFiles}
                        handleKeyCommand={@.handleKeyCommand}
                        keyBindingFn={@KeyBindingFn}
                        handleBeforeInput={@.handleBeforeInput}
                        readOnly={@state.read_only}
                        placeholder={@props.config.body_placeholder}
                        ref="editor"
                      />
                    </div> 
                  </div>
                </section>

              </div>
            </div>
          </div>
        </article>

        <DanteTooltip
          editorState={@state.editorState} 
          setStateHandler={@stateHandler}
          toggleBlockType={@_toggleBlockType}
          block_types={@block_types}
          inline_styles={@inline_styles}
          confirmLink={@_confirmLink}
          options={@state.menu}
          disableMenu={@disableMenu}
          dispatchChanges={@dispatchChanges}
          handleKeyCommand={@.handleKeyCommand}
          keyBindingFn={@KeyBindingFn}
          relocateMenu={@relocateMenu}
          showPopLinkOver={@showPopLinkOver} 
          hidePopLinkOver={@hidePopLinkOver}
        />

        <DanteInlineTooltip
          options={@state.inlineTooltip}
          config={@state.widgets}
          editorState={@state.editorState}
          style={@state.position}
          onChange={@onChange}
          dispatchChanges={@dispatchChanges}
          display_tooltip={@state.display_tooltip}
          closeInlineButton={@closeInlineButton}
        />
      
        <DanteImagePopover
          display_image_popover={@state.display_image_popover}
          relocateImageTooltipPosition={@relocateImageTooltipPosition}
          position={@state.image_popover_position}
          setDirection={@setDirection}
        />
      
        <DanteAnchorPopover
          display_anchor_popover={@state.display_anchor_popover}
          url={@state.anchor_popover_url}
          position={@state.anchor_popover_position}
          handleOnMouseOver={@handleShowPopLinkOver}
          handleOnMouseOut={@handleHidePopLinkOver}
        />   

        <ul>
          <li>LOCKS: {@state.locks}</li>
          <li>
            <a href="#" onClick={@toggleReadOnly}>
              READ ONLY {if @state.read_only then 'yup' else 'noup'}
            </a>
          </li>
          <li>
            <a href="#" onClick={@emitHTML}>
              get content
            </a>
          </li>
          <li>
            <a href="#" onClick={@getTextFromEditor}>
              get Text From Editor
            </a>
          </li>
          
          <li>
            <a href="#" onClick={@testEmitAndDecode}>
              serialize and set content
            </a>
          </li>
        </ul>
      </div>
    ) 

module.exports = Dante
