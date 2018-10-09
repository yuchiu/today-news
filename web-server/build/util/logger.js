"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const winston_1 = require("winston");
const secrets_1 = require("./secrets");
const logger = winston_1.createLogger({
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new winston.transports.File({ filename: "debug.log", level: "debug" })
    ]
});
if (secrets_1.ENVIRONMENT !== "production") {
    logger.debug("Logging initialized at debug level");
}
exports.default = logger;
//# sourceMappingURL=logger.js.map