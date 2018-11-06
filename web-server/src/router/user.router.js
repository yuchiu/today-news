import express from "express";

import { userController } from "../controllers";
import { registerRule, checkToken } from "../middlewares";

const router = express.Router();
router.get("/auth", checkToken, userController.tryAutoSignIn);
router.post("/signup", registerRule, userController.signUpUser);
router.post("/singin", userController.signInUser);
router.post("/:username", userController.signInUser);
router.post(
  "/click-logs/news/:newsDigestId",
  checkToken,
  userController.clickLogger
);

router.get("/:username");

export default router;
