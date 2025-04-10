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
  const info = db.prepare(`
    INSERT INTO products (
      name, author, description, image_path, type,
      category_id, page_count, price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const inserted = [];

  const insertMany = db.transaction((items) => {
    for (const p of items) {
      const result = info.run(
        p.name,
        p.author,
        p.description,
        p.image_path,
        p.type,
        p.category_id,
        p.page_count,
        p.price
      );
      inserted.push({ id: result.lastInsertRowid, ...p });
    }
  });

  insertMany(products);

  return { message: "Bulk upload complete", products: inserted };
}

function archiveProduct(id, archived = true) {
  const status = archived ? "archived" : "active";

  db.prepare(
    `
    UPDATE products SET status = ? WHERE id = ?
  `
  ).run(status, id);

  return {
    message: `Product ${archived ? "archived" : "restored"}`,
    product_id: id,
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

module.exports = {
  addProduct,
  editProduct,
  bulkUpload,
  archiveProduct,
  deleteProduct,
};
