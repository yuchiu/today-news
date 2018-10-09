"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const newsSchema = new mongoose_1.Schema({});
const NewsModel = mongoose_1.model("news", newsSchema);
exports.default = NewsModel;
//# sourceMappingURL=News.js.map