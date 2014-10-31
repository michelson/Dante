window.editor = new Editor.MainEditor
  upload_url: "/images.json"
  el: "#editor1"

window.editor.start()

QUnit.test "should initialize editor", ( assert )->
  assert.ok( _.isObject(window.editor), "Passed!" )

QUnit.test "should init editor defaults", ( assert )->
  assert.ok( !_.isEmpty(window.editor.title_placeholder), "Passed!" )
  assert.ok( !_.isEmpty(window.editor.body_placeholder), "Passed!" )
  assert.ok( !_.isEmpty(window.editor.embed_placeholder), "Passed!" )
  assert.ok( !_.isEmpty(window.editor.extract_placeholder), "Passed!" )

  assert.ok( !_.isEmpty(window.editor.upload_url), "Passed!" )
  assert.ok( !_.isEmpty(window.editor.oembed_url), "Passed!" )
  assert.ok( !_.isEmpty(window.editor.extract_url), "Passed!" )

QUnit.test "should init current_editor", ( assert )->
  assert.ok( !_.isEmpty(window.current_editor), "Passed!" )
  assert.ok( _.isObject(window.current_editor.tooltip_view), "Passed!" )
  assert.ok( _.isObject(window.current_editor.editor_menu), "Passed!" )

QUnit.test "should build tooltip & menu", ( assert )->
  assert.ok( !_.isEmpty( $(".inlineTooltip2") ), "Passed!" )
  assert.ok( !_.isEmpty( $("#editor-menu") ), "Passed!" )