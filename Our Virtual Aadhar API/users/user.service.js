const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const express = require('express');

const OtpManager = require("../src/OtpManager");
const otpRepository = require("../src/otpRepository");
const otpSender = require("../src/otpSender")
const request = require("request");

let verificationData;

const otpManager = new OtpManager(otpRepository, {otpLength: 5, validityTime: 5});

module.exports = {
    authenticate,
    create,
    otp,
    sendPhone
};

async function otp({messengerId, phoneNumber}){
    const otp = otpManager.create(req.params.token);
    otpSender.send(otp, req.body);
    res.sendStatus(201);
}

async function sendPhone(req, res) {
    console.log(req.params.username);
    const username = req.params.username;
    const user = await User.findOne({ username });
    console.log(user.phoneNumber);
    res.json({phno: user.phoneNumber});
  }

async function authenticate({ username}) {
    const user = await User.findOne({ username });
    var yes = false;
    var options = {
        method: 'POST',
        url: 'https://aadhaarnumber-verify.p.rapidapi.com/Uidverify',
        qs: {
            uidnumber: username,
            clientid: '111',
            method: 'uidverify',
            txn_id: '123456'
        },
        headers: {
            'x-rapidapi-host': 'aadhaarnumber-verify.p.rapidapi.com',
            'x-rapidapi-key': 'f92f908180msh2005161252ecbdcp1df64fjsnff039052dbcc',
            'content-type': 'application/x-www-form-urlencoded',
            useQueryString: true
        },
        form: {}
    };
    //yes = await preAuth(options, user, yes);
    yes = true;
    console.log(yes);
    console.log("Y");
    if(yes){
        return {
            ...user.toJSON()
        };
    }
}

async function preAuth(options, user, yes){
    return new Promise(function(resolve, reject){
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            let json = JSON.parse(body);
            console.log(json);
            if(json.Succeeded!=undefined){
                if (user) {
                    console.log(user);
                    yes = true;
                }
            }
            resolve (yes);
        }); 
    });
}

async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);
    await user.save();
}
