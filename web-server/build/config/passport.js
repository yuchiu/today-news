"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("../models/User");
const secrets_1 = require("../util/secrets");
passport.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secrets_1.JWT_SECRET
}, (jwtPayload, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            _id: jwtPayload._id
        });
        if (!user) {
            return done(new Error(), false);
        }
        return done(null, user);
    }
    catch (err) {
        return done(new Error(), false);
    }
})));
//# sourceMappingURL=passport.js.map