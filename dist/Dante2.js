(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Dante2"] = factory(require("react"), require("react-dom"));
	else
		root["Dante2"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_80__, __WEBPACK_EXTERNAL_MODULE_81__) {
return webpackJsonpDante2([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _App = __webpack_require__(1);

	var _dante = __webpack_require__(432);

	var _dante2 = _interopRequireDefault(_dante);

	var _draft = __webpack_require__(444);

	var _draft2 = _interopRequireDefault(_draft);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	module.exports = {
	  Dante: _App.Dante,
	  DanteEditor: _App.DanteEditor
	};

	//window.Dante = Dante
	//window.Dante.DanteEditor = DanteEditor

	/*
	export default class Dante2 {
	  constructor() {
	    this._name = 'Dante2';
	  }
	  get name() {
	    return this._name;
	  }
	}*/

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.DanteEditor = exports.Dante = undefined;

	var _possibleConstructorReturn2 = __webpack_require__(2);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(71);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _react = __webpack_require__(80);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(81);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _immutable = __webpack_require__(82);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _draftJs = __webpack_require__(83);

	var _DraftPasteProcessor = __webpack_require__(202);

	var _DraftPasteProcessor2 = _interopRequireDefault(_DraftPasteProcessor);

	var _draftConvert = __webpack_require__(223);

	var _isSoftNewlineEvent = __webpack_require__(385);

	var _isSoftNewlineEvent2 = _interopRequireDefault(_isSoftNewlineEvent);

	var _index = __webpack_require__(386);

	var _image = __webpack_require__(387);

	var _image2 = _interopRequireDefault(_image);

	var _link = __webpack_require__(389);

	var _link2 = _interopRequireDefault(_link);

	var _selection = __webpack_require__(388);

	var _addButton = __webpack_require__(390);

	var _addButton2 = _interopRequireDefault(_addButton);

	var _toolTip = __webpack_require__(391);

	var _toolTip2 = _interopRequireDefault(_toolTip);

	var _link3 = __webpack_require__(392);

	var _link4 = _interopRequireDefault(_link3);

	var _debug = __webpack_require__(393);

	var _debug2 = _interopRequireDefault(_debug);

	var _find_entities = __webpack_require__(396);

	var _find_entities2 = _interopRequireDefault(_find_entities);

	var _image3 = __webpack_require__(397);

	var _image4 = _interopRequireDefault(_image3);

	var _embed = __webpack_require__(427);

	var _embed2 = _interopRequireDefault(_embed);

	var _video = __webpack_require__(428);

	var _video2 = _interopRequireDefault(_video);

	var _placeholder = __webpack_require__(429);

	var _placeholder2 = _interopRequireDefault(_placeholder);

	var _save_content = __webpack_require__(430);

	var _save_content2 = _interopRequireDefault(_save_content);

	var _html2content = __webpack_require__(431);

	var _html2content2 = _interopRequireDefault(_html2content);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Dante = exports.Dante = function () {
	  function Dante(options) {
	    (0, _classCallCheck3['default'])(this, Dante);

	    if (options == null) {
	      options = {};
	    }
	    console.log("init editor Dante!");

	    // deep merge on config
	    var config = (0, _immutable.Map)((0, _immutable.fromJS)(this.defaultOptions(options)));

	    this.options = config.mergeDeep(options).toJS();
	    console.log(this.options);
	  }

	  Dante.prototype.defaultOptions = function defaultOptions(options) {
	    // default options
	    if (options == null) {
	      options = {};
	    }
	    var defaultOptions = {};
	    defaultOptions.el = 'app';
	    defaultOptions.content = "";
	    defaultOptions.read_only = false;
	    defaultOptions.spellcheck = false;
	    defaultOptions.title_placeholder = "Title";
	    defaultOptions.body_placeholder = "Write your story";
	    // @defaultOptions.api_key = "86c28a410a104c8bb58848733c82f840"

	    defaultOptions.widgets = [{
	      title: 'add an image',
	      icon: 'image',
	      type: 'image',
	      block: _image4['default'],
	      editable: true,
	      renderable: true,
	      breakOnContinuous: true,
	      wrapper_class: "graf graf--figure",
	      selected_class: "is-selected is-mediaFocused",
	      selectedFn: function selectedFn(block) {
	        var _block$getData$toJS = block.getData().toJS(),
	            direction = _block$getData$toJS.direction;

	        switch (direction) {
	          case "left":
	            return "graf--layoutOutsetLeft";
	          case "center":
	            return "";
	          case "wide":
	            return "sectionLayout--fullWidth";
	          case "fill":
	            return "graf--layoutFillWidth";
	        }
	      },
	      handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
	        var editorState = ctx.state.editorState;

	        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
	      },
	      handleEnterWithText: function handleEnterWithText(ctx, block) {
	        var editorState = ctx.state.editorState;

	        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
	      },

	      widget_options: {
	        displayOnInlineTooltip: true,
	        insertion: "upload",
	        insert_block: "image"
	      },
	      options: {
	        upload_url: options.upload_url,
	        upload_headers: options.upload_headers,
	        upload_formName: options.upload_formName,
	        upload_callback: options.image_upload_callback,
	        image_delete_callback: options.image_delete_callback,
	        image_caption_placeholder: options.image_caption_placeholder
	      }
	    }, {
	      icon: 'embed',
	      title: 'insert embed',
	      type: 'embed',
	      block: _embed2['default'],
	      editable: true,
	      renderable: true,
	      breakOnContinuous: true,
	      wrapper_class: "graf graf--mixtapeEmbed",
	      selected_class: "is-selected is-mediaFocused",
	      widget_options: {
	        displayOnInlineTooltip: true,
	        insertion: "placeholder",
	        insert_block: "embed"
	      },
	      options: {
	        endpoint: '//api.embed.ly/1/extract?key=' + options.api_key + '&url=',
	        placeholder: 'Paste a link to embed content from another site (e.g. Twitter) and press Enter'
	      },
	      handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
	        var editorState = ctx.state.editorState;

	        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
	      },
	      handleEnterWithText: function handleEnterWithText(ctx, block) {
	        var editorState = ctx.state.editorState;

	        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
	      }
	    }, {
	      icon: 'video',
	      title: 'insert video',
	      editable: true,
	      type: 'video',
	      block: _video2['default'],
	      renderable: true,
	      breakOnContinuous: true,
	      wrapper_class: "graf--figure graf--iframe",
	      selected_class: " is-selected is-mediaFocused",
	      widget_options: {
	        displayOnInlineTooltip: true,
	        insertion: "placeholder",
	        insert_block: "video"
	      },
	      options: {
	        endpoint: '//api.embed.ly/1/oembed?key=' + options.api_key + '&url=',
	        placeholder: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter',
	        caption: 'Type caption for embed (optional)'
	      },

	      handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
	        var editorState = ctx.state.editorState;

	        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
	      },
	      handleEnterWithText: function handleEnterWithText(ctx, block) {
	        var editorState = ctx.state.editorState;

	        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
	      }
	    }, {
	      renderable: true,
	      editable: true,
	      block: _placeholder2['default'],
	      type: 'placeholder',
	      wrapper_class: "is-embedable",
	      selected_class: " is-selected is-mediaFocused",
	      widget_options: {
	        displayOnInlineTooltip: false
	      },
	      handleEnterWithText: function handleEnterWithText(ctx, block) {
	        var editorState = ctx.state.editorState;

	        var data = {
	          provisory_text: block.getText(),
	          endpoint: block.getData().get('endpoint'),
	          type: block.getData().get('type')
	        };

	        return ctx.onChange((0, _index.resetBlockWithType)(editorState, data.type, data));
	      }
	    }];

	    defaultOptions.tooltips = [{
	      ref: 'insert_tooltip',
	      component: _toolTip2['default'],
	      displayOnSelection: true,
	      selectionElements: ["unstyled", "blockquote", "ordered-list", "unordered-list", "unordered-list-item", "ordered-list-item", "code-block", 'header-one', 'header-two', 'header-three', 'header-four'],
	      widget_options: {
	        block_types: [
	        // {label: 'p', style: 'unstyled'},
	        { label: 'h2', style: 'header-one', type: "block" }, { label: 'h3', style: 'header-two', type: "block" }, { label: 'h4', style: 'header-three', type: "block" }, { label: 'blockquote', style: 'blockquote', type: "block" }, { label: 'insertunorderedlist', style: 'unordered-list-item', type: "block" }, { label: 'insertorderedlist', style: 'ordered-list-item', type: "block" }, { label: 'code', style: 'code-block', type: "block" }, { label: 'bold', style: 'BOLD', type: "inline" }, { label: 'italic', style: 'ITALIC', type: "inline" }]
	      }
	    }, {
	      ref: 'add_tooltip',
	      component: _addButton2['default']
	    }, {
	      ref: 'anchor_popover',
	      component: _link2['default']
	    }, {
	      ref: 'image_popover',
	      component: _image2['default']
	    }];

	    defaultOptions.xhr = {
	      before_handler: null,
	      success_handler: null,
	      error_handler: null
	    };

	    defaultOptions.data_storage = {
	      url: null,
	      method: "POST",
	      success_handler: null,
	      failure_handler: null,
	      interval: 1500
	    };

	    defaultOptions.default_wrappers = [{ className: 'graf--p', block: 'unstyled' }, { className: 'graf--h2', block: 'header-one' }, { className: 'graf--h3', block: 'header-two' }, { className: 'graf--h4', block: 'header-three' }, { className: 'graf--blockquote', block: 'blockquote' }, { className: 'graf--insertunorderedlist', block: 'unordered-list-item' }, { className: 'graf--insertorderedlist', block: 'ordered-list-item' }, { className: 'graf--code', block: 'code-block' }, { className: 'graf--bold', block: 'BOLD' }, { className: 'graf--italic', block: 'ITALIC' }];

	    defaultOptions.continuousBlocks = ["unstyled", "blockquote", "ordered-list", "unordered-list", "unordered-list-item", "ordered-list-item", "code-block"];

	    defaultOptions.key_commands = {
	      "alt-shift": [{ key: 65, cmd: 'add-new-block' }],
	      "alt-cmd": [{ key: 49, cmd: 'toggle_block:header-one' }, { key: 50, cmd: 'toggle_block:header-two' }, { key: 53, cmd: 'toggle_block:blockquote' }],
	      "cmd": [{ key: 66, cmd: 'toggle_inline:BOLD' }, { key: 73, cmd: 'toggle_inline:ITALIC' }, { key: 75, cmd: 'insert:link' }]
	    };

	    defaultOptions.character_convert_mapping = {
	      '> ': "blockquote",
	      '*.': "unordered-list-item",
	      '* ': "unordered-list-item",
	      '- ': "unordered-list-item",
	      '1.': "ordered-list-item",
	      '# ': 'header-one',
	      '##': 'header-two',
	      '==': "unstyled",
	      '` ': "code-block"
	    };

	    return defaultOptions;
	  };

	  Dante.prototype.getContent = function getContent() {
	    //console.log @options.content
	    //console.log "IS POC DATA?", @options.content is PocData
	    //return PocData if @options.poc
	    //console.log @options.content , PocData
	    //PocData
	    return this.options.content;
	  };

	  Dante.prototype.render = function render() {
	    return this.editor = _reactDom2['default'].render(_react2['default'].createElement(DanteEditor, { content: this.getContent(), config: this.options }), document.getElementById(this.options.el));
	  };

	  return Dante;
	}();

	var DanteEditor = exports.DanteEditor = function (_React$Component) {
	  (0, _inherits3['default'])(DanteEditor, _React$Component);

	  function DanteEditor(props) {
	    (0, _classCallCheck3['default'])(this, DanteEditor);

	    //window.main_editor = @

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

	    _this.initializeState = _this.initializeState.bind(_this);
	    _this.refreshSelection = _this.refreshSelection.bind(_this);
	    _this.forceRender = _this.forceRender.bind(_this);
	    _this.onChange = _this.onChange.bind(_this);
	    _this.dispatchChangesToSave = _this.dispatchChangesToSave.bind(_this);
	    _this.setPreContent = _this.setPreContent.bind(_this);
	    _this.focus = _this.focus.bind(_this);
	    _this.getEditorState = _this.getEditorState.bind(_this);
	    _this.emitSerializedOutput = _this.emitSerializedOutput.bind(_this);
	    _this.decodeEditorContent = _this.decodeEditorContent.bind(_this);
	    _this.getTextFromEditor = _this.getTextFromEditor.bind(_this);
	    _this.getLocks = _this.getLocks.bind(_this);
	    _this.addLock = _this.addLock.bind(_this);
	    _this.removeLock = _this.removeLock.bind(_this);
	    _this.renderableBlocks = _this.renderableBlocks.bind(_this);
	    _this.defaultWrappers = _this.defaultWrappers.bind(_this);
	    _this.blockRenderer = _this.blockRenderer.bind(_this);
	    _this.handleBlockRenderer = _this.handleBlockRenderer.bind(_this);
	    _this.blockStyleFn = _this.blockStyleFn.bind(_this);
	    _this.getDataBlock = _this.getDataBlock.bind(_this);
	    _this.styleForBlock = _this.styleForBlock.bind(_this);
	    _this.handlePasteText = _this.handlePasteText.bind(_this);
	    _this.handleTXTPaste = _this.handleTXTPaste.bind(_this);
	    _this.handleHTMLPaste = _this.handleHTMLPaste.bind(_this);
	    _this.handlePasteImage = _this.handlePasteImage.bind(_this);
	    _this.handleDroppedFiles = _this.handleDroppedFiles.bind(_this);
	    _this.handleUpArrow = _this.handleUpArrow.bind(_this);
	    _this.handleDownArrow = _this.handleDownArrow.bind(_this);
	    _this.handleReturn = _this.handleReturn.bind(_this);
	    _this.handleBeforeInput = _this.handleBeforeInput.bind(_this);
	    _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
	    _this.findCommandKey = _this.findCommandKey.bind(_this);
	    _this.KeyBindingFn = _this.KeyBindingFn.bind(_this);
	    _this.updateBlockData = _this.updateBlockData.bind(_this);
	    _this.setDirection = _this.setDirection.bind(_this);
	    _this.toggleEditable = _this.toggleEditable.bind(_this);
	    _this.closePopOvers = _this.closePopOvers.bind(_this);
	    _this.relocateTooltips = _this.relocateTooltips.bind(_this);
	    _this.tooltipsWithProp = _this.tooltipsWithProp.bind(_this);
	    _this.tooltipHasSelectionElement = _this.tooltipHasSelectionElement.bind(_this);
	    _this.handleShowPopLinkOver = _this.handleShowPopLinkOver.bind(_this);
	    _this.handleHidePopLinkOver = _this.handleHidePopLinkOver.bind(_this);
	    _this.showPopLinkOver = _this.showPopLinkOver.bind(_this);
	    _this.hidePopLinkOver = _this.hidePopLinkOver.bind(_this);
	    _this.render = _this.render.bind(_this);
	    _this.decorator = new _draftJs.CompositeDecorator([{
	      strategy: _find_entities2['default'].bind(null, 'LINK', _this),
	      component: _link4['default']
	    }]);

	    _this.blockRenderMap = (0, _immutable.Map)({
	      "image": {
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

	    _this.extendedBlockRenderMap = _draftJs.DefaultDraftBlockRenderMap.merge(_this.blockRenderMap);

	    _this.state = {
	      editorState: _this.initializeState(),
	      read_only: _this.props.config.read_only,
	      blockRenderMap: _this.extendedBlockRenderMap,
	      locks: 0,
	      debug: _this.props.config.debug
	    };

	    _this.widgets = _this.props.config.widgets;
	    _this.tooltips = _this.props.config.tooltips;

	    _this.key_commands = _this.props.config.key_commands;

	    _this.continuousBlocks = _this.props.config.continuousBlocks;

	    _this.block_types = _this.props.config.block_types;

	    _this.default_wrappers = _this.props.config.default_wrappers;

	    _this.character_convert_mapping = _this.props.config.character_convert_mapping;

	    _this.save = new _save_content2['default']({
	      getLocks: _this.getLocks,
	      config: {
	        xhr: _this.props.config.xhr,
	        data_storage: _this.props.config.data_storage
	      },
	      editorState: _this.state.editorState,
	      editorContent: _this.emitSerializedOutput()
	    });
	    return _this;
	  }

	  DanteEditor.prototype.initializeState = function initializeState() {
	    if (this.props.content) {
	      //and @.props.content.trim() isnt ""
	      return this.decodeEditorContent(this.props.content);
	    } else {
	      return _draftJs.EditorState.createEmpty(this.decorator);
	    }
	  };

	  DanteEditor.prototype.refreshSelection = function refreshSelection(newEditorState) {
	    var editorState = this.state.editorState;
	    // Setting cursor position after inserting to content

	    var s = this.state.editorState.getSelection();
	    var c = editorState.getCurrentContent();
	    var focusOffset = s.getFocusOffset();
	    var anchorKey = s.getAnchorKey();

	    var selectionState = _draftJs.SelectionState.createEmpty(s.getAnchorKey());

	    // console.log anchorKey, focusOffset
	    selectionState = selectionState.merge({
	      anchorOffset: focusOffset,
	      focusKey: anchorKey,
	      focusOffset: focusOffset
	    });

	    var newState = _draftJs.EditorState.forceSelection(newEditorState, selectionState);

	    return this.onChange(newState);
	  };

	  DanteEditor.prototype.forceRender = function forceRender(editorState) {
	    var selection = this.state.editorState.getSelection();
	    var content = editorState.getCurrentContent();
	    var newEditorState = _draftJs.EditorState.createWithContent(content, this.decorator);

	    return this.refreshSelection(newEditorState);
	  };

	  DanteEditor.prototype.onChange = function onChange(editorState) {
	    var _this2 = this;

	    this.setPreContent();
	    this.setState({ editorState: editorState });

	    var currentBlock = (0, _index.getCurrentBlock)(this.state.editorState);
	    var blockType = currentBlock.getType();

	    if (!editorState.getSelection().isCollapsed()) {

	      var tooltip = this.tooltipsWithProp('displayOnSelection')[0];
	      if (!this.tooltipHasSelectionElement(tooltip, blockType)) {
	        return;
	      }

	      this.handleTooltipDisplayOn('displayOnSelection');
	    } else {
	      this.handleTooltipDisplayOn('displayOnSelection', false);
	    }

	    setTimeout(function () {
	      return _this2.relocateTooltips();
	    }, 0);

	    return this.dispatchChangesToSave();
	  };

	  DanteEditor.prototype.dispatchChangesToSave = function dispatchChangesToSave() {
	    var _this3 = this;

	    clearTimeout(this.saveTimeout);
	    return this.saveTimeout = setTimeout(function () {
	      return _this3.save.store(_this3.emitSerializedOutput());
	    }, 100);
	  };

	  DanteEditor.prototype.setPreContent = function setPreContent() {
	    var content = this.emitSerializedOutput();
	    return this.save.editorContent = content;
	  };

	  DanteEditor.prototype.focus = function focus() {};
	  //@props.refs.richEditor.focus()

	  DanteEditor.prototype.getEditorState = function getEditorState() {
	    return this.state.editorState;
	  };

	  DanteEditor.prototype.emitSerializedOutput = function emitSerializedOutput() {
	    var raw = (0, _draftJs.convertToRaw)(this.state.editorState.getCurrentContent());

	    return raw;
	  };

	  DanteEditor.prototype.decodeEditorContent = function decodeEditorContent(raw_as_json) {
	    var new_content = (0, _draftJs.convertFromRaw)(raw_as_json);
	    var editorState = void 0;

	    return editorState = _draftJs.EditorState.createWithContent(new_content, this.decorator);
	  };

	  //# title utils


	  DanteEditor.prototype.getTextFromEditor = function getTextFromEditor() {
	    var c = this.state.editorState.getCurrentContent();
	    var out = c.getBlocksAsArray().map(function (o) {
	      return o.getText();
	    }).join("\n");

	    return out;
	  };

	  DanteEditor.prototype.emitHTML2 = function emitHTML2() {
	    var html = void 0;

	    return html = (0, _draftConvert.convertToHTML)({
	      entityToHTML: function entityToHTML(entity, originalText) {
	        if (entity.type === 'LINK') {
	          return '<a href="' + entity.data.url + '">' + originalText + '</a>';
	        } else {
	          return originalText;
	        }
	      }

	    })(this.state.editorState.getCurrentContent());
	  };

	  DanteEditor.prototype.getLocks = function getLocks() {
	    return this.state.locks;
	  };

	  DanteEditor.prototype.addLock = function addLock() {
	    return this.setState({
	      locks: this.state.locks += 1 });
	  };

	  DanteEditor.prototype.removeLock = function removeLock() {
	    return this.setState({
	      locks: this.state.locks -= 1 });
	  };

	  DanteEditor.prototype.renderableBlocks = function renderableBlocks() {
	    return this.widgets.filter(function (o) {
	      return o.renderable;
	    }).map(function (o) {
	      return o.type;
	    });
	  };

	  DanteEditor.prototype.defaultWrappers = function defaultWrappers(blockType) {
	    return this.default_wrappers.filter(function (o) {
	      return o.block === blockType;
	    }).map(function (o) {
	      return o.className;
	    });
	  };

	  DanteEditor.prototype.blockRenderer = function blockRenderer(block) {

	    switch (block.getType()) {

	      case "atomic":

	        var entity = block.getEntityAt(0);
	        var entity_type = _draftJs.Entity.get(entity).getType();

	        break;
	    }

	    if (this.renderableBlocks().includes(block.getType())) {
	      return this.handleBlockRenderer(block);
	    }

	    return null;
	  };

	  DanteEditor.prototype.handleBlockRenderer = function handleBlockRenderer(block) {
	    var dataBlock = this.getDataBlock(block);
	    if (!dataBlock) {
	      return null;
	    }

	    var read_only = this.state.read_only ? false : null;
	    var editable = read_only !== null ? read_only : dataBlock.editable;

	    return {
	      component: eval(dataBlock.block),
	      editable: editable,
	      props: {
	        data: block.getData(),
	        getEditorState: this.getEditorState,
	        setEditorState: this.onChange,
	        addLock: this.addLock,
	        removeLock: this.removeLock,
	        getLocks: this.getLocks,
	        config: dataBlock.options
	      }
	    };

	    return null;
	  };

	  DanteEditor.prototype.blockStyleFn = function blockStyleFn(block) {
	    var currentBlock = (0, _index.getCurrentBlock)(this.state.editorState);
	    var is_selected = currentBlock.getKey() === block.getKey() ? "is-selected" : "";

	    if (this.renderableBlocks().includes(block.getType())) {
	      return this.styleForBlock(block, currentBlock, is_selected);
	    }

	    var defaultBlockClass = this.defaultWrappers(block.getType());
	    if (defaultBlockClass.length > 0) {
	      return 'graf ' + defaultBlockClass[0] + ' ' + is_selected;
	    } else {
	      return 'graf nana ' + is_selected;
	    }
	  };

	  DanteEditor.prototype.getDataBlock = function getDataBlock(block) {
	    return this.widgets.find(function (o) {
	      return o.type === block.getType();
	    });
	  };

	  DanteEditor.prototype.styleForBlock = function styleForBlock(block, currentBlock, is_selected) {
	    var dataBlock = this.getDataBlock(block);

	    if (!dataBlock) {
	      return null;
	    }

	    var selectedFn = dataBlock.selectedFn ? dataBlock.selectedFn(block) : null;
	    var selected_class = is_selected ? dataBlock.selected_class : '';

	    return dataBlock.wrapper_class + ' ' + selected_class + ' ' + selectedFn;
	  };

	  DanteEditor.prototype.handleTooltipDisplayOn = function handleTooltipDisplayOn(prop, display) {
	    var _this4 = this;

	    if (display == null) {
	      display = true;
	    }
	    return setTimeout(function () {
	      var items = _this4.tooltipsWithProp(prop);
	      return items.map(function (o) {
	        _this4.refs[o.ref].display(display);
	        return _this4.refs[o.ref].relocate();
	      });
	    }, 20);
	  };

	  DanteEditor.prototype.handlePasteText = function handlePasteText(text, html) {

	    // https://github.com/facebook/draft-js/issues/685
	    /*
	    html = "<p>chao</p>
	    <avv>aaa</avv>
	    <p>oli</p>
	    <img src='x'/>"
	    */

	    // if not html then fallback to default handler

	    if (!html) {
	      return this.handleTXTPaste(text, html);
	    }
	    if (html) {
	      return this.handleHTMLPaste(text, html);
	    }
	  };

	  DanteEditor.prototype.handleTXTPaste = function handleTXTPaste(text, html) {
	    var currentBlock = (0, _index.getCurrentBlock)(this.state.editorState);

	    var editorState = this.state.editorState;


	    switch (currentBlock.getType()) {
	      case "image":case "video":case "placeholder":
	        var newContent = _draftJs.Modifier.replaceText(editorState.getCurrentContent(), new _draftJs.SelectionState({
	          anchorKey: currentBlock.getKey(),
	          anchorOffset: 0,
	          focusKey: currentBlock.getKey(),
	          focusOffset: 2
	        }), text);

	        editorState = _draftJs.EditorState.push(editorState, newContent, 'replace-text');

	        this.onChange(editorState);

	        return true;
	      default:
	        return false;
	    }
	  };

	  DanteEditor.prototype.handleHTMLPaste = function handleHTMLPaste(text, html) {

	    var currentBlock = (0, _index.getCurrentBlock)(this.state.editorState);

	    // TODO: make this configurable
	    switch (currentBlock.getType()) {
	      case "image":case "video":case "placeholder":
	        return this.handleTXTPaste(text, html);
	        break;
	    }

	    var newContentState = (0, _html2content2['default'])(html, this.extendedBlockRenderMap);

	    var selection = this.state.editorState.getSelection();
	    var endKey = selection.getEndKey();

	    var content = this.state.editorState.getCurrentContent();
	    var blocksBefore = content.blockMap.toSeq().takeUntil(function (v) {
	      return v.key === endKey;
	    });
	    var blocksAfter = content.blockMap.toSeq().skipUntil(function (v) {
	      return v.key === endKey;
	    }).rest();

	    var newBlockKey = newContentState.blockMap.first().getKey();

	    var newBlockMap = blocksBefore.concat(newContentState.blockMap, blocksAfter).toOrderedMap();

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

	    var pushedContentState = _draftJs.EditorState.push(this.state.editorState, newContent, 'insert-fragment');

	    this.onChange(pushedContentState);

	    return true;
	  };

	  DanteEditor.prototype.handlePasteImage = function handlePasteImage(files) {
	    var _this5 = this;

	    //TODO: check file types
	    return files.map(function (file) {
	      var opts = {
	        url: URL.createObjectURL(file),
	        file: file
	      };

	      return _this5.onChange((0, _index.addNewBlock)(_this5.state.editorState, 'image', opts));
	    });
	  };

	  DanteEditor.prototype.handleDroppedFiles = function handleDroppedFiles(state, files) {
	    var _this6 = this;

	    return files.map(function (file) {
	      var opts = {
	        url: URL.createObjectURL(file),
	        file: file
	      };

	      return _this6.onChange((0, _index.addNewBlock)(_this6.state.editorState, 'image', opts));
	    });
	  };

	  DanteEditor.prototype.handleUpArrow = function handleUpArrow(e) {
	    var _this7 = this;

	    return setTimeout(function () {
	      return _this7.forceRender(_this7.state.editorState);
	    }, 10);
	  };

	  DanteEditor.prototype.handleDownArrow = function handleDownArrow(e) {
	    var _this8 = this;

	    return setTimeout(function () {
	      return _this8.forceRender(_this8.state.editorState);
	    }, 10);
	  };

	  DanteEditor.prototype.handleReturn = function handleReturn(e) {
	    if (this.props.handleReturn) {
	      if (this.props.handleReturn()) {
	        return true;
	      }
	    }

	    var editorState = this.state.editorState;


	    if (!e.altKey && !e.metaKey && !e.ctrlKey) {
	      var currentBlock = (0, _index.getCurrentBlock)(editorState);
	      var blockType = currentBlock.getType();
	      var selection = editorState.getSelection();

	      var config_block = this.getDataBlock(currentBlock);

	      if (currentBlock.getText().length === 0) {

	        if (config_block && config_block.handleEnterWithoutText) {
	          config_block.handleEnterWithText(this, currentBlock);
	          this.closePopOvers();
	          return true;
	        }

	        //TODO turn this in configurable
	        switch (blockType) {
	          case "header-one":
	            this.onChange((0, _index.resetBlockWithType)(editorState, "unstyled"));
	            return true;
	            break;
	          default:
	            return false;
	        }
	      }

	      if (currentBlock.getText().length > 0) {

	        if (blockType === "unstyled") {
	          // hack hackety hack
	          // https://github.com/facebook/draft-js/issues/304
	          var newContent = _draftJs.Modifier.splitBlock(this.state.editorState.getCurrentContent(), this.state.editorState.getSelection());

	          var newEditorState = _draftJs.EditorState.push(this.state.editorState, newContent, 'insert-characters');
	          this.onChange(newEditorState);

	          setTimeout(function () {
	            //TODO: check is element is in viewport
	            var a = document.getElementsByClassName("is-selected");
	            var pos = a[0].getBoundingClientRect();
	            return window.scrollTo(0, pos.top + window.scrollY - 100);
	          }, 0);

	          return true;
	        }

	        if (config_block && config_block.handleEnterWithText) {
	          config_block.handleEnterWithText(this, currentBlock);
	          this.closePopOvers();
	          return true;
	        }

	        if (currentBlock.getLength() === selection.getStartOffset()) {
	          if (this.continuousBlocks.indexOf(blockType) < 0) {
	            this.onChange((0, _index.addNewBlockAt)(editorState, currentBlock.getKey()));
	            return true;
	          }
	        }

	        return false;
	      }

	      // selection.isCollapsed() and # should we check collapsed here?
	      if (currentBlock.getLength() === selection.getStartOffset()) {
	        //or (config_block && config_block.breakOnContinuous))
	        // it will match the unstyled for custom blocks
	        if (this.continuousBlocks.indexOf(blockType) < 0) {
	          this.onChange((0, _index.addNewBlockAt)(editorState, currentBlock.getKey()));
	          return true;
	        }
	        return false;
	      }

	      return false;
	    }
	  };

	  //return false

	  // TODO: make this configurable


	  DanteEditor.prototype.handleBeforeInput = function handleBeforeInput(chars) {
	    var currentBlock = (0, _index.getCurrentBlock)(this.state.editorState);
	    var blockType = currentBlock.getType();
	    var selection = this.state.editorState.getSelection();

	    var editorState = this.state.editorState;

	    // close popovers

	    if (currentBlock.getText().length !== 0) {
	      //@closeInlineButton()
	      this.closePopOvers();
	    }

	    // handle space on link
	    var endOffset = selection.getEndOffset();
	    var endKey = currentBlock.getEntityAt(endOffset - 1);
	    var endEntityType = endKey && _draftJs.Entity.get(endKey).getType();
	    var afterEndKey = currentBlock.getEntityAt(endOffset);
	    var afterEndEntityType = afterEndKey && _draftJs.Entity.get(afterEndKey).getType();

	    // will insert blank space when link found
	    if (chars === ' ' && endEntityType === 'LINK' && afterEndEntityType !== 'LINK') {
	      var newContentState = _draftJs.Modifier.insertText(editorState.getCurrentContent(), selection, ' ');
	      var newEditorState = _draftJs.EditorState.push(editorState, newContentState, 'insert-characters');
	      this.onChange(newEditorState);
	      return true;
	    }

	    // block transform
	    if (blockType.indexOf('atomic') === 0) {
	      return false;
	    }

	    var blockLength = currentBlock.getLength();
	    if (selection.getAnchorOffset() > 1 || blockLength > 1) {
	      return false;
	    }

	    var blockTo = this.character_convert_mapping[currentBlock.getText() + chars];

	    console.log('BLOCK TO SHOW: ' + blockTo);

	    if (!blockTo) {
	      return false;
	    }

	    this.onChange((0, _index.resetBlockWithType)(editorState, blockTo));

	    return true;
	  };

	  // TODO: make this configurable


	  DanteEditor.prototype.handleKeyCommand = function handleKeyCommand(command) {
	    var editorState = this.state.editorState;

	    var currentBlockType = void 0,
	        newBlockType = void 0;

	    if (this.props.handleKeyCommand && this.props.handleKeyCommand(command)) {
	      return true;
	    }

	    if (command === 'add-new-block') {
	      this.onChange((0, _index.addNewBlock)(editorState, 'blockquote'));
	      return true;
	    }

	    var block = (0, _index.getCurrentBlock)(editorState);

	    if (command.indexOf('toggle_inline:') === 0) {
	      newBlockType = command.split(':')[1];
	      currentBlockType = block.getType();
	      this.onChange(_draftJs.RichUtils.toggleInlineStyle(editorState, newBlockType));
	      return true;
	    }

	    if (command.indexOf('toggle_block:') === 0) {
	      newBlockType = command.split(':')[1];
	      currentBlockType = block.getType();

	      this.onChange(_draftJs.RichUtils.toggleBlockType(editorState, newBlockType));
	      return true;
	    }

	    var newState = _draftJs.RichUtils.handleKeyCommand(this.state.editorState, command);
	    if (newState) {
	      this.onChange(newState);
	      return true;
	    }

	    return false;
	  };

	  DanteEditor.prototype.findCommandKey = function findCommandKey(opt, command) {
	    // console.log "COMMAND find: #{opt} #{command}"
	    return this.key_commands[opt].find(function (o) {
	      return o.key === command;
	    });
	  };

	  DanteEditor.prototype.KeyBindingFn = function KeyBindingFn(e) {

	    //⌘ + B / Ctrl + B   Bold
	    //⌘ + I / Ctrl + I   Italic
	    //⌘ + K / Ctrl + K   Turn into link
	    //⌘ + Alt + 1 / Ctrl + Alt + 1   Header
	    //⌘ + Alt + 2 / Ctrl + Alt + 2   Sub-Header
	    //⌘ + Alt + 5 / Ctrl + Alt + 5   Quote (Press once for a block quote, again for a pull quote and a third time to turn off quote)

	    var cmd = void 0;
	    if (e.altKey) {
	      if (e.shiftKey) {
	        cmd = this.findCommandKey("alt-shift", e.which);
	        if (cmd) {
	          return cmd.cmd;
	        }

	        return (0, _draftJs.getDefaultKeyBinding)(e);
	      }

	      if (e.ctrlKey || e.metaKey) {
	        cmd = this.findCommandKey("alt-cmd", e.which);
	        if (cmd) {
	          return cmd.cmd;
	        }
	        return (0, _draftJs.getDefaultKeyBinding)(e);
	      }
	    } else if (e.ctrlKey || e.metaKey) {
	      cmd = this.findCommandKey("cmd", e.which);
	      if (cmd) {
	        return cmd.cmd;
	      }
	      return (0, _draftJs.getDefaultKeyBinding)(e);
	    }

	    return (0, _draftJs.getDefaultKeyBinding)(e);
	  };

	  // will update block state todo: movo to utils


	  DanteEditor.prototype.updateBlockData = function updateBlockData(block, options) {
	    var data = block.getData();
	    var newData = data.merge(options);
	    var newState = (0, _index.updateDataOfBlock)(this.state.editorState, block, newData);
	    // this fixes enter from image caption
	    return this.forceRender(newState);
	  };

	  DanteEditor.prototype.setDirection = function setDirection(direction_type) {
	    var contentState = this.state.editorState.getCurrentContent();
	    var selectionState = this.state.editorState.getSelection();
	    var block = contentState.getBlockForKey(selectionState.anchorKey);

	    return this.updateBlockData(block, { direction: direction_type });
	  };

	  //# read only utils


	  DanteEditor.prototype.toggleEditable = function toggleEditable() {
	    this.closePopOvers();

	    return this.setState({ read_only: !this.state.read_only }, this.testEmitAndDecode);
	  };

	  DanteEditor.prototype.closePopOvers = function closePopOvers() {
	    var _this9 = this;

	    return this.tooltips.map(function (o) {
	      return _this9.refs[o.ref].hide();
	    });
	  };

	  DanteEditor.prototype.relocateTooltips = function relocateTooltips() {
	    var _this10 = this;

	    return this.tooltips.map(function (o) {
	      return _this10.refs[o.ref].relocate();
	    });
	  };

	  DanteEditor.prototype.tooltipsWithProp = function tooltipsWithProp(prop) {
	    return this.tooltips.filter(function (o) {
	      return o[prop];
	    });
	  };

	  DanteEditor.prototype.tooltipHasSelectionElement = function tooltipHasSelectionElement(tooltip, element) {
	    return tooltip.selectionElements.includes(element);
	  };

	  //################################
	  // TODO: this methods belongs to popovers/link
	  //################################

	  DanteEditor.prototype.handleShowPopLinkOver = function handleShowPopLinkOver(e) {
	    return this.showPopLinkOver();
	  };

	  DanteEditor.prototype.handleHidePopLinkOver = function handleHidePopLinkOver(e) {
	    return this.hidePopLinkOver();
	  };

	  DanteEditor.prototype.showPopLinkOver = function showPopLinkOver(el) {
	    // handles popover display
	    // using anchor or from popover

	    var parent_el = _reactDom2['default'].findDOMNode(this);

	    // set url first in order to calculate popover width
	    var coords = void 0;
	    this.refs.anchor_popover.setState({ url: el ? el.href : this.refs.anchor_popover.state.url });

	    if (el) {
	      coords = this.refs.anchor_popover.relocate(el);
	    }

	    if (coords) {
	      this.refs.anchor_popover.setPosition(coords);
	    }

	    this.refs.anchor_popover.setState({ show: true });

	    this.isHover = true;
	    return this.cancelHide();
	  };

	  DanteEditor.prototype.hidePopLinkOver = function hidePopLinkOver() {
	    var _this11 = this;

	    return this.hideTimeout = setTimeout(function () {
	      return _this11.refs.anchor_popover.hide();
	    }, 300);
	  };

	  DanteEditor.prototype.cancelHide = function cancelHide() {
	    // console.log "Cancel Hide"
	    return clearTimeout(this.hideTimeout);
	  };

	  //##############################

	  DanteEditor.prototype.render = function render() {
	    var _this12 = this;

	    return _react2['default'].createElement(
	      'div',
	      { id: 'content', suppressContentEditableWarning: true },
	      _react2['default'].createElement(
	        'article',
	        { className: 'postArticle' },
	        _react2['default'].createElement(
	          'div',
	          { className: 'postContent' },
	          _react2['default'].createElement(
	            'div',
	            { className: 'notesSource' },
	            _react2['default'].createElement(
	              'div',
	              { id: 'editor', className: 'postField postField--body' },
	              _react2['default'].createElement(
	                'section',
	                { className: 'section--first section--last' },
	                _react2['default'].createElement(
	                  'div',
	                  { className: 'section-divider layoutSingleColumn' },
	                  _react2['default'].createElement('hr', { className: 'section-divider' })
	                ),
	                _react2['default'].createElement(
	                  'div',
	                  { className: 'section-content' },
	                  _react2['default'].createElement(
	                    'div',
	                    { ref: 'richEditor', className: 'section-inner layoutSingleColumn',
	                      onClick: this.focus },
	                    _react2['default'].createElement(_draftJs.Editor, {
	                      blockRendererFn: this.blockRenderer,
	                      editorState: this.state.editorState,
	                      onChange: this.onChange,
	                      onUpArrow: this.handleUpArrow,
	                      onDownArrow: this.handleDownArrow,
	                      handleReturn: this.handleReturn,
	                      blockRenderMap: this.state.blockRenderMap,
	                      blockStyleFn: this.blockStyleFn,
	                      handlePastedText: this.handlePasteText,
	                      handlePastedFiles: this.handlePasteImage,
	                      handleDroppedFiles: this.handleDroppedFiles,
	                      handleKeyCommand: this.handleKeyCommand,
	                      keyBindingFn: this.KeyBindingFn,
	                      handleBeforeInput: this.handleBeforeInput,
	                      readOnly: this.state.read_only,
	                      placeholder: this.props.config.body_placeholder,
	                      ref: 'editor'
	                    })
	                  )
	                )
	              )
	            )
	          )
	        )
	      ),
	      this.tooltips.map(function (o, i) {
	        return _react2['default'].createElement(o.component, {
	          ref: o.ref,
	          key: i,
	          editor: _this12,
	          editorState: _this12.state.editorState,
	          onChange: _this12.onChange,
	          configTooltip: o,
	          widget_options: o.widget_options,
	          showPopLinkOver: _this12.showPopLinkOver,
	          hidePopLinkOver: _this12.hidePopLinkOver,
	          handleOnMouseOver: _this12.handleShowPopLinkOver,
	          handleOnMouseOut: _this12.handleHidePopLinkOver
	        });
	      }),
	      this.state.debug ? _react2['default'].createElement(_debug2['default'], { locks: this.state.locks, editor: this }) : undefined
	    );
	  };

	  return DanteEditor;
	}(_react2['default'].Component);

/***/ },

/***/ 80:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_80__;

/***/ },

/***/ 81:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_81__;

/***/ },

/***/ 386:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.addNewBlockAt = exports.updateTextOfBlock = exports.updateDataOfBlock = exports.resetBlockWithType = exports.addNewBlock = exports.getCurrentBlock = exports.getNode = exports.getDefaultBlockData = undefined;

	var _immutable = __webpack_require__(82);

	var _draftJs = __webpack_require__(83);

	/*
	Used from [react-rte](https://github.com/brijeshb42/medium-draft)
	by [brijeshb42](https://github.com/brijeshb42/medium-draft)
	*/

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

	var getNode = exports.getNode = function getNode() {
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
	  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  var contentState = editorState.getCurrentContent();
	  var selectionState = editorState.getSelection();
	  var key = selectionState.getStartKey();
	  var blockMap = contentState.getBlockMap();
	  var block = blockMap.get(key);

	  var newText = '';
	  console.log("DATA FOR PLACEHOLDER!", data);
	  var text = block.getText();
	  if (block.getLength() >= 2) {
	    newText = text.substr(1);
	  }

	  /*if(data.text){
	    newText = data.text
	  }*/

	  //let newText = data.text

	  var newBlock = block.merge({
	    text: newText,
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

	var updateTextOfBlock = exports.updateTextOfBlock = function updateTextOfBlock(editorState, block, text) {
	  var contentState = editorState.getCurrentContent();
	  var newBlock = block.merge({
	    text: text
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

/***/ },

/***/ 387:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(2);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(71);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(80);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(81);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(83);

	var _selection = __webpack_require__(388);

	var _index = __webpack_require__(386);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var DanteImagePopover = function (_React$Component) {
	  (0, _inherits3['default'])(DanteImagePopover, _React$Component);

	  function DanteImagePopover(props) {
	    (0, _classCallCheck3['default'])(this, DanteImagePopover);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

	    _this.display = _this.display.bind(_this);
	    _this.show = _this.show.bind(_this);
	    _this.hide = _this.hide.bind(_this);
	    _this._toggleScaled = _this._toggleScaled.bind(_this);
	    _this.scale = _this.scale.bind(_this);
	    _this.collapse = _this.collapse.bind(_this);
	    _this.relocate = _this.relocate.bind(_this);
	    _this.componentWillReceiveProps = _this.componentWillReceiveProps.bind(_this);
	    _this.handleClick = _this.handleClick.bind(_this);
	    _this.state = {
	      position: {
	        top: 0,
	        left: 0
	      },
	      show: false,
	      scaled: false,
	      buttons: [{ type: "left" }, { type: "center" }, { type: "fill" }, { type: "wide" }]
	    };
	    return _this;
	  }

	  DanteImagePopover.prototype.display = function display(b) {
	    if (b) {
	      return this.show();
	    } else {
	      return this.hide();
	    }
	  };

	  DanteImagePopover.prototype.show = function show() {
	    return this.setState({
	      show: true });
	  };

	  DanteImagePopover.prototype.hide = function hide() {
	    return this.setState({
	      show: false });
	  };

	  DanteImagePopover.prototype.setPosition = function setPosition(coords) {
	    return this.setState({
	      position: coords });
	  };

	  DanteImagePopover.prototype._toggleScaled = function _toggleScaled(ev) {
	    if (this.state.scaled) {
	      return this.collapse();
	    } else {
	      return this.scale();
	    }
	  };

	  DanteImagePopover.prototype.scale = function scale() {
	    return this.setState({
	      scaled: true });
	  };

	  DanteImagePopover.prototype.collapse = function collapse() {
	    return this.setState({
	      scaled: false });
	  };

	  DanteImagePopover.prototype.relocate = function relocate() {
	    var editorState = this.props.editorState;


	    if (editorState.getSelection().isCollapsed()) {

	      var currentBlock = (0, _index.getCurrentBlock)(editorState);
	      var blockType = currentBlock.getType();

	      var contentState = editorState.getCurrentContent();
	      var selectionState = editorState.getSelection();

	      var block = contentState.getBlockForKey(selectionState.anchorKey);

	      var nativeSelection = (0, _selection.getSelection)(window);
	      if (!nativeSelection.rangeCount) {
	        return;
	      }

	      var node = (0, _index.getNode)();

	      var selectionBoundary = (0, _selection.getSelectionRect)(nativeSelection);
	      var coords = selectionBoundary;

	      var parent = _reactDom2['default'].findDOMNode(this.props.editor);
	      var parentBoundary = parent.getBoundingClientRect();

	      this.display(blockType === "image");

	      if (blockType === "image") {
	        selectionBoundary = node.anchorNode.parentNode.parentNode.parentNode.getBoundingClientRect();
	        var el = this.refs.image_popover;
	        var padd = el.offsetWidth / 2;
	        return this.setPosition({
	          top: selectionBoundary.top - parentBoundary.top + 60,
	          left: selectionBoundary.left + selectionBoundary.width / 2 - padd
	        });
	      }
	    } else {
	      return this.hide();
	    }
	  };

	  DanteImagePopover.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
	    return this.collapse();
	  };

	  DanteImagePopover.prototype.getStyle = function getStyle() {
	    if (!this.state.position) {
	      return {};
	    }
	  };

	  DanteImagePopover.prototype.handleClick = function handleClick(item) {
	    return this.props.editor.setDirection(item.type);
	  };

	  DanteImagePopover.prototype.render = function render() {
	    var _this2 = this;

	    return _react2['default'].createElement(
	      'div',
	      {
	        ref: 'image_popover',
	        className: 'dante-popover popover--Aligntooltip popover--top popover--animated ' + (this.state.show ? 'is-active' : undefined),
	        style: { top: this.state.position.top,
	          left: this.state.position.left }
	      },
	      _react2['default'].createElement(
	        'div',
	        { className: 'popover-inner' },
	        _react2['default'].createElement(
	          'ul',
	          { className: 'dante-menu-buttons' },
	          this.state.buttons.map(function (item, i) {
	            return _react2['default'].createElement(DanteImagePopoverItem, {
	              item: item,
	              handleClick: _this2.handleClick,
	              key: i
	            });
	          })
	        )
	      ),
	      _react2['default'].createElement('div', { className: 'popover-arrow' })
	    );
	  };

	  return DanteImagePopover;
	}(_react2['default'].Component);

	var DanteImagePopoverItem = function (_React$Component2) {
	  (0, _inherits3['default'])(DanteImagePopoverItem, _React$Component2);

	  function DanteImagePopoverItem() {
	    (0, _classCallCheck3['default'])(this, DanteImagePopoverItem);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this3 = (0, _possibleConstructorReturn3['default'])(this, _React$Component2.call.apply(_React$Component2, [this].concat(args)));

	    _this3.handleClick = _this3.handleClick.bind(_this3);
	    _this3.render = _this3.render.bind(_this3);
	    return _this3;
	  }

	  DanteImagePopoverItem.prototype.handleClick = function handleClick(e) {
	    e.preventDefault();
	    return this.props.handleClick(this.props.item);
	  };

	  DanteImagePopoverItem.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'li',
	      {
	        className: 'dante-menu-button align-' + this.props.item.type,
	        onMouseDown: this.handleClick },
	      _react2['default'].createElement('span', { className: 'tooltip-icon dante-icon-image-' + this.props.item.type })
	    );
	  };

	  return DanteImagePopoverItem;
	}(_react2['default'].Component);

	exports['default'] = DanteImagePopover;
	module.exports = exports['default'];

/***/ },

/***/ 388:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
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

/***/ },

/***/ 389:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(2);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(71);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(80);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(81);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _index = __webpack_require__(386);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var DanteAnchorPopover = function (_React$Component) {
	  (0, _inherits3['default'])(DanteAnchorPopover, _React$Component);

	  function DanteAnchorPopover(props) {
	    (0, _classCallCheck3['default'])(this, DanteAnchorPopover);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

	    _this.display = _this.display.bind(_this);
	    _this.show = _this.show.bind(_this);
	    _this.hide = _this.hide.bind(_this);
	    _this.relocate = _this.relocate.bind(_this);
	    _this.render = _this.render.bind(_this);
	    _this.state = {
	      position: {
	        top: 0,
	        left: 0
	      },
	      show: false,
	      url: ""
	    };
	    return _this;
	  }

	  DanteAnchorPopover.prototype.display = function display(b) {
	    if (b) {
	      return this.show();
	    } else {
	      return this.hide();
	    }
	  };

	  DanteAnchorPopover.prototype.show = function show() {
	    return this.setState({
	      show: true });
	  };

	  DanteAnchorPopover.prototype.hide = function hide() {
	    return this.setState({
	      show: false });
	  };

	  DanteAnchorPopover.prototype.setPosition = function setPosition(coords) {
	    return this.setState({
	      position: coords });
	  };

	  DanteAnchorPopover.prototype.relocate = function relocate(node) {
	    if (node == null) {
	      node = null;
	    }
	    if (!node) {
	      return;
	    }

	    var editorState = this.props.editorState;

	    var currentBlock = (0, _index.getCurrentBlock)(editorState);
	    var blockType = currentBlock.getType();

	    var contentState = editorState.getCurrentContent();
	    var selectionState = editorState.getSelection();

	    var selectionBoundary = node.getBoundingClientRect();
	    var coords = selectionBoundary;

	    var el = this.refs.dante_popover;
	    var padd = el.offsetWidth / 2;

	    var parent = _reactDom2['default'].findDOMNode(this.props.editor);
	    var parentBoundary = parent.getBoundingClientRect();

	    return {
	      top: selectionBoundary.top - parentBoundary.top + 160,
	      left: selectionBoundary.left + selectionBoundary.width / 2 - padd
	    };
	  };

	  DanteAnchorPopover.prototype.render = function render() {
	    var position = this.state.position;

	    var style = {
	      left: position.left,
	      top: position.top,
	      visibility: '' + (this.state.show ? 'visible' : 'hidden')
	    };
	    return _react2['default'].createElement(
	      'div',
	      {
	        ref: 'dante_popover',
	        className: 'dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active',
	        style: style,
	        onMouseOver: this.props.handleOnMouseOver,
	        onMouseOut: this.props.handleOnMouseOut
	      },
	      _react2['default'].createElement(
	        'div',
	        { className: 'popover-inner' },
	        _react2['default'].createElement(
	          'a',
	          { href: this.props.url, target: '_blank' },
	          this.state.url
	        )
	      ),
	      _react2['default'].createElement('div', { className: 'popover-arrow' })
	    );
	  };

	  return DanteAnchorPopover;
	}(_react2['default'].Component);

	exports['default'] = DanteAnchorPopover;
	module.exports = exports['default'];

/***/ },

