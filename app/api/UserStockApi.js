var userStockDAO = require('../dao/userStockDAO');
var authUser = require('../jwt/authentycation');

module.exports = (app) => {
    app.use('/api/user/stock/*', authUser.verifyToken);
    app.get('/api/user/stock/:username', authUser.verifyToken, async(req, res) => {
        try {
            res.send(await userStockDAO.findByUserName(req.params.username));
        } catch {
            res.status(403).send({ message: 'Chưa đăng nhập!' });
        }
    });

    app.post('/api/user/stock/add', async(req, res) => {
        try {
            var nameStock = req.body.nameStock.replace(/ /g, '').replace(/\n/g, '');
            var username = req.session.user.name;
            await userStockDAO.save(username, nameStock, 'Đáng chú ý!');
            res.status(200).send({ message: "add thành công!" });
        } catch {
            res.status(403).send({ message: 'Chưa đăng nhập!' });
        }
    });

    app.post('/api/user/stock/delete', async(req, res) => {
        try {
            var nameStock = req.body.nameStock.replace(/ /g, '').replace(/\n/g, '');
            var username = req.session.user.name;
            await userStockDAO.remove(username, nameStock);
            res.status(200).send({ message: "delete thành công!" });
        } catch {
            res.status(403).send({ message: 'Chưa đăng nhập!' });
        }
    });

    app.post('/api/user/stock/update', async(req, res) => {
        try {
            var nameStock = req.body.nameStock.replace(/ /g, '').replace(/\n/g, '');
            var newDescription = req.body.newDescription.replace(/\n/g, '');
            var username = req.session.user.name;
            await userStockDAO.update(username, nameStock, newDescription);
            res.status(200).send({ message: "update thành công!" });
        } catch {
            res.status(403).send({ message: 'Chưa đăng nhập!' });
        }
    });
};
