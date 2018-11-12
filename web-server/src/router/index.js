import express from "express";

import { getUser } from "../middlewares";
import newsRouter from "./news.router";
import userRouter from "./user.router";
import searchRouter from "./search.router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/news", getUser, newsRouter);
router.use("/search", getUser, searchRouter);

export default router;
