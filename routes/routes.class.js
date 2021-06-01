'use strict';
const  { SendSms ,SendMms ,MakeCall }  =require("../Services/SmsService")

module.exports = function(app) {
    app.post("/sms",SendSms);
    app.post("/mms",SendMms);
    app.post("/makecall",MakeCall);
}
