
class DistBuilder < Middleman::Extension

  def initialize(app, options_hash={}, &block)
    super

    app.after_build do |builder|
      app.config[:dist_dir] = "dist"
      FileUtils.rm_rf Dir.glob("#{app.config[:dist_dir]}/*")
      base_dist_path   = app.config[:dist_dir]
      dist_fonts_path  = File.join(base_dist_path, "fonts", "dante")
      dist_images_path = File.join(base_dist_path, "images", "dante")
      dist_js_path     = File.join(base_dist_path, "js")
      dist_css_path    = File.join(base_dist_path, "css")

      #FileUtils.rm_rf base_dist_path

      builder.say_status :dist_builder, "generating dist files"

      fonts_dir = File.join(app.config[:build_dir], app.config[:fonts_dir])
      FileUtils.mkdir_p dist_fonts_path
      FileUtils.cp_r "#{fonts_dir}/dante/.", dist_fonts_path, :verbose => true

      images_dir = File.join(app.config[:build_dir], app.config[:images_dir])
      FileUtils.mkdir_p dist_images_path
      FileUtils.cp_r "#{images_dir}/dante/.", dist_images_path, :verbose => true


      js_dir = File.join(app.config[:build_dir], app.config[:js_dir])
      FileUtils.mkdir_p dist_js_path
      FileUtils.cp "#{js_dir}/dante-editor.js", dist_js_path, :verbose => true


      css_dir = File.join(app.config[:build_dir], app.config[:css_dir])
      FileUtils.mkdir_p dist_css_path
      FileUtils.cp "#{css_dir}/dante-editor.css", dist_css_path, :verbose => true

      builder.say_status :dist_builder, "dist complete"

    end
  end

end

::Middleman::Extensions.register(:dist_builder, DistBuilder)



set :css_dir, 'assets/stylesheets'

set :js_dir, 'assets/javascripts'

set :images_dir, 'assets/images'

set :fonts_dir, 'assets/fonts'

#set :markdown_engine, :redcarpet
set :markdown_engine, :kramdown

page "/tests/*", :layout => "spec"
page '/api/*', :content_type => 'application/json', layout: false

sprockets.append_path File.join "#{root}", "bower_components"


# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  compass_config do |config|
    config.line_comments = false
  end

  activate :relative_assets
  set :relative_links, true
  activate :dist_builder

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_path, "/Content/images/"
end
