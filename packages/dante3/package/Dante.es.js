import React, { useState, useEffect, Component, useRef } from 'react';
import { mergeAttributes, ReactNodeViewRenderer, BubbleMenu, NodeViewWrapper, NodeViewContent, useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import { lowlight } from 'lowlight/lib/core';
import { Extension, isNodeEmpty, Node, nodeInputRule } from '@tiptap/core';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';
import TextStyle from '@tiptap/extension-text-style';
import styled from '@emotion/styled';
import { math, lighten, opacify } from 'polished';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Focus from '@tiptap/extension-focus';
import { ThemeProvider } from '@emotion/react';
import { HexColorPicker } from 'react-colorful';
import axios from 'axios';
import mediumZoom from 'medium-zoom';
import PropTypes from 'prop-types';
import { useCountdownTimer } from 'use-countdown-timer';

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

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return _assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}

var Placeholder = Extension.create({
  name: "placeholder",
  addOptions: {
    emptyEditorClass: "is-editor-empty",
    emptyNodeClass: "is-empty",
    placeholder: "Write something …",
    showOnlyWhenEditable: true,
    showOnlyCurrent: true
  },
  addProseMirrorPlugins: function addProseMirrorPlugins() {
    var _this = this;
    return [new Plugin({
      props: {
        decorations: function decorations(_ref) {
          var doc = _ref.doc,
            selection = _ref.selection;
          var active = _this.editor.isEditable || !_this.options.showOnlyWhenEditable;
          var anchor = selection.anchor;
          var decorations = [];
          if (!active) {
            return;
          }
          doc.descendants(function (node, pos) {
            //console.log(anchor, pos, node.nodeSize)
            var hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
            var isEmpty = !node.isLeaf && isNodeEmpty(node);
            if ((hasAnchor || !_this.options.showOnlyCurrent) && isEmpty) {
              var classes = [_this.options.emptyNodeClass];
              if (_this.editor.isEmpty) {
                classes.push(_this.options.emptyEditorClass);
              }
              var decoration = Decoration.node(pos, pos + node.nodeSize, {
                "class": classes.join(" "),
                "data-placeholder": typeof _this.options.placeholder === "function" ? _this.options.placeholder({
                  editor: _this.editor,
                  node: node
                }) : _this.options.placeholder
              });
              decorations.push(decoration);
            }
            return false;
          });
          return DecorationSet.create(doc, decorations);
        }
      }
    })];
  }
});

var Color = Extension.create({
  name: "color",
  addOptions: {
    types: ["textStyle"]
  },
  addGlobalAttributes: function addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        color: {
          "default": null,
          renderHTML: function renderHTML(attributes) {
            if (!attributes.color) {
              return {};
            }
            return {
              style: "color: ".concat(attributes.color)
            };
          },
          parseHTML: function parseHTML(element) {
            return {
              color: element.style.color.replace(/['"]+/g, "")
            };
          }
        }
      }
    }];
  },
  addCommands: function addCommands() {
    return {
      setColor: function setColor(color) {
        return function (_ref) {
          var chain = _ref.chain;
          return chain().setMark("textStyle", {
            color: color
          }).run();
        };
      },
      unsetColor: function unsetColor() {
        return function (_ref2) {
          var chain = _ref2.chain;
          return chain().setMark("textStyle", {
            color: null
          }).removeEmptyTextStyle().run();
        };
      }
    };
  }
});

