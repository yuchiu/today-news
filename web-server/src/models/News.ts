import { Schema, model } from "mongoose";

const newsSchema: Schema = new Schema({});
const NewsModel = model("news", newsSchema);

export default NewsModel;
