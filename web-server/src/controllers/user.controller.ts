import { newsService, userService } from "../config/rpcClient";

const userController = {
  signUpUser: async (req, res) => {
    const credentials = req.body;

    userService.request("signUpUser", credentials, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          meta: {
            type: "error",
            status: 500,
            message: "server error"
          }
        });
      }
      const userServiceResponse = response.result;
      res.status(userServiceResponse.meta.status).send(userServiceResponse);
    });
  },
  signInUser: async (req, res) => {
    const credentials = req.body;

    userService.request("signInUser", credentials, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          meta: {
            type: "error",
            status: 500,
            message: "server error"
          }
        });
      }
      const userServiceResponse = response.result;
      res.status(userServiceResponse.meta.status).send(userServiceResponse);
    });
  },
  tryAutoSignIn: async (req, res) => {
    const user = req.user;
    userService.request("tryAutoSignIn", user, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          meta: {
            type: "error",
            status: 500,
            message: "server error"
          }
        });
      }
      const userServiceResponse = response.result;
      res.status(userServiceResponse.meta.status).send(userServiceResponse);
    });
  },
  preferenceLogger: async (req, res) => {
    try {
      if (req.user) {
        newsService.request(
          "logNewsClickForUser",
          [req.user.id, req.params.newsDigestId],
          (err, response) => {
            if (err) throw err;
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export default userController;
