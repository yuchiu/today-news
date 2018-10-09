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
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets_1 = require("../util/secrets");
const User_1 = require("../models/User");
const jwtSignUser = user => {
    try {
        const userJson = user.toJSON();
        const ONE_WEEK = 60 * 60 * 24 * 7;
        return jwt.sign(userJson, secrets_1.JWT_SECRET, {
            expiresIn: ONE_WEEK
        });
    }
    catch (err) {
        console.log(err);
    }
};
const userSummary = user => {
    const summary = {
        username: user.username,
        email: user.email,
        timestamp: user.timestamp
    };
    return summary;
};
const userController = {
    getUser: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.params;
            const user = yield User_1.default.findOne({ username });
            /* user not registered */
            if (!user) {
                return res.status(403).send({
                    error: `this account ${username} is not yet registered`
                });
            }
            res.status(200).send({
                user: userSummary(user)
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                error: "server error"
            });
        }
    }),
    signUpUser: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const credentials = req.body;
            const isUsernameRegistered = yield User_1.default.findOne({
                username: credentials.username
            });
            /* username already registered */
            if (isUsernameRegistered) {
                res.status(403).send({
                    confirmation: false,
                    error: `username: ${credentials.username} is already registered`
                });
            }
            const isEmailRegistered = yield User_1.default.findOne({
                email: credentials.email
            });
            /* email already registered */
            if (isEmailRegistered) {
                res.status(403).send({
                    confirmation: false,
                    error: `email: ${credentials.email} is already registered`
                });
            }
            /* credential is validated */
            credentials.password = yield bcrypt.hash(credentials.password, 10);
            const user = yield User_1.default.create(credentials);
            res.status(200).send({
                user: userSummary(user),
                token: jwtSignUser(user)
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                error: "server error"
            });
        }
    }),
    signInUser: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const credentials = req.body;
            console.log(req.body);
            const user = yield User_1.default.findOne({ username: credentials.username });
            /* user not registered */
            if (!user) {
                return res.status(403).send({
                    error: `this account ${credentials.username} is not yet registered`
                });
            }
            /* validate password */
            const isPasswordValid = yield bcrypt.compare(credentials.password, user.toJSON().password);
            /* invalid password */
            if (!isPasswordValid) {
                res.status(403).send({
                    error: "invalid password"
                });
            }
            /* password is validated */
            res.status(200).send({
                user: userSummary(user),
                token: jwtSignUser(user)
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                error: "server error"
            });
        }
    }),
    tryAutoSignIn: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            // req.user is retreived from bearer token of auth.policy
            const { username } = req.user;
            const user = yield User_1.default.findOne({
                username
            });
            res.status(200).send({
                confirmation: true,
                user: userSummary(user)
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                error: "server error"
            });
        }
    })
};
exports.default = userController;
//# sourceMappingURL=user.controller.js.map