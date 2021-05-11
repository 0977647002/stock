var stockDAO = require('../dao/stockDAO');

module.exports = (app) => {
    app.get('/api/stock', async(req, res) => {
        res.send(await stockDAO.findAll());
    });

    app.get('/api/stock/:name', async(req, res) => {
        res.send(await stockDAO.findByNameLike(req.params.name));
    });

    app.get('/api/stock/category/:name', async(req, res) => {
        res.send(await stockDAO.findByCategoryName(req.params.name));
    });

    app.post('/api/stock/add', (req, res) => {
        //do some thing
    });

    app.post('/api/stock/delete', (req, res) => {
        //do something
    });
};