import Prism from 'prismjs';
import React from 'react';
import PrismDecorator from 'draft-js-prism';

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
  return /*#__PURE__*/React.createElement("span", {
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
  prism: Prism
};
var PrismDraftDecorator = function PrismDraftDecorator() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new PrismDecorator(Object.assign(options, PrismOptions));
};

export { PrismDraftDecorator };
