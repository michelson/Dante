
React = require('react')
ReactDOM = require('react-dom')

{
  Entity,
  RichUtils
  AtomicBlockUtils
  EditorBlock
} = require('draft-js')

{ updateDataOfBlock } = require('../../model/index.js.es6')

axios = require("axios")

class VideoBlock extends React.Component
  constructor: (props) ->
    super props
    #api_key = "86c28a410a104c8bb58848733c82f840"
    
    @state = 
      embed_data: @defaultData()

  defaultData: ->
    existing_data = @.props.block.getData().toJS()
    existing_data.embed_data || {}

  # will update block state
  updateData: =>
    blockProps = @.props.blockProps
    block = @.props.block
    getEditorState = @props.blockProps.getEditorState
    setEditorState = @props.blockProps.setEditorState
    data = block.getData();
    newData = data.merge(@state)
    setEditorState(updateDataOfBlock(getEditorState(), block, newData))

  dataForUpdate: =>
    @.props.blockProps.data.toJS()

  componentDidMount: ->
    return unless @.props.blockProps.data
    # ensure data isnt already loaded
    return unless @dataForUpdate().endpoint or @dataForUpdate().provisory_text
    
    axios
      method: 'get'
      url: "#{@.dataForUpdate().endpoint}#{@.dataForUpdate().provisory_text}&scheme=https"
    .then (result)=>
      @setState
        embed_data: result.data #JSON.parse(data.responseText)
      , @updateData    
    .catch (error)=>
      console.log("TODO: error")

  classForImage: ->
    if @state.embed_data.thumbnail_url then "" else "mixtapeImage--empty u-ignoreBlock"

  render: ->
    return(
      <figure
        className='graf--figure graf--iframe graf--first' tabIndex='0'>
        <div className='iframeContainer' dangerouslySetInnerHTML={__html: @state.embed_data.html}>
        </div>
        <figcaption
          className='imageCaption'>
            <EditorBlock {...@props} 
              className="imageCaption"
              placeholder="escrive alalal"
            />
        </figcaption>
      </figure>
    )

module.exports = VideoBlock