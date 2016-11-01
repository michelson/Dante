
React = require('react')
ReactDOM = require('react-dom')

{
  Entity
  RichUtils
  AtomicBlockUtils
  EditorState
} = require('draft-js')

{ 
  getSelectionRect
  getSelection
} = require("../../utils/selection.js.es6")

{ 
  getCurrentBlock
  getNode
} = require('../../model/index.js.es6')


class DanteImagePopover extends React.Component

  constructor: (props) ->
    super props

    @state = 
      position: 
        top: 0
        left:0
      show: false
      scaled: false
      buttons: [
        {type: "left" }
        {type: "center" }
        {type: "fill" }
        {type: "wide" }
      ]

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

  _toggleScaled: (ev)=>
    if @state.scaled then @collapse() else @scale()

  scale: =>
    @setState
      scaled: true

  collapse: =>
    @setState
      scaled: false
  
  relocate: ()=>
    editorState = @props.editorState
    
    if editorState.getSelection().isCollapsed()

      currentBlock = getCurrentBlock(editorState)
      blockType = currentBlock.getType()
      
      contentState = editorState.getCurrentContent()
      selectionState = editorState.getSelection()

      block = contentState.getBlockForKey(selectionState.anchorKey)

      nativeSelection = getSelection(window)
      if !nativeSelection.rangeCount
        return;

      node = getNode()

      selectionBoundary = getSelectionRect(nativeSelection)
      coords = selectionBoundary
      
      parent = ReactDOM.findDOMNode(@props.editor);
      parentBoundary = parent.getBoundingClientRect();

      @display(blockType is "image")

      if blockType is "image"
        selectionBoundary = node.anchorNode.parentNode.parentNode.parentNode.getBoundingClientRect()
        el = @refs.image_popover
        padd   = el.offsetWidth / 2
        @setPosition
          top: selectionBoundary.top - parentBoundary.top + 60
          left: selectionBoundary.left + (selectionBoundary.width / 2) - padd

    else
      @hide()

  componentWillReceiveProps: (newProps)=>
    @collapse()

  getStyle: ->
    return {} if !@state.position
    
  handleClick: (item)=>
    @props.editor.setDirection(item.type)

  render: ->
    return (

      <div ref="image_popover" 
          className="dante-popover popover--Aligntooltip popover--top popover--animated #{'is-active' if @state.show}" 
          style={{top: @state.position.top, left: @state.position.left}}>

        <div className='popover-inner'>

          <ul className='dante-menu-buttons'>

            {
              @state.buttons.map (item, i)=>
                <DanteImagePopoverItem
                  item={item}
                  handleClick={@handleClick}
                  key={i}
                />
            }

          </ul>

        </div>

        <div className='popover-arrow'>
        </div>
      </div>

    )

class DanteImagePopoverItem extends React.Component

  handleClick: (e)=>
    e.preventDefault()
    @props.handleClick(@props.item)

  render: =>
    return (
      <li
        className="dante-menu-button align-#{@props.item.type}"
        onMouseDown={@handleClick}>
        <span className="tooltip-icon dante-icon-image-#{@props.item.type}"></span>
      </li>
    )

module.exports = DanteImagePopover

