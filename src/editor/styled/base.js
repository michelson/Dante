// taken from dante.slate

import styled from 'styled-components'
import { math, lighten, opacify, desaturate } from 'polished'

const EditorContainer = styled.div`
  
  @import url('//fonts.googleapis.com/css?family=Merriweather:400,700,400italic,700italic|Open+Sans:400,300,800');

  font-family: ${props => props.theme.dante_font_family_serif};
  letter-spacing: 0.01rem;
  font-weight: 400;
  font-style: normal;
  font-size: ${props => props.theme.dante_editor_font_size};
  line-height: ${props => props.theme.dante_editor_line_height};
  color: ${props => props.theme.dante_text_color};

  @media (max-width: 500px) {

    .postContent {
      font-size: ${props => math(`${props.theme.dante_editor_font_size} - 6`)};
      line-height: ${props => props.theme.dante_editor_line_height};
    }

  }

  .public-DraftEditorPlaceholder-root {
    color: ${props => opacify(0.8, props.theme.dante_text_color)};
    position: absolute;
    z-index: 0;
    font-size: ${props=> math(`${props.theme.dante_editor_font_size}* 0.9`)}
    background-color: transparent;
  }

  .graf--h2,
  .graf--h3,
  .graf--h4,
  .graf--h5,
  .graf--h6,
  .graf--h7,
  .postList,
  .graf--hr,
  .graf--figure,
  .graf--blockquote,
  .graf--pullquote,
  .graf--p,
  .graf--pre {
    margin: 0;
    //position:relative;
  }

  .graf--code {
    position:relative;
    overflow: visible;

    background: ${props => props.theme.dante_code_background};
    font-family: ${props => props.theme.dante_font_family_mono};
    font-size: 16px;
    margin-bottom: 20px;
    padding: 20px;
    white-space: pre-wrap;
    color: ${props => props.theme.dante_code_color};

    .dante-code-syntax{
      color: ${props => props.theme.dante_code_background};
      position: absolute;
      top: 4px;
      right: 4px;
      width: 165px;
    }
  }

  .graf--pre {
      background: #000 !important;
      font-family: ${props => props.theme.dante_font_family_mono};
      font-size: 16px;
      margin-bottom: 20px;
      padding: 20px;
      white-space: pre-wrap;
      color: #fff !important;
  }

  .postList {
    margin-bottom: 30px;
  }

  .graf--p,
  .graf--blockquote,
  .graf--pullquote {
    margin-bottom: 30px;
  }

  .graf--code {
    line-height: 1em;
  }

  .graf--p.dante--spinner{
    position:relative;
  }

  .graf--hr {
    hr{
      border: 1px solid #ccc;
      margin: 26px;
    }
  }

  .graf--h2 {
    font-family: ${props => props.theme.dante_font_family_sans};
    font-size: 3.6em;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: .4em;
    margin-left: -3px;
    margin-top: 40px;
    padding-top: 0;
  }
  .graf--h3 {
    font-family: ${props => props.theme.dante_font_family_sans};
    letter-spacing: -0.02em;
    font-weight: 700;
    font-style: normal;
    font-size: 2.1em;
    margin-left: -1.8px;
    line-height: 1.2;
    margin-top: 40px;
    margin-bottom: .7em;
  }
  .public-DraftStyleDefault-pre{
    overflow: inherit;
  }
  .graf--h4 {
    font-family: ${props => props.theme.dante_font_family_sans};
    letter-spacing: -0.02em;
    font-weight: 300;
    font-style: normal;
    font-size: 1.5em;
    margin-left: -1.5px;
    line-height: 1.2;
    color: ${props => lighten(0.3, props.theme.dante_text_color)};
    margin-top: 40px;
    margin-bottom: .6em;
  }

  .section--first .graf--h2.graf--first,
  .section--first .graf--h3.graf--first,
  .section--first .graf--h4.graf--first {
    margin-top: 0;
    padding-top: 0;
  }

  .graf--h2 + .graf--h2 {
    margin-top: -8px;
  }

  .graf--h2 + .graf--h3,
  .graf--h2 + .graf--h4 {
    margin-top: -6px;
  }

  .graf--h3 + .graf--h4,
  .graf--h4 + .graf--h2 {
    margin-top: 2px;
  }

  .graf--h3 + .graf--h4,
  .graf--h4 + .graf--h3 {
    margin-top: -2px;
  }

  .graf--h2 + .postList,
  .graf--h3 + .postList,
  .graf--h4 + .postList {
    margin-top: 10px;
  }

  .graf--h2 + .graf--p.graf--empty,
  .graf--h3 + .graf--p.graf--empty,
  .graf--h4 + .graf--p.graf--empty {
    margin-bottom: -7px;
    margin-top: -7px;
  }

  .graf--h2 + .graf--p.graf--empty + .graf--h1,
  .graf--h3 + .graf--p.graf--empty + .graf--h1,
  .graf--h4 + .graf--p.graf--empty + .graf--h1 {
    margin-top: -5px;
  }

  .graf--h2 + .graf--p.graf--empty + .graf--h3,
  .graf--h3 + .graf--p.graf--empty + .graf--h3,
  .graf--h4 + .graf--p.graf--empty + .graf--h3,
  .graf--h2 + .graf--p.graf--empty + .graf--h4,
  .graf--h3 + .graf--p.graf--empty + .graf--h4,
  .graf--h4 + .graf--p.graf--empty + .graf--h4 {
    margin-top: -8px;
  }


  .graf--blockquote, blockquote {
    font-family: ${props => props.theme.dante_font_family_serif};
    border-left: 3px solid rgba(0, 0, 0, .8);

    font-style: italic;
    font-weight: 400;
    letter-spacing: 0.16px;
    letter-spacing: 0.02rem;
    margin-left: -17px;
    padding-left: 15px;
    margin-bottom: 25px;
    font-size: 1.2em;
    line-height: 1.9em;
    margin-top: 20px;

  }
  .graf--blockquote + .graf--blockquote {
    margin-top: -30px;
    padding-top: 30px;
  }

  .graf--pullquote {
    line-height: 1.4;
    text-align: center;
    font-size: 3.2em;
    margin: 48px -160px;
    border: none;
    padding: 0;
    font-family: ${props => props.theme.dante_font_family_serif};
    letter-spacing: 0.01rem;
    font-weight: 400;
    font-style: italic;
    -webkit-transition: margin 100ms;
    transition: margin 100ms;
  }

  .graf--pre + .graf--pre {
    margin-top: -20px;
  }

  .graf--figure {
  
    box-sizing: border-box;
    clear: both;
    margin-bottom: 30px;
    outline: medium none;
    position: relative;

    &.is-mediaFocused .graf-image,
    &.is-mediaFocused iframe {
      box-shadow: 0 0 0 3px #57ad68;
    }
  }

  .graf--mixtapeEmbed {
    a {
      text-decoration: none;
    }
    &.is-mediaFocused {
      box-shadow: 0 0 0 1px #57ad68;
    }

    .graf--media-embed-close{
      position: absolute;
      top: 1px;
      display: inline-block;
      font-size: 2em;
      width: 20px;
      right: 10px;
      text-shadow: 0px 0px 0px white;
    }

    border-color: ${props => props.theme.dante_control_color};
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    //color: rgba(0, 0, 0, 0.6);
    font-family: ${props => props.theme.dante_font_family_sans};
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    letter-spacing: -0.02em;
    margin-bottom: 40px;
    margin-top: 40px;
    max-height: 310px;
    //max-width: 700px;
    overflow: hidden;
    padding: 30px;
    position: relative;

    .is-postEditMode iframe {
        border: 3px solid rgba(255, 255, 255, 0);
    }

    .mixtapeImage {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        float: right;
        height: 310px;
        margin: -30px -30px 0 25px;
        width: 310px;
    }

    .mixtapeImage--empty {
        height: 0;
        width: 0;
    }

    .markup--mixtapeEmbed-strong {
        //color: #000;
        display: block;
        font-family: $dante-font-family-sans;
        font-size: 30px;
        font-style: normal;
        font-weight: 300;
        letter-spacing: -0.02em;
        line-height: 1.2;
        margin-bottom: 0px;
    }

    .markup--mixtapeEmbed-em {
        display: block;
        font-size: 16px;
        font-style: normal;
        margin-bottom: 10px;
        max-height: 120px;
        overflow: hidden;
    }

  }



  .graf--h4 + .graf--figure,
  .graf--h3 + .graf--figure,
  .graf--h2 + .graf--figure {
    margin-top: 15px;
  }

  .graf--first {
    margin-top: 0;
    padding-top: 0;
  }

  /*.graf--empty {
    margin-bottom: -7px;
    margin-top: -7px;
  }*/

  p[data-align="center"],
  .graf--h2[data-align="center"],
  .graf--h3[data-align="center"],
  .graf--h4[data-align="center"],
  .graf--blockquote[data-align="center"] {
    text-align: center;
  }

  .markup--anchor,
  .graf--sectionCaption {
      cursor: text;
  }
  .markup--anchor {
    text-decoration: underline;
    color: inherit;
  }

  @media (max-width: 500px) {

    .graf--h2 {
      font-size: 2.6em;
    }
    .graf--h3 {
      font-size: 1.6em;
    }
    .graf--h4 {
      font-size: 1.4em;
    }

  }

  .graf--divider span{
    text-align: center;
    width: 100%;
    display: block;
  }

  .graf--divider span:before {
    line-height: 1;
    user-select: none;
    font-weight: 400;
    font-size: 25px;
    letter-spacing: 18px;
    content: "...";
    display: inline-block;
    margin-left: .6em;
    position: relative;
    color: #757575;
    top: -3px;
  }



  .graf--layoutOutsetLeft {
      margin-left: -160px;
  }

  .graf--layoutFillWidth {
      margin-left: -200px;
      margin-right: -200px;
  }

  .graf--layoutOutsetLeft {
      width: 75%;
  }
  .graf--layoutInsetLeft, .graf--layoutOutsetLeft {
      float: left;
      margin-right: 30px;
      padding-top: 10px;
      padding-bottom: 10px;
  }

  .imageCaption {

    top: 0;
    text-align: center;
    margin-top: 0;
    font-family: ${props => props.theme.dante_font_family_sans};
    letter-spacing: 0;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.4;
    color: ${props => lighten(0.2, props.theme.dante_text_color)};
    outline: 0;
    z-index: 300;
    margin-top: 10px;
    position:relative;

    .danteDefaultPlaceholder{
      margin-bottom: -18px !important;
      display: block;
    }
  }


  // FIGURE WRAPPER

    .aspectRatioPlaceholder {
      margin: 0 auto;
      position: relative;
      width: 100%;
    }

    .graf-image:before,
    .iframeContainer:before {
      .is-postEditMode & {
        bottom: 0;
        content: "";
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 500;
      }
    }

    .aspectRatioPlaceholder.is-locked .graf-image, 
    .aspectRatioPlaceholder.is-locked .graf-imageAnchor {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }

    .graf-image,
    .graf-imageAnchor,
    .iframeContainer > iframe,
    .iframeContainer {
      box-sizing: border-box;
      display: block;
      margin: auto;
      max-width: 100%;
    }

    .aspectRatioPlaceholder {
      .image-upoader-loader{
        position: absolute;
        bottom: 0px;
        left: 0%;
        background-color: #fff;
        width: 100%;
        /* height: 3px; */
        text-align: center;
        top: 0px;
        vertical-align: text-bottom;
        opacity: 0.7;
        p{
          line-height: 5px;
          /* font-weight: 700; */
          /* text-transform: uppercase; */
          font-size: 14px;
          margin-top: 49%;
        }
      }
    }

    div[contenteditable="false"] {
      .danteDefaultPlaceholder{
        display:none;
      }
    }

    div[contenteditable="false"] {
      a.markup--anchor {
        cursor: pointer;
      }
    }

    figcaption .public-DraftStyleDefault-block {
        text-align: center;
    }

    @media (max-width: 1200px) {
      .imageCaption,
      .postField--outsetCenterImage > .imageCaption {
        position: relative;
        width: 100%;
        text-align: center;
        left: 0;
        margin-top: 10px;
      }
    }

    figure.graf--layoutOutsetLeft {
      .imageCaption,
      .postField--outsetCenterImage > .imageCaption {
        position: relative;
        width: 100%;
        text-align: center;
        left: 0;
        margin-top: 10px;
      }
    }

    figure.is-defaultValue .imageCaption,
    .graf--sectionCaption.is-defaultValue {
      display: none;
    }

    .graf--figure.is-mediaFocused .imageCaption,
    .graf--figure.is-defaultValue.is-selected .imageCaption,
    section.is-mediaFocused .graf--sectionCaption,
    .graf--sectionCaption.is-defaultValue.is-selected {
      display: block;
    }

`


