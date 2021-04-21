import React from 'react'
import { HexColorPicker } from "react-colorful";
import {fontColor} from "../icons.js"
import { debounce } from "lodash";

export default class DanteTooltipColor extends React.Component {

  constructor(...args) {
    super(...args)
    this.state = {
      open: false,
      value: this.props.value
    }

    this.handleChange = debounce((e, value) => {
      this.handleClick(e, value)
    }, 500);
  }

  componentWillUmount() {
    this.handleChange.cancel();
  }

  toggle =(ev)=> {
    // let selection = this.props.editorState.getSelection()
    // prevent unselection of selection
    ev.preventDefault()
    this.setState({open: true }) //!this.state.open})
  }

  handleClick =(e, item)=>{
    e && e.preventDefault()
    this.setState({value: item},
      ()=>{
        let o = { [this.props.style_type]: this.state.value }
        this.props.handleClick(e, o)
      }
    )
  }

  currentValue =()=>{
    let selection = this.props.editorState.getSelection()
    if (!selection.isCollapsed()) {
      return this.props.styles[this.props.style_type].current(this.props.editorState)
    } else {
      return
    }

  }

  renderColor =()=>{
    //console.log(`${this.currentValue()} vs ${this.props.value}`)
    const v = this.currentValue() || this.props.value
    //console.log(`this should be ${v}`)

    if(this.state.open){
      return (
        <div style={{position: 'absolute'}}>
          <HexColorPicker
            color={ v }
            onChange={(color, e)=>{
              this.handleChange(e, color)
              //this.handleClick(e,  color )
            }}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <li className="dante-menu-button"
        onMouseDown={ this.toggle }>
        <span className={ 'dante-icon'}>
          {fontColor()}
        </span>

        { this.renderColor()}
      </li>
    )
  }
}