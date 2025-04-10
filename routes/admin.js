const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/products", adminController.addProduct);
router.put("/products/:id", adminController.editProduct);
router.post("/products/bulk", adminController.bulkUpload);
router.put("/products/:id/archive", adminController.archiveProduct);
router.delete("/products/:id", adminController.deleteProduct);

module.exports = router;
