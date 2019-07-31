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
import DanteEditor from "../core/editor.js"; //import '../../styles/dante.scss';

import '../../styled/draft.css';
import { Map, fromJS, merge } from 'immutable';
import { DanteImagePopoverConfig } from '../popovers/image.js';
import { DanteAnchorPopoverConfig } from '../popovers/link.js';
import { DanteInlineTooltipConfig } from '../popovers/addButton.js'; //'Dante2/es/components/popovers/addButton.js'

import { DanteTooltipConfig } from '../popovers/toolTip.js'; //'Dante2/es/components/popovers/toolTip.js'

import { ImageBlockConfig } from '../blocks/image.js';
import { EmbedBlockConfig } from '../blocks/embed.js';
import { VideoBlockConfig } from '../blocks/video.js';
import { PlaceholderBlockConfig } from '../blocks/placeholder.js';
import { CodeBlockConfig } from '../blocks/code.js';
import Link from '../decorators/link';
import { PrismDraftDecorator } from '../decorators/prism';
import { CompositeDecorator } from 'draft-js';
import findEntities from '../../utils/find_entities';
import MultiDecorator from 'draft-js-multidecorators';
import EditorContainer from '../../styled/base';
import { ThemeProvider } from 'emotion-theming'; // custom blocks

import defaultTheme from './themes/default'; // component implementation

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
      return React.createElement(ThemeProvider, {
        theme: this.props.theme || defaultTheme
      }, React.createElement(EditorContainer, {
        style: this.props.style
      }, React.createElement(DanteEditor, Object.assign({}, this.props, {
        toggleEditable: this.toggleEditable
      }))));
    }
  }]);

  return Dante;
}(React.Component);

Dante.defaultProps = {
  content: null,
  read_only: false,
  spellcheck: false,
  title_placeholder: "Title",
  body_placeholder: "Write your story",
  decorators: function decorators(context) {
    return new MultiDecorator([PrismDraftDecorator(), new CompositeDecorator([{
      strategy: findEntities.bind(null, 'LINK', context),
      component: Link
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
  tooltips: [DanteImagePopoverConfig(), DanteAnchorPopoverConfig(), DanteInlineTooltipConfig(), DanteTooltipConfig()],
  widgets: [ImageBlockConfig(), EmbedBlockConfig(), VideoBlockConfig(), PlaceholderBlockConfig()]
};
export default Dante;