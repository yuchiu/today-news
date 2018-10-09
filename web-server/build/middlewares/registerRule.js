"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = (req, res, next) => {
    const schema = {
        username: joi_1.default.string().regex(new RegExp("^[a-zA-Z0-9]{4,32}$")),
        email: joi_1.default.string().email(),
        password: joi_1.default.string().regex(new RegExp("^[a-zA-Z0-9]{4,32}$"))
    };
    const { error, value } = joi_1.default.validate(req.body, schema);
    if (error) {
        switch (error.details[0].context.key) {
            case "email":
                res.status(403).send({
                    meta: {
                        type: "error",
                        status: 403,
                        message: `email address is not valid`
                    }
                });
                break;
            case "username":
                res.status(403).send({
                    meta: {
                        type: "error",
                        status: 403,
                        message: `username is not valid
            <br/>
            1. It must be at least 4 characters and not greater than 32 characters.`
                    }
                });
                break;
            case "password":
                res.status(403).send({
                    meta: {
                        type: "error",
                        status: 403,
                        message: `the password provided failed to match the following rules:
              <br/>
              1. It must contain ONLY the following characters: lower case, upper case, numerics
              <br/>
              2. It must be at least 4 characters and not greater than 32 characters.
              `
                    }
                });
                break;
            default:
                res.status(403).send({
                    error: "invalid registration infomation"
                });
        }
    }
    else {
        next(); // call next if no errors in validation
    }
};
//# sourceMappingURL=registerRule.js.map