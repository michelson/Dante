import React from 'react'
import {
  EditorBlock, 
  EditorState,
  RichUtils
} from 'draft-js'
import axios from "axios"
import { updateDataOfBlock, addNewBlockAt } from '../../model/index.js'
import {image} from "../icons.js"
import Select from 'react-select'



export default class CodeBlock extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      syntax: this.props.blockProps.data.get('syntax')
    }

    this.languages = this.props.blockProps.config.languages
  }

  componentDidMount() {
    //this.updateData({syntax: "javascript"})

  }

  // will update block state
  updateData = (options)=> {
    let { blockProps, block } = this.props
    let { getEditorState } = blockProps
    let { setEditorState } = blockProps
    let data = block.getData()
    let newData = data.merge(this.state).merge(options)
    return setEditorState(updateDataOfBlock(getEditorState(), block, newData))
  }

  renderSelect = ()=>{
    return this.props.blockProps.config.displaySelect && !this.props.blockProps.getEditor().props.read_only
  }

  render = ()=> {
    return (
        <div>
          
          <span className="dante-code-syntax">
            {/*this.props.blockProps.data.get('syntax')*/}

            {
              this.renderSelect() ?
              <Select options={this.languages} 
                isSearchable={true}
                defaultValue={this.state.syntax}
                onChange={(o)=>{
                this.updateData({syntax: o.value})
              }} /> : null
            }

            

          </span>
          <EditorBlock {...this.props}/>
        </div>
    )
  }
}

export const CodeBlockConfig = (options={})=>{
  let config =  {
    title: 'add an image',
    type: 'code-block',
    icon: image,
    block: CodeBlock,
    editable: true,
    renderable: true,
    //breakOnContinuous: true,
    wrapper_class: "graf graf--code",
    selected_class: "is-selected",
    selectedFn: block => {},
    handleEnterWithoutText(ctx, block) {
      const { editorState } = ctx.state
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    },
    handleEnterWithText(ctx, block) {
      const { editorState } = ctx.state
      const selection = editorState.getSelection()
      // check if we are in the last line and got 2 previous breaklines
      if(block.getLength() === selection.getEndOffset()){
        if(block.getText().slice(-2) === "\n\n"){
          return ctx.onChange(addNewBlockAt(editorState, block.getKey()))          
        }
      }
      return ctx.onChange(RichUtils.insertSoftNewline(editorState))
      
    },
    widget_options: {
      
    },
    options: {
      displaySelect: true,
      languages: [
                  { value: 'javascript', label: 'javascript' },
                  { value: 'html', label: 'html' },
                  { value: 'css', label: 'css' },
                  { value: null, label: 'none'}
                ]
    }
  
  }
    
  return Object.assign(config, options)
} 


