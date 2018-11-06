import express from "express";

import { checkToken } from "../middlewares";
import newsRouter from "./news.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/news", checkToken, newsRouter);

export default router;