var EditorContainer = styled.div(templateObject_1$b || (templateObject_1$b = __makeTemplateObject(["\n  //@import url(\"//fonts.googleapis.com/css?family=Merriweather:400,700,400italic,700italic|Open+Sans:400,300,700,800\");\n\n  //@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,800&display=swap');\n\n  font-family: ", " !important;\n  letter-spacing: 0.01rem;\n  font-weight: 400;\n  font-style: normal;\n  font-size: ", ";\n  line-height: ", ";\n  color: ", ";\n  background-color: ", ";\n\n  text-rendering: optimizeLegibility;\n\n  .ProseMirror {\n    &:focus-visible {\n      outline-color: transparent;\n      outline-width: 0px;\n    }\n  }\n\n  @media (max-width: 500px) {\n    font-size: ", ";\n    line-height: ", ";\n  }\n\n  .public-DraftEditorPlaceholder-root {\n    color: ", ";\n    position: absolute;\n    z-index: 0;\n    font-size: ", ";\n    background-color: transparent;\n  }\n\n  .graf--h2,\n  .graf--h3,\n  .graf--h4,\n  .graf--h5,\n  .graf--h6,\n  .graf--h7,\n  .postList,\n  .graf--hr,\n  .graf--figure,\n  .graf--blockquote,\n  .graf--pullquote,\n  .graf--p,\n  .graf--pre {\n    margin: 0;\n    //position:relative;\n  }\n\n  li {\n    counter-reset: ol0;\n    margin-left: 1.5em;\n  }\n\n  ul {\n    list-style-type: disc;\n    position: relative;\n  }\n\n  ol {\n    list-style-type: decimal;\n    position: relative;\n  }\n\n  li {\n    .graf--p {\n      margin: 0px;\n    }\n  }\n\n  ul[data-type=\"taskList\"] {\n    list-style: none;\n    padding: 0;\n\n    li {\n      display: flex;\n      align-items: center;\n\n      > label {\n        flex: 0 0 auto;\n        margin-right: 0.5rem;\n      }\n    }\n  }\n\n  .graf--code {\n    position: relative;\n    overflow: visible;\n\n    background: ", ";\n    font-family: ", ";\n    font-size: ", ";\n    margin-bottom: 20px;\n    padding: 20px;\n    white-space: pre-wrap;\n    color: ", ";\n\n    .dante-code-syntax {\n      color: ", ";\n      position: absolute;\n      top: 4px;\n      right: 4px;\n      width: 165px;\n    }\n  }\n\n  .graf--pre {\n    background: #000 !important;\n    font-family: ", ";\n    font-size: 16px;\n    margin-bottom: 20px;\n    padding: 20px;\n    white-space: pre-wrap;\n    color: #fff !important;\n  }\n\n  .postList {\n    margin-bottom: 30px;\n  }\n\n  .graf--p {\n    code {\n      font-family: ", ";\n      background-color: #faf594;\n      color: ", ";\n      -webkit-box-decoration-break: clone;\n      box-decoration-break: clone;\n      font-weight: 200;\n      padding: 3px;\n    }\n  }\n\n  .graf--p,\n  .graf--blockquote,\n  .graf--pullquote {\n    margin-bottom: 30px;\n  }\n\n  .graf--code {\n    line-height: 1em;\n  }\n\n  .graf--p.dante--spinner {\n    position: relative;\n  }\n\n  .graf--hr {\n    hr {\n      border: 1px solid #ccc;\n      margin: 26px;\n    }\n  }\n\n  .public-DraftStyleDefault-pre {\n    overflow: inherit;\n  }\n\n  h1.graf--h {\n    font-family: ", ";\n    font-size: ", ";\n    font-style: normal;\n    font-weight: 800;\n    letter-spacing: -0.04em;\n    line-height: 1;\n    margin-bottom: 0.4em;\n    margin-left: -3px;\n    margin-top: 40px;\n    padding-top: 0;\n  }\n\n  h2.graf--h {\n    font-family: ", ";\n    font-size: ", ";\n    font-style: normal;\n    font-weight: 600;\n    letter-spacing: -0.04em;\n    line-height: 1;\n    margin-bottom: 0.4em;\n    margin-left: -3px;\n    margin-top: 40px;\n    padding-top: 0;\n  }\n\n  h3.graf--h {\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 700;\n    font-style: normal;\n    font-size: ", ";\n    margin-left: -1.8px;\n    line-height: 1.2;\n    margin-top: 40px;\n    margin-bottom: 0.7em;\n    font-weight: 300;\n  }\n\n  h4.graf--h {\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 300;\n    font-style: normal;\n    font-size: ", ";\n    margin-left: -1.5px;\n    line-height: 1.2;\n    color: ", ";\n    margin-top: 40px;\n    margin-bottom: 0.6em;\n  }\n\n  @media (max-width: 500px) {\n    h1.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n\n    h2.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n\n    h3.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n  }\n\n  @media (max-width: 500px) {\n    .graf--h2 {\n      font-size: 2.6em;\n    }\n    .graf--h3 {\n      font-size: 1.6em;\n    }\n    .graf--h4 {\n      font-size: 1.4em;\n    }\n  }\n\n  .section--first .graf--h2.graf--first,\n  .section--first .graf--h3.graf--first,\n  .section--first .graf--h4.graf--first {\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  h2.graf--h + h2.graf--h {\n    margin-top: -8px;\n  }\n\n  h2.graf--h + h3.graf--h,\n  h2.graf--h + h4.graf--h {\n    margin-top: -6px;\n  }\n\n  h3.graf--h3 + h4.graf--h4,\n  h4.graf--h4 + h2.graf--h2 {\n    margin-top: 2px;\n  }\n\n  h3.graf--h3 + h4.graf--h4,\n  h4.graf--h4 + h3.graf--h3 {\n    margin-top: -2px;\n  }\n\n  h2.graf--h2 + .postList,\n  h3.graf--h3 + .postList,\n  h4.graf--h4 + .postList {\n    margin-top: 10px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty,\n  h3.graf--h + .graf--p.graf--empty,\n  h4.graf--h + .graf--p.graf--empty {\n    margin-bottom: -7px;\n    margin-top: -7px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty + h1.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h1.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h1.graf--h {\n    margin-top: -5px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h2.graf--h + .graf--p.graf--empty + h4.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h4.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h4.graf--h {\n    margin-top: -8px;\n  }\n\n  .graf--blockquote,\n  blockquote {\n    font-family: ", ";\n    border-left: 3px solid rgba(0, 0, 0, 0.8);\n\n    font-style: italic;\n    font-weight: 400;\n    letter-spacing: 0.16px;\n    letter-spacing: 0.02rem;\n    margin-left: -12px;\n    padding-left: 15px;\n    margin-bottom: 25px;\n    //font-size: 1.2em;\n    line-height: 1.5em;\n    margin-top: 20px;\n  }\n  .graf--blockquote + .graf--blockquote {\n    margin-top: -30px;\n    padding-top: 30px;\n  }\n\n  .graf--pullquote {\n    line-height: 1.4;\n    text-align: center;\n    font-size: 3.2em;\n    margin: 48px -160px;\n    border: none;\n    padding: 0;\n    font-family: ", ";\n    letter-spacing: 0.01rem;\n    font-weight: 400;\n    font-style: italic;\n    -webkit-transition: margin 100ms;\n    transition: margin 100ms;\n  }\n\n  .graf--pre + .graf--pre {\n    margin-top: -20px;\n  }\n\n  .graf--figure {\n    box-sizing: border-box;\n    clear: both;\n    margin-bottom: 30px;\n    outline: medium none;\n    position: relative;\n\n    &.is-mediaFocused .graf-image,\n    &.is-mediaFocused iframe {\n      box-shadow: 0 0 0 3px #57ad68;\n    }\n  }\n\n  .graf--mixtapeEmbed {\n    a {\n      text-decoration: none;\n    }\n    &.is-mediaFocused {\n      box-shadow: 0 0 0 1px #57ad68;\n    }\n\n    .graf--media-embed-close {\n      position: absolute;\n      top: 1px;\n      display: inline-block;\n      font-size: 2em;\n      width: 20px;\n      right: 10px;\n      text-shadow: 0px 0px 0px white;\n    }\n\n    border-color: ", ";\n    border-radius: 5px;\n    border-style: solid;\n    border-width: 1px;\n    box-sizing: border-box;\n    //color: rgba(0, 0, 0, 0.6);\n    font-family: ", ";\n    font-size: 12px;\n    font-style: normal;\n    font-weight: 300;\n    letter-spacing: -0.02em;\n    margin-bottom: 40px;\n    margin-top: 40px;\n    max-height: 310px;\n    //max-width: 700px;\n    overflow: hidden;\n    padding: 30px;\n    position: relative;\n\n    .is-postEditMode iframe {\n      border: 3px solid rgba(255, 255, 255, 0);\n    }\n\n    .mixtapeImage {\n      background-position: center center;\n      background-repeat: no-repeat;\n      background-size: cover;\n      float: right;\n      height: 310px;\n      margin: -30px -30px 0 25px;\n      width: 310px;\n    }\n\n    .mixtapeImage--empty {\n      height: 0;\n      width: 0;\n    }\n\n    .markup--mixtapeEmbed-strong {\n      //color: #000;\n      display: block;\n      font-family: $dante-font-family-sans;\n      font-size: 30px;\n      font-style: normal;\n      font-weight: 300;\n      letter-spacing: -0.02em;\n      line-height: 1.2;\n      margin-bottom: 0px;\n    }\n\n    .markup--mixtapeEmbed-em {\n      display: block;\n      font-size: 16px;\n      font-style: normal;\n      margin-bottom: 10px;\n      max-height: 120px;\n      overflow: hidden;\n    }\n  }\n\n  .graf--h4 + .graf--figure,\n  .graf--h3 + .graf--figure,\n  .graf--h2 + .graf--figure {\n    margin-top: 15px;\n  }\n\n  .graf--first {\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  /*.graf--empty {\n    margin-bottom: -7px;\n    margin-top: -7px;\n  }*/\n\n  p[data-align=\"center\"],\n  .graf--h2[data-align=\"center\"],\n  .graf--h3[data-align=\"center\"],\n  .graf--h4[data-align=\"center\"],\n  .graf--blockquote[data-align=\"center\"] {\n    text-align: center;\n  }\n\n  .markup--anchor,\n  .graf--sectionCaption {\n    cursor: text;\n  }\n  .markup--anchor {\n    text-decoration: underline;\n    color: inherit;\n  }\n\n  .graf--divider {\n    margin-bottom: 30px;\n  }\n\n  .graf--divider span {\n    text-align: center;\n    width: 100%;\n    display: block;\n  }\n\n  .graf--divider span:before {\n    line-height: 1;\n    user-select: none;\n    font-weight: 400;\n    font-size: 25px;\n    letter-spacing: 18px;\n    content: \"...\";\n    display: inline-block;\n    margin-left: 0.6em;\n    position: relative;\n    color: ", ";\n    top: -3px;\n  }\n\n  .graf--layoutOutsetLeft {\n    margin-left: -160px;\n  }\n\n  .graf--layoutFillWidth {\n    margin-left: -200px;\n    margin-right: -200px;\n  }\n\n  .graf--layoutOutsetLeft {\n    width: 75%;\n  }\n  .graf--layoutInsetLeft,\n  .graf--layoutOutsetLeft {\n    float: left;\n    margin-right: 30px;\n    padding-top: 10px;\n    padding-bottom: 10px;\n  }\n\n  .imageCaption {\n    //top: 0;\n    text-align: center;\n    margin-top: 0;\n    font-family: ", ";\n    letter-spacing: 0;\n    font-weight: 400;\n    font-size: 13px;\n    line-height: 1.4;\n    color: ", ";\n    outline: 0;\n    z-index: 300;\n    margin-top: 10px;\n    //position: relative;\n\n    .danteDefaultPlaceholder {\n      margin-bottom: -18px !important;\n      display: block;\n    }\n  }\n\n  // FIGURE WRAPPER\n\n  .aspectRatioPlaceholder {\n    margin: 0 auto;\n    position: relative;\n    width: 100%;\n  }\n\n  .graf-image:before,\n  .iframeContainer:before {\n    .is-postEditMode & {\n      bottom: 0;\n      content: \"\";\n      left: 0;\n      position: absolute;\n      right: 0;\n      top: 0;\n      z-index: 500;\n    }\n  }\n\n  .aspectRatioPlaceholder.is-locked .graf-image,\n  .aspectRatioPlaceholder.is-locked .graf-imageAnchor {\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  .graf-image,\n  .graf-imageAnchor,\n  .iframeContainer > iframe,\n  .iframeContainer {\n    box-sizing: border-box;\n    display: block;\n    margin: auto;\n    max-width: 100%;\n  }\n\n  .aspectRatioPlaceholder {\n    .image-upoader-loader {\n      position: absolute;\n      bottom: 0px;\n      left: 0%;\n      background-color: #fff;\n      width: 100%;\n      /* height: 3px; */\n      text-align: center;\n      top: 0px;\n      vertical-align: text-bottom;\n      opacity: 0.7;\n      p {\n        line-height: 5px;\n        /* font-weight: 700; */\n        /* text-transform: uppercase; */\n        font-size: 14px;\n        margin-top: 49%;\n      }\n    }\n  }\n\n  div[contenteditable=\"false\"] {\n    .danteDefaultPlaceholder {\n      display: none;\n    }\n  }\n\n  div[contenteditable=\"false\"] {\n    a.markup--anchor {\n      cursor: pointer;\n    }\n  }\n\n  figcaption .public-DraftStyleDefault-block {\n    text-align: center;\n  }\n\n  @media (max-width: 1200px) {\n    .imageCaption,\n    .postField--outsetCenterImage > .imageCaption {\n      position: relative;\n      width: 100%;\n      text-align: center;\n      left: 0;\n      margin-top: 10px;\n    }\n  }\n\n  figure.graf--layoutOutsetLeft {\n    .imageCaption,\n    .postField--outsetCenterImage > .imageCaption {\n      position: relative;\n      width: 100%;\n      text-align: center;\n      left: 0;\n      margin-top: 10px;\n    }\n  }\n\n  figure.is-defaultValue .imageCaption,\n  .graf--sectionCaption.is-defaultValue {\n    display: none;\n  }\n\n  .graf--figure.is-mediaFocused .imageCaption,\n  .graf--figure.is-defaultValue.is-selected .imageCaption,\n  section.is-mediaFocused .graf--sectionCaption,\n  .graf--sectionCaption.is-defaultValue.is-selected {\n    display: block;\n  }\n\n  .ProseMirror .empty-node::before {\n    position: absolute;\n    color: #aaa;\n    cursor: text;\n  }\n\n  .ProseMirror .empty-node:hover::before {\n    color: #777;\n  }\n\n  .ProseMirror h1.empty-node::before {\n    content: \"Title\";\n  }\n\n  /*.ProseMirror p.empty-node:first-of-type::before {\n    content: 'Contents';\n  }*/\n\n  /* Placeholder (at the top) */\n  .ProseMirror p.is-editor-empty:first-of-type::before {\n    content: attr(data-placeholder);\n    float: left;\n    color: #ced4da;\n    pointer-events: none;\n    height: 0;\n  }\n\n  .ProseMirror .is-node-empty:first-of-type::before {\n    content: attr(data-placeholder);\n    float: left;\n    color: #ced4da;\n    pointer-events: none;\n    height: 0;\n  }\n\n  /* Give a remote user a caret */\n  .collaboration-cursor__caret {\n    position: relative;\n    margin-left: -1px;\n    margin-right: -1px;\n    border-left: 1px solid #0d0d0d;\n    border-right: 1px solid #0d0d0d;\n    word-break: normal;\n    pointer-events: none;\n  }\n\n  /* Render the username above the caret */\n  .collaboration-cursor__label {\n    position: absolute;\n    top: -1.4em;\n    left: -1px;\n    font-size: 12px;\n    font-style: normal;\n    font-weight: 600;\n    line-height: normal;\n    user-select: none;\n    color: #0d0d0d;\n    padding: 0.1rem 0.3rem;\n    border-radius: 3px 3px 3px 0;\n    white-space: nowrap;\n  }\n"], ["\n  //@import url(\"//fonts.googleapis.com/css?family=Merriweather:400,700,400italic,700italic|Open+Sans:400,300,700,800\");\n\n  //@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,800&display=swap');\n\n  font-family: ", " !important;\n  letter-spacing: 0.01rem;\n  font-weight: 400;\n  font-style: normal;\n  font-size: ", ";\n  line-height: ", ";\n  color: ", ";\n  background-color: ", ";\n\n  text-rendering: optimizeLegibility;\n\n  .ProseMirror {\n    &:focus-visible {\n      outline-color: transparent;\n      outline-width: 0px;\n    }\n  }\n\n  @media (max-width: 500px) {\n    font-size: ", ";\n    line-height: ", ";\n  }\n\n  .public-DraftEditorPlaceholder-root {\n    color: ", ";\n    position: absolute;\n    z-index: 0;\n    font-size: ", ";\n    background-color: transparent;\n  }\n\n  .graf--h2,\n  .graf--h3,\n  .graf--h4,\n  .graf--h5,\n  .graf--h6,\n  .graf--h7,\n  .postList,\n  .graf--hr,\n  .graf--figure,\n  .graf--blockquote,\n  .graf--pullquote,\n  .graf--p,\n  .graf--pre {\n    margin: 0;\n    //position:relative;\n  }\n\n  li {\n    counter-reset: ol0;\n    margin-left: 1.5em;\n  }\n\n  ul {\n    list-style-type: disc;\n    position: relative;\n  }\n\n  ol {\n    list-style-type: decimal;\n    position: relative;\n  }\n\n  li {\n    .graf--p {\n      margin: 0px;\n    }\n  }\n\n  ul[data-type=\"taskList\"] {\n    list-style: none;\n    padding: 0;\n\n    li {\n      display: flex;\n      align-items: center;\n\n      > label {\n        flex: 0 0 auto;\n        margin-right: 0.5rem;\n      }\n    }\n  }\n\n  .graf--code {\n    position: relative;\n    overflow: visible;\n\n    background: ", ";\n    font-family: ", ";\n    font-size: ", ";\n    margin-bottom: 20px;\n    padding: 20px;\n    white-space: pre-wrap;\n    color: ", ";\n\n    .dante-code-syntax {\n      color: ", ";\n      position: absolute;\n      top: 4px;\n      right: 4px;\n      width: 165px;\n    }\n  }\n\n  .graf--pre {\n    background: #000 !important;\n    font-family: ", ";\n    font-size: 16px;\n    margin-bottom: 20px;\n    padding: 20px;\n    white-space: pre-wrap;\n    color: #fff !important;\n  }\n\n  .postList {\n    margin-bottom: 30px;\n  }\n\n  .graf--p {\n    code {\n      font-family: ", ";\n      background-color: #faf594;\n      color: ", ";\n      -webkit-box-decoration-break: clone;\n      box-decoration-break: clone;\n      font-weight: 200;\n      padding: 3px;\n    }\n  }\n\n  .graf--p,\n  .graf--blockquote,\n  .graf--pullquote {\n    margin-bottom: 30px;\n  }\n\n  .graf--code {\n    line-height: 1em;\n  }\n\n  .graf--p.dante--spinner {\n    position: relative;\n  }\n\n  .graf--hr {\n    hr {\n      border: 1px solid #ccc;\n      margin: 26px;\n    }\n  }\n\n  .public-DraftStyleDefault-pre {\n    overflow: inherit;\n  }\n\n  h1.graf--h {\n    font-family: ", ";\n    font-size: ", ";\n    font-style: normal;\n    font-weight: 800;\n    letter-spacing: -0.04em;\n    line-height: 1;\n    margin-bottom: 0.4em;\n    margin-left: -3px;\n    margin-top: 40px;\n    padding-top: 0;\n  }\n\n  h2.graf--h {\n    font-family: ", ";\n    font-size: ", ";\n    font-style: normal;\n    font-weight: 600;\n    letter-spacing: -0.04em;\n    line-height: 1;\n    margin-bottom: 0.4em;\n    margin-left: -3px;\n    margin-top: 40px;\n    padding-top: 0;\n  }\n\n  h3.graf--h {\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 700;\n    font-style: normal;\n    font-size: ", ";\n    margin-left: -1.8px;\n    line-height: 1.2;\n    margin-top: 40px;\n    margin-bottom: 0.7em;\n    font-weight: 300;\n  }\n\n  h4.graf--h {\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 300;\n    font-style: normal;\n    font-size: ", ";\n    margin-left: -1.5px;\n    line-height: 1.2;\n    color: ", ";\n    margin-top: 40px;\n    margin-bottom: 0.6em;\n  }\n\n  @media (max-width: 500px) {\n    h1.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n\n    h2.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n\n    h3.graf--h {\n      margin-top: 10px;\n      font-size: ", ";\n      line-height: ", ";\n    }\n  }\n\n  @media (max-width: 500px) {\n    .graf--h2 {\n      font-size: 2.6em;\n    }\n    .graf--h3 {\n      font-size: 1.6em;\n    }\n    .graf--h4 {\n      font-size: 1.4em;\n    }\n  }\n\n  .section--first .graf--h2.graf--first,\n  .section--first .graf--h3.graf--first,\n  .section--first .graf--h4.graf--first {\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  h2.graf--h + h2.graf--h {\n    margin-top: -8px;\n  }\n\n  h2.graf--h + h3.graf--h,\n  h2.graf--h + h4.graf--h {\n    margin-top: -6px;\n  }\n\n  h3.graf--h3 + h4.graf--h4,\n  h4.graf--h4 + h2.graf--h2 {\n    margin-top: 2px;\n  }\n\n  h3.graf--h3 + h4.graf--h4,\n  h4.graf--h4 + h3.graf--h3 {\n    margin-top: -2px;\n  }\n\n  h2.graf--h2 + .postList,\n  h3.graf--h3 + .postList,\n  h4.graf--h4 + .postList {\n    margin-top: 10px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty,\n  h3.graf--h + .graf--p.graf--empty,\n  h4.graf--h + .graf--p.graf--empty {\n    margin-bottom: -7px;\n    margin-top: -7px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty + h1.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h1.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h1.graf--h {\n    margin-top: -5px;\n  }\n\n  h2.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h3.graf--h,\n  h2.graf--h + .graf--p.graf--empty + h4.graf--h,\n  h3.graf--h + .graf--p.graf--empty + h4.graf--h,\n  h4.graf--h + .graf--p.graf--empty + h4.graf--h {\n    margin-top: -8px;\n  }\n\n  .graf--blockquote,\n  blockquote {\n    font-family: ", ";\n    border-left: 3px solid rgba(0, 0, 0, 0.8);\n\n    font-style: italic;\n    font-weight: 400;\n    letter-spacing: 0.16px;\n    letter-spacing: 0.02rem;\n    margin-left: -12px;\n    padding-left: 15px;\n    margin-bottom: 25px;\n    //font-size: 1.2em;\n    line-height: 1.5em;\n    margin-top: 20px;\n  }\n  .graf--blockquote + .graf--blockquote {\n    margin-top: -30px;\n    padding-top: 30px;\n  }\n\n  .graf--pullquote {\n    line-height: 1.4;\n    text-align: center;\n    font-size: 3.2em;\n    margin: 48px -160px;\n    border: none;\n    padding: 0;\n    font-family: ", ";\n    letter-spacing: 0.01rem;\n    font-weight: 400;\n    font-style: italic;\n    -webkit-transition: margin 100ms;\n    transition: margin 100ms;\n  }\n\n  .graf--pre + .graf--pre {\n    margin-top: -20px;\n  }\n\n  .graf--figure {\n    box-sizing: border-box;\n    clear: both;\n    margin-bottom: 30px;\n    outline: medium none;\n    position: relative;\n\n    &.is-mediaFocused .graf-image,\n    &.is-mediaFocused iframe {\n      box-shadow: 0 0 0 3px #57ad68;\n    }\n  }\n\n  .graf--mixtapeEmbed {\n    a {\n      text-decoration: none;\n    }\n    &.is-mediaFocused {\n      box-shadow: 0 0 0 1px #57ad68;\n    }\n\n    .graf--media-embed-close {\n      position: absolute;\n      top: 1px;\n      display: inline-block;\n      font-size: 2em;\n      width: 20px;\n      right: 10px;\n      text-shadow: 0px 0px 0px white;\n    }\n\n    border-color: ", ";\n    border-radius: 5px;\n    border-style: solid;\n    border-width: 1px;\n    box-sizing: border-box;\n    //color: rgba(0, 0, 0, 0.6);\n    font-family: ", ";\n    font-size: 12px;\n    font-style: normal;\n    font-weight: 300;\n    letter-spacing: -0.02em;\n    margin-bottom: 40px;\n    margin-top: 40px;\n    max-height: 310px;\n    //max-width: 700px;\n    overflow: hidden;\n    padding: 30px;\n    position: relative;\n\n    .is-postEditMode iframe {\n      border: 3px solid rgba(255, 255, 255, 0);\n    }\n\n    .mixtapeImage {\n      background-position: center center;\n      background-repeat: no-repeat;\n      background-size: cover;\n      float: right;\n      height: 310px;\n      margin: -30px -30px 0 25px;\n      width: 310px;\n    }\n\n    .mixtapeImage--empty {\n      height: 0;\n      width: 0;\n    }\n\n    .markup--mixtapeEmbed-strong {\n      //color: #000;\n      display: block;\n      font-family: $dante-font-family-sans;\n      font-size: 30px;\n      font-style: normal;\n      font-weight: 300;\n      letter-spacing: -0.02em;\n      line-height: 1.2;\n      margin-bottom: 0px;\n    }\n\n    .markup--mixtapeEmbed-em {\n      display: block;\n      font-size: 16px;\n      font-style: normal;\n      margin-bottom: 10px;\n      max-height: 120px;\n      overflow: hidden;\n    }\n  }\n\n  .graf--h4 + .graf--figure,\n  .graf--h3 + .graf--figure,\n  .graf--h2 + .graf--figure {\n    margin-top: 15px;\n  }\n\n  .graf--first {\n    margin-top: 0;\n    padding-top: 0;\n  }\n\n  /*.graf--empty {\n    margin-bottom: -7px;\n    margin-top: -7px;\n  }*/\n\n  p[data-align=\"center\"],\n  .graf--h2[data-align=\"center\"],\n  .graf--h3[data-align=\"center\"],\n  .graf--h4[data-align=\"center\"],\n  .graf--blockquote[data-align=\"center\"] {\n    text-align: center;\n  }\n\n  .markup--anchor,\n  .graf--sectionCaption {\n    cursor: text;\n  }\n  .markup--anchor {\n    text-decoration: underline;\n    color: inherit;\n  }\n\n  .graf--divider {\n    margin-bottom: 30px;\n  }\n\n  .graf--divider span {\n    text-align: center;\n    width: 100%;\n    display: block;\n  }\n\n  .graf--divider span:before {\n    line-height: 1;\n    user-select: none;\n    font-weight: 400;\n    font-size: 25px;\n    letter-spacing: 18px;\n    content: \"...\";\n    display: inline-block;\n    margin-left: 0.6em;\n    position: relative;\n    color: ", ";\n    top: -3px;\n  }\n\n  .graf--layoutOutsetLeft {\n    margin-left: -160px;\n  }\n\n  .graf--layoutFillWidth {\n    margin-left: -200px;\n    margin-right: -200px;\n  }\n\n  .graf--layoutOutsetLeft {\n    width: 75%;\n  }\n  .graf--layoutInsetLeft,\n  .graf--layoutOutsetLeft {\n    float: left;\n    margin-right: 30px;\n    padding-top: 10px;\n    padding-bottom: 10px;\n  }\n\n  .imageCaption {\n    //top: 0;\n    text-align: center;\n    margin-top: 0;\n    font-family: ", ";\n    letter-spacing: 0;\n    font-weight: 400;\n    font-size: 13px;\n    line-height: 1.4;\n    color: ", ";\n    outline: 0;\n    z-index: 300;\n    margin-top: 10px;\n    //position: relative;\n\n    .danteDefaultPlaceholder {\n      margin-bottom: -18px !important;\n      display: block;\n    }\n  }\n\n  // FIGURE WRAPPER\n\n  .aspectRatioPlaceholder {\n    margin: 0 auto;\n    position: relative;\n    width: 100%;\n  }\n\n  .graf-image:before,\n  .iframeContainer:before {\n    .is-postEditMode & {\n      bottom: 0;\n      content: \"\";\n      left: 0;\n      position: absolute;\n      right: 0;\n      top: 0;\n      z-index: 500;\n    }\n  }\n\n  .aspectRatioPlaceholder.is-locked .graf-image,\n  .aspectRatioPlaceholder.is-locked .graf-imageAnchor {\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  .graf-image,\n  .graf-imageAnchor,\n  .iframeContainer > iframe,\n  .iframeContainer {\n    box-sizing: border-box;\n    display: block;\n    margin: auto;\n    max-width: 100%;\n  }\n\n  .aspectRatioPlaceholder {\n    .image-upoader-loader {\n      position: absolute;\n      bottom: 0px;\n      left: 0%;\n      background-color: #fff;\n      width: 100%;\n      /* height: 3px; */\n      text-align: center;\n      top: 0px;\n      vertical-align: text-bottom;\n      opacity: 0.7;\n      p {\n        line-height: 5px;\n        /* font-weight: 700; */\n        /* text-transform: uppercase; */\n        font-size: 14px;\n        margin-top: 49%;\n      }\n    }\n  }\n\n  div[contenteditable=\"false\"] {\n    .danteDefaultPlaceholder {\n      display: none;\n    }\n  }\n\n  div[contenteditable=\"false\"] {\n    a.markup--anchor {\n      cursor: pointer;\n    }\n  }\n\n  figcaption .public-DraftStyleDefault-block {\n    text-align: center;\n  }\n\n  @media (max-width: 1200px) {\n    .imageCaption,\n    .postField--outsetCenterImage > .imageCaption {\n      position: relative;\n      width: 100%;\n      text-align: center;\n      left: 0;\n      margin-top: 10px;\n    }\n  }\n\n  figure.graf--layoutOutsetLeft {\n    .imageCaption,\n    .postField--outsetCenterImage > .imageCaption {\n      position: relative;\n      width: 100%;\n      text-align: center;\n      left: 0;\n      margin-top: 10px;\n    }\n  }\n\n  figure.is-defaultValue .imageCaption,\n  .graf--sectionCaption.is-defaultValue {\n    display: none;\n  }\n\n  .graf--figure.is-mediaFocused .imageCaption,\n  .graf--figure.is-defaultValue.is-selected .imageCaption,\n  section.is-mediaFocused .graf--sectionCaption,\n  .graf--sectionCaption.is-defaultValue.is-selected {\n    display: block;\n  }\n\n  .ProseMirror .empty-node::before {\n    position: absolute;\n    color: #aaa;\n    cursor: text;\n  }\n\n  .ProseMirror .empty-node:hover::before {\n    color: #777;\n  }\n\n  .ProseMirror h1.empty-node::before {\n    content: \"Title\";\n  }\n\n  /*.ProseMirror p.empty-node:first-of-type::before {\n    content: 'Contents';\n  }*/\n\n  /* Placeholder (at the top) */\n  .ProseMirror p.is-editor-empty:first-of-type::before {\n    content: attr(data-placeholder);\n    float: left;\n    color: #ced4da;\n    pointer-events: none;\n    height: 0;\n  }\n\n  .ProseMirror .is-node-empty:first-of-type::before {\n    content: attr(data-placeholder);\n    float: left;\n    color: #ced4da;\n    pointer-events: none;\n    height: 0;\n  }\n\n  /* Give a remote user a caret */\n  .collaboration-cursor__caret {\n    position: relative;\n    margin-left: -1px;\n    margin-right: -1px;\n    border-left: 1px solid #0d0d0d;\n    border-right: 1px solid #0d0d0d;\n    word-break: normal;\n    pointer-events: none;\n  }\n\n  /* Render the username above the caret */\n  .collaboration-cursor__label {\n    position: absolute;\n    top: -1.4em;\n    left: -1px;\n    font-size: 12px;\n    font-style: normal;\n    font-weight: 600;\n    line-height: normal;\n    user-select: none;\n    color: #0d0d0d;\n    padding: 0.1rem 0.3rem;\n    border-radius: 3px 3px 3px 0;\n    white-space: nowrap;\n  }\n"])), function (props) { return props.theme.dante_font_family_serif; }, function (props) { return props.theme.dante_editor_font_size; }, function (props) { return props.theme.dante_editor_line_height; }, function (props) { return props.theme.dante_text_color; }, function (props) { return props.theme.dante_bg_color; }, function (props) {
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
var InlinetooltipWrapper = styled.div(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject(["\n  // BASE\n  position: absolute;\n  z-index: 10;\n  width: ", ";\n  height: ", ";\n  -webkit-transition: opacity 100ms, width 0 linear 250ms;\n  transition: opacity 100ms, width 0 linear 250ms;\n  padding: 0;\n  font-size: 0;\n\n  opacity: 0;\n  pointer-events: none;\n\n  &.is-active {\n    opacity: 1;\n    pointer-events: auto;\n  }\n  &.is-scaled {\n    -webkit-transition-delay: 0;\n    transition-delay: 0;\n    width: auto;\n\n    .control {\n            -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n       -webkit-transform: rotate(45deg) !important;\n           -ms-transform: rotate(45deg) !important;\n               transform: rotate(45deg) !important;\n            border-color: ", ";\n                   color: ", ";\n    }\n\n    .scale {\n       -webkit-transform: scale(1) !important;\n           -ms-transform: scale(1) !important;\n               transform: scale(1) !important;\n      -webkit-transition: -webkit-", ", ", " !important;\n              transition: ", ", ", " !important;\n    }\n\n  }\n\n  // MENU\n  .inlineTooltip-menu {\n    display: inline-block;\n    margin-left: ", ";\n    svg path{\n      fill: ", ";\n    }\n  }\n\n  .inlineTooltip-menu-fixed {\n    display: inline-block;\n    margin-left: 0px !important;\n  }\n\n  // BUTTON\n  .inlineTooltip-button {\n\n    // BASE\n\n    float: left;\n    margin-right: ", ";\n    display: inline-block;\n    position: relative;\n    outline: 0;\n    padding: 0;\n    vertical-align: bottom;\n    box-sizing: border-box;\n    border-radius: ", ";\n    cursor: pointer;\n    font-size: 14px;\n    text-decoration: none;\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 400;\n    font-style: normal;\n    white-space: nowrap;\n    text-rendering: auto;\n    text-align: center;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -moz-font-feature-settings: \"liga\" on;\n    width: ", ";\n    height: ", ";\n    line-height: ", ";\n    -webkit-transition: 100ms border-color, 100ms color;\n    transition: 100ms border-color, 100ms color;\n    background: ", ";\n    border: ", " solid;\n    border-color: ", ";\n    color: ", ";\n\n    &:hover {\n      border-color: ", "\n      color: rgba(", ", ", ");\n    }\n\n    svg {\n      display: inline !important;\n      vertical-align: unset !important;\n    }\n\n    svg path {\n      fill: ", ";\n    }\n\n    // SCALE\n    &.scale {\n   \n       -webkit-transform: scale(0);\n           -ms-transform: scale(0);\n               transform: scale(0);\n      -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n\n\n      svg path {\n        fill: ", ";\n      }\n    }\n\n    // CONTROL\n    &.control {\n      \n      display: block;\n      position: absolute;\n      margin-right: ", ";\n      padding-top: 4px;\n\n      -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n       -webkit-transform: rotate(0);\n           -ms-transform: rotate(0);\n               transform: rotate(0);\n    }\n\n"], ["\n  // BASE\n  position: absolute;\n  z-index: 10;\n  width: ", ";\n  height: ", ";\n  -webkit-transition: opacity 100ms, width 0 linear 250ms;\n  transition: opacity 100ms, width 0 linear 250ms;\n  padding: 0;\n  font-size: 0;\n\n  opacity: 0;\n  pointer-events: none;\n\n  &.is-active {\n    opacity: 1;\n    pointer-events: auto;\n  }\n  &.is-scaled {\n    -webkit-transition-delay: 0;\n    transition-delay: 0;\n    width: auto;\n\n    .control {\n            -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n       -webkit-transform: rotate(45deg) !important;\n           -ms-transform: rotate(45deg) !important;\n               transform: rotate(45deg) !important;\n            border-color: ", ";\n                   color: ", ";\n    }\n\n    .scale {\n       -webkit-transform: scale(1) !important;\n           -ms-transform: scale(1) !important;\n               transform: scale(1) !important;\n      -webkit-transition: -webkit-", ", ", " !important;\n              transition: ", ", ", " !important;\n    }\n\n  }\n\n  // MENU\n  .inlineTooltip-menu {\n    display: inline-block;\n    margin-left: ", ";\n    svg path{\n      fill: ", ";\n    }\n  }\n\n  .inlineTooltip-menu-fixed {\n    display: inline-block;\n    margin-left: 0px !important;\n  }\n\n  // BUTTON\n  .inlineTooltip-button {\n\n    // BASE\n\n    float: left;\n    margin-right: ", ";\n    display: inline-block;\n    position: relative;\n    outline: 0;\n    padding: 0;\n    vertical-align: bottom;\n    box-sizing: border-box;\n    border-radius: ", ";\n    cursor: pointer;\n    font-size: 14px;\n    text-decoration: none;\n    font-family: ", ";\n    letter-spacing: -0.02em;\n    font-weight: 400;\n    font-style: normal;\n    white-space: nowrap;\n    text-rendering: auto;\n    text-align: center;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -moz-font-feature-settings: \"liga\" on;\n    width: ", ";\n    height: ", ";\n    line-height: ", ";\n    -webkit-transition: 100ms border-color, 100ms color;\n    transition: 100ms border-color, 100ms color;\n    background: ", ";\n    border: ", " solid;\n    border-color: ", ";\n    color: ", ";\n\n    &:hover {\n      border-color: ", "\n      color: rgba(", ", ", ");\n    }\n\n    svg {\n      display: inline !important;\n      vertical-align: unset !important;\n    }\n\n    svg path {\n      fill: ", ";\n    }\n\n    // SCALE\n    &.scale {\n   \n       -webkit-transform: scale(0);\n           -ms-transform: scale(0);\n               transform: scale(0);\n      -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n\n\n      svg path {\n        fill: ", ";\n      }\n    }\n\n    // CONTROL\n    &.control {\n      \n      display: block;\n      position: absolute;\n      margin-right: ", ";\n      padding-top: 4px;\n\n      -webkit-transition: -webkit-", ", ", ";\n              transition: ", ", ", ";\n       -webkit-transform: rotate(0);\n           -ms-transform: rotate(0);\n               transform: rotate(0);\n    }\n\n"])), function (props) { return props.theme.tooltip_size; }, function (props) { return props.theme.tooltip_size; }, function (props) {
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
styled.div(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n  position: fixed;\n  padding: 20px;\n  height: 100vh;\n  background-color: #ccc;\n  top: 0px;\n  right: 0px;\n  width: 200px;\n  font-size: 0.8em;\n  .close {\n    width: 20px;\n    heigth: 20px;\n  }\n  .log-wrapper {\n    overflow-y: auto;\n    height: 100vh;\n  }\n"], ["\n  position: fixed;\n  padding: 20px;\n  height: 100vh;\n  background-color: #ccc;\n  top: 0px;\n  right: 0px;\n  width: 200px;\n  font-size: 0.8em;\n  .close {\n    width: 20px;\n    heigth: 20px;\n  }\n  .log-wrapper {\n    overflow-y: auto;\n    height: 100vh;\n  }\n"])));
var templateObject_1$b, templateObject_2$4, templateObject_3$3;

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

var dante_font_family_sans$1 = "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";
var dante_font_family_sans_serif$1 = "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";

// const dante_font_family_sans = `'jaf-bernino-sans', 'Playfair Display', 'Open Sans', "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans_serif;`;
// const dante_font_family_sans_serif = `'freight-text-pro', 'Merriweather', Georgia, Cambria, "Times New Roman", Times, serif;`;
// const dante_font_family_sans_serif = `'freight-text-pro','Playfair Display', 'Merriweather', Georgia, Cambria, "Times New Roman", Times, serif;`;

var tooltip_size$1 = "32px";
var dante_control_color$1 = "#333333";
var dante_inversed_color$1 = "#FFFFFF";
var dante_accent_color$1 = "#5BD974";
var dante_text_color$1 = "#4a4a4a";
var theme$1 = {
  dante_font_family_serif: dante_font_family_sans_serif$1,
  dante_font_family_sans: dante_font_family_sans$1,
  dante_font_family_mono: "Menlo, Monaco, Consolas, \"Courier New\", \"Courier\", monospace;",
  dante_font_family_base: dante_font_family_sans$1,
  // Editor
  dante_editor_font_size: "1.4rem",
  dante_editor_line_height: "1.9",
  //dante_font_family_sans_serif: "comic-sans",
  dante_visual_debugger: "false",
  dante_text_color: dante_text_color$1,
  dante_inversed_color: dante_inversed_color$1,
  dante_accent_color: dante_accent_color$1,
  dante_control_color: dante_control_color$1,
  dante_popover_color: dante_inversed_color$1,
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
  tooltip_size: tooltip_size$1,
  tooltip_line_height: tooltip_size$1,
  tooltip_default_transition: "100ms border-color, 100ms color",
  tooltip_forward_transition: "transform 100ms",
  tooltip_backward_transition: "transform 250ms",
  dante_code_background: "#000",
  dante_code_color: "#fff",
  // Menu

  //background: #2A2B32;

  dante_menu_height: "42px",
  dante_menu_background: dante_control_color$1,
  dante_menu_color: dante_inversed_color$1,
  dante_menu_border_radius: "4px",
  dante_menu_box_shadow: "0 1px 4px 1px #90909087",
  dante_menu_icon_size: "16px",
  dante_menu_icon_color: dante_inversed_color$1,
  dante_menu_icon_accent: dante_accent_color$1,
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

// IMAGE TOOLTIP

function imageFill() {
  return /*#__PURE__*/React.createElement("svg", {
    id: "icon-image-fill",
    width: "20px",
    height: "20px",
    viewBox: "0 0 36 32"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M4 26h28v3h-28v-3zM0 2h36v21h-36v-21z"
  }));
}
function speech() {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#00000070",
    d: "M9.5 14c-1.93 0-3.5-1.57-3.5-3.5v-6c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5v6c0 1.93-1.57 3.5-3.5 3.5zM9.5 2c-1.378 0-2.5 1.122-2.5 2.5v6c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5v-6c0-1.378-1.122-2.5-2.5-2.5z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#00000070",
    d: "M16 10.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5c0 3.033-2.467 5.5-5.5 5.5s-5.5-2.467-5.5-5.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5c0 3.416 2.649 6.225 6 6.481v2.019h-1.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h4c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-1.5v-2.019c3.351-0.256 6-3.065 6-6.481z"
  }));
}
function imageCenter() {
  return /*#__PURE__*/React.createElement("svg", {
    id: "icon-image-center",
    width: "20px",
    height: "20px",
    viewBox: "0 0 36 32"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M4 26h28v3h-28v-3zM4 8h28v15h-28v-15zM4 2h28v3h-28v-3z"
  }));
}
function imageLeft() {
  return /*#__PURE__*/React.createElement("svg", {
    id: "icon-image-left",
    width: "20px",
    height: "20px",
    viewBox: "0 0 36 32"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M8 26h28v3h-28v-3zM24 20h12v3h-12v-3zM0 8h21v15h-21v-15zM24 14h12v3h-12v-3zM24 8h12v3h-12v-3zM8 2h28v3h-28v-3z"
  }));
}
function imageWide() {
  return /*#__PURE__*/React.createElement("svg", {
    id: "icon-image-wide",
    width: "20px",
    height: "20px",
    viewBox: "0 0 36 32"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M4 26h28v3h-28v-3zM0 8h36v15h-36v-15zM4 2h28v3h-28v-3z"
  }));
}

