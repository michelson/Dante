require 'rubygems'
# require 'middleman/rack'
require "sinatra/base"
require "sinatra/json"
require "rack/cors"
require "pry"
require "open-uri"

class UploadServer < Sinatra::Base

  use Rack::Static, :urls => ["/images"], :root => "tmp"

  use Rack::Cors do
    allow do
      origins '*'
      resource '*', :headers => :any, :methods => [:get, :post, :options]
    end
  end

  # Info
  get "/info" do
    "Dante Upload server, hello!"
  end

  # Handle POST-request (Receive and save the uploaded file)
  post "/new.?:format?" do
    content_type :json
    # to test locking system let the upload sleep por a while before response
    # sleep 10 
    if params[:file]
      handleFile
    else
      handleUrl
    end

    json :url=> "http://localhost:9292/uploads/images/#{@name}"
  end

  def handleUrl
    ext  = File.extname(URI.parse(params["url"]).path)
    @name = [Time.now.to_i , ext].join("-")
    path = File.join(File.dirname(__FILE__), 'tmp/images', @name)
    File.open(path, "wb") do |f|
      f.write(open(params["url"]).read)
    end
  end

  def handleFile
    @name = [Time.now.to_i , params['file'][:filename]].join("-")
    path = File.join(File.dirname(__FILE__), 'tmp/images', @name)
    
    File.open(path, "wb") do |f|
      f.write(params['url'][:tempfile].read)
    end
  end

end


#Mounts upload server & middleman app
run Rack::URLMap.new(
  # "/" => Middleman.server,
  "/uploads" => UploadServer.new
)