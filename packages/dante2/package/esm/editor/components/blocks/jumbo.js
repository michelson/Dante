import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { List, OrderedSet } from 'immutable';
import { updateCharacterListOfBlock } from '../../model/index.js';
import { EditorBlock, CharacterMetadata } from 'draft-js';

var Jumbo = /*#__PURE__*/function (_React$Component) {
  _inherits(Jumbo, _React$Component);
  var _super = _createSuper(Jumbo);
  function Jumbo(props) {
    var _this;
    _classCallCheck(this, Jumbo);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "placeholderRender", function () {
      if (_this.props.block.text.length === 0) {
        return /*#__PURE__*/React.createElement("div", {
          className: "public-DraftEditorPlaceholder-root"
        }, /*#__PURE__*/React.createElement("div", {
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
      setTimeout(function () {
        var editorState = _this2.props.blockProps.getEditorState();
        var text = "Hello worldsjsjs";
        var _this2$props$blockPro = _this2.props.blockProps;
          _this2$props$blockPro.getEditorState;
          var setEditorState = _this2$props$blockPro.setEditorState;
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
        })]);
        // setEditorState( updateCharacterListOfBlock(editorState, this.props.block, text) )
        setEditorState(updateCharacterListOfBlock(editorState, _this2.props.block, text, characterList));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "jumbotron"
      }, this.placeholderRender(), /*#__PURE__*/React.createElement(EditorBlock, Object.assign({}, this.props, {
        "editable": true
      })));
    }
  }]);
  return Jumbo;
}(React.Component);

export { Jumbo as default };
