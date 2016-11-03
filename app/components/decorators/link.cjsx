React = require('react')
{Entity} = require('draft-js')

###
Link = (props) ->
  data = Entity.get(props.entityKey).getData();
  console.log props
  #onMouseOver={@props.showPopLinkOver}>
  #onMouseOut={@props.hidePopLinkOver}>
  return (
    <a href={data.url} className="markup--anchor">
      {props.children}
    </a>
  );
###

class Link extends React.Component

  constructor: (props) ->
    super props
    @isHover = false

  _showPopLinkOver: (e)=>
    @data.showPopLinkOver(@refs.link)

  _hidePopLinkOver: (e)=>
    @data.hidePopLinkOver()

  render: ->
    @data = Entity.get(@props.entityKey).getData();
    console.log @props
    console.log "ENTITY", @data

    return (
      <a ref="link" 
        href={@data.url} 
        className="markup--anchor"
        onMouseOver={@_showPopLinkOver}
        onMouseOut={@_hidePopLinkOver}>
        {@props.children}
      </a>
    );  

module.exports = Link