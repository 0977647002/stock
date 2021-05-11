var authentication = require('../jwt/authentycation');

module.exports = app => {
    app.get(['/', '/home'], (req, res) => {
        if (req.session.user) { // thay thees session thanhf jwt
            res.render('home', {
                isData: true,
                name: req.session.user.name
            });
        } else {
            res.render('home', { isData: false });
        }
    });

    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.post('/login', authentication.login);

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.clearCookie('token');
        res.redirect('/');
    });
};