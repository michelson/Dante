React = require('react')
{Entity} = require('draft-js')

Link = (props) ->
  data = Entity.get(props.entityKey).getData();
  #onMouseOver={@props.showPopLinkOver}>
  #onMouseOut={@props.hidePopLinkOver}>
  return (
    <a href={data.url} className="markup--anchor">
      {props.children}
    </a>
  );

module.exports = Link