
import { Schema, model } from "mongoose";

const UserSchema: Schema = new Schema({
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
;

export default model("user", UserSchema);
