React = require('react')

class Debug extends React.Component

  constructor: (options={})->
    @state = 
      output: ""
      display: "none"

  handleToggleReadOnly: (e)=>
    e.preventDefault()
    @props.editor.toggleEditable()
    return false

  handleTestEmitAndDecode: (e)=>
    e.preventDefault()
    @.testEmitAndDecode()

  handleTestEmitTEXT: (e)=>
    e.preventDefault()
    @.testEmitTEXT()

  testEmitAndDecode: (e)=>
    raw_as_json = @props.editor.emitSerializedOutput()
    @props.editor.setState
      editorState: @props.editor.decodeEditorContent(raw_as_json)
    , @logState(JSON.stringify(raw_as_json))
    false

  testEmitTEXT: ()=>
    text = @props.editor.getTextFromEditor()
    @logState(text)

  logState: (raw)=>
    @setState
      output: raw
    , @open

  toggleDisplay: (e)=>
    e.preventDefault()
    d = if @state.display is "block" then "none" else @state.display
    @setState
      display: d

  open: =>
    @setState
      display: "block"

  render: =>
    return (

      <div>
        <div className="debugControls">
          <ul>
            <li>LOCKS: {@props.editor.state.locks}</li>
            <li>
              <a href="#" onClick={@handleToggleReadOnly}>
                EDITABLE: {if @props.editor.state.read_only then 'NO' else 'YES'}
              </a>
            </li>
            <li>
              <a href="#" onClick={@handleTestEmitTEXT}>
                EDITOR TEXT
              </a>
            </li>
            
            <li>
              <a href="#" onClick={@handleTestEmitAndDecode}>
                EDITOR STATE
              </a>
            </li>

          </ul>
        </div>

        <div className="debugZone" style={display: @state.display}>
          <a href="#" 
            className="dante-debug-close close"
            onClick={@toggleDisplay}
          />

          <div className="debugOutput">
            <h2>EDITOR OUTPUT</h2>
            {
              if @state.output.length > 0
                <pre>
                  {@state.output}
                </pre>
            }
          </div>
        </div>
      </div>
    )


module.exports = Debug