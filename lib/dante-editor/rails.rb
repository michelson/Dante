module DanteEditor
  class Engine < ::Rails::Engine

    config.generators do |g|

      config.assets.paths << DanteEditor::Engine.root.join("docs", "fonts")
      config.assets.paths << DanteEditor::Engine.root.join("docs", "images")
      config.assets.paths << DanteEditor::Engine.root.join("docs")

      config.assets.paths << DanteEditor::Engine.root.join("app", "styles")


    end

  end
end