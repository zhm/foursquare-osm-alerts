var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');

var find = require('./find');
var notify = require('./notify');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var BUFFER = 250; // 250 meters

app.all('/user/:user', function(req, res){
  checkin = JSON.parse(req.body.checkin);

  var latitude = checkin.venue.location.lat;
  var longitude = checkin.venue.location.lng;
  var name = checkin.venue.name;

  find(latitude, longitude, BUFFER, name, function(err, results) {
    if (err) {
      console.log(err);
      return;
    }

    var msg = '';
    var title = '';

    if (results.length > 0) {
      var result = results[0];

      title = name + ' is already on OSM';
      msg = 'http://www.openstreetmap.org/' + result.type + '/' + result.id;

    } else {
      title = name + ' needs to be mapped on OSM';
      msg = 'http://www.openstreetmap.org/#map=18/' + latitude + '/' + longitude;
    }

    notify(req.params.user, title, msg, function(err, result) {
      console.log('sent notification to ' + req.params.user, err);
    });
  });

  res.send('');
});

var port = 3005;

if (process.env.NODE_ENV === 'production') {
  require('ssl-root-cas')
    .inject()
    .addFile(path.join(__dirname, 'certs', 'server', 'my-root-ca.crt.pem'));

  options = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-server.key.pem'))
  , cert: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-server.crt.pem'))
  };

  var httpsServer = https.createServer(options, app);

  console.log('Starting HTTPS server on port 443');

  httpsServer.listen(443);

  port = 80;
}

var httpServer = http.createServer(app);

console.log('Starting HTTPS server on port ' + port);

httpServer.listen(port);
