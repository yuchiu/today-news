"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const logger_1 = require("./logger");
const fs = require("fs");
if (fs.existsSync(".env")) {
    logger_1.default.debug("Using .env file to supply config environment variables");
    dotenv.config();
}
else {
    logger_1.default.debug("No .env file. Create an .env file to supply config environment variables");
}
let ENVIRONMENT;
exports.ENVIRONMENT = ENVIRONMENT;
process.env.NODE_ENV
    ? (exports.ENVIRONMENT = ENVIRONMENT = process.env.NODE_ENV)
    : (exports.ENVIRONMENT = ENVIRONMENT = "production");
const JWT_SECRET = process.env["JWT_SECRET"];
exports.JWT_SECRET = JWT_SECRET;
let MONGODB_URI;
exports.MONGODB_URI = MONGODB_URI;
process.env["MONGODB_URI_LOCAL"]
    ? (exports.MONGODB_URI = MONGODB_URI = process.env["MONGODB_URI_LOCAL"])
    : (exports.MONGODB_URI = MONGODB_URI = process.env["MONGODB_URI"]);
if (!JWT_SECRET) {
    logger_1.default.debug("No JWT secret. Set JWT_SECRET environment variable.");
    process.exit(1);
}
if (!MONGODB_URI) {
    logger_1.default.debug("No mongo connection string. Set MONGODB_URI or MONGODB_URI_LOCAL environment variable.");
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map