"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression"); // compresses requests
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// import * as routers from "./routers";
const secrets_1 = require("./util/secrets");
// Passport configuration & middlewares
const passport_1 = require("./config/passport");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();
// Create Express server
const app = express();
// Connect to MongoDB
const mongoUrl = secrets_1.MONGODB_URI;
mongoose.Promise = bluebird;
mongoose
    .connect(mongoUrl, { useNewUrlParser: true })
    .then(() => {
    console.log("DB Connection Success");
})
    .catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
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
app.use(passport_1.checkToken());
// routers(app);
/* listen to port */
exports.default = app;
//# sourceMappingURL=app.js.map