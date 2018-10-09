"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = require("../controllers");
const router = express.Router();
router.get("/:index", controllers_1.newsController.getNews);
exports.default = router;
//# sourceMappingURL=news.router.js.map