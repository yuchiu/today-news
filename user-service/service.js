var jayson = require("jayson");

// create a server
var server = jayson.server({
  add: function(args, callback) {
    callback(null, args[0] + args[1]);
  }
});

server.http().listen(4040);
