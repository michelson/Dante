
require 'pry'
require 'json'
require 'active_support'
require "active_support/core_ext"


string = "hola como estas"
blocks = {
	blocks: [
		{"offset"=>3, "length"=>3, "style"=>"CUSTOM_COLOR_#db2929"},
  	{"offset"=>5, "length"=>10, "style"=>"BOLD"},
  	{"offset"=>5, "length"=>4, "style"=>"ITALIC"}
	]
}
block_hash = ActiveSupport::HashWithIndifferentAccess.new(blocks)
ranges = block_hash[:blocks]

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

# [[], [], [], [0], [0], [0, 1, 2], [1, 2], [1, 2], [1, 2], [1], [1], [1], [1], [1], [1]]


groups = [{text: "", marks: []}]
current_group = 0
refs.each_with_index{|o,i|
  groups[current_group][:text] << r[i].to_s
	groups[current_group][:marks] = o
  if refs[i+1] != refs[i]
    current_group += 1
    groups.push({text: "", marks: []})
  end
}

def convert_ranges(range)
	case range[:style]
	when "BOLD" then { type: 'bold' }
	when "ITALIC" then { type: 'italic' }
	else
		if range[:style].include?('CUSTOM_COLOR_')
			color = range[:style].gsub("CUSTOM_COLOR_", "")
			{
				"type": "textStyle",
				"attrs": {
						"color": color
				}
			}
		end
	end
end

final_groups = groups.map{|o| 
	o.merge!( marks: o[:marks].map{|o| convert_ranges(ranges[o]) } )
	o = { text: o[:text] } if o[:marks].blank?
	o
}

binding.pry

