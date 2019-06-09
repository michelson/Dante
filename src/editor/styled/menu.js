import styled from '@emotion/styled'

const tooltip_caret_size = 12;
const menu_tone = "#444"

const dante_font_family_sans = `'jaf-bernino-sans', 'Open Sans', "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans_serif;`
const tooltip_size = 32;
const dante_inversed_color = '#FFFFFF';
const dante_accent_color = '#5BD974';
const dante_control_color = '#333333';

// Menu
const dante_menu_height = 42;
const dante_menu_background = dante_control_color;
const dante_menu_color = dante_inversed_color;
const dante_menu_border_radius = '5px';
const dante_menu_box_shadow = '1px 2px 3px 2px #222';
const dante_menu_icon_size = '16px';
const dante_menu_icon_color = dante_inversed_color;
const dante_menu_icon_accent = dante_accent_color;
const dante_menu_border_width = '0px';
const dante_menu_caret_size = 8;



export const AnchorStyle = styled.div`

  // MENU
  position: absolute;
  visibility: hidden;
  z-index: 10;
  -webkit-transition: none;
  transition: none;
  display: none;
  top: 0;
  left: 0;
  display:block;
  white-space: nowrap;

  height: ${dante_menu_height}px;
  background: ${dante_menu_background};
  color: ${dante_menu_color};

  border: ${dante_menu_border_width};
  border-radius: ${dante_menu_border_radius};
  box-shadow: ${dante_menu_box_shadow};

  border-radius: 4px;
  background: #2A2B32;
  box-shadow: none;

  // CARET
  // &:before -> Borde
  // &:after  -> Triangulo

  &.dante-menu{
    &:after {
      content: "";
      height: 0;
      width: 0;
      position: absolute;
      left: 50%;
      pointer-events: none;
      border: ${dante_menu_caret_size}px solid transparent;
      margin-left: -${dante_menu_caret_size / 2}px;
    }
    &:after {
      border-top-color: ${dante_menu_background};
      bottom: -${(dante_menu_caret_size * 2) - 1}px;
    }
  }



  &.dante-sticky-menu {
    position: -webkit-sticky;
    position: sticky;
    width: 100%;
    border-radius: 0px;
    //overflow-x: scroll;
    &:after{
      display: none;
    }
  }

  &.is-active {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s,opacity .2s 0s;
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
      background: #333333;
      border-radius: 4px;
      color: #fff;
  }

  .popover-inner a {
    color: inherit;
    text-decoration: none;
  }

  .popover-arrow {
    position: absolute;
  }

  .popover-arrow:after {
    background-color: ${dante_menu_background};
  }

  &.popover--top .popover-arrow,
  &.popover--bottom .popover-arrow {
    left: 50%;
    margin-left: -${tooltip_caret_size / 2}px;
  }

  &.popover--left .popover-arrow,
  &.popover--right .popover-arrow {
    top: 50%;
    margin-top: -${tooltip_caret_size/2}px;
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
    content: '';
    display: block;
    width: ${tooltip_caret_size}px;
    height: ${tooltip_caret_size}px;
  }

  &.popover--top .popover-arrow:after {
    -webkit-transform: rotate(45deg) translate(-5px,-5px);
    -ms-transform: rotate(45deg) translate(-5px,-5px);
    transform: rotate(45deg) translate(-5px,-5px);
    box-shadow: 1px 1px 1px -1px ${menu_tone};
  }

  &.popover--right .popover-arrow:after {
    -webkit-transform: rotate(45deg) translate(6px,-6px);
    -ms-transform: rotate(45deg) translate(6px,-6px);
    transform: rotate(45deg) translate(6px,-6px);
    box-shadow: -1px 1px 1px -1px ${menu_tone};
  }

  &.popover--bottom .popover-arrow:after {
    -webkit-transform: rotate(45deg) translate(6px,6px);
    -ms-transform: rotate(45deg) translate(6px,6px);
    transform: rotate(45deg) translate(6px,6px);
    box-shadow: -1px -1px 1px -1px ${menu_tone};
  }

  &.popover--left .popover-arrow:after {
    -webkit-transform: rotate(45deg) translate(-6px,6px);
    -ms-transform: rotate(45deg) translate(-6px,6px);
    transform: rotate(45deg) translate(-6px,6px);
    box-shadow: 1px -1px 1px -1px ${menu_tone};
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
  height: ${dante_menu_height - 18}px;
  margin: 9px 2px;
  background: rgba(100, 100, 100,.2);
  display: inline-block;
  overflow: hidden;
  cursor: default;
  line-height: ${dante_menu_height};
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.dante-menu-button {

  min-width: 20px;
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
  text-align: center;
  color: ${dante_menu_icon_color};
  cursor: pointer;
  font-size: ${dante_menu_icon_size};
  line-height: ${dante_menu_height}px;
  -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;

  &:hover{
    // nada
  }
  &.active{
    color: ${dante_menu_icon_accent};
  }


  &:first-of-type {
    border-top-left-radius: ${dante_menu_border_radius};
    border-bottom-left-radius: ${dante_menu_border_radius};
    padding-left: 18px;
  }
  &:last-child {
    border-top-right-radius: ${dante_menu_border_radius};
    border-bottom-right-radius: ${dante_menu_border_radius};
    padding-right: 18px;
  }

}

.dante-menu-button--disabled {
  -webkit-user-select: none !important;
     -moz-user-select: none !important;
      -ms-user-select: none !important;
          user-select: none !important;
          opacity: .3;
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
  //line-height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0);
  width: 100%;
  padding: 13px 40px 13px 10px;
  color: ${dante_menu_color};
  border: none;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
  border-radius: ${dante_menu_border_radius};
  appearance: none;
  text-align: left;
  font-family: ${dante_font_family_sans};
  letter-spacing: 0.01rem;
  font-weight: 400;
  font-style: normal;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: "liga" on;
}

&:after {
  border-top-color: #2A2B32;
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
  fill: #FFFFFF;
}
.dante-menu-button.active .dante-icon .icon-fillcolor {
  fill: #6AFFB8;
}

.dante-menu-button .dante-icon svg {
  vertical-align: middle;
}
.dropdown {
  float: left
}
.dropdown .btn {
  color: #BEC2CC;
  padding: 0 10px;
  width: auto;
  font-size: 12px
}
.dropdown .btn .caret {
  border-top-color: #62656A;
  margin-left: 4px;
}
.dropdown .btn:hover {
  color: #fff
}
.dropdown .btn:hover .caret {
  border-top-color: #fff
}
.dropdown .dropdown-menu {
  background: #2A2B32;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
  width: auto;
  min-width: 60px
}
.dropdown .dropdown-menu li {
  border-bottom: 1px solid #383943
}
.dropdown .dropdown-menu li:last-child {
  border-bottom: 0
}
.dropdown .dropdown-menu li a {
  color: #BEC2CC;
  font-size: 12px;
  padding: 0 10px;
  line-height: 30px
}
.dropdown.open > .dropdown-toggle.btn-default {
  color: #BEC2CC;
}
.dropdown .dropdown-menu li a:hover,
.dropdown.open > .dropdown-toggle.btn-default:hover {
  background: 0;
  color: #fff
}

.divider {
  position: relative;
  float: left;
  width: 1px;
  height: 20px;
  margin: 10px 5px;
  background: #3D3E49
}

`