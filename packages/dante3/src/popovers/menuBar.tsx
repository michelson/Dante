import React from "react";
import { AnchorStyle } from "../styled/menu";
import ImagePopover from "./image";
import {
  BubbleMenu,
} from '@tiptap/react'
import DanteTooltipColor from "./color";

import { useState } from "react";

import {
  bold,
  italic,
  underline,
  insertunorderedlist,
  insertorderedlist,
  link,
  close,
  h1,
  h2,
  h3,
  h4,
  blockquote,
  code,
  alignLeft,
  alignCenter,
  alignRight,
} from "../icons";

function DanteTooltipLink({ enableLinkMode, selected, editor }: { editor: any, enableLinkMode: any, selected: any }) {
  function promptForLink(ev: any) {
    /*let selection = this.props.editorState.getSelection()
    if (!selection.isCollapsed()) {
      return this.props.enableLinkMode(ev)
    }*/
    return enableLinkMode(ev);
  }

  return (
    <li
      className={`dante-menu-button ${selected ? "active" : ""}`}
      onMouseDown={promptForLink}
    >
      <span className={"dante-icon"}>{link()}</span>
    </li>
  );
}

export default function MenuBar({ editor, configTooltip } : { editor: any, configTooltip: any }) {
  const [linkState, setLinkState] = useState<any>({
    link_mode: false,
    menu_style: {
      minWidth: "200px",
    },
  });

  const {fixed} = configTooltip
  const tools = configTooltip.allowTools

  const [show, setShow] = useState(false);

  if (!editor) {
    return null;
  }

  function displayLinkMode() {
    if (linkState.link_mode) {
      return "dante-menu--linkmode";
    } else {
      return "";
    }
  }

  function displayActiveMenu() {
    // @ts-ignore
    if (this.state.show) {
      return "dante-menu--active";
    } else {
      return "";
    }
  }

  function itemClass(kind: any, opts: any = null) {
    if (!opts)
      return `dante-menu-button ${editor.isActive(kind) ? "active" : ""}`;
    return `dante-menu-button ${editor.isActive(kind, opts) ? "active" : ""}`;
  }

  function handleInputEnter(e: any) {
    if (e.which === 13) {
      return confirmLink(e);
    }
  }

  function confirmLink(e: any) {
    e.preventDefault();
    let url = e.currentTarget.value;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
    _disableLinkMode(e);
  }

  function _enableLinkMode(ev: any) {
    ev.preventDefault();
    setLinkState({
      link_mode: true,
      menu_style: {
        minWidth: "200px",
      },
    });
  }

  function _disableLinkMode(ev: any) {
    ev.preventDefault();
    setLinkState({
      link_mode: false,
      url: "",
      menu_style: { },
    });
  }

  function _clickBlockInlineStyle(style: any) {
    editor.chain().focus().setColor &&
    editor.chain().focus().setColor(style).run();
  }

  function fixedStyles() {
    if (!fixed) return { width: `${tools.length * 43}px` };
    if (fixed) return { position: `sticky`, top: "0" };
    return {}
  }

  function renderMenu() {
    if (!editor.isEditable) return null;

    const allowedElements = configTooltip.selectionElements || ["paragraph", "heading"]
    const currentBlock = editor?.view?.state?.selection?.$head?.parent?.type.name

    if(!allowedElements.includes(currentBlock)) return
    // TODO: use the configuration for this!
    // if (editor.isActive("ImageBlock")) return null;

    if(configTooltip.allowTools.length == 0) return


    return (
      <AnchorStyle
        fixed={fixed}
        className={`dante-menu ${displayLinkMode()}`}
        // @ts-ignore
        style={fixedStyles()}
      >
        <div className="dante-menu-linkinput" style={{ width: `${tools.length * 43}px` }}>
          <input
            className="dante-menu-input"
            placeholder={"put your souce here"}
            onKeyPress={handleInputEnter}
            //defaultValue={ this.getDefaultValue() }
          />
          <div className="dante-menu-button" onMouseDown={_disableLinkMode}>
            <span className={"dante-icon"}>{close()}</span>
          </div>
        </div>

        <div className="dante-menu-buttons" style={linkState.menu_style}>
          {configTooltip.allowTools.includes('bold') && (<li
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={itemClass("bold")}
          >
            <span className={"dante-icon"}>{bold()}</span>
          </li>
          )}

          {configTooltip.allowTools.includes('italic') && (
            <li
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={itemClass("italic")}
            >
              <span className={"dante-icon"}>{italic()}</span>
            </li>
          )}
          {configTooltip.allowTools.includes('underline') && (
            <li
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={itemClass("underline")}
            >
              <span className={"dante-icon"}>{underline()}</span>
            </li>
          )}

          {/* <span className="dante-menu-divider"></span> */}

          {configTooltip.allowTools.includes('alignLeft') && (
            <li
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={itemClass({ textAlign: 'left' })}
            >
              <span className={"dante-icon"}>{alignLeft()}</span>
            </li>
          )}

          {configTooltip.allowTools.includes('alignCenter') && (
            <li
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={itemClass({ textAlign: 'center' })}
            >
              <span className={"dante-icon"}>{alignCenter()}</span>
            </li>
          )}


          {configTooltip.allowTools.includes('alignRight') && (
            <li
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={itemClass({ textAlign: 'right' })}
            >
              <span className={"dante-icon"}>{alignRight()}</span>
            </li>
          )}

          {/* <span className="dante-menu-divider"></span> */}

          {configTooltip.allowTools.includes('color') && (<DanteTooltipColor
            styles={{}}
            editor={editor}
            enableLinkMode={_enableLinkMode}
            value={null}
            defaultValue={"#555"}
            style_type="color"
            handleClick={_clickBlockInlineStyle}
            show={show}
          />)}

          {configTooltip.allowTools.includes('link') && (<DanteTooltipLink
            selected={editor.isActive("link")}
            editor={editor}
            enableLinkMode={_enableLinkMode}
          />)}

          {/* <span className="dante-menu-divider"></span> */}

          {configTooltip.allowTools.includes('h1') && (<li
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={itemClass("heading", { level: 1 })}
          >
            <span className={"dante-icon"}>{h1()}</span>
          </li>
          )}

          {configTooltip.allowTools.includes('h2') && (<li
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={itemClass("heading", { level: 2 })}
          >
            <span className={"dante-icon"}>{h2()}</span>
          </li>)}

          {configTooltip.allowTools.includes('h3') && (<li
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={itemClass("heading", { level: 3 })}
          >
            <span className={"dante-icon"}>{h3()}</span>
          </li>)}

          {/* <span className="dante-menu-divider"></span> */}

          {configTooltip.allowTools.includes('bulletList') && (<li
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={itemClass("bulletList")}
          >
            <span className={"dante-icon"}>{insertunorderedlist()}</span>
          </li>)}

          {configTooltip.allowTools.includes('orderedList') && (<li
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={itemClass("orderedList")}
          >
            <span className={"dante-icon"}>{insertorderedlist()}</span>
          </li>
          )}

          {/* <span className="dante-menu-divider"></span> */}
          {configTooltip.allowTools.includes('code') && (<li
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={itemClass("codeBlock")}
          >
            <span className={"dante-icon"}>{code()}</span>
          </li>)}

          {/* <span className="dante-menu-divider"></span> */}
          {configTooltip.allowTools.includes('blockquote') && (<li
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={itemClass("blockquote")}
          >
            <span className={"dante-icon"}>{blockquote()}</span>
          </li>
          )}
        </div>
      </AnchorStyle>
    );
  }

  function renderImageTooptip() {
    if (!editor.isEditable) return;
    if (!editor.isActive("ImageBlock")) return null;

    return (
      <ImagePopover
        item={{}}
        handleClick={(e: any) => {
          //console.log("AAA", e);
          editor.commands.updateAttributes("ImageBlock", { direction: e });
          const pos = editor?.view?.lastSelectedViewDesc?.spec?.getPos();
          //console.log("POS", pos);
          pos && editor.commands.setNodeSelection(pos);
        }}
      />
    );
  }

  return (
    <>
      {fixed && renderMenu()}

      {!fixed && (
        <BubbleMenu editor={editor}>
          {renderMenu()}
          {renderImageTooptip()}
        </BubbleMenu>
      )}
    </>
  );
}


export const MenuBarConfig = (options = {}) => {
  let config = {
    ref: "menu_bar",
    component: MenuBar,
    allowTools: [
      'bold',
      'italic',
      'underline',
      'alignLeft',
      'alignCenter',
      'alignRight',
      'link',
      'color',
      'h1',
      'h2',
      'h3',
      'bulletList',
      'orderedList',
      'blockquote',
      'code'
    ],
  };
  return Object.assign(config, options);
};
