import mongoose from "mongoose";

const User = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxlength: 50,
    default: ""
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50,
    default: ""
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 50,
    default: ""
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 50,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const userModel = mongoose.model("User", User);

export default userModel;
