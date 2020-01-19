import Dante from '../editor/components/Dante/Dante.js'
import {Lorem, h1} from '../site/data/poc.js'

import React from 'react'

export default class EditorContent extends React.Component {

  state = {
    content: Lorem
  }

  render(){
    return (
      <div>
        <Dante 
          content={this.state.content}
        />

        <button onClick={()=> this.setState({content: h1}) }>
          load other content
        </button>
      </div>
    )
  }
}

