var jwt = require('jsonwebtoken');

var generateToken = (user, secret_key, tokenLife) => {
    return new Promise((resolve, reject) => {
        const data = {
            user: user.name,
            role: user.role
        }
        jwt.sign({ data: data }, secret_key, { algorithm: "HS256", expiresIn: tokenLife }, (err, token) => {
            if (err) return reject(err);
            resolve(token);
        });
    });
};

var verifyToken = (token, secret_key) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret_key, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        })
    });
};

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
}