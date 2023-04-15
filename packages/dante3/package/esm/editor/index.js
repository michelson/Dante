import { _ as __makeTemplateObject, a as __spreadArray } from '../tslib.es6-30a7ce49.js';
import React, { useState, useEffect, Component } from 'react';
import { mergeAttributes, ReactNodeViewRenderer, BubbleMenu, NodeViewWrapper, NodeViewContent, useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import { lowlight } from 'lowlight/lib/core';
import { Placeholder } from '../plugins/tipTapPlaceholder.js';
import { Color } from '../plugins/colorStyle.js';
import styled from '@emotion/styled';
import { math, lighten, opacify } from 'polished';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Focus from '@tiptap/extension-focus';
import { Node, nodeInputRule } from '@tiptap/core';
import { ThemeProvider } from '@emotion/react';
import { a as add, i as imageLeft, b as imageCenter, c as imageFill, d as imageWide, f as fontColor, e as close, g as bold, h as italic, j as h1, k as h2, l as h3, m as insertunorderedlist, n as insertorderedlist, o as code, p as blockquote, q as link, v as videoRecorderIcon } from '../icons-ca14e5a1.js';
import { HexColorPicker } from 'react-colorful';
import { ImageBlockConfig } from '../blocks/image.js';
import { EmbedBlockConfig } from '../blocks/embed.js';
import { VideoBlockConfig } from '../blocks/video.js';
import { PlaceholderBlockConfig } from '../blocks/placeholder.js';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useCountdownTimer } from 'use-countdown-timer';
import { VideoContainer, StatusBar, VideoBody, EditorControls, RecButton, SecondsLeft, Button, VideoPlayer } from '../blocks/videoRecorder/styled.js';
import { DividerBlockConfig } from '../blocks/divider.js';
import { CodeBlockConfig } from '../blocks/code.js';
import { GiphyBlockConfig } from '../blocks/giphy/giphyBlock.js';
import { SpeechToTextBlockConfig } from '../blocks/speechToText.js';
import 'prosemirror-view';
import 'prosemirror-state';
import '../blocks/mediumImage.js';
import 'medium-zoom';
import '../blocks/giphy/giphy.js';

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var EditorContainer = styled.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  //@import url(\"//fonts.googleapis.com/css?family=Merriweather:400,700,400italic,700italic|Open+Sans:400,300,700,800\");\n\n  //@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,800&display=swap');\n\n  font-family: ", " !important;\n  letter-spacing: 0.01rem;\n  font-weight: 400;\n  font-style: normal;\n  font-size: ", ";\n  line-height: ", ";\n  color: ", ";\n  background-color: ", ";\n\n  text-rendering: optimizeLegibility;\n\n  .ProseMirror {\n    &:focus-visible {\n      outline-color: transparent;\n      outline-width: 0px;\n    }\n  }\n\n  @media (max-width: 500px) {\n    font-size: ", ";\n    line-height: ", ";\n  }\n\n  .public-DraftEditorPlaceholder-root {\n    color: ", ";\n    position: absolute;\n    z-index: 0;\n    font-size: ", ";\n    background-color: transparent;\n  }\n\n  .graf--h2,\n  .graf--h3,\n  .graf--h4,\n  .graf--h5,\n  .graf--h6,\n  .graf--h7,\n  .postList,\n  .graf--hr,\n  .graf--figure,\n  .graf--blockquote,\n  .graf--pullquote,\n  .graf--p,\n  .graf--pre {\n    margin: 0;\n    //position:relative;\n  }\n\n  li {\n    counter-reset: ol0;\n    margin-left: 1.5em;\n  }\n\n  ul {\n    list-style-type: disc;\n    position: relative;\n  }\n\n  ol {\n    list-style-type: decimal;\n    position: relative;\n  }\n\n  li {\n    .graf--p {\n      margin: 0px;\n    }\n  }\n\n  ul[data-type=\"taskList\"] {\n    list-style: none;\n    padding: 0;\n\n    li {\n      display: flex;\n      align-items: center;\n\n      > label {\n        flex: 0 0 auto;\n        margin-right: 0.5rem;\n      }\n    }\n  }\n\n  .graf--code {\n    position: relative;\n    overflow: visible;\n\n    background: ", ";\n    font-family: ", ";\n    font-size: ", ";\n    margin-bottom: 20px;\n    padding: 20px;\n    white-space: pre-wrap;\n    color: ", ";\n\n    .dante-code-syntax {\n      color: ", ";\n      position: absolute;\n      top: 4px;\n      right: 4px;\n      width: 165px;\n    }\n  }\n\n  .graf--pre {\n    background: #000 !important;\n    font-family: ", ";\n    font-size: 16px;\n    margin-bottom: 20px;\n    padding: 20px;\n    white-space: pre-wrap;\n    color: #fff !important;\n  }\n\n  .postList {\n    margin-bottom: 30px;\n  }\n\n  .graf--p {\n    code {\n      font-family: ", ";\n      background-color: #faf594;\n      color: ", ";\n      -webkit-box-decoration-break: clone;\n      box-decoration-break: clone;\n      font-weight: 200;\n      padding: 3px;\n    }\n  }\n\n  .graf--p,\n  .graf--blockquote,\n  .graf--pullquote {\n    margin-bottom: 30px;\n  }\n\n  .graf--code {\n    line-height: 1em;\n  }\n\n  .graf--p.dante--spinner {\n    position: relative;\n  }\n\n  .graf--hr {\n    hr {\n      border: 1px solid #ccc;\n      margin: 26px;\n    }\n  }\n\n  .public-DraftStyleDefault-pre {\n    overflow: inherit;\n  }\n\n  h1.graf--h {\n    font-family: ", ";\n    font-size: ", ";\n    font-style: normal;\n    font-weight: 800;\n    letter-spacing: -0.04em;\n    line-height: 1;\n    margin-bottom: 0.4em;\n    margin-left: -3px;\n    margin-top: 40px;\n    padding-top: 0;\n  }\n\n  h2.graf--h {\n    font-family: ", ";\n    font-size: ", ";\n    font-style: normal;\n    font-weight: 600;\n    letter-spacing: -0.04em;\n    line-height: 1;\n    margin-bottom: 0.4em;\n    margin-left: -3px;\n    margin-top: 40px;\n    padding-top: 0;\n  }\n\n  h3.graf--h {\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 700;\n    font-style: normal;\n    font-size: ", ";\n    margin-left: -1.8px;\n    line-height: 1.2;\n    margin-top: 40px;\n    margin-bottom: 0.7em;\n    font-weight: 300;\n  }\n\n  h4.graf--h {\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 300;\n    font-style: normal;\n    font-size: ", ";\n    margin-left: -1.5px;\n    line-height: 1.2;\n    color: ", ";\n    margin-top: 40px;\n    margin-bottom: 0.6em;\n  }\n\n  @media (max-width: 500px) {\n    h1.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n\n    h2.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n\n    h3.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n  }\n\n  @media (max-width: 500px) {\n    .graf--h2 {\n      font-size: 2.6em;\n    }\n    .graf--h3 {\n      font-size: 1.6em;\n    }\n    .graf--h4 {\n      font-size: 1.4em;\n    }\n  }\n\n  .section--first .graf--h2.graf--first,\n  .section--first .graf--h3.graf--first,\n  .section--first .graf--h4.graf--first {\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  h2.graf--h + h2.graf--h {\n    margin-top: -8px;\n  }\n\n  h2.graf--h + h3.graf--h,\n  h2.graf--h + h4.graf--h {\n    margin-top: -6px;\n  }\n\n  h3.graf--h3 + h4.graf--h4,\n  h4.graf--h4 + h2.graf--h2 {\n    margin-top: 2px;\n  }\n\n  h3.graf--h3 + h4.graf--h4,\n  h4.graf--h4 + h3.graf--h3 {\n    margin-top: -2px;\n  }\n\n  h2.graf--h2 + .postList,\n  h3.graf--h3 + .postList,\n  h4.graf--h4 + .postList {\n    margin-top: 10px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty,\n  h3.graf--h + .graf--p.graf--empty,\n  h4.graf--h + .graf--p.graf--empty {\n    margin-bottom: -7px;\n    margin-top: -7px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty + h1.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h1.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h1.graf--h {\n    margin-top: -5px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h2.graf--h + .graf--p.graf--empty + h4.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h4.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h4.graf--h {\n    margin-top: -8px;\n  }\n\n  .graf--blockquote,\n  blockquote {\n    font-family: ", ";\n    border-left: 3px solid rgba(0, 0, 0, 0.8);\n\n    font-style: italic;\n    font-weight: 400;\n    letter-spacing: 0.16px;\n    letter-spacing: 0.02rem;\n    margin-left: -12px;\n    padding-left: 15px;\n    margin-bottom: 25px;\n    //font-size: 1.2em;\n    line-height: 1.5em;\n    margin-top: 20px;\n  }\n  .graf--blockquote + .graf--blockquote {\n    margin-top: -30px;\n    padding-top: 30px;\n  }\n\n  .graf--pullquote {\n    line-height: 1.4;\n    text-align: center;\n    font-size: 3.2em;\n    margin: 48px -160px;\n    border: none;\n    padding: 0;\n    font-family: ", ";\n    letter-spacing: 0.01rem;\n    font-weight: 400;\n    font-style: italic;\n    -webkit-transition: margin 100ms;\n    transition: margin 100ms;\n  }\n\n  .graf--pre + .graf--pre {\n    margin-top: -20px;\n  }\n\n  .graf--figure {\n    box-sizing: border-box;\n    clear: both;\n    margin-bottom: 30px;\n    outline: medium none;\n    position: relative;\n\n    &.is-mediaFocused .graf-image,\n    &.is-mediaFocused iframe {\n      box-shadow: 0 0 0 3px #57ad68;\n    }\n  }\n\n  .graf--mixtapeEmbed {\n    a {\n      text-decoration: none;\n    }\n    &.is-mediaFocused {\n      box-shadow: 0 0 0 1px #57ad68;\n    }\n\n    .graf--media-embed-close {\n      position: absolute;\n      top: 1px;\n      display: inline-block;\n      font-size: 2em;\n      width: 20px;\n      right: 10px;\n      text-shadow: 0px 0px 0px white;\n    }\n\n    border-color: ", ";\n    border-radius: 5px;\n    border-style: solid;\n    border-width: 1px;\n    box-sizing: border-box;\n    //color: rgba(0, 0, 0, 0.6);\n    font-family: ", ";\n    font-size: 12px;\n    font-style: normal;\n    font-weight: 300;\n    letter-spacing: -0.02em;\n    margin-bottom: 40px;\n    margin-top: 40px;\n    max-height: 310px;\n    //max-width: 700px;\n    overflow: hidden;\n    padding: 30px;\n    position: relative;\n\n    .is-postEditMode iframe {\n      border: 3px solid rgba(255, 255, 255, 0);\n    }\n\n    .mixtapeImage {\n      background-position: center center;\n      background-repeat: no-repeat;\n      background-size: cover;\n      float: right;\n      height: 310px;\n      margin: -30px -30px 0 25px;\n      width: 310px;\n    }\n\n    .mixtapeImage--empty {\n      height: 0;\n      width: 0;\n    }\n\n    .markup--mixtapeEmbed-strong {\n      //color: #000;\n      display: block;\n      font-family: $dante-font-family-sans;\n      font-size: 30px;\n      font-style: normal;\n      font-weight: 300;\n      letter-spacing: -0.02em;\n      line-height: 1.2;\n      margin-bottom: 0px;\n    }\n\n    .markup--mixtapeEmbed-em {\n      display: block;\n      font-size: 16px;\n      font-style: normal;\n      margin-bottom: 10px;\n      max-height: 120px;\n      overflow: hidden;\n    }\n  }\n\n  .graf--h4 + .graf--figure,\n  .graf--h3 + .graf--figure,\n  .graf--h2 + .graf--figure {\n    margin-top: 15px;\n  }\n\n  .graf--first {\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  /*.graf--empty {\n    margin-bottom: -7px;\n    margin-top: -7px;\n  }*/\n\n  p[data-align=\"center\"],\n  .graf--h2[data-align=\"center\"],\n  .graf--h3[data-align=\"center\"],\n  .graf--h4[data-align=\"center\"],\n  .graf--blockquote[data-align=\"center\"] {\n    text-align: center;\n  }\n\n  .markup--anchor,\n  .graf--sectionCaption {\n    cursor: text;\n  }\n  .markup--anchor {\n    text-decoration: underline;\n    color: inherit;\n  }\n\n  .graf--divider {\n    margin-bottom: 30px;\n  }\n\n  .graf--divider span {\n    text-align: center;\n    width: 100%;\n    display: block;\n  }\n\n  .graf--divider span:before {\n    line-height: 1;\n    user-select: none;\n    font-weight: 400;\n    font-size: 25px;\n    letter-spacing: 18px;\n    content: \"...\";\n    display: inline-block;\n    margin-left: 0.6em;\n    position: relative;\n    color: ", ";\n    top: -3px;\n  }\n\n  .graf--layoutOutsetLeft {\n    margin-left: -160px;\n  }\n\n  .graf--layoutFillWidth {\n    margin-left: -200px;\n    margin-right: -200px;\n  }\n\n  .graf--layoutOutsetLeft {\n    width: 75%;\n  }\n  .graf--layoutInsetLeft,\n  .graf--layoutOutsetLeft {\n    float: left;\n    margin-right: 30px;\n    padding-top: 10px;\n    padding-bottom: 10px;\n  }\n\n  .imageCaption {\n    //top: 0;\n    text-align: center;\n    margin-top: 0;\n    font-family: ", ";\n    letter-spacing: 0;\n    font-weight: 400;\n    font-size: 13px;\n    line-height: 1.4;\n    color: ", ";\n    outline: 0;\n    z-index: 300;\n    margin-top: 10px;\n    //position: relative;\n\n    .danteDefaultPlaceholder {\n      margin-bottom: -18px !important;\n      display: block;\n    }\n  }\n\n  // FIGURE WRAPPER\n\n  .aspectRatioPlaceholder {\n    margin: 0 auto;\n    position: relative;\n    width: 100%;\n  }\n\n  .graf-image:before,\n  .iframeContainer:before {\n    .is-postEditMode & {\n      bottom: 0;\n      content: \"\";\n      left: 0;\n      position: absolute;\n      right: 0;\n      top: 0;\n      z-index: 500;\n    }\n  }\n\n  .aspectRatioPlaceholder.is-locked .graf-image,\n  .aspectRatioPlaceholder.is-locked .graf-imageAnchor {\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  .graf-image,\n  .graf-imageAnchor,\n  .iframeContainer > iframe,\n  .iframeContainer {\n    box-sizing: border-box;\n    display: block;\n    margin: auto;\n    max-width: 100%;\n  }\n\n  .aspectRatioPlaceholder {\n    .image-upoader-loader {\n      position: absolute;\n      bottom: 0px;\n      left: 0%;\n      background-color: #fff;\n      width: 100%;\n      /* height: 3px; */\n      text-align: center;\n      top: 0px;\n      vertical-align: text-bottom;\n      opacity: 0.7;\n      p {\n        line-height: 5px;\n        /* font-weight: 700; */\n        /* text-transform: uppercase; */\n        font-size: 14px;\n        margin-top: 49%;\n      }\n    }\n  }\n\n  div[contenteditable=\"false\"] {\n    .danteDefaultPlaceholder {\n      display: none;\n    }\n  }\n\n  div[contenteditable=\"false\"] {\n    a.markup--anchor {\n      cursor: pointer;\n    }\n  }\n\n  figcaption .public-DraftStyleDefault-block {\n    text-align: center;\n  }\n\n  @media (max-width: 1200px) {\n    .imageCaption,\n    .postField--outsetCenterImage > .imageCaption {\n      position: relative;\n      width: 100%;\n      text-align: center;\n      left: 0;\n      margin-top: 10px;\n    }\n  }\n\n  figure.graf--layoutOutsetLeft {\n    .imageCaption,\n    .postField--outsetCenterImage > .imageCaption {\n      position: relative;\n      width: 100%;\n      text-align: center;\n      left: 0;\n      margin-top: 10px;\n    }\n  }\n\n  figure.is-defaultValue .imageCaption,\n  .graf--sectionCaption.is-defaultValue {\n    display: none;\n  }\n\n  .graf--figure.is-mediaFocused .imageCaption,\n  .graf--figure.is-defaultValue.is-selected .imageCaption,\n  section.is-mediaFocused .graf--sectionCaption,\n  .graf--sectionCaption.is-defaultValue.is-selected {\n    display: block;\n  }\n\n  .ProseMirror .empty-node::before {\n    position: absolute;\n    color: #aaa;\n    cursor: text;\n  }\n\n  .ProseMirror .empty-node:hover::before {\n    color: #777;\n  }\n\n  .ProseMirror h1.empty-node::before {\n    content: \"Title\";\n  }\n\n  /*.ProseMirror p.empty-node:first-of-type::before {\n    content: 'Contents';\n  }*/\n\n  /* Placeholder (at the top) */\n  .ProseMirror p.is-editor-empty:first-of-type::before {\n    content: attr(data-placeholder);\n    float: left;\n    color: #ced4da;\n    pointer-events: none;\n    height: 0;\n  }\n\n  .ProseMirror .is-node-empty:first-of-type::before {\n    content: attr(data-placeholder);\n    float: left;\n    color: #ced4da;\n    pointer-events: none;\n    height: 0;\n  }\n\n  /* Give a remote user a caret */\n  .collaboration-cursor__caret {\n    position: relative;\n    margin-left: -1px;\n    margin-right: -1px;\n    border-left: 1px solid #0d0d0d;\n    border-right: 1px solid #0d0d0d;\n    word-break: normal;\n    pointer-events: none;\n  }\n\n  /* Render the username above the caret */\n  .collaboration-cursor__label {\n    position: absolute;\n    top: -1.4em;\n    left: -1px;\n    font-size: 12px;\n    font-style: normal;\n    font-weight: 600;\n    line-height: normal;\n    user-select: none;\n    color: #0d0d0d;\n    padding: 0.1rem 0.3rem;\n    border-radius: 3px 3px 3px 0;\n    white-space: nowrap;\n  }\n"], ["\n  //@import url(\"//fonts.googleapis.com/css?family=Merriweather:400,700,400italic,700italic|Open+Sans:400,300,700,800\");\n\n  //@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,800&display=swap');\n\n  font-family: ", " !important;\n  letter-spacing: 0.01rem;\n  font-weight: 400;\n  font-style: normal;\n  font-size: ", ";\n  line-height: ", ";\n  color: ", ";\n  background-color: ", ";\n\n  text-rendering: optimizeLegibility;\n\n  .ProseMirror {\n    &:focus-visible {\n      outline-color: transparent;\n      outline-width: 0px;\n    }\n  }\n\n  @media (max-width: 500px) {\n    font-size: ", ";\n    line-height: ", ";\n  }\n\n  .public-DraftEditorPlaceholder-root {\n    color: ", ";\n    position: absolute;\n    z-index: 0;\n    font-size: ", ";\n    background-color: transparent;\n  }\n\n  .graf--h2,\n  .graf--h3,\n  .graf--h4,\n  .graf--h5,\n  .graf--h6,\n  .graf--h7,\n  .postList,\n  .graf--hr,\n  .graf--figure,\n  .graf--blockquote,\n  .graf--pullquote,\n  .graf--p,\n  .graf--pre {\n    margin: 0;\n    //position:relative;\n  }\n\n  li {\n    counter-reset: ol0;\n    margin-left: 1.5em;\n  }\n\n  ul {\n    list-style-type: disc;\n    position: relative;\n  }\n\n  ol {\n    list-style-type: decimal;\n    position: relative;\n  }\n\n  li {\n    .graf--p {\n      margin: 0px;\n    }\n  }\n\n  ul[data-type=\"taskList\"] {\n    list-style: none;\n    padding: 0;\n\n    li {\n      display: flex;\n      align-items: center;\n\n      > label {\n        flex: 0 0 auto;\n        margin-right: 0.5rem;\n      }\n    }\n  }\n\n  .graf--code {\n    position: relative;\n    overflow: visible;\n\n    background: ", ";\n    font-family: ", ";\n    font-size: ", ";\n    margin-bottom: 20px;\n    padding: 20px;\n    white-space: pre-wrap;\n    color: ", ";\n\n    .dante-code-syntax {\n      color: ", ";\n      position: absolute;\n      top: 4px;\n      right: 4px;\n      width: 165px;\n    }\n  }\n\n  .graf--pre {\n    background: #000 !important;\n    font-family: ", ";\n    font-size: 16px;\n    margin-bottom: 20px;\n    padding: 20px;\n    white-space: pre-wrap;\n    color: #fff !important;\n  }\n\n  .postList {\n    margin-bottom: 30px;\n  }\n\n  .graf--p {\n    code {\n      font-family: ", ";\n      background-color: #faf594;\n      color: ", ";\n      -webkit-box-decoration-break: clone;\n      box-decoration-break: clone;\n      font-weight: 200;\n      padding: 3px;\n    }\n  }\n\n  .graf--p,\n  .graf--blockquote,\n  .graf--pullquote {\n    margin-bottom: 30px;\n  }\n\n  .graf--code {\n    line-height: 1em;\n  }\n\n  .graf--p.dante--spinner {\n    position: relative;\n  }\n\n  .graf--hr {\n    hr {\n      border: 1px solid #ccc;\n      margin: 26px;\n    }\n  }\n\n  .public-DraftStyleDefault-pre {\n    overflow: inherit;\n  }\n\n  h1.graf--h {\n    font-family: ", ";\n    font-size: ", ";\n    font-style: normal;\n    font-weight: 800;\n    letter-spacing: -0.04em;\n    line-height: 1;\n    margin-bottom: 0.4em;\n    margin-left: -3px;\n    margin-top: 40px;\n    padding-top: 0;\n  }\n\n  h2.graf--h {\n    font-family: ", ";\n    font-size: ", ";\n    font-style: normal;\n    font-weight: 600;\n    letter-spacing: -0.04em;\n    line-height: 1;\n    margin-bottom: 0.4em;\n    margin-left: -3px;\n    margin-top: 40px;\n    padding-top: 0;\n  }\n\n  h3.graf--h {\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 700;\n    font-style: normal;\n    font-size: ", ";\n    margin-left: -1.8px;\n    line-height: 1.2;\n    margin-top: 40px;\n    margin-bottom: 0.7em;\n    font-weight: 300;\n  }\n\n  h4.graf--h {\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 300;\n    font-style: normal;\n    font-size: ", ";\n    margin-left: -1.5px;\n    line-height: 1.2;\n    color: ", ";\n    margin-top: 40px;\n    margin-bottom: 0.6em;\n  }\n\n  @media (max-width: 500px) {\n    h1.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n\n    h2.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n\n    h3.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n  }\n\n  @media (max-width: 500px) {\n    .graf--h2 {\n      font-size: 2.6em;\n    }\n    .graf--h3 {\n      font-size: 1.6em;\n    }\n    .graf--h4 {\n      font-size: 1.4em;\n    }\n  }\n\n  .section--first .graf--h2.graf--first,\n  .section--first .graf--h3.graf--first,\n  .section--first .graf--h4.graf--first {\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  h2.graf--h + h2.graf--h {\n    margin-top: -8px;\n  }\n\n  h2.graf--h + h3.graf--h,\n  h2.graf--h + h4.graf--h {\n    margin-top: -6px;\n  }\n\n  h3.graf--h3 + h4.graf--h4,\n  h4.graf--h4 + h2.graf--h2 {\n    margin-top: 2px;\n  }\n\n  h3.graf--h3 + h4.graf--h4,\n  h4.graf--h4 + h3.graf--h3 {\n    margin-top: -2px;\n  }\n\n  h2.graf--h2 + .postList,\n  h3.graf--h3 + .postList,\n  h4.graf--h4 + .postList {\n    margin-top: 10px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty,\n  h3.graf--h + .graf--p.graf--empty,\n  h4.graf--h + .graf--p.graf--empty {\n    margin-bottom: -7px;\n    margin-top: -7px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty + h1.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h1.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h1.graf--h {\n    margin-top: -5px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h2.graf--h + .graf--p.graf--empty + h4.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h4.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h4.graf--h {\n    margin-top: -8px;\n  }\n\n  .graf--blockquote,\n  blockquote {\n    font-family: ", ";\n    border-left: 3px solid rgba(0, 0, 0, 0.8);\n\n    font-style: italic;\n    font-weight: 400;\n    letter-spacing: 0.16px;\n    letter-spacing: 0.02rem;\n    margin-left: -12px;\n    padding-left: 15px;\n    margin-bottom: 25px;\n    //font-size: 1.2em;\n    line-height: 1.5em;\n    margin-top: 20px;\n  }\n  .graf--blockquote + .graf--blockquote {\n    margin-top: -30px;\n    padding-top: 30px;\n  }\n\n  .graf--pullquote {\n    line-height: 1.4;\n    text-align: center;\n    font-size: 3.2em;\n    margin: 48px -160px;\n    border: none;\n    padding: 0;\n    font-family: ", ";\n    letter-spacing: 0.01rem;\n    font-weight: 400;\n    font-style: italic;\n    -webkit-transition: margin 100ms;\n    transition: margin 100ms;\n  }\n\n  .graf--pre + .graf--pre {\n    margin-top: -20px;\n  }\n\n  .graf--figure {\n    box-sizing: border-box;\n    clear: both;\n    margin-bottom: 30px;\n    outline: medium none;\n    position: relative;\n\n    &.is-mediaFocused .graf-image,\n    &.is-mediaFocused iframe {\n      box-shadow: 0 0 0 3px #57ad68;\n    }\n  }\n\n  .graf--mixtapeEmbed {\n    a {\n      text-decoration: none;\n    }\n    &.is-mediaFocused {\n      box-shadow: 0 0 0 1px #57ad68;\n    }\n\n    .graf--media-embed-close {\n      position: absolute;\n      top: 1px;\n      display: inline-block;\n      font-size: 2em;\n      width: 20px;\n      right: 10px;\n      text-shadow: 0px 0px 0px white;\n    }\n\n    border-color: ", ";\n    border-radius: 5px;\n    border-style: solid;\n    border-width: 1px;\n    box-sizing: border-box;\n    //color: rgba(0, 0, 0, 0.6);\n    font-family: ", ";\n    font-size: 12px;\n    font-style: normal;\n    font-weight: 300;\n    letter-spacing: -0.02em;\n    margin-bottom: 40px;\n    margin-top: 40px;\n    max-height: 310px;\n    //max-width: 700px;\n    overflow: hidden;\n    padding: 30px;\n    position: relative;\n\n    .is-postEditMode iframe {\n      border: 3px solid rgba(255, 255, 255, 0);\n    }\n\n    .mixtapeImage {\n      background-position: center center;\n      background-repeat: no-repeat;\n      background-size: cover;\n      float: right;\n      height: 310px;\n      margin: -30px -30px 0 25px;\n      width: 310px;\n    }\n\n    .mixtapeImage--empty {\n      height: 0;\n      width: 0;\n    }\n\n    .markup--mixtapeEmbed-strong {\n      //color: #000;\n      display: block;\n      font-family: $dante-font-family-sans;\n      font-size: 30px;\n      font-style: normal;\n      font-weight: 300;\n      letter-spacing: -0.02em;\n      line-height: 1.2;\n      margin-bottom: 0px;\n    }\n\n    .markup--mixtapeEmbed-em {\n      display: block;\n      font-size: 16px;\n      font-style: normal;\n      margin-bottom: 10px;\n      max-height: 120px;\n      overflow: hidden;\n    }\n  }\n\n  .graf--h4 + .graf--figure,\n  .graf--h3 + .graf--figure,\n  .graf--h2 + .graf--figure {\n    margin-top: 15px;\n  }\n\n  .graf--first {\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  /*.graf--empty {\n    margin-bottom: -7px;\n    margin-top: -7px;\n  }*/\n\n  p[data-align=\"center\"],\n  .graf--h2[data-align=\"center\"],\n  .graf--h3[data-align=\"center\"],\n  .graf--h4[data-align=\"center\"],\n  .graf--blockquote[data-align=\"center\"] {\n    text-align: center;\n  }\n\n  .markup--anchor,\n  .graf--sectionCaption {\n    cursor: text;\n  }\n  .markup--anchor {\n    text-decoration: underline;\n    color: inherit;\n  }\n\n  .graf--divider {\n    margin-bottom: 30px;\n  }\n\n  .graf--divider span {\n    text-align: center;\n    width: 100%;\n    display: block;\n  }\n\n  .graf--divider span:before {\n    line-height: 1;\n    user-select: none;\n    font-weight: 400;\n    font-size: 25px;\n    letter-spacing: 18px;\n    content: \"...\";\n    display: inline-block;\n    margin-left: 0.6em;\n    position: relative;\n    color: ", ";\n    top: -3px;\n  }\n\n  .graf--layoutOutsetLeft {\n    margin-left: -160px;\n  }\n\n  .graf--layoutFillWidth {\n    margin-left: -200px;\n    margin-right: -200px;\n  }\n\n  .graf--layoutOutsetLeft {\n    width: 75%;\n  }\n  .graf--layoutInsetLeft,\n  .graf--layoutOutsetLeft {\n    float: left;\n    margin-right: 30px;\n    padding-top: 10px;\n    padding-bottom: 10px;\n  }\n\n  .imageCaption {\n    //top: 0;\n    text-align: center;\n    margin-top: 0;\n    font-family: ", ";\n    letter-spacing: 0;\n    font-weight: 400;\n    font-size: 13px;\n    line-height: 1.4;\n    color: ", ";\n    outline: 0;\n    z-index: 300;\n    margin-top: 10px;\n    //position: relative;\n\n    .danteDefaultPlaceholder {\n      margin-bottom: -18px !important;\n      display: block;\n    }\n  }\n\n  // FIGURE WRAPPER\n\n  .aspectRatioPlaceholder {\n    margin: 0 auto;\n    position: relative;\n    width: 100%;\n  }\n\n  .graf-image:before,\n  .iframeContainer:before {\n    .is-postEditMode & {\n      bottom: 0;\n      content: \"\";\n      left: 0;\n      position: absolute;\n      right: 0;\n      top: 0;\n      z-index: 500;\n    }\n  }\n\n  .aspectRatioPlaceholder.is-locked .graf-image,\n  .aspectRatioPlaceholder.is-locked .graf-imageAnchor {\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  .graf-image,\n  .graf-imageAnchor,\n  .iframeContainer > iframe,\n  .iframeContainer {\n    box-sizing: border-box;\n    display: block;\n    margin: auto;\n    max-width: 100%;\n  }\n\n  .aspectRatioPlaceholder {\n    .image-upoader-loader {\n      position: absolute;\n      bottom: 0px;\n      left: 0%;\n      background-color: #fff;\n      width: 100%;\n      /* height: 3px; */\n      text-align: center;\n      top: 0px;\n      vertical-align: text-bottom;\n      opacity: 0.7;\n      p {\n        line-height: 5px;\n        /* font-weight: 700; */\n        /* text-transform: uppercase; */\n        font-size: 14px;\n        margin-top: 49%;\n      }\n    }\n  }\n\n  div[contenteditable=\"false\"] {\n    .danteDefaultPlaceholder {\n      display: none;\n    }\n  }\n\n  div[contenteditable=\"false\"] {\n    a.markup--anchor {\n      cursor: pointer;\n    }\n  }\n\n  figcaption .public-DraftStyleDefault-block {\n    text-align: center;\n  }\n\n  @media (max-width: 1200px) {\n    .imageCaption,\n    .postField--outsetCenterImage > .imageCaption {\n      position: relative;\n      width: 100%;\n      text-align: center;\n      left: 0;\n      margin-top: 10px;\n    }\n  }\n\n  figure.graf--layoutOutsetLeft {\n    .imageCaption,\n    .postField--outsetCenterImage > .imageCaption {\n      position: relative;\n      width: 100%;\n      text-align: center;\n      left: 0;\n      margin-top: 10px;\n    }\n  }\n\n  figure.is-defaultValue .imageCaption,\n  .graf--sectionCaption.is-defaultValue {\n    display: none;\n  }\n\n  .graf--figure.is-mediaFocused .imageCaption,\n  .graf--figure.is-defaultValue.is-selected .imageCaption,\n  section.is-mediaFocused .graf--sectionCaption,\n  .graf--sectionCaption.is-defaultValue.is-selected {\n    display: block;\n  }\n\n  .ProseMirror .empty-node::before {\n    position: absolute;\n    color: #aaa;\n    cursor: text;\n  }\n\n  .ProseMirror .empty-node:hover::before {\n    color: #777;\n  }\n\n  .ProseMirror h1.empty-node::before {\n    content: \"Title\";\n  }\n\n  /*.ProseMirror p.empty-node:first-of-type::before {\n    content: 'Contents';\n  }*/\n\n  /* Placeholder (at the top) */\n  .ProseMirror p.is-editor-empty:first-of-type::before {\n    content: attr(data-placeholder);\n    float: left;\n    color: #ced4da;\n    pointer-events: none;\n    height: 0;\n  }\n\n  .ProseMirror .is-node-empty:first-of-type::before {\n    content: attr(data-placeholder);\n    float: left;\n    color: #ced4da;\n    pointer-events: none;\n    height: 0;\n  }\n\n  /* Give a remote user a caret */\n  .collaboration-cursor__caret {\n    position: relative;\n    margin-left: -1px;\n    margin-right: -1px;\n    border-left: 1px solid #0d0d0d;\n    border-right: 1px solid #0d0d0d;\n    word-break: normal;\n    pointer-events: none;\n  }\n\n  /* Render the username above the caret */\n  .collaboration-cursor__label {\n    position: absolute;\n    top: -1.4em;\n    left: -1px;\n    font-size: 12px;\n    font-style: normal;\n    font-weight: 600;\n    line-height: normal;\n    user-select: none;\n    color: #0d0d0d;\n    padding: 0.1rem 0.3rem;\n    border-radius: 3px 3px 3px 0;\n    white-space: nowrap;\n  }\n"])), function (props) { return props.theme.dante_font_family_serif; }, function (props) { return props.theme.dante_editor_font_size; }, function (props) { return props.theme.dante_editor_line_height; }, function (props) { return props.theme.dante_text_color; }, function (props) { return props.theme.dante_bg_color; }, function (props) {
    return math("".concat(props.theme.dante_editor_font_size, " * 0.9"));
}, function (props) { return props.theme.dante_editor_line_height; }, function (props) { return lighten(0.1, props.theme.dante_text_color); }, function (props) { return math("".concat(props.theme.dante_editor_font_size, "* 0.9")); }, function (props) { return props.theme.dante_code_background; }, function (props) { return props.theme.dante_font_family_mono; }, function (props) { return props.theme.dante_editor_font_size; }, function (props) { return props.theme.dante_code_color; }, function (props) { return props.theme.dante_code_background; }, function (props) { return props.theme.dante_font_family_mono; }, function (props) { return props.theme.dante_font_family_mono; }, function (props) { return props.theme.dante_control_color; }, function (props) { return props.theme.dante_font_family_sans; }, function (props) {
    return math("".concat(props.theme.dante_editor_font_size, " * 3.2"));
}, function (props) { return props.theme.dante_font_family_sans; }, function (props) { return math("".concat(props.theme.dante_editor_font_size, " * 2")); }, function (props) { return props.theme.dante_font_family_sans; }, function (props) {
    return math("".concat(props.theme.dante_editor_font_size, " * 1.3"));
}, function (props) { return props.theme.dante_font_family_sans; }, function (props) {
    return math("".concat(props.theme.dante_editor_font_size, " * 1.2"));
}, function (props) { return lighten(0.3, props.theme.dante_text_color); }, function (props) {
    return math("".concat(props.theme.dante_editor_font_size, " * 1.6"));
}, function (props) {
    return math("".concat(props.theme.dante_editor_line_height, " * 0.6"));
}, function (props) {
    return math("".concat(props.theme.dante_editor_font_size, " * 1.2"));
}, function (props) {
    return math("".concat(props.theme.dante_editor_line_height, " * 0.6"));
}, function (props) {
    return math("".concat(props.theme.dante_editor_font_size, " * 0.9"));
}, function (props) {
    return math("".concat(props.theme.dante_editor_line_height, " * 0.6"));
}, function (props) { return props.theme.dante_font_family_serif; }, function (props) { return props.theme.dante_font_family_serif; }, function (props) { return props.theme.dante_control_color; }, function (props) { return props.theme.dante_font_family_sans; }, function (_a) {
    var theme = _a.theme;
    return theme.dante_text_color;
}, function (props) { return props.theme.dante_font_family_sans; }, function (props) { return lighten(0.2, props.theme.dante_text_color); });
var InlinetooltipWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  // BASE\n  position: absolute;\n  z-index: 10;\n  width: ", ";\n  height: ", ";\n  -webkit-transition: opacity 100ms, width 0 linear 250ms;\n  transition: opacity 100ms, width 0 linear 250ms;\n  padding: 0;\n  font-size: 0;\n\n  opacity: 0;\n  pointer-events: none;\n\n  &.is-active {\n    opacity: 1;\n    pointer-events: auto;\n  }\n  &.is-scaled {\n    -webkit-transition-delay: 0;\n    transition-delay: 0;\n    width: auto;\n\n    .control {\n            -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n       -webkit-transform: rotate(45deg) !important;\n           -ms-transform: rotate(45deg) !important;\n               transform: rotate(45deg) !important;\n            border-color: ", ";\n                   color: ", ";\n    }\n\n    .scale {\n       -webkit-transform: scale(1) !important;\n           -ms-transform: scale(1) !important;\n               transform: scale(1) !important;\n      -webkit-transition: -webkit-", ", ", " !important;\n              transition: ", ", ", " !important;\n    }\n\n  }\n\n  // MENU\n  .inlineTooltip-menu {\n    display: inline-block;\n    margin-left: ", ";\n    svg path{\n      fill: ", ";\n    }\n  }\n\n  .inlineTooltip-menu-fixed {\n    display: inline-block;\n    margin-left: 0px !important;\n  }\n\n  // BUTTON\n  .inlineTooltip-button {\n\n    // BASE\n\n    float: left;\n    margin-right: ", ";\n    display: inline-block;\n    position: relative;\n    outline: 0;\n    padding: 0;\n    vertical-align: bottom;\n    box-sizing: border-box;\n    border-radius: ", ";\n    cursor: pointer;\n    font-size: 14px;\n    text-decoration: none;\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 400;\n    font-style: normal;\n    white-space: nowrap;\n    text-rendering: auto;\n    text-align: center;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -moz-font-feature-settings: \"liga\" on;\n    width: ", ";\n    height: ", ";\n    line-height: ", ";\n    -webkit-transition: 100ms border-color, 100ms color;\n    transition: 100ms border-color, 100ms color;\n    background: ", ";\n    border: ", " solid;\n    border-color: ", ";\n    color: ", ";\n\n    &:hover {\n      border-color: ", "\n      color: rgba(", ", ", ");\n    }\n\n    svg {\n      display: inline !important;\n      vertical-align: unset !important;\n    }\n\n    svg path {\n      fill: ", ";\n    }\n\n    // SCALE\n    &.scale {\n   \n       -webkit-transform: scale(0);\n           -ms-transform: scale(0);\n               transform: scale(0);\n      -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n\n\n      svg path {\n        fill: ", ";\n      }\n    }\n\n    // CONTROL\n    &.control {\n      \n      display: block;\n      position: absolute;\n      margin-right: ", ";\n      padding-top: 4px;\n\n      -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n       -webkit-transform: rotate(0);\n           -ms-transform: rotate(0);\n               transform: rotate(0);\n    }\n\n"], ["\n  // BASE\n  position: absolute;\n  z-index: 10;\n  width: ", ";\n  height: ", ";\n  -webkit-transition: opacity 100ms, width 0 linear 250ms;\n  transition: opacity 100ms, width 0 linear 250ms;\n  padding: 0;\n  font-size: 0;\n\n  opacity: 0;\n  pointer-events: none;\n\n  &.is-active {\n    opacity: 1;\n    pointer-events: auto;\n  }\n  &.is-scaled {\n    -webkit-transition-delay: 0;\n    transition-delay: 0;\n    width: auto;\n\n    .control {\n            -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n       -webkit-transform: rotate(45deg) !important;\n           -ms-transform: rotate(45deg) !important;\n               transform: rotate(45deg) !important;\n            border-color: ", ";\n                   color: ", ";\n    }\n\n    .scale {\n       -webkit-transform: scale(1) !important;\n           -ms-transform: scale(1) !important;\n               transform: scale(1) !important;\n      -webkit-transition: -webkit-", ", ", " !important;\n              transition: ", ", ", " !important;\n    }\n\n  }\n\n  // MENU\n  .inlineTooltip-menu {\n    display: inline-block;\n    margin-left: ", ";\n    svg path{\n      fill: ", ";\n    }\n  }\n\n  .inlineTooltip-menu-fixed {\n    display: inline-block;\n    margin-left: 0px !important;\n  }\n\n  // BUTTON\n  .inlineTooltip-button {\n\n    // BASE\n\n    float: left;\n    margin-right: ", ";\n    display: inline-block;\n    position: relative;\n    outline: 0;\n    padding: 0;\n    vertical-align: bottom;\n    box-sizing: border-box;\n    border-radius: ", ";\n    cursor: pointer;\n    font-size: 14px;\n    text-decoration: none;\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 400;\n    font-style: normal;\n    white-space: nowrap;\n    text-rendering: auto;\n    text-align: center;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -moz-font-feature-settings: \"liga\" on;\n    width: ", ";\n    height: ", ";\n    line-height: ", ";\n    -webkit-transition: 100ms border-color, 100ms color;\n    transition: 100ms border-color, 100ms color;\n    background: ", ";\n    border: ", " solid;\n    border-color: ", ";\n    color: ", ";\n\n    &:hover {\n      border-color: ", "\n      color: rgba(", ", ", ");\n    }\n\n    svg {\n      display: inline !important;\n      vertical-align: unset !important;\n    }\n\n    svg path {\n      fill: ", ";\n    }\n\n    // SCALE\n    &.scale {\n   \n       -webkit-transform: scale(0);\n           -ms-transform: scale(0);\n               transform: scale(0);\n      -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n\n\n      svg path {\n        fill: ", ";\n      }\n    }\n\n    // CONTROL\n    &.control {\n      \n      display: block;\n      position: absolute;\n      margin-right: ", ";\n      padding-top: 4px;\n\n      -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n       -webkit-transform: rotate(0);\n           -ms-transform: rotate(0);\n               transform: rotate(0);\n    }\n\n"])), function (props) { return props.theme.tooltip_size; }, function (props) { return props.theme.tooltip_size; }, function (props) {
    return props.theme.tooltip_backward_transition;
}, function (props) {
    return props.theme.tooltip_default_transition;
}, function (props) {
    return props.theme.tooltip_backward_transition;
}, function (props) {
    return props.theme.tooltip_default_transition;
}, function (props) { return props.theme.tooltip_color; }, function (props) { return props.theme.tooltip_color; }, function (props) {
    return props.theme.tooltip_backward_transition;
}, function (props) {
    return props.theme.tooltip_default_transition;
}, function (props) {
    return props.theme.tooltip_backward_transition;
}, function (props) {
    return props.theme.tooltip_default_transition;
}, function (props) {
    return math("".concat(props.theme.tooltip_size, " + ").concat(props.theme.tooltip_menu_spacing));
}, function (props) { return props.theme.tooltip_color; }, function (props) { return props.theme.tooltip_button_spacing; }, function (props) { return props.theme.tooltip_border_radius; }, function (props) { return props.theme.dante_font_family_sans; }, function (props) { return props.theme.tooltip_size; }, function (props) { return props.theme.tooltip_size; }, function (props) { return props.theme.tooltip_line_height; }, function (props) { return props.theme.tooltip_background_color; }, function (props) { return props.theme.tooltip_border_width; }, function (props) { return opacify(0.2, props.theme.tooltip_border_color); }, function (props) { return props.theme.tooltip_color; }, function (props) { return opacify(0.4, props.theme.tooltip_border_color); }, function (props) { return props.theme.tooltip_color; }, function (props) {
    return props.theme.tooltip_color_opacity_hover;
}, function (props) { return props.theme.tooltip_color; }, function (props) {
    return props.theme.tooltip_forward_transition;
}, function (props) {
    return props.theme.tooltip_default_transition;
}, function (props) {
    return props.theme.tooltip_forward_transition;
}, function (props) {
    return props.theme.tooltip_default_transition;
}, function (props) { return props.theme.tooltip_color; }, function (props) { return props.theme.tooltip_menu_spacing; }, function (props) {
    return props.theme.tooltip_forward_transition;
}, function (props) {
    return props.theme.tooltip_default_transition;
}, function (props) {
    return props.theme.tooltip_forward_transition;
}, function (props) {
    return props.theme.tooltip_default_transition;
});
styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: fixed;\n  padding: 20px;\n  height: 100vh;\n  background-color: #ccc;\n  top: 0px;\n  right: 0px;\n  width: 200px;\n  font-size: 0.8em;\n  .close {\n    width: 20px;\n    heigth: 20px;\n  }\n  .log-wrapper {\n    overflow-y: auto;\n    height: 100vh;\n  }\n"], ["\n  position: fixed;\n  padding: 20px;\n  height: 100vh;\n  background-color: #ccc;\n  top: 0px;\n  right: 0px;\n  width: 200px;\n  font-size: 0.8em;\n  .close {\n    width: 20px;\n    heigth: 20px;\n  }\n  .log-wrapper {\n    overflow-y: auto;\n    height: 100vh;\n  }\n"])));
var templateObject_1$1, templateObject_2, templateObject_3;

