import React from 'react'
import ReactDOM from 'react-dom'

import { convertToRaw, CompositeDecorator, getVisibleSelectionRect, getDefaultKeyBinding, getSelectionOffsetKeyForNode, KeyBindingUtil, ContentState, Editor, EditorState, Entity, RichUtils } from 'draft-js'

import { getSelectionRect, getSelection } from "../../utils/selection.js"

import { getCurrentBlock } from '../../model/index.js'

class DanteTooltip extends React.Component {

  constructor(props) {
    super(props)
    this._clickInlineHandler = this._clickInlineHandler.bind(this)
    this.display = this.display.bind(this)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.relocate = this.relocate.bind(this)
    this._clickBlockHandler = this._clickBlockHandler.bind(this)
    this.displayLinkMode = this.displayLinkMode.bind(this)
    this.displayActiveMenu = this.displayActiveMenu.bind(this)
    this._enableLinkMode = this._enableLinkMode.bind(this)
    this._disableLinkMode = this._disableLinkMode.bind(this)
    this.handleInputEnter = this.handleInputEnter.bind(this)
    this.confirmLink = this.confirmLink.bind(this)
    this.inlineItems = this.inlineItems.bind(this)
    this.blockItems = this.blockItems.bind(this)
    this.getDefaultValue = this.getDefaultValue.bind(this)
    this.getVisibleSelectionRect = getVisibleSelectionRect
    this.state = {
      link_mode: false,
      show: false,
      position: {}
    }
  }

  _clickInlineHandler(ev, style) {
    ev.preventDefault()

    this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, style))

    return setTimeout(() => {
      return this.relocate()
    }, 0)
  }

  display(b) {
    if (b) {
      return this.show()
    } else {
      return this.hide()
    }
  }

  show() {
    return this.setState({
      show: true })
  }

  hide() {
    return this.setState({
      link_mode: false,
      show: false
    })
  }

  setPosition(coords) {
    return this.setState({
      position: coords })
  }

  isDescendant(parent, child) {
    let node = child.parentNode
    while (node !== null) {
      if (node === parent) {
        return true
      }
      node = node.parentNode
    }
    return false
  }

  relocate() {

    let currentBlock = getCurrentBlock(this.props.editorState)
    let blockType = currentBlock.getType()
    // display tooltip only for unstyled

    if (this.props.configTooltip.selectionElements.indexOf(blockType) < 0) {
      this.hide()
      return
    }

    if (this.state.link_mode) {
      return
    }
    if (!this.state.show) {
      return
    }

    let el = this.refs.dante_menu
    let padd = el.offsetWidth / 2

    let nativeSelection = getSelection(window)
    if (!nativeSelection.rangeCount) {
      return
    }

    let selectionBoundary = getSelectionRect(nativeSelection)

    let parent = ReactDOM.findDOMNode(this.props.editor)
    let parentBoundary = parent.getBoundingClientRect()

    // hide if selected node is not in editor
    if (!this.isDescendant(parent, nativeSelection.anchorNode)) {
      this.hide()
      return
    }

    let top = selectionBoundary.top - parentBoundary.top - -90 - 5
    let left = selectionBoundary.left + selectionBoundary.width / 2 - padd

    if (!top || !left) {
      return
    }

    // console.log "SET SHOW FOR TOOLTIP INSERT MENU"
    return this.setState({
      show: true,
      position: {
        left,
        top
      }
    })
  }

  _clickBlockHandler(ev, style) {
    ev.preventDefault()

    this.props.onChange(RichUtils.toggleBlockType(this.props.editorState, style))

    return setTimeout(() => {
      return this.relocate()
    }, 0)
  }

  displayLinkMode() {
    if (this.state.link_mode) {
      return "dante-menu--linkmode"
    } else {
      return ""
    }
  }

  displayActiveMenu() {
    if (this.state.show) {
      return "dante-menu--active"
    } else {
      return ""
    }
  }

  _enableLinkMode(ev) {
    ev.preventDefault()
    return this.setState({
      link_mode: true })
  }

  _disableLinkMode(ev) {
    ev.preventDefault()
    return this.setState({
      link_mode: false,
      url: ""
    })
  }

  hideMenu() {
    return this.hide()
  }

  handleInputEnter(e) {
    if (e.which === 13) {
      return this.confirmLink(e)
    }
  }

  confirmLink(e) {
    e.preventDefault()
    let { editorState } = this.props
    let urlValue = e.currentTarget.value
    let contentState = editorState.getCurrentContent()
    let selection = editorState.getSelection()

    let opts = {
      url: urlValue,
      showPopLinkOver: this.props.showPopLinkOver,
      hidePopLinkOver: this.props.hidePopLinkOver
    }

    let entityKey = Entity.create('LINK', 'MUTABLE', opts)

    if (selection.isCollapsed()) {
      console.log("COLLAPSED SKIPPING LINK")
      return
    }

    this.props.onChange(RichUtils.toggleLink(editorState, selection, entityKey))

    return this._disableLinkMode(e)
  }

  getPosition() {
    let pos = this.state.position
    return pos
  }

  inlineItems() {
    return this.props.widget_options.block_types.filter(o => {
      return o.type === "inline"
    })
  }

  blockItems() {
    return this.props.widget_options.block_types.filter(o => {
      return o.type === "block"
    })
  }

  getDefaultValue() {
    if (this.refs.dante_menu_input) {
      this.refs.dante_menu_input.value = ""
    }

    let currentBlock = getCurrentBlock(this.props.editorState)
    let blockType = currentBlock.getType()
    let selection = this.props.editor.state.editorState.getSelection()
    let selectedEntity = null
    let defaultUrl = null
    return currentBlock.findEntityRanges(character => {
      let entityKey = character.getEntity()
      selectedEntity = entityKey
      return entityKey !== null && Entity.get(entityKey).getType() === 'LINK'
    }, (start, end) => {
      let selStart = selection.getAnchorOffset()
      let selEnd = selection.getFocusOffset()
      if (selection.getIsBackward()) {
        selStart = selection.getFocusOffset()
        selEnd = selection.getAnchorOffset()
      }

      if (start === selStart && end === selEnd) {
        defaultUrl = Entity.get(selectedEntity).getData().url
        return this.refs.dante_menu_input.value = defaultUrl
      }
    })
  }

  render() {
    return (
      <div
        id="dante-menu"
        ref="dante_menu"
        className={ `dante-menu ${ this.displayActiveMenu() } ${ this.displayLinkMode() }` }
        style={ this.getPosition() }
      >
        <div className="dante-menu-linkinput">
          <input
            className="dante-menu-input"
            ref="dante_menu_input"
            placeholder="Paste or type a link"
            onKeyPress={ this.handleInputEnter }
            defaultValue={ this.getDefaultValue() }
          />
          <div className="dante-menu-button" onMouseDown={ this._disableLinkMode } />
        </div>
        <ul className="dante-menu-buttons">
          { this.blockItems().map( (item, i) => {
              return  <DanteTooltipItem
                        key={ i }
                        item={ item }
                        handleClick={ this._clickBlockHandler }
                        editorState={ this.props.editorState }
                        type="block"
                        currentStyle={ this.props.editorState.getCurrentInlineStyle }
                      />
            })
          }
          <DanteTooltipLink
            editorState={ this.props.editorState }
            enableLinkMode={ this._enableLinkMode }
          />
            { this.inlineItems().map( (item, i) => {
              return  <DanteTooltipItem
                        key={ i }
                        item={ item }
                        type="inline"
                        editorState={ this.props.editorState }
                        handleClick={ this._clickInlineHandler }
                      />
            })
          }
        </ul>
      </div>
    )
  }
}

