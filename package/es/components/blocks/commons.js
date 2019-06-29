import { updateDataOfBlock } from '../../model/index.js';
export var UpdateData = function UpdateData(t) {
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
  return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
};