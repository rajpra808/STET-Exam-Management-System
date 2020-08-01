var mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  passport_photo: {},
  birth_certificate: {},
  community_certificate: {},
  scanned_signature: {},
  sikkim_sub_certificate: {},
  aadhar_card: {},
  eleven_marksheet: {},
  twelve_marksheet: {},
  graduation_marksheet: {},
  graduation_certificate: {},
});

module.exports = mongoose.model("File", fileSchema);
