import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';

var Color = Extension.create({
  name: "color",
  addOptions: {
    types: ["textStyle"]
  },
  addGlobalAttributes: function addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        color: {
          "default": null,
          renderHTML: function renderHTML(attributes) {
            if (!attributes.color) {
              return {};
            }
            return {
              style: "color: ".concat(attributes.color)
            };
          },
          parseHTML: function parseHTML(element) {
            return {
              color: element.style.color.replace(/['"]+/g, "")
            };
          }
        }
      }
    }];
  },
  addCommands: function addCommands() {
    return {
      setColor: function setColor(color) {
        return function (_ref) {
          var chain = _ref.chain;
          return chain().setMark("textStyle", {
            color: color
          }).run();
        };
      },
      unsetColor: function unsetColor() {
        return function (_ref2) {
          var chain = _ref2.chain;
          return chain().setMark("textStyle", {
            color: null
          }).removeEmptyTextStyle().run();
        };
      }
    };
  }
});

export { Color };
