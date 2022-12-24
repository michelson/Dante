import { Editor, Node } from "@tiptap/core";
import { ReactNodeViewRenderer, mergeAttributes } from "@tiptap/react";
import { nodeInputRule } from "@tiptap/core";

interface NodeThis {
  name: string; options: any; storage: any; editor: Editor; type: any; parent: () => void;
}
export function extensionFactory(options) {
  return Node.create({
    name: options.name,
    group: options.group || "block",
    content: "inline*",
    selectable: true,
    draggable: true,
    atom: options.atom || false,
    addOptions: options.options || {},
    // priority: options.priority || 1, // somehow this option breaks the addKeyboardShortcut
    onBeforeCreate() {
      // Before the view is created.
      options.onBeforeCreate && options.onBeforeCreate(this.editor);
    },
    onCreate() {
      // The editor is ready.
      options.onCreate && options.onCreate(this.editor);
    },
    onUpdate() {
      // The content has changed.
      options.onUpdate && options.onUpdate(this.editor);
    },
    onSelectionUpdate() {
      // The selection has changed.
      options.onSelectionUpdate && options.onSelectionUpdate(this.editor);
    },
    onTransaction() {
      // The editor state has changed.
      options.onTransaction && options.onTransaction(this.editor);
    },
    onFocus() {
      // The editor is focused.
      options.onFocus && options.onFocus(this.editor);
    },
    onBlur() {
      // The editor isn’t focused anymore.
      options.onBlur && options.onBlur(this.editor);
    },
    onDestroy() {
      // The editor is being destroyed.
      options.onDestroy && options.onDestroy();
    },
    addKeyboardShortcuts() {
      if (!options.keyboardShortcuts) return {};
      return (
        options.keyboardShortcuts && options.keyboardShortcuts(this.editor)
      );
    },
    addCommands() {
      return {
        [`insert${options.name}`]:
          (attributes) =>
          ({ chain }) => {
            return chain()
              .insertContent({
                type: options.name,
                attrs: {
                  url: "",
                },
              })
              .run();
            //.insertNode(options.name, attributes)
            //.insertText(" ")
            //.run();
          },
      };
    },
    addAttributes() {
      return options.attributes || {};
    },
    parseHTML() {
      return (
        options.parseHTML || [
          {
            tag: options.tag,
          },
        ]
      );
    },
    renderHTML({ HTMLAttributes }) {
      console.log(HTMLAttributes);
      const attributes = options.dataSerializer
        ? options.dataSerializer(HTMLAttributes)
        : HTMLAttributes;
      return [options.tag, mergeAttributes(attributes)];
    },
    addNodeView() {
      return ReactNodeViewRenderer(options.component);
    },
    addInputRules() {
      if (!options.addInputRules) return [];
      return options.addInputRules().map((rule) => {
        return nodeInputRule({ find: rule, type: this.type });
      });
    },
  });
}
