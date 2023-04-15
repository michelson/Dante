import { updateDataOfBlock } from '../../model/index.js';
import 'immutable';
import 'draft-js';

var UpdateData = function UpdateData(t) {
  var _t$props = t.props;
    _t$props.blockProps;
    var block = _t$props.block;
  var _t$props$blockProps = t.props.blockProps,
    getEditorState = _t$props$blockProps.getEditorState,
    setEditorState = _t$props$blockProps.setEditorState;
  var data = block.getData();
  var newData = data.merge(t.state).merge({
    forceUpload: false
  });
  return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
};

export { UpdateData };
