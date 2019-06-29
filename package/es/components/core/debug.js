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

var Debug =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Debug, _React$Component);

  function Debug() {
    var _this;

    _classCallCheck(this, Debug);

    _this = _possibleConstructorReturn(this, (Debug.__proto__ || Object.getPrototypeOf(Debug)).call(this));

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
      return React.createElement("div", null, React.createElement("div", {
        className: "debugControls"
      }, React.createElement("ul", null, React.createElement("li", null, " LOCKS: ", this.props.editor.state.locks, " "), React.createElement("li", null, React.createElement("button", {
        onClick: this.handleToggleReadOnly
      }, "EDITABLE: ", this.props.editor.state.read_only ? 'NO' : 'YES')), React.createElement("li", null, React.createElement("button", {
        onClick: this.handleTestEmitTEXT
      }, "EDITOR TEXT")), React.createElement("li", null, React.createElement("button", {
        onClick: this.handleTestEmitAndDecode
      }, "EDITOR STATE")))), React.createElement("div", {
        className: "debugZone",
        style: {
          display: this.state.display
        }
      }, React.createElement("button", {
        href: "#",
        className: "dante-debug-close close",
        onClick: this.toggleDisplay
      }), React.createElement("div", {
        className: "debugOutput"
      }, React.createElement("h2", null, "EDITOR OUTPUT"), this.state.output.length > 0 ? React.createElement("pre", null, this.state.output) : undefined)));
    }
  }]);

  return Debug;
}(React.Component);

export default Debug;