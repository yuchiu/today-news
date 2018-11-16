import express from "express";

import { newsController } from "../../controllers";

const router = express.Router();

router.get("/:index", newsController.getNews);

export default router;
