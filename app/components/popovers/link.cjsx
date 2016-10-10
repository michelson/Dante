
React = require('react')
ReactDOM = require('react-dom')

class DanteAnchorPopover extends React.Component

  constructor: (props) ->

    super props

  render: =>

    return (
      <div className='dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active'
        style={{display: "#{if @props.display_anchor_popover then 'block' else 'none'}"}}
        >
        <div className='popover-inner'>
          <a href='#' target='_blank'>
          </a>
        </div>
        <div className='popover-arrow'>
        </div>
      </div>
    )

module.exports = DanteAnchorPopover