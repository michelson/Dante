##COFFEE LIKE CLASS

class window.MyCustomCoffeeTooltip extends Dante.View.TooltipWidget

  initialize: (opts={})->
    #super
    @icon        = opts.icon  || "icon-video"
    @title       = opts.title || "Add a Custom Thing!"
    @action      = opts.action || "custom-embed"
    @current_editor = opts.current_editor

  handleClick: (ev)->
   alert("This is custom button with coffeescript extend style")


#BACKBONE STYLE EXTEND
window.MyCustomTooltip = Dante.View.TooltipWidget.extend(
  initialize: (opts={})->
    @icon        = opts.icon  || "icon-video"
    @title       = opts.title || "Add a Custom Thing!"
    @action      = opts.action || "custom-embed-simple"
    @current_editor = opts.current_editor

  handleClick: (ev)->
   alert("This is custom button with backbone extend style")

)



