import { Extension, isNodeEmpty } from '@tiptap/core';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';

var Placeholder = Extension.create({
  name: "placeholder",
  addOptions: {
    emptyEditorClass: "is-editor-empty",
    emptyNodeClass: "is-empty",
    placeholder: "Write something …",
    showOnlyWhenEditable: true,
    showOnlyCurrent: true
  },
  addProseMirrorPlugins: function addProseMirrorPlugins() {
    var _this = this;
    return [new Plugin({
      props: {
        decorations: function decorations(_ref) {
          var doc = _ref.doc,
            selection = _ref.selection;
          var active = _this.editor.isEditable || !_this.options.showOnlyWhenEditable;
          var anchor = selection.anchor;
          var decorations = [];
          if (!active) {
            return;
          }
          doc.descendants(function (node, pos) {
            //console.log(anchor, pos, node.nodeSize)
            var hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
            var isEmpty = !node.isLeaf && isNodeEmpty(node);
            if ((hasAnchor || !_this.options.showOnlyCurrent) && isEmpty) {
              var classes = [_this.options.emptyNodeClass];
              if (_this.editor.isEmpty) {
                classes.push(_this.options.emptyEditorClass);
              }
              var decoration = Decoration.node(pos, pos + node.nodeSize, {
                "class": classes.join(" "),
                "data-placeholder": typeof _this.options.placeholder === "function" ? _this.options.placeholder({
                  editor: _this.editor,
                  node: node
                }) : _this.options.placeholder
              });
              decorations.push(decoration);
            }
            return false;
          });
          return DecorationSet.create(doc, decorations);
        }
      }
    })];
  }
});

export { Placeholder };
