import mongoose from "mongoose";

const NewsSchema = mongoose.Schema({});
const News = mongoose.model("news", NewsSchema);

export default News;
