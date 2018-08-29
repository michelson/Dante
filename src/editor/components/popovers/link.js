
import React from 'react'
import ReactDOM from 'react-dom'

import { getRelativeParent } from "../../utils/selection.js"

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

  relocate = (node)=>{

    if (!node) {
      return
    }

    const { editorState } = this.props

    let selectionRect = node.getBoundingClientRect()

    let parent = ReactDOM.findDOMNode(this.props.editor)

    const relativeParent = getRelativeParent(this.refs.dante_popover.parentElement);
    const toolbarHeight = this.refs.dante_popover.clientHeight;
    const toolbarWidth = this.refs.dante_popover.clientWidth;
    const relativeRect = (relativeParent || document.body).getBoundingClientRect();

    if(!relativeRect || !selectionRect)
      return

    let top = (selectionRect.top - relativeRect.top) + (toolbarHeight*0.3)
    let left = (selectionRect.left - relativeRect.left + (selectionRect.width/2) ) - ( toolbarWidth/2 )

    if (!top || !left) {
      return
    }

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


export const DanteAnchorPopoverConfig = (options={})=>{
  let config = {
      ref: 'anchor_popover',
      component: DanteAnchorPopover
  } 
  return Object.assign(config, options)
}
