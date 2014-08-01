var mpd = require('./meters-per-degree');

function boundingBoxAtLocation(latitude, longitude, meters) {
  var metersPerDegree = mpd(latitude);

  var degrees = (1 / metersPerDegree) * meters;

  return [ latitude - degrees,
           longitude - degrees,
           latitude + degrees,
           longitude + degrees ];
}

module.exports = boundingBoxAtLocation;
