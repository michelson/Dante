import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import styled from "@emotion/styled";
import { speech } from "../icons";

const StartButton = styled.a`
  border-radius: 50%;
  background-color: #ff5e5e;
  width: 50px;
  height: 50px;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  text-align: center;
  box-shadow: ${(props) =>
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
  top: 1px;
`;
export default class SpeechToTextBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      transcript: [],
      recording: false,
    };
  }

  componentDidMount() {
    if (!("webkitSpeechRecognition" in window)) {
      alert("no speech recognition");
    } else {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onstart = (event) => {
        this.setState({
          recording: true,
        });
      };

      this.recognition.onresult = (event) => {
        let res = [];
        for (var i = 0; i < event.results.length; ++i) {
          res.push(event.results[i][0].transcript);
        }
        this.setState({
          transcript: res,
        });
      };

      this.recognition.onerror = (event) => {
        console.log(event);
      };
      this.recognition.onend = () => {
        this.setState({
          recording: false,
        });
      };
    }
  }

  deleteSelf = (e) => {
    e.preventDefault();
    this.recognition.stop();
    this.props.deleteNode();
  };

  startButton = (e) => {
    e.preventDefault();
    if (this.state.recording) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  };

  resetRecorder = (e) => {
    e.preventDefault();
    this.recognition.stop();
    this.setState({
      transcript: [],
    });
  };

  convert = (e) => {
    e.preventDefault();
    this.recognition.stop();

    this.props.editor
      .chain()
      .focus()
      .toggleNode("paragraph", "paragraph", {})
      .insertContent(this.state.transcript.map((o) => o).join(" "))
      .run();
  };

  deleteSelf = () => {
    this.props.deleteNode();
  };

  render() {
    return (
      <SpeechRecorderWrapper>
        {this.props.editor.isEditable ? (
          <DeleteSelf
            href="#"
            className={"graf--media-embed-close"}
            onClick={this.deleteSelf}
          >
            x
          </DeleteSelf>
        ) : null}

        <RecorderWrapper>
          <StartButton
            id="start_button"
            className={`${this.state.recording ? "recordingButton" : ""}`}
            recording={this.state.recording}
            onClick={(e) => {
              this.startButton(e);
            }}
          >
            {speech()}
          </StartButton>

          <RecorderLegend>
            {this.state.recording ? "stop dictation" : "start dictation"}
          </RecorderLegend>

          {this.state.transcript.length > 0 && (
            <div className="d-flex justify-content-center">
              <button onClick={this.convert} className="btn btn-success mr-1">
                confirm
              </button>

              <button
                alt={"reset"}
                onClick={this.resetRecorder}
                className="btn btn-link"
              >
                or cancel
              </button>
            </div>
          )}
        </RecorderWrapper>

        <NodeViewContent>{this.state.transcript.map((o) => o)}</NodeViewContent>
      </SpeechRecorderWrapper>
    );
  }
}

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
