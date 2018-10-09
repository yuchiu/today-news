import * as express from "express";
import * as mongoose from "mongoose";
import * as compression from "compression"; // compresses requests
import * as cors from "cors";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as bluebird from "bluebird";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";

// import * as routers from "./routers";
import { MONGODB_URI } from "./util/secrets";
// Passport configuration & middlewares
import { checkToken } from "./config/passport";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose
  .connect(
    mongoUrl,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("DB Connection Success");
  })
  .catch(err => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });

app.set("port", process.env.SERVER_PORT || 3030);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(checkToken());
// routers(app);

/* listen to port */
export default app;