/***/ 390:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(2);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(71);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(80);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(81);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(83);

	var _index = __webpack_require__(386);

	var _selection = __webpack_require__(388);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var DanteInlineTooltip = function (_React$Component) {
	  (0, _inherits3['default'])(DanteInlineTooltip, _React$Component);

	  function DanteInlineTooltip(props) {
	    (0, _classCallCheck3['default'])(this, DanteInlineTooltip);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

	    _this.display = _this.display.bind(_this);
	    _this.show = _this.show.bind(_this);
	    _this.hide = _this.hide.bind(_this);
	    _this._toggleScaled = _this._toggleScaled.bind(_this);
	    _this.scale = _this.scale.bind(_this);
	    _this.collapse = _this.collapse.bind(_this);
	    _this.componentWillReceiveProps = _this.componentWillReceiveProps.bind(_this);
	    _this.clickOnFileUpload = _this.clickOnFileUpload.bind(_this);
	    _this.handlePlaceholder = _this.handlePlaceholder.bind(_this);
	    _this.insertImage = _this.insertImage.bind(_this);
	    _this.handleFileInput = _this.handleFileInput.bind(_this);
	    _this.widgets = _this.widgets.bind(_this);
	    _this.clickHandler = _this.clickHandler.bind(_this);
	    _this.relocate = _this.relocate.bind(_this);
	    _this.state = {
	      position: { top: 0, left: 0 },
	      show: false,
	      scaled: false
	    };
	    return _this;
	  }

	  DanteInlineTooltip.prototype.display = function display(b) {
	    if (b) {
	      return this.show();
	    } else {
	      return this.hide();
	    }
	  };

	  DanteInlineTooltip.prototype.show = function show() {
	    return this.setState({
	      show: true });
	  };

	  DanteInlineTooltip.prototype.hide = function hide() {
	    return this.setState({
	      show: false });
	  };

	  DanteInlineTooltip.prototype.setPosition = function setPosition(coords) {
	    return this.setState({
	      position: coords });
	  };

	  DanteInlineTooltip.prototype._toggleScaled = function _toggleScaled(ev) {
	    if (this.state.scaled) {
	      return this.collapse();
	    } else {
	      return this.scale();
	    }
	  };

	  DanteInlineTooltip.prototype.scale = function scale() {
	    return this.setState({
	      scaled: true });
	  };

	  DanteInlineTooltip.prototype.collapse = function collapse() {
	    return this.setState({
	      scaled: false });
	  };

	  DanteInlineTooltip.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
	    return this.collapse();
	  };

	  DanteInlineTooltip.prototype.activeClass = function activeClass() {
	    //if @props.show then "is-active" else ""
	    if (this.isActive()) {
	      return "is-active";
	    } else {
	      return "";
	    }
	  };

	  DanteInlineTooltip.prototype.isActive = function isActive() {
	    return this.state.show;
	  };

	  DanteInlineTooltip.prototype.scaledClass = function scaledClass() {
	    if (this.state.scaled) {
	      return "is-scaled";
	    } else {
	      return "";
	    }
	  };

	  DanteInlineTooltip.prototype.scaledWidth = function scaledWidth() {
	    if (this.state.scaled) {
	      return "124";
	    } else {
	      return "0";
	    }
	  };

	  DanteInlineTooltip.prototype.clickOnFileUpload = function clickOnFileUpload() {
	    this.refs.fileInput.click();
	    this.collapse();
	    return this.hide();
	  };

	  DanteInlineTooltip.prototype.handlePlaceholder = function handlePlaceholder(input) {
	    var opts = {
	      type: input.widget_options.insert_block,
	      placeholder: input.options.placeholder,
	      endpoint: input.options.endpoint
	    };

	    return this.props.onChange((0, _index.resetBlockWithType)(this.props.editorState, 'placeholder', opts));
	  };

	  DanteInlineTooltip.prototype.insertImage = function insertImage(file) {
	    var opts = {
	      url: URL.createObjectURL(file),
	      file: file
	    };

	    return this.props.onChange((0, _index.addNewBlock)(this.props.editorState, 'image', opts));
	  };

	  DanteInlineTooltip.prototype.handleFileInput = function handleFileInput(e) {
	    var fileList = e.target.files;
	    // TODO: support multiple file uploads
	    /*
	    Object.keys(fileList).forEach (o)=>
	      @.insertImage(fileList[0])
	    */
	    return this.insertImage(fileList[0]);
	  };

	  DanteInlineTooltip.prototype.widgets = function widgets() {
	    return this.props.editor.widgets;
	  };

	  DanteInlineTooltip.prototype.clickHandler = function clickHandler(e, type) {
	    var request_block = this.widgets().find(function (o) {
	      return o.icon === type;
	    });

	    switch (request_block.widget_options.insertion) {
	      case "upload":
	        return this.clickOnFileUpload(e, request_block);
	      case "placeholder":
	        return this.handlePlaceholder(request_block);
	      default:
	        return console.log('WRONG TYPE FOR ' + request_block.widget_options.insertion);
	    }
	  };

	  DanteInlineTooltip.prototype.getItems = function getItems() {
	    return this.widgets().filter(function (o) {
	      return o.widget_options.displayOnInlineTooltip;
	    });
	  };

	  DanteInlineTooltip.prototype.isDescendant = function isDescendant(parent, child) {
	    var node = child.parentNode;
	    while (node !== null) {
	      if (node === parent) {
	        return true;
	      }
	      node = node.parentNode;
	    }
	    return false;
	  };

	  DanteInlineTooltip.prototype.relocate = function relocate() {
	    var editorState = this.props.editorState;


	    if (editorState.getSelection().isCollapsed()) {

	      var currentBlock = (0, _index.getCurrentBlock)(editorState);
	      var blockType = currentBlock.getType();

	      var contentState = editorState.getCurrentContent();
	      var selectionState = editorState.getSelection();

	      var block = contentState.getBlockForKey(selectionState.anchorKey);

	      var nativeSelection = (0, _selection.getSelection)(window);
	      if (!nativeSelection.rangeCount) {
	        return;
	      }

	      var node = (0, _index.getNode)();

	      var selectionBoundary = (0, _selection.getSelectionRect)(nativeSelection);
	      var coords = selectionBoundary; //utils.getSelectionDimensions(node)

	      var parent = _reactDom2['default'].findDOMNode(this.props.editor);
	      var parentBoundary = parent.getBoundingClientRect();

	      // hide if selected node is not in editor
	      // debugger
	      //console.log @isDescendant(parent, nativeSelection.anchorNode)

	      if (!this.isDescendant(parent, nativeSelection.anchorNode)) {
	        this.hide();
	        return;
	      }

	      // checkeamos si esta vacio
	      this.display(block.getText().length === 0 && blockType === "unstyled");
	      return this.setPosition({
	        top: coords.top + window.scrollY,
	        left: coords.left + window.scrollX - 60
	      });

	      /*
	      @refs.image_popover.display(blockType is "image")
	       if blockType is "image"
	        selectionBoundary = node.anchorNode.parentNode.parentNode.parentNode.getBoundingClientRect()
	        *el = document.querySelector("#dante_image_popover")
	        el = @refs.image_popover.refs.image_popover
	        padd   = el.offsetWidth / 2
	        @refs.image_popover.setPosition
	          top: selectionBoundary.top - parentBoundary.top + 60
	          left: selectionBoundary.left + (selectionBoundary.width / 2) - padd
	         *@setState
	        *  image_popover_position:
	        *    top: selectionBoundary.top - parentBoundary.top + 60
	        *    left: selectionBoundary.left + (selectionBoundary.width / 2) - padd
	        *
	      */
	    } else {
	      return this.hide();
	    }
	  };

	  DanteInlineTooltip.prototype.render = function render() {
	    var _this2 = this;

	    return _react2['default'].createElement(
	      'div',
	      {
	        className: 'inlineTooltip ' + this.activeClass() + ' ' + this.scaledClass(),
	        style: this.state.position
	      },
	      _react2['default'].createElement(
	        'button',
	        {
	          className: 'inlineTooltip-button control',
	          title: 'Close Menu',
	          'data-action': 'inline-menu',
	          onClick: this._toggleScaled
	        },
	        _react2['default'].createElement('span', { className: 'tooltip-icon dante-icon-plus' })
	      ),
	      _react2['default'].createElement(
	        'div',
	        {
	          className: 'inlineTooltip-menu',
	          style: { width: this.scaledWidth() + 'px' }
	        },
	        this.getItems().map(function (item, i) {
	          return _react2['default'].createElement(InlineTooltipItem, {
	            item: item,
	            key: i,
	            clickHandler: _this2.clickHandler
	          });
	        }),
	        _react2['default'].createElement('input', {
	          type: 'file',
	          style: { display: 'none' },
	          ref: 'fileInput',
	          multiple: 'multiple',
	          onChange: this.handleFileInput
	        })
	      )
	    );
	  };

	  return DanteInlineTooltip;
	}(_react2['default'].Component);

	var InlineTooltipItem = function (_React$Component2) {
	  (0, _inherits3['default'])(InlineTooltipItem, _React$Component2);

	  function InlineTooltipItem() {
	    (0, _classCallCheck3['default'])(this, InlineTooltipItem);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this3 = (0, _possibleConstructorReturn3['default'])(this, _React$Component2.call.apply(_React$Component2, [this].concat(args)));

	    _this3.clickHandler = _this3.clickHandler.bind(_this3);
	    return _this3;
	  }

	  InlineTooltipItem.prototype.clickHandler = function clickHandler(e) {
	    e.preventDefault();
	    return this.props.clickHandler(e, this.props.item.icon);
	  };

	  InlineTooltipItem.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'button',
	      {
	        className: 'inlineTooltip-button scale',
	        title: this.props.title,
	        onMouseDown: this.clickHandler
	      },
	      _react2['default'].createElement('span', { className: 'tooltip-icon dante-icon-' + this.props.item.icon })
	    );
	  };

	  return InlineTooltipItem;
	}(_react2['default'].Component);

	exports['default'] = DanteInlineTooltip;
	module.exports = exports['default'];

