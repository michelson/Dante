
import React from 'react'

class DanteAnchorPopover extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      position: {
        top: 0,
        left: 0
      },
      show: false,
      url: ""
    }
  }

  display =(b)=> {
    if (b) {
      return this.show()
    } else {
      return this.hide()
    }
  }

  show =()=> {
    return this.setState({
      show: true })
  }

  hide =()=> {
    return this.setState({
      show: false })
  }

  setPosition(coords) {
    return this.setState({
      position: coords })
  }

  relocate(node) {
    if (node == null) {
      node = null
    }
    if (!node) {
      return
    }

    let selectionBoundary = node.getBoundingClientRect()

    let el = this.refs.dante_popover
    let padd = el.offsetWidth / 2

    const toolbarHeight = el.offsetHeight;

    let left = selectionBoundary.left + selectionBoundary.width / 2 - padd
    let top = (selectionBoundary.top + window.scrollY) + (toolbarHeight * 0.3)

    return {
      top: top,
      left: left
    }

  }

  render() {
    let { position } = this.state
    let style = {
      left: position.left,
      top: position.top,
      visibility: `${ this.state.show ? 'visible' : 'hidden' }`
    }
    return (
      <div
        ref="dante_popover"
        className='dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active'
        style={ style }
        onMouseOver={ this.props.handleOnMouseOver }
        onMouseOut={ this.props.handleOnMouseOut }
      >
        <div className='popover-inner'>
          <a href={ this.state.url } target='_blank'>
            { this.state.url }
          </a>
        </div>
        <div className='popover-arrow' />
      </div>
    )
  }
}

export default DanteAnchorPopover

