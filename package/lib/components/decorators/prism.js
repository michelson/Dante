"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrismDraftDecorator = void 0;

var _prismjs = _interopRequireDefault(require("prismjs"));

var _react = _interopRequireDefault(require("react"));

var _draftJsPrism = _interopRequireDefault(require("draft-js-prism"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// code taken from https://gist.github.com/SamyPesse/0690602631c19aedcfa0a28feabb9d2b
var defaultFilter = function defaultFilter(block) {
  return block.getType() === 'code-block';
};

var defaultGetSyntax = function defaultGetSyntax(block) {
  if (block.getData) {
    return block.getData().get('syntax');
  }

  return null;
};

var defaultRender = function defaultRender(props) {
  return _react.default.createElement("span", {
    className: 'prism-token token ' + props.type
  }, props.children);
};

var PrismOptions = {
  // Default language to use
  defaultSyntax: null,
  // Filter block before highlighting
  filter: defaultFilter,
  // Function to get syntax for a block
  getSyntax: defaultGetSyntax,
  // Render a decorated text for a token
  render: defaultRender,
  // Prism module
  prism: _prismjs.default
};

var PrismDraftDecorator = function PrismDraftDecorator() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new _draftJsPrism.default(Object.assign(options, PrismOptions));
};

exports.PrismDraftDecorator = PrismDraftDecorator;