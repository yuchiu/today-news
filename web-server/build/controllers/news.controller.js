"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const News_1 = require("../models/News");
const newsController = {
    getNews: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { index } = req.params;
            const data = yield News_1.default.find();
            const toIndex = parseInt(index, 10) + 10;
            const news = data.slice(index, toIndex);
            res.status(200).send({
                news
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                error: "server error"
            });
        }
    })
};
exports.default = newsController;
//# sourceMappingURL=news.controller.js.map