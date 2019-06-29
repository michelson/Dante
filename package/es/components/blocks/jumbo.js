function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { Map, List, OrderedSet } from 'immutable';
import { updateCharacterListOfBlock } from '../../model/index.js';
import { EditorBlock, CharacterMetadata } from 'draft-js';

var Jumbo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Jumbo, _React$Component);

  function Jumbo(props) {
    var _this;

    _classCallCheck(this, Jumbo);

    _this = _possibleConstructorReturn(this, (Jumbo.__proto__ || Object.getPrototypeOf(Jumbo)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "placeholderRender", function () {
      if (_this.props.block.text.length === 0) {
        return React.createElement("div", {
          className: "public-DraftEditorPlaceholder-root"
        }, React.createElement("div", {
          className: "public-DraftEditorPlaceholder-inner"
        }, "write something"));
      }
    });

    _this.state = {
      enabled: false,
      data: _this.props.blockProps.data.toJS()
    };
    _this.placeholderRender = _this.placeholderRender.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Jumbo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var a = CharacterMetadata;
      var o = OrderedSet;
      setTimeout(function () {
        var editorState = _this2.props.blockProps.getEditorState();

        var text = "Hello worldsjsjs";
        var _this2$props$blockPro = _this2.props.blockProps,
            getEditorState = _this2$props$blockPro.getEditorState,
            setEditorState = _this2$props$blockPro.setEditorState;
        var characterList = List([new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_52px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_52px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_52px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_52px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_52px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_52px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_52px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_20px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_20px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_20px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_20px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_20px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_20px"])
        }), new a({
          entity: null,
          "style": OrderedSet(["CUSTOM_FONT_SIZE_20px"])
        })]); // setEditorState( updateCharacterListOfBlock(editorState, this.props.block, text) )

        setEditorState(updateCharacterListOfBlock(editorState, _this2.props.block, text, characterList));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "jumbotron"
      }, this.placeholderRender(), React.createElement(EditorBlock, Object.assign({}, this.props, {
        "editable": true
      })));
    }
  }]);

  return Jumbo;
}(React.Component);

export { Jumbo as default };