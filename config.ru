require 'rubygems'
require 'middleman/rack'

class UploadServer < Sinatra::Base

  use Rack::Static, :urls => ["/images"], :root => "tmp"
  # Info
  get "/info" do
    "Dante Upload server, hello!"
  end

  # Handle POST-request (Receive and save the uploaded file)
  post "/new.?:format?" do

    name = [Time.now.to_i , params['file'][:filename]].join("-")
    path = File.join(File.dirname(__FILE__), 'tmp/images', name)
    File.open(path, "wb") do |f|
      f.write(params['file'][:tempfile].read)
    end

    return "/uploads/images/#{name}"
  end

end


#Mounts upload server & middleman app
run Rack::URLMap.new(
  "/" => Middleman.server,
  "/uploads" => UploadServer.new
)