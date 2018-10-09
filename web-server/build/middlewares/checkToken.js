"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
exports.default = (req, res, next) => {
    passport.authenticate("jwt", (err, user) => {
        if (err || !user) {
            res.status(403).send({
                error: "token authentication failed"
            });
        }
        else {
            req.user = user;
            next();
        }
    })(req, res, next);
};
//# sourceMappingURL=checkToken.js.map