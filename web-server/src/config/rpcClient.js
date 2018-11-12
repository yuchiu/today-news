import jayson from "jayson";

// create a rpc client

export const userService = jayson.client.http({
  hostname: "localhost",
  port: 4040
});

export const searchService = jayson.client.http({
  hostname: "localhost",
  port: 5050
});

export const newsService = jayson.client.http({
  hostname: "localhost",
  port: 6060
});
