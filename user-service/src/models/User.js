const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  timestamp: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("User", UserSchema);
