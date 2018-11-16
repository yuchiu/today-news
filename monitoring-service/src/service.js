const dotenv = require("dotenv");

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

const engine = require("./engine");

engine.Start();
