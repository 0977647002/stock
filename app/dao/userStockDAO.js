var conn = require('./dao.config');
var userDAO = require('./userDAO');
var stockDAO = require('./stockDAO');

var findByUserName = (name) => {
    return new Promise(async(resolve, reject) => {
        let sql = 'select s.*, us.description from stock s join user_stock us on us.stock_id = s.id join user u on u.id = us.user_id where u.username = ?';
        conn.query(sql, name, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
};

var save = (username, nameStock, description) => {
    return new Promise(async(resolve, reject) => {
        conn.beginTransaction(async err => {
            if (err) return reject(err);
            var userId = await userDAO.findByUsername(username);
            userId = userId[0].id;
            var stockId = await stockDAO.findByName(nameStock);
            stockId = stockId[0].id;
            let sql = 'insert into user_stock (user_id, stock_id, description) value (?, ?, ?)';
            conn.query(sql, [userId, stockId, description], (err, data) => {
                if (err) {
                    conn.rollback(err => {
                        return reject(err);
                    })
                    return reject(err);
                }
                conn.commit(err => {
                    return reject(err);
                });
                return resolve(data);
            });
        });
    });
};

var update = (username, nameStock, newDescription) => {
    return new Promise(async(resolve, reject) => {
        conn.beginTransaction(async err => {
            if (err) return reject(err);
            var userId = await userDAO.findByUsername(username);
            userId = userId[0].id;
            var stockId = await stockDAO.findByName(nameStock);
            stockId = stockId[0].id;
            let sql = 'update user_stock set description = ? where user_id = ? and stock_id = ?';
            conn.query(sql, [newDescription, userId, stockId], (err, data) => {
                if (err) {
                    conn.rollback(err => {
                        return reject(err);
                    })
                    return reject(err);
                }
                conn.commit(err => {
                    return reject(err);
                });
                return resolve(data);
            });
        });
    });
};


var remove = (username, nameStock) => {
    return new Promise(async(resolve, reject) => {
        conn.beginTransaction(async err => {
            if (err) return reject(err);
            var userId = await userDAO.findByUsername(username);
            userId = userId[0].id;
            var stockId = await stockDAO.findByName(nameStock);
            stockId = stockId[0].id;
            let sql = 'delete from user_stock where user_id = ? and stock_id = ?';
            conn.query(sql, [userId, stockId], (err, data) => {
                if (err) {
                    conn.rollback(err => {
                        return reject(err);
                    })
                    return reject(err);
                }
                conn.commit(err => {
                    return reject(err);
                });
                return resolve(data);
            });
        });
    });
};

var userStockDAO = {
    findByUserName: findByUserName,
    save: save,
    remove: remove,
    update: update
}

module.exports = userStockDAO;