/***/ },

/***/ 391:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(2);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(71);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(80);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(81);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(83);

	var _selection = __webpack_require__(388);

	var _index = __webpack_require__(386);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var DanteTooltip = function (_React$Component) {
	  (0, _inherits3['default'])(DanteTooltip, _React$Component);

	  function DanteTooltip(props) {
	    (0, _classCallCheck3['default'])(this, DanteTooltip);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

	    _this._clickInlineHandler = _this._clickInlineHandler.bind(_this);
	    _this.display = _this.display.bind(_this);
	    _this.show = _this.show.bind(_this);
	    _this.hide = _this.hide.bind(_this);
	    _this.relocate = _this.relocate.bind(_this);
	    _this._clickBlockHandler = _this._clickBlockHandler.bind(_this);
	    _this.displayLinkMode = _this.displayLinkMode.bind(_this);
	    _this.displayActiveMenu = _this.displayActiveMenu.bind(_this);
	    _this._enableLinkMode = _this._enableLinkMode.bind(_this);
	    _this._disableLinkMode = _this._disableLinkMode.bind(_this);
	    _this.handleInputEnter = _this.handleInputEnter.bind(_this);
	    _this.confirmLink = _this.confirmLink.bind(_this);
	    _this.inlineItems = _this.inlineItems.bind(_this);
	    _this.blockItems = _this.blockItems.bind(_this);
	    _this.getDefaultValue = _this.getDefaultValue.bind(_this);
	    _this.getVisibleSelectionRect = _draftJs.getVisibleSelectionRect;
	    _this.state = {
	      link_mode: false,
	      show: false,
	      position: {}
	    };
	    return _this;
	  }

	  DanteTooltip.prototype._clickInlineHandler = function _clickInlineHandler(ev, style) {
	    var _this2 = this;

	    ev.preventDefault();

	    this.props.onChange(_draftJs.RichUtils.toggleInlineStyle(this.props.editorState, style));

	    return setTimeout(function () {
	      return _this2.relocate();
	    }, 0);
	  };

	  DanteTooltip.prototype.display = function display(b) {
	    if (b) {
	      return this.show();
	    } else {
	      return this.hide();
	    }
	  };

	  DanteTooltip.prototype.show = function show() {
	    return this.setState({
	      show: true });
	  };

	  DanteTooltip.prototype.hide = function hide() {
	    return this.setState({
	      link_mode: false,
	      show: false
	    });
	  };

	  DanteTooltip.prototype.setPosition = function setPosition(coords) {
	    return this.setState({
	      position: coords });
	  };

	  DanteTooltip.prototype.isDescendant = function isDescendant(parent, child) {
	    var node = child.parentNode;
	    while (node !== null) {
	      if (node === parent) {
	        return true;
	      }
	      node = node.parentNode;
	    }
	    return false;
	  };

	  DanteTooltip.prototype.relocate = function relocate() {

	    var currentBlock = (0, _index.getCurrentBlock)(this.props.editorState);
	    var blockType = currentBlock.getType();
	    // display tooltip only for unstyled

	    if (this.props.configTooltip.selectionElements.indexOf(blockType) < 0) {
	      this.hide();
	      return;
	    }

	    if (this.state.link_mode) {
	      return;
	    }
	    if (!this.state.show) {
	      return;
	    }

	    var el = this.refs.dante_menu;
	    var padd = el.offsetWidth / 2;

	    var nativeSelection = (0, _selection.getSelection)(window);
	    if (!nativeSelection.rangeCount) {
	      return;
	    }

	    var selectionBoundary = (0, _selection.getSelectionRect)(nativeSelection);

	    var parent = _reactDom2['default'].findDOMNode(this.props.editor);
	    var parentBoundary = parent.getBoundingClientRect();

	    // hide if selected node is not in editor
	    if (!this.isDescendant(parent, nativeSelection.anchorNode)) {
	      this.hide();
	      return;
	    }

	    var top = selectionBoundary.top - parentBoundary.top - -90 - 5;
	    var left = selectionBoundary.left + selectionBoundary.width / 2 - padd;

	    if (!top || !left) {
	      return;
	    }

	    // console.log "SET SHOW FOR TOOLTIP INSERT MENU"
	    return this.setState({
	      show: true,
	      position: {
	        left: left,
	        top: top
	      }
	    });
	  };

	  DanteTooltip.prototype._clickBlockHandler = function _clickBlockHandler(ev, style) {
	    var _this3 = this;

	    ev.preventDefault();

	    this.props.onChange(_draftJs.RichUtils.toggleBlockType(this.props.editorState, style));

	    return setTimeout(function () {
	      return _this3.relocate();
	    }, 0);
	  };

	  DanteTooltip.prototype.displayLinkMode = function displayLinkMode() {
	    if (this.state.link_mode) {
	      return "dante-menu--linkmode";
	    } else {
	      return "";
	    }
	  };

	  DanteTooltip.prototype.displayActiveMenu = function displayActiveMenu() {
	    if (this.state.show) {
	      return "dante-menu--active";
	    } else {
	      return "";
	    }
	  };

	  DanteTooltip.prototype._enableLinkMode = function _enableLinkMode(ev) {
	    ev.preventDefault();
	    return this.setState({
	      link_mode: true });
	  };

	  DanteTooltip.prototype._disableLinkMode = function _disableLinkMode(ev) {
	    ev.preventDefault();
	    return this.setState({
	      link_mode: false,
	      url: ""
	    });
	  };

	  DanteTooltip.prototype.hideMenu = function hideMenu() {
	    return this.hide();
	  };

	  DanteTooltip.prototype.handleInputEnter = function handleInputEnter(e) {
	    if (e.which === 13) {
	      return this.confirmLink(e);
	    }
	  };

	  DanteTooltip.prototype.confirmLink = function confirmLink(e) {
	    e.preventDefault();
	    var editorState = this.props.editorState;

	    var urlValue = e.currentTarget.value;
	    var contentState = editorState.getCurrentContent();
	    var selection = editorState.getSelection();

	    var opts = {
	      url: urlValue,
	      showPopLinkOver: this.props.showPopLinkOver,
	      hidePopLinkOver: this.props.hidePopLinkOver
	    };

	    var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', opts);

	    if (selection.isCollapsed()) {
	      console.log("COLLAPSED SKIPPING LINK");
	      return;
	    }

	    this.props.onChange(_draftJs.RichUtils.toggleLink(editorState, selection, entityKey));

	    return this._disableLinkMode(e);
	  };

	  DanteTooltip.prototype.getPosition = function getPosition() {
	    var pos = this.state.position;
	    return pos;
	  };

	  DanteTooltip.prototype.inlineItems = function inlineItems() {
	    return this.props.widget_options.block_types.filter(function (o) {
	      return o.type === "inline";
	    });
	  };

	  DanteTooltip.prototype.blockItems = function blockItems() {
	    return this.props.widget_options.block_types.filter(function (o) {
	      return o.type === "block";
	    });
	  };

	  DanteTooltip.prototype.getDefaultValue = function getDefaultValue() {
	    var _this4 = this;

	    if (this.refs.dante_menu_input) {
	      this.refs.dante_menu_input.value = "";
	    }

	    var currentBlock = (0, _index.getCurrentBlock)(this.props.editorState);
	    var blockType = currentBlock.getType();
	    var selection = this.props.editor.state.editorState.getSelection();
	    var selectedEntity = null;
	    var defaultUrl = null;
	    return currentBlock.findEntityRanges(function (character) {
	      var entityKey = character.getEntity();
	      selectedEntity = entityKey;
	      return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === 'LINK';
	    }, function (start, end) {
	      var selStart = selection.getAnchorOffset();
	      var selEnd = selection.getFocusOffset();
	      if (selection.getIsBackward()) {
	        selStart = selection.getFocusOffset();
	        selEnd = selection.getAnchorOffset();
	      }

	      if (start === selStart && end === selEnd) {
	        defaultUrl = _draftJs.Entity.get(selectedEntity).getData().url;
	        return _this4.refs.dante_menu_input.value = defaultUrl;
	      }
	    });
	  };

	  DanteTooltip.prototype.render = function render() {
	    var _this5 = this;

	    return _react2['default'].createElement(
	      'div',
	      {
	        id: 'dante-menu',
	        ref: 'dante_menu',
	        className: 'dante-menu ' + this.displayActiveMenu() + ' ' + this.displayLinkMode(),
	        style: this.getPosition()
	      },
	      _react2['default'].createElement(
	        'div',
	        { className: 'dante-menu-linkinput' },
	        _react2['default'].createElement('input', {
	          className: 'dante-menu-input',
	          ref: 'dante_menu_input',
	          placeholder: 'Paste or type a link',
	          onKeyPress: this.handleInputEnter,
	          defaultValue: this.getDefaultValue()
	        }),
	        _react2['default'].createElement('div', { className: 'dante-menu-button', onMouseDown: this._disableLinkMode })
	      ),
	      _react2['default'].createElement(
	        'ul',
	        { className: 'dante-menu-buttons' },
	        this.blockItems().map(function (item, i) {
	          return _react2['default'].createElement(DanteTooltipItem, {
	            key: i,
	            item: item,
	            handleClick: _this5._clickBlockHandler,
	            editorState: _this5.props.editorState,
	            type: 'block',
	            currentStyle: _this5.props.editorState.getCurrentInlineStyle
	          });
	        }),
	        _react2['default'].createElement(DanteTooltipLink, {
	          editorState: this.props.editorState,
	          enableLinkMode: this._enableLinkMode
	        }),
	        this.inlineItems().map(function (item, i) {
	          return _react2['default'].createElement(DanteTooltipItem, {
	            key: i,
	            item: item,
	            type: 'inline',
	            editorState: _this5.props.editorState,
	            handleClick: _this5._clickInlineHandler
	          });
	        })
	      )
	    );
	  };

	  return DanteTooltip;
	}(_react2['default'].Component);

	var DanteTooltipItem = function (_React$Component2) {
	  (0, _inherits3['default'])(DanteTooltipItem, _React$Component2);

	  function DanteTooltipItem() {
	    (0, _classCallCheck3['default'])(this, DanteTooltipItem);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this6 = (0, _possibleConstructorReturn3['default'])(this, _React$Component2.call.apply(_React$Component2, [this].concat(args)));

	    _this6.handleClick = _this6.handleClick.bind(_this6);
	    _this6.activeClass = _this6.activeClass.bind(_this6);
	    _this6.isActive = _this6.isActive.bind(_this6);
	    _this6.activeClassInline = _this6.activeClassInline.bind(_this6);
	    _this6.activeClassBlock = _this6.activeClassBlock.bind(_this6);
	    _this6.render = _this6.render.bind(_this6);
	    return _this6;
	  }

	  DanteTooltipItem.prototype.handleClick = function handleClick(ev) {
	    return this.props.handleClick(ev, this.props.item.style);
	  };

	  DanteTooltipItem.prototype.activeClass = function activeClass() {
	    if (this.isActive()) {
	      return "active";
	    } else {
	      return "";
	    }
	  };

	  DanteTooltipItem.prototype.isActive = function isActive() {
	    if (this.props.type === "block") {
	      return this.activeClassBlock();
	    } else {
	      return this.activeClassInline();
	    }
	  };

	  DanteTooltipItem.prototype.activeClassInline = function activeClassInline() {
	    if (!this.props.editorState) {
	      return;
	    }
	    //console.log @props.item
	    return this.props.editorState.getCurrentInlineStyle().has(this.props.item.style);
	  };

	  DanteTooltipItem.prototype.activeClassBlock = function activeClassBlock() {
	    //console.log "EDITOR STATE", @props.editorState
	    if (!this.props.editorState) {
	      return;
	    }
	    var selection = this.props.editorState.getSelection();
	    var blockType = this.props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
	    return this.props.item.style === blockType;
	  };

	  DanteTooltipItem.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'li',
	      { className: 'dante-menu-button ' + this.activeClass(), onMouseDown: this.handleClick },
	      _react2['default'].createElement('i', { className: 'dante-icon dante-icon-' + this.props.item.label, 'data-action': 'bold' })
	    );
	  };

	  return DanteTooltipItem;
	}(_react2['default'].Component);

	var DanteTooltipLink = function (_React$Component3) {
	  (0, _inherits3['default'])(DanteTooltipLink, _React$Component3);

	  function DanteTooltipLink() {
	    (0, _classCallCheck3['default'])(this, DanteTooltipLink);

	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    var _this7 = (0, _possibleConstructorReturn3['default'])(this, _React$Component3.call.apply(_React$Component3, [this].concat(args)));

	    _this7.promptForLink = _this7.promptForLink.bind(_this7);
	    return _this7;
	  }

	  DanteTooltipLink.prototype.promptForLink = function promptForLink(ev) {
	    var selection = this.props.editorState.getSelection();
	    if (!selection.isCollapsed()) {
	      return this.props.enableLinkMode(ev);
	    }
	  };

	  DanteTooltipLink.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'li',
	      { className: 'dante-menu-button', onMouseDown: this.promptForLink },
	      _react2['default'].createElement(
	        'i',
	        { className: 'dante-icon icon-createlink', 'data-action': 'createlink' },
	        'link'
	      )
	    );
	  };

	  return DanteTooltipLink;
	}(_react2['default'].Component);

	exports['default'] = DanteTooltip;
	module.exports = exports['default'];

