const seedDatabase = require("./seed");
seedDatabase();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Product route
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// Cart route
const cartRoutes = require("./routes/cart");
app.use("/api/cart", cartRoutes);

// Admin route
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

// User route
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

// Default route for serving the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route for handling abondoned carts
const cartModel = require("./models/cartModel");
const abandoned = cartModel.abandonOldCarts();
console.log(abandoned.message);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
