import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    maxlength: 127,
    require: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 127,
    require: true
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 127,
    require: true
  },
  description: {
    type: String,
    maxlength: 127,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

UserSchema.method.summary = () => {
  const summary = {
    id: this._id.toString(),
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    timestamp: this.timestamp
  };
  return summary;
};

const userModel = mongoose.model("User", UserSchema);

export default userModel;
