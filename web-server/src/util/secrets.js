import dotenv from "dotenv";
import fs from "fs";
import logger from "./logger";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config();
} else {
  logger.debug(
    "No .env file. Create an .env file to supply config environment variables"
  );
}

let ENVIRONMENT;
process.env.NODE_ENV
  ? (ENVIRONMENT = process.env.NODE_ENV)
  : (ENVIRONMENT = "production");

const JWT_SECRET = process.env.JWT_SECRET;

let MONGODB_URI;
process.env.MONGODB_URI_LOCAL
  ? (MONGODB_URI = process.env.MONGODB_URI_LOCAL)
  : (MONGODB_URI = process.env.MONGODB_URI);

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
export { ENVIRONMENT, JWT_SECRET, MONGODB_URI };
