import styled from "@emotion/styled";
import { math } from "polished";

export const AnchorStyle = styled.div`
  // MENU
  //position: absolute;
  //visibility: hidden;
  z-index: 10;
  -webkit-transition: none;
  transition: none;
  display: none;
  top: 0;
  left: 0;
  display: block;
  white-space: nowrap;

  height: ${(props) => {
    return props.theme.dante_menu_height;
  }};
  background: ${(props) => props.theme.dante_menu_background};
  color: ${(props) => props.theme.dante_menu_color};

  border: ${(props) => props.theme.dante_menu_border_width};
  border-radius: ${(props) => props.theme.dante_menu_border_radius};
  box-shadow: ${(props) => props.theme.dante_menu_box_shadow};

  // CARET
  // &:before -> Borde
  // &:after  -> Triangulo

  &.dante-menu {
    &:after {
      content: "";
      height: 0;
      width: 0;
      position: absolute;
      left: ${(props) => (props.arrowPosition ? props.arrowPosition : "50%")};
      pointer-events: none;
      border: ${(props) => props.theme.dante_menu_caret_size} solid transparent;
      margin-left: -${(props) => math(`${props.theme.dante_menu_caret_size} / 2`)};
    }
    &:after {
      border-top-color: ${(props) => props.theme.dante_menu_background};
      bottom: -${(props) => math(`${props.theme.dante_menu_caret_size} * 2 - 1`)};
    }
  }

  &.dante-sticky-menu {
    position: -webkit-sticky;
    position: sticky;
    width: 100%;
    border-radius: 0px;
    //overflow-x: scroll;
    &:after {
      display: none;
    }
  }

  &.is-active {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 0.2s 0s;
  }

  &.is-active {
    opacity: 1;
  }

  // Visible

  &.dante-menu--active {
    display: inline-block !important;
    visibility: visible !important;
    -webkit-animation: pop-upwards 180ms forwards linear;
    animation: pop-upwards 180ms forwards linear;
  }

  // Link mode

  &.dante-menu--linkmode {
    .dante-menu-buttons {
      visibility: hidden;
    }
    .dante-menu-linkinput {
      display: block;
    }
    .dante-menu-input {
      -webkit-animation: pop-upwards 180ms forwards linear;
      animation: pop-upwards 180ms forwards linear;
    }
  }

  &.popover--Linktooltip .popover-inner {
    padding: 10px 10px;
    font-size: 12px;
  }

  &.popover--tooltip .popover-inner {
    //background: #333333;
    border-radius: 4px;
    color: ${(props) => props.theme.dante_menu_color};
  }

  .popover-inner a {
    color: inherit;
    text-decoration: none;
  }

  .popover-arrow {
    position: absolute;
  }

  .popover-arrow:after {
    background-color: ${(props) => props.theme.dante_menu_background};
  }

  &.popover--top .popover-arrow,
  &.popover--bottom .popover-arrow {
    left: 50%;
    margin-left: -${(props) => math(`${props.theme.tooltip_caret_size} / 2`)};
  }

  &.popover--left .popover-arrow,
  &.popover--right .popover-arrow {
    top: 50%;
    margin-top: -${(props) => math(`${props.theme.tooltip_caret_size}/2`)};
  }

  &.popover--right .popover-arrow {
    left: 1px;
  }

  &.popover--bottom .popover-arrow {
    top: -13px;
  }

  &.popover--left .popover-arrow {
    right: 1px;
    // clip: rect(-4px 14px 18px 0);
  }

  .popover-arrow:after {
    content: "";
    display: block;
    width: ${(props) => props.theme.tooltip_caret_size};
    height: ${(props) => props.theme.tooltip_caret_size};
  }

  &.popover--top .popover-arrow:after {
    -webkit-transform: rotate(45deg) translate(-5px, -5px);
    -ms-transform: rotate(45deg) translate(-5px, -5px);
    transform: rotate(45deg) translate(-5px, -5px);
    box-shadow: 1px 1px 1px -1px ${(props) => props.theme.menu_tone};
  }

  &.popover--right .popover-arrow:after {
    -webkit-transform: rotate(45deg) translate(6px, -6px);
    -ms-transform: rotate(45deg) translate(6px, -6px);
    transform: rotate(45deg) translate(6px, -6px);
    box-shadow: -1px 1px 1px -1px ${(props) => props.theme.menu_tone};
  }

  &.popover--bottom .popover-arrow:after {
    -webkit-transform: rotate(45deg) translate(6px, 6px);
    -ms-transform: rotate(45deg) translate(6px, 6px);
    transform: rotate(45deg) translate(6px, 6px);
    box-shadow: -1px -1px 1px -1px ${(props) => props.theme.menu_tone};
  }

  &.popover--left .popover-arrow:after {
    -webkit-transform: rotate(45deg) translate(-6px, 6px);
    -ms-transform: rotate(45deg) translate(-6px, 6px);
    transform: rotate(45deg) translate(-6px, 6px);
    box-shadow: 1px -1px 1px -1px ${(props) => props.theme.menu_tone};
  }

  // BUTONS

  .dante-menu-buttons {
    list-style: none;
    margin: 0;
    padding: 0;
    line-height: 0;
  }
  .dante-menu-divider {
    width: 1px;
    height: ${(props) => math(`${props.theme.dante_menu_height} - 18`)};
    margin: 9px 2px;
    background: rgba(100, 100, 100, 0.2);
    display: inline-block;
    overflow: hidden;
    cursor: default;
    line-height: ${(props) => props.theme.dante_menu_height};
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .dante-menu-button,
  button {
    background-color: transparent;
    min-width: 20px;
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
    text-align: center;
    color: ${(props) => props.theme.dante_menu_icon_color};
    cursor: pointer;
    font-size: ${(props) => props.theme.dante_menu_icon_size};
    line-height: ${(props) => props.theme.dante_menu_height};
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
      // nada
    }
    &.active {
      color: ${(props) => props.theme.dante_menu_icon_accent};
    }

    &:first-of-type {
      border-top-left-radius: ${(props) =>
        props.theme.dante_menu_border_radius};
      border-bottom-left-radius: ${(props) =>
        props.theme.dante_menu_border_radius};
      padding-left: 18px;
    }
    &:last-child {
      border-top-right-radius: ${(props) =>
        props.theme.dante_menu_border_radius};
      border-bottom-right-radius: ${(props) =>
        props.theme.dante_menu_border_radius};
      padding-right: 18px;
    }
  }

  .dante-menu-button--disabled {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    opacity: 0.3;
  }

  // LINK

  .dante-menu-linkinput {
    & {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .dante-menu-button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .dante-menu-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 13px 40px 13px 10px;
    color: ${(props) => props.theme.dante_menu_color};
    background: transparent;
    border: none;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: ${(props) => props.theme.dante_menu_border_radius};
    appearance: none;
    text-align: left;
    font-family: ${(props) => props.theme.dante_font_family_sans};
    letter-spacing: 0.01rem;
    font-weight: 400;
    font-style: normal;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings: "liga" on;
  }

  &:after {
    border-top-color: ${(props) => props.theme.dante_control_color};
  }
  .dante-menu-input {
    padding: 11px 40px 11px 10px;
  }
  .dante-menu-button {
    padding-left: 0;
    padding-right: 0;
    vertical-align: top;
    line-height: 1;
    margin: 0px;
  }
  .dante-menu-button:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding-left: 0;
  }
  .dante-menu-button:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    padding-right: 0;
  }
  .dante-menu-button.visible-overflow {
    vertical-align: top;
  }
  .dante-menu-button button {
    height: 42px;
  }
  .dante-menu-button .dante-icon {
    padding: 10px;
    min-width: 20px;
    display: inline-block;
  }
  .dante-menu-button .tooltip-icon {
    padding: 10px;
    display: inline-block;
  }

  .dante-menu-button .dante-icon:hover .icon-fillcolor {
    fill: ${(props) => props.theme.dante_menu_icon_color};
  }
  .dante-menu-button.active .dante-icon .icon-fillcolor {
    fill: ${(props) => props.theme.dante_menu_icon_accent};
  }

  .dante-menu-button .dante-icon svg {
    display: inherit !important;
    vertical-align: inherit !important;
  }
  .dropdown {
    float: left;
  }
  .dropdown .btn {
    color: #bec2cc;
    padding: 0 10px;
    width: auto;
    font-size: 12px;
  }
  .dropdown .btn .caret {
    border-top-color: #62656a;
    margin-left: 4px;
  }
  .dropdown .btn:hover {
    color: ${(props) => props.theme.dante_menu_color};
  }
  .dropdown .btn:hover .caret {
    border-top-color: ${(props) => props.theme.dante_menu_color};
  }
  .dropdown .dropdown-menu {
    background: #2a2b32;
    padding: 0;
    max-height: 300px;
    overflow-y: auto;
    width: auto;
    min-width: 60px;
  }
  .dropdown .dropdown-menu li {
    border-bottom: 1px solid #383943;
  }
  .dropdown .dropdown-menu li:last-child {
    border-bottom: 0;
  }
  .dropdown .dropdown-menu li a {
    color: #bec2cc;
    font-size: 12px;
    padding: 0 10px;
    line-height: 30px;
  }
  .dropdown.open > .dropdown-toggle.btn-default {
    color: #bec2cc;
  }
  .dropdown .dropdown-menu li a:hover,
  .dropdown.open > .dropdown-toggle.btn-default:hover {
    background: 0;
    color: ${(props) => props.theme.dante_menu_color};
  }

  .divider {
    position: relative;
    float: left;
    width: 1px;
    height: 20px;
    margin: 10px 5px;
    background: ${(props) => props.theme.dante_menu_divider_color};
  }
`;
