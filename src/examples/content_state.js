import Dante from '../editor/components/Dante/Dante.js'
import {Lorem, h1} from '../site/data/poc.js'

import React, {useState} from 'react'


export default class Editor extends React.Component {

  state = {
    content: Lorem
  }


  saveHandler = (context)=>{

    const content = context.emitSerializedOutput()

    this.setState({
      content: content
    })
  }

  render(){
    return (

      <Dante 
        content={this.state.content}
        onChange={this.saveHandler}
        /*data_storage={
          {
            url: "/",
            save_handler: this.saveHandler
          }
        }*/
      />
    )
  }

  
}


import React, { Component } from 'react';
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import debounce from 'lodash/debounce';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  saveContent = debounce((content) => {
    fetch('/content', {
      method: 'POST',
      body: JSON.stringify({
        content: convertToRaw(content),
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
  }, 1000);

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({
      editorState,
    });
  }

  componentDidMount() {
    fetch('/content').then(val => val.json())
    .then(rawContent => {
      if (rawContent) {
        this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
      } else {
        this.setState({ editorState: EditorState.createEmpty() });
      }
    });
  }

  render() {
    if (!this.state.editorState) {
      return (
        <h3 className="loading">Loading...</h3>
      );
    }
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    );
  }
}