/***/ },

/***/ 392:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(2);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(71);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(80);

	var _react2 = _interopRequireDefault(_react);

	var _draftJs = __webpack_require__(83);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Link = function (_React$Component) {
	  (0, _inherits3['default'])(Link, _React$Component);

	  function Link(props) {
	    (0, _classCallCheck3['default'])(this, Link);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

	    _this._validateLink = _this._validateLink.bind(_this);
	    _this._checkProtocol = _this._checkProtocol.bind(_this);
	    _this._showPopLinkOver = _this._showPopLinkOver.bind(_this);
	    _this._hidePopLinkOver = _this._hidePopLinkOver.bind(_this);
	    _this.isHover = false;
	    return _this;
	  }

	  Link.prototype._validateLink = function _validateLink() {
	    var pattern = new RegExp('^(https?:\/\/)?' + // protocol
	    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|' + // domain name
	    '((\d{1,3}\.){3}\d{1,3}))' + // OR ip (v4) address
	    '(\:\d+)?(\/[-a-z\d%_.~+]*)*' + // port and path
	    '(\?[&a-z\d%_.~+=-]*)?' + // query string
	    '(\#[-a-z\d_]*)?$', 'i'); // fragment locater
	    if (!pattern.test(str)) {
	      alert("Please enter a valid URL.");
	      return false;
	    } else {
	      return true;
	    }
	  };

	  Link.prototype._checkProtocol = function _checkProtocol() {
	    return console.log("xcvd");
	  };

	  Link.prototype._showPopLinkOver = function _showPopLinkOver(e) {
	    if (!this.data.showPopLinkOver) {
	      return;
	    }
	    return this.data.showPopLinkOver(this.refs.link);
	  };

	  Link.prototype._hidePopLinkOver = function _hidePopLinkOver(e) {
	    if (!this.data.hidePopLinkOver) {
	      return;
	    }
	    return this.data.hidePopLinkOver();
	  };

	  Link.prototype.render = function render() {
	    this.data = _draftJs.Entity.get(this.props.entityKey).getData();

	    return _react2['default'].createElement(
	      'a',
	      {
	        ref: 'link',
	        href: this.data.url,
	        className: 'markup--anchor',
	        onMouseOver: this._showPopLinkOver,
	        onMouseOut: this._hidePopLinkOver
	      },
	      this.props.children
	    );
	  };

	  return Link;
	}(_react2['default'].Component);

	exports['default'] = Link;
	module.exports = exports['default'];

