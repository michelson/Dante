(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.cjsx", function(exports, require, module) {
var BlockMapBuilder, CompositeDecorator, ContentState, Dante, DanteAnchorPopover, DanteEditor, DanteImagePopover, DanteInlineTooltip, DanteTooltip, DefaultDraftBlockRenderMap, DraftPasteProcessor, Editor, EditorState, EmbedBlock, Entity, ImageBlock, Immutable, KeyBindingUtil, KeyCodes, Link, Map, Modifier, PlaceholderBlock, PocData, React, ReactDOM, RichUtils, SaveBehavior, SelectionState, VideoBlock, addNewBlock, addNewBlockAt, convertFromHTML, convertFromRaw, convertToHTML, convertToRaw, createEditorState, customHTML2Content, findEntities, getCurrentBlock, getDefaultKeyBinding, getSafeBodyFromHTML, getSelection, getSelectionOffsetKeyForNode, getSelectionRect, getVisibleSelectionRect, isSoftNewlineEvent, ref, ref1, ref2, ref3, resetBlockWithType, stateToHTML, toHTML, updateDataOfBlock,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

Immutable = require('immutable');

Map = require('immutable').Map;

ref = require('draft-js'), convertToRaw = ref.convertToRaw, convertFromRaw = ref.convertFromRaw, CompositeDecorator = ref.CompositeDecorator, getVisibleSelectionRect = ref.getVisibleSelectionRect, getDefaultKeyBinding = ref.getDefaultKeyBinding, getSelectionOffsetKeyForNode = ref.getSelectionOffsetKeyForNode, KeyBindingUtil = ref.KeyBindingUtil, ContentState = ref.ContentState, Editor = ref.Editor, EditorState = ref.EditorState, Entity = ref.Entity, RichUtils = ref.RichUtils, DefaultDraftBlockRenderMap = ref.DefaultDraftBlockRenderMap, SelectionState = ref.SelectionState, Modifier = ref.Modifier, BlockMapBuilder = ref.BlockMapBuilder, getSafeBodyFromHTML = ref.getSafeBodyFromHTML;

DraftPasteProcessor = require('draft-js/lib/DraftPasteProcessor');

stateToHTML = require('draft-js-export-html').stateToHTML;

ref1 = require('draft-convert'), convertToHTML = ref1.convertToHTML, convertFromHTML = ref1.convertFromHTML;

toHTML = require("../utils/convert_html.js.es6");

isSoftNewlineEvent = require('draft-js/lib/isSoftNewlineEvent');

ref2 = require('../model/index.js.es6'), addNewBlock = ref2.addNewBlock, resetBlockWithType = ref2.resetBlockWithType, updateDataOfBlock = ref2.updateDataOfBlock, getCurrentBlock = ref2.getCurrentBlock, addNewBlockAt = ref2.addNewBlockAt;

createEditorState = require('../model/content.js.es6');

updateDataOfBlock = require('../model/index.js.es6').updateDataOfBlock;

DanteImagePopover = require('./popovers/image');

DanteAnchorPopover = require('./popovers/link');

KeyCodes = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SPACEBAR: 32,
  LEFTARROW: 37,
  UPARROW: 38,
  RIGHTARROW: 39,
  DOWNARROW: 40
};

window.utils = require('../utils/utils.coffee');

ref3 = require("../utils/selection.js.es6"), getSelectionRect = ref3.getSelectionRect, getSelection = ref3.getSelection;

DanteInlineTooltip = require('./inlineTooltip.cjsx');

DanteTooltip = require('./toolTip.cjsx');

Link = require('./link.cjsx');

findEntities = require('../utils/find_entities.coffee');

ImageBlock = require('./blocks/image.cjsx');

EmbedBlock = require('./blocks/embed.cjsx');

VideoBlock = require('./blocks/video.cjsx');

PlaceholderBlock = require('./blocks/placeholder.cjsx');

SaveBehavior = require('../utils/save_content.coffee');

customHTML2Content = require('../utils/convert_html2.coffee');

PocData = require('../data/poc.js');

Dante = (function() {
  function Dante(options) {
    if (options == null) {
      options = {};
    }
    console.log("init editor!");
    this.options = options;
    this.options.el = options.el || 'app';
    this.options.read_only = options.read_only || false;
    this.options.spellcheck = options.spellcheck || false;
    this.options.title_placeholder = options.title_placeholder || "Title";
    this.options.body_placeholder = options.body_placeholder || "Write your story";
    this.options.widgets = ["uploader", "embed", "embed-extract"];
    this.options.store_url = options.store_url || null;
    this.options.store_method = options.store_method || "POST";
    this.options.store_success_handler = options.store_success_handler || null;
    this.options.store_failure_handler = options.store_failure_handler || null;
    this.options.store_interval = options.store_interval || 1500;
    this.options.before_xhr_handler = options.before_xhr_handler;
    this.options.success_xhr_handler = options.success_xhr_handler;
    this.options.upload_url = options.upload_url || 'uploads.json';
    this.options.upload_callback = this.options.image_upload_callabck;
    this.options.image_delete_callback = this.options.image_delete_callback;
    this.options.image_caption_placeholder = options.image_caption_placeholder;
    this.options.oembed_url = "http://api.embed.ly/1/oembed?url=";
    this.options.extract_url = "http://api.embed.ly/1/extract?url=";
    this.options.embed_placeholder = 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter';
    this.options.embed_caption_placeholder = "Type caption for embed (optional)";
    this.options.extract_placeholder = 'Paste a link to embed content from another site (e.g. Twitter) and press Enter';
  }

  Dante.prototype.getContent = function() {
    PocData;
    return "";
  };

  Dante.prototype.render = function() {
    return ReactDOM.render(React.createElement(DanteEditor, {
      "content": this.getContent(),
      "config": this.options
    }), document.getElementById(this.options.el));
  };

  return Dante;

})();

