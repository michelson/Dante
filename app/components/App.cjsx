
React = require('react')
ReactDOM = require('react-dom')
Immutable = require('immutable')
{ Map } = require('immutable')
{
  convertToRaw,
  CompositeDecorator,
  getVisibleSelectionRect,
  getDefaultKeyBinding, 
  getSelectionOffsetKeyForNode,
  KeyBindingUtil,
  ContentState,
  Editor,
  EditorState,
  Entity,
  RichUtils
  DefaultDraftBlockRenderMap
} = require('draft-js')

isSoftNewlineEvent = require('draft-js/lib/isSoftNewlineEvent')

{ 
  addNewBlock
  resetBlockWithType
  updateDataOfBlock
  getCurrentBlock
  addNewBlockAt
} = require('../model/index.js.es6')


KeyCodes = 
  BACKSPACE: 8
  TAB: 9
  ENTER: 13
  SPACEBAR: 32
  LEFTARROW: 37
  UPARROW: 38
  RIGHTARROW: 39
  DOWNARROW: 40

window.utils = require('../utils/utils.coffee')
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


#window.getVisibleSelectionRect = getVisibleSelectionRect

class Dante 
  constructor: ->
    console.log "init editor!"
  render: ->
    ReactDOM.render(<DanteEditor/>, document.getElementById('app'))

