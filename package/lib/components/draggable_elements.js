"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// INLINE TOOLTIP
var style = {
  position: "fixed",
  zIndex: 2000,
  top: '0px',
  left: '0px',
  width: '100px',
  backgroundColor: 'red',
  height: '100%'
};

function _default() {
  var startDrag = function startDrag(event, data) {
    event.dataTransfer.dropEffect = 'move'; // eslint-disable-line no-param-reassign
    // declare data and give info that its an existing key and a block needs to be moved

    event.dataTransfer.setData('text', JSON.stringify(data));
  };

  return _react.default.createElement("div", {
    style: style
  }, _react.default.createElement("ul", null, _react.default.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "embed"
      });
    }
  }, "embed"), _react.default.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "column",
        data: {
          className: "col-sm-12"
        }
      });
    }
  }, "column 12"), _react.default.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "column",
        data: {
          className: "col-sm-4"
        }
      });
    }
  }, "column 4"), _react.default.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "column",
        data: {
          className: "col-sm-6"
        }
      });
    }
  }, "column 6"), _react.default.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "card"
      });
    }
  }, "card"), _react.default.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "jumbo"
      });
    }
  }, "jumbo")));
}