DanteEditor = (function(superClass) {
  extend(DanteEditor, superClass);

  function DanteEditor(props) {
    this.render = bind(this.render, this);
    this.handleDownArrow = bind(this.handleDownArrow, this);
    this.handleUpArrow = bind(this.handleUpArrow, this);
    this.handleDroppedFiles = bind(this.handleDroppedFiles, this);
    this.handlePasteImage = bind(this.handlePasteImage, this);
    this.handlePasteText = bind(this.handlePasteText, this);
    this.positionForTooltip = bind(this.positionForTooltip, this);
    this.hidePopLinkOver = bind(this.hidePopLinkOver, this);
    this.showPopLinkOver = bind(this.showPopLinkOver, this);
    this.handleHidePopLinkOver = bind(this.handleHidePopLinkOver, this);
    this.handleShowPopLinkOver = bind(this.handleShowPopLinkOver, this);
    this.setDirection = bind(this.setDirection, this);
    this.updateBlockData = bind(this.updateBlockData, this);
    this.relocateImageTooltipPosition = bind(this.relocateImageTooltipPosition, this);
    this.setCurrentInput = bind(this.setCurrentInput, this);
    this.relocateMenu = bind(this.relocateMenu, this);
    this.KeyBindingFn = bind(this.KeyBindingFn, this);
    this.closeInlineButton = bind(this.closeInlineButton, this);
    this.handleKeyCommand = bind(this.handleKeyCommand, this);
    this.disableMenu = bind(this.disableMenu, this);
    this._toggleBlockType = bind(this._toggleBlockType, this);
    this.stateHandler = bind(this.stateHandler, this);
    this.dispatchChanges = bind(this.dispatchChanges, this);
    this.getEditorState = bind(this.getEditorState, this);
    this.focus = bind(this.focus, this);
    this.handleClick = bind(this.handleClick, this);
    this.handleBeforeInput = bind(this.handleBeforeInput, this);
    this.handleReturn = bind(this.handleReturn, this);
    this.blockStyleFn = bind(this.blockStyleFn, this);
    this.blockRenderer = bind(this.blockRenderer, this);
    this.setCurrentComponent = bind(this.setCurrentComponent, this);
    this.testEmitAndDecode = bind(this.testEmitAndDecode, this);
    this.decodeEditorContent = bind(this.decodeEditorContent, this);
    this.emitSerializedOutput = bind(this.emitSerializedOutput, this);
    this.emitHTML = bind(this.emitHTML, this);
    this.setPreContent = bind(this.setPreContent, this);
    this.dispatchChangesToSave = bind(this.dispatchChangesToSave, this);
    this.onChange = bind(this.onChange, this);
    this.parseDirection = bind(this.parseDirection, this);
    this.forceRender = bind(this.forceRender, this);
    this.refreshSelection = bind(this.refreshSelection, this);
    this.initializeState = bind(this.initializeState, this);
    DanteEditor.__super__.constructor.call(this, props);
    window.main_editor = this;
    this.decorator = new CompositeDecorator([
      {
        strategy: findEntities.bind(null, 'link'),
        component: Link
      }
    ]);
    this.blockRenderMap = Map({
      "image": {
        element: 'figure'
      },
      "avv": {
        element: 'figure'
      },
      "video": {
        element: 'figure'
      },
      "embed": {
        element: 'div'
      },
      'unstyled': {
        wrapper: null,
        element: 'div'
      },
      'paragraph': {
        wrapper: null,
        element: 'div'
      },
      'placeholder': {
        wrapper: null,
        element: 'div'
      }
    });
    this.extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(this.blockRenderMap);
    this.state = {
      editorState: this.initializeState(),
      display_toolbar: false,
      showURLInput: false,
      blockRenderMap: this.extendedBlockRenderMap,
      current_input: "",
      inlineTooltip: {
        show: true,
        position: {}
      },
      current_component: "",
      display_tooltip: false,
      position: {
        top: 0,
        left: 0
      },
      display_image_popover: false,
      image_popover_position: {
        top: 0,
        left: 0
      },
      anchor_popover_url: "",
      display_anchor_popover: false,
      anchor_popover_position: {
        left: 0,
        top: 0
      },
      menu: {
        show: false,
        position: {}
      },
      embed_url: "",
      continuousBlocks: ["unstyled", "blockquote", "ordered-list", "unordered-list", "unordered-list-item", "ordered-list-item", "code-block"],
      tooltipables: ["unstyled", "blockquote", "ordered-list", "unordered-list", "unordered-list-item", "ordered-list-item", "code-block", 'header-one', 'header-two', 'header-three']
    };
    this.BLOCK_TYPES = [
      {
        label: 'h3',
        style: 'header-one'
      }, {
        label: 'h4',
        style: 'header-two'
      }, {
        label: 'blockquote',
        style: 'blockquote'
      }, {
        label: 'insertunorderedlist',
        style: 'unordered-list-item'
      }, {
        label: 'insertorderedlist',
        style: 'ordered-list-item'
      }, {
        label: 'code',
        style: 'code-block'
      }
    ];
    this.INLINE_STYLES = [
      {
        label: 'bold',
        style: 'BOLD'
      }, {
        label: 'italic',
        style: 'ITALIC'
      }
    ];
    this.save = new SaveBehavior({
      config: this.props.config,
      editorState: this.state.editorState,
      editorContent: this.emitSerializedOutput()
    });
    ({
      optionsForDecorator: function() {
        return this.state;
      }
    });
  }

  DanteEditor.prototype.initializeState = function() {
    if (this.props.content) {

      /*
      #TODO: support entities
      html = convertFromHTML(
        htmlToEntity: (nodeName, node) =>
          if nodeName is 'avv'
            return Entity.create(
              'LINK',
              'MUTABLE',
              {url: node.href}
            )
      )(@.props.content)
       */
      return this.decodeEditorContent(this.props.content);
    } else {
      return EditorState.createEmpty(this.decorator);
    }
  };

  DanteEditor.prototype.refreshSelection = function(newEditorState) {
    var anchorKey, c, editorState, focusOffset, newState, s, selectionState;
    editorState = this.state.editorState;
    s = this.state.editorState.getSelection();
    c = editorState.getCurrentContent();
    selectionState = SelectionState.createEmpty(s.getAnchorKey());
    focusOffset = s.getFocusOffset();
    anchorKey = s.getAnchorKey();
    console.log(anchorKey, focusOffset);
    selectionState = selectionState.merge({
      anchorOffset: focusOffset,
      focusKey: anchorKey,
      focusOffset: focusOffset
    });
    newState = EditorState.forceSelection(newEditorState, selectionState);
    return this.onChange(newState);
  };

  DanteEditor.prototype.forceRender = function(editorState) {
    var content, newEditorState, selection;
    selection = this.state.editorState.getSelection();
    content = editorState.getCurrentContent();
    newEditorState = EditorState.createWithContent(content, this.decorator);
    return this.refreshSelection(newEditorState);
  };

  DanteEditor.prototype.parseDirection = function(direction) {
    switch (direction) {
      case "left":
        return "graf--layoutOutsetLeft";
      case "center":
        return "";
      case "wide":
        return "sectionLayout--fullWidth";
      case "fill":
        return "graf--layoutFillWidth";
      default:
        return "";
    }
  };

  DanteEditor.prototype.onChange = function(editorState) {
    var blockType, currentBlock;
    this.setPreContent();
    this.setState({
      editorState: editorState
    });
    currentBlock = getCurrentBlock(this.state.editorState);
    blockType = currentBlock.getType();
    if (!editorState.getSelection().isCollapsed()) {
      if (this.state.tooltipables.indexOf(blockType) < 0) {
        return;
      }
      this.setState({
        menu: {
          show: true,
          position: this.state.menu.position
        },
        display_tooltip: false
      }, this.handleOnChange);
    } else {
      this.setState({
        menu: {
          show: false,
          position: this.state.menu.position
        }
      });
    }
    setTimeout((function(_this) {
      return function() {
        return _this.getPositionForCurrent();
      };
    })(this), 0);
    this.dispatchChangesToSave();
    return console.log("CHANGES!");
  };

  DanteEditor.prototype.dispatchChangesToSave = function() {
    clearTimeout(this.saveTimeout);
    return this.saveTimeout = setTimeout((function(_this) {
      return function() {
        return _this.save.store(_this.emitSerializedOutput());
      };
    })(this), 100);
  };

  DanteEditor.prototype.setPreContent = function() {
    var content;
    content = this.emitSerializedOutput();
    return this.save.editorContent = content;
  };

  DanteEditor.prototype.emitHTML = function(editorState) {
    var html, options;
    options = {
      blockRenderers: {
        ATOMIC: (function(_this) {
          return function(block) {
            var data;
            data = block.getData();
            if (data.foo === 'bar') {
              return '<div>' + escape(block.getText()) + '</div>';
            }
          };
        })(this),
        image: (function(_this) {
          return function(block) {
            debugger;
            return "<div>aca va tu foto oe</div>";
          };
        })(this)
      }
    };
    html = toHTML(this.state.editorState.getCurrentContent());
    console.log(html);
    return false;
  };

  DanteEditor.prototype.emitSerializedOutput = function() {
    var raw;
    raw = convertToRaw(this.state.editorState.getCurrentContent());
    return raw;
  };

  DanteEditor.prototype.decodeEditorContent = function(raw_as_json) {
    var editorState, new_content;
    new_content = convertFromRaw(raw_as_json);
    return editorState = EditorState.createWithContent(new_content, this.decorator);
  };

  DanteEditor.prototype.testEmitAndDecode = function() {
    var raw_as_json;
    raw_as_json = this.emitSerializedOutput();
    this.setState({
      editorState: this.decodeEditorContent(raw_as_json)
    });
    return false;
  };

  DanteEditor.prototype.emitHTML2 = function() {
    var html;
    return html = convertToHTML({
      entityToHTML: (function(_this) {
        return function(entity, originalText) {
          if (entity.type === 'LINK') {
            return "<a href=\"" + entity.data.url + "\">" + originalText + "</a>";
          } else {
            return originalText;
          }
        };
      })(this)
    })(this.state.editorState.getCurrentContent());
  };

  DanteEditor.prototype.setCurrentComponent = function(component) {
    return this.setState({
      current_component: component
    });
  };

  DanteEditor.prototype.blockRenderer = function(block) {
    var entity, entity_type;
    switch (block.getType()) {
      case "atomic":
        entity = block.getEntityAt(0);
        entity_type = Entity.get(entity).getType();
        break;
      case 'image':
        return {
          component: ImageBlock,
          editable: true,
          props: {
            data: {
              src: this.state.current_input !== "" ? URL.createObjectURL(this.state.current_input) : "",
              file: this.state.current_input
            },
            getEditorState: this.getEditorState,
            setEditorState: this.onChange,
            config: this.props.config
          }
        };
      case 'embed':
        return {
          component: EmbedBlock,
          editable: true,
          props: {
            data: this.state.current_input,
            getEditorState: this.getEditorState,
            setEditorState: this.onChange
          }
        };
      case 'video':
        return {
          component: VideoBlock,
          editable: true,
          props: {
            data: this.state.current_input,
            getEditorState: this.getEditorState,
            setEditorState: this.onChange
          }
        };
      case 'placeholder':
        return {
          component: PlaceholderBlock,
          props: {
            data: this.state.current_input
          }
        };
    }
    return null;
  };

  DanteEditor.prototype.blockStyleFn = function(block) {
    var currentBlock, direction_class, is_selected;
    currentBlock = getCurrentBlock(this.state.editorState);
    is_selected = currentBlock.getKey() === block.getKey() ? "is-selected" : "";
    console.log("BLOCK STYLE:", block.getType());
    switch (block.getType()) {
      case "image":
        direction_class = this.parseDirection(block.getData().toJS().direction);
        console.log("direction_class: ", direction_class);
        is_selected = currentBlock.getKey() === block.getKey() ? "is-selected is-mediaFocused" : "";
        return "graf graf--figure " + is_selected + " " + direction_class;
      case "video":
        is_selected = currentBlock.getKey() === block.getKey() ? "is-selected is-mediaFocused" : "";
        return "graf--figure graf--iframe " + is_selected;
      case "embed":
        is_selected = currentBlock.getKey() === block.getKey() ? "is-selected is-mediaFocused" : "";
        return "graf graf--mixtapeEmbed " + is_selected;
      case "placeholder":
        return "is-embedable " + is_selected;
      default:
        return "graf graf--p " + is_selected;
    }
  };


  /* from medium-draft
  By default, it handles return key for inserting soft breaks (BRs in HTML) and
  also instead of inserting a new empty block after current empty block, it first check
  whether the current block is of a type other than `unstyled`. If yes, current block is
  simply converted to an unstyled empty block. If RETURN is pressed on an unstyled block
  default behavior is executed.
   */

  DanteEditor.prototype.handleReturn = function(e) {
    var blockType, currentBlock, editorState, selection;
    if (this.props.handleReturn) {
      if (this.props.handleReturn()) {
        return true;
      }
    }
    editorState = this.state.editorState;
    if (!e.altKey && !e.metaKey && !e.ctrlKey) {
      currentBlock = getCurrentBlock(editorState);
      blockType = currentBlock.getType();
      if (blockType.indexOf('atomic') === 0) {
        this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
        return true;
      }
      if (currentBlock.getText().length === 0) {
        switch (blockType) {
          case "image":
          case "embed":
          case "video":
            this.setState({
              display_tooltip: false
            });
            this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
            return true;
          case "header-one":
            this.onChange(resetBlockWithType(editorState, "unstyled"));
            return true;
          default:
            return false;
        }
      }
      if (currentBlock.getText().length > 0) {
        switch (blockType) {
          case "video":
          case "image":
            this.setState({
              display_tooltip: false
            });
            this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
            return true;
          case "placeholder":
            this.setState({
              display_tooltip: false,
              current_input: {
                provisory_text: currentBlock.getText(),
                embed_url: this.state.current_input.embed_url
              }
            });
            this.onChange(resetBlockWithType(editorState, this.state.current_input.type));
            return true;
        }
      }
      selection = editorState.getSelection();
      if (selection.isCollapsed() && currentBlock.getLength() === selection.getStartOffset()) {
        if (this.state.continuousBlocks.indexOf(blockType) < 0) {
          this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
          return true;
        }
        return false;
      }
      if (selection.isCollapsed() && currentBlock.getType() === "embed" && currentBlock.getLength() > 0) {
        if (this.state.continuousBlocks.indexOf(blockType) < 0) {
          this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  };

  DanteEditor.prototype.handleBeforeInput = function(chars) {
    var currentBlock;
    currentBlock = getCurrentBlock(this.state.editorState);
    if (currentBlock.getText().length !== 0) {
      this.closeInlineButton();
    }

    /*
    switch currentBlock.getType()
      when "placeholder"
        @setState
          current_input: 
            placeholder: "aa"
            embed_url:"http://api.embed.ly/1/oembed?key=86c28a410a104c8bb58848733c82f840&url="
            provisory_text:"http://twitter.com/michelson"
        
        @.onChange(resetBlockWithType(@state.editorState, "placeholder"));
        return false
     */
    return false;
  };

  DanteEditor.prototype.handleClick = function() {
    return console.log("oli!!!!");
  };

  DanteEditor.prototype.focus = function() {
    return document.getElementById('richEditor').focus();
  };

  DanteEditor.prototype.getEditorState = function() {
    return this.state.editorState;
  };

  DanteEditor.prototype.handleOnChange = function() {
    return this.relocateMenu();
  };

  DanteEditor.prototype.dispatchChanges = function(body) {
    return this.onChange(body);
  };

  DanteEditor.prototype.stateHandler = function(option) {
    return this.setState({
      editorState: option
    });
  };

  DanteEditor.prototype._toggleBlockType = function(blockType) {
    return this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, blockType));
  };

  DanteEditor.prototype.disableMenu = function() {
    return this.setState({
      display_toolbar: false
    });
  };

  DanteEditor.prototype.handleKeyCommand = function(command) {
    var newState;
    if (command === 'dante-save') {
      console.log("SAVING!!");
      return 'not-handled';
    }
    if (command === 'dante-keyup') {
      return 'not-handled';
    }
    if (command === 'dante-uparrow') {
      debugger;
      return 'not-handled';
    }
    newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  DanteEditor.prototype.closeInlineButton = function() {
    return this.setState({
      display_tooltip: false
    });
  };

  DanteEditor.prototype.KeyBindingFn = function(e) {
    if (e.keyCode === 83) {
      console.log("TODO: save in this point");
    }
    if (e.keyCode === KeyCodes.UPARROW) {
      console.log("UPARROW");
      return 'dante-uparrow';
    }
    return getDefaultKeyBinding(e);
  };

  DanteEditor.prototype.relocateMenu = function() {
    var blockType, currentBlock, el, left, nativeSelection, padd, parent, parentBoundary, selectionBoundary, toolbarBoundary, toolbarNode, top;
    currentBlock = getCurrentBlock(this.state.editorState);
    blockType = currentBlock.getType();
    if (this.state.tooltipables.indexOf(blockType) < 0) {
      this.disableMenu();
      return;
    }
    if (!this.state.menu.show) {
      return;
    }
    el = document.querySelector("#dante-menu");
    padd = el.offsetWidth / 2;
    nativeSelection = getSelection(window);
    if (!nativeSelection.rangeCount) {
      return;
    }
    selectionBoundary = getSelectionRect(nativeSelection);
    toolbarNode = ReactDOM.findDOMNode(this);
    toolbarBoundary = toolbarNode.getBoundingClientRect();
    parent = ReactDOM.findDOMNode(this);
    parentBoundary = parent.getBoundingClientRect();
    top = selectionBoundary.top - parentBoundary.top - -90 - 5;
    left = selectionBoundary.left + (selectionBoundary.width / 2) - padd;
    if (!top || !left) {
      return;
    }
    return this.setState({
      menu: {
        show: true,
        position: {
          left: left,
          top: top
        }
      }
    });
  };

  DanteEditor.prototype.getPositionForCurrent = function() {
    var block, blockType, contentState, coords, currentBlock, el, nativeSelection, node, padd, parent, parentBoundary, selectionBoundary, selectionState, toolbarBoundary, toolbarNode;
    if (this.state.editorState.getSelection().isCollapsed()) {
      currentBlock = getCurrentBlock(this.state.editorState);
      blockType = currentBlock.getType();
      contentState = this.state.editorState.getCurrentContent();
      selectionState = this.state.editorState.getSelection();
      block = contentState.getBlockForKey(selectionState.anchorKey);
      nativeSelection = getSelection(window);
      if (!nativeSelection.rangeCount) {
        return;
      }
      node = utils.getNode();
      selectionBoundary = getSelectionRect(nativeSelection);
      coords = selectionBoundary;
      if (blockType === "image") {
        selectionBoundary = node.anchorNode.parentNode.parentNode.parentNode.getBoundingClientRect();
        el = document.querySelector("#dante_image_popover");
        padd = el.offsetWidth / 2;
      }
      toolbarNode = ReactDOM.findDOMNode(this);
      toolbarBoundary = toolbarNode.getBoundingClientRect();
      parent = ReactDOM.findDOMNode(this);
      parentBoundary = parent.getBoundingClientRect();
      this.setState({
        display_tooltip: block.getText().length === 0 && blockType === "unstyled",
        position: {
          top: coords.top + window.scrollY,
          left: coords.left + window.scrollX - 60
        },
        display_image_popover: blockType === "image"
      });
      if (blockType === "image") {
        return this.setState({
          image_popover_position: {
            top: selectionBoundary.top - parentBoundary.top + 60,
            left: selectionBoundary.left + (selectionBoundary.width / 2) - padd
          }
        });
      }
    } else {
      return this.closeInlineButton();
    }
  };

  DanteEditor.prototype.setCurrentInput = function(data, cb) {
    return this.setState({
      current_input: data
    }, cb);
  };

  DanteEditor.prototype.relocateImageTooltipPosition = function(coords) {
    return this.setState({
      display_image_popover: true
    });
  };

  DanteEditor.prototype.updateBlockData = function(block, options) {
    var data, newData, newState;
    data = block.getData();
    newData = data.merge(options);
    newState = updateDataOfBlock(this.state.editorState, block, newData);
    return this.forceRender(newState);
  };

  DanteEditor.prototype.setDirection = function(direction_type) {
    var block, contentState, selectionState;
    contentState = this.state.editorState.getCurrentContent();
    selectionState = this.state.editorState.getSelection();
    block = contentState.getBlockForKey(selectionState.anchorKey);
    return this.updateBlockData(block, {
      direction: direction_type
    });
  };

  DanteEditor.prototype.handleShowPopLinkOver = function(e) {
    return this.showPopLinkOver();
  };

  DanteEditor.prototype.handleHidePopLinkOver = function(e) {
    return this.hidePopLinkOver();
  };

  DanteEditor.prototype.showPopLinkOver = function(el) {
    var coords;
    if (el) {
      coords = this.positionForTooltip(el);
    }
    this.isHover = true;
    this.cancelHide();
    return this.setState({
      anchor_popover_url: el ? el.href : this.state.anchor_popover_url,
      display_anchor_popover: true,
      anchor_popover_position: el ? coords : this.state.anchor_popover_position
    });
  };

  DanteEditor.prototype.hidePopLinkOver = function() {
    return this.hideTimeout = setTimeout((function(_this) {
      return function() {
        return _this.setState({
          display_anchor_popover: false
        });
      };
    })(this), 300);
  };

  DanteEditor.prototype.cancelHide = function() {
    console.log("Cancel Hide");
    return clearTimeout(this.hideTimeout);
  };

  DanteEditor.prototype.positionForTooltip = function(node) {
    var blockType, contentState, coords, currentBlock, el, padd, parent, parentBoundary, selectionBoundary, selectionState, toolbarBoundary, toolbarNode;
    currentBlock = getCurrentBlock(this.state.editorState);
    blockType = currentBlock.getType();
    contentState = this.state.editorState.getCurrentContent();
    selectionState = this.state.editorState.getSelection();
    selectionBoundary = node.getBoundingClientRect();
    coords = selectionBoundary;
    el = document.querySelector("#dante-popover");
    padd = el.offsetWidth / 2;
    toolbarNode = ReactDOM.findDOMNode(this);
    toolbarBoundary = toolbarNode.getBoundingClientRect();
    parent = ReactDOM.findDOMNode(this);
    parentBoundary = parent.getBoundingClientRect();
    return {
      top: selectionBoundary.top - parentBoundary.top + 160,
      left: selectionBoundary.left - selectionBoundary.width
    };
  };

  DanteEditor.prototype.handlePasteText = function(text, html) {

    /*
    html = "<p>chao</p>
    <avv>aaa</avv>
    <p>oli</p>
    <img src='x'/>"
     */
    var blocksAfter, blocksBefore, content, currentBlock, endKey, newBlockKey, newBlockMap, newContent, newContentState, pushedContentState, selection;
    if (!html) {
      return false;
    }
    newContentState = customHTML2Content(html, this.extendedBlockRenderMap);
    currentBlock = getCurrentBlock(this.state.editorState);
    selection = this.state.editorState.getSelection();
    endKey = selection.getEndKey();
    content = this.state.editorState.getCurrentContent();
    blocksBefore = content.blockMap.toSeq().takeUntil((function(_this) {
      return function(v) {
        return v.key === endKey;
      };
    })(this));
    blocksAfter = content.blockMap.toSeq().skipUntil((function(_this) {
      return function(v) {
        return v.key === endKey;
      };
    })(this)).rest();
    newBlockKey = newContentState.blockMap.first().getKey();
    newBlockMap = blocksBefore.concat(newContentState.blockMap, blocksAfter).toOrderedMap();
    newContent = content.merge({
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
    pushedContentState = EditorState.push(this.state.editorState, newContent, 'insert-fragment');
    this.onChange(pushedContentState);
    return true;
  };

  DanteEditor.prototype.handlePasteImage = function(files) {
    return files.map((function(_this) {
      return function(file) {
        return _this.setCurrentInput(file, function() {
          return _this.onChange(addNewBlock(_this.state.editorState, 'image'));
        });
      };
    })(this));
  };

  DanteEditor.prototype.handleDroppedFiles = function(state, files) {
    return files.map((function(_this) {
      return function(file) {
        return _this.setCurrentInput(file, function() {
          return _this.onChange(addNewBlock(_this.state.editorState, 'image'));
        });
      };
    })(this));
  };

  DanteEditor.prototype.handleUpArrow = function(e) {
    return setTimeout((function(_this) {
      return function() {
        return _this.forceRender(_this.state.editorState);
      };
    })(this), 10);
  };

  DanteEditor.prototype.handleDownArrow = function(e) {
    return setTimeout((function(_this) {
      return function() {
        return _this.forceRender(_this.state.editorState);
      };
    })(this), 10);
  };

  DanteEditor.prototype.render = function() {
    return React.createElement("div", {
      "id": "content",
      "suppressContentEditableWarning": true
    }, React.createElement("article", {
      "className": "postArticle"
    }, React.createElement("div", {
      "className": "postContent"
    }, React.createElement("div", {
      "className": "notesSource"
    }, React.createElement("div", {
      "id": "editor",
      "className": "postField postField--body"
    }, React.createElement("section", {
      "className": "section--first section--last"
    }, React.createElement("div", {
      "className": "section-divider layoutSingleColumn"
    }, React.createElement("hr", {
      "className": "section-divider"
    })), React.createElement("div", {
      "className": "section-content"
    }, React.createElement("div", {
      "id": "richEditor",
      "className": "section-inner layoutSingleColumn",
      "onClick": this.focus
    }, React.createElement(Editor, {
      "blockRendererFn": this.blockRenderer,
      "editorState": this.state.editorState,
      "onChange": this.onChange,
      "onUpArrow": this.handleUpArrow,
      "onDownArrow": this.handleDownArrow,
      "handleReturn": this.handleReturn,
      "blockRenderMap": this.state.blockRenderMap,
      "blockStyleFn": this.blockStyleFn,
      "handlePastedText": this.handlePasteText,
      "handlePastedFiles": this.handlePasteImage,
      "handleDroppedFiles": this.handleDroppedFiles,
      "handleKeyCommand": this.handleKeyCommand,
      "keyBindingFn": this.KeyBindingFn,
      "handleBeforeInput": this.handleBeforeInput,
      "readOnly": this.props.config.read_only,
      "onClick": this.handleClick,
      "suppressContentEditableWarning": true,
      "placeholder": this.props.config.body_placeholder,
      "ref": "editor"
    })))))))), React.createElement(DanteTooltip, {
      "editorState": this.state.editorState,
      "setStateHandler": this.stateHandler,
      "toggleBlockType": this._toggleBlockType,
      "block_types": this.BLOCK_TYPES,
      "inline_styles": this.INLINE_STYLES,
      "confirmLink": this._confirmLink,
      "options": this.state.menu,
      "disableMenu": this.disableMenu,
      "dispatchChanges": this.dispatchChanges,
      "handleKeyCommand": this.handleKeyCommand,
      "keyBindingFn": this.KeyBindingFn,
      "relocateMenu": this.relocateMenu,
      "showPopLinkOver": this.showPopLinkOver,
      "hidePopLinkOver": this.hidePopLinkOver
    }), React.createElement(DanteInlineTooltip, {
      "options": this.state.inlineTooltip,
      "editorState": this.state.editorState,
      "style": this.state.position,
      "onChange": this.onChange,
      "dispatchChanges": this.dispatchChanges,
      "setCurrentInput": this.setCurrentInput,
      "display_tooltip": this.state.display_tooltip,
      "closeInlineButton": this.closeInlineButton
    }), React.createElement(DanteImagePopover, {
      "display_image_popover": this.state.display_image_popover,
      "relocateImageTooltipPosition": this.relocateImageTooltipPosition,
      "position": this.state.image_popover_position,
      "setDirection": this.setDirection,
      "setCurrentComponent": this.setCurrentComponent
    }), React.createElement(DanteAnchorPopover, {
      "display_anchor_popover": this.state.display_anchor_popover,
      "url": this.state.anchor_popover_url,
      "position": this.state.anchor_popover_position,
      "handleOnMouseOver": this.handleShowPopLinkOver,
      "handleOnMouseOut": this.handleHidePopLinkOver
    }), React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
      "href": "#",
      "onClick": this.emitHTML
    }, "get content")), React.createElement("li", null, React.createElement("a", {
      "href": "#",
      "onClick": this.testEmitAndDecode
    }, "serialize and set content"))));
  };

  return DanteEditor;

})(React.Component);

