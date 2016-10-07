
React = require('react')
ReactDOM = require('react-dom')

{
  Entity,
  RichUtils
  AtomicBlockUtils
  EditorBlock
} = require('draft-js')

utils = require("../utils/utils")


class ExtractBlock extends React.Component
  constructor: (props) ->
    super props
    api_key = "86c28a410a104c8bb58848733c82f840"
    @state = 
      provisory_text: "http://twitter.com"
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
      <div className='graf graf--mixtapeEmbed is-selected'>
        <a target='_blank'
          className="js-mixtapeImage mixtapeImage #{@classForImage()}"
          href={@state.embed_data.url} 
          style={{backgroundImage: "url('#{@state.embed_data.thumbnail_url}')"}}>
        </a>
        <a className='markup--anchor markup--mixtapeEmbed-anchor' 
          target='_blank' href={@state.embed_data.url}>
          <strong className='markup--strong markup--mixtapeEmbed-strong'>
            {@state.embed_data.title}
          </strong>
          <em className='markup--em markup--mixtapeEmbed-em'>
            {@state.embed_data.description}
          </em>
        </a>
        {@state.embed_data.provider_url}
      </div>
    )

module.exports = ExtractBlock