function extensionFactory(options) {
  return Node.create({
    name: options.name,
    group: options.group || "block",
    content: "inline*",
    selectable: true,
    draggable: true,
    atom: options.atom || false,
    addOptions: options.options || {},
    // priority: options.priority || 1, // somehow this option breaks the addKeyboardShortcut
    onBeforeCreate: function onBeforeCreate(_ref) {
      var editor = _ref.editor;
      // Before the view is created.
      options.onBeforeCreate && options.onBeforeCreate(editor);
    },
    onCreate: function onCreate(_ref2) {
      var editor = _ref2.editor;
      // The editor is ready.
      options.onCreate && options.onCreate(editor);
    },
    onUpdate: function onUpdate(_ref3) {
      var editor = _ref3.editor;
      // The content has changed.
      options.onUpdate && options.onUpdate(editor);
    },
    onSelectionUpdate: function onSelectionUpdate(_ref4) {
      var editor = _ref4.editor;
      // The selection has changed.
      options.onSelectionUpdate && options.onSelectionUpdate(editor);
    },
    onTransaction: function onTransaction(_ref5) {
      var editor = _ref5.editor;
        _ref5.transaction;
      // The editor state has changed.
      options.onTransaction && options.onTransaction(editor);
    },
    onFocus: function onFocus(_ref6) {
      var editor = _ref6.editor;
        _ref6.event;
      // The editor is focused.
      options.onFocus && options.onFocus(editor);
    },
    onBlur: function onBlur(_ref7) {
      var editor = _ref7.editor;
        _ref7.event;
      // The editor isn’t focused anymore.
      options.onBlur && options.onBlur(editor);
    },
    onDestroy: function onDestroy() {
      // The editor is being destroyed.
      options.onDestroy && options.onDestroy();
    },
    addKeyboardShortcuts: function addKeyboardShortcuts() {
      if (!options.keyboardShortcuts) return {};
      return options.keyboardShortcuts && options.keyboardShortcuts(this.editor);
    },
    addCommands: function addCommands() {
      return _defineProperty({}, "insert".concat(options.name), function insert(attributes) {
        return function (_ref8) {
          var chain = _ref8.chain;
          return chain().insertContent({
            type: options.name,
            attrs: {
              url: ""
            }
          }).run();
          //.insertNode(options.name, attributes)
          //.insertText(" ")
          //.run();
        };
      });
    },
    addAttributes: function addAttributes() {
      return options.attributes || {};
    },
    parseHTML: function parseHTML() {
      return options.parseHTML || [{
        tag: options.tag
      }];
    },
    renderHTML: function renderHTML(_ref10) {
      var HTMLAttributes = _ref10.HTMLAttributes;
      console.log(HTMLAttributes);
      var attributes = options.dataSerializer ? options.dataSerializer(HTMLAttributes) : HTMLAttributes;
      return [options.tag, mergeAttributes(attributes)];
    },
    addNodeView: function addNodeView() {
      return ReactNodeViewRenderer(options.component);
    },
    addInputRules: function addInputRules() {
      var _this = this;
      if (!options.addInputRules) return [];
      return options.addInputRules().map(function (rule) {
        return nodeInputRule({
          find: rule,
          type: _this.type
        });
      });
    }
  });
}

