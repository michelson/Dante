
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

#toHTML = require("../utils/convert_html.js")

isSoftNewlineEvent = require('draft-js/lib/isSoftNewlineEvent')

{ 
  addNewBlock
  resetBlockWithType
  updateDataOfBlock
  updateTextOfBlock
  getCurrentBlock
  addNewBlockAt
  updateDataOfBlock
} = require('../model/index.js')

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
  isElementInViewport
} = require("../utils/selection.js")
DanteInlineTooltip = require('./popovers/addButton.cjsx')
DanteTooltip = require('./popovers/toolTip.cjsx')
Link = require('./decorators/link.cjsx')

Debug = require('./debug.cjsx')
findEntities = require('../utils/find_entities.coffee')
ImageBlock = require('./blocks/image.cjsx')
EmbedBlock = require('./blocks/embed.cjsx')
VideoBlock = require('./blocks/video.cjsx')
PlaceholderBlock = require('./blocks/placeholder.cjsx')

SaveBehavior = require('../utils/save_content.coffee')
customHTML2Content = require('../utils/convert_html2.coffee')

class Dante
  constructor: (options={})->
    console.log "init editor Dante!"
    @options = options
    @options.el = options.el || 'app'
    @options.poc = options.poc
    @options.content = options.content
    @options.read_only = options.read_only || false
    @options.spellcheck = options.spellcheck || false
    @options.title_placeholder = options.title_placeholder || "Title"
    @options.body_placeholder = options.body_placeholder || "Write your story"
    @options.api_key = options.api_key || "86c28a410a104c8bb58848733c82f840"

    @options.widgets = [
      {
        title: 'add a image'
        icon: 'image'
        type: 'image'
        block: 'ImageBlock'
        editable: true
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
        handleEnterWithoutText: (ctx, block)->
          editorState = ctx.state.editorState
          ctx.onChange(addNewBlockAt(editorState, block.getKey()))
        handleEnterWithText: (ctx, block)->
          editorState = ctx.state.editorState
          ctx.onChange(addNewBlockAt(editorState, block.getKey()))
        widget_options:
          displayOnInlineTooltip: true
          insertion: "upload"
          insert_block: "image"
        options:
          upload_url: options.upload_url or 'uploads.json'
          upload_callback: @options.image_upload_callabck
          image_delete_callback: @options.image_delete_callback
          image_caption_placeholder: options.image_caption_placeholder
      }
      {
        icon: 'embed'
        title: 'insert embed'
        type: 'embed'
        block: 'EmbedBlock'
        editable: true
        renderable: true
        breakOnContinuous: true
        wrapper_class: "graf graf--mixtapeEmbed"
        selected_class: "is-selected is-mediaFocused"
        widget_options:
          displayOnInlineTooltip: true
          insertion: "placeholder"
          insert_block: "embed"
        options:
          endpoint: "//api.embed.ly/1/extract?key=#{@options.api_key}&url="
          placeholder: 'Paste a link to embed content from another site (e.g. Twitter) and press Enter'
        handleEnterWithoutText: (ctx, block)->
          editorState = ctx.state.editorState
          ctx.onChange(addNewBlockAt(editorState, block.getKey()))
        handleEnterWithText: (ctx, block)->
          editorState = ctx.state.editorState
          ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      }
      {
        icon: 'video'
        title: 'insert video'
        editable: true
        type: 'video'
        block: 'VideoBlock'
        renderable: true
        breakOnContinuous: true
        wrapper_class: "graf--figure graf--iframe" 
        selected_class:" is-selected is-mediaFocused"
        widget_options:
          displayOnInlineTooltip: true
          insertion: "placeholder"
          insert_block: "video"
        options:
          endpoint: "//api.embed.ly/1/oembed?key=#{@options.api_key}&url="
          placeholder: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter'
          caption: 'Type caption for embed (optional)'

        handleEnterWithoutText: (ctx, block)->
          editorState = ctx.state.editorState
          ctx.onChange(addNewBlockAt(editorState, block.getKey()))

        handleEnterWithText: (ctx, block)->
          editorState = ctx.state.editorState
          ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      }
      {
        renderable: true
        editable: true
        block: 'PlaceholderBlock'
        type: 'placeholder'
        wrapper_class: "is-embedable"
        selected_class:" is-selected is-mediaFocused"
        widget_options:
          displayOnInlineTooltip: false
        handleEnterWithText: (ctx, block)->
          editorState = ctx.state.editorState
          data =
            provisory_text: block.getText()
            endpoint: block.getData().get('endpoint')
            type: block.getData().get('type')

          ctx.onChange(resetBlockWithType(
            editorState, 
            data.type, 
            data)
          )   
      }
    ]

    @options.tooltips = [
        {
          type: 'menu'
          ref: 'insert_tooltip'
          display: false
          component: DanteTooltip
          displayOnSelection: true
          selectionElements: [
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
        }
        {
          type: 'inline_tooltip'
          ref: 'add_tooltip'
          display: false
          component: DanteInlineTooltip
        }
        {
          type: 'anchor'
          ref: 'anchor_popover'
          display: false
          component: DanteAnchorPopover
        }
        {
          type: 'image',
          ref: 'image_popover'
          display: false
          component: DanteImagePopover
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

    @options.block_types = [
      # {label: 'p', style: 'unstyled'},
      {label: 'h3', style: 'header-one', type: "block"},
      {label: 'h4', style: 'header-two', type: "block"},
      {label: 'blockquote', style: 'blockquote', type: "block"},
      {label: 'insertunorderedlist', style: 'unordered-list-item', type: "block"},
      {label: 'insertorderedlist', style: 'ordered-list-item', type: "block"},
      {label: 'code', style: 'code-block', type: "block"}
      {label: 'bold', style: 'BOLD', type: "inline"},
      {label: 'italic', style: 'ITALIC', type: "inline"},
      # {label: 'underline', style: 'UNDERLINE', type: "inline"},
      # {label: 'monospace', style: 'CODE', type: "inline"},
      # {label: 'strikethrough', style: 'STRIKETHROUGH', type: "inline"}
    ]

    @options.key_commands = {
      "alt-shift": [
        { key: 65, cmd: 'add-new-block'}
      ],
      "alt-cmd": [
        { key: 49, cmd: 'toggle_block:header-one'}
        { key: 50, cmd: 'toggle_block:header-two'}
        { key: 53, cmd: 'toggle_block:blockquote'}
      ],
      "cmd": [
        { key: 66, cmd: 'toggle_inline:BOLD'}
        { key: 73, cmd: 'toggle_inline:ITALIC'}
        { key: 75, cmd: 'insert:link'}
      ]
    }

  getContent: ->
    #console.log @options.content
    #console.log "IS POC DATA?", @options.content is PocData
    #return PocData if @options.poc
    #console.log @options.content , PocData
    #PocData
    @options.content

  render: ->
    ReactDOM.render(<DanteEditor content={@getContent()} 
      config={@options}/>, document.getElementById(@options.el))

class DanteEditor extends React.Component
  constructor: (props) ->
    super props
    #window.main_editor = @

    @decorator = new CompositeDecorator([
      {
        strategy: findEntities.bind(null, 'LINK', @),
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

    @extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(@blockRenderMap);

    @state = 
      editorState: @initializeState()
      read_only: @props.config.read_only
      blockRenderMap: @extendedBlockRenderMap
      locks: 0
      debug: @props.config.debug
      debug_json: null
      debug_text: null

    @widgets  = props.config.widgets
    @tooltips = props.config.tooltips

    @key_commands = props.config.key_commands

    @continuousBlocks = @props.config.continuousBlocks

    @block_types = @props.config.block_types

    @save = new SaveBehavior
      getLocks: @getLocks
      config: 
        xhr: @props.config.xhr
        data_storage: @props.config.data_storage
      editorState: @state.editorState
      editorContent: @emitSerializedOutput()

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
    # console.log anchorKey, focusOffset
    selectionState = selectionState.merge({
      anchorOffset: focusOffset,
      focusKey: anchorKey,
      focusOffset: focusOffset,
    })

    newState = EditorState.forceSelection(newEditorState, selectionState)
    
    @onChange(newState)
  
  forceRender: (editorState)=>
    selection       = @.state.editorState.getSelection()
    content         = editorState.getCurrentContent()
    newEditorState  = EditorState.createWithContent(content, @decorator)

    @refreshSelection(newEditorState)
  
  onChange: (editorState) =>
    @setPreContent()
    
    # console.log "BB", editorState.toJS()
    @.setState({editorState})
    #console.log "changed at", editorState.getSelection().getAnchorKey()
    #console.log "collapsed?", editorState.getSelection().isCollapsed()

    currentBlock = getCurrentBlock(@state.editorState);
    blockType = currentBlock.getType()

    if (!editorState.getSelection().isCollapsed())
 
      tooltip = @tooltipsWithProp('displayOnSelection')[0] 
      return unless @tooltipHasSelectionElement(tooltip, blockType)

      @handleTooltipDisplayOn('displayOnSelection')
    else
      @handleTooltipDisplayOn('displayOnSelection', false)

    setTimeout ()=>
      @relocateTooltips()
    , 0
    
    @dispatchChangesToSave()    
  
    # console.log "CHANGES!"

  dispatchChangesToSave: =>
    clearTimeout @saveTimeout
    @saveTimeout = setTimeout =>
      @save.store(@emitSerializedOutput())
    , 100

  setPreContent: =>
    content = @emitSerializedOutput()
    # console.log "SET PRE CONTENT", content
    @save.editorContent = content

  ###
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
  ###

  focus: () =>
    #@props.refs.richEditor.focus()
    
  getEditorState: =>
    @state.editorState

  emitSerializedOutput: =>
    #s = @state.editorState.getCurrentContent()
    
    raw = convertToRaw( @state.editorState.getCurrentContent() )
    # console.log raw

    #raw_as_json = JSON.stringify(raw)
    #console.log raw_as_json
    #raw_as_json
    raw

  decodeEditorContent: (raw_as_json)=>
    # console.log "CONTENT", raw_as_json
    # new_content = convertFromRaw(JSON.parse(raw_as_json))
    new_content = convertFromRaw(raw_as_json)
    editorState = EditorState.createWithContent(new_content, @decorator)

  testEmitAndDecode: (e)=>
    e.preventDefault()
    raw_as_json = @emitSerializedOutput()

    @setState
      editorState: @decodeEditorContent(raw_as_json)
    , @logStateJSON(raw_as_json)
    false

  testEmitTEXT: (e)=>
    e.preventDefault()
    text = @getTextFromEditor()
    @logStateText(text)

  ## title utils
  getTextFromEditor: =>
    c = @.state.editorState.getCurrentContent()
    out = c.getBlocksAsArray().map (o)=>
        o.getText()
      .join("\n")
    
    console.log out
    return out

  logStateJSON: (raw)=>
    @setState
      debug_json: raw

  logStateText: (raw)=>
    @setState
      debug_text: raw

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
    @widgets.filter (o)->
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
    #debugger if dataBlock.type is "placeholder"
    return null unless dataBlock
    return (
      component: eval(dataBlock.block)
      editable: dataBlock.editable
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
    
    if @renderableBlocks().includes(block.getType())
      return @styleForBlock(block, currentBlock, is_selected) 
    else
      return "graf graf--p #{is_selected}"

  getDataBlock: (block)=>
    @widgets.find (o)=>
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

  handleTooltipDisplayOn: (prop, display=true)->
    setTimeout =>
      items = @tooltipsWithProp(prop)
      items.map (o)=>
        @refs[o.ref].display(display)
        @refs[o.ref].relocate()
    , 20

  handlePasteText: (text, html)=>

    # https://github.com/facebook/draft-js/issues/685
    ###
    html = "<p>chao</p>
    <avv>aaa</avv>
    <p>oli</p>
    <img src='x'/>"
    ###

    # if not html then fallback to default handler

    return @handleTXTPaste(text, html) unless html
    return @handleHTMLPaste(text, html) if html

  handleTXTPaste: (text, html)=>
    currentBlock = getCurrentBlock(@state.editorState)
    
    editorState = @state.editorState

    switch currentBlock.getType()
      when "placeholder"

        newContent = Modifier.replaceText(
          editorState.getCurrentContent(),
          new SelectionState({
            anchorKey: currentBlock.getKey(),
            anchorOffset: 0,
            focusKey: currentBlock.getKey(),
            focusOffset: 2
          }),
          text)

        editorState = EditorState.push(
          editorState,
          newContent,
          'replace-text'
        );

        @onChange(editorState)

        return true
      else
        return false

  handleHTMLPaste: (text, html)=>

    currentBlock = getCurrentBlock(@state.editorState)

    # TODO: make this configurable
    switch currentBlock.getType()
      when "image", "video", "placeholder"
        return @handleTXTPaste(text, html)
      else
        # keep going

    newContentState = customHTML2Content(html, @extendedBlockRenderMap)

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
        file: file

      @onChange(addNewBlock(@state.editorState, 'image', opts))

  handleDroppedFiles: (state, files)=>
    files.map (file)=>
      opts =  
        url: URL.createObjectURL(file)
        file: file

      @onChange(addNewBlock(@state.editorState, 'image', opts))

  handleUpArrow: (e)=>
    setTimeout =>
      @forceRender(@state.editorState)
    , 10

  handleDownArrow: (e)=>
    setTimeout =>
      @forceRender(@state.editorState)
    , 10

  handleReturn: (e) =>
    if this.props.handleReturn
      if this.props.handleReturn()
        return true;

    editorState = @state.editorState
    ###
    #if (isSoftNewlineEvent(e)) {
    #  this.onChange(RichUtils.insertSoftNewline(editorState));
    #  return true;
    #}
    ###
    if !e.altKey && !e.metaKey && !e.ctrlKey
      currentBlock = getCurrentBlock(editorState)
      blockType = currentBlock.getType()

      config_block = @getDataBlock(currentBlock)

      #if blockType.indexOf('atomic') is 0
      #  @.onChange(addNewBlockAt(editorState, currentBlock.getKey()))
      #  return true;
      
      if currentBlock.getText().length is 0

        if config_block && config_block.handleEnterWithoutText
          config_block.handleEnterWithText(@, currentBlock)
          @closePopOvers()
          return true 

        #TODO turn this in configurable
        switch (blockType)
          when "header-one"
            @.onChange(resetBlockWithType(editorState, "unstyled"));
            return true;
          else
            return false;
      
      if currentBlock.getText().length > 0
        
        if blockType is "unstyled"
          # hack hackety hack
          # https://github.com/facebook/draft-js/issues/304
          newContent = Modifier.splitBlock(
            @state.editorState.getCurrentContent(),
            @state.editorState.getSelection()
          )

          newEditorState = EditorState.push(@state.editorState, newContent, 'insert-characters')
          @.onChange(newEditorState)
          
          setTimeout =>

            a = document.getElementsByClassName("is-selected")
            isis = isElementInViewport(a[0])
            
            pos = a[0].getBoundingClientRect()
            window.scrollTo(0, pos.top + window.scrollY - 100)
          , 0

          return true
        
        if config_block && config_block.handleEnterWithText
          config_block.handleEnterWithText(@, currentBlock)
          @closePopOvers()
          return true 

        return false

      selection = editorState.getSelection();
      
      # selection.isCollapsed() and # should we check collapsed here?
      if ( currentBlock.getLength() is selection.getStartOffset()) #or (config_block && config_block.breakOnContinuous))
        # it will match the unstyled for custom blocks
        if @continuousBlocks.indexOf(blockType) < 0
          @.onChange(addNewBlockAt(editorState, currentBlock.getKey()))
          return true
        return false
      
      return false
    
    #return false

  # TODO: make this configurable
  handleBeforeInput: (chars)=>
    currentBlock = getCurrentBlock(@state.editorState)
    blockType = currentBlock.getType()
    selection = @.state.editorState.getSelection()
    editorState = @state.editorState
    
    # close popovers
    if currentBlock.getText().length isnt 0
      #@closeInlineButton()
      @closePopOvers()

    # handle space on link
    endOffset = selection.getEndOffset()
    endKey = currentBlock.getEntityAt(endOffset - 1)
    endEntityType = endKey && Entity.get(endKey).getType()
    afterEndKey = currentBlock.getEntityAt(endOffset)
    afterEndEntityType = afterEndKey && Entity.get(afterEndKey).getType()
    
    # will insert blank space when link found
    if (chars is ' ' && endEntityType is 'LINK' && afterEndEntityType isnt 'LINK')
      newContentState = Modifier.insertText(
        editorState.getCurrentContent(), 
        selection,
        ' '
      )
      newEditorState = EditorState.push(editorState, newContentState, 'insert-characters')
      @.onChange(newEditorState)
      return true

    # block transform
    if blockType.indexOf('atomic') is 0
      return false;
  
    blockLength = currentBlock.getLength()
    if selection.getAnchorOffset() > 1 || blockLength > 1
      return false

    mapping = {
      '> ': "blockquote"
      '*.': "unordered-list-item"
      '* ': "unordered-list-item"
      '- ': "unordered-list-item"
      '1.': "ordered-list-item"
      '# ': 'header-one'
      '##': 'header-two'
      '==': "unstyled"
      '` ': "code-block"
    }

    blockTo = mapping[currentBlock.getText() + chars]

    console.log "BLOCK TO SHOW: #{blockTo}"

    if !blockTo
      return false
    
    @onChange(resetBlockWithType(editorState, blockTo))

    return true
  
  # TODO: make this configurable
  handleKeyCommand: (command)=>
    editorState = @.state.editorState

    if @.props.handleKeyCommand && @.props.handleKeyCommand(command)
      return true
    
    if command is 'add-new-block'
      @.onChange(addNewBlock(editorState, 'blockquote'))
      return true

    block = getCurrentBlock(editorState);

    if command.indexOf('toggle_inline:') is 0
      newBlockType = command.split(':')[1]
      currentBlockType = block.getType()
      @onChange(
        RichUtils.toggleInlineStyle(editorState, newBlockType)
      )
      return true

    if command.indexOf('toggle_block:') is 0
      newBlockType = command.split(':')[1]
      currentBlockType = block.getType()
      
      @onChange(
        RichUtils.toggleBlockType(editorState, newBlockType)
      )
      return true;

    newState = RichUtils.handleKeyCommand(@state.editorState, command);
    if newState
      @.onChange(newState);
      return true;
    
    return false;
  
  findCommandKey: (opt, command)=>
    # console.log "COMMAND find: #{opt} #{command}"
    @key_commands[opt].find (o)->
      o.key is command

  KeyBindingFn: (e)=>

    #⌘ + B / Ctrl + B   Bold
    #⌘ + I / Ctrl + I   Italic
    #⌘ + K / Ctrl + K   Turn into link
    #⌘ + Alt + 1 / Ctrl + Alt + 1   Header
    #⌘ + Alt + 2 / Ctrl + Alt + 2   Sub-Header
    #⌘ + Alt + 5 / Ctrl + Alt + 5   Quote (Press once for a block quote, again for a pull quote and a third time to turn off quote)
    
    # console.log "CTRL #{e.ctrlKey} #{e.which} alt: #{e.altKey} shift #{e.shiftKey}"
    # console.log('in window::'+ e.ctrlKey+'in mac os'+e.metaKey+'####'+e.META_MASK+'##$&&'+e.CTRL_MASK);

    if (e.altKey)
      if (e.shiftKey)
        cmd = @findCommandKey("alt-shift", e.which)
        return cmd.cmd if cmd
        
        return getDefaultKeyBinding(e)

      if e.ctrlKey or e.metaKey
        cmd = @findCommandKey("alt-cmd", e.which)
        return cmd.cmd if cmd
        return getDefaultKeyBinding(e)

    else if e.ctrlKey or e.metaKey
      cmd = @findCommandKey("cmd", e.which)
      return cmd.cmd if cmd
      return getDefaultKeyBinding(e)

    return getDefaultKeyBinding(e)

  # will update block state todo: movo to utils
  updateBlockData: (block, options)=>
    data = block.getData()
    newData = data.merge(options)
    newState = updateDataOfBlock(@state.editorState, block, newData)
    # this fixes enter from image caption
    @forceRender(newState)

  setDirection: (direction_type)=>
    
    contentState = @state.editorState.getCurrentContent()
    selectionState = @state.editorState.getSelection()
    block = contentState.getBlockForKey(selectionState.anchorKey);

    @updateBlockData(block, {direction: direction_type})

  ## read only utils
  toggleReadOnly: (e)=>
    e.preventDefault()
    @toggleEditable()
  
  toggleEditable: =>
    @closePopOvers()

    @setState
      read_only: !@state.read_only
    , @testEmitAndDecode

  closePopOvers: ()=>
    @tooltips.map (o)=>
      @refs[o.ref].hide()

  relocateTooltips: ()=>
    @tooltips.map (o)=>
      @refs[o.ref].relocate()

  tooltipsWithProp: (prop)=>
    @tooltips.filter (o)=>
      o[prop]

  tooltipHasSelectionElement: (tooltip, element)=>
    tooltip.selectionElements.includes(element)

  #################################
  # TODO: this methods belongs to popovers/link
  #################################
  
  handleShowPopLinkOver: (e)=>
    @showPopLinkOver()

  handleHidePopLinkOver: (e)=>
    @hidePopLinkOver()

  showPopLinkOver: (el)=>
    # handles popover display 
    # using anchor or from popover

    # set url first in order to calculate popover width
    @refs.anchor_popover.setState
      url: if el then el.href else @refs.anchor_popover.state.url

    parent_el = ReactDOM.findDOMNode(@);
    coords = @refs.anchor_popover.relocate(
      el
    ) if el

    @refs.anchor_popover.setPosition coords if coords

    @refs.anchor_popover.setState
      show: true

    @isHover = true
    @cancelHide()

  hidePopLinkOver: ()=>
    @hideTimeout = setTimeout ()=>
      @refs.anchor_popover.hide()
    , 300

  cancelHide: ()->
    # console.log "Cancel Hide"
    clearTimeout @hideTimeout

  ###############################

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
                    <div ref="richEditor" 
                      className="section-inner layoutSingleColumn" 
                      onClick={@.focus}>
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

        {
          @tooltips.map (o, i)=>
            <o.component 
              ref={o.ref}
              key={i}
              editor={@}
              editorState={@state.editorState}
              onChange={@onChange}
              configTooltip={o}
              
              showPopLinkOver={@showPopLinkOver} 
              hidePopLinkOver={@hidePopLinkOver}
              handleOnMouseOver={@handleShowPopLinkOver}
              handleOnMouseOut={@handleHidePopLinkOver}
            />
        }

        {
          if @state.debug
            <Debug locks={@state.locks}
              read_only={@state.read_only}
              testEmitTEXT={@testEmitTEXT}
              testEmitAndDecode={@testEmitAndDecode}
              debug_json={@state.debug_json}
              debug_text={@state.debug_text}
            />
        }

      </div>
    ) 

module.exports = Dante
