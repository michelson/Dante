
React = require('react')
ReactDOM = require('react-dom')

{
  Entity,
  RichUtils
  AtomicBlockUtils
  EditorBlock
} = require('draft-js')

utils = require("../../utils/utils")

{ updateDataOfBlock } = require('../../model/index.js.es6')

class VideoBlock extends React.Component
  constructor: (props) ->
    super props
    api_key = "86c28a410a104c8bb58848733c82f840"
    
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

  componentDidMount: ->
    return unless @.props.blockProps.data
    utils.ajax
      url: "#{@.props.blockProps.data.embed_url}#{@.props.blockProps.data.provisory_text}&scheme=https"
      (data)=>
        if data.status is 200
          @setState
            embed_data: JSON.parse(data.responseText)   
          , @updateData 

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