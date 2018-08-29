
import React from 'react'
import Icons from '../icons'
import {capitalize} from 'lodash'
import { getSelection } from "../../utils/selection.js"
import { getCurrentBlock } from '../../model/index.js'
import { getRelativeParent } from "../../utils/selection.js"

class DanteImagePopover extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      position: {
        top: 0,
        left: 0
      },
      show: false,
      scaled: false,
      buttons: [{ type: "left" },
                { type: "center"},
                { type: "fill" },
                { type: "wide" }]
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

  setPosition =(coords)=> {
    return this.setState({
      position: coords })
  }

  _toggleScaled =(ev) =>{
    if (this.state.scaled) {
      return this.collapse()
    } else {
      return this.scale()
    }
  }

  scale = ()=> {
    return this.setState({
      scaled: true })
  }

  collapse = ()=> {
    return this.setState({
      scaled: false })
  }

  relocate = ()=> {
    let { editorState } = this.props

    if (editorState.getSelection().isCollapsed()) {

      let currentBlock = getCurrentBlock(editorState)
      let blockType = currentBlock.getType()

      let nativeSelection = getSelection(window)
      if (!nativeSelection.rangeCount) {
        return
      }

      this.display(blockType === "image")

      if (blockType === "image") {

        let imageBoxNode = document.getElementsByClassName("is-selected")[0]
        let selectionRect = imageBoxNode.getBoundingClientRect()

        let el = this.refs.image_popover
        const relativeParent = getRelativeParent(el.parentElement);
        const toolbarHeight = el.clientHeight;
        const toolbarWidth =  el.clientWidth;
        const relativeRect = (relativeParent || document.body).getBoundingClientRect();
        
        let top = (selectionRect.top - relativeRect.top) - toolbarHeight
        let left = (selectionRect.left - relativeRect.left + (selectionRect.width/2) ) - ( toolbarWidth/2 )
        
        //let left = selectionRect.left + selectionRect.width / 2 - padd
        //let top = (selectionRect.top + window.scrollY) - toolbarHeight
        return this.setPosition({
          top: top, 
          left: left 
        })

      }
    } else {
      return this.hide()
    }
  }

  componentWillReceiveProps(newProps) {
    return this.collapse()
  }

  getStyle =()=> {
    if (!this.state.position) {
      return {}
    }
  }

  handleClick =(item)=> {
    return this.props.editor.setDirection(item.type)
  }

  render =()=> {
    return (
      <div
        ref="image_popover"
        className={ `dante-popover popover--Aligntooltip popover--top popover--animated ${ this.state.show ? 'is-active' : undefined }` }
        style={
          { top: this.state.position.top,
            left: this.state.position.left }
          }
      >
        <div className='popover-inner'>
          <ul className='dante-menu-buttons'>
            { this.state.buttons.map( (item, i) => {
                return  <DanteImagePopoverItem
                          item={ item }
                          handleClick={ this.handleClick }
                          key={ i }
                        />
              })
            }
          </ul>
        </div>
        <div className='popover-arrow' />
      </div>
    )
  }
}

class DanteImagePopoverItem extends React.Component {

  constructor(...args) {
    super(...args)
    this.handleClick = this.handleClick.bind(this)
    this.render = this.render.bind(this)
  }

  handleClick =(e)=> {
    e.preventDefault()
    return this.props.handleClick(this.props.item)
  }

  render =()=> {
    return <li
      className={`dante-menu-button align-${ this.props.item.type }`}
      onMouseDown={this.handleClick}>
        <span className={`tooltip-icon dante-icon`} >
          {Icons[`image${capitalize(this.props.item.type)}`]()}
        </span>
    </li>
  }
}

export default DanteImagePopover

export const DanteImagePopoverConfig = (options={})=>{
  let config = {
      ref: 'image_popover',
      component: DanteImagePopover
  } 
  return Object.assign(config, options)
}
