(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Dante2"] = factory(require("react"), require("react-dom"));
	else
		root["Dante2"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_23__, __WEBPACK_EXTERNAL_MODULE_24__) {
return webpackJsonpDante2([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _dante = __webpack_require__(1);

	var _dante2 = _interopRequireDefault(_dante);

	var _dante_editor = __webpack_require__(26);

	var _dante_editor2 = _interopRequireDefault(_dante_editor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	module.exports = {
	  Dante: _dante2['default'],
	  DanteEditor: _dante_editor2['default']
	};

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	module.exports = global["Dante"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 23:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ },

/***/ 24:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	module.exports = global["DanteEditor"] = __webpack_require__(27);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 396:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.addNewBlockAt = exports.updateTextOfBlock = exports.updateDataOfBlock = exports.resetBlockWithType = exports.addNewBlock = exports.getCurrentBlock = exports.getNode = exports.getDefaultBlockData = undefined;

	var _immutable = __webpack_require__(25);

	var _draftJs = __webpack_require__(94);

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

/***/ 397:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(39);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(86);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(23);

	var _react2 = _interopRequireDefault(_react);

	var _draftJs = __webpack_require__(94);

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

/***/ 398:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _stringify = __webpack_require__(399);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(39);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(86);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(23);

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

/***/ 401:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _draftJs = __webpack_require__(94);

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

/***/ 402:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _stringify = __webpack_require__(399);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _axios = __webpack_require__(403);

	var _axios2 = _interopRequireDefault(_axios);

	var _immutable = __webpack_require__(25);

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

	  SaveBehavior.prototype.getWithCredentials = function getWithCredentials() {
	    var withCredentials = this.config.data_storage.withCredentials;

	    if (typeof withCredentials === "function") {
	      return withCredentials();
	    } else {
	      return withCredentials;
	    }
	  };

	  SaveBehavior.prototype.getCrossDomain = function getCrossDomain() {
	    var crossDomain = this.config.data_storage.crossDomain;

	    if (typeof crossDomain === "function") {
	      return crossDomain();
	    } else {
	      return crossDomain;
	    }
	  };

	  SaveBehavior.prototype.getHeaders = function getHeaders() {
	    var headers = this.config.data_storage.headers;

	    if (typeof headers === "function") {
	      return headers();
	    } else {
	      return headers;
	    }
	  };

	  SaveBehavior.prototype.checkforStore = function checkforStore(content) {
	    // ENTER DATA STORE
	    var isChanged = !_immutable2["default"].is(_immutable2["default"].fromJS(this.editorContent), _immutable2["default"].fromJS(content));
	    // console.log("CONTENT CHANGED:", isChanged)

	    if (!isChanged) {
	      return;
	    }

	    this.save(content);
	  };

	  SaveBehavior.prototype.save = function save(content) {
	    var _this2 = this;

	    // use save handler from config if exists
	    if (this.config.data_storage.save_handler) {
	      this.config.data_storage.save_handler(this, content);
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
	      },
	      withCredentials: this.getWithCredentials(),
	      crossDomain: this.getCrossDomain(),
	      headers: this.getHeaders()
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

/***/ 428:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _stringify = __webpack_require__(399);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _draftJs = __webpack_require__(94);

	var _immutable = __webpack_require__(25);

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

/***/ 429:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(39);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(86);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(23);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(24);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(94);

	var _selection = __webpack_require__(430);

	var _index = __webpack_require__(396);

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

/***/ 430:
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

/***/ 431:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(39);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(86);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(23);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(24);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _index = __webpack_require__(396);

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

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(39);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(86);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(23);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(24);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(94);

	var _index = __webpack_require__(396);

	var _selection = __webpack_require__(430);

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

/***/ 433:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(39);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(86);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(23);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(24);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(94);

	var _selection = __webpack_require__(430);

	var _index = __webpack_require__(396);

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

/***/ 434:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _assign = __webpack_require__(435);

	var _assign2 = _interopRequireDefault(_assign);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(39);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(86);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(23);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(24);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(94);

	var _axios = __webpack_require__(403);

	var _axios2 = _interopRequireDefault(_axios);

	var _index = __webpack_require__(396);

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
	        return _this3.config.upload_callback(result, _this3);
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

/***/ 439:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(39);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(86);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(23);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(24);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(94);

	var _axios = __webpack_require__(403);

	var _axios2 = _interopRequireDefault(_axios);

	var _index = __webpack_require__(396);

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

/***/ 440:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _assign = __webpack_require__(435);

	var _assign2 = _interopRequireDefault(_assign);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(39);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(86);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(23);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(24);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(94);

	var _index = __webpack_require__(396);

	var _axios = __webpack_require__(403);

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

/***/ 441:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _assign = __webpack_require__(435);

	var _assign2 = _interopRequireDefault(_assign);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(39);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(86);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(23);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(24);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(94);

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

/***/ }

})
});
;