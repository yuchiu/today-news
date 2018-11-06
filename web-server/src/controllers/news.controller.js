import rpcClient from "../config/rpcClient";

const getNewsSummariesForUser = (userId, pageNum, callback) => {
  rpcClient.request(
    "getNewsSummariesForUser",
    [userId, pageNum],
    (err, response) => {
      if (err) throw err;
      callback(response.result);
    }
  );
};

const newsController = {
  getNews: async (req, res) => {
    try {
      const { index } = req.params;
      let currentUserId;
      if (req.user) {
        currentUserId = req.user.id;
      } else {
        currentUserId = null;
      }
      const offset = parseInt(index, 10);
      const pageNum = (offset + 10) / 10;
      getNewsSummariesForUser(currentUserId, pageNum, response => {
        res.status(200).send({
          meta: {
            type: "success",
            status: 200,
            message: ""
          },
          news: response
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  }
};

export default newsController;
