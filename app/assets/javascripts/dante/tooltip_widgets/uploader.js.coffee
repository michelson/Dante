utils = Dante.utils

class Dante.View.TooltipWidget.Uploader extends Dante.View.TooltipWidget

  initialize: (opts={})->
    #super
    #@name        = "menu-image"
    @icon        = opts.icon  || "icon-image"
    @title       = opts.title || "Add an image"
    @action      = opts.action || "menu-image"
    @current_editor = opts.current_editor

  handleClick: (ev)->
    @imageSelect(ev)

  insertTemplate: ()->
    "<figure contenteditable='false' class='graf graf--figure is-defaultValue' name='#{utils.generateUniqueName()}' tabindex='0'>
      <div style='' class='aspectRatioPlaceholder is-locked'>
        <div style='padding-bottom: 100%;' class='aspect-ratio-fill'></div>
        <img src='' data-height='' data-width='' data-image-id='' class='graf-image' data-delayed-src=''>
      </div>
      <figcaption contenteditable='true' data-default-value='Type caption for image (optional)' class='imageCaption'>
        <span class='defaultValue'>Type caption for image (optional)</span>
        <br>
      </figcaption>
    </figure>"

  #UPLOADER
  #replace existing img tag , and wrap it in insertTamplate
  #TODO: take the url and upload it
  uploadExistentImage: (image_element, opts = {})->
    utils.log ("process image here!")
    tmpl = $(@insertTemplate())
    tmpl.find("img").attr('src', @current_editor.default_loading_placeholder )
    #is a child element or a first level element ?

    if $(image_element).parents(".graf").length > 0
      #return if it's already wrapped in graf--figure
      if $(image_element).parents(".graf").hasClass("graf--figure")
        return

      utils.log "UNO"
      tmpl.insertBefore( $(image_element).parents(".graf") )
      node = @current_editor.getNode()
      #wtf?
      if node
        @current_editor.preCleanNode($(node))
        @current_editor.addClassesToElement(node)
    else
      utils.log "DOS"
      $(image_element).replaceWith(tmpl)

    utils.log $("[name='#{tmpl.attr('name')}']").attr("name")
    @replaceImg(image_element, $("[name='#{tmpl.attr('name')}']"))

    #in case we found that graf--image is nested element, unwrap * nested times
    n = $("[name='#{tmpl.attr('name')}']").parentsUntil(".section-inner").length
    unless n is 0
      for i in [0..n-1] by 1
        $("[name='#{tmpl.attr('name')}']").unwrap()

    #utils.log $("[name='#{tmpl.attr('name')}']").attr("name")

  replaceImg: (image_element, figure)->
    utils.log figure.attr("name")
    utils.log figure
    $(image_element).remove()
    img = new Image()
    img.src = image_element.src
    self = this
    img.onload = ()->
      utils.log "replace image with loaded info"
      utils.log figure.attr("name")
      utils.log(this.width + 'x' + this.height);

      ar = self.getAspectRatio(this.width, this.height)
      #debugger
      figure.find(".aspectRatioPlaceholder").css
        'max-width': ar.width
        'max-height': ar.height

      figure.find(".graf-image").attr
        "data-height": this.height
        "data-width": this.width

      figure.find(".aspect-ratio-fill").css
        "padding-bottom": "#{ar.ratio}%"

      #TODO: upload file to server
      #@uploadFile file, replaced_node

      figure.find("img").attr("src", image_element.src)

  displayAndUploadImages: (file)->
    @displayCachedImage file

  imageSelect: (ev)->
    $selectFile = $('<input type="file" multiple="multiple">').click()
    self = @
    $selectFile.change ()->
      t = this
      self.uploadFiles(t.files)

  displayCachedImage: (file)->
    @current_editor.tooltip_view.hide()

    reader = new FileReader()
    reader.onload = (e)=>
      img = new Image
      img.src = e.target.result
      node = @current_editor.getNode()
      self = this
      img.onload = ()->
        new_tmpl = $(self.insertTemplate())

        replaced_node = $( new_tmpl ).insertBefore($(node))

        img_tag = new_tmpl.find('img.graf-image').attr('src', e.target.result)
        img_tag.height = this.height
        img_tag.width  = this.width

        utils.log "UPLOADED SHOW FROM CACHE"

        ar = self.getAspectRatio(this.width, this.height)

        replaced_node.find(".aspectRatioPlaceholder").css
          'max-width': ar.width
          'max-height': ar.height

        replaced_node.find(".graf-image").attr
          "data-height": this.height
          "data-width": this.width

        replaced_node.find(".aspect-ratio-fill").css
          "padding-bottom": "#{ar.ratio}%"

        self.uploadFile file, replaced_node

    reader.readAsDataURL(file)

  getAspectRatio: (w , h)->
    maxWidth = 700
    maxHeight = 700
    ratio = 0
    width = w # Current image width
    height = h # Current image height

    # Check if the current width is larger than the max
    if width > maxWidth
      ratio = maxWidth / width # get ratio for scaling image
      height = height * ratio # Reset height to match scaled image
      width = width * ratio # Reset width to match scaled image

    # Check if current height is larger than max
    else if height > maxHeight
      ratio = maxHeight / height # get ratio for scaling image
      width = width * ratio # Reset width to match scaled image
      height = height * ratio # Reset height to match scaled image

    fill_ratio = height / width * 100
    result = { width: width, height: height, ratio: fill_ratio }
    utils.log result
    result

  formatData: (file)->
    formData = new FormData()
    formData.append('file', file)
    return formData

  uploadFiles: (files)=>
    acceptedTypes =
      "image/png": true
      "image/jpeg": true
      "image/gif": true

    i = 0
    while i < files.length
      file = files[i]
      if acceptedTypes[file.type] is true
        $(@placeholder).append "<progress class=\"progress\" min=\"0\" max=\"100\" value=\"0\">0</progress>"
        @displayAndUploadImages(file)
      i++

  uploadFile: (file, node)=>
    n = node
    handleUp = (jqxhr)=>
      @uploadCompleted jqxhr, n

    $.ajax
      type: "post"
      url: @current_editor.upload_url
      xhr: =>
        xhr = new XMLHttpRequest()
        xhr.upload.onprogress = @updateProgressBar
        xhr
      cache: false
      contentType: false

      success: (response) =>
        response = @current_editor.upload_callback(response) if @current_editor.upload_callback
        handleUp(response)
        return
      error: (jqxhr)=>
        utils.log("ERROR: got error uploading file #{jqxhr.responseText}")

      processData: false
      data: @formatData(file)

  updateProgressBar: (e)=>
    $progress = $('.progress:first', this.$el)
    complete = ""

    if (e.lengthComputable)
      complete = e.loaded / e.total * 100
      complete = complete ? complete : 0
      #$progress.attr('value', complete)
      #$progress.html(complete)
      utils.log "complete"
      utils.log complete

  uploadCompleted: (url, node)=>
    node.find("img").attr("src", url)
    #return false

  ###
  # Handles the behavior of deleting images when using the backspace key
  #
  # @param {Event} e    - The backspace event that is being handled
  # @param {Node}  node - The node the backspace was used in, assumed to be from te editor's getNode() function
  #
  # @return {Boolean} true if this function should scape the default behavior
  ###
  handleBackspaceKey: (e, node) =>
    utils.log "handleBackspaceKey on uploader widget"
   
    # remove graf figure if is selected but not in range (not focus on caption)
    if $(node).hasClass("is-selected") && $(node).hasClass("graf--figure")
      # exit if selection is on caption
      anchor_node = @current_editor.selection().anchorNode
      
      # return false unless backspace is in the first char
      if ( anchor_node? && $(anchor_node.parentNode).hasClass("imageCaption"))
        if @current_editor.isFirstChar()
          return true
        else
          return false

    else if $(".is-selected").hasClass("is-mediaFocused")
      # assume that select node is the current media element
      # if it's focused when backspace it means that it should be removed
      utils.log("Replacing selected node")
      @current_editor.replaceWith("p", $(".is-selected"))
      @current_editor.setRangeAt($(".is-selected")[0])
      return true