export const InlinetooltipWrapper = styled.div`
  // BASE
  position: absolute;
  z-index: 10;
  width: ${props => props.theme.tooltip_size};
  height: ${props => props.theme.tooltip_size};
  -webkit-transition: opacity 100ms, width 0 linear 250ms;
  transition: opacity 100ms, width 0 linear 250ms;
  padding: 0;
  font-size: 0;

  opacity: 0;
  pointer-events: none;

  &.is-active {
    opacity: 1;
    pointer-events: auto;
  }
  &.is-scaled {
    -webkit-transition-delay: 0;
    transition-delay: 0;
    width: auto;

    .control {
            -webkit-transition: -webkit-${props => props.theme.tooltip_backward_transition}, ${props => props.theme.tooltip_default_transition};
              transition: ${props => props.theme.tooltip_backward_transition}, ${props => props.theme.tooltip_default_transition};
       -webkit-transform: rotate(45deg) !important;
           -ms-transform: rotate(45deg) !important;
               transform: rotate(45deg) !important;
            border-color: ${props => props.theme.tooltip_color};
                   color: ${props => props.theme.tooltip_color};
    }

    .scale {
       -webkit-transform: scale(1) !important;
           -ms-transform: scale(1) !important;
               transform: scale(1) !important;
      -webkit-transition: -webkit-${props => props.theme.tooltip_backward_transition}, ${props => props.theme.tooltip_default_transition} !important;
              transition: ${props => props.theme.tooltip_backward_transition}, ${props => props.theme.tooltip_default_transition} !important;
    }

  }
}

// MENU
.inlineTooltip-menu {
  display: inline-block;
  margin-left: ${props => math(`${props.theme.tooltip_size} + ${props.theme.tooltip_menu_spacing}`)};
  svg path{
    fill: ${props => props.theme.tooltip_color};
  }
}

// BUTTON
.inlineTooltip-button {

  // BASE

  float: left;
  margin-right: ${props => props.theme.tooltip_button_spacing};
  display: inline-block;
  position: relative;
  outline: 0;
  padding: 0;
  vertical-align: bottom;
  box-sizing: border-box;
  border-radius: ${props => props.theme.tooltip_border_radius};
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  font-family: ${props => props.theme.dante_font_family_sans};
  letter-spacing: -0.02em;
  font-weight: 400;
  font-style: normal;
  white-space: nowrap;
  text-rendering: auto;
  text-align: center;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: "liga" on;
  width: ${props => props.theme.tooltip_size};
  height: ${props => props.theme.tooltip_size};
  line-height: ${props => props.theme.tooltip_line_height};
  -webkit-transition: 100ms border-color, 100ms color;
  transition: 100ms border-color, 100ms color;
  background: ${props => props.theme.tooltip_background_color};
  border: ${props => props.theme.tooltip_border_width} solid;
  border-color: ${props => opacify(0.2, props.theme.tooltip_border_color)}
  color: ${props => props.theme.tooltip_color};

  &:hover {
    border-color: ${props => opacify(0.4, props.theme.tooltip_border_color)}
    color: rgba(${props => props.theme.tooltip_color}, ${props => props.theme.tooltip_color_opacity_hover});
  }

  svg path {
    fill: ${props => props.theme.tooltip_color};
  }

  // SCALE
  &.scale {
 
     -webkit-transform: scale(0);
         -ms-transform: scale(0);
             transform: scale(0);
    -webkit-transition: -webkit-${props => props.theme.tooltip_forward_transition}, ${props => props.theme.tooltip_default_transition};
            transition: ${props => props.theme.tooltip_forward_transition}, ${props => props.theme.tooltip_default_transition};


    svg path {
      fill: ${props => props.theme.tooltip_color};
    }
    //@while ${props => props.theme.tooltip_items} > 0 {
    //  &:nth-of-type(${props => props.theme.tooltip_items + 1}) {
    //    -webkit-transition-delay: ${props => props.theme.tooltip_item_delay * props.theme.tooltip_items} + "ms"};
    //            transition-delay: ${props => props.theme.tooltip_item_delay * props.theme.tooltip_items} + "ms"};
    //  }
    //  ${props => props.theme.tooltip_items}: ${props => props.theme.tooltip_items - 1 };
    //}
  }

  // CONTROL
  &.control {
    
    display: block;
    position: absolute;
    margin-right: ${props => props.theme.tooltip_menu_spacing};
    padding-top: 4px;

    -webkit-transition: -webkit-${props => props.theme.tooltip_forward_transition}, ${props => props.theme.tooltip_default_transition};
            transition: ${props => props.theme.tooltip_forward_transition}, ${props => props.theme.tooltip_default_transition};
     -webkit-transform: rotate(0);
         -ms-transform: rotate(0);
             transform: rotate(0);
  }

`


export default EditorContainer