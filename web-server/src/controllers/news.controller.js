import { newsService } from "../config/rpcClient";

const getNewsSummariesForUser = (userId, pageNum, callback) => {
  newsService.request(
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
  }
};

export default newsController;
