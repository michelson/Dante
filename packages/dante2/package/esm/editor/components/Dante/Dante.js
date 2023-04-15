import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized, g as _extends } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import DanteEditor from '../core/editor.js';
import DraftBaseStyles from '../../styled/draft-styled.js';
import 'immutable';
import { DanteImagePopoverConfig } from '../popovers/image.js';
import { DanteAnchorPopoverConfig } from '../popovers/link.js';
import { DanteInlineTooltipConfig } from '../popovers/addButton.js';
import { DanteTooltipConfig } from '../popovers/toolTip.js';
import { FileBlockConfig } from '../blocks/file.js';
import { ImageBlockConfig } from '../blocks/image.js';
import { EmbedBlockConfig } from '../blocks/embed.js';
import { VideoBlockConfig } from '../blocks/video.js';
import { PlaceholderBlockConfig } from '../blocks/placeholder.js';
import { CodeBlockConfig } from '../blocks/code.js';
import Link from '../decorators/link.js';
import { PrismDraftDecorator } from '../decorators/prism.js';
import { CompositeDecorator } from 'draft-js';
import findEntities from '../../utils/find_entities.js';
import MultiDecorator from 'draft-js-multidecorators';
import EditorContainer from '../../styled/base.js';
import { ThemeProvider } from 'emotion-theming';
import PropTypes from 'prop-types';
import theme from './themes/default.js';
import 'lodash';
import 'draft-convert';
import '../../model/index.js';
import '../core/debug.js';
import '../../utils/save_content.js';
import 'axios';
import '../../utils/html2content.js';
import 'draft-js-custom-styles';
import '@emotion/styled';
import '../icons.js';
import '../../utils/selection.js';
import '../../styled/menu.js';
import 'polished';
import 'react-dom';
import 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import '../popovers/color.js';
import 'react-colorful';
import 'prismjs';
import 'draft-js-prism';

// component implementation
var Dante = /*#__PURE__*/function (_React$Component) {
  _inherits(Dante, _React$Component);
  var _super = _createSuper(Dante);
  function Dante(props) {
    var _this;
    _classCallCheck(this, Dante);
    _this = _super.call(this, props);
    // componentDidMount() { }
    _defineProperty(_assertThisInitialized(_this), "toggleEditable", function () {
      _this.setState({
        read_only: !_this.state.read_only
      });
    });
    return _this;
  }
  _createClass(Dante, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ThemeProvider, {
        theme: this.props.theme || theme
      }, /*#__PURE__*/React.createElement(EditorContainer, {
        style: this.props.style
      }, /*#__PURE__*/React.createElement(DraftBaseStyles, null, /*#__PURE__*/React.createElement(DanteEditor, _extends({
        styles: true
      }, this.props, {
        toggleEditable: this.toggleEditable
      })))));
    }
  }]);
  return Dante;
}(React.Component);
Dante.propTypes = {
  /** Editor content, it expects a null or a draft's EditorContent. */
  content: PropTypes.object,
  read_only: PropTypes.bool,
  spellcheck: PropTypes.bool,
  title_placeholder: PropTypes.string,
  body_placeholder: PropTypes.string,
  xhr: PropTypes.shape({
    before_handler: PropTypes.func,
    success_handler: PropTypes.func,
    error_handler: PropTypes.func
  }),
  data_storage: PropTypes.shape({
    url: PropTypes.string,
    method: PropTypes.string,
    success_handler: PropTypes.func,
    failure_handler: PropTypes.func,
    interval: PropTypes.integer
  }),
  default_wrappers: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    block: PropTypes.string.isRequired
  })),
  continuousBlocks: PropTypes.arrayOf(PropTypes.string),
  key_commands: PropTypes.object

  /*character_convert_mapping: PropTypes.shape({
      '> ': "blockquote"
  })*/
};

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
  widgets: [ImageBlockConfig(), FileBlockConfig(), EmbedBlockConfig(), VideoBlockConfig(), PlaceholderBlockConfig(), CodeBlockConfig()]
};

export { Dante as default };
