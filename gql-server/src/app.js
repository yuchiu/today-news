import express from "express";
import path from "path";
import mongoose from "mongoose";
import compression from "compression"; // compresses requests
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

// Passport configuration & middlewares
import "./config/passport";
import { simulateLatency, checkUser } from "./middlewares";
import { MONGODB_URI, SERVER_PORT, NODE_ENV } from "./util/secrets";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schemas")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const GQL_ENDPOINT = "/graphql";
const GRAPHIQL_ENDPOINT = "/graphiql";

const app = express();

/**
 * middlewares
 */
/* development build, use logger & simulateLatency */
if (NODE_ENV === "development") {
  app.use(simulateLatency(50, 1000));
}
app.set("port", SERVER_PORT);
app.set("env", NODE_ENV);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(checkUser());
app.use(
  GQL_ENDPOINT,
  express.json(),
  graphqlExpress(req => ({
    schema,
    user: req.user
  }))
);
app.use(
  GRAPHIQL_ENDPOINT,
  graphiqlExpress({
    endpointURL: GQL_ENDPOINT
  })
);

// Connect to MongoDB
mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(`DB Connection Success. Connected to ${MONGODB_URI}`);
  })
  .catch(err => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    // process.exit();
  });

export default app;
