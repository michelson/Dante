"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateData = void 0;

var _index = require("../../model/index.js");

var UpdateData = function UpdateData(t) {
  var _t$props = t.props,
      blockProps = _t$props.blockProps,
      block = _t$props.block;
  var _t$props$blockProps = t.props.blockProps,
      getEditorState = _t$props$blockProps.getEditorState,
      setEditorState = _t$props$blockProps.setEditorState;
  var data = block.getData();
  var newData = data.merge(t.state).merge({
    forceUpload: false
  });
  return setEditorState((0, _index.updateDataOfBlock)(getEditorState(), block, newData));
};

exports.UpdateData = UpdateData;