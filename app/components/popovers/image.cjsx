
React = require('react')
ReactDOM = require('react-dom')

{
  Entity
  RichUtils
  AtomicBlockUtils
  EditorState
} = require('draft-js')

class DanteImagePopover extends React.Component

  constructor: (props) ->
    super props

    @state = 
      #position: {top: 0, left:0}
      show: true
      scaled: false
      buttons: [
        {type: "left" }
        {type: "center" }
        {type: "fill" }
        {type: "wide" }
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

  getStyle: ->
    return {} if !@state.position
    
  handleClick: (item)=>
    @props.setDirection(item.type)

  render: ->
    return (

      <div id="dante_image_popover" 
          className="dante-popover popover--Aligntooltip popover--top popover--animated #{'is-active' if @props.display_image_popover}" 
          style={{top: @props.position.top, left: @props.position.left}}>

        <div className='popover-inner'>

          <ul className='dante-menu-buttons'>

            {
              @state.buttons.map (item, i)=>
                <DanteImagePopoverItem
                  item={item}
                  handleClick={@handleClick}
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

