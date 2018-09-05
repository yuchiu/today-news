import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
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

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
