// import mongoose from "mongoose";

// const UserSchema = mongoose.Schema({
//   firstName: {
//     type: String,
//     trim: true,
//     default: ""
//   },
//   lastName: {
//     type: String,
//     trim: true,
//     default: ""
//   },
//   email: {
//     type: String,
//     trim: true,
//     lowercase: true,
//     default: ""
//   },
//   password: {
//     type: String,
//     default: ""
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });

// UserSchema.methods.summary = () => {
//   const summary = {
//     // eslint-disable-next-line
//     id: this._id.toString(),
//     firstName: this.firstName,
//     lastName: this.lastName,
//     email: this.email,
//     timestamp: this.timestamp
//   };

//   return summary;
// };
// const userModel = mongoose.model("ProblemModel", UserSchema);

// export default userModel;
