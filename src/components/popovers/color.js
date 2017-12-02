import React from 'react'
import ReactDOM from 'react-dom'
import { SketchPicker } from 'react-color';

export default class DanteTooltipColor extends React.Component {

  constructor(...args) {
    super(...args)
    this.toggle = this.toggle.bind(this)
    this.state = {
      open: false
    }
  }

  toggle(ev) {
    let selection = this.props.editorState.getSelection()
    // prevent unselection of selection
    ev.preventDefault()
    this.setState({open: !this.state.open})
  }

  renderColor(){
    if(this.state.open){
      return (
        <div style={{position: 'absolute'}}>
          <SketchPicker />
        </div>
      )   
    }
  }

  render() {
    return (
      <li className="dante-menu-button" 
        onMouseDown={ this.toggle }>
        Color
        { this.renderColor()}
      </li>
    )
  }
}