var dante_font_family_sans = "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";
var dante_font_family_sans_serif = "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";

// const dante_font_family_sans = `'jaf-bernino-sans', 'Playfair Display', 'Open Sans', "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans_serif;`;
// const dante_font_family_sans_serif = `'freight-text-pro', 'Merriweather', Georgia, Cambria, "Times New Roman", Times, serif;`;
// const dante_font_family_sans_serif = `'freight-text-pro','Playfair Display', 'Merriweather', Georgia, Cambria, "Times New Roman", Times, serif;`;

var tooltip_size = "32px";
var dante_control_color = "#333333";
var dante_inversed_color = "#FFFFFF";
var dante_accent_color = "#5BD974";
var dante_text_color = "#4a4a4a";
var theme = {
  dante_font_family_serif: dante_font_family_sans_serif,
  dante_font_family_sans: dante_font_family_sans,
  dante_font_family_mono: "Menlo, Monaco, Consolas, \"Courier New\", \"Courier\", monospace;",
  dante_font_family_base: dante_font_family_sans,
  // Editor
  dante_editor_font_size: "1.4rem",
  dante_editor_line_height: "1.9",
  //dante_font_family_sans_serif: "comic-sans",
  dante_visual_debugger: "false",
  dante_text_color: dante_text_color,
  dante_inversed_color: dante_inversed_color,
  dante_accent_color: dante_accent_color,
  dante_control_color: dante_control_color,
  dante_popover_color: dante_inversed_color,
  //dante_font_size_base:  '24px',
  //line_height_base:     '1.428571429', // 20/14

  tooltip_color: "#999",
  tooltip_background_color: "#fff",
  tooltip_border_color: "#999",
  tooltip_color_opacity: "0.44",
  tooltip_color_opacity_hover: "0.9",
  tooltip_background_opacity: "0",
  tooltip_border_width: "1px",
  tooltip_border_radius: "999em",
  tooltip_caret_size: "12px",
  menu_tone: "#444",
  tooltip_button_spacing: "9px",
  tooltip_menu_spacing: "22px",
  tooltip_items: 10,
  // Fix this and remove it
  tooltip_item_delay: 30,
  tooltip_size: tooltip_size,
  tooltip_line_height: tooltip_size,
  tooltip_default_transition: "100ms border-color, 100ms color",
  tooltip_forward_transition: "transform 100ms",
  tooltip_backward_transition: "transform 250ms",
  dante_code_background: "#000",
  dante_code_color: "#fff",
  // Menu

  //background: #2A2B32;

  dante_menu_height: "42px",
  dante_menu_background: dante_control_color,
  dante_menu_color: dante_inversed_color,
  dante_menu_border_radius: "4px",
  dante_menu_box_shadow: "0 1px 4px 1px #90909087",
  dante_menu_icon_size: "16px",
  dante_menu_icon_color: dante_inversed_color,
  dante_menu_icon_accent: dante_accent_color,
  dante_menu_divider_color: "#3D3E49",
  dante_menu_border_width: "0px",
  dante_menu_border_color: "none",
  dante_menu_caret_size: "8px",
  dante_bg_color: "transparent",
  // highlight theme
  // highlight theme
  // find other themes at https://highlightjs.org/static/demo/
  // https://github.com/highlightjs/highlight.js/tree/main/src/styles
  hljs_color: "#aaaaaa",
  hljs_background: "#000000",
  hljs_emphasis_color: "#a8a8a2",
  hljs_literal_color: "#ff55ff",
  hljs_selector_class_color: "#aaaaff",
  hljs_name_color: "#ffff55",
  hljs_title_color: "#aaaaaa",
  hljs_variable_color: "#ff5555",
  hljs_class_title_color: "#8888ff",
  hljs_link_color: "#ff55ff",
  hljs_deletion_color: "#55ffff"
};