// INLINE TOOLTIP

function image() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-photo",
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#494B56",
    fillRule: "nonzero",
    d: "M17.0705329,6.17097418 L14.5626959,6.17097418 L14.3369906,5.2405567 L14.3119122,5.13717696 C14.1112853,4.46520879 13.5094044,4 12.8322884,4 L8.1426332,4 C7.4655172,4 6.8636364,4.46520879 6.6630094,5.13717696 L6.4122257,6.17097418 L3.9043887,6.17097418 C3.1269592,6.17097418 2.5,6.84294235 2.5,7.61829026 L2.5,15.5526838 C2.5,16.3538767 3.1520376,17 3.9043887,17 L17.0956113,17 C17.8730408,17 18.5,16.3280317 18.5,15.5526838 L18.5,7.64413522 C18.5,6.84294235 17.8479624,6.17097418 17.0705329,6.17097418 Z M17.7476489,15.5526838 C17.7476489,15.9145129 17.4467085,16.2246521 17.0956113,16.2246521 L3.9043887,16.2246521 C3.5532915,16.2246521 3.2523511,15.9145129 3.2523511,15.5526838 L3.2523511,7.64413522 C3.2523511,7.28230618 3.5532915,6.97216695 3.9043887,6.97216695 L7.0141066,6.97216695 L7.3902821,5.42147112 L7.3902821,5.34393634 C7.515674,5.00795226 7.8166144,4.80119287 8.1426332,4.80119287 L12.8322884,4.80119287 C13.1583072,4.80119287 13.484326,5.03379722 13.5846395,5.34393634 L13.9858934,6.97216695 L17.0705329,6.97216695 C17.4467085,6.97216695 17.7476489,7.28230618 17.7476489,7.64413522 L17.7476489,15.5526838 Z M10.4749216,7.51491052 C8.468652,7.51491052 6.838558,9.19483105 6.838558,11.2624254 C6.838558,13.3300198 8.468652,15.0099403 10.4749216,15.0099403 C12.4811912,15.0099403 14.1112853,13.3300198 14.1112853,11.2624254 C14.1112853,9.19483105 12.4811912,7.51491052 10.4749216,7.51491052 Z M10.4749216,14.2345924 C8.8949843,14.2345924 7.5909091,12.890656 7.5909091,11.2624254 C7.5909091,9.63419477 8.8949843,8.29025843 10.4749216,8.29025843 C12.0548589,8.29025843 13.3589342,9.63419477 13.3589342,11.2624254 C13.3589342,12.9165009 12.0799373,14.2345924 10.4749216,14.2345924 Z"
  }));
}
function video() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-video",
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#494B56",
    fillRule: "nonzero",
    d: "M6.5,4 L6.5,15.5471358 L16.5,9.7735679 L6.5,4 Z M7.2945422,5.375733 L14.9109157,9.7735679 L7.2945422,14.1714028 L7.2945422,5.375733 Z",
    id: "Shape"
  }));
}
function divider() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-spacer",
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#494B56",
    d: "M3,10 L4,10 L4,11 L3,11 L3,10 Z M5,10 L6,10 L6,11 L5,11 L5,10 Z M7,10 L8,10 L8,11 L7,11 L7,10 Z M9,10 L10,10 L10,11 L9,11 L9,10 Z M11,10 L12,10 L12,11 L11,11 L11,10 Z M13,10 L14,10 L14,11 L13,11 L13,10 Z M15,10 L16,10 L16,11 L15,11 L15,10 Z M17,10 L18,10 L18,11 L17,11 L17,10 Z"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#DEE0E8",
    fillRule: "nonzero",
    x: "2",
    y: "6",
    width: "17",
    height: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#DEE0E8",
    fillRule: "nonzero",
    x: "2",
    y: "13",
    width: "17",
    height: "2"
  }));
}
function button() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-button",
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#494B56",
    fillRule: "nonzero",
    d: "M12.2382748,16.999996 L8.31885183,16.9847535 C8.15303655,16.9841672 8.01611714,16.8713137 8.00586918,16.7269491 C7.92590153,15.5935771 7.14470492,14.7307605 6.42701203,13.776342 C6.0888295,13.3266866 5.90907027,12.7562633 6.04632568,12.259268 C6.17501312,11.7924647 6.56930741,11.4407135 7.22164859,11.324489 L7.32916812,11.311738 L7.32916812,7.98548983 L7.32732013,7.8889048 C7.33588809,7.62890201 7.44189563,7.40729864 7.64063877,7.24695869 C7.86021382,7.06976399 8.15370855,7 8.4418273,7 C8.75615393,7 9.08308052,7.03854604 9.30467155,7.24666553 C9.52189463,7.45053475 9.55986241,7.74571269 9.54743054,8.05158978 L9.54306253,9.42488547 L9.66469398,9.39483999 C9.74768567,9.38194244 9.83218929,9.37593336 9.91602093,9.37593336 C10.0809962,9.37593336 10.2394195,9.38692558 10.3823868,9.42122134 C10.5295542,9.45654303 10.6678177,9.51824607 10.7788651,9.62259898 C10.833129,9.6737495 10.8763047,9.7304694 10.9102406,9.79158611 L10.9584564,9.91557852 L11.1810555,9.86076387 C11.2640471,9.8478664 11.3483827,9.84185723 11.4322144,9.84185723 C11.5971896,9.84185723 11.755613,9.85284954 11.8985803,9.88714521 C12.0455797,9.92246691 12.183843,9.98416994 12.2948906,10.0885229 C12.4035862,10.1906773 12.4674259,10.3154024 12.5023697,10.4528786 L12.5048897,10.4690005 L12.5532735,10.4618189 C12.6070332,10.4566892 12.6612971,10.4541976 12.7155608,10.4541976 C13.0739032,10.4541976 13.3823499,10.5326089 13.6012529,10.784111 C13.7905881,11.0017572 13.8789557,11.3176005 13.9535474,11.6910431 C14.283666,13.5689553 12.7530246,15.5343657 12.5515935,16.7641761 C12.5292496,16.8998935 12.3955222,17.0007288 12.2382748,16.999996 Z M11.9783799,16.4496518 L11.9839239,16.4238567 C12.3303384,15.0848568 13.6115009,13.3706555 13.3317821,11.7800069 C13.2561824,11.4014346 13.1844468,11.214127 13.0994391,11.116516 C13.0439993,11.0527611 12.9638637,11.003809 12.7155608,11.003809 C12.648697,11.003809 12.5893933,11.0099647 12.5369776,11.0208104 L12.5274016,11.847719 C12.5258896,11.9994118 12.3834262,12.1213522 12.209547,12.1198866 C12.0356677,12.1185675 11.8958924,11.994282 11.8975724,11.8425893 L11.9078203,10.8820152 C11.9197483,10.5836128 11.8654844,10.4927437 11.8333966,10.4625518 C11.8050047,10.4360238 11.724029,10.3914687 11.4322144,10.3914687 C11.2213752,10.3914687 11.0911758,10.450387 11.0229681,10.5255738 L11.0112082,11.3819417 C11.0096962,11.5336344 10.8672327,11.6555749 10.6933536,11.6541092 C10.5194743,11.6527902 10.3796989,11.5285047 10.3813789,11.376812 L10.3917949,10.4163844 C10.4037228,10.117982 10.3494591,10.0269664 10.3173711,9.99662789 C10.2889793,9.97009992 10.2076676,9.9255448 9.91602093,9.9255448 C9.75776556,9.9255448 9.64503811,9.95881462 9.57095042,10.006301 L9.54121456,10.0312167 L9.53701451,11.4081765 C9.53667857,11.5598692 9.39505511,11.6825425 9.22117592,11.6821028 C9.04729667,11.6818097 8.90668128,11.558257 8.90718528,11.4065643 L8.91760124,8.0411838 C8.92952918,7.74190211 8.87560141,7.65132615 8.84317756,7.62069444 C8.81478568,7.59416656 8.73364203,7.54961135 8.4418273,7.54961135 C8.26190008,7.54961135 8.13926061,7.59328716 8.06836492,7.65044675 C8.0045252,7.70203697 7.94589345,7.79305254 7.9584934,7.96848854 L7.95916538,7.98548983 L7.95916538,12.8607627 C7.95916538,13.0124555 7.817878,13.1355684 7.64416675,13.1355684 C7.47028751,13.1355684 7.32916812,13.0124555 7.32916812,12.8607627 L7.32916812,11.867505 L7.18216876,11.9015076 C6.86213014,11.9979461 6.71496278,12.1843743 6.65885103,12.3879504 C6.57384339,12.6958793 6.68018694,13.1110924 6.95368974,13.4748618 C7.5395032,14.2538444 8.31582784,15.1258945 8.56312277,16.2135388 L8.60529059,16.4364612 L11.9783799,16.4496518 Z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#494B56",
    fillRule: "nonzero",
    d: "M15.1508665,12.9 L15.1508665,12.1 L15.5514921,12.1 C17.5101104,12.1 19.1,10.4893769 19.1,8.5 C19.1,6.51062312 17.5101104,4.9 15.5514921,4.9 L4.44850787,4.9 C2.4898895,4.9 0.9,6.51062311 0.9,8.5 C0.9,10.4893769 2.4898895,12.1 4.44850787,12.1 L4.69642245,12.1 L4.69642245,12.9 L4.44850787,12.9 C2.04572487,12.9 0.1,10.9289011 0.1,8.5 C0.1,6.07109889 2.04572487,4.1 4.44850787,4.1 L15.5514921,4.1 C17.9542751,4.1 19.9,6.0710989 19.9,8.5 C19.9,10.9289011 17.9542751,12.9 15.5514921,12.9 L15.1508665,12.9 Z"
  }));
}
function card() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-signature",
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#494B56",
    fillRule: "nonzero",
    d: "M9.9347554,11.8295455 C9.795059,11.8295455 9.68330189,11.7113637 9.68330189,11.5636364 L9.68330189,10.3522727 C9.68330189,10.3375 9.68330189,10.3227273 9.68330189,10.3079546 C10.2839964,9.7909091 10.6611767,9.00795455 10.6611767,8.13636364 L10.6611767,6.80681819 C10.6611767,5.25568182 9.47375729,4 8.00694511,4 C6.54013294,4 5.35271355,5.25568182 5.35271355,6.80681819 L5.35271355,8.13636364 C5.35271355,9.00795455 5.72989382,9.7909091 6.33058833,10.3079546 C6.33058833,10.3227273 6.33058833,10.3375 6.33058833,10.3522727 L6.33058833,11.5636364 C6.33058833,11.7113637 6.21883121,11.8295455 6.07913482,11.8295455 C3.83002281,11.8295455 2,13.7647727 2,16.1431819 C2,16.6159091 2.36321064,17 2.81023911,17 L13.1896814,17 C13.6367099,17 13.9999205,16.6159091 13.9999205,16.1431819 C14.0138902,13.7647727 12.1838674,11.8295455 9.9347554,11.8295455 Z M6.19089194,8.13636364 L6.19089194,6.80681819 C6.19089194,5.74318183 7.00113105,4.88636364 8.00694511,4.88636364 C9.01275918,4.88636364 9.82299828,5.74318183 9.82299828,6.80681819 L9.82299828,8.13636364 C9.82299828,9.20000001 9.01275918,10.0568182 8.00694511,10.0568182 C7.00113105,10.0568182 6.19089194,9.20000001 6.19089194,8.13636364 Z M2.83817839,16.1136363 C2.85214803,14.2375 4.29102093,12.7159091 6.07913482,12.7159091 C6.67982933,12.7159091 7.16876672,12.1988637 7.16876672,11.5636364 L7.16876672,10.7954546 C7.43418988,10.8840909 7.71358268,10.9431818 8.00694511,10.9431818 C8.30030755,10.9431818 8.57970034,10.8840909 8.8451235,10.7954546 L8.8451235,11.5488637 C8.8451235,12.1840909 9.33406089,12.7011364 9.9347554,12.7011364 C11.7228693,12.7159091 13.1617422,14.2375 13.1757119,16.1136363 L2.83817839,16.1136363 Z"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#494B56",
    fillRule: "nonzero",
    x: "13",
    y: "6",
    width: "6",
    height: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#494B56",
    fillRule: "nonzero",
    x: "13",
    y: "8",
    width: "6",
    height: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#494B56",
    fillRule: "nonzero",
    x: "13",
    y: "10",
    width: "6",
    height: "1"
  }));
}
function add() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-add",
    width: "30px",
    height: "23px",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#494B56",
    fillRule: "nonzero",
    d: "M16.5,10 C16.5,10.3122826 16.2470652,10.5652174 15.9347826,10.5652174 L10.5652174,10.5652174 L10.5652174,15.9347826 C10.5652174,16.2467826 10.3122826,16.5 10,16.5 C9.6877174,16.5 9.4347826,16.2467826 9.4347826,15.9347826 L9.4347826,10.5652174 L4.0652174,10.5652174 C3.7529348,10.5652174 3.5,10.3122826 3.5,10 C3.5,9.6877174 3.7529348,9.4347826 4.0652174,9.4347826 L9.4347826,9.4347826 L9.4347826,4.0652174 C9.4347826,3.7529348 9.6877174,3.5 10,3.5 C10.3122826,3.5 10.5652174,3.7529348 10.5652174,4.0652174 L10.5652174,9.4347826 L15.9347826,9.4347826 C16.2470652,9.4347826 16.5,9.6877174 16.5,10 Z"
  }));
}
function embed() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-embed",
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#494B56",
    d: "M13.0410996,14.8261802 C12.8030724,15.057835 12.4169249,15.0580448 12.1786821,14.8261802 C11.9404393,14.5943156 11.9406549,14.2185061 12.1786821,13.9868514 L16.275165,10.0000393 L12.1786821,6.01322731 C11.9404393,5.78136272 11.9404393,5.40576303 12.1786821,5.17389844 C12.4169249,4.94203385 12.8028568,4.94203385 13.0410996,5.17389844 L18,10.0000393 L13.0410996,14.8261802 Z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#494B56",
    d: "M6.95890041,14.8261802 L2,10.0000393 L6.95890041,5.17389844 C7.19714323,4.94203385 7.58307507,4.94203385 7.82131789,5.17389844 C8.0595607,5.40576303 8.0595607,5.78136272 7.82131789,6.01322731 L3.72483495,10.0000393 L7.82131789,13.9868514 C8.05934511,14.2185061 8.0595607,14.5943156 7.82131789,14.8261802 C7.58307507,15.0580448 7.19692763,15.057835 6.95890041,14.8261802 Z"
  }));
}

