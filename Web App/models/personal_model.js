const mongoose = require("mongoose");

const personal = mongoose.Schema({
  Fname: {
    type: String,
    required: true,
  },
  Mname: {
    type: String,
  },
  Lname: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  FH: {
    type: String,
    required: true,
  },
  FHFname: {
    type: String,
    required: true,
  },
  FHMname: {
    type: String,
  },
  FHLname: {
    type: String,
    required: true,
  },
  MFname: {
    type: String,
    required: true,
  },
  MMname: {
    type: String,
  },
  MLname: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Aadhar: {
    type: String,
    required: true,
  },
  AddressOne: {
    type: String,
    required: true,
  },
  DistrictOne: {
    type: String,
    required: true,
  },
  StateOne: {
    type: String,
    required: true,
  },
  PinCodeOne: {
    type: String,
    required: true,
  },
  AddressTwo: {
    type: String,
  },
  DistrictTwo: {
    type: String,
  },
  StateTwo: {
    type: String,
  },
  PinCodeTwo: {
    type: String,
  },
  Phone1: {
    type: String,
    required: true,
  },
  Email1: {
    type: String,
    required: true,
  },
  Phone2: {
    type: String,
  },
  Email2: {
    type: String,
  },
  Phone_Number: {
    type: String,
  },
});

module.exports = mongoose.model("Personal", personal);