/***/ },

/***/ 393:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _stringify = __webpack_require__(394);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(2);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(71);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(80);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var Debug = function (_React$Component) {
	  (0, _inherits3["default"])(Debug, _React$Component);

	  function Debug() {
	    (0, _classCallCheck3["default"])(this, Debug);

	    var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this));

	    _this.handleToggleReadOnly = _this.handleToggleReadOnly.bind(_this);
	    _this.handleTestEmitAndDecode = _this.handleTestEmitAndDecode.bind(_this);
	    _this.handleTestEmitTEXT = _this.handleTestEmitTEXT.bind(_this);
	    _this.testEmitAndDecode = _this.testEmitAndDecode.bind(_this);
	    _this.testEmitTEXT = _this.testEmitTEXT.bind(_this);
	    _this.logState = _this.logState.bind(_this);
	    _this.toggleDisplay = _this.toggleDisplay.bind(_this);
	    _this.open = _this.open.bind(_this);
	    _this.render = _this.render.bind(_this);
	    _this.state = {
	      output: "",
	      display: "none"
	    };
	    return _this;
	  }

	  Debug.prototype.handleToggleReadOnly = function handleToggleReadOnly(e) {
	    e.preventDefault();
	    this.props.editor.toggleEditable();
	    return false;
	  };

	  Debug.prototype.handleTestEmitAndDecode = function handleTestEmitAndDecode(e) {
	    e.preventDefault();
	    return this.testEmitAndDecode();
	  };

	  Debug.prototype.handleTestEmitTEXT = function handleTestEmitTEXT(e) {
	    e.preventDefault();
	    return this.testEmitTEXT();
	  };

	  Debug.prototype.testEmitAndDecode = function testEmitAndDecode(e) {
	    var raw_as_json = this.props.editor.emitSerializedOutput();
	    this.props.editor.setState({
	      editorState: this.props.editor.decodeEditorContent(raw_as_json) }, this.logState((0, _stringify2["default"])(raw_as_json)));
	    return false;
	  };

	  Debug.prototype.testEmitTEXT = function testEmitTEXT() {
	    var text = this.props.editor.getTextFromEditor();
	    return this.logState(text);
	  };

	  Debug.prototype.logState = function logState(raw) {
	    return this.setState({ output: raw }, this.open);
	  };

	  Debug.prototype.toggleDisplay = function toggleDisplay(e) {
	    e.preventDefault();
	    var d = this.state.display === "block" ? "none" : this.state.display;
	    return this.setState({
	      display: d });
	  };

	  Debug.prototype.open = function open() {
	    return this.setState({
	      display: "block" });
	  };

	  Debug.prototype.render = function render() {
	    return _react2["default"].createElement(
	      "div",
	      null,
	      _react2["default"].createElement(
	        "div",
	        { className: "debugControls" },
	        _react2["default"].createElement(
	          "ul",
	          null,
	          _react2["default"].createElement(
	            "li",
	            null,
	            " LOCKS: ",
	            this.props.editor.state.locks,
	            " "
	          ),
	          _react2["default"].createElement(
	            "li",
	            null,
	            _react2["default"].createElement(
	              "a",
	              { href: "#", onClick: this.handleToggleReadOnly },
	              "EDITABLE: ",
	              this.props.editor.state.read_only ? 'NO' : 'YES'
	            )
	          ),
	          _react2["default"].createElement(
	            "li",
	            null,
	            _react2["default"].createElement(
	              "a",
	              { href: "#", onClick: this.handleTestEmitTEXT },
	              "EDITOR TEXT"
	            )
	          ),
	          _react2["default"].createElement(
	            "li",
	            null,
	            _react2["default"].createElement(
	              "a",
	              { href: "#", onClick: this.handleTestEmitAndDecode },
	              "EDITOR STATE"
	            )
	          )
	        )
	      ),
	      _react2["default"].createElement(
	        "div",
	        { className: "debugZone", style: { display: this.state.display } },
	        _react2["default"].createElement("a", { href: "#", className: "dante-debug-close close", onClick: this.toggleDisplay }),
	        _react2["default"].createElement(
	          "div",
	          { className: "debugOutput" },
	          _react2["default"].createElement(
	            "h2",
	            null,
	            "EDITOR OUTPUT"
	          ),
	          this.state.output.length > 0 ? _react2["default"].createElement(
	            "pre",
	            null,
	            this.state.output
	          ) : undefined
	        )
	      )
	    );
	  };

	  return Debug;
	}(_react2["default"].Component);

	exports["default"] = Debug;
	module.exports = exports["default"];

