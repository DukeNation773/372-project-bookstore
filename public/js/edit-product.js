document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("Missing product ID.");
    return;
  }

  try {
    const res = await fetch(`/api/products/${id}`);
    const product = await res.json();

    document.getElementById("name").value = product.name;
    document.getElementById("author").value = product.author;
    document.getElementById("description").value = product.description;
    document.getElementById("image_path").value = product.image_path;
    document.getElementById("type").value = product.type;
    document.getElementById("category_id").value = product.category_id;
    document.getElementById("page_count").value = product.page_count;
    document.getElementById("price").value = product.price;
  } catch (err) {
    console.error("Error loading product:", err);
    alert("Failed to load product data.");
  }

  document.getElementById("edit-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const updated = {
      name: document.getElementById("name").value,
      author: document.getElementById("author").value,
      description: document.getElementById("description").value,
      image_path: document.getElementById("image_path").value,
      type: document.getElementById("type").value,
      category_id: parseInt(document.getElementById("category_id").value),
      page_count: parseInt(document.getElementById("page_count").value),
      price: parseFloat(document.getElementById("price").value),
    };

    const res = await fetch(`/api/admin/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      alert("Product updated successfully!");
      window.location.href = "admin-products.html";
    } else {
      alert("Failed to update product.");
    }
  });
});