var AddButton = React.forwardRef(function (props, ref) {
    var display = props.display, position = props.position, widgets = props.widgets, editor = props.editor, fixed = props.fixed;
    var _a = React.useState(false), scaled = _a[0], setScaled = _a[1];
    var _b = React.useState(fixed ? "100%" : "0px"), scaledWidth = _b[0], setScaledWidth = _b[1];
    var fileInput = React.useRef(null);
    React.useEffect(function () {
        var val = scaled ? "300px" : "0";
        setScaledWidth(val);
    }, [scaled]);
    React.useEffect(function () {
        editor.on("selectionUpdate", function (_a) {
            _a.editor; _a.s;
            // The selection has changed.
            setScaled(false);
        });
    }, []);
    function scaledClass() {
        if (scaled || fixed) {
            return "is-scaled";
        }
        else {
            return "";
        }
    }
    function activeClass() {
        //if @props.show then "is-active" else ""
        if (isActive()) {
            return "is-active";
        }
        else {
            return "";
        }
    }
    function isActive() {
        return display && editor.isEditable;
    }
    function scale() {
        if (scaled)
            return;
        setScaled(true);
    }
    function collapse() {
        if (!scaled)
            return;
        setScaled(false);
    }
    function _toggleScaled(ev) {
        ev.preventDefault();
        if (scaled) {
            return collapse();
        }
        else {
            return scale();
        }
    }
    function getItems() {
        if (!widgets)
            return [];
        return widgets.filter(function (o) {
            return o.widget_options
                ? o.widget_options.displayOnInlineTooltip
                : null;
        });
    }
    function clickOnFileUpload(e, block) {
        var _a;
        // @ts-ignore
        fileInput && ((_a = fileInput === null || fileInput === void 0 ? void 0 : fileInput.current) === null || _a === void 0 ? void 0 : _a.click());
        //this.collapse()
        //return this.hide()
    }
    function handlePlaceholder(block) {
        editor.commands.insertContent({
            type: "PlaceholderBlock",
            attrs: {
                blockKind: block
            }
        });
    }
    function handleInsertion(block) {
        editor.commands.insertContent({
            type: block.name,
            attrs: {}
        });
    }
    function clickHandler(e, type) {
        //console.log("TYPE", type);
        var request_block = widgets.find(function (o) { return o.tag === type; });
        switch (request_block.widget_options.insertion) {
            case "upload":
                return clickOnFileUpload();
            case "placeholder":
                return handlePlaceholder(request_block);
            case "insertion":
                return handleInsertion(request_block);
            default:
                return console.log("WRONG TYPE FOR ".concat(request_block.widget_options.insertion));
        }
    }
    function insertImage(file) {
        if (!file)
            return;
        ({
            url: URL.createObjectURL(file),
            file: file
        });
        // cleans input image value
        // @ts-ignore
        fileInput.current.value = "";
        /*editor.chain()
          .focus()
          .setImage({ src: URL.createObjectURL(file) })
          .run()*/
        editor.commands.insertContent({
            type: "ImageBlock",
            attrs: {
                file: file,
                url: URL.createObjectURL(file)
            }
        });
    }
    function handleFileInput(e) {
        var fileList = e.target.files;
        // TODO: support multiple file uploads
        /*
        Object.keys(fileList).forEach (o)=>
          @.insertImage(fileList[0])
        */
        return insertImage(fileList[0]);
    }
    return (React.createElement(InlinetooltipWrapper, { ref: ref, className: "inlineTooltip ".concat(activeClass(), " ").concat(scaledClass()), style: position },
        !fixed && (React.createElement("button", { type: "button", className: "inlineTooltip-button control", title: "Close Menu", "data-action": "inline-menu", onClick: _toggleScaled }, add())),
        React.createElement("div", { className: "inlineTooltip-menu ".concat(fixed ? "inlineTooltip-menu-fixed" : ""), style: { width: "".concat(fixed ? "-1" : scaledWidth) } },
            getItems().map(function (item, i) {
                return (React.createElement(InlineTooltipItem, { title: "", item: item, key: i, clickHandler: clickHandler }));
            }),
            React.createElement("input", { type: "file", accept: "image/*", style: { display: "none" }, ref: fileInput, multiple: true, onChange: handleFileInput }))));
});
AddButton.displayName = "AddButton";
// @ts-ignore
function InlineTooltipItem(_a) {
    var item = _a.item, clickHandler = _a.clickHandler, title = _a.title;
    function onMouseDown(e) {
        e.preventDefault();
        return clickHandler(e, item.tag);
    }
    return (React.createElement("button", { type: "button", className: "inlineTooltip-button scale", title: title, onMouseDown: onMouseDown, onClick: function (e) { return e.preventDefault(); }, style: { fontSize: "21px" } }, React.createElement("span", { className: "tooltip-icon" }, item.icon())));
}