module.exports = Dante;
});

;require.register("components/blocks/embed.cjsx", function(exports, require, module) {
var AtomicBlockUtils, EditorBlock, EmbedBlock, Entity, React, ReactDOM, RichUtils, ref, updateDataOfBlock, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

ref = require('draft-js'), Entity = ref.Entity, RichUtils = ref.RichUtils, AtomicBlockUtils = ref.AtomicBlockUtils, EditorBlock = ref.EditorBlock;

utils = require("../../utils/utils");

updateDataOfBlock = require('../../model/index.js.es6').updateDataOfBlock;

EmbedBlock = (function(superClass) {
  extend(EmbedBlock, superClass);

  function EmbedBlock(props) {
    this.componentDidMount = bind(this.componentDidMount, this);
    this.updateData = bind(this.updateData, this);
    var api_key;
    EmbedBlock.__super__.constructor.call(this, props);
    api_key = "86c28a410a104c8bb58848733c82f840";
    this.state = {
      embed_data: this.defaultData()
    };
  }

  EmbedBlock.prototype.defaultData = function() {
    var existing_data;
    existing_data = this.props.block.getData().toJS();
    return existing_data.embed_data || {};
  };

  EmbedBlock.prototype.updateData = function() {
    var block, blockProps, data, getEditorState, newData, setEditorState;
    blockProps = this.props.blockProps;
    block = this.props.block;
    getEditorState = this.props.blockProps.getEditorState;
    setEditorState = this.props.blockProps.setEditorState;
    data = block.getData();
    newData = data.merge(this.state);
    return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
  };

  EmbedBlock.prototype.componentDidMount = function() {
    if (!this.props.blockProps.data) {
      return;
    }
    return utils.ajax({
      url: "" + this.props.blockProps.data.embed_url + this.props.blockProps.data.provisory_text + "&scheme=https"
    }, (function(_this) {
      return function(data) {
        if (data.status === 200) {
          return _this.setState({
            embed_data: JSON.parse(data.responseText)
          }, _this.updateData);
        }
      };
    })(this));
  };

  EmbedBlock.prototype.classForImage = function() {
    if (this.state.embed_data.thumbnail_url) {
      return "";
    } else {
      return "mixtapeImage--empty u-ignoreBlock";
    }
  };

  EmbedBlock.prototype.render = function() {
    return React.createElement("span", null, React.createElement("a", {
      "target": '_blank',
      "className": "js-mixtapeImage mixtapeImage " + (this.classForImage()),
      "href": this.state.embed_data.url,
      "style": {
        backgroundImage: "url('" + this.state.embed_data.thumbnail_url + "')"
      }
    }), React.createElement("a", {
      "className": 'markup--anchor markup--mixtapeEmbed-anchor',
      "target": '_blank',
      "href": this.state.embed_data.url
    }, React.createElement("strong", {
      "className": 'markup--strong markup--mixtapeEmbed-strong'
    }, this.state.embed_data.title), React.createElement("em", {
      "className": 'markup--em markup--mixtapeEmbed-em'
    }, this.state.embed_data.description)), this.state.embed_data.provider_url);
  };

  return EmbedBlock;

})(React.Component);

module.exports = EmbedBlock;
});

