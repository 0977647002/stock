var conn = require('./dao.config');

var findAll = () => {
    return new Promise((resolve, reject) => {
        let sql = 'select * from stock';
        conn.query(sql, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

var findByNameLike = name => {
    return new Promise((resolve, reject) => {
        let sql = 'select * from stock s where s.name like ?';
        conn.query(sql, '%' + name + '%', (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

var findByName = name => {
    return new Promise((resolve, reject) => {
        let sql = 'select * from stock s where s.name = ?';
        conn.query(sql, name, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

var findByCategoryName = name => {
    return new Promise((resolve, reject) => {
        let sql = 'select s.* from stock s join category c on c.id = s.category_id where c.name = ?';
        conn.query(sql, name, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

var save = stock => {
    return new Promise((resolve, reject) => {
        conn.beginTransaction(err => {
            if (err) return reject(err);
            let sql = 'insert into stock (name, category_id) value (?, ?)';
            conn.query(sql, [stock.name, stock.categoryId], (err, data) => {
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
}

var remove = name => {
    return new Promise((resolve, reject) => {
        conn.beginTransaction(err => {
            if (err) return reject(err);
            let sql = 'delete from stock where name = ?';
            conn.query(sql, name, (err, data) => {
                if (err) {
                    conn.rollback(err => {
                        return reject(err);
                    })
                    return reject(err);
                }
                conn.commit(err => {
                    return reject(err);
                })
                return resolve(data);
            });
        });
    });
}

stockDAO = {
    findAll: findAll,
    findByName: findByName,
    findByCategoryName: findByCategoryName,
    save: save,
    remove: remove,
    findByNameLike: findByNameLike
}

module.exports = stockDAO;