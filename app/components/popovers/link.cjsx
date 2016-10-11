
React = require('react')
ReactDOM = require('react-dom')

class DanteAnchorPopover extends React.Component

  constructor: (props) ->

    super props

  render: =>
    position = @props.position #@props.getPosition() || 
    console.log "POSITIOM", position
    style = {
              left: position.left, 
              top: position.top, 
              display: "#{if @props.display_anchor_popover then 'block' else 'none'}"
            }
    return (
      <div id="dante-popover" 
        className='dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active'
        style={style}
        onMouseOver={@props.handleOnMouseOver}
        onMouseOut={@props.handleOnMouseOut}
        >
        <div className='popover-inner'>
          <a href={@props.url} target='_blank'>
            {@props.url}
          </a>
        </div>
        <div className='popover-arrow'>
        </div>
      </div>
    )

module.exports = DanteAnchorPopover