// TEXT TOOLTIP

function fontColor() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-fontcolor",
    width: "22px",
    height: "22px",
    viewBox: "0 0 22 22",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    className: "icon-fillcolor",
    fillRule: "nonzero",
    d: "M8.12739586,9.73148148 L10.4359896,4.25925926 L10.2674515,3.85976152 L10.6775092,3.68676844 L10.8505023,3.27671076 L11.25,3.44524887 L11.6494977,3.27671076 L11.8224908,3.68676844 L12.2325485,3.85976152 L12.0640104,4.25925926 L14.3726041,9.73148148 L14.5,9.73148148 L14.5,10.0334569 L15.7325485,12.9550533 L14.3505023,13.5381041 L13.3773959,11.2314815 L9.12260414,11.2314815 L8.14949774,13.5381041 L6.7674515,12.9550533 L8,10.0334569 L8,9.73148148 L8.12739586,9.73148148 Z M9.75541664,9.73148148 L12.7445834,9.73148148 L11.25,6.18876537 L9.75541664,9.73148148 Z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#07A8FF",
    d: "M14,15.9259259 L19,15.9259259 C19.5522847,15.9259259 20,16.3736412 20,16.9259259 L20,17 C20,17.5522847 19.5522847,18 19,18 L14,18 L14,15.9259259 Z"
  }), /*#__PURE__*/React.createElement("rect", {
    fill: "#FFCE0F",
    x: "8",
    y: "15.9259259",
    width: "6",
    height: "2.07407407"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FF2B64",
    d: "M3,15.9259259 L8,15.9259259 L8,18 L3,18 C2.44771525,18 2,17.5522847 2,17 L2,16.9259259 C2,16.3736412 2.44771525,15.9259259 3,15.9259259 Z"
  }));
}
function bold() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-bold",
    width: "22px",
    height: "22px",
    viewBox: "0 0 22 22",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    className: "icon-fillcolor",
    fill: "currentColor",
    d: "M11.2197266,10.546875 C11.9580115,10.546875 12.5322245,10.444337 12.9423828,10.2392578 C13.5869173,9.91699058 13.9091797,9.33691825 13.9091797,8.49902344 C13.9091797,7.65526922 13.5664097,7.08691553 12.8808594,6.79394531 C12.4941387,6.62988199 11.9199257,6.54785156 11.1582031,6.54785156 L8.03808593,6.54785156 L8.03808593,10.546875 L11.2197266,10.546875 Z M11.8085937,16.5058594 C12.8808647,16.5058594 13.6455055,16.1953156 14.1025391,15.5742188 C14.3896499,15.1816387 14.5332031,14.707034 14.5332031,14.1503906 C14.5332031,13.2128859 14.114262,12.5742204 13.2763672,12.234375 C12.8310524,12.0527335 12.2421911,11.9619141 11.5097656,11.9619141 L8.03808593,11.9619141 L8.03808593,16.5058594 L11.8085937,16.5058594 Z M6.32421874,5.08886719 L11.8701172,5.08886719 C13.3818435,5.08886719 14.457028,5.54003455 15.0957031,6.44238281 C15.470705,6.9755886 15.6582031,7.59081683 15.6582031,8.28808594 C15.6582031,9.10254313 15.4267601,9.77050521 14.9638672,10.2919922 C14.7236316,10.5673842 14.3779319,10.8193348 13.9267578,11.0478516 C14.5888705,11.2998059 15.0839827,11.5839828 15.4121094,11.9003906 C15.9921904,12.4628934 16.2822266,13.2392529 16.2822266,14.2294922 C16.2822266,15.0615276 16.021487,15.8144498 15.5,16.4882812 C14.7206992,17.4960988 13.4814538,18 11.7822266,18 L6.32421874,18 L6.32421874,5.08886719 Z"
  }));
}
function italic() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-italic",
    width: "22px",
    height: "22px",
    viewBox: "0 0 22 22",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("polygon", {
    className: "icon-fillcolor",
    id: "I",
    fill: "currentColor",
    points: "11.5083008 5.08886719 13.2749023 5.08886719 10.5327148 18 8.76611326 18"
  }));
}
function insertunorderedlist() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-unorderedlist",
    width: "22px",
    height: "22px",
    viewBox: "0 0 22 22",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    className: "icon-fillcolor",
    fill: "currentColor",
    fillRule: "nonzero",
    d: "M7.5,10.5 L19.5,10.5 C19.776142,10.5 20,10.7238576 20,11 C20,11.2761424 19.776142,11.5 19.5,11.5 L7.5,11.5 C7.223858,11.5 7,11.2761424 7,11 C7,10.7238576 7.223858,10.5 7.5,10.5 Z M4,12 C3.447715,12 3,11.5522847 3,11 C3,10.4477153 3.447715,10 4,10 C4.552285,10 5,10.4477153 5,11 C5,11.5522847 4.552285,12 4,12 Z M7.5,5.5 L19.5,5.5 C19.776142,5.5 20,5.7238576 20,6 C20,6.2761424 19.776142,6.5 19.5,6.5 L7.5,6.5 C7.223858,6.5 7,6.2761424 7,6 C7,5.7238576 7.223858,5.5 7.5,5.5 Z M4,7 C3.447715,7 3,6.5522847 3,6 C3,5.4477153 3.447715,5 4,5 C4.552285,5 5,5.4477153 5,6 C5,6.5522847 4.552285,7 4,7 Z M7.5,15.5 L19.5,15.5 C19.776142,15.5 20,15.7238576 20,16 C20,16.2761424 19.776142,16.5 19.5,16.5 L7.5,16.5 C7.223858,16.5 7,16.2761424 7,16 C7,15.7238576 7.223858,15.5 7.5,15.5 Z M4,17 C3.447715,17 3,16.5522847 3,16 C3,15.4477153 3.447715,15 4,15 C4.552285,15 5,15.4477153 5,16 C5,16.5522847 4.552285,17 4,17 Z"
  }));
}
function insertorderedlist() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-orderedlist",
    width: "22px",
    height: "22px",
    viewBox: "0 0 22 22",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    className: "icon-fillcolor",
    fill: "currentColor",
    fillRule: "nonzero",
    d: "M6.925,9.835 L18.925,9.835 C19.201142,9.835 19.425,10.0588576 19.425,10.335 C19.425,10.6111424 19.201142,10.835 18.925,10.835 L6.925,10.835 C6.648858,10.835 6.425,10.6111424 6.425,10.335 C6.425,10.0588576 6.648858,9.835 6.925,9.835 Z M4.2425,7.335 L3.3825,7.335 L3.3825,5.1 L2.8225,5.665 L2.3325,5.15 L3.4975,4 L4.2425,4 L4.2425,7.335 Z M6.925,4.835 L18.925,4.835 C19.201142,4.835 19.425,5.0588576 19.425,5.335 C19.425,5.6111424 19.201142,5.835 18.925,5.835 L6.925,5.835 C6.648858,5.835 6.425,5.6111424 6.425,5.335 C6.425,5.0588576 6.648858,4.835 6.925,4.835 Z M4.7425,12.335 L2.1275,12.335 L2.1275,11.665 C3.5725,10.62 3.8425,10.39 3.8425,10.055 C3.8425,9.83 3.6275,9.71 3.3825,9.71 C3.0125,9.71 2.7325,9.85 2.4925,10.075 L2.0175,9.505 C2.3725,9.115 2.9025,8.95 3.3675,8.95 C4.1525,8.95 4.7175,9.39 4.7175,10.055 C4.7175,10.57 4.3525,11.005 3.5225,11.585 L4.7425,11.585 L4.7425,12.335 Z M6.925,14.835 L18.925,14.835 C19.201142,14.835 19.425,15.0588576 19.425,15.335 C19.425,15.6111424 19.201142,15.835 18.925,15.835 L6.925,15.835 C6.648858,15.835 6.425,15.6111424 6.425,15.335 C6.425,15.0588576 6.648858,14.835 6.925,14.835 Z M3.38,17.395 C2.74,17.395 2.265,17.17 2,16.87 L2.435,16.285 C2.68,16.52 3.055,16.635 3.345,16.635 C3.715,16.635 3.905,16.495 3.905,16.31 C3.905,16.12 3.765,16.025 3.31,16.025 C3.165,16.025 2.91,16.03 2.86,16.035 L2.86,15.27 C2.925,15.275 3.185,15.275 3.31,15.275 C3.655,15.275 3.85,15.19 3.85,15.015 C3.85,14.805 3.61,14.71 3.29,14.71 C2.985,14.71 2.695,14.82 2.46,15.03 L2.045,14.49 C2.33,14.175 2.765,13.95 3.38,13.95 C4.23,13.95 4.705,14.315 4.705,14.865 C4.705,15.255 4.37,15.55 3.975,15.615 C4.33,15.65 4.76,15.925 4.76,16.405 C4.76,16.99 4.21,17.395 3.38,17.395 Z"
  }));
}
function giphyLogo() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 1 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", {
    id: "Page-1",
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("g", {
    id: "giphy-ar21",
    transform: "translate(-8 -6)"
  }, /*#__PURE__*/React.createElement("g", {
    id: "Group",
    transform: "translate(8.569 6.763)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6.68649946,11.474 L9.32049946,11.474 C9.32649946,11.552 9.32649946,11.618 9.32649946,11.708 C9.32649946,13.196 8.18649946,14.09 6.95649946,14.09 C5.61249946,14.09 4.59849946,13.04 4.59849946,11.762 C4.59849946,10.436 5.66649946,9.476 6.97449946,9.476 C8.03649946,9.476 8.94849946,10.19 9.19449946,11.048 L7.92249946,11.048 C7.74849946,10.736 7.42449946,10.472 6.94449946,10.472 C6.38649946,10.472 5.73249946,10.886 5.73249946,11.762 C5.73249946,12.692 6.39249946,13.094 6.95049946,13.094 C7.51449946,13.094 7.89249946,12.812 8.01249946,12.38 L6.68649946,12.38 L6.68649946,11.474 Z M10.2894998,14 L10.2894998,9.56 L11.4234998,9.56 L11.4234998,14 L10.2894998,14 Z M12.6025002,14 L12.6025002,9.56 L15.0265002,9.56 L15.0265002,10.556 L13.6885002,10.556 L13.6885002,11.312 L14.9785002,11.312 L14.9785002,12.308 L13.6885002,12.308 L13.6885002,14 L12.6025002,14 Z",
    id: "GIF",
    fill: "#00000070"
  }), /*#__PURE__*/React.createElement("polygon", {
    id: "Path",
    fill: "#00000070",
    transform: "rotate(-1.52 1.653 11.39)",
    points: "0.52516176 2.58609459 2.78104613 2.58609459 2.78104613 20.1949155 0.52516176 20.1949155"
  }), /*#__PURE__*/React.createElement("polygon", {
    id: "Path",
    fill: "#00000070",
    transform: "rotate(-1.52 17.506 13.227)",
    points: "16.3763287 6.67947428 18.6350224 6.67947428 18.6350224 19.7737175 16.3763287 19.7737175"
  }), /*#__PURE__*/React.createElement("polygon", {
    id: "Path",
    fill: "#00000070",
    transform: "rotate(-1.52 9.813 21.107)",
    points: "0.78567191 19.9778258 18.841174 19.9778258 18.841174 22.2365195 0.78567191 22.2365195"
  }), /*#__PURE__*/React.createElement("polygon", {
    id: "Path",
    fill: "#00000070",
    transform: "rotate(-1.52 5.902 1.342)",
    points: "0.259918091 0.212569605 11.544958 0.212569605 11.544958 2.47126329 0.259918091 2.47126329"
  }), /*#__PURE__*/React.createElement("polygon", {
    id: "Path",
    fill: "#00000070",
    points: "11.6923919 6.82945814 18.4628543 6.64966162 18.4038586 4.39377726 16.1451649 4.45277299 16.0861692 2.19688863 13.8302848 2.25588436 13.7712891 0 11.5125954 0.0589957305"
  }), /*#__PURE__*/React.createElement("polygon", {
    id: "Path",
    fill: "#00000070",
    transform: "rotate(-1.52 17.365 7.809)",
    points: "16.2354766 6.67956253 18.4941703 6.67956253 18.4941703 8.93825622 16.2354766 8.93825622"
  })))));
}
function videoRecorderIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "20px",
    height: "20px",
    viewBox: "0 0 512.001 512.001"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#00000070",
    d: "M481.086,188.037c-3.454-2.062-7.737-2.159-11.278-0.253l-73.901,39.777v-34.087c0-6.312-5.118-11.429-11.428-11.429 h-18.586c23.179-18.799,38.024-47.493,38.024-79.594C403.918,45.96,357.958,0,301.465,0c-48.218,0-88.757,33.487-99.598,78.424 c-14.182-17.112-35.587-28.032-59.497-28.032c-42.6,0-77.256,34.657-77.256,77.256c0,21.199,8.586,40.426,22.459,54.4H77.138 c-6.312,0-11.429,5.117-11.429,11.429v51.879H36.776c-6.312,0-11.429,5.117-11.429,11.429v44.944 c0,6.312,5.117,11.429,11.429,11.429h28.932v51.879c0,6.312,5.117,11.429,11.429,11.429h134.825l-61.946,118.825 c-2.918,5.596-0.746,12.499,4.851,15.417c1.688,0.88,3.494,1.297,5.273,1.297c4.123,0,8.105-2.239,10.143-6.147l60.523-116.098 l60.524,116.098c2.038,3.91,6.021,6.147,10.144,6.147c1.779,0,3.586-0.417,5.273-1.297c5.597-2.918,7.769-9.821,4.85-15.417 l-61.946-118.825h134.827c6.311,0,11.429-5.117,11.429-11.429v-34.088l73.901,39.777c1.694,0.911,3.555,1.365,5.416,1.365 c2.03,0,4.059-0.541,5.862-1.617c3.454-2.063,5.567-5.789,5.567-9.811V197.848C486.653,193.825,484.54,190.1,481.086,188.037z M65.709,290.297H48.205V268.21h17.504V290.297z M301.465,22.857c43.888,0,79.595,35.706,79.595,79.595 c0,43.889-35.706,79.594-79.595,79.594c-43.888,0-79.594-35.706-79.594-79.594C221.872,58.564,257.578,22.857,301.465,22.857z M214.192,156.054c6.104,9.904,13.847,18.693,22.847,25.992h-39.872C204.476,174.684,210.3,165.855,214.192,156.054z M142.37,73.248c29.995,0,54.399,24.403,54.399,54.399c0,29.996-24.403,54.4-54.399,54.4c-29.995,0-54.399-24.403-54.399-54.4 C87.972,97.651,112.375,73.248,142.37,73.248z M373.05,246.691v65.123v41.79H231.013c-0.021,0-0.041,0-0.062,0h-0.302 c-0.013,0-0.026,0-0.039,0H88.566v-51.879v-44.944v-51.879H373.05V246.691z M463.796,341.529l-67.889-36.542v-51.468 l67.889-36.542V341.529z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#00000070",
    d: "M142.37,92.931c-19.143,0-34.716,15.574-34.716,34.716c0,19.143,15.574,34.716,34.716,34.716 c19.143,0,34.716-15.574,34.716-34.716C177.087,108.505,161.513,92.931,142.37,92.931z M142.37,141.791 c-7.8,0-14.145-6.345-14.145-14.145c0-7.8,6.345-14.145,14.145-14.145c7.8,0,14.145,6.345,14.145,14.145 C156.515,135.446,150.169,141.791,142.37,141.791z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#00000070",
    d: "M301.465,52.595c-27.491,0-49.856,22.366-49.856,49.857c0,27.49,22.365,49.856,49.856,49.856 c27.491,0,49.856-22.366,49.856-49.856C351.321,74.961,328.957,52.595,301.465,52.595z M301.465,129.451 c-14.887,0-26.999-12.112-26.999-26.999c0-14.887,12.112-27,26.999-27s26.999,12.112,26.999,27S316.352,129.451,301.465,129.451z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#00000070",
    d: "M264.593,238.137h-124.26c-5.997,0-10.857,4.861-10.857,10.857v60.519c0,5.997,4.861,10.857,10.857,10.857h124.26 c5.997,0,10.857-4.861,10.857-10.857v-60.519C275.45,242.999,270.589,238.137,264.593,238.137z M253.735,298.656H151.19v-38.804 h102.546V298.656z"
  }), /*#__PURE__*/React.createElement("circle", {
    fill: "#00000070",
    cx: "324.536",
    cy: "260.422",
    r: "11.429"
  }), /*#__PURE__*/React.createElement("circle", {
    fill: "#00000070",
    cx: "324.536",
    cy: "298.079",
    r: "11.429"
  }));
}
function link() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-link",
    width: "22px",
    height: "22px",
    viewBox: "0 0 22 22",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    className: "icon-fillcolor",
    fill: "currentColor",
    fillRule: "nonzero",
    d: "M15.4241733,7 C17.3945268,7 19,8.62962961 19,10.6296296 L19,11.3703704 C19,13.3703704 17.3945268,15 15.4241733,15 L12.7787913,15 C10.8084378,15 9.20296462,13.3703704 9.20296462,11.3703704 L9.20296462,10.2592592 C9.20296462,9.85185179 9.53135687,9.51851846 9.9327252,9.51851846 C10.3340935,9.51851846 10.6624858,9.85185179 10.6624858,10.2592592 L10.6624858,11.3703704 C10.6624858,12.5555555 11.6111745,13.5185185 12.7787913,13.5185185 L15.4241733,13.5185185 C16.5917902,13.5185185 17.5404788,12.5555555 17.5404788,11.3703704 L17.5404788,10.6296296 C17.5404788,9.44444449 16.5917902,8.48148154 15.4241733,8.48148154 L13.5085519,8.48148154 C13.1071835,8.48148154 12.7787913,8.14814821 12.7787913,7.74074077 C12.7787913,7.33333333 13.1071835,7 13.5085519,7 L15.4241733,7 Z M8.85632843,13.5185185 C9.25769662,13.5185185 9.58608887,13.8518518 9.58608887,14.2592592 C9.58608887,14.6666667 9.25769662,15 8.85632843,15 L6.57582666,15 C4.60547319,15 3,13.3703704 3,11.3703704 L3,10.6296296 C3,8.62962961 4.60547319,7 6.57582666,7 L9.58608887,7 C11.5564423,7 13.1619157,8.62962961 13.1619157,10.6296296 L13.1619157,11.7407408 C13.1619157,12.1481482 12.8335234,12.4814815 12.4321551,12.4814815 C12.0307868,12.4814815 11.7023945,12.1481482 11.7023945,11.7407408 L11.7023945,10.6296296 C11.7023945,9.44444449 10.7537058,8.48148154 9.58608887,8.48148154 L6.57582666,8.48148154 C5.40820985,8.48148154 4.45952115,9.44444449 4.45952115,10.6296296 L4.45952115,11.3703704 C4.45952115,12.5555555 5.40820985,13.5185185 6.57582666,13.5185185 L8.85632843,13.5185185 Z"
  }));
}
function close() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon-close",
    width: "22px",
    height: "22px",
    viewBox: "0 0 22 22",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    className: "icon-fillcolor",
    fill: "currentColor",
    fillRule: "nonzero",
    d: "M15.8261029,15.8261029 C15.5942402,16.0579657 15.2186434,16.0579657 14.9867807,15.8261029 L11,11.8393223 L7.01321933,15.8261029 C6.78156639,16.0577559 6.40575984,16.0579657 6.17389707,15.8261029 C5.94203431,15.5942402 5.94224413,15.2184336 6.17389707,14.9867807 L10.1606777,11 L6.17389707,7.01321933 C5.94203431,6.78135657 5.94203431,6.40575984 6.17389707,6.17389707 C6.40575984,5.94203431 6.78135657,5.94203431 7.01321933,6.17389707 L11,10.1606777 L14.9867807,6.17389707 C15.2186434,5.94203431 15.5942402,5.94203431 15.8261029,6.17389707 C16.0579657,6.40575984 16.0579657,6.78135657 15.8261029,7.01321933 L11.8393223,11 L15.8261029,14.9867807 C16.0579657,15.2186434 16.0579657,15.5942402 15.8261029,15.8261029 Z"
  }));
}
function blockquote() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "22",
    viewBox: "0 0 31 30",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4,4 L13.597649,4 L13.597649,14.4859813 C13.6427086,15.993777 13.4286787,17.4101699 12.9555528,18.7352025 C12.4824269,20.0602351 11.8178076,21.2253325 10.961675,22.2305296 C10.1055424,23.2357267 9.08045165,24.0695709 7.88637197,24.7320872 C6.69229229,25.3946035 5.39684792,25.8172369 4,26 L4,21.4766355 C5.7122652,20.8826554 6.8837975,20.0031211 7.51463204,18.8380062 C8.14546659,17.6728914 8.46087913,16.245076 8.46087913,14.5545171 L4,14.5545171 L4,4 Z M18.3964736,4 L27.9941226,4 L27.9941226,14.4859813 C28.0391822,15.993777 27.8251523,17.4101699 27.3520264,18.7352025 C26.8789004,20.0602351 26.2142812,21.2253325 25.3581486,22.2305296 C24.502016,23.2357267 23.4769252,24.0695709 22.2828455,24.7320872 C21.0887658,25.3946035 19.7933215,25.8172369 18.3964736,26 L18.3964736,21.4766355 C20.1087388,20.8826554 21.280271,20.0031211 21.9111056,18.8380062 C22.5419401,17.6728914 22.8573527,16.245076 22.8573527,14.5545171 L18.3964736,14.5545171 L18.3964736,4 Z",
    id: "\u201D",
    className: "icon-fillcolor",
    fill: "currentColor"
  }));
}
function code() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 34 31",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15.512,11.828 L5.236,15.916 L15.512,20.004 L15.512,23.196 L1.288,17.568 L1.288,14.264 L15.512,8.608 L15.512,11.828 Z M19.392,20.004 L29.668,15.916 L19.392,11.828 L19.392,8.608 L33.616,14.264 L33.616,17.568 L19.392,23.196 L19.392,20.004 Z",
    id: "<->",
    className: "icon-fillcolor",
    fill: "currentColor"
  }));
}
function h1() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 34 31",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0.932,5.008 L5.328,5.008 L5.328,12.68 L13.42,12.68 L13.42,5.008 L17.816,5.008 L17.816,25 L13.42,25 L13.42,16.376 L5.328,16.376 L5.328,25 L0.932,25 L0.932,5.008 Z M29.1874147,25 L25.2114147,25 L25.2114147,12.288 L20.2834147,12.288 L20.2834147,9.292 C20.9740848,9.31066676 21.6414114,9.25933394 22.2854147,9.138 C22.9294179,9.01666606 23.5080788,8.80200154 24.0214147,8.494 C24.5347506,8.18599846 24.9687462,7.78000252 25.3234147,7.276 C25.6780831,6.77199748 25.9114141,6.1466704 26.0234147,5.4 L29.1874147,5.4 L29.1874147,25 Z",
    id: "H1",
    className: "icon-fillcolor",
    fill: "currentColor"
  }));
}
function h2() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 34 31",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0.932,5.008 L5.328,5.008 L5.328,12.68 L13.42,12.68 L13.42,5.008 L17.816,5.008 L17.816,25 L13.42,25 L13.42,16.376 L5.328,16.376 L5.328,25 L0.932,25 L0.932,5.008 Z M19.2474147,12.932 C19.2100811,11.8119944 19.3407465,10.7713381 19.6394147,9.81 C19.9380828,8.84866186 20.3860783,8.00867026 20.9834147,7.29 C21.580751,6.57132974 22.3320768,6.01133534 23.2374147,5.61 C24.1427525,5.20866466 25.1834088,5.008 26.3594147,5.008 C27.2554191,5.008 28.1094106,5.1479986 28.9214147,5.428 C29.7334187,5.7080014 30.4474116,6.10933072 31.0634147,6.632 C31.6794177,7.15466928 32.1694128,7.79866284 32.5334147,8.564 C32.8974165,9.32933716 33.0794147,10.1879952 33.0794147,11.14 C33.0794147,12.1293383 32.9207496,12.9786631 32.6034147,13.688 C32.2860797,14.3973369 31.8660839,15.0273306 31.3434147,15.578 C30.8207454,16.1286694 30.2280846,16.6279978 29.5654147,17.076 C28.9027447,17.5240022 28.235418,17.9673311 27.5634147,18.406 C26.8914113,18.8446689 26.2380845,19.3159975 25.6034147,19.82 C24.9687448,20.3240025 24.4087504,20.9119966 23.9234147,21.584 L33.1914147,21.584 L33.1914147,25 L18.7994147,25 C18.7994147,23.8613276 18.9627464,22.8720042 19.2894147,22.032 C19.616083,21.1919958 20.0594119,20.44067 20.6194147,19.778 C21.1794175,19.11533 21.8374109,18.5040028 22.5934147,17.944 C23.3494184,17.3839972 24.1474105,16.8146696 24.9874147,16.236 C25.4167501,15.9373318 25.8740789,15.6340015 26.3594147,15.326 C26.8447504,15.0179985 27.2880793,14.6773352 27.6894147,14.304 C28.09075,13.9306648 28.4267466,13.510669 28.6974147,13.044 C28.9680827,12.577331 29.1034147,12.0453363 29.1034147,11.448 C29.1034147,10.4959952 28.8280841,9.75400266 28.2774147,9.222 C27.7267452,8.68999734 27.0220856,8.424 26.1634147,8.424 C25.5847451,8.424 25.09475,8.55933198 24.6934147,8.83 C24.2920793,9.10066802 23.9700825,9.45533114 23.7274147,9.894 C23.4847468,10.3326689 23.3120818,10.8179973 23.2094147,11.35 C23.1067475,11.8820027 23.0554147,12.4093307 23.0554147,12.932 L19.2474147,12.932 Z",
    id: "H2",
    className: "icon-fillcolor",
    fill: "currentColor"
  }));
}
function h3() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 34 31",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0.932,5.008 L5.328,5.008 L5.328,12.68 L13.42,12.68 L13.42,5.008 L17.816,5.008 L17.816,25 L13.42,25 L13.42,16.376 L5.328,16.376 L5.328,25 L0.932,25 L0.932,5.008 Z M24.5954147,13.324 C25.0247501,13.3613335 25.4820789,13.3613335 25.9674147,13.324 C26.4527504,13.2866665 26.9054126,13.1793342 27.3254147,13.002 C27.7454168,12.8246658 28.0907466,12.5680017 28.3614147,12.232 C28.6320827,11.8959983 28.7674147,11.4480028 28.7674147,10.888 C28.7674147,10.0479958 28.4874175,9.40400224 27.9274147,8.956 C27.3674119,8.50799776 26.7234183,8.284 25.9954147,8.284 C24.9874096,8.284 24.2267506,8.61533002 23.7134147,9.278 C23.2000788,9.94066998 22.9527479,10.775995 22.9714147,11.784 L19.1914147,11.784 C19.2287482,10.775995 19.4107464,9.85667082 19.7374147,9.026 C20.064083,8.19532918 20.5214117,7.48133632 21.1094147,6.884 C21.6974176,6.28666368 22.4020772,5.8246683 23.2234147,5.498 C24.0447521,5.1713317 24.9594096,5.008 25.9674147,5.008 C26.7514186,5.008 27.5354107,5.1246655 28.3194147,5.358 C29.1034186,5.5913345 29.8080782,5.941331 30.4334147,6.408 C31.0587511,6.874669 31.5674127,7.44399664 31.9594147,8.116 C32.3514166,8.78800336 32.5474147,9.56266228 32.5474147,10.44 C32.5474147,11.3920048 32.3187503,12.2319964 31.8614147,12.96 C31.404079,13.6880036 30.7180859,14.1826654 29.8034147,14.444 L29.8034147,14.5 C30.8860867,14.7426679 31.7354116,15.2653293 32.3514147,16.068 C32.9674177,16.8706707 33.2754147,17.8319944 33.2754147,18.952 C33.2754147,19.9786718 33.07475,20.8933293 32.6734147,21.696 C32.2720793,22.4986707 31.735418,23.170664 31.0634147,23.712 C30.3914113,24.253336 29.6167524,24.6639986 28.7394147,24.944 C27.8620769,25.2240014 26.9474194,25.364 25.9954147,25.364 C24.8940758,25.364 23.8907525,25.2053349 22.9854147,24.888 C22.0800768,24.5706651 21.3100845,24.1086697 20.6754147,23.502 C20.0407448,22.8953303 19.5507497,22.1533377 19.2054147,21.276 C18.8600796,20.3986623 18.6967479,19.3906724 18.7154147,18.252 L22.4954147,18.252 C22.5140814,18.7746693 22.5980806,19.2739976 22.7474147,19.75 C22.8967487,20.2260024 23.1114133,20.6366649 23.3914147,20.982 C23.6714161,21.3273351 24.0214126,21.6026656 24.4414147,21.808 C24.8614168,22.0133344 25.3607451,22.116 25.9394147,22.116 C26.8354191,22.116 27.5914116,21.8406694 28.2074147,21.29 C28.8234177,20.7393306 29.1314147,19.9880048 29.1314147,19.036 C29.1314147,18.2893296 28.9867494,17.720002 28.6974147,17.328 C28.4080799,16.935998 28.0394169,16.6513342 27.5914147,16.474 C27.1434124,16.2966658 26.6534173,16.1940001 26.1214147,16.166 C25.589412,16.1379999 25.0807504,16.124 24.5954147,16.124 L24.5954147,13.324 Z",
    id: "H3",
    className: "icon-fillcolor",
    fill: "currentColor"
  }));
}
function h4() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 34 31",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0.932,5.008 L5.328,5.008 L5.328,12.68 L13.42,12.68 L13.42,5.008 L17.816,5.008 L17.816,25 L13.42,25 L13.42,16.376 L5.328,16.376 L5.328,25 L0.932,25 L0.932,5.008 Z M26.9474147,10.384 L26.8634147,10.384 L21.7954147,17.188 L26.9474147,17.188 L26.9474147,10.384 Z M26.9474147,20.464 L18.6594147,20.464 L18.6594147,16.824 L27.1714147,5.4 L30.7274147,5.4 L30.7274147,17.188 L33.3314147,17.188 L33.3314147,20.464 L30.7274147,20.464 L30.7274147,25 L26.9474147,25 L26.9474147,20.464 Z",
    id: "H4",
    className: "icon-fillcolor",
    fill: "currentColor"
  }));
}
var icons = {
  imageWide: imageWide,
  imageLeft: imageLeft,
  imageCenter: imageCenter,
  imageFill: imageFill,
  image: image,
  card: card,
  video: video,
  divider: divider,
  button: button,
  add: add,
  embed: embed,
  fontColor: fontColor,
  bold: bold,
  italic: italic,
  insertunorderedlist: insertunorderedlist,
  insertorderedlist: insertorderedlist,
  link: link,
  close: close,
  h1: h1,
  h2: h2,
  h3: h3,
  h4: h4,
  blockquote: blockquote,
  code: code
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

var AnchorStyle = styled.div(templateObject_1$a || (templateObject_1$a = __makeTemplateObject(["\n  // MENU\n  //position: absolute;\n  //visibility: hidden;\n  z-index: 10;\n  -webkit-transition: none;\n  transition: none;\n  display: none;\n  top: 0;\n  left: 0;\n  display: block;\n  white-space: nowrap;\n\n  height: ", ";\n  background: ", ";\n  color: ", ";\n\n  border: ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n\n  // CARET\n  // &:before -> Borde\n  // &:after  -> Triangulo\n\n  &.dante-menu {\n    &:after {\n      content: \"\";\n      height: 0;\n      width: 0;\n      position: absolute;\n      left: ", ";\n      pointer-events: none;\n      border: ", " solid transparent;\n      margin-left: -", ";\n    }\n    &:after {\n      border-top-color: ", ";\n      bottom: -", ";\n    }\n  }\n\n  &.dante-sticky-menu {\n    position: -webkit-sticky;\n    position: sticky;\n    width: 100%;\n    border-radius: 0px;\n    //overflow-x: scroll;\n    &:after {\n      display: none;\n    }\n  }\n\n  &.is-active {\n    visibility: visible;\n    opacity: 1;\n    transition: visibility 0s linear 0s, opacity 0.2s 0s;\n  }\n\n  &.is-active {\n    opacity: 1;\n  }\n\n  // Visible\n\n  &.dante-menu--active {\n    display: inline-block !important;\n    visibility: visible !important;\n    -webkit-animation: pop-upwards 180ms forwards linear;\n    animation: pop-upwards 180ms forwards linear;\n  }\n\n  // Link mode\n\n  &.dante-menu--linkmode {\n    .dante-menu-buttons {\n      visibility: hidden;\n    }\n    .dante-menu-linkinput {\n      display: block;\n    }\n    .dante-menu-input {\n      -webkit-animation: pop-upwards 180ms forwards linear;\n      animation: pop-upwards 180ms forwards linear;\n    }\n  }\n\n  &.popover--Linktooltip .popover-inner {\n    padding: 10px 10px;\n    font-size: 12px;\n  }\n\n  &.popover--tooltip .popover-inner {\n    //background: #333333;\n    border-radius: 4px;\n    color: ", ";\n  }\n\n  .popover-inner a {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  .popover-arrow {\n    position: absolute;\n  }\n\n  .popover-arrow:after {\n    background-color: ", ";\n  }\n\n  &.popover--top .popover-arrow,\n  &.popover--bottom .popover-arrow {\n    left: 50%;\n    margin-left: -", ";\n  }\n\n  &.popover--left .popover-arrow,\n  &.popover--right .popover-arrow {\n    top: 50%;\n    margin-top: -", ";\n  }\n\n  &.popover--right .popover-arrow {\n    left: 1px;\n  }\n\n  &.popover--bottom .popover-arrow {\n    top: -13px;\n  }\n\n  &.popover--left .popover-arrow {\n    right: 1px;\n    // clip: rect(-4px 14px 18px 0);\n  }\n\n  .popover-arrow:after {\n    content: \"\";\n    display: block;\n    width: ", ";\n    height: ", ";\n  }\n\n  &.popover--top .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(-5px, -5px);\n    -ms-transform: rotate(45deg) translate(-5px, -5px);\n    transform: rotate(45deg) translate(-5px, -5px);\n    box-shadow: 1px 1px 1px -1px ", ";\n  }\n\n  &.popover--right .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(6px, -6px);\n    -ms-transform: rotate(45deg) translate(6px, -6px);\n    transform: rotate(45deg) translate(6px, -6px);\n    box-shadow: -1px 1px 1px -1px ", ";\n  }\n\n  &.popover--bottom .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(6px, 6px);\n    -ms-transform: rotate(45deg) translate(6px, 6px);\n    transform: rotate(45deg) translate(6px, 6px);\n    box-shadow: -1px -1px 1px -1px ", ";\n  }\n\n  &.popover--left .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(-6px, 6px);\n    -ms-transform: rotate(45deg) translate(-6px, 6px);\n    transform: rotate(45deg) translate(-6px, 6px);\n    box-shadow: 1px -1px 1px -1px ", ";\n  }\n\n  // BUTONS\n\n  .dante-menu-buttons {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    line-height: 0;\n  }\n  .dante-menu-divider {\n    width: 1px;\n    height: ", ";\n    margin: 9px 2px;\n    background: rgba(100, 100, 100, 0.2);\n    display: inline-block;\n    overflow: hidden;\n    cursor: default;\n    line-height: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  .dante-menu-button,\n  button {\n    background-color: transparent;\n    min-width: 20px;\n    display: inline-block;\n    padding-left: 10px;\n    padding-right: 10px;\n    overflow: hidden;\n    text-align: center;\n    color: ", ";\n    cursor: pointer;\n    font-size: ", ";\n    line-height: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n\n    &:hover {\n      // nada\n    }\n    &.active {\n      color: ", ";\n    }\n\n    &:first-of-type {\n      border-top-left-radius: ", ";\n      border-bottom-left-radius: ", ";\n      padding-left: 18px;\n    }\n    &:last-child {\n      border-top-right-radius: ", ";\n      border-bottom-right-radius: ", ";\n      padding-right: 18px;\n    }\n  }\n\n  .dante-menu-button--disabled {\n    -webkit-user-select: none !important;\n    -moz-user-select: none !important;\n    -ms-user-select: none !important;\n    user-select: none !important;\n    opacity: 0.3;\n  }\n\n  // LINK\n\n  .dante-menu-linkinput {\n    & {\n      display: none;\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n    }\n    .dante-menu-button {\n      position: absolute;\n      top: 0;\n      right: 0;\n    }\n  }\n\n  .dante-menu-input {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    padding: 13px 40px 13px 10px;\n    color: ", ";\n    background: transparent;\n    border: none;\n    outline: none;\n    font-size: 14px;\n    box-sizing: border-box;\n    border-radius: ", ";\n    appearance: none;\n    text-align: left;\n    font-family: ", ";\n    letter-spacing: 0.01rem;\n    font-weight: 400;\n    font-style: normal;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -moz-font-feature-settings: \"liga\" on;\n  }\n\n  &:after {\n    border-top-color: ", ";\n  }\n  .dante-menu-input {\n    padding: 11px 40px 11px 10px;\n  }\n  .dante-menu-button {\n    padding-left: 0;\n    padding-right: 0;\n    vertical-align: top;\n    line-height: 1;\n    margin: 0px;\n  }\n  .dante-menu-button:first-of-type {\n    border-top-left-radius: 4px;\n    border-bottom-left-radius: 4px;\n    padding-left: 0;\n  }\n  .dante-menu-button:last-of-type {\n    border-top-right-radius: 4px;\n    border-bottom-right-radius: 4px;\n    padding-right: 0;\n  }\n  .dante-menu-button.visible-overflow {\n    vertical-align: top;\n  }\n  .dante-menu-button button {\n    height: 42px;\n  }\n  .dante-menu-button .dante-icon {\n    padding: 10px;\n    min-width: 20px;\n    display: inline-block;\n  }\n  .dante-menu-button .tooltip-icon {\n    padding: 10px;\n    display: inline-block;\n  }\n\n  .dante-menu-button .dante-icon:hover .icon-fillcolor {\n    fill: ", ";\n  }\n  .dante-menu-button.active .dante-icon .icon-fillcolor {\n    fill: ", ";\n  }\n\n  .dante-menu-button .dante-icon svg {\n    display: inherit !important;\n    vertical-align: inherit !important;\n  }\n  .dropdown {\n    float: left;\n  }\n  .dropdown .btn {\n    color: #bec2cc;\n    padding: 0 10px;\n    width: auto;\n    font-size: 12px;\n  }\n  .dropdown .btn .caret {\n    border-top-color: #62656a;\n    margin-left: 4px;\n  }\n  .dropdown .btn:hover {\n    color: ", ";\n  }\n  .dropdown .btn:hover .caret {\n    border-top-color: ", ";\n  }\n  .dropdown .dropdown-menu {\n    background: #2a2b32;\n    padding: 0;\n    max-height: 300px;\n    overflow-y: auto;\n    width: auto;\n    min-width: 60px;\n  }\n  .dropdown .dropdown-menu li {\n    border-bottom: 1px solid #383943;\n  }\n  .dropdown .dropdown-menu li:last-child {\n    border-bottom: 0;\n  }\n  .dropdown .dropdown-menu li a {\n    color: #bec2cc;\n    font-size: 12px;\n    padding: 0 10px;\n    line-height: 30px;\n  }\n  .dropdown.open > .dropdown-toggle.btn-default {\n    color: #bec2cc;\n  }\n  .dropdown .dropdown-menu li a:hover,\n  .dropdown.open > .dropdown-toggle.btn-default:hover {\n    background: 0;\n    color: ", ";\n  }\n\n  .divider {\n    position: relative;\n    float: left;\n    width: 1px;\n    height: 20px;\n    margin: 10px 5px;\n    background: ", ";\n  }\n"], ["\n  // MENU\n  //position: absolute;\n  //visibility: hidden;\n  z-index: 10;\n  -webkit-transition: none;\n  transition: none;\n  display: none;\n  top: 0;\n  left: 0;\n  display: block;\n  white-space: nowrap;\n\n  height: ", ";\n  background: ", ";\n  color: ", ";\n\n  border: ", ";\n  border-radius: ", ";\n  box-shadow: ", ";\n\n  // CARET\n  // &:before -> Borde\n  // &:after  -> Triangulo\n\n  &.dante-menu {\n    &:after {\n      content: \"\";\n      height: 0;\n      width: 0;\n      position: absolute;\n      left: ", ";\n      pointer-events: none;\n      border: ", " solid transparent;\n      margin-left: -", ";\n    }\n    &:after {\n      border-top-color: ", ";\n      bottom: -", ";\n    }\n  }\n\n  &.dante-sticky-menu {\n    position: -webkit-sticky;\n    position: sticky;\n    width: 100%;\n    border-radius: 0px;\n    //overflow-x: scroll;\n    &:after {\n      display: none;\n    }\n  }\n\n  &.is-active {\n    visibility: visible;\n    opacity: 1;\n    transition: visibility 0s linear 0s, opacity 0.2s 0s;\n  }\n\n  &.is-active {\n    opacity: 1;\n  }\n\n  // Visible\n\n  &.dante-menu--active {\n    display: inline-block !important;\n    visibility: visible !important;\n    -webkit-animation: pop-upwards 180ms forwards linear;\n    animation: pop-upwards 180ms forwards linear;\n  }\n\n  // Link mode\n\n  &.dante-menu--linkmode {\n    .dante-menu-buttons {\n      visibility: hidden;\n    }\n    .dante-menu-linkinput {\n      display: block;\n    }\n    .dante-menu-input {\n      -webkit-animation: pop-upwards 180ms forwards linear;\n      animation: pop-upwards 180ms forwards linear;\n    }\n  }\n\n  &.popover--Linktooltip .popover-inner {\n    padding: 10px 10px;\n    font-size: 12px;\n  }\n\n  &.popover--tooltip .popover-inner {\n    //background: #333333;\n    border-radius: 4px;\n    color: ", ";\n  }\n\n  .popover-inner a {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  .popover-arrow {\n    position: absolute;\n  }\n\n  .popover-arrow:after {\n    background-color: ", ";\n  }\n\n  &.popover--top .popover-arrow,\n  &.popover--bottom .popover-arrow {\n    left: 50%;\n    margin-left: -", ";\n  }\n\n  &.popover--left .popover-arrow,\n  &.popover--right .popover-arrow {\n    top: 50%;\n    margin-top: -", ";\n  }\n\n  &.popover--right .popover-arrow {\n    left: 1px;\n  }\n\n  &.popover--bottom .popover-arrow {\n    top: -13px;\n  }\n\n  &.popover--left .popover-arrow {\n    right: 1px;\n    // clip: rect(-4px 14px 18px 0);\n  }\n\n  .popover-arrow:after {\n    content: \"\";\n    display: block;\n    width: ", ";\n    height: ", ";\n  }\n\n  &.popover--top .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(-5px, -5px);\n    -ms-transform: rotate(45deg) translate(-5px, -5px);\n    transform: rotate(45deg) translate(-5px, -5px);\n    box-shadow: 1px 1px 1px -1px ", ";\n  }\n\n  &.popover--right .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(6px, -6px);\n    -ms-transform: rotate(45deg) translate(6px, -6px);\n    transform: rotate(45deg) translate(6px, -6px);\n    box-shadow: -1px 1px 1px -1px ", ";\n  }\n\n  &.popover--bottom .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(6px, 6px);\n    -ms-transform: rotate(45deg) translate(6px, 6px);\n    transform: rotate(45deg) translate(6px, 6px);\n    box-shadow: -1px -1px 1px -1px ", ";\n  }\n\n  &.popover--left .popover-arrow:after {\n    -webkit-transform: rotate(45deg) translate(-6px, 6px);\n    -ms-transform: rotate(45deg) translate(-6px, 6px);\n    transform: rotate(45deg) translate(-6px, 6px);\n    box-shadow: 1px -1px 1px -1px ", ";\n  }\n\n  // BUTONS\n\n  .dante-menu-buttons {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    line-height: 0;\n  }\n  .dante-menu-divider {\n    width: 1px;\n    height: ", ";\n    margin: 9px 2px;\n    background: rgba(100, 100, 100, 0.2);\n    display: inline-block;\n    overflow: hidden;\n    cursor: default;\n    line-height: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  .dante-menu-button,\n  button {\n    background-color: transparent;\n    min-width: 20px;\n    display: inline-block;\n    padding-left: 10px;\n    padding-right: 10px;\n    overflow: hidden;\n    text-align: center;\n    color: ", ";\n    cursor: pointer;\n    font-size: ", ";\n    line-height: ", ";\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n\n    &:hover {\n      // nada\n    }\n    &.active {\n      color: ", ";\n    }\n\n    &:first-of-type {\n      border-top-left-radius: ", ";\n      border-bottom-left-radius: ", ";\n      padding-left: 18px;\n    }\n    &:last-child {\n      border-top-right-radius: ", ";\n      border-bottom-right-radius: ", ";\n      padding-right: 18px;\n    }\n  }\n\n  .dante-menu-button--disabled {\n    -webkit-user-select: none !important;\n    -moz-user-select: none !important;\n    -ms-user-select: none !important;\n    user-select: none !important;\n    opacity: 0.3;\n  }\n\n  // LINK\n\n  .dante-menu-linkinput {\n    & {\n      display: none;\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n    }\n    .dante-menu-button {\n      position: absolute;\n      top: 0;\n      right: 0;\n    }\n  }\n\n  .dante-menu-input {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    padding: 13px 40px 13px 10px;\n    color: ", ";\n    background: transparent;\n    border: none;\n    outline: none;\n    font-size: 14px;\n    box-sizing: border-box;\n    border-radius: ", ";\n    appearance: none;\n    text-align: left;\n    font-family: ", ";\n    letter-spacing: 0.01rem;\n    font-weight: 400;\n    font-style: normal;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -moz-font-feature-settings: \"liga\" on;\n  }\n\n  &:after {\n    border-top-color: ", ";\n  }\n  .dante-menu-input {\n    padding: 11px 40px 11px 10px;\n  }\n  .dante-menu-button {\n    padding-left: 0;\n    padding-right: 0;\n    vertical-align: top;\n    line-height: 1;\n    margin: 0px;\n  }\n  .dante-menu-button:first-of-type {\n    border-top-left-radius: 4px;\n    border-bottom-left-radius: 4px;\n    padding-left: 0;\n  }\n  .dante-menu-button:last-of-type {\n    border-top-right-radius: 4px;\n    border-bottom-right-radius: 4px;\n    padding-right: 0;\n  }\n  .dante-menu-button.visible-overflow {\n    vertical-align: top;\n  }\n  .dante-menu-button button {\n    height: 42px;\n  }\n  .dante-menu-button .dante-icon {\n    padding: 10px;\n    min-width: 20px;\n    display: inline-block;\n  }\n  .dante-menu-button .tooltip-icon {\n    padding: 10px;\n    display: inline-block;\n  }\n\n  .dante-menu-button .dante-icon:hover .icon-fillcolor {\n    fill: ", ";\n  }\n  .dante-menu-button.active .dante-icon .icon-fillcolor {\n    fill: ", ";\n  }\n\n  .dante-menu-button .dante-icon svg {\n    display: inherit !important;\n    vertical-align: inherit !important;\n  }\n  .dropdown {\n    float: left;\n  }\n  .dropdown .btn {\n    color: #bec2cc;\n    padding: 0 10px;\n    width: auto;\n    font-size: 12px;\n  }\n  .dropdown .btn .caret {\n    border-top-color: #62656a;\n    margin-left: 4px;\n  }\n  .dropdown .btn:hover {\n    color: ", ";\n  }\n  .dropdown .btn:hover .caret {\n    border-top-color: ", ";\n  }\n  .dropdown .dropdown-menu {\n    background: #2a2b32;\n    padding: 0;\n    max-height: 300px;\n    overflow-y: auto;\n    width: auto;\n    min-width: 60px;\n  }\n  .dropdown .dropdown-menu li {\n    border-bottom: 1px solid #383943;\n  }\n  .dropdown .dropdown-menu li:last-child {\n    border-bottom: 0;\n  }\n  .dropdown .dropdown-menu li a {\n    color: #bec2cc;\n    font-size: 12px;\n    padding: 0 10px;\n    line-height: 30px;\n  }\n  .dropdown.open > .dropdown-toggle.btn-default {\n    color: #bec2cc;\n  }\n  .dropdown .dropdown-menu li a:hover,\n  .dropdown.open > .dropdown-toggle.btn-default:hover {\n    background: 0;\n    color: ", ";\n  }\n\n  .divider {\n    position: relative;\n    float: left;\n    width: 1px;\n    height: 20px;\n    margin: 10px 5px;\n    background: ", ";\n  }\n"])), function (props) {
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
var templateObject_1$a;

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

var dante_font_family_sans = "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";
var dante_font_family_sans_serif = "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";

// const dante_font_family_sans = `'jaf-bernino-sans', 'Playfair Display', 'Open Sans', "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans_serif;`;
// const dante_font_family_sans_serif = `'freight-text-pro', 'Merriweather', Georgia, Cambria, "Times New Roman", Times, serif;`;
// const dante_font_family_sans_serif = `'freight-text-pro','Playfair Display', 'Merriweather', Georgia, Cambria, "Times New Roman", Times, serif;`;

var tooltip_size = "32px";
var dante_control_color = "#333333";
var dante_inversed_color = "#000";
var dante_accent_color = "#5BD974";
var dante_text_color = "#fefefe";
var theme = {
  dante_font_family_serif: dante_font_family_sans_serif,
  dante_font_family_sans: dante_font_family_sans,
  dante_font_family_mono: "Menlo, Monaco, Consolas, \"Courier New\", \"Courier\", monospace;",
  dante_font_family_base: dante_font_family_sans,
  // Editor
  dante_editor_font_size: "1.4rem",
  dante_editor_line_height: "1.9",
  dante_font_family_sans_serif: dante_font_family_sans_serif,
  dante_visual_debugger: "false",
  dante_text_color: dante_text_color,
  dante_inversed_color: dante_inversed_color,
  dante_accent_color: dante_accent_color,
  dante_control_color: dante_control_color,
  dante_popover_color: dante_inversed_color,
  //dante_font_size_base:  '24px',
  //line_height_base:     '1.428571429', // 20/14

  tooltip_color: "#fff",
  tooltip_background_color: "#000",
  tooltip_border_color: "#fff",
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
  dante_code_background: "#444",
  dante_code_color: "#fff",
  // Menu

  //background: #2A2B32;

  dante_menu_height: "42px",
  dante_menu_background: "#fff",
  dante_menu_color: "#0f0",
  dante_menu_border_radius: "4px",
  dante_menu_box_shadow: "1px 1px 3px 0px ".concat(dante_control_color),
  dante_menu_icon_size: "16px",
  dante_menu_icon_color: "#000",
  dante_menu_icon_accent: dante_accent_color,
  dante_menu_divider_color: dante_control_color,
  dante_menu_border_width: "0px",
  dante_menu_border_color: "none",
  dante_menu_caret_size: "8px",
  dante_bg_color: "black",
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

var index = {
    EditorContainer: EditorContainer,
    AnchorStyle: AnchorStyle,
};

function ReactMediumZoom(props) {
    var imgRef = React.useRef();
    var zoom = React.useRef(mediumZoom({
        margin: 40,
        background: '#000'
    }));
    React.useEffect(function () {
        if (!props.isEditable) {
            zoom.current.attach(imgRef.current);
        }
        if (props.isEditable) {
            zoom.current.detach(imgRef.current);
        }
    }, [props.isEditable]);
    var imgProps = __rest(props, []);
    return React.createElement("img", _assign({ ref: imgRef }, imgProps, { alt: imgRef }));
}

var StyleWrapper$5 = styled(NodeViewWrapper)(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject([""], [""])));
function ImageBlock(props) {
    // console.log("IMAGE:", props);
    var imageUrl = props.node.attrs.url || props.node.attrs.src;
    React.useEffect(function () {
        replaceImg();
    }, []);
    function setImage(url) {
        props.updateAttributes({
            url: url,
        });
    }
    function replaceImg() {
        var img = new Image();
        img.src = imageUrl; //props.node.attrs.src;
        // setImage(img.src)
        // exit only when not blob and not forceUload
        //if (!img.src.includes("blob:") && !props.node.attrs.forceUpload) {
        //  return;
        //}
        //if(props.node.attrs.aspect_ratio) return
        img.onload = function () {
            props.updateAttributes({
                width: img.width,
                height: img.height,
                aspect_ratio: getAspectRatio(img.width, img.height),
            });
            return handleUpload();
        };
    }
    function startLoader() {
        props.updateAttributes({
            loading: true,
        });
    }
    function stopLoader() {
        props.updateAttributes({
            loading: false,
        });
    }
    function handleUpload() {
        startLoader();
        uploadFile();
    }
    function formatData() {
        var formData = new FormData();
        if (props.node.attrs.file) {
            var formName = props.extension.options.upload_formName || 'file';
            formData.append(formName, props.node.attrs.file);
            return formData;
        }
        else {
            // TODO: check this
            formData.append("url", props.node.attrs.src);
            return formData;
        }
    }
    function uploadFile() {
        // custom upload handler
        if (props.extension.options.upload_handler) {
            return props.extension.options.upload_handler(formatData().get("file"), props);
        }
        if (!props.extension.options.upload_url) {
            stopLoader();
            return;
        }
        //this.props.blockProps.addLock()
        function getUploadUrl() {
            var url = props.extension.options.upload_url;
            if (typeof url === "function") {
                return url();
            }
            else {
                return url;
            }
        }
        function getUploadHeaders() {
            return props.extension.options.upload_headers || {};
        }
        axios({
            method: 'post',
            url: getUploadUrl(),
            headers: getUploadHeaders(),
            data: formatData(),
            onUploadProgress: function (e) {
                console.log("PROCVESSS ", e);
                return updateProgressBar(e);
            }
        }).then(function (result) {
            uploadCompleted(result.data.url);
            if (props.extension.options.upload_callback) {
                return props.extension.options.upload_callback(result, props);
            }
        }).catch(function (error) {
            //this.uploadFailed()
            console.log("ERROR: got error uploading file ".concat(error));
            if (props.extension.options.upload_error_callback) {
                return props.extension.options.upload_error_callback(error, props);
            }
        });
        return function (json_response) {
            // return uploadCompleted("https://i.imgur.com/XUWx1hA.jpeg");
            return uploadCompleted(json_response.url);
        };
    }
    function uploadCompleted(url) {
        setImage(url);
        //this.props.blockProps.removeLock()
        stopLoader();
    }
    function updateProgressBar(e) {
        var complete = props.node.attrs.loading_progress;
        if (e.lengthComputable) {
            complete = e.loaded / e.total * 100;
            complete = complete != null ? complete : { complete: 0 };
            props.updateAttributes({ loading_progress: complete });
            console.log("complete: ".concat(complete));
        }
    }
    function getAspectRatio(w, h) {
        var maxWidth = 1000;
        var maxHeight = 1000;
        var ratio = 0;
        var width = w; // Current image width
        var height = h; // Current image height
        // Check if the current width is larger than the max
        if (width > maxWidth) {
            ratio = maxWidth / width; // get ratio for scaling image
            height = height * ratio; // Reset height to match scaled image
            width = width * ratio; // Reset width to match scaled image
            // Check if current height is larger than max
        }
        else if (height > maxHeight) {
            ratio = maxHeight / height; // get ratio for scaling image
            width = width * ratio; // Reset width to match scaled image
            height = height * ratio; // Reset height to match scaled image
        }
        var fill_ratio = (height / width) * 100;
        var result = { width: width, height: height, ratio: fill_ratio };
        // console.log result
        return result;
    }
    function setActive() {
        props.editor.commands.setNodeSelection(props.getPos());
    }
    function handleClick(e) {
        // console.log("clicked, ", e);
        setActive();
    }
    function directionClass() {
        switch (props.node.attrs.direction) {
            case "left":
                return "graf--layoutOutsetLeft";
            case "center":
                return "";
            case "wide":
                return "sectionLayout--fullWidth";
            case "fill":
                return "graf--layoutFillWidth";
            default:
                return "";
        }
    }
    function parseAspectRatio() {
        if (typeof (props.node.attrs.aspect_ratio) === "string") {
            try {
                return JSON.parse(props.node.attrs.aspect_ratio);
            }
            catch (error) {
                return {};
            }
        }
        else {
            return props.node.attrs.aspect_ratio;
        }
    }
    var _a = parseAspectRatio(), width = _a.width, height = _a.height, ratio = _a.ratio;
    return (React.createElement(StyleWrapper$5, { selected: props.selected, as: "figure", "data-drag-handle": "true", className: "graf graf--figure ".concat(directionClass(), " ").concat(props.selected ? "is-selected is-mediaFocused" : "") },
        React.createElement("div", { onClick: handleClick, className: "aspectRatioPlaceholder is-locked", style: {
                maxHeight: height,
                maxWidth: width,
            } },
            React.createElement("div", { className: "aspect-ratio-fill", style: { paddingBottom: "".concat(ratio, "%") } }),
            React.createElement(ReactMediumZoom, { src: imageUrl, height: width, width: height, className: "graf-image ".concat(props.editor.isEditable ? ".no-zoom" : ""), disabled: props.editor.isEditable, contentEditable: false, isEditable: props.editor.isEditable })),
        React.createElement(NodeViewContent, { as: "figcaption", className: "imageCaption" }, props.node.content.size === 0 && (React.createElement("span", { className: "danteDefaultPlaceholder" }, "type a caption (optional)")))));
}
var ImageBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        name: "ImageBlock",
        icon: image,
        tag: "image-block",
        component: ImageBlock,
        atom: false,
        draggable: true,
        attributes: {
            url: { default: null },
            src: { default: null },
            width: { default: "" },
            height: { default: "" },
            loading: { default: false },
            loading_progress: { default: 0 },
            caption: { default: "caption!" },
            direction: { default: "center" },
            file: { default: null },
            aspect_ratio: {
                default: {
                    width: 200,
                    height: 200,
                    ratio: 100,
                },
            },
        },
        dataSerializer: function (data) {
            return _assign(_assign({}, data), { aspect_ratio: JSON.stringify(data.aspect_ratio), file: null });
        },
        options: {
            upload_handler: function (file, ctx) {
                console.log("UPLOADED FILE", file);
            },
        },
        parseHTML: [
            {
                tag: "image-block",
            },
            {
                tag: "img[src]",
            },
        ],
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "upload",
            insert_block: "image",
        },
        keyboardShortcuts: function (editor) {
            return {
                Enter: function (_a) {
                    var editor = _a.editor;
                    if (editor.isActive("ImageBlock")) {
                        //editor.commands.selectNodeForward()
                        editor.commands.insertContent({
                            type: "paragraph",
                        });
                        editor
                            .chain()
                            .focus()
                            //.insertContent("<strong>It's happening</strong>")
                            .toggleNode("paragraph", "paragraph", {})
                            .run();
                        return true;
                    }
                },
            };
        },
    };
    return Object.assign(config, options);
};
var templateObject_1$9;

