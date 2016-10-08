
React = require('react')
ReactDOM = require('react-dom')

{
  Entity,
  RichUtils
  AtomicBlockUtils
  EditorBlock
} = require('draft-js')

utils = require("../../utils/utils")


class PlaceholderBlock extends React.Component
  constructor: (props) ->
    super props
    @state =
      enabled: false

  placeholderText: =>
    return "" if @state.enabled
    if @.props.blockProps.data then @.props.blockProps.data.placeholder else @defaultText()

  defaultText: =>
    "write something "

  componentDidMount: ->

  handleFocus: (e)=>
    console.log "focus on placeholder"
    setTimeout =>
      @setState
        enabled: true
    , 0

  classForDefault: =>
    if !@state.enabled then "defaultValue defaultValue--root" else ""
  render: ->
    return(
      <span className={@classForDefault()}
        onMouseDown={@handleFocus}>
        
        {@placeholderText()}

        <EditorBlock {...@props} 
          className="imageCaption"
          placeholder="escrive alalal"
        />
      </span>
    )

module.exports = PlaceholderBlock