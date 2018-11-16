const events = require("events");
const http = require("http");

const services = require("../config/services");
const server = require("../config/server");

const EventEngine = function() {
  this.event_emitter = new events.EventEmitter();
  this.EventLoopInterval = 10000; // number of milliseconds
};

EventEngine.prototype.Start = function() {
  console.log("Starting Event Engine");
  console.log("---------------------------------------");
  console.log("Monitoring the following microservices");
  console.log("---------------------------------------");
  for (service of services) {
    console.log(service.name);
  }
  console.log("---------------------------------------");
  var that = this;
  setInterval(function() {
    try {
      var promises = that.GetStatus(services);
      Promise.all(promises)
        .then(function(responses) {
          for (var i = 0; i < responses.length; i++) {
            var response = responses[i];
            if (response.config) {
              console.log("---------------------------------------");
              console.log("Service Name, URL and Port Result");
              console.log(
                response.config.name +
                  ", " +
                  response.config.url +
                  ":" +
                  response.config.port
              );
              message = "Service is up!";
              if (!response.success) {
                message = "Service is DOWN!!!";
              }
              console.log(message);
              console.log("---------------------------------------");
            }
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    } catch (e) {
      console.log("failed interval");
      console.log(e);
    }
  }, this.EventLoopInterval);
};

EventEngine.prototype.GetStatus = function(services) {
  var promises = [];
  for (var i = 0; i < services.length; i++) {
    var url = server.url + ":" + server.port + "/heartbeat/" + services[i].name;
    promises.push(this.GetMicroserviceData(url, services[i]));
  }
  return promises;
};

EventEngine.prototype.GetMicroserviceData = function(url, service) {
  var that = this;

  return new Promise(function(fulfill, reject) {
    var request = http.get(url, res => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        // var er = new Error("Error status code: " + res.statusCode);
        var body = {
          success: false,
          config: {
            name: service.name,
            url: service.url,
            port: service.port
          }
        };
        fulfill(body);
      }
      var body = "";
      res.setEncoding("utf8");
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        try {
          fulfill(body);
        } catch (exception) {
          reject(exception);
        }

        if (body && body.success) {
          fulfill(body);
        }
      });
    });

    request.on("error", function(err) {
      err.success = false;

      fulfill(err);
    });
  });
};
module.exports = new EventEngine();
