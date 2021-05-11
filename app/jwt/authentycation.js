var jwt = require('../jwt/jwt');
var userDAO = require('../dao/userDAO');
var md5 = require('md5');

const key_secret = process.env.ACCESS_TOKEN_SECRET || 'huyhuy';
const tokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";

exports.login = async(req, res) => {
    try {
        var data = await userDAO.findByUsername(req.body.username);
        if (!data) {
            res.redirect('/login');
        }

        if (!(md5(req.body.password) == data[0].password)) {
            res.redirect('/login');
        }

        req.session.user = {
            name: data[0].username,
            role: data[0].name,
            id: data[0].id
        };
        let token = await jwt.generateToken(req.session.user, key_secret, tokenLife);
        res.cookie('token', token, { maxAge: 100 * 60 * 60 * 24 });
        res.redirect('/');
    } catch {
        res.redirect('/login');
    }
};

exports.authentication = (req, res, next) => {
    var user = req.session.user;
    if (!user) {
        res.redirect('/login');
    } else {
        next();
    }
};

exports.verifyToken = async(req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token;
    if (token) {
        try {
            const decoded = await jwt.verifyToken(token, key_secret);
            req.jwt = decoded;
            next();
        } catch {
            return res.status(401).send({
                message: 'Unauthorized'
            })
        }
    } else {
        return res.status(403).send({
            message: 'not be user!'
        });
    }
}