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
} = require("../../utils/selection.js")

{ 
  getCurrentBlock
} = require('../../model/index.js')


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

    @props.onChange(
      RichUtils.toggleInlineStyle(@props.editorState, style)
    )

    setTimeout ()=>
      @relocate()
    , 0

  display: (b)=>
    if b then @show() else @hide()

  show: =>
    @setState
      show: true

  hide: =>
    @setState
      link_mode: false
      show: false

  setPosition: (coords)->
    @setState
      position: coords
  

  isDescendant: (parent, child)->
    node = child.parentNode
    while node != null
       if (node is parent)
           return true
       node = node.parentNode
    return false

  relocate: ()=>

    currentBlock = getCurrentBlock(@props.editorState);
    blockType    = currentBlock.getType()
    # display tooltip only for unstyled

    if @.props.configTooltip.selectionElements.indexOf(blockType) < 0
      @hide()
      return

    return if @state.link_mode
    return if !@state.show


    el = @refs.dante_menu 
    padd   = el.offsetWidth / 2

    nativeSelection = getSelection(window);
    if !nativeSelection.rangeCount
      return
    
    selectionBoundary = getSelectionRect(nativeSelection);

    parent = ReactDOM.findDOMNode(@props.editor);
    parentBoundary = parent.getBoundingClientRect();

    # hide if selected node is not in editor
    if !@isDescendant(parent, nativeSelection.anchorNode)
      @hide()
      return


    top    = selectionBoundary.top - parentBoundary.top - -90 - 5
    left   = selectionBoundary.left + (selectionBoundary.width / 2) - padd

    if !top or !left
      return

    # console.log "SET SHOW FOR TOOLTIP INSERT MENU"
    @setState
      show: true
      position: 
        left: left
        top: top

  _clickBlockHandler: (ev, style)=>
    ev.preventDefault()

    @props.onChange(
      RichUtils.toggleBlockType(@props.editorState, style)
    )

    setTimeout ()=>
      @relocate()
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
      url: ""

  hideMenu: ->
    @hide()

  handleInputEnter: (e)=>    
    if (e.which is 13)
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

    entityKey = Entity.create('LINK', 'MUTABLE', opts);

    if selection.isCollapsed()
      console.log "COLLAPSED SKIPPING LINK"
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
    pos

  inlineItems: =>
    @props.widget_options.block_types.filter (o)=>
      o.type is "inline"

  blockItems: =>
    @props.widget_options.block_types.filter (o)=>
      o.type is "block"

  getDefaultValue: =>
    @refs.dante_menu_input.value = "" if @refs.dante_menu_input

    currentBlock = getCurrentBlock(@props.editorState);
    blockType    = currentBlock.getType()
    selection    = @props.editor.state.editorState.getSelection()
    selectedEntity = null
    defaultUrl = null
    currentBlock.findEntityRanges (character) =>
      entityKey = character.getEntity()
      selectedEntity = entityKey
      return entityKey isnt null && Entity.get(entityKey).getType() is 'LINK'
    , (start, end) =>
      selStart = selection.getAnchorOffset()
      selEnd = selection.getFocusOffset()
      if selection.getIsBackward() 
        selStart = selection.getFocusOffset()
        selEnd = selection.getAnchorOffset()
      
      if start is selStart && end is selEnd
        defaultUrl = Entity.get(selectedEntity).getData().url
        @refs.dante_menu_input.value = defaultUrl

  render: ->
    return (
      <div id="dante-menu" 
        ref="dante_menu"
        className="dante-menu #{@displayActiveMenu()} #{@displayLinkMode()}" 
        style={@getPosition()}>
        
        <div className="dante-menu-linkinput">
          <input className="dante-menu-input" 
            ref="dante_menu_input"
            placeholder="Paste or type a link" 
            onKeyPress={@handleInputEnter}
            defaultValue={@getDefaultValue()}
          />

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