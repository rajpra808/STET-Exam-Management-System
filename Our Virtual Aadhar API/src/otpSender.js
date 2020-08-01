const Nexmo = require('nexmo');
const nexmoConfig =require("./nexmo.json");
const path = require("path");

nexmoConfig.privateKey = path.join(__dirname, "private.key");

const nexmo = new Nexmo(nexmoConfig);

function send(otp, recipientAdresses) {
  const message = `Insert the following code: ${otp.code}`;
  nexmo.message.sendSms(
    'Nexmo', recipientAdresses.phoneNumber, message, {type: 'unicode'},
    (err, responseData)=>{
        if(err){
            console.log(err);
        }
        else{
            console.dir(responseData);
        }
    }
  );
}

module.exports = {
  send
};