window.editor = new Dante.Editor
  upload_url: "/images.json"
  el: "#editor1"

window.editor.start()

QUnit.test "should initialize editor", ( assert )->
  assert.ok( _.isObject(window.editor), "Passed!" )
