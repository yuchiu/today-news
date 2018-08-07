import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxlength: 100,
    default: ""
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 100,
    default: ""
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 100,
    default: ""
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 100,
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
