import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import routes from "./routes";

require("dotenv").config();

mongoose.connect(
  process.env.DB_LOCAL,
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
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../web_client/dist")));
app.use(cookieParser());

routes(app);

app.listen(3200, () => {
  console.log("app listening on PORT 3200");
});

// kill nodemon process manually on exit ctrl+c
process.on("SIGINT", () => {
  console.log("Stopped nodemon manually");
  process.exit(0);
});
