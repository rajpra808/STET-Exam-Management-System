const mongoose = require("mongoose");

const academic = mongoose.Schema({
  App_Category: {
    type: String,
    required: true,
  },
  Language: {
    type: String,
    required: true,
  },
  Min_Qual: {
    type: String,
    required: true,
  },
  Percentage: {
    type: String,
    required: true,
  },
  Pro_Qual: {
    type: String,
    required: true,
  },
  University: {
    type: String,
    required: true,
  },
  Phone_Number: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Academic", academic);
