React = require('react')
ReactDOM = require('react-dom')

{
  Entity,
  RichUtils
  AtomicBlockUtils
  EditorBlock

} = require('draft-js')

axios = require("axios")

{ updateDataOfBlock } = require('../../model/index.js.es6')


class ImageBlock extends React.Component

  constructor: (props) ->
    super props

    existing_data = @.props.block.getData().toJS()

    @config = @props.blockProps.config

    @state = 
      selected: false
      caption: @defaultPlaceholder()
      direction: existing_data.direction || "center"
      width: 0
      height: 0
      file: null
      url: @blockPropsSrc() || @defaultUrl(existing_data)
      aspect_ratio: @defaultAspectRatio(existing_data)

  blockPropsSrc: ()=>
    # console.log @.props.blockProps.data.src
    @.props.blockProps.data.src
    ###
    debugger
    block = @.props;
    entity = block.block.getEntityAt(0)
    if entity
      data = Entity.get(entity).getData().src
    else
      null
    ###

  defaultUrl: (data)=>
    if data.url
      if data.file then URL.createObjectURL(data.file) else data.url
    else
      @props.blockProps.data.src

  defaultPlaceholder: ->
    @props.blockProps.config.image_caption_placeholder

  defaultAspectRatio: (data)=>
    if data.aspect_ratio
      width: data.aspect_ratio['width']
      height: data.aspect_ratio['height']
      ratio: data.aspect_ratio['ratio'] 
    else
      width:  0
      height: 0
      ratio: 100

  getAspectRatio: (w, h)->
    maxWidth = 1000
    maxHeight = 1000
    ratio = 0
    width = w # Current image width
    height = h # Current image height

    # Check if the current width is larger than the max
    if width > maxWidth
      ratio = maxWidth / width # get ratio for scaling image
      height = height * ratio # Reset height to match scaled image
      width = width * ratio # Reset width to match scaled image

    # Check if current height is larger than max
    else if height > maxHeight
      ratio = maxHeight / height # get ratio for scaling image
      width = width * ratio # Reset width to match scaled image
      height = height * ratio # Reset height to match scaled image

    fill_ratio = height / width * 100
    result = { width: width, height: height, ratio: fill_ratio }
    utils.log result
    result

  # will update block state
  updateData: =>
    blockProps = @.props.blockProps
    block = @.props.block
    getEditorState = @props.blockProps.getEditorState
    setEditorState = @props.blockProps.setEditorState
    data = block.getData()
    newData = data.merge(@state)
    setEditorState(updateDataOfBlock(getEditorState(), block, newData))

  replaceImg: =>
    @img = new Image();
    @img.src = this.refs.image_tag.src
    @setState 
      url: @img.src
    self = @
    @img.onload = ()=>
      console.log @img
      console.log this
      console.log self
      console.log @
      @setState
        width: @img.width
        height: @img.height
        aspect_ratio: self.getAspectRatio(@img.width, @img.height)
      , @handleUpload

  handleUpload: =>
    @updateData()
    @uploadFile()

  componentDidMount: ->
    @replaceImg()

  aspectRatio: =>
    maxWidth: "#{@state.aspect_ratio.width}"
    maxHeight: "#{@state.aspect_ratio.height}"
    ratio: "#{@state.aspect_ratio.height}"

  handleGrafFigureSelectImg: (e)=>
    debugger
    e.preventDefault()
    #@props.blockProps.setCurrentComponent(@)
    @setState
      selected: true

    #main_editor.onChange(main_editor.state.editorState)

  coords: ->
    maxWidth: "#{@state.aspect_ratio.width}px"
    maxHeight: "#{@state.aspect_ratio.height}px"

  formatData: ->
    formData = new FormData()
    formData.append('file', @props.blockProps.data.file)
    return formData

  uploadFile: =>
    axios
      method: 'post'
      url: @config.upload_url
      data: @formatData()
      onUploadProgress: (e)=>
        @updateProgressBar(e)
    .then (result)=> 
      @uploadCompleted(result.data)
      if @config.upload_callback
        @config.upload_callback(response, @)
    .catch (error)=>
      console.log("ERROR: got error uploading file #{error}")
      if @config.upload_error_callback
        @config.upload_error_callback(error, @)

    handleUp = (json_response)=>
      @uploadCompleted json_response, n

  uploadCompleted: (json)=>
    @setState
      url: json.url
    , @updateData

  updateProgressBar: (e)=>
    complete = ""
    if (e.lengthComputable)
      complete = e.loaded / e.total * 100
      complete = complete ? complete : 0
      console.log "complete"
      console.log complete

  render: =>
    return (
      <div ref="image_tag2" 
          suppressContentEditableWarning={true}>
        <div contentEditable="false"
          className="aspectRatioPlaceholder is-locked" 
          style={@coords()} 
          onClick={@handleGrafFigureSelectImg}>
          <div style={{paddingBottom: "#{@state.aspect_ratio.ratio}%" }}} className='aspect-ratio-fill'>
          </div>
          <img src={@state.url}
            ref="image_tag"
            height={@state.aspect_ratio.height}
            width={@state.aspect_ratio.width}
            className='graf-image'
          />
        </div>
        <figcaption className='imageCaption'>
          <EditorBlock {...@props} 
            editable=true
            className="imageCaption"
            placeholder="escrive alalal"
          />
        </figcaption>
      </div>
    )
    
module.exports = ImageBlock
