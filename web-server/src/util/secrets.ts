import * as dotenv from "dotenv";
import logger from "./logger";
import * as fs from "fs";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config();
} else {
  logger.debug(
    "No .env file. Create an .env file to supply config environment variables"
  );
}

// env is default to "development" unless env is specified
export let NODE_ENV;
process.env.NODE_ENV
  ? (NODE_ENV = process.env.NODE_ENV)
  : (NODE_ENV = "development");

// server url is default to "http://localhost" unless env is specified
export let SERVER_URL;
process.env.SERVER_URL
  ? (SERVER_URL = process.env.SERVER_URL)
  : (SERVER_URL = "http://localhost");

// port is default to 3030 unless env is specified
export let SERVER_PORT;
process.env.SERVER_PORT
  ? (SERVER_PORT = process.env.SERVER_PORT)
  : (SERVER_PORT = 3030);

export const JWT_SECRET = process.env["JWT_SECRET"];

export let MONGODB_URI;
process.env["MONGODB_URI_LOCAL"]
  ? (MONGODB_URI = process.env["MONGODB_URI_LOCAL"])
  : (MONGODB_URI = process.env["MONGODB_URI"]);

if (!JWT_SECRET) {
  logger.debug("No JWT secret. Set JWT_SECRET environment variable.");
  process.exit(1);
}

if (!MONGODB_URI) {
  logger.debug(
    "No mongo connection string. Set MONGODB_URI or MONGODB_URI_LOCAL environment variable."
  );
  process.exit(1);
}
