
React = require('react')
ReactDOM = require('react-dom')

{ 
  getCurrentBlock
} = require('../../model/index.js')

class DanteAnchorPopover extends React.Component

  constructor: (props) ->

    super props
    @state = 
      position: 
        top: 0
        left:0
      show: false
      url: ""


  display: (b)=>
    if b then @show() else @hide()

  show: =>
    @setState
      show: true

  hide: =>
    @setState
      show: false

  setPosition: (coords)->
    @setState
      position: coords
  
  relocate: (node=null)=>
    return unless node
    editorState = @props.editorState
    currentBlock = getCurrentBlock(editorState)
    blockType = currentBlock.getType()
    
    contentState = editorState.getCurrentContent()
    selectionState = editorState.getSelection()

    selectionBoundary = node.getBoundingClientRect()
    coords = selectionBoundary 
    el = @refs.dante_popover
    padd   = el.offsetWidth / 2

    parent = ReactDOM.findDOMNode(@props.editor);
    parentBoundary = parent.getBoundingClientRect()

    {
      top: selectionBoundary.top - parentBoundary.top + 160
      left: selectionBoundary.left - (selectionBoundary.width) #- padd
    }

  render: =>
    position = @state.position #@props.getPosition() || 
    console.log "POSITIOM", position
    style = {
              left: position.left, 
              top: position.top, 
              display: "#{if @state.show then 'block' else 'none'}"
            }
    return (
      <div
        ref="dante_popover"
        className='dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active'
        style={style}
        onMouseOver={@props.handleOnMouseOver}
        onMouseOut={@props.handleOnMouseOut}
        >
        <div className='popover-inner'>
          <a href={@props.url} target='_blank'>
            {@state.url}
          </a>
        </div>
        <div className='popover-arrow'>
        </div>
      </div>
    )

module.exports = DanteAnchorPopover