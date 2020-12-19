const firebaseAdmin = require("../firebase");
const twilio = require("../../twilio");
const twilioAdmin = twilio.twilioAdmin;
const TWILIO_PHONE_NUMBER = twilio.TWILIO_PHONE_NUMBER;

module.exports = function CreateNewAccessCode(req, res) {
  const phoneNumber = String(req.body.phoneNumber).replace(/[^\d]/g, "");
  const OTPCode = Math.floor(Math.random() * 899999 + 100000);
  firebaseAdmin
    .auth()
    .getUser(phoneNumber)
    .then((userRecord) => {
      twilioAdmin.messages.create(
        {
          from: TWILIO_PHONE_NUMBER,
          to: phoneNumber,
          body: "Your access code is: " + OTPCode,
        },
        (err) => {
          if (err) {
            return res.send(
              JSON.stringify({
                success: false,
                message: "Cannot send access code to your phone number",
              })
            );
          }
          firebaseAdmin
            .database()
            .ref("users/" + phoneNumber)
            .update({ code: OTPCode.toString() }, () => {
              res.send(
                JSON.stringify({
                  success: true,
                  message: "Access code was sent to your phone number",
                })
              );
            });
        }
      );
    })
    .catch((err) => {
      res.status(422).send(
        JSON.stringify({
          success: false,
          message: "Phone number is not registered",
        })
      );
    });
};
