module.exports = function(latitude) {
  var radians = latitude * Math.PI / 180;
  return 111132.92 - 559.82 * Math.cos(2 * radians) + 1.175 * Math.cos(4 * radians)
}
