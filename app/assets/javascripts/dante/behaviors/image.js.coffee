utils = Dante.utils

class Dante.View.Behavior.Image extends Dante.View.Behavior

  # TODO. dry up this!, call constants from @editor
  BACKSPACE  = 8
  TAB        = 9
  ENTER      = 13
  SPACEBAR   = 32
  LEFTARROW  = 37
  UPARROW    = 38
  RIGHTARROW = 39
  DOWNARROW  = 40

  events:
    "click .graf--figure .aspectRatioPlaceholder" : "handleGrafFigureSelectImg"
    "click .graf--figure figcaption"   : "handleGrafFigureSelectCaption"
    "keyup .graf--figure figcaption"   : "handleGrafCaptionTyping"

    # TODO: this is from embed! move this to embed behavior
    "mouseover .graf--figure.graf--iframe" : "handleGrafFigureSelectIframe"
    "mouseleave .graf--figure.graf--iframe" : "handleGrafFigureUnSelectIframe"

  initialize: (opts={})->
    @editor = opts.current_editor

  handleGrafFigureSelectImg: (ev)->
    utils.log "FIGURE SELECT"
    element = ev.currentTarget
    @editor.markAsSelected( element )
    $(element).parent(".graf--figure").addClass("is-selected is-mediaFocused")
    @editor.selection().removeAllRanges()

    @showAlignPopover(ev)

  showAlignPopover: (ev)->
    target = $(ev.currentTarget)
    @editor.pop_over_align.positionPopOver(target)

  placeHolderDiv: (target)->
    target.find(".aspectRatioPlaceholder")

  handleGrafFigureSelectCaption: (ev)->
    utils.log "FIGCAPTION"
    element = ev.currentTarget
    $(element).parent(".graf--figure").removeClass("is-mediaFocused")
    @editor.pop_over_align.hide()

  handleGrafCaptionTyping: (ev)->
    @editor.pop_over_align.hide()
    
    node = $(@editor.getNode())
    
    if _.isEmpty(utils.getNode().textContent.trim())
      $(node).addClass("is-defaultValue")
    else
      $(node).removeClass("is-defaultValue")

  #TODO: this is from embed! move this to embed behavior
  handleGrafFigureSelectIframe: (ev)->
    utils.log "FIGURE IFRAME SELECT"
    element = ev.currentTarget
    @iframeSelected = element
    @editor.markAsSelected( element )
    $(element).addClass("is-selected is-mediaFocused")
    @editor.selection().removeAllRanges()

  handleGrafFigureUnSelectIframe: (ev)->
    utils.log "FIGURE IFRAME UNSELECT"
    element = ev.currentTarget
    @iframeSelected = null
    $(element).removeClass("is-selected is-mediaFocused")

  handleKeyDown: (e, parent)->

    if _.contains([UPARROW, DOWNARROW], e.which)
      utils.log e.which
      @handleArrowForKeyDown(e)

    if (e.which is BACKSPACE)
      
      # without selection but with target active
      if $(e.target).hasClass("graf--figure")
        e.preventDefault()

        # call callback for image delete 
        if @editor.image_delete_callback
          @editor.image_delete_callback( @editor.findSelected().find("img").data() )
        
        utils.log("Replacing selected node")
        @editor.replaceWith("p", @editor.findSelected())
        @editor.setRangeAt(@editor.findSelected()[0])
        @editor.pop_over_align.hide()
        utils.log("Focus on the previous graf")
        @editor.continue = false
        return false 

      #select an image if backspacing into it from a paragraph
      if(parent.hasClass("graf--p") && @editor.isFirstChar() )
        if(parent.prev().hasClass("graf--figure") && @editor.getSelectedText().length == 0)
          e.preventDefault()
          parent.prev().find("img").click()
          @editor.pop_over_align.positionPopOver(parent.prev())
          utils.log("Focus on the previous image")
          @editor.continue = false
          return false

      # supress del into & delete embed if empty content found on delete key
      if parent.hasClass("graf--mixtapeEmbed") or parent.hasClass("graf--iframe")
        if _.isEmpty parent.text().trim() or @isFirstChar()
          utils.log("Check for inmediate deletion on empty embed text")
          @editor.inmediateDeletion = @editor.isSelectingAll(anchor_node)
          @editor.handleInmediateDeletion(parent) if @editor.inmediateDeletion
          e.preventDefault()
          @editor.continue = false
          return false

      # TODO: supress del when the prev el is embed and current_node is at first char
      if parent.prev().hasClass("graf--mixtapeEmbed")
        if @editor.isFirstChar() && !_.isEmpty( parent.text().trim() )
          @editor.continue = false
          return false

    # when user types over a selected image (graf--figure)
    # unselect image , and set range on caption
    if _.isUndefined(parent) or parent.length is 0 && @editor.findSelected().hasClass("is-mediaFocused")
      # will remove default value on typing
      node = @editor.findSelected().find("figcaption")
      node.find(".defaultValue").remove()
    
      @editor.setRangeAt node[0]
      @editor.findSelected().removeClass("is-mediaFocused")
      @editor.pop_over_align.hide()
      #@editor.continue = false
      return false

  # handleKeyUp: (e, parent)->

  #handle arrow direction from keyDown.
  handleArrowForKeyDown: (ev)=>
    caret_node   = @editor.getNode()
    current_node = $(caret_node)
    utils.log(ev)
    ev_type = ev.originalEvent.key || ev.originalEvent.keyIdentifier

    utils.log("ENTER ARROW for key #{ev_type}")

    
    #handle keys for image figure
    
    switch ev_type

      when "ArrowDown", "Down"
        # when graff-image selected but none selection is found
        if _.isUndefined(current_node) or !current_node.exists()
          if @editor.findSelected().exists()
            current_node = @editor.findSelected()

        next_node = current_node.next()
        
        utils.log "NEXT NODE IS #{next_node.attr('class')}"
        utils.log "CURRENT NODE IS #{current_node.attr('class')}"

        return unless $(current_node).hasClass("graf")
        return unless current_node.hasClass("graf--figure") or $(current_node).editableCaretOnLastLine()

        utils.log "ENTER ARROW PASSED RETURNS"
        
        #if next element is embed select & focus it
        if next_node.hasClass("graf--figure") && caret_node
          n = next_node.find(".imageCaption")
          @editor.scrollTo(n)
          utils.log "1 down"
          utils.log n[0]
          @editor.skip_keyup = true
          @editor.selection().removeAllRanges()
          @editor.markAsSelected(next_node)
          next_node.addClass("is-mediaFocused is-selected")
          
          #@editor.setRangeAt $(".is-selected").find("figcaption")[0]
          @editor.pop_over_align.positionPopOver(@placeHolderDiv(next_node))
          @editor.continue = false

          return false

        else if next_node.prev().hasClass("graf--figure")
          @editor.pop_over_align.hide()
          
        #if current node is embed
        else if next_node.hasClass("graf--mixtapeEmbed")
          n = current_node.next(".graf--mixtapeEmbed")
          num = n[0].childNodes.length
          @editor.setRangeAt n[0], num
          #@editor.scrollTo(n)
          utils.log "2 down"
          @editor.continue = false
          return false

        if current_node.hasClass("graf--figure") && next_node.hasClass("graf")
          @editor.scrollTo(next_node)
          utils.log "3 down, from figure to next graf"
          @editor.skip_keyup = true
          @editor.markAsSelected(next_node)
          @editor.setRangeAt next_node[0]
          @editor.continue = false

          return false

      when "ArrowUp", "Up"
        prev_node = current_node.prev()
        utils.log "PREV NODE IS #{prev_node.attr('class')} #{prev_node.attr('name')}"
        utils.log "CURRENT NODE IS up #{current_node.attr('class')}"

        # will handle up when figure is selected
        if prev_node.length is 0 && $(ev.target).hasClass("graf--figure")
          n = $(ev.target).prev(".graf")
          #num = n[0].childNodes.length
          #@editor.setRangeAt n[0], num
          @editor.continue = false
          @editor.markAsSelected(n[0])
          @editor.pop_over_align.hide()
          return false

        else if prev_node.length > 0 && $(".graf--figure.is-mediaFocused").length > 0
          # do our best to detect up arrow from selected
          n = $(".graf--figure.is-mediaFocused").prev(".graf")
          #num = n[0].childNodes.length
          #@editor.setRangeAt n[0], num
          @editor.continue = false
          @editor.markAsSelected(n[0])
          @editor.pop_over_align.hide()
          return false

        return unless $(current_node).hasClass("graf")
        return unless $(current_node).editableCaretOnFirstLine()

        utils.log "ENTER ARROW PASSED RETURNS"

        if prev_node.hasClass("graf--figure")
          utils.log "1 up"
          n = prev_node.find(".imageCaption")
          @editor.scrollTo(n)
          @editor.skip_keyup = true
          @editor.selection().removeAllRanges()
          @editor.markAsSelected(prev_node)

          #TODO: to function
          # @editor.setRangeAt $(".is-selected").find("figcaption")[0]
          prev_node.addClass("is-mediaFocused")
          @editor.pop_over_align.positionPopOver(@placeHolderDiv(prev_node))

          @editor.continue = false
          
          return false

        else if prev_node.hasClass("graf--mixtapeEmbed")
          n = current_node.prev(".graf--mixtapeEmbed")
          num = n[0].childNodes.length
          @editor.setRangeAt n[0], num
          #@editor.scrollTo(n)
          utils.log "2 up"
          @editor.continue = false
          return false

        if current_node.hasClass("graf--figure") && prev_node.hasClass("graf")
          @editor.setRangeAt prev_node[0]
          #@editor.scrollTo(prev_node)
          utils.log "3 up"
          @editor.continue = false
          return false

        else if prev_node.hasClass("graf")
          n = current_node.prev(".graf")
          num = n[0].childNodes.length
          #@editor.scrollTo(n)
          utils.log "4 up"
          # @editor.skip_keyup = true
          @editor.markAsSelected(prev_node)
          # @editor.continue = false
          return false


  #handle arrow direction from keyUp.
  handleArrowForKeyUp: (ev)=>
    current_node = $(@editor.editor.getNode())
    if current_node.length > 0
      @editor.markAsSelected( current_node )
      @editor.displayTooltipAt( current_node )
