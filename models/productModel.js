const db = require("./db");

function getAllProducts() {
  const info = db.prepare(`
    SELECT 
      products.*, 
      categories.name AS category_name
    FROM products
    JOIN categories ON products.category_id = categories.id
    WHERE products.status = 'active';
  `);
  return info.all();
}

function getProductById(id) {
  const info = db.prepare(`
    SELECT 
      products.*, 
      categories.name AS category_name
    FROM products
    JOIN categories ON products.category_id = categories.id
    WHERE products.id = ?
  `);
  return info.get(id);
}

function searchProducts(name, categoryId) {
  const info = db.prepare(`
    SELECT 
      products.*, 
      categories.name AS category_name
    FROM products
    JOIN categories ON products.category_id = categories.id
    WHERE 
      (? IS NULL OR LOWER(products.name) LIKE LOWER(?)) AND
      (? IS NULL OR products.category_id = ?)
  `);
  return info.all(
    name ? `%${name}%` : null,
    name ? `%${name}%` : null,
    categoryId || null,
    categoryId || null
  );
}

function getAllCategories() {
  const info = db.prepare("SELECT name FROM categories ORDER BY id");
  return info.all();
}

module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  getAllCategories,
};
