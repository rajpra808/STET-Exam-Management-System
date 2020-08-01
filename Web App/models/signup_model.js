const mongoose = require("mongoose");

const signup = mongoose.Schema({
  Name: {
    type: String,
  },
  Email_id: {
    type: String,
  },
  Aadhar_no: {
    type: Number,
  },
  Phone_no: {
    type: Number,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Signup", signup);
