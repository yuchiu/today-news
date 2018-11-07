import * as jayson from "jayson";

// create a client

export default jayson.client.http({
  hostname: "localhost",
  port: 4040
});
