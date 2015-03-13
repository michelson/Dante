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


# Helper function to correctly set up the prototype chain, for subclasses.
# Similar to `goog.inherits`, but uses a hash of prototype properties and
# class properties to be extended.

# This is borrowed from Backbone .extend function

extend = (protoProps, staticProps) ->
  parent = this
  child = undefined
  # The constructor function for the new subclass is either defined by you
  # (the "constructor" property in your `extend` definition), or defaulted
  # by us to simply call the parent's constructor.
  if protoProps and _.has(protoProps, 'constructor')
    child = protoProps.constructor
  else

    child = ->
      parent.apply this, arguments

  # Add static properties to the constructor function, if supplied.
  _.extend child, parent, staticProps
  # Set the prototype chain to inherit from `parent`, without calling
  # `parent`'s constructor function.

  Surrogate = ->
    @constructor = child
    return

  Surrogate.prototype = parent.prototype
  child.prototype = new Surrogate
  # Add prototype properties (instance properties) to the subclass,
  # if supplied.
  if protoProps
    _.extend child.prototype, protoProps
  # Set a convenience property in case the parent's prototype is needed
  # later.
  child.__super__ = parent.prototype
  child

  #Set up inheritance for the model, collection, router, view and history.
  #Dante.View.extend = utils.extend;

Dante.View.extend = extend