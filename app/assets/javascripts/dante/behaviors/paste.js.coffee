utils = Dante.utils

class Dante.View.Behavior.Paste extends Dante.View.Behavior

  #events:
  #  "paste" : "handlePaste"

  initialize: (opts={})->
    @editor      = opts.current_editor

  #detects html data , creates a hidden node to paste ,
  #then clean up the content and copies to currentNode, very clever uh?
  handlePaste: (ev, parent)=>
    
    utils.log("pasted!")
    
    # hide default value if it's any
    @editor.hidePlaceholder($(parent))

    pastedText = undefined
    if (window.clipboardData && window.clipboardData.getData) #IE
      pastedText = window.clipboardData.getData('Text')
    else if (ev.originalEvent.clipboardData && ev.originalEvent.clipboardData.getData)
      cbd = ev.originalEvent.clipboardData
      pastedText = if _.isEmpty(cbd.getData('text/html')) then cbd.getData('text/plain') else cbd.getData('text/html')

    utils.log("Process and handle text...")
    utils.log(pastedText)
    #detect if is html
    if pastedText.match(/<\/*[a-z][^>]+?>/gi)
      utils.log("HTML DETECTED ON PASTE")
      #pastedText = pastedText.replace(/&.*;/g, "")

      # convert pasted divs in p before copy contents into div
      pastedText = pastedText.replace(/<div>([\w\W]*?)<\/div>/gi, '<p>$1</p>')

      # create the placeholder element and assign pasted content
      document.body.appendChild( $("<div id='#{@editor.paste_element_id.replace('#', '')}' class='dante-paste'></div>")[0] )

      paste_el = $(@editor.paste_element_id)
      paste_el.html("<span>#{pastedText}</span>")
      nodes = $(paste_el.html()).insertBefore($(parent))
      
      # clean pasted content
      # TODO: this will sanitize all editor 
      # content and the selection will be lost!
      # but for now it works better

      @editor.parseInitialMess()

      # clean pasted content
      ###
      @editor.setupElementsClasses $(@editor.paste_element_id), (e)=>
        # e is the target object which is cleaned
        nodes = $(e.html()).insertAfter($(parent))
        #remove paste div since we wont use it until the next paste
        e.remove()
        #set caret on newly created node
        last_node = nodes.last()[0]
        num = last_node.childNodes.length
        @editor.setRangeAt(last_node, num)
        
        #select new node
        new_node = $(@editor.getNode())
        @editor.markAsSelected(new_node)
        @editor.displayTooltipAt($(@editor.el).find(".is-selected"))
        
        # wrap new images
        @editor.handleUnwrappedImages(nodes)

        #scroll to element top
        top = new_node.offset().top
        $('html, body').animate
          scrollTop: top
        , 20
      ###

      @editor.continue = false
      return false # Prevent the default handler from running.
