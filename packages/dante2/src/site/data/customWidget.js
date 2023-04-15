
import React from 'react'
import {addNewBlockAt} from '../../editor/model'



export default class CustomWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enabled: false,
      data: this.props.blockProps.data.toJS()
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div style={{padding: 10, border: '1px solid red'}}>hello</div>
    )
  }
}

export function customIcon() {
  return <svg className="icon-signature" width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fill="#494B56" fillRule="nonzero" d="M9.9347554,11.8295455 C9.795059,11.8295455 9.68330189,11.7113637 9.68330189,11.5636364 L9.68330189,10.3522727 C9.68330189,10.3375 9.68330189,10.3227273 9.68330189,10.3079546 C10.2839964,9.7909091 10.6611767,9.00795455 10.6611767,8.13636364 L10.6611767,6.80681819 C10.6611767,5.25568182 9.47375729,4 8.00694511,4 C6.54013294,4 5.35271355,5.25568182 5.35271355,6.80681819 L5.35271355,8.13636364 C5.35271355,9.00795455 5.72989382,9.7909091 6.33058833,10.3079546 C6.33058833,10.3227273 6.33058833,10.3375 6.33058833,10.3522727 L6.33058833,11.5636364 C6.33058833,11.7113637 6.21883121,11.8295455 6.07913482,11.8295455 C3.83002281,11.8295455 2,13.7647727 2,16.1431819 C2,16.6159091 2.36321064,17 2.81023911,17 L13.1896814,17 C13.6367099,17 13.9999205,16.6159091 13.9999205,16.1431819 C14.0138902,13.7647727 12.1838674,11.8295455 9.9347554,11.8295455 Z M6.19089194,8.13636364 L6.19089194,6.80681819 C6.19089194,5.74318183 7.00113105,4.88636364 8.00694511,4.88636364 C9.01275918,4.88636364 9.82299828,5.74318183 9.82299828,6.80681819 L9.82299828,8.13636364 C9.82299828,9.20000001 9.01275918,10.0568182 8.00694511,10.0568182 C7.00113105,10.0568182 6.19089194,9.20000001 6.19089194,8.13636364 Z M2.83817839,16.1136363 C2.85214803,14.2375 4.29102093,12.7159091 6.07913482,12.7159091 C6.67982933,12.7159091 7.16876672,12.1988637 7.16876672,11.5636364 L7.16876672,10.7954546 C7.43418988,10.8840909 7.71358268,10.9431818 8.00694511,10.9431818 C8.30030755,10.9431818 8.57970034,10.8840909 8.8451235,10.7954546 L8.8451235,11.5488637 C8.8451235,12.1840909 9.33406089,12.7011364 9.9347554,12.7011364 C11.7228693,12.7159091 13.1617422,14.2375 13.1757119,16.1136363 L2.83817839,16.1136363 Z"></path>
      <rect fill="#494B56" fillRule="nonzero" x="13" y="6" width="6" height="1"></rect>
      <rect fill="#494B56" fillRule="nonzero" x="13" y="8" width="6" height="1"></rect>
      <rect fill="#494B56" fillRule="nonzero" x="13" y="10" width="6" height="1"></rect>
  </svg>
}

export const CustomWidgetconfig = (options={})=>{
  let config =  {
    title: 'add a custom block',
    type: 'image',
    icon: customIcon,
    block: CustomWidget,
    editable: false,
    renderable: true,
    breakOnContinuous: true,
    wrapper_class: "graf graf--figure",
    selected_class: "is-selected is-mediaFocused",

    handleEnterWithoutText(ctx, block) {
      const { editorState } = ctx.state
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    },

    handleEnterWithText(ctx, block) {
      const { editorState } = ctx.state
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    },

    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "image"
    },
    options: {}
  
  }
    
  return Object.assign(config, options)
} 