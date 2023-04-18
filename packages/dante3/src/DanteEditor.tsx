import React, { useEffect, useState } from "react";

//import './styles.scss'
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "./styled/themes/default";

//import SaveBehavior from './data/save_content'
import EditorContainer, { LogWrapper } from "./styled/base";
import DanteEditor from "./editor";
// A new Y document
//const ydoc = new Y.Doc()
// Registered with a WebRTC provider
//const provider = new WebrtcProvider('example-document', ydoc)

export default function Editor(props: any) {
  const [log, setLog] = useState(null);
  const [fixed, setFixed] = useState(false);

  return (
    <ThemeProvider theme={props.theme || defaultTheme}>
      <EditorContainer>
        <DanteEditor
          //fixed={fixed}
          {...props}
        />
      </EditorContainer>
    </ThemeProvider>
  );
}
