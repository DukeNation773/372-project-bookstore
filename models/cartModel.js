const db = require("./db");

function addToCart(product_id, quantity, user_id) {
  let cart = db
    .prepare(
      `
    SELECT * FROM carts WHERE user_id = ? AND status IN ('new', 'active')

  `
    )
    .get(user_id);

  if (!cart) {
    const info = db
      .prepare(
        `
      INSERT INTO carts (user_id, status, created_at)
      VALUES (?, 'new', CURRENT_TIMESTAMP)
    `
      )
      .run(user_id);

    cart = { id: info.lastInsertRowid };
  }

  const existing = db
    .prepare(
      `
    SELECT * FROM cartproducts WHERE cart_id = ? AND product_id = ?
  `
    )
    .get(cart.id, product_id);

  if (existing) {
    db.prepare(
      `
      UPDATE cartproducts
      SET quantity = quantity + ?
      WHERE cart_id = ? AND product_id = ?
    `
    ).run(quantity, cart.id, product_id);
  } else {
    db.prepare(
      `
      INSERT INTO cartproducts (cart_id, product_id, quantity)
      VALUES (?, ?, ?)
    `
    ).run(cart.id, product_id, quantity);
  }

  return { message: "Product added to cart", cart_id: cart.id };
}

function removeFromCart(product_id, user_id) {
  const cart = db
    .prepare(
      `
    SELECT * FROM carts WHERE user_id = ? AND status IN ('new', 'active')

  `
    )
    .get(user_id);

  if (!cart) return { message: "No active cart found" };

  db.prepare(
    `
    DELETE FROM cartproducts WHERE cart_id = ? AND product_id = ?
  `
  ).run(cart.id, product_id);

  return { message: "Product removed from cart", cart_id: cart.id };
}

function checkout(user_id) {
  const cart = db
    .prepare(
      `
    SELECT * FROM carts WHERE user_id = ? AND status IN ('new', 'active')

  `
    )
    .get(user_id);

  if (!cart) return { message: "No active cart to checkout" };

  db.prepare(`DELETE FROM cartproducts WHERE cart_id = ?`).run(cart.id);
  db.prepare(`UPDATE carts SET status = 'purchased' WHERE id = ?`).run(cart.id);

  return { message: "Checkout complete", cart_id: cart.id };
}

function viewCart(user_id) {
  const cart = db
    .prepare(
      `SELECT * FROM carts WHERE user_id = ? AND status IN ('new', 'active')`
    )
    .get(user_id);

  if (!cart) return { message: "No active cart", items: [] };

  const items = db
    .prepare(
      `
      SELECT 
        cartproducts.product_id AS product_id,
        products.name,
        products.author,
        products.price,
        cartproducts.quantity,
        (products.price * cartproducts.quantity) AS total
      FROM cartproducts
      JOIN products ON cartproducts.product_id = products.id
      WHERE cartproducts.cart_id = ?
    `
    )
    .all(cart.id);

  return {
    cart_id: cart.id,
    items,
    total: items.reduce((sum, item) => sum + item.total, 0),
  };
}


function abandonOldCarts(days = 3) {
  const info = db
    .prepare(
      `
    UPDATE carts
    SET status = 'abandoned'
    WHERE status = 'new'
      AND created_at < datetime('now', ?)
  `
    )
    .run(`-${days} days`);

  return {
    message: `${info.changes} cart(s) are abandoned.`,
  };
}

function updateQuantity(user_id, product_id, quantity) {
  const cart = db
    .prepare(
      `
    SELECT * FROM carts 
    WHERE user_id = ? AND status IN ('new', 'active')
  `
    )
    .get(user_id);

  if (!cart) return { message: "No cart found" };

  db.prepare(
    `
    UPDATE cartproducts 
    SET quantity = ? 
    WHERE cart_id = ? AND product_id = ?
  `
  ).run(quantity, cart.id, product_id);

  return { message: "Quantity updated" };
}


module.exports = {
  addToCart,
  removeFromCart,
  checkout,
  viewCart,
  abandonOldCarts,
  updateQuantity
};
