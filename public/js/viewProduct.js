document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    document.getElementById("product-container").innerText =
      "No product ID found.";
    return;
  }

  try {
    const res = await fetch(`/api/products/${productId}`);
    const product = await res.json();

    const container = document.getElementById("product-container");
    container.innerHTML = `
      <div class="product-image">
        <img src="${product.image_path}" alt="Book Image">
      </div>

      <div class="product-details">
        <h1>${product.name}</h1>
        <p><strong>Author:</strong> ${product.author}</p>
        <p><strong>Type:</strong> ${product.type}</p>
        <p><strong>Genre:</strong> ${product.category_name}</p>
        <p><strong>Page Count:</strong> ${product.page_count}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;

    const addToCartBtn = container.querySelector(".add-to-cart");
    addToCartBtn.addEventListener("click", async () => {
      const userId = 1;
      const quantity = 1;

      try {
        const cartRes = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: product.id,
            quantity,
            user_id: userId,
          }),
        });

        if (!cartRes.ok) throw new Error("Failed to add to cart.");

        alert("Book added to cart!");
      } catch (err) {
        console.error("Error adding to cart", err);
        alert("Failed to add book to cart.");
      }
    });
  } catch (err) {
    console.error("Failed to load product", err);
  }
});
