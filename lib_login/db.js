const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "testdb",
});
db.connect();

module.exports = db;
