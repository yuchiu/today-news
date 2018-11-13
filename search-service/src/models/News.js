const mongoose = require("mongoose");

const News = mongoose.model("News", new mongoose.Schema({}));

module.exports = News;
