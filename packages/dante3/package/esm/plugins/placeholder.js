import { Plugin } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';

var placeholder = new Plugin({
  props: {
    decorations: function decorations(state) {
      var decorations = [];
      var decorate = function decorate(node, pos) {
        if (node.type.isBlock && node.childCount === 0) {
          decorations.push(Decoration.node(pos, pos + node.nodeSize, {
            "class": "empty-node"
          }));
        }
      };
      state.doc.descendants(decorate);
      return DecorationSet.create(state.doc, decorations);
    }
  }
});

export { placeholder as default };
