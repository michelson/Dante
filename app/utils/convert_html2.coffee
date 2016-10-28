{ ContentState
  genKey 
  Entity 
  CharacterMetadata
  ContentBlock
  convertFromHTML
  getSafeBodyFromHTML
}  = require('draft-js')

{ List
  OrderedSet
  Repeat
  fromJS 
}  = require('immutable')

{ compose 
}  = require('underscore')


# from https://gist.github.com/N1kto/6702e1c2d89a33a15a032c234fc4c34e

###
# Helpers
###

# Prepares img meta data object based on img attributes
getBlockSpecForElement = (imgElement)=>
  contentType: 'image',
  imgSrc: imgElement.getAttribute('src')

# Wraps meta data in HTML element which is 'understandable' by Draft, I used <blockquote />.
wrapBlockSpec = (blockSpec)=>
  if blockSpec == null
    return null
  
  tempEl = document.createElement('blockquote')
  # stringify meta data and insert it as text content of temp HTML element. We will later extract
  # and parse it.
  tempEl.innerText = JSON.stringify(blockSpec)
  return tempEl

# Replaces <img> element with our temp element
replaceElement = (oldEl, newEl)=>
  if !(newEl instanceof HTMLElement)
    return
  
  parentNode = oldEl.parentNode
  return parentNode.replaceChild(newEl, oldEl)


elementToBlockSpecElement = compose(wrapBlockSpec, getBlockSpecForElement)

imgReplacer = (imgElement)=>
  replaceElement(imgElement, elementToBlockSpecElement(imgElement))

###
# Main function
###

# takes HTML string and returns DraftJS ContentState
customHTML2Content = (HTML, blockRn)->
  tempDoc = new DOMParser().parseFromString(HTML, 'text/html')
  # replace all <img /> with <blockquote /> elements
  a = tempDoc.querySelectorAll('img').forEach( (item)->
    return imgReplacer(item)
  )

  # use DraftJS converter to do initial conversion. I don't provide DOMBuilder and
  # blockRenderMap arguments here since it should fall back to its default ones, which are fine
  console.log tempDoc.body.innerHTML
  contentBlocks = convertFromHTML(tempDoc.body.innerHTML, 
        getSafeBodyFromHTML, 
        blockRn
  )

  # now replace <blockquote /> ContentBlocks with 'atomic' ones
  contentBlocks = contentBlocks.map (block)->
    console.log "CHECK BLOCK", block.getType()
    if (block.getType() isnt 'blockquote')
      return block

    json = ""
    try
      json = JSON.parse(block.getText())
    catch
      return block
    
    newBlock = block.merge({
      type: "image",
      text: ""
      data: 
        url: json.imgSrc
        forceUpload: true
    });

  tempDoc = null
  return ContentState.createFromBlockArray(contentBlocks)


module.exports = customHTML2Content