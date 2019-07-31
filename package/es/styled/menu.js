var _templateObject = /*#__PURE__*/ _taggedTemplateLiteral(["\n\n  // MENU\n  position: absolute;\n  visibility: hidden;\n  z-index: 10;\n  -webkit-transition: none;\n  transition: none;\n  display: none;\n  top: 0;\n  left: 0;\n  display:block;\n  white-space: nowrap;\n\n  height: ", ";\n  background: ", ";\n  color: ", ";\n\n  border: ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n\n  // CARET\n  // &:before -> Borde\n  // &:after  -> Triangulo\n\n  &.dante-menu{\n    &:after {\n      content: \"\";\n      height: 0;\n      width: 0;\n      position: absolute;\n      left: 50%;\n      pointer-events: none;\n      border: ", " solid transparent;\n      margin-left: -", ";\n    }\n    &:after {\n      border-top-color: ", ";\n      bottom: -", ";\n    }\n  }\n\n\n\n  &.dante-sticky-menu {\n    position: -webkit-sticky;\n    position: sticky;\n    width: 100%;\n    border-radius: 0px;\n    //overflow-x: scroll;\n    &:after{\n      display: none;\n    }\n  }\n\n  &.is-active {\n    visibility: visible;\n    opacity: 1;\n    transition: visibility 0s linear 0s,opacity .2s 0s;\n  }\n\n  &.is-active {\n    opacity: 1;\n  }\n\n\n  // Visible\n\n  &.dante-menu--active {\n    display: inline-block !important;\n    visibility: visible !important;\n    -webkit-animation: pop-upwards 180ms forwards linear;\n    animation: pop-upwards 180ms forwards linear;\n  }\n\n\n  // Link mode\n\n  &.dante-menu--linkmode {\n    .dante-menu-buttons {\n      visibility: hidden;\n    }\n    .dante-menu-linkinput {\n      display: block;\n    }\n    .dante-menu-input {\n      -webkit-animation: pop-upwards 180ms forwards linear;\n              animation: pop-upwards 180ms forwards linear;\n    }\n  }\n\n  &.popover--Linktooltip .popover-inner {\n    padding: 10px 10px;\n    font-size: 12px;\n  }\n\n  &.popover--tooltip .popover-inner {\n      //background: #333333;\n      border-radius: 4px;\n      color: ", ";\n  }\n\n  .popover-inner a {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  .popover-arrow {\n    position: absolute;\n  }\n\n  .popover-arrow:after {\n    background-color: ", ";\n  }\n\n  &.popover--top .popover-arrow,\n  &.popover--bottom .popover-arrow {\n    left: 50%;\n    margin-left: -", ";\n  }\n\n  &.popover--left .popover-arrow,\n  &.popover--right .popover-arrow {\n    top: 50%;\n    margin-top: -", ";\n  }\n\n\n  &.popover--right .popover-arrow {\n    left: 1px;\n  }\n\n  &.popover--bottom .popover-arrow {\n    top: -13px;\n  }\n\n  &.popover--left .popover-arrow {\n    right: 1px;\n    // clip: rect(-4px 14px 18px 0);\n  }\n\n  .popover-arrow:after {\n    content: '';\n    display: block;\n    width: ", ";\n    height: ", ";\n  }\n\n  &.popover--top .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(-5px,-5px);\n    -ms-transform: rotate(45deg) translate(-5px,-5px);\n    transform: rotate(45deg) translate(-5px,-5px);\n    box-shadow: 1px 1px 1px -1px ", ";\n  }\n\n  &.popover--right .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(6px,-6px);\n    -ms-transform: rotate(45deg) translate(6px,-6px);\n    transform: rotate(45deg) translate(6px,-6px);\n    box-shadow: -1px 1px 1px -1px ", ";\n  }\n\n  &.popover--bottom .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(6px,6px);\n    -ms-transform: rotate(45deg) translate(6px,6px);\n    transform: rotate(45deg) translate(6px,6px);\n    box-shadow: -1px -1px 1px -1px ", ";\n  }\n\n  &.popover--left .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(-6px,6px);\n    -ms-transform: rotate(45deg) translate(-6px,6px);\n    transform: rotate(45deg) translate(-6px,6px);\n    box-shadow: 1px -1px 1px -1px ", ";\n  }\n\n\n// BUTONS\n\n.dante-menu-buttons {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  line-height: 0;\n}\n.dante-menu-divider {\n  width: 1px;\n  height: ", ";\n  margin: 9px 2px;\n  background: rgba(100, 100, 100,.2);\n  display: inline-block;\n  overflow: hidden;\n  cursor: default;\n  line-height: ", ";\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.dante-menu-button {\n\n  min-width: 20px;\n  display: inline-block;\n  padding-left: 10px;\n  padding-right: 10px;\n  overflow: hidden;\n  text-align: center;\n  color: ", ";\n  cursor: pointer;\n  font-size: ", ";\n  line-height: ", ";\n  -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n\n  &:hover{\n    // nada\n  }\n  &.active{\n    color: ", ";\n  }\n\n\n  &:first-of-type {\n    border-top-left-radius: ", ";\n    border-bottom-left-radius: ", ";\n    padding-left: 18px;\n  }\n  &:last-child {\n    border-top-right-radius: ", ";\n    border-bottom-right-radius: ", ";\n    padding-right: 18px;\n  }\n\n}\n\n.dante-menu-button--disabled {\n  -webkit-user-select: none !important;\n     -moz-user-select: none !important;\n      -ms-user-select: none !important;\n          user-select: none !important;\n          opacity: .3;\n}\n\n\n// LINK\n\n.dante-menu-linkinput {\n  & {\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n  .dante-menu-button {\n    position: absolute;\n    top: 0;\n    right: 0;\n  }\n}\n\n.dante-menu-input {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  padding: 13px 40px 13px 10px;\n  color: ", ";\n  border: none;\n  outline: none;\n  font-size: 14px;\n  box-sizing: border-box;\n  border-radius: ", ";\n  appearance: none;\n  text-align: left;\n  font-family: ", ";\n  letter-spacing: 0.01rem;\n  font-weight: 400;\n  font-style: normal;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -moz-font-feature-settings: \"liga\" on;\n}\n\n&:after {\n  border-top-color: ", ";\n}\n.dante-menu-input {\n  padding: 11px 40px 11px 10px;\n}\n.dante-menu-button {\n  padding-left: 0;\n  padding-right: 0;\n  vertical-align: top;\n  line-height: 1;\n  margin: 0px;\n}\n.dante-menu-button:first-of-type {\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  padding-left: 0;\n}\n.dante-menu-button:last-of-type {\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  padding-right: 0;\n}\n.dante-menu-button.visible-overflow {\n  vertical-align: top;\n}\n.dante-menu-button button {\n  height: 42px;\n}\n.dante-menu-button .dante-icon {\n  padding: 10px;\n  min-width: 20px;\n  display: inline-block;\n}\n.dante-menu-button .tooltip-icon {\n  padding: 10px;\n  display: inline-block;\n}\n.dante-menu-button .dante-icon:hover .icon-fillcolor {\n  fill: ", ";\n}\n.dante-menu-button.active .dante-icon .icon-fillcolor {\n  fill: ", ";\n}\n\n.dante-menu-button .dante-icon svg {\n  vertical-align: middle;\n}\n.dropdown {\n  float: left\n}\n.dropdown .btn {\n  color: #BEC2CC;\n  padding: 0 10px;\n  width: auto;\n  font-size: 12px\n}\n.dropdown .btn .caret {\n  border-top-color: #62656A;\n  margin-left: 4px;\n}\n.dropdown .btn:hover {\n  color: ", ";\n}\n.dropdown .btn:hover .caret {\n  border-top-color: ", ";\n}\n.dropdown .dropdown-menu {\n  background: #2A2B32;\n  padding: 0;\n  max-height: 300px;\n  overflow-y: auto;\n  width: auto;\n  min-width: 60px\n}\n.dropdown .dropdown-menu li {\n  border-bottom: 1px solid #383943\n}\n.dropdown .dropdown-menu li:last-child {\n  border-bottom: 0\n}\n.dropdown .dropdown-menu li a {\n  color: #BEC2CC;\n  font-size: 12px;\n  padding: 0 10px;\n  line-height: 30px\n}\n.dropdown.open > .dropdown-toggle.btn-default {\n  color: #BEC2CC;\n}\n.dropdown .dropdown-menu li a:hover,\n.dropdown.open > .dropdown-toggle.btn-default:hover {\n  background: 0;\n  color: ", ";\n}\n\n.divider {\n  position: relative;\n  float: left;\n  width: 1px;\n  height: 20px;\n  margin: 10px 5px;\n  background: ", "\n}\n\n"]);

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from '@emotion/styled';
import { math, darken } from 'polished';
export var AnchorStyle = styled.div(_templateObject, function (props) {
  return props.theme.dante_menu_height;
}, function (props) {
  return props.theme.dante_menu_background;
}, function (props) {
  return props.theme.dante_menu_color;
}, function (props) {
  return props.theme.dante_menu_border_width;
}, function (props) {
  return props.theme.dante_menu_border_radius;
}, function (props) {
  return props.theme.dante_menu_box_shadow;
}, function (props) {
  return props.theme.dante_menu_caret_size;
}, function (props) {
  return math("".concat(props.theme.dante_menu_caret_size, " / 2"));
}, function (props) {
  return props.theme.dante_menu_background;
}, function (props) {
  return math("".concat(props.theme.dante_menu_caret_size, " * 2 - 1"));
}, function (props) {
  return props.theme.dante_menu_color;
}, function (props) {
  return props.theme.dante_menu_background;
}, function (props) {
  return math("".concat(props.theme.tooltip_caret_size, " / 2"));
}, function (props) {
  return math("".concat(props.theme.tooltip_caret_size, "/2"));
}, function (props) {
  return props.theme.tooltip_caret_size;
}, function (props) {
  return props.theme.tooltip_caret_size;
}, function (props) {
  return props.theme.menu_tone;
}, function (props) {
  return props.theme.menu_tone;
}, function (props) {
  return props.theme.menu_tone;
}, function (props) {
  return props.theme.menu_tone;
}, function (props) {
  return math("".concat(props.theme.dante_menu_height, " - 18"));
}, function (props) {
  return props.theme.dante_menu_height;
}, function (props) {
  return props.theme.dante_menu_icon_color;
}, function (props) {
  return props.theme.dante_menu_icon_size;
}, function (props) {
  return props.theme.dante_menu_height;
}, function (props) {
  return props.theme.dante_menu_icon_accent;
}, function (props) {
  return props.theme.dante_menu_border_radius;
}, function (props) {
  return props.theme.dante_menu_border_radius;
}, function (props) {
  return props.theme.dante_menu_border_radius;
}, function (props) {
  return props.theme.dante_menu_border_radius;
}, function (props) {
  return props.theme.dante_menu_color;
}, function (props) {
  return props.theme.dante_menu_border_radius;
}, function (props) {
  return props.theme.dante_font_family_sans;
}, function (props) {
  return props.theme.dante_control_color;
}, function (props) {
  return props.theme.dante_menu_icon_color;
}, function (props) {
  return props.theme.dante_menu_icon_accent;
}, function (props) {
  return props.theme.dante_menu_color;
}, function (props) {
  return props.theme.dante_menu_color;
}, function (props) {
  return props.theme.dante_menu_color;
}, function (props) {
  return props.theme.dante_menu_divider_color;
});