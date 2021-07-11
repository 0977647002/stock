const categoryDAO = require("../dao/categoryDAO");
const experss = require('express');
const Router = experss.Router();

Router.get("/", async (req, res) => {
    res.send(await categoryDAO.findAll());
});

module.exports = Router;
