

window.editor = new Dante.Editor
  upload_url: "/images.json"
  el: "#editor1"

window.editor.start()

window.editor2 = new Dante.Editor
  el: "#editor2"

window.editor2.start()



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

QUnit.test "should init editor", ( assert )->
  assert.ok( !_.isEmpty(window.editor), "Passed!" )
  assert.ok( _.isObject(window.editor.tooltip_view), "Passed!" )
  assert.ok( _.isObject(window.editor.editor_menu), "Passed!" )

QUnit.test "should build tooltip & menu", ( assert )->
  assert.ok( !_.isEmpty( $(".inlineTooltip") ), "Passed!" )
  assert.ok( !_.isEmpty( $("#editor-menu") ), "Passed!" )

QUnit.test "should display placeholders when empty content", (assert)->
  assert.ok $(editor.el).find("span.defaultValue").length is 2 , "Passed!"

##CLEANER

QUnit.test "should clean spans", (assert)->
  assert.ok !$(editor2.el).find("a:first span").exists(), "Passed!"
  assert.ok !$(editor2.el).find(".section-inner div.class").exists(), "Passed!"
  assert.ok !$(editor2.el).find(".section-inner span:not(.defaultValue)").exists(), "Passed!"
  assert.ok !$(editor2.el).find(".section-inner p span").exists() , "Passed!"

QUnit.test "should detect existing images", (assert)->
  fig = $(editor2.el).find(".section-inner figure")

  assert.ok $(fig).exists() , "generate figure.graf--figure"
  assert.ok $(fig).find("img").exists() , "figure have image"
  assert.ok !_.isEmpty($(fig).find("img").attr('src')) , "and image src"

  assert.ok $(fig).find("figcaption").exists() , "and caption"
  assert.ok $(fig).find("figcaption span.defaultValue").exists() , "and caption span"
