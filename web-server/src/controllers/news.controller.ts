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
