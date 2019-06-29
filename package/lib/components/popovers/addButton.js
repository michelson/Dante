"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DanteInlineTooltipConfig = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _index = require("../../model/index.js");

var _draftJs = require("draft-js");

var _selection = require("../../utils/selection.js");

var _base = require("../../styled/base");

var _icons = require("../icons.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DanteInlineTooltip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DanteInlineTooltip, _React$Component);

  function DanteInlineTooltip(props) {
    var _this;

    _classCallCheck(this, DanteInlineTooltip);

    _this = _possibleConstructorReturn(this, (DanteInlineTooltip.__proto__ || Object.getPrototypeOf(DanteInlineTooltip)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "display", function (b) {
      if (b) {
        return _this.show();
      } else {
        return _this.hide();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "show", function () {
      return _this.setState({
        show: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hide", function () {
      return _this.setState({
        show: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setPosition", function (coords) {
      return _this.setState({
        position: coords
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_toggleScaled", function (ev) {
      ev.preventDefault();

      if (_this.state.scaled) {
        return _this.collapse();
      } else {
        return _this.scale();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "scale", function () {
      if (_this.state.scaled) {
        return;
      }

      return _this.setState({
        scaled: true
      }, function () {
        _this.setState({
          scaledWidth: "300px"
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "collapse", function () {
      if (!_this.state.scaled) {
        return;
      }

      return _this.setState({
        scaled: false
      }, function () {
        setTimeout(function () {
          _this.setState({
            scaledWidth: "0px"
          });
        }, 300);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "activeClass", function () {
      //if @props.show then "is-active" else ""
      if (_this.isActive()) {
        return "is-active";
      } else {
        return "";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isActive", function () {
      return _this.state.show;
    });

    _defineProperty(_assertThisInitialized(_this), "scaledClass", function () {
      if (_this.state.scaled) {
        return "is-scaled";
      } else {
        return "";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clickOnFileUpload", function () {
      _this.refs.fileInput.click();

      _this.collapse();

      return _this.hide();
    });

    _defineProperty(_assertThisInitialized(_this), "handlePlaceholder", function (input) {
      var opts = {
        type: input.widget_options.insert_block,
        placeholder: input.options.placeholder,
        endpoint: input.options.endpoint
      };
      return _this.props.onChange((0, _index.resetBlockWithType)(_this.props.editorState, 'placeholder', opts));
    });

    _defineProperty(_assertThisInitialized(_this), "insertImage", function (file) {
      var opts = {
        url: URL.createObjectURL(file),
        file: file
      };
      return _this.props.onChange((0, _index.addNewBlock)(_this.props.editorState, 'image', opts));
    });

    _defineProperty(_assertThisInitialized(_this), "handleFileInput", function (e) {
      var fileList = e.target.files; // TODO: support multiple file uploads

      /*
      Object.keys(fileList).forEach (o)=>
        @.insertImage(fileList[0])
      */

      return _this.insertImage(fileList[0]);
    });

    _defineProperty(_assertThisInitialized(_this), "handleInsertion", function (e) {
      _this.hide();

      return _this.props.onChange((0, _index.addNewBlock)(_this.props.editorState, e.type, {}));
    });

    _defineProperty(_assertThisInitialized(_this), "widgets", function () {
      return _this.props.editor.props.widgets;
    });

    _defineProperty(_assertThisInitialized(_this), "clickHandler", function (e, type) {
      var request_block = _this.widgets().find(function (o) {
        return o.type === type;
      });

      switch (request_block.widget_options.insertion) {
        case "upload":
          return _this.clickOnFileUpload(e, request_block);

        case "placeholder":
          return _this.handlePlaceholder(request_block);

        case "insertion":
          return _this.handleInsertion(request_block);

        default:
          return console.log("WRONG TYPE FOR ".concat(request_block.widget_options.insertion));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getItems", function () {
      return _this.widgets().filter(function (o) {
        return o.widget_options ? o.widget_options.displayOnInlineTooltip : null;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isDescendant", function (parent, child) {
      var node = child.parentNode;

      while (node !== null) {
        if (node === parent) {
          return true;
        }

        node = node.parentNode;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "relocate", function () {
      var editorState = _this.props.editorState;
      var currentBlock = (0, _index.getCurrentBlock)(_this.props.editorState);
      var blockType = currentBlock.getType();
      var block = currentBlock;

      if (!editorState.getSelection().isCollapsed()) {
        return;
      } // display tooltip only for unstyled


      var nativeSelection = (0, _selection.getSelection)(window);

      if (!nativeSelection.rangeCount) {
        return;
      }

      var selectionRect = (0, _selection.getSelectionRect)(nativeSelection);

      var parent = _reactDom.default.findDOMNode(_this.props.editor); // hide if selected node is not in editor


      if (!_this.isDescendant(parent, nativeSelection.anchorNode)) {
        _this.hide();

        return;
      }

      var relativeParent = (0, _selection.getRelativeParent)(_this.refs.tooltip.parentElement);
      var toolbarHeight = _this.refs.tooltip.clientHeight;
      var toolbarWidth = _this.refs.tooltip.clientWidth;
      var relativeRect = (relativeParent || document.body).getBoundingClientRect();
      if (!relativeRect || !selectionRect) return;
      var top = selectionRect.top - relativeRect.top - toolbarHeight / 5;
      var left = selectionRect.left - relativeRect.left + selectionRect.width / 2 - toolbarWidth * 1.3;

      if (!top || !left) {
        return;
      }

      _this.display(block.getText().length === 0 && blockType === "unstyled");

      _this.setPosition({
        top: top,
        //+ window.scrollY - 5,
        left: left //show: block.getText().length === 0 && blockType === "unstyled"

      });
    });

    _this.state = {
      position: {
        top: 0,
        left: 0
      },
      show: false,
      scaled: false,
      scaledWidth: "0px"
    };
    _this.initialPosition = 0;
    return _this;
  }

  _createClass(DanteInlineTooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {//this.initialPosition = this.refs.tooltip.offsetLeft
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      return this.collapse();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_base.InlinetooltipWrapper, {
        ref: "tooltip",
        className: "inlineTooltip ".concat(this.activeClass(), " ").concat(this.scaledClass()),
        style: this.state.position
      }, _react.default.createElement("button", {
        type: "button",
        className: "inlineTooltip-button control",
        title: "Close Menu",
        "data-action": "inline-menu",
        onClick: this._toggleScaled
      }, (0, _icons.add)()), _react.default.createElement("div", {
        className: "inlineTooltip-menu",
        style: {
          width: "".concat(this.state.scaledWidth)
        }
      }, this.getItems().map(function (item, i) {
        return _react.default.createElement(InlineTooltipItem, {
          item: item,
          key: i,
          clickHandler: _this2.clickHandler
        });
      }), _react.default.createElement("input", {
        type: "file",
        accept: "image/*",
        style: {
          display: 'none'
        },
        ref: "fileInput",
        multiple: "multiple",
        onChange: this.handleFileInput
      })));
    }
  }]);

  return DanteInlineTooltip;
}(_react.default.Component);

exports.default = DanteInlineTooltip;

var InlineTooltipItem =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(InlineTooltipItem, _React$Component2);

  function InlineTooltipItem() {
    var _ref;

    var _this3;

    _classCallCheck(this, InlineTooltipItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this3 = _possibleConstructorReturn(this, (_ref = InlineTooltipItem.__proto__ || Object.getPrototypeOf(InlineTooltipItem)).call.apply(_ref, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this3), "clickHandler", function (e) {
      e.preventDefault();
      return _this3.props.clickHandler(e, _this3.props.item.type);
    });

    return _this3;
  }

  _createClass(InlineTooltipItem, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("button", {
        type: "button",
        className: "inlineTooltip-button scale",
        title: this.props.title,
        onMouseDown: this.clickHandler,
        onClick: function onClick(e) {
          return e.preventDefault();
        },
        style: {
          fontSize: '21px'
        }
      }, _react.default.createElement("span", {
        className: 'tooltip-icon'
      }, this.props.item.icon()));
    }
  }]);

  return InlineTooltipItem;
}(_react.default.Component);

var DanteInlineTooltipConfig = function DanteInlineTooltipConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    ref: 'add_tooltip',
    component: DanteInlineTooltip
  };
  return Object.assign(config, options);
};

exports.DanteInlineTooltipConfig = DanteInlineTooltipConfig;