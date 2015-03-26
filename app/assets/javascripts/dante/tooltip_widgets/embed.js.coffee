utils = Dante.utils

class Dante.View.TooltipWidget.Embed extends Dante.View.TooltipWidget

  initialize: (opts={})->
    @icon        = opts.icon  || "icon-video"
    @title       = opts.title || "Add a video"
    @action      = opts.action || "embed"
    @current_editor = opts.current_editor

  handleClick: (ev)->
    @displayEmbedPlaceHolder(ev)

  handleEnterKey: (ev, $node)->
    if $node.hasClass("is-embedable")
      @getEmbedFromNode($node);

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
      .error (res)=>
        @node.removeClass("spinner")

