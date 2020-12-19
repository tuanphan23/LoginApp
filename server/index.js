const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const CreateNewAccessCode = require("./firebase/functions/CreateNewAccessCode");
const ValidateAccessCode = require("./firebase/functions/ValidateAccessCode");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post("/api/user", (req, res) => {
  res.header("Content-Type", "application/json");
  !req.body.code ? CreateNewAccessCode(req, res) : ValidateAccessCode(req, res);
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
