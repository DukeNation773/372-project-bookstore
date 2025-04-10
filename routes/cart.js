const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);
router.delete("/remove/:id", cartController.removeFromCart);
router.post("/checkout", cartController.checkout);
router.get("/view", cartController.viewCart);

module.exports = router;
