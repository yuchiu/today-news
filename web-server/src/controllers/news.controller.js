import { NewsModel } from "../models";

const newsController = {
  getNews: async (req, res) => {
    try {
      const { index } = req.params;

      const data = await NewsModel.find();
      console.log("index");
      console.log(index);
      const toIndex = parseInt(index, 10) + 10;
      const news = data.slice(index, toIndex);
      res.status(200).send({
        news
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  }
};

export default newsController;
