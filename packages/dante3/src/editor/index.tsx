import React, { useState } from 'react'
import { useEditor, EditorContent , FloatingMenu } from '@tiptap/react'
import { lowlight } from 'lowlight/lib/core'

import { Placeholder } from "../plugins/tipTapPlaceholder";
import { Color } from "../plugins/colorStyle";

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
import {AddButtonConfig} from "../popovers/addButton";
import {MenuBarConfig} from "../popovers/menuBar";

import { defaultPlugins as factoryPlugins } from "./constants";

type DanteEditorProps = {
  bodyPlaceholder?: any,
  widgets?: any,
  extensions?: any,
  theme?: any,
  fixed?: boolean,
  content?: any,
  onUpdate?: any
  readOnly?: any,
  autofocus?: any
  tooltips: any[],
  editorProps: any
}

const DanteEditor = ({
  bodyPlaceholder, 
  widgets, 
  extensions,
  fixed,
  content,
  onUpdate,
  readOnly,
  autofocus,
  tooltips,
  editorProps
}: DanteEditorProps ) => {

  const editor = useEditor({
    extensions: pluginsConfig(),
    content: content || null,
    editable: !readOnly,
    autofocus: autofocus,
    editorProps: editorProps,
    onUpdate({ editor }) {
      // The content has changed.
      // console.log("changed!", editor.getJSON());
      onUpdate && onUpdate(editor);
      //setLog(JSON.parse(JSON.stringify(editor.getJSON())))
    },
  })

  React.useEffect(()=>{
    if(editor) editor.setEditable(!readOnly)
  }, [editor, readOnly])

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

  function defaultTooltips(){
    if(!editor) return []
    if(tooltips) return tooltips
    return [
      AddButtonConfig({}),
      MenuBarConfig({})
    ]
  }

  function newPluginsConfig() {
    return optionalPlugins().map((o : any) => extensionFactory(o));
  }

  function pluginsConfig() {
    const newExtensions = extensions ? extensions : [];
    return basePlugins().concat([...newPluginsConfig(), ...newExtensions]);
  }


  function renderTooltip(o, i) {
    return (
      <o.component
        key={i}
        editor={editor}
        display={true || "displaySidebar"}
        widgets={optionalPlugins()}
        //editorState={this.state.editorState}
        //onChange={this.onChange}
        //styles={this.styles}
        configTooltip={ o || {} }
        //widget_options={o.widget_options}
        //showPopLinkOver={this.showPopLinkOver}
        //hidePopLinkOver={this.hidePopLinkOver}
        //handleOnMouseOver={this.handleShowPopLinkOver}
        //handleOnMouseOut={this.handleHidePopLinkOver}
      />
    );
  };


  return (
    <>

      { 
        defaultTooltips()
        .filter((o) => o.placement === "up")
        .map((o, i) => {
          return renderTooltip(o, i)
        })
      }

      <EditorContent editor={editor} />
 
      { 
        defaultTooltips()
        .filter((o) => o.placement !== "up")
        .map((o, i) => {
          return renderTooltip(o, i)
        })
      }

    </>
  )
}

export default DanteEditor