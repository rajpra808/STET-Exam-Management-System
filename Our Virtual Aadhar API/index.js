require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const ejs = require('ejs');
const path = require('path');
//OTP
const OtpManager = require("./src/OtpManager");
const otpRepository = require("./src/otpRepository");
const otpSender = require("./src/otpSender")

const otpManager = new OtpManager(otpRepository, {otpLength: 5, validityTime: 5});
//OTP
app.use(cors());

//OTP Main End

//Template engine
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//Folder setup
app.use(express.static(__dirname + '/public'));

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index route
app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/otp', (req, res)=>{
    res.render('otp');
});

// OTP Main
app.post("/otp/:token", (req, res) => {
    console.log(req.params.token);
    const otp = otpManager.create(req.params.token);
    console.log(req.body);
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
        console.log("Yay");
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
//OTP Main end
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
// app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = 4000;
const server = app.listen(process.env.PORT || port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