var StyleWrapper$4 = styled(NodeViewWrapper)(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), function (props) { return "border: 3px solid ".concat(props.selected ? "purple" : "black", ";"); });
function EmbedBlock(props) {
    var _a = React.useState(null), error = _a[0], setError = _a[1];
    React.useEffect(function () {
        initializeCard();
    }, []);
    function picture() {
        if (props.node.attrs.embed_data.images &&
            props.node.attrs.embed_data.images.length > 0) {
            return props.node.attrs.embed_data.images[0].url;
        }
        else if (props.node.attrs.embed_data.thumbnail_url) {
            return props.node.attrs.embed_data.thumbnail_url;
        }
        else if (props.node.attrs.embed_data.image) {
            return props.node.attrs.embed_data.image;
        }
        else {
            return null;
        }
    }
    function classForImage() {
        if (picture()) {
            return "";
        }
        else {
            return "mixtapeImage--empty u-ignoreBlock";
        }
    }
    function deleteSelf() {
        props.deleteNode();
    }
    function updateData(data) {
        props.updateAttributes({
            embed_data: data,
        });
    }
    function dataForUpdate() {
        return props.node.attrs;
    }
    function initializeCard() {
        if (!dataForUpdate()) {
            return;
        }
        // ensure data isnt already loaded
        // unless @dataForUpdate().endpoint or @dataForUpdate().provisory_text
        if (!dataForUpdate().provisory_text) {
            return;
        }
        return axios({
            method: "get",
            url: "".concat(props.extension.options.endpoint).concat(dataForUpdate().provisory_text, "&scheme=https"),
        })
            .then(function (result) {
            return updateData(result.data); //JSON.parse(data.responseText)
        })
            .catch(function (error) {
            setError(error.response.data.error_message);
            return console.log("TODO: error");
        });
    }
    function handleClick(e) {
        //if(!this.props.blockProps.getEditor().props.read_only){
        //  e.preventDefault()
        //}
    }
    function parseEmbedData() {
        if (typeof (props.node.attrs.embed_data) === "string") {
            try {
                return JSON.parse(props.node.attrs.embed_data);
            }
            catch (error) {
                return {};
            }
        }
        else {
            return props.node.attrs.embed_data;
        }
    }
    var embed_data = parseEmbedData();
    return (React.createElement(StyleWrapper$4, { "data-drag-handle": "true", selected: props.selected, className: "graf graf--mixtapeEmbed ".concat(props.selected ? "is-selected is-mediaFocused" : "") },
        React.createElement("span", { contentEditable: false },
            picture() ? (React.createElement("a", { target: "_blank", className: "js-mixtapeImage mixtapeImage ".concat(classForImage()), href: embed_data.url, style: { backgroundImage: "url('".concat(picture(), "')") }, rel: "noreferrer" }, " ")) : undefined,
            error ? React.createElement("h2", null, error) : undefined,
            //!this.props.blockProps.getEditor().props.read_only
            props.editor.isEditable ? (React.createElement("button", { type: "button", className: "graf--media-embed-close", onClick: deleteSelf }, "x")) : null,
            React.createElement("a", { className: "markup--anchor markup--mixtapeEmbed-anchor", target: "_blank", href: embed_data.url, onClick: handleClick, contentEditable: false, rel: "noreferrer" },
                React.createElement("strong", { className: "markup--strong markup--mixtapeEmbed-strong" }, embed_data.title),
                React.createElement("em", { className: "markup--em markup--mixtapeEmbed-em" }, embed_data.description)),
            React.createElement("span", { contentEditable: false }, embed_data.provider_url || embed_data.url))));
}
var EmbedBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        icon: embed,
        name: "EmbedBlock",
        tag: "embed-block",
        component: EmbedBlock,
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "placeholder",
            insert_block: "embed",
        },
        options: {
            endpoint: "//noembed.com/embed?url=",
            placeholder: "Paste a link to embed content from another site (e.g. Twitter) and press Enter"
        },
        attributes: {
            embed_data: {
                default: {},
            },
            provisory_text: { default: null },
        },
        dataSerializer: function (data) {
            return _assign(_assign({}, data), { embed_data: JSON.stringify(data.embed_data) });
        },
    };
    return Object.assign(config, options);
};
var templateObject_1$8;