/***/ },

/***/ 396:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _draftJs = __webpack_require__(83);

	//TODO: what the f*ck is happening here? ;-;
	var findEntities = function findEntities(entityType, instance, contentBlock, callback) {
	  return contentBlock.findEntityRanges(function (_this) {
	    return function (character) {
	      var entityKey, opts, res;
	      entityKey = character.getEntity();
	      return res = entityKey !== null && _draftJs.Entity.get(entityKey).getType() === entityType, res ? (opts = {
	        showPopLinkOver: instance.showPopLinkOver,
	        hidePopLinkOver: instance.hidePopLinkOver
	      }, _draftJs.Entity.mergeData(entityKey, opts)) : void 0, res;
	    };
	  }(undefined), callback);
	};

	exports['default'] = findEntities;
	module.exports = exports['default'];

/***/ },

/***/ 397:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _assign = __webpack_require__(398);

	var _assign2 = _interopRequireDefault(_assign);

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(2);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(71);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(80);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(81);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(83);

	var _axios = __webpack_require__(402);

	var _axios2 = _interopRequireDefault(_axios);

	var _index = __webpack_require__(386);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var ImageBlock = function (_React$Component) {
	  (0, _inherits3['default'])(ImageBlock, _React$Component);

	  function ImageBlock(props) {
	    (0, _classCallCheck3['default'])(this, ImageBlock);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

	    _this.blockPropsSrc = _this.blockPropsSrc.bind(_this);
	    _this.defaultUrl = _this.defaultUrl.bind(_this);
	    _this.defaultAspectRatio = _this.defaultAspectRatio.bind(_this);
	    _this.updateData = _this.updateData.bind(_this);
	    _this.replaceImg = _this.replaceImg.bind(_this);
	    _this.startLoader = _this.startLoader.bind(_this);
	    _this.stopLoader = _this.stopLoader.bind(_this);
	    _this.handleUpload = _this.handleUpload.bind(_this);
	    _this.aspectRatio = _this.aspectRatio.bind(_this);
	    _this.updateDataSelection = _this.updateDataSelection.bind(_this);
	    _this.handleGrafFigureSelectImg = _this.handleGrafFigureSelectImg.bind(_this);
	    _this.getUploadUrl = _this.getUploadUrl.bind(_this);
	    _this.uploadFile = _this.uploadFile.bind(_this);
	    _this.uploadCompleted = _this.uploadCompleted.bind(_this);
	    _this.updateProgressBar = _this.updateProgressBar.bind(_this);
	    _this.placeHolderEnabled = _this.placeHolderEnabled.bind(_this);
	    _this.placeholderText = _this.placeholderText.bind(_this);
	    _this.handleFocus = _this.handleFocus.bind(_this);
	    _this.render = _this.render.bind(_this);
	    var existing_data = _this.props.block.getData().toJS();

	    _this.config = _this.props.blockProps.config;
	    _this.file = _this.props.blockProps.data.get('file');
	    _this.state = {
	      loading: false,
	      selected: false,
	      loading_progress: 0,
	      enabled: false,
	      caption: _this.defaultPlaceholder(),
	      direction: existing_data.direction || "center",
	      width: 0,
	      height: 0,
	      file: null,
	      url: _this.blockPropsSrc() || _this.defaultUrl(existing_data),
	      aspect_ratio: _this.defaultAspectRatio(existing_data)
	    };
	    return _this;
	  }

	  ImageBlock.prototype.blockPropsSrc = function blockPropsSrc() {
	    // console.log @.props.blockProps.data.src
	    return this.props.blockProps.data.src;
	  };
	  /*
	  debugger
	  block = @.props
	  entity = block.block.getEntityAt(0)
	  if entity
	    data = Entity.get(entity).getData().src
	  else
	    null
	  */

	  ImageBlock.prototype.defaultUrl = function defaultUrl(data) {
	    if (data.url) {
	      return data.url;
	    }

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

	  ImageBlock.prototype.defaultPlaceholder = function defaultPlaceholder() {
	    return this.props.blockProps.config.image_caption_placeholder;
	  };

	  ImageBlock.prototype.defaultAspectRatio = function defaultAspectRatio(data) {
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

	  ImageBlock.prototype.getAspectRatio = function getAspectRatio(w, h) {
	    var maxWidth = 1000;
	    var maxHeight = 1000;
	    var ratio = 0;
	    var width = w; // Current image width
	    var height = h; // Current image height

	    // Check if the current width is larger than the max
	    if (width > maxWidth) {
	      ratio = maxWidth / width; // get ratio for scaling image
	      height = height * ratio; // Reset height to match scaled image
	      width = width * ratio; // Reset width to match scaled image

	      // Check if current height is larger than max
	    } else if (height > maxHeight) {
	      ratio = maxHeight / height; // get ratio for scaling image
	      width = width * ratio; // Reset width to match scaled image
	      height = height * ratio; // Reset height to match scaled image
	    }

	    var fill_ratio = height / width * 100;
	    var result = { width: width, height: height, ratio: fill_ratio };
	    // console.log result
	    return result;
	  };

	  // will update block state


	  ImageBlock.prototype.updateData = function updateData() {
	    var blockProps = this.props.blockProps;
	    var block = this.props.block;
	    var getEditorState = this.props.blockProps.getEditorState;
	    var setEditorState = this.props.blockProps.setEditorState;

	    var data = block.getData();
	    var newData = data.merge(this.state).merge({ forceUpload: false });
	    return setEditorState((0, _index.updateDataOfBlock)(getEditorState(), block, newData));
	  };

	  ImageBlock.prototype.replaceImg = function replaceImg() {
	    var _this2 = this;

	    this.img = new Image();
	    this.img.src = this.refs.image_tag.src;
	    this.setState({
	      url: this.img.src });
	    var self = this;
	    // exit only when not blob and not forceUload
	    if (!this.img.src.includes("blob:") && !this.props.block.data.get("forceUpload")) {
	      return;
	    }
	    return this.img.onload = function () {
	      _this2.setState({
	        width: _this2.img.width,
	        height: _this2.img.height,
	        aspect_ratio: self.getAspectRatio(_this2.img.width, _this2.img.height)
	      });

	      return _this2.handleUpload();
	    };
	  };

	  ImageBlock.prototype.startLoader = function startLoader() {
	    return this.setState({
	      loading: true });
	  };

	  ImageBlock.prototype.stopLoader = function stopLoader() {
	    return this.setState({
	      loading: false });
	  };

	  ImageBlock.prototype.handleUpload = function handleUpload() {
	    this.startLoader();
	    this.props.blockProps.addLock();
	    this.updateData();
	    return this.uploadFile();
	  };

	  ImageBlock.prototype.componentDidMount = function componentDidMount() {
	    return this.replaceImg();
	  };

	  ImageBlock.prototype.aspectRatio = function aspectRatio() {
	    return {
	      maxWidth: '' + this.state.aspect_ratio.width,
	      maxHeight: '' + this.state.aspect_ratio.height,
	      ratio: '' + this.state.aspect_ratio.height
	    };
	  };

	  ImageBlock.prototype.updateDataSelection = function updateDataSelection() {
	    var _props$blockProps = this.props.blockProps,
	        getEditorState = _props$blockProps.getEditorState,
	        setEditorState = _props$blockProps.setEditorState;

	    var newselection = getEditorState().getSelection().merge({
	      anchorKey: this.props.block.getKey(),
	      focusKey: this.props.block.getKey()
	    });

	    return setEditorState(_draftJs.EditorState.forceSelection(getEditorState(), newselection));
	  };

	  ImageBlock.prototype.handleGrafFigureSelectImg = function handleGrafFigureSelectImg(e) {
	    e.preventDefault();
	    return this.setState({ selected: true }, this.updateDataSelection);
	  };

	  //main_editor.onChange(main_editor.state.editorState)

	  ImageBlock.prototype.coords = function coords() {
	    return {
	      maxWidth: this.state.aspect_ratio.width + 'px',
	      maxHeight: this.state.aspect_ratio.height + 'px'
	    };
	  };

	  ImageBlock.prototype.getBase64Image = function getBase64Image(img) {
	    var canvas = document.createElement("canvas");
	    canvas.width = img.width;
	    canvas.height = img.height;
	    var ctx = canvas.getContext("2d");
	    ctx.drawImage(img, 0, 0);
	    var dataURL = canvas.toDataURL("image/png");

	    return dataURL;
	  };

	  ImageBlock.prototype.formatData = function formatData() {
	    var formData = new FormData();
	    if (this.file) {
	      var formName = this.config.upload_formName || 'file';

	      formData.append(formName, this.file);
	      return formData;
	    } else {
	      formData.append('url', this.props.blockProps.data.get("url"));
	      return formData;
	    }
	  };

	  ImageBlock.prototype.getUploadUrl = function getUploadUrl() {
	    var url = this.config.upload_url;
	    if (typeof url === "function") {
	      return url();
	    } else {
	      return url;
	    }
	  };

	  ImageBlock.prototype.getUploadHeaders = function getUploadHeaders() {
	    return this.config.upload_headers || {};
	  };

	  ImageBlock.prototype.uploadFile = function uploadFile() {
	    var _this3 = this;

	    var handleUp = void 0;
	    (0, _axios2['default'])({
	      method: 'post',
	      url: this.getUploadUrl(),
	      headers: this.getUploadHeaders(),
	      data: this.formatData(),
	      onUploadProgress: function onUploadProgress(e) {
	        return _this3.updateProgressBar(e);
	      }
	    }).then(function (result) {
	      _this3.uploadCompleted(result.data);
	      _this3.props.blockProps.removeLock();
	      _this3.stopLoader();
	      _this3.file = null;

	      if (_this3.config.upload_callback) {
	        return _this3.config.upload_callback(response, _this3);
	      }
	    })['catch'](function (error) {
	      _this3.props.blockProps.removeLock();
	      _this3.stopLoader();

	      console.log('ERROR: got error uploading file ' + error);
	      if (_this3.config.upload_error_callback) {
	        return _this3.config.upload_error_callback(error, _this3);
	      }
	    });

	    return handleUp = function handleUp(json_response) {
	      return _this3.uploadCompleted(json_response, n);
	    };
	  };

	  ImageBlock.prototype.uploadCompleted = function uploadCompleted(json) {
	    return this.setState({ url: json.url }, this.updateData);
	  };

	  ImageBlock.prototype.updateProgressBar = function updateProgressBar(e) {
	    var complete = this.state.loading_progress;
	    if (e.lengthComputable) {
	      complete = e.loaded / e.total * 100;
	      complete = complete != null ? complete : { complete: 0 };
	      this.setState({
	        loading_progress: complete });
	      return console.log('complete: ' + complete);
	    }
	  };

	  ImageBlock.prototype.placeHolderEnabled = function placeHolderEnabled() {
	    return this.state.enabled || this.props.block.getText();
	  };

	  ImageBlock.prototype.placeholderText = function placeholderText() {
	    if (this.placeHolderEnabled()) {
	      return "";
	    }
	    return "Write caption for image (optional)";
	  };

	  ImageBlock.prototype.handleFocus = function handleFocus(e) {
	    var _this4 = this;

	    // console.log "focus on placeholder"
	    return setTimeout(function () {
	      return _this4.setState({
	        enabled: true });
	    }, 0);
	  };

	  ImageBlock.prototype.render = function render() {

	    return _react2['default'].createElement(
	      'div',
	      { ref: 'image_tag2', suppressContentEditableWarning: true },
	      _react2['default'].createElement(
	        'div',
	        { className: 'aspectRatioPlaceholder is-locked',
	          style: this.coords(),
	          onClick: this.handleGrafFigureSelectImg },
	        _react2['default'].createElement('div', { style: { paddingBottom: this.state.aspect_ratio.ratio + '%' },
	          className: 'aspect-ratio-fill' }),
	        _react2['default'].createElement('img', { src: this.state.url,
	          ref: 'image_tag',
	          height: this.state.aspect_ratio.height,
	          width: this.state.aspect_ratio.width,
	          className: 'graf-image' }),
	        _react2['default'].createElement(Loader, { toggle: this.state.loading,
	          progress: this.state.loading_progress })
	      ),
	      _react2['default'].createElement(
	        'figcaption',
	        { className: 'imageCaption', onMouseDown: this.handleFocus },
	        !this.state.enabled ? _react2['default'].createElement(
	          'span',
	          { className: 'danteDefaultPlaceholder' },
	          this.placeholderText()
	        ) : undefined,
	        _react2['default'].createElement(_draftJs.EditorBlock, (0, _assign2['default'])({}, this.props, {
	          "editable": true, "className": "imageCaption" }))
	      )
	    );
	  };

	  return ImageBlock;
	}(_react2['default'].Component);

	exports['default'] = ImageBlock;

	var Loader = function (_React$Component2) {
	  (0, _inherits3['default'])(Loader, _React$Component2);

	  function Loader() {
	    (0, _classCallCheck3['default'])(this, Loader);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component2.apply(this, arguments));
	  }

	  Loader.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      this.props.toggle ? _react2['default'].createElement(
	        'div',
	        { className: 'image-upoader-loader' },
	        _react2['default'].createElement(
	          'p',
	          null,
	          this.props.progress === 100 ? "processing image..." : _react2['default'].createElement(
	            'span',
	            null,
	            _react2['default'].createElement(
	              'span',
	              null,
	              'loading'
	            ),
	            ' ',
	            Math.round(this.props.progress)
	          )
	        )
	      ) : undefined
	    );
	  };

	  return Loader;
	}(_react2['default'].Component);

	module.exports = exports['default'];

