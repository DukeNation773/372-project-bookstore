const fs = require("fs");
const path = require("path");
const db = require("./models/db");

function runSQLFile(filePath) {
  const fullPath = path.join(__dirname, "sql", filePath);
  const sql = fs.readFileSync(fullPath, "utf8");
  db.exec(sql);
}

function seedDatabase() {
  try {
    console.log("Seeding database...");

    runSQLFile("drop_table.sql");
    runSQLFile("create_table.sql");
    runSQLFile("insert_categories.sql");
    runSQLFile("insert_products.sql");
    runSQLFile("insert_users.sql");

    console.log("Seeding complete.");
  } catch (err) {
    console.error("Error during database seeding:", err.message);
  }
}

module.exports = seedDatabase;
