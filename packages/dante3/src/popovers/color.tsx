import React, { useState, useEffect, MouseEventHandler } from "react";
import { HexColorPicker } from "react-colorful";
import { fontColor } from "../icons.js";
import useDebounce from "../hooks/useDebounce";

export interface DanteTooltipColorProps {
  value?: string
  defaultValue: string
  handleClick: (value?: string) => void
}

const DanteTooltipColor: React.FC<DanteTooltipColorProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.value);

  const debouncedValue = useDebounce(value, 200);

  const toggle: MouseEventHandler<HTMLSpanElement> = (ev) => {
    // let selection = this.props.editorState.getSelection()
    // prevent unselection of selection
    ev.preventDefault();
    setOpen(!open);
  }

  useEffect(
    () => {
      if (debouncedValue) {
        props.handleClick(value);
      }
    },
    [debouncedValue] // Only call effect if debounced search term changes
  );

  /*
  function currentValue() {
    let selection = this.props.editorState.getSelection()
    if (!selection.isCollapsed()) {
      return this.props.styles[this.props.style_type].current(this.props.editorState)
    } else {
      return
    }
  }
  */

  function renderColor() {
    const v = /*currentValue() ||*/ props.value || props.defaultValue;

    if (open) {
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
            onChange={(color: string) => {
              setValue(color);
              //handleChange(e, color);
              //this.handleClick(e,  color )
            }}
          />
        </div>
      );
    }
  }

  return (
    <li className="dante-menu-button">
      <span className={"dante-icon"} onMouseDown={toggle}>
        {fontColor()}
      </span>
      {renderColor()}
    </li>
  );
}

export default DanteTooltipColor