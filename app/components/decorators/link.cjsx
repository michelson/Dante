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

  _validateLink: ()=>
    pattern = new RegExp('^(https?:\/\/)?'+ # protocol
      '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ # domain name
      '((\d{1,3}\.){3}\d{1,3}))'+ # OR ip (v4) address
      '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ # port and path
      '(\?[;&a-z\d%_.~+=-]*)?'+ # query string
      '(\#[-a-z\d_]*)?$','i') # fragment locater
    if !pattern.test(str)
      alert("Please enter a valid URL.")
      return false
    else
      return true

  _checkProtocol: ()=>
    console.log "xcvd"


  _showPopLinkOver: (e)=>
    return unless @data.showPopLinkOver
    @data.showPopLinkOver(@refs.link)

  _hidePopLinkOver: (e)=>
    return unless @data.hidePopLinkOver
    @data.hidePopLinkOver()

  render: ->
    @data = Entity.get(@props.entityKey).getData();

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