const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide valid username'],
      unique: [true, 'User name already exists'],
    },
    name: {
      type: String,
      required: [true, 'Please provide valid name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide valid email'],
      unique: [true, 'Email already exists'],
    },
    password: {
      type: String,
      required: [true, 'Please provide valid password'],
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
