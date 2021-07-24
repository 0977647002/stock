const jwt = require("../jwt/jwt");
const userDAO = require("../dao/userDAO");
const md5 = require("md5");

const key_secret = process.env.ACCESS_TOKEN_SECRET || "huyhuy";
const tokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        let data = await userDAO.findByUsername(username);
        if (!data) {
            res.status(500).send({ message: "Username or password is fail" });
            return;
        }

        if (!(md5(password) == data[0].password)) {
            res.status(500).send({ message: "Username or password is fail" });
            return;
        }

        let token = await jwt.generateToken(username, key_secret, tokenLife);
        res.status(200).send({ message: "success", data: { token, username } });
    } catch (err) {
        res.status(500).send({ message: "login fail" });
    }
};

const signin = async (req, res) => {
    const { username, password, password_two } = req.body;
    try {
        let data = await userDAO.findByUsername(username);
        if (data) {
            res.status(500).send({ message: "User exist" });
            return;
        }

        if (password !== password_two) {
            res.status(500).send({ message: "password wrong" });
            return;
        }

        userDAO.save({ username, password });
        res.status(500).send({ message: "Sign sucess" });
    } catch (err) {}
};

const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        token.split(" ");
        token = token.split(" ")[1];
        try {
            const decoded = await jwt.verifyToken(token, key_secret);
            req.jwt = decoded;
            next();
        } catch {
            return res.status(500).send({
                message: "Unauthorized",
            });
        }
    } else {
        return res.status(500).send({
            message: "not be user!",
        });
    }
};

const authentication = {
    login,
    verifyToken,
};

module.exports = authentication;
