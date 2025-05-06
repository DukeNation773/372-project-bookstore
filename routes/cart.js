const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/", cartController.addToCart);
router.delete("/remove/:id", cartController.removeFromCart);
router.post("/checkout", cartController.checkout);
router.get("/view", cartController.viewCart);
router.put("/update", cartController.updateQuantity);

module.exports = router;
