
require 'pry'
require 'json'
require 'active_support'
require "active_support/core_ext"

class TextProcessor
  def self.convert(content)
    c = ActiveSupport::HashWithIndifferentAccess.new(content)
    out = c[:blocks].map do |item|
      item.merge!(entityMap: c["entityMap"])
      puts item[:type]
      case item[:type]
      when "unstyled" then process_text(item, {type: 'paragraph'})
      when "header-one" then process_text(item, {type: 'heading', "attrs":{"level":1}})
      when "header-two" then process_text(item, {type: 'heading', "attrs":{"level":2}})
      when "header-three" then process_text(item, {type: 'heading', "attrs":{"level":3}})
      when "divider" then process_divider(item, {type: 'DividerBlock'})
      when "code-block" then process_code(item, {type: 'codeBlock'})
      when 'image' then process_image(item, {type: 'imageBlock'})
      when 'embed' then process_embed(item, {type: 'EmbedBlock'})
      when 'video' then process_video_embed(item, {type: 'VideoBlock'})
      when 'recorded-video' then process_video_recording(item, {type: 'VideoRecorderBlock'})
      end
    end
  
    doc = {
      "type": "doc",
      "content": out.compact
    }
  end

  def self.link(entity)
    {
      "type":"link",
      "attrs":{
        "href": entity[:data][:url],
        "target":"_blank"
      }
    }
  end

  def self.convert_ranges(range, item)
    case range[:style]
    when "BOLD" then { type: 'bold' }
    when "ITALIC" then { type: 'italic' }
    else
      if range.key?(:style) && range[:style].include?('CUSTOM_COLOR_')
        color = range[:style].gsub("CUSTOM_COLOR_", "")
        {
          "type": "textStyle",
          "attrs": {
              "color": color
          }
        }
      elsif range.key?(:key) && 
        entity = item[:entityMap][range[:key].to_s] and entity
        entity_format = case entity[:type]
        when "LINK" then link(entity)
        end
        entity_format
      end
    end
  end

  def self.process_text(item, kind, attrs=nil)

    string = item[:text]
    ranges = item[:inlineStyleRanges] + item[:entityRanges]

    i = 0
    r = string.split("").inject({}){|res, l| res[i]= l;  i+=1 ; res }
    # {0=>h, 1=>l ...}

    refs = r.map{|k,v|
      arr = []
      ranges.each_with_index do |o, i|
        range = (o[:offset]..(o[:offset]+o[:length]-1))
        #puts "#{k} in #{range}"
        arr << i if (range).include?(k)
      end
      arr
    }

    #=> [[], [], [], [0], [0], [0, 1, 2], [1, 2], [1, 2], [1, 2], [1], [1], [1], [1], [1], [1]]


    groups = [{text: "", marks: []}]
    current_group = 0
    refs.each_with_index{|o,i|
      groups[current_group][:text] << r[i].to_s
      groups[current_group][:marks] = o
      #puts "index #{i} -- #{o}, #{refs[i+1] != refs[i]} #{refs[i+1]} #{refs[i]}"
      #binding.pry if refs[i+1] != refs[i]
      if refs[i+1] && refs[i+1] != refs[i]
        current_group += 1
        groups.push({text: "", marks: []})
      end
    }

    #=> [{:text=>"hol", :marks=>[...]},...]

    final_groups = groups.map{|o| 
      o.merge!( type: 'text', marks: o[:marks].map{|o| convert_ranges(ranges[o], item) } )
      o = { text: o[:text], type: 'text' } if o[:marks].blank?
      o
    }.reject{|o| o[:text].empty? }

    { 
      content: final_groups
    }.merge(kind)

  end

  def self.process_image(item, kind)
    {
      "type":"ImageBlock",
      "attrs": item["data"]
    }
  end

  def self.process_divider(item, kind)
    {"type":"DividerBlock"}
  end

  def self.process_code(item, kind)
    {
      "type":"codeBlock",
      "attrs":{"language": 'auto'},
      "content":[
        {
          "type":"text",
          "text": item[:text]
        }
      ]
    }
  end

  def self.process_embed(item, kind)
    {
      "type":"EmbedBlock",
      "attrs":{
        "embed_data": item[:data][:embed_data]
      }
    }
  end

  def self.process_video_embed(item, kind)
    {"type":"VideoBlock",
      "attrs":{
      "embed_data": item[:data][:embed_data],
      "provisory_text":item[:data][:provisory_text]
      },
      "content":[
        {
          "text":item[:data][:provisory_text],
          "type": 'text'
        }
      ]
    }
  end

  def self.process_video_recording(item, kind)
    {
      "type":"VideoRecorderBlock",
      "attrs": item[:data]
    }
  end

end

cc = JSON.parse(
  "{\"blocks\":[{\"key\":\"f1qmb\",\"text\":\"https://www.youtube.com  ihoij oij\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":17,\"length\":3,\"style\":\"CUSTOM_COLOR_#dd1010\"},{\"offset\":28,\"length\":4,\"style\":\"BOLD\"}],\"entityRanges\":[{\"offset\":0,\"length\":24,\"key\":0}],\"data\":{\"rejectedReason\":\"\",\"secondsLeft\":0,\"fileReady\":true,\"paused\":false,\"url\":\"/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaFFHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4664966424744f6acc1eed3be6667bf6e73dda8b/recorded\",\"recording\":false,\"granted\":true,\"loading\":false,\"direction\":\"center\"}}],\"entityMap\":{\"0\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://www.youtube.com \"}}}}"
)


# ranges.group_by{|o| o[:offset] if ranges.select{|e| e[:offset].between?(o[:offset],o[:offset]+o[:length]) }  }

puts "INITIAL"
puts cc
puts "FINAL"
puts TextProcessor.convert(cc).to_json