function isEmpty(obj) {
  return obj &&
  // 👈 null and undefined check
  Object.keys(obj).length === 0 && obj.constructor === Object;
}

var StyleWrapper$3 = styled(NodeViewWrapper)(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject([""], [""])));
function VideoBlock(props) {
    React.useEffect(function () {
        if (!isEmpty(props.node.attrs.embed_data)) {
            return;
        }
        // ensure data isnt already loaded
        if (!dataForUpdate().provisory_text) {
            return;
        }
        axios({
            method: "get",
            url: "".concat(props.extension.options.endpoint).concat(dataForUpdate().provisory_text, "&scheme=https"),
        })
            .then(function (result) {
            updateData(result.data);
        })
            .catch(function (error) {
            return console.log("TODO: error");
        });
    }, []);
    function updateData(data) {
        props.updateAttributes({
            embed_data: data,
        });
    }
    function dataForUpdate() {
        return props.node.attrs;
    }
    function renderEmbedHtml() {
        var embed_data = parseEmbedData();
        if (dataForUpdate().mediaRenderHandler) {
            return dataForUpdate().mediaRenderHandler();
        }
        else {
            return embed_data.media
                ? embed_data.media.html
                : embed_data.html;
        }
    }
    function parseEmbedData() {
        if (typeof (props.node.attrs.embed_data) === "string") {
            try {
                return JSON.parse(props.node.attrs.embed_data);
            }
            catch (error) {
                return {};
            }
        }
        else {
            return props.node.attrs.embed_data;
        }
    }
    return (React.createElement(StyleWrapper$3, { as: "figure", "data-drag-handle": "true", className: "graf--figure graf--iframe graf--first ".concat(props.selected ? "is-selected is-mediaFocused" : ""), tabIndex: "0" },
        React.createElement("div", { className: "iframeContainer", dangerouslySetInnerHTML: { __html: renderEmbedHtml() } }),
        React.createElement(NodeViewContent, { as: "figcaption", className: "imageCaption" }, props.node.content.size === 0 && (React.createElement("span", { className: "danteDefaultPlaceholder" }, props.extension.options.caption)))));
}
var VideoBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        icon: video,
        name: "VideoBlock",
        tag: "video-block",
        component: VideoBlock,
        atom: false,
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "placeholder",
            insert_block: "video",
        },
        options: {
            endpoint: "//noembed.com/embed?url=",
            placeholder: "Paste a YouTube, Vine, Vimeo, or other video link, and press Enter",
            caption: "Type caption for embed (optional)",
        },
        attributes: {
            embed_data: {
                default: {},
            },
            provisory_text: { default: null },
        },
        dataSerializer: function (data) {
            return _assign(_assign({}, data), { embed_data: JSON.stringify(data.embed_data) });
        },
    };
    return Object.assign(config, options);
};
var templateObject_1$7;
/*
export const VideoBlockConfig = (options={})=>{
  let config = {
      title: 'insert video',
      editable: true,
      type: 'video',
      icon: video,
      block: VideoBlock,
      renderable: true,
      breakOnContinuous: true,
      wrapper_class: "graf--figure graf--iframe",
      selected_class: " is-selected is-mediaFocused",
      widget_options: {
        displayOnInlineTooltip: true,
        insertion: "placeholder",
        insert_block: "video"
      },
      options: {
        endpoint: '//noembed.com/embed?url=',
        placeholder: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter',
        caption: 'Type caption for embed (optional)'
      },

      handleEnterWithoutText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      },

      handleEnterWithText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      }
  }

  return Object.assign(config, options)
}
*/

