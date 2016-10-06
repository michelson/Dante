React = require('react')
ReactDOM = require('react-dom')

{
  Entity,
  RichUtils
  AtomicBlockUtils
  EditorBlock
} = require('draft-js')


class ImageBlock extends React.Component

  constructor: (props) ->
    super props

    @state = 
      selected: false
      caption: "Type caption for image"
      width: 0
      height: 0
      url: ""
      aspect_ratio: 
        width: 0
        height: 0
        ratio: 100

  getAspectRatio: (w, h)->
    maxWidth = 700
    maxHeight = 700
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
  
  componentDidMount: ->
    @replaceImg()

  aspectRatio: =>
    maxWidth: "#{@state.aspect_ratio.width}"
    maxHeight: "#{@state.aspect_ratio.height}"
    ratio: "#{@state.aspect_ratio.height}"

  selectedClass: =>
    if @state.selected then "is-selected is-mediaFocused" else ""

  handleGrafFigureSelectImg: (e)=>
    e.preventDefault()

    @setState
      selected: true

  coords: ->
    {maxWidth: "#{@state.aspect_ratio.width}px", maxHeight: "#{@state.aspect_ratio.height}px"}

  render: ->
    block = @.props;
    # {foo} = this.props.blockProps;
    entity = block.block.getEntityAt(0)
    data = Entity.get(entity).getData().src if entity
    return (
      <figure
        className="graf graf--figure is-defaultValue #{@selectedClass()}" tabIndex='0'>

        <div className="aspectRatioPlaceholder is-locked" style={@coords()} onClick={@handleGrafFigureSelectImg}>
          <div style={{paddingBottom: "#{@state.aspect_ratio.ratio}%" }}} className='aspect-ratio-fill'>
          </div>
          <img src={data||@state.url}
            ref="image_tag"
            height={@state.aspect_ratio.height}
            width={@state.aspect_ratio.width}
            className='graf-image'
          />
        </div>
        <figcaption
          data-default-value={@state.caption} 
          className='imageCaption'>
          <EditorBlock {...@props} 
            className="imageCaption"
            placeholder="escrive alalal"
          />
        </figcaption>
      </figure>
    )
    
module.exports = ImageBlock

###
default = ( block ) =>
  imgContent = Entity.get(block.getEntityAt(0)).data.src
  return (<img src={imgContent} />);

module.exports = default
###
