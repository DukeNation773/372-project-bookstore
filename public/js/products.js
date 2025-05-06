document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("product-container");

  try {
    const res = await fetch("/api/products");
    const products = await res.json();

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-preview";

      card.innerHTML = `
        <img src="${product.image_path}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <a href="product-view.html?id=${product.id}">View</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load products:", err);
    container.innerHTML = `<p>Sorry, we couldn't load the books.</p>`;
  }
});
