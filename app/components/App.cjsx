
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

SimpleDecorator = require("../utils/simple_decorator")

isSoftNewlineEvent = require('draft-js/lib/isSoftNewlineEvent')

{ 
  addNewBlock
  resetBlockWithType
  updateDataOfBlock
  getCurrentBlock
  addNewBlockAt
} = require('../model/index.js.es6')

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

    @decorator = new CompositeDecorator([
      {
        strategy: findEntities.bind(null, 'link'),
        component: Link
      }
    ])


    @decorator2 = new SimpleDecorator(
      strategy = (contentBlock, callback)=>
        ed = @state.editorState.getSelection()
        
        # providing custom props!
        customProps = {
          ala:1, 
          showPopLinkOver: @showPopLinkOver 
          hidePopLinkOver: @hidePopLinkOver
        }
        callback(ed.getStartOffset(), ed.getEndOffset(), customProps);
    
      component = (props)=>
        return (
          <Link 
            {...props}
          />
        )
      
    )

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

    @blockStyleFn = (block)=>
      currentBlock = getCurrentBlock(@.state.editorState)
      is_selected = if currentBlock.getKey() is block.getKey() then "is-selected" else ""
      
      switch block.getType()
        when "image"
          #console.log "IMAGE DIRECTIONS"
          #console.log @state.image_directions.toJSON()
          direction_class = if direction = this.state.image_directions.toJSON()[block.getKey()] then "#{@parseDirection(direction)}" else ""
          is_selected = if currentBlock.getKey() is block.getKey() then "is-selected is-mediaFocused" else ""
          return "graf graf--figure #{is_selected} #{direction_class}"
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
      editorState: EditorState.createEmpty(@decorator2)
      display_toolbar: false
      showURLInput: false
      blockRenderMap: @extendedBlockRenderMap #@blockRenderMap
      current_input: ""
      inlineTooltip:
        show: true
        position: {}

      current_component: ""

      display_tooltip: false      
      position:  
        top: 0
        left: 0

      image_directions: Map({})
      display_image_popover: false
      image_popover_position:
        top: 0
        left: 0 

      anchor_popover_url: ""
      display_anchor_popover: false 

      menu:
        show: false
        position: {}

      embed_url: ""

      continuousBlocks: [
        "unstyled"
        "blockquote"
        "ordered-list"
        "unordered-list"
        "unordered-list-item"
        "ordered-list-item"
        "code-block"
      ]

      tooltipables: [
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

    optionsForDecorator: ()->
      @state
   

  forceRender: ()=>
    editorState     = @.state.editorState
    content         = editorState.getCurrentContent()
    newEditorState  = EditorState.createWithContent(content, @decorator2)
    @.setState({editorState: newEditorState})
    setTimeout =>
      @getPositionForCurrent()
    , 0

  parseDirection: (direction)=>
    #console.log(direction)
    switch direction
      when "left" then "graf--layoutOutsetLeft"
      when "center" then ""
      when "wide" then "sectionLayout--fullWidth"
      when "fill" then "graf--layoutFillWidth"
      else
        ""
  
  onChange: (editorState) =>
    @.setState({editorState});
    #console.log "changed at", editorState.getSelection().getAnchorKey()
    #console.log "collapsed?", editorState.getSelection().isCollapsed()

    currentBlock = getCurrentBlock(@state.editorState);
    blockType = currentBlock.getType()

    if (!editorState.getSelection().isCollapsed())
      #https://github.com/andrewcoelho/react-text-editor/blob/master/src/utils/selection.js
      #selectionRange = getSelectionRange();
      #selectionCoords = getSelectionCoords(selectionRange);

      #console.log "oijijijiiji ", currentBlock.getType()

      #console.log @.state.tooltipables.indexOf(blockType)
      return if @.state.tooltipables.indexOf(blockType) < 0

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
      #console.log currentBlock.getText()
    #console.log "CHANGED!"

    setTimeout ()=>
      @getPositionForCurrent()
      #@setActive()
    , 0

    @setState({ editorState });
    console.log "CHANGES!"

  setCurrentComponent: (component)=>
    @setState
      current_component: component

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
            editable: true
            props:
              data: @state.current_input
              directions: @state.image_directions
              setCurrentComponent: @setCurrentComponent
          )

      when 'embed'
        return (
            component: EmbedBlock
            editable: true
            props:
              data: @state.current_input
          )

      when 'video'
        return (
            component: VideoBlock
            editable: true
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
      
      if currentBlock.getText().length is 0
        #console.log "Handle return #{blockType} 2"
        switch (blockType)
          when "image", "embed", "video"
            @setState
              display_tooltip: false
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
      
      if currentBlock.getText().length > 0
        #console.log "Handle return #{blockType} with text"
        switch (blockType)
          when "video", "image"
            @setState
              display_tooltip: false
            @.onChange(addNewBlockAt(editorState, currentBlock.getKey()))
            return true       
          when "placeholder"
            @setState
              display_tooltip: false
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
          #console.log "adding block on embed inner text enter "
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

  handleOnChange: ->
    @relocateMenu()

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
   
  relocateMenu: =>

    currentBlock = getCurrentBlock(@state.editorState);
    blockType    = currentBlock.getType()
    # display tooltip only for unstyled
    if @.state.tooltipables.indexOf(blockType) < 0
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
      
      console.log  "POSITION CURRENT BLOCK", currentBlock.getType(), currentBlock.getKey()

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
      
      node = utils.getNode()
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

  setCurrentInput: (data, cb)=>
    #debugger
    @setState
      current_input: data
    , cb
    #console.log "current in put" , data

  relocateImageTooltipPosition: (coords)=>
    @setState
      display_image_popover: true

  setDirection: (direction_type)=>
    
    contentState = @state.editorState.getCurrentContent()
    selectionState = @state.editorState.getSelection()
    block = contentState.getBlockForKey(selectionState.anchorKey);
    @setState
      image_directions: @state.image_directions.merge(
        Map({"#{block.getKey()}": direction_type})
      )

    #debugger
    #TODO: reset block
    #@onChange(@state.editorState)
    @forceRender()

  showPopLinkOver: (url)=>
    @setState
      anchor_popover_url: url
      display_anchor_popover: true

  hidePopLinkOver: ()=>
    @setState
      display_anchor_popover: false

  render: =>

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

        
        <DanteImagePopover
          display_image_popover={@state.display_image_popover}
          relocateImageTooltipPosition={@relocateImageTooltipPosition}
          position={@state.image_popover_position}
          setDirection={@setDirection}
          setCurrentComponent={@setCurrentComponent}
        />
      

        <DanteAnchorPopover
          display_anchor_popover={@state.display_anchor_popover}
          url={@state.anchor_popover_url}
        />
        

      </div>
    ) 

module.exports = Dante
