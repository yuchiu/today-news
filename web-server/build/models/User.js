"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    createdAt: Date,
    updatedAt: Date,
    name: {
        type: String,
        default: "",
        required: true,
        maxlength: 255
    },
    username: {
        type: String,
        default: "",
        required: true,
        unique: true,
        lowercase: true,
        maxlength: 255
    },
    email: {
        type: String,
        default: "",
        required: true,
        unique: true,
        lowercase: true,
        maxlength: 255
    },
    password: {
        type: String,
        default: "",
        required: true,
        maxlength: 255
    },
    featuredImage: {
        type: String,
        default: "",
        maxlength: 255
    },
    posts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});
exports.default = mongoose_1.model("User", userSchema);
//# sourceMappingURL=User.js.map