var AnchorStyle = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  // MENU\n  //position: absolute;\n  //visibility: hidden;\n  z-index: 10;\n  -webkit-transition: none;\n  transition: none;\n  display: none;\n  top: 0;\n  left: 0;\n  display: block;\n  white-space: nowrap;\n\n  height: ", ";\n  background: ", ";\n  color: ", ";\n\n  border: ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n\n  // CARET\n  // &:before -> Borde\n  // &:after  -> Triangulo\n\n  &.dante-menu {\n    &:after {\n      content: \"\";\n      height: 0;\n      width: 0;\n      position: absolute;\n      left: ", ";\n      pointer-events: none;\n      border: ", " solid transparent;\n      margin-left: -", ";\n    }\n    &:after {\n      border-top-color: ", ";\n      bottom: -", ";\n    }\n  }\n\n  &.dante-sticky-menu {\n    position: -webkit-sticky;\n    position: sticky;\n    width: 100%;\n    border-radius: 0px;\n    //overflow-x: scroll;\n    &:after {\n      display: none;\n    }\n  }\n\n  &.is-active {\n    visibility: visible;\n    opacity: 1;\n    transition: visibility 0s linear 0s, opacity 0.2s 0s;\n  }\n\n  &.is-active {\n    opacity: 1;\n  }\n\n  // Visible\n\n  &.dante-menu--active {\n    display: inline-block !important;\n    visibility: visible !important;\n    -webkit-animation: pop-upwards 180ms forwards linear;\n    animation: pop-upwards 180ms forwards linear;\n  }\n\n  // Link mode\n\n  &.dante-menu--linkmode {\n    .dante-menu-buttons {\n      visibility: hidden;\n    }\n    .dante-menu-linkinput {\n      display: block;\n    }\n    .dante-menu-input {\n      -webkit-animation: pop-upwards 180ms forwards linear;\n      animation: pop-upwards 180ms forwards linear;\n    }\n  }\n\n  &.popover--Linktooltip .popover-inner {\n    padding: 10px 10px;\n    font-size: 12px;\n  }\n\n  &.popover--tooltip .popover-inner {\n    //background: #333333;\n    border-radius: 4px;\n    color: ", ";\n  }\n\n  .popover-inner a {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  .popover-arrow {\n    position: absolute;\n  }\n\n  .popover-arrow:after {\n    background-color: ", ";\n  }\n\n  &.popover--top .popover-arrow,\n  &.popover--bottom .popover-arrow {\n    left: 50%;\n    margin-left: -", ";\n  }\n\n  &.popover--left .popover-arrow,\n  &.popover--right .popover-arrow {\n    top: 50%;\n    margin-top: -", ";\n  }\n\n  &.popover--right .popover-arrow {\n    left: 1px;\n  }\n\n  &.popover--bottom .popover-arrow {\n    top: -13px;\n  }\n\n  &.popover--left .popover-arrow {\n    right: 1px;\n    // clip: rect(-4px 14px 18px 0);\n  }\n\n  .popover-arrow:after {\n    content: \"\";\n    display: block;\n    width: ", ";\n    height: ", ";\n  }\n\n  &.popover--top .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(-5px, -5px);\n    -ms-transform: rotate(45deg) translate(-5px, -5px);\n    transform: rotate(45deg) translate(-5px, -5px);\n    box-shadow: 1px 1px 1px -1px ", ";\n  }\n\n  &.popover--right .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(6px, -6px);\n    -ms-transform: rotate(45deg) translate(6px, -6px);\n    transform: rotate(45deg) translate(6px, -6px);\n    box-shadow: -1px 1px 1px -1px ", ";\n  }\n\n  &.popover--bottom .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(6px, 6px);\n    -ms-transform: rotate(45deg) translate(6px, 6px);\n    transform: rotate(45deg) translate(6px, 6px);\n    box-shadow: -1px -1px 1px -1px ", ";\n  }\n\n  &.popover--left .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(-6px, 6px);\n    -ms-transform: rotate(45deg) translate(-6px, 6px);\n    transform: rotate(45deg) translate(-6px, 6px);\n    box-shadow: 1px -1px 1px -1px ", ";\n  }\n\n  // BUTONS\n\n  .dante-menu-buttons {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    line-height: 0;\n  }\n  .dante-menu-divider {\n    width: 1px;\n    height: ", ";\n    margin: 9px 2px;\n    background: rgba(100, 100, 100, 0.2);\n    display: inline-block;\n    overflow: hidden;\n    cursor: default;\n    line-height: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  .dante-menu-button,\n  button {\n    background-color: transparent;\n    min-width: 20px;\n    display: inline-block;\n    padding-left: 10px;\n    padding-right: 10px;\n    overflow: hidden;\n    text-align: center;\n    color: ", ";\n    cursor: pointer;\n    font-size: ", ";\n    line-height: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n\n    &:hover {\n      // nada\n    }\n    &.active {\n      color: ", ";\n    }\n\n    &:first-of-type {\n      border-top-left-radius: ", ";\n      border-bottom-left-radius: ", ";\n      padding-left: 18px;\n    }\n    &:last-child {\n      border-top-right-radius: ", ";\n      border-bottom-right-radius: ", ";\n      padding-right: 18px;\n    }\n  }\n\n  .dante-menu-button--disabled {\n    -webkit-user-select: none !important;\n    -moz-user-select: none !important;\n    -ms-user-select: none !important;\n    user-select: none !important;\n    opacity: 0.3;\n  }\n\n  // LINK\n\n  .dante-menu-linkinput {\n    & {\n      display: none;\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n    }\n    .dante-menu-button {\n      position: absolute;\n      top: 0;\n      right: 0;\n    }\n  }\n\n  .dante-menu-input {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    padding: 13px 40px 13px 10px;\n    color: ", ";\n    background: transparent;\n    border: none;\n    outline: none;\n    font-size: 14px;\n    box-sizing: border-box;\n    border-radius: ", ";\n    appearance: none;\n    text-align: left;\n    font-family: ", ";\n    letter-spacing: 0.01rem;\n    font-weight: 400;\n    font-style: normal;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -moz-font-feature-settings: \"liga\" on;\n  }\n\n  &:after {\n    border-top-color: ", ";\n  }\n  .dante-menu-input {\n    padding: 11px 40px 11px 10px;\n  }\n  .dante-menu-button {\n    padding-left: 0;\n    padding-right: 0;\n    vertical-align: top;\n    line-height: 1;\n    margin: 0px;\n  }\n  .dante-menu-button:first-of-type {\n    border-top-left-radius: 4px;\n    border-bottom-left-radius: 4px;\n    padding-left: 0;\n  }\n  .dante-menu-button:last-of-type {\n    border-top-right-radius: 4px;\n    border-bottom-right-radius: 4px;\n    padding-right: 0;\n  }\n  .dante-menu-button.visible-overflow {\n    vertical-align: top;\n  }\n  .dante-menu-button button {\n    height: 42px;\n  }\n  .dante-menu-button .dante-icon {\n    padding: 10px;\n    min-width: 20px;\n    display: inline-block;\n  }\n  .dante-menu-button .tooltip-icon {\n    padding: 10px;\n    display: inline-block;\n  }\n\n  .dante-menu-button .dante-icon:hover .icon-fillcolor {\n    fill: ", ";\n  }\n  .dante-menu-button.active .dante-icon .icon-fillcolor {\n    fill: ", ";\n  }\n\n  .dante-menu-button .dante-icon svg {\n    display: inherit !important;\n    vertical-align: inherit !important;\n  }\n  .dropdown {\n    float: left;\n  }\n  .dropdown .btn {\n    color: #bec2cc;\n    padding: 0 10px;\n    width: auto;\n    font-size: 12px;\n  }\n  .dropdown .btn .caret {\n    border-top-color: #62656a;\n    margin-left: 4px;\n  }\n  .dropdown .btn:hover {\n    color: ", ";\n  }\n  .dropdown .btn:hover .caret {\n    border-top-color: ", ";\n  }\n  .dropdown .dropdown-menu {\n    background: #2a2b32;\n    padding: 0;\n    max-height: 300px;\n    overflow-y: auto;\n    width: auto;\n    min-width: 60px;\n  }\n  .dropdown .dropdown-menu li {\n    border-bottom: 1px solid #383943;\n  }\n  .dropdown .dropdown-menu li:last-child {\n    border-bottom: 0;\n  }\n  .dropdown .dropdown-menu li a {\n    color: #bec2cc;\n    font-size: 12px;\n    padding: 0 10px;\n    line-height: 30px;\n  }\n  .dropdown.open > .dropdown-toggle.btn-default {\n    color: #bec2cc;\n  }\n  .dropdown .dropdown-menu li a:hover,\n  .dropdown.open > .dropdown-toggle.btn-default:hover {\n    background: 0;\n    color: ", ";\n  }\n\n  .divider {\n    position: relative;\n    float: left;\n    width: 1px;\n    height: 20px;\n    margin: 10px 5px;\n    background: ", ";\n  }\n"], ["\n  // MENU\n  //position: absolute;\n  //visibility: hidden;\n  z-index: 10;\n  -webkit-transition: none;\n  transition: none;\n  display: none;\n  top: 0;\n  left: 0;\n  display: block;\n  white-space: nowrap;\n\n  height: ", ";\n  background: ", ";\n  color: ", ";\n\n  border: ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n\n  // CARET\n  // &:before -> Borde\n  // &:after  -> Triangulo\n\n  &.dante-menu {\n    &:after {\n      content: \"\";\n      height: 0;\n      width: 0;\n      position: absolute;\n      left: ", ";\n      pointer-events: none;\n      border: ", " solid transparent;\n      margin-left: -", ";\n    }\n    &:after {\n      border-top-color: ", ";\n      bottom: -", ";\n    }\n  }\n\n  &.dante-sticky-menu {\n    position: -webkit-sticky;\n    position: sticky;\n    width: 100%;\n    border-radius: 0px;\n    //overflow-x: scroll;\n    &:after {\n      display: none;\n    }\n  }\n\n  &.is-active {\n    visibility: visible;\n    opacity: 1;\n    transition: visibility 0s linear 0s, opacity 0.2s 0s;\n  }\n\n  &.is-active {\n    opacity: 1;\n  }\n\n  // Visible\n\n  &.dante-menu--active {\n    display: inline-block !important;\n    visibility: visible !important;\n    -webkit-animation: pop-upwards 180ms forwards linear;\n    animation: pop-upwards 180ms forwards linear;\n  }\n\n  // Link mode\n\n  &.dante-menu--linkmode {\n    .dante-menu-buttons {\n      visibility: hidden;\n    }\n    .dante-menu-linkinput {\n      display: block;\n    }\n    .dante-menu-input {\n      -webkit-animation: pop-upwards 180ms forwards linear;\n      animation: pop-upwards 180ms forwards linear;\n    }\n  }\n\n  &.popover--Linktooltip .popover-inner {\n    padding: 10px 10px;\n    font-size: 12px;\n  }\n\n  &.popover--tooltip .popover-inner {\n    //background: #333333;\n    border-radius: 4px;\n    color: ", ";\n  }\n\n  .popover-inner a {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  .popover-arrow {\n    position: absolute;\n  }\n\n  .popover-arrow:after {\n    background-color: ", ";\n  }\n\n  &.popover--top .popover-arrow,\n  &.popover--bottom .popover-arrow {\n    left: 50%;\n    margin-left: -", ";\n  }\n\n  &.popover--left .popover-arrow,\n  &.popover--right .popover-arrow {\n    top: 50%;\n    margin-top: -", ";\n  }\n\n  &.popover--right .popover-arrow {\n    left: 1px;\n  }\n\n  &.popover--bottom .popover-arrow {\n    top: -13px;\n  }\n\n  &.popover--left .popover-arrow {\n    right: 1px;\n    // clip: rect(-4px 14px 18px 0);\n  }\n\n  .popover-arrow:after {\n    content: \"\";\n    display: block;\n    width: ", ";\n    height: ", ";\n  }\n\n  &.popover--top .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(-5px, -5px);\n    -ms-transform: rotate(45deg) translate(-5px, -5px);\n    transform: rotate(45deg) translate(-5px, -5px);\n    box-shadow: 1px 1px 1px -1px ", ";\n  }\n\n  &.popover--right .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(6px, -6px);\n    -ms-transform: rotate(45deg) translate(6px, -6px);\n    transform: rotate(45deg) translate(6px, -6px);\n    box-shadow: -1px 1px 1px -1px ", ";\n  }\n\n  &.popover--bottom .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(6px, 6px);\n    -ms-transform: rotate(45deg) translate(6px, 6px);\n    transform: rotate(45deg) translate(6px, 6px);\n    box-shadow: -1px -1px 1px -1px ", ";\n  }\n\n  &.popover--left .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(-6px, 6px);\n    -ms-transform: rotate(45deg) translate(-6px, 6px);\n    transform: rotate(45deg) translate(-6px, 6px);\n    box-shadow: 1px -1px 1px -1px ", ";\n  }\n\n  // BUTONS\n\n  .dante-menu-buttons {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    line-height: 0;\n  }\n  .dante-menu-divider {\n    width: 1px;\n    height: ", ";\n    margin: 9px 2px;\n    background: rgba(100, 100, 100, 0.2);\n    display: inline-block;\n    overflow: hidden;\n    cursor: default;\n    line-height: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  .dante-menu-button,\n  button {\n    background-color: transparent;\n    min-width: 20px;\n    display: inline-block;\n    padding-left: 10px;\n    padding-right: 10px;\n    overflow: hidden;\n    text-align: center;\n    color: ", ";\n    cursor: pointer;\n    font-size: ", ";\n    line-height: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n\n    &:hover {\n      // nada\n    }\n    &.active {\n      color: ", ";\n    }\n\n    &:first-of-type {\n      border-top-left-radius: ", ";\n      border-bottom-left-radius: ", ";\n      padding-left: 18px;\n    }\n    &:last-child {\n      border-top-right-radius: ", ";\n      border-bottom-right-radius: ", ";\n      padding-right: 18px;\n    }\n  }\n\n  .dante-menu-button--disabled {\n    -webkit-user-select: none !important;\n    -moz-user-select: none !important;\n    -ms-user-select: none !important;\n    user-select: none !important;\n    opacity: 0.3;\n  }\n\n  // LINK\n\n  .dante-menu-linkinput {\n    & {\n      display: none;\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n    }\n    .dante-menu-button {\n      position: absolute;\n      top: 0;\n      right: 0;\n    }\n  }\n\n  .dante-menu-input {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    padding: 13px 40px 13px 10px;\n    color: ", ";\n    background: transparent;\n    border: none;\n    outline: none;\n    font-size: 14px;\n    box-sizing: border-box;\n    border-radius: ", ";\n    appearance: none;\n    text-align: left;\n    font-family: ", ";\n    letter-spacing: 0.01rem;\n    font-weight: 400;\n    font-style: normal;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -moz-font-feature-settings: \"liga\" on;\n  }\n\n  &:after {\n    border-top-color: ", ";\n  }\n  .dante-menu-input {\n    padding: 11px 40px 11px 10px;\n  }\n  .dante-menu-button {\n    padding-left: 0;\n    padding-right: 0;\n    vertical-align: top;\n    line-height: 1;\n    margin: 0px;\n  }\n  .dante-menu-button:first-of-type {\n    border-top-left-radius: 4px;\n    border-bottom-left-radius: 4px;\n    padding-left: 0;\n  }\n  .dante-menu-button:last-of-type {\n    border-top-right-radius: 4px;\n    border-bottom-right-radius: 4px;\n    padding-right: 0;\n  }\n  .dante-menu-button.visible-overflow {\n    vertical-align: top;\n  }\n  .dante-menu-button button {\n    height: 42px;\n  }\n  .dante-menu-button .dante-icon {\n    padding: 10px;\n    min-width: 20px;\n    display: inline-block;\n  }\n  .dante-menu-button .tooltip-icon {\n    padding: 10px;\n    display: inline-block;\n  }\n\n  .dante-menu-button .dante-icon:hover .icon-fillcolor {\n    fill: ", ";\n  }\n  .dante-menu-button.active .dante-icon .icon-fillcolor {\n    fill: ", ";\n  }\n\n  .dante-menu-button .dante-icon svg {\n    display: inherit !important;\n    vertical-align: inherit !important;\n  }\n  .dropdown {\n    float: left;\n  }\n  .dropdown .btn {\n    color: #bec2cc;\n    padding: 0 10px;\n    width: auto;\n    font-size: 12px;\n  }\n  .dropdown .btn .caret {\n    border-top-color: #62656a;\n    margin-left: 4px;\n  }\n  .dropdown .btn:hover {\n    color: ", ";\n  }\n  .dropdown .btn:hover .caret {\n    border-top-color: ", ";\n  }\n  .dropdown .dropdown-menu {\n    background: #2a2b32;\n    padding: 0;\n    max-height: 300px;\n    overflow-y: auto;\n    width: auto;\n    min-width: 60px;\n  }\n  .dropdown .dropdown-menu li {\n    border-bottom: 1px solid #383943;\n  }\n  .dropdown .dropdown-menu li:last-child {\n    border-bottom: 0;\n  }\n  .dropdown .dropdown-menu li a {\n    color: #bec2cc;\n    font-size: 12px;\n    padding: 0 10px;\n    line-height: 30px;\n  }\n  .dropdown.open > .dropdown-toggle.btn-default {\n    color: #bec2cc;\n  }\n  .dropdown .dropdown-menu li a:hover,\n  .dropdown.open > .dropdown-toggle.btn-default:hover {\n    background: 0;\n    color: ", ";\n  }\n\n  .divider {\n    position: relative;\n    float: left;\n    width: 1px;\n    height: 20px;\n    margin: 10px 5px;\n    background: ", ";\n  }\n"])), function (props) {
    return props.theme.dante_menu_height;
}, function (props) { return props.theme.dante_menu_background; }, function (props) { return props.theme.dante_menu_color; }, function (props) { return props.theme.dante_menu_border_width; }, function (props) { return props.theme.dante_menu_border_radius; }, function (props) { return props.theme.dante_menu_box_shadow; }, function (props) { return (props.arrowPosition ? props.arrowPosition : "50%"); }, function (props) { return props.theme.dante_menu_caret_size; }, function (props) { return math("".concat(props.theme.dante_menu_caret_size, " / 2")); }, function (props) { return props.theme.dante_menu_background; }, function (props) { return math("".concat(props.theme.dante_menu_caret_size, " * 2 - 1")); }, function (props) { return props.theme.dante_menu_color; }, function (props) { return props.theme.dante_menu_background; }, function (props) { return math("".concat(props.theme.tooltip_caret_size, " / 2")); }, function (props) { return math("".concat(props.theme.tooltip_caret_size, "/2")); }, function (props) { return props.theme.tooltip_caret_size; }, function (props) { return props.theme.tooltip_caret_size; }, function (props) { return props.theme.menu_tone; }, function (props) { return props.theme.menu_tone; }, function (props) { return props.theme.menu_tone; }, function (props) { return props.theme.menu_tone; }, function (props) { return math("".concat(props.theme.dante_menu_height, " - 18")); }, function (props) { return props.theme.dante_menu_height; }, function (props) { return props.theme.dante_menu_icon_color; }, function (props) { return props.theme.dante_menu_icon_size; }, function (props) { return props.theme.dante_menu_height; }, function (props) { return props.theme.dante_menu_icon_accent; }, function (props) {
    return props.theme.dante_menu_border_radius;
}, function (props) {
    return props.theme.dante_menu_border_radius;
}, function (props) {
    return props.theme.dante_menu_border_radius;
}, function (props) {
    return props.theme.dante_menu_border_radius;
}, function (props) { return props.theme.dante_menu_color; }, function (props) { return props.theme.dante_menu_border_radius; }, function (props) { return props.theme.dante_font_family_sans; }, function (props) { return props.theme.dante_control_color; }, function (props) { return props.theme.dante_menu_icon_color; }, function (props) { return props.theme.dante_menu_icon_accent; }, function (props) { return props.theme.dante_menu_color; }, function (props) { return props.theme.dante_menu_color; }, function (props) { return props.theme.dante_menu_color; }, function (props) { return props.theme.dante_menu_divider_color; });
var templateObject_1;

