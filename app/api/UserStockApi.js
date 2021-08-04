const userStockDAO = require("../dao/userStockDAO");
const authUser = require("../jwt/authentycation");

const express = require("express");
const Router = express.Router();

Router.use("*", authUser.verifyToken);
Router.get("/:username", async (req, res) => {
  try {
    res.send(await userStockDAO.findByUserName(req.params.username));
  } catch {
    res.status(403).send({ message: "Chưa đăng nhập!" });
  }
});

Router.post("/add", async (req, res) => {
  try {
    let nameStock = req.body.nameStock;
    let username = req.body.username;
    await userStockDAO.save(username, nameStock, "Đáng chú ý!");
    res.status(200).send({ message: "add thành công!" });
  } catch {
    res.status(403).send({ message: "Chưa đăng nhập!" });
  }
});

Router.post("/delete", async (req, res) => {
  try {
    let nameStock = req.body.nameStock;
    let username = req.body.username;
    await userStockDAO.remove(username, nameStock);
    res.status(200).send({ message: "delete thành công!" });
  } catch {
    res.status(403).send({ message: "Chưa đăng nhập!" });
  }
});

Router.post("/update", async (req, res) => {
  try {
    let nameStock = req.body.nameStock;
    let newDescription = req.body.newDescription;
    let username = req.body.username;
    await userStockDAO.update(username, nameStock, newDescription);
    res.status(200).send({ message: "update thành công!" });
  } catch {
    res.status(403).send({ message: "Chưa đăng nhập!" });
  }
});

module.exports = Router;
