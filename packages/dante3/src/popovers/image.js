import React from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { AnchorStyle } from "../styled/menu";

import { imageFill, imageCenter, imageLeft, imageWide } from "../icons";

export default function ImageTooltip({ item, handleClick }) {
  const buttons = [
    { type: "left", icon: imageLeft },
    { type: "center", icon: imageCenter },
    { type: "fill", icon: imageFill },
    { type: "wide", icon: imageWide },
  ];

  let image_popover = React.useRef(null);

  React.useEffect(() => {
    //getPosition()
  }, []);

  function directionClick(e, item) {
    e.preventDefault();
    handleClick(item.type);
  }

  return (
    <AnchorStyle
      ref={image_popover}
      className={`dante-popover popover--Aligntooltip popover--top 
      popover--animated`}
    >
      <div className="popover-inner">
        <ul className="dante-menu-buttons">
          {buttons.map((item, i) => {
            return (
              <li
                key={`menu-${item.type}`}
                className={`dante-menu-button align-center`}
                onMouseDown={(e) => directionClick(e, item)}
              >
                <span className={`tooltip-icon dante-icon`}>{item.icon()}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="popover-arrow" data-popper-arrow></div>
    </AnchorStyle>
  );
}
