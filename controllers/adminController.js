const fs = require("fs");
const path = require("path");
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
  const file = req.file;
  if (!file) return res.status(400).json({ message: "No file uploaded." });

  try {
    const data = fs.readFileSync(
      path.join(__dirname, "..", file.path),
      "utf-8"
    );
    const json = JSON.parse(data);

    if (!json.products || !Array.isArray(json.products)) {
      return res.status(400).json({ message: "Invalid JSON format" });
    }

    const result = adminModel.insertBulkProducts(json.products);
    return res.json({ message: "Bulk upload complete", result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to process file." });
  }
}

function deleteProduct(req, res) {
  const id = parseInt(req.params.id);
  const result = adminModel.deleteProduct(id);
  res.json(result);
}

function getAdminProducts(req, res) {
  const products = adminModel.getAllAdminProducts();
  res.json(products);
}

function archiveProduct(req, res) {
  const id = parseInt(req.params.id);
  const { currentStatus } = req.body;
  const result = adminModel.archiveProduct(id, currentStatus);
  res.json(result);
}
module.exports = {
  addProduct,
  editProduct,
  bulkUpload,
  archiveProduct,
  deleteProduct,
  getAdminProducts,
};
