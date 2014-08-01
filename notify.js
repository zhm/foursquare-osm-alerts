var push = require('pushover-notifications');

var appToken = process.env['PUSHOVER_TOKEN'];

function sendNotification(user, title, message, callback) {
  var p = new push({
    user: user,
    token: appToken
  });

  var msg = {
    message: message,
    title: title,
    sound: 'magic',
    priority: 1
  };

  p.send(msg, function(err, result) {
    if (err) return callback(err);
    callback(null, result);
  });
}

module.exports = sendNotification;
