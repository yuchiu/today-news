import dotenv from "dotenv";
import fs from "fs";
import logger from "./logger";

if (fs.existsSync("../.env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: "../.env" });
} else {
  logger.debug(
    "No .env file. Create an .env file to supply config environment variables"
  );
}

// env is default to "development" unless env is specified
let node_env;
if (process.env.NODE_ENV) {
  node_env = process.env.NODE_ENV;
} else {
  node_env = "development";
}
export const NODE_ENV = node_env;

// server url is default to "http://localhost" unless env is specified
let server_url;
if (process.env.WEB_SERVER_URL) {
  server_url = process.env.WEB_SERVER_URL;
} else {
  server_url = "http://localhost";
}
export const SERVER_URL = server_url;

// port is default to 3030 unless env is specified
let server_port;
if (process.env.WEB_SERVER_PORT) {
  server_port = process.env.WEB_SERVER_PORT;
} else {
  server_port = 3030;
}
export const SERVER_PORT = server_port;

export const JWT_SECRET = process.env.JWT_SECRET;

let mongodb_uri;
if (process.env.DB_DEFAULT_MONGODB_DB_URI_LOCAL) {
  mongodb_uri = process.env.DB_DEFAULT_MONGODB_DB_URI_LOCAL;
} else {
  mongodb_uri = "mongodb://localhost:27017/todays-news";
}
export const MONGODB_URI = mongodb_uri;

if (!JWT_SECRET) {
  logger.debug("No JWT secret. Set JWT_SECRET environment variable.");
  process.exit(1);
}

if (!MONGODB_URI) {
  logger.debug(
    "No mongo connection string. Set DB_DEFAULT_MONGODB_DB_URI_LOCAL environment variable."
  );
  process.exit(1);
}
