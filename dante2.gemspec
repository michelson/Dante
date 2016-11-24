# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'dante2-editor/version'

Gem::Specification.new do |gem|
  gem.name          = "dante2-editor"
  gem.version       = Dante2Editor::VERSION
  gem.authors       = ["Miguel Michelson", "Cristian Ferrari"]
  gem.email         = ["miguelmichelson@gmail.com", "cristianferrarig@gmail.com"]
  gem.description   = %q{dante-editor yet another Medium editor clone.}
  gem.summary       = %q{dante-editor yet another Medium editor clone.}
  gem.homepage      = "http://michelson.github.io/Dante/"

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
end
