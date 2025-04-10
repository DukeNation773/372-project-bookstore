const Database = require("better-sqlite3");
const db = new Database("./db/db_bookstore.db");
module.exports = db;
