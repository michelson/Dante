module DanteEditor
  class Engine < ::Rails::Engine

    config.generators do |g|

      config.assets.paths << DanteEditor::Engine.root.join("dante", "fonts")
      config.assets.paths << DanteEditor::Engine.root.join("dante", "images")
      config.assets.paths << DanteEditor::Engine.root.join("dante")

    end

  end
end