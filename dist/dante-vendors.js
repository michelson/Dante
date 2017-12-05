(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Dante2"] = factory();
	else
		root["Dante2"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 426);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EditorState
 * 
 */



var _assign = __webpack_require__(10);

var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlockTree = __webpack_require__(77);
var ContentState = __webpack_require__(48);
var EditorBidiService = __webpack_require__(175);
var Immutable = __webpack_require__(2);
var SelectionState = __webpack_require__(26);

var OrderedSet = Immutable.OrderedSet,
    Record = Immutable.Record,
    Stack = Immutable.Stack;


var defaultRecord = {
  allowUndo: true,
  currentContent: null,
  decorator: null,
  directionMap: null,
  forceSelection: false,
  inCompositionMode: false,
  inlineStyleOverride: null,
  lastChangeType: null,
  nativelyRenderedContent: null,
  redoStack: Stack(),
  selection: null,
  treeMap: null,
  undoStack: Stack()
};

var EditorStateRecord = Record(defaultRecord);

var EditorState = function () {
  EditorState.createEmpty = function createEmpty(decorator) {
    return EditorState.createWithContent(ContentState.createFromText(''), decorator);
  };

  EditorState.createWithContent = function createWithContent(contentState, decorator) {
    var firstKey = contentState.getBlockMap().first().getKey();
    return EditorState.create({
      currentContent: contentState,
      undoStack: Stack(),
      redoStack: Stack(),
      decorator: decorator || null,
      selection: SelectionState.createEmpty(firstKey)
    });
  };

  EditorState.create = function create(config) {
    var currentContent = config.currentContent,
        decorator = config.decorator;

    var recordConfig = _extends({}, config, {
      treeMap: generateNewTreeMap(currentContent, decorator),
      directionMap: EditorBidiService.getDirectionMap(currentContent)
    });
    return new EditorState(new EditorStateRecord(recordConfig));
  };

  EditorState.set = function set(editorState, put) {
    var map = editorState.getImmutable().withMutations(function (state) {
      var existingDecorator = state.get('decorator');
      var decorator = existingDecorator;
      if (put.decorator === null) {
        decorator = null;
      } else if (put.decorator) {
        decorator = put.decorator;
      }

      var newContent = put.currentContent || editorState.getCurrentContent();

      if (decorator !== existingDecorator) {
        var treeMap = state.get('treeMap');
        var newTreeMap;
        if (decorator && existingDecorator) {
          newTreeMap = regenerateTreeForNewDecorator(newContent, newContent.getBlockMap(), treeMap, decorator, existingDecorator);
        } else {
          newTreeMap = generateNewTreeMap(newContent, decorator);
        }

        state.merge({
          decorator: decorator,
          treeMap: newTreeMap,
          nativelyRenderedContent: null
        });
        return;
      }

      var existingContent = editorState.getCurrentContent();
      if (newContent !== existingContent) {
        state.set('treeMap', regenerateTreeForNewBlocks(editorState, newContent.getBlockMap(), newContent.getEntityMap(), decorator));
      }

      state.merge(put);
    });

    return new EditorState(map);
  };

  EditorState.prototype.toJS = function toJS() {
    return this.getImmutable().toJS();
  };

  EditorState.prototype.getAllowUndo = function getAllowUndo() {
    return this.getImmutable().get('allowUndo');
  };

  EditorState.prototype.getCurrentContent = function getCurrentContent() {
    return this.getImmutable().get('currentContent');
  };

  EditorState.prototype.getUndoStack = function getUndoStack() {
    return this.getImmutable().get('undoStack');
  };

  EditorState.prototype.getRedoStack = function getRedoStack() {
    return this.getImmutable().get('redoStack');
  };

  EditorState.prototype.getSelection = function getSelection() {
    return this.getImmutable().get('selection');
  };

  EditorState.prototype.getDecorator = function getDecorator() {
    return this.getImmutable().get('decorator');
  };

  EditorState.prototype.isInCompositionMode = function isInCompositionMode() {
    return this.getImmutable().get('inCompositionMode');
  };

  EditorState.prototype.mustForceSelection = function mustForceSelection() {
    return this.getImmutable().get('forceSelection');
  };

  EditorState.prototype.getNativelyRenderedContent = function getNativelyRenderedContent() {
    return this.getImmutable().get('nativelyRenderedContent');
  };

  EditorState.prototype.getLastChangeType = function getLastChangeType() {
    return this.getImmutable().get('lastChangeType');
  };

  /**
   * While editing, the user may apply inline style commands with a collapsed
   * cursor, intending to type text that adopts the specified style. In this
   * case, we track the specified style as an "override" that takes precedence
   * over the inline style of the text adjacent to the cursor.
   *
   * If null, there is no override in place.
   */


  EditorState.prototype.getInlineStyleOverride = function getInlineStyleOverride() {
    return this.getImmutable().get('inlineStyleOverride');
  };

  EditorState.setInlineStyleOverride = function setInlineStyleOverride(editorState, inlineStyleOverride) {
    return EditorState.set(editorState, { inlineStyleOverride: inlineStyleOverride });
  };

  /**
   * Get the appropriate inline style for the editor state. If an
   * override is in place, use it. Otherwise, the current style is
   * based on the location of the selection state.
   */


  EditorState.prototype.getCurrentInlineStyle = function getCurrentInlineStyle() {
    var override = this.getInlineStyleOverride();
    if (override != null) {
      return override;
    }

    var content = this.getCurrentContent();
    var selection = this.getSelection();

    if (selection.isCollapsed()) {
      return getInlineStyleForCollapsedSelection(content, selection);
    }

    return getInlineStyleForNonCollapsedSelection(content, selection);
  };

  EditorState.prototype.getBlockTree = function getBlockTree(blockKey) {
    return this.getImmutable().getIn(['treeMap', blockKey]);
  };

  EditorState.prototype.isSelectionAtStartOfContent = function isSelectionAtStartOfContent() {
    var firstKey = this.getCurrentContent().getBlockMap().first().getKey();
    return this.getSelection().hasEdgeWithin(firstKey, 0, 0);
  };

  EditorState.prototype.isSelectionAtEndOfContent = function isSelectionAtEndOfContent() {
    var content = this.getCurrentContent();
    var blockMap = content.getBlockMap();
    var last = blockMap.last();
    var end = last.getLength();
    return this.getSelection().hasEdgeWithin(last.getKey(), end, end);
  };

  EditorState.prototype.getDirectionMap = function getDirectionMap() {
    return this.getImmutable().get('directionMap');
  };

  /**
   * Incorporate native DOM selection changes into the EditorState. This
   * method can be used when we simply want to accept whatever the DOM
   * has given us to represent selection, and we do not need to re-render
   * the editor.
   *
   * To forcibly move the DOM selection, see `EditorState.forceSelection`.
   */


  EditorState.acceptSelection = function acceptSelection(editorState, selection) {
    return updateSelection(editorState, selection, false);
  };

  /**
   * At times, we need to force the DOM selection to be where we
   * need it to be. This can occur when the anchor or focus nodes
   * are non-text nodes, for instance. In this case, we want to trigger
   * a re-render of the editor, which in turn forces selection into
   * the correct place in the DOM. The `forceSelection` method
   * accomplishes this.
   *
   * This method should be used in cases where you need to explicitly
   * move the DOM selection from one place to another without a change
   * in ContentState.
   */


  EditorState.forceSelection = function forceSelection(editorState, selection) {
    if (!selection.getHasFocus()) {
      selection = selection.set('hasFocus', true);
    }
    return updateSelection(editorState, selection, true);
  };

  /**
   * Move selection to the end of the editor without forcing focus.
   */


  EditorState.moveSelectionToEnd = function moveSelectionToEnd(editorState) {
    var content = editorState.getCurrentContent();
    var lastBlock = content.getLastBlock();
    var lastKey = lastBlock.getKey();
    var length = lastBlock.getLength();

    return EditorState.acceptSelection(editorState, new SelectionState({
      anchorKey: lastKey,
      anchorOffset: length,
      focusKey: lastKey,
      focusOffset: length,
      isBackward: false
    }));
  };

  /**
   * Force focus to the end of the editor. This is useful in scenarios
   * where we want to programmatically focus the input and it makes sense
   * to allow the user to continue working seamlessly.
   */


  EditorState.moveFocusToEnd = function moveFocusToEnd(editorState) {
    var afterSelectionMove = EditorState.moveSelectionToEnd(editorState);
    return EditorState.forceSelection(afterSelectionMove, afterSelectionMove.getSelection());
  };

  /**
   * Push the current ContentState onto the undo stack if it should be
   * considered a boundary state, and set the provided ContentState as the
   * new current content.
   */


  EditorState.push = function push(editorState, contentState, changeType) {
    if (editorState.getCurrentContent() === contentState) {
      return editorState;
    }

    var forceSelection = changeType !== 'insert-characters';
    var directionMap = EditorBidiService.getDirectionMap(contentState, editorState.getDirectionMap());

    if (!editorState.getAllowUndo()) {
      return EditorState.set(editorState, {
        currentContent: contentState,
        directionMap: directionMap,
        lastChangeType: changeType,
        selection: contentState.getSelectionAfter(),
        forceSelection: forceSelection,
        inlineStyleOverride: null
      });
    }

    var selection = editorState.getSelection();
    var currentContent = editorState.getCurrentContent();
    var undoStack = editorState.getUndoStack();
    var newContent = contentState;

    if (selection !== currentContent.getSelectionAfter() || mustBecomeBoundary(editorState, changeType)) {
      undoStack = undoStack.push(currentContent);
      newContent = newContent.set('selectionBefore', selection);
    } else if (changeType === 'insert-characters' || changeType === 'backspace-character' || changeType === 'delete-character') {
      // Preserve the previous selection.
      newContent = newContent.set('selectionBefore', currentContent.getSelectionBefore());
    }

    var inlineStyleOverride = editorState.getInlineStyleOverride();

    // Don't discard inline style overrides for the following change types:
    var overrideChangeTypes = ['adjust-depth', 'change-block-type', 'split-block'];

    if (overrideChangeTypes.indexOf(changeType) === -1) {
      inlineStyleOverride = null;
    }

    var editorStateChanges = {
      currentContent: newContent,
      directionMap: directionMap,
      undoStack: undoStack,
      redoStack: Stack(),
      lastChangeType: changeType,
      selection: contentState.getSelectionAfter(),
      forceSelection: forceSelection,
      inlineStyleOverride: inlineStyleOverride
    };

    return EditorState.set(editorState, editorStateChanges);
  };

  /**
   * Make the top ContentState in the undo stack the new current content and
   * push the current content onto the redo stack.
   */


  EditorState.undo = function undo(editorState) {
    if (!editorState.getAllowUndo()) {
      return editorState;
    }

    var undoStack = editorState.getUndoStack();
    var newCurrentContent = undoStack.peek();
    if (!newCurrentContent) {
      return editorState;
    }

    var currentContent = editorState.getCurrentContent();
    var directionMap = EditorBidiService.getDirectionMap(newCurrentContent, editorState.getDirectionMap());

    return EditorState.set(editorState, {
      currentContent: newCurrentContent,
      directionMap: directionMap,
      undoStack: undoStack.shift(),
      redoStack: editorState.getRedoStack().push(currentContent),
      forceSelection: true,
      inlineStyleOverride: null,
      lastChangeType: 'undo',
      nativelyRenderedContent: null,
      selection: currentContent.getSelectionBefore()
    });
  };

  /**
   * Make the top ContentState in the redo stack the new current content and
   * push the current content onto the undo stack.
   */


  EditorState.redo = function redo(editorState) {
    if (!editorState.getAllowUndo()) {
      return editorState;
    }

    var redoStack = editorState.getRedoStack();
    var newCurrentContent = redoStack.peek();
    if (!newCurrentContent) {
      return editorState;
    }

    var currentContent = editorState.getCurrentContent();
    var directionMap = EditorBidiService.getDirectionMap(newCurrentContent, editorState.getDirectionMap());

    return EditorState.set(editorState, {
      currentContent: newCurrentContent,
      directionMap: directionMap,
      undoStack: editorState.getUndoStack().push(currentContent),
      redoStack: redoStack.shift(),
      forceSelection: true,
      inlineStyleOverride: null,
      lastChangeType: 'redo',
      nativelyRenderedContent: null,
      selection: newCurrentContent.getSelectionAfter()
    });
  };

  /**
   * Not for public consumption.
   */


  function EditorState(immutable) {
    _classCallCheck(this, EditorState);

    this._immutable = immutable;
  }

  /**
   * Not for public consumption.
   */


  EditorState.prototype.getImmutable = function getImmutable() {
    return this._immutable;
  };

  return EditorState;
}();

/**
 * Set the supplied SelectionState as the new current selection, and set
 * the `force` flag to trigger manual selection placement by the view.
 */


function updateSelection(editorState, selection, forceSelection) {
  return EditorState.set(editorState, {
    selection: selection,
    forceSelection: forceSelection,
    nativelyRenderedContent: null,
    inlineStyleOverride: null
  });
}

/**
 * Regenerate the entire tree map for a given ContentState and decorator.
 * Returns an OrderedMap that maps all available ContentBlock objects.
 */
function generateNewTreeMap(contentState, decorator) {
  return contentState.getBlockMap().map(function (block) {
    return BlockTree.generate(contentState, block, decorator);
  }).toOrderedMap();
}

/**
 * Regenerate tree map objects for all ContentBlocks that have changed
 * between the current editorState and newContent. Returns an OrderedMap
 * with only changed regenerated tree map objects.
 */
function regenerateTreeForNewBlocks(editorState, newBlockMap, newEntityMap, decorator) {
  var contentState = editorState.getCurrentContent().set('entityMap', newEntityMap);
  var prevBlockMap = contentState.getBlockMap();
  var prevTreeMap = editorState.getImmutable().get('treeMap');
  return prevTreeMap.merge(newBlockMap.toSeq().filter(function (block, key) {
    return block !== prevBlockMap.get(key);
  }).map(function (block) {
    return BlockTree.generate(contentState, block, decorator);
  }));
}

/**
 * Generate tree map objects for a new decorator object, preserving any
 * decorations that are unchanged from the previous decorator.
 *
 * Note that in order for this to perform optimally, decoration Lists for
 * decorators should be preserved when possible to allow for direct immutable
 * List comparison.
 */
function regenerateTreeForNewDecorator(content, blockMap, previousTreeMap, decorator, existingDecorator) {
  return previousTreeMap.merge(blockMap.toSeq().filter(function (block) {
    return decorator.getDecorations(block, content) !== existingDecorator.getDecorations(block, content);
  }).map(function (block) {
    return BlockTree.generate(content, block, decorator);
  }));
}

/**
 * Return whether a change should be considered a boundary state, given
 * the previous change type. Allows us to discard potential boundary states
 * during standard typing or deletion behavior.
 */
function mustBecomeBoundary(editorState, changeType) {
  var lastChangeType = editorState.getLastChangeType();
  return changeType !== lastChangeType || changeType !== 'insert-characters' && changeType !== 'backspace-character' && changeType !== 'delete-character';
}

function getInlineStyleForCollapsedSelection(content, selection) {
  var startKey = selection.getStartKey();
  var startOffset = selection.getStartOffset();
  var startBlock = content.getBlockForKey(startKey);

  // If the cursor is not at the start of the block, look backward to
  // preserve the style of the preceding character.
  if (startOffset > 0) {
    return startBlock.getInlineStyleAt(startOffset - 1);
  }

  // The caret is at position zero in this block. If the block has any
  // text at all, use the style of the first character.
  if (startBlock.getLength()) {
    return startBlock.getInlineStyleAt(0);
  }

  // Otherwise, look upward in the document to find the closest character.
  return lookUpwardForInlineStyle(content, startKey);
}

function getInlineStyleForNonCollapsedSelection(content, selection) {
  var startKey = selection.getStartKey();
  var startOffset = selection.getStartOffset();
  var startBlock = content.getBlockForKey(startKey);

  // If there is a character just inside the selection, use its style.
  if (startOffset < startBlock.getLength()) {
    return startBlock.getInlineStyleAt(startOffset);
  }

  // Check if the selection at the end of a non-empty block. Use the last
  // style in the block.
  if (startOffset > 0) {
    return startBlock.getInlineStyleAt(startOffset - 1);
  }

  // Otherwise, look upward in the document to find the closest character.
  return lookUpwardForInlineStyle(content, startKey);
}

function lookUpwardForInlineStyle(content, fromKey) {
  var previousBlock = content.getBlockBefore(fromKey);
  var previousLength;

  while (previousBlock) {
    previousLength = previousBlock.getLength();
    if (previousLength) {
      return previousBlock.getInlineStyleAt(previousLength - 1);
    }
    previousBlock = content.getBlockBefore(previousBlock.getKey());
  }

  return OrderedSet();
}

module.exports = EditorState;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Copyright (c) 2014-2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.Immutable = factory();
}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
      return isIterable(value) ? value : Seq(value);
    }


  createClass(KeyedIterable, Iterable);
    function KeyedIterable(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }


  createClass(IndexedIterable, Iterable);
    function IndexedIterable(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }


  createClass(SetIterable, Iterable);
    function SetIterable(value) {
      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
    }



  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;


  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || (size !== undefined && begin <= -size)) &&
      (end === undefined || (size !== undefined && end >= size));
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ?
      defaultIndex :
      index < 0 ?
        Math.max(0, size + index) :
        size === undefined ?
          index :
          Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


  function Iterator(next) {
      this.next = next;
    }

    Iterator.prototype.toString = function() {
      return '[Iterator]';
    };


  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect =
  Iterator.prototype.toSource = function () { return this.toString(); }
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };


  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
      value: value, done: false
    });
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (
      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
      iterable[FAUX_ITERATOR_SYMBOL]
    );
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
    function Seq(value) {
      return value === null || value === undefined ? emptySequence() :
        isIterable(value) ? value.toSeq() : seqFromValue(value);
    }

    Seq.of = function(/*...values*/) {
      return Seq(arguments);
    };

    Seq.prototype.toSeq = function() {
      return this;
    };

    Seq.prototype.toString = function() {
      return this.__toString('Seq {', '}');
    };

    Seq.prototype.cacheResult = function() {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };

    // abstract __iterateUncached(fn, reverse)

    Seq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, true);
    };

    // abstract __iteratorUncached(type, reverse)

    Seq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, true);
    };



  createClass(KeyedSeq, Seq);
    function KeyedSeq(value) {
      return value === null || value === undefined ?
        emptySequence().toKeyedSeq() :
        isIterable(value) ?
          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
          keyedSeqFromValue(value);
    }

    KeyedSeq.prototype.toKeyedSeq = function() {
      return this;
    };



  createClass(IndexedSeq, Seq);
    function IndexedSeq(value) {
      return value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
    }

    IndexedSeq.of = function(/*...values*/) {
      return IndexedSeq(arguments);
    };

    IndexedSeq.prototype.toIndexedSeq = function() {
      return this;
    };

    IndexedSeq.prototype.toString = function() {
      return this.__toString('Seq [', ']');
    };

    IndexedSeq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, false);
    };

    IndexedSeq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, false);
    };



  createClass(SetSeq, Seq);
    function SetSeq(value) {
      return (
        value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value
      ).toSetSeq();
    }

    SetSeq.of = function(/*...values*/) {
      return SetSeq(arguments);
    };

    SetSeq.prototype.toSetSeq = function() {
      return this;
    };



  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;



  createClass(ArraySeq, IndexedSeq);
    function ArraySeq(array) {
      this._array = array;
      this.size = array.length;
    }

    ArraySeq.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };

    ArraySeq.prototype.__iterate = function(fn, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ArraySeq.prototype.__iterator = function(type, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      var ii = 0;
      return new Iterator(function() 
        {return ii > maxIndex ?
          iteratorDone() :
          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
      );
    };



  createClass(ObjectSeq, KeyedSeq);
    function ObjectSeq(object) {
      var keys = Object.keys(object);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }

    ObjectSeq.prototype.get = function(key, notSetValue) {
      if (notSetValue !== undefined && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };

    ObjectSeq.prototype.has = function(key) {
      return this._object.hasOwnProperty(key);
    };

    ObjectSeq.prototype.__iterate = function(fn, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var key = keys[reverse ? maxIndex - ii : ii];
        if (fn(object[key], key, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ObjectSeq.prototype.__iterator = function(type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var key = keys[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, key, object[key]);
      });
    };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(IterableSeq, IndexedSeq);
    function IterableSeq(iterable) {
      this._iterable = iterable;
      this.size = iterable.length || iterable.size;
    }

    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };

    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };



  createClass(IteratorSeq, IndexedSeq);
    function IteratorSeq(iterator) {
      this._iterator = iterator;
      this._iteratorCache = [];
    }

    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      while (iterations < cache.length) {
        if (fn(cache[iterations], iterations++, this) === false) {
          return iterations;
        }
      }
      var step;
      while (!(step = iterator.next()).done) {
        var val = step.value;
        cache[iterations] = val;
        if (fn(val, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };

    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      return new Iterator(function()  {
        if (iterations >= cache.length) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          cache[iterations] = step.value;
        }
        return iteratorValue(type, iterations, cache[iterations++]);
      });
    };




  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq =
      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
      typeof value === 'object' ? new ObjectSeq(value) :
      undefined;
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of [k, v] entries, '+
        'or keyed object: ' + value
      );
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values: ' + value
      );
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) ||
      (typeof value === 'object' && new ObjectSeq(value));
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values, or keyed object: ' + value
      );
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return (
      isArrayLike(value) ? new ArraySeq(value) :
      isIterator(value) ? new IteratorSeq(value) :
      hasIterator(value) ? new IterableSeq(value) :
      undefined
    );
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ?
      fromJSWith(converter, json, '', {'': json}) :
      fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' &&
        typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' &&
        typeof valueB.equals === 'function' &&
        valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (
      !isIterable(b) ||
      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
      isKeyed(a) !== isKeyed(b) ||
      isIndexed(a) !== isIndexed(b) ||
      isOrdered(a) !== isOrdered(b)
    ) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function(v, k)  {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function(v, k)  {
      if (notAssociative ? !a.has(v) :
          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

    function Repeat(value, times) {
      if (!(this instanceof Repeat)) {
        return new Repeat(value, times);
      }
      this._value = value;
      this.size = times === undefined ? Infinity : Math.max(0, times);
      if (this.size === 0) {
        if (EMPTY_REPEAT) {
          return EMPTY_REPEAT;
        }
        EMPTY_REPEAT = this;
      }
    }

    Repeat.prototype.toString = function() {
      if (this.size === 0) {
        return 'Repeat []';
      }
      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
    };

    Repeat.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._value : notSetValue;
    };

    Repeat.prototype.includes = function(searchValue) {
      return is(this._value, searchValue);
    };

    Repeat.prototype.slice = function(begin, end) {
      var size = this.size;
      return wholeSlice(begin, end, size) ? this :
        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
    };

    Repeat.prototype.reverse = function() {
      return this;
    };

    Repeat.prototype.indexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return 0;
      }
      return -1;
    };

    Repeat.prototype.lastIndexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return this.size;
      }
      return -1;
    };

    Repeat.prototype.__iterate = function(fn, reverse) {
      for (var ii = 0; ii < this.size; ii++) {
        if (fn(this._value, ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
      var ii = 0;
      return new Iterator(function() 
        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
      );
    };

    Repeat.prototype.equals = function(other) {
      return other instanceof Repeat ?
        is(this._value, other._value) :
        deepEqual(other);
    };


  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

    function Range(start, end, step) {
      if (!(this instanceof Range)) {
        return new Range(start, end, step);
      }
      invariant(step !== 0, 'Cannot step a Range by 0');
      start = start || 0;
      if (end === undefined) {
        end = Infinity;
      }
      step = step === undefined ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }

    Range.prototype.toString = function() {
      if (this.size === 0) {
        return 'Range []';
      }
      return 'Range [ ' +
        this._start + '...' + this._end +
        (this._step > 1 ? ' by ' + this._step : '') +
      ' ]';
    };

    Range.prototype.get = function(index, notSetValue) {
      return this.has(index) ?
        this._start + wrapIndex(this, index) * this._step :
        notSetValue;
    };

    Range.prototype.includes = function(searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 &&
        possibleIndex < this.size &&
        possibleIndex === Math.floor(possibleIndex);
    };

    Range.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range(0, 0);
      }
      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
    };

    Range.prototype.indexOf = function(searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index
        }
      }
      return -1;
    };

    Range.prototype.lastIndexOf = function(searchValue) {
      return this.indexOf(searchValue);
    };

    Range.prototype.__iterate = function(fn, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(value, ii, this) === false) {
          return ii + 1;
        }
        value += reverse ? -step : step;
      }
      return ii;
    };

    Range.prototype.__iterator = function(type, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      var ii = 0;
      return new Iterator(function()  {
        var v = value;
        value += reverse ? -step : step;
        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
      });
    };

    Range.prototype.equals = function(other) {
      return other instanceof Range ?
        this._start === other._start &&
        this._end === other._end &&
        this._step === other._step :
        deepEqual(this, other);
    };


  var EMPTY_RANGE;

  createClass(Collection, Iterable);
    function Collection() {
      throw TypeError('Abstract');
    }


  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}


  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul =
    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
    Math.imul :
    function imul(a, b) {
      a = a | 0; // int
      b = b | 0; // int
      var c = a & 0xffff;
      var d = b & 0xffff;
      // Shift by 0 fixes the sign on the high part.
      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
    };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined &&
               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = (function() {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }());

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1: // Element
          return node.uniqueID;
        case 9: // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      'Cannot perform this action with an infinite size.'
    );
  }

  createClass(Map, KeyedCollection);

    // @pragma Construction

    function Map(value) {
      return value === null || value === undefined ? emptyMap() :
        isMap(value) && !isOrdered(value) ? value :
        emptyMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    Map.prototype.toString = function() {
      return this.__toString('Map {', '}');
    };

    // @pragma Access

    Map.prototype.get = function(k, notSetValue) {
      return this._root ?
        this._root.get(0, undefined, k, notSetValue) :
        notSetValue;
    };

    // @pragma Modification

    Map.prototype.set = function(k, v) {
      return updateMap(this, k, v);
    };

    Map.prototype.setIn = function(keyPath, v) {
      return this.updateIn(keyPath, NOT_SET, function()  {return v});
    };

    Map.prototype.remove = function(k) {
      return updateMap(this, k, NOT_SET);
    };

    Map.prototype.deleteIn = function(keyPath) {
      return this.updateIn(keyPath, function()  {return NOT_SET});
    };

    Map.prototype.update = function(k, notSetValue, updater) {
      return arguments.length === 1 ?
        k(this) :
        this.updateIn([k], notSetValue, updater);
    };

    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
      if (!updater) {
        updater = notSetValue;
        notSetValue = undefined;
      }
      var updatedValue = updateInDeepMap(
        this,
        forceIterator(keyPath),
        notSetValue,
        updater
      );
      return updatedValue === NOT_SET ? undefined : updatedValue;
    };

    Map.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };

    // @pragma Composition

    Map.prototype.merge = function(/*...iters*/) {
      return mergeIntoMapWith(this, undefined, arguments);
    };

    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, merger, iters);
    };

    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.merge === 'function' ?
          m.merge.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoMapWith(this, deepMerger, arguments);
    };

    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
    };

    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.mergeDeep === 'function' ?
          m.mergeDeep.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.sort = function(comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator));
    };

    Map.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator, mapper));
    };

    // @pragma Mutability

    Map.prototype.withMutations = function(fn) {
      var mutable = this.asMutable();
      fn(mutable);
      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
    };

    Map.prototype.asMutable = function() {
      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
    };

    Map.prototype.asImmutable = function() {
      return this.__ensureOwner();
    };

    Map.prototype.wasAltered = function() {
      return this.__altered;
    };

    Map.prototype.__iterator = function(type, reverse) {
      return new MapIterator(this, type, reverse);
    };

    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      this._root && this._root.iterate(function(entry ) {
        iterations++;
        return fn(entry[1], entry[0], this$0);
      }, reverse);
      return iterations;
    };

    Map.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };


  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;


  // #pragma Trie Nodes



    function ArrayMapNode(ownerID, entries) {
      this.ownerID = ownerID;
      this.entries = entries;
    }

    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && entries.length === 1) {
        return; // undefined
      }

      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
        return createNodes(ownerID, entries, key, value);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new ArrayMapNode(ownerID, newEntries);
    };




    function BitmapIndexedNode(ownerID, bitmap, nodes) {
      this.ownerID = ownerID;
      this.bitmap = bitmap;
      this.nodes = nodes;
    }

    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
      var bitmap = this.bitmap;
      return (bitmap & bit) === 0 ? notSetValue :
        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
    };

    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var bit = 1 << keyHashFrag;
      var bitmap = this.bitmap;
      var exists = (bitmap & bit) !== 0;

      if (!exists && value === NOT_SET) {
        return this;
      }

      var idx = popCount(bitmap & (bit - 1));
      var nodes = this.nodes;
      var node = exists ? nodes[idx] : undefined;
      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

      if (newNode === node) {
        return this;
      }

      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
      }

      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
        return nodes[idx ^ 1];
      }

      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
        return newNode;
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
      var newNodes = exists ? newNode ?
        setIn(nodes, idx, newNode, isEditable) :
        spliceOut(nodes, idx, isEditable) :
        spliceIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.bitmap = newBitmap;
        this.nodes = newNodes;
        return this;
      }

      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
    };




    function HashArrayMapNode(ownerID, count, nodes) {
      this.ownerID = ownerID;
      this.count = count;
      this.nodes = nodes;
    }

    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var node = this.nodes[idx];
      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
    };

    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var removed = value === NOT_SET;
      var nodes = this.nodes;
      var node = nodes[idx];

      if (removed && !node) {
        return this;
      }

      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
      if (newNode === node) {
        return this;
      }

      var newCount = this.count;
      if (!node) {
        newCount++;
      } else if (!newNode) {
        newCount--;
        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
          return packNodes(ownerID, nodes, newCount, idx);
        }
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newNodes = setIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.count = newCount;
        this.nodes = newNodes;
        return this;
      }

      return new HashArrayMapNode(ownerID, newCount, newNodes);
    };




    function HashCollisionNode(ownerID, keyHash, entries) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entries = entries;
    }

    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }

      var removed = value === NOT_SET;

      if (keyHash !== this.keyHash) {
        if (removed) {
          return this;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
      }

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && len === 2) {
        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
    };




    function ValueNode(ownerID, keyHash, entry) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entry = entry;
    }

    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
    };

    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var keyMatch = is(key, this.entry[0]);
      if (keyMatch ? value === this.entry[1] : removed) {
        return this;
      }

      SetRef(didAlter);

      if (removed) {
        SetRef(didChangeSize);
        return; // undefined
      }

      if (keyMatch) {
        if (ownerID && ownerID === this.ownerID) {
          this.entry[1] = value;
          return this;
        }
        return new ValueNode(ownerID, this.keyHash, [key, value]);
      }

      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
    };



  // #pragma Iterators

  ArrayMapNode.prototype.iterate =
  HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  }

  BitmapIndexedNode.prototype.iterate =
  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  }

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  }

  createClass(MapIterator, Iterator);

    function MapIterator(map, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map._root && mapIteratorFrame(map._root);
    }

    MapIterator.prototype.next = function() {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex;
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };


  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ?
      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ?
      existing.mergeDeep(value) :
      is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function(existing, value, key)  {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function(x ) {return x.size !== 0});
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function(collection ) {
      var mergeIntoMap = merger ?
        function(value, key)  {
          collection.update(key, NOT_SET, function(existing )
            {return existing === NOT_SET ? value : merger(existing, value, key)}
          );
        } :
        function(value, key)  {
          collection.set(key, value);
        }
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(
      isNotSet || (existing && existing.set),
      'invalid keyPath'
    );
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(
      nextExisting,
      keyPathIter,
      notSetValue,
      updater
    );
    return nextUpdated === nextExisting ? existing :
      nextUpdated === NOT_SET ? existing.remove(key) :
      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - ((x >> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

    // @pragma Construction

    function List(value) {
      var empty = emptyList();
      if (value === null || value === undefined) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedIterable(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function(list ) {
        list.setSize(size);
        iter.forEach(function(v, i)  {return list.set(i, v)});
      });
    }

    List.of = function(/*...values*/) {
      return this(arguments);
    };

    List.prototype.toString = function() {
      return this.__toString('List [', ']');
    };

    // @pragma Access

    List.prototype.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };

    // @pragma Modification

    List.prototype.set = function(index, value) {
      return updateList(this, index, value);
    };

    List.prototype.remove = function(index) {
      return !this.has(index) ? this :
        index === 0 ? this.shift() :
        index === this.size - 1 ? this.pop() :
        this.splice(index, 1);
    };

    List.prototype.insert = function(index, value) {
      return this.splice(index, 0, value);
    };

    List.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };

    List.prototype.push = function(/*...values*/) {
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function(list ) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };

    List.prototype.pop = function() {
      return setListBounds(this, 0, -1);
    };

    List.prototype.unshift = function(/*...values*/) {
      var values = arguments;
      return this.withMutations(function(list ) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };

    List.prototype.shift = function() {
      return setListBounds(this, 1);
    };

    // @pragma Composition

    List.prototype.merge = function(/*...iters*/) {
      return mergeIntoListWith(this, undefined, arguments);
    };

    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, merger, iters);
    };

    List.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoListWith(this, deepMerger, arguments);
    };

    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, deepMergerWith(merger), iters);
    };

    List.prototype.setSize = function(size) {
      return setListBounds(this, 0, size);
    };

    // @pragma Iteration

    List.prototype.slice = function(begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(
        this,
        resolveBegin(begin, size),
        resolveEnd(end, size)
      );
    };

    List.prototype.__iterator = function(type, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      return new Iterator(function()  {
        var value = values();
        return value === DONE ?
          iteratorDone() :
          iteratorValue(type, index++, value);
      });
    };

    List.prototype.__iterate = function(fn, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, index++, this) === false) {
          break;
        }
      }
      return index;
    };

    List.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        return this;
      }
      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
    };


  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn =
  ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;



    function VNode(array, ownerID) {
      this.array = array;
      this.ownerID = ownerID;
    }

    // TODO: seems like these methods are very similar

    VNode.prototype.removeBefore = function(ownerID, level, index) {
      if (index === level ? 1 << level : 0 || this.array.length === 0) {
        return this;
      }
      var originIndex = (index >>> level) & MASK;
      if (originIndex >= this.array.length) {
        return new VNode([], ownerID);
      }
      var removingFirst = originIndex === 0;
      var newChild;
      if (level > 0) {
        var oldChild = this.array[originIndex];
        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
        if (newChild === oldChild && removingFirst) {
          return this;
        }
      }
      if (removingFirst && !newChild) {
        return this;
      }
      var editable = editableVNode(this, ownerID);
      if (!removingFirst) {
        for (var ii = 0; ii < originIndex; ii++) {
          editable.array[ii] = undefined;
        }
      }
      if (newChild) {
        editable.array[originIndex] = newChild;
      }
      return editable;
    };

    VNode.prototype.removeAfter = function(ownerID, level, index) {
      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
        return this;
      }
      var sizeIndex = ((index - 1) >>> level) & MASK;
      if (sizeIndex >= this.array.length) {
        return this;
      }

      var newChild;
      if (level > 0) {
        var oldChild = this.array[sizeIndex];
        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
          return this;
        }
      }

      var editable = editableVNode(this, ownerID);
      editable.array.splice(sizeIndex + 1);
      if (newChild) {
        editable.array[sizeIndex] = newChild;
      }
      return editable;
    };



  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ?
        iterateLeaf(node, offset) :
        iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : (left - offset) >> level;
      var to = ((right - offset) >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(
            array && array[idx], level - SHIFT, offset + (idx << level)
          );
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function(list ) {
        index < 0 ?
          setListBounds(list, index).set(0, value) :
          setListBounds(list, 0, index + 1).set(index, value)
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = (index >>> level) & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << (list._level + SHIFT)) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[(rawIndex >>> level) & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ?
      listNodeFor(list, newCapacity - 1) :
      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = (oldTailOffset >>> level) & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

    // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = (newOrigin >>> newLevel) & MASK;
        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
  }

  createClass(OrderedMap, Map);

    // @pragma Construction

    function OrderedMap(value) {
      return value === null || value === undefined ? emptyOrderedMap() :
        isOrderedMap(value) ? value :
        emptyOrderedMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    OrderedMap.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedMap.prototype.toString = function() {
      return this.__toString('OrderedMap {', '}');
    };

    // @pragma Access

    OrderedMap.prototype.get = function(k, notSetValue) {
      var index = this._map.get(k);
      return index !== undefined ? this._list.get(index)[1] : notSetValue;
    };

    // @pragma Modification

    OrderedMap.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        return this;
      }
      return emptyOrderedMap();
    };

    OrderedMap.prototype.set = function(k, v) {
      return updateOrderedMap(this, k, v);
    };

    OrderedMap.prototype.remove = function(k) {
      return updateOrderedMap(this, k, NOT_SET);
    };

    OrderedMap.prototype.wasAltered = function() {
      return this._map.wasAltered() || this._list.wasAltered();
    };

    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._list.__iterate(
        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
        reverse
      );
    };

    OrderedMap.prototype.__iterator = function(type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };

    OrderedMap.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };


  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) { // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
    function ToKeyedSequence(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }

    ToKeyedSequence.prototype.get = function(key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };

    ToKeyedSequence.prototype.has = function(key) {
      return this._iter.has(key);
    };

    ToKeyedSequence.prototype.valueSeq = function() {
      return this._iter.valueSeq();
    };

    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
      }
      return reversedSequence;
    };

    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
      }
      return mappedSequence;
    };

    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var ii;
      return this._iter.__iterate(
        this._useKeys ?
          function(v, k)  {return fn(v, k, this$0)} :
          ((ii = reverse ? resolveSize(this) : 0),
            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
        reverse
      );
    };

    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
      if (this._useKeys) {
        return this._iter.__iterator(type, reverse);
      }
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var ii = reverse ? resolveSize(this) : 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
      });
    };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(ToIndexedSequence, IndexedSeq);
    function ToIndexedSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToIndexedSequence.prototype.includes = function(value) {
      return this._iter.includes(value);
    };

    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
    };

    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, iterations++, step.value, step)
      });
    };



  createClass(ToSetSequence, SetSeq);
    function ToSetSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToSetSequence.prototype.has = function(key) {
      return this._iter.includes(key);
    };

    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
    };

    ToSetSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, step.value, step.value, step);
      });
    };



  createClass(FromEntriesSequence, KeyedSeq);
    function FromEntriesSequence(entries) {
      this._iter = entries;
      this.size = entries.size;
    }

    FromEntriesSequence.prototype.entrySeq = function() {
      return this._iter.toSeq();
    };

    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(entry ) {
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return fn(
            indexedIterable ? entry.get(1) : entry[1],
            indexedIterable ? entry.get(0) : entry[0],
            this$0
          );
        }
      }, reverse);
    };

    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          // Check if entry exists first so array access doesn't throw for holes
          // in the parent iteration.
          if (entry) {
            validateEntry(entry);
            var indexedIterable = isIterable(entry);
            return iteratorValue(
              type,
              indexedIterable ? entry.get(0) : entry[0],
              indexedIterable ? entry.get(1) : entry[1],
              step
            );
          }
        }
      });
    };


  ToIndexedSequence.prototype.cacheResult =
  ToKeyedSequence.prototype.cacheResult =
  ToSetSequence.prototype.cacheResult =
  FromEntriesSequence.prototype.cacheResult =
    cacheResultThrough;


  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function()  {return iterable};
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function()  {return iterable.reverse()};
      return reversedSequence;
    };
    flipSequence.has = function(key ) {return iterable.includes(key)};
    flipSequence.includes = function(key ) {return iterable.has(key)};
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
    }
    flipSequence.__iteratorUncached = function(type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function()  {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(
        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
        reverse
      );
    }
    return flipSequence;
  }


  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function(key ) {return iterable.has(key)};
    mappedSequence.get = function(key, notSetValue)  {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ?
        notSetValue :
        mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(
        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
        reverse
      );
    }
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(
          type,
          key,
          mapper.call(context, entry[1], key, iterable),
          step
        );
      });
    }
    return mappedSequence;
  }


  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function()  {return iterable};
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function()  {return iterable.flip()};
        return flipSequence;
      };
    }
    reversedSequence.get = function(key, notSetValue) 
      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
    reversedSequence.has = function(key )
      {return iterable.has(useKeys ? key : -1 - key)};
    reversedSequence.includes = function(value ) {return iterable.includes(value)};
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
    };
    reversedSequence.__iterator =
      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
    return reversedSequence;
  }


  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function(key ) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function(key, notSetValue)  {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
          v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    }
    return filterSequence;
  }


  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        0,
        function(a ) {return a + 1}
      );
    });
    return groups.asImmutable();
  }


  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
      );
    });
    var coerce = iterableClass(iterable);
    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
  }


  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ?
          iterable.get(index + resolvedBegin, notSetValue) :
          notSetValue;
      }
    }

    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k)  {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
                 iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function(type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function()  {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    }

    return sliceSeq;
  }


  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function(v, k, c) 
        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
      );
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function()  {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }


  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function()  {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }


  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function(v ) {
      if (!isIterable(v)) {
        v = isKeyedIterable ?
          keyedSeqFromValue(v) :
          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function(v ) {return v.size !== 0});

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable ||
          isKeyedIterable && isKeyed(singleton) ||
          isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(
      function(sum, seq)  {
        if (sum !== undefined) {
          var size = seq.size;
          if (size !== undefined) {
            return sum + size;
          }
        }
      },
      0
    );
    return concatSeq;
  }


  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function(fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {var this$0 = this;
        iter.__iterate(function(v, k)  {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    }
    flatSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function()  {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    }
    return flatSequence;
  }


  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(
      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
    ).flatten(true);
  }


  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 -1;
    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k) 
        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
        fn(v, iterations++, this$0) !== false},
        reverse
      );
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function()  {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ?
          iteratorValue(type, iterations++, separator) :
          iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }


  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(
      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
    ).toArray();
    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
      isKeyedIterable ?
      function(v, i)  { entries[i].length = 2; } :
      function(v, i)  { entries[i] = v[1]; }
    );
    return isKeyedIterable ? KeyedSeq(entries) :
      isIndexed(iterable) ? IndexedSeq(entries) :
      SetSeq(entries);
  }


  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq()
        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
      return entry && entry[0];
    } else {
      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
  }


  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function(fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse) {
      var iterators = iters.map(function(i )
        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
      );
      var iterations = 0;
      var isDone = false;
      return new Iterator(function()  {
        var steps;
        if (!isDone) {
          steps = iterators.map(function(i ) {return i.next()});
          isDone = steps.some(function(s ) {return s.done});
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(
          type,
          iterations++,
          zipper.apply(null, steps.map(function(s ) {return s.value}))
        );
      });
    };
    return zipSequence
  }


  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable :
      isIndexed(iterable) ? IndexedIterable :
      SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create(
      (
        isKeyed(iterable) ? KeyedSeq :
        isIndexed(iterable) ? IndexedSeq :
        SetSeq
      ).prototype
    );
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

    function Record(defaultValues, name) {
      var hasInitialized;

      var RecordType = function Record(values) {
        if (values instanceof RecordType) {
          return values;
        }
        if (!(this instanceof RecordType)) {
          return new RecordType(values);
        }
        if (!hasInitialized) {
          hasInitialized = true;
          var keys = Object.keys(defaultValues);
          setProps(RecordTypePrototype, keys);
          RecordTypePrototype.size = keys.length;
          RecordTypePrototype._name = name;
          RecordTypePrototype._keys = keys;
          RecordTypePrototype._defaultValues = defaultValues;
        }
        this._map = Map(values);
      };

      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
      RecordTypePrototype.constructor = RecordType;

      return RecordType;
    }

    Record.prototype.toString = function() {
      return this.__toString(recordName(this) + ' {', '}');
    };

    // @pragma Access

    Record.prototype.has = function(k) {
      return this._defaultValues.hasOwnProperty(k);
    };

    Record.prototype.get = function(k, notSetValue) {
      if (!this.has(k)) {
        return notSetValue;
      }
      var defaultVal = this._defaultValues[k];
      return this._map ? this._map.get(k, defaultVal) : defaultVal;
    };

    // @pragma Modification

    Record.prototype.clear = function() {
      if (this.__ownerID) {
        this._map && this._map.clear();
        return this;
      }
      var RecordType = this.constructor;
      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
    };

    Record.prototype.set = function(k, v) {
      if (!this.has(k)) {
        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
      }
      var newMap = this._map && this._map.set(k, v);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.remove = function(k) {
      if (!this.has(k)) {
        return this;
      }
      var newMap = this._map && this._map.remove(k);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
    };

    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
    };

    Record.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map && this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return makeRecord(this, newMap, ownerID);
    };


  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn =
  RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;


  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

    // @pragma Construction

    function Set(value) {
      return value === null || value === undefined ? emptySet() :
        isSet(value) && !isOrdered(value) ? value :
        emptySet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    Set.of = function(/*...values*/) {
      return this(arguments);
    };

    Set.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    Set.prototype.toString = function() {
      return this.__toString('Set {', '}');
    };

    // @pragma Access

    Set.prototype.has = function(value) {
      return this._map.has(value);
    };

    // @pragma Modification

    Set.prototype.add = function(value) {
      return updateSet(this, this._map.set(value, true));
    };

    Set.prototype.remove = function(value) {
      return updateSet(this, this._map.remove(value));
    };

    Set.prototype.clear = function() {
      return updateSet(this, this._map.clear());
    };

    // @pragma Composition

    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
      iters = iters.filter(function(x ) {return x.size !== 0});
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function(set ) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
        }
      });
    };

    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (!iters.every(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (iters.some(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.merge = function() {
      return this.union.apply(this, arguments);
    };

    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return this.union.apply(this, iters);
    };

    Set.prototype.sort = function(comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator));
    };

    Set.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator, mapper));
    };

    Set.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
    };

    Set.prototype.__iterator = function(type, reverse) {
      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
    };

    Set.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };


  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set :
      newMap.size === 0 ? set.__empty() :
      set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

    // @pragma Construction

    function OrderedSet(value) {
      return value === null || value === undefined ? emptyOrderedSet() :
        isOrderedSet(value) ? value :
        emptyOrderedSet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    OrderedSet.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedSet.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    OrderedSet.prototype.toString = function() {
      return this.__toString('OrderedSet {', '}');
    };


  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

    // @pragma Construction

    function Stack(value) {
      return value === null || value === undefined ? emptyStack() :
        isStack(value) ? value :
        emptyStack().unshiftAll(value);
    }

    Stack.of = function(/*...values*/) {
      return this(arguments);
    };

    Stack.prototype.toString = function() {
      return this.__toString('Stack [', ']');
    };

    // @pragma Access

    Stack.prototype.get = function(index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };

    Stack.prototype.peek = function() {
      return this._head && this._head.value;
    };

    // @pragma Modification

    Stack.prototype.push = function(/*...values*/) {
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pushAll = function(iter) {
      iter = IndexedIterable(iter);
      if (iter.size === 0) {
        return this;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.reverse().forEach(function(value ) {
        newSize++;
        head = {
          value: value,
          next: head
        };
      });
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pop = function() {
      return this.slice(1);
    };

    Stack.prototype.unshift = function(/*...values*/) {
      return this.push.apply(this, arguments);
    };

    Stack.prototype.unshiftAll = function(iter) {
      return this.pushAll(iter);
    };

    Stack.prototype.shift = function() {
      return this.pop.apply(this, arguments);
    };

    Stack.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = undefined;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };

    Stack.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        // super.slice(begin, end);
        return IndexedCollection.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    // @pragma Mutability

    Stack.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };

    // @pragma Iteration

    Stack.prototype.__iterate = function(fn, reverse) {
      if (reverse) {
        return this.reverse().__iterate(fn);
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };

    Stack.prototype.__iterator = function(type, reverse) {
      if (reverse) {
        return this.reverse().__iterator(type);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function()  {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };


  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;


  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols &&
      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
      return array;
    },

    toIndexedSeq: function() {
      return new ToIndexedSequence(this);
    },

    toJS: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
      ).__toJS();
    },

    toJSON: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
      ).__toJS();
    },

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function() {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function(v, k)  { object[k] = v; });
      return object;
    },

    toOrderedMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function() {
      return new ToSetSequence(this);
    },

    toSeq: function() {
      return isIndexed(this) ? this.toIndexedSeq() :
        isKeyed(this) ? this.toKeyedSeq() :
        this.toSetSeq();
    },

    toStack: function() {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function() {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },


    // ### Common JavaScript methods and properties

    toString: function() {
      return '[Iterable]';
    },

    __toString: function(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function() {var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function(searchValue) {
      return this.some(function(value ) {return is(value, searchValue)});
    },

    entries: function() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function(v, k, c)  {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    findEntry: function(predicate, context) {
      var found;
      this.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findLastEntry: function(predicate, context) {
      return this.toSeq().reverse().findEntry(predicate, context);
    },

    forEach: function(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function(v ) {
        isFirst ? (isFirst = false) : (joined += separator);
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function(reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function(v, k, c)  {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function(reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function() {
      return this.__iterator(ITERATE_VALUES);
    },


    // ### More sequential methods

    butLast: function() {
      return this.slice(0, -1);
    },

    isEmpty: function() {
      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
    },

    count: function(predicate, context) {
      return ensureSize(
        predicate ? this.toSeq().filter(predicate, context) : this
      );
    },

    countBy: function(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function(other) {
      return deepEqual(this, other);
    },

    entrySeq: function() {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
      return entriesSequence;
    },

    filterNot: function(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findLast: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    first: function() {
      return this.find(returnTrue);
    },

    flatMap: function(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function() {
      return new FromEntriesSequence(this);
    },

    get: function(searchKey, notSetValue) {
      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
    },

    getIn: function(searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function(searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function(iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function(value ) {return iter.includes(value)});
    },

    isSuperset: function(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keySeq: function() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function() {
      return this.toSeq().reverse().first();
    },

    max: function(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function() {
      return this.slice(1);
    },

    skip: function(amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function(amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function(amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function() {
      return this.toIndexedSeq();
    },


    // ### Hashable Object

    hashCode: function() {
      return this.__hash || (this.__hash = hashIterable(this));
    }


    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect =
  IterablePrototype.toSource = function() { return this.toString(); };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  // Temporary warning about using length
  (function () {
    try {
      Object.defineProperty(IterablePrototype, 'length', {
        get: function () {
          if (!Iterable.noLengthWarning) {
            var stack;
            try {
              throw new Error();
            } catch (error) {
              stack = error.stack;
            }
            if (stack.indexOf('_wrapObject') === -1) {
              console && console.warn && console.warn(
                'iterable.length has been deprecated, '+
                'use iterable.size or iterable.count(). '+
                'This warning will become a silent error in a future version. ' +
                stack
              );
              return this.size;
            }
          }
        }
      });
    } catch (e) {}
  })();



  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function() {
      return reify(this, flipFactory(this));
    },

    findKey: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLastKey: function(predicate, context) {
      return this.toSeq().reverse().findKey(predicate, context);
    },

    keyOf: function(searchValue) {
      return this.findKey(function(value ) {return is(value, searchValue)});
    },

    lastKeyOf: function(searchValue) {
      return this.findLastKey(function(value ) {return is(value, searchValue)});
    },

    mapEntries: function(mapper, context) {var this$0 = this;
      var iterations = 0;
      return reify(this,
        this.toSeq().map(
          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
        ).fromEntrySeq()
      );
    },

    mapKeys: function(mapper, context) {var this$0 = this;
      return reify(this,
        this.toSeq().flip().map(
          function(k, v)  {return mapper.call(context, k, v, this$0)}
        ).flip()
      );
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, false);
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function(searchValue) {
      var key = this.toKeyedSeq().keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function(searchValue) {
      var key = this.toKeyedSeq().reverse().keyOf(searchValue);
      return key === undefined ? -1 : key;

      // var index =
      // return this.toSeq().reverse().indexOf(searchValue);
    },

    reverse: function() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function(index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(
        this,
        numArgs === 1 ?
          spliced :
          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
      );
    },


    // ### More collection methods

    findLastIndex: function(predicate, context) {
      var key = this.toKeyedSeq().findLastKey(predicate, context);
      return key === undefined ? -1 : key;
    },

    first: function() {
      return this.get(0);
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function(index, notSetValue) {
      index = wrapIndex(this, index);
      return (index < 0 || (this.size === Infinity ||
          (this.size !== undefined && index > this.size))) ?
        notSetValue :
        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
    },

    has: function(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ?
        this.size === Infinity || index < this.size :
        this.indexOf(index) !== -1
      );
    },

    interpose: function(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function(/*...iterables*/) {
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    last: function() {
      return this.get(-1);
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function(/*, ...iterables */) {
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function(zipper/*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function(value) {
      return this.has(value);
    },


    // ### More sequential methods

    keySeq: function() {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;


  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);


  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    }
  }

  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    }
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : value;
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(
      keyed ?
        ordered ?
          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
        ordered ?
          function(v ) { h = 31 * h + hash(v) | 0; } :
          function(v ) { h = h + hash(v) | 0; }
    );
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;

}));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(240);
} else {
  module.exports = require('./cjs/react.development.js');
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var nullthrows = function nullthrows(x) {
  if (x != null) {
    return x;
  }
  throw new Error("Got unexpected null or undefined");
};

module.exports = nullthrows;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var UserAgentData = __webpack_require__(226);
var VersionRange = __webpack_require__(227);

var mapObject = __webpack_require__(237);
var memoizeStringOnly = __webpack_require__(117);

/**
 * Checks to see whether `name` and `version` satisfy `query`.
 *
 * @param {string} name Name of the browser, device, engine or platform
 * @param {?string} version Version of the browser, engine or platform
 * @param {string} query Query of form "Name [range expression]"
 * @param {?function} normalizer Optional pre-processor for range expression
 * @return {boolean}
 */
function compare(name, version, query, normalizer) {
  // check for exact match with no version
  if (name === query) {
    return true;
  }

  // check for non-matching names
  if (!query.startsWith(name)) {
    return false;
  }

  // full comparison with version
  var range = query.slice(name.length);
  if (version) {
    range = normalizer ? normalizer(range) : range;
    return VersionRange.contains(range, version);
  }

  return false;
}

/**
 * Normalizes `version` by stripping any "NT" prefix, but only on the Windows
 * platform.
 *
 * Mimics the stripping performed by the `UserAgentWindowsPlatform` PHP class.
 *
 * @param {string} version
 * @return {string}
 */
function normalizePlatformVersion(version) {
  if (UserAgentData.platformName === 'Windows') {
    return version.replace(/^\s*NT/, '');
  }

  return version;
}

/**
 * Provides client-side access to the authoritative PHP-generated User Agent
 * information supplied by the server.
 */
var UserAgent = {
  /**
   * Check if the User Agent browser matches `query`.
   *
   * `query` should be a string like "Chrome" or "Chrome > 33".
   *
   * Valid browser names include:
   *
   * - ACCESS NetFront
   * - AOL
   * - Amazon Silk
   * - Android
   * - BlackBerry
   * - BlackBerry PlayBook
   * - Chrome
   * - Chrome for iOS
   * - Chrome frame
   * - Facebook PHP SDK
   * - Facebook for iOS
   * - Firefox
   * - IE
   * - IE Mobile
   * - Mobile Safari
   * - Motorola Internet Browser
   * - Nokia
   * - Openwave Mobile Browser
   * - Opera
   * - Opera Mini
   * - Opera Mobile
   * - Safari
   * - UIWebView
   * - Unknown
   * - webOS
   * - etc...
   *
   * An authoritative list can be found in the PHP `BrowserDetector` class and
   * related classes in the same file (see calls to `new UserAgentBrowser` here:
   * https://fburl.com/50728104).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name [range expression]"
   * @return {boolean}
   */
  isBrowser: function isBrowser(query) {
    return compare(UserAgentData.browserName, UserAgentData.browserFullVersion, query);
  },


  /**
   * Check if the User Agent browser uses a 32 or 64 bit architecture.
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "32" or "64".
   * @return {boolean}
   */
  isBrowserArchitecture: function isBrowserArchitecture(query) {
    return compare(UserAgentData.browserArchitecture, null, query);
  },


  /**
   * Check if the User Agent device matches `query`.
   *
   * `query` should be a string like "iPhone" or "iPad".
   *
   * Valid device names include:
   *
   * - Kindle
   * - Kindle Fire
   * - Unknown
   * - iPad
   * - iPhone
   * - iPod
   * - etc...
   *
   * An authoritative list can be found in the PHP `DeviceDetector` class and
   * related classes in the same file (see calls to `new UserAgentDevice` here:
   * https://fburl.com/50728332).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name"
   * @return {boolean}
   */
  isDevice: function isDevice(query) {
    return compare(UserAgentData.deviceName, null, query);
  },


  /**
   * Check if the User Agent rendering engine matches `query`.
   *
   * `query` should be a string like "WebKit" or "WebKit >= 537".
   *
   * Valid engine names include:
   *
   * - Gecko
   * - Presto
   * - Trident
   * - WebKit
   * - etc...
   *
   * An authoritative list can be found in the PHP `RenderingEngineDetector`
   * class related classes in the same file (see calls to `new
   * UserAgentRenderingEngine` here: https://fburl.com/50728617).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name [range expression]"
   * @return {boolean}
   */
  isEngine: function isEngine(query) {
    return compare(UserAgentData.engineName, UserAgentData.engineVersion, query);
  },


  /**
   * Check if the User Agent platform matches `query`.
   *
   * `query` should be a string like "Windows" or "iOS 5 - 6".
   *
   * Valid platform names include:
   *
   * - Android
   * - BlackBerry OS
   * - Java ME
   * - Linux
   * - Mac OS X
   * - Mac OS X Calendar
   * - Mac OS X Internet Account
   * - Symbian
   * - SymbianOS
   * - Windows
   * - Windows Mobile
   * - Windows Phone
   * - iOS
   * - iOS Facebook Integration Account
   * - iOS Facebook Social Sharing UI
   * - webOS
   * - Chrome OS
   * - etc...
   *
   * An authoritative list can be found in the PHP `PlatformDetector` class and
   * related classes in the same file (see calls to `new UserAgentPlatform`
   * here: https://fburl.com/50729226).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name [range expression]"
   * @return {boolean}
   */
  isPlatform: function isPlatform(query) {
    return compare(UserAgentData.platformName, UserAgentData.platformFullVersion, query, normalizePlatformVersion);
  },


  /**
   * Check if the User Agent platform is a 32 or 64 bit architecture.
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "32" or "64".
   * @return {boolean}
   */
  isPlatformArchitecture: function isPlatformArchitecture(query) {
    return compare(UserAgentData.platformArchitecture, null, query);
  }
};

module.exports = mapObject(UserAgent, memoizeStringOnly);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftModifier
 * @typechecks
 * 
 */



var CharacterMetadata = __webpack_require__(13);
var ContentStateInlineStyle = __webpack_require__(162);
var DraftFeatureFlags = __webpack_require__(81);
var Immutable = __webpack_require__(2);

var applyEntityToContentState = __webpack_require__(179);
var getCharacterRemovalRange = __webpack_require__(200);
var getContentStateFragment = __webpack_require__(37);
var insertFragmentIntoContentState = __webpack_require__(205);
var insertTextIntoContentState = __webpack_require__(206);
var invariant = __webpack_require__(0);
var modifyBlockForContentState = __webpack_require__(217);
var removeEntitiesAtEdges = __webpack_require__(97);
var removeRangeFromContentState = __webpack_require__(219);
var splitBlockInContentState = __webpack_require__(221);

var OrderedSet = Immutable.OrderedSet;

/**
 * `DraftModifier` provides a set of convenience methods that apply
 * modifications to a `ContentState` object based on a target `SelectionState`.
 *
 * Any change to a `ContentState` should be decomposable into a series of
 * transaction functions that apply the required changes and return output
 * `ContentState` objects.
 *
 * These functions encapsulate some of the most common transaction sequences.
 */

var DraftModifier = {
  replaceText: function replaceText(contentState, rangeToReplace, text, inlineStyle, entityKey) {
    var withoutEntities = removeEntitiesAtEdges(contentState, rangeToReplace);
    var withoutText = removeRangeFromContentState(withoutEntities, rangeToReplace);

    var character = CharacterMetadata.create({
      style: inlineStyle || OrderedSet(),
      entity: entityKey || null
    });

    return insertTextIntoContentState(withoutText, withoutText.getSelectionAfter(), text, character);
  },

  insertText: function insertText(contentState, targetRange, text, inlineStyle, entityKey) {
    !targetRange.isCollapsed() ?  false ? invariant(false, 'Target range must be collapsed for `insertText`.') : invariant(false) : void 0;
    return DraftModifier.replaceText(contentState, targetRange, text, inlineStyle, entityKey);
  },

  moveText: function moveText(contentState, removalRange, targetRange) {
    var movedFragment = getContentStateFragment(contentState, removalRange);

    var afterRemoval = DraftModifier.removeRange(contentState, removalRange, 'backward');

    return DraftModifier.replaceWithFragment(afterRemoval, targetRange, movedFragment);
  },

  replaceWithFragment: function replaceWithFragment(contentState, targetRange, fragment) {
    var withoutEntities = removeEntitiesAtEdges(contentState, targetRange);
    var withoutText = removeRangeFromContentState(withoutEntities, targetRange);

    return insertFragmentIntoContentState(withoutText, withoutText.getSelectionAfter(), fragment);
  },

  removeRange: function removeRange(contentState, rangeToRemove, removalDirection) {
    var startKey = void 0,
        endKey = void 0,
        startBlock = void 0,
        endBlock = void 0;
    if (rangeToRemove.getIsBackward()) {
      rangeToRemove = rangeToRemove.merge({
        anchorKey: rangeToRemove.getFocusKey(),
        anchorOffset: rangeToRemove.getFocusOffset(),
        focusKey: rangeToRemove.getAnchorKey(),
        focusOffset: rangeToRemove.getAnchorOffset(),
        isBackward: false
      });
    }
    startKey = rangeToRemove.getAnchorKey();
    endKey = rangeToRemove.getFocusKey();
    startBlock = contentState.getBlockForKey(startKey);
    endBlock = contentState.getBlockForKey(endKey);
    var startOffset = rangeToRemove.getStartOffset();
    var endOffset = rangeToRemove.getEndOffset();

    var startEntityKey = startBlock.getEntityAt(startOffset);
    var endEntityKey = endBlock.getEntityAt(endOffset - 1);

    // Check whether the selection state overlaps with a single entity.
    // If so, try to remove the appropriate substring of the entity text.
    if (startKey === endKey) {
      if (startEntityKey && startEntityKey === endEntityKey) {
        var _adjustedRemovalRange = getCharacterRemovalRange(contentState.getEntityMap(), startBlock, endBlock, rangeToRemove, removalDirection);
        return removeRangeFromContentState(contentState, _adjustedRemovalRange);
      }
    }
    var adjustedRemovalRange = rangeToRemove;
    if (DraftFeatureFlags.draft_segmented_entities_behavior) {
      // Adjust the selection to properly delete segemented and immutable
      // entities
      adjustedRemovalRange = getCharacterRemovalRange(contentState.getEntityMap(), startBlock, endBlock, rangeToRemove, removalDirection);
    }

    var withoutEntities = removeEntitiesAtEdges(contentState, adjustedRemovalRange);
    return removeRangeFromContentState(withoutEntities, adjustedRemovalRange);
  },

  splitBlock: function splitBlock(contentState, selectionState) {
    var withoutEntities = removeEntitiesAtEdges(contentState, selectionState);
    var withoutText = removeRangeFromContentState(withoutEntities, selectionState);

    return splitBlockInContentState(withoutText, withoutText.getSelectionAfter());
  },

  applyInlineStyle: function applyInlineStyle(contentState, selectionState, inlineStyle) {
    return ContentStateInlineStyle.add(contentState, selectionState, inlineStyle);
  },

  removeInlineStyle: function removeInlineStyle(contentState, selectionState, inlineStyle) {
    return ContentStateInlineStyle.remove(contentState, selectionState, inlineStyle);
  },

  setBlockType: function setBlockType(contentState, selectionState, blockType) {
    return modifyBlockForContentState(contentState, selectionState, function (block) {
      return block.merge({ type: blockType, depth: 0 });
    });
  },

  setBlockData: function setBlockData(contentState, selectionState, blockData) {
    return modifyBlockForContentState(contentState, selectionState, function (block) {
      return block.merge({ data: blockData });
    });
  },

  mergeBlockData: function mergeBlockData(contentState, selectionState, blockData) {
    return modifyBlockForContentState(contentState, selectionState, function (block) {
      return block.merge({ data: block.getData().merge(blockData) });
    });
  },

  applyEntity: function applyEntity(contentState, selectionState, entityKey) {
    var withoutEntities = removeEntitiesAtEdges(contentState, selectionState);
    return applyEntityToContentState(withoutEntities, selectionState, entityKey);
  }
};

module.exports = DraftModifier;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(239);
} else {
  module.exports = require('./cjs/react-dom.development.js');
}


/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(70);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CharacterMetadata
 * @typechecks
 * 
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(2),
    Map = _require.Map,
    OrderedSet = _require.OrderedSet,
    Record = _require.Record;

// Immutable.map is typed such that the value for every key in the map
// must be the same type


var EMPTY_SET = OrderedSet();

var defaultRecord = {
  style: EMPTY_SET,
  entity: null
};

var CharacterMetadataRecord = Record(defaultRecord);

var CharacterMetadata = function (_CharacterMetadataRec) {
  _inherits(CharacterMetadata, _CharacterMetadataRec);

  function CharacterMetadata() {
    _classCallCheck(this, CharacterMetadata);

    return _possibleConstructorReturn(this, _CharacterMetadataRec.apply(this, arguments));
  }

  CharacterMetadata.prototype.getStyle = function getStyle() {
    return this.get('style');
  };

  CharacterMetadata.prototype.getEntity = function getEntity() {
    return this.get('entity');
  };

  CharacterMetadata.prototype.hasStyle = function hasStyle(style) {
    return this.getStyle().includes(style);
  };

  CharacterMetadata.applyStyle = function applyStyle(record, style) {
    var withStyle = record.set('style', record.getStyle().add(style));
    return CharacterMetadata.create(withStyle);
  };

  CharacterMetadata.removeStyle = function removeStyle(record, style) {
    var withoutStyle = record.set('style', record.getStyle().remove(style));
    return CharacterMetadata.create(withoutStyle);
  };

  CharacterMetadata.applyEntity = function applyEntity(record, entityKey) {
    var withEntity = record.getEntity() === entityKey ? record : record.set('entity', entityKey);
    return CharacterMetadata.create(withEntity);
  };

  /**
   * Use this function instead of the `CharacterMetadata` constructor.
   * Since most content generally uses only a very small number of
   * style/entity permutations, we can reuse these objects as often as
   * possible.
   */


  CharacterMetadata.create = function create(config) {
    if (!config) {
      return EMPTY;
    }

    var defaultConfig = { style: EMPTY_SET, entity: null };

    // Fill in unspecified properties, if necessary.
    var configMap = Map(defaultConfig).merge(config);

    var existing = pool.get(configMap);
    if (existing) {
      return existing;
    }

    var newCharacter = new CharacterMetadata(configMap);
    pool = pool.set(configMap, newCharacter);
    return newCharacter;
  };

  return CharacterMetadata;
}(CharacterMetadataRecord);

var EMPTY = new CharacterMetadata();
var pool = Map([[Map(defaultRecord), EMPTY]]);

CharacterMetadata.EMPTY = EMPTY;

module.exports = CharacterMetadata;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * Unicode-enabled replacesments for basic String functions.
 *
 * All the functions in this module assume that the input string is a valid
 * UTF-16 encoding of a Unicode sequence. If it's not the case, the behavior
 * will be undefined.
 *
 * WARNING: Since this module is typechecks-enforced, you may find new bugs
 * when replacing normal String functions with ones provided here.
 */



var invariant = __webpack_require__(0);

// These two ranges are consecutive so anything in [HIGH_START, LOW_END] is a
// surrogate code unit.
var SURROGATE_HIGH_START = 0xD800;
var SURROGATE_HIGH_END = 0xDBFF;
var SURROGATE_LOW_START = 0xDC00;
var SURROGATE_LOW_END = 0xDFFF;
var SURROGATE_UNITS_REGEX = /[\uD800-\uDFFF]/;

/**
 * @param {number} codeUnit   A Unicode code-unit, in range [0, 0x10FFFF]
 * @return {boolean}          Whether code-unit is in a surrogate (hi/low) range
 */
function isCodeUnitInSurrogateRange(codeUnit) {
  return SURROGATE_HIGH_START <= codeUnit && codeUnit <= SURROGATE_LOW_END;
}

/**
 * Returns whether the two characters starting at `index` form a surrogate pair.
 * For example, given the string s = "\uD83D\uDE0A", (s, 0) returns true and
 * (s, 1) returns false.
 *
 * @param {string} str
 * @param {number} index
 * @return {boolean}
 */
function isSurrogatePair(str, index) {
  !(0 <= index && index < str.length) ?  false ? invariant(false, 'isSurrogatePair: Invalid index %s for string length %s.', index, str.length) : invariant(false) : void 0;
  if (index + 1 === str.length) {
    return false;
  }
  var first = str.charCodeAt(index);
  var second = str.charCodeAt(index + 1);
  return SURROGATE_HIGH_START <= first && first <= SURROGATE_HIGH_END && SURROGATE_LOW_START <= second && second <= SURROGATE_LOW_END;
}

/**
 * @param {string} str  Non-empty string
 * @return {boolean}    True if the input includes any surrogate code units
 */
function hasSurrogateUnit(str) {
  return SURROGATE_UNITS_REGEX.test(str);
}

/**
 * Return the length of the original Unicode character at given position in the
 * String by looking into the UTF-16 code unit; that is equal to 1 for any
 * non-surrogate characters in BMP ([U+0000..U+D7FF] and [U+E000, U+FFFF]); and
 * returns 2 for the hi/low surrogates ([U+D800..U+DFFF]), which are in fact
 * representing non-BMP characters ([U+10000..U+10FFFF]).
 *
 * Examples:
 * - '\u0020' => 1
 * - '\u3020' => 1
 * - '\uD835' => 2
 * - '\uD835\uDDEF' => 2
 * - '\uDDEF' => 2
 *
 * @param {string} str  Non-empty string
 * @param {number} pos  Position in the string to look for one code unit
 * @return {number}      Number 1 or 2
 */
function getUTF16Length(str, pos) {
  return 1 + isCodeUnitInSurrogateRange(str.charCodeAt(pos));
}

/**
 * Fully Unicode-enabled replacement for String#length
 *
 * @param {string} str  Valid Unicode string
 * @return {number}     The number of Unicode characters in the string
 */
function strlen(str) {
  // Call the native functions if there's no surrogate char
  if (!hasSurrogateUnit(str)) {
    return str.length;
  }

  var len = 0;
  for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
    len++;
  }
  return len;
}

/**
 * Fully Unicode-enabled replacement for String#substr()
 *
 * @param {string} str      Valid Unicode string
 * @param {number} start    Location in Unicode sequence to begin extracting
 * @param {?number} length  The number of Unicode characters to extract
 *                          (default: to the end of the string)
 * @return {string}         Extracted sub-string
 */
function substr(str, start, length) {
  start = start || 0;
  length = length === undefined ? Infinity : length || 0;

  // Call the native functions if there's no surrogate char
  if (!hasSurrogateUnit(str)) {
    return str.substr(start, length);
  }

  // Obvious cases
  var size = str.length;
  if (size <= 0 || start > size || length <= 0) {
    return '';
  }

  // Find the actual starting position
  var posA = 0;
  if (start > 0) {
    for (; start > 0 && posA < size; start--) {
      posA += getUTF16Length(str, posA);
    }
    if (posA >= size) {
      return '';
    }
  } else if (start < 0) {
    for (posA = size; start < 0 && 0 < posA; start++) {
      posA -= getUTF16Length(str, posA - 1);
    }
    if (posA < 0) {
      posA = 0;
    }
  }

  // Find the actual ending position
  var posB = size;
  if (length < size) {
    for (posB = posA; length > 0 && posB < size; length--) {
      posB += getUTF16Length(str, posB);
    }
  }

  return str.substring(posA, posB);
}

/**
 * Fully Unicode-enabled replacement for String#substring()
 *
 * @param {string} str    Valid Unicode string
 * @param {number} start  Location in Unicode sequence to begin extracting
 * @param {?number} end   Location in Unicode sequence to end extracting
 *                        (default: end of the string)
 * @return {string}       Extracted sub-string
 */
function substring(str, start, end) {
  start = start || 0;
  end = end === undefined ? Infinity : end || 0;

  if (start < 0) {
    start = 0;
  }
  if (end < 0) {
    end = 0;
  }

  var length = Math.abs(end - start);
  start = start < end ? start : end;
  return substr(str, start, length);
}

/**
 * Get a list of Unicode code-points from a String
 *
 * @param {string} str        Valid Unicode string
 * @return {array<number>}    A list of code-points in [0..0x10FFFF]
 */
function getCodePoints(str) {
  var codePoints = [];
  for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
    codePoints.push(str.codePointAt(pos));
  }
  return codePoints;
}

var UnicodeUtils = {
  getCodePoints: getCodePoints,
  getUTF16Length: getUTF16Length,
  hasSurrogateUnit: hasSurrogateUnit,
  isCodeUnitInSurrogateRange: isCodeUnitInSurrogateRange,
  isSurrogatePair: isSurrogatePair,
  strlen: strlen,
  substring: substring,
  substr: substr
};

module.exports = UnicodeUtils;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule generateRandomKey
 * @typechecks
 * 
 */



var seenKeys = {};
var MULTIPLIER = Math.pow(2, 24);

function generateRandomKey() {
  var key = void 0;
  while (key === undefined || seenKeys.hasOwnProperty(key) || !isNaN(+key)) {
    key = Math.floor(Math.random() * MULTIPLIER).toString(32);
  }
  seenKeys[key] = true;
  return key;
}

module.exports = generateRandomKey;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Draft
 * 
 */



var AtomicBlockUtils = __webpack_require__(160);
var BlockMapBuilder = __webpack_require__(25);
var CharacterMetadata = __webpack_require__(13);
var CompositeDraftDecorator = __webpack_require__(161);
var ContentBlock = __webpack_require__(18);
var ContentState = __webpack_require__(48);
var DefaultDraftBlockRenderMap = __webpack_require__(49);
var DefaultDraftInlineStyle = __webpack_require__(78);
var DraftEditor = __webpack_require__(163);
var DraftEditorBlock = __webpack_require__(79);
var DraftEntity = __webpack_require__(34);
var DraftModifier = __webpack_require__(6);
var DraftEntityInstance = __webpack_require__(80);
var EditorState = __webpack_require__(1);
var KeyBindingUtil = __webpack_require__(50);
var RichTextEditorUtil = __webpack_require__(84);
var SelectionState = __webpack_require__(26);

var convertFromDraftStateToRaw = __webpack_require__(180);
var convertFromHTMLToContentBlocks = __webpack_require__(85);
var convertFromRawToDraftState = __webpack_require__(181);
var generateRandomKey = __webpack_require__(15);
var getDefaultKeyBinding = __webpack_require__(86);
var getVisibleSelectionRect = __webpack_require__(204);

var DraftPublic = {
  Editor: DraftEditor,
  EditorBlock: DraftEditorBlock,
  EditorState: EditorState,

  CompositeDecorator: CompositeDraftDecorator,
  Entity: DraftEntity,
  EntityInstance: DraftEntityInstance,

  BlockMapBuilder: BlockMapBuilder,
  CharacterMetadata: CharacterMetadata,
  ContentBlock: ContentBlock,
  ContentState: ContentState,
  SelectionState: SelectionState,

  AtomicBlockUtils: AtomicBlockUtils,
  KeyBindingUtil: KeyBindingUtil,
  Modifier: DraftModifier,
  RichUtils: RichTextEditorUtil,

  DefaultDraftBlockRenderMap: DefaultDraftBlockRenderMap,
  DefaultDraftInlineStyle: DefaultDraftInlineStyle,

  convertFromHTML: convertFromHTMLToContentBlocks,
  convertFromRaw: convertFromRawToDraftState,
  convertToRaw: convertFromDraftStateToRaw,
  genKey: generateRandomKey,
  getDefaultKeyBinding: getDefaultKeyBinding,
  getVisibleSelectionRect: getVisibleSelectionRect
};

module.exports = DraftPublic;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * This function is used to mark string literals representing CSS class names
 * so that they can be transformed statically. This allows for modularization
 * and minification of CSS class names.
 *
 * In static_upstream, this function is actually implemented, but it should
 * eventually be replaced with something more descriptive, and the transform
 * that is used in the main stack should be ported for use elsewhere.
 *
 * @param string|object className to modularize, or an object of key/values.
 *                      In the object case, the values are conditions that
 *                      determine if the className keys should be included.
 * @param [string ...]  Variable list of classNames in the string case.
 * @return string       Renderable space-separated CSS className.
 */
function cx(classNames) {
  if (typeof classNames == 'object') {
    return Object.keys(classNames).filter(function (className) {
      return classNames[className];
    }).map(replace).join(' ');
  }
  return Array.prototype.map.call(arguments, replace).join(' ');
}

function replace(str) {
  return str.replace(/\//g, '-');
}

module.exports = cx;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ContentBlock
 * 
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Immutable = __webpack_require__(2);

var findRangesImmutable = __webpack_require__(36);

var List = Immutable.List,
    Map = Immutable.Map,
    OrderedSet = Immutable.OrderedSet,
    Record = Immutable.Record;


var EMPTY_SET = OrderedSet();

var defaultRecord = {
  key: '',
  type: 'unstyled',
  text: '',
  characterList: List(),
  depth: 0,
  data: Map()
};

var ContentBlockRecord = Record(defaultRecord);

var ContentBlock = function (_ContentBlockRecord) {
  _inherits(ContentBlock, _ContentBlockRecord);

  function ContentBlock() {
    _classCallCheck(this, ContentBlock);

    return _possibleConstructorReturn(this, _ContentBlockRecord.apply(this, arguments));
  }

  ContentBlock.prototype.getKey = function getKey() {
    return this.get('key');
  };

  ContentBlock.prototype.getType = function getType() {
    return this.get('type');
  };

  ContentBlock.prototype.getText = function getText() {
    return this.get('text');
  };

  ContentBlock.prototype.getCharacterList = function getCharacterList() {
    return this.get('characterList');
  };

  ContentBlock.prototype.getLength = function getLength() {
    return this.getText().length;
  };

  ContentBlock.prototype.getDepth = function getDepth() {
    return this.get('depth');
  };

  ContentBlock.prototype.getData = function getData() {
    return this.get('data');
  };

  ContentBlock.prototype.getInlineStyleAt = function getInlineStyleAt(offset) {
    var character = this.getCharacterList().get(offset);
    return character ? character.getStyle() : EMPTY_SET;
  };

  ContentBlock.prototype.getEntityAt = function getEntityAt(offset) {
    var character = this.getCharacterList().get(offset);
    return character ? character.getEntity() : null;
  };

  /**
   * Execute a callback for every contiguous range of styles within the block.
   */


  ContentBlock.prototype.findStyleRanges = function findStyleRanges(filterFn, callback) {
    findRangesImmutable(this.getCharacterList(), haveEqualStyle, filterFn, callback);
  };

  /**
   * Execute a callback for every contiguous range of entities within the block.
   */


  ContentBlock.prototype.findEntityRanges = function findEntityRanges(filterFn, callback) {
    findRangesImmutable(this.getCharacterList(), haveEqualEntity, filterFn, callback);
  };

  return ContentBlock;
}(ContentBlockRecord);

function haveEqualStyle(charA, charB) {
  return charA.getStyle() === charB.getStyle();
}

function haveEqualEntity(charA, charB) {
  return charA.getEntity() === charB.getEntity();
}

module.exports = ContentBlock;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BlockMapBuilder
 * 
 */



var Immutable = __webpack_require__(2);

var OrderedMap = Immutable.OrderedMap;


var BlockMapBuilder = {
  createFromArray: function createFromArray(blocks) {
    return OrderedMap(blocks.map(function (block) {
      return [block.getKey(), block];
    }));
  }
};

module.exports = BlockMapBuilder;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SelectionState
 * @typechecks
 * 
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Immutable = __webpack_require__(2);

var Record = Immutable.Record;


var defaultRecord = {
  anchorKey: '',
  anchorOffset: 0,
  focusKey: '',
  focusOffset: 0,
  isBackward: false,
  hasFocus: false
};

var SelectionStateRecord = Record(defaultRecord);

var SelectionState = function (_SelectionStateRecord) {
  _inherits(SelectionState, _SelectionStateRecord);

  function SelectionState() {
    _classCallCheck(this, SelectionState);

    return _possibleConstructorReturn(this, _SelectionStateRecord.apply(this, arguments));
  }

  SelectionState.prototype.serialize = function serialize() {
    return 'Anchor: ' + this.getAnchorKey() + ':' + this.getAnchorOffset() + ', ' + 'Focus: ' + this.getFocusKey() + ':' + this.getFocusOffset() + ', ' + 'Is Backward: ' + String(this.getIsBackward()) + ', ' + 'Has Focus: ' + String(this.getHasFocus());
  };

  SelectionState.prototype.getAnchorKey = function getAnchorKey() {
    return this.get('anchorKey');
  };

  SelectionState.prototype.getAnchorOffset = function getAnchorOffset() {
    return this.get('anchorOffset');
  };

  SelectionState.prototype.getFocusKey = function getFocusKey() {
    return this.get('focusKey');
  };

  SelectionState.prototype.getFocusOffset = function getFocusOffset() {
    return this.get('focusOffset');
  };

  SelectionState.prototype.getIsBackward = function getIsBackward() {
    return this.get('isBackward');
  };

  SelectionState.prototype.getHasFocus = function getHasFocus() {
    return this.get('hasFocus');
  };

  /**
   * Return whether the specified range overlaps with an edge of the
   * SelectionState.
   */


  SelectionState.prototype.hasEdgeWithin = function hasEdgeWithin(blockKey, start, end) {
    var anchorKey = this.getAnchorKey();
    var focusKey = this.getFocusKey();

    if (anchorKey === focusKey && anchorKey === blockKey) {
      var selectionStart = this.getStartOffset();
      var selectionEnd = this.getEndOffset();
      return start <= selectionEnd && selectionStart <= end;
    }

    if (blockKey !== anchorKey && blockKey !== focusKey) {
      return false;
    }

    var offsetToCheck = blockKey === anchorKey ? this.getAnchorOffset() : this.getFocusOffset();

    return start <= offsetToCheck && end >= offsetToCheck;
  };

  SelectionState.prototype.isCollapsed = function isCollapsed() {
    return this.getAnchorKey() === this.getFocusKey() && this.getAnchorOffset() === this.getFocusOffset();
  };

  SelectionState.prototype.getStartKey = function getStartKey() {
    return this.getIsBackward() ? this.getFocusKey() : this.getAnchorKey();
  };

  SelectionState.prototype.getStartOffset = function getStartOffset() {
    return this.getIsBackward() ? this.getFocusOffset() : this.getAnchorOffset();
  };

  SelectionState.prototype.getEndKey = function getEndKey() {
    return this.getIsBackward() ? this.getAnchorKey() : this.getFocusKey();
  };

  SelectionState.prototype.getEndOffset = function getEndOffset() {
    return this.getIsBackward() ? this.getAnchorOffset() : this.getFocusOffset();
  };

  SelectionState.createEmpty = function createEmpty(key) {
    return new SelectionState({
      anchorKey: key,
      anchorOffset: 0,
      focusKey: key,
      focusOffset: 0,
      isBackward: false,
      hasFocus: false
    });
  };

  return SelectionState;
}(SelectionStateRecord);

module.exports = SelectionState;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule removeTextWithStrategy
 * 
 */



var DraftModifier = __webpack_require__(6);

/**
 * For a collapsed selection state, remove text based on the specified strategy.
 * If the selection state is not collapsed, remove the entire selected range.
 */
function removeTextWithStrategy(editorState, strategy, direction) {
  var selection = editorState.getSelection();
  var content = editorState.getCurrentContent();
  var target = selection;
  if (selection.isCollapsed()) {
    if (direction === 'forward') {
      if (editorState.isSelectionAtEndOfContent()) {
        return content;
      }
    } else if (editorState.isSelectionAtStartOfContent()) {
      return content;
    }

    target = strategy(editorState);
    if (target === selection) {
      return content;
    }
  }
  return DraftModifier.removeRange(content, target, direction);
}

module.exports = removeTextWithStrategy;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(236);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

module.exports = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46,
  COMMA: 188,
  PERIOD: 190,
  A: 65,
  Z: 90,
  ZERO: 48,
  NUMPAD_0: 96,
  NUMPAD_9: 105
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var getStyleProperty = __webpack_require__(233);

/**
 * @param {DOMNode} element [description]
 * @param {string} name Overflow style property name.
 * @return {boolean} True if the supplied ndoe is scrollable.
 */
function _isNodeScrollable(element, name) {
  var overflow = Style.get(element, name);
  return overflow === 'auto' || overflow === 'scroll';
}

/**
 * Utilities for querying and mutating style properties.
 */
var Style = {
  /**
   * Gets the style property for the supplied node. This will return either the
   * computed style, if available, or the declared style.
   *
   * @param {DOMNode} node
   * @param {string} name Style property name.
   * @return {?string} Style property value.
   */
  get: getStyleProperty,

  /**
   * Determines the nearest ancestor of a node that is scrollable.
   *
   * NOTE: This can be expensive if used repeatedly or on a node nested deeply.
   *
   * @param {?DOMNode} node Node from which to start searching.
   * @return {?DOMWindow|DOMElement} Scroll parent of the supplied node.
   */
  getScrollParent: function getScrollParent(node) {
    if (!node) {
      return null;
    }
    var ownerDocument = node.ownerDocument;
    while (node && node !== ownerDocument.body) {
      if (_isNodeScrollable(node, 'overflow') || _isNodeScrollable(node, 'overflowY') || _isNodeScrollable(node, 'overflowX')) {
        return node;
      }
      node = node.parentNode;
    }
    return ownerDocument.defaultView || ownerDocument.parentWindow;
  }

};

module.exports = Style;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var getDocumentScrollElement = __webpack_require__(231);
var getUnboundedScrollPosition = __webpack_require__(234);

/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are bounded. This means that if the scroll position is
 * negative or exceeds the element boundaries (which is possible using inertial
 * scrolling), you will get zero or the maximum scroll position, respectively.
 *
 * If you need the unbound scroll position, use `getUnboundedScrollPosition`.
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */
function getScrollPosition(scrollable) {
  var documentScrollElement = getDocumentScrollElement(scrollable.ownerDocument || scrollable.document);
  if (scrollable.Window && scrollable instanceof scrollable.Window) {
    scrollable = documentScrollElement;
  }
  var scrollPosition = getUnboundedScrollPosition(scrollable);

  var viewport = scrollable === documentScrollElement ? scrollable.ownerDocument.documentElement : scrollable;

  var xMax = scrollable.scrollWidth - viewport.clientWidth;
  var yMax = scrollable.scrollHeight - viewport.clientHeight;

  scrollPosition.x = Math.max(0, Math.min(scrollPosition.x, xMax));
  scrollPosition.y = Math.max(0, Math.min(scrollPosition.y, yMax));

  return scrollPosition;
}

module.exports = getScrollPosition;

/***/ }),
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(10);

var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEntity
 * @typechecks
 * 
 */

var DraftEntityInstance = __webpack_require__(80);
var Immutable = __webpack_require__(2);

var invariant = __webpack_require__(0);

var Map = Immutable.Map;


var instances = Map();
var instanceKey = 0;

/**
 * Temporary utility for generating the warnings
 */
function logWarning(oldMethodCall, newMethodCall) {
  console.warn('WARNING: ' + oldMethodCall + ' will be deprecated soon!\nPlease use "' + newMethodCall + '" instead.');
}

/**
 * A "document entity" is an object containing metadata associated with a
 * piece of text in a ContentBlock.
 *
 * For example, a `link` entity might include a `uri` property. When a
 * ContentBlock is rendered in the browser, text that refers to that link
 * entity may be rendered as an anchor, with the `uri` as the href value.
 *
 * In a ContentBlock, every position in the text may correspond to zero
 * or one entities. This correspondence is tracked using a key string,
 * generated via DraftEntity.create() and used to obtain entity metadata
 * via DraftEntity.get().
 */
var DraftEntity = {
  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.getLastCreatedEntityKey' instead.
   * ---
   * Get the random key string from whatever entity was last created.
   * We need this to support the new API, as part of transitioning to put Entity
   * storage in contentState.
   */
  getLastCreatedEntityKey: function getLastCreatedEntityKey() {
    logWarning('DraftEntity.getLastCreatedEntityKey', 'contentState.getLastCreatedEntityKey');
    return DraftEntity.__getLastCreatedEntityKey();
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.createEntity' instead.
   * ---
   * Create a DraftEntityInstance and store it for later retrieval.
   *
   * A random key string will be generated and returned. This key may
   * be used to track the entity's usage in a ContentBlock, and for
   * retrieving data about the entity at render time.
   */
  create: function create(type, mutability, data) {
    logWarning('DraftEntity.create', 'contentState.createEntity');
    return DraftEntity.__create(type, mutability, data);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.addEntity' instead.
   * ---
   * Add an existing DraftEntityInstance to the DraftEntity map. This is
   * useful when restoring instances from the server.
   */
  add: function add(instance) {
    logWarning('DraftEntity.add', 'contentState.addEntity');
    return DraftEntity.__add(instance);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.getEntity' instead.
   * ---
   * Retrieve the entity corresponding to the supplied key string.
   */
  get: function get(key) {
    logWarning('DraftEntity.get', 'contentState.getEntity');
    return DraftEntity.__get(key);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.mergeEntityData' instead.
   * ---
   * Entity instances are immutable. If you need to update the data for an
   * instance, this method will merge your data updates and return a new
   * instance.
   */
  mergeData: function mergeData(key, toMerge) {
    logWarning('DraftEntity.mergeData', 'contentState.mergeEntityData');
    return DraftEntity.__mergeData(key, toMerge);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.replaceEntityData' instead.
   * ---
   * Completely replace the data for a given instance.
   */
  replaceData: function replaceData(key, newData) {
    logWarning('DraftEntity.replaceData', 'contentState.replaceEntityData');
    return DraftEntity.__replaceData(key, newData);
  },

  // ***********************************WARNING******************************
  // --- the above public API will be deprecated in the next version of Draft!
  // The methods below this line are private - don't call them directly.

  /**
   * Get the random key string from whatever entity was last created.
   * We need this to support the new API, as part of transitioning to put Entity
   * storage in contentState.
   */
  __getLastCreatedEntityKey: function __getLastCreatedEntityKey() {
    return '' + instanceKey;
  },

  /**
   * Create a DraftEntityInstance and store it for later retrieval.
   *
   * A random key string will be generated and returned. This key may
   * be used to track the entity's usage in a ContentBlock, and for
   * retrieving data about the entity at render time.
   */
  __create: function __create(type, mutability, data) {
    return DraftEntity.__add(new DraftEntityInstance({ type: type, mutability: mutability, data: data || {} }));
  },

  /**
   * Add an existing DraftEntityInstance to the DraftEntity map. This is
   * useful when restoring instances from the server.
   */
  __add: function __add(instance) {
    var key = '' + ++instanceKey;
    instances = instances.set(key, instance);
    return key;
  },

  /**
   * Retrieve the entity corresponding to the supplied key string.
   */
  __get: function __get(key) {
    var instance = instances.get(key);
    !!!instance ?  false ? invariant(false, 'Unknown DraftEntity key: %s.', key) : invariant(false) : void 0;
    return instance;
  },

  /**
   * Entity instances are immutable. If you need to update the data for an
   * instance, this method will merge your data updates and return a new
   * instance.
   */
  __mergeData: function __mergeData(key, toMerge) {
    var instance = DraftEntity.__get(key);
    var newData = _extends({}, instance.getData(), toMerge);
    var newInstance = instance.set('data', newData);
    instances = instances.set(key, newInstance);
    return newInstance;
  },

  /**
   * Completely replace the data for a given instance.
   */
  __replaceData: function __replaceData(key, newData) {
    var instance = DraftEntity.__get(key);
    var newInstance = instance.set('data', newData);
    instances = instances.set(key, newInstance);
    return newInstance;
  }
};

module.exports = DraftEntity;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftOffsetKey
 * 
 */



var KEY_DELIMITER = '-';

var DraftOffsetKey = {
  encode: function encode(blockKey, decoratorKey, leafKey) {
    return blockKey + KEY_DELIMITER + decoratorKey + KEY_DELIMITER + leafKey;
  },

  decode: function decode(offsetKey) {
    var _offsetKey$split = offsetKey.split(KEY_DELIMITER),
        blockKey = _offsetKey$split[0],
        decoratorKey = _offsetKey$split[1],
        leafKey = _offsetKey$split[2];

    return {
      blockKey: blockKey,
      decoratorKey: parseInt(decoratorKey, 10),
      leafKey: parseInt(leafKey, 10)
    };
  }
};

module.exports = DraftOffsetKey;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule findRangesImmutable
 * 
 */



/**
 * Search through an array to find contiguous stretches of elements that
 * match a specified filter function.
 *
 * When ranges are found, execute a specified `found` function to supply
 * the values to the caller.
 */
function findRangesImmutable(haystack, areEqualFn, filterFn, foundFn) {
  if (!haystack.size) {
    return;
  }

  var cursor = 0;

  haystack.reduce(function (value, nextValue, nextIndex) {
    if (!areEqualFn(value, nextValue)) {
      if (filterFn(value)) {
        foundFn(cursor, nextIndex);
      }
      cursor = nextIndex;
    }
    return nextValue;
  });

  filterFn(haystack.last()) && foundFn(cursor, haystack.count());
}

module.exports = findRangesImmutable;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getContentStateFragment
 * @typechecks
 * 
 */



var generateRandomKey = __webpack_require__(15);
var removeEntitiesAtEdges = __webpack_require__(97);

function getContentStateFragment(contentState, selectionState) {
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  // Edge entities should be stripped to ensure that we don't preserve
  // invalid partial entities when the fragment is reused. We do, however,
  // preserve entities that are entirely within the selection range.
  var contentWithoutEdgeEntities = removeEntitiesAtEdges(contentState, selectionState);

  var blockMap = contentWithoutEdgeEntities.getBlockMap();
  var blockKeys = blockMap.keySeq();
  var startIndex = blockKeys.indexOf(startKey);
  var endIndex = blockKeys.indexOf(endKey) + 1;

  var slice = blockMap.slice(startIndex, endIndex).map(function (block, blockKey) {
    var newKey = generateRandomKey();

    var text = block.getText();
    var chars = block.getCharacterList();

    if (startKey === endKey) {
      return block.merge({
        key: newKey,
        text: text.slice(startOffset, endOffset),
        characterList: chars.slice(startOffset, endOffset)
      });
    }

    if (blockKey === startKey) {
      return block.merge({
        key: newKey,
        text: text.slice(startOffset),
        characterList: chars.slice(startOffset)
      });
    }

    if (blockKey === endKey) {
      return block.merge({
        key: newKey,
        text: text.slice(0, endOffset),
        characterList: chars.slice(0, endOffset)
      });
    }

    return block.set('key', newKey);
  });

  return slice.toOrderedMap();
}

module.exports = getContentStateFragment;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isEventHandled
 * @typechecks
 * 
 */



/**
 * Utility method for determining whether or not the value returned
 * from a handler indicates that it was handled.
 */
function isEventHandled(value) {
  return value === 'handled' || value === true;
}

module.exports = isEventHandled;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/**
 * Constants to represent text directionality
 *
 * Also defines a *global* direciton, to be used in bidi algorithms as a
 * default fallback direciton, when no better direction is found or provided.
 *
 * NOTE: Use `setGlobalDir()`, or update `initGlobalDir()`, to set the initial
 *       global direction value based on the application.
 *
 * Part of the implementation of Unicode Bidirectional Algorithm (UBA)
 * Unicode Standard Annex #9 (UAX9)
 * http://www.unicode.org/reports/tr9/
 */



var invariant = __webpack_require__(0);

var NEUTRAL = 'NEUTRAL'; // No strong direction
var LTR = 'LTR'; // Left-to-Right direction
var RTL = 'RTL'; // Right-to-Left direction

var globalDir = null;

// == Helpers ==

/**
 * Check if a directionality value is a Strong one
 */
function isStrong(dir) {
  return dir === LTR || dir === RTL;
}

/**
 * Get string value to be used for `dir` HTML attribute or `direction` CSS
 * property.
 */
function getHTMLDir(dir) {
  !isStrong(dir) ?  false ? invariant(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
  return dir === LTR ? 'ltr' : 'rtl';
}

/**
 * Get string value to be used for `dir` HTML attribute or `direction` CSS
 * property, but returns null if `dir` has same value as `otherDir`.
 * `null`.
 */
function getHTMLDirIfDifferent(dir, otherDir) {
  !isStrong(dir) ?  false ? invariant(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
  !isStrong(otherDir) ?  false ? invariant(false, '`otherDir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
  return dir === otherDir ? null : getHTMLDir(dir);
}

// == Global Direction ==

/**
 * Set the global direction.
 */
function setGlobalDir(dir) {
  globalDir = dir;
}

/**
 * Initialize the global direction
 */
function initGlobalDir() {
  setGlobalDir(LTR);
}

/**
 * Get the global direction
 */
function getGlobalDir() {
  if (!globalDir) {
    this.initGlobalDir();
  }
  !globalDir ?  false ? invariant(false, 'Global direction not set.') : invariant(false) : void 0;
  return globalDir;
}

var UnicodeBidiDirection = {
  // Values
  NEUTRAL: NEUTRAL,
  LTR: LTR,
  RTL: RTL,
  // Helpers
  isStrong: isStrong,
  getHTMLDir: getHTMLDir,
  getHTMLDirIfDifferent: getHTMLDirIfDifferent,
  // Global Direction
  setGlobalDir: setGlobalDir,
  initGlobalDir: initGlobalDir,
  getGlobalDir: getGlobalDir
};

module.exports = UnicodeBidiDirection;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(12);
var normalizeHeaderName = __webpack_require__(134);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(66);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(66);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ContentState
 * @typechecks
 * 
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockMapBuilder = __webpack_require__(25);
var CharacterMetadata = __webpack_require__(13);
var ContentBlock = __webpack_require__(18);
var DraftEntity = __webpack_require__(34);
var Immutable = __webpack_require__(2);
var SelectionState = __webpack_require__(26);

var generateRandomKey = __webpack_require__(15);
var sanitizeDraftText = __webpack_require__(54);

var List = Immutable.List,
    Record = Immutable.Record,
    Repeat = Immutable.Repeat;


var defaultRecord = {
  entityMap: null,
  blockMap: null,
  selectionBefore: null,
  selectionAfter: null
};

var ContentStateRecord = Record(defaultRecord);

var ContentState = function (_ContentStateRecord) {
  _inherits(ContentState, _ContentStateRecord);

  function ContentState() {
    _classCallCheck(this, ContentState);

    return _possibleConstructorReturn(this, _ContentStateRecord.apply(this, arguments));
  }

  ContentState.prototype.getEntityMap = function getEntityMap() {
    // TODO: update this when we fully remove DraftEntity
    return DraftEntity;
  };

  ContentState.prototype.getBlockMap = function getBlockMap() {
    return this.get('blockMap');
  };

  ContentState.prototype.getSelectionBefore = function getSelectionBefore() {
    return this.get('selectionBefore');
  };

  ContentState.prototype.getSelectionAfter = function getSelectionAfter() {
    return this.get('selectionAfter');
  };

  ContentState.prototype.getBlockForKey = function getBlockForKey(key) {
    var block = this.getBlockMap().get(key);
    return block;
  };

  ContentState.prototype.getKeyBefore = function getKeyBefore(key) {
    return this.getBlockMap().reverse().keySeq().skipUntil(function (v) {
      return v === key;
    }).skip(1).first();
  };

  ContentState.prototype.getKeyAfter = function getKeyAfter(key) {
    return this.getBlockMap().keySeq().skipUntil(function (v) {
      return v === key;
    }).skip(1).first();
  };

  ContentState.prototype.getBlockAfter = function getBlockAfter(key) {
    return this.getBlockMap().skipUntil(function (_, k) {
      return k === key;
    }).skip(1).first();
  };

  ContentState.prototype.getBlockBefore = function getBlockBefore(key) {
    return this.getBlockMap().reverse().skipUntil(function (_, k) {
      return k === key;
    }).skip(1).first();
  };

  ContentState.prototype.getBlocksAsArray = function getBlocksAsArray() {
    return this.getBlockMap().toArray();
  };

  ContentState.prototype.getFirstBlock = function getFirstBlock() {
    return this.getBlockMap().first();
  };

  ContentState.prototype.getLastBlock = function getLastBlock() {
    return this.getBlockMap().last();
  };

  ContentState.prototype.getPlainText = function getPlainText(delimiter) {
    return this.getBlockMap().map(function (block) {
      return block ? block.getText() : '';
    }).join(delimiter || '\n');
  };

  ContentState.prototype.getLastCreatedEntityKey = function getLastCreatedEntityKey() {
    // TODO: update this when we fully remove DraftEntity
    return DraftEntity.__getLastCreatedEntityKey();
  };

  ContentState.prototype.hasText = function hasText() {
    var blockMap = this.getBlockMap();
    return blockMap.size > 1 || blockMap.first().getLength() > 0;
  };

  ContentState.prototype.createEntity = function createEntity(type, mutability, data) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity.__create(type, mutability, data);
    return this;
  };

  ContentState.prototype.mergeEntityData = function mergeEntityData(key, toMerge) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity.__mergeData(key, toMerge);
    return this;
  };

  ContentState.prototype.replaceEntityData = function replaceEntityData(key, newData) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity.__replaceData(key, newData);
    return this;
  };

  ContentState.prototype.addEntity = function addEntity(instance) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity.__add(instance);
    return this;
  };

  ContentState.prototype.getEntity = function getEntity(key) {
    // TODO: update this when we fully remove DraftEntity
    return DraftEntity.__get(key);
  };

  ContentState.createFromBlockArray = function createFromBlockArray(
  // TODO: update flow type when we completely deprecate the old entity API
  blocks, entityMap) {
    // TODO: remove this when we completely deprecate the old entity API
    var theBlocks = Array.isArray(blocks) ? blocks : blocks.contentBlocks;
    var blockMap = BlockMapBuilder.createFromArray(theBlocks);
    var selectionState = blockMap.isEmpty() ? new SelectionState() : SelectionState.createEmpty(blockMap.first().getKey());
    return new ContentState({
      blockMap: blockMap,
      entityMap: entityMap || DraftEntity,
      selectionBefore: selectionState,
      selectionAfter: selectionState
    });
  };

  ContentState.createFromText = function createFromText(text) {
    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /\r\n?|\n/g;

    var strings = text.split(delimiter);
    var blocks = strings.map(function (block) {
      block = sanitizeDraftText(block);
      return new ContentBlock({
        key: generateRandomKey(),
        text: block,
        type: 'unstyled',
        characterList: List(Repeat(CharacterMetadata.EMPTY, block.length))
      });
    });
    return ContentState.createFromBlockArray(blocks);
  };

  return ContentState;
}(ContentStateRecord);

module.exports = ContentState;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DefaultDraftBlockRenderMap
 * 
 */



var _require = __webpack_require__(2),
    Map = _require.Map;

var React = __webpack_require__(3);

var cx = __webpack_require__(17);

var UL_WRAP = React.createElement('ul', { className: cx('public/DraftStyleDefault/ul') });
var OL_WRAP = React.createElement('ol', { className: cx('public/DraftStyleDefault/ol') });
var PRE_WRAP = React.createElement('pre', { className: cx('public/DraftStyleDefault/pre') });

var DefaultDraftBlockRenderMap = Map({
  'header-one': {
    element: 'h1'
  },
  'header-two': {
    element: 'h2'
  },
  'header-three': {
    element: 'h3'
  },
  'header-four': {
    element: 'h4'
  },
  'header-five': {
    element: 'h5'
  },
  'header-six': {
    element: 'h6'
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: UL_WRAP
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: OL_WRAP
  },
  'blockquote': {
    element: 'blockquote'
  },
  'atomic': {
    element: 'figure'
  },
  'code-block': {
    element: 'pre',
    wrapper: PRE_WRAP
  },
  'unstyled': {
    element: 'div',
    aliasedElements: ['p']
  }
});

module.exports = DefaultDraftBlockRenderMap;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule KeyBindingUtil
 * @typechecks
 * 
 */



var UserAgent = __webpack_require__(5);

var isOSX = UserAgent.isPlatform('Mac OS X');

var KeyBindingUtil = {
  /**
   * Check whether the ctrlKey modifier is *not* being used in conjunction with
   * the altKey modifier. If they are combined, the result is an `altGraph`
   * key modifier, which should not be handled by this set of key bindings.
   */
  isCtrlKeyCommand: function isCtrlKeyCommand(e) {
    return !!e.ctrlKey && !e.altKey;
  },

  isOptionKeyCommand: function isOptionKeyCommand(e) {
    return isOSX && e.altKey;
  },

  hasCommandModifier: function hasCommandModifier(e) {
    return isOSX ? !!e.metaKey && !e.altKey : KeyBindingUtil.isCtrlKeyCommand(e);
  }
};

module.exports = KeyBindingUtil;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule findAncestorOffsetKey
 * @typechecks
 * 
 */



var getSelectionOffsetKeyForNode = __webpack_require__(91);

/**
 * Get the key from the node's nearest offset-aware ancestor.
 */
function findAncestorOffsetKey(node) {
  var searchNode = node;
  while (searchNode && searchNode !== document.documentElement) {
    var key = getSelectionOffsetKeyForNode(searchNode);
    if (key != null) {
      return key;
    }
    searchNode = searchNode.parentNode;
  }
  return null;
}

module.exports = findAncestorOffsetKey;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEntityKeyForSelection
 * @typechecks
 * 
 */



/**
 * Return the entity key that should be used when inserting text for the
 * specified target selection, only if the entity is `MUTABLE`. `IMMUTABLE`
 * and `SEGMENTED` entities should not be used for insertion behavior.
 */
function getEntityKeyForSelection(contentState, targetSelection) {
  var entityKey;

  if (targetSelection.isCollapsed()) {
    var key = targetSelection.getAnchorKey();
    var offset = targetSelection.getAnchorOffset();
    if (offset > 0) {
      entityKey = contentState.getBlockForKey(key).getEntityAt(offset - 1);
      return filterKey(contentState.getEntityMap(), entityKey);
    }
    return null;
  }

  var startKey = targetSelection.getStartKey();
  var startOffset = targetSelection.getStartOffset();
  var startBlock = contentState.getBlockForKey(startKey);

  entityKey = startOffset === startBlock.getLength() ? null : startBlock.getEntityAt(startOffset);

  return filterKey(contentState.getEntityMap(), entityKey);
}

/**
 * Determine whether an entity key corresponds to a `MUTABLE` entity. If so,
 * return it. If not, return null.
 */
function filterKey(entityMap, entityKey) {
  if (entityKey) {
    var entity = entityMap.__get(entityKey);
    return entity.getMutability() === 'MUTABLE' ? entityKey : null;
  }
  return null;
}

module.exports = getEntityKeyForSelection;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule moveSelectionBackward
 * 
 */



/**
 * Given a collapsed selection, move the focus `maxDistance` backward within
 * the selected block. If the selection will go beyond the start of the block,
 * move focus to the end of the previous block, but no further.
 *
 * This function is not Unicode-aware, so surrogate pairs will be treated
 * as having length 2.
 */
function moveSelectionBackward(editorState, maxDistance) {
  var selection = editorState.getSelection();
  var content = editorState.getCurrentContent();
  var key = selection.getStartKey();
  var offset = selection.getStartOffset();

  var focusKey = key;
  var focusOffset = 0;

  if (maxDistance > offset) {
    var keyBefore = content.getKeyBefore(key);
    if (keyBefore == null) {
      focusKey = key;
    } else {
      focusKey = keyBefore;
      var blockBefore = content.getBlockForKey(keyBefore);
      focusOffset = blockBefore.getText().length;
    }
  } else {
    focusOffset = offset - maxDistance;
  }

  return selection.merge({
    focusKey: focusKey,
    focusOffset: focusOffset,
    isBackward: true
  });
}

module.exports = moveSelectionBackward;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule sanitizeDraftText
 * 
 */



var REGEX_BLOCK_DELIMITER = new RegExp('\r', 'g');

function sanitizeDraftText(input) {
  return input.replace(REGEX_BLOCK_DELIMITER, '');
}

module.exports = sanitizeDraftText;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var PhotosMimeType = __webpack_require__(225);

var createArrayFromMixed = __webpack_require__(229);
var emptyFunction = __webpack_require__(19);

var CR_LF_REGEX = new RegExp('\r\n', 'g');
var LF_ONLY = '\n';

var RICH_TEXT_TYPES = {
  'text/rtf': 1,
  'text/html': 1
};

/**
 * If DataTransferItem is a file then return the Blob of data.
 *
 * @param {object} item
 * @return {?blob}
 */
function getFileFromDataTransfer(item) {
  if (item.kind == 'file') {
    return item.getAsFile();
  }
}

var DataTransfer = function () {
  /**
   * @param {object} data
   */
  function DataTransfer(data) {
    _classCallCheck(this, DataTransfer);

    this.data = data;

    // Types could be DOMStringList or array
    this.types = data.types ? createArrayFromMixed(data.types) : [];
  }

  /**
   * Is this likely to be a rich text data transfer?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.isRichText = function isRichText() {
    // If HTML is available, treat this data as rich text. This way, we avoid
    // using a pasted image if it is packaged with HTML -- this may occur with
    // pastes from MS Word, for example.  However this is only rich text if
    // there's accompanying text.
    if (this.getHTML() && this.getText()) {
      return true;
    }

    // When an image is copied from a preview window, you end up with two
    // DataTransferItems one of which is a file's metadata as text.  Skip those.
    if (this.isImage()) {
      return false;
    }

    return this.types.some(function (type) {
      return RICH_TEXT_TYPES[type];
    });
  };

  /**
   * Get raw text.
   *
   * @return {?string}
   */


  DataTransfer.prototype.getText = function getText() {
    var text;
    if (this.data.getData) {
      if (!this.types.length) {
        text = this.data.getData('Text');
      } else if (this.types.indexOf('text/plain') != -1) {
        text = this.data.getData('text/plain');
      }
    }
    return text ? text.replace(CR_LF_REGEX, LF_ONLY) : null;
  };

  /**
   * Get HTML paste data
   *
   * @return {?string}
   */


  DataTransfer.prototype.getHTML = function getHTML() {
    if (this.data.getData) {
      if (!this.types.length) {
        return this.data.getData('Text');
      } else if (this.types.indexOf('text/html') != -1) {
        return this.data.getData('text/html');
      }
    }
  };

  /**
   * Is this a link data transfer?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.isLink = function isLink() {
    return this.types.some(function (type) {
      return type.indexOf('Url') != -1 || type.indexOf('text/uri-list') != -1 || type.indexOf('text/x-moz-url');
    });
  };

  /**
   * Get a link url.
   *
   * @return {?string}
   */


  DataTransfer.prototype.getLink = function getLink() {
    if (this.data.getData) {
      if (this.types.indexOf('text/x-moz-url') != -1) {
        var url = this.data.getData('text/x-moz-url').split('\n');
        return url[0];
      }
      return this.types.indexOf('text/uri-list') != -1 ? this.data.getData('text/uri-list') : this.data.getData('url');
    }

    return null;
  };

  /**
   * Is this an image data transfer?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.isImage = function isImage() {
    var isImage = this.types.some(function (type) {
      // Firefox will have a type of application/x-moz-file for images during
      // dragging
      return type.indexOf('application/x-moz-file') != -1;
    });

    if (isImage) {
      return true;
    }

    var items = this.getFiles();
    for (var i = 0; i < items.length; i++) {
      var type = items[i].type;
      if (!PhotosMimeType.isImage(type)) {
        return false;
      }
    }

    return true;
  };

  DataTransfer.prototype.getCount = function getCount() {
    if (this.data.hasOwnProperty('items')) {
      return this.data.items.length;
    } else if (this.data.hasOwnProperty('mozItemCount')) {
      return this.data.mozItemCount;
    } else if (this.data.files) {
      return this.data.files.length;
    }
    return null;
  };

  /**
   * Get files.
   *
   * @return {array}
   */


  DataTransfer.prototype.getFiles = function getFiles() {
    if (this.data.items) {
      // createArrayFromMixed doesn't properly handle DataTransferItemLists.
      return Array.prototype.slice.call(this.data.items).map(getFileFromDataTransfer).filter(emptyFunction.thatReturnsArgument);
    } else if (this.data.files) {
      return Array.prototype.slice.call(this.data.files);
    } else {
      return [];
    }
  };

  /**
   * Are there any files to fetch?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.hasFiles = function hasFiles() {
    return this.getFiles().length > 0;
  };

  return DataTransfer;
}();

module.exports = DataTransfer;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * @param {DOMElement} element
 * @param {DOMDocument} doc
 * @return {boolean}
 */
function _isViewportScrollElement(element, doc) {
  return !!doc && (element === doc.documentElement || element === doc.body);
}

/**
 * Scroll Module. This class contains 4 simple static functions
 * to be used to access Element.scrollTop/scrollLeft properties.
 * To solve the inconsistencies between browsers when either
 * document.body or document.documentElement is supplied,
 * below logic will be used to alleviate the issue:
 *
 * 1. If 'element' is either 'document.body' or 'document.documentElement,
 *    get whichever element's 'scroll{Top,Left}' is larger.
 * 2. If 'element' is either 'document.body' or 'document.documentElement',
 *    set the 'scroll{Top,Left}' on both elements.
 */

var Scroll = {
  /**
   * @param {DOMElement} element
   * @return {number}
   */
  getTop: function getTop(element) {
    var doc = element.ownerDocument;
    return _isViewportScrollElement(element, doc) ?
    // In practice, they will either both have the same value,
    // or one will be zero and the other will be the scroll position
    // of the viewport. So we can use `X || Y` instead of `Math.max(X, Y)`
    doc.body.scrollTop || doc.documentElement.scrollTop : element.scrollTop;
  },

  /**
   * @param {DOMElement} element
   * @param {number} newTop
   */
  setTop: function setTop(element, newTop) {
    var doc = element.ownerDocument;
    if (_isViewportScrollElement(element, doc)) {
      doc.body.scrollTop = doc.documentElement.scrollTop = newTop;
    } else {
      element.scrollTop = newTop;
    }
  },

  /**
   * @param {DOMElement} element
   * @return {number}
   */
  getLeft: function getLeft(element) {
    var doc = element.ownerDocument;
    return _isViewportScrollElement(element, doc) ? doc.body.scrollLeft || doc.documentElement.scrollLeft : element.scrollLeft;
  },

  /**
   * @param {DOMElement} element
   * @param {number} newLeft
   */
  setLeft: function setLeft(element, newLeft) {
    var doc = element.ownerDocument;
    if (_isViewportScrollElement(element, doc)) {
      doc.body.scrollLeft = doc.documentElement.scrollLeft = newLeft;
    } else {
      element.scrollLeft = newLeft;
    }
  }
};

module.exports = Scroll;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(120);

/***/ }),
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/**
 * Basic (stateless) API for text direction detection
 *
 * Part of our implementation of Unicode Bidirectional Algorithm (UBA)
 * Unicode Standard Annex #9 (UAX9)
 * http://www.unicode.org/reports/tr9/
 */



var UnicodeBidiDirection = __webpack_require__(42);

var invariant = __webpack_require__(0);

/**
 * RegExp ranges of characters with a *Strong* Bidi_Class value.
 *
 * Data is based on DerivedBidiClass.txt in UCD version 7.0.0.
 *
 * NOTE: For performance reasons, we only support Unicode's
 *       Basic Multilingual Plane (BMP) for now.
 */
var RANGE_BY_BIDI_TYPE = {

  L: 'A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u01BA\u01BB' + '\u01BC-\u01BF\u01C0-\u01C3\u01C4-\u0293\u0294\u0295-\u02AF\u02B0-\u02B8' + '\u02BB-\u02C1\u02D0-\u02D1\u02E0-\u02E4\u02EE\u0370-\u0373\u0376-\u0377' + '\u037A\u037B-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1' + '\u03A3-\u03F5\u03F7-\u0481\u0482\u048A-\u052F\u0531-\u0556\u0559' + '\u055A-\u055F\u0561-\u0587\u0589\u0903\u0904-\u0939\u093B\u093D' + '\u093E-\u0940\u0949-\u094C\u094E-\u094F\u0950\u0958-\u0961\u0964-\u0965' + '\u0966-\u096F\u0970\u0971\u0972-\u0980\u0982-\u0983\u0985-\u098C' + '\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD' + '\u09BE-\u09C0\u09C7-\u09C8\u09CB-\u09CC\u09CE\u09D7\u09DC-\u09DD' + '\u09DF-\u09E1\u09E6-\u09EF\u09F0-\u09F1\u09F4-\u09F9\u09FA\u0A03' + '\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33' + '\u0A35-\u0A36\u0A38-\u0A39\u0A3E-\u0A40\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F' + '\u0A72-\u0A74\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0' + '\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0ABE-\u0AC0\u0AC9\u0ACB-\u0ACC\u0AD0' + '\u0AE0-\u0AE1\u0AE6-\u0AEF\u0AF0\u0B02-\u0B03\u0B05-\u0B0C\u0B0F-\u0B10' + '\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B3E\u0B40' + '\u0B47-\u0B48\u0B4B-\u0B4C\u0B57\u0B5C-\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F' + '\u0B70\u0B71\u0B72-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95' + '\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9' + '\u0BBE-\u0BBF\u0BC1-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7' + '\u0BE6-\u0BEF\u0BF0-\u0BF2\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10' + '\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C41-\u0C44\u0C58-\u0C59\u0C60-\u0C61' + '\u0C66-\u0C6F\u0C7F\u0C82-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8' + '\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CBE\u0CBF\u0CC0-\u0CC4\u0CC6' + '\u0CC7-\u0CC8\u0CCA-\u0CCB\u0CD5-\u0CD6\u0CDE\u0CE0-\u0CE1\u0CE6-\u0CEF' + '\u0CF1-\u0CF2\u0D02-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D' + '\u0D3E-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D57\u0D60-\u0D61' + '\u0D66-\u0D6F\u0D70-\u0D75\u0D79\u0D7A-\u0D7F\u0D82-\u0D83\u0D85-\u0D96' + '\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD1\u0DD8-\u0DDF' + '\u0DE6-\u0DEF\u0DF2-\u0DF3\u0DF4\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E45' + '\u0E46\u0E4F\u0E50-\u0E59\u0E5A-\u0E5B\u0E81-\u0E82\u0E84\u0E87-\u0E88' + '\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7' + '\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6' + '\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F01-\u0F03\u0F04-\u0F12\u0F13\u0F14' + '\u0F15-\u0F17\u0F1A-\u0F1F\u0F20-\u0F29\u0F2A-\u0F33\u0F34\u0F36\u0F38' + '\u0F3E-\u0F3F\u0F40-\u0F47\u0F49-\u0F6C\u0F7F\u0F85\u0F88-\u0F8C' + '\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FCF\u0FD0-\u0FD4\u0FD5-\u0FD8' + '\u0FD9-\u0FDA\u1000-\u102A\u102B-\u102C\u1031\u1038\u103B-\u103C\u103F' + '\u1040-\u1049\u104A-\u104F\u1050-\u1055\u1056-\u1057\u105A-\u105D\u1061' + '\u1062-\u1064\u1065-\u1066\u1067-\u106D\u106E-\u1070\u1075-\u1081' + '\u1083-\u1084\u1087-\u108C\u108E\u108F\u1090-\u1099\u109A-\u109C' + '\u109E-\u109F\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FB\u10FC' + '\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288' + '\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5' + '\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1360-\u1368' + '\u1369-\u137C\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166D-\u166E' + '\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EB-\u16ED\u16EE-\u16F0' + '\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1735-\u1736' + '\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17B6\u17BE-\u17C5' + '\u17C7-\u17C8\u17D4-\u17D6\u17D7\u17D8-\u17DA\u17DC\u17E0-\u17E9' + '\u1810-\u1819\u1820-\u1842\u1843\u1844-\u1877\u1880-\u18A8\u18AA' + '\u18B0-\u18F5\u1900-\u191E\u1923-\u1926\u1929-\u192B\u1930-\u1931' + '\u1933-\u1938\u1946-\u194F\u1950-\u196D\u1970-\u1974\u1980-\u19AB' + '\u19B0-\u19C0\u19C1-\u19C7\u19C8-\u19C9\u19D0-\u19D9\u19DA\u1A00-\u1A16' + '\u1A19-\u1A1A\u1A1E-\u1A1F\u1A20-\u1A54\u1A55\u1A57\u1A61\u1A63-\u1A64' + '\u1A6D-\u1A72\u1A80-\u1A89\u1A90-\u1A99\u1AA0-\u1AA6\u1AA7\u1AA8-\u1AAD' + '\u1B04\u1B05-\u1B33\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B44\u1B45-\u1B4B' + '\u1B50-\u1B59\u1B5A-\u1B60\u1B61-\u1B6A\u1B74-\u1B7C\u1B82\u1B83-\u1BA0' + '\u1BA1\u1BA6-\u1BA7\u1BAA\u1BAE-\u1BAF\u1BB0-\u1BB9\u1BBA-\u1BE5\u1BE7' + '\u1BEA-\u1BEC\u1BEE\u1BF2-\u1BF3\u1BFC-\u1BFF\u1C00-\u1C23\u1C24-\u1C2B' + '\u1C34-\u1C35\u1C3B-\u1C3F\u1C40-\u1C49\u1C4D-\u1C4F\u1C50-\u1C59' + '\u1C5A-\u1C77\u1C78-\u1C7D\u1C7E-\u1C7F\u1CC0-\u1CC7\u1CD3\u1CE1' + '\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF2-\u1CF3\u1CF5-\u1CF6\u1D00-\u1D2B' + '\u1D2C-\u1D6A\u1D6B-\u1D77\u1D78\u1D79-\u1D9A\u1D9B-\u1DBF\u1E00-\u1F15' + '\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D' + '\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC' + '\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200E' + '\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D' + '\u2124\u2126\u2128\u212A-\u212D\u212F-\u2134\u2135-\u2138\u2139' + '\u213C-\u213F\u2145-\u2149\u214E\u214F\u2160-\u2182\u2183-\u2184' + '\u2185-\u2188\u2336-\u237A\u2395\u249C-\u24E9\u26AC\u2800-\u28FF' + '\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2C7B\u2C7C-\u2C7D\u2C7E-\u2CE4' + '\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F' + '\u2D70\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE' + '\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005\u3006\u3007' + '\u3021-\u3029\u302E-\u302F\u3031-\u3035\u3038-\u303A\u303B\u303C' + '\u3041-\u3096\u309D-\u309E\u309F\u30A1-\u30FA\u30FC-\u30FE\u30FF' + '\u3105-\u312D\u3131-\u318E\u3190-\u3191\u3192-\u3195\u3196-\u319F' + '\u31A0-\u31BA\u31F0-\u31FF\u3200-\u321C\u3220-\u3229\u322A-\u3247' + '\u3248-\u324F\u3260-\u327B\u327F\u3280-\u3289\u328A-\u32B0\u32C0-\u32CB' + '\u32D0-\u32FE\u3300-\u3376\u337B-\u33DD\u33E0-\u33FE\u3400-\u4DB5' + '\u4E00-\u9FCC\uA000-\uA014\uA015\uA016-\uA48C\uA4D0-\uA4F7\uA4F8-\uA4FD' + '\uA4FE-\uA4FF\uA500-\uA60B\uA60C\uA610-\uA61F\uA620-\uA629\uA62A-\uA62B' + '\uA640-\uA66D\uA66E\uA680-\uA69B\uA69C-\uA69D\uA6A0-\uA6E5\uA6E6-\uA6EF' + '\uA6F2-\uA6F7\uA722-\uA76F\uA770\uA771-\uA787\uA789-\uA78A\uA78B-\uA78E' + '\uA790-\uA7AD\uA7B0-\uA7B1\uA7F7\uA7F8-\uA7F9\uA7FA\uA7FB-\uA801' + '\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA823-\uA824\uA827\uA830-\uA835' + '\uA836-\uA837\uA840-\uA873\uA880-\uA881\uA882-\uA8B3\uA8B4-\uA8C3' + '\uA8CE-\uA8CF\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8F8-\uA8FA\uA8FB\uA900-\uA909' + '\uA90A-\uA925\uA92E-\uA92F\uA930-\uA946\uA952-\uA953\uA95F\uA960-\uA97C' + '\uA983\uA984-\uA9B2\uA9B4-\uA9B5\uA9BA-\uA9BB\uA9BD-\uA9C0\uA9C1-\uA9CD' + '\uA9CF\uA9D0-\uA9D9\uA9DE-\uA9DF\uA9E0-\uA9E4\uA9E6\uA9E7-\uA9EF' + '\uA9F0-\uA9F9\uA9FA-\uA9FE\uAA00-\uAA28\uAA2F-\uAA30\uAA33-\uAA34' + '\uAA40-\uAA42\uAA44-\uAA4B\uAA4D\uAA50-\uAA59\uAA5C-\uAA5F\uAA60-\uAA6F' + '\uAA70\uAA71-\uAA76\uAA77-\uAA79\uAA7A\uAA7B\uAA7D\uAA7E-\uAAAF\uAAB1' + '\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADC\uAADD\uAADE-\uAADF' + '\uAAE0-\uAAEA\uAAEB\uAAEE-\uAAEF\uAAF0-\uAAF1\uAAF2\uAAF3-\uAAF4\uAAF5' + '\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E' + '\uAB30-\uAB5A\uAB5B\uAB5C-\uAB5F\uAB64-\uAB65\uABC0-\uABE2\uABE3-\uABE4' + '\uABE6-\uABE7\uABE9-\uABEA\uABEB\uABEC\uABF0-\uABF9\uAC00-\uD7A3' + '\uD7B0-\uD7C6\uD7CB-\uD7FB\uE000-\uF8FF\uF900-\uFA6D\uFA70-\uFAD9' + '\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFF6F\uFF70' + '\uFF71-\uFF9D\uFF9E-\uFF9F\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF' + '\uFFD2-\uFFD7\uFFDA-\uFFDC',

  R: '\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05D0-\u05EA\u05EB-\u05EF' + '\u05F0-\u05F2\u05F3-\u05F4\u05F5-\u05FF\u07C0-\u07C9\u07CA-\u07EA' + '\u07F4-\u07F5\u07FA\u07FB-\u07FF\u0800-\u0815\u081A\u0824\u0828' + '\u082E-\u082F\u0830-\u083E\u083F\u0840-\u0858\u085C-\u085D\u085E' + '\u085F-\u089F\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB37\uFB38-\uFB3C' + '\uFB3D\uFB3E\uFB3F\uFB40-\uFB41\uFB42\uFB43-\uFB44\uFB45\uFB46-\uFB4F',

  AL: '\u0608\u060B\u060D\u061B\u061C\u061D\u061E-\u061F\u0620-\u063F\u0640' + '\u0641-\u064A\u066D\u066E-\u066F\u0671-\u06D3\u06D4\u06D5\u06E5-\u06E6' + '\u06EE-\u06EF\u06FA-\u06FC\u06FD-\u06FE\u06FF\u0700-\u070D\u070E\u070F' + '\u0710\u0712-\u072F\u074B-\u074C\u074D-\u07A5\u07B1\u07B2-\u07BF' + '\u08A0-\u08B2\u08B3-\u08E3\uFB50-\uFBB1\uFBB2-\uFBC1\uFBC2-\uFBD2' + '\uFBD3-\uFD3D\uFD40-\uFD4F\uFD50-\uFD8F\uFD90-\uFD91\uFD92-\uFDC7' + '\uFDC8-\uFDCF\uFDF0-\uFDFB\uFDFC\uFDFE-\uFDFF\uFE70-\uFE74\uFE75' + '\uFE76-\uFEFC\uFEFD-\uFEFE'

};

var REGEX_STRONG = new RegExp('[' + RANGE_BY_BIDI_TYPE.L + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + ']');

var REGEX_RTL = new RegExp('[' + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + ']');

/**
 * Returns the first strong character (has Bidi_Class value of L, R, or AL).
 *
 * @param str  A text block; e.g. paragraph, table cell, tag
 * @return     A character with strong bidi direction, or null if not found
 */
function firstStrongChar(str) {
  var match = REGEX_STRONG.exec(str);
  return match == null ? null : match[0];
}

/**
 * Returns the direction of a block of text, based on the direction of its
 * first strong character (has Bidi_Class value of L, R, or AL).
 *
 * @param str  A text block; e.g. paragraph, table cell, tag
 * @return     The resolved direction
 */
function firstStrongCharDir(str) {
  var strongChar = firstStrongChar(str);
  if (strongChar == null) {
    return UnicodeBidiDirection.NEUTRAL;
  }
  return REGEX_RTL.exec(strongChar) ? UnicodeBidiDirection.RTL : UnicodeBidiDirection.LTR;
}

/**
 * Returns the direction of a block of text, based on the direction of its
 * first strong character (has Bidi_Class value of L, R, or AL), or a fallback
 * direction, if no strong character is found.
 *
 * This function is supposed to be used in respect to Higher-Level Protocol
 * rule HL1. (http://www.unicode.org/reports/tr9/#HL1)
 *
 * @param str       A text block; e.g. paragraph, table cell, tag
 * @param fallback  Fallback direction, used if no strong direction detected
 *                  for the block (default = NEUTRAL)
 * @return          The resolved direction
 */
function resolveBlockDir(str, fallback) {
  fallback = fallback || UnicodeBidiDirection.NEUTRAL;
  if (!str.length) {
    return fallback;
  }
  var blockDir = firstStrongCharDir(str);
  return blockDir === UnicodeBidiDirection.NEUTRAL ? fallback : blockDir;
}

/**
 * Returns the direction of a block of text, based on the direction of its
 * first strong character (has Bidi_Class value of L, R, or AL), or a fallback
 * direction, if no strong character is found.
 *
 * NOTE: This function is similar to resolveBlockDir(), but uses the global
 * direction as the fallback, so it *always* returns a Strong direction,
 * making it useful for integration in places that you need to make the final
 * decision, like setting some CSS class.
 *
 * This function is supposed to be used in respect to Higher-Level Protocol
 * rule HL1. (http://www.unicode.org/reports/tr9/#HL1)
 *
 * @param str             A text block; e.g. paragraph, table cell
 * @param strongFallback  Fallback direction, used if no strong direction
 *                        detected for the block (default = global direction)
 * @return                The resolved Strong direction
 */
function getDirection(str, strongFallback) {
  if (!strongFallback) {
    strongFallback = UnicodeBidiDirection.getGlobalDir();
  }
  !UnicodeBidiDirection.isStrong(strongFallback) ?  false ? invariant(false, 'Fallback direction must be a strong direction') : invariant(false) : void 0;
  return resolveBlockDir(str, strongFallback);
}

/**
 * Returns true if getDirection(arguments...) returns LTR.
 *
 * @param str             A text block; e.g. paragraph, table cell
 * @param strongFallback  Fallback direction, used if no strong direction
 *                        detected for the block (default = global direction)
 * @return                True if the resolved direction is LTR
 */
function isDirectionLTR(str, strongFallback) {
  return getDirection(str, strongFallback) === UnicodeBidiDirection.LTR;
}

/**
 * Returns true if getDirection(arguments...) returns RTL.
 *
 * @param str             A text block; e.g. paragraph, table cell
 * @param strongFallback  Fallback direction, used if no strong direction
 *                        detected for the block (default = global direction)
 * @return                True if the resolved direction is RTL
 */
function isDirectionRTL(str, strongFallback) {
  return getDirection(str, strongFallback) === UnicodeBidiDirection.RTL;
}

var UnicodeBidi = {
  firstStrongChar: firstStrongChar,
  firstStrongCharDir: firstStrongCharDir,
  resolveBlockDir: resolveBlockDir,
  getDirection: getDirection,
  isDirectionLTR: isDirectionLTR,
  isDirectionRTL: isDirectionRTL
};

module.exports = UnicodeBidi;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (false) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),
/* 64 */,
/* 65 */,
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(12);
var settle = __webpack_require__(126);
var buildURL = __webpack_require__(129);
var parseHeaders = __webpack_require__(135);
var isURLSameOrigin = __webpack_require__(133);
var createError = __webpack_require__(69);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(128);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(131);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(125);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BlockTree
 * 
 */



var Immutable = __webpack_require__(2);

var emptyFunction = __webpack_require__(19);
var findRangesImmutable = __webpack_require__(36);

var List = Immutable.List,
    Repeat = Immutable.Repeat,
    Record = Immutable.Record;


var returnTrue = emptyFunction.thatReturnsTrue;

var FINGERPRINT_DELIMITER = '-';

var defaultLeafRange = {
  start: null,
  end: null
};

var LeafRange = Record(defaultLeafRange);

var defaultDecoratorRange = {
  start: null,
  end: null,
  decoratorKey: null,
  leaves: null
};

var DecoratorRange = Record(defaultDecoratorRange);

var BlockTree = {
  /**
   * Generate a block tree for a given ContentBlock/decorator pair.
   */
  generate: function generate(contentState, block, decorator) {
    var textLength = block.getLength();
    if (!textLength) {
      return List.of(new DecoratorRange({
        start: 0,
        end: 0,
        decoratorKey: null,
        leaves: List.of(new LeafRange({ start: 0, end: 0 }))
      }));
    }

    var leafSets = [];
    var decorations = decorator ? decorator.getDecorations(block, contentState) : List(Repeat(null, textLength));

    var chars = block.getCharacterList();

    findRangesImmutable(decorations, areEqual, returnTrue, function (start, end) {
      leafSets.push(new DecoratorRange({
        start: start,
        end: end,
        decoratorKey: decorations.get(start),
        leaves: generateLeaves(chars.slice(start, end).toList(), start)
      }));
    });

    return List(leafSets);
  },

  /**
   * Create a string representation of the given tree map. This allows us
   * to rapidly determine whether a tree has undergone a significant
   * structural change.
   */
  getFingerprint: function getFingerprint(tree) {
    return tree.map(function (leafSet) {
      var decoratorKey = leafSet.get('decoratorKey');
      var fingerprintString = decoratorKey !== null ? decoratorKey + '.' + (leafSet.get('end') - leafSet.get('start')) : '';
      return '' + fingerprintString + '.' + leafSet.get('leaves').size;
    }).join(FINGERPRINT_DELIMITER);
  }
};

/**
 * Generate LeafRange records for a given character list.
 */
function generateLeaves(characters, offset) {
  var leaves = [];
  var inlineStyles = characters.map(function (c) {
    return c.getStyle();
  }).toList();
  findRangesImmutable(inlineStyles, areEqual, returnTrue, function (start, end) {
    leaves.push(new LeafRange({
      start: start + offset,
      end: end + offset
    }));
  });
  return List(leaves);
}

function areEqual(a, b) {
  return a === b;
}

module.exports = BlockTree;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DefaultDraftInlineStyle
 * 
 */



module.exports = {
  BOLD: {
    fontWeight: 'bold'
  },

  CODE: {
    fontFamily: 'monospace',
    wordWrap: 'break-word'
  },

  ITALIC: {
    fontStyle: 'italic'
  },

  STRIKETHROUGH: {
    textDecoration: 'line-through'
  },

  UNDERLINE: {
    textDecoration: 'underline'
  }
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorBlock.react
 * @typechecks
 * 
 */



var _assign = __webpack_require__(10);

var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DraftEditorLeaf = __webpack_require__(168);
var DraftOffsetKey = __webpack_require__(35);
var React = __webpack_require__(3);
var ReactDOM = __webpack_require__(8);
var Scroll = __webpack_require__(56);
var Style = __webpack_require__(31);
var UnicodeBidi = __webpack_require__(62);
var UnicodeBidiDirection = __webpack_require__(42);

var cx = __webpack_require__(17);
var getElementPosition = __webpack_require__(113);
var getScrollPosition = __webpack_require__(32);
var getViewportDimensions = __webpack_require__(114);
var invariant = __webpack_require__(0);
var nullthrows = __webpack_require__(4);

var SCROLL_BUFFER = 10;

/**
 * The default block renderer for a `DraftEditor` component.
 *
 * A `DraftEditorBlock` is able to render a given `ContentBlock` to its
 * appropriate decorator and inline style components.
 */
var DraftEditorBlock = function (_React$Component) {
  _inherits(DraftEditorBlock, _React$Component);

  function DraftEditorBlock() {
    _classCallCheck(this, DraftEditorBlock);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DraftEditorBlock.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.block !== nextProps.block || this.props.tree !== nextProps.tree || this.props.direction !== nextProps.direction || isBlockOnSelectionEdge(nextProps.selection, nextProps.block.getKey()) && nextProps.forceSelection;
  };

  /**
   * When a block is mounted and overlaps the selection state, we need to make
   * sure that the cursor is visible to match native behavior. This may not
   * be the case if the user has pressed `RETURN` or pasted some content, since
   * programatically creating these new blocks and setting the DOM selection
   * will miss out on the browser natively scrolling to that position.
   *
   * To replicate native behavior, if the block overlaps the selection state
   * on mount, force the scroll position. Check the scroll state of the scroll
   * parent, and adjust it to align the entire block to the bottom of the
   * scroll parent.
   */


  DraftEditorBlock.prototype.componentDidMount = function componentDidMount() {
    var selection = this.props.selection;
    var endKey = selection.getEndKey();
    if (!selection.getHasFocus() || endKey !== this.props.block.getKey()) {
      return;
    }

    var blockNode = ReactDOM.findDOMNode(this);
    var scrollParent = Style.getScrollParent(blockNode);
    var scrollPosition = getScrollPosition(scrollParent);
    var scrollDelta;

    if (scrollParent === window) {
      var nodePosition = getElementPosition(blockNode);
      var nodeBottom = nodePosition.y + nodePosition.height;
      var viewportHeight = getViewportDimensions().height;
      scrollDelta = nodeBottom - viewportHeight;
      if (scrollDelta > 0) {
        window.scrollTo(scrollPosition.x, scrollPosition.y + scrollDelta + SCROLL_BUFFER);
      }
    } else {
      !(blockNode instanceof HTMLElement) ?  false ? invariant(false, 'blockNode is not an HTMLElement') : invariant(false) : void 0;
      var blockBottom = blockNode.offsetHeight + blockNode.offsetTop;
      var scrollBottom = scrollParent.offsetHeight + scrollPosition.y;
      scrollDelta = blockBottom - scrollBottom;
      if (scrollDelta > 0) {
        Scroll.setTop(scrollParent, Scroll.getTop(scrollParent) + scrollDelta + SCROLL_BUFFER);
      }
    }
  };

  DraftEditorBlock.prototype._renderChildren = function _renderChildren() {
    var _this2 = this;

    var block = this.props.block;
    var blockKey = block.getKey();
    var text = block.getText();
    var lastLeafSet = this.props.tree.size - 1;
    var hasSelection = isBlockOnSelectionEdge(this.props.selection, blockKey);

    return this.props.tree.map(function (leafSet, ii) {
      var leavesForLeafSet = leafSet.get('leaves');
      var lastLeaf = leavesForLeafSet.size - 1;
      var leaves = leavesForLeafSet.map(function (leaf, jj) {
        var offsetKey = DraftOffsetKey.encode(blockKey, ii, jj);
        var start = leaf.get('start');
        var end = leaf.get('end');
        return (
          /* $FlowFixMe(>=0.53.0 site=www,mobile) This comment suppresses an
           * error when upgrading Flow's support for React. Common errors found
           * when upgrading Flow's React support are documented at
           * https://fburl.com/eq7bs81w */
          React.createElement(DraftEditorLeaf, {
            key: offsetKey,
            offsetKey: offsetKey,
            block: block,
            start: start,
            selection: hasSelection ? _this2.props.selection : undefined,
            forceSelection: _this2.props.forceSelection,
            text: text.slice(start, end),
            styleSet: block.getInlineStyleAt(start),
            customStyleMap: _this2.props.customStyleMap,
            customStyleFn: _this2.props.customStyleFn,
            isLast: ii === lastLeafSet && jj === lastLeaf
          })
        );
      }).toArray();

      var decoratorKey = leafSet.get('decoratorKey');
      if (decoratorKey == null) {
        return leaves;
      }

      if (!_this2.props.decorator) {
        return leaves;
      }

      var decorator = nullthrows(_this2.props.decorator);

      var DecoratorComponent = decorator.getComponentForKey(decoratorKey);
      if (!DecoratorComponent) {
        return leaves;
      }

      var decoratorProps = decorator.getPropsForKey(decoratorKey);
      var decoratorOffsetKey = DraftOffsetKey.encode(blockKey, ii, 0);
      var decoratedText = text.slice(leavesForLeafSet.first().get('start'), leavesForLeafSet.last().get('end'));

      // Resetting dir to the same value on a child node makes Chrome/Firefox
      // confused on cursor movement. See http://jsfiddle.net/d157kLck/3/
      var dir = UnicodeBidiDirection.getHTMLDirIfDifferent(UnicodeBidi.getDirection(decoratedText), _this2.props.direction);

      return React.createElement(
        DecoratorComponent,
        _extends({}, decoratorProps, {
          contentState: _this2.props.contentState,
          decoratedText: decoratedText,
          dir: dir,
          key: decoratorOffsetKey,
          entityKey: block.getEntityAt(leafSet.get('start')),
          offsetKey: decoratorOffsetKey }),
        leaves
      );
    }).toArray();
  };

  DraftEditorBlock.prototype.render = function render() {
    /* $FlowFixMe(>=0.53.0 site=www,mobile) This comment suppresses an error
     * when upgrading Flow's support for React. Common errors found when
     * upgrading Flow's React support are documented at
     * https://fburl.com/eq7bs81w */
    var _props = this.props,
        direction = _props.direction,
        offsetKey = _props.offsetKey;

    var className = cx({
      'public/DraftStyleDefault/block': true,
      'public/DraftStyleDefault/ltr': direction === 'LTR',
      'public/DraftStyleDefault/rtl': direction === 'RTL'
    });

    return React.createElement(
      'div',
      { 'data-offset-key': offsetKey, className: className },
      this._renderChildren()
    );
  };

  return DraftEditorBlock;
}(React.Component);

/**
 * Return whether a block overlaps with either edge of the `SelectionState`.
 */


function isBlockOnSelectionEdge(selection, key) {
  return selection.getAnchorKey() === key || selection.getFocusKey() === key;
}

module.exports = DraftEditorBlock;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEntityInstance
 * 
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Immutable = __webpack_require__(2);

var Record = Immutable.Record;


var DraftEntityInstanceRecord = Record({
  type: 'TOKEN',
  mutability: 'IMMUTABLE',
  data: Object
});

/**
 * An instance of a document entity, consisting of a `type` and relevant
 * `data`, metadata about the entity.
 *
 * For instance, a "link" entity might provide a URI, and a "mention"
 * entity might provide the mentioned user's ID. These pieces of data
 * may be used when rendering the entity as part of a ContentBlock DOM
 * representation. For a link, the data would be used as an href for
 * the rendered anchor. For a mention, the ID could be used to retrieve
 * a hovercard.
 */

var DraftEntityInstance = function (_DraftEntityInstanceR) {
  _inherits(DraftEntityInstance, _DraftEntityInstanceR);

  function DraftEntityInstance() {
    _classCallCheck(this, DraftEntityInstance);

    return _possibleConstructorReturn(this, _DraftEntityInstanceR.apply(this, arguments));
  }

  DraftEntityInstance.prototype.getType = function getType() {
    return this.get('type');
  };

  DraftEntityInstance.prototype.getMutability = function getMutability() {
    return this.get('mutability');
  };

  DraftEntityInstance.prototype.getData = function getData() {
    return this.get('data');
  };

  return DraftEntityInstance;
}(DraftEntityInstanceRecord);

module.exports = DraftEntityInstance;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftFeatureFlags
 * 
 */



var DraftFeatureFlags = __webpack_require__(172);

module.exports = DraftFeatureFlags;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftRemovableWord
 * @typechecks
 * 
 */



var TokenizeUtil = __webpack_require__(110);

var punctuation = TokenizeUtil.getPunctuation();

// The apostrophe and curly single quotes behave in a curious way: when
// surrounded on both sides by word characters, they behave as word chars; when
// either neighbor is punctuation or an end of the string, they behave as
// punctuation.
var CHAMELEON_CHARS = '[\'\u2018\u2019]';

// Remove the underscore, which should count as part of the removable word. The
// "chameleon chars" also count as punctuation in this regex.
var WHITESPACE_AND_PUNCTUATION = '\\s|(?![_])' + punctuation;

var DELETE_STRING = '^' + '(?:' + WHITESPACE_AND_PUNCTUATION + ')*' + '(?:' + CHAMELEON_CHARS + '|(?!' + WHITESPACE_AND_PUNCTUATION + ').)*' + '(?:(?!' + WHITESPACE_AND_PUNCTUATION + ').)';
var DELETE_REGEX = new RegExp(DELETE_STRING);

var BACKSPACE_STRING = '(?:(?!' + WHITESPACE_AND_PUNCTUATION + ').)' + '(?:' + CHAMELEON_CHARS + '|(?!' + WHITESPACE_AND_PUNCTUATION + ').)*' + '(?:' + WHITESPACE_AND_PUNCTUATION + ')*' + '$';
var BACKSPACE_REGEX = new RegExp(BACKSPACE_STRING);

function getRemovableWord(text, isBackward) {
  var matches = isBackward ? BACKSPACE_REGEX.exec(text) : DELETE_REGEX.exec(text);
  return matches ? matches[0] : text;
}

var DraftRemovableWord = {
  getBackward: function getBackward(text) {
    return getRemovableWord(text, true);
  },

  getForward: function getForward(text) {
    return getRemovableWord(text, false);
  }
};

module.exports = DraftRemovableWord;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftStringKey
 * @typechecks
 * 
 */



var DraftStringKey = {
  stringify: function stringify(key) {
    return '_' + String(key);
  },

  unstringify: function unstringify(key) {
    return key.slice(1);
  }
};

module.exports = DraftStringKey;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RichTextEditorUtil
 * @typechecks
 * 
 */



var DraftModifier = __webpack_require__(6);
var EditorState = __webpack_require__(1);
var SelectionState = __webpack_require__(26);

var adjustBlockDepthForContentState = __webpack_require__(177);
var nullthrows = __webpack_require__(4);

var RichTextEditorUtil = {
  currentBlockContainsLink: function currentBlockContainsLink(editorState) {
    var selection = editorState.getSelection();
    var contentState = editorState.getCurrentContent();
    var entityMap = contentState.getEntityMap();
    return contentState.getBlockForKey(selection.getAnchorKey()).getCharacterList().slice(selection.getStartOffset(), selection.getEndOffset()).some(function (v) {
      var entity = v.getEntity();
      return !!entity && entityMap.__get(entity).getType() === 'LINK';
    });
  },

  getCurrentBlockType: function getCurrentBlockType(editorState) {
    var selection = editorState.getSelection();
    return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  },

  getDataObjectForLinkURL: function getDataObjectForLinkURL(uri) {
    return { url: uri.toString() };
  },

  handleKeyCommand: function handleKeyCommand(editorState, command) {
    switch (command) {
      case 'bold':
        return RichTextEditorUtil.toggleInlineStyle(editorState, 'BOLD');
      case 'italic':
        return RichTextEditorUtil.toggleInlineStyle(editorState, 'ITALIC');
      case 'underline':
        return RichTextEditorUtil.toggleInlineStyle(editorState, 'UNDERLINE');
      case 'code':
        return RichTextEditorUtil.toggleCode(editorState);
      case 'backspace':
      case 'backspace-word':
      case 'backspace-to-start-of-line':
        return RichTextEditorUtil.onBackspace(editorState);
      case 'delete':
      case 'delete-word':
      case 'delete-to-end-of-block':
        return RichTextEditorUtil.onDelete(editorState);
      default:
        // they may have custom editor commands; ignore those
        return null;
    }
  },

  insertSoftNewline: function insertSoftNewline(editorState) {
    var contentState = DraftModifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), '\n', editorState.getCurrentInlineStyle(), null);

    var newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

    return EditorState.forceSelection(newEditorState, contentState.getSelectionAfter());
  },

  /**
   * For collapsed selections at the start of styled blocks, backspace should
   * just remove the existing style.
   */
  onBackspace: function onBackspace(editorState) {
    var selection = editorState.getSelection();
    if (!selection.isCollapsed() || selection.getAnchorOffset() || selection.getFocusOffset()) {
      return null;
    }

    // First, try to remove a preceding atomic block.
    var content = editorState.getCurrentContent();
    var startKey = selection.getStartKey();
    var blockBefore = content.getBlockBefore(startKey);

    if (blockBefore && blockBefore.getType() === 'atomic') {
      var blockMap = content.getBlockMap()['delete'](blockBefore.getKey());
      var withoutAtomicBlock = content.merge({ blockMap: blockMap, selectionAfter: selection });
      if (withoutAtomicBlock !== content) {
        return EditorState.push(editorState, withoutAtomicBlock, 'remove-range');
      }
    }

    // If that doesn't succeed, try to remove the current block style.
    var withoutBlockStyle = RichTextEditorUtil.tryToRemoveBlockStyle(editorState);

    if (withoutBlockStyle) {
      return EditorState.push(editorState, withoutBlockStyle, 'change-block-type');
    }

    return null;
  },

  onDelete: function onDelete(editorState) {
    var selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      return null;
    }

    var content = editorState.getCurrentContent();
    var startKey = selection.getStartKey();
    var block = content.getBlockForKey(startKey);
    var length = block.getLength();

    // The cursor is somewhere within the text. Behave normally.
    if (selection.getStartOffset() < length) {
      return null;
    }

    var blockAfter = content.getBlockAfter(startKey);

    if (!blockAfter || blockAfter.getType() !== 'atomic') {
      return null;
    }

    var atomicBlockTarget = selection.merge({
      focusKey: blockAfter.getKey(),
      focusOffset: blockAfter.getLength()
    });

    var withoutAtomicBlock = DraftModifier.removeRange(content, atomicBlockTarget, 'forward');

    if (withoutAtomicBlock !== content) {
      return EditorState.push(editorState, withoutAtomicBlock, 'remove-range');
    }

    return null;
  },

  onTab: function onTab(event, editorState, maxDepth) {
    var selection = editorState.getSelection();
    var key = selection.getAnchorKey();
    if (key !== selection.getFocusKey()) {
      return editorState;
    }

    var content = editorState.getCurrentContent();
    var block = content.getBlockForKey(key);
    var type = block.getType();
    if (type !== 'unordered-list-item' && type !== 'ordered-list-item') {
      return editorState;
    }

    event.preventDefault();

    // Only allow indenting one level beyond the block above, and only if
    // the block above is a list item as well.
    var blockAbove = content.getBlockBefore(key);
    if (!blockAbove) {
      return editorState;
    }

    var typeAbove = blockAbove.getType();
    if (typeAbove !== 'unordered-list-item' && typeAbove !== 'ordered-list-item') {
      return editorState;
    }

    var depth = block.getDepth();
    if (!event.shiftKey && depth === maxDepth) {
      return editorState;
    }

    maxDepth = Math.min(blockAbove.getDepth() + 1, maxDepth);

    var withAdjustment = adjustBlockDepthForContentState(content, selection, event.shiftKey ? -1 : 1, maxDepth);

    return EditorState.push(editorState, withAdjustment, 'adjust-depth');
  },

  toggleBlockType: function toggleBlockType(editorState, blockType) {
    var selection = editorState.getSelection();
    var startKey = selection.getStartKey();
    var endKey = selection.getEndKey();
    var content = editorState.getCurrentContent();
    var target = selection;

    // Triple-click can lead to a selection that includes offset 0 of the
    // following block. The `SelectionState` for this case is accurate, but
    // we should avoid toggling block type for the trailing block because it
    // is a confusing interaction.
    if (startKey !== endKey && selection.getEndOffset() === 0) {
      var blockBefore = nullthrows(content.getBlockBefore(endKey));
      endKey = blockBefore.getKey();
      target = target.merge({
        anchorKey: startKey,
        anchorOffset: selection.getStartOffset(),
        focusKey: endKey,
        focusOffset: blockBefore.getLength(),
        isBackward: false
      });
    }

    var hasAtomicBlock = content.getBlockMap().skipWhile(function (_, k) {
      return k !== startKey;
    }).reverse().skipWhile(function (_, k) {
      return k !== endKey;
    }).some(function (v) {
      return v.getType() === 'atomic';
    });

    if (hasAtomicBlock) {
      return editorState;
    }

    var typeToSet = content.getBlockForKey(startKey).getType() === blockType ? 'unstyled' : blockType;

    return EditorState.push(editorState, DraftModifier.setBlockType(content, target, typeToSet), 'change-block-type');
  },

  toggleCode: function toggleCode(editorState) {
    var selection = editorState.getSelection();
    var anchorKey = selection.getAnchorKey();
    var focusKey = selection.getFocusKey();

    if (selection.isCollapsed() || anchorKey !== focusKey) {
      return RichTextEditorUtil.toggleBlockType(editorState, 'code-block');
    }

    return RichTextEditorUtil.toggleInlineStyle(editorState, 'CODE');
  },

  /**
   * Toggle the specified inline style for the selection. If the
   * user's selection is collapsed, apply or remove the style for the
   * internal state. If it is not collapsed, apply the change directly
   * to the document state.
   */
  toggleInlineStyle: function toggleInlineStyle(editorState, inlineStyle) {
    var selection = editorState.getSelection();
    var currentStyle = editorState.getCurrentInlineStyle();

    // If the selection is collapsed, toggle the specified style on or off and
    // set the result as the new inline style override. This will then be
    // used as the inline style for the next character to be inserted.
    if (selection.isCollapsed()) {
      return EditorState.setInlineStyleOverride(editorState, currentStyle.has(inlineStyle) ? currentStyle.remove(inlineStyle) : currentStyle.add(inlineStyle));
    }

    // If characters are selected, immediately apply or remove the
    // inline style on the document state itself.
    var content = editorState.getCurrentContent();
    var newContent;

    // If the style is already present for the selection range, remove it.
    // Otherwise, apply it.
    if (currentStyle.has(inlineStyle)) {
      newContent = DraftModifier.removeInlineStyle(content, selection, inlineStyle);
    } else {
      newContent = DraftModifier.applyInlineStyle(content, selection, inlineStyle);
    }

    return EditorState.push(editorState, newContent, 'change-inline-style');
  },

  toggleLink: function toggleLink(editorState, targetSelection, entityKey) {
    var withoutLink = DraftModifier.applyEntity(editorState.getCurrentContent(), targetSelection, entityKey);

    return EditorState.push(editorState, withoutLink, 'apply-entity');
  },

  /**
   * When a collapsed cursor is at the start of an empty styled block, 
   * changes block to 'unstyled'. Returns null if block or selection does not
   * meet that criteria.
   */
  tryToRemoveBlockStyle: function tryToRemoveBlockStyle(editorState) {
    var selection = editorState.getSelection();
    var offset = selection.getAnchorOffset();
    if (selection.isCollapsed() && offset === 0) {
      var key = selection.getAnchorKey();
      var content = editorState.getCurrentContent();
      var block = content.getBlockForKey(key);
      if (block.getLength() > 0) {
        return null;
      }

      var type = block.getType();
      var blockBefore = content.getBlockBefore(key);
      if (type === 'code-block' && blockBefore && blockBefore.getType() === 'code-block') {
        return null;
      }

      if (type !== 'unstyled') {
        return DraftModifier.setBlockType(content, selection, 'unstyled');
      }
    }
    return null;
  }
};

module.exports = RichTextEditorUtil;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule convertFromHTMLToContentBlocks
 * @typechecks
 * 
 */



var CharacterMetadata = __webpack_require__(13);
var ContentBlock = __webpack_require__(18);
var DefaultDraftBlockRenderMap = __webpack_require__(49);
var DraftEntity = __webpack_require__(34);
var Immutable = __webpack_require__(2);

var _require = __webpack_require__(2),
    Set = _require.Set;

var URI = __webpack_require__(111);

var generateRandomKey = __webpack_require__(15);
var getSafeBodyFromHTML = __webpack_require__(90);
var invariant = __webpack_require__(0);
var nullthrows = __webpack_require__(4);
var sanitizeDraftText = __webpack_require__(54);

var List = Immutable.List,
    OrderedSet = Immutable.OrderedSet;


var NBSP = '&nbsp;';
var SPACE = ' ';

// Arbitrary max indent
var MAX_DEPTH = 4;

// used for replacing characters in HTML
var REGEX_CR = new RegExp('\r', 'g');
var REGEX_LF = new RegExp('\n', 'g');
var REGEX_NBSP = new RegExp(NBSP, 'g');
var REGEX_CARRIAGE = new RegExp('&#13;?', 'g');
var REGEX_ZWS = new RegExp('&#8203;?', 'g');

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
var boldValues = ['bold', 'bolder', '500', '600', '700', '800', '900'];
var notBoldValues = ['light', 'lighter', '100', '200', '300', '400'];

// Block tag flow is different because LIs do not have
// a deterministic style ;_;
var inlineTags = {
  b: 'BOLD',
  code: 'CODE',
  del: 'STRIKETHROUGH',
  em: 'ITALIC',
  i: 'ITALIC',
  s: 'STRIKETHROUGH',
  strike: 'STRIKETHROUGH',
  strong: 'BOLD',
  u: 'UNDERLINE'
};

var anchorAttr = ['className', 'href', 'rel', 'target', 'title'];

var imgAttr = ['alt', 'className', 'height', 'src', 'width'];

var lastBlock;

function getEmptyChunk() {
  return {
    text: '',
    inlines: [],
    entities: [],
    blocks: []
  };
}

function getWhitespaceChunk(inEntity) {
  var entities = new Array(1);
  if (inEntity) {
    entities[0] = inEntity;
  }
  return {
    text: SPACE,
    inlines: [OrderedSet()],
    entities: entities,
    blocks: []
  };
}

function getSoftNewlineChunk() {
  return {
    text: '\n',
    inlines: [OrderedSet()],
    entities: new Array(1),
    blocks: []
  };
}

function getBlockDividerChunk(block, depth) {
  return {
    text: '\r',
    inlines: [OrderedSet()],
    entities: new Array(1),
    blocks: [{
      type: block,
      depth: Math.max(0, Math.min(MAX_DEPTH, depth))
    }]
  };
}

function getListBlockType(tag, lastList) {
  if (tag === 'li') {
    return lastList === 'ol' ? 'ordered-list-item' : 'unordered-list-item';
  }
  return null;
}

function getBlockMapSupportedTags(blockRenderMap) {
  var unstyledElement = blockRenderMap.get('unstyled').element;
  var tags = Set([]);

  blockRenderMap.forEach(function (draftBlock) {
    if (draftBlock.aliasedElements) {
      draftBlock.aliasedElements.forEach(function (tag) {
        tags = tags.add(tag);
      });
    }

    tags = tags.add(draftBlock.element);
  });

  return tags.filter(function (tag) {
    return tag && tag !== unstyledElement;
  }).toArray().sort();
}

// custom element conversions
function getMultiMatchedType(tag, lastList, multiMatchExtractor) {
  for (var ii = 0; ii < multiMatchExtractor.length; ii++) {
    var matchType = multiMatchExtractor[ii](tag, lastList);
    if (matchType) {
      return matchType;
    }
  }
  return null;
}

function getBlockTypeForTag(tag, lastList, blockRenderMap) {
  var matchedTypes = blockRenderMap.filter(function (draftBlock) {
    return draftBlock.element === tag || draftBlock.wrapper === tag || draftBlock.aliasedElements && draftBlock.aliasedElements.some(function (alias) {
      return alias === tag;
    });
  }).keySeq().toSet().toArray().sort();

  // if we dont have any matched type, return unstyled
  // if we have one matched type return it
  // if we have multi matched types use the multi-match function to gather type
  switch (matchedTypes.length) {
    case 0:
      return 'unstyled';
    case 1:
      return matchedTypes[0];
    default:
      return getMultiMatchedType(tag, lastList, [getListBlockType]) || 'unstyled';
  }
}

function processInlineTag(tag, node, currentStyle) {
  var styleToCheck = inlineTags[tag];
  if (styleToCheck) {
    currentStyle = currentStyle.add(styleToCheck).toOrderedSet();
  } else if (node instanceof HTMLElement) {
    var htmlElement = node;
    currentStyle = currentStyle.withMutations(function (style) {
      var fontWeight = htmlElement.style.fontWeight;
      var fontStyle = htmlElement.style.fontStyle;
      var textDecoration = htmlElement.style.textDecoration;

      if (boldValues.indexOf(fontWeight) >= 0) {
        style.add('BOLD');
      } else if (notBoldValues.indexOf(fontWeight) >= 0) {
        style.remove('BOLD');
      }

      if (fontStyle === 'italic') {
        style.add('ITALIC');
      } else if (fontStyle === 'normal') {
        style.remove('ITALIC');
      }

      if (textDecoration === 'underline') {
        style.add('UNDERLINE');
      }
      if (textDecoration === 'line-through') {
        style.add('STRIKETHROUGH');
      }
      if (textDecoration === 'none') {
        style.remove('UNDERLINE');
        style.remove('STRIKETHROUGH');
      }
    }).toOrderedSet();
  }
  return currentStyle;
}

function joinChunks(A, B) {
  // Sometimes two blocks will touch in the DOM and we need to strip the
  // extra delimiter to preserve niceness.
  var lastInA = A.text.slice(-1);
  var firstInB = B.text.slice(0, 1);

  if (lastInA === '\r' && firstInB === '\r') {
    A.text = A.text.slice(0, -1);
    A.inlines.pop();
    A.entities.pop();
    A.blocks.pop();
  }

  // Kill whitespace after blocks
  if (lastInA === '\r') {
    if (B.text === SPACE || B.text === '\n') {
      return A;
    } else if (firstInB === SPACE || firstInB === '\n') {
      B.text = B.text.slice(1);
      B.inlines.shift();
      B.entities.shift();
    }
  }

  return {
    text: A.text + B.text,
    inlines: A.inlines.concat(B.inlines),
    entities: A.entities.concat(B.entities),
    blocks: A.blocks.concat(B.blocks)
  };
}

/**
 * Check to see if we have anything like <p> <blockquote> <h1>... to create
 * block tags from. If we do, we can use those and ignore <div> tags. If we
 * don't, we can treat <div> tags as meaningful (unstyled) blocks.
 */
function containsSemanticBlockMarkup(html, blockTags) {
  return blockTags.some(function (tag) {
    return html.indexOf('<' + tag) !== -1;
  });
}

function hasValidLinkText(link) {
  !(link instanceof HTMLAnchorElement) ?  false ? invariant(false, 'Link must be an HTMLAnchorElement.') : invariant(false) : void 0;
  var protocol = link.protocol;
  return protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:';
}

function genFragment(entityMap, node, inlineStyle, lastList, inBlock, blockTags, depth, blockRenderMap, inEntity) {
  var nodeName = node.nodeName.toLowerCase();
  var newBlock = false;
  var nextBlockType = 'unstyled';
  var lastLastBlock = lastBlock;
  var newEntityMap = entityMap;

  // Base Case
  if (nodeName === '#text') {
    var text = node.textContent;
    if (text.trim() === '' && inBlock !== 'pre') {
      return { chunk: getWhitespaceChunk(inEntity), entityMap: entityMap };
    }
    if (inBlock !== 'pre') {
      // Can't use empty string because MSWord
      text = text.replace(REGEX_LF, SPACE);
    }

    // save the last block so we can use it later
    lastBlock = nodeName;

    return {
      chunk: {
        text: text,
        inlines: Array(text.length).fill(inlineStyle),
        entities: Array(text.length).fill(inEntity),
        blocks: []
      },
      entityMap: entityMap
    };
  }

  // save the last block so we can use it later
  lastBlock = nodeName;

  // BR tags
  if (nodeName === 'br') {
    if (lastLastBlock === 'br' && (!inBlock || getBlockTypeForTag(inBlock, lastList, blockRenderMap) === 'unstyled')) {
      return { chunk: getBlockDividerChunk('unstyled', depth), entityMap: entityMap };
    }
    return { chunk: getSoftNewlineChunk(), entityMap: entityMap };
  }

  // IMG tags
  if (nodeName === 'img' && node instanceof HTMLImageElement && node.attributes.getNamedItem('src') && node.attributes.getNamedItem('src').value) {
    var image = node;
    var entityConfig = {};

    imgAttr.forEach(function (attr) {
      var imageAttribute = image.getAttribute(attr);
      if (imageAttribute) {
        entityConfig[attr] = imageAttribute;
      }
    });
    // Forcing this node to have children because otherwise no entity will be
    // created for this node.
    // The child text node cannot just have a space or return as content -
    // we strip those out.
    // See https://github.com/facebook/draft-js/issues/231 for some context.
    node.textContent = '\uD83D\uDCF7';

    // TODO: update this when we remove DraftEntity entirely
    inEntity = DraftEntity.__create('IMAGE', 'MUTABLE', entityConfig || {});
  }

  var chunk = getEmptyChunk();
  var newChunk = null;

  // Inline tags
  inlineStyle = processInlineTag(nodeName, node, inlineStyle);

  // Handle lists
  if (nodeName === 'ul' || nodeName === 'ol') {
    if (lastList) {
      depth += 1;
    }
    lastList = nodeName;
  }

  // Block Tags
  if (!inBlock && blockTags.indexOf(nodeName) !== -1) {
    chunk = getBlockDividerChunk(getBlockTypeForTag(nodeName, lastList, blockRenderMap), depth);
    inBlock = nodeName;
    newBlock = true;
  } else if (lastList && inBlock === 'li' && nodeName === 'li') {
    chunk = getBlockDividerChunk(getBlockTypeForTag(nodeName, lastList, blockRenderMap), depth);
    inBlock = nodeName;
    newBlock = true;
    nextBlockType = lastList === 'ul' ? 'unordered-list-item' : 'ordered-list-item';
  }

  // Recurse through children
  var child = node.firstChild;
  if (child != null) {
    nodeName = child.nodeName.toLowerCase();
  }

  var entityId = null;

  while (child) {
    if (child instanceof HTMLAnchorElement && child.href && hasValidLinkText(child)) {
      (function () {
        var anchor = child;
        var entityConfig = {};

        anchorAttr.forEach(function (attr) {
          var anchorAttribute = anchor.getAttribute(attr);
          if (anchorAttribute) {
            entityConfig[attr] = anchorAttribute;
          }
        });

        entityConfig.url = new URI(anchor.href).toString();
        // TODO: update this when we remove DraftEntity completely
        entityId = DraftEntity.__create('LINK', 'MUTABLE', entityConfig || {});
      })();
    } else {
      entityId = undefined;
    }

    var _genFragment = genFragment(newEntityMap, child, inlineStyle, lastList, inBlock, blockTags, depth, blockRenderMap, entityId || inEntity),
        generatedChunk = _genFragment.chunk,
        maybeUpdatedEntityMap = _genFragment.entityMap;

    newChunk = generatedChunk;
    newEntityMap = maybeUpdatedEntityMap;

    chunk = joinChunks(chunk, newChunk);
    var sibling = child.nextSibling;

    // Put in a newline to break up blocks inside blocks
    if (sibling && blockTags.indexOf(nodeName) >= 0 && inBlock) {
      chunk = joinChunks(chunk, getSoftNewlineChunk());
    }
    if (sibling) {
      nodeName = sibling.nodeName.toLowerCase();
    }
    child = sibling;
  }

  if (newBlock) {
    chunk = joinChunks(chunk, getBlockDividerChunk(nextBlockType, depth));
  }

  return { chunk: chunk, entityMap: newEntityMap };
}

function getChunkForHTML(html, DOMBuilder, blockRenderMap, entityMap) {
  html = html.trim().replace(REGEX_CR, '').replace(REGEX_NBSP, SPACE).replace(REGEX_CARRIAGE, '').replace(REGEX_ZWS, '');

  var supportedBlockTags = getBlockMapSupportedTags(blockRenderMap);

  var safeBody = DOMBuilder(html);
  if (!safeBody) {
    return null;
  }
  lastBlock = null;

  // Sometimes we aren't dealing with content that contains nice semantic
  // tags. In this case, use divs to separate everything out into paragraphs
  // and hope for the best.
  var workingBlocks = containsSemanticBlockMarkup(html, supportedBlockTags) ? supportedBlockTags : ['div'];

  // Start with -1 block depth to offset the fact that we are passing in a fake
  // UL block to start with.

  var _genFragment2 = genFragment(entityMap, safeBody, OrderedSet(), 'ul', null, workingBlocks, -1, blockRenderMap),
      chunk = _genFragment2.chunk,
      newEntityMap = _genFragment2.entityMap;

  // join with previous block to prevent weirdness on paste


  if (chunk.text.indexOf('\r') === 0) {
    chunk = {
      text: chunk.text.slice(1),
      inlines: chunk.inlines.slice(1),
      entities: chunk.entities.slice(1),
      blocks: chunk.blocks
    };
  }

  // Kill block delimiter at the end
  if (chunk.text.slice(-1) === '\r') {
    chunk.text = chunk.text.slice(0, -1);
    chunk.inlines = chunk.inlines.slice(0, -1);
    chunk.entities = chunk.entities.slice(0, -1);
    chunk.blocks.pop();
  }

  // If we saw no block tags, put an unstyled one in
  if (chunk.blocks.length === 0) {
    chunk.blocks.push({ type: 'unstyled', depth: 0 });
  }

  // Sometimes we start with text that isn't in a block, which is then
  // followed by blocks. Need to fix up the blocks to add in
  // an unstyled block for this content
  if (chunk.text.split('\r').length === chunk.blocks.length + 1) {
    chunk.blocks.unshift({ type: 'unstyled', depth: 0 });
  }

  return { chunk: chunk, entityMap: newEntityMap };
}

function convertFromHTMLtoContentBlocks(html) {
  var DOMBuilder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getSafeBodyFromHTML;
  var blockRenderMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DefaultDraftBlockRenderMap;

  // Be ABSOLUTELY SURE that the dom builder you pass here won't execute
  // arbitrary code in whatever environment you're running this in. For an
  // example of how we try to do this in-browser, see getSafeBodyFromHTML.

  // TODO: replace DraftEntity with an OrderedMap here
  var chunkData = getChunkForHTML(html, DOMBuilder, blockRenderMap, DraftEntity);

  if (chunkData == null) {
    return null;
  }

  var chunk = chunkData.chunk,
      newEntityMap = chunkData.entityMap;


  var start = 0;
  return {
    contentBlocks: chunk.text.split('\r').map(function (textBlock, ii) {
      // Make absolutely certain that our text is acceptable.
      textBlock = sanitizeDraftText(textBlock);
      var end = start + textBlock.length;
      var inlines = nullthrows(chunk).inlines.slice(start, end);
      var entities = nullthrows(chunk).entities.slice(start, end);
      var characterList = List(inlines.map(function (style, ii) {
        var data = { style: style, entity: null };
        if (entities[ii]) {
          data.entity = entities[ii];
        }
        return CharacterMetadata.create(data);
      }));
      start = end + 1;

      return new ContentBlock({
        key: generateRandomKey(),
        type: nullthrows(chunk).blocks[ii].type,
        depth: nullthrows(chunk).blocks[ii].depth,
        text: textBlock,
        characterList: characterList
      });
    }),
    entityMap: newEntityMap
  };
}

module.exports = convertFromHTMLtoContentBlocks;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getDefaultKeyBinding
 * @typechecks
 * 
 */



var KeyBindingUtil = __webpack_require__(50);
var Keys = __webpack_require__(30);
var UserAgent = __webpack_require__(5);

var isOSX = UserAgent.isPlatform('Mac OS X');
var isWindows = UserAgent.isPlatform('Windows');

// Firefox on OSX had a bug resulting in navigation instead of cursor movement.
// This bug was fixed in Firefox 29. Feature detection is virtually impossible
// so we just check the version number. See #342765.
var shouldFixFirefoxMovement = isOSX && UserAgent.isBrowser('Firefox < 29');

var hasCommandModifier = KeyBindingUtil.hasCommandModifier,
    isCtrlKeyCommand = KeyBindingUtil.isCtrlKeyCommand;


function shouldRemoveWord(e) {
  return isOSX && e.altKey || isCtrlKeyCommand(e);
}

/**
 * Get the appropriate undo/redo command for a Z key command.
 */
function getZCommand(e) {
  if (!hasCommandModifier(e)) {
    return null;
  }
  return e.shiftKey ? 'redo' : 'undo';
}

function getDeleteCommand(e) {
  // Allow default "cut" behavior for Windows on Shift + Delete.
  if (isWindows && e.shiftKey) {
    return null;
  }
  return shouldRemoveWord(e) ? 'delete-word' : 'delete';
}

function getBackspaceCommand(e) {
  if (hasCommandModifier(e) && isOSX) {
    return 'backspace-to-start-of-line';
  }
  return shouldRemoveWord(e) ? 'backspace-word' : 'backspace';
}

/**
 * Retrieve a bound key command for the given event.
 */
function getDefaultKeyBinding(e) {
  switch (e.keyCode) {
    case 66:
      // B
      return hasCommandModifier(e) ? 'bold' : null;
    case 68:
      // D
      return isCtrlKeyCommand(e) ? 'delete' : null;
    case 72:
      // H
      return isCtrlKeyCommand(e) ? 'backspace' : null;
    case 73:
      // I
      return hasCommandModifier(e) ? 'italic' : null;
    case 74:
      // J
      return hasCommandModifier(e) ? 'code' : null;
    case 75:
      // K
      return !isWindows && isCtrlKeyCommand(e) ? 'secondary-cut' : null;
    case 77:
      // M
      return isCtrlKeyCommand(e) ? 'split-block' : null;
    case 79:
      // O
      return isCtrlKeyCommand(e) ? 'split-block' : null;
    case 84:
      // T
      return isOSX && isCtrlKeyCommand(e) ? 'transpose-characters' : null;
    case 85:
      // U
      return hasCommandModifier(e) ? 'underline' : null;
    case 87:
      // W
      return isOSX && isCtrlKeyCommand(e) ? 'backspace-word' : null;
    case 89:
      // Y
      if (isCtrlKeyCommand(e)) {
        return isWindows ? 'redo' : 'secondary-paste';
      }
      return null;
    case 90:
      // Z
      return getZCommand(e) || null;
    case Keys.RETURN:
      return 'split-block';
    case Keys.DELETE:
      return getDeleteCommand(e);
    case Keys.BACKSPACE:
      return getBackspaceCommand(e);
    // LEFT/RIGHT handlers serve as a workaround for a Firefox bug.
    case Keys.LEFT:
      return shouldFixFirefoxMovement && hasCommandModifier(e) ? 'move-selection-to-start-of-block' : null;
    case Keys.RIGHT:
      return shouldFixFirefoxMovement && hasCommandModifier(e) ? 'move-selection-to-end-of-block' : null;
    default:
      return null;
  }
}

module.exports = getDefaultKeyBinding;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getDraftEditorSelectionWithNodes
 * @typechecks
 * 
 */



var findAncestorOffsetKey = __webpack_require__(51);
var getSelectionOffsetKeyForNode = __webpack_require__(91);
var getUpdatedSelectionState = __webpack_require__(93);
var invariant = __webpack_require__(0);
var nullthrows = __webpack_require__(4);

/**
 * Convert the current selection range to an anchor/focus pair of offset keys
 * and values that can be interpreted by components.
 */
function getDraftEditorSelectionWithNodes(editorState, root, anchorNode, anchorOffset, focusNode, focusOffset) {
  var anchorIsTextNode = anchorNode.nodeType === Node.TEXT_NODE;
  var focusIsTextNode = focusNode.nodeType === Node.TEXT_NODE;

  // If the selection range lies only on text nodes, the task is simple.
  // Find the nearest offset-aware elements and use the
  // offset values supplied by the selection range.
  if (anchorIsTextNode && focusIsTextNode) {
    return {
      selectionState: getUpdatedSelectionState(editorState, nullthrows(findAncestorOffsetKey(anchorNode)), anchorOffset, nullthrows(findAncestorOffsetKey(focusNode)), focusOffset),
      needsRecovery: false
    };
  }

  var anchorPoint = null;
  var focusPoint = null;
  var needsRecovery = true;

  // An element is selected. Convert this selection range into leaf offset
  // keys and offset values for consumption at the component level. This
  // is common in Firefox, where select-all and triple click behavior leads
  // to entire elements being selected.
  //
  // Note that we use the `needsRecovery` parameter in the callback here. This
  // is because when certain elements are selected, the behavior for subsequent
  // cursor movement (e.g. via arrow keys) is uncertain and may not match
  // expectations at the component level. For example, if an entire <div> is
  // selected and the user presses the right arrow, Firefox keeps the selection
  // on the <div>. If we allow subsequent keypresses to insert characters
  // natively, they will be inserted into a browser-created text node to the
  // right of that <div>. This is obviously undesirable.
  //
  // With the `needsRecovery` flag, we inform the caller that it is responsible
  // for manually setting the selection state on the rendered document to
  // ensure proper selection state maintenance.

  if (anchorIsTextNode) {
    anchorPoint = {
      key: nullthrows(findAncestorOffsetKey(anchorNode)),
      offset: anchorOffset
    };
    focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);
  } else if (focusIsTextNode) {
    focusPoint = {
      key: nullthrows(findAncestorOffsetKey(focusNode)),
      offset: focusOffset
    };
    anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
  } else {
    anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
    focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);

    // If the selection is collapsed on an empty block, don't force recovery.
    // This way, on arrow key selection changes, the browser can move the
    // cursor from a non-zero offset on one block, through empty blocks,
    // to a matching non-zero offset on other text blocks.
    if (anchorNode === focusNode && anchorOffset === focusOffset) {
      needsRecovery = !!anchorNode.firstChild && anchorNode.firstChild.nodeName !== 'BR';
    }
  }

  return {
    selectionState: getUpdatedSelectionState(editorState, anchorPoint.key, anchorPoint.offset, focusPoint.key, focusPoint.offset),
    needsRecovery: needsRecovery
  };
}

/**
 * Identify the first leaf descendant for the given node.
 */
function getFirstLeaf(node) {
  while (node.firstChild && getSelectionOffsetKeyForNode(node.firstChild)) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Identify the last leaf descendant for the given node.
 */
function getLastLeaf(node) {
  while (node.lastChild && getSelectionOffsetKeyForNode(node.lastChild)) {
    node = node.lastChild;
  }
  return node;
}

function getPointForNonTextNode(editorRoot, startNode, childOffset) {
  var node = startNode;
  var offsetKey = findAncestorOffsetKey(node);

  !(offsetKey != null || editorRoot && (editorRoot === node || editorRoot.firstChild === node)) ?  false ? invariant(false, 'Unknown node in selection range.') : invariant(false) : void 0;

  // If the editorRoot is the selection, step downward into the content
  // wrapper.
  if (editorRoot === node) {
    node = node.firstChild;
    !(node instanceof Element && node.getAttribute('data-contents') === 'true') ?  false ? invariant(false, 'Invalid DraftEditorContents structure.') : invariant(false) : void 0;
    if (childOffset > 0) {
      childOffset = node.childNodes.length;
    }
  }

  // If the child offset is zero and we have an offset key, we're done.
  // If there's no offset key because the entire editor is selected,
  // find the leftmost ("first") leaf in the tree and use that as the offset
  // key.
  if (childOffset === 0) {
    var key = null;
    if (offsetKey != null) {
      key = offsetKey;
    } else {
      var firstLeaf = getFirstLeaf(node);
      key = nullthrows(getSelectionOffsetKeyForNode(firstLeaf));
    }
    return { key: key, offset: 0 };
  }

  var nodeBeforeCursor = node.childNodes[childOffset - 1];
  var leafKey = null;
  var textLength = null;

  if (!getSelectionOffsetKeyForNode(nodeBeforeCursor)) {
    // Our target node may be a leaf or a text node, in which case we're
    // already where we want to be and can just use the child's length as
    // our offset.
    leafKey = nullthrows(offsetKey);
    textLength = getTextContentLength(nodeBeforeCursor);
  } else {
    // Otherwise, we'll look at the child to the left of the cursor and find
    // the last leaf node in its subtree.
    var lastLeaf = getLastLeaf(nodeBeforeCursor);
    leafKey = nullthrows(getSelectionOffsetKeyForNode(lastLeaf));
    textLength = getTextContentLength(lastLeaf);
  }

  return {
    key: leafKey,
    offset: textLength
  };
}

/**
 * Return the length of a node's textContent, regarding single newline
 * characters as zero-length. This allows us to avoid problems with identifying
 * the correct selection offset for empty blocks in IE, in which we
 * render newlines instead of break tags.
 */
function getTextContentLength(node) {
  var textContent = node.textContent;
  return textContent === '\n' ? 0 : textContent.length;
}

module.exports = getDraftEditorSelectionWithNodes;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getFragmentFromSelection
 * 
 */



var getContentStateFragment = __webpack_require__(37);

function getFragmentFromSelection(editorState) {
  var selectionState = editorState.getSelection();

  if (selectionState.isCollapsed()) {
    return null;
  }

  return getContentStateFragment(editorState.getCurrentContent(), selectionState);
}

module.exports = getFragmentFromSelection;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getRangeClientRects
 * @typechecks
 * 
 */



var UserAgent = __webpack_require__(5);

var invariant = __webpack_require__(0);

var isChrome = UserAgent.isBrowser('Chrome');

// In Chrome, the client rects will include the entire bounds of all nodes that
// begin (have a start tag) within the selection, even if the selection does
// not overlap the entire node. To resolve this, we split the range at each
// start tag and join the client rects together.
// https://code.google.com/p/chromium/issues/detail?id=324437
/* eslint-disable consistent-return */
function getRangeClientRectsChrome(range) {
  var tempRange = range.cloneRange();
  var clientRects = [];

  for (var ancestor = range.endContainer; ancestor != null; ancestor = ancestor.parentNode) {
    // If we've climbed up to the common ancestor, we can now use the
    // original start point and stop climbing the tree.
    var atCommonAncestor = ancestor === range.commonAncestorContainer;
    if (atCommonAncestor) {
      tempRange.setStart(range.startContainer, range.startOffset);
    } else {
      tempRange.setStart(tempRange.endContainer, 0);
    }
    var rects = Array.from(tempRange.getClientRects());
    clientRects.push(rects);
    if (atCommonAncestor) {
      var _ref;

      clientRects.reverse();
      return (_ref = []).concat.apply(_ref, clientRects);
    }
    tempRange.setEndBefore(ancestor);
  }

   true ?  false ? invariant(false, 'Found an unexpected detached subtree when getting range client rects.') : invariant(false) : void 0;
}
/* eslint-enable consistent-return */

/**
 * Like range.getClientRects() but normalizes for browser bugs.
 */
var getRangeClientRects = isChrome ? getRangeClientRectsChrome : function (range) {
  return Array.from(range.getClientRects());
};

module.exports = getRangeClientRects;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getSafeBodyFromHTML
 * 
 */



var UserAgent = __webpack_require__(5);

var invariant = __webpack_require__(0);

var isOldIE = UserAgent.isBrowser('IE <= 9');

// Provides a dom node that will not execute scripts
// https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation.createHTMLDocument
// https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM

function getSafeBodyFromHTML(html) {
  var doc;
  var root = null;
  // Provides a safe context
  if (!isOldIE && document.implementation && document.implementation.createHTMLDocument) {
    doc = document.implementation.createHTMLDocument('foo');
    !doc.documentElement ?  false ? invariant(false, 'Missing doc.documentElement') : invariant(false) : void 0;
    doc.documentElement.innerHTML = html;
    root = doc.getElementsByTagName('body')[0];
  }
  return root;
}

module.exports = getSafeBodyFromHTML;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getSelectionOffsetKeyForNode
 * @typechecks
 * 
 */



/**
 * Get offset key from a node or it's child nodes. Return the first offset key
 * found on the DOM tree of given node.
 */

function getSelectionOffsetKeyForNode(node) {
  if (node instanceof Element) {
    var offsetKey = node.getAttribute('data-offset-key');
    if (offsetKey) {
      return offsetKey;
    }
    for (var ii = 0; ii < node.childNodes.length; ii++) {
      var childOffsetKey = getSelectionOffsetKeyForNode(node.childNodes[ii]);
      if (childOffsetKey) {
        return childOffsetKey;
      }
    }
  }
  return null;
}

module.exports = getSelectionOffsetKeyForNode;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getTextContentFromFiles
 * 
 */



var invariant = __webpack_require__(0);

var TEXT_CLIPPING_REGEX = /\.textClipping$/;

var TEXT_TYPES = {
  'text/plain': true,
  'text/html': true,
  'text/rtf': true
};

// Somewhat arbitrary upper bound on text size. Let's not lock up the browser.
var TEXT_SIZE_UPPER_BOUND = 5000;

/**
 * Extract the text content from a file list.
 */
function getTextContentFromFiles(files, callback) {
  var readCount = 0;
  var results = [];
  files.forEach(function ( /*blob*/file) {
    readFile(file, function ( /*string*/text) {
      readCount++;
      text && results.push(text.slice(0, TEXT_SIZE_UPPER_BOUND));
      if (readCount == files.length) {
        callback(results.join('\r'));
      }
    });
  });
}

/**
 * todo isaac: Do work to turn html/rtf into a content fragment.
 */
function readFile(file, callback) {
  if (!global.FileReader || file.type && !(file.type in TEXT_TYPES)) {
    callback('');
    return;
  }

  if (file.type === '') {
    var contents = '';
    // Special-case text clippings, which have an empty type but include
    // `.textClipping` in the file name. `readAsText` results in an empty
    // string for text clippings, so we force the file name to serve
    // as the text value for the file.
    if (TEXT_CLIPPING_REGEX.test(file.name)) {
      contents = file.name.replace(TEXT_CLIPPING_REGEX, '');
    }
    callback(contents);
    return;
  }

  var reader = new FileReader();
  reader.onload = function () {
    var result = reader.result;
    !(typeof result === 'string') ?  false ? invariant(false, 'We should be calling "FileReader.readAsText" which returns a string') : invariant(false) : void 0;
    callback(result);
  };
  reader.onerror = function () {
    callback('');
  };
  reader.readAsText(file);
}

module.exports = getTextContentFromFiles;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getUpdatedSelectionState
 * 
 */



var DraftOffsetKey = __webpack_require__(35);

var nullthrows = __webpack_require__(4);

function getUpdatedSelectionState(editorState, anchorKey, anchorOffset, focusKey, focusOffset) {
  var selection = nullthrows(editorState.getSelection());
  if (false) {
    if (!anchorKey || !focusKey) {
      /*eslint-disable no-console */
      console.warn('Invalid selection state.', arguments, editorState.toJS());
      /*eslint-enable no-console */
      return selection;
    }
  }

  var anchorPath = DraftOffsetKey.decode(anchorKey);
  var anchorBlockKey = anchorPath.blockKey;
  var anchorLeaf = editorState.getBlockTree(anchorBlockKey).getIn([anchorPath.decoratorKey, 'leaves', anchorPath.leafKey]);

  var focusPath = DraftOffsetKey.decode(focusKey);
  var focusBlockKey = focusPath.blockKey;
  var focusLeaf = editorState.getBlockTree(focusBlockKey).getIn([focusPath.decoratorKey, 'leaves', focusPath.leafKey]);

  var anchorLeafStart = anchorLeaf.get('start');
  var focusLeafStart = focusLeaf.get('start');

  var anchorBlockOffset = anchorLeaf ? anchorLeafStart + anchorOffset : null;
  var focusBlockOffset = focusLeaf ? focusLeafStart + focusOffset : null;

  var areEqual = selection.getAnchorKey() === anchorBlockKey && selection.getAnchorOffset() === anchorBlockOffset && selection.getFocusKey() === focusBlockKey && selection.getFocusOffset() === focusBlockOffset;

  if (areEqual) {
    return selection;
  }

  var isBackward = false;
  if (anchorBlockKey === focusBlockKey) {
    var anchorLeafEnd = anchorLeaf.get('end');
    var focusLeafEnd = focusLeaf.get('end');
    if (focusLeafStart === anchorLeafStart && focusLeafEnd === anchorLeafEnd) {
      isBackward = focusOffset < anchorOffset;
    } else {
      isBackward = focusLeafStart < anchorLeafStart;
    }
  } else {
    var startKey = editorState.getCurrentContent().getBlockMap().keySeq().skipUntil(function (v) {
      return v === anchorBlockKey || v === focusBlockKey;
    }).first();
    isBackward = startKey === focusBlockKey;
  }

  return selection.merge({
    anchorKey: anchorBlockKey,
    anchorOffset: anchorBlockOffset,
    focusKey: focusBlockKey,
    focusOffset: focusBlockOffset,
    isBackward: isBackward
  });
}

module.exports = getUpdatedSelectionState;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule insertIntoList
 * 
 */



/**
 * Maintain persistence for target list when appending and prepending.
 */
function insertIntoList(targetList, toInsert, offset) {
  if (offset === targetList.count()) {
    toInsert.forEach(function (c) {
      targetList = targetList.push(c);
    });
  } else if (offset === 0) {
    toInsert.reverse().forEach(function (c) {
      targetList = targetList.unshift(c);
    });
  } else {
    var head = targetList.slice(0, offset);
    var tail = targetList.slice(offset);
    targetList = head.concat(toInsert, tail).toList();
  }
  return targetList;
}

module.exports = insertIntoList;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isSelectionAtLeafStart
 * @typechecks
 * 
 */



function isSelectionAtLeafStart(editorState) {
  var selection = editorState.getSelection();
  var anchorKey = selection.getAnchorKey();
  var blockTree = editorState.getBlockTree(anchorKey);
  var offset = selection.getStartOffset();

  var isAtStart = false;

  blockTree.some(function (leafSet) {
    if (offset === leafSet.get('start')) {
      isAtStart = true;
      return true;
    }

    if (offset < leafSet.get('end')) {
      return leafSet.get('leaves').some(function (leaf) {
        var leafStart = leaf.get('start');
        if (offset === leafStart) {
          isAtStart = true;
          return true;
        }

        return false;
      });
    }

    return false;
  });

  return isAtStart;
}

module.exports = isSelectionAtLeafStart;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule moveSelectionForward
 * 
 */



/**
 * Given a collapsed selection, move the focus `maxDistance` forward within
 * the selected block. If the selection will go beyond the end of the block,
 * move focus to the start of the next block, but no further.
 *
 * This function is not Unicode-aware, so surrogate pairs will be treated
 * as having length 2.
 */
function moveSelectionForward(editorState, maxDistance) {
  var selection = editorState.getSelection();
  var key = selection.getStartKey();
  var offset = selection.getStartOffset();
  var content = editorState.getCurrentContent();

  var focusKey = key;
  var focusOffset;

  var block = content.getBlockForKey(key);

  if (maxDistance > block.getText().length - offset) {
    focusKey = content.getKeyAfter(key);
    focusOffset = 0;
  } else {
    focusOffset = offset + maxDistance;
  }

  return selection.merge({ focusKey: focusKey, focusOffset: focusOffset });
}

module.exports = moveSelectionForward;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule removeEntitiesAtEdges
 * 
 */



var CharacterMetadata = __webpack_require__(13);

var findRangesImmutable = __webpack_require__(36);
var invariant = __webpack_require__(0);

function removeEntitiesAtEdges(contentState, selectionState) {
  var blockMap = contentState.getBlockMap();
  var entityMap = contentState.getEntityMap();

  var updatedBlocks = {};

  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var startBlock = blockMap.get(startKey);
  var updatedStart = removeForBlock(entityMap, startBlock, startOffset);

  if (updatedStart !== startBlock) {
    updatedBlocks[startKey] = updatedStart;
  }

  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();
  var endBlock = blockMap.get(endKey);
  if (startKey === endKey) {
    endBlock = updatedStart;
  }

  var updatedEnd = removeForBlock(entityMap, endBlock, endOffset);

  if (updatedEnd !== endBlock) {
    updatedBlocks[endKey] = updatedEnd;
  }

  if (!Object.keys(updatedBlocks).length) {
    return contentState.set('selectionAfter', selectionState);
  }

  return contentState.merge({
    blockMap: blockMap.merge(updatedBlocks),
    selectionAfter: selectionState
  });
}

function getRemovalRange(characters, key, offset) {
  var removalRange;
  findRangesImmutable(characters, function (a, b) {
    return a.getEntity() === b.getEntity();
  }, function (element) {
    return element.getEntity() === key;
  }, function (start, end) {
    if (start <= offset && end >= offset) {
      removalRange = { start: start, end: end };
    }
  });
  !(typeof removalRange === 'object') ?  false ? invariant(false, 'Removal range must exist within character list.') : invariant(false) : void 0;
  return removalRange;
}

function removeForBlock(entityMap, block, offset) {
  var chars = block.getCharacterList();
  var charBefore = offset > 0 ? chars.get(offset - 1) : undefined;
  var charAfter = offset < chars.count() ? chars.get(offset) : undefined;
  var entityBeforeCursor = charBefore ? charBefore.getEntity() : undefined;
  var entityAfterCursor = charAfter ? charAfter.getEntity() : undefined;

  if (entityAfterCursor && entityAfterCursor === entityBeforeCursor) {
    var entity = entityMap.__get(entityAfterCursor);
    if (entity.getMutability() !== 'MUTABLE') {
      var _getRemovalRange = getRemovalRange(chars, entityAfterCursor, offset),
          start = _getRemovalRange.start,
          end = _getRemovalRange.end;

      var current;
      while (start < end) {
        current = chars.get(start);
        chars = chars.set(start, CharacterMetadata.applyEntity(current, null));
        start++;
      }
      return block.set('characterList', chars);
    }
  }

  return block;
}

module.exports = removeEntitiesAtEdges;

/***/ }),
/* 98 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * @stub
 * 
 */



// \u00a1-\u00b1\u00b4-\u00b8\u00ba\u00bb\u00bf
//             is latin supplement punctuation except fractions and superscript
//             numbers
// \u2010-\u2027\u2030-\u205e
//             is punctuation from the general punctuation block:
//             weird quotes, commas, bullets, dashes, etc.
// \u30fb\u3001\u3002\u3008-\u3011\u3014-\u301f
//             is CJK punctuation
// \uff1a-\uff1f\uff01-\uff0f\uff3b-\uff40\uff5b-\uff65
//             is some full-width/half-width punctuation
// \u2E2E\u061f\u066a-\u066c\u061b\u060c\u060d\uFD3e\uFD3F
//             is some Arabic punctuation marks
// \u1801\u0964\u104a\u104b
//             is misc. other language punctuation marks

var PUNCTUATION = '[.,+*?$|#{}()\'\\^\\-\\[\\]\\\\\\/!@%"~=<>_:;' + '\u30FB\u3001\u3002\u3008-\u3011\u3014-\u301F\uFF1A-\uFF1F\uFF01-\uFF0F' + '\uFF3B-\uFF40\uFF5B-\uFF65\u2E2E\u061F\u066A-\u066C\u061B\u060C\u060D' + '\uFD3E\uFD3F\u1801\u0964\u104A\u104B\u2010-\u2027\u2030-\u205E' + '\xA1-\xB1\xB4-\xB8\xBA\xBB\xBF]';

module.exports = {
  getPunctuation: function getPunctuation() {
    return PUNCTUATION;
  }
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URI = function () {
  function URI(uri) {
    _classCallCheck(this, URI);

    this._uri = uri;
  }

  URI.prototype.toString = function toString() {
    return this._uri;
  };

  return URI;
}();

module.exports = URI;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/**
 * Stateful API for text direction detection
 *
 * This class can be used in applications where you need to detect the
 * direction of a sequence of text blocks, where each direction shall be used
 * as the fallback direction for the next one.
 *
 * NOTE: A default direction, if not provided, is set based on the global
 *       direction, as defined by `UnicodeBidiDirection`.
 *
 * == Example ==
 * ```
 * var UnicodeBidiService = require('UnicodeBidiService');
 *
 * var bidiService = new UnicodeBidiService();
 *
 * ...
 *
 * bidiService.reset();
 * for (var para in paragraphs) {
 *   var dir = bidiService.getDirection(para);
 *   ...
 * }
 * ```
 *
 * Part of our implementation of Unicode Bidirectional Algorithm (UBA)
 * Unicode Standard Annex #9 (UAX9)
 * http://www.unicode.org/reports/tr9/
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UnicodeBidi = __webpack_require__(62);
var UnicodeBidiDirection = __webpack_require__(42);

var invariant = __webpack_require__(0);

var UnicodeBidiService = function () {

  /**
   * Stateful class for paragraph direction detection
   *
   * @param defaultDir  Default direction of the service
   */
  function UnicodeBidiService(defaultDir) {
    _classCallCheck(this, UnicodeBidiService);

    if (!defaultDir) {
      defaultDir = UnicodeBidiDirection.getGlobalDir();
    } else {
      !UnicodeBidiDirection.isStrong(defaultDir) ?  false ? invariant(false, 'Default direction must be a strong direction (LTR or RTL)') : invariant(false) : void 0;
    }
    this._defaultDir = defaultDir;
    this.reset();
  }

  /**
   * Reset the internal state
   *
   * Instead of creating a new instance, you can just reset() your instance
   * everytime you start a new loop.
   */


  UnicodeBidiService.prototype.reset = function reset() {
    this._lastDir = this._defaultDir;
  };

  /**
   * Returns the direction of a block of text, and remembers it as the
   * fall-back direction for the next paragraph.
   *
   * @param str  A text block, e.g. paragraph, table cell, tag
   * @return     The resolved direction
   */


  UnicodeBidiService.prototype.getDirection = function getDirection(str) {
    this._lastDir = UnicodeBidi.getDirection(str, this._lastDir);
    return this._lastDir;
  };

  return UnicodeBidiService;
}();

module.exports = UnicodeBidiService;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var getElementRect = __webpack_require__(232);

/**
 * Gets an element's position in pixels relative to the viewport. The returned
 * object represents the position of the element's top left corner.
 *
 * @param {DOMElement} element
 * @return {object}
 */
function getElementPosition(element) {
  var rect = getElementRect(element);
  return {
    x: rect.left,
    y: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
}

module.exports = getElementPosition;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getViewportWidth() {
  var width = void 0;
  if (document.documentElement) {
    width = document.documentElement.clientWidth;
  }

  if (!width && document.body) {
    width = document.body.clientWidth;
  }

  return width || 0;
} /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   * @typechecks
   */

function getViewportHeight() {
  var height = void 0;
  if (document.documentElement) {
    height = document.documentElement.clientHeight;
  }

  if (!height && document.body) {
    height = document.body.clientHeight;
  }

  return height || 0;
}

/**
 * Gets the viewport dimensions including any scrollbars.
 */
function getViewportDimensions() {
  return {
    width: window.innerWidth || getViewportWidth(),
    height: window.innerHeight || getViewportHeight()
  };
}

/**
 * Gets the viewport dimensions excluding any scrollbars.
 */
getViewportDimensions.withoutScrollbars = function () {
  return {
    width: getViewportWidth(),
    height: getViewportHeight()
  };
};

module.exports = getViewportDimensions;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks static-only
 */



/**
 * Combines multiple className strings into one.
 * http://jsperf.com/joinclasses-args-vs-array
 *
 * @param {...?string} className
 * @return {string}
 */

function joinClasses(className /*, ... */) {
  if (!className) {
    className = '';
  }
  var nextClass = void 0;
  var argLength = arguments.length;
  if (argLength > 1) {
    for (var ii = 1; ii < argLength; ii++) {
      nextClass = arguments[ii];
      if (nextClass) {
        className = (className ? className + ' ' : '') + nextClass;
      }
    }
  }
  return className;
}

module.exports = joinClasses;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @typechecks static-only
 */



/**
 * Memoizes the return value of a function that accepts one string argument.
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

module.exports = memoizeStringOnly;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



// setimmediate adds setImmediate to the global. We want to make sure we export
// the actual function.

__webpack_require__(241);
module.exports = global.setImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 119 */,
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(12);
var bind = __webpack_require__(70);
var Axios = __webpack_require__(122);
var defaults = __webpack_require__(43);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(67);
axios.CancelToken = __webpack_require__(121);
axios.isCancel = __webpack_require__(68);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(136);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(67);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(43);
var utils = __webpack_require__(12);
var InterceptorManager = __webpack_require__(123);
var dispatchRequest = __webpack_require__(124);
var isAbsoluteURL = __webpack_require__(132);
var combineURLs = __webpack_require__(130);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(12);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(12);
var transformData = __webpack_require__(127);
var isCancel = __webpack_require__(68);
var defaults = __webpack_require__(43);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(69);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(12);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(12);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(12);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(12);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(12);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(12);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AtomicBlockUtils
 * @typechecks
 * 
 */



var BlockMapBuilder = __webpack_require__(25);
var CharacterMetadata = __webpack_require__(13);
var ContentBlock = __webpack_require__(18);
var DraftModifier = __webpack_require__(6);
var EditorState = __webpack_require__(1);
var Immutable = __webpack_require__(2);
var SelectionState = __webpack_require__(26);

var generateRandomKey = __webpack_require__(15);
var moveBlockInContentState = __webpack_require__(218);

var List = Immutable.List,
    Repeat = Immutable.Repeat;


var AtomicBlockUtils = {
  insertAtomicBlock: function insertAtomicBlock(editorState, entityKey, character) {
    var contentState = editorState.getCurrentContent();
    var selectionState = editorState.getSelection();

    var afterRemoval = DraftModifier.removeRange(contentState, selectionState, 'backward');

    var targetSelection = afterRemoval.getSelectionAfter();
    var afterSplit = DraftModifier.splitBlock(afterRemoval, targetSelection);
    var insertionTarget = afterSplit.getSelectionAfter();

    var asAtomicBlock = DraftModifier.setBlockType(afterSplit, insertionTarget, 'atomic');

    var charData = CharacterMetadata.create({ entity: entityKey });

    var fragmentArray = [new ContentBlock({
      key: generateRandomKey(),
      type: 'atomic',
      text: character,
      characterList: List(Repeat(charData, character.length))
    }), new ContentBlock({
      key: generateRandomKey(),
      type: 'unstyled',
      text: '',
      characterList: List()
    })];

    var fragment = BlockMapBuilder.createFromArray(fragmentArray);

    var withAtomicBlock = DraftModifier.replaceWithFragment(asAtomicBlock, insertionTarget, fragment);

    var newContent = withAtomicBlock.merge({
      selectionBefore: selectionState,
      selectionAfter: withAtomicBlock.getSelectionAfter().set('hasFocus', true)
    });

    return EditorState.push(editorState, newContent, 'insert-fragment');
  },

  moveAtomicBlock: function moveAtomicBlock(editorState, atomicBlock, targetRange, insertionMode) {
    var contentState = editorState.getCurrentContent();
    var selectionState = editorState.getSelection();

    var withMovedAtomicBlock = void 0;

    if (insertionMode === 'before' || insertionMode === 'after') {
      var targetBlock = contentState.getBlockForKey(insertionMode === 'before' ? targetRange.getStartKey() : targetRange.getEndKey());

      withMovedAtomicBlock = moveBlockInContentState(contentState, atomicBlock, targetBlock, insertionMode);
    } else {
      var afterRemoval = DraftModifier.removeRange(contentState, targetRange, 'backward');

      var selectionAfterRemoval = afterRemoval.getSelectionAfter();
      var _targetBlock = afterRemoval.getBlockForKey(selectionAfterRemoval.getFocusKey());

      if (selectionAfterRemoval.getStartOffset() === 0) {
        withMovedAtomicBlock = moveBlockInContentState(afterRemoval, atomicBlock, _targetBlock, 'before');
      } else if (selectionAfterRemoval.getEndOffset() === _targetBlock.getLength()) {
        withMovedAtomicBlock = moveBlockInContentState(afterRemoval, atomicBlock, _targetBlock, 'after');
      } else {
        var afterSplit = DraftModifier.splitBlock(afterRemoval, selectionAfterRemoval);

        var selectionAfterSplit = afterSplit.getSelectionAfter();
        var _targetBlock2 = afterSplit.getBlockForKey(selectionAfterSplit.getFocusKey());

        withMovedAtomicBlock = moveBlockInContentState(afterSplit, atomicBlock, _targetBlock2, 'before');
      }
    }

    var newContent = withMovedAtomicBlock.merge({
      selectionBefore: selectionState,
      selectionAfter: withMovedAtomicBlock.getSelectionAfter().set('hasFocus', true)
    });

    return EditorState.push(editorState, newContent, 'move-block');
  }
};

module.exports = AtomicBlockUtils;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CompositeDraftDecorator
 * @typechecks
 * 
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Immutable = __webpack_require__(2);

var List = Immutable.List;


var DELIMITER = '.';

/**
 * A CompositeDraftDecorator traverses through a list of DraftDecorator
 * instances to identify sections of a ContentBlock that should be rendered
 * in a "decorated" manner. For example, hashtags, mentions, and links may
 * be intended to stand out visually, be rendered as anchors, etc.
 *
 * The list of decorators supplied to the constructor will be used in the
 * order they are provided. This allows the caller to specify a priority for
 * string matching, in case of match collisions among decorators.
 *
 * For instance, I may have a link with a `#` in its text. Though this section
 * of text may match our hashtag decorator, it should not be treated as a
 * hashtag. I should therefore list my link DraftDecorator
 * before my hashtag DraftDecorator when constructing this composite
 * decorator instance.
 *
 * Thus, when a collision like this is encountered, the earlier match is
 * preserved and the new match is discarded.
 */

var CompositeDraftDecorator = function () {
  function CompositeDraftDecorator(decorators) {
    _classCallCheck(this, CompositeDraftDecorator);

    // Copy the decorator array, since we use this array order to determine
    // precedence of decoration matching. If the array is mutated externally,
    // we don't want to be affected here.
    this._decorators = decorators.slice();
  }

  CompositeDraftDecorator.prototype.getDecorations = function getDecorations(block, contentState) {
    var decorations = Array(block.getText().length).fill(null);

    this._decorators.forEach(function ( /*object*/decorator, /*number*/ii) {
      var counter = 0;
      var strategy = decorator.strategy;
      var callback = function callback( /*number*/start, /*number*/end) {
        // Find out if any of our matching range is already occupied
        // by another decorator. If so, discard the match. Otherwise, store
        // the component key for rendering.
        if (canOccupySlice(decorations, start, end)) {
          occupySlice(decorations, start, end, ii + DELIMITER + counter);
          counter++;
        }
      };
      strategy(block, callback, contentState);
    });

    return List(decorations);
  };

  CompositeDraftDecorator.prototype.getComponentForKey = function getComponentForKey(key) {
    var componentKey = parseInt(key.split(DELIMITER)[0], 10);
    return this._decorators[componentKey].component;
  };

  CompositeDraftDecorator.prototype.getPropsForKey = function getPropsForKey(key) {
    var componentKey = parseInt(key.split(DELIMITER)[0], 10);
    return this._decorators[componentKey].props;
  };

  return CompositeDraftDecorator;
}();

/**
 * Determine whether we can occupy the specified slice of the decorations
 * array.
 */


function canOccupySlice(decorations, start, end) {
  for (var ii = start; ii < end; ii++) {
    if (decorations[ii] != null) {
      return false;
    }
  }
  return true;
}

/**
 * Splice the specified component into our decoration array at the desired
 * range.
 */
function occupySlice(targetArr, start, end, componentKey) {
  for (var ii = start; ii < end; ii++) {
    targetArr[ii] = componentKey;
  }
}

module.exports = CompositeDraftDecorator;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ContentStateInlineStyle
 * @typechecks
 * 
 */



var CharacterMetadata = __webpack_require__(13);

var _require = __webpack_require__(2),
    Map = _require.Map;

var ContentStateInlineStyle = {
  add: function add(contentState, selectionState, inlineStyle) {
    return modifyInlineStyle(contentState, selectionState, inlineStyle, true);
  },

  remove: function remove(contentState, selectionState, inlineStyle) {
    return modifyInlineStyle(contentState, selectionState, inlineStyle, false);
  }
};

function modifyInlineStyle(contentState, selectionState, inlineStyle, addOrRemove) {
  var blockMap = contentState.getBlockMap();
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  var newBlocks = blockMap.skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).concat(Map([[endKey, blockMap.get(endKey)]])).map(function (block, blockKey) {
    var sliceStart;
    var sliceEnd;

    if (startKey === endKey) {
      sliceStart = startOffset;
      sliceEnd = endOffset;
    } else {
      sliceStart = blockKey === startKey ? startOffset : 0;
      sliceEnd = blockKey === endKey ? endOffset : block.getLength();
    }

    var chars = block.getCharacterList();
    var current;
    while (sliceStart < sliceEnd) {
      current = chars.get(sliceStart);
      chars = chars.set(sliceStart, addOrRemove ? CharacterMetadata.applyStyle(current, inlineStyle) : CharacterMetadata.removeStyle(current, inlineStyle));
      sliceStart++;
    }

    return block.set('characterList', chars);
  });

  return contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

module.exports = ContentStateInlineStyle;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditor.react
 * @typechecks
 * 
 * @preventMunge
 */



var _assign = __webpack_require__(10);

var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultDraftBlockRenderMap = __webpack_require__(49);
var DefaultDraftInlineStyle = __webpack_require__(78);
var DraftEditorCompositionHandler = __webpack_require__(164);
var DraftEditorContents = __webpack_require__(165);
var DraftEditorDragHandler = __webpack_require__(166);
var DraftEditorEditHandler = __webpack_require__(167);
var DraftEditorPlaceholder = __webpack_require__(169);
var EditorState = __webpack_require__(1);
var React = __webpack_require__(3);
var ReactDOM = __webpack_require__(8);
var Scroll = __webpack_require__(56);
var Style = __webpack_require__(31);
var UserAgent = __webpack_require__(5);

var cx = __webpack_require__(17);
var emptyFunction = __webpack_require__(19);
var generateRandomKey = __webpack_require__(15);
var getDefaultKeyBinding = __webpack_require__(86);
var getScrollPosition = __webpack_require__(32);
var invariant = __webpack_require__(0);
var nullthrows = __webpack_require__(4);

var isIE = UserAgent.isBrowser('IE');

// IE does not support the `input` event on contentEditable, so we can't
// observe spellcheck behavior.
var allowSpellCheck = !isIE;

// Define a set of handler objects to correspond to each possible `mode`
// of editor behavior.
var handlerMap = {
  'edit': DraftEditorEditHandler,
  'composite': DraftEditorCompositionHandler,
  'drag': DraftEditorDragHandler,
  'cut': null,
  'render': null
};

/**
 * `DraftEditor` is the root editor component. It composes a `contentEditable`
 * div, and provides a wide variety of useful function props for managing the
 * state of the editor. See `DraftEditorProps` for details.
 */
var DraftEditor = function (_React$Component) {
  _inherits(DraftEditor, _React$Component);

  function DraftEditor(props) {
    _classCallCheck(this, DraftEditor);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this._blockSelectEvents = false;
    _this._clipboard = null;
    _this._handler = null;
    _this._dragCount = 0;
    _this._editorKey = props.editorKey || generateRandomKey();
    _this._placeholderAccessibilityID = 'placeholder-' + _this._editorKey;
    _this._latestEditorState = props.editorState;
    _this._latestCommittedEditorState = props.editorState;

    _this._onBeforeInput = _this._buildHandler('onBeforeInput');
    _this._onBlur = _this._buildHandler('onBlur');
    _this._onCharacterData = _this._buildHandler('onCharacterData');
    _this._onCompositionEnd = _this._buildHandler('onCompositionEnd');
    _this._onCompositionStart = _this._buildHandler('onCompositionStart');
    _this._onCopy = _this._buildHandler('onCopy');
    _this._onCut = _this._buildHandler('onCut');
    _this._onDragEnd = _this._buildHandler('onDragEnd');
    _this._onDragOver = _this._buildHandler('onDragOver');
    _this._onDragStart = _this._buildHandler('onDragStart');
    _this._onDrop = _this._buildHandler('onDrop');
    _this._onInput = _this._buildHandler('onInput');
    _this._onFocus = _this._buildHandler('onFocus');
    _this._onKeyDown = _this._buildHandler('onKeyDown');
    _this._onKeyPress = _this._buildHandler('onKeyPress');
    _this._onKeyUp = _this._buildHandler('onKeyUp');
    _this._onMouseDown = _this._buildHandler('onMouseDown');
    _this._onMouseUp = _this._buildHandler('onMouseUp');
    _this._onPaste = _this._buildHandler('onPaste');
    _this._onSelect = _this._buildHandler('onSelect');

    // Manual binding for public and internal methods.
    _this.focus = _this._focus.bind(_this);
    _this.blur = _this._blur.bind(_this);
    _this.setMode = _this._setMode.bind(_this);
    _this.exitCurrentMode = _this._exitCurrentMode.bind(_this);
    _this.restoreEditorDOM = _this._restoreEditorDOM.bind(_this);
    _this.setClipboard = _this._setClipboard.bind(_this);
    _this.getClipboard = _this._getClipboard.bind(_this);
    _this.getEditorKey = function () {
      return _this._editorKey;
    };
    _this.update = _this._update.bind(_this);
    _this.onDragEnter = _this._onDragEnter.bind(_this);
    _this.onDragLeave = _this._onDragLeave.bind(_this);

    // See `_restoreEditorDOM()`.
    _this.state = { contentsKey: 0 };
    return _this;
  }

  /**
   * Build a method that will pass the event to the specified handler method.
   * This allows us to look up the correct handler function for the current
   * editor mode, if any has been specified.
   */


  /**
   * Define proxies that can route events to the current handler.
   */


  DraftEditor.prototype._buildHandler = function _buildHandler(eventName) {
    var _this2 = this;

    return function (e) {
      if (!_this2.props.readOnly) {
        var method = _this2._handler && _this2._handler[eventName];
        method && method(_this2, e);
      }
    };
  };

  DraftEditor.prototype._showPlaceholder = function _showPlaceholder() {
    return !!this.props.placeholder && !this.props.editorState.isInCompositionMode() && !this.props.editorState.getCurrentContent().hasText();
  };

  DraftEditor.prototype._renderPlaceholder = function _renderPlaceholder() {
    if (this._showPlaceholder()) {
      return (
        /* $FlowFixMe(>=0.53.0 site=www,mobile) This comment suppresses an
         * error when upgrading Flow's support for React. Common errors found
         * when upgrading Flow's React support are documented at
         * https://fburl.com/eq7bs81w */
        React.createElement(DraftEditorPlaceholder, {
          text: nullthrows(this.props.placeholder),
          editorState: this.props.editorState,
          textAlignment: this.props.textAlignment,
          accessibilityID: this._placeholderAccessibilityID
        })
      );
    }
    return null;
  };

  DraftEditor.prototype.render = function render() {
    var _props = this.props,
        readOnly = _props.readOnly,
        textAlignment = _props.textAlignment;

    var rootClass = cx({
      'DraftEditor/root': true,
      'DraftEditor/alignLeft': textAlignment === 'left',
      'DraftEditor/alignRight': textAlignment === 'right',
      'DraftEditor/alignCenter': textAlignment === 'center'
    });

    var contentStyle = {
      outline: 'none',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word'
    };

    // The aria-expanded and aria-haspopup properties should only be rendered
    // for a combobox.
    var ariaRole = this.props.role || 'textbox';
    var ariaExpanded = ariaRole === 'combobox' ? !!this.props.ariaExpanded : null;

    return React.createElement(
      'div',
      { className: rootClass },
      this._renderPlaceholder(),
      React.createElement(
        'div',
        {
          className: cx('DraftEditor/editorContainer'),
          ref: 'editorContainer' },
        React.createElement(
          'div',
          {
            'aria-activedescendant': readOnly ? null : this.props.ariaActiveDescendantID,
            'aria-autocomplete': readOnly ? null : this.props.ariaAutoComplete,
            'aria-controls': readOnly ? null : this.props.ariaControls,
            'aria-describedby': this._showPlaceholder() ? this._placeholderAccessibilityID : null,
            'aria-expanded': readOnly ? null : ariaExpanded,
            'aria-label': this.props.ariaLabel,
            'aria-multiline': this.props.ariaMultiline,
            autoCapitalize: this.props.autoCapitalize,
            autoComplete: this.props.autoComplete,
            autoCorrect: this.props.autoCorrect,
            className: cx({
              // Chrome's built-in translation feature mutates the DOM in ways
              // that Draft doesn't expect (ex: adding <font> tags inside
              // DraftEditorLeaf spans) and causes problems. We add notranslate
              // here which makes its autotranslation skip over this subtree.
              'notranslate': !readOnly,
              'public/DraftEditor/content': true
            }),
            contentEditable: !readOnly,
            'data-testid': this.props.webDriverTestID,
            onBeforeInput: this._onBeforeInput,
            onBlur: this._onBlur,
            onCompositionEnd: this._onCompositionEnd,
            onCompositionStart: this._onCompositionStart,
            onCopy: this._onCopy,
            onCut: this._onCut,
            onDragEnd: this._onDragEnd,
            onDragEnter: this.onDragEnter,
            onDragLeave: this.onDragLeave,
            onDragOver: this._onDragOver,
            onDragStart: this._onDragStart,
            onDrop: this._onDrop,
            onFocus: this._onFocus,
            onInput: this._onInput,
            onKeyDown: this._onKeyDown,
            onKeyPress: this._onKeyPress,
            onKeyUp: this._onKeyUp,
            onMouseUp: this._onMouseUp,
            onPaste: this._onPaste,
            onSelect: this._onSelect,
            ref: 'editor',
            role: readOnly ? null : ariaRole,
            spellCheck: allowSpellCheck && this.props.spellCheck,
            style: contentStyle,
            suppressContentEditableWarning: true,
            tabIndex: this.props.tabIndex },
          React.createElement(DraftEditorContents, {
            blockRenderMap: this.props.blockRenderMap,
            blockRendererFn: this.props.blockRendererFn,
            blockStyleFn: this.props.blockStyleFn,
            customStyleMap: _extends({}, DefaultDraftInlineStyle, this.props.customStyleMap),
            customStyleFn: this.props.customStyleFn,
            editorKey: this._editorKey,
            editorState: this.props.editorState,
            key: 'contents' + this.state.contentsKey,
            textDirectionality: this.props.textDirectionality
          })
        )
      )
    );
  };

  DraftEditor.prototype.componentDidMount = function componentDidMount() {
    this.setMode('edit');

    /**
     * IE has a hardcoded "feature" that attempts to convert link text into
     * anchors in contentEditable DOM. This breaks the editor's expectations of
     * the DOM, and control is lost. Disable it to make IE behave.
     * See: http://blogs.msdn.com/b/ieinternals/archive/2010/09/15/
     * ie9-beta-minor-change-list.aspx
     */
    if (isIE) {
      document.execCommand('AutoUrlDetect', false, false);
    }
  };

  /**
   * Prevent selection events from affecting the current editor state. This
   * is mostly intended to defend against IE, which fires off `selectionchange`
   * events regardless of whether the selection is set via the browser or
   * programmatically. We only care about selection events that occur because
   * of browser interaction, not re-renders and forced selections.
   */


  DraftEditor.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    this._blockSelectEvents = true;
    this._latestEditorState = nextProps.editorState;
  };

  DraftEditor.prototype.componentDidUpdate = function componentDidUpdate() {
    this._blockSelectEvents = false;
    this._latestCommittedEditorState = this.props.editorState;
  };

  /**
   * Used via `this.focus()`.
   *
   * Force focus back onto the editor node.
   *
   * We attempt to preserve scroll position when focusing. You can also pass
   * a specified scroll position (for cases like `cut` behavior where it should
   * be restored to a known position).
   */


  DraftEditor.prototype._focus = function _focus(scrollPosition) {
    var editorState = this.props.editorState;

    var alreadyHasFocus = editorState.getSelection().getHasFocus();
    var editorNode = ReactDOM.findDOMNode(this.refs.editor);

    var scrollParent = Style.getScrollParent(editorNode);

    var _ref = scrollPosition || getScrollPosition(scrollParent),
        x = _ref.x,
        y = _ref.y;

    !(editorNode instanceof HTMLElement) ?  false ? invariant(false, 'editorNode is not an HTMLElement') : invariant(false) : void 0;
    editorNode.focus();

    // Restore scroll position
    if (scrollParent === window) {
      window.scrollTo(x, y);
    } else {
      Scroll.setTop(scrollParent, y);
    }

    // On Chrome and Safari, calling focus on contenteditable focuses the
    // cursor at the first character. This is something you don't expect when
    // you're clicking on an input element but not directly on a character.
    // Put the cursor back where it was before the blur.
    if (!alreadyHasFocus) {
      this.update(EditorState.forceSelection(editorState, editorState.getSelection()));
    }
  };

  DraftEditor.prototype._blur = function _blur() {
    var editorNode = ReactDOM.findDOMNode(this.refs.editor);
    !(editorNode instanceof HTMLElement) ?  false ? invariant(false, 'editorNode is not an HTMLElement') : invariant(false) : void 0;
    editorNode.blur();
  };

  /**
   * Used via `this.setMode(...)`.
   *
   * Set the behavior mode for the editor component. This switches the current
   * handler module to ensure that DOM events are managed appropriately for
   * the active mode.
   */


  DraftEditor.prototype._setMode = function _setMode(mode) {
    this._handler = handlerMap[mode];
  };

  DraftEditor.prototype._exitCurrentMode = function _exitCurrentMode() {
    this.setMode('edit');
  };

  /**
   * Used via `this.restoreEditorDOM()`.
   *
   * Force a complete re-render of the DraftEditorContents based on the current
   * EditorState. This is useful when we know we are going to lose control of
   * the DOM state (cut command, IME) and we want to make sure that
   * reconciliation occurs on a version of the DOM that is synchronized with
   * our EditorState.
   */


  DraftEditor.prototype._restoreEditorDOM = function _restoreEditorDOM(scrollPosition) {
    var _this3 = this;

    this.setState({ contentsKey: this.state.contentsKey + 1 }, function () {
      _this3._focus(scrollPosition);
    });
  };

  /**
   * Used via `this.setClipboard(...)`.
   *
   * Set the clipboard state for a cut/copy event.
   */


  DraftEditor.prototype._setClipboard = function _setClipboard(clipboard) {
    this._clipboard = clipboard;
  };

  /**
   * Used via `this.getClipboard()`.
   *
   * Retrieve the clipboard state for a cut/copy event.
   */


  DraftEditor.prototype._getClipboard = function _getClipboard() {
    return this._clipboard;
  };

  /**
   * Used via `this.update(...)`.
   *
   * Propagate a new `EditorState` object to higher-level components. This is
   * the method by which event handlers inform the `DraftEditor` component of
   * state changes. A component that composes a `DraftEditor` **must** provide
   * an `onChange` prop to receive state updates passed along from this
   * function.
   */


  DraftEditor.prototype._update = function _update(editorState) {
    this._latestEditorState = editorState;
    this.props.onChange(editorState);
  };

  /**
   * Used in conjunction with `_onDragLeave()`, by counting the number of times
   * a dragged element enters and leaves the editor (or any of its children),
   * to determine when the dragged element absolutely leaves the editor.
   */


  DraftEditor.prototype._onDragEnter = function _onDragEnter() {
    this._dragCount++;
  };

  /**
   * See `_onDragEnter()`.
   */


  DraftEditor.prototype._onDragLeave = function _onDragLeave() {
    this._dragCount--;
    if (this._dragCount === 0) {
      this.exitCurrentMode();
    }
  };

  return DraftEditor;
}(React.Component);

DraftEditor.defaultProps = {
  blockRenderMap: DefaultDraftBlockRenderMap,
  blockRendererFn: emptyFunction.thatReturnsNull,
  blockStyleFn: emptyFunction.thatReturns(''),
  keyBindingFn: getDefaultKeyBinding,
  readOnly: false,
  spellCheck: false,
  stripPastedStyles: false
};


module.exports = DraftEditor;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorCompositionHandler
 * 
 */



var DraftModifier = __webpack_require__(6);
var EditorState = __webpack_require__(1);
var Keys = __webpack_require__(30);

var getEntityKeyForSelection = __webpack_require__(52);
var isSelectionAtLeafStart = __webpack_require__(95);

/**
 * Millisecond delay to allow `compositionstart` to fire again upon
 * `compositionend`.
 *
 * This is used for Korean input to ensure that typing can continue without
 * the editor trying to render too quickly. More specifically, Safari 7.1+
 * triggers `compositionstart` a little slower than Chrome/FF, which
 * leads to composed characters being resolved and re-render occurring
 * sooner than we want.
 */
var RESOLVE_DELAY = 20;

/**
 * A handful of variables used to track the current composition and its
 * resolution status. These exist at the module level because it is not
 * possible to have compositions occurring in multiple editors simultaneously,
 * and it simplifies state management with respect to the DraftEditor component.
 */
var resolved = false;
var stillComposing = false;
var textInputData = '';

var DraftEditorCompositionHandler = {
  onBeforeInput: function onBeforeInput(editor, e) {
    textInputData = (textInputData || '') + e.data;
  },

  /**
   * A `compositionstart` event has fired while we're still in composition
   * mode. Continue the current composition session to prevent a re-render.
   */
  onCompositionStart: function onCompositionStart(editor) {
    stillComposing = true;
  },

  /**
   * Attempt to end the current composition session.
   *
   * Defer handling because browser will still insert the chars into active
   * element after `compositionend`. If a `compositionstart` event fires
   * before `resolveComposition` executes, our composition session will
   * continue.
   *
   * The `resolved` flag is useful because certain IME interfaces fire the
   * `compositionend` event multiple times, thus queueing up multiple attempts
   * at handling the composition. Since handling the same composition event
   * twice could break the DOM, we only use the first event. Example: Arabic
   * Google Input Tools on Windows 8.1 fires `compositionend` three times.
   */
  onCompositionEnd: function onCompositionEnd(editor) {
    resolved = false;
    stillComposing = false;
    setTimeout(function () {
      if (!resolved) {
        DraftEditorCompositionHandler.resolveComposition(editor);
      }
    }, RESOLVE_DELAY);
  },

  /**
   * In Safari, keydown events may fire when committing compositions. If
   * the arrow keys are used to commit, prevent default so that the cursor
   * doesn't move, otherwise it will jump back noticeably on re-render.
   */
  onKeyDown: function onKeyDown(editor, e) {
    if (!stillComposing) {
      // If a keydown event is received after compositionend but before the
      // 20ms timer expires (ex: type option-E then backspace, or type A then
      // backspace in 2-Set Korean), we should immediately resolve the
      // composition and reinterpret the key press in edit mode.
      DraftEditorCompositionHandler.resolveComposition(editor);
      editor._onKeyDown(e);
      return;
    }
    if (e.which === Keys.RIGHT || e.which === Keys.LEFT) {
      e.preventDefault();
    }
  },

  /**
   * Keypress events may fire when committing compositions. In Firefox,
   * pressing RETURN commits the composition and inserts extra newline
   * characters that we do not want. `preventDefault` allows the composition
   * to be committed while preventing the extra characters.
   */
  onKeyPress: function onKeyPress(editor, e) {
    if (e.which === Keys.RETURN) {
      e.preventDefault();
    }
  },

  /**
   * Attempt to insert composed characters into the document.
   *
   * If we are still in a composition session, do nothing. Otherwise, insert
   * the characters into the document and terminate the composition session.
   *
   * If no characters were composed -- for instance, the user
   * deleted all composed characters and committed nothing new --
   * force a re-render. We also re-render when the composition occurs
   * at the beginning of a leaf, to ensure that if the browser has
   * created a new text node for the composition, we will discard it.
   *
   * Resetting innerHTML will move focus to the beginning of the editor,
   * so we update to force it back to the correct place.
   */
  resolveComposition: function resolveComposition(editor) {
    if (stillComposing) {
      return;
    }

    resolved = true;
    var composedChars = textInputData;
    textInputData = '';

    var editorState = EditorState.set(editor._latestEditorState, {
      inCompositionMode: false
    });

    var currentStyle = editorState.getCurrentInlineStyle();
    var entityKey = getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection());

    var mustReset = !composedChars || isSelectionAtLeafStart(editorState) || currentStyle.size > 0 || entityKey !== null;

    if (mustReset) {
      editor.restoreEditorDOM();
    }

    editor.exitCurrentMode();

    if (composedChars) {
      // If characters have been composed, re-rendering with the update
      // is sufficient to reset the editor.
      var contentState = DraftModifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), composedChars, currentStyle, entityKey);
      editor.update(EditorState.push(editorState, contentState, 'insert-characters'));
      return;
    }

    if (mustReset) {
      editor.update(EditorState.set(editorState, {
        nativelyRenderedContent: null,
        forceSelection: true
      }));
    }
  }
};

module.exports = DraftEditorCompositionHandler;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorContents.react
 * @typechecks
 * 
 */



var _assign = __webpack_require__(10);

var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DraftEditorBlock = __webpack_require__(79);
var DraftOffsetKey = __webpack_require__(35);
var EditorState = __webpack_require__(1);
var React = __webpack_require__(3);

var cx = __webpack_require__(17);
var joinClasses = __webpack_require__(116);
var nullthrows = __webpack_require__(4);

/**
 * `DraftEditorContents` is the container component for all block components
 * rendered for a `DraftEditor`. It is optimized to aggressively avoid
 * re-rendering blocks whenever possible.
 *
 * This component is separate from `DraftEditor` because certain props
 * (for instance, ARIA props) must be allowed to update without affecting
 * the contents of the editor.
 */
var DraftEditorContents = function (_React$Component) {
  _inherits(DraftEditorContents, _React$Component);

  function DraftEditorContents() {
    _classCallCheck(this, DraftEditorContents);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DraftEditorContents.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var prevEditorState = this.props.editorState;
    var nextEditorState = nextProps.editorState;

    var prevDirectionMap = prevEditorState.getDirectionMap();
    var nextDirectionMap = nextEditorState.getDirectionMap();

    // Text direction has changed for one or more blocks. We must re-render.
    if (prevDirectionMap !== nextDirectionMap) {
      return true;
    }

    var didHaveFocus = prevEditorState.getSelection().getHasFocus();
    var nowHasFocus = nextEditorState.getSelection().getHasFocus();

    if (didHaveFocus !== nowHasFocus) {
      return true;
    }

    var nextNativeContent = nextEditorState.getNativelyRenderedContent();

    var wasComposing = prevEditorState.isInCompositionMode();
    var nowComposing = nextEditorState.isInCompositionMode();

    // If the state is unchanged or we're currently rendering a natively
    // rendered state, there's nothing new to be done.
    if (prevEditorState === nextEditorState || nextNativeContent !== null && nextEditorState.getCurrentContent() === nextNativeContent || wasComposing && nowComposing) {
      return false;
    }

    var prevContent = prevEditorState.getCurrentContent();
    var nextContent = nextEditorState.getCurrentContent();
    var prevDecorator = prevEditorState.getDecorator();
    var nextDecorator = nextEditorState.getDecorator();
    return wasComposing !== nowComposing || prevContent !== nextContent || prevDecorator !== nextDecorator || nextEditorState.mustForceSelection();
  };

  DraftEditorContents.prototype.render = function render() {
    var _props = this.props,
        blockRenderMap = _props.blockRenderMap,
        blockRendererFn = _props.blockRendererFn,
        customStyleMap = _props.customStyleMap,
        customStyleFn = _props.customStyleFn,
        editorState = _props.editorState;


    var content = editorState.getCurrentContent();
    var selection = editorState.getSelection();
    var forceSelection = editorState.mustForceSelection();
    var decorator = editorState.getDecorator();
    var directionMap = nullthrows(editorState.getDirectionMap());

    var blocksAsArray = content.getBlocksAsArray();
    var processedBlocks = [];
    var currentDepth = null;
    var lastWrapperTemplate = null;

    for (var ii = 0; ii < blocksAsArray.length; ii++) {
      var _block = blocksAsArray[ii];
      var key = _block.getKey();
      var blockType = _block.getType();

      var customRenderer = blockRendererFn(_block);
      var CustomComponent = void 0,
          customProps = void 0,
          customEditable = void 0;
      if (customRenderer) {
        CustomComponent = customRenderer.component;
        customProps = customRenderer.props;
        customEditable = customRenderer.editable;
      }

      var _textDirectionality = this.props.textDirectionality;

      var direction = _textDirectionality ? _textDirectionality : directionMap.get(key);
      var offsetKey = DraftOffsetKey.encode(key, 0, 0);
      var componentProps = {
        contentState: content,
        block: _block,
        blockProps: customProps,
        customStyleMap: customStyleMap,
        customStyleFn: customStyleFn,
        decorator: decorator,
        direction: direction,
        forceSelection: forceSelection,
        key: key,
        offsetKey: offsetKey,
        selection: selection,
        tree: editorState.getBlockTree(key)
      };

      var configForType = blockRenderMap.get(blockType) || blockRenderMap.get('unstyled');
      var wrapperTemplate = configForType.wrapper;

      var Element = configForType.element || blockRenderMap.get('unstyled').element;

      var depth = _block.getDepth();
      var className = this.props.blockStyleFn(_block);

      // List items are special snowflakes, since we handle nesting and
      // counters manually.
      if (Element === 'li') {
        var shouldResetCount = lastWrapperTemplate !== wrapperTemplate || currentDepth === null || depth > currentDepth;
        className = joinClasses(className, getListItemClasses(blockType, depth, shouldResetCount, direction));
      }

      var Component = CustomComponent || DraftEditorBlock;
      var childProps = {
        className: className,
        'data-block': true,
        /* $FlowFixMe(>=0.53.0 site=www,mobile) This comment suppresses an
         * error when upgrading Flow's support for React. Common errors found
         * when upgrading Flow's React support are documented at
         * https://fburl.com/eq7bs81w */
        'data-editor': this.props.editorKey,
        'data-offset-key': offsetKey,
        key: key
      };
      if (customEditable !== undefined) {
        childProps = _extends({}, childProps, {
          contentEditable: customEditable,
          suppressContentEditableWarning: true
        });
      }

      var child = React.createElement(Element, childProps,
      /* $FlowFixMe(>=0.53.0 site=www,mobile) This comment suppresses an
       * error when upgrading Flow's support for React. Common errors found
       * when upgrading Flow's React support are documented at
       * https://fburl.com/eq7bs81w */
      React.createElement(Component, componentProps));

      processedBlocks.push({
        block: child,
        wrapperTemplate: wrapperTemplate,
        key: key,
        offsetKey: offsetKey
      });

      if (wrapperTemplate) {
        currentDepth = _block.getDepth();
      } else {
        currentDepth = null;
      }
      lastWrapperTemplate = wrapperTemplate;
    }

    // Group contiguous runs of blocks that have the same wrapperTemplate
    var outputBlocks = [];
    for (var _ii = 0; _ii < processedBlocks.length;) {
      var info = processedBlocks[_ii];
      if (info.wrapperTemplate) {
        var blocks = [];
        do {
          blocks.push(processedBlocks[_ii].block);
          _ii++;
        } while (_ii < processedBlocks.length && processedBlocks[_ii].wrapperTemplate === info.wrapperTemplate);
        var wrapperElement = React.cloneElement(info.wrapperTemplate, {
          key: info.key + '-wrap',
          'data-offset-key': info.offsetKey
        }, blocks);
        outputBlocks.push(wrapperElement);
      } else {
        outputBlocks.push(info.block);
        _ii++;
      }
    }

    return React.createElement(
      'div',
      { 'data-contents': 'true' },
      outputBlocks
    );
  };

  return DraftEditorContents;
}(React.Component);

/**
 * Provide default styling for list items. This way, lists will be styled with
 * proper counters and indentation even if the caller does not specify
 * their own styling at all. If more than five levels of nesting are needed,
 * the necessary CSS classes can be provided via `blockStyleFn` configuration.
 */


function getListItemClasses(type, depth, shouldResetCount, direction) {
  return cx({
    'public/DraftStyleDefault/unorderedListItem': type === 'unordered-list-item',
    'public/DraftStyleDefault/orderedListItem': type === 'ordered-list-item',
    'public/DraftStyleDefault/reset': shouldResetCount,
    'public/DraftStyleDefault/depth0': depth === 0,
    'public/DraftStyleDefault/depth1': depth === 1,
    'public/DraftStyleDefault/depth2': depth === 2,
    'public/DraftStyleDefault/depth3': depth === 3,
    'public/DraftStyleDefault/depth4': depth === 4,
    'public/DraftStyleDefault/listLTR': direction === 'LTR',
    'public/DraftStyleDefault/listRTL': direction === 'RTL'
  });
}

module.exports = DraftEditorContents;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorDragHandler
 * @typechecks
 * 
 */



var DataTransfer = __webpack_require__(55);
var DraftModifier = __webpack_require__(6);
var EditorState = __webpack_require__(1);

var findAncestorOffsetKey = __webpack_require__(51);
var getTextContentFromFiles = __webpack_require__(92);
var getUpdatedSelectionState = __webpack_require__(93);
var isEventHandled = __webpack_require__(38);
var nullthrows = __webpack_require__(4);

/**
 * Get a SelectionState for the supplied mouse event.
 */
function getSelectionForEvent(event, editorState) {
  var node = null;
  var offset = null;

  if (typeof document.caretRangeFromPoint === 'function') {
    var dropRange = document.caretRangeFromPoint(event.x, event.y);
    node = dropRange.startContainer;
    offset = dropRange.startOffset;
  } else if (event.rangeParent) {
    node = event.rangeParent;
    offset = event.rangeOffset;
  } else {
    return null;
  }

  node = nullthrows(node);
  offset = nullthrows(offset);
  var offsetKey = nullthrows(findAncestorOffsetKey(node));

  return getUpdatedSelectionState(editorState, offsetKey, offset, offsetKey, offset);
}

var DraftEditorDragHandler = {
  /**
   * Drag originating from input terminated.
   */
  onDragEnd: function onDragEnd(editor) {
    editor.exitCurrentMode();
  },

  /**
   * Handle data being dropped.
   */
  onDrop: function onDrop(editor, e) {
    var data = new DataTransfer(e.nativeEvent.dataTransfer);

    var editorState = editor._latestEditorState;
    var dropSelection = getSelectionForEvent(e.nativeEvent, editorState);

    e.preventDefault();
    editor.exitCurrentMode();

    if (dropSelection == null) {
      return;
    }

    var files = data.getFiles();
    if (files.length > 0) {
      if (editor.props.handleDroppedFiles && isEventHandled(editor.props.handleDroppedFiles(dropSelection, files))) {
        return;
      }

      getTextContentFromFiles(files, function (fileText) {
        fileText && editor.update(insertTextAtSelection(editorState, dropSelection, fileText));
      });
      return;
    }

    var dragType = editor._internalDrag ? 'internal' : 'external';
    if (editor.props.handleDrop && isEventHandled(editor.props.handleDrop(dropSelection, data, dragType))) {
      return;
    }

    if (editor._internalDrag) {
      editor.update(moveText(editorState, dropSelection));
      return;
    }

    editor.update(insertTextAtSelection(editorState, dropSelection, data.getText()));
  }

};

function moveText(editorState, targetSelection) {
  var newContentState = DraftModifier.moveText(editorState.getCurrentContent(), editorState.getSelection(), targetSelection);
  return EditorState.push(editorState, newContentState, 'insert-fragment');
}

/**
 * Insert text at a specified selection.
 */
function insertTextAtSelection(editorState, selection, text) {
  var newContentState = DraftModifier.insertText(editorState.getCurrentContent(), selection, text, editorState.getCurrentInlineStyle());
  return EditorState.push(editorState, newContentState, 'insert-fragment');
}

module.exports = DraftEditorDragHandler;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorEditHandler
 * 
 */



var onBeforeInput = __webpack_require__(185);
var onBlur = __webpack_require__(186);
var onCompositionStart = __webpack_require__(187);
var onCopy = __webpack_require__(188);
var onCut = __webpack_require__(189);
var onDragOver = __webpack_require__(190);
var onDragStart = __webpack_require__(191);
var onFocus = __webpack_require__(192);
var onInput = __webpack_require__(193);
var onKeyDown = __webpack_require__(194);
var onPaste = __webpack_require__(195);
var onSelect = __webpack_require__(196);

var DraftEditorEditHandler = {
  onBeforeInput: onBeforeInput,
  onBlur: onBlur,
  onCompositionStart: onCompositionStart,
  onCopy: onCopy,
  onCut: onCut,
  onDragOver: onDragOver,
  onDragStart: onDragStart,
  onFocus: onFocus,
  onInput: onInput,
  onKeyDown: onKeyDown,
  onPaste: onPaste,
  onSelect: onSelect
};

module.exports = DraftEditorEditHandler;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorLeaf.react
 * @typechecks
 * 
 */



var _assign = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentBlock = __webpack_require__(18);
var DraftEditorTextNode = __webpack_require__(170);
var React = __webpack_require__(3);
var ReactDOM = __webpack_require__(8);

var invariant = __webpack_require__(0);
var setDraftEditorSelection = __webpack_require__(220);

/**
 * All leaf nodes in the editor are spans with single text nodes. Leaf
 * elements are styled based on the merging of an optional custom style map
 * and a default style map.
 *
 * `DraftEditorLeaf` also provides a wrapper for calling into the imperative
 * DOM Selection API. In this way, top-level components can declaratively
 * maintain the selection state.
 */
var DraftEditorLeaf = function (_React$Component) {
  _inherits(DraftEditorLeaf, _React$Component);

  function DraftEditorLeaf() {
    _classCallCheck(this, DraftEditorLeaf);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  /**
   * By making individual leaf instances aware of their context within
   * the text of the editor, we can set our selection range more
   * easily than we could in the non-React world.
   *
   * Note that this depends on our maintaining tight control over the
   * DOM structure of the DraftEditor component. If leaves had multiple
   * text nodes, this would be harder.
   */
  DraftEditorLeaf.prototype._setSelection = function _setSelection() {
    var selection = this.props.selection;

    // If selection state is irrelevant to the parent block, no-op.

    if (selection == null || !selection.getHasFocus()) {
      return;
    }

    var _props = this.props,
        block = _props.block,
        start = _props.start,
        text = _props.text;

    var blockKey = block.getKey();
    var end = start + text.length;
    if (!selection.hasEdgeWithin(blockKey, start, end)) {
      return;
    }

    // Determine the appropriate target node for selection. If the child
    // is not a text node, it is a <br /> spacer. In this case, use the
    // <span> itself as the selection target.
    var node = ReactDOM.findDOMNode(this);
    !node ?  false ? invariant(false, 'Missing node') : invariant(false) : void 0;
    var child = node.firstChild;
    !child ?  false ? invariant(false, 'Missing child') : invariant(false) : void 0;
    var targetNode = void 0;

    if (child.nodeType === Node.TEXT_NODE) {
      targetNode = child;
    } else if (child.tagName === 'BR') {
      targetNode = node;
    } else {
      targetNode = child.firstChild;
      !targetNode ?  false ? invariant(false, 'Missing targetNode') : invariant(false) : void 0;
    }

    setDraftEditorSelection(selection, targetNode, blockKey, start, end);
  };

  DraftEditorLeaf.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var leafNode = ReactDOM.findDOMNode(this.refs.leaf);
    !leafNode ?  false ? invariant(false, 'Missing leafNode') : invariant(false) : void 0;
    return leafNode.textContent !== nextProps.text || nextProps.styleSet !== this.props.styleSet || nextProps.forceSelection;
  };

  DraftEditorLeaf.prototype.componentDidUpdate = function componentDidUpdate() {
    this._setSelection();
  };

  DraftEditorLeaf.prototype.componentDidMount = function componentDidMount() {
    this._setSelection();
  };

  DraftEditorLeaf.prototype.render = function render() {
    var block = this.props.block;
    var text = this.props.text;

    // If the leaf is at the end of its block and ends in a soft newline, append
    // an extra line feed character. Browsers collapse trailing newline
    // characters, which leaves the cursor in the wrong place after a
    // shift+enter. The extra character repairs this.

    if (text.endsWith('\n') && this.props.isLast) {
      text += '\n';
    }

    var _props2 = this.props,
        customStyleMap = _props2.customStyleMap,
        customStyleFn = _props2.customStyleFn,
        offsetKey = _props2.offsetKey,
        styleSet = _props2.styleSet;

    var styleObj = styleSet.reduce(function (map, styleName) {
      var mergedStyles = {};
      var style = customStyleMap[styleName];

      if (style !== undefined && map.textDecoration !== style.textDecoration) {
        // .trim() is necessary for IE9/10/11 and Edge
        mergedStyles.textDecoration = [map.textDecoration, style.textDecoration].join(' ').trim();
      }

      return _assign(map, style, mergedStyles);
    }, {});

    if (customStyleFn) {
      var newStyles = customStyleFn(styleSet, block);
      styleObj = _assign(styleObj, newStyles);
    }

    return React.createElement(
      'span',
      {
        'data-offset-key': offsetKey,
        ref: 'leaf',
        style: styleObj },
      React.createElement(
        DraftEditorTextNode,
        null,
        text
      )
    );
  };

  return DraftEditorLeaf;
}(React.Component);

module.exports = DraftEditorLeaf;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorPlaceholder.react
 * @typechecks
 * 
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(3);

var cx = __webpack_require__(17);

/**
 * This component is responsible for rendering placeholder text for the
 * `DraftEditor` component.
 *
 * Override placeholder style via CSS.
 */
var DraftEditorPlaceholder = function (_React$Component) {
  _inherits(DraftEditorPlaceholder, _React$Component);

  function DraftEditorPlaceholder() {
    _classCallCheck(this, DraftEditorPlaceholder);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DraftEditorPlaceholder.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text || this.props.editorState.getSelection().getHasFocus() !== nextProps.editorState.getSelection().getHasFocus();
  };

  DraftEditorPlaceholder.prototype.render = function render() {
    var hasFocus = this.props.editorState.getSelection().getHasFocus();

    var className = cx({
      'public/DraftEditorPlaceholder/root': true,
      'public/DraftEditorPlaceholder/hasFocus': hasFocus
    });

    return React.createElement(
      'div',
      { className: className },
      React.createElement(
        'div',
        {
          className: cx('public/DraftEditorPlaceholder/inner'),
          id: this.props.accessibilityID },
        this.props.text
      )
    );
  };

  return DraftEditorPlaceholder;
}(React.Component);

module.exports = DraftEditorPlaceholder;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorTextNode.react
 * @typechecks
 * 
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(3);
var ReactDOM = __webpack_require__(8);
var UserAgent = __webpack_require__(5);

var invariant = __webpack_require__(0);

// In IE, spans with <br> tags render as two newlines. By rendering a span
// with only a newline character, we can be sure to render a single line.
var useNewlineChar = UserAgent.isBrowser('IE <= 11');

/**
 * Check whether the node should be considered a newline.
 */
function isNewline(node) {
  return useNewlineChar ? node.textContent === '\n' : node.tagName === 'BR';
}

/**
 * Placeholder elements for empty text content.
 *
 * What is this `data-text` attribute, anyway? It turns out that we need to
 * put an attribute on the lowest-level text node in order to preserve correct
 * spellcheck handling. If the <span> is naked, Chrome and Safari may do
 * bizarre things to do the DOM -- split text nodes, create extra spans, etc.
 * If the <span> has an attribute, this appears not to happen.
 * See http://jsfiddle.net/9khdavod/ for the failure case, and
 * http://jsfiddle.net/7pg143f7/ for the fixed case.
 */
var NEWLINE_A = useNewlineChar ? React.createElement(
  'span',
  { key: 'A', 'data-text': 'true' },
  '\n'
) : React.createElement('br', { key: 'A', 'data-text': 'true' });

var NEWLINE_B = useNewlineChar ? React.createElement(
  'span',
  { key: 'B', 'data-text': 'true' },
  '\n'
) : React.createElement('br', { key: 'B', 'data-text': 'true' });

/**
 * The lowest-level component in a `DraftEditor`, the text node component
 * replaces the default React text node implementation. This allows us to
 * perform custom handling of newline behavior and avoid re-rendering text
 * nodes with DOM state that already matches the expectations of our immutable
 * editor state.
 */
var DraftEditorTextNode = function (_React$Component) {
  _inherits(DraftEditorTextNode, _React$Component);

  function DraftEditorTextNode(props) {
    _classCallCheck(this, DraftEditorTextNode);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this._forceFlag = false;
    return _this;
  }

  DraftEditorTextNode.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var node = ReactDOM.findDOMNode(this);
    var shouldBeNewline = nextProps.children === '';
    !(node instanceof Element) ?  false ? invariant(false, 'node is not an Element') : invariant(false) : void 0;
    if (shouldBeNewline) {
      return !isNewline(node);
    }
    return node.textContent !== nextProps.children;
  };

  DraftEditorTextNode.prototype.componentWillUpdate = function componentWillUpdate() {
    // By flipping this flag, we also keep flipping keys which forces
    // React to remount this node every time it rerenders.
    this._forceFlag = !this._forceFlag;
  };

  DraftEditorTextNode.prototype.render = function render() {
    if (this.props.children === '') {
      return this._forceFlag ? NEWLINE_A : NEWLINE_B;
    }
    return React.createElement(
      'span',
      { key: this._forceFlag ? 'A' : 'B', 'data-text': 'true' },
      this.props.children
    );
  };

  return DraftEditorTextNode;
}(React.Component);

module.exports = DraftEditorTextNode;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEntitySegments
 * @typechecks
 * 
 */



/**
 * Identify the range to delete from a segmented entity.
 *
 * Rules:
 *
 *  Example: 'John F. Kennedy'
 *
 *   - Deletion from within any non-whitespace (i.e. ['John', 'F.', 'Kennedy'])
 *     will return the range of that text.
 *
 *       'John F. Kennedy' -> 'John F.'
 *                  ^
 *
 *   - Forward deletion of whitespace will remove the following section:
 *
 *       'John F. Kennedy' -> 'John Kennedy'
 *            ^
 *
 *   - Backward deletion of whitespace will remove the previous section:
 *
 *       'John F. Kennedy' -> 'F. Kennedy'
 *            ^
 */
var DraftEntitySegments = {
  getRemovalRange: function getRemovalRange(selectionStart, selectionEnd, text, entityStart, direction) {
    var segments = text.split(' ');
    segments = segments.map(function ( /*string*/segment, /*number*/ii) {
      if (direction === 'forward') {
        if (ii > 0) {
          return ' ' + segment;
        }
      } else if (ii < segments.length - 1) {
        return segment + ' ';
      }
      return segment;
    });

    var segmentStart = entityStart;
    var segmentEnd;
    var segment;
    var removalStart = null;
    var removalEnd = null;

    for (var jj = 0; jj < segments.length; jj++) {
      segment = segments[jj];
      segmentEnd = segmentStart + segment.length;

      // Our selection overlaps this segment.
      if (selectionStart < segmentEnd && segmentStart < selectionEnd) {
        if (removalStart !== null) {
          removalEnd = segmentEnd;
        } else {
          removalStart = segmentStart;
          removalEnd = segmentEnd;
        }
      } else if (removalStart !== null) {
        break;
      }

      segmentStart = segmentEnd;
    }

    var entityEnd = entityStart + text.length;
    var atStart = removalStart === entityStart;
    var atEnd = removalEnd === entityEnd;

    if (!atStart && atEnd || atStart && !atEnd) {
      if (direction === 'forward') {
        if (removalEnd !== entityEnd) {
          removalEnd++;
        }
      } else if (removalStart !== entityStart) {
        removalStart--;
      }
    }

    return {
      start: removalStart,
      end: removalEnd
    };
  }
};

module.exports = DraftEntitySegments;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftFeatureFlags-core
 * 
 */



var DraftFeatureFlags = {
  draft_killswitch_allow_nontextnodes: false,
  draft_segmented_entities_behavior: false
};

module.exports = DraftFeatureFlags;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftJsDebugLogging
 */



module.exports = {
  logSelectionStateFailure: function logSelectionStateFailure() {
    return null;
  }
};

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftPasteProcessor
 * @typechecks
 * 
 */



var CharacterMetadata = __webpack_require__(13);
var ContentBlock = __webpack_require__(18);
var Immutable = __webpack_require__(2);

var convertFromHTMLtoContentBlocks = __webpack_require__(85);
var generateRandomKey = __webpack_require__(15);
var getSafeBodyFromHTML = __webpack_require__(90);
var sanitizeDraftText = __webpack_require__(54);

var List = Immutable.List,
    Repeat = Immutable.Repeat;


var DraftPasteProcessor = {
  processHTML: function processHTML(html, blockRenderMap) {
    return convertFromHTMLtoContentBlocks(html, getSafeBodyFromHTML, blockRenderMap);
  },
  processText: function processText(textBlocks, character, type) {
    return textBlocks.map(function (textLine) {
      textLine = sanitizeDraftText(textLine);
      return new ContentBlock({
        key: generateRandomKey(),
        type: type,
        text: textLine,
        characterList: List(Repeat(character, textLine.length))
      });
    });
  }
};

module.exports = DraftPasteProcessor;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EditorBidiService
 * @typechecks
 * 
 */



var Immutable = __webpack_require__(2);
var UnicodeBidiService = __webpack_require__(112);

var nullthrows = __webpack_require__(4);

var OrderedMap = Immutable.OrderedMap;


var bidiService;

var EditorBidiService = {
  getDirectionMap: function getDirectionMap(content, prevBidiMap) {
    if (!bidiService) {
      bidiService = new UnicodeBidiService();
    } else {
      bidiService.reset();
    }

    var blockMap = content.getBlockMap();
    var nextBidi = blockMap.valueSeq().map(function (block) {
      return nullthrows(bidiService).getDirection(block.getText());
    });
    var bidiMap = OrderedMap(blockMap.keySeq().zip(nextBidi));

    if (prevBidiMap != null && Immutable.is(prevBidiMap, bidiMap)) {
      return prevBidiMap;
    }

    return bidiMap;
  }
};

module.exports = EditorBidiService;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SecondaryClipboard
 * 
 */



var DraftModifier = __webpack_require__(6);
var EditorState = __webpack_require__(1);

var getContentStateFragment = __webpack_require__(37);
var nullthrows = __webpack_require__(4);

var clipboard = null;

/**
 * Some systems offer a "secondary" clipboard to allow quick internal cut
 * and paste behavior. For instance, Ctrl+K (cut) and Ctrl+Y (paste).
 */
var SecondaryClipboard = {
  cut: function cut(editorState) {
    var content = editorState.getCurrentContent();
    var selection = editorState.getSelection();
    var targetRange = null;

    if (selection.isCollapsed()) {
      var anchorKey = selection.getAnchorKey();
      var blockEnd = content.getBlockForKey(anchorKey).getLength();

      if (blockEnd === selection.getAnchorOffset()) {
        return editorState;
      }

      targetRange = selection.set('focusOffset', blockEnd);
    } else {
      targetRange = selection;
    }

    targetRange = nullthrows(targetRange);
    clipboard = getContentStateFragment(content, targetRange);

    var afterRemoval = DraftModifier.removeRange(content, targetRange, 'forward');

    if (afterRemoval === content) {
      return editorState;
    }

    return EditorState.push(editorState, afterRemoval, 'remove-range');
  },

  paste: function paste(editorState) {
    if (!clipboard) {
      return editorState;
    }

    var newContent = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), clipboard);

    return EditorState.push(editorState, newContent, 'insert-fragment');
  }
};

module.exports = SecondaryClipboard;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule adjustBlockDepthForContentState
 * @typechecks
 * 
 */



function adjustBlockDepthForContentState(contentState, selectionState, adjustment, maxDepth) {
  var startKey = selectionState.getStartKey();
  var endKey = selectionState.getEndKey();
  var blockMap = contentState.getBlockMap();
  var blocks = blockMap.toSeq().skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).concat([[endKey, blockMap.get(endKey)]]).map(function (block) {
    var depth = block.getDepth() + adjustment;
    depth = Math.max(0, Math.min(depth, maxDepth));
    return block.set('depth', depth);
  });

  blockMap = blockMap.merge(blocks);

  return contentState.merge({
    blockMap: blockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

module.exports = adjustBlockDepthForContentState;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule applyEntityToContentBlock
 * @typechecks
 * 
 */



var CharacterMetadata = __webpack_require__(13);

function applyEntityToContentBlock(contentBlock, start, end, entityKey) {
  var characterList = contentBlock.getCharacterList();
  while (start < end) {
    characterList = characterList.set(start, CharacterMetadata.applyEntity(characterList.get(start), entityKey));
    start++;
  }
  return contentBlock.set('characterList', characterList);
}

module.exports = applyEntityToContentBlock;

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule applyEntityToContentState
 * @typechecks
 * 
 */



var Immutable = __webpack_require__(2);

var applyEntityToContentBlock = __webpack_require__(178);

function applyEntityToContentState(contentState, selectionState, entityKey) {
  var blockMap = contentState.getBlockMap();
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  var newBlocks = blockMap.skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).toOrderedMap().merge(Immutable.OrderedMap([[endKey, blockMap.get(endKey)]])).map(function (block, blockKey) {
    var sliceStart = blockKey === startKey ? startOffset : 0;
    var sliceEnd = blockKey === endKey ? endOffset : block.getLength();
    return applyEntityToContentBlock(block, sliceStart, sliceEnd, entityKey);
  });

  return contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

module.exports = applyEntityToContentState;

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule convertFromDraftStateToRaw
 * 
 */



var DraftStringKey = __webpack_require__(83);

var encodeEntityRanges = __webpack_require__(197);
var encodeInlineStyleRanges = __webpack_require__(198);

function convertFromDraftStateToRaw(contentState) {
  var entityStorageKey = 0;
  var entityStorageMap = {};
  var rawBlocks = [];

  contentState.getBlockMap().forEach(function (block, blockKey) {
    block.findEntityRanges(function (character) {
      return character.getEntity() !== null;
    }, function (start) {
      // Stringify to maintain order of otherwise numeric keys.
      var stringifiedEntityKey = DraftStringKey.stringify(block.getEntityAt(start));
      if (!entityStorageMap.hasOwnProperty(stringifiedEntityKey)) {
        entityStorageMap[stringifiedEntityKey] = '' + entityStorageKey++;
      }
    });

    rawBlocks.push({
      key: blockKey,
      text: block.getText(),
      type: block.getType(),
      depth: block.getDepth(),
      inlineStyleRanges: encodeInlineStyleRanges(block),
      entityRanges: encodeEntityRanges(block, entityStorageMap),
      data: block.getData().toObject()
    });
  });

  // Flip storage map so that our storage keys map to global
  // DraftEntity keys.
  var entityKeys = Object.keys(entityStorageMap);
  var flippedStorageMap = {};
  entityKeys.forEach(function (key, jj) {
    var entity = contentState.getEntity(DraftStringKey.unstringify(key));
    flippedStorageMap[jj] = {
      type: entity.getType(),
      mutability: entity.getMutability(),
      data: entity.getData()
    };
  });

  return {
    entityMap: flippedStorageMap,
    blocks: rawBlocks
  };
}

module.exports = convertFromDraftStateToRaw;

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule convertFromRawToDraftState
 * 
 */



var _assign = __webpack_require__(10);

var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ContentBlock = __webpack_require__(18);
var ContentState = __webpack_require__(48);
var DraftEntity = __webpack_require__(34);
var Immutable = __webpack_require__(2);

var createCharacterList = __webpack_require__(182);
var decodeEntityRanges = __webpack_require__(183);
var decodeInlineStyleRanges = __webpack_require__(184);
var generateRandomKey = __webpack_require__(15);

var Map = Immutable.Map;


function convertFromRawToDraftState(rawState) {
  var blocks = rawState.blocks,
      entityMap = rawState.entityMap;


  var fromStorageToLocal = {};

  // TODO: Update this once we completely remove DraftEntity
  Object.keys(entityMap).forEach(function (storageKey) {
    var encodedEntity = entityMap[storageKey];
    var type = encodedEntity.type,
        mutability = encodedEntity.mutability,
        data = encodedEntity.data;

    var newKey = DraftEntity.__create(type, mutability, data || {});
    fromStorageToLocal[storageKey] = newKey;
  });

  var contentBlocks = blocks.map(function (block) {
    var key = block.key,
        type = block.type,
        text = block.text,
        depth = block.depth,
        inlineStyleRanges = block.inlineStyleRanges,
        entityRanges = block.entityRanges,
        data = block.data;

    key = key || generateRandomKey();
    type = type || 'unstyled';
    depth = depth || 0;
    inlineStyleRanges = inlineStyleRanges || [];
    entityRanges = entityRanges || [];
    data = Map(data);

    var inlineStyles = decodeInlineStyleRanges(text, inlineStyleRanges);

    // Translate entity range keys to the DraftEntity map.
    var filteredEntityRanges = entityRanges.filter(function (range) {
      return fromStorageToLocal.hasOwnProperty(range.key);
    }).map(function (range) {
      return _extends({}, range, { key: fromStorageToLocal[range.key] });
    });

    var entities = decodeEntityRanges(text, filteredEntityRanges);
    var characterList = createCharacterList(inlineStyles, entities);

    return new ContentBlock({ key: key, type: type, text: text, depth: depth, characterList: characterList, data: data });
  });

  return ContentState.createFromBlockArray(contentBlocks);
}

module.exports = convertFromRawToDraftState;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule createCharacterList
 * @typechecks
 * 
 */



var CharacterMetadata = __webpack_require__(13);
var Immutable = __webpack_require__(2);

var List = Immutable.List;


function createCharacterList(inlineStyles, entities) {
  var characterArray = inlineStyles.map(function (style, ii) {
    var entity = entities[ii];
    return CharacterMetadata.create({ style: style, entity: entity });
  });
  return List(characterArray);
}

module.exports = createCharacterList;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule decodeEntityRanges
 * @typechecks
 * 
 */



var UnicodeUtils = __webpack_require__(14);

var substr = UnicodeUtils.substr;

/**
 * Convert to native JavaScript string lengths to determine ranges.
 */

function decodeEntityRanges(text, ranges) {
  var entities = Array(text.length).fill(null);
  if (ranges) {
    ranges.forEach(function (range) {
      // Using Unicode-enabled substrings converted to JavaScript lengths,
      // fill the output array with entity keys.
      var start = substr(text, 0, range.offset).length;
      var end = start + substr(text, range.offset, range.length).length;
      for (var ii = start; ii < end; ii++) {
        entities[ii] = range.key;
      }
    });
  }
  return entities;
}

module.exports = decodeEntityRanges;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule decodeInlineStyleRanges
 * @typechecks
 * 
 */



var _require = __webpack_require__(2),
    OrderedSet = _require.OrderedSet;

var UnicodeUtils = __webpack_require__(14);

var substr = UnicodeUtils.substr;


var EMPTY_SET = OrderedSet();

/**
 * Convert to native JavaScript string lengths to determine ranges.
 */
function decodeInlineStyleRanges(text, ranges) {
  var styles = Array(text.length).fill(EMPTY_SET);
  if (ranges) {
    ranges.forEach(function ( /*object*/range) {
      var cursor = substr(text, 0, range.offset).length;
      var end = cursor + substr(text, range.offset, range.length).length;
      while (cursor < end) {
        styles[cursor] = styles[cursor].add(range.style);
        cursor++;
      }
    });
  }
  return styles;
}

module.exports = decodeInlineStyleRanges;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnBeforeInput
 * 
 */



var BlockTree = __webpack_require__(77);
var DraftModifier = __webpack_require__(6);
var EditorState = __webpack_require__(1);
var UserAgent = __webpack_require__(5);

var getEntityKeyForSelection = __webpack_require__(52);
var isEventHandled = __webpack_require__(38);
var isSelectionAtLeafStart = __webpack_require__(95);
var nullthrows = __webpack_require__(4);
var setImmediate = __webpack_require__(118);

// When nothing is focused, Firefox regards two characters, `'` and `/`, as
// commands that should open and focus the "quickfind" search bar. This should
// *never* happen while a contenteditable is focused, but as of v28, it
// sometimes does, even when the keypress event target is the contenteditable.
// This breaks the input. Special case these characters to ensure that when
// they are typed, we prevent default on the event to make sure not to
// trigger quickfind.
var FF_QUICKFIND_CHAR = '\'';
var FF_QUICKFIND_LINK_CHAR = '\/';
var isFirefox = UserAgent.isBrowser('Firefox');

function mustPreventDefaultForCharacter(character) {
  return isFirefox && (character == FF_QUICKFIND_CHAR || character == FF_QUICKFIND_LINK_CHAR);
}

/**
 * Replace the current selection with the specified text string, with the
 * inline style and entity key applied to the newly inserted text.
 */
function replaceText(editorState, text, inlineStyle, entityKey) {
  var contentState = DraftModifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), text, inlineStyle, entityKey);
  return EditorState.push(editorState, contentState, 'insert-characters');
}

/**
 * When `onBeforeInput` executes, the browser is attempting to insert a
 * character into the editor. Apply this character data to the document,
 * allowing native insertion if possible.
 *
 * Native insertion is encouraged in order to limit re-rendering and to
 * preserve spellcheck highlighting, which disappears or flashes if re-render
 * occurs on the relevant text nodes.
 */
function editOnBeforeInput(editor, e) {
  if (editor._pendingStateFromBeforeInput !== undefined) {
    editor.update(editor._pendingStateFromBeforeInput);
    editor._pendingStateFromBeforeInput = undefined;
  }

  var editorState = editor._latestEditorState;

  var chars = e.data;

  // In some cases (ex: IE ideographic space insertion) no character data
  // is provided. There's nothing to do when this happens.
  if (!chars) {
    return;
  }

  // Allow the top-level component to handle the insertion manually. This is
  // useful when triggering interesting behaviors for a character insertion,
  // Simple examples: replacing a raw text ':)' with a smile emoji or image
  // decorator, or setting a block to be a list item after typing '- ' at the
  // start of the block.
  if (editor.props.handleBeforeInput && isEventHandled(editor.props.handleBeforeInput(chars, editorState))) {
    e.preventDefault();
    return;
  }

  // If selection is collapsed, conditionally allow native behavior. This
  // reduces re-renders and preserves spellcheck highlighting. If the selection
  // is not collapsed, we will re-render.
  var selection = editorState.getSelection();
  var anchorKey = selection.getAnchorKey();

  if (!selection.isCollapsed()) {
    e.preventDefault();
    editor.update(replaceText(editorState, chars, editorState.getCurrentInlineStyle(), getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection())));
    return;
  }

  var newEditorState = replaceText(editorState, chars, editorState.getCurrentInlineStyle(), getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection()));

  // Bunch of different cases follow where we need to prevent native insertion.
  var mustPreventNative = false;
  if (!mustPreventNative) {
    // Browsers tend to insert text in weird places in the DOM when typing at
    // the start of a leaf, so we'll handle it ourselves.
    mustPreventNative = isSelectionAtLeafStart(editor._latestCommittedEditorState);
  }
  if (!mustPreventNative) {
    // Chrome will also split up a node into two pieces if it contains a Tab
    // char, for no explicable reason. Seemingly caused by this commit:
    // https://chromium.googlesource.com/chromium/src/+/013ac5eaf3%5E%21/
    var nativeSelection = global.getSelection();
    // Selection is necessarily collapsed at this point due to earlier check.
    if (nativeSelection.anchorNode !== null && nativeSelection.anchorNode.nodeType === Node.TEXT_NODE) {
      // See isTabHTMLSpanElement in chromium EditingUtilities.cpp.
      var parentNode = nativeSelection.anchorNode.parentNode;
      mustPreventNative = parentNode.nodeName === 'SPAN' && parentNode.firstChild.nodeType === Node.TEXT_NODE && parentNode.firstChild.nodeValue.indexOf('\t') !== -1;
    }
  }
  if (!mustPreventNative) {
    // Check the old and new "fingerprints" of the current block to determine
    // whether this insertion requires any addition or removal of text nodes,
    // in which case we would prevent the native character insertion.
    var originalFingerprint = BlockTree.getFingerprint(editorState.getBlockTree(anchorKey));
    var newFingerprint = BlockTree.getFingerprint(newEditorState.getBlockTree(anchorKey));
    mustPreventNative = originalFingerprint !== newFingerprint;
  }
  if (!mustPreventNative) {
    mustPreventNative = mustPreventDefaultForCharacter(chars);
  }
  if (!mustPreventNative) {
    mustPreventNative = nullthrows(newEditorState.getDirectionMap()).get(anchorKey) !== nullthrows(editorState.getDirectionMap()).get(anchorKey);
  }

  if (mustPreventNative) {
    e.preventDefault();
    editor.update(newEditorState);
    return;
  }

  // We made it all the way! Let the browser do its thing and insert the char.
  newEditorState = EditorState.set(newEditorState, {
    nativelyRenderedContent: newEditorState.getCurrentContent()
  });
  // The native event is allowed to occur. To allow user onChange handlers to
  // change the inserted text, we wait until the text is actually inserted
  // before we actually update our state. That way when we rerender, the text
  // we see in the DOM will already have been inserted properly.
  editor._pendingStateFromBeforeInput = newEditorState;
  setImmediate(function () {
    if (editor._pendingStateFromBeforeInput !== undefined) {
      editor.update(editor._pendingStateFromBeforeInput);
      editor._pendingStateFromBeforeInput = undefined;
    }
  });
}

module.exports = editOnBeforeInput;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnBlur
 * 
 */



var EditorState = __webpack_require__(1);

var containsNode = __webpack_require__(28);
var getActiveElement = __webpack_require__(39);

function editOnBlur(editor, e) {
  // In a contentEditable element, when you select a range and then click
  // another active element, this does trigger a `blur` event but will not
  // remove the DOM selection from the contenteditable.
  // This is consistent across all browsers, but we prefer that the editor
  // behave like a textarea, where a `blur` event clears the DOM selection.
  // We therefore force the issue to be certain, checking whether the active
  // element is `body` to force it when blurring occurs within the window (as
  // opposed to clicking to another tab or window).
  if (getActiveElement() === document.body) {
    var _selection = global.getSelection();
    var editorNode = editor.refs.editor;
    if (_selection.rangeCount === 1 && containsNode(editorNode, _selection.anchorNode) && containsNode(editorNode, _selection.focusNode)) {
      _selection.removeAllRanges();
    }
  }

  var editorState = editor._latestEditorState;
  var currentSelection = editorState.getSelection();
  if (!currentSelection.getHasFocus()) {
    return;
  }

  var selection = currentSelection.set('hasFocus', false);
  editor.props.onBlur && editor.props.onBlur(e);
  editor.update(EditorState.acceptSelection(editorState, selection));
}

module.exports = editOnBlur;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnCompositionStart
 * 
 */



var EditorState = __webpack_require__(1);

/**
 * The user has begun using an IME input system. Switching to `composite` mode
 * allows handling composition input and disables other edit behavior.
 */
function editOnCompositionStart(editor, e) {
  editor.setMode('composite');
  editor.update(EditorState.set(editor._latestEditorState, { inCompositionMode: true }));
  // Allow composition handler to interpret the compositionstart event
  editor._onCompositionStart(e);
}

module.exports = editOnCompositionStart;

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnCopy
 * 
 */



var getFragmentFromSelection = __webpack_require__(88);

/**
 * If we have a selection, create a ContentState fragment and store
 * it in our internal clipboard. Subsequent paste events will use this
 * fragment if no external clipboard data is supplied.
 */
function editOnCopy(editor, e) {
  var editorState = editor._latestEditorState;
  var selection = editorState.getSelection();

  // No selection, so there's nothing to copy.
  if (selection.isCollapsed()) {
    e.preventDefault();
    return;
  }

  editor.setClipboard(getFragmentFromSelection(editor._latestEditorState));
}

module.exports = editOnCopy;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnCut
 * 
 */



var DraftModifier = __webpack_require__(6);
var EditorState = __webpack_require__(1);
var Style = __webpack_require__(31);

var getFragmentFromSelection = __webpack_require__(88);
var getScrollPosition = __webpack_require__(32);

/**
 * On `cut` events, native behavior is allowed to occur so that the system
 * clipboard is set properly. This means that we need to take steps to recover
 * the editor DOM state after the `cut` has occurred in order to maintain
 * control of the component.
 *
 * In addition, we can keep a copy of the removed fragment, including all
 * styles and entities, for use as an internal paste.
 */
function editOnCut(editor, e) {
  var editorState = editor._latestEditorState;
  var selection = editorState.getSelection();

  // No selection, so there's nothing to cut.
  if (selection.isCollapsed()) {
    e.preventDefault();
    return;
  }

  // Track the current scroll position so that it can be forced back in place
  // after the editor regains control of the DOM.
  // $FlowFixMe e.target should be an instanceof Node
  var scrollParent = Style.getScrollParent(e.target);

  var _getScrollPosition = getScrollPosition(scrollParent),
      x = _getScrollPosition.x,
      y = _getScrollPosition.y;

  var fragment = getFragmentFromSelection(editorState);
  editor.setClipboard(fragment);

  // Set `cut` mode to disable all event handling temporarily.
  editor.setMode('cut');

  // Let native `cut` behavior occur, then recover control.
  setTimeout(function () {
    editor.restoreEditorDOM({ x: x, y: y });
    editor.exitCurrentMode();
    editor.update(removeFragment(editorState));
  }, 0);
}

function removeFragment(editorState) {
  var newContent = DraftModifier.removeRange(editorState.getCurrentContent(), editorState.getSelection(), 'forward');
  return EditorState.push(editorState, newContent, 'remove-range');
}

module.exports = editOnCut;

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnDragOver
 * 
 */



/**
 * Drag behavior has begun from outside the editor element.
 */
function editOnDragOver(editor, e) {
  editor._internalDrag = false;
  editor.setMode('drag');
  e.preventDefault();
}

module.exports = editOnDragOver;

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnDragStart
 * 
 */



/**
 * A `dragstart` event has begun within the text editor component.
 */
function editOnDragStart(editor) {
  editor._internalDrag = true;
  editor.setMode('drag');
}

module.exports = editOnDragStart;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnFocus
 * 
 */



var EditorState = __webpack_require__(1);
var UserAgent = __webpack_require__(5);

function editOnFocus(editor, e) {
  var editorState = editor._latestEditorState;
  var currentSelection = editorState.getSelection();
  if (currentSelection.getHasFocus()) {
    return;
  }

  var selection = currentSelection.set('hasFocus', true);
  editor.props.onFocus && editor.props.onFocus(e);

  // When the tab containing this text editor is hidden and the user does a
  // find-in-page in a _different_ tab, Chrome on Mac likes to forget what the
  // selection was right after sending this focus event and (if you let it)
  // moves the cursor back to the beginning of the editor, so we force the
  // selection here instead of simply accepting it in order to preserve the
  // old cursor position. See https://crbug.com/540004.
  // But it looks like this is fixed in Chrome 60.0.3081.0.
  // Other browsers also don't have this bug, so we prefer to acceptSelection
  // when possible, to ensure that unfocusing and refocusing a Draft editor
  // doesn't preserve the selection, matching how textareas work.
  if (UserAgent.isBrowser('Chrome < 60.0.3081.0')) {
    editor.update(EditorState.forceSelection(editorState, selection));
  } else {
    editor.update(EditorState.acceptSelection(editorState, selection));
  }
}

module.exports = editOnFocus;

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnInput
 * 
 */



var DraftFeatureFlags = __webpack_require__(81);
var DraftModifier = __webpack_require__(6);
var DraftOffsetKey = __webpack_require__(35);
var EditorState = __webpack_require__(1);
var UserAgent = __webpack_require__(5);

var findAncestorOffsetKey = __webpack_require__(51);
var nullthrows = __webpack_require__(4);

var isGecko = UserAgent.isEngine('Gecko');

var DOUBLE_NEWLINE = '\n\n';

/**
 * This function is intended to handle spellcheck and autocorrect changes,
 * which occur in the DOM natively without any opportunity to observe or
 * interpret the changes before they occur.
 *
 * The `input` event fires in contentEditable elements reliably for non-IE
 * browsers, immediately after changes occur to the editor DOM. Since our other
 * handlers override or otherwise handle cover other varieties of text input,
 * the DOM state should match the model in all controlled input cases. Thus,
 * when an `input` change leads to a DOM/model mismatch, the change should be
 * due to a spellcheck change, and we can incorporate it into our model.
 */
function editOnInput(editor) {
  if (editor._pendingStateFromBeforeInput !== undefined) {
    editor.update(editor._pendingStateFromBeforeInput);
    editor._pendingStateFromBeforeInput = undefined;
  }

  var domSelection = global.getSelection();

  var anchorNode = domSelection.anchorNode,
      isCollapsed = domSelection.isCollapsed;

  var isNotTextNode = anchorNode.nodeType !== Node.TEXT_NODE;
  var isNotTextOrElementNode = anchorNode.nodeType !== Node.TEXT_NODE && anchorNode.nodeType !== Node.ELEMENT_NODE;

  if (DraftFeatureFlags.draft_killswitch_allow_nontextnodes) {
    if (isNotTextNode) {
      return;
    }
  } else {
    if (isNotTextOrElementNode) {
      // TODO: (t16149272) figure out context for this change
      return;
    }
  }

  if (anchorNode.nodeType === Node.TEXT_NODE && (anchorNode.previousSibling !== null || anchorNode.nextSibling !== null)) {
    // When typing at the beginning of a visual line, Chrome splits the text
    // nodes into two. Why? No one knows. This commit is suspicious:
    // https://chromium.googlesource.com/chromium/src/+/a3b600981286b135632371477f902214c55a1724
    // To work around, we'll merge the sibling text nodes back into this one.
    var span = anchorNode.parentNode;
    anchorNode.nodeValue = span.textContent;
    for (var child = span.firstChild; child !== null; child = child.nextSibling) {
      if (child !== anchorNode) {
        span.removeChild(child);
      }
    }
  }

  var domText = anchorNode.textContent;
  var editorState = editor._latestEditorState;
  var offsetKey = nullthrows(findAncestorOffsetKey(anchorNode));

  var _DraftOffsetKey$decod = DraftOffsetKey.decode(offsetKey),
      blockKey = _DraftOffsetKey$decod.blockKey,
      decoratorKey = _DraftOffsetKey$decod.decoratorKey,
      leafKey = _DraftOffsetKey$decod.leafKey;

  var _editorState$getBlock = editorState.getBlockTree(blockKey).getIn([decoratorKey, 'leaves', leafKey]),
      start = _editorState$getBlock.start,
      end = _editorState$getBlock.end;

  var content = editorState.getCurrentContent();
  var block = content.getBlockForKey(blockKey);
  var modelText = block.getText().slice(start, end);

  // Special-case soft newlines here. If the DOM text ends in a soft newline,
  // we will have manually inserted an extra soft newline in DraftEditorLeaf.
  // We want to remove this extra newline for the purpose of our comparison
  // of DOM and model text.
  if (domText.endsWith(DOUBLE_NEWLINE)) {
    domText = domText.slice(0, -1);
  }

  // No change -- the DOM is up to date. Nothing to do here.
  if (domText === modelText) {
    // This can be buggy for some Android keyboards because they don't fire
    // standard onkeydown/pressed events and only fired editOnInput
    // so domText is already changed by the browser and ends up being equal
    // to modelText unexpectedly
    return;
  }

  var selection = editorState.getSelection();

  // We'll replace the entire leaf with the text content of the target.
  var targetRange = selection.merge({
    anchorOffset: start,
    focusOffset: end,
    isBackward: false
  });

  var entityKey = block.getEntityAt(start);
  var entity = entityKey && content.getEntity(entityKey);
  var entityType = entity && entity.getMutability();
  var preserveEntity = entityType === 'MUTABLE';

  // Immutable or segmented entities cannot properly be handled by the
  // default browser undo, so we have to use a different change type to
  // force using our internal undo method instead of falling through to the
  // native browser undo.
  var changeType = preserveEntity ? 'spellcheck-change' : 'apply-entity';

  var newContent = DraftModifier.replaceText(content, targetRange, domText, block.getInlineStyleAt(start), preserveEntity ? block.getEntityAt(start) : null);

  var anchorOffset, focusOffset, startOffset, endOffset;

  if (isGecko) {
    // Firefox selection does not change while the context menu is open, so
    // we preserve the anchor and focus values of the DOM selection.
    anchorOffset = domSelection.anchorOffset;
    focusOffset = domSelection.focusOffset;
    startOffset = start + Math.min(anchorOffset, focusOffset);
    endOffset = startOffset + Math.abs(anchorOffset - focusOffset);
    anchorOffset = startOffset;
    focusOffset = endOffset;
  } else {
    // Browsers other than Firefox may adjust DOM selection while the context
    // menu is open, and Safari autocorrect is prone to providing an inaccurate
    // DOM selection. Don't trust it. Instead, use our existing SelectionState
    // and adjust it based on the number of characters changed during the
    // mutation.
    var charDelta = domText.length - modelText.length;
    startOffset = selection.getStartOffset();
    endOffset = selection.getEndOffset();

    anchorOffset = isCollapsed ? endOffset + charDelta : startOffset;
    focusOffset = endOffset + charDelta;
  }

  // Segmented entities are completely or partially removed when their
  // text content changes. For this case we do not want any text to be selected
  // after the change, so we are not merging the selection.
  var contentWithAdjustedDOMSelection = newContent.merge({
    selectionBefore: content.getSelectionAfter(),
    selectionAfter: selection.merge({ anchorOffset: anchorOffset, focusOffset: focusOffset })
  });

  editor.update(EditorState.push(editorState, contentWithAdjustedDOMSelection, changeType));
}

module.exports = editOnInput;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnKeyDown
 * 
 */



var DraftModifier = __webpack_require__(6);
var EditorState = __webpack_require__(1);
var KeyBindingUtil = __webpack_require__(50);
var Keys = __webpack_require__(30);
var SecondaryClipboard = __webpack_require__(176);
var UserAgent = __webpack_require__(5);

var isEventHandled = __webpack_require__(38);
var keyCommandBackspaceToStartOfLine = __webpack_require__(207);
var keyCommandBackspaceWord = __webpack_require__(208);
var keyCommandDeleteWord = __webpack_require__(209);
var keyCommandInsertNewline = __webpack_require__(210);
var keyCommandMoveSelectionToEndOfBlock = __webpack_require__(211);
var keyCommandMoveSelectionToStartOfBlock = __webpack_require__(212);
var keyCommandPlainBackspace = __webpack_require__(213);
var keyCommandPlainDelete = __webpack_require__(214);
var keyCommandTransposeCharacters = __webpack_require__(215);
var keyCommandUndo = __webpack_require__(216);

var isOptionKeyCommand = KeyBindingUtil.isOptionKeyCommand;

var isChrome = UserAgent.isBrowser('Chrome');

/**
 * Map a `DraftEditorCommand` command value to a corresponding function.
 */
function onKeyCommand(command, editorState) {
  switch (command) {
    case 'redo':
      return EditorState.redo(editorState);
    case 'delete':
      return keyCommandPlainDelete(editorState);
    case 'delete-word':
      return keyCommandDeleteWord(editorState);
    case 'backspace':
      return keyCommandPlainBackspace(editorState);
    case 'backspace-word':
      return keyCommandBackspaceWord(editorState);
    case 'backspace-to-start-of-line':
      return keyCommandBackspaceToStartOfLine(editorState);
    case 'split-block':
      return keyCommandInsertNewline(editorState);
    case 'transpose-characters':
      return keyCommandTransposeCharacters(editorState);
    case 'move-selection-to-start-of-block':
      return keyCommandMoveSelectionToStartOfBlock(editorState);
    case 'move-selection-to-end-of-block':
      return keyCommandMoveSelectionToEndOfBlock(editorState);
    case 'secondary-cut':
      return SecondaryClipboard.cut(editorState);
    case 'secondary-paste':
      return SecondaryClipboard.paste(editorState);
    default:
      return editorState;
  }
}

/**
 * Intercept keydown behavior to handle keys and commands manually, if desired.
 *
 * Keydown combinations may be mapped to `DraftCommand` values, which may
 * correspond to command functions that modify the editor or its contents.
 *
 * See `getDefaultKeyBinding` for defaults. Alternatively, the top-level
 * component may provide a custom mapping via the `keyBindingFn` prop.
 */
function editOnKeyDown(editor, e) {
  var keyCode = e.which;
  var editorState = editor._latestEditorState;

  switch (keyCode) {
    case Keys.RETURN:
      e.preventDefault();
      // The top-level component may manually handle newline insertion. If
      // no special handling is performed, fall through to command handling.
      if (editor.props.handleReturn && isEventHandled(editor.props.handleReturn(e, editorState))) {
        return;
      }
      break;
    case Keys.ESC:
      e.preventDefault();
      editor.props.onEscape && editor.props.onEscape(e);
      return;
    case Keys.TAB:
      editor.props.onTab && editor.props.onTab(e);
      return;
    case Keys.UP:
      editor.props.onUpArrow && editor.props.onUpArrow(e);
      return;
    case Keys.DOWN:
      editor.props.onDownArrow && editor.props.onDownArrow(e);
      return;
    case Keys.SPACE:
      // Handling for OSX where option + space scrolls.
      if (isChrome && isOptionKeyCommand(e)) {
        e.preventDefault();
        // Insert a nbsp into the editor.
        var contentState = DraftModifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), '\xA0');
        editor.update(EditorState.push(editorState, contentState, 'insert-characters'));
        return;
      }
  }

  var command = editor.props.keyBindingFn(e);

  // If no command is specified, allow keydown event to continue.
  if (!command) {
    return;
  }

  if (command === 'undo') {
    // Since undo requires some special updating behavior to keep the editor
    // in sync, handle it separately.
    keyCommandUndo(e, editorState, editor.update);
    return;
  }

  // At this point, we know that we're handling a command of some kind, so
  // we don't want to insert a character following the keydown.
  e.preventDefault();

  // Allow components higher up the tree to handle the command first.
  if (editor.props.handleKeyCommand && isEventHandled(editor.props.handleKeyCommand(command, editorState))) {
    return;
  }

  var newState = onKeyCommand(command, editorState);
  if (newState !== editorState) {
    editor.update(newState);
  }
}

module.exports = editOnKeyDown;

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnPaste
 * 
 */



var BlockMapBuilder = __webpack_require__(25);
var CharacterMetadata = __webpack_require__(13);
var DataTransfer = __webpack_require__(55);
var DraftModifier = __webpack_require__(6);
var DraftPasteProcessor = __webpack_require__(174);
var EditorState = __webpack_require__(1);
var RichTextEditorUtil = __webpack_require__(84);

var getEntityKeyForSelection = __webpack_require__(52);
var getTextContentFromFiles = __webpack_require__(92);
var isEventHandled = __webpack_require__(38);
var splitTextIntoTextBlocks = __webpack_require__(222);

/**
 * Paste content.
 */
function editOnPaste(editor, e) {
  e.preventDefault();
  var data = new DataTransfer(e.clipboardData);

  // Get files, unless this is likely to be a string the user wants inline.
  if (!data.isRichText()) {
    var files = data.getFiles();
    var defaultFileText = data.getText();
    if (files.length > 0) {
      // Allow customized paste handling for images, etc. Otherwise, fall
      // through to insert text contents into the editor.
      if (editor.props.handlePastedFiles && isEventHandled(editor.props.handlePastedFiles(files))) {
        return;
      }

      getTextContentFromFiles(files, function ( /*string*/fileText) {
        fileText = fileText || defaultFileText;
        if (!fileText) {
          return;
        }

        var editorState = editor._latestEditorState;
        var blocks = splitTextIntoTextBlocks(fileText);
        var character = CharacterMetadata.create({
          style: editorState.getCurrentInlineStyle(),
          entity: getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection())
        });
        var currentBlockType = RichTextEditorUtil.getCurrentBlockType(editorState);

        var text = DraftPasteProcessor.processText(blocks, character, currentBlockType);
        var fragment = BlockMapBuilder.createFromArray(text);

        var withInsertedText = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), fragment);

        editor.update(EditorState.push(editorState, withInsertedText, 'insert-fragment'));
      });

      return;
    }
  }

  var textBlocks = [];
  var text = data.getText();
  var html = data.getHTML();
  var editorState = editor._latestEditorState;

  if (editor.props.handlePastedText && isEventHandled(editor.props.handlePastedText(text, html, editorState))) {
    return;
  }

  if (text) {
    textBlocks = splitTextIntoTextBlocks(text);
  }

  if (!editor.props.stripPastedStyles) {
    // If the text from the paste event is rich content that matches what we
    // already have on the internal clipboard, assume that we should just use
    // the clipboard fragment for the paste. This will allow us to preserve
    // styling and entities, if any are present. Note that newlines are
    // stripped during comparison -- this is because copy/paste within the
    // editor in Firefox and IE will not include empty lines. The resulting
    // paste will preserve the newlines correctly.
    var internalClipboard = editor.getClipboard();
    if (data.isRichText() && internalClipboard) {
      if (
      // If the editorKey is present in the pasted HTML, it should be safe to
      // assume this is an internal paste.
      html.indexOf(editor.getEditorKey()) !== -1 ||
      // The copy may have been made within a single block, in which case the
      // editor key won't be part of the paste. In this case, just check
      // whether the pasted text matches the internal clipboard.
      textBlocks.length === 1 && internalClipboard.size === 1 && internalClipboard.first().getText() === text) {
        editor.update(insertFragment(editor._latestEditorState, internalClipboard));
        return;
      }
    } else if (internalClipboard && data.types.includes('com.apple.webarchive') && !data.types.includes('text/html') && areTextBlocksAndClipboardEqual(textBlocks, internalClipboard)) {
      // Safari does not properly store text/html in some cases.
      // Use the internalClipboard if present and equal to what is on
      // the clipboard. See https://bugs.webkit.org/show_bug.cgi?id=19893.
      editor.update(insertFragment(editor._latestEditorState, internalClipboard));
      return;
    }

    // If there is html paste data, try to parse that.
    if (html) {
      var htmlFragment = DraftPasteProcessor.processHTML(html, editor.props.blockRenderMap);
      if (htmlFragment) {
        var contentBlocks = htmlFragment.contentBlocks,
            entityMap = htmlFragment.entityMap;

        if (contentBlocks) {
          var htmlMap = BlockMapBuilder.createFromArray(contentBlocks);
          editor.update(insertFragment(editor._latestEditorState, htmlMap, entityMap));
          return;
        }
      }
    }

    // Otherwise, create a new fragment from our pasted text. Also
    // empty the internal clipboard, since it's no longer valid.
    editor.setClipboard(null);
  }

  if (textBlocks.length) {
    var character = CharacterMetadata.create({
      style: editorState.getCurrentInlineStyle(),
      entity: getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection())
    });

    var currentBlockType = RichTextEditorUtil.getCurrentBlockType(editorState);

    var textFragment = DraftPasteProcessor.processText(textBlocks, character, currentBlockType);

    var textMap = BlockMapBuilder.createFromArray(textFragment);
    editor.update(insertFragment(editor._latestEditorState, textMap));
  }
}

function insertFragment(editorState, fragment, entityMap) {
  var newContent = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), fragment);
  // TODO: merge the entity map once we stop using DraftEntity
  // like this:
  // const mergedEntityMap = newContent.getEntityMap().merge(entityMap);

  return EditorState.push(editorState, newContent.set('entityMap', entityMap), 'insert-fragment');
}

function areTextBlocksAndClipboardEqual(textBlocks, blockMap) {
  return textBlocks.length === blockMap.size && blockMap.valueSeq().every(function (block, ii) {
    return block.getText() === textBlocks[ii];
  });
}

module.exports = editOnPaste;

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnSelect
 * 
 */



var EditorState = __webpack_require__(1);
var ReactDOM = __webpack_require__(8);

var getDraftEditorSelection = __webpack_require__(201);
var invariant = __webpack_require__(0);

function editOnSelect(editor) {
  if (editor._blockSelectEvents || editor._latestEditorState !== editor.props.editorState) {
    return;
  }

  var editorState = editor.props.editorState;
  var editorNode = ReactDOM.findDOMNode(editor.refs.editorContainer);
  !editorNode ?  false ? invariant(false, 'Missing editorNode') : invariant(false) : void 0;
  !(editorNode.firstChild instanceof HTMLElement) ?  false ? invariant(false, 'editorNode.firstChild is not an HTMLElement') : invariant(false) : void 0;
  var documentSelection = getDraftEditorSelection(editorState, editorNode.firstChild);
  var updatedSelectionState = documentSelection.selectionState;

  if (updatedSelectionState !== editorState.getSelection()) {
    if (documentSelection.needsRecovery) {
      editorState = EditorState.forceSelection(editorState, updatedSelectionState);
    } else {
      editorState = EditorState.acceptSelection(editorState, updatedSelectionState);
    }
    editor.update(editorState);
  }
}

module.exports = editOnSelect;

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule encodeEntityRanges
 * @typechecks
 * 
 */



var DraftStringKey = __webpack_require__(83);
var UnicodeUtils = __webpack_require__(14);

var strlen = UnicodeUtils.strlen;

/**
 * Convert to UTF-8 character counts for storage.
 */

function encodeEntityRanges(block, storageMap) {
  var encoded = [];
  block.findEntityRanges(function (character) {
    return !!character.getEntity();
  }, function ( /*number*/start, /*number*/end) {
    var text = block.getText();
    var key = block.getEntityAt(start);
    encoded.push({
      offset: strlen(text.slice(0, start)),
      length: strlen(text.slice(start, end)),
      // Encode the key as a number for range storage.
      key: Number(storageMap[DraftStringKey.stringify(key)])
    });
  });
  return encoded;
}

module.exports = encodeEntityRanges;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule encodeInlineStyleRanges
 * 
 */



var UnicodeUtils = __webpack_require__(14);

var findRangesImmutable = __webpack_require__(36);

var areEqual = function areEqual(a, b) {
  return a === b;
};
var isTruthy = function isTruthy(a) {
  return !!a;
};
var EMPTY_ARRAY = [];

/**
 * Helper function for getting encoded styles for each inline style. Convert
 * to UTF-8 character counts for storage.
 */
function getEncodedInlinesForType(block, styleList, styleToEncode) {
  var ranges = [];

  // Obtain an array with ranges for only the specified style.
  var filteredInlines = styleList.map(function (style) {
    return style.has(styleToEncode);
  }).toList();

  findRangesImmutable(filteredInlines, areEqual,
  // We only want to keep ranges with nonzero style values.
  isTruthy, function (start, end) {
    var text = block.getText();
    ranges.push({
      offset: UnicodeUtils.strlen(text.slice(0, start)),
      length: UnicodeUtils.strlen(text.slice(start, end)),
      style: styleToEncode
    });
  });

  return ranges;
}

/*
 * Retrieve the encoded arrays of inline styles, with each individual style
 * treated separately.
 */
function encodeInlineStyleRanges(block) {
  var styleList = block.getCharacterList().map(function (c) {
    return c.getStyle();
  }).toList();
  var ranges = styleList.flatten().toSet().map(function (style) {
    return getEncodedInlinesForType(block, styleList, style);
  });

  return Array.prototype.concat.apply(EMPTY_ARRAY, ranges.toJS());
}

module.exports = encodeInlineStyleRanges;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule expandRangeToStartOfLine
 * @typechecks
 * 
 */

var UnicodeUtils = __webpack_require__(14);

var getRangeClientRects = __webpack_require__(89);
var invariant = __webpack_require__(0);

/**
 * Return the computed line height, in pixels, for the provided element.
 */
function getLineHeightPx(element) {
  var computed = getComputedStyle(element);
  var div = document.createElement('div');
  div.style.fontFamily = computed.fontFamily;
  div.style.fontSize = computed.fontSize;
  div.style.fontStyle = computed.fontStyle;
  div.style.fontWeight = computed.fontWeight;
  div.style.lineHeight = computed.lineHeight;
  div.style.position = 'absolute';
  div.textContent = 'M';

  var documentBody = document.body;
  !documentBody ?  false ? invariant(false, 'Missing document.body') : invariant(false) : void 0;

  // forced layout here
  documentBody.appendChild(div);
  var rect = div.getBoundingClientRect();
  documentBody.removeChild(div);

  return rect.height;
}

/**
 * Return whether every ClientRect in the provided list lies on the same line.
 *
 * We assume that the rects on the same line all contain the baseline, so the
 * lowest top line needs to be above the highest bottom line (i.e., if you were
 * to project the rects onto the y-axis, their intersection would be nonempty).
 *
 * In addition, we require that no two boxes are lineHeight (or more) apart at
 * either top or bottom, which helps protect against false positives for fonts
 * with extremely large glyph heights (e.g., with a font size of 17px, Zapfino
 * produces rects of height 58px!).
 */
function areRectsOnOneLine(rects, lineHeight) {
  var minTop = Infinity;
  var minBottom = Infinity;
  var maxTop = -Infinity;
  var maxBottom = -Infinity;

  for (var ii = 0; ii < rects.length; ii++) {
    var rect = rects[ii];
    if (rect.width === 0 || rect.width === 1) {
      // When a range starts or ends a soft wrap, many browsers (Chrome, IE,
      // Safari) include an empty rect on the previous or next line. When the
      // text lies in a container whose position is not integral (e.g., from
      // margin: auto), Safari makes these empty rects have width 1 (instead of
      // 0). Having one-pixel-wide characters seems unlikely (and most browsers
      // report widths in subpixel precision anyway) so it's relatively safe to
      // skip over them.
      continue;
    }
    minTop = Math.min(minTop, rect.top);
    minBottom = Math.min(minBottom, rect.bottom);
    maxTop = Math.max(maxTop, rect.top);
    maxBottom = Math.max(maxBottom, rect.bottom);
  }

  return maxTop <= minBottom && maxTop - minTop < lineHeight && maxBottom - minBottom < lineHeight;
}

/**
 * Return the length of a node, as used by Range offsets.
 */
function getNodeLength(node) {
  // http://www.w3.org/TR/dom/#concept-node-length
  switch (node.nodeType) {
    case Node.DOCUMENT_TYPE_NODE:
      return 0;
    case Node.TEXT_NODE:
    case Node.PROCESSING_INSTRUCTION_NODE:
    case Node.COMMENT_NODE:
      return node.length;
    default:
      return node.childNodes.length;
  }
}

/**
 * Given a collapsed range, move the start position backwards as far as
 * possible while the range still spans only a single line.
 */
function expandRangeToStartOfLine(range) {
  !range.collapsed ?  false ? invariant(false, 'expandRangeToStartOfLine: Provided range is not collapsed.') : invariant(false) : void 0;
  range = range.cloneRange();

  var containingElement = range.startContainer;
  if (containingElement.nodeType !== 1) {
    containingElement = containingElement.parentNode;
  }
  var lineHeight = getLineHeightPx(containingElement);

  // Imagine our text looks like:
  //   <div><span>once upon a time, there was a <em>boy
  //   who lived</em> </span><q><strong>under^ the
  //   stairs</strong> in a small closet.</q></div>
  // where the caret represents the cursor. First, we crawl up the tree until
  // the range spans multiple lines (setting the start point to before
  // "<strong>", then before "<div>"), then at each level we do a search to
  // find the latest point which is still on a previous line. We'll find that
  // the break point is inside the span, then inside the <em>, then in its text
  // node child, the actual break point before "who".

  var bestContainer = range.endContainer;
  var bestOffset = range.endOffset;
  range.setStart(range.startContainer, 0);

  while (areRectsOnOneLine(getRangeClientRects(range), lineHeight)) {
    bestContainer = range.startContainer;
    bestOffset = range.startOffset;
    !bestContainer.parentNode ?  false ? invariant(false, 'Found unexpected detached subtree when traversing.') : invariant(false) : void 0;
    range.setStartBefore(bestContainer);
    if (bestContainer.nodeType === 1 && getComputedStyle(bestContainer).display !== 'inline') {
      // The start of the line is never in a different block-level container.
      break;
    }
  }

  // In the above example, range now spans from "<div>" to "under",
  // bestContainer is <div>, and bestOffset is 1 (index of <q> inside <div>)].
  // Picking out which child to recurse into here is a special case since we
  // don't want to check past <q> -- once we find that the final range starts
  // in <span>, we can look at all of its children (and all of their children)
  // to find the break point.

  // At all times, (bestContainer, bestOffset) is the latest single-line start
  // point that we know of.
  var currentContainer = bestContainer;
  var maxIndexToConsider = bestOffset - 1;

  do {
    var nodeValue = currentContainer.nodeValue;

    for (var ii = maxIndexToConsider; ii >= 0; ii--) {
      if (nodeValue != null && ii > 0 && UnicodeUtils.isSurrogatePair(nodeValue, ii - 1)) {
        // We're in the middle of a surrogate pair -- skip over so we never
        // return a range with an endpoint in the middle of a code point.
        continue;
      }

      range.setStart(currentContainer, ii);
      if (areRectsOnOneLine(getRangeClientRects(range), lineHeight)) {
        bestContainer = currentContainer;
        bestOffset = ii;
      } else {
        break;
      }
    }

    if (ii === -1 || currentContainer.childNodes.length === 0) {
      // If ii === -1, then (bestContainer, bestOffset), which is equal to
      // (currentContainer, 0), was a single-line start point but a start
      // point before currentContainer wasn't, so the line break seems to
      // have occurred immediately after currentContainer's start tag
      //
      // If currentContainer.childNodes.length === 0, we're already at a
      // terminal node (e.g., text node) and should return our current best.
      break;
    }

    currentContainer = currentContainer.childNodes[ii];
    maxIndexToConsider = getNodeLength(currentContainer);
  } while (true);

  range.setStart(bestContainer, bestOffset);
  return range;
}

module.exports = expandRangeToStartOfLine;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getCharacterRemovalRange
 * @typechecks
 * 
 */



var DraftEntitySegments = __webpack_require__(171);

var getRangesForDraftEntity = __webpack_require__(203);
var invariant = __webpack_require__(0);

/**
 * Given a SelectionState and a removal direction, determine the entire range
 * that should be removed from a ContentState. This is based on any entities
 * within the target, with their `mutability` values taken into account.
 *
 * For instance, if we are attempting to remove part of an "immutable" entity
 * range, the entire entity must be removed. The returned `SelectionState`
 * will be adjusted accordingly.
 */
function getCharacterRemovalRange(entityMap, startBlock, endBlock, selectionState, direction) {
  var start = selectionState.getStartOffset();
  var end = selectionState.getEndOffset();
  var startEntityKey = startBlock.getEntityAt(start);
  var endEntityKey = endBlock.getEntityAt(end - 1);
  if (!startEntityKey && !endEntityKey) {
    return selectionState;
  }
  var newSelectionState = selectionState;
  if (startEntityKey && startEntityKey === endEntityKey) {
    newSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, true, true);
  } else if (startEntityKey && endEntityKey) {
    var startSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, false, true);
    var endSelectionState = getEntityRemovalRange(entityMap, endBlock, newSelectionState, direction, endEntityKey, false, false);
    newSelectionState = newSelectionState.merge({
      anchorOffset: startSelectionState.getAnchorOffset(),
      focusOffset: endSelectionState.getFocusOffset(),
      isBackward: false
    });
  } else if (startEntityKey) {
    var _startSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, false, true);
    newSelectionState = newSelectionState.merge({
      anchorOffset: _startSelectionState.getStartOffset(),
      isBackward: false
    });
  } else if (endEntityKey) {
    var _endSelectionState = getEntityRemovalRange(entityMap, endBlock, newSelectionState, direction, endEntityKey, false, false);
    newSelectionState = newSelectionState.merge({
      focusOffset: _endSelectionState.getEndOffset(),
      isBackward: false
    });
  }
  return newSelectionState;
}

function getEntityRemovalRange(entityMap, block, selectionState, direction, entityKey, isEntireSelectionWithinEntity, isEntityAtStart) {
  var start = selectionState.getStartOffset();
  var end = selectionState.getEndOffset();
  var entity = entityMap.__get(entityKey);
  var mutability = entity.getMutability();
  var sideToConsider = isEntityAtStart ? start : end;

  // `MUTABLE` entities can just have the specified range of text removed
  // directly. No adjustments are needed.
  if (mutability === 'MUTABLE') {
    return selectionState;
  }

  // Find the entity range that overlaps with our removal range.
  var entityRanges = getRangesForDraftEntity(block, entityKey).filter(function (range) {
    return sideToConsider <= range.end && sideToConsider >= range.start;
  });

  !(entityRanges.length == 1) ?  false ? invariant(false, 'There should only be one entity range within this removal range.') : invariant(false) : void 0;

  var entityRange = entityRanges[0];

  // For `IMMUTABLE` entity types, we will remove the entire entity range.
  if (mutability === 'IMMUTABLE') {
    return selectionState.merge({
      anchorOffset: entityRange.start,
      focusOffset: entityRange.end,
      isBackward: false
    });
  }

  // For `SEGMENTED` entity types, determine the appropriate segment to
  // remove.
  if (!isEntireSelectionWithinEntity) {
    if (isEntityAtStart) {
      end = entityRange.end;
    } else {
      start = entityRange.start;
    }
  }

  var removalRange = DraftEntitySegments.getRemovalRange(start, end, block.getText().slice(entityRange.start, entityRange.end), entityRange.start, direction);

  return selectionState.merge({
    anchorOffset: removalRange.start,
    focusOffset: removalRange.end,
    isBackward: false
  });
}

module.exports = getCharacterRemovalRange;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getDraftEditorSelection
 * @typechecks
 * 
 */



var getDraftEditorSelectionWithNodes = __webpack_require__(87);

/**
 * Convert the current selection range to an anchor/focus pair of offset keys
 * and values that can be interpreted by components.
 */
function getDraftEditorSelection(editorState, root) {
  var selection = global.getSelection();

  // No active selection.
  if (selection.rangeCount === 0) {
    return {
      selectionState: editorState.getSelection().set('hasFocus', false),
      needsRecovery: false
    };
  }

  return getDraftEditorSelectionWithNodes(editorState, root, selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
}

module.exports = getDraftEditorSelection;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getRangeBoundingClientRect
 * @typechecks
 * 
 */



var getRangeClientRects = __webpack_require__(89);

/**
 * Like range.getBoundingClientRect() but normalizes for browser bugs.
 */
function getRangeBoundingClientRect(range) {
  // "Return a DOMRect object describing the smallest rectangle that includes
  // the first rectangle in list and all of the remaining rectangles of which
  // the height or width is not zero."
  // http://www.w3.org/TR/cssom-view/#dom-range-getboundingclientrect
  var rects = getRangeClientRects(range);
  var top = 0;
  var right = 0;
  var bottom = 0;
  var left = 0;

  if (rects.length) {
    // If the first rectangle has 0 width, we use the second, this is needed
    // because Chrome renders a 0 width rectangle when the selection contains
    // a line break.
    if (rects.length > 1 && rects[0].width === 0) {
      var _rects$ = rects[1];
      top = _rects$.top;
      right = _rects$.right;
      bottom = _rects$.bottom;
      left = _rects$.left;
    } else {
      var _rects$2 = rects[0];
      top = _rects$2.top;
      right = _rects$2.right;
      bottom = _rects$2.bottom;
      left = _rects$2.left;
    }

    for (var ii = 1; ii < rects.length; ii++) {
      var rect = rects[ii];
      if (rect.height !== 0 && rect.width !== 0) {
        top = Math.min(top, rect.top);
        right = Math.max(right, rect.right);
        bottom = Math.max(bottom, rect.bottom);
        left = Math.min(left, rect.left);
      }
    }
  }

  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: right - left,
    height: bottom - top
  };
}

module.exports = getRangeBoundingClientRect;

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getRangesForDraftEntity
 * @typechecks
 * 
 */



var invariant = __webpack_require__(0);

/**
 * Obtain the start and end positions of the range that has the
 * specified entity applied to it.
 *
 * Entity keys are applied only to contiguous stretches of text, so this
 * method searches for the first instance of the entity key and returns
 * the subsequent range.
 */
function getRangesForDraftEntity(block, key) {
  var ranges = [];
  block.findEntityRanges(function (c) {
    return c.getEntity() === key;
  }, function (start, end) {
    ranges.push({ start: start, end: end });
  });

  !!!ranges.length ?  false ? invariant(false, 'Entity key not found in this range.') : invariant(false) : void 0;

  return ranges;
}

module.exports = getRangesForDraftEntity;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getVisibleSelectionRect
 * @typechecks
 * 
 */



var getRangeBoundingClientRect = __webpack_require__(202);

/**
 * Return the bounding ClientRect for the visible DOM selection, if any.
 * In cases where there are no selected ranges or the bounding rect is
 * temporarily invalid, return null.
 */
function getVisibleSelectionRect(global) {
  var selection = global.getSelection();
  if (!selection.rangeCount) {
    return null;
  }

  var range = selection.getRangeAt(0);
  var boundingRect = getRangeBoundingClientRect(range);
  var top = boundingRect.top,
      right = boundingRect.right,
      bottom = boundingRect.bottom,
      left = boundingRect.left;

  // When a re-render leads to a node being removed, the DOM selection will
  // temporarily be placed on an ancestor node, which leads to an invalid
  // bounding rect. Discard this state.

  if (top === 0 && right === 0 && bottom === 0 && left === 0) {
    return null;
  }

  return boundingRect;
}

module.exports = getVisibleSelectionRect;

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule insertFragmentIntoContentState
 * @typechecks
 * 
 */



var BlockMapBuilder = __webpack_require__(25);

var generateRandomKey = __webpack_require__(15);
var insertIntoList = __webpack_require__(94);
var invariant = __webpack_require__(0);

function insertFragmentIntoContentState(contentState, selectionState, fragment) {
  !selectionState.isCollapsed() ?  false ? invariant(false, '`insertFragment` should only be called with a collapsed selection state.') : invariant(false) : void 0;

  var targetKey = selectionState.getStartKey();
  var targetOffset = selectionState.getStartOffset();

  var blockMap = contentState.getBlockMap();

  var fragmentSize = fragment.size;
  var finalKey;
  var finalOffset;

  if (fragmentSize === 1) {
    var targetBlock = blockMap.get(targetKey);
    var pastedBlock = fragment.first();
    var text = targetBlock.getText();
    var chars = targetBlock.getCharacterList();

    var newBlock = targetBlock.merge({
      text: text.slice(0, targetOffset) + pastedBlock.getText() + text.slice(targetOffset),
      characterList: insertIntoList(chars, pastedBlock.getCharacterList(), targetOffset),
      data: pastedBlock.getData()
    });

    finalKey = targetKey;
    finalOffset = targetOffset + pastedBlock.getText().length;

    return contentState.merge({
      blockMap: blockMap.set(targetKey, newBlock),
      selectionBefore: selectionState,
      selectionAfter: selectionState.merge({
        anchorKey: finalKey,
        anchorOffset: finalOffset,
        focusKey: finalKey,
        focusOffset: finalOffset,
        isBackward: false
      })
    });
  }

  var newBlockArr = [];

  contentState.getBlockMap().forEach(function (block, blockKey) {
    if (blockKey !== targetKey) {
      newBlockArr.push(block);
      return;
    }

    var text = block.getText();
    var chars = block.getCharacterList();

    // Modify head portion of block.
    var blockSize = text.length;
    var headText = text.slice(0, targetOffset);
    var headCharacters = chars.slice(0, targetOffset);
    var appendToHead = fragment.first();

    var modifiedHead = block.merge({
      text: headText + appendToHead.getText(),
      characterList: headCharacters.concat(appendToHead.getCharacterList()),
      type: headText ? block.getType() : appendToHead.getType(),
      data: appendToHead.getData()
    });

    newBlockArr.push(modifiedHead);

    // Insert fragment blocks after the head and before the tail.
    fragment.slice(1, fragmentSize - 1).forEach(function (fragmentBlock) {
      newBlockArr.push(fragmentBlock.set('key', generateRandomKey()));
    });

    // Modify tail portion of block.
    var tailText = text.slice(targetOffset, blockSize);
    var tailCharacters = chars.slice(targetOffset, blockSize);
    var prependToTail = fragment.last();
    finalKey = generateRandomKey();

    var modifiedTail = prependToTail.merge({
      key: finalKey,
      text: prependToTail.getText() + tailText,
      characterList: prependToTail.getCharacterList().concat(tailCharacters),
      data: prependToTail.getData()
    });

    newBlockArr.push(modifiedTail);
  });

  finalOffset = fragment.last().getLength();

  return contentState.merge({
    blockMap: BlockMapBuilder.createFromArray(newBlockArr),
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: finalKey,
      anchorOffset: finalOffset,
      focusKey: finalKey,
      focusOffset: finalOffset,
      isBackward: false
    })
  });
}

module.exports = insertFragmentIntoContentState;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule insertTextIntoContentState
 * @typechecks
 * 
 */



var Immutable = __webpack_require__(2);

var insertIntoList = __webpack_require__(94);
var invariant = __webpack_require__(0);

var Repeat = Immutable.Repeat;


function insertTextIntoContentState(contentState, selectionState, text, characterMetadata) {
  !selectionState.isCollapsed() ?  false ? invariant(false, '`insertText` should only be called with a collapsed range.') : invariant(false) : void 0;

  var len = text.length;
  if (!len) {
    return contentState;
  }

  var blockMap = contentState.getBlockMap();
  var key = selectionState.getStartKey();
  var offset = selectionState.getStartOffset();
  var block = blockMap.get(key);
  var blockText = block.getText();

  var newBlock = block.merge({
    text: blockText.slice(0, offset) + text + blockText.slice(offset, block.getLength()),
    characterList: insertIntoList(block.getCharacterList(), Repeat(characterMetadata, len).toList(), offset)
  });

  var newOffset = offset + len;

  return contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: newOffset,
      focusOffset: newOffset
    })
  });
}

module.exports = insertTextIntoContentState;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandBackspaceToStartOfLine
 * 
 */



var EditorState = __webpack_require__(1);

var expandRangeToStartOfLine = __webpack_require__(199);
var getDraftEditorSelectionWithNodes = __webpack_require__(87);
var moveSelectionBackward = __webpack_require__(53);
var removeTextWithStrategy = __webpack_require__(27);

function keyCommandBackspaceToStartOfLine(editorState) {
  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
      return moveSelectionBackward(strategyState, 1);
    }

    var domSelection = global.getSelection();
    var range = domSelection.getRangeAt(0);
    range = expandRangeToStartOfLine(range);

    return getDraftEditorSelectionWithNodes(strategyState, null, range.endContainer, range.endOffset, range.startContainer, range.startOffset).selectionState;
  }, 'backward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  return EditorState.push(editorState, afterRemoval, 'remove-range');
}

module.exports = keyCommandBackspaceToStartOfLine;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandBackspaceWord
 * 
 */



var DraftRemovableWord = __webpack_require__(82);
var EditorState = __webpack_require__(1);

var moveSelectionBackward = __webpack_require__(53);
var removeTextWithStrategy = __webpack_require__(27);

/**
 * Delete the word that is left of the cursor, as well as any spaces or
 * punctuation after the word.
 */
function keyCommandBackspaceWord(editorState) {
  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var offset = selection.getStartOffset();
    // If there are no words before the cursor, remove the preceding newline.
    if (offset === 0) {
      return moveSelectionBackward(strategyState, 1);
    }
    var key = selection.getStartKey();
    var content = strategyState.getCurrentContent();
    var text = content.getBlockForKey(key).getText().slice(0, offset);
    var toRemove = DraftRemovableWord.getBackward(text);
    return moveSelectionBackward(strategyState, toRemove.length || 1);
  }, 'backward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  return EditorState.push(editorState, afterRemoval, 'remove-range');
}

module.exports = keyCommandBackspaceWord;

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandDeleteWord
 * 
 */



var DraftRemovableWord = __webpack_require__(82);
var EditorState = __webpack_require__(1);

var moveSelectionForward = __webpack_require__(96);
var removeTextWithStrategy = __webpack_require__(27);

/**
 * Delete the word that is right of the cursor, as well as any spaces or
 * punctuation before the word.
 */
function keyCommandDeleteWord(editorState) {
  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var offset = selection.getStartOffset();
    var key = selection.getStartKey();
    var content = strategyState.getCurrentContent();
    var text = content.getBlockForKey(key).getText().slice(offset);
    var toRemove = DraftRemovableWord.getForward(text);

    // If there are no words in front of the cursor, remove the newline.
    return moveSelectionForward(strategyState, toRemove.length || 1);
  }, 'forward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  return EditorState.push(editorState, afterRemoval, 'remove-range');
}

module.exports = keyCommandDeleteWord;

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandInsertNewline
 * 
 */



var DraftModifier = __webpack_require__(6);
var EditorState = __webpack_require__(1);

function keyCommandInsertNewline(editorState) {
  var contentState = DraftModifier.splitBlock(editorState.getCurrentContent(), editorState.getSelection());
  return EditorState.push(editorState, contentState, 'split-block');
}

module.exports = keyCommandInsertNewline;

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandMoveSelectionToEndOfBlock
 * 
 */



var EditorState = __webpack_require__(1);

/**
 * See comment for `moveSelectionToStartOfBlock`.
 */
function keyCommandMoveSelectionToEndOfBlock(editorState) {
  var selection = editorState.getSelection();
  var endKey = selection.getEndKey();
  var content = editorState.getCurrentContent();
  var textLength = content.getBlockForKey(endKey).getLength();
  return EditorState.set(editorState, {
    selection: selection.merge({
      anchorKey: endKey,
      anchorOffset: textLength,
      focusKey: endKey,
      focusOffset: textLength,
      isBackward: false
    }),
    forceSelection: true
  });
}

module.exports = keyCommandMoveSelectionToEndOfBlock;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandMoveSelectionToStartOfBlock
 * 
 */



var EditorState = __webpack_require__(1);

/**
 * Collapse selection at the start of the first selected block. This is used
 * for Firefox versions that attempt to navigate forward/backward instead of
 * moving the cursor. Other browsers are able to move the cursor natively.
 */
function keyCommandMoveSelectionToStartOfBlock(editorState) {
  var selection = editorState.getSelection();
  var startKey = selection.getStartKey();
  return EditorState.set(editorState, {
    selection: selection.merge({
      anchorKey: startKey,
      anchorOffset: 0,
      focusKey: startKey,
      focusOffset: 0,
      isBackward: false
    }),
    forceSelection: true
  });
}

module.exports = keyCommandMoveSelectionToStartOfBlock;

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandPlainBackspace
 * 
 */



var EditorState = __webpack_require__(1);
var UnicodeUtils = __webpack_require__(14);

var moveSelectionBackward = __webpack_require__(53);
var removeTextWithStrategy = __webpack_require__(27);

/**
 * Remove the selected range. If the cursor is collapsed, remove the preceding
 * character. This operation is Unicode-aware, so removing a single character
 * will remove a surrogate pair properly as well.
 */
function keyCommandPlainBackspace(editorState) {
  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var content = strategyState.getCurrentContent();
    var key = selection.getAnchorKey();
    var offset = selection.getAnchorOffset();
    var charBehind = content.getBlockForKey(key).getText()[offset - 1];
    return moveSelectionBackward(strategyState, charBehind ? UnicodeUtils.getUTF16Length(charBehind, 0) : 1);
  }, 'backward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  var selection = editorState.getSelection();
  return EditorState.push(editorState, afterRemoval.set('selectionBefore', selection), selection.isCollapsed() ? 'backspace-character' : 'remove-range');
}

module.exports = keyCommandPlainBackspace;

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandPlainDelete
 * 
 */



var EditorState = __webpack_require__(1);
var UnicodeUtils = __webpack_require__(14);

var moveSelectionForward = __webpack_require__(96);
var removeTextWithStrategy = __webpack_require__(27);

/**
 * Remove the selected range. If the cursor is collapsed, remove the following
 * character. This operation is Unicode-aware, so removing a single character
 * will remove a surrogate pair properly as well.
 */
function keyCommandPlainDelete(editorState) {
  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var content = strategyState.getCurrentContent();
    var key = selection.getAnchorKey();
    var offset = selection.getAnchorOffset();
    var charAhead = content.getBlockForKey(key).getText()[offset];
    return moveSelectionForward(strategyState, charAhead ? UnicodeUtils.getUTF16Length(charAhead, 0) : 1);
  }, 'forward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  var selection = editorState.getSelection();

  return EditorState.push(editorState, afterRemoval.set('selectionBefore', selection), selection.isCollapsed() ? 'delete-character' : 'remove-range');
}

module.exports = keyCommandPlainDelete;

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandTransposeCharacters
 * 
 */



var DraftModifier = __webpack_require__(6);
var EditorState = __webpack_require__(1);

var getContentStateFragment = __webpack_require__(37);

/**
 * Transpose the characters on either side of a collapsed cursor, or
 * if the cursor is at the end of the block, transpose the last two
 * characters.
 */
function keyCommandTransposeCharacters(editorState) {
  var selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    return editorState;
  }

  var offset = selection.getAnchorOffset();
  if (offset === 0) {
    return editorState;
  }

  var blockKey = selection.getAnchorKey();
  var content = editorState.getCurrentContent();
  var block = content.getBlockForKey(blockKey);
  var length = block.getLength();

  // Nothing to transpose if there aren't two characters.
  if (length <= 1) {
    return editorState;
  }

  var removalRange;
  var finalSelection;

  if (offset === length) {
    // The cursor is at the end of the block. Swap the last two characters.
    removalRange = selection.set('anchorOffset', offset - 1);
    finalSelection = selection;
  } else {
    removalRange = selection.set('focusOffset', offset + 1);
    finalSelection = removalRange.set('anchorOffset', offset + 1);
  }

  // Extract the character to move as a fragment. This preserves its
  // styling and entity, if any.
  var movedFragment = getContentStateFragment(content, removalRange);
  var afterRemoval = DraftModifier.removeRange(content, removalRange, 'backward');

  // After the removal, the insertion target is one character back.
  var selectionAfter = afterRemoval.getSelectionAfter();
  var targetOffset = selectionAfter.getAnchorOffset() - 1;
  var targetRange = selectionAfter.merge({
    anchorOffset: targetOffset,
    focusOffset: targetOffset
  });

  var afterInsert = DraftModifier.replaceWithFragment(afterRemoval, targetRange, movedFragment);

  var newEditorState = EditorState.push(editorState, afterInsert, 'insert-fragment');

  return EditorState.acceptSelection(newEditorState, finalSelection);
}

module.exports = keyCommandTransposeCharacters;

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandUndo
 * 
 */



var EditorState = __webpack_require__(1);

function keyCommandUndo(e, editorState, updateFn) {
  var undoneState = EditorState.undo(editorState);

  // If the last change to occur was a spellcheck change, allow the undo
  // event to fall through to the browser. This allows the browser to record
  // the unwanted change, which should soon lead it to learn not to suggest
  // the correction again.
  if (editorState.getLastChangeType() === 'spellcheck-change') {
    var nativelyRenderedContent = undoneState.getCurrentContent();
    updateFn(EditorState.set(undoneState, { nativelyRenderedContent: nativelyRenderedContent }));
    return;
  }

  // Otheriwse, manage the undo behavior manually.
  e.preventDefault();
  if (!editorState.getNativelyRenderedContent()) {
    updateFn(undoneState);
    return;
  }

  // Trigger a re-render with the current content state to ensure that the
  // component tree has up-to-date props for comparison.
  updateFn(EditorState.set(editorState, { nativelyRenderedContent: null }));

  // Wait to ensure that the re-render has occurred before performing
  // the undo action.
  setTimeout(function () {
    updateFn(undoneState);
  }, 0);
}

module.exports = keyCommandUndo;

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule modifyBlockForContentState
 * @typechecks
 * 
 */



var Immutable = __webpack_require__(2);

var Map = Immutable.Map;


function modifyBlockForContentState(contentState, selectionState, operation) {
  var startKey = selectionState.getStartKey();
  var endKey = selectionState.getEndKey();
  var blockMap = contentState.getBlockMap();
  var newBlocks = blockMap.toSeq().skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).concat(Map([[endKey, blockMap.get(endKey)]])).map(operation);

  return contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

module.exports = modifyBlockForContentState;

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule moveBlockInContentState
 * @typechecks
 * 
 */



var invariant = __webpack_require__(0);

function moveBlockInContentState(contentState, blockToBeMoved, targetBlock, insertionMode) {
  !(blockToBeMoved.getKey() !== targetBlock.getKey()) ?  false ? invariant(false, 'Block cannot be moved next to itself.') : invariant(false) : void 0;

  !(insertionMode !== 'replace') ?  false ? invariant(false, 'Replacing blocks is not supported.') : invariant(false) : void 0;

  var targetKey = targetBlock.getKey();
  var blockBefore = contentState.getBlockBefore(targetKey);
  var blockAfter = contentState.getBlockAfter(targetKey);

  var blockMap = contentState.getBlockMap();
  var blockMapWithoutBlockToBeMoved = blockMap['delete'](blockToBeMoved.getKey());
  var blocksBefore = blockMapWithoutBlockToBeMoved.toSeq().takeUntil(function (v) {
    return v === targetBlock;
  });
  var blocksAfter = blockMapWithoutBlockToBeMoved.toSeq().skipUntil(function (v) {
    return v === targetBlock;
  }).skip(1);

  var newBlocks = void 0;

  if (insertionMode === 'before') {
    !(!blockBefore || blockBefore.getKey() !== blockToBeMoved.getKey()) ?  false ? invariant(false, 'Block cannot be moved next to itself.') : invariant(false) : void 0;

    newBlocks = blocksBefore.concat([[blockToBeMoved.getKey(), blockToBeMoved], [targetBlock.getKey(), targetBlock]], blocksAfter).toOrderedMap();
  } else if (insertionMode === 'after') {
    !(!blockAfter || blockAfter.getKey() !== blockToBeMoved.getKey()) ?  false ? invariant(false, 'Block cannot be moved next to itself.') : invariant(false) : void 0;

    newBlocks = blocksBefore.concat([[targetBlock.getKey(), targetBlock], [blockToBeMoved.getKey(), blockToBeMoved]], blocksAfter).toOrderedMap();
  }

  return contentState.merge({
    blockMap: newBlocks,
    selectionBefore: contentState.getSelectionAfter(),
    selectionAfter: contentState.getSelectionAfter().merge({
      anchorKey: blockToBeMoved.getKey(),
      focusKey: blockToBeMoved.getKey()
    })
  });
}

module.exports = moveBlockInContentState;

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule removeRangeFromContentState
 * 
 */



var Immutable = __webpack_require__(2);

function removeRangeFromContentState(contentState, selectionState) {
  if (selectionState.isCollapsed()) {
    return contentState;
  }

  var blockMap = contentState.getBlockMap();
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  var startBlock = blockMap.get(startKey);
  var endBlock = blockMap.get(endKey);
  var characterList;

  if (startBlock === endBlock) {
    characterList = removeFromList(startBlock.getCharacterList(), startOffset, endOffset);
  } else {
    characterList = startBlock.getCharacterList().slice(0, startOffset).concat(endBlock.getCharacterList().slice(endOffset));
  }

  var modifiedStart = startBlock.merge({
    text: startBlock.getText().slice(0, startOffset) + endBlock.getText().slice(endOffset),
    characterList: characterList
  });

  var newBlocks = blockMap.toSeq().skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).concat(Immutable.Map([[endKey, null]])).map(function (_, k) {
    return k === startKey ? modifiedStart : null;
  });

  blockMap = blockMap.merge(newBlocks).filter(function (block) {
    return !!block;
  });

  return contentState.merge({
    blockMap: blockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: startKey,
      anchorOffset: startOffset,
      focusKey: startKey,
      focusOffset: startOffset,
      isBackward: false
    })
  });
}

/**
 * Maintain persistence for target list when removing characters on the
 * head and tail of the character list.
 */
function removeFromList(targetList, startOffset, endOffset) {
  if (startOffset === 0) {
    while (startOffset < endOffset) {
      targetList = targetList.shift();
      startOffset++;
    }
  } else if (endOffset === targetList.count()) {
    while (endOffset > startOffset) {
      targetList = targetList.pop();
      endOffset--;
    }
  } else {
    var head = targetList.slice(0, startOffset);
    var tail = targetList.slice(endOffset);
    targetList = head.concat(tail).toList();
  }
  return targetList;
}

module.exports = removeRangeFromContentState;

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule setDraftEditorSelection
 * @typechecks
 * @format
 * 
 */



var DraftJsDebugLogging = __webpack_require__(173);

var containsNode = __webpack_require__(28);
var getActiveElement = __webpack_require__(39);
var invariant = __webpack_require__(0);

function getAnonymizedDOM(node, getNodeLabels) {
  if (!node) {
    return '[empty]';
  }

  var anonymized = anonymizeTextWithin(node, getNodeLabels);
  if (anonymized.nodeType === Node.TEXT_NODE) {
    return anonymized.textContent;
  }

  !(anonymized instanceof Element) ?  false ? invariant(false, 'Node must be an Element if it is not a text node.') : invariant(false) : void 0;
  return anonymized.outerHTML;
}

function anonymizeTextWithin(node, getNodeLabels) {
  var labels = getNodeLabels !== undefined ? getNodeLabels(node) : [];

  if (node.nodeType === Node.TEXT_NODE) {
    var length = node.textContent.length;
    return document.createTextNode('[text ' + length + (labels.length ? ' | ' + labels.join(', ') : '') + ']');
  }

  var clone = node.cloneNode();
  if (clone.nodeType === 1 && labels.length) {
    clone.setAttribute('data-labels', labels.join(', '));
  }
  var childNodes = node.childNodes;
  for (var ii = 0; ii < childNodes.length; ii++) {
    clone.appendChild(anonymizeTextWithin(childNodes[ii], getNodeLabels));
  }

  return clone;
}

function getAnonymizedEditorDOM(node, getNodeLabels) {
  // grabbing the DOM content of the Draft editor
  var currentNode = node;
  while (currentNode) {
    if (currentNode instanceof Element && currentNode.hasAttribute('contenteditable')) {
      // found the Draft editor container
      return getAnonymizedDOM(currentNode, getNodeLabels);
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return 'Could not find contentEditable parent of node';
}

function getNodeLength(node) {
  return node.nodeValue === null ? node.childNodes.length : node.nodeValue.length;
}

/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 */
function setDraftEditorSelection(selectionState, node, blockKey, nodeStart, nodeEnd) {
  // It's possible that the editor has been removed from the DOM but
  // our selection code doesn't know it yet. Forcing selection in
  // this case may lead to errors, so just bail now.
  if (!containsNode(document.documentElement, node)) {
    return;
  }

  var selection = global.getSelection();
  var anchorKey = selectionState.getAnchorKey();
  var anchorOffset = selectionState.getAnchorOffset();
  var focusKey = selectionState.getFocusKey();
  var focusOffset = selectionState.getFocusOffset();
  var isBackward = selectionState.getIsBackward();

  // IE doesn't support backward selection. Swap key/offset pairs.
  if (!selection.extend && isBackward) {
    var tempKey = anchorKey;
    var tempOffset = anchorOffset;
    anchorKey = focusKey;
    anchorOffset = focusOffset;
    focusKey = tempKey;
    focusOffset = tempOffset;
    isBackward = false;
  }

  var hasAnchor = anchorKey === blockKey && nodeStart <= anchorOffset && nodeEnd >= anchorOffset;

  var hasFocus = focusKey === blockKey && nodeStart <= focusOffset && nodeEnd >= focusOffset;

  // If the selection is entirely bound within this node, set the selection
  // and be done.
  if (hasAnchor && hasFocus) {
    selection.removeAllRanges();
    addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
    addFocusToSelection(selection, node, focusOffset - nodeStart, selectionState);
    return;
  }

  if (!isBackward) {
    // If the anchor is within this node, set the range start.
    if (hasAnchor) {
      selection.removeAllRanges();
      addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
    }

    // If the focus is within this node, we can assume that we have
    // already set the appropriate start range on the selection, and
    // can simply extend the selection.
    if (hasFocus) {
      addFocusToSelection(selection, node, focusOffset - nodeStart, selectionState);
    }
  } else {
    // If this node has the focus, set the selection range to be a
    // collapsed range beginning here. Later, when we encounter the anchor,
    // we'll use this information to extend the selection.
    if (hasFocus) {
      selection.removeAllRanges();
      addPointToSelection(selection, node, focusOffset - nodeStart, selectionState);
    }

    // If this node has the anchor, we may assume that the correct
    // focus information is already stored on the selection object.
    // We keep track of it, reset the selection range, and extend it
    // back to the focus point.
    if (hasAnchor) {
      var storedFocusNode = selection.focusNode;
      var storedFocusOffset = selection.focusOffset;

      selection.removeAllRanges();
      addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
      addFocusToSelection(selection, storedFocusNode, storedFocusOffset, selectionState);
    }
  }
}

/**
 * Extend selection towards focus point.
 */
function addFocusToSelection(selection, node, offset, selectionState) {
  var activeElement = getActiveElement();
  if (selection.extend && containsNode(activeElement, node)) {
    // If `extend` is called while another element has focus, an error is
    // thrown. We therefore disable `extend` if the active element is somewhere
    // other than the node we are selecting. This should only occur in Firefox,
    // since it is the only browser to support multiple selections.
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=921444.

    // logging to catch bug that is being reported in t16250795
    if (offset > getNodeLength(node)) {
      // the call to 'selection.extend' is about to throw
      DraftJsDebugLogging.logSelectionStateFailure({
        anonymizedDom: getAnonymizedEditorDOM(node),
        extraParams: JSON.stringify({ offset: offset }),
        selectionState: JSON.stringify(selectionState.toJS())
      });
    }

    // logging to catch bug that is being reported in t18110632
    var nodeWasFocus = node === selection.focusNode;
    try {
      selection.extend(node, offset);
    } catch (e) {
      DraftJsDebugLogging.logSelectionStateFailure({
        anonymizedDom: getAnonymizedEditorDOM(node, function (n) {
          var labels = [];
          if (n === activeElement) {
            labels.push('active element');
          }
          if (n === selection.anchorNode) {
            labels.push('selection anchor node');
          }
          if (n === selection.focusNode) {
            labels.push('selection focus node');
          }
          return labels;
        }),
        extraParams: JSON.stringify({
          activeElementName: activeElement ? activeElement.nodeName : null,
          nodeIsFocus: node === selection.focusNode,
          nodeWasFocus: nodeWasFocus,
          selectionRangeCount: selection.rangeCount,
          selectionAnchorNodeName: selection.anchorNode ? selection.anchorNode.nodeName : null,
          selectionAnchorOffset: selection.anchorOffset,
          selectionFocusNodeName: selection.focusNode ? selection.focusNode.nodeName : null,
          selectionFocusOffset: selection.focusOffset,
          message: e ? '' + e : null,
          offset: offset
        }, null, 2),
        selectionState: JSON.stringify(selectionState.toJS(), null, 2)
      });
      // allow the error to be thrown -
      // better than continuing in a broken state
      throw e;
    }
  } else {
    // IE doesn't support extend. This will mean no backward selection.
    // Extract the existing selection range and add focus to it.
    // Additionally, clone the selection range. IE11 throws an
    // InvalidStateError when attempting to access selection properties
    // after the range is detached.
    var range = selection.getRangeAt(0);
    range.setEnd(node, offset);
    selection.addRange(range.cloneRange());
  }
}

function addPointToSelection(selection, node, offset, selectionState) {
  var range = document.createRange();
  // logging to catch bug that is being reported in t16250795
  if (offset > getNodeLength(node)) {
    // in this case we know that the call to 'range.setStart' is about to throw
    DraftJsDebugLogging.logSelectionStateFailure({
      anonymizedDom: getAnonymizedEditorDOM(node),
      extraParams: JSON.stringify({ offset: offset }),
      selectionState: JSON.stringify(selectionState.toJS())
    });
  }
  range.setStart(node, offset);
  selection.addRange(range);
}

module.exports = setDraftEditorSelection;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule splitBlockInContentState
 * @typechecks
 * 
 */



var Immutable = __webpack_require__(2);

var generateRandomKey = __webpack_require__(15);
var invariant = __webpack_require__(0);

var Map = Immutable.Map;


function splitBlockInContentState(contentState, selectionState) {
  !selectionState.isCollapsed() ?  false ? invariant(false, 'Selection range must be collapsed.') : invariant(false) : void 0;

  var key = selectionState.getAnchorKey();
  var offset = selectionState.getAnchorOffset();
  var blockMap = contentState.getBlockMap();
  var blockToSplit = blockMap.get(key);

  var text = blockToSplit.getText();
  var chars = blockToSplit.getCharacterList();

  var blockAbove = blockToSplit.merge({
    text: text.slice(0, offset),
    characterList: chars.slice(0, offset)
  });

  var keyBelow = generateRandomKey();
  var blockBelow = blockAbove.merge({
    key: keyBelow,
    text: text.slice(offset),
    characterList: chars.slice(offset),
    data: Map()
  });

  var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
    return v === blockToSplit;
  });
  var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
    return v === blockToSplit;
  }).rest();
  var newBlocks = blocksBefore.concat([[blockAbove.getKey(), blockAbove], [blockBelow.getKey(), blockBelow]], blocksAfter).toOrderedMap();

  return contentState.merge({
    blockMap: newBlocks,
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: keyBelow,
      anchorOffset: 0,
      focusKey: keyBelow,
      focusOffset: 0,
      isBackward: false
    })
  });
}

module.exports = splitBlockInContentState;

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule splitTextIntoTextBlocks
 * 
 */



var NEWLINE_REGEX = /\r\n?|\n/g;

function splitTextIntoTextBlocks(text) {
  return text.split(NEWLINE_REGEX);
}

module.exports = splitTextIntoTextBlocks;

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var emptyFunction = __webpack_require__(19);

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      if (false) {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        remove: emptyFunction
      };
    }
  },

  registerDefault: function registerDefault() {}
};

module.exports = EventListener;

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var PhotosMimeType = {
  isImage: function isImage(mimeString) {
    return getParts(mimeString)[0] === 'image';
  },
  isJpeg: function isJpeg(mimeString) {
    var parts = getParts(mimeString);
    return PhotosMimeType.isImage(mimeString) && (
    // see http://fburl.com/10972194
    parts[1] === 'jpeg' || parts[1] === 'pjpeg');
  }
};

function getParts(mimeString) {
  return mimeString.split('/');
}

module.exports = PhotosMimeType;

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Usage note:
 * This module makes a best effort to export the same data we would internally.
 * At Facebook we use a server-generated module that does the parsing and
 * exports the data for the client to use. We can't rely on a server-side
 * implementation in open source so instead we make use of an open source
 * library to do the heavy lifting and then make some adjustments as necessary.
 * It's likely there will be some differences. Some we can smooth over.
 * Others are going to be harder.
 */



var UAParser = __webpack_require__(242);

var UNKNOWN = 'Unknown';

var PLATFORM_MAP = {
  'Mac OS': 'Mac OS X'
};

/**
 * Convert from UAParser platform name to what we expect.
 */
function convertPlatformName(name) {
  return PLATFORM_MAP[name] || name;
}

/**
 * Get the version number in parts. This is very naive. We actually get major
 * version as a part of UAParser already, which is generally good enough, but
 * let's get the minor just in case.
 */
function getBrowserVersion(version) {
  if (!version) {
    return {
      major: '',
      minor: ''
    };
  }
  var parts = version.split('.');
  return {
    major: parts[0],
    minor: parts[1]
  };
}

/**
 * Get the UA data fom UAParser and then convert it to the format we're
 * expecting for our APIS.
 */
var parser = new UAParser();
var results = parser.getResult();

// Do some conversion first.
var browserVersionData = getBrowserVersion(results.browser.version);
var uaData = {
  browserArchitecture: results.cpu.architecture || UNKNOWN,
  browserFullVersion: results.browser.version || UNKNOWN,
  browserMinorVersion: browserVersionData.minor || UNKNOWN,
  browserName: results.browser.name || UNKNOWN,
  browserVersion: results.browser.major || UNKNOWN,
  deviceName: results.device.model || UNKNOWN,
  engineName: results.engine.name || UNKNOWN,
  engineVersion: results.engine.version || UNKNOWN,
  platformArchitecture: results.cpu.architecture || UNKNOWN,
  platformName: convertPlatformName(results.os.name) || UNKNOWN,
  platformVersion: results.os.version || UNKNOWN,
  platformFullVersion: results.os.version || UNKNOWN
};

module.exports = uaData;

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var invariant = __webpack_require__(0);

var componentRegex = /\./;
var orRegex = /\|\|/;
var rangeRegex = /\s+\-\s+/;
var modifierRegex = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/;
var numericRegex = /^(\d*)(.*)/;

/**
 * Splits input `range` on "||" and returns true if any subrange matches
 * `version`.
 *
 * @param {string} range
 * @param {string} version
 * @returns {boolean}
 */
function checkOrExpression(range, version) {
  var expressions = range.split(orRegex);

  if (expressions.length > 1) {
    return expressions.some(function (range) {
      return VersionRange.contains(range, version);
    });
  } else {
    range = expressions[0].trim();
    return checkRangeExpression(range, version);
  }
}

/**
 * Splits input `range` on " - " (the surrounding whitespace is required) and
 * returns true if version falls between the two operands.
 *
 * @param {string} range
 * @param {string} version
 * @returns {boolean}
 */
function checkRangeExpression(range, version) {
  var expressions = range.split(rangeRegex);

  !(expressions.length > 0 && expressions.length <= 2) ?  false ? invariant(false, 'the "-" operator expects exactly 2 operands') : invariant(false) : void 0;

  if (expressions.length === 1) {
    return checkSimpleExpression(expressions[0], version);
  } else {
    var startVersion = expressions[0],
        endVersion = expressions[1];

    !(isSimpleVersion(startVersion) && isSimpleVersion(endVersion)) ?  false ? invariant(false, 'operands to the "-" operator must be simple (no modifiers)') : invariant(false) : void 0;

    return checkSimpleExpression('>=' + startVersion, version) && checkSimpleExpression('<=' + endVersion, version);
  }
}

/**
 * Checks if `range` matches `version`. `range` should be a "simple" range (ie.
 * not a compound range using the " - " or "||" operators).
 *
 * @param {string} range
 * @param {string} version
 * @returns {boolean}
 */
function checkSimpleExpression(range, version) {
  range = range.trim();
  if (range === '') {
    return true;
  }

  var versionComponents = version.split(componentRegex);

  var _getModifierAndCompon = getModifierAndComponents(range),
      modifier = _getModifierAndCompon.modifier,
      rangeComponents = _getModifierAndCompon.rangeComponents;

  switch (modifier) {
    case '<':
      return checkLessThan(versionComponents, rangeComponents);
    case '<=':
      return checkLessThanOrEqual(versionComponents, rangeComponents);
    case '>=':
      return checkGreaterThanOrEqual(versionComponents, rangeComponents);
    case '>':
      return checkGreaterThan(versionComponents, rangeComponents);
    case '~':
    case '~>':
      return checkApproximateVersion(versionComponents, rangeComponents);
    default:
      return checkEqual(versionComponents, rangeComponents);
  }
}

/**
 * Checks whether `a` is less than `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkLessThan(a, b) {
  return compareComponents(a, b) === -1;
}

/**
 * Checks whether `a` is less than or equal to `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkLessThanOrEqual(a, b) {
  var result = compareComponents(a, b);
  return result === -1 || result === 0;
}

/**
 * Checks whether `a` is equal to `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkEqual(a, b) {
  return compareComponents(a, b) === 0;
}

/**
 * Checks whether `a` is greater than or equal to `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkGreaterThanOrEqual(a, b) {
  var result = compareComponents(a, b);
  return result === 1 || result === 0;
}

/**
 * Checks whether `a` is greater than `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkGreaterThan(a, b) {
  return compareComponents(a, b) === 1;
}

/**
 * Checks whether `a` is "reasonably close" to `b` (as described in
 * https://www.npmjs.org/doc/misc/semver.html). For example, if `b` is "1.3.1"
 * then "reasonably close" is defined as ">= 1.3.1 and < 1.4".
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkApproximateVersion(a, b) {
  var lowerBound = b.slice();
  var upperBound = b.slice();

  if (upperBound.length > 1) {
    upperBound.pop();
  }
  var lastIndex = upperBound.length - 1;
  var numeric = parseInt(upperBound[lastIndex], 10);
  if (isNumber(numeric)) {
    upperBound[lastIndex] = numeric + 1 + '';
  }

  return checkGreaterThanOrEqual(a, lowerBound) && checkLessThan(a, upperBound);
}

/**
 * Extracts the optional modifier (<, <=, =, >=, >, ~, ~>) and version
 * components from `range`.
 *
 * For example, given `range` ">= 1.2.3" returns an object with a `modifier` of
 * `">="` and `components` of `[1, 2, 3]`.
 *
 * @param {string} range
 * @returns {object}
 */
function getModifierAndComponents(range) {
  var rangeComponents = range.split(componentRegex);
  var matches = rangeComponents[0].match(modifierRegex);
  !matches ?  false ? invariant(false, 'expected regex to match but it did not') : invariant(false) : void 0;

  return {
    modifier: matches[1],
    rangeComponents: [matches[2]].concat(rangeComponents.slice(1))
  };
}

/**
 * Determines if `number` is a number.
 *
 * @param {mixed} number
 * @returns {boolean}
 */
function isNumber(number) {
  return !isNaN(number) && isFinite(number);
}

/**
 * Tests whether `range` is a "simple" version number without any modifiers
 * (">", "~" etc).
 *
 * @param {string} range
 * @returns {boolean}
 */
function isSimpleVersion(range) {
  return !getModifierAndComponents(range).modifier;
}

/**
 * Zero-pads array `array` until it is at least `length` long.
 *
 * @param {array} array
 * @param {number} length
 */
function zeroPad(array, length) {
  for (var i = array.length; i < length; i++) {
    array[i] = '0';
  }
}

/**
 * Normalizes `a` and `b` in preparation for comparison by doing the following:
 *
 * - zero-pads `a` and `b`
 * - marks any "x", "X" or "*" component in `b` as equivalent by zero-ing it out
 *   in both `a` and `b`
 * - marks any final "*" component in `b` as a greedy wildcard by zero-ing it
 *   and all of its successors in `a`
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {array<array<string>>}
 */
function normalizeVersions(a, b) {
  a = a.slice();
  b = b.slice();

  zeroPad(a, b.length);

  // mark "x" and "*" components as equal
  for (var i = 0; i < b.length; i++) {
    var matches = b[i].match(/^[x*]$/i);
    if (matches) {
      b[i] = a[i] = '0';

      // final "*" greedily zeros all remaining components
      if (matches[0] === '*' && i === b.length - 1) {
        for (var j = i; j < a.length; j++) {
          a[j] = '0';
        }
      }
    }
  }

  zeroPad(b, a.length);

  return [a, b];
}

/**
 * Returns the numerical -- not the lexicographical -- ordering of `a` and `b`.
 *
 * For example, `10-alpha` is greater than `2-beta`.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
 * or greater than `b`, respectively
 */
function compareNumeric(a, b) {
  var aPrefix = a.match(numericRegex)[1];
  var bPrefix = b.match(numericRegex)[1];
  var aNumeric = parseInt(aPrefix, 10);
  var bNumeric = parseInt(bPrefix, 10);

  if (isNumber(aNumeric) && isNumber(bNumeric) && aNumeric !== bNumeric) {
    return compare(aNumeric, bNumeric);
  } else {
    return compare(a, b);
  }
}

/**
 * Returns the ordering of `a` and `b`.
 *
 * @param {string|number} a
 * @param {string|number} b
 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
 * or greater than `b`, respectively
 */
function compare(a, b) {
  !(typeof a === typeof b) ?  false ? invariant(false, '"a" and "b" must be of the same type') : invariant(false) : void 0;

  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * Compares arrays of version components.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
 * or greater than `b`, respectively
 */
function compareComponents(a, b) {
  var _normalizeVersions = normalizeVersions(a, b),
      aNormalized = _normalizeVersions[0],
      bNormalized = _normalizeVersions[1];

  for (var i = 0; i < bNormalized.length; i++) {
    var result = compareNumeric(aNormalized[i], bNormalized[i]);
    if (result) {
      return result;
    }
  }

  return 0;
}

var VersionRange = {
  /**
   * Checks whether `version` satisfies the `range` specification.
   *
   * We support a subset of the expressions defined in
   * https://www.npmjs.org/doc/misc/semver.html:
   *
   *    version   Must match version exactly
   *    =version  Same as just version
   *    >version  Must be greater than version
   *    >=version Must be greater than or equal to version
   *    <version  Must be less than version
   *    <=version Must be less than or equal to version
   *    ~version  Must be at least version, but less than the next significant
   *              revision above version:
   *              "~1.2.3" is equivalent to ">= 1.2.3 and < 1.3"
   *    ~>version Equivalent to ~version
   *    1.2.x     Must match "1.2.x", where "x" is a wildcard that matches
   *              anything
   *    1.2.*     Similar to "1.2.x", but "*" in the trailing position is a
   *              "greedy" wildcard, so will match any number of additional
   *              components:
   *              "1.2.*" will match "1.2.1", "1.2.1.1", "1.2.1.1.1" etc
   *    *         Any version
   *    ""        (Empty string) Same as *
   *    v1 - v2   Equivalent to ">= v1 and <= v2"
   *    r1 || r2  Passes if either r1 or r2 are satisfied
   *
   * @param {string} range
   * @param {string} version
   * @returns {boolean}
   */
  contains: function contains(range, version) {
    return checkOrExpression(range.trim(), version.trim());
  }
};

module.exports = VersionRange;

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var invariant = __webpack_require__(0);

/**
 * Convert array-like objects to arrays.
 *
 * This API assumes the caller knows the contents of the data type. For less
 * well defined inputs use createArrayFromMixed.
 *
 * @param {object|function|filelist} obj
 * @return {array}
 */
function toArray(obj) {
  var length = obj.length;

  // Some browsers builtin objects can report typeof 'function' (e.g. NodeList
  // in old versions of Safari).
  !(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')) ?  false ? invariant(false, 'toArray: Array-like object expected') : invariant(false) : void 0;

  !(typeof length === 'number') ?  false ? invariant(false, 'toArray: Object needs a length property') : invariant(false) : void 0;

  !(length === 0 || length - 1 in obj) ?  false ? invariant(false, 'toArray: Object should have keys for indices') : invariant(false) : void 0;

  !(typeof obj.callee !== 'function') ?  false ? invariant(false, 'toArray: Object can\'t be `arguments`. Use rest params ' + '(function(...args) {}) or Array.from() instead.') : invariant(false) : void 0;

  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
  // without method will throw during the slice call and skip straight to the
  // fallback.
  if (obj.hasOwnProperty) {
    try {
      return Array.prototype.slice.call(obj);
    } catch (e) {
      // IE < 9 does not support Array#slice on collections objects
    }
  }

  // Fall back to copying key by key. This assumes all keys have a value,
  // so will not preserve sparsely populated inputs.
  var ret = Array(length);
  for (var ii = 0; ii < length; ii++) {
    ret[ii] = obj[ii];
  }
  return ret;
}

/**
 * Perform a heuristic test to determine if an object is "array-like".
 *
 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
 *   Joshu replied: "Mu."
 *
 * This function determines if its argument has "array nature": it returns
 * true if the argument is an actual array, an `arguments' object, or an
 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
 *
 * It will return false for other array-like objects like Filelist.
 *
 * @param {*} obj
 * @return {boolean}
 */
function hasArrayNature(obj) {
  return (
    // not null/false
    !!obj && (
    // arrays are objects, NodeLists are functions in Safari
    typeof obj == 'object' || typeof obj == 'function') &&
    // quacks like an array
    'length' in obj &&
    // not window
    !('setInterval' in obj) &&
    // no DOM node should be considered an array-like
    // a 'select' element has 'length' and 'item' properties on IE8
    typeof obj.nodeType != 'number' && (
    // a real array
    Array.isArray(obj) ||
    // arguments
    'callee' in obj ||
    // HTMLCollection/NodeList
    'item' in obj)
  );
}

/**
 * Ensure that the argument is an array by wrapping it in an array if it is not.
 * Creates a copy of the argument if it is already an array.
 *
 * This is mostly useful idiomatically:
 *
 *   var createArrayFromMixed = require('createArrayFromMixed');
 *
 *   function takesOneOrMoreThings(things) {
 *     things = createArrayFromMixed(things);
 *     ...
 *   }
 *
 * This allows you to treat `things' as an array, but accept scalars in the API.
 *
 * If you need to convert an array-like object, like `arguments`, into an array
 * use toArray instead.
 *
 * @param {*} obj
 * @return {array}
 */
function createArrayFromMixed(obj) {
  if (!hasArrayNature(obj)) {
    return [obj];
  } else if (Array.isArray(obj)) {
    return obj.slice();
  } else {
    return toArray(obj);
  }
}

module.exports = createArrayFromMixed;

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * @param {DOMElement} node input/textarea to focus
 */

function focusNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

module.exports = focusNode;

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var isWebkit = typeof navigator !== 'undefined' && navigator.userAgent.indexOf('AppleWebKit') > -1;

/**
 * Gets the element with the document scroll properties such as `scrollLeft` and
 * `scrollHeight`. This may differ across different browsers.
 *
 * NOTE: The return value can be null if the DOM is not yet ready.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getDocumentScrollElement(doc) {
  doc = doc || document;
  if (doc.scrollingElement) {
    return doc.scrollingElement;
  }
  return !isWebkit && doc.compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
}

module.exports = getDocumentScrollElement;

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var containsNode = __webpack_require__(28);

/**
 * Gets an element's bounding rect in pixels relative to the viewport.
 *
 * @param {DOMElement} elem
 * @return {object}
 */
function getElementRect(elem) {
  var docElem = elem.ownerDocument.documentElement;

  // FF 2, Safari 3 and Opera 9.5- do not support getBoundingClientRect().
  // IE9- will throw if the element is not in the document.
  if (!('getBoundingClientRect' in elem) || !containsNode(docElem, elem)) {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
  }

  // Subtracts clientTop/Left because IE8- added a 2px border to the
  // <html> element (see http://fburl.com/1493213). IE 7 in
  // Quicksmode does not report clientLeft/clientTop so there
  // will be an unaccounted offset of 2px when in quirksmode
  var rect = elem.getBoundingClientRect();

  return {
    left: Math.round(rect.left) - docElem.clientLeft,
    right: Math.round(rect.right) - docElem.clientLeft,
    top: Math.round(rect.top) - docElem.clientTop,
    bottom: Math.round(rect.bottom) - docElem.clientTop
  };
}

module.exports = getElementRect;

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var camelize = __webpack_require__(228);
var hyphenate = __webpack_require__(115);

function asString(value) /*?string*/{
  return value == null ? value : String(value);
}

function getStyleProperty( /*DOMNode*/node, /*string*/name) /*?string*/{
  var computedStyle = void 0;

  // W3C Standard
  if (window.getComputedStyle) {
    // In certain cases such as within an iframe in FF3, this returns null.
    computedStyle = window.getComputedStyle(node, null);
    if (computedStyle) {
      return asString(computedStyle.getPropertyValue(hyphenate(name)));
    }
  }
  // Safari
  if (document.defaultView && document.defaultView.getComputedStyle) {
    computedStyle = document.defaultView.getComputedStyle(node, null);
    // A Safari bug causes this to return null for `display: none` elements.
    if (computedStyle) {
      return asString(computedStyle.getPropertyValue(hyphenate(name)));
    }
    if (name === 'display') {
      return 'none';
    }
  }
  // Internet Explorer
  if (node.currentStyle) {
    if (name === 'float') {
      return asString(node.currentStyle.cssFloat || node.currentStyle.styleFloat);
    }
    return asString(node.currentStyle[camelize(name)]);
  }
  return asString(node.style && node.style[camelize(name)]);
}

module.exports = getStyleProperty;

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are unbounded, unlike `getScrollPosition`. This means they
 * may be negative or exceed the element boundaries (which is possible using
 * inertial scrolling).
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */

function getUnboundedScrollPosition(scrollable) {
  if (scrollable.Window && scrollable instanceof scrollable.Window) {
    return {
      x: scrollable.pageXOffset || scrollable.document.documentElement.scrollLeft,
      y: scrollable.pageYOffset || scrollable.document.documentElement.scrollTop
    };
  }
  return {
    x: scrollable.scrollLeft,
    y: scrollable.scrollTop
  };
}

module.exports = getUnboundedScrollPosition;

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(235);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Executes the provided `callback` once for each enumerable own property in the
 * object and constructs a new object from the results. The `callback` is
 * invoked with three arguments:
 *
 *  - the property value
 *  - the property name
 *  - the object being traversed
 *
 * Properties that are added after the call to `mapObject` will not be visited
 * by `callback`. If the values of existing properties are changed, the value
 * passed to `callback` will be the value at the time `mapObject` visits them.
 * Properties that are deleted before being visited are not visited.
 *
 * @grep function objectMap()
 * @grep function objMap()
 *
 * @param {?object} object
 * @param {function} callback
 * @param {*} context
 * @return {?object}
 */
function mapObject(object, callback, context) {
  if (!object) {
    return null;
  }
  var result = {};
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result[name] = callback.call(context, object[name], name, object);
    }
  }
  return result;
}

module.exports = mapObject;

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 React v16.0.0
 react-dom.production.min.js

 Copyright (c) 2013-present, Facebook, Inc.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(3);__webpack_require__(0);var l=__webpack_require__(224),n=__webpack_require__(10),ba=__webpack_require__(223),ca=__webpack_require__(19),da=__webpack_require__(63),ea=__webpack_require__(238),fa=__webpack_require__(28),ha=__webpack_require__(230),ia=__webpack_require__(39);
function w(a){for(var b=arguments.length-1,c="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,d=0;d<b;d++)c+="\x26args[]\x3d"+encodeURIComponent(arguments[d+1]);b=Error(c+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}aa?void 0:w("227");
function ja(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
var ka={Namespaces:{html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"},getIntrinsicNamespace:ja,getChildNamespace:function(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?ja(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}},la=null,oa={};
function pa(){if(la)for(var a in oa){var b=oa[a],c=la.indexOf(a);-1<c?void 0:w("96",a);if(!qa.plugins[c]){b.extractEvents?void 0:w("97",a);qa.plugins[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;qa.eventNameDispatchConfigs.hasOwnProperty(h)?w("99",h):void 0;qa.eventNameDispatchConfigs[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&ra(k[e],g,h);e=!0}else f.registrationName?(ra(f.registrationName,g,h),e=!0):e=!1;e?void 0:w("98",d,a)}}}}
function ra(a,b,c){qa.registrationNameModules[a]?w("100",a):void 0;qa.registrationNameModules[a]=b;qa.registrationNameDependencies[a]=b.eventTypes[c].dependencies}
var qa={plugins:[],eventNameDispatchConfigs:{},registrationNameModules:{},registrationNameDependencies:{},possibleRegistrationNames:null,injectEventPluginOrder:function(a){la?w("101"):void 0;la=Array.prototype.slice.call(a);pa()},injectEventPluginsByName:function(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];oa.hasOwnProperty(c)&&oa[c]===d||(oa[c]?w("102",c):void 0,oa[c]=d,b=!0)}b&&pa()}},sa=qa,ta={children:!0,dangerouslySetInnerHTML:!0,autoFocus:!0,defaultValue:!0,defaultChecked:!0,
innerHTML:!0,suppressContentEditableWarning:!0,style:!0};function ua(a,b){return(a&b)===b}
var wa={MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,HAS_STRING_BOOLEAN_VALUE:64,injectDOMPropertyConfig:function(a){var b=wa,c=a.Properties||{},d=a.DOMAttributeNamespaces||{},e=a.DOMAttributeNames||{};a=a.DOMMutationMethods||{};for(var f in c){xa.properties.hasOwnProperty(f)?w("48",f):void 0;var g=f.toLowerCase(),h=c[f];g={attributeName:g,attributeNamespace:null,propertyName:f,mutationMethod:null,mustUseProperty:ua(h,b.MUST_USE_PROPERTY),
hasBooleanValue:ua(h,b.HAS_BOOLEAN_VALUE),hasNumericValue:ua(h,b.HAS_NUMERIC_VALUE),hasPositiveNumericValue:ua(h,b.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:ua(h,b.HAS_OVERLOADED_BOOLEAN_VALUE),hasStringBooleanValue:ua(h,b.HAS_STRING_BOOLEAN_VALUE)};1>=g.hasBooleanValue+g.hasNumericValue+g.hasOverloadedBooleanValue?void 0:w("50",f);e.hasOwnProperty(f)&&(g.attributeName=e[f]);d.hasOwnProperty(f)&&(g.attributeNamespace=d[f]);a.hasOwnProperty(f)&&(g.mutationMethod=a[f]);xa.properties[f]=
g}}},xa={ID_ATTRIBUTE_NAME:"data-reactid",ROOT_ATTRIBUTE_NAME:"data-reactroot",ATTRIBUTE_NAME_START_CHAR:":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",ATTRIBUTE_NAME_CHAR:":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",
properties:{},shouldSetAttribute:function(a,b){if(xa.isReservedProp(a)||!("o"!==a[0]&&"O"!==a[0]||"n"!==a[1]&&"N"!==a[1]))return!1;if(null===b)return!0;switch(typeof b){case "boolean":return xa.shouldAttributeAcceptBooleanValue(a);case "undefined":case "number":case "string":case "object":return!0;default:return!1}},getPropertyInfo:function(a){return xa.properties.hasOwnProperty(a)?xa.properties[a]:null},shouldAttributeAcceptBooleanValue:function(a){if(xa.isReservedProp(a))return!0;var b=xa.getPropertyInfo(a);
if(b)return b.hasBooleanValue||b.hasStringBooleanValue||b.hasOverloadedBooleanValue;a=a.toLowerCase().slice(0,5);return"data-"===a||"aria-"===a},isReservedProp:function(a){return ta.hasOwnProperty(a)},injection:wa},A=xa,E={IndeterminateComponent:0,FunctionalComponent:1,ClassComponent:2,HostRoot:3,HostPortal:4,HostComponent:5,HostText:6,CoroutineComponent:7,CoroutineHandlerPhase:8,YieldComponent:9,Fragment:10},F={ELEMENT_NODE:1,TEXT_NODE:3,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_FRAGMENT_NODE:11},
ya=E.HostComponent,za=E.HostText,Aa=F.ELEMENT_NODE,Ba=F.COMMENT_NODE,Ea=A.ID_ATTRIBUTE_NAME,Fa={hasCachedChildNodes:1},Ga=Math.random().toString(36).slice(2),Ha="__reactInternalInstance$"+Ga,Ia="__reactEventHandlers$"+Ga;function La(a){for(var b;b=a._renderedComponent;)a=b;return a}function Ma(a,b){a=La(a);a._hostNode=b;b[Ha]=a}
function Na(a,b){if(!(a._flags&Fa.hasCachedChildNodes)){var c=a._renderedChildren;b=b.firstChild;var d;a:for(d in c)if(c.hasOwnProperty(d)){var e=c[d],f=La(e)._domID;if(0!==f){for(;null!==b;b=b.nextSibling){var g=b,h=f;if(g.nodeType===Aa&&g.getAttribute(Ea)===""+h||g.nodeType===Ba&&g.nodeValue===" react-text: "+h+" "||g.nodeType===Ba&&g.nodeValue===" react-empty: "+h+" "){Ma(e,b);continue a}}w("32",f)}}a._flags|=Fa.hasCachedChildNodes}}
function Oa(a){if(a[Ha])return a[Ha];for(var b=[];!a[Ha];)if(b.push(a),a.parentNode)a=a.parentNode;else return null;var c=a[Ha];if(c.tag===ya||c.tag===za)return c;for(;a&&(c=a[Ha]);a=b.pop()){var d=c;b.length&&Na(c,a)}return d}
var G={getClosestInstanceFromNode:Oa,getInstanceFromNode:function(a){var b=a[Ha];if(b)return b.tag===ya||b.tag===za?b:b._hostNode===a?b:null;b=Oa(a);return null!=b&&b._hostNode===a?b:null},getNodeFromInstance:function(a){if(a.tag===ya||a.tag===za)return a.stateNode;void 0===a._hostNode?w("33"):void 0;if(a._hostNode)return a._hostNode;for(var b=[];!a._hostNode;)b.push(a),a._hostParent?void 0:w("34"),a=a._hostParent;for(;b.length;a=b.pop())Na(a,a._hostNode);return a._hostNode},precacheChildNodes:Na,
precacheNode:Ma,uncacheNode:function(a){var b=a._hostNode;b&&(delete b[Ha],a._hostNode=null)},precacheFiberNode:function(a,b){b[Ha]=a},getFiberCurrentPropsFromNode:function(a){return a[Ia]||null},updateFiberProps:function(a,b){a[Ia]=b}},Pa={remove:function(a){a._reactInternalFiber=void 0},get:function(a){return a._reactInternalFiber},has:function(a){return void 0!==a._reactInternalFiber},set:function(a,b){a._reactInternalFiber=b}},Qa={ReactCurrentOwner:aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner};
function Ra(a){if("function"===typeof a.getName)return a.getName();if("number"===typeof a.tag){a=a.type;if("string"===typeof a)return a;if("function"===typeof a)return a.displayName||a.name}return null}var J={NoEffect:0,PerformedWork:1,Placement:2,Update:4,PlacementAndUpdate:6,Deletion:8,ContentReset:16,Callback:32,Err:64,Ref:128},Sa=E.HostComponent,Ta=E.HostRoot,Ua=E.HostPortal,Va=E.HostText,Wa=J.NoEffect,Xa=J.Placement;
function Za(a){var b=a;if(a.alternate)for(;b["return"];)b=b["return"];else{if((b.effectTag&Xa)!==Wa)return 1;for(;b["return"];)if(b=b["return"],(b.effectTag&Xa)!==Wa)return 1}return b.tag===Ta?2:3}function $a(a){2!==Za(a)?w("188"):void 0}
function ab(a){var b=a.alternate;if(!b)return b=Za(a),3===b?w("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c["return"],f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return $a(e),a;if(g===d)return $a(e),b;g=g.sibling}w("188")}if(c["return"]!==d["return"])c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}g?
void 0:w("189")}}c.alternate!==d?w("190"):void 0}c.tag!==Ta?w("188"):void 0;return c.stateNode.current===c?a:b}
var bb={isFiberMounted:function(a){return 2===Za(a)},isMounted:function(a){return(a=Pa.get(a))?2===Za(a):!1},findCurrentFiberUsingSlowPath:ab,findCurrentHostFiber:function(a){a=ab(a);if(!a)return null;for(var b=a;;){if(b.tag===Sa||b.tag===Va)return b;if(b.child)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null},findCurrentHostFiberWithNoPortals:function(a){a=ab(a);
if(!a)return null;for(var b=a;;){if(b.tag===Sa||b.tag===Va)return b;if(b.child&&b.tag!==Ua)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null}},K={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,injection:{injectErrorUtils:function(a){"function"!==typeof a.invokeGuardedCallback?w("197"):void 0;cb=a.invokeGuardedCallback}},invokeGuardedCallback:function(a,
b,c,d,e,f,g,h,k){cb.apply(K,arguments)},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,g,h,k){K.invokeGuardedCallback.apply(this,arguments);if(K.hasCaughtError()){var p=K.clearCaughtError();K._hasRethrowError||(K._hasRethrowError=!0,K._rethrowError=p)}},rethrowCaughtError:function(){return db.apply(K,arguments)},hasCaughtError:function(){return K._hasCaughtError},clearCaughtError:function(){if(K._hasCaughtError){var a=K._caughtError;K._caughtError=null;K._hasCaughtError=!1;return a}w("198")}};
function cb(a,b,c,d,e,f,g,h,k){K._hasCaughtError=!1;K._caughtError=null;var p=Array.prototype.slice.call(arguments,3);try{b.apply(c,p)}catch(x){K._caughtError=x,K._hasCaughtError=!0}}function db(){if(K._hasRethrowError){var a=K._rethrowError;K._rethrowError=null;K._hasRethrowError=!1;throw a;}}var eb=K,fb;function gb(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=hb.getNodeFromInstance(d);eb.invokeGuardedCallbackAndCatchFirstError(b,c,void 0,a);a.currentTarget=null}
var hb={isEndish:function(a){return"topMouseUp"===a||"topTouchEnd"===a||"topTouchCancel"===a},isMoveish:function(a){return"topMouseMove"===a||"topTouchMove"===a},isStartish:function(a){return"topMouseDown"===a||"topTouchStart"===a},executeDirectDispatch:function(a){var b=a._dispatchListeners,c=a._dispatchInstances;Array.isArray(b)?w("103"):void 0;a.currentTarget=b?hb.getNodeFromInstance(c):null;b=b?b(a):null;a.currentTarget=null;a._dispatchListeners=null;a._dispatchInstances=null;return b},executeDispatchesInOrder:function(a,
b){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)gb(a,b,c[e],d[e]);else c&&gb(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null},executeDispatchesInOrderStopAtTrue:function(a){a:{var b=a._dispatchListeners;var c=a._dispatchInstances;if(Array.isArray(b))for(var d=0;d<b.length&&!a.isPropagationStopped();d++){if(b[d](a,c[d])){b=c[d];break a}}else if(b&&b(a,c)){b=c;break a}b=null}a._dispatchInstances=null;a._dispatchListeners=
null;return b},hasDispatches:function(a){return!!a._dispatchListeners},getFiberCurrentPropsFromNode:function(a){return fb.getFiberCurrentPropsFromNode(a)},getInstanceFromNode:function(a){return fb.getInstanceFromNode(a)},getNodeFromInstance:function(a){return fb.getNodeFromInstance(a)},injection:{injectComponentTree:function(a){fb=a}}},ib=hb,jb=null,kb=null,lb=null;
function mb(a){if(a=ib.getInstanceFromNode(a))if("number"===typeof a.tag){jb&&"function"===typeof jb.restoreControlledState?void 0:w("194");var b=ib.getFiberCurrentPropsFromNode(a.stateNode);jb.restoreControlledState(a.stateNode,a.type,b)}else"function"!==typeof a.restoreControlledState?w("195"):void 0,a.restoreControlledState()}
var nb={injection:{injectFiberControlledHostComponent:function(a){jb=a}},enqueueStateRestore:function(a){kb?lb?lb.push(a):lb=[a]:kb=a},restoreStateIfNeeded:function(){if(kb){var a=kb,b=lb;lb=kb=null;mb(a);if(b)for(a=0;a<b.length;a++)mb(b[a])}}};function ob(a,b,c,d,e,f){return a(b,c,d,e,f)}function pb(a,b){return a(b)}function qb(a,b){return pb(a,b)}
var rb=!1,sb={batchedUpdates:function(a,b){if(rb)return ob(qb,a,b);rb=!0;try{return ob(qb,a,b)}finally{rb=!1,nb.restoreStateIfNeeded()}},injection:{injectStackBatchedUpdates:function(a){ob=a},injectFiberBatchedUpdates:function(a){pb=a}}},tb=F.TEXT_NODE;function ub(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return a.nodeType===tb?a.parentNode:a}var vb=E.HostRoot,wb=[];
function xb(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c=b;if("number"===typeof c.tag){for(;c["return"];)c=c["return"];c=c.tag!==vb?null:c.stateNode.containerInfo}else{for(;c._hostParent;)c=c._hostParent;c=G.getNodeFromInstance(c).parentNode}if(!c)break;a.ancestors.push(b);b=G.getClosestInstanceFromNode(c)}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],yb._handleTopLevel(a.topLevelType,b,a.nativeEvent,ub(a.nativeEvent))}
var yb={_enabled:!0,_handleTopLevel:null,setHandleTopLevel:function(a){yb._handleTopLevel=a},setEnabled:function(a){yb._enabled=!!a},isEnabled:function(){return yb._enabled},trapBubbledEvent:function(a,b,c){return c?ba.listen(c,b,yb.dispatchEvent.bind(null,a)):null},trapCapturedEvent:function(a,b,c){return c?ba.capture(c,b,yb.dispatchEvent.bind(null,a)):null},dispatchEvent:function(a,b){if(yb._enabled){var c=ub(b);c=G.getClosestInstanceFromNode(c);null===c||"number"!==typeof c.tag||bb.isFiberMounted(c)||
(c=null);if(wb.length){var d=wb.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{sb.batchedUpdates(xb,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>wb.length&&wb.push(a)}}}},L=yb;function Cb(a,b){null==b?w("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}
function Db(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var Eb=null;function Fb(a,b){a&&(ib.executeDispatchesInOrder(a,b),a.isPersistent()||a.constructor.release(a))}function Gb(a){return Fb(a,!0)}function Hb(a){return Fb(a,!1)}
function Ib(a,b,c){switch(a){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":return!(!c.disabled||"button"!==b&&"input"!==b&&"select"!==b&&"textarea"!==b);default:return!1}}
var Jb={injection:{injectEventPluginOrder:sa.injectEventPluginOrder,injectEventPluginsByName:sa.injectEventPluginsByName},getListener:function(a,b){if("number"===typeof a.tag){var c=a.stateNode;if(!c)return null;var d=ib.getFiberCurrentPropsFromNode(c);if(!d)return null;c=d[b];if(Ib(b,a.type,d))return null}else{d=a._currentElement;if("string"===typeof d||"number"===typeof d||!a._rootNodeID)return null;a=d.props;c=a[b];if(Ib(b,d.type,a))return null}c&&"function"!==typeof c?w("231",b,typeof c):void 0;
return c},extractEvents:function(a,b,c,d){for(var e,f=sa.plugins,g=0;g<f.length;g++){var h=f[g];h&&(h=h.extractEvents(a,b,c,d))&&(e=Cb(e,h))}return e},enqueueEvents:function(a){a&&(Eb=Cb(Eb,a))},processEventQueue:function(a){var b=Eb;Eb=null;a?Db(b,Gb):Db(b,Hb);Eb?w("95"):void 0;eb.rethrowCaughtError()}},Kb;l.canUseDOM&&(Kb=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("",""));
function Lb(a,b){if(!l.canUseDOM||b&&!("addEventListener"in document))return!1;b="on"+a;var c=b in document;c||(c=document.createElement("div"),c.setAttribute(b,"return;"),c="function"===typeof c[b]);!c&&Kb&&"wheel"===a&&(c=document.implementation.hasFeature("Events.wheel","3.0"));return c}function Mb(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}
var Nb={animationend:Mb("Animation","AnimationEnd"),animationiteration:Mb("Animation","AnimationIteration"),animationstart:Mb("Animation","AnimationStart"),transitionend:Mb("Transition","TransitionEnd")},Ob={},Pb={};l.canUseDOM&&(Pb=document.createElement("div").style,"AnimationEvent"in window||(delete Nb.animationend.animation,delete Nb.animationiteration.animation,delete Nb.animationstart.animation),"TransitionEvent"in window||delete Nb.transitionend.transition);
function Qb(a){if(Ob[a])return Ob[a];if(!Nb[a])return a;var b=Nb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Pb)return Ob[a]=b[c];return""}
var Rb={topAbort:"abort",topAnimationEnd:Qb("animationend")||"animationend",topAnimationIteration:Qb("animationiteration")||"animationiteration",topAnimationStart:Qb("animationstart")||"animationstart",topBlur:"blur",topCancel:"cancel",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topChange:"change",topClick:"click",topClose:"close",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",
topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoadedData:"loadeddata",topLoad:"load",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",
topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topScroll:"scroll",topSeeked:"seeked",topSeeking:"seeking",topSelectionChange:"selectionchange",topStalled:"stalled",topSuspend:"suspend",topTextInput:"textInput",topTimeUpdate:"timeupdate",topToggle:"toggle",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",
topTouchStart:"touchstart",topTransitionEnd:Qb("transitionend")||"transitionend",topVolumeChange:"volumechange",topWaiting:"waiting",topWheel:"wheel"},Sb={},Tb=0,Ub="_reactListenersID"+(""+Math.random()).slice(2);function Vb(a){Object.prototype.hasOwnProperty.call(a,Ub)||(a[Ub]=Tb++,Sb[a[Ub]]={});return Sb[a[Ub]]}
var M=n({},{handleTopLevel:function(a,b,c,d){a=Jb.extractEvents(a,b,c,d);Jb.enqueueEvents(a);Jb.processEventQueue(!1)}},{setEnabled:function(a){L&&L.setEnabled(a)},isEnabled:function(){return!(!L||!L.isEnabled())},listenTo:function(a,b){var c=Vb(b);a=sa.registrationNameDependencies[a];for(var d=0;d<a.length;d++){var e=a[d];c.hasOwnProperty(e)&&c[e]||("topWheel"===e?Lb("wheel")?L.trapBubbledEvent("topWheel","wheel",b):Lb("mousewheel")?L.trapBubbledEvent("topWheel","mousewheel",b):L.trapBubbledEvent("topWheel",
"DOMMouseScroll",b):"topScroll"===e?L.trapCapturedEvent("topScroll","scroll",b):"topFocus"===e||"topBlur"===e?(L.trapCapturedEvent("topFocus","focus",b),L.trapCapturedEvent("topBlur","blur",b),c.topBlur=!0,c.topFocus=!0):"topCancel"===e?(Lb("cancel",!0)&&L.trapCapturedEvent("topCancel","cancel",b),c.topCancel=!0):"topClose"===e?(Lb("close",!0)&&L.trapCapturedEvent("topClose","close",b),c.topClose=!0):Rb.hasOwnProperty(e)&&L.trapBubbledEvent(e,Rb[e],b),c[e]=!0)}},isListeningToAllDependencies:function(a,
b){b=Vb(b);a=sa.registrationNameDependencies[a];for(var c=0;c<a.length;c++){var d=a[c];if(!b.hasOwnProperty(d)||!b[d])return!1}return!0},trapBubbledEvent:function(a,b,c){return L.trapBubbledEvent(a,b,c)},trapCapturedEvent:function(a,b,c){return L.trapCapturedEvent(a,b,c)}}),Wb={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,
flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Xb=["Webkit","ms","Moz","O"];
Object.keys(Wb).forEach(function(a){Xb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Wb[b]=Wb[a]})});
var Yb={isUnitlessNumber:Wb,shorthandPropertyExpansions:{background:{backgroundAttachment:!0,backgroundColor:!0,backgroundImage:!0,backgroundPositionX:!0,backgroundPositionY:!0,backgroundRepeat:!0},backgroundPosition:{backgroundPositionX:!0,backgroundPositionY:!0},border:{borderWidth:!0,borderStyle:!0,borderColor:!0},borderBottom:{borderBottomWidth:!0,borderBottomStyle:!0,borderBottomColor:!0},borderLeft:{borderLeftWidth:!0,borderLeftStyle:!0,borderLeftColor:!0},borderRight:{borderRightWidth:!0,borderRightStyle:!0,
borderRightColor:!0},borderTop:{borderTopWidth:!0,borderTopStyle:!0,borderTopColor:!0},font:{fontStyle:!0,fontVariant:!0,fontWeight:!0,fontSize:!0,lineHeight:!0,fontFamily:!0},outline:{outlineWidth:!0,outlineStyle:!0,outlineColor:!0}}},Zb=Yb.isUnitlessNumber,$b=!1;if(l.canUseDOM){var ac=document.createElement("div").style;try{ac.font=""}catch(a){$b=!0}}
var bc={createDangerousStringForStyles:function(){},setValueForStyles:function(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||Zb.hasOwnProperty(e)&&Zb[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");if(d)a.setProperty(c,e);else if(e)a[c]=e;else if(d=$b&&Yb.shorthandPropertyExpansions[c])for(var g in d)a[g]="";else a[c]=""}}},cc=new RegExp("^["+A.ATTRIBUTE_NAME_START_CHAR+
"]["+A.ATTRIBUTE_NAME_CHAR+"]*$"),dc={},ec={};function fc(a){if(ec.hasOwnProperty(a))return!0;if(dc.hasOwnProperty(a))return!1;if(cc.test(a))return ec[a]=!0;dc[a]=!0;return!1}
var gc={setAttributeForID:function(a,b){a.setAttribute(A.ID_ATTRIBUTE_NAME,b)},setAttributeForRoot:function(a){a.setAttribute(A.ROOT_ATTRIBUTE_NAME,"")},getValueForProperty:function(){},getValueForAttribute:function(){},setValueForProperty:function(a,b,c){var d=A.getPropertyInfo(b);if(d&&A.shouldSetAttribute(b,c)){var e=d.mutationMethod;e?e(a,c):null==c||d.hasBooleanValue&&!c||d.hasNumericValue&&isNaN(c)||d.hasPositiveNumericValue&&1>c||d.hasOverloadedBooleanValue&&!1===c?gc.deleteValueForProperty(a,
b):d.mustUseProperty?a[d.propertyName]=c:(b=d.attributeName,(e=d.attributeNamespace)?a.setAttributeNS(e,b,""+c):d.hasBooleanValue||d.hasOverloadedBooleanValue&&!0===c?a.setAttribute(b,""):a.setAttribute(b,""+c))}else gc.setValueForAttribute(a,b,A.shouldSetAttribute(b,c)?c:null)},setValueForAttribute:function(a,b,c){fc(b)&&(null==c?a.removeAttribute(b):a.setAttribute(b,""+c))},deleteValueForAttribute:function(a,b){a.removeAttribute(b)},deleteValueForProperty:function(a,b){var c=A.getPropertyInfo(b);
c?(b=c.mutationMethod)?b(a,void 0):c.mustUseProperty?a[c.propertyName]=c.hasBooleanValue?!1:"":a.removeAttribute(c.attributeName):a.removeAttribute(b)}},hc=gc,ic=Qa.ReactDebugCurrentFrame;function jc(){return null}
var kc={current:null,phase:null,resetCurrentFiber:function(){ic.getCurrentStack=null;kc.current=null;kc.phase=null},setCurrentFiber:function(a,b){ic.getCurrentStack=jc;kc.current=a;kc.phase=b},getCurrentFiberOwnerName:function(){return null},getCurrentFiberStackAddendum:jc},lc=kc,mc={getHostProps:function(a,b){var c=b.value,d=b.checked;return n({type:void 0,step:void 0,min:void 0,max:void 0},b,{defaultChecked:void 0,defaultValue:void 0,value:null!=c?c:a._wrapperState.initialValue,checked:null!=d?
d:a._wrapperState.initialChecked})},initWrapperState:function(a,b){var c=b.defaultValue;a._wrapperState={initialChecked:null!=b.checked?b.checked:b.defaultChecked,initialValue:null!=b.value?b.value:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}},updateWrapper:function(a,b){var c=b.checked;null!=c&&hc.setValueForProperty(a,"checked",c||!1);c=b.value;if(null!=c)if(0===c&&""===a.value)a.value="0";else if("number"===b.type){if(b=parseFloat(a.value)||0,c!=b||c==b&&a.value!=
c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else null==b.value&&null!=b.defaultValue&&a.defaultValue!==""+b.defaultValue&&(a.defaultValue=""+b.defaultValue),null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)},postMountWrapper:function(a,b){switch(b.type){case "submit":case "reset":break;case "color":case "date":case "datetime":case "datetime-local":case "month":case "time":case "week":a.value="";a.value=a.defaultValue;break;default:a.value=a.value}b=a.name;""!==
b&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==b&&(a.name=b)},restoreControlledState:function(a,b){mc.updateWrapper(a,b);var c=b.name;if("radio"===b.type&&null!=c){for(b=a;b.parentNode;)b=b.parentNode;c=b.querySelectorAll("input[name\x3d"+JSON.stringify(""+c)+'][type\x3d"radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=G.getFiberCurrentPropsFromNode(d);e?void 0:w("90");mc.updateWrapper(d,e)}}}}},qc=mc;
function rc(a){var b="";aa.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a)});return b}var sc={validateProps:function(){},postMountWrapper:function(a,b){null!=b.value&&a.setAttribute("value",b.value)},getHostProps:function(a,b){a=n({children:void 0},b);if(b=rc(b.children))a.children=b;return a}};
function tc(a,b,c){a=a.options;if(b){b={};for(var d=0;d<c.length;d++)b["$"+c[d]]=!0;for(c=0;c<a.length;c++)d=b.hasOwnProperty("$"+a[c].value),a[c].selected!==d&&(a[c].selected=d)}else{c=""+c;b=null;for(d=0;d<a.length;d++){if(a[d].value===c){a[d].selected=!0;return}null!==b||a[d].disabled||(b=a[d])}null!==b&&(b.selected=!0)}}
var uc={getHostProps:function(a,b){return n({},b,{value:void 0})},initWrapperState:function(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple}},postMountWrapper:function(a,b){a.multiple=!!b.multiple;var c=b.value;null!=c?tc(a,!!b.multiple,c):null!=b.defaultValue&&tc(a,!!b.multiple,b.defaultValue)},postUpdateWrapper:function(a,b){a._wrapperState.initialValue=void 0;var c=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!b.multiple;var d=b.value;
null!=d?tc(a,!!b.multiple,d):c!==!!b.multiple&&(null!=b.defaultValue?tc(a,!!b.multiple,b.defaultValue):tc(a,!!b.multiple,b.multiple?[]:""))},restoreControlledState:function(a,b){var c=b.value;null!=c&&tc(a,!!b.multiple,c)}},vc={getHostProps:function(a,b){null!=b.dangerouslySetInnerHTML?w("91"):void 0;return n({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})},initWrapperState:function(a,b){var c=b.value,d=c;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?
w("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:w("93"),b=b[0]),c=""+b),null==c&&(c=""),d=c);a._wrapperState={initialValue:""+d}},updateWrapper:function(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue)},postMountWrapper:function(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)},restoreControlledState:function(a,b){vc.updateWrapper(a,b)}},wc=vc,xc=n({menuitem:!0},{area:!0,
base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function yc(a,b){b&&(xc[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?w("137",a,""):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?w("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:w("61")),null!=b.style&&"object"!==typeof b.style?w("62",""):void 0)}
function zc(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ac(a){var b=zc(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"function"===typeof c.get&&"function"===typeof c.set)return Object.defineProperty(a,b,{enumerable:c.enumerable,configurable:!0,get:function(){return c.get.call(this)},set:function(a){d=""+a;c.set.call(this,a)}}),{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=null;delete a[b]}}}
var Bc={_getTrackerFromNode:function(a){return a._valueTracker},track:function(a){a._valueTracker||(a._valueTracker=Ac(a))},updateValueIfChanged:function(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=zc(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1},stopTracking:function(a){(a=a._valueTracker)&&a.stopTracking()}};
function Cc(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}
var Dc=ka.Namespaces,Ec,Fc=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Dc.svg||"innerHTML"in a)a.innerHTML=b;else for(Ec=Ec||document.createElement("div"),Ec.innerHTML="\x3csvg\x3e"+b+"\x3c/svg\x3e",b=Ec.firstChild;b.firstChild;)a.appendChild(b.firstChild)}),Gc=/["'&<>]/,Hc=F.TEXT_NODE;
function Ic(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&c.nodeType===Hc){c.nodeValue=b;return}}a.textContent=b}
l.canUseDOM&&("textContent"in document.documentElement||(Ic=function(a,b){if(a.nodeType===Hc)a.nodeValue=b;else{if("boolean"===typeof b||"number"===typeof b)b=""+b;else{b=""+b;var c=Gc.exec(b);if(c){var d="",e,f=0;for(e=c.index;e<b.length;e++){switch(b.charCodeAt(e)){case 34:c="\x26quot;";break;case 38:c="\x26amp;";break;case 39:c="\x26#x27;";break;case 60:c="\x26lt;";break;case 62:c="\x26gt;";break;default:continue}f!==e&&(d+=b.substring(f,e));f=e+1;d+=c}b=f!==e?d+b.substring(f,e):d}}Fc(a,b)}}));
var Jc=Ic,Kc=lc.getCurrentFiberOwnerName,Lc=F.DOCUMENT_NODE,Mc=F.DOCUMENT_FRAGMENT_NODE,Nc=M.listenTo,Oc=sa.registrationNameModules,Pc=ka.Namespaces.html,Qc=ka.getIntrinsicNamespace;function Rc(a,b){Nc(b,a.nodeType===Lc||a.nodeType===Mc?a:a.ownerDocument)}
var Sc={topAbort:"abort",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topSeeked:"seeked",topSeeking:"seeking",topStalled:"stalled",topSuspend:"suspend",topTimeUpdate:"timeupdate",topVolumeChange:"volumechange",
topWaiting:"waiting"},N={createElement:function(a,b,c,d){c=c.nodeType===Lc?c:c.ownerDocument;d===Pc&&(d=Qc(a));d===Pc?"script"===a?(a=c.createElement("div"),a.innerHTML="\x3cscript\x3e\x3c/script\x3e",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a},createTextNode:function(a,b){return(b.nodeType===Lc?b:b.ownerDocument).createTextNode(a)},setInitialProperties:function(a,b,c,d){var e=Cc(b,c);switch(b){case "iframe":case "object":M.trapBubbledEvent("topLoad",
"load",a);var f=c;break;case "video":case "audio":for(f in Sc)Sc.hasOwnProperty(f)&&M.trapBubbledEvent(f,Sc[f],a);f=c;break;case "source":M.trapBubbledEvent("topError","error",a);f=c;break;case "img":case "image":M.trapBubbledEvent("topError","error",a);M.trapBubbledEvent("topLoad","load",a);f=c;break;case "form":M.trapBubbledEvent("topReset","reset",a);M.trapBubbledEvent("topSubmit","submit",a);f=c;break;case "details":M.trapBubbledEvent("topToggle","toggle",a);f=c;break;case "input":qc.initWrapperState(a,
c);f=qc.getHostProps(a,c);M.trapBubbledEvent("topInvalid","invalid",a);Rc(d,"onChange");break;case "option":sc.validateProps(a,c);f=sc.getHostProps(a,c);break;case "select":uc.initWrapperState(a,c);f=uc.getHostProps(a,c);M.trapBubbledEvent("topInvalid","invalid",a);Rc(d,"onChange");break;case "textarea":wc.initWrapperState(a,c);f=wc.getHostProps(a,c);M.trapBubbledEvent("topInvalid","invalid",a);Rc(d,"onChange");break;default:f=c}yc(b,f,Kc);var g=f,h;for(h in g)if(g.hasOwnProperty(h)){var k=g[h];"style"===
h?bc.setValueForStyles(a,k):"dangerouslySetInnerHTML"===h?(k=k?k.__html:void 0,null!=k&&Fc(a,k)):"children"===h?"string"===typeof k?Jc(a,k):"number"===typeof k&&Jc(a,""+k):"suppressContentEditableWarning"!==h&&(Oc.hasOwnProperty(h)?null!=k&&Rc(d,h):e?hc.setValueForAttribute(a,h,k):null!=k&&hc.setValueForProperty(a,h,k))}switch(b){case "input":Bc.track(a);qc.postMountWrapper(a,c);break;case "textarea":Bc.track(a);wc.postMountWrapper(a,c);break;case "option":sc.postMountWrapper(a,c);break;case "select":uc.postMountWrapper(a,
c);break;default:"function"===typeof f.onClick&&(a.onclick=ca)}},diffProperties:function(a,b,c,d,e){var f=null;switch(b){case "input":c=qc.getHostProps(a,c);d=qc.getHostProps(a,d);f=[];break;case "option":c=sc.getHostProps(a,c);d=sc.getHostProps(a,d);f=[];break;case "select":c=uc.getHostProps(a,c);d=uc.getHostProps(a,d);f=[];break;case "textarea":c=wc.getHostProps(a,c);d=wc.getHostProps(a,d);f=[];break;default:"function"!==typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=ca)}yc(b,d,Kc);
var g,h;a=null;for(g in c)if(!d.hasOwnProperty(g)&&c.hasOwnProperty(g)&&null!=c[g])if("style"===g)for(h in b=c[g],b)b.hasOwnProperty(h)&&(a||(a={}),a[h]="");else"dangerouslySetInnerHTML"!==g&&"children"!==g&&"suppressContentEditableWarning"!==g&&(Oc.hasOwnProperty(g)?f||(f=[]):(f=f||[]).push(g,null));for(g in d){var k=d[g];b=null!=c?c[g]:void 0;if(d.hasOwnProperty(g)&&k!==b&&(null!=k||null!=b))if("style"===g)if(b){for(h in b)!b.hasOwnProperty(h)||k&&k.hasOwnProperty(h)||(a||(a={}),a[h]="");for(h in k)k.hasOwnProperty(h)&&
b[h]!==k[h]&&(a||(a={}),a[h]=k[h])}else a||(f||(f=[]),f.push(g,a)),a=k;else"dangerouslySetInnerHTML"===g?(k=k?k.__html:void 0,b=b?b.__html:void 0,null!=k&&b!==k&&(f=f||[]).push(g,""+k)):"children"===g?b===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(g,""+k):"suppressContentEditableWarning"!==g&&(Oc.hasOwnProperty(g)?(null!=k&&Rc(e,g),f||b===k||(f=[])):(f=f||[]).push(g,k))}a&&(f=f||[]).push("style",a);return f},updateProperties:function(a,b,c,d,e){Cc(c,d);d=Cc(c,e);for(var f=0;f<b.length;f+=
2){var g=b[f],h=b[f+1];"style"===g?bc.setValueForStyles(a,h):"dangerouslySetInnerHTML"===g?Fc(a,h):"children"===g?Jc(a,h):d?null!=h?hc.setValueForAttribute(a,g,h):hc.deleteValueForAttribute(a,g):null!=h?hc.setValueForProperty(a,g,h):hc.deleteValueForProperty(a,g)}switch(c){case "input":qc.updateWrapper(a,e);Bc.updateValueIfChanged(a);break;case "textarea":wc.updateWrapper(a,e);break;case "select":uc.postUpdateWrapper(a,e)}},diffHydratedProperties:function(a,b,c,d,e){switch(b){case "iframe":case "object":M.trapBubbledEvent("topLoad",
"load",a);break;case "video":case "audio":for(var f in Sc)Sc.hasOwnProperty(f)&&M.trapBubbledEvent(f,Sc[f],a);break;case "source":M.trapBubbledEvent("topError","error",a);break;case "img":case "image":M.trapBubbledEvent("topError","error",a);M.trapBubbledEvent("topLoad","load",a);break;case "form":M.trapBubbledEvent("topReset","reset",a);M.trapBubbledEvent("topSubmit","submit",a);break;case "details":M.trapBubbledEvent("topToggle","toggle",a);break;case "input":qc.initWrapperState(a,c);M.trapBubbledEvent("topInvalid",
"invalid",a);Rc(e,"onChange");break;case "option":sc.validateProps(a,c);break;case "select":uc.initWrapperState(a,c);M.trapBubbledEvent("topInvalid","invalid",a);Rc(e,"onChange");break;case "textarea":wc.initWrapperState(a,c),M.trapBubbledEvent("topInvalid","invalid",a),Rc(e,"onChange")}yc(b,c,Kc);d=null;for(var g in c)c.hasOwnProperty(g)&&(f=c[g],"children"===g?"string"===typeof f?a.textContent!==f&&(d=["children",f]):"number"===typeof f&&a.textContent!==""+f&&(d=["children",""+f]):Oc.hasOwnProperty(g)&&
null!=f&&Rc(e,g));switch(b){case "input":Bc.track(a);qc.postMountWrapper(a,c);break;case "textarea":Bc.track(a);wc.postMountWrapper(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&(a.onclick=ca)}return d},diffHydratedText:function(a,b){return a.nodeValue!==b},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,
b,c){switch(b){case "input":qc.restoreControlledState(a,c);break;case "textarea":wc.restoreControlledState(a,c);break;case "select":uc.restoreControlledState(a,c)}}},Tc=void 0;
if(l.canUseDOM)if("function"!==typeof requestIdleCallback){var Uc=null,Vc=null,Wc=!1,Xc=!1,Yc=0,Zc=33,$c=33,ad={timeRemaining:"object"===typeof performance&&"function"===typeof performance.now?function(){return Yc-performance.now()}:function(){return Yc-Date.now()}},bd="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){a.source===window&&a.data===bd&&(Wc=!1,a=Vc,Vc=null,null!==a&&a(ad))},!1);var cd=function(a){Xc=!1;var b=a-Yc+$c;b<$c&&Zc<$c?(8>
b&&(b=8),$c=b<Zc?Zc:b):Zc=b;Yc=a+$c;Wc||(Wc=!0,window.postMessage(bd,"*"));b=Uc;Uc=null;null!==b&&b(a)};Tc=function(a){Vc=a;Xc||(Xc=!0,requestAnimationFrame(cd));return 0}}else Tc=requestIdleCallback;else Tc=function(a){setTimeout(function(){a({timeRemaining:function(){return Infinity}})});return 0};
var dd={rIC:Tc},ed={enableAsyncSubtreeAPI:!0},Q={NoWork:0,SynchronousPriority:1,TaskPriority:2,HighPriority:3,LowPriority:4,OffscreenPriority:5},fd=J.Callback,gd=Q.NoWork,hd=Q.SynchronousPriority,id=Q.TaskPriority,jd=E.ClassComponent,kd=E.HostRoot,md=void 0,nd=void 0;function od(a,b){return a!==id&&a!==hd||b!==id&&b!==hd?a===gd&&b!==gd?-255:a!==gd&&b===gd?255:a-b:0}function pd(){return{first:null,last:null,hasForceUpdate:!1,callbackList:null}}
function qd(a,b,c,d){null!==c?c.next=b:(b.next=a.first,a.first=b);null!==d?b.next=d:a.last=b}function rd(a,b){b=b.priorityLevel;var c=null;if(null!==a.last&&0>=od(a.last.priorityLevel,b))c=a.last;else for(a=a.first;null!==a&&0>=od(a.priorityLevel,b);)c=a,a=a.next;return c}
function sd(a,b){var c=a.alternate,d=a.updateQueue;null===d&&(d=a.updateQueue=pd());null!==c?(a=c.updateQueue,null===a&&(a=c.updateQueue=pd())):a=null;md=d;nd=a!==d?a:null;var e=md;c=nd;var f=rd(e,b),g=null!==f?f.next:e.first;if(null===c)return qd(e,b,f,g),null;d=rd(c,b);a=null!==d?d.next:c.first;qd(e,b,f,g);if(g===a&&null!==g||f===d&&null!==f)return null===d&&(c.first=b),null===a&&(c.last=null),null;b={priorityLevel:b.priorityLevel,partialState:b.partialState,callback:b.callback,isReplace:b.isReplace,
isForced:b.isForced,isTopLevelUnmount:b.isTopLevelUnmount,next:null};qd(c,b,d,a);return b}function td(a,b,c,d){a=a.partialState;return"function"===typeof a?a.call(b,c,d):a}
var ud={addUpdate:function(a,b,c,d){sd(a,{priorityLevel:d,partialState:b,callback:c,isReplace:!1,isForced:!1,isTopLevelUnmount:!1,next:null})},addReplaceUpdate:function(a,b,c,d){sd(a,{priorityLevel:d,partialState:b,callback:c,isReplace:!0,isForced:!1,isTopLevelUnmount:!1,next:null})},addForceUpdate:function(a,b,c){sd(a,{priorityLevel:c,partialState:null,callback:b,isReplace:!1,isForced:!0,isTopLevelUnmount:!1,next:null})},getUpdatePriority:function(a){var b=a.updateQueue;return null===b||a.tag!==
jd&&a.tag!==kd?gd:null!==b.first?b.first.priorityLevel:gd},addTopLevelUpdate:function(a,b,c,d){var e=null===b.element;b={priorityLevel:d,partialState:b,callback:c,isReplace:!1,isForced:!1,isTopLevelUnmount:e,next:null};a=sd(a,b);e&&(e=md,c=nd,null!==e&&null!==b.next&&(b.next=null,e.last=b),null!==c&&null!==a&&null!==a.next&&(a.next=null,c.last=b))},beginUpdateQueue:function(a,b,c,d,e,f,g){null!==a&&a.updateQueue===c&&(c=b.updateQueue={first:c.first,last:c.last,callbackList:null,hasForceUpdate:!1});
a=c.callbackList;for(var h=c.hasForceUpdate,k=!0,p=c.first;null!==p&&0>=od(p.priorityLevel,g);){c.first=p.next;null===c.first&&(c.last=null);var x;if(p.isReplace)e=td(p,d,e,f),k=!0;else if(x=td(p,d,e,f))e=k?n({},e,x):n(e,x),k=!1;p.isForced&&(h=!0);null===p.callback||p.isTopLevelUnmount&&null!==p.next||(a=null!==a?a:[],a.push(p.callback),b.effectTag|=fd);p=p.next}c.callbackList=a;c.hasForceUpdate=h;null!==c.first||null!==a||h||(b.updateQueue=null);return e},commitCallbacks:function(a,b,c){a=b.callbackList;
if(null!==a)for(b.callbackList=null,b=0;b<a.length;b++){var d=a[b];"function"!==typeof d?w("191",d):void 0;d.call(c)}}},vd=[],wd=-1,xd={createCursor:function(a){return{current:a}},isEmpty:function(){return-1===wd},pop:function(a){0>wd||(a.current=vd[wd],vd[wd]=null,wd--)},push:function(a,b){wd++;vd[wd]=a.current;a.current=b},reset:function(){for(;-1<wd;)vd[wd]=null,wd--}},yd=bb.isFiberMounted,zd=E.ClassComponent,Ad=E.HostRoot,Bd=xd.createCursor,Cd=xd.pop,Dd=xd.push,Ed=Bd(da),Fd=Bd(!1),Ld=da;
function Md(a,b,c){a=a.stateNode;a.__reactInternalMemoizedUnmaskedChildContext=b;a.__reactInternalMemoizedMaskedChildContext=c}function Nd(a){return a.tag===zd&&null!=a.type.childContextTypes}function Od(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:w("108",Ra(a)||"Unknown",e);return n({},b,c)}
var R={getUnmaskedContext:function(a){return Nd(a)?Ld:Ed.current},cacheContext:Md,getMaskedContext:function(a,b){var c=a.type.contextTypes;if(!c)return da;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&Md(a,b,e);return e},hasContextChanged:function(){return Fd.current},isContextConsumer:function(a){return a.tag===zd&&null!=a.type.contextTypes},isContextProvider:Nd,popContextProvider:function(a){Nd(a)&&
(Cd(Fd,a),Cd(Ed,a))},popTopLevelContextObject:function(a){Cd(Fd,a);Cd(Ed,a)},pushTopLevelContextObject:function(a,b,c){null!=Ed.cursor?w("168"):void 0;Dd(Ed,b,a);Dd(Fd,c,a)},processChildContext:Od,pushContextProvider:function(a){if(!Nd(a))return!1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||da;Ld=Ed.current;Dd(Ed,b,a);Dd(Fd,Fd.current,a);return!0},invalidateContextProvider:function(a,b){var c=a.stateNode;c?void 0:w("169");if(b){var d=Od(a,Ld,!0);c.__reactInternalMemoizedMergedChildContext=
d;Cd(Fd,a);Cd(Ed,a);Dd(Ed,d,a)}else Cd(Fd,a);Dd(Fd,b,a)},resetContext:function(){Ld=da;Ed.current=da;Fd.current=!1},findCurrentUnmaskedContext:function(a){for(yd(a)&&a.tag===zd?void 0:w("170");a.tag!==Ad;){if(Nd(a))return a.stateNode.__reactInternalMemoizedMergedChildContext;(a=a["return"])?void 0:w("171")}return a.stateNode.context}},Pd={NoContext:0,AsyncUpdates:1},Qd=E.IndeterminateComponent,Rd=E.ClassComponent,Sd=E.HostRoot,Td=E.HostComponent,Ud=E.HostText,Vd=E.HostPortal,Wd=E.CoroutineComponent,
Xd=E.YieldComponent,Yd=E.Fragment,Zd=Q.NoWork,$d=Pd.NoContext,ae=J.NoEffect;function be(a,b,c){this.tag=a;this.key=b;this.stateNode=this.type=null;this.sibling=this.child=this["return"]=null;this.index=0;this.memoizedState=this.updateQueue=this.memoizedProps=this.pendingProps=this.ref=null;this.internalContextTag=c;this.effectTag=ae;this.lastEffect=this.firstEffect=this.nextEffect=null;this.pendingWorkPriority=Zd;this.alternate=null}
function ce(a,b,c){var d=void 0;"function"===typeof a?(d=a.prototype&&a.prototype.isReactComponent?new be(Rd,b,c):new be(Qd,b,c),d.type=a):"string"===typeof a?(d=new be(Td,b,c),d.type=a):"object"===typeof a&&null!==a&&"number"===typeof a.tag?d=a:w("130",null==a?a:typeof a,"");return d}
var de={createWorkInProgress:function(a,b){var c=a.alternate;null===c?(c=new be(a.tag,a.key,a.internalContextTag),c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.effectTag=ae,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.pendingWorkPriority=b;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c},createHostRootFiber:function(){return new be(Sd,null,$d)},
createFiberFromElement:function(a,b,c){b=ce(a.type,a.key,b,null);b.pendingProps=a.props;b.pendingWorkPriority=c;return b},createFiberFromFragment:function(a,b,c){b=new be(Yd,null,b);b.pendingProps=a;b.pendingWorkPriority=c;return b},createFiberFromText:function(a,b,c){b=new be(Ud,null,b);b.pendingProps=a;b.pendingWorkPriority=c;return b},createFiberFromElementType:ce,createFiberFromHostInstanceForDeletion:function(){var a=new be(Td,null,$d);a.type="DELETED";return a},createFiberFromCoroutine:function(a,
b,c){b=new be(Wd,a.key,b);b.type=a.handler;b.pendingProps=a;b.pendingWorkPriority=c;return b},createFiberFromYield:function(a,b){return new be(Xd,null,b)},createFiberFromPortal:function(a,b,c){b=new be(Vd,a.key,b);b.pendingProps=a.children||[];b.pendingWorkPriority=c;b.stateNode={containerInfo:a.containerInfo,implementation:a.implementation};return b},largerPriority:function(a,b){return a!==Zd&&(b===Zd||b>a)?a:b}},ee=de.createHostRootFiber,fe=E.IndeterminateComponent,ge=E.FunctionalComponent,he=E.ClassComponent,
ie=E.HostComponent,je,ke;"function"===typeof Symbol&&Symbol["for"]?(je=Symbol["for"]("react.coroutine"),ke=Symbol["for"]("react.yield")):(je=60104,ke=60105);
var le={createCoroutine:function(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:je,key:null==d?null:""+d,children:a,handler:b,props:c}},createYield:function(a){return{$$typeof:ke,value:a}},isCoroutine:function(a){return"object"===typeof a&&null!==a&&a.$$typeof===je},isYield:function(a){return"object"===typeof a&&null!==a&&a.$$typeof===ke},REACT_YIELD_TYPE:ke,REACT_COROUTINE_TYPE:je},me="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.portal")||
60106,ne={createPortal:function(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:me,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}},isPortal:function(a){return"object"===typeof a&&null!==a&&a.$$typeof===me},REACT_PORTAL_TYPE:me},oe=le.REACT_COROUTINE_TYPE,pe=le.REACT_YIELD_TYPE,qe=ne.REACT_PORTAL_TYPE,re=de.createWorkInProgress,se=de.createFiberFromElement,te=de.createFiberFromFragment,ue=de.createFiberFromText,ve=de.createFiberFromCoroutine,
we=de.createFiberFromYield,xe=de.createFiberFromPortal,ye=Array.isArray,ze=E.FunctionalComponent,Ae=E.ClassComponent,Be=E.HostText,Ce=E.HostPortal,De=E.CoroutineComponent,Ee=E.YieldComponent,Fe=E.Fragment,Ge=J.NoEffect,He=J.Placement,Ie=J.Deletion,Je="function"===typeof Symbol&&Symbol.iterator,Ke="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;
function Le(a){if(null===a||"undefined"===typeof a)return null;a=Je&&a[Je]||a["@@iterator"];return"function"===typeof a?a:null}
function Me(a,b){var c=b.ref;if(null!==c&&"function"!==typeof c){if(b._owner){b=b._owner;var d=void 0;b&&("number"===typeof b.tag?(b.tag!==Ae?w("110"):void 0,d=b.stateNode):d=b.getPublicInstance());d?void 0:w("147",c);var e=""+c;if(null!==a&&null!==a.ref&&a.ref._stringRef===e)return a.ref;a=function(a){var b=d.refs===da?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a};a._stringRef=e;return a}"string"!==typeof c?w("148"):void 0;b._owner?void 0:w("149",c)}return c}
function Ne(a,b){"textarea"!==a.type&&w("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"")}
function Oe(a,b){function c(c,d){if(b){if(!a){if(null===d.alternate)return;d=d.alternate}var m=c.lastEffect;null!==m?(m.nextEffect=d,c.lastEffect=d):c.firstEffect=c.lastEffect=d;d.nextEffect=null;d.effectTag=Ie}}function d(a,d){if(!b)return null;for(;null!==d;)c(a,d),d=d.sibling;return null}function e(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function f(b,c){if(a)return b=re(b,c),b.index=0,b.sibling=null,b;b.pendingWorkPriority=c;b.effectTag=Ge;
b.index=0;b.sibling=null;return b}function g(a,c,d){a.index=d;if(!b)return c;d=a.alternate;if(null!==d)return d=d.index,d<c?(a.effectTag=He,c):d;a.effectTag=He;return c}function h(a){b&&null===a.alternate&&(a.effectTag=He);return a}function k(a,b,c,d){if(null===b||b.tag!==Be)return c=ue(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c;b["return"]=a;return b}function p(a,b,c,d){if(null===b||b.type!==c.type)return d=se(c,a.internalContextTag,d),d.ref=Me(b,c),d["return"]=a,d;d=f(b,
d);d.ref=Me(b,c);d.pendingProps=c.props;d["return"]=a;return d}function x(a,b,c,d){if(null===b||b.tag!==De)return c=ve(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c;b["return"]=a;return b}function S(a,b,c,d){if(null===b||b.tag!==Ee)return b=we(c,a.internalContextTag,d),b.type=c.value,b["return"]=a,b;b=f(b,d);b.type=c.value;b["return"]=a;return b}function D(a,b,c,d){if(null===b||b.tag!==Ce||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return c=
xe(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c.children||[];b["return"]=a;return b}function y(a,b,c,d){if(null===b||b.tag!==Fe)return c=te(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c;b["return"]=a;return b}function B(a,b,c){if("string"===typeof b||"number"===typeof b)return b=ue(""+b,a.internalContextTag,c),b["return"]=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case Ke:return c=se(b,a.internalContextTag,c),c.ref=Me(null,b),c["return"]=
a,c;case oe:return b=ve(b,a.internalContextTag,c),b["return"]=a,b;case pe:return c=we(b,a.internalContextTag,c),c.type=b.value,c["return"]=a,c;case qe:return b=xe(b,a.internalContextTag,c),b["return"]=a,b}if(ye(b)||Le(b))return b=te(b,a.internalContextTag,c),b["return"]=a,b;Ne(a,b)}return null}function H(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:k(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case Ke:return c.key===e?p(a,
b,c,d):null;case oe:return c.key===e?x(a,b,c,d):null;case pe:return null===e?S(a,b,c,d):null;case qe:return c.key===e?D(a,b,c,d):null}if(ye(c)||Le(c))return null!==e?null:y(a,b,c,d);Ne(a,c)}return null}function C(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||null,k(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case Ke:return a=a.get(null===d.key?c:d.key)||null,p(b,a,d,e);case oe:return a=a.get(null===d.key?c:d.key)||null,x(b,a,d,e);case pe:return a=a.get(c)||
null,S(b,a,d,e);case qe:return a=a.get(null===d.key?c:d.key)||null,D(b,a,d,e)}if(ye(d)||Le(d))return a=a.get(c)||null,y(b,a,d,e);Ne(b,d)}return null}function Ca(a,f,h,k){for(var m=null,t=null,q=f,r=f=0,p=null;null!==q&&r<h.length;r++){q.index>r?(p=q,q=null):p=q.sibling;var v=H(a,q,h[r],k);if(null===v){null===q&&(q=p);break}b&&q&&null===v.alternate&&c(a,q);f=g(v,f,r);null===t?m=v:t.sibling=v;t=v;q=p}if(r===h.length)return d(a,q),m;if(null===q){for(;r<h.length;r++)if(q=B(a,h[r],k))f=g(q,f,r),null===
t?m=q:t.sibling=q,t=q;return m}for(q=e(a,q);r<h.length;r++)if(p=C(q,a,r,h[r],k)){if(b&&null!==p.alternate)q["delete"](null===p.key?r:p.key);f=g(p,f,r);null===t?m=p:t.sibling=p;t=p}b&&q.forEach(function(b){return c(a,b)});return m}function r(a,f,h,r){var m=Le(h);"function"!==typeof m?w("150"):void 0;h=m.call(h);null==h?w("151"):void 0;for(var t=m=null,q=f,k=f=0,p=null,v=h.next();null!==q&&!v.done;k++,v=h.next()){q.index>k?(p=q,q=null):p=q.sibling;var V=H(a,q,v.value,r);if(null===V){q||(q=p);break}b&&
q&&null===V.alternate&&c(a,q);f=g(V,f,k);null===t?m=V:t.sibling=V;t=V;q=p}if(v.done)return d(a,q),m;if(null===q){for(;!v.done;k++,v=h.next())v=B(a,v.value,r),null!==v&&(f=g(v,f,k),null===t?m=v:t.sibling=v,t=v);return m}for(q=e(a,q);!v.done;k++,v=h.next())if(v=C(q,a,k,v.value,r),null!==v){if(b&&null!==v.alternate)q["delete"](null===v.key?k:v.key);f=g(v,f,k);null===t?m=v:t.sibling=v;t=v}b&&q.forEach(function(b){return c(a,b)});return m}return function(a,b,e,g){var m="object"===typeof e&&null!==e;if(m)switch(e.$$typeof){case Ke:a:{var C=
e.key;for(m=b;null!==m;){if(m.key===C)if(m.type===e.type){d(a,m.sibling);b=f(m,g);b.ref=Me(m,e);b.pendingProps=e.props;b["return"]=a;a=b;break a}else{d(a,m);break}else c(a,m);m=m.sibling}g=se(e,a.internalContextTag,g);g.ref=Me(b,e);g["return"]=a;a=g}return h(a);case oe:a:{for(m=e.key;null!==b;){if(b.key===m)if(b.tag===De){d(a,b.sibling);b=f(b,g);b.pendingProps=e;b["return"]=a;a=b;break a}else{d(a,b);break}else c(a,b);b=b.sibling}e=ve(e,a.internalContextTag,g);e["return"]=a;a=e}return h(a);case pe:a:{if(null!==
b)if(b.tag===Ee){d(a,b.sibling);b=f(b,g);b.type=e.value;b["return"]=a;a=b;break a}else d(a,b);b=we(e,a.internalContextTag,g);b.type=e.value;b["return"]=a;a=b}return h(a);case qe:a:{for(m=e.key;null!==b;){if(b.key===m)if(b.tag===Ce&&b.stateNode.containerInfo===e.containerInfo&&b.stateNode.implementation===e.implementation){d(a,b.sibling);b=f(b,g);b.pendingProps=e.children||[];b["return"]=a;a=b;break a}else{d(a,b);break}else c(a,b);b=b.sibling}e=xe(e,a.internalContextTag,g);e["return"]=a;a=e}return h(a)}if("string"===
typeof e||"number"===typeof e)return e=""+e,null!==b&&b.tag===Be?(d(a,b.sibling),b=f(b,g),b.pendingProps=e,b["return"]=a,a=b):(d(a,b),e=ue(e,a.internalContextTag,g),e["return"]=a,a=e),h(a);if(ye(e))return Ca(a,b,e,g);if(Le(e))return r(a,b,e,g);m&&Ne(a,e);if("undefined"===typeof e)switch(a.tag){case Ae:case ze:e=a.type,w("152",e.displayName||e.name||"Component")}return d(a,b)}}
var Pe=Oe(!0,!0),Qe=Oe(!1,!0),Re=Oe(!1,!1),Se={reconcileChildFibers:Pe,reconcileChildFibersInPlace:Qe,mountChildFibersInPlace:Re,cloneChildFibers:function(a,b){null!==a&&b.child!==a.child?w("153"):void 0;if(null!==b.child){a=b.child;var c=re(a,a.pendingWorkPriority);c.pendingProps=a.pendingProps;b.child=c;for(c["return"]=b;null!==a.sibling;)a=a.sibling,c=c.sibling=re(a,a.pendingWorkPriority),c.pendingProps=a.pendingProps,c["return"]=b;c.sibling=null}}},Te=J.Update,Ue=Pd.AsyncUpdates,Ve=R.cacheContext,
We=R.getMaskedContext,Xe=R.getUnmaskedContext,Ye=R.isContextConsumer,Ze=ud.addUpdate,$e=ud.addReplaceUpdate,af=ud.addForceUpdate,bf=ud.beginUpdateQueue,cf=R.hasContextChanged,df=bb.isMounted;
function ef(a,b,c,d){function e(a,b){b.updater=f;a.stateNode=b;Pa.set(b,a)}var f={isMounted:df,enqueueSetState:function(c,d,e){c=Pa.get(c);var f=b(c,!1);Ze(c,d,void 0===e?null:e,f);a(c,f)},enqueueReplaceState:function(c,d,e){c=Pa.get(c);var f=b(c,!1);$e(c,d,void 0===e?null:e,f);a(c,f)},enqueueForceUpdate:function(c,d){c=Pa.get(c);var e=b(c,!1);af(c,void 0===d?null:d,e);a(c,e)}};return{adoptClassInstance:e,constructClassInstance:function(a,b){var c=a.type,d=Xe(a),f=Ye(a),g=f?We(a,d):da;b=new c(b,g);
e(a,b);f&&Ve(a,d,g);return b},mountClassInstance:function(a,b){var c=a.alternate,d=a.stateNode,e=d.state||null,g=a.pendingProps;g?void 0:w("158");var h=Xe(a);d.props=g;d.state=e;d.refs=da;d.context=We(a,h);ed.enableAsyncSubtreeAPI&&null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent&&(a.internalContextTag|=Ue);"function"===typeof d.componentWillMount&&(h=d.state,d.componentWillMount(),h!==d.state&&f.enqueueReplaceState(d,d.state,null),h=a.updateQueue,null!==
h&&(d.state=bf(c,a,h,d,e,g,b)));"function"===typeof d.componentDidMount&&(a.effectTag|=Te)},updateClassInstance:function(a,b,e){var g=b.stateNode;g.props=b.memoizedProps;g.state=b.memoizedState;var h=b.memoizedProps,k=b.pendingProps;k||(k=h,null==k?w("159"):void 0);var D=g.context,y=Xe(b);y=We(b,y);"function"!==typeof g.componentWillReceiveProps||h===k&&D===y||(D=g.state,g.componentWillReceiveProps(k,y),g.state!==D&&f.enqueueReplaceState(g,g.state,null));D=b.memoizedState;e=null!==b.updateQueue?bf(a,
b,b.updateQueue,g,D,k,e):D;if(!(h!==k||D!==e||cf()||null!==b.updateQueue&&b.updateQueue.hasForceUpdate))return"function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&D===a.memoizedState||(b.effectTag|=Te),!1;var B=k;if(null===h||null!==b.updateQueue&&b.updateQueue.hasForceUpdate)B=!0;else{var H=b.stateNode,C=b.type;B="function"===typeof H.shouldComponentUpdate?H.shouldComponentUpdate(B,e,y):C.prototype&&C.prototype.isPureReactComponent?!ea(h,B)||!ea(D,e):!0}B?("function"===typeof g.componentWillUpdate&&
g.componentWillUpdate(k,e,y),"function"===typeof g.componentDidUpdate&&(b.effectTag|=Te)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&D===a.memoizedState||(b.effectTag|=Te),c(b,k),d(b,e));g.props=k;g.state=e;g.context=y;return B}}}
var ff=Se.mountChildFibersInPlace,gf=Se.reconcileChildFibers,hf=Se.reconcileChildFibersInPlace,jf=Se.cloneChildFibers,kf=ud.beginUpdateQueue,lf=R.getMaskedContext,mf=R.getUnmaskedContext,nf=R.hasContextChanged,of=R.pushContextProvider,pf=R.pushTopLevelContextObject,qf=R.invalidateContextProvider,rf=E.IndeterminateComponent,sf=E.FunctionalComponent,tf=E.ClassComponent,uf=E.HostRoot,wf=E.HostComponent,xf=E.HostText,yf=E.HostPortal,zf=E.CoroutineComponent,Af=E.CoroutineHandlerPhase,Bf=E.YieldComponent,
Cf=E.Fragment,Df=Q.NoWork,Ef=Q.OffscreenPriority,Ff=J.PerformedWork,Gf=J.Placement,Hf=J.ContentReset,If=J.Err,Jf=J.Ref,Kf=Qa.ReactCurrentOwner;
function Lf(a,b,c,d,e){function f(a,b,c){g(a,b,c,b.pendingWorkPriority)}function g(a,b,c,d){b.child=null===a?ff(b,b.child,c,d):a.child===b.child?gf(b,b.child,c,d):hf(b,b.child,c,d)}function h(a,b){var c=b.ref;null===c||a&&a.ref===c||(b.effectTag|=Jf)}function k(a,b,c,d){h(a,b);if(!c)return d&&qf(b,!1),x(a,b);c=b.stateNode;Kf.current=b;var e=c.render();b.effectTag|=Ff;f(a,b,e);b.memoizedState=c.state;b.memoizedProps=c.props;d&&qf(b,!0);return b.child}function p(a){var b=a.stateNode;b.pendingContext?
pf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&pf(a,b.context,!1);C(a,b.containerInfo)}function x(a,b){jf(a,b);return b.child}function S(a,b){switch(b.tag){case uf:p(b);break;case tf:of(b);break;case yf:C(b,b.stateNode.containerInfo)}return null}var D=a.shouldSetTextContent,y=a.useSyncScheduling,B=a.shouldDeprioritizeSubtree,H=b.pushHostContext,C=b.pushHostContainer,Ca=c.enterHydrationState,r=c.resetHydrationState,m=c.tryToClaimNextHydratableInstance;a=ef(d,e,function(a,b){a.memoizedProps=
b},function(a,b){a.memoizedState=b});var t=a.adoptClassInstance,v=a.constructClassInstance,V=a.mountClassInstance,ld=a.updateClassInstance;return{beginWork:function(a,b,c){if(b.pendingWorkPriority===Df||b.pendingWorkPriority>c)return S(a,b);switch(b.tag){case rf:null!==a?w("155"):void 0;var d=b.type,e=b.pendingProps,g=mf(b);g=lf(b,g);d=d(e,g);b.effectTag|=Ff;"object"===typeof d&&null!==d&&"function"===typeof d.render?(b.tag=tf,e=of(b),t(b,d),V(b,c),b=k(a,b,!0,e)):(b.tag=sf,f(a,b,d),b.memoizedProps=
e,b=b.child);return b;case sf:a:{e=b.type;c=b.pendingProps;d=b.memoizedProps;if(nf())null===c&&(c=d);else if(null===c||d===c){b=x(a,b);break a}d=mf(b);d=lf(b,d);e=e(c,d);b.effectTag|=Ff;f(a,b,e);b.memoizedProps=c;b=b.child}return b;case tf:return e=of(b),d=void 0,null===a?b.stateNode?w("153"):(v(b,b.pendingProps),V(b,c),d=!0):d=ld(a,b,c),k(a,b,d,e);case uf:return p(b),d=b.updateQueue,null!==d?(e=b.memoizedState,d=kf(a,b,d,null,e,null,c),e===d?(r(),b=x(a,b)):(e=d.element,null!==a&&null!==a.child||
!Ca(b)?(r(),f(a,b,e)):(b.effectTag|=Gf,b.child=ff(b,b.child,e,c)),b.memoizedState=d,b=b.child)):(r(),b=x(a,b)),b;case wf:H(b);null===a&&m(b);e=b.type;var q=b.memoizedProps;d=b.pendingProps;null===d&&(d=q,null===d?w("154"):void 0);g=null!==a?a.memoizedProps:null;nf()||null!==d&&q!==d?(q=d.children,D(e,d)?q=null:g&&D(e,g)&&(b.effectTag|=Hf),h(a,b),c!==Ef&&!y&&B(e,d)?(b.pendingWorkPriority=Ef,b=null):(f(a,b,q),b.memoizedProps=d,b=b.child)):b=x(a,b);return b;case xf:return null===a&&m(b),a=b.pendingProps,
null===a&&(a=b.memoizedProps),b.memoizedProps=a,null;case Af:b.tag=zf;case zf:c=b.pendingProps;if(nf())null===c&&(c=a&&a.memoizedProps,null===c?w("154"):void 0);else if(null===c||b.memoizedProps===c)c=b.memoizedProps;e=c.children;d=b.pendingWorkPriority;b.stateNode=null===a?ff(b,b.stateNode,e,d):a.child===b.child?gf(b,b.stateNode,e,d):hf(b,b.stateNode,e,d);b.memoizedProps=c;return b.stateNode;case Bf:return null;case yf:a:{C(b,b.stateNode.containerInfo);c=b.pendingWorkPriority;e=b.pendingProps;if(nf())null===
e&&(e=a&&a.memoizedProps,null==e?w("154"):void 0);else if(null===e||b.memoizedProps===e){b=x(a,b);break a}null===a?b.child=hf(b,b.child,e,c):f(a,b,e);b.memoizedProps=e;b=b.child}return b;case Cf:a:{c=b.pendingProps;if(nf())null===c&&(c=b.memoizedProps);else if(null===c||b.memoizedProps===c){b=x(a,b);break a}f(a,b,c);b.memoizedProps=c;b=b.child}return b;default:w("156")}},beginFailedWork:function(a,b,c){switch(b.tag){case tf:of(b);break;case uf:p(b);break;default:w("157")}b.effectTag|=If;null===a?
b.child=null:b.child!==a.child&&(b.child=a.child);if(b.pendingWorkPriority===Df||b.pendingWorkPriority>c)return S(a,b);b.firstEffect=null;b.lastEffect=null;g(a,b,null,c);b.tag===tf&&(a=b.stateNode,b.memoizedProps=a.props,b.memoizedState=a.state);return b.child}}}
var Mf=Se.reconcileChildFibers,Nf=R.popContextProvider,Of=R.popTopLevelContextObject,Pf=E.IndeterminateComponent,Qf=E.FunctionalComponent,Rf=E.ClassComponent,Sf=E.HostRoot,Tf=E.HostComponent,Uf=E.HostText,Vf=E.HostPortal,Wf=E.CoroutineComponent,Xf=E.CoroutineHandlerPhase,Yf=E.YieldComponent,Zf=E.Fragment,ag=J.Placement,bg=J.Ref,cg=J.Update,dg=Q.OffscreenPriority;
function eg(a,b,c){var d=a.createInstance,e=a.createTextInstance,f=a.appendInitialChild,g=a.finalizeInitialChildren,h=a.prepareUpdate,k=b.getRootHostContainer,p=b.popHostContext,x=b.getHostContext,S=b.popHostContainer,D=c.prepareToHydrateHostInstance,y=c.prepareToHydrateHostTextInstance,B=c.popHydrationState;return{completeWork:function(a,b,c){var r=b.pendingProps;if(null===r)r=b.memoizedProps;else if(b.pendingWorkPriority!==dg||c===dg)b.pendingProps=null;switch(b.tag){case Qf:return null;case Rf:return Nf(b),
null;case Sf:S(b);Of(b);r=b.stateNode;r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null);if(null===a||null===a.child)B(b),b.effectTag&=~ag;return null;case Tf:p(b);c=k();var m=b.type;if(null!==a&&null!=b.stateNode){var t=a.memoizedProps,C=b.stateNode,V=x();r=h(C,m,t,r,c,V);if(b.updateQueue=r)b.effectTag|=cg;a.ref!==b.ref&&(b.effectTag|=bg)}else{if(!r)return null===b.stateNode?w("166"):void 0,null;a=x();if(B(b))D(b,c,a)&&(b.effectTag|=cg);else{a=d(m,r,c,a,b);a:for(t=b.child;null!==
t;){if(t.tag===Tf||t.tag===Uf)f(a,t.stateNode);else if(t.tag!==Vf&&null!==t.child){t=t.child;continue}if(t===b)break a;for(;null===t.sibling;){if(null===t["return"]||t["return"]===b)break a;t=t["return"]}t=t.sibling}g(a,m,r,c)&&(b.effectTag|=cg);b.stateNode=a}null!==b.ref&&(b.effectTag|=bg)}return null;case Uf:if(a&&null!=b.stateNode)a.memoizedProps!==r&&(b.effectTag|=cg);else{if("string"!==typeof r)return null===b.stateNode?w("166"):void 0,null;a=k();c=x();B(b)?y(b)&&(b.effectTag|=cg):b.stateNode=
e(r,a,c,b)}return null;case Wf:(r=b.memoizedProps)?void 0:w("165");b.tag=Xf;c=[];a:for((m=b.stateNode)&&(m["return"]=b);null!==m;){if(m.tag===Tf||m.tag===Uf||m.tag===Vf)w("164");else if(m.tag===Yf)c.push(m.type);else if(null!==m.child){m.child["return"]=m;m=m.child;continue}for(;null===m.sibling;){if(null===m["return"]||m["return"]===b)break a;m=m["return"]}m.sibling["return"]=m["return"];m=m.sibling}m=r.handler;r=m(r.props,c);b.child=Mf(b,null!==a?a.child:null,r,b.pendingWorkPriority);return b.child;
case Xf:return b.tag=Wf,null;case Yf:return null;case Zf:return null;case Vf:return b.effectTag|=cg,S(b),null;case Pf:w("167");default:w("156")}}}}var fg=null,gg=null;function hg(a){return function(b){try{return a(b)}catch(c){}}}
var ig={injectInternals:function(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!b.supportsFiber)return!0;try{var c=b.inject(a);fg=hg(function(a){return b.onCommitFiberRoot(c,a)});gg=hg(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0},onCommitRoot:function(a){"function"===typeof fg&&fg(a)},onCommitUnmount:function(a){"function"===typeof gg&&gg(a)}},jg=E.ClassComponent,kg=E.HostRoot,lg=E.HostComponent,mg=E.HostText,ng=
E.HostPortal,og=E.CoroutineComponent,pg=ud.commitCallbacks,qg=ig.onCommitUnmount,rg=J.Placement,sg=J.Update,tg=J.Callback,ug=J.ContentReset;
function vg(a,b){function c(a){var c=a.ref;if(null!==c)try{c(null)}catch(t){b(a,t)}}function d(a){return a.tag===lg||a.tag===kg||a.tag===ng}function e(a){for(var b=a;;)if(g(b),null!==b.child&&b.tag!==ng)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||b["return"]===a)return;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}function f(a){for(var b=a,c=!1,d=void 0,f=void 0;;){if(!c){c=b["return"];a:for(;;){null===c?w("160"):void 0;switch(c.tag){case lg:d=
c.stateNode;f=!1;break a;case kg:d=c.stateNode.containerInfo;f=!0;break a;case ng:d=c.stateNode.containerInfo;f=!0;break a}c=c["return"]}c=!0}if(b.tag===lg||b.tag===mg)e(b),f?C(d,b.stateNode):H(d,b.stateNode);else if(b.tag===ng?d=b.stateNode.containerInfo:g(b),null!==b.child){b.child["return"]=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||b["return"]===a)return;b=b["return"];b.tag===ng&&(c=!1)}b.sibling["return"]=b["return"];b=b.sibling}}function g(a){"function"===
typeof qg&&qg(a);switch(a.tag){case jg:c(a);var d=a.stateNode;if("function"===typeof d.componentWillUnmount)try{d.props=a.memoizedProps,d.state=a.memoizedState,d.componentWillUnmount()}catch(t){b(a,t)}break;case lg:c(a);break;case og:e(a.stateNode);break;case ng:f(a)}}var h=a.commitMount,k=a.commitUpdate,p=a.resetTextContent,x=a.commitTextUpdate,S=a.appendChild,D=a.appendChildToContainer,y=a.insertBefore,B=a.insertInContainerBefore,H=a.removeChild,C=a.removeChildFromContainer,Ca=a.getPublicInstance;
return{commitPlacement:function(a){a:{for(var b=a["return"];null!==b;){if(d(b)){var c=b;break a}b=b["return"]}w("160");c=void 0}var e=b=void 0;switch(c.tag){case lg:b=c.stateNode;e=!1;break;case kg:b=c.stateNode.containerInfo;e=!0;break;case ng:b=c.stateNode.containerInfo;e=!0;break;default:w("161")}c.effectTag&ug&&(p(b),c.effectTag&=~ug);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c["return"]||d(c["return"])){c=null;break a}c=c["return"]}c.sibling["return"]=c["return"];for(c=c.sibling;c.tag!==
lg&&c.tag!==mg;){if(c.effectTag&rg)continue b;if(null===c.child||c.tag===ng)continue b;else c.child["return"]=c,c=c.child}if(!(c.effectTag&rg)){c=c.stateNode;break a}}for(var f=a;;){if(f.tag===lg||f.tag===mg)c?e?B(b,f.stateNode,c):y(b,f.stateNode,c):e?D(b,f.stateNode):S(b,f.stateNode);else if(f.tag!==ng&&null!==f.child){f.child["return"]=f;f=f.child;continue}if(f===a)break;for(;null===f.sibling;){if(null===f["return"]||f["return"]===a)return;f=f["return"]}f.sibling["return"]=f["return"];f=f.sibling}},
commitDeletion:function(a){f(a);a["return"]=null;a.child=null;a.alternate&&(a.alternate.child=null,a.alternate["return"]=null)},commitWork:function(a,b){switch(b.tag){case jg:break;case lg:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&k(c,f,e,a,d,b)}break;case mg:null===b.stateNode?w("162"):void 0;c=b.memoizedProps;x(b.stateNode,null!==a?a.memoizedProps:c,c);break;case kg:break;case ng:break;default:w("163")}},
commitLifeCycles:function(a,b){switch(b.tag){case jg:var c=b.stateNode;if(b.effectTag&sg)if(null===a)c.props=b.memoizedProps,c.state=b.memoizedState,c.componentDidMount();else{var d=a.memoizedProps;a=a.memoizedState;c.props=b.memoizedProps;c.state=b.memoizedState;c.componentDidUpdate(d,a)}b.effectTag&tg&&null!==b.updateQueue&&pg(b,b.updateQueue,c);break;case kg:a=b.updateQueue;null!==a&&pg(b,a,b.child&&b.child.stateNode);break;case lg:c=b.stateNode;null===a&&b.effectTag&sg&&h(c,b.type,b.memoizedProps,
b);break;case mg:break;case ng:break;default:w("163")}},commitAttachRef:function(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case lg:b(Ca(c));break;default:b(c)}}},commitDetachRef:function(a){a=a.ref;null!==a&&a(null)}}}var wg=xd.createCursor,xg=xd.pop,yg=xd.push,zg={};
function Ag(a){function b(a){a===zg?w("174"):void 0;return a}var c=a.getChildHostContext,d=a.getRootHostContext,e=wg(zg),f=wg(zg),g=wg(zg);return{getHostContext:function(){return b(e.current)},getRootHostContainer:function(){return b(g.current)},popHostContainer:function(a){xg(e,a);xg(f,a);xg(g,a)},popHostContext:function(a){f.current===a&&(xg(e,a),xg(f,a))},pushHostContainer:function(a,b){yg(g,b,a);b=d(b);yg(f,a,a);yg(e,b,a)},pushHostContext:function(a){var d=b(g.current),h=b(e.current);d=c(h,a.type,
d);h!==d&&(yg(f,a,a),yg(e,d,a))},resetHostContainer:function(){e.current=zg;g.current=zg}}}var Bg=E.HostComponent,Cg=E.HostText,Dg=E.HostRoot,Eg=J.Deletion,Fg=J.Placement,Gg=de.createFiberFromHostInstanceForDeletion;
function Hg(a){function b(a,b){var c=Gg();c.stateNode=b;c["return"]=a;c.effectTag=Eg;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function c(a,b){switch(a.tag){case Bg:return f(b,a.type,a.pendingProps);case Cg:return g(b,a.pendingProps);default:return!1}}function d(a){for(a=a["return"];null!==a&&a.tag!==Bg&&a.tag!==Dg;)a=a["return"];y=a}var e=a.shouldSetTextContent,f=a.canHydrateInstance,g=a.canHydrateTextInstance,h=a.getNextHydratableSibling,k=a.getFirstHydratableChild,
p=a.hydrateInstance,x=a.hydrateTextInstance,S=a.didNotHydrateInstance,D=a.didNotFindHydratableInstance;a=a.didNotFindHydratableTextInstance;if(!(f&&g&&h&&k&&p&&x&&S&&D&&a))return{enterHydrationState:function(){return!1},resetHydrationState:function(){},tryToClaimNextHydratableInstance:function(){},prepareToHydrateHostInstance:function(){w("175")},prepareToHydrateHostTextInstance:function(){w("176")},popHydrationState:function(){return!1}};var y=null,B=null,H=!1;return{enterHydrationState:function(a){B=
k(a.stateNode.containerInfo);y=a;return H=!0},resetHydrationState:function(){B=y=null;H=!1},tryToClaimNextHydratableInstance:function(a){if(H){var d=B;if(d){if(!c(a,d)){d=h(d);if(!d||!c(a,d)){a.effectTag|=Fg;H=!1;y=a;return}b(y,B)}a.stateNode=d;y=a;B=k(d)}else a.effectTag|=Fg,H=!1,y=a}},prepareToHydrateHostInstance:function(a,b,c){b=p(a.stateNode,a.type,a.memoizedProps,b,c,a);a.updateQueue=b;return null!==b?!0:!1},prepareToHydrateHostTextInstance:function(a){return x(a.stateNode,a.memoizedProps,a)},
popHydrationState:function(a){if(a!==y)return!1;if(!H)return d(a),H=!0,!1;var c=a.type;if(a.tag!==Bg||"head"!==c&&"body"!==c&&!e(c,a.memoizedProps))for(c=B;c;)b(a,c),c=h(c);d(a);B=y?h(a.stateNode):null;return!0}}}
var Ig=R.popContextProvider,Jg=xd.reset,Kg=Qa.ReactCurrentOwner,Lg=de.createWorkInProgress,Mg=de.largerPriority,Ng=ig.onCommitRoot,T=Q.NoWork,Og=Q.SynchronousPriority,U=Q.TaskPriority,Pg=Q.HighPriority,Qg=Q.LowPriority,Rg=Q.OffscreenPriority,Sg=Pd.AsyncUpdates,Tg=J.PerformedWork,Ug=J.Placement,Vg=J.Update,Wg=J.PlacementAndUpdate,Xg=J.Deletion,Yg=J.ContentReset,Zg=J.Callback,$g=J.Err,ah=J.Ref,bh=E.HostRoot,ch=E.HostComponent,dh=E.HostPortal,eh=E.ClassComponent,fh=ud.getUpdatePriority,gh=R.resetContext;
function hh(a){function b(){for(;null!==ma&&ma.current.pendingWorkPriority===T;){ma.isScheduled=!1;var a=ma.nextScheduledRoot;ma.nextScheduledRoot=null;if(ma===zb)return zb=ma=null,z=T,null;ma=a}a=ma;for(var b=null,c=T;null!==a;)a.current.pendingWorkPriority!==T&&(c===T||c>a.current.pendingWorkPriority)&&(c=a.current.pendingWorkPriority,b=a),a=a.nextScheduledRoot;null!==b?(z=c,Jg(),gh(),t(),I=Lg(b.current,c),b!==nc&&(oc=0,nc=b)):(z=T,nc=I=null)}function c(c){Hd=!0;na=null;var d=c.stateNode;d.current===
c?w("177"):void 0;z!==Og&&z!==U||oc++;Kg.current=null;if(c.effectTag>Tg)if(null!==c.lastEffect){c.lastEffect.nextEffect=c;var e=c.firstEffect}else e=c;else e=c.firstEffect;Ui();for(u=e;null!==u;){var f=!1,g=void 0;try{for(;null!==u;){var h=u.effectTag;h&Yg&&a.resetTextContent(u.stateNode);if(h&ah){var k=u.alternate;null!==k&&Ph(k)}switch(h&~(Zg|$g|Yg|ah|Tg)){case Ug:q(u);u.effectTag&=~Ug;break;case Wg:q(u);u.effectTag&=~Ug;vf(u.alternate,u);break;case Vg:vf(u.alternate,u);break;case Xg:Id=!0,Mh(u),
Id=!1}u=u.nextEffect}}catch(Jd){f=!0,g=Jd}f&&(null===u?w("178"):void 0,x(u,g),null!==u&&(u=u.nextEffect))}Vi();d.current=c;for(u=e;null!==u;){d=!1;e=void 0;try{for(;null!==u;){var Gd=u.effectTag;Gd&(Vg|Zg)&&Nh(u.alternate,u);Gd&ah&&Oh(u);if(Gd&$g)switch(f=u,g=void 0,null!==P&&(g=P.get(f),P["delete"](f),null==g&&null!==f.alternate&&(f=f.alternate,g=P.get(f),P["delete"](f))),null==g?w("184"):void 0,f.tag){case eh:f.stateNode.componentDidCatch(g.error,{componentStack:g.componentStack});break;case bh:null===
Ja&&(Ja=g.error);break;default:w("157")}var m=u.nextEffect;u.nextEffect=null;u=m}}catch(Jd){d=!0,e=Jd}d&&(null===u?w("178"):void 0,x(u,e),null!==u&&(u=u.nextEffect))}Hd=!1;"function"===typeof Ng&&Ng(c.stateNode);va&&(va.forEach(H),va=null);b()}function d(a){for(;;){var b=Lh(a.alternate,a,z),c=a["return"],d=a.sibling;var e=a;if(!(e.pendingWorkPriority!==T&&e.pendingWorkPriority>z)){for(var f=fh(e),g=e.child;null!==g;)f=Mg(f,g.pendingWorkPriority),g=g.sibling;e.pendingWorkPriority=f}if(null!==b)return b;
null!==c&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),a.effectTag>Tg&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;if(null!==c)a=c;else{na=a;break}}return null}function e(a){var b=V(a.alternate,a,z);null===b&&(b=d(a));Kg.current=null;return b}function f(a){var b=ld(a.alternate,a,z);null===b&&(b=d(a));Kg.current=null;return b}
function g(a){p(Rg,a)}function h(){if(null!==P&&0<P.size&&z===U)for(;null!==I;){var a=I;I=null!==P&&(P.has(a)||null!==a.alternate&&P.has(a.alternate))?f(I):e(I);if(null===I&&(null===na?w("179"):void 0,O=U,c(na),O=z,null===P||0===P.size||z!==U))break}}function k(a,d){null!==na?(O=U,c(na),h()):null===I&&b();if(!(z===T||z>a)){O=z;a:do{if(z<=U)for(;null!==I&&!(I=e(I),null===I&&(null===na?w("179"):void 0,O=U,c(na),O=z,h(),z===T||z>a||z>U)););else if(null!==d)for(;null!==I&&!Ab;)if(1<d.timeRemaining()){if(I=
e(I),null===I)if(null===na?w("179"):void 0,1<d.timeRemaining()){if(O=U,c(na),O=z,h(),z===T||z>a||z<Pg)break}else Ab=!0}else Ab=!0;switch(z){case Og:case U:if(z<=a)continue a;break a;case Pg:case Qg:case Rg:if(null===d)break a;if(!Ab&&z<=a)continue a;break a;case T:break a;default:w("181")}}while(1)}}function p(a,b){Da?w("182"):void 0;Da=!0;var c=O,d=!1,e=null;try{k(a,b)}catch(Kd){d=!0,e=Kd}for(;d;){if(Ya){Ja=e;break}var h=I;if(null===h)Ya=!0;else{var p=x(h,e);null===p?w("183"):void 0;if(!Ya){try{d=
p;e=a;p=b;for(var q=d;null!==h;){switch(h.tag){case eh:Ig(h);break;case ch:m(h);break;case bh:r(h);break;case dh:r(h)}if(h===q||h.alternate===q)break;h=h["return"]}I=f(d);k(e,p)}catch(Kd){d=!0;e=Kd;continue}break}}}O=c;null!==b&&(Bb=!1);z>U&&!Bb&&($f(g),Bb=!0);a=Ja;Ya=Ab=Da=!1;nc=Ka=P=Ja=null;oc=0;if(null!==a)throw a;}function x(a,b){var c=Kg.current=null,d=!1,e=!1,f=null;if(a.tag===bh)c=a,S(a)&&(Ya=!0);else for(var g=a["return"];null!==g&&null===c;){g.tag===eh?"function"===typeof g.stateNode.componentDidCatch&&
(d=!0,f=Ra(g),c=g,e=!0):g.tag===bh&&(c=g);if(S(g)){if(Id||null!==va&&(va.has(g)||null!==g.alternate&&va.has(g.alternate)))return null;c=null;e=!1}g=g["return"]}if(null!==c){null===Ka&&(Ka=new Set);Ka.add(c);var h="";g=a;do{a:switch(g.tag){case fe:case ge:case he:case ie:var k=g._debugOwner,m=g._debugSource;var p=Ra(g);var q=null;k&&(q=Ra(k));k=m;p="\n    in "+(p||"Unknown")+(k?" (at "+k.fileName.replace(/^.*[\\\/]/,"")+":"+k.lineNumber+")":q?" (created by "+q+")":"");break a;default:p=""}h+=p;g=g["return"]}while(g);
g=h;a=Ra(a);null===P&&(P=new Map);b={componentName:a,componentStack:g,error:b,errorBoundary:d?c.stateNode:null,errorBoundaryFound:d,errorBoundaryName:f,willRetry:e};P.set(c,b);try{console.error(b.error)}catch(Wi){console.error(Wi)}Hd?(null===va&&(va=new Set),va.add(c)):H(c);return c}null===Ja&&(Ja=b);return null}function S(a){return null!==Ka&&(Ka.has(a)||null!==a.alternate&&Ka.has(a.alternate))}function D(a,b){return y(a,b,!1)}function y(a,b){oc>Xi&&(Ya=!0,w("185"));!Da&&b<=z&&(I=null);for(var c=
!0;null!==a&&c;){c=!1;if(a.pendingWorkPriority===T||a.pendingWorkPriority>b)c=!0,a.pendingWorkPriority=b;null!==a.alternate&&(a.alternate.pendingWorkPriority===T||a.alternate.pendingWorkPriority>b)&&(c=!0,a.alternate.pendingWorkPriority=b);if(null===a["return"])if(a.tag===bh){var d=a.stateNode;b===T||d.isScheduled||(d.isScheduled=!0,zb?zb.nextScheduledRoot=d:ma=d,zb=d);if(!Da)switch(b){case Og:pc?p(Og,null):p(U,null);break;case U:W?void 0:w("186");break;default:Bb||($f(g),Bb=!0)}}else break;a=a["return"]}}
function B(a,b){var c=O;c===T&&(c=!Yi||a.internalContextTag&Sg||b?Qg:Og);return c===Og&&(Da||W)?U:c}function H(a){y(a,U,!0)}var C=Ag(a),Ca=Hg(a),r=C.popHostContainer,m=C.popHostContext,t=C.resetHostContainer,v=Lf(a,C,Ca,D,B),V=v.beginWork,ld=v.beginFailedWork,Lh=eg(a,C,Ca).completeWork;C=vg(a,x);var q=C.commitPlacement,Mh=C.commitDeletion,vf=C.commitWork,Nh=C.commitLifeCycles,Oh=C.commitAttachRef,Ph=C.commitDetachRef,$f=a.scheduleDeferredCallback,Yi=a.useSyncScheduling,Ui=a.prepareForCommit,Vi=a.resetAfterCommit,
O=T,Da=!1,Ab=!1,W=!1,pc=!1,I=null,z=T,u=null,na=null,ma=null,zb=null,Bb=!1,P=null,Ka=null,va=null,Ja=null,Ya=!1,Hd=!1,Id=!1,Xi=1E3,oc=0,nc=null;return{scheduleUpdate:D,getPriorityContext:B,batchedUpdates:function(a,b){var c=W;W=!0;try{return a(b)}finally{W=c,Da||W||p(U,null)}},unbatchedUpdates:function(a){var b=pc,c=W;pc=W;W=!1;try{return a()}finally{W=c,pc=b}},flushSync:function(a){var b=W,c=O;W=!0;O=Og;try{return a()}finally{W=b,O=c,Da?w("187"):void 0,p(U,null)}},deferredUpdates:function(a){var b=
O;O=Qg;try{return a()}finally{O=b}}}}function ih(){w("196")}function jh(a){if(!a)return da;a=Pa.get(a);return"number"===typeof a.tag?ih(a):a._processChildContext(a._context)}jh._injectFiber=function(a){ih=a};var kh=ud.addTopLevelUpdate,lh=R.findCurrentUnmaskedContext,mh=R.isContextProvider,nh=R.processChildContext,oh=E.HostComponent,ph=bb.findCurrentHostFiber,qh=bb.findCurrentHostFiberWithNoPortals;jh._injectFiber(function(a){var b=lh(a);return mh(a)?nh(a,b,!1):b});var rh=F.TEXT_NODE;
function sh(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function th(a,b){var c=sh(a);a=0;for(var d;c;){if(c.nodeType===rh){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=sh(c)}}var uh=null;function vh(){!uh&&l.canUseDOM&&(uh="textContent"in document.documentElement?"textContent":"innerText");return uh}
var wh={getOffsets:function(a){var b=window.getSelection&&window.getSelection();if(!b||0===b.rangeCount)return null;var c=b.anchorNode,d=b.anchorOffset,e=b.focusNode,f=b.focusOffset,g=b.getRangeAt(0);try{g.startContainer.nodeType,g.endContainer.nodeType}catch(k){return null}b=b.anchorNode===b.focusNode&&b.anchorOffset===b.focusOffset?0:g.toString().length;var h=g.cloneRange();h.selectNodeContents(a);h.setEnd(g.startContainer,g.startOffset);a=h.startContainer===h.endContainer&&h.startOffset===h.endOffset?
0:h.toString().length;g=a+b;b=document.createRange();b.setStart(c,d);b.setEnd(e,f);c=b.collapsed;return{start:c?g:a,end:c?a:g}},setOffsets:function(a,b){if(window.getSelection){var c=window.getSelection(),d=a[vh()].length,e=Math.min(b.start,d);b=void 0===b.end?e:Math.min(b.end,d);!c.extend&&e>b&&(d=b,b=e,e=d);d=th(a,e);a=th(a,b);if(d&&a){var f=document.createRange();f.setStart(d.node,d.offset);c.removeAllRanges();e>b?(c.addRange(f),c.extend(a.node,a.offset)):(f.setEnd(a.node,a.offset),c.addRange(f))}}}},
xh=F.ELEMENT_NODE,yh={hasSelectionCapabilities:function(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&"text"===a.type||"textarea"===b||"true"===a.contentEditable)},getSelectionInformation:function(){var a=ia();return{focusedElem:a,selectionRange:yh.hasSelectionCapabilities(a)?yh.getSelection(a):null}},restoreSelection:function(a){var b=ia(),c=a.focusedElem;a=a.selectionRange;if(b!==c&&fa(document.documentElement,c)){yh.hasSelectionCapabilities(c)&&yh.setSelection(c,a);b=
[];for(a=c;a=a.parentNode;)a.nodeType===xh&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});ha(c);for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}},getSelection:function(a){return("selectionStart"in a?{start:a.selectionStart,end:a.selectionEnd}:wh.getOffsets(a))||{start:0,end:0}},setSelection:function(a,b){var c=b.start,d=b.end;void 0===d&&(d=c);"selectionStart"in a?(a.selectionStart=c,a.selectionEnd=Math.min(d,a.value.length)):wh.setOffsets(a,b)}},zh=yh,
Ah=F.ELEMENT_NODE;function Bh(){w("211")}function Ch(){w("212")}function Dh(a){if(null==a)return null;if(a.nodeType===Ah)return a;var b=Pa.get(a);if(b)return"number"===typeof b.tag?Bh(b):Ch(b);"function"===typeof a.render?w("188"):w("213",Object.keys(a))}Dh._injectFiber=function(a){Bh=a};Dh._injectStack=function(a){Ch=a};var Eh=E.HostComponent;function Fh(a){if(void 0!==a._hostParent)return a._hostParent;if("number"===typeof a.tag){do a=a["return"];while(a&&a.tag!==Eh);if(a)return a}return null}
function Gh(a,b){for(var c=0,d=a;d;d=Fh(d))c++;d=0;for(var e=b;e;e=Fh(e))d++;for(;0<c-d;)a=Fh(a),c--;for(;0<d-c;)b=Fh(b),d--;for(;c--;){if(a===b||a===b.alternate)return a;a=Fh(a);b=Fh(b)}return null}
var Hh={isAncestor:function(a,b){for(;b;){if(a===b||a===b.alternate)return!0;b=Fh(b)}return!1},getLowestCommonAncestor:Gh,getParentInstance:function(a){return Fh(a)},traverseTwoPhase:function(a,b,c){for(var d=[];a;)d.push(a),a=Fh(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)},traverseEnterLeave:function(a,b,c,d,e){for(var f=a&&b?Gh(a,b):null,g=[];a&&a!==f;)g.push(a),a=Fh(a);for(a=[];b&&b!==f;)a.push(b),b=Fh(b);for(b=0;b<g.length;b++)c(g[b],"bubbled",d);for(b=
a.length;0<b--;)c(a[b],"captured",e)}},Ih=Jb.getListener;function Jh(a,b,c){if(b=Ih(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=Cb(c._dispatchListeners,b),c._dispatchInstances=Cb(c._dispatchInstances,a)}function Kh(a){a&&a.dispatchConfig.phasedRegistrationNames&&Hh.traverseTwoPhase(a._targetInst,Jh,a)}function Qh(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?Hh.getParentInstance(b):null;Hh.traverseTwoPhase(b,Jh,a)}}
function Rh(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Ih(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=Cb(c._dispatchListeners,b),c._dispatchInstances=Cb(c._dispatchInstances,a))}function Sh(a){a&&a.dispatchConfig.registrationName&&Rh(a._targetInst,null,a)}
var Th={accumulateTwoPhaseDispatches:function(a){Db(a,Kh)},accumulateTwoPhaseDispatchesSkipTarget:function(a){Db(a,Qh)},accumulateDirectDispatches:function(a){Db(a,Sh)},accumulateEnterLeaveDispatches:function(a,b,c,d){Hh.traverseEnterLeave(c,d,Rh,a,b)}},X={_root:null,_startText:null,_fallbackText:null},Uh={initialize:function(a){X._root=a;X._startText=Uh.getText();return!0},reset:function(){X._root=null;X._startText=null;X._fallbackText=null},getData:function(){if(X._fallbackText)return X._fallbackText;
var a,b=X._startText,c=b.length,d,e=Uh.getText(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);X._fallbackText=e.slice(a,1<d?1-d:void 0);return X._fallbackText},getText:function(){return"value"in X._root?X._root.value:X._root[vh()]}},Vh=Uh,Wh="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),Xh={type:null,target:null,currentTarget:ca.thatReturnsNull,eventPhase:null,bubbles:null,
cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
function Y(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?ca.thatReturnsTrue:ca.thatReturnsFalse;this.isPropagationStopped=ca.thatReturnsFalse;return this}
n(Y.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=ca.thatReturnsTrue)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=ca.thatReturnsTrue)},persist:function(){this.isPersistent=ca.thatReturnsTrue},isPersistent:ca.thatReturnsFalse,
destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<Wh.length;a++)this[Wh[a]]=null}});Y.Interface=Xh;Y.augmentClass=function(a,b){function c(){}c.prototype=this.prototype;var d=new c;n(d,a.prototype);a.prototype=d;a.prototype.constructor=a;a.Interface=n({},this.Interface,b);a.augmentClass=this.augmentClass;Yh(a)};Yh(Y);function Zh(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}
function $h(a){a instanceof this?void 0:w("223");a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function Yh(a){a.eventPool=[];a.getPooled=Zh;a.release=$h}function ai(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(ai,{data:null});function bi(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(bi,{data:null});var ci=[9,13,27,32],di=l.canUseDOM&&"CompositionEvent"in window,ei=null;l.canUseDOM&&"documentMode"in document&&(ei=document.documentMode);var fi;
if(fi=l.canUseDOM&&"TextEvent"in window&&!ei){var gi=window.opera;fi=!("object"===typeof gi&&"function"===typeof gi.version&&12>=parseInt(gi.version(),10))}
var hi=fi,ii=l.canUseDOM&&(!di||ei&&8<ei&&11>=ei),ji=String.fromCharCode(32),ki={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["topCompositionEnd","topKeyPress","topTextInput","topPaste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"topBlur topCompositionEnd topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"topBlur topCompositionStart topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"topBlur topCompositionUpdate topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")}},li=!1;
function mi(a,b){switch(a){case "topKeyUp":return-1!==ci.indexOf(b.keyCode);case "topKeyDown":return 229!==b.keyCode;case "topKeyPress":case "topMouseDown":case "topBlur":return!0;default:return!1}}function ni(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var oi=!1;function pi(a,b){switch(a){case "topCompositionEnd":return ni(b);case "topKeyPress":if(32!==b.which)return null;li=!0;return ji;case "topTextInput":return a=b.data,a===ji&&li?null:a;default:return null}}
function qi(a,b){if(oi)return"topCompositionEnd"===a||!di&&mi(a,b)?(a=Vh.getData(),Vh.reset(),oi=!1,a):null;switch(a){case "topPaste":return null;case "topKeyPress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "topCompositionEnd":return ii?null:b.data;default:return null}}
var ri={eventTypes:ki,extractEvents:function(a,b,c,d){var e;if(di)b:{switch(a){case "topCompositionStart":var f=ki.compositionStart;break b;case "topCompositionEnd":f=ki.compositionEnd;break b;case "topCompositionUpdate":f=ki.compositionUpdate;break b}f=void 0}else oi?mi(a,c)&&(f=ki.compositionEnd):"topKeyDown"===a&&229===c.keyCode&&(f=ki.compositionStart);f?(ii&&(oi||f!==ki.compositionStart?f===ki.compositionEnd&&oi&&(e=Vh.getData()):oi=Vh.initialize(d)),f=ai.getPooled(f,b,c,d),e?f.data=e:(e=ni(c),
null!==e&&(f.data=e)),Th.accumulateTwoPhaseDispatches(f),e=f):e=null;(a=hi?pi(a,c):qi(a,c))?(b=bi.getPooled(ki.beforeInput,b,c,d),b.data=a,Th.accumulateTwoPhaseDispatches(b)):b=null;return[e,b]}},si={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ti(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!si[a.type]:"textarea"===b?!0:!1}
var ui={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ")}};function vi(a,b,c){a=Y.getPooled(ui.change,a,b,c);a.type="change";nb.enqueueStateRestore(c);Th.accumulateTwoPhaseDispatches(a);return a}var wi=null,xi=null;function yi(a){Jb.enqueueEvents(a);Jb.processEventQueue(!1)}
function zi(a){var b=G.getNodeFromInstance(a);if(Bc.updateValueIfChanged(b))return a}function Ai(a,b){if("topChange"===a)return b}var Bi=!1;l.canUseDOM&&(Bi=Lb("input")&&(!document.documentMode||9<document.documentMode));function Ci(){wi&&(wi.detachEvent("onpropertychange",Di),xi=wi=null)}function Di(a){"value"===a.propertyName&&zi(xi)&&(a=vi(xi,a,ub(a)),sb.batchedUpdates(yi,a))}function Ei(a,b,c){"topFocus"===a?(Ci(),wi=b,xi=c,wi.attachEvent("onpropertychange",Di)):"topBlur"===a&&Ci()}
function Fi(a){if("topSelectionChange"===a||"topKeyUp"===a||"topKeyDown"===a)return zi(xi)}function Gi(a,b){if("topClick"===a)return zi(b)}function Hi(a,b){if("topInput"===a||"topChange"===a)return zi(b)}
var Ii={eventTypes:ui,_isInputEventSupported:Bi,extractEvents:function(a,b,c,d){var e=b?G.getNodeFromInstance(b):window,f=e.nodeName&&e.nodeName.toLowerCase();if("select"===f||"input"===f&&"file"===e.type)var g=Ai;else if(ti(e))if(Bi)g=Hi;else{g=Fi;var h=Ei}else f=e.nodeName,!f||"input"!==f.toLowerCase()||"checkbox"!==e.type&&"radio"!==e.type||(g=Gi);if(g&&(g=g(a,b)))return vi(g,c,d);h&&h(a,e,b);"topBlur"===a&&null!=b&&(a=b._wrapperState||e._wrapperState)&&a.controlled&&"number"===e.type&&(a=""+e.value,
e.getAttribute("value")!==a&&e.setAttribute("value",a))}};function Ji(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(Ji,{view:function(a){if(a.view)return a.view;a=ub(a);return a.window===a?a:(a=a.ownerDocument)?a.defaultView||a.parentWindow:window},detail:function(a){return a.detail||0}});var Ki={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Li(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Ki[a])?!!b[a]:!1}function Mi(){return Li}
function Ni(a,b,c,d){return Y.call(this,a,b,c,d)}Ji.augmentClass(Ni,{screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:Mi,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}});
var Oi={mouseEnter:{registrationName:"onMouseEnter",dependencies:["topMouseOut","topMouseOver"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["topMouseOut","topMouseOver"]}},Pi={eventTypes:Oi,extractEvents:function(a,b,c,d){if("topMouseOver"===a&&(c.relatedTarget||c.fromElement)||"topMouseOut"!==a&&"topMouseOver"!==a)return null;var e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;"topMouseOut"===a?(a=b,b=(b=c.relatedTarget||c.toElement)?G.getClosestInstanceFromNode(b):
null):a=null;if(a===b)return null;var f=null==a?e:G.getNodeFromInstance(a);e=null==b?e:G.getNodeFromInstance(b);var g=Ni.getPooled(Oi.mouseLeave,a,c,d);g.type="mouseleave";g.target=f;g.relatedTarget=e;c=Ni.getPooled(Oi.mouseEnter,b,c,d);c.type="mouseenter";c.target=e;c.relatedTarget=f;Th.accumulateEnterLeaveDispatches(g,c,a,b);return[g,c]}},Qi=F.DOCUMENT_NODE,Ri=l.canUseDOM&&"documentMode"in document&&11>=document.documentMode,Si={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},
dependencies:"topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ")}},Ti=null,Zi=null,$i=null,aj=!1,bj=M.isListeningToAllDependencies;
function cj(a,b){if(aj||null==Ti||Ti!==ia())return null;var c=Ti;"selectionStart"in c&&zh.hasSelectionCapabilities(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return $i&&ea($i,c)?null:($i=c,a=Y.getPooled(Si.select,Zi,a,b),a.type="select",a.target=Ti,Th.accumulateTwoPhaseDispatches(a),a)}
var dj={eventTypes:Si,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:d.nodeType===Qi?d:d.ownerDocument;if(!e||!bj("onSelect",e))return null;e=b?G.getNodeFromInstance(b):window;switch(a){case "topFocus":if(ti(e)||"true"===e.contentEditable)Ti=e,Zi=b,$i=null;break;case "topBlur":$i=Zi=Ti=null;break;case "topMouseDown":aj=!0;break;case "topContextMenu":case "topMouseUp":return aj=!1,cj(c,d);case "topSelectionChange":if(Ri)break;case "topKeyDown":case "topKeyUp":return cj(c,d)}return null}};
function ej(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(ej,{animationName:null,elapsedTime:null,pseudoElement:null});function fj(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(fj,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}});function gj(a,b,c,d){return Y.call(this,a,b,c,d)}Ji.augmentClass(gj,{relatedTarget:null});function hj(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;return 32<=a||13===a?a:0}
var ij={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jj={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};function kj(a,b,c,d){return Y.call(this,a,b,c,d)}
Ji.augmentClass(kj,{key:function(a){if(a.key){var b=ij[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=hj(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?jj[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:Mi,charCode:function(a){return"keypress"===a.type?hj(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?hj(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}});function lj(a,b,c,d){return Y.call(this,a,b,c,d)}Ni.augmentClass(lj,{dataTransfer:null});function mj(a,b,c,d){return Y.call(this,a,b,c,d)}Ji.augmentClass(mj,{touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:Mi});function nj(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(nj,{propertyName:null,elapsedTime:null,pseudoElement:null});
function oj(a,b,c,d){return Y.call(this,a,b,c,d)}Ni.augmentClass(oj,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null});var pj={},qj={};
"abort animationEnd animationIteration animationStart blur cancel canPlay canPlayThrough click close contextMenu copy cut doubleClick drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error focus input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing progress rateChange reset scroll seeked seeking stalled submit suspend timeUpdate toggle touchCancel touchEnd touchMove touchStart transitionEnd volumeChange waiting wheel".split(" ").forEach(function(a){var b=a[0].toUpperCase()+
a.slice(1),c="on"+b;b="top"+b;c={phasedRegistrationNames:{bubbled:c,captured:c+"Capture"},dependencies:[b]};pj[a]=c;qj[b]=c});
var rj={eventTypes:pj,extractEvents:function(a,b,c,d){var e=qj[a];if(!e)return null;switch(a){case "topAbort":case "topCancel":case "topCanPlay":case "topCanPlayThrough":case "topClose":case "topDurationChange":case "topEmptied":case "topEncrypted":case "topEnded":case "topError":case "topInput":case "topInvalid":case "topLoad":case "topLoadedData":case "topLoadedMetadata":case "topLoadStart":case "topPause":case "topPlay":case "topPlaying":case "topProgress":case "topRateChange":case "topReset":case "topSeeked":case "topSeeking":case "topStalled":case "topSubmit":case "topSuspend":case "topTimeUpdate":case "topToggle":case "topVolumeChange":case "topWaiting":var f=Y;
break;case "topKeyPress":if(0===hj(c))return null;case "topKeyDown":case "topKeyUp":f=kj;break;case "topBlur":case "topFocus":f=gj;break;case "topClick":if(2===c.button)return null;case "topDoubleClick":case "topMouseDown":case "topMouseMove":case "topMouseUp":case "topMouseOut":case "topMouseOver":case "topContextMenu":f=Ni;break;case "topDrag":case "topDragEnd":case "topDragEnter":case "topDragExit":case "topDragLeave":case "topDragOver":case "topDragStart":case "topDrop":f=lj;break;case "topTouchCancel":case "topTouchEnd":case "topTouchMove":case "topTouchStart":f=
mj;break;case "topAnimationEnd":case "topAnimationIteration":case "topAnimationStart":f=ej;break;case "topTransitionEnd":f=nj;break;case "topScroll":f=Ji;break;case "topWheel":f=oj;break;case "topCopy":case "topCut":case "topPaste":f=fj}f?void 0:w("86",a);a=f.getPooled(e,b,c,d);Th.accumulateTwoPhaseDispatches(a);return a}};L.setHandleTopLevel(M.handleTopLevel);Jb.injection.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
ib.injection.injectComponentTree(G);Jb.injection.injectEventPluginsByName({SimpleEventPlugin:rj,EnterLeaveEventPlugin:Pi,ChangeEventPlugin:Ii,SelectEventPlugin:dj,BeforeInputEventPlugin:ri});
var sj=A.injection.MUST_USE_PROPERTY,Z=A.injection.HAS_BOOLEAN_VALUE,tj=A.injection.HAS_NUMERIC_VALUE,uj=A.injection.HAS_POSITIVE_NUMERIC_VALUE,vj=A.injection.HAS_STRING_BOOLEAN_VALUE,wj={Properties:{allowFullScreen:Z,allowTransparency:vj,async:Z,autoPlay:Z,capture:Z,checked:sj|Z,cols:uj,contentEditable:vj,controls:Z,"default":Z,defer:Z,disabled:Z,download:A.injection.HAS_OVERLOADED_BOOLEAN_VALUE,draggable:vj,formNoValidate:Z,hidden:Z,loop:Z,multiple:sj|Z,muted:sj|Z,noValidate:Z,open:Z,playsInline:Z,
readOnly:Z,required:Z,reversed:Z,rows:uj,rowSpan:tj,scoped:Z,seamless:Z,selected:sj|Z,size:uj,start:tj,span:uj,spellCheck:vj,style:0,itemScope:Z,acceptCharset:0,className:0,htmlFor:0,httpEquiv:0,value:vj},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMMutationMethods:{value:function(a,b){if(null==b)return a.removeAttribute("value");"number"!==a.type||!1===a.hasAttribute("value")?a.setAttribute("value",""+b):a.validity&&!a.validity.badInput&&
a.ownerDocument.activeElement!==a&&a.setAttribute("value",""+b)}}},xj=A.injection.HAS_STRING_BOOLEAN_VALUE,yj={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},zj={Properties:{autoReverse:xj,externalResourcesRequired:xj,preserveAlpha:xj},DOMAttributeNames:{autoReverse:"autoReverse",externalResourcesRequired:"externalResourcesRequired",preserveAlpha:"preserveAlpha"},DOMAttributeNamespaces:{xlinkActuate:yj.xlink,xlinkArcrole:yj.xlink,xlinkHref:yj.xlink,xlinkRole:yj.xlink,
xlinkShow:yj.xlink,xlinkTitle:yj.xlink,xlinkType:yj.xlink,xmlBase:yj.xml,xmlLang:yj.xml,xmlSpace:yj.xml}},Aj=/[\-\:]([a-z])/g;function Bj(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function(a){var b=a.replace(Aj,
Bj);zj.Properties[b]=0;zj.DOMAttributeNames[b]=a});A.injection.injectDOMPropertyConfig(wj);A.injection.injectDOMPropertyConfig(zj);
var Cj=ig.injectInternals,Dj=F.ELEMENT_NODE,Ej=F.TEXT_NODE,Fj=F.COMMENT_NODE,Gj=F.DOCUMENT_NODE,Hj=F.DOCUMENT_FRAGMENT_NODE,Ij=A.ROOT_ATTRIBUTE_NAME,Jj=ka.getChildNamespace,Kj=N.createElement,Lj=N.createTextNode,Mj=N.setInitialProperties,Nj=N.diffProperties,Oj=N.updateProperties,Pj=N.diffHydratedProperties,Qj=N.diffHydratedText,Rj=N.warnForDeletedHydratableElement,Sj=N.warnForDeletedHydratableText,Tj=N.warnForInsertedHydratedElement,Uj=N.warnForInsertedHydratedText,Vj=G.precacheFiberNode,Wj=G.updateFiberProps;
nb.injection.injectFiberControlledHostComponent(N);Dh._injectFiber(function(a){return Xj.findHostInstance(a)});var Yj=null,Zj=null;function ak(a){return!(!a||a.nodeType!==Dj&&a.nodeType!==Gj&&a.nodeType!==Hj&&(a.nodeType!==Fj||" react-mount-point-unstable "!==a.nodeValue))}function bk(a){a=a?a.nodeType===Gj?a.documentElement:a.firstChild:null;return!(!a||a.nodeType!==Dj||!a.hasAttribute(Ij))}
var Xj=function(a){var b=a.getPublicInstance;a=hh(a);var c=a.scheduleUpdate,d=a.getPriorityContext;return{createContainer:function(a){var b=ee();a={current:b,containerInfo:a,isScheduled:!1,nextScheduledRoot:null,context:null,pendingContext:null};return b.stateNode=a},updateContainer:function(a,b,g,h){var e=b.current;g=jh(g);null===b.context?b.context=g:b.pendingContext=g;b=h;h=d(e,ed.enableAsyncSubtreeAPI&&null!=a&&null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent);
a={element:a};kh(e,a,void 0===b?null:b,h);c(e,h)},batchedUpdates:a.batchedUpdates,unbatchedUpdates:a.unbatchedUpdates,deferredUpdates:a.deferredUpdates,flushSync:a.flushSync,getPublicRootInstance:function(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case oh:return b(a.child.stateNode);default:return a.child.stateNode}},findHostInstance:function(a){a=ph(a);return null===a?null:a.stateNode},findHostInstanceWithNoPortals:function(a){a=qh(a);return null===a?null:a.stateNode}}}({getRootHostContext:function(a){if(a.nodeType===
Gj)a=(a=a.documentElement)?a.namespaceURI:Jj(null,"");else{var b=a.nodeType===Fj?a.parentNode:a;a=b.namespaceURI||null;b=b.tagName;a=Jj(a,b)}return a},getChildHostContext:function(a,b){return Jj(a,b)},getPublicInstance:function(a){return a},prepareForCommit:function(){Yj=M.isEnabled();Zj=zh.getSelectionInformation();M.setEnabled(!1)},resetAfterCommit:function(){zh.restoreSelection(Zj);Zj=null;M.setEnabled(Yj);Yj=null},createInstance:function(a,b,c,d,e){a=Kj(a,b,c,d);Vj(e,a);Wj(a,b);return a},appendInitialChild:function(a,
b){a.appendChild(b)},finalizeInitialChildren:function(a,b,c,d){Mj(a,b,c,d);a:{switch(b){case "button":case "input":case "select":case "textarea":a=!!c.autoFocus;break a}a=!1}return a},prepareUpdate:function(a,b,c,d,e){return Nj(a,b,c,d,e)},commitMount:function(a){a.focus()},commitUpdate:function(a,b,c,d,e){Wj(a,e);Oj(a,b,c,d,e)},shouldSetTextContent:function(a,b){return"textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&
"string"===typeof b.dangerouslySetInnerHTML.__html},resetTextContent:function(a){a.textContent=""},shouldDeprioritizeSubtree:function(a,b){return!!b.hidden},createTextInstance:function(a,b,c,d){a=Lj(a,b);Vj(d,a);return a},commitTextUpdate:function(a,b,c){a.nodeValue=c},appendChild:function(a,b){a.appendChild(b)},appendChildToContainer:function(a,b){a.nodeType===Fj?a.parentNode.insertBefore(b,a):a.appendChild(b)},insertBefore:function(a,b,c){a.insertBefore(b,c)},insertInContainerBefore:function(a,
b,c){a.nodeType===Fj?a.parentNode.insertBefore(b,c):a.insertBefore(b,c)},removeChild:function(a,b){a.removeChild(b)},removeChildFromContainer:function(a,b){a.nodeType===Fj?a.parentNode.removeChild(b):a.removeChild(b)},canHydrateInstance:function(a,b){return a.nodeType===Dj&&b===a.nodeName.toLowerCase()},canHydrateTextInstance:function(a,b){return""===b?!1:a.nodeType===Ej},getNextHydratableSibling:function(a){for(a=a.nextSibling;a&&a.nodeType!==Dj&&a.nodeType!==Ej;)a=a.nextSibling;return a},getFirstHydratableChild:function(a){for(a=
a.firstChild;a&&a.nodeType!==Dj&&a.nodeType!==Ej;)a=a.nextSibling;return a},hydrateInstance:function(a,b,c,d,e,f){Vj(f,a);Wj(a,c);return Pj(a,b,c,e,d)},hydrateTextInstance:function(a,b,c){Vj(c,a);return Qj(a,b)},didNotHydrateInstance:function(a,b){1===b.nodeType?Rj(a,b):Sj(a,b)},didNotFindHydratableInstance:function(a,b,c){Tj(a,b,c)},didNotFindHydratableTextInstance:function(a,b){Uj(a,b)},scheduleDeferredCallback:dd.rIC,useSyncScheduling:!0});sb.injection.injectFiberBatchedUpdates(Xj.batchedUpdates);
function ck(a,b,c,d,e){ak(c)?void 0:w("200");var f=c._reactRootContainer;if(f)Xj.updateContainer(b,f,a,e);else{if(!d&&!bk(c))for(d=void 0;d=c.lastChild;)c.removeChild(d);var g=Xj.createContainer(c);f=c._reactRootContainer=g;Xj.unbatchedUpdates(function(){Xj.updateContainer(b,g,a,e)})}return Xj.getPublicRootInstance(f)}function dk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;ak(b)?void 0:w("200");return ne.createPortal(a,b,null,c)}
var ek={createPortal:dk,hydrate:function(a,b,c){return ck(null,a,b,!0,c)},render:function(a,b,c){return ck(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null!=a&&Pa.has(a)?void 0:w("38");return ck(a,b,c,!1,d)},unmountComponentAtNode:function(a){ak(a)?void 0:w("40");return a._reactRootContainer?(Xj.unbatchedUpdates(function(){ck(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},findDOMNode:Dh,unstable_createPortal:dk,unstable_batchedUpdates:sb.batchedUpdates,
unstable_deferredUpdates:Xj.deferredUpdates,flushSync:Xj.flushSync,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:Jb,EventPluginRegistry:sa,EventPropagators:Th,ReactControlledComponent:nb,ReactDOMComponentTree:G,ReactDOMEventListener:L}};Cj({findFiberByHostInstance:G.getClosestInstanceFromNode,findHostInstanceByFiber:Xj.findHostInstance,bundleType:0,version:"16.0.0",rendererPackageName:"react-dom"});module.exports=ek;


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 React v16.0.0
 react.production.min.js

 Copyright (c) 2013-present, Facebook, Inc.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/
var f=__webpack_require__(10),p=__webpack_require__(63);__webpack_require__(0);var r=__webpack_require__(19);
function t(a){for(var b=arguments.length-1,d="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,e=0;e<b;e++)d+="\x26args[]\x3d"+encodeURIComponent(arguments[e+1]);b=Error(d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var u={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function v(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}v.prototype.isReactComponent={};v.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?t("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};v.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function w(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}function x(){}x.prototype=v.prototype;var y=w.prototype=new x;y.constructor=w;f(y,v.prototype);y.isPureReactComponent=!0;function z(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}var A=z.prototype=new x;A.constructor=z;f(A,v.prototype);A.unstable_isAsyncReactComponent=!0;A.render=function(){return this.props.children};
var B={Component:v,PureComponent:w,AsyncComponent:z},C={current:null},D=Object.prototype.hasOwnProperty,E="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103,F={key:!0,ref:!0,__self:!0,__source:!0};function G(a,b,d,e,c,g,k){return{$$typeof:E,type:a,key:b,ref:d,props:k,_owner:g}}
G.createElement=function(a,b,d){var e,c={},g=null,k=null,m=null,q=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),m=void 0===b.__self?null:b.__self,q=void 0===b.__source?null:b.__source,b)D.call(b,e)&&!F.hasOwnProperty(e)&&(c[e]=b[e]);var l=arguments.length-2;if(1===l)c.children=d;else if(1<l){for(var h=Array(l),n=0;n<l;n++)h[n]=arguments[n+2];c.children=h}if(a&&a.defaultProps)for(e in l=a.defaultProps,l)void 0===c[e]&&(c[e]=l[e]);return G(a,g,k,m,q,C.current,c)};
G.createFactory=function(a){var b=G.createElement.bind(null,a);b.type=a;return b};G.cloneAndReplaceKey=function(a,b){return G(a.type,b,a.ref,a._self,a._source,a._owner,a.props)};
G.cloneElement=function(a,b,d){var e=f({},a.props),c=a.key,g=a.ref,k=a._self,m=a._source,q=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,q=C.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(h in b)D.call(b,h)&&!F.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==l?l[h]:b[h])}var h=arguments.length-2;if(1===h)e.children=d;else if(1<h){l=Array(h);for(var n=0;n<h;n++)l[n]=arguments[n+2];e.children=l}return G(a.type,c,g,k,m,q,e)};
G.isValidElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===E};var H="function"===typeof Symbol&&Symbol.iterator,I="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var J=/\/+/g,K=[];
function L(a,b,d,e){if(K.length){var c=K.pop();c.result=a;c.keyPrefix=b;c.func=d;c.context=e;c.count=0;return c}return{result:a,keyPrefix:b,func:d,context:e,count:0}}function M(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>K.length&&K.push(a)}
function N(a,b,d,e){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;if(null===a||"string"===c||"number"===c||"object"===c&&a.$$typeof===I)return d(e,a,""===b?"."+O(a,0):b),1;var g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){c=a[k];var m=b+O(c,k);g+=N(c,m,d,e)}else if(m=H&&a[H]||a["@@iterator"],"function"===typeof m)for(a=m.call(a),k=0;!(c=a.next()).done;)c=c.value,m=b+O(c,k++),g+=N(c,m,d,e);else"object"===c&&(d=""+a,t("31","[object Object]"===d?"object with keys {"+
Object.keys(a).join(", ")+"}":d,""));return g}function O(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function P(a,b){a.func.call(a.context,b,a.count++)}function Q(a,b,d){var e=a.result,c=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?R(a,e,d,r.thatReturnsArgument):null!=a&&(G.isValidElement(a)&&(a=G.cloneAndReplaceKey(a,c+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(J,"$\x26/")+"/")+d)),e.push(a))}
function R(a,b,d,e,c){var g="";null!=d&&(g=(""+d).replace(J,"$\x26/")+"/");b=L(b,g,e,c);null==a||N(a,"",Q,b);M(b)}var S={forEach:function(a,b,d){if(null==a)return a;b=L(null,null,b,d);null==a||N(a,"",P,b);M(b)},map:function(a,b,d){if(null==a)return a;var e=[];R(a,e,null,b,d);return e},count:function(a){return null==a?0:N(a,"",r.thatReturnsNull,null)},toArray:function(a){var b=[];R(a,b,null,r.thatReturnsArgument);return b}};
module.exports={Children:{map:S.map,forEach:S.forEach,count:S.count,toArray:S.toArray,only:function(a){G.isValidElement(a)?void 0:t("143");return a}},Component:B.Component,PureComponent:B.PureComponent,unstable_AsyncComponent:B.AsyncComponent,createElement:G.createElement,cloneElement:G.cloneElement,isValidElement:G.isValidElement,createFactory:G.createFactory,version:"16.0.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:C,assign:f}};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(98)))

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * UAParser.js v0.7.14
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 & MIT
 */

(function (window, undefined) {

    'use strict';

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '0.7.14',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major', // deprecated
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded';


    ///////////
    // Helper
    //////////


    var util = {
        extend : function (regexes, extensions) {
            var margedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    margedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    margedRegexes[i] = regexes[i];
                }
            }
            return margedRegexes;
        },
        has : function (str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize : function (str) {
            return str.toLowerCase();
        },
        major : function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
        },
        trim : function (str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
    };


    ///////////////
    // Map helper
    //////////////


    var mapper = {

        rgx : function (ua, arrays) {

            //var result = {},
            var i = 0, j, k, p, q, matches, match;//, args = arguments;

            /*// construct object barebones
            for (p = 0; p < args[1].length; p++) {
                q = args[1][p];
                result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
            }*/

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
            //console.log(this);
            //return this;
        },

        str : function (str, map) {

            for (var i in map) {
                // check if array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
        }
    };


    ///////////////
    // String map
    //////////////


    var maps = {

        browser : {
            oldsafari : {
                version : {
                    '1.0'   : '/8',
                    '1.2'   : '/1',
                    '1.3'   : '/3',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    '?'     : '/'
                }
            }
        },

        device : {
            amazon : {
                model : {
                    'Fire Phone' : ['SD', 'KF']
                }
            },
            sprint : {
                model : {
                    'Evo Shift 4G' : '7373KT'
                },
                vendor : {
                    'HTC'       : 'APA',
                    'Sprint'    : 'Sprint'
                }
            }
        },

        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    '8.1'       : 'NT 6.3',
                    '10'        : ['NT 6.4', 'NT 10.0'],
                    'RT'        : 'ARM'
                }
            }
        }
    };


    //////////////
    // Regex map
    /////////////


    var regexes = {

        browser : [[

            // Presto based
            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
            ], [NAME, VERSION], [

            /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
            ], [[NAME, 'Opera Mini'], VERSION], [

            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
            ], [[NAME, 'Opera'], VERSION], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer

            // Trident based
            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser/Baidu
            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)\/([\w\.]+)*/i,                                            // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser)\/([\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
            ], [NAME, VERSION], [

            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
            ], [[NAME, 'IE'], VERSION], [

            /(edge)\/((\d+)?[\w\.]+)/i                                          // Microsoft Edge
            ], [NAME, VERSION], [

            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
            ], [[NAME, 'Yandex'], VERSION], [

            /(puffin)\/([\w\.]+)/i                                              // Puffin
            ], [[NAME, 'Puffin'], VERSION], [

            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i
                                                                                // UCBrowser
            ], [[NAME, 'UCBrowser'], VERSION], [

            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [

            /(micromessenger)\/([\w\.]+)/i                                      // WeChat
            ], [[NAME, 'WeChat'], VERSION], [

            /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
            ], [NAME, VERSION], [

            /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
            ], [NAME, VERSION], [

            /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
            ], [VERSION, [NAME, 'MIUI Browser']], [

            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
            ], [VERSION, [NAME, 'Facebook']], [

            /(headlesschrome) ([\w\.]+)/i                                       // Chrome Headless
            ], [VERSION, [NAME, 'Chrome Headless']], [

            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
            ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

            /((?:oculus|samsung)browser)\/([\w\.]+)/i
            ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
            ], [VERSION, [NAME, 'Android Browser']], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
            ], [[NAME, 'Dolphin'], VERSION], [

            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
            ], [[NAME, 'Chrome'], VERSION], [

            /(coast)\/([\w\.]+)/i                                               // Opera Coast
            ], [[NAME, 'Opera Coast'], VERSION], [

            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, 'Firefox']], [

            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [

            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
            ], [VERSION, NAME], [

            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

            /(konqueror)\/([\w\.]+)/i,                                          // Konqueror
            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
            /(links)\s\(([\w\.]+)/i,                                            // Links
            /(gobrowser)\/?([\w\.]+)*/i,                                        // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
            ], [NAME, VERSION]

            /* /////////////////////
            // Media players BEGIN
            ////////////////////////

            , [

            /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
            /(coremedia) v((\d+)[\w\._]+)/i
            ], [NAME, VERSION], [

            /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
            ], [NAME, VERSION], [

            /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
            ], [NAME, VERSION], [

            /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
                                                                                // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
                                                                                // NSPlayer/PSP-InternetRadioPlayer/Videos
            /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
            /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
            /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
            ], [NAME, VERSION], [
            /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
            ], [NAME, VERSION], [

            /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
            ], [[NAME, 'Flip Player'], VERSION], [

            /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
                                                                                // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
            ], [NAME], [

            /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
                                                                                // Gstreamer
            ], [NAME, VERSION], [

            /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
            /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
                                                                                // Java/urllib/requests/wget/cURL
            /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
            ], [NAME, VERSION], [

            /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
            ], [[NAME, /_/g, ' '], VERSION], [

            /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
                                                                                // MPlayer SVN
            ], [NAME, VERSION], [

            /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
            ], [NAME, VERSION], [

            /(mplayer)/i,                                                       // MPlayer (no other info)
            /(yourmuze)/i,                                                      // YourMuze
            /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
            ], [NAME], [

            /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
            ], [NAME, VERSION], [

            /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
            ], [NAME, VERSION], [

            /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
            ], [NAME, VERSION], [

            /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
            /(winamp)\s((\d+)[\w\.-]+)/i,
            /(winamp)mpeg\/((\d+)[\w\.-]+)/i
            ], [NAME, VERSION], [

            /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                                // inlight radio
            ], [NAME], [

            /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
                                                                                // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                                // SoundTap/Totem/Stagefright/Streamium
            ], [NAME, VERSION], [

            /(smp)((\d+)[\d\.]+)/i                                              // SMP
            ], [NAME, VERSION], [

            /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
            /(vlc)\/((\d+)[\w\.-]+)/i,
            /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
            /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
            /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
            ], [NAME, VERSION], [

            /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
            /(windows-media-player)\/((\d+)[\w\.-]+)/i
            ], [[NAME, /-/g, ' '], VERSION], [

            /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
                                                                                // Windows Media Server
            ], [VERSION, [NAME, 'Windows']], [

            /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
            ], [NAME, VERSION], [

            /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
            /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
            ], [[NAME, 'rad.io'], VERSION]

            //////////////////////
            // Media players END
            ////////////////////*/

        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, util.lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32
            ], [[ARCHITECTURE, 'ia32']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, util.lowerize]]
        ],

        device : [[

            /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i                         // iPad/PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [

            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

            /(apple\s{0,1}tv)/i                                                 // Apple TV
            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [

            /(archos)\s(gamepad2?)/i,                                           // Archos
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(hp).+(tablet)/i,                                                  // HP Tablet
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i                               // Kindle Fire HD
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
            /(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i                  // Fire Phone
            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [

            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
                                                                                // Asus Tablets
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i
            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
            /(sony)?(?:sgp.+)\sbuild\//i
            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
            /android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /\s(ouya)\s/i,                                                      // Ouya
            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

            /android.+;\s(shield)\sbuild/i                                      // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

            /(playstation\s[34portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

            /(sprint\s(\w+))/i                                                  // Sprint Phones
            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

            /(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i                         // Lenovo tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
            /(zte)-(\w+)*/i,                                                    // ZTE
            /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
                                                                                // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            /(nexus\s9)/i                                                       // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

            /d\/huawei([\w\s-]+)[;\)]/i,
            /(nexus\s6p)/i                                                      // Huawei
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

            /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

                                                                                // Motorola
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w+)*/i,
            /(XT\d{3,4}) build\//i,
            /(nexus\s6)/i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
            /((SM-T\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
            /smart-tv.+(samsung)/i
            ], [VENDOR, [TYPE, SMARTTV], MODEL], [
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
            /sec-((sgh\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

            /sie-(\w+)*/i                                                       // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]+)*/i
            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

            /android\s3\.[\s\w;-]{10}(a\d{3})/i                                 // Acer
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
            /(lg) netcast\.tv/i                                                 // LG SmartTV
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /(nexus\s[45])/i,                                                   // LG
            /lg[e;\s\/-]+(\w+)*/i,
            /android.+lg(\-?[\d\w]+)\s+build/i
            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

            /linux;.+((jolla));/i                                               // Jolla
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google']], [

            /android.+;\s(glass)\s\d/i                                          // Google Glass
            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

            /android.+;\s(pixel c)\s/i                                          // Google Pixel C
            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

            /android.+;\s(pixel xl|pixel)\s/i                                   // Google Pixel
            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

            /android.+(\w+)\s+build\/hm\1/i,                                    // Xiaomi Hongmi 'numeric' models
            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
            /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i    // Xiaomi Mi
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [

            /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu Tablet
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, TABLET]], [

            /android.+a000(1)\s+build/i                                         // OnePlus
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Venue[\d\s]*)\s+build/i                          // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i     // Barnes & Noble Tablet
            ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(zte)?.+(k\d{2})\s+build/i                        // ZTE K Series Tablet
            ], [[VENDOR, 'ZTE'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

            /(android).+[;\/]\s+([YR]\d{2}x?.*)\s+build/i,
            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(.+)\s+build/i          // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(NS-?.+)\s+build/i                                // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((NX|Next)-?.+)\s+build/i                         // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Xtreme\_?)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

            /android.+[;\/]\s*(LVTEL\-?)?(V1[12])\s+build/i                     // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(.*\b)\s+build/i             // Le Pan Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i                         // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

            /android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

            /android.+(Gigaset)[\s\-]+(Q.+)\s+build/i                           // Gigaset Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
            ], [[TYPE, util.lowerize], VENDOR, MODEL], [

            /(android.+)[;\/].+build/i                                          // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]


        /*//////////////////////////
            // TODO: move to string map
            ////////////////////////////

            /(C6603)/i                                                          // Sony Xperia Z C6603
            ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
            /(C6903)/i                                                          // Sony Xperia Z 1
            ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
            ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
            ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
            ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G313HZ)/i                                                      // Samsung Galaxy V
            ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
            ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
            /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
            ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
            ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [

            /(T3C)/i                                                            // Advan Vandroid T3C
            ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
            ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
            ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [

            /(V972M)/i                                                          // ZTE V972M
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [

            /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
            ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
            /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
            ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [

            /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
            ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [

            /////////////
            // END TODO
            ///////////*/

        ],

        engine : [[

            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, 'EdgeHTML']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]+).*(gecko)/i                                           // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i,                  // Windows Phone
            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [[NAME, 'BlackBerry'], VERSION], [
            /(blackberry)\w*\/?([\w\.]+)*/i,                                    // Blackberry
            /(tizen)[\/\s]([\w\.]+)/i,                                          // Tizen
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
            /linux;.+(sailfish);/i                                              // Sailfish OS
            ], [NAME, VERSION], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i                 // Symbian
            ], [[NAME, 'Symbian'], VERSION], [
            /\((series40);/i                                                    // Series 40
            ], [NAME], [
            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
            ], [[NAME, 'Firefox OS'], VERSION], [

            // Console
            /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w+)*/i,                                           // Mint
            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]+)*/i,                                       // Hurd/Linux
            /(gnu)\s?([\w\.]+)*/i                                               // GNU
            ], [NAME, VERSION], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Solaris
            /(sunos)\s?([\w\.]+\d)*/i                                           // Solaris
            ], [[NAME, 'Solaris'], VERSION], [

            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i                   // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            ], [NAME, VERSION],[

            /(haiku)\s(\w+)/i                                                  // Haiku
            ], [NAME, VERSION],[

            /cfnetwork\/.+darwin/i,
            /ip[honead]+(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i                // iOS
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

            /(mac\sos\sx)\s?([\w\s\.]+\w)*/i,
            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Other
            /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,                            // Solaris
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,                               // AIX
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
            /(unix)\s?([\w\.]+)*/i                                              // UNIX
            ], [NAME, VERSION]
        ]
    };


    /////////////////
    // Constructor
    ////////////////

    var Browser = function (name, version) {
        this[NAME] = name;
        this[VERSION] = version;
    };
    var CPU = function (arch) {
        this[ARCHITECTURE] = arch;
    };
    var Device = function (vendor, model, type) {
        this[VENDOR] = vendor;
        this[MODEL] = model;
        this[TYPE] = type;
    };
    var Engine = Browser;
    var OS = Browser;

    var UAParser = function (uastring, extensions) {

        if (typeof uastring === 'object') {
            extensions = uastring;
            uastring = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(uastring, extensions).getResult();
        }

        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
        var browser = new Browser();
        var cpu = new CPU();
        var device = new Device();
        var engine = new Engine();
        var os = new OS();

        this.getBrowser = function () {
            mapper.rgx.call(browser, ua, rgxmap.browser);
            browser.major = util.major(browser.version); // deprecated
            return browser;
        };
        this.getCPU = function () {
            mapper.rgx.call(cpu, ua, rgxmap.cpu);
            return cpu;
        };
        this.getDevice = function () {
            mapper.rgx.call(device, ua, rgxmap.device);
            return device;
        };
        this.getEngine = function () {
            mapper.rgx.call(engine, ua, rgxmap.engine);
            return engine;
        };
        this.getOS = function () {
            mapper.rgx.call(os, ua, rgxmap.os);
            return os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return ua;
        };
        this.setUA = function (uastring) {
            ua = uastring;
            browser = new Browser();
            cpu = new CPU();
            device = new Device();
            engine = new Engine();
            os = new OS();
            return this;
        };
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = {
        NAME    : NAME,
        MAJOR   : MAJOR, // deprecated
        VERSION : VERSION
    };
    UAParser.CPU = {
        ARCHITECTURE : ARCHITECTURE
    };
    UAParser.DEVICE = {
        MODEL   : MODEL,
        VENDOR  : VENDOR,
        TYPE    : TYPE,
        CONSOLE : CONSOLE,
        MOBILE  : MOBILE,
        SMARTTV : SMARTTV,
        TABLET  : TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED
    };
    UAParser.ENGINE = {
        NAME    : NAME,
        VERSION : VERSION
    };
    UAParser.OS = {
        NAME    : NAME,
        VERSION : VERSION
    };
    //UAParser.Utils = util;

    ///////////
    // Export
    //////////


    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if ("function" === FUNC_TYPE && __webpack_require__(243)) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return UAParser;
            }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else if (window) {
            // browser env
            window.UAParser = UAParser;
        }
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = window && (window.jQuery || window.Zepto);
    if (typeof $ !== UNDEF_TYPE) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (uastring) {
            parser.setUA(uastring);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : this);


/***/ }),
/* 243 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57);
__webpack_require__(16);
__webpack_require__(3);
module.exports = __webpack_require__(8);


/***/ })
/******/ ]);
});