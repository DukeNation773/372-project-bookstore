const adminModel = require("../models/adminModel");

function addProduct(req, res) {
  const product = req.body;
  const result = adminModel.addProduct(product);
  res.json(result);
}

function editProduct(req, res) {
  const id = parseInt(req.params.id);
  const updates = req.body;
  const result = adminModel.editProduct(id, updates);
  res.json(result);
}

function bulkUpload(req, res) {
  const products = req.body.products;
  const result = adminModel.bulkUpload(products);
  res.json(result);
}

function archiveProduct(req, res) {
  const id = parseInt(req.params.id);
  const { archived } = req.body;
  const result = adminModel.archiveProduct(id, archived);
  res.json(result);
}

function deleteProduct(req, res) {
  const id = parseInt(req.params.id);
  const result = adminModel.deleteProduct(id);
  res.json(result);
}

module.exports = {
  addProduct,
  editProduct,
  bulkUpload,
  archiveProduct,
  deleteProduct,
};
