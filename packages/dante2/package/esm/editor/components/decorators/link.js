import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';

var Link = /*#__PURE__*/function (_React$Component) {
  _inherits(Link, _React$Component);
  var _super = _createSuper(Link);
  function Link(props) {
    var _this;
    _classCallCheck(this, Link);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "_validateLink", function () {
      var str = "demo";
      /*eslint-disable */
      var pattern = new RegExp('^(https?:\/\/)?' +
      // protocol
      '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|' +
      // domain name
      '((\d{1,3}\.){3}\d{1,3}))' +
      // OR ip (v4) address
      '(\:\d+)?(\/[-a-z\d%_.~+]*)*' +
      // port and path
      '(\?[&a-z\d%_.~+=-]*)?' +
      // query string
      '(\#[-a-z\d_]*)?$', 'i'); // fragment locater
      if (!pattern.test(str)) {
        alert("Please enter a valid URL.");
        return false;
      } else {
        return true;
      }
      /*eslint-enable */
    });
    _defineProperty(_assertThisInitialized(_this), "_checkProtocol", function () {
      return console.log("xcvd");
    });
    _defineProperty(_assertThisInitialized(_this), "_showPopLinkOver", function (e) {
      if (!_this.data.showPopLinkOver) {
        return;
      }
      return _this.data.showPopLinkOver(_this.link.current);
    });
    _defineProperty(_assertThisInitialized(_this), "_hidePopLinkOver", function (e) {
      if (!_this.data.hidePopLinkOver) {
        return;
      }
      return _this.data.hidePopLinkOver();
    });
    _this.isHover = false;
    _this.link = /*#__PURE__*/React.createRef();
    return _this;
  }
  _createClass(Link, [{
    key: "render",
    value: function render() {
      this.data = this.props.contentState.getEntity(this.props.entityKey).getData();
      //Entity.get(this.props.entityKey).getData()

      return /*#__PURE__*/React.createElement("a", {
        ref: this.link,
        href: this.data.url,
        className: "markup--anchor",
        onMouseOver: this._showPopLinkOver,
        onMouseOut: this._hidePopLinkOver
      }, this.props.children);
    }
  }]);
  return Link;
}(React.Component);

export { Link as default };
