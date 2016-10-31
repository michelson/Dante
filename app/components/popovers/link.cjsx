
React = require('react')
ReactDOM = require('react-dom')

{ 
  getCurrentBlock
} = require('../../model/index.js.es6')

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

  setProps: (options)=>
    @setState options

  positionForTooltip: (node, editorState, parent)=>
    currentBlock = getCurrentBlock(editorState)
    blockType = currentBlock.getType()
    
    contentState = editorState.getCurrentContent()
    selectionState = editorState.getSelection()

    selectionBoundary = node.getBoundingClientRect() #getSelectionRect(nativeSelection);
    coords = selectionBoundary #utils.getSelectionDimensions(node)
    #if blockType is "image"
    #selectionBoundary = node.anchorNode.parentNode.parentNode.parentNode.getBoundingClientRect()
    el = @refs.dante_popover
    padd   = el.offsetWidth / 2
    # eslint-disable-next-line react/no-find-dom-node
    #toolbarNode = ReactDOM.findDOMNode(@)
    #toolbarBoundary = toolbarNode.getBoundingClientRect()

    # eslint-disable-next-line react/no-find-dom-node
    # parent = ReactDOM.findDOMNode(@);
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