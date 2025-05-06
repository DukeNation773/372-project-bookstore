const productModel = require("../models/productModel");

function getAllProducts(req, res) {
  const products = productModel.getAllProducts();
  res.json(products);
}

function getProductById(req, res) {
  const id = parseInt(req.params.id);
  const product = productModel.getProductById(id);
  res.json(product);
}

function searchProducts(req, res) {
  const { name, category } = req.query;
  const results = productModel.searchProducts(name, category);
  res.json(results);
}

function getAllCategories(req, res) {
  const categories = productModel.getAllCategories();
  res.json(categories);
}


module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  getAllCategories,
};
