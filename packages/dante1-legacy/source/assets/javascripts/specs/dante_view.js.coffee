
class TestView extends Dante.View

class TestViewWithEl extends Dante.View
  el: "#view"
  initialize: ()->
    @model = {foo: "bar"}
    super

class TestViewWithEvents extends Dante.View
  el: "#view"
  initialize: ->
    @one = false
    @two = false
    @some_var = 1

  events:
    "click" : (ev)->
      console.log("CLICKED ANYWHERE")
      @anywhere = true
      return false

    "click .one" : (ev)->
      @one = true
      console.log("CLICKED .one YEAH, #{@one}")
      return false

    "click .two" : "handleClickTwo"

  handleClickTwo: (ev)->
    @two = true
    console.log("CLICKED .two YEAH, #{@two}")
    console.log(ev.currentTarget)

    return false

class TestViewOpts extends Dante.View
  el: "#view"
  initialize: (opts={})->

    @model = opts.model

window.view = new TestView

window.view2 = new TestView(el: "#view")
window.view3 = new TestViewWithEl

window.event_view = new TestViewWithEvents
window.opts_view = new TestViewOpts(model: 1234)

QUnit.test "should initialize view without el", ( assert )->
  assert.ok( _.isObject(view), "Passed!" )
  assert.ok( _.isUndefined(view.el), "Passed!" )

QUnit.test "should initialize view with el", ( assert )->
  assert.ok( _.isElement(view2.el), "Passed!" )
  assert.ok( _.isElement(view3.el), "Passed!" )

QUnit.test "should initialize view with @model", ( assert )->
  assert.ok( !_.isEmpty(view3.model), "Passed!" )

QUnit.test "should set variable on click", ( assert )->
  event_view.$el.find("a.one").trigger("click")
  event_view.$el.find("a.two").trigger("click")
  assert.ok( event_view.one, "Passed!" )
  assert.ok( event_view.two, "Passed!" )

QUnit.test "should set vars on initialize", ( assert )->
  assert.ok( event_view.some_var is 1, "Passed!" )

QUnit.test "should set windows.vars on initialize", ( assert )->
  assert.ok( opts_view.model is 1234 , "Passed!" )


