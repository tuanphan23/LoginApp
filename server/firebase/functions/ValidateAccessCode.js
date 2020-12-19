const firebaseAdmin = require("../firebase");

module.exports = function (req, res) {
  const phoneNumber = String(req.body.phoneNumber).replace(/[^\d]/g, "");
  const code = req.body.code.toString();
  firebaseAdmin
    .auth()
    .getUser(phoneNumber)
    .then(() => {
      const ref = firebaseAdmin.database().ref("users/" + phoneNumber);
      ref.on("value", (snapshot) => {
        ref.off();
        const user = snapshot.val();

        if (user.code !== code) {
          return res.send(
            JSON.stringify({
              success: false,
              message: "Access code does not matched",
            })
          );
        }

        ref.update({ code: "" });
        firebaseAdmin
          .auth()
          .createCustomToken(phoneNumber)
          .then((token) =>
            res.send(
              JSON.stringify({
                success: true,
                message: "You have successfully logged in",
              })
            )
          );
      });
    })
    .catch((err) => res.status(422).send({ error: err }));
};
