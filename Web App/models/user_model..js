const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fields = {
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  aadhar_no: {
    type: String,
  },
  phone_no: {
    type: String,
  },
  pwd: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
};

const userSchema = new Schema(fields);

module.exports = mongoose.model("User", userSchema);