/***/ },

/***/ 427:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(2);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(71);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(80);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(81);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(83);

	var _axios = __webpack_require__(402);

	var _axios2 = _interopRequireDefault(_axios);

	var _index = __webpack_require__(386);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var EmbedBlock = function (_React$Component) {
	  (0, _inherits3['default'])(EmbedBlock, _React$Component);

	  function EmbedBlock(props) {
	    (0, _classCallCheck3['default'])(this, EmbedBlock);

	    //api_key = "86c28a410a104c8bb58848733c82f840"

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

	    _this.updateData = _this.updateData.bind(_this);
	    _this.dataForUpdate = _this.dataForUpdate.bind(_this);
	    _this.componentDidMount = _this.componentDidMount.bind(_this);
	    _this.state = {
	      embed_data: _this.defaultData(),
	      error: ""
	    };
	    return _this;
	  }

	  EmbedBlock.prototype.defaultData = function defaultData() {
	    var existing_data = this.props.block.getData().toJS();
	    return existing_data.embed_data || {};
	  };

	  // will update block state


	  EmbedBlock.prototype.updateData = function updateData() {
	    var _props = this.props,
	        block = _props.block,
	        blockProps = _props.blockProps;
	    var _props$blockProps = this.props.blockProps,
	        getEditorState = _props$blockProps.getEditorState,
	        setEditorState = _props$blockProps.setEditorState;

	    var data = block.getData();
	    var newData = data.merge(this.state);
	    return setEditorState((0, _index.updateDataOfBlock)(getEditorState(), block, newData));
	  };

	  EmbedBlock.prototype.dataForUpdate = function dataForUpdate() {

	    return this.props.blockProps.data.toJS();
	  };

	  EmbedBlock.prototype.componentDidMount = function componentDidMount() {
	    var _this2 = this;

	    if (!this.props.blockProps.data) {
	      return;
	    }

	    // ensure data isnt already loaded
	    // unless @dataForUpdate().endpoint or @dataForUpdate().provisory_text

	    if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
	      //debugger
	      return;
	    }

	    return (0, _axios2['default'])({
	      method: 'get',
	      url: '' + this.dataForUpdate().endpoint + this.dataForUpdate().provisory_text + '&scheme=https'
	    }).then(function (result) {

	      return _this2.setState({ embed_data: result.data } //JSON.parse(data.responseText)
	      , _this2.updateData);
	    })['catch'](function (error) {

	      _this2.setState({
	        error: error.response.data.error_message });
	      return console.log("TODO: error");
	    });
	  };

	  EmbedBlock.prototype.classForImage = function classForImage() {
	    if (this.state.embed_data.images) {
	      return "";
	    } else {
	      return "mixtapeImage--empty u-ignoreBlock";
	    }
	  };
	  //if @state.embed_data.thumbnail_url then "" else "mixtapeImage--empty u-ignoreBlock"

	  EmbedBlock.prototype.picture = function picture() {
	    if (this.state.embed_data.images && this.state.embed_data.images.length > 0) {
	      return this.state.embed_data.images[0].url;
	    } else {
	      return "";
	    }
	  };

	  EmbedBlock.prototype.render = function render() {
	    //block = @.props
	    //foo = @.props.blockProps
	    //data = Entity.get(block.block.getEntityAt(0)).getData()
	    console.log("ERROR", this.state.error);
	    return _react2['default'].createElement(
	      'span',
	      null,
	      this.picture() ? _react2['default'].createElement('a', {
	        target: '_blank',
	        className: 'js-mixtapeImage mixtapeImage ' + this.classForImage(),
	        href: this.state.embed_data.url,
	        style: { backgroundImage: 'url(\'' + this.picture() + '\')' }
	      }) : undefined,
	      this.state.error ? _react2['default'].createElement(
	        'h2',
	        null,
	        this.state.error
	      ) : undefined,
	      _react2['default'].createElement(
	        'a',
	        {
	          className: 'markup--anchor markup--mixtapeEmbed-anchor',
	          target: '_blank',
	          href: this.state.embed_data.url
	        },
	        _react2['default'].createElement(
	          'strong',
	          { className: 'markup--strong markup--mixtapeEmbed-strong' },
	          this.state.embed_data.title
	        ),
	        _react2['default'].createElement(
	          'em',
	          { className: 'markup--em markup--mixtapeEmbed-em' },
	          this.state.embed_data.description
	        )
	      ),
	      this.state.embed_data.provider_url
	    );
	  };

	  return EmbedBlock;
	}(_react2['default'].Component);

	exports['default'] = EmbedBlock;
	module.exports = exports['default'];

