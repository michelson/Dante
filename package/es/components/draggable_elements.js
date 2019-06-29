import React from 'react'; // INLINE TOOLTIP

var style = {
  position: "fixed",
  zIndex: 2000,
  top: '0px',
  left: '0px',
  width: '100px',
  backgroundColor: 'red',
  height: '100%'
};
export default function () {
  var startDrag = function startDrag(event, data) {
    event.dataTransfer.dropEffect = 'move'; // eslint-disable-line no-param-reassign
    // declare data and give info that its an existing key and a block needs to be moved

    event.dataTransfer.setData('text', JSON.stringify(data));
  };

  return React.createElement("div", {
    style: style
  }, React.createElement("ul", null, React.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "embed"
      });
    }
  }, "embed"), React.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "column",
        data: {
          className: "col-sm-12"
        }
      });
    }
  }, "column 12"), React.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "column",
        data: {
          className: "col-sm-4"
        }
      });
    }
  }, "column 4"), React.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "column",
        data: {
          className: "col-sm-6"
        }
      });
    }
  }, "column 6"), React.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "card"
      });
    }
  }, "card"), React.createElement("li", {
    draggable: true,
    onDragStart: function onDragStart(e) {
      return startDrag(e, {
        type: "jumbo"
      });
    }
  }, "jumbo")));
}