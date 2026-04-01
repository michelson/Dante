import { Extension, isNodeEmpty } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export const Placeholder = Extension.create({
  name: "placeholder",

  addOptions: {
    emptyEditorClass: "is-editor-empty",
    emptyNodeClass: "is-empty",
    placeholder: "Write something …",
    showOnlyWhenEditable: true,
    showOnlyCurrent: true,
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: ({ doc, selection }) => {
            const active =
              this.editor.isEditable || !this.options.showOnlyWhenEditable;
            const { anchor } = selection;
            const decorations = [];

            if (!active) {
              return;
            }

            doc.descendants((node, pos) => {
              //console.log(anchor, pos, node.nodeSize)
              const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
              const isEmpty = !node.isLeaf && isNodeEmpty(node);

              if ((hasAnchor || !this.options.showOnlyCurrent) && isEmpty) {
                const classes = [this.options.emptyNodeClass];

                if (this.editor.isEmpty) {
                  classes.push(this.options.emptyEditorClass);
                }

                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(" "),
                  "data-placeholder":
                    typeof this.options.placeholder === "function"
                      ? this.options.placeholder({
                          editor: this.editor,
                          node,
                        })
                      : this.options.placeholder,
                });

                decorations.push(decoration);
              }

              return false;
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});