;require.register("components/blocks/image.cjsx", function(exports, require, module) {
var AtomicBlockUtils, EditorBlock, Entity, ImageBlock, React, ReactDOM, RichUtils, axios, ref, updateDataOfBlock,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

ref = require('draft-js'), Entity = ref.Entity, RichUtils = ref.RichUtils, AtomicBlockUtils = ref.AtomicBlockUtils, EditorBlock = ref.EditorBlock;

axios = require("axios");

updateDataOfBlock = require('../../model/index.js.es6').updateDataOfBlock;

ImageBlock = (function(superClass) {
  extend(ImageBlock, superClass);

  function ImageBlock(props) {
    this.render = bind(this.render, this);
    this.updateProgressBar = bind(this.updateProgressBar, this);
    this.uploadCompleted = bind(this.uploadCompleted, this);
    this.uploadFile = bind(this.uploadFile, this);
    this.handleGrafFigureSelectImg = bind(this.handleGrafFigureSelectImg, this);
    this.aspectRatio = bind(this.aspectRatio, this);
    this.handleUpload = bind(this.handleUpload, this);
    this.replaceImg = bind(this.replaceImg, this);
    this.updateData = bind(this.updateData, this);
    this.defaultAspectRatio = bind(this.defaultAspectRatio, this);
    this.defaultUrl = bind(this.defaultUrl, this);
    this.blockPropsSrc = bind(this.blockPropsSrc, this);
    var existing_data;
    ImageBlock.__super__.constructor.call(this, props);
    existing_data = this.props.block.getData().toJS();
    this.config = this.props.blockProps.config;
    this.state = {
      selected: false,
      caption: this.defaultPlaceholder(),
      direction: existing_data.direction || "center",
      width: 0,
      height: 0,
      file: null,
      url: this.blockPropsSrc() || this.defaultUrl(existing_data),
      aspect_ratio: this.defaultAspectRatio(existing_data)
    };
  }

  ImageBlock.prototype.blockPropsSrc = function() {
    return this.props.blockProps.data.src;

    /*
    debugger
    block = @.props;
    entity = block.block.getEntityAt(0)
    if entity
      data = Entity.get(entity).getData().src
    else
      null
     */
  };

  ImageBlock.prototype.defaultUrl = function(data) {
    if (data.url) {
      if (data.file) {
        return URL.createObjectURL(data.file);
      } else {
        return data.url;
      }
    } else {
      return this.props.blockProps.data.src;
    }
  };

  ImageBlock.prototype.defaultPlaceholder = function() {
    return this.props.blockProps.config.image_caption_placeholder;
  };

  ImageBlock.prototype.defaultAspectRatio = function(data) {
    if (data.aspect_ratio) {
      return {
        width: data.aspect_ratio['width'],
        height: data.aspect_ratio['height'],
        ratio: data.aspect_ratio['ratio']
      };
    } else {
      return {
        width: 0,
        height: 0,
        ratio: 100
      };
    }
  };

  ImageBlock.prototype.getAspectRatio = function(w, h) {
    var fill_ratio, height, maxHeight, maxWidth, ratio, result, width;
    maxWidth = 1000;
    maxHeight = 1000;
    ratio = 0;
    width = w;
    height = h;
    if (width > maxWidth) {
      ratio = maxWidth / width;
      height = height * ratio;
      width = width * ratio;
    } else if (height > maxHeight) {
      ratio = maxHeight / height;
      width = width * ratio;
      height = height * ratio;
    }
    fill_ratio = height / width * 100;
    result = {
      width: width,
      height: height,
      ratio: fill_ratio
    };
    utils.log(result);
    return result;
  };

  ImageBlock.prototype.updateData = function() {
    var block, blockProps, data, getEditorState, newData, setEditorState;
    blockProps = this.props.blockProps;
    block = this.props.block;
    getEditorState = this.props.blockProps.getEditorState;
    setEditorState = this.props.blockProps.setEditorState;
    data = block.getData();
    newData = data.merge(this.state);
    return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
  };

  ImageBlock.prototype.replaceImg = function() {
    var self;
    this.img = new Image();
    this.img.src = this.refs.image_tag.src;
    this.setState({
      url: this.img.src
    });
    self = this;
    return this.img.onload = (function(_this) {
      return function() {
        console.log(_this.img);
        console.log(_this);
        console.log(self);
        console.log(_this);
        return _this.setState({
          width: _this.img.width,
          height: _this.img.height,
          aspect_ratio: self.getAspectRatio(_this.img.width, _this.img.height)
        }, _this.handleUpload);
      };
    })(this);
  };

  ImageBlock.prototype.handleUpload = function() {
    this.updateData();
    return this.uploadFile();
  };

  ImageBlock.prototype.componentDidMount = function() {
    return this.replaceImg();
  };

  ImageBlock.prototype.aspectRatio = function() {
    return {
      maxWidth: "" + this.state.aspect_ratio.width,
      maxHeight: "" + this.state.aspect_ratio.height,
      ratio: "" + this.state.aspect_ratio.height
    };
  };

  ImageBlock.prototype.handleGrafFigureSelectImg = function(e) {
    debugger;
    e.preventDefault();
    return this.setState({
      selected: true
    });
  };

  ImageBlock.prototype.coords = function() {
    return {
      maxWidth: this.state.aspect_ratio.width + "px",
      maxHeight: this.state.aspect_ratio.height + "px"
    };
  };

  ImageBlock.prototype.formatData = function() {
    var formData;
    formData = new FormData();
    formData.append('file', this.props.blockProps.data.file);
    return formData;
  };

  ImageBlock.prototype.uploadFile = function() {
    var handleUp;
    axios({
      method: 'post',
      url: this.config.upload_url,
      data: this.formatData(),
      onUploadProgress: (function(_this) {
        return function(e) {
          return _this.updateProgressBar(e);
        };
      })(this)
    }).then((function(_this) {
      return function(result) {
        _this.uploadCompleted(result.data);
        if (_this.config.upload_callback) {
          return _this.config.upload_callback(response, _this);
        }
      };
    })(this))["catch"]((function(_this) {
      return function(error) {
        console.log("ERROR: got error uploading file " + error);
        if (_this.config.upload_error_callback) {
          return _this.config.upload_error_callback(error, _this);
        }
      };
    })(this));
    return handleUp = (function(_this) {
      return function(json_response) {
        return _this.uploadCompleted(json_response, n);
      };
    })(this);
  };

  ImageBlock.prototype.uploadCompleted = function(json) {
    return this.setState({
      url: json.url
    }, this.updateData);
  };

  ImageBlock.prototype.updateProgressBar = function(e) {
    var complete;
    complete = "";
    if (e.lengthComputable) {
      complete = e.loaded / e.total * 100;
      complete = complete != null ? complete : {
        complete: 0
      };
      console.log("complete");
      return console.log(complete);
    }
  };

  ImageBlock.prototype.render = function() {
    return React.createElement("div", {
      "ref": "image_tag2",
      "suppressContentEditableWarning": true
    }, React.createElement("div", {
      "contentEditable": "false",
      "className": "aspectRatioPlaceholder is-locked",
      "style": this.coords(),
      "onClick": this.handleGrafFigureSelectImg
    }, React.createElement("div", {
      "style": {
        paddingBottom: this.state.aspect_ratio.ratio + "%"
      },
      "className": 'aspect-ratio-fill'
    }), React.createElement("img", {
      "src": this.state.url,
      "ref": "image_tag",
      "height": this.state.aspect_ratio.height,
      "width": this.state.aspect_ratio.width,
      "className": 'graf-image'
    })), React.createElement("figcaption", {
      "className": 'imageCaption'
    }, React.createElement(EditorBlock, React.__spread({}, this.props, {
      "editable": true,
      "className": "imageCaption",
      "placeholder": "escrive alalal"
    }))));
  };

  return ImageBlock;

})(React.Component);

module.exports = ImageBlock;
});

;require.register("components/blocks/placeholder.cjsx", function(exports, require, module) {
var AtomicBlockUtils, EditorBlock, Entity, PlaceholderBlock, React, ReactDOM, RichUtils, ref, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

ref = require('draft-js'), Entity = ref.Entity, RichUtils = ref.RichUtils, AtomicBlockUtils = ref.AtomicBlockUtils, EditorBlock = ref.EditorBlock;

utils = require("../../utils/utils");

PlaceholderBlock = (function(superClass) {
  extend(PlaceholderBlock, superClass);

  function PlaceholderBlock(props) {
    this.classForDefault = bind(this.classForDefault, this);
    this.handleFocus = bind(this.handleFocus, this);
    this.defaultText = bind(this.defaultText, this);
    this.placeholderText = bind(this.placeholderText, this);
    PlaceholderBlock.__super__.constructor.call(this, props);
    this.state = {
      enabled: false
    };
  }

  PlaceholderBlock.prototype.placeholderText = function() {
    if (this.state.enabled) {
      return "";
    }
    if (this.props.blockProps.data) {
      return this.props.blockProps.data.placeholder;
    } else {
      return this.defaultText();
    }
  };

  PlaceholderBlock.prototype.defaultText = function() {
    return "write something ";
  };

  PlaceholderBlock.prototype.componentDidMount = function() {};

  PlaceholderBlock.prototype.handleFocus = function(e) {
    console.log("focus on placeholder");
    return setTimeout((function(_this) {
      return function() {
        return _this.setState({
          enabled: true
        });
      };
    })(this), 0);
  };

  PlaceholderBlock.prototype.classForDefault = function() {
    if (!this.state.enabled) {
      return "defaultValue defaultValue--root";
    } else {
      return "";
    }
  };

  PlaceholderBlock.prototype.render = function() {
    return React.createElement("span", {
      "className": this.classForDefault(),
      "onMouseDown": this.handleFocus
    }, this.placeholderText(), React.createElement(EditorBlock, React.__spread({}, this.props, {
      "className": "imageCaption",
      "placeholder": "escrive alalal"
    })));
  };

  return PlaceholderBlock;

})(React.Component);

module.exports = PlaceholderBlock;
});

;require.register("components/blocks/video.cjsx", function(exports, require, module) {
var AtomicBlockUtils, EditorBlock, Entity, React, ReactDOM, RichUtils, VideoBlock, ref, updateDataOfBlock, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

ref = require('draft-js'), Entity = ref.Entity, RichUtils = ref.RichUtils, AtomicBlockUtils = ref.AtomicBlockUtils, EditorBlock = ref.EditorBlock;

utils = require("../../utils/utils");

updateDataOfBlock = require('../../model/index.js.es6').updateDataOfBlock;

VideoBlock = (function(superClass) {
  extend(VideoBlock, superClass);

  function VideoBlock(props) {
    this.updateData = bind(this.updateData, this);
    var api_key;
    VideoBlock.__super__.constructor.call(this, props);
    api_key = "86c28a410a104c8bb58848733c82f840";
    this.state = {
      embed_data: this.defaultData()
    };
  }

  VideoBlock.prototype.defaultData = function() {
    var existing_data;
    existing_data = this.props.block.getData().toJS();
    return existing_data.embed_data || {};
  };

  VideoBlock.prototype.updateData = function() {
    var block, blockProps, data, getEditorState, newData, setEditorState;
    blockProps = this.props.blockProps;
    block = this.props.block;
    getEditorState = this.props.blockProps.getEditorState;
    setEditorState = this.props.blockProps.setEditorState;
    data = block.getData();
    newData = data.merge(this.state);
    return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
  };

  VideoBlock.prototype.componentDidMount = function() {
    if (!this.props.blockProps.data) {
      return;
    }
    return utils.ajax({
      url: "" + this.props.blockProps.data.embed_url + this.props.blockProps.data.provisory_text + "&scheme=https"
    }, (function(_this) {
      return function(data) {
        if (data.status === 200) {
          return _this.setState({
            embed_data: JSON.parse(data.responseText)
          }, _this.updateData);
        }
      };
    })(this));
  };

  VideoBlock.prototype.classForImage = function() {
    if (this.state.embed_data.thumbnail_url) {
      return "";
    } else {
      return "mixtapeImage--empty u-ignoreBlock";
    }
  };

  VideoBlock.prototype.render = function() {
    return React.createElement("figure", {
      "className": 'graf--figure graf--iframe graf--first',
      "tabIndex": '0'
    }, React.createElement("div", {
      "className": 'iframeContainer',
      "dangerouslySetInnerHTML": {
        __html: this.state.embed_data.html
      }
    }), React.createElement("figcaption", {
      "className": 'imageCaption'
    }, React.createElement(EditorBlock, React.__spread({}, this.props, {
      "className": "imageCaption",
      "placeholder": "escrive alalal"
    }))));
  };

  return VideoBlock;

})(React.Component);

module.exports = VideoBlock;
});

