class OtpItem {
  constructor(token, code) {
    this.token = token;
    this.code = code;
    this.creationDate = new Date();
    this.isChecked = false;
    this.checkDate = null;
  }
}

module.exports = OtpItem;