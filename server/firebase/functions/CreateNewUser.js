const admin = require("firebase-admin");

module.exports = function (req, res) {
  // Verify the user provided a phone
  if (!req.body.phoneNumber) {
    return res.status(422).send({ error: "Bad Input" });
  }

  const phone = String(req.body.phoneNumber).replace(/[^\d]/g, "");
  admin
    .auth()
    .createUser({ uid: phone })
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(422).send({ error: err });
    });
};
