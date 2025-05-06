document.addEventListener("DOMContentLoaded", async () => {
  const userId = 1;
  const cartItemsContainer = document.getElementById("cart-items");

  try {
    const res = await fetch(`/api/cart/view?user_id=${userId}`);
    const cart = await res.json();

    if (!cart || !Array.isArray(cart.items)) {
      throw new Error("Invalid cart format received.");
    }

    let subtotal = 0;

    cart.items.forEach((item) => {
      const total = item.price * item.quantity;
      subtotal += total;

      const row = document.createElement("tr");
      row.classList.add("cart-item");

      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <input 
            class="quantity-input" 
            type="number" 
            value="${item.quantity}" 
            min="1" 
            data-id="${item.product_id}"
          >
        </td>
        <td>$${total.toFixed(2)}</td>
        <td>
          <button class="remove-btn" data-id="${item.product_id}">
            Remove
          </button>
        </td>
      `;

      cartItemsContainer.appendChild(row);
    });

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", async () => {
        const productId = input.getAttribute("data-id");
        const newQuantity = parseInt(input.value);
        const userId = 1;

        console.log("Updating product", productId, "to quantity", newQuantity);

        const res = await fetch("/api/cart/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            product_id: productId,
            quantity: newQuantity,
          }),
        });

        if (res.ok) {
          const row = input.closest("tr");
          const priceCell = row.querySelector("td:nth-child(2)");
          const price = parseFloat(priceCell.textContent.replace("$", ""));
          const totalCell = row.querySelector("td:nth-child(4)");
          const newTotal = price * newQuantity;
          totalCell.textContent = `$${newTotal.toFixed(2)}`;

          let subtotal = 0;
          document.querySelectorAll(".cart-item").forEach((r) => {
            const qty = parseInt(r.querySelector(".quantity-input").value);
            const prc = parseFloat(
              r.querySelector("td:nth-child(2)").textContent.replace("$", "")
            );
            subtotal += qty * prc;
          });

          const tax = subtotal * 0.0675;
          const delivery = 5;
          const total = subtotal + tax + delivery;

          document.getElementById("subtotal").textContent = subtotal.toFixed(2);
          document.getElementById("tax").textContent = tax.toFixed(2);
          document.getElementById("delivery").textContent = delivery.toFixed(2);
          document.getElementById("total").textContent = total.toFixed(2);
        } else {
          alert("Failed to update quantity.");
        }

      });
    });

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const productId = parseInt(btn.getAttribute("data-id"));

        const res = await fetch(`/api/cart/remove/${productId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        });

        if (res.ok) {
          window.location.reload();
        } else {
          alert("Failed to remove item.");
        }
      });
    });

    const tax = subtotal * 0.0675;
    const delivery = 5;
    const total = subtotal + tax + delivery;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("delivery").textContent = delivery.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
  } catch (err) {
    console.error("Failed to load cart", err);
  }

  document
    .getElementById("checkout-btn")
    .addEventListener("click", async () => {
      const res = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      if (res.ok) {
        alert("Checked out successfully!");
        window.location.reload();
      } else {
        alert("Checkout failed.");
      }
    });
});
