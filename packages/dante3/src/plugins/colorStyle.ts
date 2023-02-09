import { Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

// Recommended approach for extending commands
// @see https://tiptap.dev/guide/typescript#command-type
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customExtension: {
      setColor: (color: string) => ReturnType,
      unsetColor: () => ReturnType
    }
  }
}

export const Color = Extension.create({
  name: "color",

  addOptions() {
    return {
      types: ["textStyle"],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {};
              }

              return {
                style: `color: ${attributes.color}`,
              };
            },
            parseHTML: (element) => ({
              color: element.style.color.replace(/['"]+/g, ""),
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setColor:
        (color) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { color }).run();
        },
      unsetColor:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { color: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
