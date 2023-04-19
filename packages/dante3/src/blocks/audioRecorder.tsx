import React, { useState } from 'react';
import { CheckIcon, DeleteIcon, MicIcon } from '../icons';
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import styled from "@emotion/styled";
import { getUrl } from "./blockUtils";

export const StyleWrapper = styled(NodeViewWrapper)``;


export default function AudioRecorderBlock(props: any) {
  
  //const { blockProps, block } = props;
  const [stored, setStored] = useState(props.node.attrs.stored);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(props.node.attrs.url);
  const [loading_progress, setLoadingProgress] = useState(0);

  const stream = React.useRef(null);
  const mediaRecorder = React.useRef<any>(null);
  const audioElement = React.useRef(null);

  const config = props.config;

  //const audioUrl = props.node.attrs.url
  //let file = blockProps.data.get('file');

  let file = props.node.attrs.file //|| props.node.attrs.src;

  const [count, setCount] = useState(0);

  const countTotal = 120;

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (count !== 0) setCount(count - 1);
      if (count === 0) stopRecording();
    }, 1000);

    return () => interval && clearInterval(interval);
  }, [count]);

  React.useEffect(() => {
    if(props.node.attrs?.url) setAudioUrl(props.node.attrs.url)
  }, [props?.node?.attrs?.url]);

  function setAudioUrl222(url: any) {
    props.updateAttributes({
      audioUrl: url,
    });
  }


  const startRecording = () => {
    setStored(false);
    setAudioUrl(false);
  
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((userStream: any) => {
        stream.current = userStream;
        if(!mediaRecorder.current) return 
        if(!stream.current) return
        mediaRecorder.current = new MediaRecorder(stream.current);
        const chunks : any = [];
  
        mediaRecorder.current.start();
  
        mediaRecorder.current.addEventListener('dataavailable', (event: any) => {
          chunks.push(event.data);
        });
  
        mediaRecorder.current.addEventListener('stop', () => {
          const audioBlob = new Blob(chunks, { type: 'audio/mp4' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
        });
  
        setRecording(true);
        setCount(countTotal);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const stopRecording = () => {
    if (!mediaRecorder?.current) return;
    if (mediaRecorder?.current.state === 'inactive') return;
    mediaRecorder.current.stop();
    // @ts-ignore
    stream?.current?.getTracks()?.forEach((track) => track.stop()); // stop each of them
    stream.current = null;
    setRecording(false);
    setCount(0);
  };

  function uploadRecording(e: any) {
    uploadFile(audioUrl);
  }

  function cancelRecording() {
    setAudioUrl(null);
    setRecording(false);
    setCount(0);
  }

  /** upload functions */

  // will update block state
  const updateData = (options?: any) => {
    //const { getEditorState } = blockProps;
    //const { setEditorState } = blockProps;
    //const data = block.getData();
    const state = {
      url: audioUrl,
      stored: true,
    };
    //const newData = data.merge(state).merge(options);
    //return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
  };

  function stopLoader() {
    /*return this.setState({
      loading: false,
      fileReady: false,
    });*/
  }

  const uploadFile = async (blob: any) => {
    file = await fetch(blob).then((r) => r.blob());

    if(!file.name) file.name = "audio"

    const construct = {
      uploadCompleted: uploadCompleted,
      file: file,
      props: props,
      stored: true,
    };

    setStored(true);

    // custom upload handler
    if (props.extension.options.upload_handler) {
      return props.extension.options.upload_handler(
        file,
        props
      );
    }

    if (!props.extension.options.upload_url) {
      stopLoader();
      return;
    }
  };

  function uploadFailed() {
    // props.blockProps.removeLock();
    stopLoader();
  }

  function uploadCompleted(url: any, cb: any) {
    setAudioUrl(url);
    updateData({ url: url });
    // blockProps.removeLock();
    stopLoader();
    file = null;
    setUrlToAudio(url);
    cb && cb();
  }

  function updateProgressBar(e: any) {
    let complete = loading_progress as any;
    if (e.lengthComputable) {
      complete = (e.loaded / e.total) * 100;
      complete = complete != null ? complete : { complete: 0 };
      setLoadingProgress(complete);
      return console.log(`complete: ${complete}`);
    }
  }

  function setUrlToAudio(url: any) {
    //this.playMode();

    // @ts-ignore
    audioElement.current.src = url;
  }

  console.log(props.node.attrs)

  return (
    <StyleWrapper
      selected={props.selected}
      as="figure"
      data-drag-handle="true"
    >
      <div
        className="flex space-x-2 bg-white dark:bg-gray-800 justify-center items-center"
        contentEditable={false}
      >

        {!audioUrl && (
          <span className="flex justify-center items-center space-x-2">
            <button
              onClick={!recording ? startRecording : stopRecording}
              //disabled={recording}
              className={`flex justify-center items-center p-2 rounded-sm ${
                recording
                  ? 'bg-red-300 text-red-500'
                  : 'bg-gray-300 text-gray-800'
              } `}
            >
              <MicIcon />
              {!recording && <span> Start Recording </span>}
              {recording && <span> Stop Recording </span>}
            </button>

            {count != 0 && (
              <span>Recording will finish in {count} seconds</span>
            )}

          </span>
        )}

        {audioUrl && stored && (
          <span className="p-2 text-sm flex justify-center items-center space-x-2 text-green-500">
            <CheckIcon />
            <span>Audio Ready</span>
          </span>
        )}

        {audioUrl && !stored && (
          <button
            className="flex justify-center items-center space-x-2 p-2 rounded-sm bg-green-300 text-green-800"
            onClick={uploadRecording}
          >
            <CheckIcon />
            <span>Confirm</span>
          </button>
        )}

        {audioUrl && !stored && (
          <button
            className="flex justify-center items-center p-2 rounded-sm text-red-600"
            onClick={cancelRecording}
          >
            <DeleteIcon />
            <span>Cancel</span>
          </button>
        )}

        {audioUrl && <audio src={audioUrl} controls ref={audioElement} />}
      </div>
    </StyleWrapper>
  );
};

export const AudioRecorderBlockConfig = (options = {}) => {
  let config = {
    icon: MicIcon,
    name: "AudioRecorderBlock",
    tag: "audio-recorder",
    component: AudioRecorderBlock,
    atom: false,
    draggable: true,
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: 'insertion',
      insert_block: 'audio-recorder',
    },
    options: {
      seconds_to_record: 120,
      upload_handler: (file: any, ctx: any) => {
        console.log("UPLOADED FILE", file)
      },
    },
    attributes: {
      url: { default: null }
    },
  };

  return Object.assign(config, options);
};


export function AudioRecorderRenderer({ blockKey, data, domain }: { blockKey: any, data: any, domain?: any }) {

  const { url, caption } = data;

  return (
    <figure key={blockKey} className={`graf graf--figure`}>
      <div>
        <div>
          {url && <audio src={getUrl(url, domain)} controls />}
        </div>
      </div>

      {caption && caption !== 'type a caption (optional)' && (
        <figcaption className="imageCaption">
          <span>
            <span data-text="true">{caption}</span>
          </span>
        </figcaption>
      )}
    </figure>
  );
}
