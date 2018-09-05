import mongoose from "mongoose";

const NewsSchema = mongoose.Schema({});
const NewsModel = mongoose.model("news", NewsSchema);

export default NewsModel;
