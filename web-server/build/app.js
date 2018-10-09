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
// Passport configuration & middlewares
require("./config/passport");
const router_1 = require("./router");
const secrets_1 = require("./util/secrets");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();
const app = express();
// Connect to MongoDB
mongoose.Promise = bluebird;
mongoose
    .connect(secrets_1.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
    console.log(`DB Connection Success. Connected to ${secrets_1.MONGODB_URI}`);
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
app.use("/api/v1", router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map