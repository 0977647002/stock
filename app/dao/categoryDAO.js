var conn = require('./dao.config');

var findAll = () => {
    return new Promise((resolve, reject) => {
        let sql = 'select * from category;';
        conn.query(sql, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        })
    });
};

var categoryDAO = {
    findAll: findAll
}

module.exports = categoryDAO;