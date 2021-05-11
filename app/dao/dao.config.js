var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'huy3524584',
    database: 'stock'
});

conn.connect(function(err) {
    if (err) throw err;
});

module.exports = conn;