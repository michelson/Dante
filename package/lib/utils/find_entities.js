"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _this = void 0;

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

var _default = findEntities;
exports.default = _default;