class DanteTooltipItem extends React.Component {

  constructor(...args) {
    super(...args)
    this.handleClick = this.handleClick.bind(this)
    this.activeClass = this.activeClass.bind(this)
    this.isActive = this.isActive.bind(this)
    this.activeClassInline = this.activeClassInline.bind(this)
    this.activeClassBlock = this.activeClassBlock.bind(this)
    this.render = this.render.bind(this)
  }

  handleClick(ev) {
    return this.props.handleClick(ev, this.props.item.style)
  }

  activeClass() {
    if (this.isActive()) {
      return "active"
    } else {
      return ""
    }
  }

  isActive() {
    if (this.props.type === "block") {
      return this.activeClassBlock()
    } else {
      return this.activeClassInline()
    }
  }

  activeClassInline() {
    if (!this.props.editorState) {
      return
    }
    //console.log @props.item
    return this.props.editorState.getCurrentInlineStyle().has(this.props.item.style)
  }

  activeClassBlock() {
    //console.log "EDITOR STATE", @props.editorState
    if (!this.props.editorState) {
      return
    }
    let selection = this.props.editorState.getSelection()
    let blockType = this.props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()
    return this.props.item.style === blockType
  }

  render() {
    return (
      <li className={ `dante-menu-button ${ this.activeClass() }` } onMouseDown={ this.handleClick }>
        <i className={ `dante-icon dante-icon-${ this.props.item.label }` } data-action="bold" />
      </li>
    )
  }
}

class DanteTooltipLink extends React.Component {

  constructor(...args) {
    super(...args)
    this.promptForLink = this.promptForLink.bind(this)
  }

  promptForLink(ev) {
    let selection = this.props.editorState.getSelection()
    if (!selection.isCollapsed()) {
      return this.props.enableLinkMode(ev)
    }
  }

  render() {
    return (
      <li className="dante-menu-button" onMouseDown={ this.promptForLink }>
        <i className="dante-icon icon-createlink" data-action="createlink">link</i>
      </li>
    )
  }
}

export default DanteTooltip

