var request = require('request');
var bbox = require('./bbox');

function getOpenStreetMapData(latitude, longitude, buffer, callback) {
  var box = bbox(latitude, longitude, buffer).join(',');

  var query = '' +
  '[out:json];\n' +
  '(\n' +
  '  node\n' +
  '    ["name"]\n' +
  '    (' + box + ');\n' +
  '  way\n' +
  '    ["name"]\n' +
  '    (' + box + ');\n' +
  ');\n' +
  '(._;>;);\n' +
  'out;\n';

  var options = {
    url: 'http://overpass-api.de/api/interpreter',
    qs: { data: query }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, JSON.parse(body));
    } else {
      callback(error);
    }
  });
}

module.exports = getOpenStreetMapData;
