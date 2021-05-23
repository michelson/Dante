import React from "react"
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import styled from '@emotion/styled'

const StartButton = styled.a`
    border-radius: 50%;
    background-color: #ff5e5e;
    width: 50px;
    height: 50px;
    display: block;
    margin: 0 auto;
    cursor: pointer;
    text-align: center;
    box-shadow: ${props => props.recording ? 'inset -1px 1px 0px 0px #270101' : 'inset 0px -1px 0px 0px #270101'};
    svg{
      margin-top: 12px;
      fill: white;
      display: inline;
      vertical-align: unset !important;
      &:hover{
        fill: #222;
      }
    }
`
const RecorderWrapper = styled.div`
  margin: 0px auto;
  text-align: center;
` 
const RecorderLegend = styled.span`
  color: #797878;
  font-size: 0.789em;
  text-transform: uppercase;
  font-family: futura-pt;
`
const SpeechRecorderWrapper = styled(NodeViewWrapper)`
  background: #ccc;
  padding: 20px;
  background: #fdffd4;
  padding: 21px;
  border: 1px solid #f0f1d9;
  position: relative;
`
const DeleteSelf = styled.button`
  position: absolute;
  right: 10px;
  top: 1px;
`
const icon = ()=>{
  return <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
            <path fill="#00000070" d='M9.5 14c-1.93 0-3.5-1.57-3.5-3.5v-6c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5v6c0 1.93-1.57 3.5-3.5 3.5zM9.5 2c-1.378 0-2.5 1.122-2.5 2.5v6c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5v-6c0-1.378-1.122-2.5-2.5-2.5z'
            />
            <path fill="#00000070" d='M16 10.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5c0 3.033-2.467 5.5-5.5 5.5s-5.5-2.467-5.5-5.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5c0 3.416 2.649 6.225 6 6.481v2.019h-1.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h4c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-1.5v-2.019c3.351-0.256 6-3.065 6-6.481z'
            />
         </svg>
}

export default class SpeechToTextBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: "",
      transcript: [],
      recording: false
    }
  }

  componentDidMount(){
    if (!('webkitSpeechRecognition' in window)) {
      alert("no speech recognition")
    } else {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onstart = (event)=> { 
        this.setState({
          recording: true
        })
      }

      this.recognition.onresult = (event)=> { 
        let res = []
        for (var i = 0; i < event.results.length; ++i) {
          res.push(event.results[i][0].transcript)
        }
        this.setState({
          transcript: res
        })
      }

      this.recognition.onerror = (event)=> { console.log(event) }
      this.recognition.onend = ()=> { 
         this.setState({
          recording: false
        })
      }
    }
  }

  deleteSelf = (e)=>{
    e.preventDefault()
    this.recognition.stop()
    this.props.deleteNode()
  }

  startButton = (e)=>{
    e.preventDefault()
    if(this.state.recording){
      this.recognition.stop()
    } else{
      this.recognition.start()
    }
  }

  resetRecorder = (e)=>{
    e.preventDefault()
    this.recognition.stop()
    this.setState({
      transcript: []
    })
  }

  convert = (e)=>{
    e.preventDefault()
    this.recognition.stop()

    this.props.editor
      .chain()
      .focus()
      .toggleNode("paragraph", "paragraph", {})
      .insertContent(this.state.transcript.map((o)=>o).join(" "))
      .run();
  }

  deleteSelf =()=> {
    this.props.deleteNode()
  }

  render(){
    return <SpeechRecorderWrapper>
            {
              this.props.editor.isEditable ? 
              <DeleteSelf href="#" 
                className={"graf--media-embed-close"}
                onClick={this.deleteSelf}>
                x
              </DeleteSelf> : null
            }

            <RecorderWrapper>
              <StartButton id="start_button" 
                      className={`${this.state.recording ? 'recordingButton' : ''}`}
                      recording={this.state.recording}
                      onClick={(e)=>{this.startButton(e)}}>
                {icon()}
              </StartButton>

              <RecorderLegend>
                {
                  this.state.recording ? 
                  "stop dictation" :
                  "start dictation"
                }
              </RecorderLegend>

              {
                this.state.transcript.length > 0 &&
                <div className="d-flex justify-content-center">

                  <button 
                    onClick={this.convert} 
                    className="btn btn-success mr-1">
                    confirm
                  </button>

                  <button
                    alt={'reset'} 
                    onClick={this.resetRecorder} 
                    className="btn btn-link">
                    or cancel
                  </button>
                </div>
              }
            </RecorderWrapper>

            <NodeViewContent>
              {this.state.transcript.map((o)=>o)}
            </NodeViewContent>
          </SpeechRecorderWrapper>
  }
}

export const SpeechToTextBlockConfig = (options={})=>{
  let config = {
    icon: icon,
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
  }
  
  return Object.assign(config, options)
}