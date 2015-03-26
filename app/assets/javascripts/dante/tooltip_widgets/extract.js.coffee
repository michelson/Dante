utils = Dante.utils

class Dante.View.TooltipWidget.EmbedExtract extends Dante.View.TooltipWidget

  initialize: (opts={})->
    @icon        = opts.icon  || "icon-embed"
    @title       = opts.title || "Add an embed"
    @action      = opts.action || "embed-extract"
    @current_editor = opts.current_editor

  handleClick: (ev)->
    @displayExtractPlaceHolder(ev)

  handleEnterKey: (ev, $node)->
    if $node.hasClass("is-extractable")
      @getExtractFromNode($node)

  extractTemplate: ()->
    "<div class='graf graf--mixtapeEmbed is-selected' name=''>
      <a target='_blank' data-media-id='' class='js-mixtapeImage mixtapeImage mixtapeImage--empty u-ignoreBlock' href=''>
      </a>
      <a data-tooltip-type='link' data-tooltip-position='bottom' data-tooltip='' title='' class='markup--anchor markup--mixtapeEmbed-anchor' data-href='' href='' target='_blank'>
        <strong class='markup--strong markup--mixtapeEmbed-strong'></strong>
        <em class='markup--em markup--mixtapeEmbed-em'></em>
      </a>
    </div>"

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

    $.getJSON("#{@current_editor.extract_url}#{$(@node).text()}")
    .success (data)=>
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
    .error (data)=>
      @node.removeClass("spinner")

  getExtract: (url)=>
    $.getJSON("#{@current_editor.extract_url}#{url}").done (data)->
      utils.log(data)
