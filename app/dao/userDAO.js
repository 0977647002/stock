const conn = require("./dao.config");

const findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        let sql =
            "select u.id, u.username, u.password, r.name as role from user u join role r on r.id = u.role_id where u.username = ?";
        conn.query(sql, username, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
};

const save = (user) => {
    return new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
            if (err) return reject(err);
            let sql =
                "insert into user (username, password, role_id) value (?, ?, 2)";
            conn.query(sql, [user.username, user.password], (err, data) => {
                if (err) {
                    conn.rollback((err) => {
                        return reject(err);
                    });
                    return reject(err);
                }
                conn.commit((err) => {
                    return reject(err);
                });
                return resolve(data);
            });
        });
    });
};

const update = (username, newPossword) => {
    return new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
            if (err) return reject(err);
            let sql = "update user set password = ? where username = ?";
            conn.query(sql, [newPossword, username], (err, data) => {
                if (err) {
                    conn.rollback((err) => {
                        return reject(err);
                    });
                    return reject(err);
                }
                conn.commit((err) => {
                    return reject(err);
                });
                return resolve(data);
            });
        });
    });
};

const userDAO = {
    findByUsername: findByUsername,
    save: save,
    update: update,
};

module.exports = userDAO;
