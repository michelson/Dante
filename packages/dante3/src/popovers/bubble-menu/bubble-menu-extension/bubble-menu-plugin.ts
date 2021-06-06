import { Editor, isNodeSelection, posToDOMRect } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import tippy, { Instance, Props } from "tippy.js";

export interface BubbleMenuPluginProps {
  editor: Editor;
  element: HTMLElement;
  tippyOptions?: Partial<Props>;
}

export type BubbleMenuViewProps = BubbleMenuPluginProps & {
  view: EditorView;
};

export class BubbleMenuView {
  public editor: Editor;

  public element: HTMLElement;

  public view: EditorView;

  public enabled: boolean; //<-- added this

  public preventHide = false;

  public tippy!: Instance;

  constructor({ editor, element, view, tippyOptions }: BubbleMenuViewProps) {
    this.editor = editor;
    this.element = element;
    this.view = view;

    this.enabled = false;

    this.element.addEventListener("mousedown", this.mousedownHandler, {
      capture: true,
    });

    this.view.dom.addEventListener("mouseup", this.mouseupHandler, {
      capture: true,
    });

    // console.log("INSTANTIATED") // <-- this is called twice ! why?

    //this.editor.on("focus", this.focusHandler); // <-- removed this
    this.editor.on("blur", this.blurHandler);
    this.createTooltip(tippyOptions);
    this.element.style.visibility = "visible";
  }

  mousedownHandler = () => {
    this.preventHide = true;
  };

  mouseupHandler = () => {
    // console.log("MOUSE UP HANDLER")
    this.focusHandler(); // <-- call the focus here
  };

  focusHandler = () => {
    // console.log("FOCUSSSS")
    this.enabled = true;
    // we use `setTimeout` to make sure `selection` is already updated
    setTimeout(() => this.update(this.editor.view));
  };

  blurHandler = ({ event }: { event: FocusEvent }) => {
    //console.log("BLUR HANDLER")
    if (this.preventHide) {
      this.preventHide = false;

      return;
    }

    if (
      event?.relatedTarget &&
      this.element.parentNode?.contains(event.relatedTarget as Node)
    ) {
      return;
    }

    this.hide();
  };

  createTooltip(options: Partial<Props> = {}) {
    this.tippy = tippy(this.view.dom, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: true,
      maxWidth: "",
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...options,
    });
  }

  update(view: EditorView, oldState?: EditorState) {
    const { state, composing } = view;
    const { doc, selection } = state;

    //console.log("UPDATE SELECTION ON", selection.from, selection.to)

    const isSame =
      oldState && oldState.doc.eq(doc) && oldState.selection.eq(selection);

    if (composing || isSame) {
      return;
    }

    const { empty, $anchor, ranges } = selection;

    // support for CellSelections
    const from = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));

    // Sometime check for `empty` is not enough.
    // Doubleclick an empty paragraph returns a node size of 2.
    // So we check also for an empty text size.
    if (empty || !$anchor.parent.textContent) {
      this.hide();
      return;
    }

    // RETURN IF NOT ENABLED
    if (!this.enabled) return;
    // IF PASS SET DISABLED HERE
    this.enabled = false;

    this.tippy &&
      this.tippy.setProps({
        getReferenceClientRect: () => {
          if (isNodeSelection(view.state.selection)) {
            const node = view.nodeDOM(from) as HTMLElement;

            if (node && node.getBoundingClientRect) {
              // return node.getBoundingClientRect()
              if (node.children[0]) {
                return node.children[0].getBoundingClientRect(); // THIS
              } else {
                return node.getBoundingClientRect();
              }
            }
          }

          return posToDOMRect(view, from, to);
        },
      });

    this.show();
  }

  show() {
    this.tippy && this.tippy.show();
  }

  hide() {
    this.tippy && this.tippy.hide();
  }

  destroy() {
    this.tippy.destroy();
    this.tippy = null;
    this.element.removeEventListener("mousedown", this.mousedownHandler);
    this.view.dom.removeEventListener("mouseup", this.mouseupHandler); // <-- REMOVE THE EVENT
    this.editor.off("focus", this.focusHandler);
    this.editor.off("blur", this.blurHandler);
  }
}

export const BubbleMenuPluginKey = new PluginKey("menuBubble");

export const BubbleMenuPlugin = (options: BubbleMenuPluginProps) => {
  return new Plugin({
    key: BubbleMenuPluginKey,
    view: (view) => new BubbleMenuView({ view, ...options }),
  });
};
