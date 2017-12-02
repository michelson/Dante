
import React from 'react'
import ReactDOM from 'react-dom'

import {Editor, 
  EditorState,   
  EditorBlock, 
} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleReturn = this.handleReturn.bind(this)
  }

  // TODO: set content as state on the parent
  handleReturn(e){
    return true
  }

  render() {
    return (
        <figcaption className='imageCaption'>
          <EditorBlock 
          editorState={this.state.editorState} 
          placeholder={this.props.placeholder || "nata nata"}
          onChange={this.onChange}
          readOnly={true}
          handleReturn={this.handleReturn} />  
        </figcaption>

    );
  }
}

          /*
          <Editor 
          editorState={this.state.editorState} 
          placeholder={this.props.placeholder || "nata nata"}
          onChange={this.onChange}
          readOnly={true}
          handleReturn={this.handleReturn} />
          */


//import { Entity, RichUtils, AtomicBlockUtils, EditorBlock } from 'draft-js'

export default class CardBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enabled: false,
      data: this.props.blockProps.data.toJS()
    }
  }

  componentDidMount() {
    //this.props.blockProps.toggleEditable()
  }


  // onMouseOver={this.props.blockProps.disableEditable}
  // onMouseOut={this.props.blockProps.enableEditable}

  render() {
    return (
      <span >
        <span className="signature">
          
          <img src="http://via.placeholder.com/100x100"/>
          
          <div className="text">

          <input type="text" 
            placeholder="Caption" 
            class="block__input"
          />

          <input type="text" 
            placeholder="Caption" 
            class="block__input"
          />

          <input type="text" 
            placeholder="Caption" 
            class="block__input"
          />

          </div>

        </span>
        <span className="dante-clearfix"/>
      </span>
    )
  }
}