;require.register("components/inlineTooltip.cjsx", function(exports, require, module) {
var AtomicBlockUtils, DanteInlineTooltip, EditorState, Entity, InlineTooltipItem, React, ReactDOM, RichUtils, addNewBlock, ref, ref1, resetBlockWithType, updateDataOfBlock,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

ref = require('draft-js'), Entity = ref.Entity, RichUtils = ref.RichUtils, AtomicBlockUtils = ref.AtomicBlockUtils, EditorState = ref.EditorState;

ref1 = require('../model/index.js.es6'), addNewBlock = ref1.addNewBlock, resetBlockWithType = ref1.resetBlockWithType, updateDataOfBlock = ref1.updateDataOfBlock;

DanteInlineTooltip = (function(superClass) {
  extend(DanteInlineTooltip, superClass);

  function DanteInlineTooltip(props) {
    this.clickHandler = bind(this.clickHandler, this);
    this.handleFileInput = bind(this.handleFileInput, this);
    this.insertEmbedDIS = bind(this.insertEmbedDIS, this);
    this.insertEmbed = bind(this.insertEmbed, this);
    this.insertVideo = bind(this.insertVideo, this);
    this.insertImage = bind(this.insertImage, this);
    this.clickOnFileUpload = bind(this.clickOnFileUpload, this);
    this.componentWillReceiveProps = bind(this.componentWillReceiveProps, this);
    this.collapse = bind(this.collapse, this);
    this.scale = bind(this.scale, this);
    this._toggleScaled = bind(this._toggleScaled, this);
    DanteInlineTooltip.__super__.constructor.call(this, props);
    this.state = {
      show: true,
      scaled: false,
      buttons: [
        {
          title: "Add an image",
          icon: "image"
        }, {
          title: "Add an video",
          icon: "video"
        }, {
          title: "Add an embed",
          icon: "embed"
        }
      ]
    };
  }

  DanteInlineTooltip.prototype._toggleScaled = function(ev) {
    if (this.state.scaled) {
      return this.collapse();
    } else {
      return this.scale();
    }
  };

  DanteInlineTooltip.prototype.scale = function() {
    return this.setState({
      scaled: true
    });
  };

  DanteInlineTooltip.prototype.collapse = function() {
    return this.setState({
      scaled: false
    });
  };

  DanteInlineTooltip.prototype.componentWillReceiveProps = function(newProps) {
    return this.collapse();
  };


  /*
  componentWillReceiveProps: (newProps)=>
    console.log "RECEIVED PROPS"
  
    contentState = newProps.editorState.getCurrentContent()
    selectionState = newProps.editorState.getSelection()
    console.log contentState
    console.log selectionState
    if newProps.editorState.getSelection().isCollapsed()
      block = contentState.getBlockForKey(selectionState.anchorKey);
      console.log block.getText().length, block.getText()
  
      #debugger
      if block.getText().length > 0
        @setState
          show: false    
        return
  
      #debugger
      node = utils.getNode()
      #console.log node.AnchorNode
  
       * clearTimeout(@timeout)
       * @timeout = setTimeout =>
  
      if node.anchorNode
        #debugger
        #debugger
        console.log "ANCHOR NODE", node.anchorNode
        coords = utils.getSelectionDimensions(node)
        console.log coords
        @setState
          position:
            top: coords.top + window.scrollY
            left: coords.left + window.scrollX - 40
          show: true
      #, 0
    else
      #if (!selectionState.isCollapsed() || selectionState.anchorKey !== selectionState.focusKey) {
      console.log('no sel');
      #this.hideBlock();
      @setState
        show: false
      return;
   */

  DanteInlineTooltip.prototype.activeClass = function() {
    if (this.props.display_tooltip) {
      return "is-active";
    } else {
      return "";
    }
  };

  DanteInlineTooltip.prototype.isActive = function() {
    return this.props.display_tooltip;
  };

  DanteInlineTooltip.prototype.scaledClass = function() {
    if (this.state.scaled) {
      return "is-scaled";
    } else {
      return "";
    }
  };

  DanteInlineTooltip.prototype.scaledWidth = function() {
    if (this.state.scaled) {
      return "124";
    } else {
      return "0";
    }
  };

  DanteInlineTooltip.prototype.clickOnFileUpload = function() {
    this.refs.fileInput.click();
    this.collapse();
    return this.props.closeInlineButton();
  };

  DanteInlineTooltip.prototype.insertImage = function(file) {
    return this.props.setCurrentInput(file, (function(_this) {
      return function() {
        return _this.props.onChange(addNewBlock(_this.props.editorState, 'image'));
      };
    })(this));
  };

  DanteInlineTooltip.prototype.insertVideo = function() {
    var api_key, opts;
    api_key = "86c28a410a104c8bb58848733c82f840";
    opts = {
      type: "video",
      placeholder: "Paste a link to embed content from another site (e.g. Twitter) and press Enter",
      provisory_text: "http://twitter.com",
      embed_url: "http://api.embed.ly/1/oembed?key=" + api_key + "&url="
    };
    return this.props.setCurrentInput(opts, (function(_this) {
      return function() {
        return _this.props.onChange(resetBlockWithType(_this.props.editorState, 'placeholder'));
      };
    })(this));
  };

  DanteInlineTooltip.prototype.insertEmbed = function() {
    var api_key, opts;
    api_key = "86c28a410a104c8bb58848733c82f840";
    opts = {
      type: "embed",
      placeholder: "Paste a link to embed content from another site (e.g. Twitter) and press Enter",
      provisory_text: "http://twitter.com/michelson",
      embed_url: "http://api.embed.ly/1/oembed?key=" + api_key + "&url="
    };
    return this.props.setCurrentInput(opts, (function(_this) {
      return function() {
        return _this.props.onChange(resetBlockWithType(_this.props.editorState, 'placeholder'));
      };
    })(this));
  };

  DanteInlineTooltip.prototype.insertEmbedDIS = function() {
    var api_key, opts;
    api_key = "86c28a410a104c8bb58848733c82f840";
    opts = {
      provisory_text: "http://twitter.com",
      embed_url: "http://api.embed.ly/1/oembed?key=" + api_key + "&url="
    };
    return this.props.setCurrentInput(opts, (function(_this) {
      return function() {
        return _this.props.onChange(resetBlockWithType(_this.props.editorState, 'embed'));
      };
    })(this));
  };

  DanteInlineTooltip.prototype.handleFileInput = function(e) {
    var file, fileList;
    fileList = e.target.files;
    file = fileList[0];
    return this.insertImage(file);
  };

  DanteInlineTooltip.prototype.clickHandler = function(e, type) {
    switch (type) {
      case "image":
        return this.clickOnFileUpload(e);
      case "video":
        return this.insertVideo();
      case "embed":
        return this.insertEmbed();
      default:
        return null;
    }
  };

  DanteInlineTooltip.prototype.render = function() {
    return React.createElement("div", {
      "className": "inlineTooltip " + (this.activeClass()) + " " + (this.scaledClass()),
      "style": this.props.style
    }, React.createElement("button", {
      "className": "inlineTooltip-button control",
      "title": "Close Menu",
      "data-action": "inline-menu",
      "onClick": this._toggleScaled
    }, React.createElement("span", {
      "className": "tooltip-icon dante-icon-plus"
    })), React.createElement("div", {
      "className": "inlineTooltip-menu",
      "style": {
        width: (this.scaledWidth()) + "px"
      }
    }, this.state.buttons.map((function(_this) {
      return function(item, i) {
        return React.createElement(InlineTooltipItem, {
          "item": item,
          "key": i,
          "clickHandler": _this.clickHandler
        });
      };
    })(this)), React.createElement("input", {
      "type": "file",
      "style": {
        display: 'none'
      },
      "ref": "fileInput",
      "multiple": "multiple",
      "onChange": this.handleFileInput
    })));
  };

  return DanteInlineTooltip;

})(React.Component);

InlineTooltipItem = (function(superClass) {
  extend(InlineTooltipItem, superClass);

  function InlineTooltipItem() {
    this.clickHandler = bind(this.clickHandler, this);
    return InlineTooltipItem.__super__.constructor.apply(this, arguments);
  }

  InlineTooltipItem.prototype.clickHandler = function(e) {
    e.preventDefault();
    return this.props.clickHandler(e, this.props.item.icon);
  };

  InlineTooltipItem.prototype.render = function() {
    return React.createElement("button", {
      "className": "inlineTooltip-button scale",
      "title": this.props.title,
      "onMouseDown": this.clickHandler
    }, React.createElement("span", {
      "className": "tooltip-icon dante-icon-" + this.props.item.icon
    }));
  };

  return InlineTooltipItem;

})(React.Component);

module.exports = DanteInlineTooltip;
});

;require.register("components/link.cjsx", function(exports, require, module) {
var Entity, Link, React,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

Entity = require('draft-js').Entity;


/*
Link = (props) ->
  data = Entity.get(props.entityKey).getData();
  console.log props
  #onMouseOver={@props.showPopLinkOver}>
  #onMouseOut={@props.hidePopLinkOver}>
  return (
    <a href={data.url} className="markup--anchor">
      {props.children}
    </a>
  );
 */

Link = (function(superClass) {
  extend(Link, superClass);

  function Link(props) {
    this._hidePopLinkOver = bind(this._hidePopLinkOver, this);
    this._showPopLinkOver = bind(this._showPopLinkOver, this);
    Link.__super__.constructor.call(this, props);
    this.isHover = false;
  }

  Link.prototype._showPopLinkOver = function(e) {
    return this.data.showPopLinkOver(this.refs.link);
  };

  Link.prototype._hidePopLinkOver = function(e) {
    return this.data.hidePopLinkOver();
  };

  Link.prototype.render = function() {
    this.data = Entity.get(this.props.entityKey).getData();
    console.log(this.props);
    console.log("ENTITY", this.data);
    return React.createElement("a", {
      "ref": "link",
      "href": this.data.url,
      "className": "markup--anchor",
      "onMouseOver": this._showPopLinkOver,
      "onMouseOut": this._hidePopLinkOver
    }, this.props.children);
  };

  return Link;

})(React.Component);

module.exports = Link;
});

;require.register("components/popovers/image.cjsx", function(exports, require, module) {
var AtomicBlockUtils, DanteImagePopover, DanteImagePopoverItem, EditorState, Entity, React, ReactDOM, RichUtils, ref,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

ref = require('draft-js'), Entity = ref.Entity, RichUtils = ref.RichUtils, AtomicBlockUtils = ref.AtomicBlockUtils, EditorState = ref.EditorState;

DanteImagePopover = (function(superClass) {
  extend(DanteImagePopover, superClass);

  function DanteImagePopover(props) {
    this.handleClick = bind(this.handleClick, this);
    this.componentWillReceiveProps = bind(this.componentWillReceiveProps, this);
    this.collapse = bind(this.collapse, this);
    this.scale = bind(this.scale, this);
    this._toggleScaled = bind(this._toggleScaled, this);
    DanteImagePopover.__super__.constructor.call(this, props);
    this.state = {
      show: true,
      scaled: false,
      buttons: [
        {
          type: "left"
        }, {
          type: "center"
        }, {
          type: "fill"
        }, {
          type: "wide"
        }
      ]
    };
  }

  DanteImagePopover.prototype._toggleScaled = function(ev) {
    if (this.state.scaled) {
      return this.collapse();
    } else {
      return this.scale();
    }
  };

  DanteImagePopover.prototype.scale = function() {
    return this.setState({
      scaled: true
    });
  };

  DanteImagePopover.prototype.collapse = function() {
    return this.setState({
      scaled: false
    });
  };

  DanteImagePopover.prototype.componentWillReceiveProps = function(newProps) {
    return this.collapse();
  };

  DanteImagePopover.prototype.getStyle = function() {
    if (!this.state.position) {
      return {};
    }
  };

  DanteImagePopover.prototype.handleClick = function(item) {
    return this.props.setDirection(item.type);
  };

  DanteImagePopover.prototype.render = function() {
    return React.createElement("div", {
      "id": "dante_image_popover",
      "className": "dante-popover popover--Aligntooltip popover--top popover--animated " + (this.props.display_image_popover ? 'is-active' : void 0),
      "style": {
        top: this.props.position.top,
        left: this.props.position.left
      }
    }, React.createElement("div", {
      "className": 'popover-inner'
    }, React.createElement("ul", {
      "className": 'dante-menu-buttons'
    }, this.state.buttons.map((function(_this) {
      return function(item, i) {
        return React.createElement(DanteImagePopoverItem, {
          "item": item,
          "handleClick": _this.handleClick
        });
      };
    })(this)))), React.createElement("div", {
      "className": 'popover-arrow'
    }));
  };

  return DanteImagePopover;

})(React.Component);

DanteImagePopoverItem = (function(superClass) {
  extend(DanteImagePopoverItem, superClass);

  function DanteImagePopoverItem() {
    this.render = bind(this.render, this);
    this.handleClick = bind(this.handleClick, this);
    return DanteImagePopoverItem.__super__.constructor.apply(this, arguments);
  }

  DanteImagePopoverItem.prototype.handleClick = function(e) {
    e.preventDefault();
    return this.props.handleClick(this.props.item);
  };

  DanteImagePopoverItem.prototype.render = function() {
    return React.createElement("li", {
      "className": "dante-menu-button align-" + this.props.item.type,
      "onMouseDown": this.handleClick
    }, React.createElement("span", {
      "className": "tooltip-icon dante-icon-image-" + this.props.item.type
    }));
  };

  return DanteImagePopoverItem;

})(React.Component);

module.exports = DanteImagePopover;
});

