utils = Dante.utils

class Dante.Editor.Tooltip extends Dante.View
  el: ".inlineTooltip"

  events:
    "click .inlineTooltip-button.control" : "toggleOptions"
    "click .inlineTooltip-menu button" : "handleClick"

  initialize: (opts = {})=>
    @current_editor = opts.editor
    @buttons = [
      {icon: "icon-image", title: "Add an image", action: "image"},
      {icon: "icon-video", title: "Add a video",  action: "embed"},
      {icon: "icon-embed", title: "Add an embed", action: "embed-extract"}
    ]
    #TODO: include section splitter
    #icon: "fa-minus", title: "Add a new part", action: "hr"

  template: ()->
    menu = ""
    _.each @buttons, (b)->
      data_action_value = if b.action_value then "data-action-value='#{b.action_value}'" else  ""
      menu += "<button class='inlineTooltip-button scale' title='#{b.title}' data-action='inline-menu-#{b.action}' #{data_action_value}>
        <span class='tooltip-icon #{b.icon}'></span>
      </button>"

    "<button class='inlineTooltip-button control' title='Close Menu' data-action='inline-menu'>
        <span class='tooltip-icon icon-plus'></span>
    </button>
    <div class='inlineTooltip-menu'>
      #{menu}
    </div>"

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

  extractTemplate: ()->
    "<div class='graf graf--mixtapeEmbed is-selected' name=''>
      <a target='_blank' data-media-id='' class='js-mixtapeImage mixtapeImage mixtapeImage--empty u-ignoreBlock' href=''>
      </a>
      <a data-tooltip-type='link' data-tooltip-position='bottom' data-tooltip='' title='' class='markup--anchor markup--mixtapeEmbed-anchor' data-href='' href='' target='_blank'>
        <strong class='markup--strong markup--mixtapeEmbed-strong'></strong>
        <em class='markup--em markup--mixtapeEmbed-em'></em>
      </a>
    </div>"

  embedTemplate: ()->
    "<figure contenteditable='false' class='graf--figure graf--iframe graf--first' name='504e' tabindex='0'>
      <div class='iframeContainer'>
        <iframe frameborder='0' width='700' height='393' data-media-id='' src='' data-height='480' data-width='854'>
        </iframe>
      </div>
      <figcaption contenteditable='true' data-default-value='Type caption for embed (optional)' class='imageCaption'>
        <a rel='nofollow' class='markup--anchor markup--figure-anchor' data-href='' href='' target='_blank'>

        </a>
      </figcaption>
    </figure>"

  render: ()=>
    $(@el).html(@template())
    $(@el).addClass("is-active")
    @

  toggleOptions: ()=>
    utils.log "Toggle Options!!"
    $(@el).toggleClass("is-scaled")
    return false

  move: (coords)->
    tooltip         = $(@el)
    control_width   = tooltip.find(".control").css("width")
    control_spacing = tooltip.find(".inlineTooltip-menu").css("padding-left")
    pull_size       = parseInt(control_width.replace(/px/,"")) + parseInt(control_spacing.replace(/px/,""))
    coord_left      = coords.left - pull_size
    coord_top       = coords.top

    $(@el).offset(top: coord_top, left: coord_left)

  handleClick: (ev)->
    name = $(ev.currentTarget).data('action')
    utils.log name
    switch name
      when "inline-menu-image"
        @placeholder = "<p>PLACEHOLDER</p>"
        @imageSelect(ev)
      when "inline-menu-embed"
        @displayEmbedPlaceHolder()
      when "inline-menu-embed-extract"
        @displayExtractPlaceHolder()
      when "inline-menu-hr"
        @splitSection()
    return false
  #UPLOADER

  #replace existing img tag , and wrap it in insertTamplate
  #TODO: take the url and upload it
  uploadExistentImage: (image_element, opts = {})->

    utils.log ("process image here!")
    tmpl = $(@insertTemplate())
    tmpl.find("img").attr('src', @current_editor.default_loading_placeholder )
    #is a child element or a first level element ?

    if $(image_element).parents(".graf").length > 0
      #return if its already wrapped in graf--figure
      if $(image_element).parents(".graf").hasClass("graf--figure")
        return
      utils.log "UNO"
      tmpl.insertBefore( $(image_element).parents(".graf") )
      node = @current_editor.getNode()
      if node
        @current_editor.preCleanNode($(node))
        @current_editor.addClassesToElement(node)
    else
      utils.log "DOS"
      img = $(image_element).parentsUntil(".section-inner").first()
      $(img).replaceWith(tmpl)

    utils.log $("[name='#{tmpl.attr('name')}']").attr("name")
    @replaceImg(image_element, $("[name='#{tmpl.attr('name')}']"))

    #in case we found that graf--image is nested element, unwrap * nested times
    n = $("[name='#{tmpl.attr('name')}']").parentsUntil(".section-inner").length
    unless n is 0
      for i in [0..n-1] by 1
        $("[name='#{tmpl.attr('name')}']").unwrap()

    utils.log "FIG"
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

  ## EMBED
  displayEmbedPlaceHolder: ()->
    ph = @current_editor.embed_placeholder
    @node = @current_editor.getNode()
    $(@node).html(ph).addClass("is-embedable")

    @current_editor.setRangeAt(@node)
    @hide()
    false

  getEmbedFromNode: (node)=>
    @node = $(node)
    @node_name = @node.attr("name")
    @node.addClass("spinner")

    $.getJSON("#{@current_editor.oembed_url}#{$(@node).text()}")
      .success (data)=>
        @node = $("[name=#{@node_name}]")
        iframe_src = $(data.html).prop("src")
        tmpl = $(@embedTemplate())
        tmpl.attr("name", @node.attr("name"))
        $(@node).replaceWith(tmpl)
        replaced_node = $(".graf--iframe[name=#{@node.attr("name")}]")
        replaced_node.find("iframe").attr("src", iframe_src)
        url = data.url || data.author_url
        utils.log "URL IS #{url}"
        replaced_node.find(".markup--anchor").attr("href", url ).text(url)
        @hide()

  ##EXTRACT
  displayExtractPlaceHolder: ()->
    ph = @current_editor.extract_placeholder
    @node = @current_editor.getNode()
    $(@node).html(ph).addClass("is-extractable")

    @current_editor.setRangeAt(@node)
    @hide()
    false

  getExtractFromNode: (node)=>
    @node = $(node)
    @node_name = @node.attr("name")
    @node.addClass("spinner")

    $.getJSON("#{@current_editor.extract_url}#{$(@node).text()}").success (data)=>
      @node = $("[name=#{@node_name}]")
      iframe_src = $(data.html).prop("src")
      tmpl = $(@extractTemplate())
      tmpl.attr("name", @node.attr("name"))
      $(@node).replaceWith(tmpl)
      replaced_node = $(".graf--mixtapeEmbed[name=#{@node.attr("name")}]")
      replaced_node.find("strong").text(data.title)
      replaced_node.find("em").text(data.description)
      replaced_node.append(data.provider_url)
      replaced_node.find(".markup--anchor").attr("href", data.url )
      unless _.isEmpty data.images
        image_node = replaced_node.find(".mixtapeImage")
        image_node.css("background-image", "url(#{data.images[0].url})")
        image_node.removeClass("mixtapeImage--empty u-ignoreBlock")
      @hide()

  getExtract: (url)=>
    $.getJSON("#{@current_editor.extract_url}#{url}").done (data)->
      utils.log(data)

  cleanOperationClasses: (node)->
    node.removeClass("is-embedable is-extractable")

  hide: ()=>
    $(@el).removeClass("is-active is-scaled")
