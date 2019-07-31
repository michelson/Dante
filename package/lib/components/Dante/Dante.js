"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _editor = _interopRequireDefault(require("../core/editor.js"));

require("../../styled/draft.css");

var _immutable = require("immutable");

var _image = require("../popovers/image.js");

var _link = require("../popovers/link.js");

var _addButton = require("../popovers/addButton.js");

var _toolTip = require("../popovers/toolTip.js");

var _image2 = require("../blocks/image.js");

var _embed = require("../blocks/embed.js");

var _video = require("../blocks/video.js");

var _placeholder = require("../blocks/placeholder.js");

var _code = require("../blocks/code.js");

var _link2 = _interopRequireDefault(require("../decorators/link"));

var _prism = require("../decorators/prism");

var _draftJs = require("draft-js");

var _find_entities = _interopRequireDefault(require("../../utils/find_entities"));

var _draftJsMultidecorators = _interopRequireDefault(require("draft-js-multidecorators"));

var _base = _interopRequireDefault(require("../../styled/base"));

var _emotionTheming = require("emotion-theming");

var _default2 = _interopRequireDefault(require("./themes/default"));

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

// component implementation
var Dante =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Dante, _React$Component);

  function Dante(props) {
    var _this;

    _classCallCheck(this, Dante);

    _this = _possibleConstructorReturn(this, (Dante.__proto__ || Object.getPrototypeOf(Dante)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "toggleEditable", function () {
      _this.setState({
        read_only: !_this.state.read_only
      });
    });

    return _this;
  } // componentDidMount() { }


  _createClass(Dante, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_emotionTheming.ThemeProvider, {
        theme: this.props.theme || _default2.default
      }, _react.default.createElement(_base.default, {
        style: this.props.style
      }, _react.default.createElement(_editor.default, Object.assign({}, this.props, {
        toggleEditable: this.toggleEditable
      }))));
    }
  }]);

  return Dante;
}(_react.default.Component);

Dante.defaultProps = {
  content: null,
  read_only: false,
  spellcheck: false,
  title_placeholder: "Title",
  body_placeholder: "Write your story",
  decorators: function decorators(context) {
    return new _draftJsMultidecorators.default([(0, _prism.PrismDraftDecorator)(), new _draftJs.CompositeDecorator([{
      strategy: _find_entities.default.bind(null, 'LINK', context),
      component: _link2.default
    }])]);
  },
  xhr: {
    before_handler: null,
    success_handler: null,
    error_handler: null
  },
  data_storage: {
    url: null,
    method: "POST",
    success_handler: null,
    failure_handler: null,
    interval: 1500
  },
  default_wrappers: [{
    className: 'graf--p',
    block: 'unstyled'
  }, {
    className: 'graf--h2',
    block: 'header-one'
  }, {
    className: 'graf--h3',
    block: 'header-two'
  }, {
    className: 'graf--h4',
    block: 'header-three'
  }, {
    className: 'graf--blockquote',
    block: 'blockquote'
  }, {
    className: 'graf--insertunorderedlist',
    block: 'unordered-list-item'
  }, {
    className: 'graf--insertorderedlist',
    block: 'ordered-list-item'
  }, {
    className: 'graf--code',
    block: 'code-block'
  }, {
    className: 'graf--bold',
    block: 'BOLD'
  }, {
    className: 'graf--italic',
    block: 'ITALIC'
  }, {
    className: 'graf--divider',
    block: 'divider'
  }],
  continuousBlocks: ["unstyled", "blockquote", "ordered-list", "unordered-list", "unordered-list-item", "ordered-list-item", "code-block"],
  key_commands: {
    "alt-shift": [{
      key: 65,
      cmd: 'add-new-block'
    }],
    "alt-cmd": [{
      key: 49,
      cmd: 'toggle_block:header-one'
    }, {
      key: 50,
      cmd: 'toggle_block:header-two'
    }, {
      key: 53,
      cmd: 'toggle_block:blockquote'
    }],
    "cmd": [{
      key: 66,
      cmd: 'toggle_inline:BOLD'
    }, {
      key: 73,
      cmd: 'toggle_inline:ITALIC'
    }, {
      key: 75,
      cmd: 'insert:link'
    }, {
      key: 13,
      cmd: 'toggle_block:divider'
    }]
  },
  character_convert_mapping: {
    '> ': "blockquote",
    '*.': "unordered-list-item",
    '* ': "unordered-list-item",
    '- ': "unordered-list-item",
    '1.': "ordered-list-item",
    '# ': 'header-one',
    '##': 'header-two',
    '==': "unstyled",
    '` ': "code-block"
  },
  tooltips: [(0, _image.DanteImagePopoverConfig)(), (0, _link.DanteAnchorPopoverConfig)(), (0, _addButton.DanteInlineTooltipConfig)(), (0, _toolTip.DanteTooltipConfig)()],
  widgets: [(0, _image2.ImageBlockConfig)(), (0, _embed.EmbedBlockConfig)(), (0, _video.VideoBlockConfig)(), (0, _placeholder.PlaceholderBlockConfig)()]
};
var _default = Dante;
exports.default = _default;