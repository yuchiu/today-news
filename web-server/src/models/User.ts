import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

export default model("User", userSchema);