function ImageTooltip(_a) {
    _a.item; var handleClick = _a.handleClick;
    var buttons = [
        { type: "left", icon: imageLeft },
        { type: "center", icon: imageCenter },
        { type: "fill", icon: imageFill },
        { type: "wide", icon: imageWide },
    ];
    var image_popover = React.useRef(null);
    React.useEffect(function () {
        //getPosition()
    }, []);
    function directionClick(e, item) {
        e.preventDefault();
        handleClick(item.type);
    }
    return (React.createElement(AnchorStyle, { ref: image_popover, className: "dante-popover popover--Aligntooltip popover--top \n      popover--animated" },
        React.createElement("div", { className: "popover-inner" },
            React.createElement("ul", { className: "dante-menu-buttons" }, buttons.map(function (item, i) {
                return (React.createElement("li", { key: "menu-".concat(item.type), className: "dante-menu-button align-center", onMouseDown: function (e) { return directionClick(e, item); } },
                    React.createElement("span", { className: "tooltip-icon dante-icon" }, item.icon())));
            }))),
        React.createElement("div", { className: "popover-arrow", "data-popper-arrow": true })));
}

function useDebounce(value, delay) {
  // State and setters for debounced value
  var _useState = useState(value),
    _useState2 = _slicedToArray(_useState, 2),
    debouncedValue = _useState2[0],
    setDebouncedValue = _useState2[1];
  useEffect(function () {
    // Update debounced value after delay
    var handler = setTimeout(function () {
      setDebouncedValue(value);
    }, delay);
    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return function () {
      clearTimeout(handler);
    };
  }, [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

function DanteTooltipColor(props) {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var _b = useState(props.value), value = _b[0], setValue = _b[1];
    var debouncedValue = useDebounce(value, 200);
    function toggle(ev) {
        // let selection = this.props.editorState.getSelection()
        // prevent unselection of selection
        ev.preventDefault();
        setOpen(!open);
    }
    useEffect(function () {
        if (debouncedValue) {
            props.handleClick(value);
        }
    }, [debouncedValue] // Only call effect if debounced search term changes
    );
    function currentValue() {
        /*let selection = this.props.editorState.getSelection()
        if (!selection.isCollapsed()) {
          return this.props.styles[this.props.style_type].current(this.props.editorState)
        } else {
          return
        }*/
    }
    function renderColor() {
        // @ts-ignore
        var v = currentValue() || props.value || props.defaultValue;
        if (open) {
            return (React.createElement("div", { style: {
                    position: "absolute",
                    top: "50px",
                    left: "236px",
                } },
                React.createElement(HexColorPicker, { color: v, 
                    // @ts-ignore
                    onChange: function (color, e) {
                        setValue(color);
                        //handleChange(e, color);
                        //this.handleClick(e,  color )
                    } })));
        }
    }
    return (React.createElement("li", { className: "dante-menu-button" },
        React.createElement("span", { className: "dante-icon", onMouseDown: toggle }, fontColor()),
        renderColor()));
}

function DanteTooltipLink(_a) {
    var enableLinkMode = _a.enableLinkMode, selected = _a.selected; _a.editor;
    function promptForLink(ev) {
        /*let selection = this.props.editorState.getSelection()
        if (!selection.isCollapsed()) {
          return this.props.enableLinkMode(ev)
        }*/
        return enableLinkMode(ev);
    }
    return (React.createElement("li", { className: "dante-menu-button ".concat(selected ? "active" : ""), onMouseDown: promptForLink },
        React.createElement("span", { className: "dante-icon" }, link())));
}
function MenuBar(_a) {
    var editor = _a.editor, fixed = _a.fixed;
    var _b = useState({
        link_mode: false,
        menu_style: {
            minWidth: "200px",
        },
    }), linkState = _b[0], setLinkState = _b[1];
    var _c = useState(false), show = _c[0]; _c[1];
    if (!editor) {
        return null;
    }
    function displayLinkMode() {
        if (linkState.link_mode) {
            return "dante-menu--linkmode";
        }
        else {
            return "";
        }
    }
    function itemClass(kind, opts) {
        if (opts === void 0) { opts = null; }
        if (!opts)
            return "dante-menu-button ".concat(editor.isActive(kind) ? "active" : "");
        return "dante-menu-button ".concat(editor.isActive(kind, opts) ? "active" : "");
    }
    function handleInputEnter(e) {
        if (e.which === 13) {
            return confirmLink(e);
        }
    }
    function confirmLink(e) {
        e.preventDefault();
        var url = e.currentTarget.value;
        if (url === "") {
            editor.chain().focus().unsetLink().run();
        }
        else {
            editor.chain().focus().setLink({ href: url }).run();
        }
        _disableLinkMode(e);
    }
    function _enableLinkMode(ev) {
        ev.preventDefault();
        setLinkState({
            link_mode: true,
            menu_style: {
                minWidth: "200px",
            },
        });
    }
    function _disableLinkMode(ev) {
        ev.preventDefault();
        setLinkState({
            link_mode: false,
            url: "",
            menu_style: {},
        });
    }
    function _clickBlockInlineStyle(style) {
        editor.chain().focus().setColor &&
            editor.chain().focus().setColor(style).run();
    }
    function fixedStyles() {
        if (!fixed)
            return { width: "".concat(11 * 43, "px") };
        if (fixed)
            return { position: "sticky", top: "0" };
        return {};
    }
    function renderMenu() {
        if (!editor.isEditable)
            return null;
        if (editor.isActive("ImageBlock"))
            return null;
        return (React.createElement(AnchorStyle, { fixed: fixed, className: "dante-menu ".concat(displayLinkMode()), 
            // @ts-ignore
            style: fixedStyles() },
            React.createElement("div", { className: "dante-menu-linkinput", style: { width: "".concat(11 * 43, "px") } },
                React.createElement("input", { className: "dante-menu-input", placeholder: "put your souce here", onKeyPress: handleInputEnter }),
                React.createElement("div", { className: "dante-menu-button", onMouseDown: _disableLinkMode },
                    React.createElement("span", { className: "dante-icon" }, close()))),
            React.createElement("div", { className: "dante-menu-buttons", style: linkState.menu_style },
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleBold().run(); }, className: itemClass("bold") },
                    React.createElement("span", { className: "dante-icon" }, bold())),
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleItalic().run(); }, className: itemClass("italic") },
                    React.createElement("span", { className: "dante-icon" }, italic())),
                React.createElement(DanteTooltipColor, { styles: {}, editor: editor, enableLinkMode: _enableLinkMode, value: null, defaultValue: "#555", style_type: "color", handleClick: _clickBlockInlineStyle, show: show }),
                React.createElement(DanteTooltipLink, { selected: editor.isActive("link"), editor: editor, enableLinkMode: _enableLinkMode }),
                React.createElement("li", { onClick: function () {
                        return editor.chain().focus().toggleHeading({ level: 1 }).run();
                    }, className: itemClass("heading", { level: 1 }) },
                    React.createElement("span", { className: "dante-icon" }, h1())),
                React.createElement("li", { onClick: function () {
                        return editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }, className: itemClass("heading", { level: 2 }) },
                    React.createElement("span", { className: "dante-icon" }, h2())),
                React.createElement("li", { onClick: function () {
                        return editor.chain().focus().toggleHeading({ level: 3 }).run();
                    }, className: itemClass("heading", { level: 3 }) },
                    React.createElement("span", { className: "dante-icon" }, h3())),
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleBulletList().run(); }, className: itemClass("bulletList") },
                    React.createElement("span", { className: "dante-icon" }, insertunorderedlist())),
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleOrderedList().run(); }, className: itemClass("orderedList") },
                    React.createElement("span", { className: "dante-icon" }, insertorderedlist())),
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleCodeBlock().run(); }, className: itemClass("codeBlock") },
                    React.createElement("span", { className: "dante-icon" }, code())),
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleBlockquote().run(); }, className: itemClass("blockquote") },
                    React.createElement("span", { className: "dante-icon" }, blockquote())))));
    }
    function renderImageTooptip() {
        if (!editor.isEditable)
            return;
        if (!editor.isActive("ImageBlock"))
            return null;
        return (React.createElement(ImageTooltip, { item: {}, handleClick: function (e) {
                var _a, _b, _c;
                //console.log("AAA", e);
                editor.commands.updateAttributes("ImageBlock", { direction: e });
                var pos = (_c = (_b = (_a = editor === null || editor === void 0 ? void 0 : editor.view) === null || _a === void 0 ? void 0 : _a.lastSelectedViewDesc) === null || _b === void 0 ? void 0 : _b.spec) === null || _c === void 0 ? void 0 : _c.getPos();
                //console.log("POS", pos);
                pos && editor.commands.setNodeSelection(pos);
            } }));
    }
    return (React.createElement(React.Fragment, null,
        fixed && renderMenu(),
        !fixed && (React.createElement(BubbleMenu, { editor: editor },
            renderMenu(),
            renderImageTooptip()))));
}

