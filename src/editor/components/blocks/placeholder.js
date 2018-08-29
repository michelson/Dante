
import React from 'react'
import { EditorBlock } from 'draft-js'
import {
  resetBlockWithType
} from '../../model/index.js'

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


export const PlaceholderBlockConfig = (options={})=>{
  let config = {
      renderable: true,
      editable: true,
      block: PlaceholderBlock,
      type: 'placeholder',
      wrapper_class: "is-embedable",
      breakOnContinuous: true,
      selected_class: "is-selected is-mediaFocused",
      widget_options: {
        displayOnInlineTooltip: false
      },

      handleEnterWithoutText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(resetBlockWithType(editorState, "unstyled"))
      },

      handleEnterWithText(ctx, block) {
        const { editorState } = ctx.state
        const data = {
          provisory_text: block.getText(),
          endpoint: block.getData().get('endpoint'),
          type: block.getData().get('type')
        }
        return ctx.onChange(resetBlockWithType(editorState, data.type, data))
      }
    }

  return Object.assign(config, options)
}



