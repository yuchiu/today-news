import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import { newsRouter, indexRouter, authRouter } from "./routes";

require("dotenv").config();

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(`DB Connection failed:${err}`);
    } else {
      console.log("DB Connection Success");
    }
  }
);

// remove cors in production env
const corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200
};

const app = express();

// remove cors in production env
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "../web-client/dist")));
app.use("/", indexRouter);
app.use("/api/v1", newsRouter);
app.use("/auth", authRouter);
app.use(cookieParser());

app.listen(3200, () => {
  console.log("app listening on PORT 3200");
});

// kill nodemon process manually on exit ctrl+c
process.on("SIGINT", () => {
  console.log("Stopped nodemon manually");
  process.exit(0);
});
