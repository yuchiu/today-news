import jayson from "jayson";

const client = jayson.client.http({
  port: 4040,
  hostname: "localhost"
});

// Test RPC method

const rpcClient = {
  add: (a, b) => {
    client.request("add", [a, b], (err, error, response) => {
      if (err) throw err;
      console.log(response);
    });
  }
};

export default rpcClient;
