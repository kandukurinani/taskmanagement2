const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const user = new Schema({
  firstname: {
    type: String,
    required: "true",
    minlength: [3, 'Minimum length of username must be 6 characters'],
   maxlength: [10, 'Minimum length of username must be 6 characters'],
  },
  lastname: {
    type: String,
    required: true,
    minlength: [3, 'Minimum length of username must be 6 characters'], 
   maxlength: [10, 'Minimum length of username must be 6 characters'],
  },
  username: {
         type: String,
         minlength: [6, 'Minimum length of username must be 6 characters'],
         trim: true,
         lowercase: true,
         required: true,
         unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: "true",
  },
  mobile: {
    type: Number,
    unique: true,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
    // select: false,
  },
});

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    genPassword = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    genPassword += charset.charAt(Math.floor(Math.random() * n));
  }
  return genPassword;
}

user.pre("save", function (next) {
  // this.password = Math.random().toString(36).slice(2);
  this.password = generatePassword();
  next();
});

module.exports = mongoose.model("users", user);
