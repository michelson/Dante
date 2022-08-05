import React, { useEffect, useState } from "react";

//import './styles.scss'
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "./styled/themes/default";
import darkTheme from "./styled/themes/dark";

import { ImageBlockConfig } from "./blocks/image";
import { VideoRecorderBlockConfig } from "./blocks/videoRecorder";
import { CodeBlockConfig } from "./blocks/code";
import { PlaceholderBlockConfig } from "./blocks/placeholder";
import { DividerBlockConfig } from "./blocks/divider";
import { GiphyBlockConfig } from "./blocks/giphy/giphyBlock";
import { EmbedBlockConfig } from "./blocks/embed";
import { VideoBlockConfig } from "./blocks/video";

import defaultContent, { jsonContent } from "./data/content";

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
