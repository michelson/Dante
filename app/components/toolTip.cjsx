React = require('react')
ReactDOM = require('react-dom')
utils = require('../utils/utils.coffee')

{
  convertToRaw,
  CompositeDecorator,
  getVisibleSelectionRect,
  getDefaultKeyBinding, 
  getSelectionOffsetKeyForNode,
  KeyBindingUtil,
  ContentState,
  Editor,
  EditorState,
  Entity,
  RichUtils
} = require('draft-js')

class DanteTooltip extends React.Component

  constructor: (props) ->
    super props
    @getVisibleSelectionRect = getVisibleSelectionRect

  _clickInlineHandler: (ev, style)=>
    ev.preventDefault()
    @props.stateHandler(
      RichUtils.toggleInlineStyle(@props.editorState, style)
    )
    @props.relocateMenu()


  _clickBlockHandler: (ev, style)=>
    ev.preventDefault()
    @props.toggleBlockType(style)
    @props.relocateMenu()

  displayLinkMode: =>
    if @props.link_mode then "dante-menu--linkmode" else ""

  displayActiveMenu: =>
    if @props.options.show then "dante-menu--active" else ""

  _disableLinkMode: (ev)=>
    ev.preventDefault()
    @props.disableLinkMode()

  hideMenu: ->
    @props.disableMenu()

  getPosition: ->
    pos = @props.options.position
    #console.log pos
    pos
    
  componentWillReceiveProps: (newProps)=>
    # console.log "isjsj"
    # @props.relocateMenu()

  render: ->
    return (
      <div id="dante-menu" className="dante-menu #{@displayActiveMenu()} #{@displayLinkMode()}" 
        style={@getPosition()}>
        <div className="dante-menu-linkinput">
          <input className="dante-menu-input" 
            placeholder="Paste or type a link"
          />
          <div className="dante-menu-button" onClick={@_disableLinkMode}>
            x
          </div>
        </div>

        <ul className="dante-menu-buttons">
          {
            @props.block_types.map (item, i)=>
              <DanteTooltipItem 
                key={i}
                item={item}
                handleClick={@_clickBlockHandler}
              />
          }
          {
            @props.inline_styles.map (item, i)=>
              <DanteTooltipItem 
                key={i}
                item={item}
                handleClick={@_clickInlineHandler}
              />
          }
        </ul>
      </div>
    )

class DanteTooltipItem extends React.Component

  handleClick: (ev)=>
    @props.handleClick(ev, @props.item.style)

  render: ->
    return (
      <li className="dante-menu-button" onClick={@handleClick}>
        <i className="dante-icon dante-icon-#{@props.item.label}" 
          data-action="bold"></i>
      </li>
    )

module.exports = DanteTooltip