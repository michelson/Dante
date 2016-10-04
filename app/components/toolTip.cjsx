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
    #@props.setStateHandler(
    #  RichUtils.toggleInlineStyle(@props.editorState, style)
    #)
    @props.dispatchChanges(
      RichUtils.toggleInlineStyle(@props.editorState, style)
    )

    setTimeout ()=>
      @props.relocateMenu()
    , 0
    #@props.relocateMenu()


  _clickBlockHandler: (ev, style)=>
    ev.preventDefault()
    console.log "hoi", style
    #@props.toggleBlockType(style)
    #ev.preventDefault()
    @props.dispatchChanges(
      RichUtils.toggleBlockType(@props.editorState, style)
    )
    #debugger
    #@props.dispatchChanges(
    #  RichUtils.toggleInlineStyle(@props.editorState, style)
    #)
    #@props.relocateMenu()
    setTimeout ()=>
      @props.relocateMenu()
    , 0

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
    #setTimeout ()=>
    #  @props.relocateMenu()
    #, 0

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
                editorState={@props.editorState}
                type={"block"}
                currentStyle={@props.editorState.getCurrentInlineStyle}
              />
          }
          {
            <DanteTooltipLink />
          }
          {
            @props.inline_styles.map (item, i)=>
              <DanteTooltipItem 
                key={i}
                item={item}
                type={"inline"}
                editorState={@props.editorState}
                handleClick={@_clickInlineHandler}
              />
          }
        </ul>
      </div>
    )

class DanteTooltipItem extends React.Component

  handleClick: (ev)=>
    @props.handleClick(ev, @props.item.style)

  activeClass: =>
    if @isActive() then "active" else ""

  isActive: =>
    if @props.type is "block"
      @activeClassBlock()
    else
      @activeClassInline()

  activeClassInline: =>
    return unless @props.editorState
    #console.log @props.item
    @props.editorState.getCurrentInlineStyle().has(@props.item.style)

  activeClassBlock: =>
    #console.log "EDITOR STATE", @props.editorState
    return unless @props.editorState
    selection = @props.editorState.getSelection()
    blockType = @props.editorState
                .getCurrentContent()
                .getBlockForKey(selection.getStartKey())
                .getType()
    @props.item.style is blockType

  render: =>
    return (
      <li className="dante-menu-button #{@activeClass()}" 
        onMouseDown={@handleClick}>
        <i className="dante-icon dante-icon-#{@props.item.label}" 
          data-action="bold"></i>
      </li>
    )

class DanteTooltipLink extends React.Component
  render: ->
    return (
      <li className="dante-menu-button">
        <i className="dante-icon icon-createlink" 
        data-action="createlink">link</i>
      </li>
    )


module.exports = DanteTooltip