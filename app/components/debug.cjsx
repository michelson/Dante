React = require('react')

class Debug extends React.Component

  render: =>
    return (

      <div>
        <hr/> 
        <ul>
          <li>LOCKS: {@props.locks}</li>
          <li>
            <a href="#" onClick={@props.toggleReadOnly}>
              READ ONLY: {if @props.read_only then 'YES' else 'NO'}
            </a>
          </li>
          <li>
            <a href="#" onClick={@props.testEmitTEXT}>
              get Text From Editor
            </a>
          </li>
          
          <li>
            <a href="#" onClick={@props.testEmitAndDecode}>
              serialize and set content
            </a>
          </li>

          <div style={{float: 'left', width:'40%', marginRight: '10px'}}>
            <h3>JSON</h3>
            <pre>
              {JSON.stringify(@.props.debug_json)}
            </pre>
          </div>

          <div style={{float: 'left', width:'50%'}}>
            <h3>TEXT</h3>
            <pre>
              {@.props.debug_text}
            </pre>
          </div>
        </ul>
      </div>

    )


module.exports = Debug