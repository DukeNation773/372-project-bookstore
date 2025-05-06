const express = require("express");
const multer = require("multer");
const adminController = require("../controllers/adminController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", adminController.addProduct);
router.put("/edit/:id", adminController.editProduct);
router.post("/bulk-upload", upload.single("file"), adminController.bulkUpload);
router.put("/archive/:id", adminController.archiveProduct);
router.delete("/delete/:id", adminController.deleteProduct);
router.get("/products", adminController.getAdminProducts);

module.exports = router;