;require.register("components/popovers/link.cjsx", function(exports, require, module) {
var DanteAnchorPopover, React, ReactDOM,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

DanteAnchorPopover = (function(superClass) {
  extend(DanteAnchorPopover, superClass);

  function DanteAnchorPopover(props) {
    this.render = bind(this.render, this);
    DanteAnchorPopover.__super__.constructor.call(this, props);
  }

  DanteAnchorPopover.prototype.render = function() {
    var position, style;
    position = this.props.position;
    style = {
      left: position.left,
      top: position.top,
      display: "" + (this.props.display_anchor_popover ? 'block' : 'none')
    };
    return React.createElement("div", {
      "id": "dante-popover",
      "className": 'dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active',
      "style": style,
      "onMouseOver": this.props.handleOnMouseOver,
      "onMouseOut": this.props.handleOnMouseOut
    }, React.createElement("div", {
      "className": 'popover-inner'
    }, React.createElement("a", {
      "href": this.props.url,
      "target": '_blank'
    }, this.props.url)), React.createElement("div", {
      "className": 'popover-arrow'
    }));
  };

  return DanteAnchorPopover;

})(React.Component);

module.exports = DanteAnchorPopover;
});

;require.register("components/toolTip.cjsx", function(exports, require, module) {
var CompositeDecorator, ContentState, DanteTooltip, DanteTooltipItem, DanteTooltipLink, Editor, EditorState, Entity, KeyBindingUtil, React, ReactDOM, RichUtils, convertToRaw, getDefaultKeyBinding, getSelectionOffsetKeyForNode, getVisibleSelectionRect, ref, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

utils = require('../utils/utils.coffee');

ref = require('draft-js'), convertToRaw = ref.convertToRaw, CompositeDecorator = ref.CompositeDecorator, getVisibleSelectionRect = ref.getVisibleSelectionRect, getDefaultKeyBinding = ref.getDefaultKeyBinding, getSelectionOffsetKeyForNode = ref.getSelectionOffsetKeyForNode, KeyBindingUtil = ref.KeyBindingUtil, ContentState = ref.ContentState, Editor = ref.Editor, EditorState = ref.EditorState, Entity = ref.Entity, RichUtils = ref.RichUtils;

DanteTooltip = (function(superClass) {
  extend(DanteTooltip, superClass);

  function DanteTooltip(props) {
    this.componentWillReceiveProps = bind(this.componentWillReceiveProps, this);
    this.confirmLink = bind(this.confirmLink, this);
    this.handleInputEnter = bind(this.handleInputEnter, this);
    this._disableLinkMode = bind(this._disableLinkMode, this);
    this._enableLinkMode = bind(this._enableLinkMode, this);
    this.displayActiveMenu = bind(this.displayActiveMenu, this);
    this.displayLinkMode = bind(this.displayLinkMode, this);
    this._clickBlockHandler = bind(this._clickBlockHandler, this);
    this._clickInlineHandler = bind(this._clickInlineHandler, this);
    DanteTooltip.__super__.constructor.call(this, props);
    this.getVisibleSelectionRect = getVisibleSelectionRect;
    this.state = {
      link_mode: false
    };
  }

  DanteTooltip.prototype._clickInlineHandler = function(ev, style) {
    ev.preventDefault();
    this.props.dispatchChanges(RichUtils.toggleInlineStyle(this.props.editorState, style));
    return setTimeout((function(_this) {
      return function() {
        return _this.props.relocateMenu();
      };
    })(this), 0);
  };

  DanteTooltip.prototype._clickBlockHandler = function(ev, style) {
    ev.preventDefault();
    this.props.dispatchChanges(RichUtils.toggleBlockType(this.props.editorState, style));
    return setTimeout((function(_this) {
      return function() {
        return _this.props.relocateMenu();
      };
    })(this), 0);
  };

  DanteTooltip.prototype.displayLinkMode = function() {
    if (this.state.link_mode) {
      return "dante-menu--linkmode";
    } else {
      return "";
    }
  };

  DanteTooltip.prototype.displayActiveMenu = function() {
    if (this.props.options.show) {
      return "dante-menu--active";
    } else {
      return "";
    }
  };

  DanteTooltip.prototype._enableLinkMode = function(ev) {
    ev.preventDefault();
    return this.setState({
      link_mode: true
    });
  };

  DanteTooltip.prototype._disableLinkMode = function(ev) {
    ev.preventDefault();
    return this.setState({
      link_mode: false
    });
  };

  DanteTooltip.prototype.hideMenu = function() {
    return this.props.disableMenu();
  };

  DanteTooltip.prototype.handleInputEnter = function(e) {
    if (e.which === 13) {
      return this.confirmLink(e);
    }
  };

  DanteTooltip.prototype.confirmLink = function(e) {
    var contentState, editorState, entityKey, opts, selection, urlValue;
    e.preventDefault();
    editorState = this.props.editorState;
    urlValue = e.currentTarget.value;
    contentState = editorState.getCurrentContent();
    selection = editorState.getSelection();
    opts = {
      url: urlValue,
      showPopLinkOver: this.props.showPopLinkOver,
      hidePopLinkOver: this.props.hidePopLinkOver
    };
    console.log("MAMAMA", opts);
    entityKey = Entity.create('link', 'MUTABLE', opts);
    if (selection.isCollapsed()) {
      console.log("COLLAPSED SKIPPN LINK");
      return;
    }
    this.props.dispatchChanges(RichUtils.toggleLink(editorState, selection, entityKey));
    return this._disableLinkMode(e);
  };

  DanteTooltip.prototype.getPosition = function() {
    var pos;
    pos = this.props.options.position;
    return pos;
  };

  DanteTooltip.prototype.componentWillReceiveProps = function(newProps) {};

  DanteTooltip.prototype.render = function() {
    return React.createElement("div", {
      "id": "dante-menu",
      "className": "dante-menu " + (this.displayActiveMenu()) + " " + (this.displayLinkMode()),
      "style": this.getPosition()
    }, React.createElement("div", {
      "className": "dante-menu-linkinput"
    }, React.createElement("input", {
      "className": "dante-menu-input",
      "placeholder": "Paste or type a link",
      "onKeyPress": this.handleInputEnter
    }), React.createElement("div", {
      "className": "dante-menu-button",
      "onMouseDown": this._disableLinkMode
    }, "x")), React.createElement("ul", {
      "className": "dante-menu-buttons"
    }, this.props.block_types.map((function(_this) {
      return function(item, i) {
        return React.createElement(DanteTooltipItem, {
          "key": i,
          "item": item,
          "handleClick": _this._clickBlockHandler,
          "editorState": _this.props.editorState,
          "type": "block",
          "currentStyle": _this.props.editorState.getCurrentInlineStyle
        });
      };
    })(this)), React.createElement(DanteTooltipLink, {
      "editorState": this.props.editorState,
      "enableLinkMode": this._enableLinkMode
    }), this.props.inline_styles.map((function(_this) {
      return function(item, i) {
        return React.createElement(DanteTooltipItem, {
          "key": i,
          "item": item,
          "type": "inline",
          "editorState": _this.props.editorState,
          "handleClick": _this._clickInlineHandler
        });
      };
    })(this))));
  };

  return DanteTooltip;

})(React.Component);

DanteTooltipItem = (function(superClass) {
  extend(DanteTooltipItem, superClass);

  function DanteTooltipItem() {
    this.render = bind(this.render, this);
    this.activeClassBlock = bind(this.activeClassBlock, this);
    this.activeClassInline = bind(this.activeClassInline, this);
    this.isActive = bind(this.isActive, this);
    this.activeClass = bind(this.activeClass, this);
    this.handleClick = bind(this.handleClick, this);
    return DanteTooltipItem.__super__.constructor.apply(this, arguments);
  }

  DanteTooltipItem.prototype.handleClick = function(ev) {
    return this.props.handleClick(ev, this.props.item.style);
  };

  DanteTooltipItem.prototype.activeClass = function() {
    if (this.isActive()) {
      return "active";
    } else {
      return "";
    }
  };

  DanteTooltipItem.prototype.isActive = function() {
    if (this.props.type === "block") {
      return this.activeClassBlock();
    } else {
      return this.activeClassInline();
    }
  };

  DanteTooltipItem.prototype.activeClassInline = function() {
    if (!this.props.editorState) {
      return;
    }
    return this.props.editorState.getCurrentInlineStyle().has(this.props.item.style);
  };

  DanteTooltipItem.prototype.activeClassBlock = function() {
    var blockType, selection;
    if (!this.props.editorState) {
      return;
    }
    selection = this.props.editorState.getSelection();
    blockType = this.props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    return this.props.item.style === blockType;
  };

  DanteTooltipItem.prototype.render = function() {
    return React.createElement("li", {
      "className": "dante-menu-button " + (this.activeClass()),
      "onMouseDown": this.handleClick
    }, React.createElement("i", {
      "className": "dante-icon dante-icon-" + this.props.item.label,
      "data-action": "bold"
    }));
  };

  return DanteTooltipItem;

})(React.Component);

DanteTooltipLink = (function(superClass) {
  extend(DanteTooltipLink, superClass);

  function DanteTooltipLink() {
    this.promptForLink = bind(this.promptForLink, this);
    return DanteTooltipLink.__super__.constructor.apply(this, arguments);
  }

  DanteTooltipLink.prototype.promptForLink = function(ev) {
    var selection;
    selection = this.props.editorState.getSelection();
    if (!selection.isCollapsed()) {
      return this.props.enableLinkMode(ev);
    }
  };

  DanteTooltipLink.prototype.render = function() {
    return React.createElement("li", {
      "className": "dante-menu-button",
      "onMouseDown": this.promptForLink
    }, React.createElement("i", {
      "className": "dante-icon icon-createlink",
      "data-action": "createlink"
    }, "link"));
  };

  return DanteTooltipLink;

})(React.Component);

module.exports = DanteTooltip;
});

;require.register("data/poc.js", function(exports, require, module) {

data = {
  "entityMap": {},
  "blocks": [
    {
      "key": "5i64m",
      "text": "ttps://www.youtube.com/watch?v=KPJgtQwtVVA&feature=youtu.be",
      "type": "video",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "embed_data": {
          "provider_url": "https://www.youtube.com/",
          "width": 854,
          "height": 480,
          "html": "<iframe class=\"embedly-embed\" src=\"https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FKPJgtQwtVVA%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DKPJgtQwtVVA&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FKPJgtQwtVVA%2Fhqdefault.jpg&key=d42b91026ea041c0875fd61ff736cb79&type=text%2Fhtml&schema=youtube\" width=\"854\" height=\"480\" scrolling=\"no\" frameborder=\"0\" allowfullscreen></iframe>",
          "url": "http://www.youtube.com/watch?v=KPJgtQwtVVA",
          "thumbnail_width": 480,
          "version": "1.0",
          "title": "When Eric Clapton met Jimi Hendrix",
          "provider_name": "YouTube",
          "type": "video",
          "thumbnail_height": 360,
          "author_url": "https://www.youtube.com/user/Mrjamesanonymous",
          "thumbnail_url": "https://i.ytimg.com/vi/KPJgtQwtVVA/hqdefault.jpg",
          "description": "An excerpt from the bbc documentary 'the seven ages of rock - Episode 1 the birth of rock'.",
          "author_name": "Mrjamesanonymous"
        }
      }
    },
    {
      "key": "347m6",
      "text": "ttp://news.ycombinator.com",
      "type": "embed",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "embed_data": {
          "provider_url": "https://news.ycombinator.com",
          "description": "Air India Taking Advantage of Tailwinds",
          "title": "Hacker News",
          "url": "https://news.ycombinator.com/",
          "version": "1.0",
          "provider_name": "Ycombinator",
          "type": "link"
        }
      }
    },
    {
      "key": "t0sk",
      "text": "sdcoidjco sidjcioj",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "3o1e9",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "gomb",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "3gb8l",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "5al5t",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "9n7jn",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "688cu",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "edbt8",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "6gcd3",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "2kv9k",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "fkp0i",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    }
  ]
}

module.exports = data
});

;require.register("initialize.cjsx", function(exports, require, module) {
var React, ReactDOM;

ReactDOM = require('react-dom');

React = require('react');

window.Dante = require('./components/App.cjsx');
});

