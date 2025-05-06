const db = require("./db");

function addProduct(product) {
  const info = db.prepare(`
    INSERT INTO products (
      name, author, description, image_path, type,
      category_id, page_count, price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = info.run(
    product.name,
    product.author,
    product.description,
    product.image_path,
    product.type,
    product.category_id,
    product.page_count,
    product.price
  );

  return {
    message: "Product added",
    product: { id: result.lastInsertRowid, ...product },
  };
}

function editProduct(id, updates) {
  const info = db.prepare(`
    UPDATE products
    SET name = ?, author = ?, description = ?, image_path = ?, type = ?,
        category_id = ?, page_count = ?, price = ?
    WHERE id = ?
  `);

  info.run(
    updates.name,
    updates.author,
    updates.description,
    updates.image_path,
    updates.type,
    updates.category_id,
    updates.page_count,
    updates.price,
    id
  );

  return { message: "Product updated", product: { id, ...updates } };
}

function bulkUpload(products) {
  const errors = [];

  const categoryMap = {};
  const categoryRows = db.prepare("SELECT id, name FROM categories").all();
  categoryRows.forEach((cat) => {
    categoryMap[cat.name.toLowerCase()] = cat.id;
  });

  const info = db.prepare(`
    INSERT INTO products 
    (name, author, type, category_id, page_count, price, image_path, description, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
  `);

  for (const prod of products) {
    try {
      const categoryId =
        Number(prod.category_id) ||
        categoryMap[prod.category_name?.toLowerCase()];
      if (!categoryId) throw new Error(`Category not found for ${prod.name}`);

      info.run(
        prod.name,
        prod.author || "Unknown",
        prod.type || "Fiction",
        categoryId,
        prod.page_count,
        prod.price,
        prod.image_path,
        prod.description
      );
    } catch (err) {
      errors.push({ name: prod.name, error: err.message });
    }
  }

  return {
    message: `${products.length - errors.length} out of ${
      products.length
    } products uploaded`,
    errors,
  };
}

function archiveProduct(id, currentStatus) {
  const newStatus = currentStatus === "archived" ? "active" : "archived";

  const info = db
    .prepare(
      `
    UPDATE products
    SET status = ?
    WHERE id = ?
  `
    )
    .run(newStatus, id);

  return {
    message:
      info.changes > 0
        ? `Product ${id} status updated to ${newStatus}`
        : `Product ${id} not found`,
  };
}
function deleteProduct(id) {
  const info = db
    .prepare(
      `
    DELETE FROM products WHERE id = ?
  `
    )
    .run(id);

  return {
    message:
      info.changes > 0
        ? `Product ${id} deleted successfully`
        : `Product ${id} not found`,
  };
}

function getAllAdminProducts() {
  const info = db.prepare(`
    SELECT 
      products.*, 
      categories.name AS category_name
    FROM products
    JOIN categories ON products.category_id = categories.id
    ORDER BY products.id DESC
  `);
  return info.all();
}

module.exports = {
  addProduct,
  editProduct,
  bulkUpload,
  archiveProduct,
  deleteProduct,
  getAllAdminProducts,
};
