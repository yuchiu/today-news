import * as express from "express";

import { userController } from "../controllers";
import { registerRule, authenticate,getUser } from "../middlewares";

const router = express.Router();
router.get("/auth", authenticate, userController.tryAutoSignIn);
router.post("/signup", registerRule, userController.signUpUser);
router.post("/signin", userController.signInUser);
router.post(
  "/preference-logs/news/:newsDigestId",
  getUser,
  userController.preferenceLogger
);

router.get("/:username");

export default router;
