import React, { Component } from 'react';
import {
  EditorBlock 
} from 'draft-js'
import ReactMediaRecorder from './MediaRecorder'
import styled from 'react-emotion'
import icon from "./icon.js"
import { updateDataOfBlock, addNewBlockAt } from '../../../model/index.js'
import axios from 'axios'

const VideoContainer = styled('div')`
  background: #ffffff;
  padding: 0px;
  margin-bottom: 10px;
  border: 1px solid rgba(0,0,0,0.09);
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border-radius: 3px;
  position:relative
`

const VideoBody = styled('div')`
  padding: 20px;
`

const green  = '#00ab6b'
const red    = '#e61742'
const green2 = '#52e617'
const gray   = '#bbbbbb'

const RecordActivity = styled('div')`
  background: ${props =>
    props.active ? red : green
  };

  height: 13px;
  width: 13px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 58px;
  right: 25px;
  box-shadow: inset -1px -2px 14px 0px #841744;

`

const EditorControls = styled('div')`
  height: 25px;
  width: 100%;
  display: inline-block;
  padding-left: 11px;
`

const StatusBar = styled('div')`
  width: 100%;
  padding-top: 4px;
  color: #bbb7b7;
  background: #ffffff;
  padding-bottom: 4px;
  line-height: 2px;
  box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.07);
  font-size: 0.8em;
  border-bottom: 1px solid #e0e0e0;
`

const VideoPlayer = styled('video')`
  width: 100%;
  background: black;
`

const Button = styled('button')`
  outline:none;
  height: 24px;
  //min-width: 70px;
  margin-right: 10px;
  text-align: center;
  border-radius:40px;
  background: #fff;
  border: 2px solid ${green};
  color:${green};
  letter-spacing:1px;
  text-shadow:0;
  font:{
    size:12px;
    weight:bold;
  }
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    color:white;
    background: ${green};
  }
  &:active {
    //letter-spacing: 2px;
    letter-spacing: 2px ;
  }
  //&:after {
  //  content:"SUBMIT";
  //}

  &.onclic {
    width: 24px !important;
    border-color:${gray};
    border-width:3px;
    font-size:0;
    border-left-color:${green};
    animation: rotating 2s 0.25s linear infinite;

    &:after {
      content:"";
    }
    &:hover {
      color:$green;
      background: white;
    }
  }

  &.right{
    float: right;
    margin-right: 26px;
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }


`



