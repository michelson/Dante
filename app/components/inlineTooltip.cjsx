React = require('react')
ReactDOM = require('react-dom')

{
  Entity,
  RichUtils
  AtomicBlockUtils
} = require('draft-js')

class DanteInlineTooltip extends React.Component

  constructor: (props) ->
    super props

    @state = 
      #position: {top: 0, left:0}
      show: true
      scaled: false
      buttons: [
        {title: "Add an image", icon: "image" }
        {title: "Add an video", icon: "video" }
        {title: "Add an embed", icon: "embed" }
      ]

  _toggleScaled: (ev)=>
    if @state.scaled then @collapse() else @scale()

  scale: =>
    @setState
      scaled: true

  collapse: =>
    @setState
      scaled: false

  componentWillReceiveProps: (newProps)=>
    @collapse()

  ###
  componentWillReceiveProps: (newProps)=>
    console.log "RECEIVED PROPS"

    contentState = newProps.editorState.getCurrentContent()
    selectionState = newProps.editorState.getSelection()
    console.log contentState
    console.log selectionState
    if newProps.editorState.getSelection().isCollapsed()
      block = contentState.getBlockForKey(selectionState.anchorKey);
      console.log block.getText().length, block.getText()

      #debugger
      if block.getText().length > 0
        @setState
          show: false    
        return

      #debugger
      node = utils.getNode()
      #console.log node.AnchorNode

      # clearTimeout(@timeout)
      # @timeout = setTimeout =>

      if node.anchorNode
        #debugger
        #debugger
        console.log "ANCHOR NODE", node.anchorNode
        coords = utils.getSelectionDimensions(node)
        console.log coords
        @setState
          position:
            top: coords.top + window.scrollY
            left: coords.left + window.scrollX - 40
          show: true
      #, 0
    else
      #if (!selectionState.isCollapsed() || selectionState.anchorKey !== selectionState.focusKey) {
      console.log('no sel');
      #this.hideBlock();
      @setState
        show: false
      return;
  ###

  activeClass: ->
    #if @props.show then "is-active" else ""
    if @props.display_tooltip then "is-active" else ""

  getPosition: ->
    @state.position

  isActive: ->
    @props.display_tooltip 

  scaledClass: ->
    if @state.scaled then "is-scaled" else ""

  scaledWidth: ->
    if @state.scaled then "124" else "0"   

  clickOnFileUpload: => 
    #ReactDOM.findDOMNode(@)
    @.refs.fileInput.click()
    @collapse()
    @props.closeInlineButton()

  insertImage: (file) =>
    entityKey = Entity.create('atomic:image', 'IMMUTABLE', {src: URL.createObjectURL(file)})
    @.props.dispatchChanges(AtomicBlockUtils.insertAtomicBlock(
        @.props.editorState,
        entityKey,
        ' '
      ));

  insertVideo: () =>
    entityKey = Entity.create('atomic:video', 'IMMUTABLE', {src: "oli"})
    @.props.dispatchChanges(AtomicBlockUtils.insertAtomicBlock(
        @.props.editorState,
        entityKey,
        ' '
      ));    

  insertEmbed: () =>
    entityKey = Entity.create('atomic:embed', 'IMMUTABLE', {src: "oli"})
    @.props.dispatchChanges(AtomicBlockUtils.insertAtomicBlock(
        @.props.editorState,
        entityKey,
        ' '
      )); 

  handleFileInput: (e)=>
    #debugger
    fileList = e.target.files
    file = fileList[0]
    @.insertImage(file)

  clickHandler: (e, type)=>
    switch type
      when "image"
        @clickOnFileUpload(e)
      when "video"
        @insertVideo()
      when "embed"
        @insertEmbed()
      else
        null

  render: ->
    return (

      <div className="inlineTooltip #{@activeClass()} #{@scaledClass()}" 
        style={@props.style}>
        
        <button className="inlineTooltip-button control" 
          title="Close Menu" 
          data-action="inline-menu"
          onClick={@_toggleScaled}
        > 
          <span className="tooltip-icon dante-icon-plus"></span> 
        </button> 
        
        <div className="inlineTooltip-menu" style={{width: "#{@scaledWidth()}px"}}> 
          
          {
            @state.buttons.map (item, i)=>
              <InlineTooltipItem
                item={item}
                key={i}
                clickHandler={@clickHandler}
              />
          }

          <input type="file" 
            style={{display: 'none'}}
            ref="fileInput" 
            multiple="multiple"
            onChange={@.handleFileInput}
          />

        </div>

      </div>

    )

class InlineTooltipItem extends React.Component

  clickHandler: (e)=>
    e.preventDefault()
    #console.log "UPLOAD IMAGE"
    @props.clickHandler(e, @props.item.icon)

  render: ->
    return (
      <button className="inlineTooltip-button scale" 
        title={@props.title} onMouseDown={@clickHandler}> 
        <span className="tooltip-icon dante-icon-#{@props.item.icon}">
        </span> 
      </button>
    )

module.exports = DanteInlineTooltip