import { CommandProps, Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    color: {
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
        () =>
        ({ chain }: CommandProps) => {
          return chain()
            .setMark("textStyle", { color: null })
            .run();
        },
      unsetColor:
        () =>
        ({ chain }: CommandProps) => {
          return chain()
            .setMark("textStyle", { color: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
