class window.MyCustomTooltip extends Dante.Editor.Tooltip

  initialize: (opts = {})=>
    super
    @buttons.push(
      {icon: "icon-image",
      title: "Add an image",
      action: "image2"}
    )

  render: ()->
    super
    $btn = $('.inlineTooltip-button[data-action=inline-menu-image2]')
    $btn.on("click", ()=>
      @handleImage2Click()
    )
    @

  handleImage2Click: ()->
    alert("hello world")
    false