var StyleWrapper$2 = styled(NodeViewWrapper)(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n  .editable-content {\n    color: ", ";\n    background: ", ";\n    //border-color: ", ";\n    //border-width: 1px;\n    padding: 10px;\n    border-radius: 5px;\n    box-shadow: 0px 1px 3px 0px #9e9e9e54;\n    ::after {\n      content: attr(data-placeholder);\n      color: #b5b4b4;\n      font-size: 0.6em;\n      width: 100%;\n      border-top: 1px solid #c1c1c1;\n      padding-top: 1px;\n    }\n    button {\n      float: right;\n    }\n  }\n"], ["\n  .editable-content {\n    color: ", ";\n    background: ", ";\n    //border-color: ", ";\n    //border-width: 1px;\n    padding: 10px;\n    border-radius: 5px;\n    box-shadow: 0px 1px 3px 0px #9e9e9e54;\n    ::after {\n      content: attr(data-placeholder);\n      color: #b5b4b4;\n      font-size: 0.6em;\n      width: 100%;\n      border-top: 1px solid #c1c1c1;\n      padding-top: 1px;\n    }\n    button {\n      float: right;\n    }\n  }\n"])), function (props) { return props.theme.dante_text_color; }, function (props) { return props.theme.dante_bg_color; }, function (props) { return props.theme.dante_text_color; });
function PlaceholderBlock(props) {
    // console.log(props.node.attrs.blockKind);
    return (React.createElement(StyleWrapper$2, { selected: props.selected },
        React.createElement("div", { className: "content" },
            React.createElement(NodeViewContent, { className: "editable-content", "data-placeholder": props.node.attrs.blockKind.options.placeholder },
                React.createElement("button", { onClick: function () { return props.deleteNode(); } },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })))))));
}
var PlaceholderBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        name: "PlaceholderBlock",
        tag: "placeholder-block",
        component: PlaceholderBlock,
        priority: 20,
        //onUpdate: (editor) => {
        //  console.log("CONTENT CHANGED ON PLACEHOLDER!!!", editor)
        //},
        keyboardShortcuts: function (editor) {
            return {
                Enter: function () {
                    if (editor.isActive("PlaceholderBlock")) {
                        var parentComp = editor.state.selection.$anchor.parent;
                        var comp = parentComp.attrs.blockKind;
                        var text = parentComp.textContent;
                        if (!(comp === null || comp === void 0 ? void 0 : comp.name))
                            return;
                        editor
                            .chain()
                            .toggleNode(comp.name, comp.name, { provisory_text: text })
                            .run();
                    }
                    //return editor.commands.toggleBulletList()
                    return false;
                },
            };
        },
        attributes: {
            blockKind: {
                default: {},
            },
        },
    };
    return Object.assign(config, options);
};
var templateObject_1$6;

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

var VideoContainer = styled.div(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n  background: ", ";\n  padding: 0px;\n  margin-bottom: 10px;\n  //border: 1px solid ", ";\n  box-shadow: ", ";\n  border-radius: 10px;\n  position: relative;\n"], ["\n  background: ", ";\n  padding: 0px;\n  margin-bottom: 10px;\n  //border: 1px solid ", ";\n  box-shadow: ", ";\n  border-radius: 10px;\n  position: relative;\n"])), function (props) { return props.theme.inversed_color; }, function (props) { return props.theme.dante_control_color; }, function (props) { return props.theme.dante_menu_box_shadow; });
var VideoBody = styled.div(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  padding-bottom: 20px;\n"], ["\n  padding-bottom: 20px;\n"])));
var green = "#00ab6b";
var red = "#e61742";
var gray = "#bbbbbb";
styled.div(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  background: ", ";\n  position: absolute;\n  height: 13px;\n  width: 13px;\n  border-radius: 50%;\n  display: inline-block;\n  position: absolute;\n  top: 58px;\n  right: 25px;\n  box-shadow: inset -1px -2px 14px 0px #841744;\n"], ["\n  background: ", ";\n  position: absolute;\n  height: 13px;\n  width: 13px;\n  border-radius: 50%;\n  display: inline-block;\n  position: absolute;\n  top: 58px;\n  right: 25px;\n  box-shadow: inset -1px -2px 14px 0px #841744;\n"])), function (props) { return (props.active ? red : green); });
var EditorControls = styled.div(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject(["\n  position: absolute;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  -ms-flex-pack: center;\n  //margin-top: 25px;\n  //margin-left: 17px;\n  height: 84%;\n  z-index: 10;\n  width: 100%;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  .controls-recording {\n    position: relative;\n    display: flex;\n    align-items: center;\n  }\n"], ["\n  position: absolute;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  -ms-flex-pack: center;\n  //margin-top: 25px;\n  //margin-left: 17px;\n  height: 84%;\n  z-index: 10;\n  width: 100%;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  .controls-recording {\n    position: relative;\n    display: flex;\n    align-items: center;\n  }\n"])));
var StatusBar = styled.div(templateObject_5$2 || (templateObject_5$2 = __makeTemplateObject(["\n  z-index: 10;\n  position: absolute;\n  height: 80%;\n  width: 100%;\n  background: ", ";\n  display: ", ";\n  align-items: center;\n\n  opacity: ", ";\n"], ["\n  z-index: 10;\n  position: absolute;\n  height: 80%;\n  width: 100%;\n  background: ", ";\n  display: ", ";\n  align-items: center;\n\n  opacity: ", ";\n"])), function (props) { return (props.loading ? "white" : "transparent"); }, function (props) { return (props.loading ? "flex" : "none"); }, function (props) { return (props.loading ? "0.9" : "1"); });
var VideoPlayer = styled.video(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 100%;\n  background: black;\n"], ["\n  width: 100%;\n  background: black;\n"])));
var SecondsLeft = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  //position: absolute;\n  font-size: 1rem;\n  right: 39px;\n  top: 19px;\n  font-size: 2em;\n  color: white;\n"], ["\n  //position: absolute;\n  font-size: 1rem;\n  right: 39px;\n  top: 19px;\n  font-size: 2em;\n  color: white;\n"])));
var RecButton = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: inline-block;\n  cursor: pointer;\n  -webkit-transition: all 0.25s ease;\n  transition: all 0.25s ease;\n  margin: 7px 17px;\n  text-indent: 36px;\n\n  text-indent: 36px;\n  color: #d9ece5;\n  text-shadow: 0px 1px 0px #101010;\n\n  &:hover {\n    //color: ", "\n    color: #d9ece5;\n  }\n\n  &:before {\n    position: absolute;\n    width: 26px;\n    height: 26px;\n    top: 15px;\n    content: \"\";\n    border-radius: 50px;\n    background: #e80415;\n    cursor: pointer;\n    left: 16px;\n  }\n\n  &.recording {\n    &:before {\n      position: absolute;\n      width: 26px;\n      height: 26px;\n      top: 15px;\n      content: \"\";\n      border-radius: 50px;\n      background: #e80415;\n      cursor: pointer;\n      left: 16px;\n    }\n  }\n\n  &:after {\n    position: absolute;\n    width: 30px;\n    height: 30px;\n    top: 19px;\n    left: 19px;\n    content: \"\";\n    -webkit-transform: translate(-6px, -6px);\n    -ms-transform: translate(-6px, -6px);\n    -webkit-transform: translate(-6px, -6px);\n    -ms-transform: translate(-6px, -6px);\n    -webkit-transform: translate(-6px, -6px);\n    -ms-transform: translate(-6px, -6px);\n    transform: translate(-6px, -6px);\n    border-radius: 50%;\n    border: 2px solid #fff;\n    cursor: pointer;\n  }\n"], ["\n  display: inline-block;\n  cursor: pointer;\n  -webkit-transition: all 0.25s ease;\n  transition: all 0.25s ease;\n  margin: 7px 17px;\n  text-indent: 36px;\n\n  text-indent: 36px;\n  color: #d9ece5;\n  text-shadow: 0px 1px 0px #101010;\n\n  &:hover {\n    //color: ", "\n    color: #d9ece5;\n  }\n\n  &:before {\n    position: absolute;\n    width: 26px;\n    height: 26px;\n    top: 15px;\n    content: \"\";\n    border-radius: 50px;\n    background: #e80415;\n    cursor: pointer;\n    left: 16px;\n  }\n\n  &.recording {\n    &:before {\n      position: absolute;\n      width: 26px;\n      height: 26px;\n      top: 15px;\n      content: \"\";\n      border-radius: 50px;\n      background: #e80415;\n      cursor: pointer;\n      left: 16px;\n    }\n  }\n\n  &:after {\n    position: absolute;\n    width: 30px;\n    height: 30px;\n    top: 19px;\n    left: 19px;\n    content: \"\";\n    -webkit-transform: translate(-6px, -6px);\n    -ms-transform: translate(-6px, -6px);\n    -webkit-transform: translate(-6px, -6px);\n    -ms-transform: translate(-6px, -6px);\n    -webkit-transform: translate(-6px, -6px);\n    -ms-transform: translate(-6px, -6px);\n    transform: translate(-6px, -6px);\n    border-radius: 50%;\n    border: 2px solid #fff;\n    cursor: pointer;\n  }\n"])), green);
var Button = styled.button(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  margin: 11px;\n  outline: none;\n  height: 37px;\n  /* margin-right: 10px; */\n  /* text-align: center; */\n  border-radius: 40px;\n  background: ", ";\n  border: 2px solid ", ";\n  color: #ffffff;\n  -webkit-letter-spacing: 1px;\n  -moz-letter-spacing: 1px;\n  -ms-letter-spacing: 1px;\n  letter-spacing: 1px;\n  text-shadow: 0;\n  cursor: pointer;\n  -webkit-transition: all 0.25s ease;\n  transition: all 0.25s ease;\n\n  font-size: 12px;\n  font-weight: bold;\n  padding-left: 11px;\n  padding-right: 11px;\n\n  cursor: pointer;\n  transition: all 0.25s ease;\n  &:hover {\n    color: white;\n    background: ", ";\n  }\n  &:active {\n    //letter-spacing: 2px;\n    letter-spacing: 2px;\n  }\n  //&:after {\n  //  content:\"SUBMIT\";\n  //}\n\n  &.onclic {\n    width: 24px !important;\n    border-color: ", ";\n    border-width: 3px;\n    font-size: 0;\n    border-left-color: ", ";\n    animation: rotating 2s 0.25s linear infinite;\n\n    &:after {\n      content: \"\";\n    }\n    &:hover {\n      color: $green;\n      background: white;\n    }\n  }\n\n  &.right {\n    float: right;\n    margin-right: 26px;\n  }\n\n  @keyframes rotating {\n    from {\n      transform: rotate(0deg);\n    }\n    to {\n      transform: rotate(360deg);\n    }\n  }\n"], ["\n  margin: 11px;\n  outline: none;\n  height: 37px;\n  /* margin-right: 10px; */\n  /* text-align: center; */\n  border-radius: 40px;\n  background: ", ";\n  border: 2px solid ", ";\n  color: #ffffff;\n  -webkit-letter-spacing: 1px;\n  -moz-letter-spacing: 1px;\n  -ms-letter-spacing: 1px;\n  letter-spacing: 1px;\n  text-shadow: 0;\n  cursor: pointer;\n  -webkit-transition: all 0.25s ease;\n  transition: all 0.25s ease;\n\n  font-size: 12px;\n  font-weight: bold;\n  padding-left: 11px;\n  padding-right: 11px;\n\n  cursor: pointer;\n  transition: all 0.25s ease;\n  &:hover {\n    color: white;\n    background: ", ";\n  }\n  &:active {\n    //letter-spacing: 2px;\n    letter-spacing: 2px;\n  }\n  //&:after {\n  //  content:\"SUBMIT\";\n  //}\n\n  &.onclic {\n    width: 24px !important;\n    border-color: ", ";\n    border-width: 3px;\n    font-size: 0;\n    border-left-color: ", ";\n    animation: rotating 2s 0.25s linear infinite;\n\n    &:after {\n      content: \"\";\n    }\n    &:hover {\n      color: $green;\n      background: white;\n    }\n  }\n\n  &.right {\n    float: right;\n    margin-right: 26px;\n  }\n\n  @keyframes rotating {\n    from {\n      transform: rotate(0deg);\n    }\n    to {\n      transform: rotate(360deg);\n    }\n  }\n"])), green, green, green, gray, green);
var templateObject_1$5, templateObject_2$3, templateObject_3$2, templateObject_4$2, templateObject_5$2, templateObject_6, templateObject_7, templateObject_8, templateObject_9;

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

var StyleWrapper$1 = styled(NodeViewWrapper)(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject([""], [""])));
function DividerBlock(props) {
    return (React.createElement(StyleWrapper$1, { "data-drag-handle": "true", selected: props.selected, className: "graf graf--divider is-selected" },
        React.createElement("span", null)));
}
var DividerBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        icon: divider,
        name: "DividerBlock",
        tag: "divider-block",
        atom: true,
        component: DividerBlock,
        attributes: {},
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "insertion",
            insert_block: "divider-block",
        },
        priority: 1,
        parseHTML: [
            {
                tag: "divider-block",
            },
            {
                tag: "HR",
            },
        ],
        addInputRules: function () {
            return [/^(?:---|—-|___\s|\*\*\*\s)$/];
        },
    };
    return Object.assign(config, options);
};
var templateObject_1$4;

