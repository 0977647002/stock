const express = require("express");
const categoryRouter = require("./app/api/CategoryApi");
const stockRouter = require("./app/api/StockApi");
const userStockRouter = require('./app/api/UserStockApi');
const loginRouter = require("./app/api/loginAPI");
const athen = require("./app/jwt/authentycation");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static("public"));

app.use("/api/category", categoryRouter);
app.use("/api/stock", stockRouter);
app.use("/api", loginRouter);
app.use("/api/user/stock", userStockRouter);

const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, function (err) {
  console.log("Server start, port: " + PORT);
  if (err) {
    console.log(err);
  }
});
