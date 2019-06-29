"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewBlockAt = exports.updateCharacterListOfBlock = exports.updateTextOfBlock = exports.updateDataOfBlock = exports.resetBlockWithType = exports.addNewBlock = exports.getCurrentBlock = exports.getNode = exports.getDefaultBlockData = void 0;

var _immutable = require("immutable");

var _draftJs = require("draft-js");

/*
Used from [react-rte](https://github.com/brijeshb42/medium-draft)
by [brijeshb42](https://github.com/brijeshb42/medium-draft)
*/

/*
Returns default block-level metadata for various block type. Empty object otherwise.
*/
var getDefaultBlockData = function getDefaultBlockData(blockType) {
  var initialData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (blockType) {
    //case Block.TODO: return { checked: false };
    default:
      return initialData;
  }
};

exports.getDefaultBlockData = getDefaultBlockData;

var getNode = function getNode() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var t = null;

  if (root.getSelection) {
    t = root.getSelection();
  } else if (root.document.getSelection) {
    t = root.document.getSelection();
  } else if (root.document.selection) {
    t = root.document.selection.createRange().text;
  }

  return t;
};
/*
Get currentBlock in the editorState.
*/


exports.getNode = getNode;

var getCurrentBlock = function getCurrentBlock(editorState) {
  var selectionState = editorState.getSelection();
  var contentState = editorState.getCurrentContent();
  var block = contentState.getBlockForKey(selectionState.getStartKey());
  return block;
};
/*
Adds a new block (currently replaces an empty block) at the current cursor position
of the given `newType`.
*/


exports.getCurrentBlock = getCurrentBlock;

var addNewBlock = function addNewBlock(editorState) {
  var newType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "unstyled";
  var initialData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var selectionState = editorState.getSelection();

  if (!selectionState.isCollapsed()) {
    return editorState;
  }

  var contentState = editorState.getCurrentContent();
  var key = selectionState.getStartKey();
  var blockMap = contentState.getBlockMap();
  var currentBlock = getCurrentBlock(editorState);

  if (!currentBlock) {
    return editorState;
  }

  if (currentBlock.getLength() === 0) {
    if (currentBlock.getType() === newType) {
      return editorState;
    }

    var newBlock = currentBlock.merge({
      type: newType,
      data: getDefaultBlockData(newType, initialData)
    });
    var newContentState = contentState.merge({
      blockMap: blockMap.set(key, newBlock),
      selectionAfter: selectionState
    });
    return _draftJs.EditorState.push(editorState, newContentState, 'change-block-type');
  }

  return editorState;
};
/*
Changes the block type of the current block.
*/


exports.addNewBlock = addNewBlock;

var resetBlockWithType = function resetBlockWithType(editorState) {
  var newType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "unstyled";
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var contentState = editorState.getCurrentContent();
  var selectionState = editorState.getSelection();
  var key = selectionState.getStartKey();
  var blockMap = contentState.getBlockMap();
  var block = blockMap.get(key);
  var text = block.getText();
  var newBlock = block.merge({
    text: text,
    type: newType,
    data: getDefaultBlockData(newType, data)
  });
  var newContentState = contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: 0,
      focusOffset: 0
    })
  });
  return _draftJs.EditorState.push(editorState, newContentState, 'change-block-type');
};
/*
Update block-level metadata of the given `block` to the `newData`/
*/


exports.resetBlockWithType = resetBlockWithType;

var updateDataOfBlock = function updateDataOfBlock(editorState, block, newData) {
  var contentState = editorState.getCurrentContent();
  var newBlock = block.merge({
    data: newData
  });
  var newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock)
  });
  return _draftJs.EditorState.push(editorState, newContentState, 'change-block-type'); // return editorState;
};

exports.updateDataOfBlock = updateDataOfBlock;

var updateTextOfBlock = function updateTextOfBlock(editorState, block, text) {
  var contentState = editorState.getCurrentContent();
  var newBlock = block.merge({
    text: text
  });
  var newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock)
  });
  return _draftJs.EditorState.push(editorState, newContentState, 'replace-text'); // return editorState;
};

exports.updateTextOfBlock = updateTextOfBlock;

var updateCharacterListOfBlock = function updateCharacterListOfBlock(editorState, block, text, charList) {
  var contentState = editorState.getCurrentContent();
  var newBlock = block.merge({
    text: text,
    characterList: charList
  });
  var newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock)
  });
  return _draftJs.EditorState.push(editorState, newContentState, 'replace-text'); // return editorState;
}; // const BEFORE = -1;
// const AFTER = 1;

/*
Used from [react-rte](https://github.com/sstur/react-rte/blob/master/src/lib/insertBlockAfter.js)
by [sstur](https://github.com/sstur)
*/


exports.updateCharacterListOfBlock = updateCharacterListOfBlock;

var addNewBlockAt = function addNewBlockAt(editorState, pivotBlockKey) {
  var newBlockType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "unstyled";
  var initialData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var content = editorState.getCurrentContent();
  var blockMap = content.getBlockMap();
  var block = blockMap.get(pivotBlockKey);
  var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
    return v === block;
  });
  var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
    return v === block;
  }).rest();
  var newBlockKey = (0, _draftJs.genKey)();
  var newBlock = new _draftJs.ContentBlock({
    key: newBlockKey,
    type: newBlockType,
    text: '',
    characterList: block.getCharacterList().slice(0, 0),
    depth: 0,
    data: (0, _immutable.Map)(getDefaultBlockData(newBlockType, initialData))
  });
  var newBlockMap = blocksBefore.concat([[pivotBlockKey, block], [newBlockKey, newBlock]], blocksAfter).toOrderedMap();
  var selection = editorState.getSelection();
  var newContent = content.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: newBlockKey,
      anchorOffset: 0,
      focusKey: newBlockKey,
      focusOffset: 0,
      isBackward: false
    })
  });
  return _draftJs.EditorState.push(editorState, newContent, 'split-block');
};

exports.addNewBlockAt = addNewBlockAt;