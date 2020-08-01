const express = require("express");
const app = express();
const OtpManager = require("./OtpManager");
const otpRepository = require("./otpRepository");
const otpSender = require("./otpSender")

const otpManager = new OtpManager(otpRepository, {otpLength: 5, validityTime: 5});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the OTP service");
});

app.post("/otp/:token", (req, res) => {
  const otp = otpManager.create(req.params.token);
  otpSender.send(otp, req.body);
  res.sendStatus(201);
 });

 app.get("/otp/:token/:code", (req, res) => {
    const verificationResults = otpManager.VerificationResults;
    const verificationResult = otpManager.verify(req.params.token, req.params.code);
    let statusCode;
    let bodyMessage;

    switch (verificationResult) {
      case verificationResults.valid:
        statusCode = 200;
        bodyMessage = "OK";
        break;
      case verificationResults.notValid:
        statusCode = 404;
        bodyMessage = "Not found"
        break;
      case verificationResults.checked:
        statusCode = 409;
        bodyMessage = "The code has already been verified";
        break;
      case verificationResults.expired:
        statusCode = 410;
        bodyMessage = "The code is expired";
        break;
      default:
        statusCode = 404;
        bodyMessage = "The code is invalid for unknown reason";
  }
  res.status(statusCode).send(bodyMessage);
});

app.post("/webhooks/message-status", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.post("/webhooks/inbound-message", (req, res) => {
  res.send("inbound-message called");
});