;require.register("model/content.js.es6", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _link = require('../components/link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//https://gist.github.com/benbriggs/d946a7cf4f7d90545779aeb79ccbd292
var decorator = new _draftJs.CompositeDecorator([{
  strategy: _link.findLinkEntities,
  component: _link2.default
}]);

var createEditorState = function createEditorState() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var decorators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (content === null) {
    return _draftJs.EditorState.createEmpty(decorator);
  }
  var dec = decorator;
  if (decorators !== null) {
    dec = decorators;
  }
  return _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(content), dec);
};

exports.default = createEditorState;
});

require.register("model/index.js.es6", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewBlockAt = exports.updateDataOfBlock = exports.resetBlockWithType = exports.addNewBlock = exports.getCurrentBlock = exports.getDefaultBlockData = undefined;

var _immutable = require('immutable');

var _draftJs = require('draft-js');

//import { Block } from '../util/constants';


/*
Returns default block-level metadata for various block type. Empty object otherwise.
*/
var getDefaultBlockData = exports.getDefaultBlockData = function getDefaultBlockData(blockType) {
  var initialData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (blockType) {
    //case Block.TODO: return { checked: false };
    default:
      return initialData;
  }
};

/*
Get currentBlock in the editorState.
*/
var getCurrentBlock = exports.getCurrentBlock = function getCurrentBlock(editorState) {
  var selectionState = editorState.getSelection();
  var contentState = editorState.getCurrentContent();
  var block = contentState.getBlockForKey(selectionState.getStartKey());
  return block;
};

/*
Adds a new block (currently replaces an empty block) at the current cursor position
of the given `newType`.
*/
var addNewBlock = exports.addNewBlock = function addNewBlock(editorState) {
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
var resetBlockWithType = exports.resetBlockWithType = function resetBlockWithType(editorState) {
  var newType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "unstyled";

  var contentState = editorState.getCurrentContent();
  var selectionState = editorState.getSelection();
  var key = selectionState.getStartKey();
  var blockMap = contentState.getBlockMap();
  var block = blockMap.get(key);
  var newText = '';
  var text = block.getText();
  if (block.getLength() >= 2) {
    newText = text.substr(1);
  }
  var newBlock = block.merge({
    text: newText,
    type: newType,
    data: getDefaultBlockData(newType)
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
var updateDataOfBlock = exports.updateDataOfBlock = function updateDataOfBlock(editorState, block, newData) {
  var contentState = editorState.getCurrentContent();
  var newBlock = block.merge({
    data: newData
  });
  var newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock)
  });
  return _draftJs.EditorState.push(editorState, newContentState, 'change-block-type');
  // return editorState;
};

// const BEFORE = -1;
// const AFTER = 1;

/*
Used from [react-rte](https://github.com/sstur/react-rte/blob/master/src/lib/insertBlockAfter.js)
by [sstur](https://github.com/sstur)
*/
var addNewBlockAt = exports.addNewBlockAt = function addNewBlockAt(editorState, pivotBlockKey) {
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
});

require.register("utils/constants.js.es6", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
Some of the constants which are used throughout this project instead of directly using the string.
*/

var Block = exports.Block = {
  UNSTYLED: 'unstyled',
  OL: 'ordered-list-item',
  UL: 'unordered-list-item',
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
  H4: 'header-four',
  H5: 'header-five',
  H6: 'header-six',
  CODE: 'code-block',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  ATOMIC: 'atomic',
  BLOCKQUOTE_CAPTION: 'block-quote-caption',
  CAPTION: 'caption',
  TODO: 'todo',
  IMAGE: 'atomic:image',
  BREAK: 'atomic:break'
};

var Inline = exports.Inline = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE',
  HIGHLIGHT: 'HIGHLIGHT'
};

var Entity = exports.Entity = {
  LINK: 'LINK'
};

exports.default = {
  Block: Block,
  Inline: Inline,
  Entity: Entity
};
});

require.register("utils/convert_html.js.es6", function(exports, require, module) {
'use strict';

var _draftJs = require('draft-js');

var _draftConvert = require('draft-convert');

var toHTML = (0, _draftConvert.convertToHTML)({
  blockToHTML: function blockToHTML(block) {
    if (block.type === 'atomic') {
      // inspect metadata inside atomic block. if you're using block metadata,
      // you can just inspect `block.data`, if not though we must inspect the
      // entity range inside of the block.
      if (block.entityRanges.length > 0) {
        var entityKey = block.entityRanges[0].key;
        var entity = _draftJs.Entity.get(entityKey);

        // once you get here it depends on your app and what your entity data
        // look like - in this example i'll pretend it uses the type to define
        // if it's an image, a video, etc
        var entityType = entity.getData().type;
        // return unique wrapping block elements for each type of atomic block
        if (entityType === 'ATOMIC-IMAGE') {
          return {
            start: '<div class="image-block">',
            end: '</div>'
          };
        } else if (entityType === 'ATOMIC-VIDEO') {
          return {
            start: '<div class="video-block">',
            end: '</div>'
          };
        }
      }
    }
    if (block.type === 'image') {
      debugger;
      return {
        start: '<div class="image-block">',
        end: '</div>'
      };
    }
  },
  entityToHTML: function entityToHTML(entity, originalText) {
    if (entity.type === 'LINK') {
      var href = entity.data.href;
      return '<a href=' + href + '>' + originalText + '</a>';
    }
    if (entity.type === 'ATOMIC-IMAGE') {
      var src = entity.data.src;
      return '<img src="' + src + '" />';
    }
    if (entity.type === 'ATOMIC-VIDEO') {
      var _src = entity.data.src;
      var type = entity.data.type;
      return '<video controls><source src="' + _src + '" type="' + type + '"></video>';
    }
    return originalText;
  }
});

//const html = toHTML(contentState);

//export default toHTML;
module.exports = toHTML;
});

;require.register("utils/convert_html2.coffee", function(exports, require, module) {
var CharacterMetadata, ContentBlock, ContentState, Entity, List, OrderedSet, Repeat, compose, convertFromHTML, customHTML2Content, elementToBlockSpecElement, fromJS, genKey, getBlockSpecForElement, getSafeBodyFromHTML, imgReplacer, ref, ref1, replaceElement, wrapBlockSpec;

ref = require('draft-js'), ContentState = ref.ContentState, genKey = ref.genKey, Entity = ref.Entity, CharacterMetadata = ref.CharacterMetadata, ContentBlock = ref.ContentBlock, convertFromHTML = ref.convertFromHTML, getSafeBodyFromHTML = ref.getSafeBodyFromHTML;

ref1 = require('immutable'), List = ref1.List, OrderedSet = ref1.OrderedSet, Repeat = ref1.Repeat, fromJS = ref1.fromJS;

compose = require('underscore').compose;


/*
 * Helpers
 */

getBlockSpecForElement = (function(_this) {
  return function(imgElement) {
    return {
      contentType: 'image',
      imgSrc: imgElement.getAttribute('src')
    };
  };
})(this);

wrapBlockSpec = (function(_this) {
  return function(blockSpec) {
    var tempEl;
    if (blockSpec === null) {
      return null;
    }
    tempEl = document.createElement('blockquote');
    tempEl.innerText = JSON.stringify(blockSpec);
    return tempEl;
  };
})(this);

replaceElement = (function(_this) {
  return function(oldEl, newEl) {
    var parentNode;
    if (!(newEl instanceof HTMLElement)) {
      return;
    }
    parentNode = oldEl.parentNode;
    return parentNode.replaceChild(newEl, oldEl);
  };
})(this);

elementToBlockSpecElement = compose(wrapBlockSpec, getBlockSpecForElement);

imgReplacer = (function(_this) {
  return function(imgElement) {
    return replaceElement(imgElement, elementToBlockSpecElement(imgElement));
  };
})(this);


/*
 * Main function
 */

customHTML2Content = function(HTML, blockRn) {
  var a, contentBlocks, tempDoc;
  tempDoc = new DOMParser().parseFromString(HTML, 'text/html');
  a = tempDoc.querySelectorAll('img').forEach(function(item) {
    return imgReplacer(item);
  });
  contentBlocks = convertFromHTML(tempDoc.body.innerHTML, getSafeBodyFromHTML, blockRn);
  contentBlocks = contentBlocks.map(function(block) {
    var json, newBlock;
    if (block.getType() !== 'blockquote') {
      return block;
    }
    json = JSON.parse(block.getText());
    return newBlock = block.merge({
      type: "image",
      text: "",
      data: {
        url: json.imgSrc
      }
    });
  });
  tempDoc = null;
  return ContentState.createFromBlockArray(contentBlocks);
};

module.exports = customHTML2Content;
});

;require.register("utils/find_entities.coffee", function(exports, require, module) {
var Entity, findEntities;

Entity = require('draft-js').Entity;

findEntities = function(entityType, contentBlock, callback) {
  return contentBlock.findEntityRanges((function(_this) {
    return function(character) {
      var entityKey;
      entityKey = character.getEntity();
      return entityKey !== null && Entity.get(entityKey).getType() === entityType;
    };
  })(this), callback);
};

module.exports = findEntities;
});

;require.register("utils/save_content.coffee", function(exports, require, module) {
var Immutable, SaveBehavior, axios;

axios = require("axios");

Immutable = require('immutable');

SaveBehavior = (function() {
  function SaveBehavior(options) {
    this.config = options.config;
    this.editorContent = options.editorContent;
  }

  SaveBehavior.prototype.handleStore = function(ev) {
    return this.store();
  };

  SaveBehavior.prototype.store = function(content) {
    if (!this.config.store_url) {
      return;
    }
    clearTimeout(this.timeout);
    return this.timeout = setTimeout((function(_this) {
      return function() {
        return _this.checkforStore(content);
      };
    })(this), this.config.store_interval);
  };

  SaveBehavior.prototype.checkforStore = function(content) {
    var isChanged;
    console.log("ENTER DATA STORE");
    isChanged = !Immutable.is(Immutable.fromJS(this.editorContent), Immutable.fromJS(content));
    console.log("CONTENT CHANGED:", isChanged);
    if (!isChanged) {
      return;
    }
    if (this.config.before_xhr_handler) {
      this.config.before_xhr_handler();
    }
    return axios({
      method: this.config.store_method,
      url: this.config.store_url,
      data: {
        data: JSON.stringify(content)
      }
    }).then((function(_this) {
      return function(result) {
        console.log("STORING CONTENT", result);
        if (_this.config.store_success_handler) {
          _this.config.store_success_handler(result);
        }
        if (_this.config.success_xhr_handler) {
          return _this.config.success_xhr_handler(result);
        }
      };
    })(this))["catch"]((function(_this) {
      return function(error) {
        console.log("ERROR: got error uploading file " + error);
        if (_this.config.failure_xhr_handler) {
          return _this.config.failure_xhr_handler(error);
        }
      };
    })(this));
  };

  return SaveBehavior;

})();

module.exports = SaveBehavior;
});