class VideoRecorderBlock extends React.Component {
  constructor(props) {
    super(props);
    this.file = this.props.blockProps.data.get('file')
    this.config = this.props.blockProps.config
    let existing_data = this.props.block.getData().toJS()

    this.state = {
      caption: this.defaultPlaceholder(),
      direction: existing_data.direction || "center",
      granted: false,
      rejectedReason: '',
      recording: false,
      paused: false,
      fileReady: false,
      url: this.props.block.data.get('url')
    };

    this.video = null

    this.stopTimeout = null

    this.handleGranted = this.handleGranted.bind(this);
    this.handleDenied = this.handleDenied.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.setStreamToVideo = this.setStreamToVideo.bind(this);
    this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this);
    this.downloadVideo = this.downloadVideo.bind(this);

  }

  componentDidMount(){
    this.video = this.refs.app.querySelector('video');
    if(this.state.url){
      this.setUrlToVideo(this.state.url)
      this.playMode()
    }
  }

  // will update block state
  updateData = (options)=> {
    let { blockProps, block } = this.props
    let { getEditorState } = blockProps
    let { setEditorState } = blockProps
    let data = block.getData()
    let newData = data.merge(this.state).merge(options)
    return setEditorState(updateDataOfBlock(getEditorState(), block, newData))
  }

  handleGranted() {
    this.setState({ granted: true });
    console.log('Permission Granted!');
  }

  handleDenied(err) {
    this.setState({ rejectedReason: err.name });
    console.log('Permission Denied!', err);
  }

  handleStart(stream, context) {

    this.setState({
      recording: true,
      fileReady: false
    });

    this.setStreamToVideo(stream);
    console.log('Recording Started.');

    // max seconds to record video 
    if(!context.config.seconds_to_record) return
    this.stopTimeout = setTimeout(()=>{
      context.refs.mediaRecorder.stop()
    }, context.config.seconds_to_record )
  }

  handleStop(blob) {

    if(this.stopTimeout){
      clearTimeout(this.stopTimeout)
    }

    this.setState({
      recording: false,
      fileReady: true
    });

    this.releaseStreamFromVideo();

    console.log('Recording Stopped.');
    this.file = blob
    this.setStreamToVideo(this.file);
    this.playMode()
  }

  confirm = ()=>{
    this.downloadVideo(this.file);
  }

  handlePause() {
    this.releaseStreamFromVideo();

    this.setState({
      paused: true
    });
  }

  handleResume(stream) {
    this.setStreamToVideo(stream);

    this.setState({
      paused: false
    });
  }

  handleError(err) {
    console.log(err);
  }

  recordMode = ()=>{
    this.video.loop = false
    this.video.controls = false
    this.video.muted = true
  }

  playMode = ()=>{
    this.video.loop = false
    this.video.controls = true
    this.video.muted = true
  }

  setStreamToVideo(stream) {

    let video = this.refs.app.querySelector('video');
    this.recordMode(video)

    if(window.URL) {
      video.src = window.URL.createObjectURL(stream);
    }
    else {
      video.src = stream;
    }
  }

  setUrlToVideo = (url)=>{
    this.playMode()
    this.video.src = url
  }

  releaseStreamFromVideo() {
    this.video.src = '';
  }

  downloadVideo(blob) {
    //video.loop = true
    this.setStreamToVideo(blob)
    this.playMode()
    this.uploadFile(blob)
  }


  /* DANTE UPLOAD FUNCTIONS */

  formatData = ()=> {
    let formData = new FormData()
    
    if (this.file) {
      let formName = this.config.upload_formName || 'file'

      formData.append(formName, this.file)
      return formData
    } else {
      //formData.append('url', this.props.blockProps.data.get("url"))
      formData.append('url', this.state.url)
      return formData
    }
  }

  getUploadUrl = ()=> {
    let url = this.config.upload_url
    if (typeof url === "function") {
      return url()
    } else {
      return url
    }
  }

  getUploadHeaders()  {
   return this.config.upload_headers || {}
  }

  stopLoader = ()=> {
    return this.setState({
      loading: false 
    })
  }

  uploadFile = (blob)=> {

    this.file = blob

    // custom upload handler
    if (this.config.upload_handler) {
      return this.config.upload_handler(this.state.url, this)
    }
    
    if (!this.config.upload_url){
      this.stopLoader()
      return
    }
    
    axios({
      method: 'post',
      url: this.getUploadUrl(),
      headers: this.getUploadHeaders(),
      data: this.formatData(),
      onUploadProgress: e => {
        return this.updateProgressBar(e)
      }
    }).then(result => {
      this.uploadCompleted(result.data.url)

      if (this.config.upload_callback) {
        return this.config.upload_callback(result, this)
      }
    }).catch(error => {
      this.uploadFailed()

      console.log(`ERROR: got error uploading file ${ error }`)
      if (this.config.upload_error_callback) {
        return this.config.upload_error_callback(error, this)
      }
    })

    return json_response => {
      return this.uploadCompleted(json_response.url)
    }
  }

  uploadFailed = ()=> {
    this.props.blockProps.removeLock()
    this.stopLoader()
  }

  uploadCompleted(url) {
    this.setState({ url }, this.updateData)
    this.props.blockProps.removeLock()
    this.stopLoader()
    this.file = null
    this.setUrlToVideo(url)
  }

  updateProgressBar(e) {
    let complete = this.state.loading_progress
    if (e.lengthComputable) {
      complete = e.loaded / e.total * 100
      complete = complete != null ? complete : { complete: 0 }
      this.setState({
        loading_progress: complete })
      return console.log(`complete: ${ complete }`)
    }
  }

  isReadOnly = ()=>{
    return this.props.blockProps.getEditor().props.read_only
  }

  placeHolderEnabled = ()=> {
    return this.state.enabled || this.props.block.getText()
  }

  placeholderText = ()=> {
    return this.config.image_caption_placeholder || 'caption here (optional)'
  }

  defaultPlaceholder = ()=> {
    return this.props.blockProps.config.image_caption_placeholder
  }

  render() {

    const granted = this.state.granted;
    const rejectedReason = this.state.rejectedReason;
    const recording = this.state.recording;
    const paused = this.state.paused;
    return (

      <div ref="app">
        <Loader toggle={this.state.loading} 
          progress={this.state.loading_progress} 
        />
        <VideoContainer>
      
          <ReactMediaRecorder ref="mediaRecorder"
            constraints={
              { 
                audio: {
                        "sampleSize": 16,
                        "channelCount": 2,
                        "echoCancellation": true,
                        "noiseSuppression": false
                        },
                video: true 
              }
           }
            timeSlice={10}
            onGranted={this.handleGranted}
            onDenied={this.handleDenied}
            onStart={(stream)=> this.handleStart(stream, this)}
            onStop={this.handleStop}
            onPause={this.handlePause}
            onResume={this.handleResume}
            onError={this.handleError} 
            render={({ start, stop, pause, resume }) => 
            <div>

              {
                !this.isReadOnly() ?

                  <StatusBar>
                    {
                      /*

                        <p>
                        { 
                        
                          granted ? "Permission granted" : "Permission needed"
                        
                        }
                        </p>

                        { 
                          rejectedReason ? 
                          <p>Rejected Reason: {rejectedReason}</p> : null
                         
                        }

                      */
                    }

                    <EditorControls>

                        <Button 
                          onClick={(e)=>{
                              e.preventDefault()
                              start()
                            }
                          }
                          disabled={this.state.recording}
                          className={this.state.recording ? 'onclic' : ''}
                          >
                          REC
                        </Button>   


                        {
                          this.state.recording ? 

                          <Button onClick={(e)=>{
                              e.preventDefault()
                              stop()
                            }
                          }
                          ref="stopBtn" className="right">
                            STOP REC
                          </Button>  : null
                        } 
                   

                      {
                        /*
                        <button onClick={pause}>Pause</button>
                        <button onClick={resume}>Resume</button>
                        */
                      }

                      {
                        this.state.fileReady ?
                          <Button className="right"
                            onClick={(e)=>{
                              e.preventDefault()
                              this.confirm()
                            }}>
                            Save
                          </Button> : null
                      }
                      

                      {
                        this.state.recording ? 

                          <RecordActivity 
                            granted={granted} 
                            active={recording} 
                          /> : null 
                      }

                    </EditorControls>
                  
                  </StatusBar> : null
              }

              <VideoBody>

                <VideoPlayer autoPlay muted/>

                <figcaption className='imageCaption' onMouseDown={this.handleFocus}>
                  { this.props.block.getText().length === 0 ? 
                    <span className="danteDefaultPlaceholder">
                      {this.placeholderText()}
                    </span> : undefined}
                  <EditorBlock {...Object.assign({}, this.props, { 
                    "editable": true, "className": "imageCaption" })
                    } />
                </figcaption>

              </VideoBody>

            </div>
          } />

        </VideoContainer>

      </div>
    );
  }
}

class Loader extends React.Component {

  render = ()=> {
    return (
      <div>
        { this.props.toggle
          ? <div className="image-upoader-loader">
              <p>
                { this.props.progress === 100
                  ? "processing image..."
                  : <span>
                      <span>loading</span> 
                      { 
                        Math.round( this.props.progress ) 
                      }
                    </span>
                }
              </p>
            </div>
          : undefined
        }
      </div>
    )
  }
}


export const VideoRecorderBlockConfig = (options={})=>{
  let config =  {
    title: 'record a video',
    type: 'recorded-video',
    icon: icon,
    block: VideoRecorderBlock,
    editable: true,
    renderable: true,
    breakOnContinuous: true,
    wrapper_class: "graf graf--video",
    selected_class: "is-selected",
    selectedFn: block => {},
    /*handleEnterWithoutText(ctx, block) {
      const { editorState } = ctx.state
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    },
    handleEnterWithText(ctx, block) {
      const { editorState } = ctx.state
      return ctx.onChange(RichUtils.insertSoftNewline(editorState))
      //return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    },*/
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "image"
    },
    options: {
      seconds_to_record: 10000
    }
  
  }
    
  return Object.assign(config, options)
} 

export default VideoRecorderBlock;


