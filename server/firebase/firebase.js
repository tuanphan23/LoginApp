const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://otp-login-9e574-default-rtdb.firebaseio.com",
});
