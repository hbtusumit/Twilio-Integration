const Twilio = require("twilio");
const { accountSid ,authToken }= require("../config/setting.config")
const client = new Twilio(accountSid, authToken);


function SendSms(req, res) {
  console.log("BODY===>", req.body.BODY);
  console.log("FROM==>" + JSON.stringify(req.body.FROM), "TO" + JSON.stringify(req.body.TO), "BODY==>" + JSON.stringify(req.body.BODY),);
  if (accountSid && authToken) {
    const client = new Twilio(accountSid, authToken);
    client.messages
      .create({
        from: req.body.FROM, // from:  Twilio Register Number Exp "+12018644122"
        to: req.body.TO,    //  to: Twilio Register Nymber Exp "+91 9761643562"
        body: req.body.BODY, // body: "Hii Dude"
      })
      .then((message) => {
        console.log(message);
        res.status(200).send({ "message": "Sms send successfully\n", "result": message.sid })
      }).catch((err) => {
        console.log(err);
      });
  } else {
    console.error(
      "You are missing one of the variables you need to send a message"
    );
  }
}

function SendMms(req, res) {
  try {
    console.log("Req==>" + JSON.stringify(req.body));
    console.log("Req==>", req.body);
    res.status(200).send("Success");
  } catch (error) {
    console.log(error)
  }

}

function MakeCall(req, res) {
  console.log("Req==>" + JSON.stringify(req.body));
  if (accountSid && authToken) {
    const client = new Twilio(accountSid, authToken);
    client.calls
      .create({
        from: req.body.FROM,
        to: req.body.TO,
        url: 'http://demo.twilio.com/docs/voice.xml',
      })
      .then((call) => {
        console.log(call.sid);
        res.status(200).send({ "message": "Twilio Client Call Connect successfully\n", "result": call.sid })
      }).catch((err) => {
        console.log(err);
      });
  } else {
    console.error(
      "You are missing one of the variables for make a voice call"
    );
  }

}

module.exports = {
  SendSms,
  SendMms,
  MakeCall,
}