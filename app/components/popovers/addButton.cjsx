React = require('react')
ReactDOM = require('react-dom')

{
  Entity
  RichUtils
  AtomicBlockUtils
  EditorState
} = require('draft-js')

{ 
  addNewBlock
  resetBlockWithType
  updateDataOfBlock
  getCurrentBlock
  getNode
} = require('../../model/index.js')

{ 
  getSelectionRect
  getSelection
} = require("../../utils/selection.js")

class DanteInlineTooltip extends React.Component

  constructor: (props) ->
    super props

    @state = 
      position: {top: 0, left:0}
      show: false
      scaled: false

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

  _toggleScaled: (ev)=>
    if @state.scaled then @collapse() else @scale()

  scale: =>
    @setState
      scaled: true

  collapse: =>
    @setState
      scaled: false

  componentWillReceiveProps: (newProps)=>
    @collapse()

  activeClass: ->
    #if @props.show then "is-active" else ""
    if @isActive() then "is-active" else ""

  isActive: ->
    @state.show 

  scaledClass: ->
    if @state.scaled then "is-scaled" else ""

  scaledWidth: ->
    if @state.scaled then "124" else "0"   

  clickOnFileUpload: => 
    @.refs.fileInput.click()
    @collapse()
    @hide()

  handlePlaceholder: (input)=>
    opts =
      type: input.widget_options.insert_block
      placeholder: input.options.placeholder
      endpoint: input.options.endpoint

    @props.onChange(resetBlockWithType(@props.editorState, 'placeholder', opts));

  insertImage: (file) =>
    opts =  
      url: URL.createObjectURL(file)
      file: file

    @props.onChange(addNewBlock(@props.editorState, 'image', opts));

  handleFileInput: (e)=>
    fileList = e.target.files
    # TODO: support multiple file uploads
    ###
    Object.keys(fileList).forEach (o)=>
      @.insertImage(fileList[0])
    ###
    @.insertImage(fileList[0])


  widgets: =>
    @.props.editor.widgets

  clickHandler: (e, type)=>
    request_block = @widgets().find (o)-> 
      o.icon is type 

    switch request_block.widget_options.insertion
      when "upload" 
        @clickOnFileUpload(e, request_block)
      when "placeholder" 
        @handlePlaceholder(request_block)
      else 
        console.log "WRONG TYPE FOR #{request_block.widget_options.insertion}"

  getItems: ->
    @widgets().filter (o)=>
      o.widget_options.displayOnInlineTooltip
  
  isDescendant: (parent, child)->
    node = child.parentNode
    while node != null
       if (node is parent)
           return true
       node = node.parentNode
    return false

  relocate: ()=>
    editorState = @props.editorState
    
    if editorState.getSelection().isCollapsed()

      currentBlock = getCurrentBlock(editorState)
      blockType = currentBlock.getType()
      
      contentState = editorState.getCurrentContent()
      selectionState = editorState.getSelection()

      block = contentState.getBlockForKey(selectionState.anchorKey);

      nativeSelection = getSelection(window);
      if !nativeSelection.rangeCount
        return;

      node = getNode()

      selectionBoundary = getSelectionRect(nativeSelection);
      coords = selectionBoundary #utils.getSelectionDimensions(node)
      
      parent = ReactDOM.findDOMNode(@props.editor);
      parentBoundary = parent.getBoundingClientRect();

      # hide if selected node is not in editor
      # debugger
      #console.log @isDescendant(parent, nativeSelection.anchorNode)

      if !@isDescendant(parent, nativeSelection.anchorNode)
        @hide()
        return

      # checkeamos si esta vacio
      @display block.getText().length is 0 and blockType is "unstyled"
      @setPosition
        top: coords.top + window.scrollY
        left: coords.left + window.scrollX - 60

      ###
      @refs.image_popover.display(blockType is "image")

      if blockType is "image"
        selectionBoundary = node.anchorNode.parentNode.parentNode.parentNode.getBoundingClientRect()
        #el = document.querySelector("#dante_image_popover")
        el = @refs.image_popover.refs.image_popover
        padd   = el.offsetWidth / 2
        @refs.image_popover.setPosition
          top: selectionBoundary.top - parentBoundary.top + 60
          left: selectionBoundary.left + (selectionBoundary.width / 2) - padd

        
        #@setState
        #  image_popover_position: 
        #    top: selectionBoundary.top - parentBoundary.top + 60
        #    left: selectionBoundary.left + (selectionBoundary.width / 2) - padd
        #
      ###

    else
      @hide()

  render: ->
    return (

      <div className="inlineTooltip #{@activeClass()} #{@scaledClass()}" 
        style={@state.position}>
        
        <button className="inlineTooltip-button control" 
          title="Close Menu" 
          data-action="inline-menu"
          onClick={@_toggleScaled}
        > 
          <span className="tooltip-icon dante-icon-plus"></span> 
        </button> 
        
        <div className="inlineTooltip-menu" style={{width: "#{@scaledWidth()}px"}}> 
          
          {
            @getItems().map (item, i)=>
              <InlineTooltipItem
                item={item}
                key={i}
                clickHandler={@clickHandler}
              />
          }

          <input type="file" 
            style={{display: 'none'}}
            ref="fileInput" 
            multiple="multiple"
            onChange={@.handleFileInput}
          />

        </div>

      </div>

    )

class InlineTooltipItem extends React.Component

  clickHandler: (e)=>
    e.preventDefault()
    @props.clickHandler(e, @props.item.icon)

  render: ->
    return (
      <button className="inlineTooltip-button scale" 
        title={@props.title} onMouseDown={@clickHandler}> 
        <span className="tooltip-icon dante-icon-#{@props.item.icon}">
        </span> 
      </button>
    )

module.exports = DanteInlineTooltip