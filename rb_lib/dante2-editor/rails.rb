module Dante2Editor
  class Engine < ::Rails::Engine

    # Redefines Rails::Engine::find_root to search in `rb_lib` instead of `lib`
    def self.find_root(from)
      find_root_with_flag "rb_lib", from
    end

    # Make the compiled assets in docs/* available to the AssetPipeline
    config.assets.paths << Dante2Editor::Engine.root.join("dist")
    config.assets.paths << Dante2Editor::Engine.root.join("src", "styles")
    config.assets.paths << Dante2Editor::Engine.root.join("src", "styles", "fonts")
    config.assets.paths << Dante2Editor::Engine.root.join("src", "images")
  end
end