var ReactMediaRecorder = /*#__PURE__*/function (_Component) {
  _inherits(ReactMediaRecorder, _Component);
  var _super = _createSuper(ReactMediaRecorder);
  function ReactMediaRecorder(props) {
    var _this;
    _classCallCheck(this, ReactMediaRecorder);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "stopStream", function () {
      _this.mediaRecorder = null;
      _this.mediaChunk = [];
      if (_this.stream) {
        _this.stream.stop();
        _this.stream = null;
      }
    });
    _this.state = {
      asked: false,
      permission: false,
      available: false,
      recording: false,
      paused: false
    };
    _this.stream = null;
    _this.mediaRecorder = null;
    _this.mediaChunk = [];
    _this.start = _this.start.bind(_assertThisInitialized(_this));
    _this.stop = _this.stop.bind(_assertThisInitialized(_this));
    _this.pause = _this.pause.bind(_assertThisInitialized(_this));
    _this.resume = _this.resume.bind(_assertThisInitialized(_this));
    _this.initMediaRecorder = _this.initMediaRecorder.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ReactMediaRecorder, [{
    key: "init",
    value: function init() {
      if (typeof window === "undefined") return;
      if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
        console.warn("getUserMedia() must be run from a secure origin: https or localhost.\nChanging protocol to https.");
      }
      if (!navigator.mediaDevices && !navigator.getUserMedia) {
        console.warn("Your browser doesn't support navigator.mediaDevices.getUserMedia and navigator.getUserMedia.");
      }
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

      // stop hack
      // from http://stackoverflow.com/questions/11642926/stop-close-webcam-which-is-opened-by-navigator-getusermedia
      var MediaStream = window.MediaStream || window.webkitMediaStream;
      if (typeof MediaStream !== "undefined" && !("stop" in MediaStream.prototype)) {
        MediaStream.prototype.stop = function () {
          this.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          this.getVideoTracks().forEach(function (track) {
            track.stop();
          });
        };
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.init();
      this.props.width;
      this.props.height;
      var constraints = this.props.constraints;
      var handleSuccess = function handleSuccess(stream, cb) {
        _this2.stream = stream;
        _this2.mediaChunk = [];
        _this2.setState({
          permission: true,
          asked: true,
          recording: false
        });
        _this2.props.onGranted();
        _this2.initMediaRecorder();
        cb();
      };
      var handleFailed = function handleFailed(err) {
        _this2.setState({
          asked: false
        });
        _this2.props.onDenied(err);
      };
      this.askPermission = function (cb) {
        if (navigator.mediaDevices) {
          navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            return handleSuccess(stream, cb);
          })["catch"](handleFailed);
        } else if (navigator.getUserMedia) {
          navigator.getUserMedia(constraints, handleSuccess, handleFailed);
        } else {
          var errMessage = "Browser doesn't support UserMedia API. Please try with another browser.";
          console.warn(errMessage);
          _this2.props.onError(new Error(errMessage));
        }
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopStream();
    }
  }, {
    key: "initMediaRecorder",
    value: function initMediaRecorder() {
      var _this3 = this;
      try {
        var options = {};
        var types = ["video/webm;codecs=vp8", "video/webm", ""];
        if (this.props.mimeType) types.unshift(this.props.mimeType);
        for (var i = 0; i < types.length; i++) {
          var type = types[i];
          if (MediaRecorder.isTypeSupported(type)) {
            options.mimeType = type;
            break;
          }
          console.warn("".concat(type, " is not supported on your browser."));
        }
        var mediaRecorder = new MediaRecorder(this.stream, options);
        mediaRecorder.ondataavailable = function (ev) {
          if (ev.data && ev.data.size > 0) {
            _this3.mediaChunk.push(ev.data);
          }
        };
        this.mediaRecorder = mediaRecorder;
        this.setState({
          available: true
        });
      } catch (err) {
        //console.log(err);
        console.error("Failed to initialize MediaRecorder.", err);
        this.setState({
          available: false
        });
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this4 = this;
      this.askPermission(function () {
        if (!_this4.state.available) return;
        _this4.mediaChunk = [];
        _this4.mediaRecorder.start(_this4.props.timeSlice);
        _this4.setState({
          recording: true
        });
        _this4.props.onStart(_this4.stream);
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      if (!this.state.recording) return;
      if (this.mediaRecorder.state === "inactive") return;
      this.mediaRecorder.stop();
      this.setState({
        paused: true
      });
      this.props.onPause();
    }
  }, {
    key: "resume",
    value: function resume() {
      if (!this.state.recording) return;
      this.initMediaRecorder();
      this.mediaRecorder.start(this.props.timeSlice);
      this.setState({
        paused: false
      });
      this.props.onResume(this.stream);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.state.available) return;
      if (this.mediaRecorder.state === "inactive") return;
      this.mediaRecorder.stop();
      this.setState({
        recording: false
      });
      var blob = new Blob(this.mediaChunk, {
        type: "video/webm"
      });
      this.props.onStop(blob);
      this.stopStream();
    }
  }, {
    key: "render",
    value: function render() {
      this.state.asked;
      this.state.permission;
      this.state.recording;
      this.state.available;
      return /*#__PURE__*/React.createElement("div", {
        className: this.props.className
      }, this.props.render({
        start: this.start,
        stop: this.stop,
        pause: this.pause,
        resume: this.resume
      }));
    }
  }]);
  return ReactMediaRecorder;
}(Component);
ReactMediaRecorder.propTypes = {
  constraints: PropTypes.object,
  className: PropTypes.string,
  timeSlice: PropTypes.number,
  mimeType: PropTypes.string,
  render: PropTypes.func,
  onGranted: PropTypes.func,
  onDenied: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onPause: PropTypes.func,
  onResume: PropTypes.func,
  onError: PropTypes.func
};
ReactMediaRecorder.defaultProps = {
  constraints: {
    audio: true,
    video: true
  },
  className: "",
  timeSlice: 0,
  mimeType: "",
  render: function render() {},
  onGranted: function onGranted() {},
  onDenied: function onDenied() {},
  onStart: function onStart() {},
  onStop: function onStop() {},
  onPause: function onPause() {},
  onResume: function onResume() {},
  onError: function onError() {}
};

