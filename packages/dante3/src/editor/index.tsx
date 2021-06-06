import React from "react";
//import { getNodeType } from "@tiptap/core";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { Editor as IEditor } from "@tiptap/core";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Focus from "@tiptap/extension-focus";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

//import './styles.scss'
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "../styled/themes/default";
import { extensionFactory } from "../blocks/extension";
import CodeBlock from "../blocks/code";

import { defaultPlugins as factoryPlugins } from "../index";

import AddButton from "../popovers/addButton";
import MenuBar from "../popovers/menuBar";
import { Placeholder } from "../plugins/tipTapPlaceholder";
import { Color } from "../plugins/colorStyle";

// load all highlight.js languages
import lowlight from "lowlight";
//import SaveBehavior from './data/save_content'
import EditorContainer, { LogWrapper } from "../styled/base";

interface Props extends Record<string, any> {
  fixed: boolean;
  hasPopOver: boolean;
  content: string;
  onUpdate: (args: IEditor) => void;
  readOnly: boolean;
  bodyPlaceholder: string;
}

export default function Editor({
  widgets,
  theme,
  fixed = false,
  hasPopOver = true,
  content,
  onUpdate,
  readOnly,
  bodyPlaceholder,
  extensions,
}: Props) {
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
      }),
      //Image,
      Placeholder.configure({
        placeholder: bodyPlaceholder || "Write something …",
      }),
      TextStyle,
      Color,
      Focus,
      Link.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
        //renderHTML({ HTMLAttributes }) {
        //  return ['a', HTMLAttributes, 0]
        //},
      }).configure({
        HTMLAttributes: {
          class: "markup--anchor",
        },
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
      }).configure({ lowlight }),
      OrderedList,
      ListItem,
      TaskList,
      TaskItem,
    ];
  }

  function optionalPlugins() {
    if (widgets) return widgets;
    return factoryPlugins;
  }

  function newPluginsConfig() {
    return optionalPlugins().map((o) => extensionFactory(o));
  }

  function pluginsConfig() {
    const newExtensions = extensions ? extensions : [];
    return basePlugins().concat([...newPluginsConfig(), ...newExtensions]);
  }

  const editor = useEditor({
    extensions: pluginsConfig(),
    content: content, //defaultContent(),
    editable: !readOnly,
    onUpdate({ editor }) {
      // The content has changed.
      // console.log("changed!", editor.getJSON());
      onUpdate && onUpdate(editor);
      //setLog(JSON.parse(JSON.stringify(editor.getJSON())))
    },
  });

  //window.editor = editor;

  function isPopOverEnabled() {
    //console.log("ENABLED FOR ", editor.state.selection.$anchor.parent);
    const comp = editor.state.selection.$anchor.parent;

    return comp.type.name === "paragraph" && hasPopOver;
  }

  const resolvedTheme = theme ? theme : defaultTheme;

  return (
    <ThemeProvider theme={resolvedTheme}>
      <EditorContainer
      //style={{width: '600px', margin: '0 auto'}}
      >
        <div
        //className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto"
        >
          <MenuBar fixed={fixed} editor={editor} />

          {/*<ImageBar editor={editor} />*/}

          <EditorContent editor={editor} />

          {editor && !fixed && (
            <FloatingMenu editor={editor}>
              {isPopOverEnabled() && (
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
          )}

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
        </div>
      </EditorContainer>
    </ThemeProvider>
  );
}
