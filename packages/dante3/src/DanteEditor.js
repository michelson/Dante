import React, { useEffect, useState } from "react";
//import { getNodeType } from "@tiptap/core";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Focus from "@tiptap/extension-focus";

//import './styles.scss'
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "./styled/themes/default";
import darkTheme from "./styled/themes/dark";

import { ImageBlockConfig } from "./blocks/image";
import { VideoRecorderBlockConfig } from "./blocks/videoRecorder";
import CodeBlock, { CodeBlockConfig } from "./blocks/code";
import { PlaceholderBlockConfig } from "./blocks/placeholder";
import { DividerBlockConfig } from "./blocks/divider";
import { GiphyBlockConfig } from "./blocks/giphy/giphyBlock";
import { EmbedBlockConfig } from "./blocks/embed";
import { VideoBlockConfig } from "./blocks/video";

import defaultContent, { jsonContent } from "./data/content";
// load all highlight.js languages
import lowlight from "lowlight";
//import SaveBehavior from './data/save_content'
import EditorContainer, { LogWrapper } from "./styled/base";
import { SpeechToTextBlockConfig } from "./blocks/speechToText";

import DanteEditor from "./editor";
// A new Y document
//const ydoc = new Y.Doc()
// Registered with a WebRTC provider
//const provider = new WebrtcProvider('example-document', ydoc)

export default function Editor() {
  //window.editor = editor;

  function isPopOverEnabledFor(a) {
    //console.log("ENABLED FOR ", editor.state.selection.$anchor.parent);
    const comp = editor.state.selection.$anchor.parent;
    if (comp.type.name === "paragraph") return true;
  }

  const [log, setLog] = useState(null);
  const [theme, setTheme] = useState("light");
  const [fixed, setFixed] = useState(false);

  const [themeOptions, setThemeOptions] = useState(getDefaultTheme());

  function getDefaultTheme() {
    return theme === "light" ? defaultTheme : darkTheme;
  }

  function mergeThemeOptions(size) {
    setThemeOptions({
      ...themeOptions,
      dante_editor_font_size: size || "1rem",
    });
  }

  function toggleTheme(t) {
    setThemeOptions(t === "light" ? defaultTheme : darkTheme);
  }

  React.useEffect(() => {
    toggleTheme(theme);
  }, [theme]);

  function optionalPlugins() {
    return [
      ImageBlockConfig(),
      CodeBlockConfig(),
      DividerBlockConfig(),
      PlaceholderBlockConfig(),
      EmbedBlockConfig(),
      VideoBlockConfig(),
      GiphyBlockConfig(),
      VideoRecorderBlockConfig(),
      SpeechToTextBlockConfig(),
    ];
  }

  return (
    <ThemeProvider theme={themeOptions}>
      <EditorContainer
      //style={{width: '600px', margin: '0 auto'}}
      >
        {/* editor && (
          <div className="pt-2 pl-2">

            <Button
              onClick={() => {
                console.log( JSON.stringify(editor.getJSON()) )
                //setLog(JSON.parse(JSON.stringify(editor.getJSON())));
              }}
            >
              load json
            </Button>

            <Button onClick={()=>{ 
              console.log(editor.getHTML()) }
            }>
              load html
            </Button>

            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              theme {theme}
            </Button>

            <Button
              onClick={() => setFixed(!fixed)}
            >
              fixed {fixed ? 'Y' : 'N'}
            </Button>

            <Button onClick={() => mergeThemeOptions("1rem")}>1x</Button>

            <Button onClick={() => mergeThemeOptions("1.4rem")}>2x</Button>

            <Button onClick={() => mergeThemeOptions("1.8rem")}>3x</Button>

            {editor && (
              <Button
                onClick={() => {
                  editor.setEditable(!editor.isEditable);
                }}
              >
                editable {editor.isEditable ? "yes" : "no"}
              </Button>
              )} 

          </div>
        )}
      */}

        <DanteEditor
          appendPlugins={optionalPlugins}
          theme={themeOptions}
          fixed={fixed}
          content={jsonContent}
        />
      </EditorContainer>
    </ThemeProvider>
  );
}

function Button({ children, ...props }) {
  return (
    <button
      className="mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      {...props}
    >
      {children}
    </button>
  );
}
