import { Request, Response } from "express";

import News from "../models/News";

const newsController = {
  getNews: async (req: Request, res: Response) => {
    try {
      const { index } = req.params;

      const data = await News.find();
      const toIndex = parseInt(index, 10) + 10;
      const news = data.slice(index, toIndex);
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        news
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
