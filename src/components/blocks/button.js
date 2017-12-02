
import React from 'react'
import ReactDOM from 'react-dom'

//import { Entity, RichUtils, AtomicBlockUtils, EditorBlock } from 'draft-js'

export default class ButtonBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enabled: false,
      data: this.props.blockProps.data.toJS()
    }
  }

  componentDidMount() {}

  defaultStyle(){
    return { 
      color: "#fff", 
      backgroundColor: "#000", 
      padding: "5px", 
      display: "block"
     }
  }

  render() {
    return (
      <a href="#" style={this.defaultStyle()}>
        Click me
      </a>
    )
  }
}