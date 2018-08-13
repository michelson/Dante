
import React from 'react'
import { EditorBlock } from 'draft-js'

export default class PlaceholderBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enabled: false,
      data: this.props.blockProps.data.toJS()
    }
  }

  placeholderText =()=> {
    //if (this.state.enabled) {
    //  return ""
    //}
    return this.props.blockProps.data.toJS().placeholder || this.placeholderFromProps() || this.defaultText()
  }
  //if @.props.blockProps.data then @.props.blockProps.data.placeholder else @defaultText()


  placeholderFromProps =()=> {
    return this.props.block.toJS().placeholder
  }

  defaultText =()=> {
    return "write something "
  }

  placeholderRender =()=>{
    if (this.props.block.text.length === 0 ) {
      return  (
        <div className="public-DraftEditorPlaceholder-root">
          <div className="public-DraftEditorPlaceholder-inner">
            {this.placeholderText() }
          </div>
        </div>
      )

    }
  }

  render() {
    return (
      <span onMouseDown={this.handleFocus}>
        
        {this.placeholderRender()}
        
        <EditorBlock {...Object.assign({}, this.props, {
          "className": "imageCaption",
          "placeholder": "escrive alalal"
        })} />
      </span>
    )
  }
}