/***/ },

/***/ 428:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _assign = __webpack_require__(398);

	var _assign2 = _interopRequireDefault(_assign);

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(2);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(71);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(80);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(81);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(83);

	var _index = __webpack_require__(386);

	var _axios = __webpack_require__(402);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var VideoBlock = function (_React$Component) {
	  (0, _inherits3['default'])(VideoBlock, _React$Component);

	  function VideoBlock(props) {
	    (0, _classCallCheck3['default'])(this, VideoBlock);

	    //api_key = "86c28a410a104c8bb58848733c82f840"

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

	    _this.updateData = _this.updateData.bind(_this);
	    _this.dataForUpdate = _this.dataForUpdate.bind(_this);
	    _this.state = { embed_data: _this.defaultData() };
	    return _this;
	  }

	  VideoBlock.prototype.defaultData = function defaultData() {
	    var existing_data = this.props.block.getData().toJS();
	    return existing_data.embed_data || {};
	  };

	  // will update block state


	  VideoBlock.prototype.updateData = function updateData() {
	    var _props = this.props,
	        block = _props.block,
	        blockProps = _props.blockProps;
	    var _props$blockProps = this.props.blockProps,
	        getEditorState = _props$blockProps.getEditorState,
	        setEditorState = _props$blockProps.setEditorState;

	    var data = block.getData();
	    var newData = data.merge(this.state);
	    return setEditorState((0, _index.updateDataOfBlock)(getEditorState(), block, newData));
	  };

	  VideoBlock.prototype.dataForUpdate = function dataForUpdate() {
	    return this.props.blockProps.data.toJS();
	  };

	  VideoBlock.prototype.componentDidMount = function componentDidMount() {
	    var _this2 = this;

	    if (!this.props.blockProps.data) {
	      return;
	    }
	    // ensure data isnt already loaded
	    if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
	      return;
	    }

	    return (0, _axios2['default'])({
	      method: 'get',
	      url: '' + this.dataForUpdate().endpoint + this.dataForUpdate().provisory_text + '&scheme=https'
	    }).then(function (result) {
	      return _this2.setState({ embed_data: result.data } //JSON.parse(data.responseText)
	      , _this2.updateData);
	    })['catch'](function (error) {
	      return console.log("TODO: error");
	    });
	  };

	  VideoBlock.prototype.classForImage = function classForImage() {
	    if (this.state.embed_data.thumbnail_url) {
	      return "";
	    } else {
	      return "mixtapeImage--empty u-ignoreBlock";
	    }
	  };

	  VideoBlock.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'figure',
	      { className: 'graf--figure graf--iframe graf--first', tabIndex: '0' },
	      _react2['default'].createElement('div', { className: 'iframeContainer',
	        dangerouslySetInnerHTML: { __html: this.state.embed_data.html } }),
	      _react2['default'].createElement(
	        'figcaption',
	        { className: 'imageCaption' },
	        _react2['default'].createElement(_draftJs.EditorBlock, (0, _assign2['default'])({}, this.props, { "className": "imageCaption" }))
	      )
	    );
	  };

	  return VideoBlock;
	}(_react2['default'].Component);

	exports['default'] = VideoBlock;
	module.exports = exports['default'];

/***/ },

/***/ 429:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _assign = __webpack_require__(398);

	var _assign2 = _interopRequireDefault(_assign);

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(2);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(71);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(80);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(81);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(83);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var PlaceholderBlock = function (_React$Component) {
	  (0, _inherits3['default'])(PlaceholderBlock, _React$Component);

	  function PlaceholderBlock(props) {
	    (0, _classCallCheck3['default'])(this, PlaceholderBlock);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

	    _this.placeholderText = _this.placeholderText.bind(_this);
	    _this.placeholderFromProps = _this.placeholderFromProps.bind(_this);
	    _this.defaultText = _this.defaultText.bind(_this);
	    _this.handleFocus = _this.handleFocus.bind(_this);
	    _this.classForDefault = _this.classForDefault.bind(_this);
	    _this.state = {
	      enabled: false,
	      data: _this.props.blockProps.data.toJS()
	    };
	    return _this;
	  }

	  PlaceholderBlock.prototype.placeholderText = function placeholderText() {
	    if (this.state.enabled) {
	      return "";
	    }
	    return this.props.blockProps.data.toJS().placeholder || this.placeholderFromProps() || this.defaultText();
	  };
	  //if @.props.blockProps.data then @.props.blockProps.data.placeholder else @defaultText()


	  PlaceholderBlock.prototype.placeholderFromProps = function placeholderFromProps() {
	    return this.props.block.toJS().placeholder;
	  };

	  PlaceholderBlock.prototype.defaultText = function defaultText() {
	    return "write something ";
	  };

	  PlaceholderBlock.prototype.componentDidMount = function componentDidMount() {};

	  PlaceholderBlock.prototype.handleFocus = function handleFocus(e) {
	    var _this2 = this;

	    // console.log "focus on placeholder"
	    return setTimeout(function () {
	      return _this2.setState({
	        enabled: true });
	    }, 0);
	  };

	  PlaceholderBlock.prototype.classForDefault = function classForDefault() {
	    if (!this.state.enabled) {
	      return "defaultValue defaultValue--root";
	    } else {
	      return "";
	    }
	  };

	  PlaceholderBlock.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'span',
	      { className: this.classForDefault(), onMouseDown: this.handleFocus },
	      this.placeholderText(),
	      _react2['default'].createElement(_draftJs.EditorBlock, (0, _assign2['default'])({}, this.props, {
	        "className": "imageCaption",
	        "placeholder": "escrive alalal"
	      }))
	    );
	  };

	  return PlaceholderBlock;
	}(_react2['default'].Component);

	exports['default'] = PlaceholderBlock;
	module.exports = exports['default'];

/***/ },

/***/ 430:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _stringify = __webpack_require__(394);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _classCallCheck2 = __webpack_require__(79);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _axios = __webpack_require__(402);

	var _axios2 = _interopRequireDefault(_axios);

	var _immutable = __webpack_require__(82);

	var _immutable2 = _interopRequireDefault(_immutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var SaveBehavior = function () {
	  function SaveBehavior(options) {
	    (0, _classCallCheck3["default"])(this, SaveBehavior);

	    this.getLocks = options.getLocks;
	    this.config = options.config;
	    this.editorContent = options.editorContent;
	    this.editorState = options.editorState;
	  }

	  SaveBehavior.prototype.handleStore = function handleStore(ev) {
	    return this.store();
	  };

	  SaveBehavior.prototype.store = function store(content) {
	    var _this = this;

	    if (!this.config.data_storage.url) {
	      return;
	    }
	    if (this.getLocks() > 0) {
	      return;
	    }

	    clearTimeout(this.timeout);

	    return this.timeout = setTimeout(function () {
	      return _this.checkforStore(content);
	    }, this.config.data_storage.interval);
	  };

	  SaveBehavior.prototype.getTextFromEditor = function getTextFromEditor(content) {
	    return content.blocks.map(function (o) {
	      return o.text;
	    }).join("\n");
	  };

	  SaveBehavior.prototype.getUrl = function getUrl() {
	    var url = this.config.data_storage.url;

	    if (typeof url === "function") {
	      return url();
	    } else {
	      return url;
	    }
	  };

	  SaveBehavior.prototype.getMethod = function getMethod() {
	    var method = this.config.data_storage.method;

	    if (typeof method === "function") {
	      return method();
	    } else {
	      return method;
	    }
	  };

	  SaveBehavior.prototype.checkforStore = function checkforStore(content) {
	    var _this2 = this;

	    // ENTER DATA STORE
	    var isChanged = !_immutable2["default"].is(_immutable2["default"].fromJS(this.editorContent), _immutable2["default"].fromJS(content));
	    // console.log("CONTENT CHANGED:", isChanged)

	    if (!isChanged) {
	      return;
	    }

	    if (this.config.xhr.before_handler) {
	      this.config.xhr.before_handler();
	    }
	    // console.log "SAVING TO: #{@getMethod()} #{@getUrl()}"

	    return (0, _axios2["default"])({
	      method: this.getMethod(),
	      url: this.getUrl(),
	      data: {
	        editor_content: (0, _stringify2["default"])(content),
	        text_content: this.getTextFromEditor(content)
	      }
	    }).then(function (result) {
	      // console.log "STORING CONTENT", result
	      if (_this2.config.data_storage.success_handler) {
	        _this2.config.data_storage.success_handler(result);
	      }
	      if (_this2.config.xhr.success_handler) {
	        return _this2.config.xhr.success_handler(result);
	      }
	    })["catch"](function (error) {
	      // console.log("ERROR: got error saving content at #{@config.data_storage.url} - #{error}")
	      if (_this2.config.xhr.failure_handler) {
	        return _this2.config.xhr.failure_handler(error);
	      }
	    });
	  };

	  return SaveBehavior;
	}();

	exports["default"] = SaveBehavior;
	module.exports = exports["default"];

/***/ },

/***/ 431:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _stringify = __webpack_require__(394);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _draftJs = __webpack_require__(83);

	var _immutable = __webpack_require__(82);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// { compose
	// }  = require('underscore')

	// underscore compose function
	var compose = function compose() {
	  var args = arguments;
	  var start = args.length - 1;
	  return function () {
	    var i = start;
	    var result = args[start].apply(this, arguments);
	    while (i--) {
	      result = args[i].call(this, result);
	    }
	    return result;
	  };
	};

	// from https://gist.github.com/N1kto/6702e1c2d89a33a15a032c234fc4c34e

	/*
	 * Helpers
	 */

	// Prepares img meta data object based on img attributes
	var getBlockSpecForElement = function getBlockSpecForElement(imgElement) {
	  return {
	    contentType: 'image',
	    imgSrc: imgElement.getAttribute('src')
	  };
	};

	// Wraps meta data in HTML element which is 'understandable' by Draft, I used <blockquote />.
	var wrapBlockSpec = function wrapBlockSpec(blockSpec) {
	  if (blockSpec === null) {
	    return null;
	  }

	  var tempEl = document.createElement('blockquote');
	  // stringify meta data and insert it as text content of temp HTML element. We will later extract
	  // and parse it.
	  tempEl.innerText = (0, _stringify2['default'])(blockSpec);
	  return tempEl;
	};

	// Replaces <img> element with our temp element
	var replaceElement = function replaceElement(oldEl, newEl) {
	  if (!(newEl instanceof HTMLElement)) {
	    return;
	  }

	  var upEl = getUpEl(oldEl);
	  //parentNode = oldEl.parentNode
	  //return parentNode.replaceChild(newEl, oldEl)
	  return upEl.parentNode.insertBefore(newEl, upEl);
	};

	var getUpEl = function getUpEl(el) {
	  var original_el = el;
	  while (el.parentNode) {
	    if (el.parentNode.tagName !== 'BODY') {
	      el = el.parentNode;
	    }
	    if (el.parentNode.tagName === 'BODY') {
	      return el;
	    }
	  }
	};

	var elementToBlockSpecElement = compose(wrapBlockSpec, getBlockSpecForElement);

	var imgReplacer = function imgReplacer(imgElement) {
	  return replaceElement(imgElement, elementToBlockSpecElement(imgElement));
	};

	/*
	 * Main function
	 */

	// takes HTML string and returns DraftJS ContentState
	var customHTML2Content = function customHTML2Content(HTML, blockRn) {
	  var tempDoc = new DOMParser().parseFromString(HTML, 'text/html');
	  // replace all <img /> with <blockquote /> elements

	  var a = tempDoc.querySelectorAll('img').forEach(function (item) {
	    return imgReplacer(item);
	  });

	  // use DraftJS converter to do initial conversion. I don't provide DOMBuilder and
	  // blockRenderMap arguments here since it should fall back to its default ones, which are fine
	  console.log(tempDoc.body.innerHTML);
	  var contentBlocks = (0, _draftJs.convertFromHTML)(tempDoc.body.innerHTML, _draftJs.getSafeBodyFromHTML, blockRn);

	  // now replace <blockquote /> ContentBlocks with 'atomic' ones
	  contentBlocks = contentBlocks.map(function (block) {
	    var newBlock = void 0;
	    console.log("CHECK BLOCK", block.getType());
	    if (block.getType() !== 'blockquote') {
	      return block;
	    }

	    var json = "";
	    try {
	      json = JSON.parse(block.getText());
	    } catch (error) {
	      return block;
	    }

	    return newBlock = block.merge({
	      type: "image",
	      text: "",
	      data: {
	        url: json.imgSrc,
	        forceUpload: true
	      }
	    });
	  });

	  tempDoc = null;
	  return _draftJs.ContentState.createFromBlockArray(contentBlocks);
	};

	exports['default'] = customHTML2Content;
	module.exports = exports['default'];

/***/ },

/***/ 432:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontello.eot";

/***/ },

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontello.woff";

/***/ },

/***/ 437:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontello.ttf";

/***/ },

/***/ 438:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontello.svg";

/***/ },

/***/ 439:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/dante.eot";

/***/ },

/***/ 440:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/dante.woff";

/***/ },

/***/ 441:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/dante.ttf";

/***/ },

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/dante.svg";

/***/ },

/***/ 444:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

})
});
;