import express from "express";

import { getUser } from "../middlewares";
import newsRouter from "./news.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/news", getUser, newsRouter);

export default router;