class DanteEditor extends React.Component
  constructor: (props) ->
    super props
    window.main_editor = @

    decorator = new CompositeDecorator([
      {
        strategy: findEntities.bind(null, 'link'),
        component: Link
      }
    ])

    ###
    blockRenderMap = Immutable.Map({
      'header-two': {
       element: 'h2'
      },
      'unstyled': {
        element: 'h2'
      }
    });
    ###

    @.blockRenderMap = Map({
        "image":
          element: 'figure'
        "video":
          element: 'figure'
        "embed":
          element: 'div'
        'unstyled':
          wrapper: null
          element: 'p'
        'paragraph': 
          wrapper: null
          element: 'p'
        'placeholder':
          wrapper: null
          element: 'div'
    }) 
    #.merge(DefaultDraftBlockRenderMap);

    @extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(@blockRenderMap);

    @blockStyleFn = (block)=>
      currentBlock = getCurrentBlock(@.state.editorState)
      is_selected = if currentBlock.getKey() is block.getKey() then "is-selected" else ""
      
      switch block.getType()
        when "image"
          is_selected = if currentBlock.getKey() is block.getKey() then "is-selected is-mediaFocused" else ""
          return "graf graf--figure #{is_selected}"
        when "video"
          is_selected = if currentBlock.getKey() is block.getKey() then "is-selected is-mediaFocused" else ""
          return "graf--figure graf--iframe #{is_selected}"
        when "embed"
          is_selected = if currentBlock.getKey() is block.getKey() then "is-selected is-mediaFocused" else ""
          return "graf graf--mixtapeEmbed #{is_selected}"
        when "placeholder"
          return "is-embedable #{is_selected}"
        else
          return "graf graf--p #{is_selected}"

    @state = 
      editorState: EditorState.createEmpty(decorator)
      display_toolbar: false
      showURLInput: false
      blockRenderMap: @extendedBlockRenderMap #@blockRenderMap
      current_input: ""
      inlineTooltip:
        show: true
        position: {}

      display_tooltip: false
      position:  
        top: 0
        left: 0

      menu:
        show: false
        position: {}

      embed_url: ""

      continuousBlocks: [
        "unstyled",
        "blockquote",
        "ordered-list",
        "unordered-list",
        "code-block"
      ]

    @.BLOCK_TYPES = [
      # {label: 'p', style: 'unstyled'},
      {label: 'h3', style: 'header-one'},
      {label: 'h4', style: 'header-two'},
      {label: 'blockquote', style: 'blockquote'},
      {label: 'insertunorderedlist', style: 'unordered-list-item'},
      {label: 'insertorderedlist', style: 'ordered-list-item'},
      {label: 'code', style: 'code-block'}
    ];

    @.INLINE_STYLES = [
      {label: 'bold', style: 'BOLD'},
      {label: 'italic', style: 'ITALIC'},
      # {label: 'underline', style: 'UNDERLINE'},
      # {label: 'monospace', style: 'CODE'},
      # {label: 'strikethrough', style: 'STRIKETHROUGH'}
    ];
    
  onChange: (editorState) =>
    @.setState({editorState});
    #console.log "changed at", editorState.getSelection().getAnchorKey()
    #console.log "collapsed?", editorState.getSelection().isCollapsed()

    if (!editorState.getSelection().isCollapsed())
      #https://github.com/andrewcoelho/react-text-editor/blob/master/src/utils/selection.js
      #selectionRange = getSelectionRange();
      #selectionCoords = getSelectionCoords(selectionRange);
      # return if @state.menu.show
      @.setState
        menu:
          show: true
          # top: '0px' #selectionCoords.offsetTop,
          # left: '200px' #selectionCoords.offsetLeft
      , @handleOnChange
    else
      @.setState({ menu: { show: false } });
      #setTimeout @relocateTooltipPosition(), 10
    #console.log "CHANGED!"

    setTimeout ()=>
      @getPositionForCurrent()
      #@setActive()
    , 0

    @setState({ editorState });
    console.log "CHANGES!"

  blockRenderer: (block)=>
    switch block.getType()

      when "atomic"

        entity = block.getEntityAt(0)

        #return null unless entity
        entity_type = Entity.get(entity).getType()
        
        ###
        if entity_type is 'atomic:image'
          return (
            component: ImageBlock
            #editable: true
            props:
              foo: 'bar'
          )

        else if entity_type is 'atomic:video'
          return (
            component: EmbedBlock
            editable: false
            props:
              foo: 'bar'
          )

        else if entity_type is 'atomic:embed'
          return (
            component: ExtractBlock
            editable: true
            props:
              foo: 'bar'
          )
        ###
      when 'image'
        return (
            component: ImageBlock
            #editable: true
            props:
              data: @state.current_input
          )

      when 'embed'
        return (
            component: EmbedBlock
            #editable: true
            props:
              data: @state.current_input
          )

      when 'video'
        return (
            component: VideoBlock
            #editable: true
            props:
              data: @state.current_input
          )

      when 'placeholder'
        return (
            component: PlaceholderBlock
            #editable: true
            props:
              data: @state.current_input
          )

    return null;

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
    #if (isSoftNewlineEvent(e)) {
    #  this.onChange(RichUtils.insertSoftNewline(editorState));
    #  return true;
    #}
    if !e.altKey && !e.metaKey && !e.ctrlKey
      currentBlock = getCurrentBlock(editorState);
      blockType = currentBlock.getType();

      #console.log "Handle return #{blockType} length #{currentBlock.getLength()}"

      if blockType.indexOf('atomic') is 0
        @.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
        return true;
      
      if currentBlock.getLength() is 0
        console.log "Handle return #{blockType} 2"
        switch (blockType)
          when "image", "embed", "video"
            @.onChange(addNewBlockAt(editorState, currentBlock.getKey()))
            return true
          #when "placeholder"
          #  @.onChange(resetBlockWithType(editorState, "embed"));
          #  return true
          when "header-one"
            @.onChange(resetBlockWithType(editorState, "unstyled"));
            return true;
          else
            return false;
      
      if currentBlock.getLength() > 0
        console.log "Handle return #{blockType} with text"
        switch (blockType)
          when "video", "image"
            @.onChange(addNewBlockAt(editorState, currentBlock.getKey()))
            return true       
          when "placeholder"
            @setState
              current_input:
                provisory_text: currentBlock.getText()
                embed_url: @state.current_input.embed_url

            @.onChange(resetBlockWithType(editorState, @state.current_input.type));
            return true    

      selection = editorState.getSelection();
      
      if selection.isCollapsed() and currentBlock.getLength() is selection.getStartOffset()
        if @.state.continuousBlocks.indexOf(blockType) < 0
          @.onChange(addNewBlockAt(editorState, currentBlock.getKey()))
          return true;
        
        return false;
      if selection.isCollapsed() and currentBlock.getType() is "embed" and currentBlock.getLength() > 0
        
        if @.state.continuousBlocks.indexOf(blockType) < 0
          console.log "adding block on embed inner text enter "
          @.onChange(addNewBlockAt(editorState, currentBlock.getKey()))
          return true;
        
        return false;
      return false;
    
    return false;

  handleBeforeInput: (chars)=>
    
    currentBlock = getCurrentBlock(@state.editorState);

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

  handleClick: =>
    console.log "oli!!!!"
  
  
  setActive: =>

    currentBlock = getCurrentBlock(@state.editorState);
    blockType = currentBlock.getType();
    #debugger
    #contentState = @state.editorState.getCurrentContent()
    #selectionState = @state.editorState.getSelection()
    #block = contentState.getBlockForKey(selectionState.anchorKey)
    #return unless block
    #debugger 
    #node = Entity.get(block.getEntityAt(0)).getData()
    #debugger

  focus: () => 
    #@.refs.editor.focus()
    document.getElementById('richEditor').focus()

  updateSelection: ()=>
    console.log "eoeoe", utils.getSelectionRange()
    selectionRange = utils.getSelectionRange()
    selectedBlock;
    if selectionRange
      selectedBlock = utils.getSelectedNode(selectionRange)
    @.setState({
      selectedBlock,
      selectionRange
    })
    console.log @state

  handleOnChange: ->
    @relocateMenu()
    #@relocateTooltipPosition()

  # send new blocks to changes
  dispatchChanges: (body)=>
    @onChange(body)

  stateHandler: (option)=>
    @.setState
      editorState: option

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
    console.log "command:",  command
    if command is 'dante-save'
      # Perform a request to save your contents, set
      # a new `editorState`, etc.
      console.log "SAVING!!"
      return 'not-handled'
    if command is 'dante-keyup'
      @relocateTooltipPosition()
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
      display_tooltip: true

  KeyBindingFn: (e)=>
    console.log "KEY CODE: #{e.keyCode}"
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
   
  relocateMenu: =>
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
   
  relocateTooltipPosition: ->
    contentState = @state.editorState.getCurrentContent()
    selectionState = @state.editorState.getSelection()
    #console.log contentState
    #console.log selectionState
    if @state.editorState.getSelection().isCollapsed()
      block = contentState.getBlockForKey(selectionState.anchorKey);
      console.log block.getText().length, block.getText()

      node = utils.getNode()
      console.log node.focusNode

    #debugger
    # true

  getPositionForCurrent: ->

    if @state.editorState.getSelection().isCollapsed()
      contentState = @state.editorState.getCurrentContent()
      selectionState = @state.editorState.getSelection()
      # console.log contentState
      # console.log selectionState
      block = contentState.getBlockForKey(selectionState.anchorKey);
      # console.log block.getText().length, block.getText()

      node = utils.getNode()
      return if node.anchorNode is null
      # console.log "ANCHOR NODE", node.anchorNode

      coords = utils.getSelectionDimensions(node)
      # console.log coords
      
      # checkeamos si esta vacio
      @setState
        display_tooltip: block.getText().length is 0
        position:  
          top: coords.top + window.scrollY
          left: coords.left + window.scrollX - 60
    else
      @closeInlineButton()

  setCurrentInput: (data, cb)=>
    #debugger
    @setState
      current_input: data
    , cb
    #console.log "current in put" , data

  render: ->

    return (
      <div id="content">

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
                        handleReturn={@handleReturn}
                        blockRenderMap={@state.blockRenderMap}
                        blockStyleFn={@.blockStyleFn}
                        handleKeyCommand={@.handleKeyCommand}
                        keyBindingFn={@KeyBindingFn}
                        updateSelection={@_updateSelection}
                        handleBeforeInput={@.handleBeforeInput}
                        readOnly={false}
                        onClick={@handleClick}
                        placeholder="Write something..."
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
          block_types={@BLOCK_TYPES}
          inline_styles={@INLINE_STYLES}
          confirmLink={@_confirmLink}
          options={@state.menu}
          disableMenu={@disableMenu}
          dispatchChanges={@dispatchChanges}
          handleKeyCommand={@.handleKeyCommand}
          keyBindingFn={@KeyBindingFn}
          relocateMenu={@relocateMenu}
          handleDroppedFiles={@.handleDroppedFiles}
        />

        <DanteInlineTooltip
          options={@state.inlineTooltip}
          editorState={@state.editorState}
          style={@state.position}
          onChange={@onChange}
          dispatchChanges={@dispatchChanges}
          setCurrentInput={@setCurrentInput}
          display_tooltip={@state.display_tooltip}
          closeInlineButton={@closeInlineButton}
        />

      </div>
    ) 

module.exports = Dante
