async function loadProducts() {
  const res = await fetch("/api/admin/products");
  const products = await res.json();

  const tbody = document.querySelector("#product-table tbody");
  tbody.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.id}</td>
      <td><img src="${product.image_path}" width="40"></td>
      <td>${product.name}</td>
      <td>${product.type}</td>
      <td>${product.category_id}</td>
      <td>${product.page_count}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>${product.status}</td>
      <td>
        <a href="edit-product.html?id=${
          product.id
        }" class="edit-btn"><button class="edit-btn">Edit</button></a>
        <button class="archive-btn" data-id="${product.id}" data-status="${
      product.status
    }">
          ${product.status === "archived" ? "Unarchive" : "Archive"}
        </button>
        <button class="delete-btn" data-id="${product.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

document.getElementById("add-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const newProduct = {
    name: form.name.value,
    author: form.author.value,
    type: form.type.value,
    category_id: parseInt(form.category_id.value),
    page_count: parseInt(form.page_count.value),
    price: parseFloat(form.price.value),
    image_path: form.image_path.value,
    description: form.description.value,
  };

  try {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    if (res.ok) {
      alert("Product added successfully!");
      await loadProducts();
      form.reset();
    } else {
      alert("Failed to add product.");
    }
  } catch (err) {
    console.error("Error adding product:", err);
  }
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");

    try {
      const res = await fetch(`/api/admin/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadProducts();
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Error deleting product.");
    }
  }

  if (e.target.classList.contains("archive-btn")) {
    const id = e.target.getAttribute("data-id");
    const currentStatus = e.target.getAttribute("data-status");

    const res = await fetch(`/api/admin/archive/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentStatus }),
    });

    if (res.ok) {
      await loadProducts();
    } else {
      alert("Failed to archive/unarchive product.");
    }
  }

  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.getAttribute("data-id");
    window.location.href = `edit-product.html?id=${id}`;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
});
