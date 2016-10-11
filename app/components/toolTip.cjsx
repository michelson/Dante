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
    @state = 
      link_mode: false

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
    # console.log "hoi", style
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
    if @state.link_mode then "dante-menu--linkmode" else ""

  displayActiveMenu: =>
    if @props.options.show then "dante-menu--active" else ""

  _enableLinkMode: (ev)=>
    ev.preventDefault()
    @setState
      link_mode: true

  _disableLinkMode: (ev)=>
    ev.preventDefault()
    @setState
      link_mode: false

  hideMenu: ->
    @props.disableMenu()

  handleInputEnter: (e)=>    
    if (e.which is 13)
      #utils.restoreSelection(@savedSel)
      return @confirmLink(e)

  confirmLink: (e)=>
    e.preventDefault()
    editorState = @.props.editorState
    urlValue = e.currentTarget.value
    contentState = editorState.getCurrentContent()
    selection = editorState.getSelection()

    opts = {
      url: urlValue
      showPopLinkOver: @props.showPopLinkOver 
      hidePopLinkOver: @props.hidePopLinkOver
    }

    console.log "MAMAMA", opts

    entityKey = Entity.create('link', 'MUTABLE', opts);

    if selection.isCollapsed()
      console.log "COLLAPSED SKIPPN LINK"
      return

    @props.dispatchChanges(
      RichUtils.toggleLink(
        editorState,
        selection,
        entityKey
      )
    )
  
    @_disableLinkMode(e)

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
            onKeyPress={@handleInputEnter}/>

          <div className="dante-menu-button" 
            onMouseDown={@_disableLinkMode}>
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
            <DanteTooltipLink 
              editorState={@props.editorState}
              enableLinkMode={@_enableLinkMode}
            />
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

  promptForLink: (ev)=>
    selection = @props.editorState.getSelection()
    if (!selection.isCollapsed())
      @props.enableLinkMode(ev)

  render: ->
    return (
      <li className="dante-menu-button" 
        onMouseDown={@.promptForLink}>
        <i className="dante-icon icon-createlink" 
        data-action="createlink">link</i>
      </li>
    )


module.exports = DanteTooltip