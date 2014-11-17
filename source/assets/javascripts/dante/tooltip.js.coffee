utils = Dante.utils

class Dante.Editor.Tooltip extends Dante.View
  el: ".inlineTooltip2"

  events:
    "click .button--inlineTooltipControl" : "toggleOptions"
    "click .inlineTooltip2-menu .button" : "handleClick"

  initialize: (opts = {})=>
    @current_editor = opts.editor
    @buttons = [
      {icon: "fa-camera", title: "Add an image", action: "image"},
      {icon: "fa-play", title: "Add a video", action: "embed"},
      {icon: "fa-code", title: "Add an embed", action: "embed-extract"}
    ]
    #TODO: include section splitter
    #icon: "fa-minus", title: "Add a new part", action: "hr"

  template: ()->
    menu = ""
    _.each @buttons, (b)->
      data_action_value = if b.action_value then "data-action-value='#{b.action_value}'" else  ""
      menu += "<button class='button button--small button--circle button--neutral button--scale u-transitionSeries' title='#{b.title}' data-action='inline-menu-#{b.action}' #{data_action_value}>
        <span class='fa #{b.icon}'></span>
      </button>"

    "<button class='button button--small button--circle button--neutral button--inlineTooltipControl' title='Close Menu' data-action='inline-menu'>
        <span class='fa fa-plus'></span>
    </button>
    <div class='inlineTooltip2-menu'>
      #{menu}
    </div>"

  insertTemplate: ()->
    "<figure contenteditable='false' class='graf graf--figure is-defaultValue' name='#{utils.generateUniqueName()}' tabindex='0'>
      <div style='' class='aspectRatioPlaceholder is-locked'>
        <div style='padding-bottom: 100%;' class='aspect-ratio-fill'></div>
        <img src='' data-height='375' data-width='600' data-image-id='' class='graf-image' data-delayed-src=''>
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
    $(@el).show()

  toggleOptions: ()=>
    utils.log "Toggle Options!!"
    $(@el).toggleClass("is-active is-scaled")

  move: (coords)->
    $(@el).offset(coords)

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
      @current_editor.preCleanNode($(node))
      @current_editor.addClassesToElement(node)
    else
      utils.log "DOS"
      $(image_element).replaceWith(tmpl)

    utils.log tmpl.attr('name')
    @replaceImg(image_element, $("[name='#{tmpl.attr('name')}']"))

  replaceImg: (image_element, figure)->
    #set image dimensions
    #TODO: maybe limit with default max-heigth ?
    utils.log figure.attr("name")
    utils.log figure

    $(image_element).remove()

    img = new Image()
    img.onload = ()->
      console.log "and here comes the water!"
      console.log(figure)
      console.log(this.width + 'x' + this.height);
      figure.find(".aspectRatioPlaceholder").css
        'max-width': this.width
        'max-height': this.height
        'height': this.height
      figure.find("img").attr({'data-height': this.height, 'data-width': this.width})
      figure.find("img").attr('src', image_element.src )
    img.src = image_element.src

  displayAndUploadImages: (file)->
    @displayCachedImage file

  imageSelect: (ev)->
    $selectFile = $('<input type="file" multiple="multiple">').click()
    self = @
    $selectFile.change ()->
      t = this
      self.uploadFiles(t.files)

  displayCachedImage: (file)->
    @node = @current_editor.getNode()
    @current_editor.tooltip_view.hide()

    reader = new FileReader()
    reader.onload = (e)=>
      i = new Image
      i.src = e.target.result

      new_tmpl = $(@insertTemplate())

      replaced_node = $( new_tmpl ).insertBefore($(@node))

      img_tag = new_tmpl.find('img.graf-image').attr('src', e.target.result)
      img_tag.height = i.height
      img_tag.width  = i.width
      unless i.width is 0 || i.height is 0
        utils.log "UPLOADED SHOW FROM CACHE"

        replaced_node.find(".aspectRatioPlaceholder").css
          'max-width': i.width
          'max-height': i.height

        @uploadFile file, replaced_node

    reader.readAsDataURL(file)

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
    @node_name = $(node).attr("name")
    $.getJSON("#{@current_editor.oembed_url}#{$(@node).text()}").success (data)=>
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
    @node_name = $(node).attr("name")
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
    $(@el).hide()
    $(@el).removeClass("is-active is-scaled")
