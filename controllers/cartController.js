const cartModel = require("../models/cartModel");

function addToCart(req, res) {
  const { product_id, quantity, user_id } = req.body;
  const result = cartModel.addToCart(product_id, quantity, user_id);
  res.json(result);
}

function removeFromCart(req, res) {
  const product_id = parseInt(req.params.id);
  const { user_id } = req.body;
  const result = cartModel.removeFromCart(product_id, user_id);
  res.json(result);
}

function checkout(req, res) {
  const { user_id } = req.body;
  const result = cartModel.checkout(user_id);
  res.json(result);
}

function viewCart(req, res) {
  const user_id = parseInt(req.query.user_id);
  const cart = cartModel.viewCart(user_id);
  res.json(cart);
}

module.exports = {
  addToCart,
  removeFromCart,
  checkout,
  viewCart,
};
