#a very light backbone.view like version

class Dante.View

  constructor: (opts = {})->
    @el = opts.el if opts.el
    @._ensureElement()
    @initialize.apply(@, arguments)
    @._ensureEvents()

  initialize: (opts={})->

  events: ->

  render: ()->
    return @

  remove: ()->
    @._removeElement()
    @.stopListening()
    return @

  _removeElement: ()->
    @.$el.remove();

  setElement: (element)->
    #@.undelegateEvents()
    @._setElement(element)
    #@.delegateEvents()
    return @

  setEvent: (opts)->
    console.log opts
    if !_.isEmpty(opts)
      _.each opts, (f, key)=>
        key_arr = key.split(" ")

        if _.isFunction(f)
          func =  f
        else if _.isString(f)
          func = @[f]
        else
          throw "error event needs a function or string"

        element = if key_arr.length > 1 then key_arr.splice(1 , 3).join(" ") else null

        $( @el ).on( key_arr[0], element, _.bind(func, this) )

  _ensureElement: ()->
    @.setElement(_.result(@, 'el'))

  _ensureEvents: ()->
    @.setEvent(_.result(@, 'events'))

  _setElement: (el)->
    @.$el = if el instanceof $ then el else $(el)
    @.el = @.$el[0]