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

  _showPopLinkOver: (e)=>
   
    @props.showPopLinkOver(@refs.link.href)

  _hidePopLinkOver: (e)=>
    @props.hidePopLinkOver()

  render: ->
    data = Entity.get(@props.entityKey).getData();
    console.log @props
    return (
      <a ref="link" 
        href={data.url} 
        className="markup--anchor"
        onMouseOver={@_showPopLinkOver}
        onMouseOut={@_hidePopLinkOver}>
        {@props.children}
      </a>
    );  

module.exports = Link