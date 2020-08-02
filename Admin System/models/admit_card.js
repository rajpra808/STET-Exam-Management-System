const mongoose = require("mongoose");

const admit_details = mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  mname: {
    type: String,
  },
  lname: {
    type: String,
    required: true,
  },
  ffname: {
    type: String,
    required: true,
  },
  fmname: {
    type: String,
  },
  flname: {
    type: String,
    required: true,
  },
  mfname: {
    type: String,
    required: true,
  },
  mmname: {
    type: String,
  },
  mlname: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  aadhar: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  district: {
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
  sex: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  exam: {
      type: String,
      required: true
  },
  exam_date: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  eno: {
      type: String,
      required: true
  },
  Date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("admit_card", admit_details, 'registration');