import React, { useState, useEffect } from 'react';
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import styled from "@emotion/styled";
import { speech } from "../icons";


type StartButtonProps = {
  recording: boolean
}

const StartButton = styled.a<StartButtonProps>`
  border-radius: 50%;
  background-color: #ff5e5e;
  width: 50px;
  height: 50px;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  text-align: center;
  box-shadow: ${(props: any) =>
    props.recording
      ? "inset -1px 1px 0px 0px #270101"
      : "inset 0px -1px 0px 0px #270101"};
  svg {
    margin-top: 12px;
    fill: white;
    display: inline;
    vertical-align: unset !important;
    &:hover {
      fill: #222;
    }
  }
`;
const RecorderWrapper = styled.div`
  margin: 0px auto;
  text-align: center;
`;
const RecorderLegend = styled.span`
  color: #797878;
  font-size: 0.789em;
  text-transform: uppercase;
  font-family: futura-pt;
`;
const SpeechRecorderWrapper = styled(NodeViewWrapper)`
  background: #ccc;
  padding: 20px;
  background: #fdffd4;
  padding: 21px;
  border: 1px solid #f0f1d9;
  position: relative;
`;
const DeleteSelf = styled.button`
  position: absolute;
  right: 10px;
  top: 12px;
`;

const SpeechToTextBlock = ({editor, deleteNode} : {editor: any, deleteNode: any}) => {
  const [error, setError] = useState('');
  const [transcript, setTranscript] = useState([]);
  const [recording, setRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("webkitSpeechRecognition" in window)) {
      alert("no speech recognition");
    } else {

      const {webkitSpeechRecognition} = (window as any)
      const newRecognition = new webkitSpeechRecognition();

      newRecognition.continuous = true;
      newRecognition.interimResults = true;

      newRecognition.onstart = (event: any) => {
        setRecording(true);
      };

      newRecognition.onresult = (event: any) => {
        let res : any = [];
        for (let i = 0; i < event.results.length; ++i) {
          res.push(event.results[i][0].transcript);
        }
        setTranscript(res);
      };

      newRecognition.onerror = (event: any) => {
        console.log(event);
      };
      newRecognition.onend = () => {
        setRecording(false);
      };

      setRecognition(newRecognition);
    }
  }, []);

  const deleteSelf = (e: any) => {
    e.preventDefault();
    recognition && recognition.stop();
    deleteNode();
  };

  const startButton = (e: any) => {
    e.preventDefault();
    if (recording) {
      recognition && recognition.stop();
    } else {
      recognition.start();
    }
  };

  const resetRecorder = (e: any) => {
    e.preventDefault();
    recognition && recognition.stop();
    setTranscript([]);
  };

  const convert = (e: any) => {
    e.preventDefault();
    recognition && recognition.stop();

    editor
      .chain()
      .focus()
      .toggleNode('paragraph', 'paragraph', {})
      .insertContent(transcript.map((o) => o).join(' '))
      .run();
  };

  return (
    <SpeechRecorderWrapper>
      {editor.isEditable ? (
        <DeleteSelf
          type="button"
          className={"graf--media-embed-close"}
          onClick={deleteSelf}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </DeleteSelf>
      ) : null}

      <RecorderWrapper>
        <StartButton
          id="start_button"
          className={`${recording ? "recordingButton" : ""}`}
          recording={recording}
          onClick={(e) => {
            startButton(e);
          }}
        >
          {speech()}
        </StartButton>

        <RecorderLegend>
          {recording ? "stop dictation" : "start dictation"}
        </RecorderLegend>

        {transcript.length > 0 && (
          <div className="d-flex justify-content-center">
            <button onClick={convert} className="btn btn-success mr-1">
              confirm
            </button>

            <button
              type={"button"}
              onClick={resetRecorder}
              className="btn btn-link"
            >
              or cancel
            </button>
          </div>
        )}
      </RecorderWrapper>

      <NodeViewContent>{transcript.map((o) => o)}</NodeViewContent>
    </SpeechRecorderWrapper>
  );

};

export default SpeechToTextBlock;

export const SpeechToTextBlockConfig = (options = {}) => {
  let config = {
    icon: speech,
    name: "SpeechToText",
    tag: "speech-to-text",
    component: SpeechToTextBlock,
    atom: true,
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "SpeechToText",
    },
    options: {},
    attributes: {},
  };

  return Object.assign(config, options);
};
