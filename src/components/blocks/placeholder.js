
import React from 'react'
import ReactDOM from 'react-dom'

import { Entity, RichUtils, AtomicBlockUtils, EditorBlock } from 'draft-js'

export default class PlaceholderBlock extends React.Component {
  constructor(props) {
    super(props)
    this.placeholderText = this.placeholderText.bind(this)
    this.placeholderFromProps = this.placeholderFromProps.bind(this)
    this.defaultText = this.defaultText.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.classForDefault = this.classForDefault.bind(this)
    this.state = {
      enabled: false,
      data: this.props.blockProps.data.toJS()
    }
  }

  placeholderText() {
    if (this.state.enabled) {
      return ""
    }
    return this.props.blockProps.data.toJS().placeholder || this.placeholderFromProps() || this.defaultText()
  }
  //if @.props.blockProps.data then @.props.blockProps.data.placeholder else @defaultText()


  placeholderFromProps() {
    return this.props.block.toJS().placeholder
  }

  defaultText() {
    return "write something "
  }

  componentDidMount() {}

  handleFocus(e) {
    // console.log "focus on placeholder"
    return setTimeout(() => {
      return this.setState({
        enabled: true })
    }, 0)
  }

  classForDefault() {
    if (!this.state.enabled) {
      return "defaultValue defaultValue--root"
    } else {
      return ""
    }
  }

  render() {
    return (
      <span className={this.classForDefault()} onMouseDown={this.handleFocus}>
        {this.placeholderText()}
        <EditorBlock {...Object.assign({}, this.props, {
          "className": "imageCaption",
          "placeholder": "escrive alalal"
        })} />
      </span>
    )
  }
}

