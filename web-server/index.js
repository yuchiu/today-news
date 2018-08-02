import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";

import { newsRouter, indexRouter } from "./routes";

mongoose.connect(
  "mongodb://user01:user01@ds163781.mlab.com:63781/latest-news",
  { useNewUrlParser: true }
);

const app = express();

app.use(express.static(path.join(__dirname, "../web-client/dist")));
app.use("/", indexRouter);
app.use("/api/v1", newsRouter);
app.use(cookieParser());

app.listen(3200, () => {
  console.log("app listening on PORT 3200");
});

// kill nodemon process manually on exit
process.on("SIGINT", () => {
  console.log("Stopped nodemon manually");
  process.exit(0);
});
