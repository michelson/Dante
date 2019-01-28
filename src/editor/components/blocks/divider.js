import React from 'react'
import {divider} from "../icons";

export default class Divider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render = ()=> {
    return (
      <span></span>
    )
  }
}

export const DividerBlockConfig = (options={})=>{
  
  let config =  {
    title: 'add divider',
    type: 'divider',
    icon: divider,
    block: Divider,
    editable: false,
    renderable: true,
    breakOnContinuous: false,
    wrapper_class: "graf graf--divider",
    selected_class: "is-selected",
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "divider",
      insert_block: "divider"
    },
    options: {

    }
    
  };
  
  return Object.assign(config, options)
}
