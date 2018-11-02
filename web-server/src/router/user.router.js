import express from "express";

import { userController } from "../controllers";
import { registerRule, checkToken } from "../middlewares";

const router = express.Router();
router.get("/auth", checkToken, userController.tryAutoSignIn);
router.post("/signup", registerRule, userController.signUpUser);
router.post("/singin", userController.signInUser);

router.get("/");
router.get("/:username");

export default router;
