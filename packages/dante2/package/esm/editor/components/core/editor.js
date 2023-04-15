import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { Map } from 'immutable';
import { isEmpty } from 'lodash';
import { EditorState, convertFromRaw, SelectionState, convertToRaw, Modifier, RichUtils, Entity, getDefaultKeyBinding, DefaultDraftBlockRenderMap, Editor } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { getCurrentBlock, addNewBlock, addNewBlockAt, resetBlockWithType, updateDataOfBlock } from '../../model/index.js';
import Debug from './debug.js';
import SaveBehavior from '../../utils/save_content.js';
import customHTML2Content from '../../utils/html2content.js';
import createStyles from 'draft-js-custom-styles';
import 'axios';

var DanteEditor = /*#__PURE__*/function (_React$Component) {
  _inherits(DanteEditor, _React$Component);
  var _super = _createSuper(DanteEditor);
  function DanteEditor(props) {
    var _this;
    _classCallCheck(this, DanteEditor);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "initializeState", function () {
      var newEditorState = EditorState.createEmpty(_this.decorator);
      if (_this.props.content) {
        newEditorState = EditorState.set(_this.decodeEditorContent(_this.props.content), {
          decorator: _this.decorator
        });
      }
      _this.onChange(newEditorState);
    });
    _defineProperty(_assertThisInitialized(_this), "updateState", function () {
      console.log(_this.state);
      var newContentState = convertFromRaw(_this.props.content);
      var newEditorState = EditorState.push(_this.state.editorState, newContentState, "insert-characters");
      newEditorState = EditorState.moveSelectionToEnd(newEditorState);
      _this.setState({
        editorState: newEditorState
      });
    });
    _defineProperty(_assertThisInitialized(_this), "decodeEditorContent", function (raw_as_json) {
      var new_content = convertFromRaw(raw_as_json);
      return EditorState.createWithContent(new_content, _this.decorator);
    });
    _defineProperty(_assertThisInitialized(_this), "refreshSelection", function (newEditorState) {
      var editorState = _this.state.editorState;
      // Setting cursor position after inserting to content
      var s = editorState.getSelection();
      var focusOffset = s.getFocusOffset();
      var anchorKey = s.getAnchorKey();
      var selectionState = SelectionState.createEmpty(s.getAnchorKey());

      // console.log anchorKey, focusOffset
      selectionState = selectionState.merge({
        anchorOffset: focusOffset,
        focusKey: anchorKey,
        focusOffset: focusOffset
      });
      var newState = EditorState.forceSelection(newEditorState, selectionState);
      return _this.onChange(newState);
    });
    _defineProperty(_assertThisInitialized(_this), "forceRender", function (editorState) {
      var content = editorState.getCurrentContent();
      var newEditorState = EditorState.createWithContent(content, _this.decorator);
      return _this.refreshSelection(newEditorState);
    });
    _defineProperty(_assertThisInitialized(_this), "onChange", function (editorState) {
      //editorState = this.handleUndeletables(editorState)

      _this.setPreContent();
      _this.setState({
        editorState: editorState
      }, function () {
        if (!editorState.getSelection().isCollapsed()) {
          var currentBlock = getCurrentBlock(_this.state.editorState);
          var blockType = currentBlock.getType();
          var tooltip = _this.tooltipsWithProp("displayOnSelection")[0];
          if (!tooltip) return;
          if (!_this.tooltipHasSelectionElement(tooltip, blockType)) {
            return;
          }
          _this.handleTooltipDisplayOn("displayOnSelection");
        } else {
          _this.handleTooltipDisplayOn("displayOnSelection", false);
        }
        setTimeout(function () {
          return _this.relocateTooltips();
        });
        _this.dispatchChangesToSave();
        _this.props.onChange ? _this.props.onChange(_assertThisInitialized(_this)) : null;
        return;
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleUndeletables", function (editorState) {
      // undeletable behavior, will keep previous blockMap
      // if undeletables are deleted
      var undeletable_types = _this.props.widgets.filter(function (o) {
        return o.undeletable;
      }).map(function (o) {
        return o.type;
      });
      var blockMap = editorState.getCurrentContent().get("blockMap");
      var undeletablesMap = blockMap.filter(function (o) {
        return undeletable_types.indexOf(o.get("type")) > 0;
      });
      if (undeletable_types.length > 0 && undeletablesMap.size === 0) {
        var contentState = editorState.getCurrentContent();
        var newContentState = contentState.merge({
          blockMap: _this.state.editorState.getCurrentContent().blockMap,
          selectionBefore: contentState.getSelectionAfter()
        });
        return editorState = EditorState.push(editorState, newContentState, "change-block");
      }
      return editorState;
    });
    _defineProperty(_assertThisInitialized(_this), "dispatchChangesToSave", function () {
      clearTimeout(_this.saveTimeout);
      return _this.saveTimeout = setTimeout(function () {
        return _this.save.store(_this.emitSerializedOutput());
      }, 100);
    });
    _defineProperty(_assertThisInitialized(_this), "setPreContent", function () {
      var content = _this.emitSerializedOutput();
      return _this.save.editorContent = content;
    });
    _defineProperty(_assertThisInitialized(_this), "getEditorState", function () {
      return _this.state.editorState;
    });
    _defineProperty(_assertThisInitialized(_this), "emitSerializedOutput", function () {
      var raw = convertToRaw(_this.state.editorState.getCurrentContent());
      return raw;
    });
    //# title utils
    _defineProperty(_assertThisInitialized(_this), "getTextFromEditor", function () {
      var c = _this.state.editorState.getCurrentContent();
      var out = c.getBlocksAsArray().map(function (o) {
        return o.getText();
      }).join("\n");
      return out;
    });
    _defineProperty(_assertThisInitialized(_this), "emitHTML2", function () {
      return convertToHTML({
        entityToHTML: function entityToHTML(entity, originalText) {
          if (entity.type === "LINK") {
            return "<a href=\"".concat(entity.data.url, "\">").concat(originalText, "</a>");
          } else {
            return originalText;
          }
        }
      })(_this.state.editorState.getCurrentContent());
    });
    _defineProperty(_assertThisInitialized(_this), "getLocks", function () {
      return _this.state.locks;
    });
    _defineProperty(_assertThisInitialized(_this), "addLock", function () {
      var locks = _this.state.locks;
      return _this.setState({
        locks: locks += 1
      });
    });
    _defineProperty(_assertThisInitialized(_this), "removeLock", function () {
      var locks = _this.state.locks;
      return _this.setState({
        locks: locks -= 1
      });
    });
    _defineProperty(_assertThisInitialized(_this), "renderableBlocks", function () {
      return _this.props.widgets.filter(function (o) {
        return o.renderable;
      }).map(function (o) {
        return o.type;
      });
    });
    _defineProperty(_assertThisInitialized(_this), "defaultWrappers", function (blockType) {
      return _this.props.default_wrappers.filter(function (o) {
        return o.block === blockType;
      }).map(function (o) {
        return o.className;
      });
    });
    _defineProperty(_assertThisInitialized(_this), "blockRenderer", function (block) {
      /*switch (block.getType()) {
        case "atomic":
          const entity = block.getEntityAt(0)
          const entity_type = Entity.get(entity).getType()
          break
      }*/

      if (_this.renderableBlocks().includes(block.getType())) {
        return _this.handleBlockRenderer(block);
      }
      return null;
    });
    _defineProperty(_assertThisInitialized(_this), "handleBlockRenderer", function (block) {
      var dataBlock = _this.getDataBlock(block);
      if (!dataBlock) {
        return null;
      }
      var read_only = _this.props.read_only ? false : null;
      var editable = read_only !== null ? read_only : dataBlock.editable;
      return {
        component: dataBlock.block,
        editable: editable,
        props: {
          data: block.getData(),
          getEditorState: _this.getEditorState,
          setEditorState: _this.onChange,
          addLock: _this.addLock,
          toggleEditable: _this.toggleEditable,
          disableEditable: _this.disableEditable,
          enableEditable: _this.enableEditable,
          removeLock: _this.removeLock,
          getLocks: _this.getLocks,
          getEditor: function getEditor() {
            return _assertThisInitialized(_this);
          },
          config: dataBlock.options
        }
      };
    });
    _defineProperty(_assertThisInitialized(_this), "blockStyleFn", function (block) {
      //console.log("blockStyle!")
      var currentBlock = getCurrentBlock(_this.state.editorState);
      if (!currentBlock) return;
      var is_selected = currentBlock.getKey() === block.getKey() ? "is-selected" : "";
      if (_this.renderableBlocks().includes(block.getType())) {
        return _this.styleForBlock(block, currentBlock, is_selected);
      }
      var defaultBlockClass = _this.defaultWrappers(block.getType());
      if (defaultBlockClass.length > 0) {
        return "graf ".concat(defaultBlockClass[0], " ").concat(is_selected);
      } else {
        return "graf ".concat(is_selected);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getDataBlock", function (block) {
      return _this.props.widgets.find(function (o) {
        return o.type === block.getType();
      });
    });
    _defineProperty(_assertThisInitialized(_this), "styleForBlock", function (block, currentBlock, is_selected) {
      var dataBlock = _this.getDataBlock(block);
      if (!dataBlock) {
        return null;
      }
      var selectedFn = dataBlock.selectedFn ? dataBlock.selectedFn(block) : "";
      var selected_class = dataBlock.selected_class ? dataBlock.selected_class : "";
      var selected_class_out = is_selected ? selected_class : "";
      return "".concat(dataBlock.wrapper_class, " ").concat(selected_class_out, " ").concat(selectedFn);
    });
    _defineProperty(_assertThisInitialized(_this), "handleTooltipDisplayOn", function (prop, display) {
      // for button click on after inline style set,
      // avoids inline popver to reappear on previous selection
      if (_this.props.read_only) {
        return;
      }
      if (display == null) {
        display = true;
      }
      return setTimeout(function () {
        var items = _this.tooltipsWithProp(prop);
        //console.log(items)
        return items.map(function (o) {
          if (!_assertThisInitialized(_this) || !_this.refs || !_this.refs[o.ref]) return;
          _this.refs[o.ref].display(display);
          return _this.refs[o.ref].relocate();
        });
      }, 20);
    });
    _defineProperty(_assertThisInitialized(_this), "handlePasteText", function (text, html) {
      // https://github.com/facebook/draft-js/issues/685
      /*
      html = "<p>chao</p>
      <avv>aaa</avv>
      <p>oli</p>
      <img src='x'/>"
      */

      // if not html then fallback to default handler

      if (!html) {
        return _this.handleTXTPaste(text, html);
      }
      if (html) {
        return _this.handleHTMLPaste(text, html);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleTXTPaste", function (text, html) {
      var currentBlock = getCurrentBlock(_this.state.editorState);
      var editorState = _this.state.editorState;
      switch (currentBlock.getType()) {
        case "image":
        case "file":
        case "video":
        case "placeholder":
          var newContent = Modifier.replaceText(editorState.getCurrentContent(), new SelectionState({
            anchorKey: currentBlock.getKey(),
            anchorOffset: 0,
            focusKey: currentBlock.getKey(),
            focusOffset: 2
          }), text);
          editorState = EditorState.push(editorState, newContent, "replace-text");
          _this.onChange(editorState);
          return true;
        default:
          return false;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleHTMLPaste", function (text, html) {
      var currentBlock = getCurrentBlock(_this.state.editorState);
      var editorState = _this.state.editorState;

      // TODO: make this configurable
      switch (currentBlock.getType()) {
        case "image":
        case "file":
        case "video":
        case "placeholder":
          return _this.handleTXTPaste(text, html);
      }
      var newContentState = customHTML2Content(html, _this.extendedBlockRenderMap);
      var pastedBlocks = newContentState.getBlockMap();
      var newState = Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), pastedBlocks);
      var pushedContentState = EditorState.push(editorState, newState, "insert-fragment");
      _this.onChange(pushedContentState);
      return true;
    });
    _defineProperty(_assertThisInitialized(_this), "handlePasteImage", function (files) {
      //TODO: check file types
      return files.map(function (file) {
        var opts = {
          url: URL.createObjectURL(file),
          file: file
        };
        return _this.onChange(addNewBlock(_this.state.editorState, "image", opts));
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleDroppedFiles", function (state, files) {
      return files.map(function (file) {
        var opts = {
          url: URL.createObjectURL(file),
          file: file
        };
        return _this.onChange(addNewBlock(_this.state.editorState, "image", opts));
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleDrop", function (selection, dataTransfer, isInternal) {
      var editorState = _this.getEditorState();
      var raw = dataTransfer.data.getData("text");
      var data = JSON.parse(raw);
      _this.onChange(addNewBlock(editorState, data.type, data.data));
      return "handled";
    });
    _defineProperty(_assertThisInitialized(_this), "handleReturn", function (e) {
      if (_this.props.handleReturn) {
        if (_this.props.handleReturn(e)) {
          return true;
        }
      }
      var editorState = _this.state.editorState;
      if (e.shiftKey) {
        _this.setState({
          editorState: RichUtils.insertSoftNewline(editorState)
        });
        return true;
      }
      if (!e.altKey && !e.metaKey && !e.ctrlKey) {
        var currentBlock = getCurrentBlock(editorState);
        var blockType = currentBlock.getType();
        var selection = editorState.getSelection();
        var config_block = _this.getDataBlock(currentBlock);
        if (currentBlock.getText().length === 0) {
          if (config_block && config_block.handleEnterWithoutText) {
            config_block.handleEnterWithoutText(_assertThisInitialized(_this), currentBlock);
            _this.closePopOvers();
            return true;
          }
          if (_this.props.continuousBlocks.indexOf(blockType) < 0) {
            _this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
            return true;
          }

          //TODO turn this in configurable
          switch (blockType) {
            case "header-one":
              _this.onChange(resetBlockWithType(editorState, "unstyled"));
              return true;
            default:
              return false;
          }
        }
        if (currentBlock.getText().length > 0) {
          if (config_block && config_block.handleEnterWithText) {
            config_block.handleEnterWithText(_assertThisInitialized(_this), currentBlock);
            _this.closePopOvers();
            return true;
          }
          if (currentBlock.getLength() === selection.getStartOffset()) {
            if (_this.props.continuousBlocks.indexOf(blockType) < 0) {
              _this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
              return true;
            }
          }
          return false;
        }

        // selection.isCollapsed() and # should we check collapsed here?
        if (currentBlock.getLength() === selection.getStartOffset()) {
          //or (config_block && config_block.breakOnContinuous))
          // it will match the unstyled for custom blocks
          if (_this.props.continuousBlocks.indexOf(blockType) < 0) {
            _this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
            return true;
          }
          return false;
        }
        return false;
      }
    });
    //return false
    // TODO: make this configurable
    _defineProperty(_assertThisInitialized(_this), "handleBeforeInput", function (chars) {
      var currentBlock = getCurrentBlock(_this.state.editorState);
      if (!currentBlock) return;
      var blockType = currentBlock.getType();
      var selection = _this.state.editorState.getSelection();
      var editorState = _this.state.editorState;

      // close popovers
      if (currentBlock.getText().length !== 0) {
        //@closeInlineButton()
        _this.closePopOvers();
      }

      // handle space on link
      var endOffset = selection.getEndOffset();
      var endKey = currentBlock.getEntityAt(endOffset - 1);
      var endEntityType = endKey && Entity.get(endKey).getType();
      var afterEndKey = currentBlock.getEntityAt(endOffset);
      var afterEndEntityType = afterEndKey && Entity.get(afterEndKey).getType();

      // will insert blank space when link found
      if (chars === " " && endEntityType === "LINK" && afterEndEntityType !== "LINK") {
        var newContentState = Modifier.insertText(editorState.getCurrentContent(), selection, " ");
        var newEditorState = EditorState.push(editorState, newContentState, "insert-characters");
        _this.onChange(newEditorState);
        return true;
      }

      // block transform
      if (blockType.indexOf("atomic") === 0) {
        return false;
      }
      var blockLength = currentBlock.getLength();
      if (selection.getAnchorOffset() > 1 || blockLength > 1) {
        return false;
      }
      var blockTo = _this.props.character_convert_mapping[currentBlock.getText() + chars];
      if (!blockTo) {
        return false;
      }
      console.log("BLOCK TO SHOW: ".concat(blockTo));
      _this.onChange(resetBlockWithType(editorState, blockTo));
      return true;
    });
    // TODO: make this configurable
    _defineProperty(_assertThisInitialized(_this), "handleKeyCommand", function (command) {
      var editorState = _this.state.editorState;
      var newBlockType;
      if (_this.props.handleKeyCommand && _this.props.handleKeyCommand(command)) {
        return true;
      }
      if (command === "add-new-block") {
        _this.onChange(addNewBlock(editorState, "blockquote"));
        return true;
      }
      if (command.indexOf("toggle_inline:") === 0) {
        newBlockType = command.split(":")[1];
        _this.onChange(RichUtils.toggleInlineStyle(editorState, newBlockType));
        return true;
      }
      if (command.indexOf("toggle_block:") === 0) {
        newBlockType = command.split(":")[1];
        _this.onChange(RichUtils.toggleBlockType(editorState, newBlockType));
        return true;
      }

      // catch delete, get block, check if has handle delete, then execute it
      /*if (command.indexOf('delete') === 0) {
        const currentBlock = getCurrentBlock(this.state.editorState)
        let config_block = this.getDataBlock(currentBlock)
        if (config_block && config_block.options.delete_block_callback) {
          config_block.options.delete_block_callback(this, currentBlock)
        }
        return false
      }*/

      var newState = RichUtils.handleKeyCommand(_this.state.editorState, command);
      if (newState) {
        _this.onChange(newState);
        return true;
      }
      return false;
    });
    _defineProperty(_assertThisInitialized(_this), "findCommandKey", function (opt, command) {
      // console.log "COMMAND find: #{opt} #{command}"
      return _this.props.key_commands[opt].find(function (o) {
        return o.key === command;
      });
    });
    _defineProperty(_assertThisInitialized(_this), "KeyBindingFn", function (e) {
      //⌘ + B / Ctrl + B   Bold
      //⌘ + I / Ctrl + I   Italic
      //⌘ + K / Ctrl + K   Turn into link
      //⌘ + Alt + 1 / Ctrl + Alt + 1   Header
      //⌘ + Alt + 2 / Ctrl + Alt + 2   Sub-Header
      //⌘ + Alt + 5 / Ctrl + Alt + 5   Quote (Press once for a block quote, again for a pull quote and a third time to turn off quote)

      var cmd;
      if (e.altKey) {
        if (e.shiftKey) {
          cmd = _this.findCommandKey("alt-shift", e.which);
          if (cmd) {
            return cmd.cmd;
          }
          return getDefaultKeyBinding(e);
        }
        if (e.ctrlKey || e.metaKey) {
          cmd = _this.findCommandKey("alt-cmd", e.which);
          if (cmd) {
            return cmd.cmd;
          }
          return getDefaultKeyBinding(e);
        }
      } else if (e.ctrlKey || e.metaKey) {
        cmd = _this.findCommandKey("cmd", e.which);
        if (cmd) {
          return cmd.cmd;
        }
        return getDefaultKeyBinding(e);
      } /*else if (e.keyCode === 8) {
           // TODO: handle backspace/delete if previous block not editable (like divider for example)
            return 'not-handled'
        }
        }*/

      return getDefaultKeyBinding(e);
    });
    // will update block state todo: movo to utils
    _defineProperty(_assertThisInitialized(_this), "updateBlockData", function (block, options) {
      var data = block.getData();
      var newData = data.merge(options);
      var newState = updateDataOfBlock(_this.state.editorState, block, newData);
      // this fixes enter from image caption
      return _this.forceRender(newState);
    });
    _defineProperty(_assertThisInitialized(_this), "setDirection", function (direction_type) {
      var contentState = _this.state.editorState.getCurrentContent();
      var selectionState = _this.state.editorState.getSelection();
      var block = contentState.getBlockForKey(selectionState.anchorKey);
      return _this.updateBlockData(block, {
        direction: direction_type
      });
    });
    //# read only utils
    _defineProperty(_assertThisInitialized(_this), "toggleEditable", function () {
      _this.closePopOvers();
      return _this.props.toggleEditable(function () {
        return _this.testEmitAndDecode;
      });
      //setState({ read_only: !this.props.read_only }, this.testEmitAndDecode)
    });
    _defineProperty(_assertThisInitialized(_this), "disableEditable", function () {
      console.log("in !!");
      _this.closePopOvers();
      return _this.setState({
        read_only: true
      }, _this.testEmitAndDecode);
    });
    _defineProperty(_assertThisInitialized(_this), "enableEditable", function () {
      _this.closePopOvers();
      console.log("out !!");
      return _this.setState({
        read_only: false
      }, _this.testEmitAndDecode);
    });
    _defineProperty(_assertThisInitialized(_this), "closePopOvers", function () {
      return _this.props.tooltips.map(function (o) {
        return _this.refs[o.ref].hide();
      });
    });
    _defineProperty(_assertThisInitialized(_this), "relocateTooltips", function () {
      if (_this.props.read_only) return;
      if (isEmpty(_this.refs)) return;
      if (!getCurrentBlock(_this.state.editorState)) return;
      return _this.props.tooltips.map(function (o) {
        return _this.refs[o.ref].relocate();
      });
    });
    _defineProperty(_assertThisInitialized(_this), "tooltipsWithProp", function (prop) {
      return _this.props.tooltips.filter(function (o) {
        return o[prop];
      });
    });
    _defineProperty(_assertThisInitialized(_this), "tooltipHasSelectionElement", function (tooltip, element) {
      return tooltip.selectionElements.includes(element);
    });
    //################################
    // TODO: this methods belongs to popovers/link
    //################################
    _defineProperty(_assertThisInitialized(_this), "handleShowPopLinkOver", function (e) {
      return _this.showPopLinkOver();
    });
    _defineProperty(_assertThisInitialized(_this), "handleHidePopLinkOver", function (e) {
      return _this.hidePopLinkOver();
    });
    _defineProperty(_assertThisInitialized(_this), "showPopLinkOver", function (el) {
      // handles popover display
      // using anchor or from popover
      if (!_this.refs.anchor_popover) return;

      // set url first in order to calculate popover width
      var coords;
      _this.refs.anchor_popover.setState({
        url: el ? el.href : _this.refs.anchor_popover.state.url
      });
      if (el) {
        coords = _this.refs.anchor_popover.relocate(el);
      }
      if (coords) {
        _this.refs.anchor_popover.setPosition(coords);
      }
      _this.refs.anchor_popover.setState({
        show: true
      });
      _this.isHover = true;
      return _this.cancelHide();
    });
    _defineProperty(_assertThisInitialized(_this), "hidePopLinkOver", function () {
      if (!_this.refs.anchor_popover) return;
      return _this.hideTimeout = setTimeout(function () {
        return _this.refs.anchor_popover.hide();
      }, 300);
    });
    _defineProperty(_assertThisInitialized(_this), "cancelHide", function () {
      // console.log "Cancel Hide"
      return clearTimeout(_this.hideTimeout);
    });
    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      _this.focus = false;
    });
    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      _this.focus = true;
    });
    _defineProperty(_assertThisInitialized(_this), "renderTooltips", function (o, i) {
      return /*#__PURE__*/React.createElement(o.component, {
        ref: o.ref,
        key: i,
        editor: _assertThisInitialized(_this),
        editorState: _this.state.editorState,
        onChange: _this.onChange,
        styles: _this.styles,
        configTooltip: o,
        widget_options: o.widget_options,
        showPopLinkOver: _this.showPopLinkOver,
        hidePopLinkOver: _this.hidePopLinkOver,
        handleOnMouseOver: _this.handleShowPopLinkOver,
        handleOnMouseOut: _this.handleHidePopLinkOver
      });
    });
    _this.render = _this.render.bind(_assertThisInitialized(_this));
    _this.decorator = _this.props.decorators(_assertThisInitialized(_this));
    _this.blockRenderMap = Map({
      image: {
        element: "figure"
      },
      video: {
        element: "figure"
      },
      embed: {
        element: "div"
      },
      unstyled: {
        wrapper: null,
        element: "div",
        aliasedElements: ["p"]
      },
      paragraph: {
        wrapper: null,
        element: "div",
        aliasedElements: ["p"]
      },
      placeholder: {
        wrapper: null,
        element: "div"
      },
      "code-block": {
        element: "pre",
        wrapper: null
      }
    });
    _this.extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(_this.blockRenderMap);
    _this.state = {
      editorState: EditorState.createEmpty(),
      blockRenderMap: _this.extendedBlockRenderMap,
      locks: 0
    };

    //this.widgets = this.props.widgets
    //this.tooltips = this.props.tooltips
    //this.key_commands = this.props.key_commands
    //this.continuousBlocks = this.props.continuousBlocks
    //this.default_wrappers = this.props.default_wrappers
    //this.character_convert_mapping = this.props.character_convert_mapping
    _this.block_types = _this.props.block_types;
    var _createStyles = createStyles(["font-size", "color", "font-family"]),
      styles = _createStyles.styles,
      customStyleFn = _createStyles.customStyleFn,
      exporter = _createStyles.exporter; //, 'PREFIX', customStyleMap);
    _this.styles = styles;
    _this.customStyleFn = customStyleFn;
    _this.styleExporter = exporter;
    _this.save = new SaveBehavior({
      getLocks: _this.getLocks,
      config: {
        xhr: _this.props.xhr,
        data_storage: _this.props.data_storage
      },
      editor: _assertThisInitialized(_this),
      editorState: _this.getEditorState,
      editorContent: _this.emitSerializedOutput()
    });
    _this.focus = false;
    return _this;
  }
  _createClass(DanteEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.initializeState();
      window.addEventListener("resize", function () {
        if (_this2.relocateTooltips) setTimeout(function () {
          return _this2.relocateTooltips();
        });
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.content && prevProps.content != this.props.content) this.updateState();
    }
  }, {
    key: "render",
    value:
    //##############################

    function render() {
      var _this3 = this;
      return /*#__PURE__*/React.createElement("div", {
        suppressContentEditableWarning: true
      }, /*#__PURE__*/React.createElement("div", {
        className: "postContent"
      }, this.props.tooltips.filter(function (o) {
        return o.placement === "up";
      }).map(function (o, i) {
        return _this3.renderTooltips(o, i);
      }), /*#__PURE__*/React.createElement("div", {
        className: "section-inner layoutSingleColumn"
        //onClick={ this.focus }
      }, /*#__PURE__*/React.createElement(Editor, {
        blockRendererFn: this.blockRenderer,
        editorState: this.state.editorState,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        onChange: this.onChange,
        focus: this.focus
        //handleDrop={this.handleDrop}
        ,
        handleReturn: this.handleReturn,
        blockRenderMap: this.state.blockRenderMap,
        blockStyleFn: this.blockStyleFn,
        customStyleFn: this.customStyleFn,
        handlePastedText: this.handlePasteText,
        handlePastedFiles: this.handlePasteImage,
        handleDroppedFiles: this.handleDroppedFiles,
        handleKeyCommand: this.handleKeyCommand,
        keyBindingFn: this.KeyBindingFn,
        handleBeforeInput: this.handleBeforeInput,
        readOnly: this.props.read_only,
        placeholder: this.props.body_placeholder,
        ref: "editor"
      })), /*#__PURE__*/React.createElement("div", {
        className: "danteEditorControls"
      }, this.props.tooltips.filter(function (o) {
        return o.placement !== "up";
      }).map(function (o, i) {
        return _this3.renderTooltips(o, i);
      }))), this.props.debug ? /*#__PURE__*/React.createElement(Debug, {
        locks: this.state.locks,
        editor: this
      }) : undefined);
    }
  }]);
  return DanteEditor;
}(React.Component);

export { DanteEditor as default };
