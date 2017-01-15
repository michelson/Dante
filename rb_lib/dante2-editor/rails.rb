module Dante2Editor
  class Engine < ::Rails::Engine

    # Redefines Rails::Engine::find_root to search in `rb_lib` instead of `lib`
    def self.find_root(from)
      find_root_with_flag "rb_lib", from
    end

    config.generators do |g|

      config.assets.paths << Dante2Editor::Engine.root.join("docs", "fonts")
      config.assets.paths << Dante2Editor::Engine.root.join("docs", "images")
      config.assets.paths << Dante2Editor::Engine.root.join("docs")

      config.assets.paths << Dante2Editor::Engine.root.join("app", "styles")


    end

  end
end