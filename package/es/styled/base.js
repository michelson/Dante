var _templateObject = /*#__PURE__*/ _taggedTemplateLiteral(["\n  \n  @import url('//fonts.googleapis.com/css?family=Merriweather:400,700,400italic,700italic|Open+Sans:400,300,800');\n\n  font-family: ", ";\n  letter-spacing: 0.01rem;\n  font-weight: 400;\n  font-style: normal;\n  font-size: ", ";\n  line-height: ", ";\n  color: ", ";\n\n  @media (max-width: 500px) {\n\n    .postContent {\n      font-size: ", ";\n      line-height: ", ";\n    }\n\n  }\n\n  .public-DraftEditorPlaceholder-root {\n    color: ", ";\n    position: absolute;\n    z-index: 0;\n    font-size: ", "\n    background-color: transparent;\n  }\n\n  .graf--h2,\n  .graf--h3,\n  .graf--h4,\n  .graf--h5,\n  .graf--h6,\n  .graf--h7,\n  .postList,\n  .graf--hr,\n  .graf--figure,\n  .graf--blockquote,\n  .graf--pullquote,\n  .graf--p,\n  .graf--pre {\n    margin: 0;\n    //position:relative;\n  }\n\n  .graf--code {\n    position:relative;\n    overflow: visible;\n\n    background: ", ";\n    font-family: ", ";\n    font-size: 16px;\n    margin-bottom: 20px;\n    padding: 20px;\n    white-space: pre-wrap;\n    color: ", ";\n\n    .dante-code-syntax{\n      color: ", ";\n      position: absolute;\n      top: 4px;\n      right: 4px;\n      width: 165px;\n    }\n  }\n\n  .graf--pre {\n      background: #000 !important;\n      font-family: ", ";\n      font-size: 16px;\n      margin-bottom: 20px;\n      padding: 20px;\n      white-space: pre-wrap;\n      color: #fff !important;\n  }\n\n  .postList {\n    margin-bottom: 30px;\n  }\n\n  .graf--p,\n  .graf--blockquote,\n  .graf--pullquote {\n    margin-bottom: 30px;\n  }\n\n  .graf--code {\n    line-height: 1em;\n  }\n\n  .graf--p.dante--spinner{\n    position:relative;\n  }\n\n  .graf--hr {\n    hr{\n      border: 1px solid #ccc;\n      margin: 26px;\n    }\n  }\n\n  .graf--h2 {\n    font-family: ", ";\n    font-size: 3.6em;\n    font-style: normal;\n    font-weight: 700;\n    letter-spacing: -0.04em;\n    line-height: 1;\n    margin-bottom: .4em;\n    margin-left: -3px;\n    margin-top: 40px;\n    padding-top: 0;\n  }\n  .graf--h3 {\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 700;\n    font-style: normal;\n    font-size: 2.1em;\n    margin-left: -1.8px;\n    line-height: 1.2;\n    margin-top: 40px;\n    margin-bottom: .7em;\n  }\n  .public-DraftStyleDefault-pre{\n    overflow: inherit;\n  }\n  .graf--h4 {\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 300;\n    font-style: normal;\n    font-size: 1.5em;\n    margin-left: -1.5px;\n    line-height: 1.2;\n    color: ", ";\n    margin-top: 40px;\n    margin-bottom: .6em;\n  }\n\n  .section--first .graf--h2.graf--first,\n  .section--first .graf--h3.graf--first,\n  .section--first .graf--h4.graf--first {\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  .graf--h2 + .graf--h2 {\n    margin-top: -8px;\n  }\n\n  .graf--h2 + .graf--h3,\n  .graf--h2 + .graf--h4 {\n    margin-top: -6px;\n  }\n\n  .graf--h3 + .graf--h4,\n  .graf--h4 + .graf--h2 {\n    margin-top: 2px;\n  }\n\n  .graf--h3 + .graf--h4,\n  .graf--h4 + .graf--h3 {\n    margin-top: -2px;\n  }\n\n  .graf--h2 + .postList,\n  .graf--h3 + .postList,\n  .graf--h4 + .postList {\n    margin-top: 10px;\n  }\n\n  .graf--h2 + .graf--p.graf--empty,\n  .graf--h3 + .graf--p.graf--empty,\n  .graf--h4 + .graf--p.graf--empty {\n    margin-bottom: -7px;\n    margin-top: -7px;\n  }\n\n  .graf--h2 + .graf--p.graf--empty + .graf--h1,\n  .graf--h3 + .graf--p.graf--empty + .graf--h1,\n  .graf--h4 + .graf--p.graf--empty + .graf--h1 {\n    margin-top: -5px;\n  }\n\n  .graf--h2 + .graf--p.graf--empty + .graf--h3,\n  .graf--h3 + .graf--p.graf--empty + .graf--h3,\n  .graf--h4 + .graf--p.graf--empty + .graf--h3,\n  .graf--h2 + .graf--p.graf--empty + .graf--h4,\n  .graf--h3 + .graf--p.graf--empty + .graf--h4,\n  .graf--h4 + .graf--p.graf--empty + .graf--h4 {\n    margin-top: -8px;\n  }\n\n\n  .graf--blockquote, blockquote {\n    font-family: ", ";\n    border-left: 3px solid rgba(0, 0, 0, .8);\n\n    font-style: italic;\n    font-weight: 400;\n    letter-spacing: 0.16px;\n    letter-spacing: 0.02rem;\n    margin-left: -17px;\n    padding-left: 15px;\n    margin-bottom: 25px;\n    font-size: 1.2em;\n    line-height: 1.9em;\n    margin-top: 20px;\n\n  }\n  .graf--blockquote + .graf--blockquote {\n    margin-top: -30px;\n    padding-top: 30px;\n  }\n\n  .graf--pullquote {\n    line-height: 1.4;\n    text-align: center;\n    font-size: 3.2em;\n    margin: 48px -160px;\n    border: none;\n    padding: 0;\n    font-family: ", ";\n    letter-spacing: 0.01rem;\n    font-weight: 400;\n    font-style: italic;\n    -webkit-transition: margin 100ms;\n    transition: margin 100ms;\n  }\n\n  .graf--pre + .graf--pre {\n    margin-top: -20px;\n  }\n\n  .graf--figure {\n  \n    box-sizing: border-box;\n    clear: both;\n    margin-bottom: 30px;\n    outline: medium none;\n    position: relative;\n\n    &.is-mediaFocused .graf-image,\n    &.is-mediaFocused iframe {\n      box-shadow: 0 0 0 3px #57ad68;\n    }\n  }\n\n  .graf--mixtapeEmbed {\n    a {\n      text-decoration: none;\n    }\n    &.is-mediaFocused {\n      box-shadow: 0 0 0 1px #57ad68;\n    }\n\n    .graf--media-embed-close{\n      position: absolute;\n      top: 1px;\n      display: inline-block;\n      font-size: 2em;\n      width: 20px;\n      right: 10px;\n      text-shadow: 0px 0px 0px white;\n    }\n\n    border-color: ", ";\n    border-radius: 5px;\n    border-style: solid;\n    border-width: 1px;\n    box-sizing: border-box;\n    //color: rgba(0, 0, 0, 0.6);\n    font-family: ", ";\n    font-size: 12px;\n    font-style: normal;\n    font-weight: 300;\n    letter-spacing: -0.02em;\n    margin-bottom: 40px;\n    margin-top: 40px;\n    max-height: 310px;\n    //max-width: 700px;\n    overflow: hidden;\n    padding: 30px;\n    position: relative;\n\n    .is-postEditMode iframe {\n        border: 3px solid rgba(255, 255, 255, 0);\n    }\n\n    .mixtapeImage {\n        background-position: center center;\n        background-repeat: no-repeat;\n        background-size: cover;\n        float: right;\n        height: 310px;\n        margin: -30px -30px 0 25px;\n        width: 310px;\n    }\n\n    .mixtapeImage--empty {\n        height: 0;\n        width: 0;\n    }\n\n    .markup--mixtapeEmbed-strong {\n        //color: #000;\n        display: block;\n        font-family: $dante-font-family-sans;\n        font-size: 30px;\n        font-style: normal;\n        font-weight: 300;\n        letter-spacing: -0.02em;\n        line-height: 1.2;\n        margin-bottom: 0px;\n    }\n\n    .markup--mixtapeEmbed-em {\n        display: block;\n        font-size: 16px;\n        font-style: normal;\n        margin-bottom: 10px;\n        max-height: 120px;\n        overflow: hidden;\n    }\n\n  }\n\n\n\n  .graf--h4 + .graf--figure,\n  .graf--h3 + .graf--figure,\n  .graf--h2 + .graf--figure {\n    margin-top: 15px;\n  }\n\n  .graf--first {\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  /*.graf--empty {\n    margin-bottom: -7px;\n    margin-top: -7px;\n  }*/\n\n  p[data-align=\"center\"],\n  .graf--h2[data-align=\"center\"],\n  .graf--h3[data-align=\"center\"],\n  .graf--h4[data-align=\"center\"],\n  .graf--blockquote[data-align=\"center\"] {\n    text-align: center;\n  }\n\n  .markup--anchor,\n  .graf--sectionCaption {\n      cursor: text;\n  }\n  .markup--anchor {\n    text-decoration: underline;\n    color: inherit;\n  }\n\n  @media (max-width: 500px) {\n\n    .graf--h2 {\n      font-size: 2.6em;\n    }\n    .graf--h3 {\n      font-size: 1.6em;\n    }\n    .graf--h4 {\n      font-size: 1.4em;\n    }\n\n  }\n\n  .graf--divider span{\n    text-align: center;\n    width: 100%;\n    display: block;\n  }\n\n  .graf--divider span:before {\n    line-height: 1;\n    user-select: none;\n    font-weight: 400;\n    font-size: 25px;\n    letter-spacing: 18px;\n    content: \"...\";\n    display: inline-block;\n    margin-left: .6em;\n    position: relative;\n    color: #757575;\n    top: -3px;\n  }\n\n\n\n  .graf--layoutOutsetLeft {\n      margin-left: -160px;\n  }\n\n  .graf--layoutFillWidth {\n      margin-left: -200px;\n      margin-right: -200px;\n  }\n\n  .graf--layoutOutsetLeft {\n      width: 75%;\n  }\n  .graf--layoutInsetLeft, .graf--layoutOutsetLeft {\n      float: left;\n      margin-right: 30px;\n      padding-top: 10px;\n      padding-bottom: 10px;\n  }\n\n  .imageCaption {\n\n    top: 0;\n    text-align: center;\n    margin-top: 0;\n    font-family: ", ";\n    letter-spacing: 0;\n    font-weight: 400;\n    font-size: 13px;\n    line-height: 1.4;\n    color: ", ";\n    outline: 0;\n    z-index: 300;\n    margin-top: 10px;\n    position:relative;\n\n    .danteDefaultPlaceholder{\n      margin-bottom: -18px !important;\n      display: block;\n    }\n  }\n\n\n  // FIGURE WRAPPER\n\n    .aspectRatioPlaceholder {\n      margin: 0 auto;\n      position: relative;\n      width: 100%;\n    }\n\n    .graf-image:before,\n    .iframeContainer:before {\n      .is-postEditMode & {\n        bottom: 0;\n        content: \"\";\n        left: 0;\n        position: absolute;\n        right: 0;\n        top: 0;\n        z-index: 500;\n      }\n    }\n\n    .aspectRatioPlaceholder.is-locked .graf-image, \n    .aspectRatioPlaceholder.is-locked .graf-imageAnchor {\n        height: 100%;\n        left: 0;\n        position: absolute;\n        top: 0;\n        width: 100%;\n    }\n\n    .graf-image,\n    .graf-imageAnchor,\n    .iframeContainer > iframe,\n    .iframeContainer {\n      box-sizing: border-box;\n      display: block;\n      margin: auto;\n      max-width: 100%;\n    }\n\n    .aspectRatioPlaceholder {\n      .image-upoader-loader{\n        position: absolute;\n        bottom: 0px;\n        left: 0%;\n        background-color: #fff;\n        width: 100%;\n        /* height: 3px; */\n        text-align: center;\n        top: 0px;\n        vertical-align: text-bottom;\n        opacity: 0.7;\n        p{\n          line-height: 5px;\n          /* font-weight: 700; */\n          /* text-transform: uppercase; */\n          font-size: 14px;\n          margin-top: 49%;\n        }\n      }\n    }\n\n    div[contenteditable=\"false\"] {\n      .danteDefaultPlaceholder{\n        display:none;\n      }\n    }\n\n    div[contenteditable=\"false\"] {\n      a.markup--anchor {\n        cursor: pointer;\n      }\n    }\n\n    figcaption .public-DraftStyleDefault-block {\n        text-align: center;\n    }\n\n    @media (max-width: 1200px) {\n      .imageCaption,\n      .postField--outsetCenterImage > .imageCaption {\n        position: relative;\n        width: 100%;\n        text-align: center;\n        left: 0;\n        margin-top: 10px;\n      }\n    }\n\n    figure.graf--layoutOutsetLeft {\n      .imageCaption,\n      .postField--outsetCenterImage > .imageCaption {\n        position: relative;\n        width: 100%;\n        text-align: center;\n        left: 0;\n        margin-top: 10px;\n      }\n    }\n\n    figure.is-defaultValue .imageCaption,\n    .graf--sectionCaption.is-defaultValue {\n      display: none;\n    }\n\n    .graf--figure.is-mediaFocused .imageCaption,\n    .graf--figure.is-defaultValue.is-selected .imageCaption,\n    section.is-mediaFocused .graf--sectionCaption,\n    .graf--sectionCaption.is-defaultValue.is-selected {\n      display: block;\n    }\n\n"]),
    _templateObject2 = /*#__PURE__*/ _taggedTemplateLiteral(["\n  // BASE\n  position: absolute;\n  z-index: 10;\n  width: ", ";\n  height: ", ";\n  -webkit-transition: opacity 100ms, width 0 linear 250ms;\n  transition: opacity 100ms, width 0 linear 250ms;\n  padding: 0;\n  font-size: 0;\n\n  opacity: 0;\n  pointer-events: none;\n\n  &.is-active {\n    opacity: 1;\n    pointer-events: auto;\n  }\n  &.is-scaled {\n    -webkit-transition-delay: 0;\n    transition-delay: 0;\n    width: auto;\n\n    .control {\n            -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n       -webkit-transform: rotate(45deg) !important;\n           -ms-transform: rotate(45deg) !important;\n               transform: rotate(45deg) !important;\n            border-color: ", ";\n                   color: ", ";\n    }\n\n    .scale {\n       -webkit-transform: scale(1) !important;\n           -ms-transform: scale(1) !important;\n               transform: scale(1) !important;\n      -webkit-transition: -webkit-", ", ", " !important;\n              transition: ", ", ", " !important;\n    }\n\n  }\n\n\n  // MENU\n  .inlineTooltip-menu {\n    display: inline-block;\n    margin-left: ", ";\n    svg path{\n      fill: ", ";\n    }\n  }\n\n  // BUTTON\n  .inlineTooltip-button {\n\n    // BASE\n\n    float: left;\n    margin-right: ", ";\n    display: inline-block;\n    position: relative;\n    outline: 0;\n    padding: 0;\n    vertical-align: bottom;\n    box-sizing: border-box;\n    border-radius: ", ";\n    cursor: pointer;\n    font-size: 14px;\n    text-decoration: none;\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 400;\n    font-style: normal;\n    white-space: nowrap;\n    text-rendering: auto;\n    text-align: center;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -moz-font-feature-settings: \"liga\" on;\n    width: ", ";\n    height: ", ";\n    line-height: ", ";\n    -webkit-transition: 100ms border-color, 100ms color;\n    transition: 100ms border-color, 100ms color;\n    background: ", ";\n    border: ", " solid;\n    border-color: ", "\n    color: ", ";\n\n    &:hover {\n      border-color: ", "\n      color: rgba(", ", ", ");\n    }\n\n    svg path {\n      fill: ", ";\n    }\n\n    // SCALE\n    &.scale {\n   \n       -webkit-transform: scale(0);\n           -ms-transform: scale(0);\n               transform: scale(0);\n      -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n\n\n      svg path {\n        fill: ", ";\n      }\n      //@while ", " > 0 {\n      //  &:nth-of-type(", ") {\n      //    -webkit-transition-delay: ", " + \"ms\"};\n      //            transition-delay: ", " + \"ms\"};\n      //  }\n      //  ", ": ", ";\n      //}\n    }\n\n    // CONTROL\n    &.control {\n      \n      display: block;\n      position: absolute;\n      margin-right: ", ";\n      padding-top: 4px;\n\n      -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n       -webkit-transform: rotate(0);\n           -ms-transform: rotate(0);\n               transform: rotate(0);\n    }\n\n"]);

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// taken from dante.slate
import styled from 'styled-components';
import { math, lighten, opacify, desaturate } from 'polished';
var EditorContainer = styled.div(_templateObject, function (props) {
  return props.theme.dante_font_family_serif;
}, function (props) {
  return props.theme.dante_editor_font_size;
}, function (props) {
  return props.theme.dante_editor_line_height;
}, function (props) {
  return props.theme.dante_text_color;
}, function (props) {
  return math("".concat(props.theme.dante_editor_font_size, " - 6"));
}, function (props) {
  return props.theme.dante_editor_line_height;
}, function (props) {
  return opacify(0.8, props.theme.dante_text_color);
}, function (props) {
  return math("".concat(props.theme.dante_editor_font_size, "* 0.9"));
}, function (props) {
  return props.theme.dante_code_background;
}, function (props) {
  return props.theme.dante_font_family_mono;
}, function (props) {
  return props.theme.dante_code_color;
}, function (props) {
  return props.theme.dante_code_background;
}, function (props) {
  return props.theme.dante_font_family_mono;
}, function (props) {
  return props.theme.dante_font_family_sans;
}, function (props) {
  return props.theme.dante_font_family_sans;
}, function (props) {
  return props.theme.dante_font_family_sans;
}, function (props) {
  return lighten(0.3, props.theme.dante_text_color);
}, function (props) {
  return props.theme.dante_font_family_serif;
}, function (props) {
  return props.theme.dante_font_family_serif;
}, function (props) {
  return props.theme.dante_control_color;
}, function (props) {
  return props.theme.dante_font_family_sans;
}, function (props) {
  return props.theme.dante_font_family_sans;
}, function (props) {
  return lighten(0.2, props.theme.dante_text_color);
});
export var InlinetooltipWrapper = styled.div(_templateObject2, function (props) {
  return props.theme.tooltip_size;
}, function (props) {
  return props.theme.tooltip_size;
}, function (props) {
  return props.theme.tooltip_backward_transition;
}, function (props) {
  return props.theme.tooltip_default_transition;
}, function (props) {
  return props.theme.tooltip_backward_transition;
}, function (props) {
  return props.theme.tooltip_default_transition;
}, function (props) {
  return props.theme.tooltip_color;
}, function (props) {
  return props.theme.tooltip_color;
}, function (props) {
  return props.theme.tooltip_backward_transition;
}, function (props) {
  return props.theme.tooltip_default_transition;
}, function (props) {
  return props.theme.tooltip_backward_transition;
}, function (props) {
  return props.theme.tooltip_default_transition;
}, function (props) {
  return math("".concat(props.theme.tooltip_size, " + ").concat(props.theme.tooltip_menu_spacing));
}, function (props) {
  return props.theme.tooltip_color;
}, function (props) {
  return props.theme.tooltip_button_spacing;
}, function (props) {
  return props.theme.tooltip_border_radius;
}, function (props) {
  return props.theme.dante_font_family_sans;
}, function (props) {
  return props.theme.tooltip_size;
}, function (props) {
  return props.theme.tooltip_size;
}, function (props) {
  return props.theme.tooltip_line_height;
}, function (props) {
  return props.theme.tooltip_background_color;
}, function (props) {
  return props.theme.tooltip_border_width;
}, function (props) {
  return opacify(0.2, props.theme.tooltip_border_color);
}, function (props) {
  return props.theme.tooltip_color;
}, function (props) {
  return opacify(0.4, props.theme.tooltip_border_color);
}, function (props) {
  return props.theme.tooltip_color;
}, function (props) {
  return props.theme.tooltip_color_opacity_hover;
}, function (props) {
  return props.theme.tooltip_color;
}, function (props) {
  return props.theme.tooltip_forward_transition;
}, function (props) {
  return props.theme.tooltip_default_transition;
}, function (props) {
  return props.theme.tooltip_forward_transition;
}, function (props) {
  return props.theme.tooltip_default_transition;
}, function (props) {
  return props.theme.tooltip_color;
}, function (props) {
  return props.theme.tooltip_items;
}, function (props) {
  return props.theme.tooltip_items + 1;
}, function (props) {
  return props.theme.tooltip_item_delay * props.theme.tooltip_items;
}, function (props) {
  return props.theme.tooltip_item_delay * props.theme.tooltip_items;
}, function (props) {
  return props.theme.tooltip_items;
}, function (props) {
  return props.theme.tooltip_items - 1;
}, function (props) {
  return props.theme.tooltip_menu_spacing;
}, function (props) {
  return props.theme.tooltip_forward_transition;
}, function (props) {
  return props.theme.tooltip_default_transition;
}, function (props) {
  return props.theme.tooltip_forward_transition;
}, function (props) {
  return props.theme.tooltip_default_transition;
});
export default EditorContainer;