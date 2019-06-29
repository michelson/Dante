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

var Link =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link(props) {
    var _this;

    _classCallCheck(this, Link);

    _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_validateLink", function () {
      var str = "demo";
      /*eslint-disable */

      var pattern = new RegExp('^(https?:\/\/)?' + // protocol
      '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|' + // domain name
      '((\d{1,3}\.){3}\d{1,3}))' + // OR ip (v4) address
      '(\:\d+)?(\/[-a-z\d%_.~+]*)*' + // port and path
      '(\?[&a-z\d%_.~+=-]*)?' + // query string
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

      return _this.data.showPopLinkOver(_this.refs.link);
    });

    _defineProperty(_assertThisInitialized(_this), "_hidePopLinkOver", function (e) {
      if (!_this.data.hidePopLinkOver) {
        return;
      }

      return _this.data.hidePopLinkOver();
    });

    _this.isHover = false;
    return _this;
  }

  _createClass(Link, [{
    key: "render",
    value: function render() {
      this.data = this.props.contentState.getEntity(this.props.entityKey).getData(); //Entity.get(this.props.entityKey).getData()

      return React.createElement("a", {
        ref: "link",
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