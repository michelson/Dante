React = require('react')
ReactDOM = require('react-dom')

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

{ 
  getSelectionRect
  getSelection
} = require("../../utils/selection.js.es6")

{ 
  getCurrentBlock
} = require('../../model/index.js.es6')


class DanteTooltip extends React.Component

  constructor: (props) ->
    super props
    @getVisibleSelectionRect = getVisibleSelectionRect
    @state = 
      link_mode: false
      show: false
      position: {}

  _clickInlineHandler: (ev, style)=>
    ev.preventDefault()
    #@props.setStateHandler(
    #  RichUtils.toggleInlineStyle(@props.editorState, style)
    #)
    @props.onChange(
      RichUtils.toggleInlineStyle(@props.editorState, style)
    )

    setTimeout ()=>
      @props.relocateMenu()
    , 0
    #@props.relocateMenu()

  display: (b)=>
    if b then @show() else @hide()

  show: =>
    @setState
      show: true

  hide: =>
    @setState
      show: false

  setPosition: (coords)->
    @setState
      position: coords

  relocateMenu: (editorState, parent)=>

    currentBlock = getCurrentBlock(editorState);
    blockType    = currentBlock.getType()
    # display tooltip only for unstyled
    if @.props.tooltipables.indexOf(blockType) < 0
      @disableMenu()
      return

    return if !@state.show
    el = @refs.dante_menu 
    #document.querySelector("#dante-menu")
    padd   = el.offsetWidth / 2

    # eslint-disable-next-line no-undef
    nativeSelection = getSelection(window);
    if !nativeSelection.rangeCount
      return;
    
    selectionBoundary = getSelectionRect(nativeSelection);

    # eslint-disable-next-line react/no-find-dom-node
    #toolbarNode = ReactDOM.findDOMNode(@);
    #toolbarBoundary = toolbarNode.getBoundingClientRect();

    # eslint-disable-next-line react/no-find-dom-node
    #parent = ReactDOM.findDOMNode(@);
    parentBoundary = parent.getBoundingClientRect();

    top    = selectionBoundary.top - parentBoundary.top - -90 - 5
    left   = selectionBoundary.left + (selectionBoundary.width / 2) - padd

    if !top or !left
      return

    console.log "SET SHOW FOR TOOLTIP INSERT MENU"
    @setState
      show: true
      position: { left: left , top: top }

  _clickBlockHandler: (ev, style)=>
    ev.preventDefault()
    # console.log "hoi", style
    #@props.toggleBlockType(style)
    #ev.preventDefault()
    @props.onChange(
      RichUtils.toggleBlockType(@props.editorState, style)
    )
    #debugger
    #@props.dispatchChanges(
    #  RichUtils.toggleInlineStyle(@props.editorState, style)
    #)
    #@props.relocateMenu()
    setTimeout ()=>
      @relocateMenu()
    , 0

  displayLinkMode: =>
    if @state.link_mode then "dante-menu--linkmode" else ""

  displayActiveMenu: =>
    if @state.show then "dante-menu--active" else ""

  _enableLinkMode: (ev)=>
    ev.preventDefault()
    @setState
      link_mode: true

  _disableLinkMode: (ev)=>
    ev.preventDefault()
    @setState
      link_mode: false

  hideMenu: ->
    @hide()
    #@props.disableMenu()

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

    entityKey = Entity.create('link', 'MUTABLE', opts);

    if selection.isCollapsed()
      console.log "COLLAPSED SKIPPN LINK"
      return

    @props.onChange(
      RichUtils.toggleLink(
        editorState,
        selection,
        entityKey
      )
    )
  
    @_disableLinkMode(e)

  getPosition: ->
    pos = @state.position
    #console.log pos
    pos
    
  componentWillReceiveProps: (newProps)=>
    # console.log "isjsj"
    #setTimeout ()=>
    #  @props.relocateMenu()
    #, 0

  inlineItems: =>
    @props.block_types.filter (o)=>
      o.type is "inline"

  blockItems: =>
    @props.block_types.filter (o)=>
      o.type is "block"

  render: ->
    return (
      <div id="dante-menu" 
        ref="dante_menu"
        className="dante-menu #{@displayActiveMenu()} #{@displayLinkMode()}" 
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
            @blockItems().map (item, i)=>
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
            @inlineItems().map (item, i)=>
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