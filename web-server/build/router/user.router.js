"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express.Router();
router.get("/auth", middlewares_1.checkToken, controllers_1.userController.tryAutoSignIn);
router.post("/signup", middlewares_1.registerRule, controllers_1.userController.signUpUser);
router.post("/singin", controllers_1.userController.signInUser);
router.get("/");
router.get("/:username");
exports.default = router;
//# sourceMappingURL=user.router.js.map