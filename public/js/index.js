document
  .getElementById("random-book-btn")
  .addEventListener("click", async () => {
    const offset = Math.floor(Math.random() * 1000);
    const url = `https://openlibrary.org/subjects/fantasy.json?limit=1&offset=${offset}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const title = data.works[0]?.title || "No book found";

      document.getElementById("random-book-title").textContent = `"${title}"`;
    } catch (err) {
      document.getElementById("random-book-title").textContent =
        "Error fetching book.";
      console.error(err);
    }
  });
