import React from 'react'

class Debug extends React.Component {

  constructor() {
    super()
    this.state = {
      output: "",
      display: "none"
    }
  }

  handleToggleReadOnly = (e)=> {
    e.preventDefault()
    this.props.editor.toggleEditable()
    return false
  }

  handleTestEmitAndDecode = (e)=> {
    e.preventDefault()
    return this.testEmitAndDecode()
  }

  handleTestEmitTEXT = (e)=> {
    e.preventDefault()
    return this.testEmitTEXT()
  }

  testEmitAndDecode = (e)=> {
    const raw_as_json = this.props.editor.emitSerializedOutput()
    this.props.editor.setState({ 
      editorState: this.props.editor.decodeEditorContent(raw_as_json) }, 
      this.logState(JSON.stringify(raw_as_json)))
    return false
  }

  testEmitTEXT =()=> {
    const text = this.props.editor.getTextFromEditor()
    return this.logState(text)
  }

  logState =(raw)=> {
    return this.setState({ output: raw }, this.open)
  }

  toggleDisplay = (e)=> {
    e.preventDefault()
    const d = this.state.display === "block" ? "none" : this.state.display
    return this.setState({
      display: d })
  }

  open =()=> {
    return this.setState({
      display: "block" })
  }

  render() {
    return (
      <div>
        <div className="debugControls">
          <ul>
            <li> LOCKS: { this.props.editor.state.locks } </li>
            <li>
              <button onClick={ this.handleToggleReadOnly }>
                EDITABLE: { this.props.editor.state.read_only ? 'NO' : 'YES' }
              </button>
            </li>
            <li>
              <button onClick={ this.handleTestEmitTEXT }>
              EDITOR TEXT
              </button>
            </li>
            <li>
              <button 
                onClick={ this.handleTestEmitAndDecode }>
                EDITOR STATE
              </button>
            </li>
          </ul>
        </div>
        <div className="debugZone" style={ { display: this.state.display } }>
          <button href="#" className="dante-debug-close close" 
          onClick={ this.toggleDisplay } 
          />
          <div className="debugOutput">
            <h2>EDITOR OUTPUT</h2>
            {
              this.state.output.length > 0
              ? <pre>{ this.state.output }</pre>
              : undefined
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Debug

