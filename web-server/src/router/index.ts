import * as express from "express";

import newsRouter from "./news.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/news", newsRouter);

export default router;
