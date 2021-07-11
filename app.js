const express = require("express");
const session = require("express-session");
const cookie = require("cookie-parser");
const categoryRouter = require("./app/api/CategoryApi");
const stockRouter = require("./app/api/StockApi");
const loginRouter = require("./app/api/loginAPI");
const userStockRouter = require("./app/api/UserStockApi");
const athen = require("./app/jwt/authentycation");
const app = express();
const cors = require("cors");

app.use(
  session({
    secret: "this-is-a-secret-token",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100 * 60 * 60 * 60 * 24 },
  })
);

app.use(cors());

app.use(cookie());
app.use(express.json()); // support json encoded bodies
app.use(express.static("public"));

app.use("/api/category", categoryRouter);
app.use("/api/stock", stockRouter);
app.use("/api", loginRouter);
app.use("/api/user/stock", athen.verifyToken, userStockRouter);

const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, function (err) {
  console.log("Server start, port: " + PORT);
  if (err) {
    console.log(err);
  }
});
