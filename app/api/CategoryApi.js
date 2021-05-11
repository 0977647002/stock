var categoryDAO = require('../dao/categoryDAO');

module.exports = (app) => {
    app.get('/api/category', async(req, res) => {
        res.send(await categoryDAO.findAll())
    });

    app.get('/api/category/:id', async(req, res) => {
        // do something
    });
}