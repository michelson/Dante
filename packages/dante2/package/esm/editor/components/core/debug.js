import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';

var Debug = /*#__PURE__*/function (_React$Component) {
  _inherits(Debug, _React$Component);
  var _super = _createSuper(Debug);
  function Debug() {
    var _this;
    _classCallCheck(this, Debug);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "handleToggleReadOnly", function (e) {
      e.preventDefault();
      _this.props.editor.toggleEditable();
      return false;
    });
    _defineProperty(_assertThisInitialized(_this), "handleTestEmitAndDecode", function (e) {
      e.preventDefault();
      return _this.testEmitAndDecode();
    });
    _defineProperty(_assertThisInitialized(_this), "handleTestEmitTEXT", function (e) {
      e.preventDefault();
      return _this.testEmitTEXT();
    });
    _defineProperty(_assertThisInitialized(_this), "testEmitAndDecode", function (e) {
      var raw_as_json = _this.props.editor.emitSerializedOutput();
      _this.props.editor.setState({
        editorState: _this.props.editor.decodeEditorContent(raw_as_json)
      }, _this.logState(JSON.stringify(raw_as_json)));
      return false;
    });
    _defineProperty(_assertThisInitialized(_this), "testEmitTEXT", function () {
      var text = _this.props.editor.getTextFromEditor();
      return _this.logState(text);
    });
    _defineProperty(_assertThisInitialized(_this), "logState", function (raw) {
      return _this.setState({
        output: raw
      }, _this.open);
    });
    _defineProperty(_assertThisInitialized(_this), "toggleDisplay", function (e) {
      e.preventDefault();
      var d = _this.state.display === "block" ? "none" : _this.state.display;
      return _this.setState({
        display: d
      });
    });
    _defineProperty(_assertThisInitialized(_this), "open", function () {
      return _this.setState({
        display: "block"
      });
    });
    _this.state = {
      output: "",
      display: "none"
    };
    return _this;
  }
  _createClass(Debug, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "debugControls"
      }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, " LOCKS: ", this.props.editor.state.locks, " "), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
        onClick: this.handleToggleReadOnly
      }, "EDITABLE: ", this.props.editor.state.read_only ? 'NO' : 'YES')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
        onClick: this.handleTestEmitTEXT
      }, "EDITOR TEXT")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
        onClick: this.handleTestEmitAndDecode
      }, "EDITOR STATE")))), /*#__PURE__*/React.createElement("div", {
        className: "debugZone",
        style: {
          display: this.state.display
        }
      }, /*#__PURE__*/React.createElement("button", {
        href: "#",
        className: "dante-debug-close close",
        onClick: this.toggleDisplay
      }), /*#__PURE__*/React.createElement("div", {
        className: "debugOutput"
      }, /*#__PURE__*/React.createElement("h2", null, "EDITOR OUTPUT"), this.state.output.length > 0 ? /*#__PURE__*/React.createElement("pre", null, this.state.output) : undefined)));
    }
  }]);
  return Debug;
}(React.Component);

export { Debug as default };
