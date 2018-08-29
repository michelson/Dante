ghpages = require('gh-pages')

const pkg = require('package.json')

var callback = function(data){
  console.log("oeoeoe")
  console.log(data);
}

ghpages.publish('.docz/dist', {
  branch: 'gh-pages',
  repo: pkg.repository.url
}, callback);