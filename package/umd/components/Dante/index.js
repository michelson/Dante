(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('immutable'), require('draft-js'), require('react'), require('axios'), require('lodash'), require('draft-convert'), require('draft-js-custom-styles'), require('react-dom'), require('react-color')) :
  typeof define === 'function' && define.amd ? define(['immutable', 'draft-js', 'react', 'axios', 'lodash', 'draft-convert', 'draft-js-custom-styles', 'react-dom', 'react-color'], factory) :
  (global.howLongUntilLunch = factory(global.Immutable,global.draftJs,global.React,global.axios,global.lodash,global.draftConvert,global.createStyles,global.ReactDOM,global.reactColor));
}(this, (function (Immutable,draftJs,React,axios,lodash,draftConvert,createStyles,ReactDOM,reactColor) { 'use strict';

  var Immutable__default = 'default' in Immutable ? Immutable['default'] : Immutable;
  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;
  createStyles = createStyles && createStyles.hasOwnProperty('default') ? createStyles['default'] : createStyles;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

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
  /*
  Get currentBlock in the editorState.
  */

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
      return draftJs.EditorState.push(editorState, newContentState, 'change-block-type');
    }

    return editorState;
  };
  /*
  Changes the block type of the current block.
  */

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
    return draftJs.EditorState.push(editorState, newContentState, 'change-block-type');
  };
  /*
  Update block-level metadata of the given `block` to the `newData`/
  */

  var updateDataOfBlock = function updateDataOfBlock(editorState, block, newData) {
    var contentState = editorState.getCurrentContent();
    var newBlock = block.merge({
      data: newData
    });
    var newContentState = contentState.merge({
      blockMap: contentState.getBlockMap().set(block.getKey(), newBlock)
    });
    return draftJs.EditorState.push(editorState, newContentState, 'change-block-type'); // return editorState;
  };
  // const AFTER = 1;

  /*
  Used from [react-rte](https://github.com/sstur/react-rte/blob/master/src/lib/insertBlockAfter.js)
  by [sstur](https://github.com/sstur)
  */

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
    var newBlockKey = draftJs.genKey();
    var newBlock = new draftJs.ContentBlock({
      key: newBlockKey,
      type: newBlockType,
      text: '',
      characterList: block.getCharacterList().slice(0, 0),
      depth: 0,
      data: Immutable.Map(getDefaultBlockData(newBlockType, initialData))
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
    return draftJs.EditorState.push(editorState, newContent, 'split-block');
  };

  var Link =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Link, _React$Component);

    function Link(props) {
      var _this;

      _classCallCheck(this, Link);

      _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "_validateLink", function () {
        var str = "demo";
        /*eslint-disable */

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
        /*eslint-enable */

      });

      _defineProperty(_assertThisInitialized(_this), "_checkProtocol", function () {
        return console.log("xcvd");
      });

      _defineProperty(_assertThisInitialized(_this), "_showPopLinkOver", function (e) {
        if (!_this.data.showPopLinkOver) {
          return;
        }

        return _this.data.showPopLinkOver(_this.refs.link);
      });

      _defineProperty(_assertThisInitialized(_this), "_hidePopLinkOver", function (e) {
        if (!_this.data.hidePopLinkOver) {
          return;
        }

        return _this.data.hidePopLinkOver();
      });

      _this.isHover = false;
      return _this;
    }

    _createClass(Link, [{
      key: "render",
      value: function render() {
        this.data = this.props.contentState.getEntity(this.props.entityKey).getData(); //Entity.get(this.props.entityKey).getData()

        return React.createElement("a", {
          ref: "link",
          href: this.data.url,
          className: "markup--anchor",
          onMouseOver: this._showPopLinkOver,
          onMouseOut: this._hidePopLinkOver
        }, this.props.children);
      }
    }]);

    return Link;
  }(React.Component);

  var Debug =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Debug, _React$Component);

    function Debug() {
      var _this;

      _classCallCheck(this, Debug);

      _this = _possibleConstructorReturn(this, (Debug.__proto__ || Object.getPrototypeOf(Debug)).call(this));

      _defineProperty(_assertThisInitialized(_this), "handleToggleReadOnly", function (e) {
        e.preventDefault();

        _this.props.editor.toggleEditable();

        return false;
      });

      _defineProperty(_assertThisInitialized(_this), "handleTestEmitAndDecode", function (e) {
        e.preventDefault();
        return _this.testEmitAndDecode();
      });

      _defineProperty(_assertThisInitialized(_this), "handleTestEmitTEXT", function (e) {
        e.preventDefault();
        return _this.testEmitTEXT();
      });

      _defineProperty(_assertThisInitialized(_this), "testEmitAndDecode", function (e) {
        var raw_as_json = _this.props.editor.emitSerializedOutput();

        _this.props.editor.setState({
          editorState: _this.props.editor.decodeEditorContent(raw_as_json)
        }, _this.logState(JSON.stringify(raw_as_json)));

        return false;
      });

      _defineProperty(_assertThisInitialized(_this), "testEmitTEXT", function () {
        var text = _this.props.editor.getTextFromEditor();

        return _this.logState(text);
      });

      _defineProperty(_assertThisInitialized(_this), "logState", function (raw) {
        return _this.setState({
          output: raw
        }, _this.open);
      });

      _defineProperty(_assertThisInitialized(_this), "toggleDisplay", function (e) {
        e.preventDefault();
        var d = _this.state.display === "block" ? "none" : _this.state.display;
        return _this.setState({
          display: d
        });
      });

      _defineProperty(_assertThisInitialized(_this), "open", function () {
        return _this.setState({
          display: "block"
        });
      });

      _this.state = {
        output: "",
        display: "none"
      };
      return _this;
    }

    _createClass(Debug, [{
      key: "render",
      value: function render() {
        return React.createElement("div", null, React.createElement("div", {
          className: "debugControls"
        }, React.createElement("ul", null, React.createElement("li", null, " LOCKS: ", this.props.editor.state.locks, " "), React.createElement("li", null, React.createElement("button", {
          onClick: this.handleToggleReadOnly
        }, "EDITABLE: ", this.props.editor.state.read_only ? 'NO' : 'YES')), React.createElement("li", null, React.createElement("button", {
          onClick: this.handleTestEmitTEXT
        }, "EDITOR TEXT")), React.createElement("li", null, React.createElement("button", {
          onClick: this.handleTestEmitAndDecode
        }, "EDITOR STATE")))), React.createElement("div", {
          className: "debugZone",
          style: {
            display: this.state.display
          }
        }, React.createElement("button", {
          href: "#",
          className: "dante-debug-close close",
          onClick: this.toggleDisplay
        }), React.createElement("div", {
          className: "debugOutput"
        }, React.createElement("h2", null, "EDITOR OUTPUT"), this.state.output.length > 0 ? React.createElement("pre", null, this.state.output) : undefined)));
      }
    }]);

    return Debug;
  }(React.Component);

  var _this = undefined;

  //TODO: what the f*ck is happening here? ;-;
  var findEntities = function findEntities(entityType, instance, contentBlock, callback) {
    return contentBlock.findEntityRanges(function (_this) {
      return function (character) {
        var entityKey, opts, res;
        var contentState = instance.state.editorState.getCurrentContent();
        entityKey = character.getEntity();
        return res = entityKey !== null && contentState.getEntity(entityKey).getType() === entityType, res ? (opts = {
          showPopLinkOver: instance.showPopLinkOver,
          hidePopLinkOver: instance.hidePopLinkOver
        }, contentState.mergeEntityData(entityKey, opts)) : void 0, res;
      };
    }(_this), callback);
  };

  var SaveBehavior =
  /*#__PURE__*/
  function () {
    function SaveBehavior(options) {
      _classCallCheck(this, SaveBehavior);

      this.getLocks = options.getLocks;
      this.config = options.config;
      this.editorContent = options.editorContent;
      this.editorState = options.editorState;
      this.editor = options.editor;
    }

    _createClass(SaveBehavior, [{
      key: "handleStore",
      value: function handleStore(ev) {
        return this.store();
      }
    }, {
      key: "store",
      value: function store(content) {
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
      }
    }, {
      key: "getTextFromEditor",
      value: function getTextFromEditor(content) {
        return content.blocks.map(function (o) {
          return o.text;
        }).join("\n");
      }
    }, {
      key: "getUrl",
      value: function getUrl() {
        var url = this.config.data_storage.url;

        if (typeof url === "function") {
          return url();
        } else {
          return url;
        }
      }
    }, {
      key: "getMethod",
      value: function getMethod() {
        var method = this.config.data_storage.method;

        if (typeof method === "function") {
          return method();
        } else {
          return method;
        }
      }
    }, {
      key: "getWithCredentials",
      value: function getWithCredentials() {
        var withCredentials = this.config.data_storage.withCredentials;

        if (typeof withCredentials === "function") {
          return withCredentials();
        } else {
          return withCredentials;
        }
      }
    }, {
      key: "getCrossDomain",
      value: function getCrossDomain() {
        var crossDomain = this.config.data_storage.crossDomain;

        if (typeof crossDomain === "function") {
          return crossDomain();
        } else {
          return crossDomain;
        }
      }
    }, {
      key: "getHeaders",
      value: function getHeaders() {
        var headers = this.config.data_storage.headers;

        if (typeof headers === "function") {
          return headers();
        } else {
          return headers;
        }
      }
    }, {
      key: "checkforStore",
      value: function checkforStore(content) {
        // ENTER DATA STORE
        var isChanged = !Immutable__default.is(Immutable__default.fromJS(this.editorContent), Immutable__default.fromJS(content)); // console.log("CONTENT CHANGED:", isChanged)

        if (!isChanged) {
          return;
        }

        this.save(content);
      }
    }, {
      key: "save",
      value: function save(content) {
        var _this2 = this;

        // use save handler from config if exists
        if (this.config.data_storage.save_handler) {
          this.config.data_storage.save_handler(this, content);
          return;
        }

        if (this.config.xhr.before_handler) {
          this.config.xhr.before_handler();
        } // console.log "SAVING TO: #{@getMethod()} #{@getUrl()}"


        return axios({
          method: this.getMethod(),
          url: this.getUrl(),
          data: {
            editor_content: JSON.stringify(content),
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
        }).catch(function (error) {
          // console.log("ERROR: got error saving content at #{@config.data_storage.url} - #{error}")
          if (_this2.config.xhr.failure_handler) {
            return _this2.config.xhr.failure_handler(error);
          }
        });
      }
    }]);

    return SaveBehavior;
  }();

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
  }; // from https://gist.github.com/N1kto/6702e1c2d89a33a15a032c234fc4c34e

  /*
   * Helpers
   */
  // Prepares img meta data object based on img attributes


  var getBlockSpecForElement = function getBlockSpecForElement(imgElement) {
    return {
      contentType: 'image',
      imgSrc: imgElement.getAttribute('src')
    };
  }; // Wraps meta data in HTML element which is 'understandable' by Draft, I used <blockquote />.


  var wrapBlockSpec = function wrapBlockSpec(blockSpec) {
    if (blockSpec === null) {
      return null;
    }

    var tempEl = document.createElement('blockquote'); // stringify meta data and insert it as text content of temp HTML element. We will later extract
    // and parse it.

    tempEl.innerText = JSON.stringify(blockSpec);
    return tempEl;
  }; // Replaces <img> element with our temp element


  var replaceElement = function replaceElement(oldEl, newEl) {
    if (!(newEl instanceof HTMLElement)) {
      return;
    }

    var upEl = getUpEl(oldEl); //parentNode = oldEl.parentNode
    //return parentNode.replaceChild(newEl, oldEl)

    return upEl.parentNode.insertBefore(newEl, upEl);
  };

  var getUpEl = function getUpEl(el) {
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
    var tempDoc = new DOMParser().parseFromString(HTML, 'text/html'); // replace all <img /> with <blockquote /> elements

    tempDoc.querySelectorAll('img').forEach(function (item) {
      return imgReplacer(item);
    }); // use DraftJS converter to do initial conversion. I don't provide DOMBuilder and
    // blockRenderMap arguments here since it should fall back to its default ones, which are fine
    // console.log(tempDoc.body.innerHTML)

    var content = draftJs.convertFromHTML(tempDoc.body.innerHTML, draftJs.getSafeBodyFromHTML, blockRn);
    var contentBlocks = content.contentBlocks; // now replace <blockquote /> ContentBlocks with 'atomic' ones

    contentBlocks = contentBlocks.map(function (block) {
      console.log("CHECK BLOCK", block.getType());

      if (block.getType() !== 'blockquote') {
        return block;
      }

      var json = "";

      try {
        json = JSON.parse(block.getText());
      } catch (error) {
        return block;
      } // new block


      return block.merge({
        type: "image",
        text: "",
        data: {
          url: json.imgSrc,
          forceUpload: true
        }
      });
    });
    tempDoc = null;
    return draftJs.ContentState.createFromBlockArray(contentBlocks);
  };

  var DanteEditor =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DanteEditor, _React$Component);

    function DanteEditor(props) {
      var _this;

      _classCallCheck(this, DanteEditor);

      _this = _possibleConstructorReturn(this, (DanteEditor.__proto__ || Object.getPrototypeOf(DanteEditor)).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "initializeState", function () {
        var newEditorState = draftJs.EditorState.createEmpty(_this.decorator);

        if (_this.props.content) {
          newEditorState = draftJs.EditorState.set(_this.decodeEditorContent(_this.props.content), {
            decorator: _this.decorator
          });
        }

        _this.onChange(newEditorState);
      });

      _defineProperty(_assertThisInitialized(_this), "decodeEditorContent", function (raw_as_json) {
        var new_content = draftJs.convertFromRaw(raw_as_json);
        return draftJs.EditorState.createWithContent(new_content, _this.decorator);
      });

      _defineProperty(_assertThisInitialized(_this), "refreshSelection", function (newEditorState) {
        var editorState = _this.state.editorState; // Setting cursor position after inserting to content

        var s = editorState.getSelection();
        var focusOffset = s.getFocusOffset();
        var anchorKey = s.getAnchorKey();
        var selectionState = draftJs.SelectionState.createEmpty(s.getAnchorKey()); // console.log anchorKey, focusOffset

        selectionState = selectionState.merge({
          anchorOffset: focusOffset,
          focusKey: anchorKey,
          focusOffset: focusOffset
        });
        var newState = draftJs.EditorState.forceSelection(newEditorState, selectionState);
        return _this.onChange(newState);
      });

      _defineProperty(_assertThisInitialized(_this), "forceRender", function (editorState) {
        var content = editorState.getCurrentContent();
        var newEditorState = draftJs.EditorState.createWithContent(content, _this.decorator);
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

            var tooltip = _this.tooltipsWithProp('displayOnSelection')[0];

            if (!tooltip) return;

            if (!_this.tooltipHasSelectionElement(tooltip, blockType)) {
              return;
            }

            _this.handleTooltipDisplayOn('displayOnSelection');
          } else {
            _this.handleTooltipDisplayOn('displayOnSelection', false);
          }

          setTimeout(function () {
            return _this.relocateTooltips();
          });
          return _this.dispatchChangesToSave();
        });
      });

      _defineProperty(_assertThisInitialized(_this), "handleUndeletables", function (editorState) {
        // undeletable behavior, will keep previous blockMap 
        // if undeletables are deleted
        var undeletable_types = _this.widgets.filter(function (o) {
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
          return editorState = draftJs.EditorState.push(editorState, newContentState, 'change-block');
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

      _defineProperty(_assertThisInitialized(_this), "focus", function () {} //debugger
      //@props.refs.richEditor.focus()
      );

      _defineProperty(_assertThisInitialized(_this), "getEditorState", function () {
        return _this.state.editorState;
      });

      _defineProperty(_assertThisInitialized(_this), "emitSerializedOutput", function () {
        var raw = draftJs.convertToRaw(_this.state.editorState.getCurrentContent());
        return raw;
      });

      _defineProperty(_assertThisInitialized(_this), "getTextFromEditor", function () {
        var c = _this.state.editorState.getCurrentContent();

        var out = c.getBlocksAsArray().map(function (o) {
          return o.getText();
        }).join("\n");
        return out;
      });

      _defineProperty(_assertThisInitialized(_this), "emitHTML2", function () {
        return draftConvert.convertToHTML({
          entityToHTML: function entityToHTML(entity, originalText) {
            if (entity.type === 'LINK') {
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
        return _this.widgets.filter(function (o) {
          return o.renderable;
        }).map(function (o) {
          return o.type;
        });
      });

      _defineProperty(_assertThisInitialized(_this), "defaultWrappers", function (blockType) {
        return _this.default_wrappers.filter(function (o) {
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

        var read_only = _this.state.read_only ? false : null;
        var editable = read_only !== null ? read_only : dataBlock.editable;
        return {
          component: eval(dataBlock.block),
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
            config: dataBlock.options
          }
        };
      });

      _defineProperty(_assertThisInitialized(_this), "blockStyleFn", function (block) {
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
        return _this.widgets.find(function (o) {
          return o.type === block.getType();
        });
      });

      _defineProperty(_assertThisInitialized(_this), "styleForBlock", function (block, currentBlock, is_selected) {
        var dataBlock = _this.getDataBlock(block);

        if (!dataBlock) {
          return null;
        }

        var selectedFn = dataBlock.selectedFn ? dataBlock.selectedFn(block) : '';
        var selected_class = dataBlock.selected_class ? dataBlock.selected_class : '';
        var selected_class_out = is_selected ? selected_class : '';
        return "".concat(dataBlock.wrapper_class, " ").concat(selected_class_out, " ").concat(selectedFn);
      });

      _defineProperty(_assertThisInitialized(_this), "handleTooltipDisplayOn", function (prop, display) {
        // for button click on after inline style set, 
        // avoids inline popver to reappear on previous selection
        if (_this.state.read_only) {
          return;
        }

        if (display == null) {
          display = true;
        }

        return setTimeout(function () {
          var items = _this.tooltipsWithProp(prop);

          console.log(items);
          return items.map(function (o) {
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
          case "video":
          case "placeholder":
            var newContent = draftJs.Modifier.replaceText(editorState.getCurrentContent(), new draftJs.SelectionState({
              anchorKey: currentBlock.getKey(),
              anchorOffset: 0,
              focusKey: currentBlock.getKey(),
              focusOffset: 2
            }), text);
            editorState = draftJs.EditorState.push(editorState, newContent, 'replace-text');

            _this.onChange(editorState);

            return true;

          default:
            return false;
        }
      });

      _defineProperty(_assertThisInitialized(_this), "handleHTMLPaste", function (text, html) {
        var currentBlock = getCurrentBlock(_this.state.editorState); // TODO: make this configurable

        switch (currentBlock.getType()) {
          case "image":
          case "video":
          case "placeholder":
            return _this.handleTXTPaste(text, html);
        }

        var newContentState = customHTML2Content(html, _this.extendedBlockRenderMap);

        var selection = _this.state.editorState.getSelection();

        var endKey = selection.getEndKey();

        var content = _this.state.editorState.getCurrentContent();

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
        var pushedContentState = draftJs.EditorState.push(_this.state.editorState, newContent, 'insert-fragment');

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
          return _this.onChange(addNewBlock(_this.state.editorState, 'image', opts));
        });
      });

      _defineProperty(_assertThisInitialized(_this), "handleDroppedFiles", function (state, files) {
        return files.map(function (file) {
          var opts = {
            url: URL.createObjectURL(file),
            file: file
          };
          return _this.onChange(addNewBlock(_this.state.editorState, 'image', opts));
        });
      });

      _defineProperty(_assertThisInitialized(_this), "handleDrop", function (selection, dataTransfer, isInternal) {
        var editorState = _this.getEditorState();

        var raw = dataTransfer.data.getData('text');
        var data = JSON.parse(raw);

        _this.onChange(addNewBlock(editorState, data.type, data.data));

        return 'handled';
      });

      _defineProperty(_assertThisInitialized(_this), "handleUpArrow", function (e) {
        return setTimeout(function () {
          return _this.forceRender(_this.state.editorState);
        }, 10);
      });

      _defineProperty(_assertThisInitialized(_this), "handleDownArrow", function (e) {
        return setTimeout(function () {
          return _this.forceRender(_this.state.editorState);
        }, 10);
      });

      _defineProperty(_assertThisInitialized(_this), "handleReturn", function (e) {
        if (_this.props.handleReturn) {
          if (_this.props.handleReturn()) {
            return true;
          }
        }

        var editorState = _this.state.editorState;

        if (e.shiftKey) {
          _this.setState({
            editorState: draftJs.RichUtils.insertSoftNewline(editorState)
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
            } //TODO turn this in configurable


            switch (blockType) {
              case "header-one":
                _this.onChange(resetBlockWithType(editorState, "unstyled"));

                return true;
                break;

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
              if (_this.continuousBlocks.indexOf(blockType) < 0) {
                _this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));

                return true;
              }
            }

            return false;
          } // selection.isCollapsed() and # should we check collapsed here?


          if (currentBlock.getLength() === selection.getStartOffset()) {
            //or (config_block && config_block.breakOnContinuous))
            // it will match the unstyled for custom blocks
            if (_this.continuousBlocks.indexOf(blockType) < 0) {
              _this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));

              return true;
            }

            return false;
          }

          return false;
        }
      });

      _defineProperty(_assertThisInitialized(_this), "handleBeforeInput", function (chars) {
        var currentBlock = getCurrentBlock(_this.state.editorState);
        if (!currentBlock) return;
        var blockType = currentBlock.getType();

        var selection = _this.state.editorState.getSelection();

        var editorState = _this.state.editorState; // close popovers

        if (currentBlock.getText().length !== 0) {
          //@closeInlineButton()
          _this.closePopOvers();
        } // handle space on link


        var endOffset = selection.getEndOffset();
        var endKey = currentBlock.getEntityAt(endOffset - 1);
        var endEntityType = endKey && draftJs.Entity.get(endKey).getType();
        var afterEndKey = currentBlock.getEntityAt(endOffset);
        var afterEndEntityType = afterEndKey && draftJs.Entity.get(afterEndKey).getType(); // will insert blank space when link found

        if (chars === ' ' && endEntityType === 'LINK' && afterEndEntityType !== 'LINK') {
          var newContentState = draftJs.Modifier.insertText(editorState.getCurrentContent(), selection, ' ');
          var newEditorState = draftJs.EditorState.push(editorState, newContentState, 'insert-characters');

          _this.onChange(newEditorState);

          return true;
        } // block transform


        if (blockType.indexOf('atomic') === 0) {
          return false;
        }

        var blockLength = currentBlock.getLength();

        if (selection.getAnchorOffset() > 1 || blockLength > 1) {
          return false;
        }

        var blockTo = _this.character_convert_mapping[currentBlock.getText() + chars];

        console.log("BLOCK TO SHOW: ".concat(blockTo));

        if (!blockTo) {
          return false;
        }

        _this.onChange(resetBlockWithType(editorState, blockTo));

        return true;
      });

      _defineProperty(_assertThisInitialized(_this), "handleKeyCommand", function (command) {
        var editorState = _this.state.editorState;
        var newBlockType;

        if (_this.props.handleKeyCommand && _this.props.handleKeyCommand(command)) {
          return true;
        }

        if (command === 'add-new-block') {
          _this.onChange(addNewBlock(editorState, 'blockquote'));

          return true;
        }

        if (command.indexOf('toggle_inline:') === 0) {
          newBlockType = command.split(':')[1];

          _this.onChange(draftJs.RichUtils.toggleInlineStyle(editorState, newBlockType));

          return true;
        }

        if (command.indexOf('toggle_block:') === 0) {
          newBlockType = command.split(':')[1];

          _this.onChange(draftJs.RichUtils.toggleBlockType(editorState, newBlockType));

          return true;
        }

        var newState = draftJs.RichUtils.handleKeyCommand(_this.state.editorState, command);

        if (newState) {
          _this.onChange(newState);

          return true;
        }

        return false;
      });

      _defineProperty(_assertThisInitialized(_this), "findCommandKey", function (opt, command) {
        // console.log "COMMAND find: #{opt} #{command}"
        return _this.key_commands[opt].find(function (o) {
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

            return draftJs.getDefaultKeyBinding(e);
          }

          if (e.ctrlKey || e.metaKey) {
            cmd = _this.findCommandKey("alt-cmd", e.which);

            if (cmd) {
              return cmd.cmd;
            }

            return draftJs.getDefaultKeyBinding(e);
          }
        } else if (e.ctrlKey || e.metaKey) {
          cmd = _this.findCommandKey("cmd", e.which);

          if (cmd) {
            return cmd.cmd;
          }

          return draftJs.getDefaultKeyBinding(e);
        }

        return draftJs.getDefaultKeyBinding(e);
      });

      _defineProperty(_assertThisInitialized(_this), "updateBlockData", function (block, options) {
        var data = block.getData();
        var newData = data.merge(options);
        var newState = updateDataOfBlock(_this.state.editorState, block, newData); // this fixes enter from image caption

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

      _defineProperty(_assertThisInitialized(_this), "toggleEditable", function () {
        _this.closePopOvers();

        return _this.setState({
          read_only: !_this.state.read_only
        }, _this.testEmitAndDecode);
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
        return _this.tooltips.map(function (o) {
          return _this.refs[o.ref].hide();
        });
      });

      _defineProperty(_assertThisInitialized(_this), "relocateTooltips", function () {
        if (_this.state.read_only) return;
        if (lodash.isEmpty(_this.refs)) return;
        if (!getCurrentBlock(_this.state.editorState)) return;
        return _this.tooltips.map(function (o) {
          return _this.refs[o.ref].relocate();
        });
      });

      _defineProperty(_assertThisInitialized(_this), "tooltipsWithProp", function (prop) {
        return _this.tooltips.filter(function (o) {
          return o[prop];
        });
      });

      _defineProperty(_assertThisInitialized(_this), "tooltipHasSelectionElement", function (tooltip, element) {
        return tooltip.selectionElements.includes(element);
      });

      _defineProperty(_assertThisInitialized(_this), "handleShowPopLinkOver", function (e) {
        return _this.showPopLinkOver();
      });

      _defineProperty(_assertThisInitialized(_this), "handleHidePopLinkOver", function (e) {
        return _this.hidePopLinkOver();
      });

      _defineProperty(_assertThisInitialized(_this), "showPopLinkOver", function (el) {
        // handles popover display
        // using anchor or from popover
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
        return _this.hideTimeout = setTimeout(function () {
          return _this.refs.anchor_popover.hide();
        }, 300);
      });

      _defineProperty(_assertThisInitialized(_this), "cancelHide", function () {
        // console.log "Cancel Hide"
        return clearTimeout(_this.hideTimeout);
      });

      _this.render = _this.render.bind(_assertThisInitialized(_this));
      _this.decorator = new draftJs.CompositeDecorator([{
        strategy: findEntities.bind(null, 'LINK', _assertThisInitialized(_this)),
        component: Link
      }]);
      _this.blockRenderMap = Immutable.Map({
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
      _this.extendedBlockRenderMap = draftJs.DefaultDraftBlockRenderMap.merge(_this.blockRenderMap);
      _this.state = {
        editorState: draftJs.EditorState.createEmpty(),
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

      var _createStyles = createStyles(['font-size', 'color', 'font-family']),
          styles = _createStyles.styles,
          customStyleFn = _createStyles.customStyleFn,
          exporter = _createStyles.exporter; //, 'PREFIX', customStyleMap);


      _this.styles = styles;
      _this.customStyleFn = customStyleFn;
      _this.styleExporter = exporter;
      _this.save = new SaveBehavior({
        getLocks: _this.getLocks,
        config: {
          xhr: _this.props.config.xhr,
          data_storage: _this.props.config.data_storage
        },
        editor: _assertThisInitialized(_this),
        editorState: _this.getEditorState,
        editorContent: _this.emitSerializedOutput()
      });
      return _this;
    }

    _createClass(DanteEditor, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.initializeState();
        window.addEventListener('resize', function () {
          if (_this2.relocateTooltips) setTimeout(function () {
            return _this2.relocateTooltips();
          });
        });
      }
    }, {
      key: "render",
      //##############################
      value: function render() {
        var _this3 = this;

        return React.createElement("div", {
          suppressContentEditableWarning: true
        }, React.createElement("div", {
          className: "postContent"
        }, React.createElement("div", {
          ref: "richEditor",
          className: "section-inner layoutSingleColumn",
          onClick: this.focus
        }, React.createElement(draftJs.Editor, {
          blockRendererFn: this.blockRenderer,
          editorState: this.state.editorState,
          onChange: this.onChange,
          handleDrop: this.handleDrop,
          onUpArrow: this.handleUpArrow,
          onDownArrow: this.handleDownArrow,
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
          readOnly: this.state.read_only,
          placeholder: this.props.config.body_placeholder,
          ref: "editor"
        }))), this.tooltips.map(function (o, i) {
          return React.createElement(o.component, {
            ref: o.ref,
            key: i,
            editor: _this3,
            editorState: _this3.state.editorState,
            onChange: _this3.onChange,
            styles: _this3.styles,
            configTooltip: o,
            widget_options: o.widget_options,
            showPopLinkOver: _this3.showPopLinkOver,
            hidePopLinkOver: _this3.hidePopLinkOver,
            handleOnMouseOver: _this3.handleShowPopLinkOver,
            handleOnMouseOut: _this3.handleHidePopLinkOver
          });
        }), this.state.debug ? React.createElement(Debug, {
          locks: this.state.locks,
          editor: this
        }) : undefined);
      }
    }]);

    return DanteEditor;
  }(React.Component);

  function imageFill() {
    return React.createElement("svg", {
      id: "icon-image-fill",
      width: "20px",
      height: "20px",
      viewBox: "0 0 36 32"
    }, React.createElement("path", {
      fill: "#fff",
      d: "M4 26h28v3h-28v-3zM0 2h36v21h-36v-21z"
    }));
  }
  function imageCenter() {
    return React.createElement("svg", {
      id: "icon-image-center",
      width: "20px",
      height: "20px",
      viewBox: "0 0 36 32"
    }, React.createElement("path", {
      fill: "#fff",
      d: "M4 26h28v3h-28v-3zM4 8h28v15h-28v-15zM4 2h28v3h-28v-3z"
    }));
  }
  function imageLeft() {
    return React.createElement("svg", {
      id: "icon-image-left",
      width: "20px",
      height: "20px",
      viewBox: "0 0 36 32"
    }, React.createElement("path", {
      fill: "#fff",
      d: "M8 26h28v3h-28v-3zM24 20h12v3h-12v-3zM0 8h21v15h-21v-15zM24 14h12v3h-12v-3zM24 8h12v3h-12v-3zM8 2h28v3h-28v-3z"
    }));
  }
  function imageWide() {
    return React.createElement("svg", {
      id: "icon-image-wide",
      width: "20px",
      height: "20px",
      viewBox: "0 0 36 32"
    }, React.createElement("path", {
      fill: "#fff",
      d: "M4 26h28v3h-28v-3zM0 8h36v15h-36v-15zM4 2h28v3h-28v-3z"
    }));
  } // INLINE TOOLTIP

  function image() {
    return React.createElement("svg", {
      className: "icon-photo",
      width: "20px",
      height: "20px",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      fill: "#494B56",
      fillRule: "nonzero",
      d: "M17.0705329,6.17097418 L14.5626959,6.17097418 L14.3369906,5.2405567 L14.3119122,5.13717696 C14.1112853,4.46520879 13.5094044,4 12.8322884,4 L8.1426332,4 C7.4655172,4 6.8636364,4.46520879 6.6630094,5.13717696 L6.4122257,6.17097418 L3.9043887,6.17097418 C3.1269592,6.17097418 2.5,6.84294235 2.5,7.61829026 L2.5,15.5526838 C2.5,16.3538767 3.1520376,17 3.9043887,17 L17.0956113,17 C17.8730408,17 18.5,16.3280317 18.5,15.5526838 L18.5,7.64413522 C18.5,6.84294235 17.8479624,6.17097418 17.0705329,6.17097418 Z M17.7476489,15.5526838 C17.7476489,15.9145129 17.4467085,16.2246521 17.0956113,16.2246521 L3.9043887,16.2246521 C3.5532915,16.2246521 3.2523511,15.9145129 3.2523511,15.5526838 L3.2523511,7.64413522 C3.2523511,7.28230618 3.5532915,6.97216695 3.9043887,6.97216695 L7.0141066,6.97216695 L7.3902821,5.42147112 L7.3902821,5.34393634 C7.515674,5.00795226 7.8166144,4.80119287 8.1426332,4.80119287 L12.8322884,4.80119287 C13.1583072,4.80119287 13.484326,5.03379722 13.5846395,5.34393634 L13.9858934,6.97216695 L17.0705329,6.97216695 C17.4467085,6.97216695 17.7476489,7.28230618 17.7476489,7.64413522 L17.7476489,15.5526838 Z M10.4749216,7.51491052 C8.468652,7.51491052 6.838558,9.19483105 6.838558,11.2624254 C6.838558,13.3300198 8.468652,15.0099403 10.4749216,15.0099403 C12.4811912,15.0099403 14.1112853,13.3300198 14.1112853,11.2624254 C14.1112853,9.19483105 12.4811912,7.51491052 10.4749216,7.51491052 Z M10.4749216,14.2345924 C8.8949843,14.2345924 7.5909091,12.890656 7.5909091,11.2624254 C7.5909091,9.63419477 8.8949843,8.29025843 10.4749216,8.29025843 C12.0548589,8.29025843 13.3589342,9.63419477 13.3589342,11.2624254 C13.3589342,12.9165009 12.0799373,14.2345924 10.4749216,14.2345924 Z"
    }));
  }
  function video() {
    return React.createElement("svg", {
      className: "icon-video",
      width: "20px",
      height: "20px",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      fill: "#494B56",
      fillRule: "nonzero",
      d: "M6.5,4 L6.5,15.5471358 L16.5,9.7735679 L6.5,4 Z M7.2945422,5.375733 L14.9109157,9.7735679 L7.2945422,14.1714028 L7.2945422,5.375733 Z",
      id: "Shape"
    }));
  }
  function divider() {
    return React.createElement("svg", {
      className: "icon-spacer",
      width: "20px",
      height: "20px",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      fill: "#494B56",
      d: "M3,10 L4,10 L4,11 L3,11 L3,10 Z M5,10 L6,10 L6,11 L5,11 L5,10 Z M7,10 L8,10 L8,11 L7,11 L7,10 Z M9,10 L10,10 L10,11 L9,11 L9,10 Z M11,10 L12,10 L12,11 L11,11 L11,10 Z M13,10 L14,10 L14,11 L13,11 L13,10 Z M15,10 L16,10 L16,11 L15,11 L15,10 Z M17,10 L18,10 L18,11 L17,11 L17,10 Z"
    }), React.createElement("rect", {
      fill: "#DEE0E8",
      fillRule: "nonzero",
      x: "2",
      y: "6",
      width: "17",
      height: "2"
    }), React.createElement("rect", {
      fill: "#DEE0E8",
      fillRule: "nonzero",
      x: "2",
      y: "13",
      width: "17",
      height: "2"
    }));
  }
  function button() {
    return React.createElement("svg", {
      className: "icon-button",
      width: "20px",
      height: "20px",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      fill: "#494B56",
      fillRule: "nonzero",
      d: "M12.2382748,16.999996 L8.31885183,16.9847535 C8.15303655,16.9841672 8.01611714,16.8713137 8.00586918,16.7269491 C7.92590153,15.5935771 7.14470492,14.7307605 6.42701203,13.776342 C6.0888295,13.3266866 5.90907027,12.7562633 6.04632568,12.259268 C6.17501312,11.7924647 6.56930741,11.4407135 7.22164859,11.324489 L7.32916812,11.311738 L7.32916812,7.98548983 L7.32732013,7.8889048 C7.33588809,7.62890201 7.44189563,7.40729864 7.64063877,7.24695869 C7.86021382,7.06976399 8.15370855,7 8.4418273,7 C8.75615393,7 9.08308052,7.03854604 9.30467155,7.24666553 C9.52189463,7.45053475 9.55986241,7.74571269 9.54743054,8.05158978 L9.54306253,9.42488547 L9.66469398,9.39483999 C9.74768567,9.38194244 9.83218929,9.37593336 9.91602093,9.37593336 C10.0809962,9.37593336 10.2394195,9.38692558 10.3823868,9.42122134 C10.5295542,9.45654303 10.6678177,9.51824607 10.7788651,9.62259898 C10.833129,9.6737495 10.8763047,9.7304694 10.9102406,9.79158611 L10.9584564,9.91557852 L11.1810555,9.86076387 C11.2640471,9.8478664 11.3483827,9.84185723 11.4322144,9.84185723 C11.5971896,9.84185723 11.755613,9.85284954 11.8985803,9.88714521 C12.0455797,9.92246691 12.183843,9.98416994 12.2948906,10.0885229 C12.4035862,10.1906773 12.4674259,10.3154024 12.5023697,10.4528786 L12.5048897,10.4690005 L12.5532735,10.4618189 C12.6070332,10.4566892 12.6612971,10.4541976 12.7155608,10.4541976 C13.0739032,10.4541976 13.3823499,10.5326089 13.6012529,10.784111 C13.7905881,11.0017572 13.8789557,11.3176005 13.9535474,11.6910431 C14.283666,13.5689553 12.7530246,15.5343657 12.5515935,16.7641761 C12.5292496,16.8998935 12.3955222,17.0007288 12.2382748,16.999996 Z M11.9783799,16.4496518 L11.9839239,16.4238567 C12.3303384,15.0848568 13.6115009,13.3706555 13.3317821,11.7800069 C13.2561824,11.4014346 13.1844468,11.214127 13.0994391,11.116516 C13.0439993,11.0527611 12.9638637,11.003809 12.7155608,11.003809 C12.648697,11.003809 12.5893933,11.0099647 12.5369776,11.0208104 L12.5274016,11.847719 C12.5258896,11.9994118 12.3834262,12.1213522 12.209547,12.1198866 C12.0356677,12.1185675 11.8958924,11.994282 11.8975724,11.8425893 L11.9078203,10.8820152 C11.9197483,10.5836128 11.8654844,10.4927437 11.8333966,10.4625518 C11.8050047,10.4360238 11.724029,10.3914687 11.4322144,10.3914687 C11.2213752,10.3914687 11.0911758,10.450387 11.0229681,10.5255738 L11.0112082,11.3819417 C11.0096962,11.5336344 10.8672327,11.6555749 10.6933536,11.6541092 C10.5194743,11.6527902 10.3796989,11.5285047 10.3813789,11.376812 L10.3917949,10.4163844 C10.4037228,10.117982 10.3494591,10.0269664 10.3173711,9.99662789 C10.2889793,9.97009992 10.2076676,9.9255448 9.91602093,9.9255448 C9.75776556,9.9255448 9.64503811,9.95881462 9.57095042,10.006301 L9.54121456,10.0312167 L9.53701451,11.4081765 C9.53667857,11.5598692 9.39505511,11.6825425 9.22117592,11.6821028 C9.04729667,11.6818097 8.90668128,11.558257 8.90718528,11.4065643 L8.91760124,8.0411838 C8.92952918,7.74190211 8.87560141,7.65132615 8.84317756,7.62069444 C8.81478568,7.59416656 8.73364203,7.54961135 8.4418273,7.54961135 C8.26190008,7.54961135 8.13926061,7.59328716 8.06836492,7.65044675 C8.0045252,7.70203697 7.94589345,7.79305254 7.9584934,7.96848854 L7.95916538,7.98548983 L7.95916538,12.8607627 C7.95916538,13.0124555 7.817878,13.1355684 7.64416675,13.1355684 C7.47028751,13.1355684 7.32916812,13.0124555 7.32916812,12.8607627 L7.32916812,11.867505 L7.18216876,11.9015076 C6.86213014,11.9979461 6.71496278,12.1843743 6.65885103,12.3879504 C6.57384339,12.6958793 6.68018694,13.1110924 6.95368974,13.4748618 C7.5395032,14.2538444 8.31582784,15.1258945 8.56312277,16.2135388 L8.60529059,16.4364612 L11.9783799,16.4496518 Z"
    }), React.createElement("path", {
      fill: "#494B56",
      fillRule: "nonzero",
      d: "M15.1508665,12.9 L15.1508665,12.1 L15.5514921,12.1 C17.5101104,12.1 19.1,10.4893769 19.1,8.5 C19.1,6.51062312 17.5101104,4.9 15.5514921,4.9 L4.44850787,4.9 C2.4898895,4.9 0.9,6.51062311 0.9,8.5 C0.9,10.4893769 2.4898895,12.1 4.44850787,12.1 L4.69642245,12.1 L4.69642245,12.9 L4.44850787,12.9 C2.04572487,12.9 0.1,10.9289011 0.1,8.5 C0.1,6.07109889 2.04572487,4.1 4.44850787,4.1 L15.5514921,4.1 C17.9542751,4.1 19.9,6.0710989 19.9,8.5 C19.9,10.9289011 17.9542751,12.9 15.5514921,12.9 L15.1508665,12.9 Z"
    }));
  }
  function card() {
    return React.createElement("svg", {
      className: "icon-signature",
      width: "20px",
      height: "20px",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      fill: "#494B56",
      fillRule: "nonzero",
      d: "M9.9347554,11.8295455 C9.795059,11.8295455 9.68330189,11.7113637 9.68330189,11.5636364 L9.68330189,10.3522727 C9.68330189,10.3375 9.68330189,10.3227273 9.68330189,10.3079546 C10.2839964,9.7909091 10.6611767,9.00795455 10.6611767,8.13636364 L10.6611767,6.80681819 C10.6611767,5.25568182 9.47375729,4 8.00694511,4 C6.54013294,4 5.35271355,5.25568182 5.35271355,6.80681819 L5.35271355,8.13636364 C5.35271355,9.00795455 5.72989382,9.7909091 6.33058833,10.3079546 C6.33058833,10.3227273 6.33058833,10.3375 6.33058833,10.3522727 L6.33058833,11.5636364 C6.33058833,11.7113637 6.21883121,11.8295455 6.07913482,11.8295455 C3.83002281,11.8295455 2,13.7647727 2,16.1431819 C2,16.6159091 2.36321064,17 2.81023911,17 L13.1896814,17 C13.6367099,17 13.9999205,16.6159091 13.9999205,16.1431819 C14.0138902,13.7647727 12.1838674,11.8295455 9.9347554,11.8295455 Z M6.19089194,8.13636364 L6.19089194,6.80681819 C6.19089194,5.74318183 7.00113105,4.88636364 8.00694511,4.88636364 C9.01275918,4.88636364 9.82299828,5.74318183 9.82299828,6.80681819 L9.82299828,8.13636364 C9.82299828,9.20000001 9.01275918,10.0568182 8.00694511,10.0568182 C7.00113105,10.0568182 6.19089194,9.20000001 6.19089194,8.13636364 Z M2.83817839,16.1136363 C2.85214803,14.2375 4.29102093,12.7159091 6.07913482,12.7159091 C6.67982933,12.7159091 7.16876672,12.1988637 7.16876672,11.5636364 L7.16876672,10.7954546 C7.43418988,10.8840909 7.71358268,10.9431818 8.00694511,10.9431818 C8.30030755,10.9431818 8.57970034,10.8840909 8.8451235,10.7954546 L8.8451235,11.5488637 C8.8451235,12.1840909 9.33406089,12.7011364 9.9347554,12.7011364 C11.7228693,12.7159091 13.1617422,14.2375 13.1757119,16.1136363 L2.83817839,16.1136363 Z"
    }), React.createElement("rect", {
      fill: "#494B56",
      fillRule: "nonzero",
      x: "13",
      y: "6",
      width: "6",
      height: "1"
    }), React.createElement("rect", {
      fill: "#494B56",
      fillRule: "nonzero",
      x: "13",
      y: "8",
      width: "6",
      height: "1"
    }), React.createElement("rect", {
      fill: "#494B56",
      fillRule: "nonzero",
      x: "13",
      y: "10",
      width: "6",
      height: "1"
    }));
  }
  function add() {
    return React.createElement("svg", {
      className: "icon-add",
      width: "30px",
      height: "23px",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      fill: "#494B56",
      fillRule: "nonzero",
      d: "M16.5,10 C16.5,10.3122826 16.2470652,10.5652174 15.9347826,10.5652174 L10.5652174,10.5652174 L10.5652174,15.9347826 C10.5652174,16.2467826 10.3122826,16.5 10,16.5 C9.6877174,16.5 9.4347826,16.2467826 9.4347826,15.9347826 L9.4347826,10.5652174 L4.0652174,10.5652174 C3.7529348,10.5652174 3.5,10.3122826 3.5,10 C3.5,9.6877174 3.7529348,9.4347826 4.0652174,9.4347826 L9.4347826,9.4347826 L9.4347826,4.0652174 C9.4347826,3.7529348 9.6877174,3.5 10,3.5 C10.3122826,3.5 10.5652174,3.7529348 10.5652174,4.0652174 L10.5652174,9.4347826 L15.9347826,9.4347826 C16.2470652,9.4347826 16.5,9.6877174 16.5,10 Z"
    }));
  }
  function embed() {
    return React.createElement("svg", {
      className: "icon-embed",
      width: "20px",
      height: "20px",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      fill: "#494B56",
      d: "M13.0410996,14.8261802 C12.8030724,15.057835 12.4169249,15.0580448 12.1786821,14.8261802 C11.9404393,14.5943156 11.9406549,14.2185061 12.1786821,13.9868514 L16.275165,10.0000393 L12.1786821,6.01322731 C11.9404393,5.78136272 11.9404393,5.40576303 12.1786821,5.17389844 C12.4169249,4.94203385 12.8028568,4.94203385 13.0410996,5.17389844 L18,10.0000393 L13.0410996,14.8261802 Z"
    }), React.createElement("path", {
      fill: "#494B56",
      d: "M6.95890041,14.8261802 L2,10.0000393 L6.95890041,5.17389844 C7.19714323,4.94203385 7.58307507,4.94203385 7.82131789,5.17389844 C8.0595607,5.40576303 8.0595607,5.78136272 7.82131789,6.01322731 L3.72483495,10.0000393 L7.82131789,13.9868514 C8.05934511,14.2185061 8.0595607,14.5943156 7.82131789,14.8261802 C7.58307507,15.0580448 7.19692763,15.057835 6.95890041,14.8261802 Z"
    }));
  } // TEXT TOOLTIP

  function fontColor() {
    return React.createElement("svg", {
      className: "icon-fontcolor",
      width: "22px",
      height: "22px",
      viewBox: "0 0 22 22",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      fill: "#B1B4C1",
      className: "icon-fillcolor",
      fillRule: "nonzero",
      d: "M8.12739586,9.73148148 L10.4359896,4.25925926 L10.2674515,3.85976152 L10.6775092,3.68676844 L10.8505023,3.27671076 L11.25,3.44524887 L11.6494977,3.27671076 L11.8224908,3.68676844 L12.2325485,3.85976152 L12.0640104,4.25925926 L14.3726041,9.73148148 L14.5,9.73148148 L14.5,10.0334569 L15.7325485,12.9550533 L14.3505023,13.5381041 L13.3773959,11.2314815 L9.12260414,11.2314815 L8.14949774,13.5381041 L6.7674515,12.9550533 L8,10.0334569 L8,9.73148148 L8.12739586,9.73148148 Z M9.75541664,9.73148148 L12.7445834,9.73148148 L11.25,6.18876537 L9.75541664,9.73148148 Z"
    }), React.createElement("path", {
      fill: "#07A8FF",
      d: "M14,15.9259259 L19,15.9259259 C19.5522847,15.9259259 20,16.3736412 20,16.9259259 L20,17 C20,17.5522847 19.5522847,18 19,18 L14,18 L14,15.9259259 Z"
    }), React.createElement("rect", {
      fill: "#FFCE0F",
      x: "8",
      y: "15.9259259",
      width: "6",
      height: "2.07407407"
    }), React.createElement("path", {
      fill: "#FF2B64",
      d: "M3,15.9259259 L8,15.9259259 L8,18 L3,18 C2.44771525,18 2,17.5522847 2,17 L2,16.9259259 C2,16.3736412 2.44771525,15.9259259 3,15.9259259 Z"
    }));
  }
  function bold() {
    return React.createElement("svg", {
      className: "icon-bold",
      width: "22px",
      height: "22px",
      viewBox: "0 0 22 22",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      className: "icon-fillcolor",
      fill: "#B1B4C1",
      d: "M11.2197266,10.546875 C11.9580115,10.546875 12.5322245,10.444337 12.9423828,10.2392578 C13.5869173,9.91699058 13.9091797,9.33691825 13.9091797,8.49902344 C13.9091797,7.65526922 13.5664097,7.08691553 12.8808594,6.79394531 C12.4941387,6.62988199 11.9199257,6.54785156 11.1582031,6.54785156 L8.03808593,6.54785156 L8.03808593,10.546875 L11.2197266,10.546875 Z M11.8085937,16.5058594 C12.8808647,16.5058594 13.6455055,16.1953156 14.1025391,15.5742188 C14.3896499,15.1816387 14.5332031,14.707034 14.5332031,14.1503906 C14.5332031,13.2128859 14.114262,12.5742204 13.2763672,12.234375 C12.8310524,12.0527335 12.2421911,11.9619141 11.5097656,11.9619141 L8.03808593,11.9619141 L8.03808593,16.5058594 L11.8085937,16.5058594 Z M6.32421874,5.08886719 L11.8701172,5.08886719 C13.3818435,5.08886719 14.457028,5.54003455 15.0957031,6.44238281 C15.470705,6.9755886 15.6582031,7.59081683 15.6582031,8.28808594 C15.6582031,9.10254313 15.4267601,9.77050521 14.9638672,10.2919922 C14.7236316,10.5673842 14.3779319,10.8193348 13.9267578,11.0478516 C14.5888705,11.2998059 15.0839827,11.5839828 15.4121094,11.9003906 C15.9921904,12.4628934 16.2822266,13.2392529 16.2822266,14.2294922 C16.2822266,15.0615276 16.021487,15.8144498 15.5,16.4882812 C14.7206992,17.4960988 13.4814538,18 11.7822266,18 L6.32421874,18 L6.32421874,5.08886719 Z"
    }));
  }
  function italic() {
    return React.createElement("svg", {
      className: "icon-italic",
      width: "22px",
      height: "22px",
      viewBox: "0 0 22 22",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("polygon", {
      className: "icon-fillcolor",
      id: "I",
      fill: "#B1B4C1",
      points: "11.5083008 5.08886719 13.2749023 5.08886719 10.5327148 18 8.76611326 18"
    }));
  }
  function insertunorderedlist() {
    return React.createElement("svg", {
      className: "icon-unorderedlist",
      width: "22px",
      height: "22px",
      viewBox: "0 0 22 22",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      className: "icon-fillcolor",
      fill: "#B1B4C1",
      fillRule: "nonzero",
      d: "M7.5,10.5 L19.5,10.5 C19.776142,10.5 20,10.7238576 20,11 C20,11.2761424 19.776142,11.5 19.5,11.5 L7.5,11.5 C7.223858,11.5 7,11.2761424 7,11 C7,10.7238576 7.223858,10.5 7.5,10.5 Z M4,12 C3.447715,12 3,11.5522847 3,11 C3,10.4477153 3.447715,10 4,10 C4.552285,10 5,10.4477153 5,11 C5,11.5522847 4.552285,12 4,12 Z M7.5,5.5 L19.5,5.5 C19.776142,5.5 20,5.7238576 20,6 C20,6.2761424 19.776142,6.5 19.5,6.5 L7.5,6.5 C7.223858,6.5 7,6.2761424 7,6 C7,5.7238576 7.223858,5.5 7.5,5.5 Z M4,7 C3.447715,7 3,6.5522847 3,6 C3,5.4477153 3.447715,5 4,5 C4.552285,5 5,5.4477153 5,6 C5,6.5522847 4.552285,7 4,7 Z M7.5,15.5 L19.5,15.5 C19.776142,15.5 20,15.7238576 20,16 C20,16.2761424 19.776142,16.5 19.5,16.5 L7.5,16.5 C7.223858,16.5 7,16.2761424 7,16 C7,15.7238576 7.223858,15.5 7.5,15.5 Z M4,17 C3.447715,17 3,16.5522847 3,16 C3,15.4477153 3.447715,15 4,15 C4.552285,15 5,15.4477153 5,16 C5,16.5522847 4.552285,17 4,17 Z"
    }));
  }
  function insertorderedlist() {
    return React.createElement("svg", {
      className: "icon-orderedlist",
      width: "22px",
      height: "22px",
      viewBox: "0 0 22 22",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      className: "icon-fillcolor",
      fill: "#B1B4C1",
      fillRule: "nonzero",
      d: "M6.925,9.835 L18.925,9.835 C19.201142,9.835 19.425,10.0588576 19.425,10.335 C19.425,10.6111424 19.201142,10.835 18.925,10.835 L6.925,10.835 C6.648858,10.835 6.425,10.6111424 6.425,10.335 C6.425,10.0588576 6.648858,9.835 6.925,9.835 Z M4.2425,7.335 L3.3825,7.335 L3.3825,5.1 L2.8225,5.665 L2.3325,5.15 L3.4975,4 L4.2425,4 L4.2425,7.335 Z M6.925,4.835 L18.925,4.835 C19.201142,4.835 19.425,5.0588576 19.425,5.335 C19.425,5.6111424 19.201142,5.835 18.925,5.835 L6.925,5.835 C6.648858,5.835 6.425,5.6111424 6.425,5.335 C6.425,5.0588576 6.648858,4.835 6.925,4.835 Z M4.7425,12.335 L2.1275,12.335 L2.1275,11.665 C3.5725,10.62 3.8425,10.39 3.8425,10.055 C3.8425,9.83 3.6275,9.71 3.3825,9.71 C3.0125,9.71 2.7325,9.85 2.4925,10.075 L2.0175,9.505 C2.3725,9.115 2.9025,8.95 3.3675,8.95 C4.1525,8.95 4.7175,9.39 4.7175,10.055 C4.7175,10.57 4.3525,11.005 3.5225,11.585 L4.7425,11.585 L4.7425,12.335 Z M6.925,14.835 L18.925,14.835 C19.201142,14.835 19.425,15.0588576 19.425,15.335 C19.425,15.6111424 19.201142,15.835 18.925,15.835 L6.925,15.835 C6.648858,15.835 6.425,15.6111424 6.425,15.335 C6.425,15.0588576 6.648858,14.835 6.925,14.835 Z M3.38,17.395 C2.74,17.395 2.265,17.17 2,16.87 L2.435,16.285 C2.68,16.52 3.055,16.635 3.345,16.635 C3.715,16.635 3.905,16.495 3.905,16.31 C3.905,16.12 3.765,16.025 3.31,16.025 C3.165,16.025 2.91,16.03 2.86,16.035 L2.86,15.27 C2.925,15.275 3.185,15.275 3.31,15.275 C3.655,15.275 3.85,15.19 3.85,15.015 C3.85,14.805 3.61,14.71 3.29,14.71 C2.985,14.71 2.695,14.82 2.46,15.03 L2.045,14.49 C2.33,14.175 2.765,13.95 3.38,13.95 C4.23,13.95 4.705,14.315 4.705,14.865 C4.705,15.255 4.37,15.55 3.975,15.615 C4.33,15.65 4.76,15.925 4.76,16.405 C4.76,16.99 4.21,17.395 3.38,17.395 Z"
    }));
  }
  function link() {
    return React.createElement("svg", {
      className: "icon-link",
      width: "22px",
      height: "22px",
      viewBox: "0 0 22 22",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      className: "icon-fillcolor",
      fill: "#B1B4C1",
      fillRule: "nonzero",
      d: "M15.4241733,7 C17.3945268,7 19,8.62962961 19,10.6296296 L19,11.3703704 C19,13.3703704 17.3945268,15 15.4241733,15 L12.7787913,15 C10.8084378,15 9.20296462,13.3703704 9.20296462,11.3703704 L9.20296462,10.2592592 C9.20296462,9.85185179 9.53135687,9.51851846 9.9327252,9.51851846 C10.3340935,9.51851846 10.6624858,9.85185179 10.6624858,10.2592592 L10.6624858,11.3703704 C10.6624858,12.5555555 11.6111745,13.5185185 12.7787913,13.5185185 L15.4241733,13.5185185 C16.5917902,13.5185185 17.5404788,12.5555555 17.5404788,11.3703704 L17.5404788,10.6296296 C17.5404788,9.44444449 16.5917902,8.48148154 15.4241733,8.48148154 L13.5085519,8.48148154 C13.1071835,8.48148154 12.7787913,8.14814821 12.7787913,7.74074077 C12.7787913,7.33333333 13.1071835,7 13.5085519,7 L15.4241733,7 Z M8.85632843,13.5185185 C9.25769662,13.5185185 9.58608887,13.8518518 9.58608887,14.2592592 C9.58608887,14.6666667 9.25769662,15 8.85632843,15 L6.57582666,15 C4.60547319,15 3,13.3703704 3,11.3703704 L3,10.6296296 C3,8.62962961 4.60547319,7 6.57582666,7 L9.58608887,7 C11.5564423,7 13.1619157,8.62962961 13.1619157,10.6296296 L13.1619157,11.7407408 C13.1619157,12.1481482 12.8335234,12.4814815 12.4321551,12.4814815 C12.0307868,12.4814815 11.7023945,12.1481482 11.7023945,11.7407408 L11.7023945,10.6296296 C11.7023945,9.44444449 10.7537058,8.48148154 9.58608887,8.48148154 L6.57582666,8.48148154 C5.40820985,8.48148154 4.45952115,9.44444449 4.45952115,10.6296296 L4.45952115,11.3703704 C4.45952115,12.5555555 5.40820985,13.5185185 6.57582666,13.5185185 L8.85632843,13.5185185 Z"
    }));
  }
  function close() {
    return React.createElement("svg", {
      className: "icon-close",
      width: "22px",
      height: "22px",
      viewBox: "0 0 22 22",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      className: "icon-fillcolor",
      fill: "#B1B4C1",
      fillRule: "nonzero",
      d: "M15.8261029,15.8261029 C15.5942402,16.0579657 15.2186434,16.0579657 14.9867807,15.8261029 L11,11.8393223 L7.01321933,15.8261029 C6.78156639,16.0577559 6.40575984,16.0579657 6.17389707,15.8261029 C5.94203431,15.5942402 5.94224413,15.2184336 6.17389707,14.9867807 L10.1606777,11 L6.17389707,7.01321933 C5.94203431,6.78135657 5.94203431,6.40575984 6.17389707,6.17389707 C6.40575984,5.94203431 6.78135657,5.94203431 7.01321933,6.17389707 L11,10.1606777 L14.9867807,6.17389707 C15.2186434,5.94203431 15.5942402,5.94203431 15.8261029,6.17389707 C16.0579657,6.40575984 16.0579657,6.78135657 15.8261029,7.01321933 L11.8393223,11 L15.8261029,14.9867807 C16.0579657,15.2186434 16.0579657,15.5942402 15.8261029,15.8261029 Z"
    }));
  }
  function blockquote() {
    return React.createElement("svg", {
      width: "19",
      height: "22",
      viewBox: "0 0 31 30",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      d: "M4,4 L13.597649,4 L13.597649,14.4859813 C13.6427086,15.993777 13.4286787,17.4101699 12.9555528,18.7352025 C12.4824269,20.0602351 11.8178076,21.2253325 10.961675,22.2305296 C10.1055424,23.2357267 9.08045165,24.0695709 7.88637197,24.7320872 C6.69229229,25.3946035 5.39684792,25.8172369 4,26 L4,21.4766355 C5.7122652,20.8826554 6.8837975,20.0031211 7.51463204,18.8380062 C8.14546659,17.6728914 8.46087913,16.245076 8.46087913,14.5545171 L4,14.5545171 L4,4 Z M18.3964736,4 L27.9941226,4 L27.9941226,14.4859813 C28.0391822,15.993777 27.8251523,17.4101699 27.3520264,18.7352025 C26.8789004,20.0602351 26.2142812,21.2253325 25.3581486,22.2305296 C24.502016,23.2357267 23.4769252,24.0695709 22.2828455,24.7320872 C21.0887658,25.3946035 19.7933215,25.8172369 18.3964736,26 L18.3964736,21.4766355 C20.1087388,20.8826554 21.280271,20.0031211 21.9111056,18.8380062 C22.5419401,17.6728914 22.8573527,16.245076 22.8573527,14.5545171 L18.3964736,14.5545171 L18.3964736,4 Z",
      id: "\u201D",
      className: "icon-fillcolor",
      fill: "#B1B4C1"
    }));
  }
  function code() {
    return React.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 34 31",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      d: "M15.512,11.828 L5.236,15.916 L15.512,20.004 L15.512,23.196 L1.288,17.568 L1.288,14.264 L15.512,8.608 L15.512,11.828 Z M19.392,20.004 L29.668,15.916 L19.392,11.828 L19.392,8.608 L33.616,14.264 L33.616,17.568 L19.392,23.196 L19.392,20.004 Z",
      id: "<->",
      className: "icon-fillcolor",
      fill: "#B1B4C1"
    }));
  }
  function h1() {
    return React.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 34 31",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      d: "M0.932,5.008 L5.328,5.008 L5.328,12.68 L13.42,12.68 L13.42,5.008 L17.816,5.008 L17.816,25 L13.42,25 L13.42,16.376 L5.328,16.376 L5.328,25 L0.932,25 L0.932,5.008 Z M29.1874147,25 L25.2114147,25 L25.2114147,12.288 L20.2834147,12.288 L20.2834147,9.292 C20.9740848,9.31066676 21.6414114,9.25933394 22.2854147,9.138 C22.9294179,9.01666606 23.5080788,8.80200154 24.0214147,8.494 C24.5347506,8.18599846 24.9687462,7.78000252 25.3234147,7.276 C25.6780831,6.77199748 25.9114141,6.1466704 26.0234147,5.4 L29.1874147,5.4 L29.1874147,25 Z",
      id: "H1",
      className: "icon-fillcolor",
      fill: "#B1B4C1"
    }));
  }
  function h2() {
    return React.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 34 31",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      d: "M0.932,5.008 L5.328,5.008 L5.328,12.68 L13.42,12.68 L13.42,5.008 L17.816,5.008 L17.816,25 L13.42,25 L13.42,16.376 L5.328,16.376 L5.328,25 L0.932,25 L0.932,5.008 Z M19.2474147,12.932 C19.2100811,11.8119944 19.3407465,10.7713381 19.6394147,9.81 C19.9380828,8.84866186 20.3860783,8.00867026 20.9834147,7.29 C21.580751,6.57132974 22.3320768,6.01133534 23.2374147,5.61 C24.1427525,5.20866466 25.1834088,5.008 26.3594147,5.008 C27.2554191,5.008 28.1094106,5.1479986 28.9214147,5.428 C29.7334187,5.7080014 30.4474116,6.10933072 31.0634147,6.632 C31.6794177,7.15466928 32.1694128,7.79866284 32.5334147,8.564 C32.8974165,9.32933716 33.0794147,10.1879952 33.0794147,11.14 C33.0794147,12.1293383 32.9207496,12.9786631 32.6034147,13.688 C32.2860797,14.3973369 31.8660839,15.0273306 31.3434147,15.578 C30.8207454,16.1286694 30.2280846,16.6279978 29.5654147,17.076 C28.9027447,17.5240022 28.235418,17.9673311 27.5634147,18.406 C26.8914113,18.8446689 26.2380845,19.3159975 25.6034147,19.82 C24.9687448,20.3240025 24.4087504,20.9119966 23.9234147,21.584 L33.1914147,21.584 L33.1914147,25 L18.7994147,25 C18.7994147,23.8613276 18.9627464,22.8720042 19.2894147,22.032 C19.616083,21.1919958 20.0594119,20.44067 20.6194147,19.778 C21.1794175,19.11533 21.8374109,18.5040028 22.5934147,17.944 C23.3494184,17.3839972 24.1474105,16.8146696 24.9874147,16.236 C25.4167501,15.9373318 25.8740789,15.6340015 26.3594147,15.326 C26.8447504,15.0179985 27.2880793,14.6773352 27.6894147,14.304 C28.09075,13.9306648 28.4267466,13.510669 28.6974147,13.044 C28.9680827,12.577331 29.1034147,12.0453363 29.1034147,11.448 C29.1034147,10.4959952 28.8280841,9.75400266 28.2774147,9.222 C27.7267452,8.68999734 27.0220856,8.424 26.1634147,8.424 C25.5847451,8.424 25.09475,8.55933198 24.6934147,8.83 C24.2920793,9.10066802 23.9700825,9.45533114 23.7274147,9.894 C23.4847468,10.3326689 23.3120818,10.8179973 23.2094147,11.35 C23.1067475,11.8820027 23.0554147,12.4093307 23.0554147,12.932 L19.2474147,12.932 Z",
      id: "H2",
      className: "icon-fillcolor",
      fill: "#B1B4C1"
    }));
  }
  function h3() {
    return React.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 34 31",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      d: "M0.932,5.008 L5.328,5.008 L5.328,12.68 L13.42,12.68 L13.42,5.008 L17.816,5.008 L17.816,25 L13.42,25 L13.42,16.376 L5.328,16.376 L5.328,25 L0.932,25 L0.932,5.008 Z M24.5954147,13.324 C25.0247501,13.3613335 25.4820789,13.3613335 25.9674147,13.324 C26.4527504,13.2866665 26.9054126,13.1793342 27.3254147,13.002 C27.7454168,12.8246658 28.0907466,12.5680017 28.3614147,12.232 C28.6320827,11.8959983 28.7674147,11.4480028 28.7674147,10.888 C28.7674147,10.0479958 28.4874175,9.40400224 27.9274147,8.956 C27.3674119,8.50799776 26.7234183,8.284 25.9954147,8.284 C24.9874096,8.284 24.2267506,8.61533002 23.7134147,9.278 C23.2000788,9.94066998 22.9527479,10.775995 22.9714147,11.784 L19.1914147,11.784 C19.2287482,10.775995 19.4107464,9.85667082 19.7374147,9.026 C20.064083,8.19532918 20.5214117,7.48133632 21.1094147,6.884 C21.6974176,6.28666368 22.4020772,5.8246683 23.2234147,5.498 C24.0447521,5.1713317 24.9594096,5.008 25.9674147,5.008 C26.7514186,5.008 27.5354107,5.1246655 28.3194147,5.358 C29.1034186,5.5913345 29.8080782,5.941331 30.4334147,6.408 C31.0587511,6.874669 31.5674127,7.44399664 31.9594147,8.116 C32.3514166,8.78800336 32.5474147,9.56266228 32.5474147,10.44 C32.5474147,11.3920048 32.3187503,12.2319964 31.8614147,12.96 C31.404079,13.6880036 30.7180859,14.1826654 29.8034147,14.444 L29.8034147,14.5 C30.8860867,14.7426679 31.7354116,15.2653293 32.3514147,16.068 C32.9674177,16.8706707 33.2754147,17.8319944 33.2754147,18.952 C33.2754147,19.9786718 33.07475,20.8933293 32.6734147,21.696 C32.2720793,22.4986707 31.735418,23.170664 31.0634147,23.712 C30.3914113,24.253336 29.6167524,24.6639986 28.7394147,24.944 C27.8620769,25.2240014 26.9474194,25.364 25.9954147,25.364 C24.8940758,25.364 23.8907525,25.2053349 22.9854147,24.888 C22.0800768,24.5706651 21.3100845,24.1086697 20.6754147,23.502 C20.0407448,22.8953303 19.5507497,22.1533377 19.2054147,21.276 C18.8600796,20.3986623 18.6967479,19.3906724 18.7154147,18.252 L22.4954147,18.252 C22.5140814,18.7746693 22.5980806,19.2739976 22.7474147,19.75 C22.8967487,20.2260024 23.1114133,20.6366649 23.3914147,20.982 C23.6714161,21.3273351 24.0214126,21.6026656 24.4414147,21.808 C24.8614168,22.0133344 25.3607451,22.116 25.9394147,22.116 C26.8354191,22.116 27.5914116,21.8406694 28.2074147,21.29 C28.8234177,20.7393306 29.1314147,19.9880048 29.1314147,19.036 C29.1314147,18.2893296 28.9867494,17.720002 28.6974147,17.328 C28.4080799,16.935998 28.0394169,16.6513342 27.5914147,16.474 C27.1434124,16.2966658 26.6534173,16.1940001 26.1214147,16.166 C25.589412,16.1379999 25.0807504,16.124 24.5954147,16.124 L24.5954147,13.324 Z",
      id: "H3",
      className: "icon-fillcolor",
      fill: "#B1B4C1"
    }));
  }
  function h4() {
    return React.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 34 31",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      d: "M0.932,5.008 L5.328,5.008 L5.328,12.68 L13.42,12.68 L13.42,5.008 L17.816,5.008 L17.816,25 L13.42,25 L13.42,16.376 L5.328,16.376 L5.328,25 L0.932,25 L0.932,5.008 Z M26.9474147,10.384 L26.8634147,10.384 L21.7954147,17.188 L26.9474147,17.188 L26.9474147,10.384 Z M26.9474147,20.464 L18.6594147,20.464 L18.6594147,16.824 L27.1714147,5.4 L30.7274147,5.4 L30.7274147,17.188 L33.3314147,17.188 L33.3314147,20.464 L30.7274147,20.464 L30.7274147,25 L26.9474147,25 L26.9474147,20.464 Z",
      id: "H4",
      className: "icon-fillcolor",
      fill: "#B1B4C1"
    }));
  }
  var Icons = {
    imageWide: imageWide,
    imageLeft: imageLeft,
    imageCenter: imageCenter,
    imageFill: imageFill,
    image: image,
    card: card,
    video: video,
    divider: divider,
    button: button,
    add: add,
    embed: embed,
    fontColor: fontColor,
    bold: bold,
    italic: italic,
    insertunorderedlist: insertunorderedlist,
    insertorderedlist: insertorderedlist,
    link: link,
    close: close,
    h1: h1,
    h2: h2,
    h3: h3,
    h4: h4,
    blockquote: blockquote,
    code: code
  };

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

  var DanteImagePopover =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DanteImagePopover, _React$Component);

    function DanteImagePopover(props) {
      var _this;

      _classCallCheck(this, DanteImagePopover);

      _this = _possibleConstructorReturn(this, (DanteImagePopover.__proto__ || Object.getPrototypeOf(DanteImagePopover)).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "display", function (b) {
        if (b) {
          return _this.show();
        } else {
          return _this.hide();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "show", function () {
        return _this.setState({
          show: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "hide", function () {
        return _this.setState({
          show: false
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setPosition", function (coords) {
        return _this.setState({
          position: coords
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_toggleScaled", function (ev) {
        if (_this.state.scaled) {
          return _this.collapse();
        } else {
          return _this.scale();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "scale", function () {
        return _this.setState({
          scaled: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "collapse", function () {
        return _this.setState({
          scaled: false
        });
      });

      _defineProperty(_assertThisInitialized(_this), "relocate", function () {
        var editorState = _this.props.editorState;

        if (editorState.getSelection().isCollapsed()) {
          var currentBlock = getCurrentBlock(editorState);
          var blockType = currentBlock.getType();
          var nativeSelection = getSelection(window);

          if (!nativeSelection.rangeCount) {
            return;
          }

          _this.display(blockType === "image");

          if (blockType === "image") {
            var imageBoxNode = document.getElementsByClassName("is-selected")[0];
            var selectionBoundary = imageBoxNode.getBoundingClientRect();
            var el = _this.refs.image_popover;
            var padd = el.clientWidth / 2;
            var toolbarHeight = el.offsetHeight;
            var left = selectionBoundary.left + selectionBoundary.width / 2 - padd;
            var top = selectionBoundary.top + window.scrollY - toolbarHeight;
            return _this.setPosition({
              top: top,
              left: left
            });
          }
        } else {
          return _this.hide();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "getStyle", function () {
        if (!_this.state.position) {
          return {};
        }
      });

      _defineProperty(_assertThisInitialized(_this), "handleClick", function (item) {
        return _this.props.editor.setDirection(item.type);
      });

      _defineProperty(_assertThisInitialized(_this), "render", function () {
        return React.createElement("div", {
          ref: "image_popover",
          className: "dante-popover popover--Aligntooltip popover--top popover--animated ".concat(_this.state.show ? 'is-active' : undefined),
          style: {
            top: _this.state.position.top,
            left: _this.state.position.left
          }
        }, React.createElement("div", {
          className: "popover-inner"
        }, React.createElement("ul", {
          className: "dante-menu-buttons"
        }, _this.state.buttons.map(function (item, i) {
          return React.createElement(DanteImagePopoverItem, {
            item: item,
            handleClick: _this.handleClick,
            key: i
          });
        }))), React.createElement("div", {
          className: "popover-arrow"
        }));
      });

      _this.state = {
        position: {
          top: 0,
          left: 0
        },
        show: false,
        scaled: false,
        buttons: [{
          type: "left"
        }, {
          type: "center"
        }, {
          type: "fill"
        }, {
          type: "wide"
        }]
      };
      return _this;
    }

    _createClass(DanteImagePopover, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(newProps) {
        return this.collapse();
      }
    }]);

    return DanteImagePopover;
  }(React.Component);

  var DanteImagePopoverItem =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(DanteImagePopoverItem, _React$Component2);

    function DanteImagePopoverItem() {
      var _ref;

      var _this2;

      _classCallCheck(this, DanteImagePopoverItem);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this2 = _possibleConstructorReturn(this, (_ref = DanteImagePopoverItem.__proto__ || Object.getPrototypeOf(DanteImagePopoverItem)).call.apply(_ref, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this2), "handleClick", function (e) {
        e.preventDefault();
        return _this2.props.handleClick(_this2.props.item);
      });

      _defineProperty(_assertThisInitialized(_this2), "render", function () {
        return React.createElement("li", {
          className: "dante-menu-button align-".concat(_this2.props.item.type),
          onMouseDown: _this2.handleClick
        }, React.createElement("span", {
          className: "tooltip-icon dante-icon"
        }, Icons["image".concat(lodash.capitalize(_this2.props.item.type))]()));
      });

      _this2.handleClick = _this2.handleClick.bind(_assertThisInitialized(_this2));
      _this2.render = _this2.render.bind(_assertThisInitialized(_this2));
      return _this2;
    }

    return DanteImagePopoverItem;
  }(React.Component);

  var DanteAnchorPopover =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DanteAnchorPopover, _React$Component);

    function DanteAnchorPopover(props) {
      var _this;

      _classCallCheck(this, DanteAnchorPopover);

      _this = _possibleConstructorReturn(this, (DanteAnchorPopover.__proto__ || Object.getPrototypeOf(DanteAnchorPopover)).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "display", function (b) {
        if (b) {
          return _this.show();
        } else {
          return _this.hide();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "show", function () {
        return _this.setState({
          show: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "hide", function () {
        return _this.setState({
          show: false
        });
      });

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

    _createClass(DanteAnchorPopover, [{
      key: "setPosition",
      value: function setPosition(coords) {
        return this.setState({
          position: coords
        });
      }
    }, {
      key: "relocate",
      value: function relocate(node) {
        if (node == null) {
          node = null;
        }

        if (!node) {
          return;
        }

        var selectionBoundary = node.getBoundingClientRect();
        var el = this.refs.dante_popover;
        var padd = el.offsetWidth / 2;
        var toolbarHeight = el.offsetHeight;
        var left = selectionBoundary.left + selectionBoundary.width / 2 - padd;
        var top = selectionBoundary.top + window.scrollY + toolbarHeight * 0.3;
        return {
          top: top,
          left: left
        };
      }
    }, {
      key: "render",
      value: function render() {
        var position = this.state.position;
        var style = {
          left: position.left,
          top: position.top,
          visibility: "".concat(this.state.show ? 'visible' : 'hidden')
        };
        return React.createElement("div", {
          ref: "dante_popover",
          className: "dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active",
          style: style,
          onMouseOver: this.props.handleOnMouseOver,
          onMouseOut: this.props.handleOnMouseOut
        }, React.createElement("div", {
          className: "popover-inner"
        }, React.createElement("a", {
          href: this.state.url,
          target: "_blank"
        }, this.state.url)), React.createElement("div", {
          className: "popover-arrow"
        }));
      }
    }]);

    return DanteAnchorPopover;
  }(React.Component);

  var DanteInlineTooltip =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DanteInlineTooltip, _React$Component);

    function DanteInlineTooltip(props) {
      var _this;

      _classCallCheck(this, DanteInlineTooltip);

      _this = _possibleConstructorReturn(this, (DanteInlineTooltip.__proto__ || Object.getPrototypeOf(DanteInlineTooltip)).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "display", function (b) {
        if (b) {
          return _this.show();
        } else {
          return _this.hide();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "show", function () {
        return _this.setState({
          show: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "hide", function () {
        return _this.setState({
          show: false
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setPosition", function (coords) {
        return _this.setState({
          position: coords
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_toggleScaled", function (ev) {
        if (_this.state.scaled) {
          return _this.collapse();
        } else {
          return _this.scale();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "scale", function () {
        if (_this.state.scaled) {
          return;
        }

        return _this.setState({
          scaled: true
        }, function () {
          _this.setState({
            scaledWidth: "300px"
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "collapse", function () {
        if (!_this.state.scaled) {
          return;
        }

        return _this.setState({
          scaled: false
        }, function () {
          setTimeout(function () {
            _this.setState({
              scaledWidth: "0px"
            });
          }, 300);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "activeClass", function () {
        //if @props.show then "is-active" else ""
        if (_this.isActive()) {
          return "is-active";
        } else {
          return "";
        }
      });

      _defineProperty(_assertThisInitialized(_this), "isActive", function () {
        return _this.state.show;
      });

      _defineProperty(_assertThisInitialized(_this), "scaledClass", function () {
        if (_this.state.scaled) {
          return "is-scaled";
        } else {
          return "";
        }
      });

      _defineProperty(_assertThisInitialized(_this), "clickOnFileUpload", function () {
        _this.refs.fileInput.click();

        _this.collapse();

        return _this.hide();
      });

      _defineProperty(_assertThisInitialized(_this), "handlePlaceholder", function (input) {
        var opts = {
          type: input.widget_options.insert_block,
          placeholder: input.options.placeholder,
          endpoint: input.options.endpoint
        };
        return _this.props.onChange(resetBlockWithType(_this.props.editorState, 'placeholder', opts));
      });

      _defineProperty(_assertThisInitialized(_this), "insertImage", function (file) {
        var opts = {
          url: URL.createObjectURL(file),
          file: file
        };
        return _this.props.onChange(addNewBlock(_this.props.editorState, 'image', opts));
      });

      _defineProperty(_assertThisInitialized(_this), "handleFileInput", function (e) {
        var fileList = e.target.files; // TODO: support multiple file uploads

        /*
        Object.keys(fileList).forEach (o)=>
          @.insertImage(fileList[0])
        */

        return _this.insertImage(fileList[0]);
      });

      _defineProperty(_assertThisInitialized(_this), "handleInsertion", function (e) {
        _this.hide();

        return _this.props.onChange(addNewBlock(_this.props.editorState, e.type, {}));
      });

      _defineProperty(_assertThisInitialized(_this), "widgets", function () {
        return _this.props.editor.widgets;
      });

      _defineProperty(_assertThisInitialized(_this), "clickHandler", function (e, type) {
        var request_block = _this.widgets().find(function (o) {
          return o.icon === type;
        });

        switch (request_block.widget_options.insertion) {
          case "upload":
            return _this.clickOnFileUpload(e, request_block);

          case "placeholder":
            return _this.handlePlaceholder(request_block);

          case "insertion":
            return _this.handleInsertion(request_block);

          default:
            return console.log("WRONG TYPE FOR ".concat(request_block.widget_options.insertion));
        }
      });

      _defineProperty(_assertThisInitialized(_this), "getItems", function () {
        return _this.widgets().filter(function (o) {
          return o.widget_options.displayOnInlineTooltip;
        });
      });

      _defineProperty(_assertThisInitialized(_this), "isDescendant", function (parent, child) {
        var node = child.parentNode;

        while (node !== null) {
          if (node === parent) {
            return true;
          }

          node = node.parentNode;
        }

        return false;
      });

      _defineProperty(_assertThisInitialized(_this), "relocate", function () {
        var editorState = _this.props.editorState;

        if (editorState.getSelection().isCollapsed()) {
          var currentBlock = getCurrentBlock(editorState);
          var blockType = currentBlock.getType();
          var contentState = editorState.getCurrentContent();
          var selectionState = editorState.getSelection();
          var block = contentState.getBlockForKey(selectionState.anchorKey);
          var nativeSelection = getSelection(window);

          if (!nativeSelection.rangeCount) {
            return;
          }

          var selectionBoundary = getSelectionRect(nativeSelection);
          var coords = selectionBoundary; //utils.getSelectionDimensions(node)

          var parent = ReactDOM.findDOMNode(_this.props.editor);
          var parentBoundary = parent.getBoundingClientRect();

          if (!_this.isDescendant(parent, nativeSelection.anchorNode)) {
            _this.hide();

            return;
          } //this.refs.tooltip.style.left = "auto";


          var left = _this.refs.tooltip.offsetLeft; // checkeamos si esta vacio

          _this.display(block.getText().length === 0 && blockType === "unstyled");

          return _this.setPosition({
            top: coords.top + window.scrollY - 5,
            left: parent.offsetLeft - 60 //left: coords.left //+ window.scrollX - this.refs.tooltip.clientWidth * 4 //- 50
            //left: (selectionBoundary.left - parentBoundary.left ) + this.refs.tooltip.clientWidth //coords.left + window.scrollX - 60

          });
        } else {
          return _this.hide();
        }
      });

      _this.state = {
        position: {
          top: 0,
          left: 0
        },
        show: false,
        scaled: false,
        scaledWidth: "0px"
      };
      _this.initialPosition = 0;
      return _this;
    }

    _createClass(DanteInlineTooltip, [{
      key: "componentDidMount",
      value: function componentDidMount() {//this.initialPosition = this.refs.tooltip.offsetLeft
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(newProps) {
        return this.collapse();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement("div", {
          ref: "tooltip",
          className: "inlineTooltip ".concat(this.activeClass(), " ").concat(this.scaledClass()),
          style: this.state.position
        }, React.createElement("button", {
          className: "inlineTooltip-button control",
          title: "Close Menu",
          "data-action": "inline-menu",
          onClick: this._toggleScaled
        }, Icons.add()), React.createElement("div", {
          className: "inlineTooltip-menu",
          style: {
            width: "".concat(this.state.scaledWidth)
          }
        }, this.getItems().map(function (item, i) {
          return React.createElement(InlineTooltipItem, {
            item: item,
            key: i,
            clickHandler: _this2.clickHandler
          });
        }), React.createElement("input", {
          type: "file",
          style: {
            display: 'none'
          },
          ref: "fileInput",
          multiple: "multiple",
          onChange: this.handleFileInput
        })));
      }
    }]);

    return DanteInlineTooltip;
  }(React.Component);

  var InlineTooltipItem =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(InlineTooltipItem, _React$Component2);

    function InlineTooltipItem() {
      var _ref;

      var _this3;

      _classCallCheck(this, InlineTooltipItem);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this3 = _possibleConstructorReturn(this, (_ref = InlineTooltipItem.__proto__ || Object.getPrototypeOf(InlineTooltipItem)).call.apply(_ref, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this3), "clickHandler", function (e) {
        e.preventDefault();
        return _this3.props.clickHandler(e, _this3.props.item.icon);
      });

      return _this3;
    }

    _createClass(InlineTooltipItem, [{
      key: "render",
      value: function render() {
        return React.createElement("button", {
          className: "inlineTooltip-button scale",
          title: this.props.title,
          onMouseDown: this.clickHandler,
          style: {
            fontSize: '21px'
          }
        }, React.createElement("span", {
          className: 'tooltip-icon'
        }, Icons[this.props.item.icon]()));
      }
    }]);

    return InlineTooltipItem;
  }(React.Component);

  var DanteTooltipColor =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DanteTooltipColor, _React$Component);

    function DanteTooltipColor() {
      var _ref;

      var _this;

      _classCallCheck(this, DanteTooltipColor);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_ref = DanteTooltipColor.__proto__ || Object.getPrototypeOf(DanteTooltipColor)).call.apply(_ref, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "toggle", function (ev) {
        // let selection = this.props.editorState.getSelection()
        // prevent unselection of selection
        ev.preventDefault();

        _this.setState({
          open: true
        }); //!this.state.open})

      });

      _defineProperty(_assertThisInitialized(_this), "handleClick", function (e, item) {
        e.preventDefault();

        _this.setState({
          value: item
        }, function () {
          var o = _defineProperty({}, _this.props.style_type, _this.state.value);

          _this.props.handleClick(e, o);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "currentValue", function () {
        var selection = _this.props.editorState.getSelection();

        if (!selection.isCollapsed()) {
          return _this.props.styles[_this.props.style_type].current(_this.props.editorState);
        } else {
          return;
        }
      });

      _defineProperty(_assertThisInitialized(_this), "renderColor", function () {
        //console.log(`${this.currentValue()} vs ${this.props.value}`)
        var v = _this.currentValue() || _this.props.value; //console.log(`this should be ${v}`)


        if (_this.state.open) {
          return React.createElement("div", {
            style: {
              position: 'absolute'
            }
          }, React.createElement(reactColor.SketchPicker, {
            color: v,
            presetColors: [],
            onChangeComplete: function onChangeComplete(color, e) {
              _this.handleClick(e, color.hex);
            }
          }));
        }
      });

      _this.state = {
        open: false,
        value: _this.props.value
      };
      return _this;
    }

    _createClass(DanteTooltipColor, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.show === false) {
          this.setState({
            open: false
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement("li", {
          className: "dante-menu-button",
          onMouseDown: this.toggle
        }, React.createElement("span", {
          className: 'dante-icon'
        }, Icons['fontColor']()), this.renderColor());
      }
    }]);

    return DanteTooltipColor;
  }(React.Component);

  var DanteTooltip =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DanteTooltip, _React$Component);

    function DanteTooltip(props) {
      var _this;

      _classCallCheck(this, DanteTooltip);

      _this = _possibleConstructorReturn(this, (DanteTooltip.__proto__ || Object.getPrototypeOf(DanteTooltip)).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "_clickInlineHandler", function (ev, style) {
        ev.preventDefault();

        _this.props.onChange(draftJs.RichUtils.toggleInlineStyle(_this.props.editorState, style));

        return setTimeout(function () {
          return _this.relocate();
        }, 0);
      });

      _defineProperty(_assertThisInitialized(_this), "display", function (b) {
        if (b) {
          return _this.show();
        } else {
          return _this.hide();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "show", function () {
        return _this.setState({
          show: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "hide", function () {
        return _this.setState({
          link_mode: false,
          show: false
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setPosition", function (coords) {
        return _this.setState({
          position: coords
        });
      });

      _defineProperty(_assertThisInitialized(_this), "isDescendant", function (parent, child) {
        var node = child.parentNode;

        while (node !== null) {
          if (node === parent) {
            return true;
          }

          node = node.parentNode;
        }

        return false;
      });

      _defineProperty(_assertThisInitialized(_this), "relocate", function () {
        var currentBlock = getCurrentBlock(_this.props.editorState);
        var blockType = currentBlock.getType(); // display tooltip only for unstyled

        if (_this.props.configTooltip.selectionElements.indexOf(blockType) < 0) {
          _this.hide();

          return;
        }

        if (_this.state.link_mode) {
          return;
        }

        if (!_this.state.show) {
          return;
        }

        var el = _this.refs.dante_menu;
        var padd = el.offsetWidth / 2;
        var nativeSelection = getSelection(window);

        if (!nativeSelection.rangeCount) {
          return;
        }

        var selectionBoundary = getSelectionRect(nativeSelection);
        var parent = ReactDOM.findDOMNode(_this.props.editor); // hide if selected node is not in editor

        if (!_this.isDescendant(parent, nativeSelection.anchorNode)) {
          _this.hide();

          return;
        }

        var relativeParent = getRelativeParent(_this.refs.dante_menu.parentElement);
        var toolbarHeight = _this.refs.dante_menu.clientHeight; //const toolbarWidth = this.refs.dante_menu.clientWidth;

        var relativeRect = (relativeParent || document.body).getBoundingClientRect();
        var selectionRect = draftJs.getVisibleSelectionRect(window);
        if (!selectionRect || !relativeRect || !selectionBoundary) return;
        var top = selectionRect.top - relativeRect.top - toolbarHeight; //let left = selectionBoundary.left + selectionBoundary.width / 2 - padd

        var left = selectionRect.left - relativeRect.left + selectionRect.width / 2 - padd; // - (toolbarWidth / 2 ) + 10
        //let left = (selectionRect.left - relativeRect.left) + (selectionRect.width / 2)

        if (!top || !left) {
          return;
        } // console.log "SET SHOW FOR TOOLTIP INSERT MENU"


        return _this.setState({
          show: true,
          position: {
            left: left,
            top: top
          }
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_clickBlockHandler", function (ev, style) {
        ev.preventDefault();

        _this.props.onChange(draftJs.RichUtils.toggleBlockType(_this.props.editorState, style));

        return setTimeout(function () {
          return _this.relocate();
        }, 0);
      });

      _defineProperty(_assertThisInitialized(_this), "_clickBlockInlineStyle", function (ev, style) {
        var k = Object.keys(style)[0];

        _this.props.onChange(_this.props.styles[k].toggle(_this.props.editorState, style[k])); //this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, style))


        return setTimeout(function () {
          return _this.relocate();
        }, 0);
      });

      _defineProperty(_assertThisInitialized(_this), "displayLinkMode", function () {
        if (_this.state.link_mode) {
          return "dante-menu--linkmode";
        } else {
          return "";
        }
      });

      _defineProperty(_assertThisInitialized(_this), "displayActiveMenu", function () {
        if (_this.state.show) {
          return "dante-menu--active";
        } else {
          return "";
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_enableLinkMode", function (ev) {
        ev.preventDefault();
        return _this.setState({
          link_mode: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_disableLinkMode", function (ev) {
        ev.preventDefault();
        return _this.setState({
          link_mode: false,
          url: ""
        });
      });

      _defineProperty(_assertThisInitialized(_this), "hideMenu", function () {
        return _this.hide();
      });

      _defineProperty(_assertThisInitialized(_this), "handleInputEnter", function (e) {
        if (e.which === 13) {
          return _this.confirmLink(e);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "confirmLink", function (e) {
        e.preventDefault();
        var editorState = _this.props.editorState;
        var urlValue = e.currentTarget.value;
        var selection = editorState.getSelection();
        var opts = {
          url: urlValue,
          showPopLinkOver: _this.props.showPopLinkOver,
          hidePopLinkOver: _this.props.hidePopLinkOver
        };
        var entityKey = draftJs.Entity.create('LINK', 'MUTABLE', opts); //contentState.createEntity('LINK', 'MUTABLE', opts)

        if (selection.isCollapsed()) {
          console.log("COLLAPSED SKIPPING LINK");
          return;
        }

        _this.props.onChange(draftJs.RichUtils.toggleLink(editorState, selection, entityKey));

        return _this._disableLinkMode(e);
      });

      _defineProperty(_assertThisInitialized(_this), "getPosition", function () {
        var pos = _this.state.position;
        return pos;
      });

      _defineProperty(_assertThisInitialized(_this), "inlineItems", function () {
        return _this.props.widget_options.block_types.filter(function (o) {
          return o.type === "inline";
        });
      });

      _defineProperty(_assertThisInitialized(_this), "blockItems", function () {
        return _this.props.widget_options.block_types.filter(function (o) {
          return o.type === "block";
        });
      });

      _defineProperty(_assertThisInitialized(_this), "getDefaultValue", function () {
        if (_this.refs.dante_menu_input) {
          _this.refs.dante_menu_input.value = "";
        }

        var currentBlock = getCurrentBlock(_this.props.editorState);

        var selection = _this.props.editor.state.editorState.getSelection();

        var contentState = _this.props.editorState.getCurrentContent();

        var selectedEntity = null;
        var defaultUrl = null;
        return currentBlock.findEntityRanges(function (character) {
          var entityKey = character.getEntity();
          selectedEntity = entityKey;
          return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
        }, function (start, end) {
          var selStart = selection.getAnchorOffset();
          var selEnd = selection.getFocusOffset();

          if (selection.getIsBackward()) {
            selStart = selection.getFocusOffset();
            selEnd = selection.getAnchorOffset();
          }

          if (start === selStart && end === selEnd) {
            defaultUrl = contentState.getEntity(selectedEntity).getData().url;
            return _this.refs.dante_menu_input.value = defaultUrl;
          }
        });
      });

      _defineProperty(_assertThisInitialized(_this), "render", function () {
        return React.createElement("div", {
          id: "dante-menu",
          ref: "dante_menu",
          className: "dante-menu ".concat(_this.displayActiveMenu(), " ").concat(_this.displayLinkMode()),
          style: _this.getPosition()
        }, React.createElement("div", {
          className: "dante-menu-linkinput"
        }, React.createElement("input", {
          className: "dante-menu-input",
          ref: "dante_menu_input",
          placeholder: _this.props.widget_options.placeholder,
          onKeyPress: _this.handleInputEnter //defaultValue={ this.getDefaultValue() }

        }), React.createElement("div", {
          className: "dante-menu-button",
          onMouseDown: _this._disableLinkMode
        }, React.createElement("span", {
          className: 'dante-icon'
        }, Icons['close']()))), React.createElement("ul", {
          className: "dante-menu-buttons"
        }, _this.props.widget_options.block_types.map(function (item, i) {
          switch (item.type) {
            case "block":
              return React.createElement(DanteTooltipItem, {
                key: i,
                item: item,
                styles: _this.props.style,
                handleClick: _this._clickBlockHandler,
                editorState: _this.props.editorState,
                type: "block",
                currentStyle: _this.props.editorState.getCurrentInlineStyle
              });
              break;

            case "inline":
              return React.createElement(DanteTooltipItem, {
                key: i,
                item: item,
                type: "inline",
                editorState: _this.props.editorState,
                handleClick: _this._clickInlineHandler
              });
              break;

            case "color":
              return React.createElement(DanteTooltipColor, {
                key: i,
                styles: _this.props.styles,
                editorState: _this.props.editorState,
                enableLinkMode: _this._enableLinkMode,
                value: '#000',
                style_type: "color",
                handleClick: _this._clickBlockInlineStyle,
                show: _this.state.show
              });
              break;

            case "separator":
              return React.createElement(DanteMenuDivider, {
                key: i
              });
              break;

            case "link":
              return React.createElement(DanteTooltipLink, {
                key: i,
                editorState: _this.props.editorState,
                enableLinkMode: _this._enableLinkMode
              });
              break;

            default:
              break;
          }
        })));
      });

      _this.state = {
        link_mode: false,
        show: false,
        position: {}
      };
      return _this;
    }

    return DanteTooltip;
  }(React.Component);

  var DanteMenuDivider = function DanteMenuDivider() {
    return React.createElement("li", {
      className: "dante-menu-divider"
    });
  };

  var DanteTooltipItem =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(DanteTooltipItem, _React$Component2);

    function DanteTooltipItem() {
      var _ref;

      var _this2;

      _classCallCheck(this, DanteTooltipItem);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this2 = _possibleConstructorReturn(this, (_ref = DanteTooltipItem.__proto__ || Object.getPrototypeOf(DanteTooltipItem)).call.apply(_ref, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this2), "handleClick", function (ev) {
        return _this2.props.handleClick(ev, _this2.props.item.style);
      });

      _defineProperty(_assertThisInitialized(_this2), "activeClass", function () {
        if (_this2.isActive()) {
          return "active";
        } else {
          return "";
        }
      });

      _defineProperty(_assertThisInitialized(_this2), "isActive", function () {
        if (_this2.props.type === "block") {
          return _this2.activeClassBlock();
        } else {
          return _this2.activeClassInline();
        }
      });

      _defineProperty(_assertThisInitialized(_this2), "activeClassInline", function () {
        if (!_this2.props.editorState || !_this2.props.editorState.getCurrentContent().hasText()) {
          return;
        }

        return _this2.props.editorState.getCurrentInlineStyle().has(_this2.props.item.style);
      });

      _defineProperty(_assertThisInitialized(_this2), "activeClassBlock", function () {
        if (!_this2.props.editorState || !_this2.props.editorState.getCurrentContent().hasText()) {
          return;
        }

        var selection = _this2.props.editorState.getSelection();

        var blockKey = _this2.props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey());

        if (!blockKey) return;
        var blockType = blockKey.getType();
        return _this2.props.item.style === blockType;
      });

      return _this2;
    }

    _createClass(DanteTooltipItem, [{
      key: "render",
      value: function render() {
        return React.createElement("li", {
          className: "dante-menu-button ".concat(this.activeClass()),
          onMouseDown: this.handleClick
        }, React.createElement("span", {
          className: 'dante-icon'
        }, this.props.item.icon()));
      }
    }]);

    return DanteTooltipItem;
  }(React.Component);

  var DanteTooltipLink =
  /*#__PURE__*/
  function (_React$Component3) {
    _inherits(DanteTooltipLink, _React$Component3);

    function DanteTooltipLink() {
      var _ref2;

      var _this3;

      _classCallCheck(this, DanteTooltipLink);

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this3 = _possibleConstructorReturn(this, (_ref2 = DanteTooltipLink.__proto__ || Object.getPrototypeOf(DanteTooltipLink)).call.apply(_ref2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this3), "promptForLink", function (ev) {
        var selection = _this3.props.editorState.getSelection();

        if (!selection.isCollapsed()) {
          return _this3.props.enableLinkMode(ev);
        }
      });

      _this3.promptForLink = _this3.promptForLink.bind(_assertThisInitialized(_this3));
      return _this3;
    }

    _createClass(DanteTooltipLink, [{
      key: "render",
      value: function render() {
        return React.createElement("li", {
          className: "dante-menu-button",
          onMouseDown: this.promptForLink
        }, React.createElement("span", {
          className: 'dante-icon'
        }, Icons['link']()));
      }
    }]);

    return DanteTooltipLink;
  }(React.Component);

  var ImageBlock =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(ImageBlock, _React$Component);

    function ImageBlock(props) {
      var _this;

      _classCallCheck(this, ImageBlock);

      _this = _possibleConstructorReturn(this, (ImageBlock.__proto__ || Object.getPrototypeOf(ImageBlock)).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "blockPropsSrc", function () {
        return _this.props.blockProps.data.src;
      });

      _defineProperty(_assertThisInitialized(_this), "defaultUrl", function (data) {
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
          return _this.props.blockProps.data.src;
        }
      });

      _defineProperty(_assertThisInitialized(_this), "defaultPlaceholder", function () {
        return _this.props.blockProps.config.image_caption_placeholder;
      });

      _defineProperty(_assertThisInitialized(_this), "defaultAspectRatio", function (data) {
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
      });

      _defineProperty(_assertThisInitialized(_this), "getAspectRatio", function (w, h) {
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
        var result = {
          width: width,
          height: height,
          ratio: fill_ratio // console.log result

        };
        return result;
      });

      _defineProperty(_assertThisInitialized(_this), "updateData", function () {
        var _this$props = _this.props,
            blockProps = _this$props.blockProps,
            block = _this$props.block;
        var getEditorState = blockProps.getEditorState;
        var setEditorState = blockProps.setEditorState;
        var data = block.getData();
        var newData = data.merge(_this.state).merge({
          forceUpload: false
        });
        return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
      });

      _defineProperty(_assertThisInitialized(_this), "replaceImg", function () {
        _this.img = new Image();
        _this.img.src = _this.refs.image_tag.src;

        _this.setState({
          url: _this.img.src
        });

        var self = _assertThisInitialized(_this); // exit only when not blob and not forceUload


        if (!_this.img.src.includes("blob:") && !_this.props.block.data.get("forceUpload")) {
          return;
        }

        return _this.img.onload = function () {
          _this.setState({
            width: _this.img.width,
            height: _this.img.height,
            aspect_ratio: self.getAspectRatio(_this.img.width, _this.img.height)
          });

          return _this.handleUpload();
        };
      });

      _defineProperty(_assertThisInitialized(_this), "startLoader", function () {
        return _this.setState({
          loading: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "stopLoader", function () {
        return _this.setState({
          loading: false
        });
      });

      _defineProperty(_assertThisInitialized(_this), "handleUpload", function () {
        _this.startLoader();

        _this.props.blockProps.addLock();

        _this.updateData();

        return _this.uploadFile();
      });

      _defineProperty(_assertThisInitialized(_this), "aspectRatio", function () {
        return {
          maxWidth: "".concat(_this.state.aspect_ratio.width),
          maxHeight: "".concat(_this.state.aspect_ratio.height),
          ratio: "".concat(_this.state.aspect_ratio.height)
        };
      });

      _defineProperty(_assertThisInitialized(_this), "updateDataSelection", function () {
        var _this$props$blockProp = _this.props.blockProps,
            getEditorState = _this$props$blockProp.getEditorState,
            setEditorState = _this$props$blockProp.setEditorState;
        var newselection = getEditorState().getSelection().merge({
          anchorKey: _this.props.block.getKey(),
          focusKey: _this.props.block.getKey()
        });
        return setEditorState(draftJs.EditorState.forceSelection(getEditorState(), newselection));
      });

      _defineProperty(_assertThisInitialized(_this), "handleGrafFigureSelectImg", function (e) {
        e.preventDefault();
        return _this.setState({
          selected: true
        }, _this.updateDataSelection);
      });

      _defineProperty(_assertThisInitialized(_this), "coords", function () {
        return {
          maxWidth: "".concat(_this.state.aspect_ratio.width, "px"),
          maxHeight: "".concat(_this.state.aspect_ratio.height, "px")
        };
      });

      _defineProperty(_assertThisInitialized(_this), "getBase64Image", function (img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL;
      });

      _defineProperty(_assertThisInitialized(_this), "formatData", function () {
        var formData = new FormData();

        if (_this.file) {
          var formName = _this.config.upload_formName || 'file';
          formData.append(formName, _this.file);
          return formData;
        } else {
          formData.append('url', _this.props.blockProps.data.get("url"));
          return formData;
        }
      });

      _defineProperty(_assertThisInitialized(_this), "getUploadUrl", function () {
        var url = _this.config.upload_url;

        if (typeof url === "function") {
          return url();
        } else {
          return url;
        }
      });

      _defineProperty(_assertThisInitialized(_this), "uploadFile", function () {
        // custom upload handler
        if (_this.config.upload_handler) {
          return _this.config.upload_handler(_this.formatData().get('file'), _assertThisInitialized(_this));
        }

        if (!_this.config.upload_url) {
          _this.stopLoader();

          return;
        }

        axios({
          method: 'post',
          url: _this.getUploadUrl(),
          headers: _this.getUploadHeaders(),
          data: _this.formatData(),
          onUploadProgress: function onUploadProgress(e) {
            return _this.updateProgressBar(e);
          }
        }).then(function (result) {
          _this.uploadCompleted(result.data.url);

          if (_this.config.upload_callback) {
            return _this.config.upload_callback(result, _assertThisInitialized(_this));
          }
        }).catch(function (error) {
          _this.uploadFailed();

          console.log("ERROR: got error uploading file ".concat(error));

          if (_this.config.upload_error_callback) {
            return _this.config.upload_error_callback(error, _assertThisInitialized(_this));
          }
        });
        return function (json_response) {
          return _this.uploadCompleted(json_response.url);
        };
      });

      _defineProperty(_assertThisInitialized(_this), "uploadFailed", function () {
        _this.props.blockProps.removeLock();

        _this.stopLoader();
      });

      _defineProperty(_assertThisInitialized(_this), "placeHolderEnabled", function () {
        return _this.state.enabled || _this.props.block.getText();
      });

      _defineProperty(_assertThisInitialized(_this), "placeholderText", function () {
        return _this.config.image_caption_placeholder || 'caption here (optional)';
      });

      _defineProperty(_assertThisInitialized(_this), "render", function () {
        return React.createElement("div", {
          ref: "image_tag2",
          suppressContentEditableWarning: true
        }, React.createElement("div", {
          className: "aspectRatioPlaceholder is-locked",
          style: _this.coords(),
          onClick: _this.handleGrafFigureSelectImg
        }, React.createElement("div", {
          style: {
            paddingBottom: "".concat(_this.state.aspect_ratio.ratio, "%")
          },
          className: "aspect-ratio-fill"
        }), React.createElement("img", {
          src: _this.state.url,
          ref: "image_tag",
          height: _this.state.aspect_ratio.height,
          width: _this.state.aspect_ratio.width,
          className: "graf-image",
          contentEditable: false,
          alt: _this.state.url
        }), React.createElement(Loader, {
          toggle: _this.state.loading,
          progress: _this.state.loading_progress
        })), React.createElement("figcaption", {
          className: "imageCaption",
          onMouseDown: _this.handleFocus
        }, _this.props.block.getText().length === 0 ? React.createElement("span", {
          className: "danteDefaultPlaceholder"
        }, _this.placeholderText()) : undefined, React.createElement(draftJs.EditorBlock, Object.assign({}, _this.props, {
          "editable": true,
          "className": "imageCaption"
        }))));
      });

      var existing_data = _this.props.block.getData().toJS();

      _this.config = _this.props.blockProps.config;
      _this.file = _this.props.blockProps.data.get('file');
      _this.state = {
        loading: false,
        selected: false,
        loading_progress: 0,
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

    _createClass(ImageBlock, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        return this.replaceImg();
      }
    }, {
      key: "getUploadHeaders",
      value: function getUploadHeaders() {
        return this.config.upload_headers || {};
      }
    }, {
      key: "uploadCompleted",
      value: function uploadCompleted(url) {
        this.setState({
          url: url
        }, this.updateData);
        this.props.blockProps.removeLock();
        this.stopLoader();
        this.file = null;
      }
    }, {
      key: "updateProgressBar",
      value: function updateProgressBar(e) {
        var complete = this.state.loading_progress;

        if (e.lengthComputable) {
          complete = e.loaded / e.total * 100;
          complete = complete != null ? complete : {
            complete: 0
          };
          this.setState({
            loading_progress: complete
          });
          return console.log("complete: ".concat(complete));
        }
      }
    }, {
      key: "handleFocus",
      value: function handleFocus(e) {}
    }]);

    return ImageBlock;
  }(React.Component);

  var Loader =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(Loader, _React$Component2);

    function Loader() {
      var _ref;

      var _this2;

      _classCallCheck(this, Loader);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this2 = _possibleConstructorReturn(this, (_ref = Loader.__proto__ || Object.getPrototypeOf(Loader)).call.apply(_ref, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this2), "render", function () {
        return React.createElement("div", null, _this2.props.toggle ? React.createElement("div", {
          className: "image-upoader-loader"
        }, React.createElement("p", null, _this2.props.progress === 100 ? "processing image..." : React.createElement("span", null, React.createElement("span", null, "loading"), " ", Math.round(_this2.props.progress)))) : undefined);
      });

      return _this2;
    }

    return Loader;
  }(React.Component);

  var EmbedBlock =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(EmbedBlock, _React$Component);

    function EmbedBlock(props) {
      var _this;

      _classCallCheck(this, EmbedBlock);

      _this = _possibleConstructorReturn(this, (EmbedBlock.__proto__ || Object.getPrototypeOf(EmbedBlock)).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "defaultData", function () {
        var existing_data = _this.props.block.getData().toJS();

        return existing_data.embed_data || {};
      });

      _defineProperty(_assertThisInitialized(_this), "updateData", function () {
        var _this$props = _this.props,
            block = _this$props.block,
            blockProps = _this$props.blockProps;
        var getEditorState = blockProps.getEditorState,
            setEditorState = blockProps.setEditorState;
        var data = block.getData();
        var newData = data.merge(_this.state);
        return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
      });

      _defineProperty(_assertThisInitialized(_this), "dataForUpdate", function () {
        return _this.props.blockProps.data.toJS();
      });

      _defineProperty(_assertThisInitialized(_this), "classForImage", function () {
        if (_this.state.embed_data.images) {
          return "";
        } else {
          return "mixtapeImage--empty u-ignoreBlock";
        }
      });

      _defineProperty(_assertThisInitialized(_this), "picture", function () {
        if (_this.state.embed_data.images && _this.state.embed_data.images.length > 0) {
          return _this.state.embed_data.images[0].url;
        } else {
          return "";
        }
      });

      _this.state = {
        embed_data: _this.defaultData(),
        error: ""
      };
      return _this;
    }

    _createClass(EmbedBlock, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        if (!this.props.blockProps.data) {
          return;
        } // ensure data isnt already loaded
        // unless @dataForUpdate().endpoint or @dataForUpdate().provisory_text


        if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
          //debugger
          return;
        }

        return axios({
          method: 'get',
          url: "".concat(this.dataForUpdate().endpoint).concat(this.dataForUpdate().provisory_text, "&scheme=https")
        }).then(function (result) {
          return _this2.setState({
            embed_data: result.data //JSON.parse(data.responseText)

          }, _this2.updateData);
        }).catch(function (error) {
          _this2.setState({
            error: error.response.data.error_message
          });

          return console.log("TODO: error");
        });
      }
    }, {
      key: "render",
      value: function render() {
        //block = @.props
        //foo = @.props.blockProps
        //data = Entity.get(block.block.getEntityAt(0)).getData()
        console.log("ERROR", this.state.error);
        return React.createElement("span", null, this.picture() ? React.createElement("a", {
          target: "_blank",
          className: "js-mixtapeImage mixtapeImage ".concat(this.classForImage()),
          href: this.state.embed_data.url,
          style: {
            backgroundImage: "url('".concat(this.picture(), "')")
          }
        }) : undefined, this.state.error ? React.createElement("h2", null, this.state.error) : undefined, React.createElement("a", {
          className: "markup--anchor markup--mixtapeEmbed-anchor",
          target: "_blank",
          href: this.state.embed_data.url
        }, React.createElement("strong", {
          className: "markup--strong markup--mixtapeEmbed-strong"
        }, this.state.embed_data.title), React.createElement("em", {
          className: "markup--em markup--mixtapeEmbed-em"
        }, this.state.embed_data.description)), this.state.embed_data.provider_url);
      }
    }]);

    return EmbedBlock;
  }(React.Component);

  var VideoBlock =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(VideoBlock, _React$Component);

    function VideoBlock(props) {
      var _this;

      _classCallCheck(this, VideoBlock);

      _this = _possibleConstructorReturn(this, (VideoBlock.__proto__ || Object.getPrototypeOf(VideoBlock)).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "defaultData", function () {
        var existing_data = _this.props.block.getData().toJS();

        return existing_data.embed_data || {};
      });

      _defineProperty(_assertThisInitialized(_this), "updateData", function () {
        var _this$props = _this.props,
            block = _this$props.block,
            blockProps = _this$props.blockProps;
        var getEditorState = blockProps.getEditorState,
            setEditorState = blockProps.setEditorState;
        var data = block.getData();
        var newData = data.merge(_this.state);
        return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
      });

      _defineProperty(_assertThisInitialized(_this), "dataForUpdate", function () {
        return _this.props.blockProps.data.toJS();
      });

      _defineProperty(_assertThisInitialized(_this), "classForImage", function () {
        if (_this.state.embed_data.thumbnail_url) {
          return "";
        } else {
          return "mixtapeImage--empty u-ignoreBlock";
        }
      });

      _this.state = {
        embed_data: _this.defaultData()
      };
      return _this;
    }

    _createClass(VideoBlock, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        if (!this.props.blockProps.data) {
          return;
        } // ensure data isnt already loaded


        if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
          return;
        }

        return axios({
          method: 'get',
          url: "".concat(this.dataForUpdate().endpoint).concat(this.dataForUpdate().provisory_text, "&scheme=https")
        }).then(function (result) {
          return _this2.setState({
            embed_data: result.data //JSON.parse(data.responseText)

          }, _this2.updateData);
        }).catch(function (error) {
          return console.log("TODO: error");
        });
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement("figure", {
          className: "graf--figure graf--iframe graf--first",
          tabIndex: "0"
        }, React.createElement("div", {
          className: "iframeContainer",
          dangerouslySetInnerHTML: {
            __html: this.state.embed_data.html
          }
        }), React.createElement("figcaption", {
          className: "imageCaption"
        }, React.createElement(draftJs.EditorBlock, Object.assign({}, this.props, {
          "className": "imageCaption"
        }))));
      }
    }]);

    return VideoBlock;
  }(React.Component);

  var PlaceholderBlock =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(PlaceholderBlock, _React$Component);

    function PlaceholderBlock(props) {
      var _this;

      _classCallCheck(this, PlaceholderBlock);

      _this = _possibleConstructorReturn(this, (PlaceholderBlock.__proto__ || Object.getPrototypeOf(PlaceholderBlock)).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "placeholderText", function () {
        //if (this.state.enabled) {
        //  return ""
        //}
        return _this.props.blockProps.data.toJS().placeholder || _this.placeholderFromProps() || _this.defaultText();
      });

      _defineProperty(_assertThisInitialized(_this), "placeholderFromProps", function () {
        return _this.props.block.toJS().placeholder;
      });

      _defineProperty(_assertThisInitialized(_this), "defaultText", function () {
        return "write something ";
      });

      _defineProperty(_assertThisInitialized(_this), "placeholderRender", function () {
        if (_this.props.block.text.length === 0) {
          return React.createElement("div", {
            className: "public-DraftEditorPlaceholder-root"
          }, React.createElement("div", {
            className: "public-DraftEditorPlaceholder-inner"
          }, _this.placeholderText()));
        }
      });

      _this.state = {
        enabled: false,
        data: _this.props.blockProps.data.toJS()
      };
      return _this;
    }

    _createClass(PlaceholderBlock, [{
      key: "render",
      value: function render() {
        return React.createElement("span", {
          onMouseDown: this.handleFocus
        }, this.placeholderRender(), React.createElement(draftJs.EditorBlock, Object.assign({}, this.props, {
          "className": "imageCaption",
          "placeholder": "escrive alalal"
        })));
      }
    }]);

    return PlaceholderBlock;
  }(React.Component);

  var DividerBlock =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DividerBlock, _React$Component);

    function DividerBlock(props) {
      var _this;

      _classCallCheck(this, DividerBlock);

      _this = _possibleConstructorReturn(this, (DividerBlock.__proto__ || Object.getPrototypeOf(DividerBlock)).call(this, props));
      _this.state = {
        enabled: false,
        data: _this.props.blockProps.data.toJS()
      };
      return _this;
    }

    _createClass(DividerBlock, [{
      key: "componentDidMount",
      value: function componentDidMount() {}
    }, {
      key: "render",
      value: function render() {
        return React.createElement("hr", null);
      }
    }]);

    return DividerBlock;
  }(React.Component);

  // component implementation
  var Dante =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Dante, _React$Component);

    function Dante(props) {
      var _this;

      _classCallCheck(this, Dante);

      _this = _possibleConstructorReturn(this, (Dante.__proto__ || Object.getPrototypeOf(Dante)).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "defaultTooltips", function (options) {
        return [{
          ref: 'insert_tooltip',
          component: DanteTooltip,
          displayOnSelection: true,
          selectionElements: ["unstyled", "blockquote", "ordered-list", "unordered-list", "unordered-list-item", "ordered-list-item", "code-block", 'header-one', 'header-two', 'header-three', 'header-four', 'footer', 'column', 'jumbo'],
          widget_options: {
            placeholder: "type a url",
            block_types: [{
              label: 'p',
              style: 'unstyled',
              icon: Icons.bold
            }, {
              label: 'h2',
              style: 'header-one',
              type: "block",
              icon: Icons.h1
            }, {
              label: 'h3',
              style: 'header-two',
              type: "block",
              icon: Icons.h2
            }, {
              label: 'h4',
              style: 'header-three',
              type: "block",
              icon: Icons.h3
            }, {
              type: "separator"
            }, {
              label: 'color',
              type: "color"
            }, {
              type: "link"
            }, {
              label: 'blockquote',
              style: 'blockquote',
              type: "block",
              icon: Icons.blockquote
            }, {
              type: "separator"
            }, {
              label: 'insertunorderedlist',
              style: 'unordered-list-item',
              type: "block",
              icon: Icons.insertunorderedlist
            }, {
              label: 'insertorderedlist',
              style: 'ordered-list-item',
              type: "block",
              icon: Icons.insertunorderedlist
            }, {
              type: "separator"
            }, {
              label: 'code',
              style: 'code-block',
              type: "block",
              icon: Icons.code
            }, {
              label: 'bold',
              style: 'BOLD',
              type: "inline",
              icon: Icons.bold
            }, {
              label: 'italic',
              style: 'ITALIC',
              type: "inline",
              icon: Icons.italic
            }]
          }
        }, {
          ref: 'add_tooltip',
          component: DanteInlineTooltip
        }, {
          ref: 'anchor_popover',
          component: DanteAnchorPopover
        }, {
          ref: 'image_popover',
          component: DanteImagePopover
        }];
      });

      _defineProperty(_assertThisInitialized(_this), "defaultWidgets", function (options) {
        return [{
          icon: 'divider',
          type: 'divider',
          title: "Divider",
          editable: false,
          renderable: true,
          breakOnContinuous: true,
          block: DividerBlock,
          wrapper_class: "graf graf--hr",
          widget_options: {
            displayOnInlineTooltip: true,
            insertion: "insertion",
            insert_block: "divider"
          }
        }, {
          title: 'add an image',
          icon: 'image',
          type: 'image',
          block: ImageBlock,
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

              default:
                return "";
            }
          },
          handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
            var editorState = ctx.state.editorState;
            return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
          },
          handleEnterWithText: function handleEnterWithText(ctx, block) {
            var editorState = ctx.state.editorState;
            return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
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
          block: EmbedBlock,
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
            endpoint: "".concat(options.oembed_uri),
            placeholder: 'Paste a link to embed content from another site (e.g. Twitter) and press Enter'
          },
          handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
            var editorState = ctx.state.editorState;
            return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
          },
          handleEnterWithText: function handleEnterWithText(ctx, block) {
            var editorState = ctx.state.editorState;
            return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
          }
        }, {
          icon: 'video',
          title: 'insert video',
          editable: true,
          type: 'video',
          block: VideoBlock,
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
            endpoint: "".concat(options.oembed_uri),
            placeholder: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter',
            caption: 'Type caption for embed (optional)'
          },
          handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
            var editorState = ctx.state.editorState;
            return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
          },
          handleEnterWithText: function handleEnterWithText(ctx, block) {
            var editorState = ctx.state.editorState;
            return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
          }
        }, {
          renderable: true,
          editable: true,
          block: PlaceholderBlock,
          type: 'placeholder',
          wrapper_class: "is-embedable",
          breakOnContinuous: true,
          selected_class: "is-selected is-mediaFocused",
          widget_options: {
            displayOnInlineTooltip: false
          },
          handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
            var editorState = ctx.state.editorState;
            return ctx.onChange(resetBlockWithType(editorState, "unstyled"));
          },
          handleEnterWithText: function handleEnterWithText(ctx, block) {
            var editorState = ctx.state.editorState;
            var data = {
              provisory_text: block.getText(),
              endpoint: block.getData().get('endpoint'),
              type: block.getData().get('type')
            };
            return ctx.onChange(resetBlockWithType(editorState, data.type, data));
          }
        }];
      });

      var config = Immutable.Map(Immutable.fromJS(_this.defaultOptions(props.config)));
      _this.options = config.mergeDeep(props.config).toJS();
      return _this;
    }

    _createClass(Dante, [{
      key: "defaultOptions",
      value: function defaultOptions() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // default options
        var defaultOptions = {}; //defaultOptions.el = 'app'
        //defaultOptions.content = ""

        defaultOptions.read_only = false;
        defaultOptions.spellcheck = false;
        defaultOptions.title_placeholder = "Title";
        defaultOptions.body_placeholder = "Write your story"; // @defaultOptions.api_key = "86c28a410a104c8bb58848733c82f840"

        defaultOptions.widgets = options.widgets || this.defaultWidgets(options);
        defaultOptions.tooltips = options.tooltips || this.defaultTooltips(options);
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
        defaultOptions.default_wrappers = [{
          className: 'graf--p',
          block: 'unstyled'
        }, {
          className: 'graf--h2',
          block: 'header-one'
        }, {
          className: 'graf--h3',
          block: 'header-two'
        }, {
          className: 'graf--h4',
          block: 'header-three'
        }, {
          className: 'graf--blockquote',
          block: 'blockquote'
        }, {
          className: 'graf--insertunorderedlist',
          block: 'unordered-list-item'
        }, {
          className: 'graf--insertorderedlist',
          block: 'ordered-list-item'
        }, {
          className: 'graf--code',
          block: 'code-block'
        }, {
          className: 'graf--bold',
          block: 'BOLD'
        }, {
          className: 'graf--italic',
          block: 'ITALIC'
        }];
        defaultOptions.continuousBlocks = ["unstyled", "blockquote", "ordered-list", "unordered-list", "unordered-list-item", "ordered-list-item", "code-block"];
        defaultOptions.key_commands = {
          "alt-shift": [{
            key: 65,
            cmd: 'add-new-block'
          }],
          "alt-cmd": [{
            key: 49,
            cmd: 'toggle_block:header-one'
          }, {
            key: 50,
            cmd: 'toggle_block:header-two'
          }, {
            key: 53,
            cmd: 'toggle_block:blockquote'
          }],
          "cmd": [{
            key: 66,
            cmd: 'toggle_inline:BOLD'
          }, {
            key: 73,
            cmd: 'toggle_inline:ITALIC'
          }, {
            key: 75,
            cmd: 'insert:link'
          }]
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
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {}
    }, {
      key: "render",
      value: function render() {
        return React.createElement("div", {
          style: this.props.style
        }, React.createElement(DanteEditor, {
          content: this.props.content,
          config: this.options
        }));
      }
    }]);

    return Dante;
  }(React.Component);

  Dante.defaultProps = {
    content: null,
    read_only: false,
    spellcheck: false,
    title_placeholder: "Title",
    body_placeholder: "Write your story"
  };

  return Dante;

})));
