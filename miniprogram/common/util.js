var util = {};
util.stringnify_path = function (url, data) {
  url = url+'?'
  for(var attr in data) {
    url += attr+'='+data[attr]+'&';

  }
  return url.slice(0,-1)
}

module.exports = util 