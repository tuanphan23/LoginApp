const TWILIO_ACCOUNT_SID = "ACd84c94655e92b8d9654b11a9b93c6dac";
const TWILIO_AUTH_TOKEN = "76be72ca3bc8a19d8d0207426af3ad9e";
const TWILIO_PHONE_NUMBER = "+12186356762";

const twilioAdmin = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = {
  twilioAdmin,
  TWILIO_PHONE_NUMBER,
};
