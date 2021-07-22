const stockDAO = require("../dao/stockDAO");
const express = require("express");
const Router = express.Router();

Router.get("/", async (req, res) => {
    res.send(await stockDAO.findAll());
});

Router.get("/:name", async (req, res) => {
    res.send(await stockDAO.findByNameLike(req.params.name));
});

Router.get("/category/:name", async (req, res) => {
    res.send(await stockDAO.findByCategoryName(req.params.name));
});

Router.post("/add", (req, res) => {
    //do some thing
});

Router.post("/delete", (req, res) => {
    //do something
});

module.exports = Router;
