var _ = require('underscore');
var osm = require('./osm');
var lunr = require('lunr');

function find(latitude, longitude, buffer, name, callback) {
  osm(latitude, longitude, buffer, function(err, data) {
    if (err) return callback(err);

    callback(null, findByName(data, name));
  });
}

function namedObjects(elements) {
  return _.filter(elements, function(element) {
    return element.tags && element.tags.name;
  });
}

function findByName(data, name) {
  var named = namedObjects(data.elements);

  var index = nameIndex(named);

  results = index.search(name);

  if (results.length > 0) {
    return findObjectsByID(named, parseInt(results[0].ref));
  }

  return [];
}

function findObjectsByID(elements, id) {
  return _.filter(elements, function(element) {
    return element.id === id;
  });
}

function nameIndex(elements) {
  var index = lunr(function() {
    this.field('name');
  });

  _.each(elements, function(element) {
    index.add({ id: element.id, name: element.tags.name });
  });

  return index;
}

module.exports = find;
