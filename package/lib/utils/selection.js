"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectedBlockNode = exports.getSelection = exports.getSelectionRect = exports.getRelativeParent = void 0;

var getRelativeParent = function getRelativeParent(element) {
  if (!element) {
    return null;
  }

  var position = window.getComputedStyle(element).getPropertyValue('position');

  if (position !== 'static') {
    return element;
  }

  return getRelativeParent(element.parentElement);
};
/*
Returns the `boundingClientRect` of the passed selection.
*/


exports.getRelativeParent = getRelativeParent;

var getSelectionRect = function getSelectionRect(selected) {
  var _rect = selected.getRangeAt(0).getBoundingClientRect(); // selected.getRangeAt(0).getBoundingClientRect()


  var rect = _rect && _rect.top ? _rect : selected.getRangeAt(0).getClientRects()[0];

  if (!rect) {
    if (selected.anchorNode && selected.anchorNode.getBoundingClientRect) {
      rect = selected.anchorNode.getBoundingClientRect();
      rect.isEmptyline = true;
    } else {
      return null;
    }
  }

  return rect;
};
/*
Returns the native selection node.
*/


exports.getSelectionRect = getSelectionRect;

var getSelection = function getSelection(root) {
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
Recursively finds the DOM Element of the block where the cursor is currently present.
If not found, returns null.
*/


exports.getSelection = getSelection;

var getSelectedBlockNode = function getSelectedBlockNode(root) {
  var selection = root.getSelection();

  if (selection.rangeCount === 0) {
    return null;
  }

  var node = selection.getRangeAt(0).startContainer; // console.log(node);

  do {
    if (node.getAttribute && node.getAttribute('data-block') === 'true') {
      return node;
    }

    node = node.parentNode; // console.log(node);
  } while (node !== null);

  return null;
};

exports.getSelectedBlockNode = getSelectedBlockNode;