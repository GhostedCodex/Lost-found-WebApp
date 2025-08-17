document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("http://localhost:8020/api/items");
  const data = await res.json();

  if (data.success) {
    const grid = document.getElementById("claimedItemsGrid");
    grid.innerHTML = "";

    // Show only claimed items
    data.items
      .filter(item => item.claimed)
      .forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="http://localhost:8020/uploads/${item.item_image}" alt="${item.item_name}">
          <div class="card-content">
            <h3>${item.item_name}</h3>
            <p><strong>Location:</strong> ${item.location_found}</p>
            <p><strong>Date:</strong> ${item.date_found}</p>
            <p><strong>Reporter:</strong> ${item.reporter_name}</p>
            <p style="color: green; font-weight: bold;">✔ Claimed</p>
          </div>
        `;

        grid.appendChild(card);
      });
  }
});