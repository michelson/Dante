
React = require('react')
ReactDOM = require('react-dom')

{
  Entity,
  RichUtils
  AtomicBlockUtils
  EditorBlock
} = require('draft-js')

utils = require("../utils/utils")


class EmbedBlock extends React.Component
  constructor: (props) ->
    super props
    api_key = "86c28a410a104c8bb58848733c82f840"
    @state = 
      provisory_text: "https://www.youtube.com/watch?v=XCEN0qQOsIA"
      embed_url: "http://api.embed.ly/1/oembed?key=#{api_key}&url="
      embed_data: {}

  componentDidMount: ->
    utils.ajax
      url: "#{@state.embed_url}#{@state.provisory_text}&scheme=https"
      (data)=>
        if data.status is 200
          @setState
            embed_data: JSON.parse(data.responseText)    

  classForImage: ->
    if @state.embed_data.thumbnail_url then "" else "mixtapeImage--empty u-ignoreBlock"

  render: ->
    return(
      <figure contenteditable='false' 
        className='graf--figure graf--iframe graf--first' tabIndex='0'>
        <div className='iframeContainer' dangerouslySetInnerHTML={__html: @state.embed_data.html}>
        </div>
        <figcaption data-default-value={@state.caption} 
          className='imageCaption'>
            <EditorBlock {...@props} 
              className="imageCaption"
              placeholder="escrive alalal"
            />
        </figcaption>
      </figure>
    )

module.exports = EmbedBlock