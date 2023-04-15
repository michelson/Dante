import React from 'react'
import { useEditor, EditorContent , FloatingMenu } from '@tiptap/react'
import { lowlight } from 'lowlight/lib/core'

import { Placeholder } from "../plugins/tipTapPlaceholder";
import { Color } from "../plugins/colorStyle";
import EditorContainer, { LogWrapper } from "../styled/base";

import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Focus from "@tiptap/extension-focus";

/*
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
*/

import { extensionFactory } from "../blocks/extension";
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "../styled/themes/default";
import AddButton from "../popovers/addButton";
import MenuBar from "../popovers/menuBar";

import { defaultPlugins as factoryPlugins } from "./constants";

type TipTapProps = {
  bodyPlaceholder?: any,
  widgets?: any,
  extensions?: any,
  theme?: any,
  fixed?: boolean,
  content?: any,
  onUpdate?: any
  readOnly?: any,
}

const Tiptap = ({
  bodyPlaceholder, 
  widgets, 
  extensions,
  theme,
  fixed,
  content,
  onUpdate,
  readOnly,
}: TipTapProps ) => {

  const editor = useEditor({
    extensions: pluginsConfig(),
    content: content || "null", //defaultContent(),
    editable: !readOnly,
    onUpdate({ editor }) {
      // The content has changed.
      // console.log("changed!", editor.getJSON());
      onUpdate && onUpdate(editor);
      //setLog(JSON.parse(JSON.stringify(editor.getJSON())))
    },
  })

  function basePlugins() {
    return [

      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "graf graf--h",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "graf graf--p",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "graf graf--li",
          },
        },

        orderedList: {
          HTMLAttributes: {
            class: "graf graf--ol",
          },
        },
        
        codeBlock: {
          HTMLAttributes: {
            class: "graf code"
          }
        },
        code: {
          HTMLAttributes: {
            class: "graf code"
          }
        }
      }), 
      //TextStyle,
      //Color,      
      Placeholder.configure({
        placeholder: bodyPlaceholder || "Write something …",
      }),
      TextStyle,
      Color,
      Focus,
      /*Link.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
      }).configure({
        HTMLAttributes: {
          class: "markup--anchor",
        },
      }),*/
      CodeBlockLowlight.configure({
        lowlight,
      }),
      //OrderedList,
      
      //ListItem,
      //TaskList,
      //TaskItem,
    ];
  }

  function optionalPlugins() {
    if (widgets) return widgets;
    return factoryPlugins;
  }

  function newPluginsConfig() {
    return optionalPlugins().map((o : any) => extensionFactory(o));
  }

  function pluginsConfig() {
    const newExtensions = extensions ? extensions : [];
    return basePlugins().concat([...newPluginsConfig(), ...newExtensions]);
  }

  function isPopOverEnabledFor(a: any) {
    //console.log("ENABLED FOR ", editor.state.selection.$anchor.parent);
    const comp = editor?.state.selection.$anchor.parent;
    if (comp && comp.type.name === "paragraph") return true;
  }

  const resolvedTheme = theme ? theme : defaultTheme;

  return (
    <ThemeProvider theme={resolvedTheme}>
      <EditorContainer>
        <>

        {editor && <MenuBar fixed={fixed} editor={editor} />}

        <EditorContent editor={editor} />
        {editor && !fixed &&
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
              {isPopOverEnabledFor("AddButton") && (
                <div style={{ position: "absolute", top: -15, left: -60 }}>
                  <AddButton
                    //ref={sideBarControls}
                    fixed={fixed}
                    position={{}}
                    editor={editor}
                    display={true || "displaySidebar"}
                    widgets={optionalPlugins()}
                  />
                </div>
              )}
          </FloatingMenu>
        }


        {fixed && editor && (
          <AddButton
            //ref={sideBarControls}
            //position={bounds}
            fixed={fixed}
            editor={editor}
            position={{ width: "100%" }}
            display={true || "displaySidebar"}
            widgets={optionalPlugins()}
          />
        )}

        </>
      </EditorContainer>
    </ThemeProvider>
  )
}

export default Tiptap