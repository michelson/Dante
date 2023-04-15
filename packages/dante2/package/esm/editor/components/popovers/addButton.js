import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized, g as _extends } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { resetBlockWithType, addNewBlock, getCurrentBlock } from '../../model/index.js';
import 'draft-js';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import { getSelection, getSelectionRect, getRelativeParent } from '../../utils/selection.js';
import { InlinetooltipWrapper } from '../../styled/base.js';
import { add } from '../icons.js';
import 'immutable';
import '@emotion/styled';
import 'polished';

var DanteInlineTooltip = /*#__PURE__*/function (_React$Component) {
  _inherits(DanteInlineTooltip, _React$Component);
  var _super = _createSuper(DanteInlineTooltip);
  function DanteInlineTooltip(props) {
    var _this;
    _classCallCheck(this, DanteInlineTooltip);
    _this = _super.call(this, props);
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
          scaledWidth: 300
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
            scaledWidth: 0
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
      if (_this.state.scaled || _this.props.configTooltip.fixed) {
        return "is-scaled";
      } else {
        return "";
      }
    });
    // expand , 1, widht 2. class
    // collapse , class, width
    _defineProperty(_assertThisInitialized(_this), "clickOnFileUpload", function (e, block) {
      _this.currentBlock = block;
      var file_types = block.widget_options.file_types;
      if (file_types) {
        _this.fileInput.current.accept = file_types;
        _this.fileInput.current.dataset.blockType = file_types;
      }
      _this.fileInput.current.click();
      _this.collapse();
      return _this.hide();
    });
    _defineProperty(_assertThisInitialized(_this), "handlePlaceholder", function (input) {
      var opts = {
        type: input.widget_options.insert_block,
        placeholder: input.options.placeholder,
        endpoint: input.options.endpoint
      };
      return _this.props.onChange(resetBlockWithType(_this.props.editorState, "placeholder", opts));
    });
    _defineProperty(_assertThisInitialized(_this), "insertImage", function (file) {
      var _this$currentBlock;
      if (!file) return;
      var opts = {
        url: URL.createObjectURL(file),
        file: file
      };
      // cleans input image value
      _this.fileInput.current.value = "";
      var _this$currentBlock$wi = (_this$currentBlock = _this.currentBlock) === null || _this$currentBlock === void 0 ? void 0 : _this$currentBlock.widget_options,
        insert_block = _this$currentBlock$wi.insert_block;
      return _this.props.onChange(addNewBlock(_this.props.editorState, insert_block || "image", opts));
    });
    _defineProperty(_assertThisInitialized(_this), "handleFileInput", function (e) {
      var fileList = e.target.files;
      // TODO: support multiple file uploads
      /*
      Object.keys(fileList).forEach (o)=>
        @.insertImage(fileList[0])
      */
      return _this.insertImage(fileList[0]);
    });
    _defineProperty(_assertThisInitialized(_this), "handleInsertion", function (e) {
      _this.hide();
      return _this.props.onChange(addNewBlock(_this.props.editorState, e.type, {}));
    });
    _defineProperty(_assertThisInitialized(_this), "handleFunc", function (e) {
      _this.hide();
      return e.widget_options.funcHandler && e.widget_options.funcHandler(_assertThisInitialized(_this));
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
        case "func":
          return _this.handleFunc(request_block);
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
      if (!_this.props.editor.focus) return _this.hide();
      var editorState = _this.props.editorState;
      var currentBlock = getCurrentBlock(_this.props.editorState);
      var blockType = currentBlock.getType();
      var block = currentBlock;
      if (!editorState.getSelection().isCollapsed()) {
        return;
      }

      // display tooltip only for unstyled

      var nativeSelection = getSelection(window);
      if (!nativeSelection.rangeCount) {
        return;
      }
      var selectionRect = getSelectionRect(nativeSelection);
      var parent = ReactDOM.findDOMNode(_this.props.editor);

      // hide if selected node is not in editor
      if (!_this.isDescendant(parent, nativeSelection.anchorNode)) {
        _this.hide();
        return;
      }
      var relativeParent = getRelativeParent(_this.tooltip.current.parentElement);
      var toolbarHeight = _this.tooltip.current.clientHeight;
      var toolbarWidth = _this.tooltip.current.clientWidth;
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
        left: left
        //show: block.getText().length === 0 && blockType === "unstyled"
      });
    });
    _defineProperty(_assertThisInitialized(_this), "scaledWidthStyle", function () {
      if (!_this.props.configTooltip.fixed) {
        return {
          width: "".concat(_this.state.scaledWidth, "px"),
          left: "43px",
          position: 'absolute'
        };
      } else {
        return {};
      }
    });
    _this.state = {
      position: {
        top: 0,
        left: 0
      },
      show: false,
      scaled: false,
      scaledWidth: 0
    };
    _this.initialPosition = 0;
    _this.tooltip = /*#__PURE__*/React.createRef();
    _this.fileInput = /*#__PURE__*/React.createRef();
    _this.currentBlock = null;
    return _this;
  }
  _createClass(DanteInlineTooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //this.initialPosition = this.tooltip.current.offsetLeft
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(newProps) {
      return this.collapse();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement(InlinetooltipWrapper, {
        fixed: this.props.configTooltip.fixed,
        ref: this.tooltip,
        className: "inlineTooltip ".concat(this.activeClass(), " ").concat(this.scaledClass()),
        style: this.state.position
      }, !this.props.configTooltip.fixed && /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "inlineTooltip-button control",
        title: "Close Menu",
        "data-action": "inline-menu",
        onMouseDown: this._toggleScaled
      }, add()), /*#__PURE__*/React.createElement("div", {
        className: "inlineTooltip-menu",
        style: this.scaledWidthStyle()
      }, this.getItems().map(function (item, i) {
        return /*#__PURE__*/React.createElement(InlineTooltipItem, {
          item: item,
          key: i,
          clickHandler: _this2.clickHandler
        });
      }), /*#__PURE__*/React.createElement("input", {
        type: "file",
        accept: "image/*",
        style: {
          display: "none"
        },
        ref: this.fileInput,
        multiple: "multiple",
        onChange: this.handleFileInput
      })));
    }
  }]);
  return DanteInlineTooltip;
}(React.Component);
function InlineTooltipItem(_ref) {
  var _ref$item = _ref.item,
    type = _ref$item.type,
    popper = _ref$item.popper,
    icon = _ref$item.icon,
    clickHandler = _ref.clickHandler,
    title = _ref.title;
  var onClick = function onClick(e) {
    e.preventDefault();
    return clickHandler(e, type);
  };
  var popperPlacement = popper && popper.placement ? popper.placement : "bottom";
  var popperOffset = popper && popper.offset ? popper.offset : [0, 7];
  var _usePopperTooltip = usePopperTooltip({
      placement: popperPlacement,
      offset: popperOffset
    }),
    getArrowProps = _usePopperTooltip.getArrowProps,
    getTooltipProps = _usePopperTooltip.getTooltipProps,
    setTooltipRef = _usePopperTooltip.setTooltipRef,
    setTriggerRef = _usePopperTooltip.setTriggerRef,
    visible = _usePopperTooltip.visible;
  return /*#__PURE__*/React.createElement("div", {
    className: "button-container"
  }, /*#__PURE__*/React.createElement("button", {
    ref: setTriggerRef,
    type: "button",
    className: "inlineTooltip-button scale",
    title: title,
    "data-cy": "inline-tooltip-button-".concat(type),
    onMouseDown: onClick,
    onClick: function onClick(e) {
      return e.preventDefault();
    },
    style: {
      fontSize: "21px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "tooltip-icon"
  }, icon())), popper && visible && /*#__PURE__*/React.createElement("div", _extends({
    ref: setTooltipRef
  }, getTooltipProps({
    className: 'tooltip-container',
    style: {
      fontSize: "12px",
      borderRadius: "5px"
    }
  })), /*#__PURE__*/React.createElement("div", getArrowProps({
    className: 'tooltip-arrow'
  })), popper && popper.name));
}
var DanteInlineTooltipConfig = function DanteInlineTooltipConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    ref: "add_tooltip",
    component: DanteInlineTooltip
  };
  return Object.assign(config, options);
};

export { DanteInlineTooltipConfig, DanteInlineTooltip as default };
