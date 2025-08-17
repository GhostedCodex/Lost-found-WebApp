document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:8020/api/items");
    const data = await res.json();

    if (data.success) {
      const grid = document.getElementById("itemsGrid");

      data.items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("item-card");

        const img = document.createElement("img");
        img.src = item.item_image 
          ? `http://localhost:8020/uploads/${item.item_image}` 
          : "placeholder.png"; // fallback if no image
        img.alt = item.item_name;

        const details = document.createElement("div");
        details.classList.add("item-details");

        details.innerHTML = `
          <h3>${item.item_name}</h3>
          <p><strong>Found at:</strong> ${item.location_found}</p>
          <p><strong>Date:</strong> ${item.date_found}</p>
          <p><strong>Reporter:</strong> ${item.reporter_name} (${item.reporter_index})</p>
          <p>${item.description || ""}</p>
        `;

        card.appendChild(img);
        card.appendChild(details);
        grid.appendChild(card);
      });
    }
  } catch (err) {
    console.error("Error fetching items:", err);
  }
});