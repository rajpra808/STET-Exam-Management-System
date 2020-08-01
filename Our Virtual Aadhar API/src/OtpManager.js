const OtpItem = require("./OtpItem");

const VerificationResults = {
  valid: Symbol("valid"),
  notValid: Symbol("notValid"),
  expired: Symbol("expired"),
  checked: Symbol("checked")
};

class OtpManager {
  constructor(otpRepository, options) {
    this.VerificationResults = VerificationResults;
    this.otpRepository = otpRepository;
    this.options = options || {otpLength: 5, validityTime: 2};
  }

  create(token) {
    const code = Math.floor(Math.random()*Math.pow(10, this.options.otpLength)).toString().padStart(this.options.otpLength, "0");
    let otp = new OtpItem(token, code);
    this.otpRepository.add(otp);

    return otp;
  }

  verify(token, code) {
    const id = `${token}-${code}`;
    const otp = this.otpRepository.getById(id);
    let verificationResult = VerificationResults.notValid;
  
    if (otp) {
      switch (true) {
        case otp.isChecked:
          verificationResult = VerificationResults.checked;
          break;
        case isOtpExpired(otp, this.options.validityTime):
          verificationResult = VerificationResults.expired;
          break;
        default:
          otp.isChecked = true;
          otp.checkDate = new Date();
          this.otpRepository.update(otp);
          verificationResult = VerificationResults.valid;
  
      }
    }
  
    return verificationResult;
  }
}

function isOtpExpired(otp, validityTime) {
  const minutesSinceCreation = Math.floor(((new Date() - new Date(otp.creationDate)) % 3.6e6) / 6e4);

  return (minutesSinceCreation > validityTime);
}

module.exports = OtpManager;
