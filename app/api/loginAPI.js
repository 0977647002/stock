const authentycation = require("../jwt/authentycation");
const Router = require("express").Router();

Router.post("/login", authentycation.login);
Router.post("/verify-token", authentycation.verifyToken, (req, res) => {
  res.status(200).send({
    message: "success",
    data: { decode: req.jwt, token: req.headers.authorization.split(" ")[1] },
  });
});

module.exports = Router;
