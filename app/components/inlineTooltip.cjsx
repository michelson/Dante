React = require('react')
ReactDOM = require('react-dom')

class DanteInlineTooltip extends React.Component

  constructor: (props) ->
    super props

    @state = 
      #position: {top: 0, left:0}
      show: true
      scaled: false

  _toggleScaled: (ev)=>
    if @state.scaled then @collapse() else @scale()

  scale: =>
    @setState
      scaled: true

  collapse: =>
    @setState
      scaled: false

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

  scaledClass: ->
    if @state.scaled then "is-scaled" else ""

  scaledWidth: ->
    if @state.scaled then "124" else "0"    

  render: ->
    return (

      <div className="inlineTooltip #{@activeClass()} #{@scaledClass()}" 
        style={@props.style}>
        
        <button className="inlineTooltip-button control" 
          title="Close Menu" 
          data-action="inline-menu"
          onClick={@_toggleScaled}
        > 
          <span className="tooltip-icon icon-plus"></span> 
        </button> 
        
        <div className="inlineTooltip-menu" style={{width: "#{@scaledWidth()}px"}}> 
          
          <button className="inlineTooltip-button scale" 
            title="Add an image" data-action="inline-menu-menu-image"> 
            <span className="tooltip-icon icon-image"></span> 
          </button>
          
          <button className="inlineTooltip-button scale" 
            title="Add a video" data-action="inline-menu-embed"> 
            <span className="tooltip-icon icon-video"></span> 
          </button>

          <button className="inlineTooltip-button scale" 
            title="Add an embed" data-action="inline-menu-embed-extract"> 
            <span className="tooltip-icon icon-embed"></span> 
          </button> 
        </div>

      </div>

    )

module.exports = DanteInlineTooltip