function VideoRecorderBlock(props) {
  //let file = null;
  var app = React.useRef();
  var mediaRecorder = React.useRef();
  var video = React.useRef();
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2);
    _React$useState2[0];
    var setGranted = _React$useState2[1];
  var _React$useState3 = React.useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    rejectedReason = _React$useState4[0],
    setRejectedReason = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    fileReady = _React$useState6[0],
    setFileReady = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    loading = _React$useState8[0],
    setLoading = _React$useState8[1];
  var _React$useState9 = React.useState(null),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    loadingProgress = _React$useState10[0],
    setLoadingProgress = _React$useState10[1];
  var _React$useState11 = React.useState(null),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    file = _React$useState12[0],
    setFile = _React$useState12[1];
  var _useCountdownTimer = useCountdownTimer({
      timer: props.extension.options.seconds_to_record,
      onExpire: function onExpire() {
        mediaRecorder.current && mediaRecorder.current.stop();
      }
    }),
    countdown = _useCountdownTimer.countdown,
    start = _useCountdownTimer.start,
    reset = _useCountdownTimer.reset,
    pause = _useCountdownTimer.pause,
    isRunning = _useCountdownTimer.isRunning;
  React.useEffect(function () {
    //video = app.current.querySelector('video');
    if (props.node.attrs.url) {
      setUrlToVideo(props.node.attrs.url);
      playMode();
    }
  }, []);
  React.useEffect(function () {
    if (!props.node.attrs.url || props.node.attrs.url === "") return;
    video.current.src = props.node.attrs.url;
  }, [props.node.attrs.url]);
  function handleGranted() {
    setGranted(true);
    console.log("Permission Granted!");
  }
  function handleDenied(err) {
    setRejectedReason(err.name);
    console.log("Permission Denied!", err);
  }

  /*React.useEffect(()=>{
    if(recording && secondsLeft === props.extension.seconds_to_record){
    }
  }, [recording, secondsLeft])*/

  function handleStart(stream) {
    setFileReady(false);
    setStreamToVideo(stream);
    console.log("Recording Started.");

    // max seconds to record video
    if (!props.extension.options.seconds_to_record) return;
    start();
  }
  function handleStop(blob) {
    reset();
    setFileReady(true);
    releaseStreamFromVideo();
    console.log("Recording Stopped.");
    setFile(blob);
    setStreamToVideo(blob);
    playMode();
  }
  function confirm() {
    downloadVideo(file);
  }
  function handlePause() {
    releaseStreamFromVideo();
    pause();
  }
  function handleResume(stream) {
    setStreamToVideo(stream);
    pause();
  }
  function handleError(err) {
    console.log(err);
  }
  function recordMode() {
    video.current.loop = false;
    video.current.controls = false;
    video.current.muted = true;
  }
  function playMode() {
    video.current.loop = false;
    video.current.controls = true;
    video.current.muted = true;
  }
  function setStreamToVideo(stream) {
    //let video = app.current.querySelector('video');
    recordMode();
    // is a mediastream
    try {
      video.current.srcObject = stream;
    } catch (error) {
      video.current.src = URL.createObjectURL(stream);
    }
  }
  function setUrlToVideo(url) {
    playMode();
    video.current.src = url;
  }
  function releaseStreamFromVideo() {
    video.current.src = "";
    video.current.srcObject = null;
  }
  function downloadVideo(blob) {
    //video.current.loop = true
    setStreamToVideo(blob);
    playMode();
    uploadFile(blob);
  }
  function formatData() {
    var formData = new FormData();
    //if (props.node.attrs.file) {
    if (file) {
      var formName = props.extension.options.upload_formName || 'file';
      formData.append(formName, file); //props.node.attrs.file);
      return formData;
    } else {
      // TODO: check this
      formData.append("url", props.node.attrs.src);
      return formData;
    }
  }
  function getUploadUrl() {
    var url = props.extension.options.upload_url;
    if (typeof url === "function") {
      return url();
    } else {
      return url;
    }
  }
  function getUploadHeaders() {
    return props.extension.options.upload_headers || {};
  }
  function stopLoader() {
    setLoading(false);
    setFileReady(false);
  }
  function uploadFile(blob) {
    var _this = this;
    // file = blob;
    setFile(blob);

    // custom upload handler
    if (props.extension.options.upload_handler) {
      return props.extension.options.upload_handler(formatData().get("file"), props, {
        uploadCompleted: uploadCompleted,
        updateProgressBar: updateProgressBar,
        uploadFailed: uploadFailed
      });
    }
    if (!props.extension.options.upload_url) {
      stopLoader();
      return;
    }
    setLoading(true);
    axios({
      method: "post",
      url: getUploadUrl(),
      headers: getUploadHeaders(),
      data: formatData(),
      onUploadProgress: function onUploadProgress(e) {
        return updateProgressBar(e);
      }
    }).then(function (result) {
      uploadCompleted(result.data.url);
      if (props.extension.options.upload_callback) {
        return props.extension.options.upload_callback(result, _this);
      }
    })["catch"](function (error) {
      uploadFailed();
      console.log("ERROR: got error uploading file ".concat(error));
      if (props.extension.options.upload_error_callback) {
        return props.extension.options.upload_error_callback(error, _this);
      }
    });
    return function (json_response) {
      return uploadCompleted(json_response.url);
    };
  }
  function uploadFailed() {
    //this.props.blockProps.removeLock()
    stopLoader();
  }
  function uploadCompleted(url) {
    props.updateAttributes({
      url: url
    });
    //this.setState({ url }, this.updateData)
    //this.props.blockProps.removeLock()
    stopLoader();
    setFile(null);
    setUrlToVideo(url);
  }
  function updateProgressBar(e) {
    var complete = loadingProgress;
    if (e.lengthComputable) {
      complete = e.loaded / e.total * 100;
      complete = complete != null ? complete : {
        complete: 0
      };
      setLoadingProgress(complete);
      return console.log("complete: ".concat(complete));
    }
  }
  function isReadOnly() {
    return !props.editor.isEditable;
  }
  return /*#__PURE__*/React.createElement(NodeViewWrapper, null, /*#__PURE__*/React.createElement(VideoContainer, {
    ref: app,
    "data-drag-handle": "true"
  }, /*#__PURE__*/React.createElement(ReactMediaRecorder, {
    ref: mediaRecorder,
    constraints: {
      audio: {
        sampleSize: 16,
        channelCount: 2,
        echoCancellation: true,
        noiseSuppression: false
      },
      video: true
    },
    timeSlice: 10,
    onGranted: handleGranted,
    onDenied: handleDenied,
    onStart: function onStart(stream) {
      return handleStart(stream);
    },
    onStop: handleStop,
    onPause: handlePause,
    onResume: handleResume,
    onError: handleError,
    render: function render(_ref) {
      var start = _ref.start,
        stop = _ref.stop;
        _ref.pause;
        _ref.resume;
      return /*#__PURE__*/React.createElement("div", null, !isReadOnly() && /*#__PURE__*/React.createElement(StatusBar, {
        contentEditable: false,
        loading: loading
      }, loading && /*#__PURE__*/React.createElement(Loader, {
        toggle: loading,
        progress: loadingProgress
      })), /*#__PURE__*/React.createElement(VideoBody, null, !isReadOnly() && /*#__PURE__*/React.createElement(EditorControls, {
        contentEditable: false
      }, /*#__PURE__*/React.createElement("div", {
        className: "controls-recording"
      }, !loading && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RecButton, {
        onClick: function onClick(e) {
          e.preventDefault();
          isRunning ? stop() : start();
        },
        disabled: isRunning,
        className: isRunning ? "recording" : ""
      }, isRunning ? "recording. (".concat(countdown / 1000, " seconds left)") : "press button to start recording", rejectedReason && /*#__PURE__*/React.createElement("span", null, rejectedReason)), /*#__PURE__*/React.createElement(SecondsLeft, null))), fileReady && !loading && /*#__PURE__*/React.createElement(Button, {
        onClick: function onClick(e) {
          e.preventDefault();
          confirm();
        }
      }, "confirm recording upload ?")), /*#__PURE__*/React.createElement(VideoPlayer, {
        autoPlay: true,
        muted: true,
        ref: video
      }), /*#__PURE__*/React.createElement(NodeViewContent, {
        as: "figcaption",
        className: "imageCaption"
      }, props.node.content.size === 0 && /*#__PURE__*/React.createElement("span", {
        className: "danteDefaultPlaceholder"
      }, "type a caption (optional)"))));
    }
  })));
}
function Loader(_ref2) {
  var toggle = _ref2.toggle,
    progress = _ref2.progress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, toggle && /*#__PURE__*/React.createElement("div", {
    className: "image-upoader-loader",
    style: {
      width: "100%",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", null, progress === 100 ? "processing video..." : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, "uploading video "), Math.round(progress), "%"))));
}
var VideoRecorderBlockConfig = function VideoRecorderBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    name: "VideoRecorderBlock",
    icon: videoRecorderIcon,
    tag: "recorded-video",
    component: VideoRecorderBlock,
    atom: false,
    attributes: {
      url: {
        "default": null
      },
      src: {
        "default": null
      },
      width: {
        "default": ""
      },
      height: {
        "default": ""
      },
      loading: {
        "default": false
      },
      loading_progress: {
        "default": 0
      },
      caption: {
        "default": "caption!"
      },
      direction: {
        "default": "center"
      },
      file: {
        "default": null
      }
    },
    wrapper_class: "graf graf--video",
    selected_class: "is-selected",
    selectedFn: function selectedFn(_block) {},
    /* handleEnterWithoutText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    },
    handleEnterWithText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(RichUtils.insertSoftNewline(editorState))
    //return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    }, */
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "image"
    },
    options: {
      upload_formName: "file",
      upload_handler: function upload_handler(file, ctx) {
        console.log("UPLOADED FILE", file, ctx);
      },
      /*upload_handler: (file, props, { uploadCompleted }) => {
        console.log("UPLOADED video");
        const url =
          "https://video.twimg.com/ext_tw_video/1388976569348235264/pu/vid/960x720/mCVk3dF_nGTgIZLX.mp4?tag=12";
        uploadCompleted(url);
      },*/
      seconds_to_record: 10000
    }
  };
  return Object.assign(config, options);
};

// import Dante from "./constants";
//export {DanteImagePopoverConfig}
//export {DanteAnchorPopoverConfig} //'./popovers/addButton'
//export {DanteInlineTooltipConfig}
//export {DanteTooltipConfig}
var defaultPlugins = [
    ImageBlockConfig(),
    CodeBlockConfig(),
    DividerBlockConfig(),
    EmbedBlockConfig(),
    PlaceholderBlockConfig(),
    VideoBlockConfig(),
    GiphyBlockConfig(),
    VideoRecorderBlockConfig(),
    SpeechToTextBlockConfig(),
];
//export { CardBlock, CardBlockConfig}
//export {DemoEditor}
// export default Dante;

var Tiptap = function (_a) {
    var bodyPlaceholder = _a.bodyPlaceholder, widgets = _a.widgets, extensions = _a.extensions, theme$1 = _a.theme, fixed = _a.fixed, content = _a.content, onUpdate = _a.onUpdate, readOnly = _a.readOnly;
    var editor = useEditor({
        extensions: pluginsConfig(),
        content: content || "null",
        editable: !readOnly,
        onUpdate: function (_a) {
            var editor = _a.editor;
            // The content has changed.
            // console.log("changed!", editor.getJSON());
            onUpdate && onUpdate(editor);
            //setLog(JSON.parse(JSON.stringify(editor.getJSON())))
        },
    });
    function basePlugins() {
        return [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                    HTMLAttributes: {
                        class: "graf graf--h",
                    },
                },
                paragraph: {
                    HTMLAttributes: {
                        class: "graf graf--p",
                    },
                },
                listItem: {
                    HTMLAttributes: {
                        class: "graf graf--li",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "graf graf--ol",
                    },
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: "graf code"
                    }
                },
                code: {
                    HTMLAttributes: {
                        class: "graf code"
                    }
                }
            }),
            //TextStyle,
            //Color,      
            Placeholder.configure({
                placeholder: bodyPlaceholder || "Write something …",
            }),
            TextStyle,
            Color,
            Focus,
            /*Link.extend({
              addNodeView() {
                return ReactNodeViewRenderer(CodeBlock);
              },
            }).configure({
              HTMLAttributes: {
                class: "markup--anchor",
              },
            }),*/
            CodeBlockLowlight.configure({
                lowlight: lowlight,
            }),
            //OrderedList,
            //ListItem,
            //TaskList,
            //TaskItem,
        ];
    }
    function optionalPlugins() {
        if (widgets)
            return widgets;
        return defaultPlugins;
    }
    function newPluginsConfig() {
        return optionalPlugins().map(function (o) { return extensionFactory(o); });
    }
    function pluginsConfig() {
        var newExtensions = extensions ? extensions : [];
        return basePlugins().concat(__spreadArray(__spreadArray([], newPluginsConfig(), true), newExtensions, true));
    }
    function isPopOverEnabledFor(a) {
        //console.log("ENABLED FOR ", editor.state.selection.$anchor.parent);
        var comp = editor === null || editor === void 0 ? void 0 : editor.state.selection.$anchor.parent;
        if (comp && comp.type.name === "paragraph")
            return true;
    }
    var resolvedTheme = theme$1 ? theme$1 : theme;
    return (React.createElement(ThemeProvider, { theme: resolvedTheme },
        React.createElement(EditorContainer, null,
            React.createElement(React.Fragment, null,
                editor && React.createElement(MenuBar, { fixed: fixed, editor: editor }),
                React.createElement(EditorContent, { editor: editor }),
                editor && !fixed &&
                    React.createElement(FloatingMenu, { editor: editor, tippyOptions: { duration: 100 } }, isPopOverEnabledFor() && (React.createElement("div", { style: { position: "absolute", top: -15, left: -60 } },
                        React.createElement(AddButton
                        //ref={sideBarControls}
                        , { 
                            //ref={sideBarControls}
                            fixed: fixed, position: {}, editor: editor, display: true , widgets: optionalPlugins() })))),
                fixed && editor && (React.createElement(AddButton
                //ref={sideBarControls}
                //position={bounds}
                , { 
                    //ref={sideBarControls}
                    //position={bounds}
                    fixed: fixed, editor: editor, position: { width: "100%" }, display: true , widgets: optionalPlugins() }))))));
};

export { Tiptap as default };