var StyleWrapper = styled(NodeViewWrapper)(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  .content {\n    background: ", ";\n    padding: 1.2em;\n    padding-top: 0.5em;\n    padding-bottom: 0.5em;\n\n    select,\n    .language {\n      float: right;\n      color: ", ";\n      background-color: ", ";\n    }\n\n    margin-bottom: 10px;\n    margin-top: 10px;\n  }\n\n  /*\n  Qt Creator dark color scheme\n  */\n\n  .hljs {\n    color: ", ";\n    background: ", ";\n  }\n\n  .hljs-strong,\n  .hljs-emphasis {\n    color: ", ";\n  }\n\n  .hljs-bullet,\n  .hljs-quote,\n  .hljs-number,\n  .hljs-regexp,\n  .hljs-literal {\n    color: ", ";\n  }\n\n  .hljs-code .hljs-selector-class {\n    color: ", ";\n  }\n\n  .hljs-emphasis,\n  .hljs-stronge,\n  .hljs-type {\n    font-style: italic;\n  }\n\n  .hljs-keyword,\n  .hljs-selector-tag,\n  .hljs-function,\n  .hljs-section,\n  .hljs-symbol,\n  .hljs-name {\n    color: ", ";\n  }\n\n  .hljs-subst,\n  .hljs-tag,\n  .hljs-title {\n    color: ", ";\n  }\n\n  .hljs-attribute {\n    color: ", ";\n  }\n\n  .hljs-variable,\n  .hljs-params,\n  .hljs-title.class_,\n  .hljs-class .hljs-title {\n    color: ", ";\n  }\n\n  .hljs-string,\n  .hljs-selector-id,\n  .hljs-selector-attr,\n  .hljs-selector-pseudo,\n  .hljs-type,\n  .hljs-built_in,\n  .hljs-template-tag,\n  .hljs-template-variable,\n  .hljs-addition,\n  .hljs-link {\n    color: ", ";\n  }\n\n  .hljs-comment,\n  .hljs-meta,\n  .hljs-deletion {\n    color: ", ";\n  }\n"], ["\n  .content {\n    background: ", ";\n    padding: 1.2em;\n    padding-top: 0.5em;\n    padding-bottom: 0.5em;\n\n    select,\n    .language {\n      float: right;\n      color: ", ";\n      background-color: ", ";\n    }\n\n    margin-bottom: 10px;\n    margin-top: 10px;\n  }\n\n  /*\n  Qt Creator dark color scheme\n  */\n\n  .hljs {\n    color: ", ";\n    background: ", ";\n  }\n\n  .hljs-strong,\n  .hljs-emphasis {\n    color: ", ";\n  }\n\n  .hljs-bullet,\n  .hljs-quote,\n  .hljs-number,\n  .hljs-regexp,\n  .hljs-literal {\n    color: ", ";\n  }\n\n  .hljs-code .hljs-selector-class {\n    color: ", ";\n  }\n\n  .hljs-emphasis,\n  .hljs-stronge,\n  .hljs-type {\n    font-style: italic;\n  }\n\n  .hljs-keyword,\n  .hljs-selector-tag,\n  .hljs-function,\n  .hljs-section,\n  .hljs-symbol,\n  .hljs-name {\n    color: ", ";\n  }\n\n  .hljs-subst,\n  .hljs-tag,\n  .hljs-title {\n    color: ", ";\n  }\n\n  .hljs-attribute {\n    color: ", ";\n  }\n\n  .hljs-variable,\n  .hljs-params,\n  .hljs-title.class_,\n  .hljs-class .hljs-title {\n    color: ", ";\n  }\n\n  .hljs-string,\n  .hljs-selector-id,\n  .hljs-selector-attr,\n  .hljs-selector-pseudo,\n  .hljs-type,\n  .hljs-built_in,\n  .hljs-template-tag,\n  .hljs-template-variable,\n  .hljs-addition,\n  .hljs-link {\n    color: ", ";\n  }\n\n  .hljs-comment,\n  .hljs-meta,\n  .hljs-deletion {\n    color: ", ";\n  }\n"])), function (props) { return props.theme.hljs_background; }, function (props) { return props.theme.dante_text_color; }, function (props) { return props.theme.dante_inversed_color; }, function (props) { return props.theme.hljs_color; }, function (props) { return props.theme.hljs_background; }, function (props) { return props.theme.hljs_emphasis; }, function (props) { return props.theme.hljs_literal_color; }, function (props) { return props.theme.hljs_selector_class_color; }, function (props) { return props.theme.hljs_name_color; }, function (props) { return props.theme.hljs_title_color; }, function (props) { return props.theme.hljs_attribute_color; }, function (props) { return props.theme.hljs_variable_color; }, function (props) { return props.theme.hljs_link_color; }, function (props) { return props.theme.hljs_deletion_color; });
function Code(props) {
    console.log(props.selected);
    function changeLanguage(e) {
        props.updateAttributes({
            language: e.target.value,
        });
    }
    function language() {
        return props.node.attrs.language || "auto";
    }
    return (React.createElement(StyleWrapper, { "data-drag-handle": "true", selected: props.selected },
        React.createElement("div", { className: "content" },
            props.editor.isEditable && (React.createElement("select", { contentEditable: false, onChange: changeLanguage, value: language() },
                React.createElement("option", { value: "null" }, "auto"),
                React.createElement("option", { disabled: true }, "\u2014"),
                props.extension.options.lowlight.listLanguages().map(function (o) { return (React.createElement("option", { value: o, key: o }, o)); }))),
            !props.editor.isEditable && (React.createElement("span", { className: "language" }, language())),
            React.createElement(NodeViewContent, { as: "pre", className: "hljs" }))));
}
var CodeBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        name: "CodeBlock",
        tag: "code-block",
        component: Code,
        attributes: {
            url: { default: "" },
        },
    };
    return Object.assign(config, options);
};
var templateObject_1$3;

//import Input from "../../forms/Input";
//import attribution from "../../../images/Poweredby_100px-White_VertText.png";
var GiphyBlock$1 = styled.div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  //position: absolute;\n  //left: 128px;\n  //bottom: 48px;\n  //z-index: 10000;\n  //height: 251px;\n  //background: white;\n  //border: 1px solid #abaaaa;\n  //border-radius: 3px;\n  //width: 223px;\n  //box-shadow: 1px 1px 1px #ece3e3;\n"], ["\n  //position: absolute;\n  //left: 128px;\n  //bottom: 48px;\n  //z-index: 10000;\n  //height: 251px;\n  //background: white;\n  //border: 1px solid #abaaaa;\n  //border-radius: 3px;\n  //width: 223px;\n  //box-shadow: 1px 1px 1px #ece3e3;\n"])));
var GridListOverflow = styled.div(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  height: 187px;\n  overflow: auto;\n"], ["\n  height: 187px;\n  overflow: auto;\n"])));
var GridList = styled.div(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  display: flex;\n  display: flex;\n  flex-flow: row wrap;\n  margin-left: 0px;\n  width: 100%;\n  img {\n    flex: auto;\n    height: 250px;\n    min-width: 150px;\n    margin: 0 0px 8px 0;\n  }\n"], ["\n  display: flex;\n  display: flex;\n  flex-flow: row wrap;\n  margin-left: 0px;\n  width: 100%;\n  img {\n    flex: auto;\n    height: 250px;\n    min-width: 150px;\n    margin: 0 0px 8px 0;\n  }\n"])));
var Container = styled.div(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n  padding: 10px;\n  //background: \"#ccc\";\n"], ["\n  padding: 10px;\n  //background: \"#ccc\";\n"])));
var PickerBlock = styled.div(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  margin-bottom: 4px;\n\n  &:before {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 8px;\n    background: #c4e17f;\n    background-image: -webkit-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: -moz-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: -o-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  margin-bottom: 4px;\n\n  &:before {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 8px;\n    background: #c4e17f;\n    background-image: -webkit-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: -moz-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: -o-linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n    background-image: linear-gradient(\n      left,\n      #fff35c,\n      #fff35c,\n      #ff6666,\n      #ff6666,\n      #9933ff,\n      #9933ff,\n      #00ccff,\n      #00ccff,\n      #00ff99,\n      #00ff99\n    );\n  }\n"])));
var App = function (props) {
    var _a = useState([]), gifs = _a[0], setGifs = _a[1];
    var _b = useState(10), limit = _b[0]; _b[1];
    var _c = useState(''), term = _c[0], setTerm = _c[1];
    var inputRef = useRef(null);
    useEffect(function () {
        search('', 'trend');
    }, []);
    var onSearchSubmit = function (e) {
        if (e.key !== 'Enter') {
            return;
        }
        var term = inputRef.current.value;
        search(term);
    };
    var search = function (term, kind) {
        if (kind === void 0) { kind = 'search'; }
        var url = kind === 'search'
            ? "https://api.giphy.com/v1/gifs/search?q=".concat(term)
            : "https://api.giphy.com/v1/gifs/trending?q=".concat(term);
        var link = "".concat(url, "&limit=").concat(limit, "&api_key=").concat(props.apiKey);
        axios
            .get(link)
            .then(function (response) {
            // handle success
            setGifs(response.data.data);
            // console.log(response);
        })
            .catch(function (error) {
            // handle error
            console.log(error);
        });
    };
    var handleChange = function (e) {
        var term = e.target.value;
        setTerm(term);
    };
    return (React.createElement(GiphyBlock$1, null,
        React.createElement(Container, null,
            React.createElement(PickerBlock, null,
                React.createElement("input", { ref: inputRef, type: "text", placeholder: "search gif", value: term, onChange: handleChange, onKeyDown: onSearchSubmit })),
            React.createElement(GridListOverflow, null,
                React.createElement(GridList, null, gifs.map(function (o) { return (React.createElement("img", { alt: "giphy", key: "giphy-".concat(o.id), onClick: function (_e) { return props.handleSelected(o); }, height: o.images.fixed_width_downsampled.height, width: o.images.fixed_width_downsampled.width, src: o.images.fixed_width_downsampled.url })); }))),
            React.createElement("div", { className: "flex justify-center mt-2" }))));
};
var templateObject_1$2, templateObject_2$2, templateObject_3$1, templateObject_4$1, templateObject_5$1;

//const giphyApiKey = "97g39PuUZ6Q49VdTRBvMYXRoKZYd1ScZ";
var Modal = styled.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 10;\n  //background-color: ", ";\n  position: fixed;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n"], ["\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 10;\n  //background-color: ", ";\n  position: fixed;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n"])), function (props) { return props.theme.dante_control_color; });
var ModalWrapper = styled.div(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  padding: 1.5rem;\n  overflow: hidden;\n  max-width: 28rem;\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  display: inline-block;\n  border-radius: 0.3rem;\n  position: relative;\n  box-shadow: 1px 2px 7px 0px #27262673;\n  border: 1px solid #2f2f2f3b;\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  .close {\n    align-self: flex-end;\n    width: 20px;\n    height: 20px;\n  }\n  input {\n    padding: 0.2em;\n    border: 1px solid #ccc;\n    width: 100%;\n  }\n"], ["\n  padding: 1.5rem;\n  overflow: hidden;\n  max-width: 28rem;\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  display: inline-block;\n  border-radius: 0.3rem;\n  position: relative;\n  box-shadow: 1px 2px 7px 0px #27262673;\n  border: 1px solid #2f2f2f3b;\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  .close {\n    align-self: flex-end;\n    width: 20px;\n    height: 20px;\n  }\n  input {\n    padding: 0.2em;\n    border: 1px solid #ccc;\n    width: 100%;\n  }\n"])), function (props) { return props.theme.dante_inversed_color; });
var GiphyBlock = function (props) {
    React.useState(true)[0];
    var getAspectRatio = function (w, h) {
        var maxWidth = 1000;
        var maxHeight = 1000;
        var ratio = 0;
        var width = w; // Current image width
        var height = h; // Current image height
        // Check if the current width is larger than the max
        if (width > maxWidth) {
            ratio = maxWidth / width; // get ratio for scaling image
            height = height * ratio; // Reset height to match scaled image
            width = width * ratio; // Reset width to match scaled image
            // Check if current height is larger than max
        }
        else if (height > maxHeight) {
            ratio = maxHeight / height; // get ratio for scaling image
            width = width * ratio; // Reset width to match scaled image
            height = height * ratio; // Reset height to match scaled image
        }
        var fill_ratio = (height / width) * 100;
        var result = { width: width, height: height, ratio: fill_ratio };
        // console.log result
        return result;
    };
    var selectImage = function (giphyblock) {
        var _a = giphyblock.images.original, url = _a.url, height = _a.height, width = _a.width;
        props.editor.commands.insertContent({
            type: "ImageBlock",
            attrs: {
                url: url,
                aspect_ratio: getAspectRatio(width, height),
                forceUpload: true,
            },
        });
    };
    var selfDestroy = function () {
        props.deleteNode();
    };
    /*export default class GiphyBlock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: true,
      };
    }
  
    componentDidMount() {
      // console.log("GIPYH", this.props);
      //this.props.blockProps.toggleEditable();
    }
  
    defaultData = () => {
      //const existing_data = this.props.block.getData().toJS();
      //return existing_data.embed_data || {};
      return {};
    };
  
      deleteSelf = (e) => {
        e.preventDefault();
        this.props.deleteNode();
      };
  
      getAspectRatio = (w, h) => {
        const maxWidth = 1000;
        const maxHeight = 1000;
        let ratio = 0;
        let width = w; // Current image width
        let height = h; // Current image height
  
        // Check if the current width is larger than the max
        if (width > maxWidth) {
          ratio = maxWidth / width; // get ratio for scaling image
          height = height * ratio; // Reset height to match scaled image
          width = width * ratio; // Reset width to match scaled image
  
          // Check if current height is larger than max
        } else if (height > maxHeight) {
          ratio = maxHeight / height; // get ratio for scaling image
          width = width * ratio; // Reset width to match scaled image
          height = height * ratio; // Reset height to match scaled image
        }
  
        const fill_ratio = (height / width) * 100;
        const result = { width, height, ratio: fill_ratio };
        // console.log result
        return result;
      };
  
      selectImage = (giphyblock) => {
        const { url, height, width } = giphyblock.images.original;
  
        this.props.editor.commands.insertContent({
          type: "ImageBlock",
          attrs: {
            url: url,
            aspect_ratio: this.getAspectRatio(width, height),
            forceUpload: true,
          },
        });
      };
  
      selfDestroy = () => {
        this.props.deleteNode();
      };*/
    // console.log(this.state.collection)
    return (React.createElement(NodeViewWrapper, { className: "dante-giphy-wrapper" },
        React.createElement("div", { contentEditable: false, "data-drag-handle": "true" },
            React.createElement(Modal, null,
                React.createElement(ModalWrapper, null,
                    React.createElement("button", { className: "close", onClick: selfDestroy },
                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }))),
                    React.createElement(App, { apiKey: props.extension.config.addOptions.key, handleSelected: function (data) {
                            selectImage(data);
                        } }))))));
};
var GiphyBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        icon: giphyLogo,
        name: "GiphyBlock",
        tag: "giphy-block",
        component: GiphyBlock,
        atom: true,
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "insertion",
            insert_block: "GiphyBlock",
        },
        options: {
            placeholder: "Search any gif on giphy",
            key: "97g39PuUZ6Q49VdTRBvMYXRoKZYd1ScZ",
        },
        attributes: {},
    };
    return Object.assign(config, options);
};
var templateObject_1$1, templateObject_2$1;
/*
export const GiphyBlockConfig = (options = {}) => {
  const config = {
    title: "add an image",
    type: "giphy",
    icon: GiphyLogo,
    block: GiphyBlock,
    editable: false,
    renderable: true,
    breakOnContinuous: true,
    wrapper_class: "graf graf--figure",
    selected_class: "is-selected is-mediaFocused",
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "giphy",
      // insertion: "func",
      // funcHandler: options.handleFunc,
    },
    options: {
      placeholder: "Search any gif on giphy",
    },
  };

  return Object.assign(config, options);
};*/

var StartButton = styled.a(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-radius: 50%;\n  background-color: #ff5e5e;\n  width: 50px;\n  height: 50px;\n  display: block;\n  margin: 0 auto;\n  cursor: pointer;\n  text-align: center;\n  box-shadow: ", ";\n  svg {\n    margin-top: 12px;\n    fill: white;\n    display: inline;\n    vertical-align: unset !important;\n    &:hover {\n      fill: #222;\n    }\n  }\n"], ["\n  border-radius: 50%;\n  background-color: #ff5e5e;\n  width: 50px;\n  height: 50px;\n  display: block;\n  margin: 0 auto;\n  cursor: pointer;\n  text-align: center;\n  box-shadow: ", ";\n  svg {\n    margin-top: 12px;\n    fill: white;\n    display: inline;\n    vertical-align: unset !important;\n    &:hover {\n      fill: #222;\n    }\n  }\n"])), function (props) {
    return props.recording
        ? "inset -1px 1px 0px 0px #270101"
        : "inset 0px -1px 0px 0px #270101";
});
var RecorderWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0px auto;\n  text-align: center;\n"], ["\n  margin: 0px auto;\n  text-align: center;\n"])));
var RecorderLegend = styled.span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: #797878;\n  font-size: 0.789em;\n  text-transform: uppercase;\n  font-family: futura-pt;\n"], ["\n  color: #797878;\n  font-size: 0.789em;\n  text-transform: uppercase;\n  font-family: futura-pt;\n"])));
var SpeechRecorderWrapper = styled(NodeViewWrapper)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: #ccc;\n  padding: 20px;\n  background: #fdffd4;\n  padding: 21px;\n  border: 1px solid #f0f1d9;\n  position: relative;\n"], ["\n  background: #ccc;\n  padding: 20px;\n  background: #fdffd4;\n  padding: 21px;\n  border: 1px solid #f0f1d9;\n  position: relative;\n"])));
var DeleteSelf = styled.button(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: absolute;\n  right: 10px;\n  top: 12px;\n"], ["\n  position: absolute;\n  right: 10px;\n  top: 12px;\n"])));
var SpeechToTextBlock = function (_a) {
    var editor = _a.editor, deleteNode = _a.deleteNode;
    var _b = useState(''); _b[0]; _b[1];
    var _c = useState([]), transcript = _c[0], setTranscript = _c[1];
    var _d = useState(false), recording = _d[0], setRecording = _d[1];
    var _e = useState(null), recognition = _e[0], setRecognition = _e[1];
    useEffect(function () {
        if (typeof window === "undefined")
            return;
        if (!("webkitSpeechRecognition" in window)) {
            alert("no speech recognition");
        }
        else {
            var webkitSpeechRecognition = window.webkitSpeechRecognition;
            var newRecognition = new webkitSpeechRecognition();
            newRecognition.continuous = true;
            newRecognition.interimResults = true;
            newRecognition.onstart = function (event) {
                setRecording(true);
            };
            newRecognition.onresult = function (event) {
                var res = [];
                for (var i = 0; i < event.results.length; ++i) {
                    res.push(event.results[i][0].transcript);
                }
                setTranscript(res);
            };
            newRecognition.onerror = function (event) {
                console.log(event);
            };
            newRecognition.onend = function () {
                setRecording(false);
            };
            setRecognition(newRecognition);
        }
    }, []);
    var deleteSelf = function (e) {
        e.preventDefault();
        recognition.stop();
        deleteNode();
    };
    var startButton = function (e) {
        e.preventDefault();
        if (recording) {
            recognition.stop();
        }
        else {
            recognition.start();
        }
    };
    var resetRecorder = function (e) {
        e.preventDefault();
        recognition.stop();
        setTranscript([]);
    };
    var convert = function (e) {
        e.preventDefault();
        recognition.stop();
        editor
            .chain()
            .focus()
            .toggleNode('paragraph', 'paragraph', {})
            .insertContent(transcript.map(function (o) { return o; }).join(' '))
            .run();
    };
    return (React.createElement(SpeechRecorderWrapper, null,
        editor.isEditable ? (React.createElement(DeleteSelf, { type: "button", className: "graf--media-embed-close", onClick: deleteSelf },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })))) : null,
        React.createElement(RecorderWrapper, null,
            React.createElement(StartButton, { id: "start_button", className: "".concat(recording ? "recordingButton" : ""), recording: recording, onClick: function (e) {
                    startButton(e);
                } }, speech()),
            React.createElement(RecorderLegend, null, recording ? "stop dictation" : "start dictation"),
            transcript.length > 0 && (React.createElement("div", { className: "d-flex justify-content-center" },
                React.createElement("button", { onClick: convert, className: "btn btn-success mr-1" }, "confirm"),
                React.createElement("button", { type: "button", onClick: resetRecorder, className: "btn btn-link" }, "or cancel")))),
        React.createElement(NodeViewContent, null, transcript.map(function (o) { return o; }))));
};
var SpeechToTextBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        icon: speech,
        name: "SpeechToText",
        tag: "speech-to-text",
        component: SpeechToTextBlock,
        atom: true,
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "insertion",
            insert_block: "SpeechToText",
        },
        options: {},
        attributes: {},
    };
    return Object.assign(config, options);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

// import Dante from "./constants";
//export {DanteImagePopoverConfig}
//export {DanteAnchorPopoverConfig} //'./popovers/addButton'
//export {DanteInlineTooltipConfig}
//export {DanteTooltipConfig}
var defaultPlugins$1 = [
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
    var bodyPlaceholder = _a.bodyPlaceholder, widgets = _a.widgets, extensions = _a.extensions, theme = _a.theme, fixed = _a.fixed, content = _a.content, onUpdate = _a.onUpdate, readOnly = _a.readOnly;
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
        return defaultPlugins$1;
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
    var resolvedTheme = theme ? theme : theme$1;
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

export { Code as CodeBlock, CodeBlockConfig, DividerBlock, DividerBlockConfig, EmbedBlock, EmbedBlockConfig, GiphyBlock, GiphyBlockConfig, icons as Icons, ImageBlock, ImageBlockConfig, ReactMediaRecorder as MediaRecorder, PlaceholderBlock, PlaceholderBlockConfig, SpeechToTextBlock, SpeechToTextBlockConfig, index as Styled, VideoBlock, VideoBlockConfig, VideoRecorderBlock, VideoRecorderBlockConfig, theme as darkTheme, Tiptap as default, defaultPlugins, theme$1 as defaultTheme };
//# sourceMappingURL=Dante.es.js.map
