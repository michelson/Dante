
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

  componentWillReceiveProps: (newProps)=>
    @collapse()

  getStyle: ->
    return {} if !@state.position
    
  handleClick: (item)=>
    @props.setDirection(item.type)

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

