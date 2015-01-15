utils = Dante.utils

class Dante.Editor.Menu extends Dante.View
  el: "#dante-menu"

  events:
    "mousedown li" : "handleClick"
    "click .dante-menu-linkinput .dante-menu-button": "closeInput"
    "keypress input": "handleInputEnter"

  initialize: (opts={})=>
    @config = opts.buttons || @default_config()
    @current_editor = opts.editor

    @commandsReg = {
      block: /^(?:p|h[1-6]|blockquote|pre)$/
      inline: /^(?:bold|italic|underline|insertorderedlist|insertunorderedlist|indent|outdent)$/,
      source: /^(?:insertimage|createlink|unlink)$/
      insert: /^(?:inserthorizontalrule|insert)$/
      wrap: /^(?:code)$/
    }

    @lineBreakReg = /^(?:blockquote|pre|div|p)$/i;

    @effectNodeReg = /(?:[pubia]|h[1-6]|blockquote|[uo]l|li)/i;

    @strReg =
      whiteSpace: /(^\s+)|(\s+$)/g,
      mailTo: /^(?!mailto:|.+\/|.+#|.+\?)(.*@.*\..+)$/,
      http: /^(?!\w+?:\/\/|mailto:|\/|\.\/|\?|#)(.*)$/

  default_config: ()->
    ###
    buttons: [
        'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule',
        'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
      ]
    ###

    buttons: ['bold', 'italic', 'h2', 'h3', 'h4', 'blockquote', 'createlink']

  template: ()=>
    html = "<div class='dante-menu-linkinput'><input class='dante-menu-input' placeholder='http://'><div class='dante-menu-button'>x</div></div>"
    html += "<ul class='dante-menu-buttons'>"
    _.each @config.buttons, (item)->
      html += "<li class='dante-menu-button'><i class=\"dante-icon icon-#{item}\" data-action=\"#{item}\"></i></li>"
    html += "</ul>"
    html

  render: ()=>
    $(@el).html(@template())
    @show()

  handleClick: (ev)->
    element   = $(ev.currentTarget).find('.dante-icon')
    action    = element.data("action")
    input     = $(@el).find("input.dante-menu-input")
    utils.log("menu #{action} item clicked!")
    @savedSel = utils.saveSelection()

    if /(?:createlink)/.test(action)
      if $(ev.currentTarget).hasClass("active")
        @removeLink()
      else
        $(@el).addClass("dante-menu--linkmode")
        input.focus()
    else
      @menuApply action

    return false

  closeInput: (e)->
    $(@el).removeClass("dante-menu--linkmode")
    false

  handleInputEnter: (e)=>
    if (e.which is 13)
      utils.restoreSelection(@savedSel)
      return @createlink( $(e.target) )

  removeLink: ()->
    @menuApply "unlink"
    elem = @current_editor.getNode()
    @current_editor.cleanContents($(elem))

  createlink: (input) =>
    $(@el).removeClass("dante-menu--linkmode")
    if input.val()
      inputValue = input.val()
      .replace(@strReg.whiteSpace, "")
      .replace(@strReg.mailTo, "mailto:$1")
      .replace(@strReg.http, "http://$1")
      return @menuApply("createlink", inputValue)
    action = "unlink"
    @menuApply action

  menuApply: (action, value)->

    if @commandsReg.block.test(action)
      utils.log "block here"
      @commandBlock action
    else if @commandsReg.inline.test(action) or @commandsReg.source.test(action)
      utils.log "overall here"
      @commandOverall action, value
    else if @commandsReg.insert.test(action)
      utils.log "insert here"
      @commandInsert action
    else if @commandsReg.wrap.test(action)
      utils.log "wrap here"
      @commandWrap action
    else
      utils.log "can't find command function for action: " + action

    return false

  setupInsertedElement: (element)->
    n = @current_editor.addClassesToElement(element)
    @current_editor.setElementName(n)
    @current_editor.markAsSelected(n)

  cleanContents: ()->
    @current_editor.cleanContents()

  commandOverall: (cmd, val) ->
    message = " to exec 「" + cmd + "」 command" + ((if val then (" with value: " + val) else ""))

    if document.execCommand(cmd, false, val)
      utils.log "success" + message
      n = @current_editor.getNode()
      @current_editor.setupLinks($(n).find("a"))
      @displayHighlights()
      if $(n).parent().hasClass("section-inner")
        n = @current_editor.addClassesToElement(n)
        @current_editor.setElementName(n)
      @current_editor.handleTextSelection(n)
    else
      utils.log "fail" + message, true
    return

  commandInsert: (name) ->
    node = @current_editor.current_node
    return unless node
    @current_editor.current_range.selectNode node
    @current_editor.current_range.collapse false
    @commandOverall node, name

  commandBlock: (name) ->
    node = @current_editor.current_node
    list = @effectNode(@current_editor.getNode(node), true)
    name = "p" if list.indexOf(name) isnt -1
    @commandOverall "formatblock", name

  commandWrap: (tag) ->
    node = @current_editor.current_node
    val = "<" + tag + ">" + selection + "</" + tag + ">"
    @commandOverall "insertHTML", val

  # node effects
  effectNode: (el, returnAsNodeName) ->
    nodes = []
    el = el or @current_editor.$el[0]
    while el isnt @current_editor.$el[0]
      if el.nodeName.match(@effectNodeReg)
        nodes.push (if returnAsNodeName then el.nodeName.toLowerCase() else el)
      el = el.parentNode
    nodes

  displayHighlights: ()->
    #remove all active links
    $(@el).find(".active").removeClass("active")

    nodes = @effectNode(utils.getNode())
    utils.log(nodes)
    _.each nodes, (node)=>
      tag = node.nodeName.toLowerCase()
      switch tag
        when "a"
          $(@el).find('input').val $(node).attr("href")
          tag = "createlink"
        when "i"
          tag = "italic"
        when "u"
          tag = "underline"
        when "b"
          tag = "bold"
        when "code"
          tag = "code"
        when "ul"
          tag = "insertunorderedlist"
        when "ol"
          tag = "insertorderedlist"
        when "li"
          tag = "indent"
          utils.log "nothing to select"

      if tag.match /(?:h[1-6])/i
        $(@el).find(".icon-bold, .icon-italic, .icon-blockquote")
        .parent("li").remove()
      else if tag is "indent"
        $(@el).find(".icon-h2, .icon-h3, .icon-h4, .icon-blockquote")
        .parent("li").remove()
        #.parent("li").hide()
        #.addClass("hidden")

      @highlight(tag)

  highlight: (tag)->
    $(".icon-#{tag}").parent("li").addClass("active")

  show: ()->
    $(@el).addClass("dante-menu--active")
    @closeInput()
    @displayHighlights()

  hide: ()->
    $(@el).removeClass("dante-menu--active")
