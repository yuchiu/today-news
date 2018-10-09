"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const news_router_1 = require("./news.router");
const user_router_1 = require("./user.router");
const router = express.Router();
router.use("/users", user_router_1.default);
router.use("/news", news_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map