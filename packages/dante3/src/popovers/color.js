import React from "react";
import { HexColorPicker } from "react-colorful";
import { fontColor } from "../icons.js";
import { debounce } from "lodash";

export default class DanteTooltipColor extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      open: false,
      value: this.props.value,
    };

    this.handleChange = debounce((e, value) => {
      this.handleClick(e, value);
    }, 200);
  }

  componentDidMount() {
    console.log("OPEN: ", this.state.open);
  }

  componentWillUmount() {
    this.handleChange.cancel();
  }

  toggle = (ev) => {
    // let selection = this.props.editorState.getSelection()
    // prevent unselection of selection
    ev.preventDefault();
    this.setState({ open: !this.state.open });
  };

  handleClick = (e, item) => {
    e && e.preventDefault();
    this.props.handleClick(e, item);
  };

  currentValue = () => {
    /*let selection = this.props.editorState.getSelection()
    if (!selection.isCollapsed()) {
      return this.props.styles[this.props.style_type].current(this.props.editorState)
    } else {
      return
    }*/
  };

  renderColor = () => {
    const v = this.currentValue() || this.props.value;

    if (this.state.open) {
      return (
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "236px",
          }}
        >
          <HexColorPicker
            color={v}
            onChange={(color, e) => {
              this.handleChange(e, color);
              //this.handleClick(e,  color )
            }}
          />
        </div>
      );
    }
  };

  render() {
    console.log(this.state.open);
    return (
      <li className="dante-menu-button">
        <span className={"dante-icon"} onMouseDown={this.toggle}>
          {fontColor()}
        </span>

        {this.renderColor()}
      </li>
    );
  }
}
