module Dante2Editor
  class Engine < ::Rails::Engine

    config.generators do |g|

      config.assets.paths << Dante2Editor::Engine.root.join("docs", "fonts")
      config.assets.paths << Dante2Editor::Engine.root.join("docs", "images")
      config.assets.paths << Dante2Editor::Engine.root.join("docs")

      config.assets.paths << Dante2Editor::Engine.root.join("src", "styles")


    end

  end
end