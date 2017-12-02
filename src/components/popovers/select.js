
import React from 'react'
import ReactDOM from 'react-dom'
//import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
//import 'react-select/dist/react-select.css';

export default class DanteTooltipList extends React.Component {
  constructor(...args) {
    super(...args)
    this.promptForLink = this.promptForLink.bind(this)
  }

  logChange(val) {
    //console.log("Selected: " + JSON.stringify(val));
  }

  promptForLink(ev) {
    let selection = this.props.editorState.getSelection()
    if (!selection.isCollapsed()) {
      //ev.preventDefault()
      //return this.props.enableLinkMode(ev)
    }
  }

  render() {
    return (
      <li className="dante-menu-button visible-overflow" 
        onMouseDown={ this.promptForLink }>
        <DropDown items={this.props.items}/>
        {
          //  <Select name="form-field-name" value="one" options={this.state.options} onChange={this.logChange}/>
        }

      </li>
    )
  }
}


class DropDown extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.toggle      = this.toggle.bind(this)
  }

  componentDidMount() {
    
  }

  toggle(e){
    e.preventDefault()
    this.setState({open: !this.state.open})
  }

  handleClick(e){
    e.preventDefault()
    debugger
    this.setState({open: this.state.open})
  }

  render(){
    //console.log(this.state.open)
    return (
      <div className={`dropdown ${this.state.open ? 'open' : ''}`} >
        <button className="btn btn-default dropdown-toggle" 
                onMouseDown={this.toggle}
                type="button" id="dropdownMenu1" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="true">
          12
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          {
            this.props.items.map( (o)=>{
              return (<DropDownItem item={o} 
                            handleClick={this.handleClick}/> )
            })
          }
        </ul>
      </div>
    )
  }
}

class DropDownItem extends React.Component {
  render(){
    return (
      <li>
        <a href="#" onMouseDown={this.props.handleClick}>
          {this.props.item}
        </a>
      </li>
    )
  }
}





