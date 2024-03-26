const mongoose = require("mongoose");

//user schema/model
const newUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    email: {
      type: String,
      required: true,
      label: "email",
    },
    password: {
      required: true,
      type: String,
      min : 8
    },
    // New attributes
    fullName: {
      type: String,
      required: false, 
      label: "fullName",
      default: "",
    },
    role: {
      type: String,
      required: true,
      default: "user", // Default role is 'user'. Change manually in db to 'admin' for admin users
      label: "Role",
    },
    profileImagePath: {
      type: String,
      required: false, 
      label: "Profile Image Path",
      default: 'https://storage.googleapis.com/salem-circle/profile-pic/DefaulProfilePic.png',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model('users', newUserSchema)