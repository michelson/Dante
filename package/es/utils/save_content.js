function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import axios from "axios";
import Immutable from 'immutable';

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

      if (!(this.config.data_storage.url || this.config.data_storage.save_handler)) {
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
      var isChanged = !Immutable.is(Immutable.fromJS(this.editorContent), Immutable.fromJS(content)); // console.log("CONTENT CHANGED:", isChanged)

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
          return _this2.config.data_storage.success_handler(result);
        }

        if (_this2.config.xhr.success_handler) {
          return _this2.config.xhr.success_handler(result);
        }
      }).catch(function (error) {
        // console.log("ERROR: got error saving content at #{@config.data_storage.url} - #{error}")
        if (_this2.config.data_storage.failure_handler) {
          return _this2.config.data_storage.failure_handler(error);
        }

        if (_this2.config.xhr.failure_handler) {
          return _this2.config.xhr.failure_handler(error);
        }
      });
    }
  }]);

  return SaveBehavior;
}();

export default SaveBehavior;