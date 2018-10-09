"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const fs = require("fs");
if (fs.existsSync(".env")) {
    console.log("Using .env file to supply config environment variables");
    dotenv.config();
}
else {
    console.log("Using .env.example file to supply config environment variables");
}
const ENVIRONMENT = process.env.NODE_ENV;
exports.ENVIRONMENT = ENVIRONMENT;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
const JWT_SECRET = process.env["JWT_SECRET"];
exports.JWT_SECRET = JWT_SECRET;
const MONGODB_URI = prod
    ? process.env["MONGODB_URI"]
    : process.env["MONGODB_URI_LOCAL"];
exports.MONGODB_URI = MONGODB_URI;
if (!JWT_SECRET) {
    console.log("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}
if (!MONGODB_URI) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map