;require.register("utils/selection.js.es6", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
Returns the `boundingClientRect` of the passed selection.
*/
var getSelectionRect = exports.getSelectionRect = function getSelectionRect(selected) {
  var _rect = selected.getRangeAt(0).getBoundingClientRect();
  // selected.getRangeAt(0).getBoundingClientRect()
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
var getSelection = exports.getSelection = function getSelection(root) {
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
var getSelectedBlockNode = exports.getSelectedBlockNode = function getSelectedBlockNode(root) {
  var selection = root.getSelection();
  if (selection.rangeCount === 0) {
    return null;
  }
  var node = selection.getRangeAt(0).startContainer;
  // console.log(node);
  do {
    if (node.getAttribute && node.getAttribute('data-block') === 'true') {
      return node;
    }
    node = node.parentNode;
    // console.log(node);
  } while (node !== null);
  return null;
};
});

require.register("utils/simple_decorator.js", function(exports, require, module) {
var Immutable = require('immutable');

var KEY_SEPARATOR = '-';

/**
 * Creates a Draft decorator
 * @param {Function} strategy function (contentBlock, callback(start, end, props))
 * @param {Function} getComponent function (props) -> React.Component
 */
function SimpleDecorator(strategy, getComponent) {
    this.decorated = {};
    this.strategy = strategy;
    this.getComponent = getComponent;
}

/**
 * Return list of decoration IDs per character
 * @param {ContentBlock} block
 * @return {List<String>}
 */
SimpleDecorator.prototype.getDecorations = function(block) {
    var decorations = Array(block.getText().length).fill(null);
    // Apply a decoration to given range, with given props
    function callback (start, end, props) {
        if (props === undefined) {
            props = {};
        }
        key = blockKey + KEY_SEPARATOR + decorationId;
        decorated[blockKey][decorationId] = props;
        decorateRange(decorations, start, end, key);
        decorationId++;
    }

    var blockKey = block.getKey();
    var key;
    var decorationId = 0;
    var decorated = this.decorated;
    decorated[blockKey] = {};

    this.strategy(block, callback);

    return Immutable.List(decorations);
};

/**
 * Return component to render a decoration
 * @param {String} key
 * @return {Function}
 */
SimpleDecorator.prototype.getComponentForKey = function(key) {
    return this.getComponent;
};

/**
 * Return props to render a decoration
 * @param {String} key
 * @return {Object}
 */
SimpleDecorator.prototype.getPropsForKey = function(key) {
    var parts = key.split(KEY_SEPARATOR);
    var blockKey = parts[0];
    var decorationId = parts[1];
    return this.decorated[blockKey][decorationId];
};

function decorateRange(decorationsArray, start, end, key) {
    for (var ii = start; ii < end; ii++) {
        decorationsArray[ii] = key;
    }
}

module.exports = SimpleDecorator;
});

require.register("utils/utils.coffee", function(exports, require, module) {
var LINE_HEIGHT, is_caret_at_end_of_node, is_caret_at_start_of_node, utils;

String.prototype.killWhiteSpace = function() {
  return this.replace(/\s/g, '');
};

String.prototype.reduceWhiteSpace = function() {
  return this.replace(/\s+/g, ' ');
};

utils = {};

utils.ajax = (function(_this) {
  return function(options, cb) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open('GET', options.url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        return cb(xhr);
      } else {
        return cb(xhr);
      }
    };
    return xhr.send();
  };
})(this);

utils.getSelectionRange = (function(_this) {
  return function() {
    var selection;
    selection = window.getSelection();
    if (selection.rangeCount === 0) {
      return null;
    }
    return selection.getRangeAt(0);
  };
})(this);

utils.getSelectedBlockElement = (function(_this) {
  return function(range) {
    var node, nodeIsDataBlock;
    node = range.startContainer;
    while (node !== null) {
      nodeIsDataBlock = node.getAttribute ? node.getAttribute('data-block') : null;
      node = node.parentNode;
    }
    return null;
  };
})(this);

utils.getSelectedNode = (function(_this) {
  return function(range) {
    var node;
    node = range.startContainer;
    while (node !== null) {
      node = node.parentNode;
      return node;
    }
    return null;
  };
})(this);

utils.getSelectionCoords = (function(_this) {
  return function(selectionRange) {
    var editorBounds, offsetLeft, offsetTop, rangeBounds, rangeHeight, rangeWidth;
    editorBounds = document.getElementById('richEditor').getBoundingClientRect();
    rangeBounds = selectionRange.getBoundingClientRect();
    rangeWidth = rangeBounds.right - rangeBounds.left;
    rangeHeight = rangeBounds.bottom - rangeBounds.top;
    offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2) - (72 / 2);
    offsetTop = rangeBounds.top - editorBounds.top - 42;
    return {
      offsetLeft: offsetLeft,
      offsetTop: offsetTop
    };
  };
})(this);

utils.log = function(message, force) {
  if (window.debugMode || force) {
    return console.log(message);
  }
};

utils.getBase64Image = function(img) {
  var canvas, ctx, dataURL;
  canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  dataURL = canvas.toDataURL("image/png");
  return dataURL;
};

utils.generateUniqueName = function() {
  return Math.random().toString(36).slice(8);
};

utils.saveSelection = function() {
  var i, len, ranges, sel;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      ranges = [];
      i = 0;
      len = sel.rangeCount;
      while (i < len) {
        ranges.push(sel.getRangeAt(i));
        ++i;
      }
      return ranges;
    }
  } else {
    if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }
  }
  return null;
};

utils.restoreSelection = function(savedSel) {
  var i, len, sel;
  if (savedSel) {
    if (window.getSelection) {
      sel = window.getSelection();
      sel.removeAllRanges();
      i = 0;
      len = savedSel.length;
      while (i < len) {
        sel.addRange(savedSel[i]);
        ++i;
      }
    } else {
      if (document.selection && savedSel.select) {
        savedSel.select();
      }
    }
  }
};

utils.getNodeDIS = function() {
  var container, range, sel;
  range = void 0;
  sel = void 0;
  container = void 0;
  if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    return range.parentElement();
  } else if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt) {
      if (sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
      }
    } else {
      range = document.createRange();
      range.setStart(sel.anchorNode, sel.anchorOffset);
      range.setEnd(sel.focusNode, sel.focusOffset);
      if (range.collapsed !== sel.isCollapsed) {
        range.setStart(sel.focusNode, sel.focusOffset);
        range.setEnd(sel.anchorNode, sel.anchorOffset);
      }
    }
    if (range) {
      container = range.commonAncestorContainer;
      if (container.nodeType === 3) {
        return container.parentNode;
      } else {
        return container;
      }
    }
  }
};

utils.getSelectionDimensionsDIS = function() {
  var height, left, range, rect, sel, top, width;
  sel = document.selection;
  range = void 0;
  width = 0;
  height = 0;
  left = 0;
  top = 0;
  if (sel) {
    if (sel.type !== "Control") {
      range = sel.createRange();
      width = range.boundingWidth;
      return height = range.boundingHeight;
    }
  } else if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getBoundingClientRect) {
        rect = range.getBoundingClientRect();
        width = rect.right - rect.left;
        height = rect.bottom - rect.top;
      }
    }
    return rect;
  }
};

utils.getSelectionDimensions = (function(_this) {
  return function(selected) {
    var _rect, rect, ref;
    _rect = selected.getRangeAt(0).getBoundingClientRect();
    rect = (ref = _rect && _rect.top) != null ? ref : {
      _rect: selected.getRangeAt(0).getClientRects()[0]
    };
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
})(this);

utils.getNode = (function(_this) {
  return function(root) {
    var t;
    if (root == null) {
      root = window;
    }
    t = null;
    if (root.getSelection) {
      t = root.getSelection();
    } else if (root.document.getSelection) {
      t = root.document.getSelection();
    } else if (root.document.selection) {
      t = root.document.selection.createRange().text;
    }
    return t;
  };
})(this);

utils.getCaretPosition = function(editableDiv) {
  var caretPos, containerEl, range, sel, tempEl, tempRange;
  caretPos = 0;
  containerEl = null;
  sel = void 0;
  range = void 0;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode === editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() === editableDiv) {
      tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
};

utils.isElementInViewport = function(el) {
  var rect;
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};

utils.getSelectedText = function() {
  var text;
  text = "";
  if (typeof window.getSelection !== "undefined") {
    text = window.getSelection().toString();
  } else if (typeof document.selection !== "undefined" && document.selection.type === "Text") {
    text = document.selection.createRange().text;
  }
  return text;
};

utils.selection = (function(_this) {
  return function() {
    selection;
    var selection;
    if (window.getSelection) {
      return selection = window.getSelection();
    } else if (document.selection && document.selection.type !== "Control") {
      return selection = document.selection;
    }
  };
})(this);

utils.getSelectionStart = function() {
  var node;
  node = document.getSelection().anchorNode;
  if (node === null) {
    return;
  }
  if (node.nodeType === 3) {
    return node.parentNode;
  } else {
    return node;
  }
};

utils.getRange = function() {
  var editor, range;
  editor = $(this.el)[0];
  range = selection && selection.rangeCount && selection.getRangeAt(0);
  if (!range) {
    range = document.createRange();
  }
  if (!editor.contains(range.commonAncestorContainer)) {
    range.selectNodeContents(editor);
    range.collapse(false);
  }
  return range;
};

utils.setRange = function(range) {
  range = range || this.current_range;
  if (!range) {
    range = this.getRange();
    range.collapse(false);
  }
  this.selection().removeAllRanges();
  this.selection().addRange(range);
  return this;
};

utils.getCharacterPrecedingCaret = function() {
  var precedingChar, precedingRange, range, sel;
  precedingChar = "";
  sel = void 0;
  range = void 0;
  precedingRange = void 0;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount > 0) {
      range = sel.getRangeAt(0).cloneRange();
      range.collapse(true);
      range.setStart(this.getNode(), 0);
      precedingChar = range.toString().slice(0);
    }
  } else if ((sel = document.selection) && sel.type !== "Control") {
    range = sel.createRange();
    precedingRange = range.duplicate();
    precedingRange.moveToElementText(containerEl);
    precedingRange.setEndPoint("EndToStart", range);
    precedingChar = precedingRange.text.slice(0);
  }
  return precedingChar;
};

utils.isLastChar = function() {
  return $(this.getNode()).text().trim().length === this.getCharacterPrecedingCaret().trim().length;
};

utils.isFirstChar = function() {
  return this.getCharacterPrecedingCaret().trim().length === 0;
};

utils.isSelectingAll = function(element) {
  var a, b;
  a = this.getSelectedText().killWhiteSpace().length;
  b = $(element).text().killWhiteSpace().length;
  return a === b;
};

utils.setRangeAt = function(element, pos) {
  var range, sel;
  if (pos == null) {
    pos = 0;
  }
  range = document.createRange();
  sel = window.getSelection();
  range.setStart(element, pos);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  return element.focus();
};

utils.setRangeAtText = function(element, pos) {
  var node, range, sel;
  if (pos == null) {
    pos = 0;
  }
  range = document.createRange();
  sel = window.getSelection();
  node = element.firstChild;
  range.setStart(node, 0);
  range.setEnd(node, 0);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  return element.focus();
};

LINE_HEIGHT = 20;

is_caret_at_start_of_node = function(node, range) {
  var pre_range;
  pre_range = document.createRange();
  pre_range.selectNodeContents(node);
  pre_range.setEnd(range.startContainer, range.startOffset);
  return pre_range.toString().trim().length === 0;
};

is_caret_at_end_of_node = function(node, range) {
  var post_range;
  post_range = document.createRange();
  post_range.selectNodeContents(node);
  post_range.setStart(range.endContainer, range.endOffset);
  return post_range.toString().trim().length === 0;
};


/* DOM UTILS */

utils.scrollTop = function(element, to, duration) {
  var difference, perTick;
  if (duration <= 0) {
    return;
  }
  difference = to - element.scrollTop;
  perTick = difference / duration * 10;
  return setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) {
      return;
    }
    return scrollTo(element, to, duration - 10);
  }, 10);
};

utils.outerHeight = function(el) {
  var height, style;
  height = el.offsetHeight;
  style = getComputedStyle(el);
  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
};


/*
$.fn.editableIsCaret = ->
  return window.getSelection().type == 'Caret'
   * alt test:
   * return sel.rangeCount == 1 and sel.getRangeAt(0).collapsed

$.fn.editableRange = ->
   * Return the range for the selection
  sel = window.getSelection()
  return unless sel.rangeCount > 0
  return sel.getRangeAt(0)

$.fn.editableCaretRange = ->
  return unless @editableIsCaret()
  return @editableRange()

$.fn.editableSetRange = (range) ->
  sel = window.getSelection()
  sel.removeAllRanges() if sel.rangeCount > 0
  sel.addRange(range)

$.fn.editableFocus = (at_start=true) ->
  return unless @attr('contenteditable')
  sel = window.getSelection()
  sel.removeAllRanges() if sel.rangeCount > 0
  range = document.createRange()
  range.selectNodeContents(@[0])
  range.collapse(at_start)
  sel.addRange(range)

$.fn.editableCaretAtStart = ->
  range = @editableRange()
  return false unless range
  return is_caret_at_start_of_node(@[0], range)

$.fn.editableCaretAtEnd = ->
  range = @editableRange()
  return false unless range
  return is_caret_at_end_of_node(@[0], range)

$.fn.editableCaretOnFirstLine = ->
  range = @editableRange()
  return false unless range
   * At the start of a node, the getClientRects() is [], so we have to
   * use the getBoundingClientRect (which seems to work).
  if is_caret_at_start_of_node(@[0], range)
    return true
  else if is_caret_at_end_of_node(@[0], range)
    ctop = @[0].getBoundingClientRect().bottom - LINE_HEIGHT
  else
    ctop = range.getClientRects()[0].top
  etop = @[0].getBoundingClientRect().top
  return ctop < etop + LINE_HEIGHT

$.fn.editableCaretOnLastLine = ->
  range = @editableRange()
  return false unless range
  if is_caret_at_end_of_node(@[0], range)
    return true
  else if is_caret_at_start_of_node(@[0], range)
     * We are on the first line.
    cbtm = @[0].getBoundingClientRect().top + LINE_HEIGHT
  else
    cbtm = range.getClientRects()[0].bottom
  ebtm = @[0].getBoundingClientRect().bottom
  return cbtm > ebtm - LINE_HEIGHT

$.fn.exists = ->
  @.length > 0
 */

module.exports = utils;
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=application.js.map