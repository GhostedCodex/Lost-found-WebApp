document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("http://localhost:8020/api/items");
  const data = await res.json();

  if (data.success) {
    const grid = document.getElementById("itemsGrid");
    grid.innerHTML = "";

    // Show only items that are NOT claimed
    data.items
      .filter(item => !item.claimed)
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
          </div>
          <button onclick="claimItem(${item.id})">Claim</button>
        `;

        grid.appendChild(card);
      });
  }
});

function claimItem(itemId) {
  // Save the id so claim-item page knows which item is being claimed
  localStorage.setItem("claimedItemId", itemId);
  window.location.href = "claim-item.html";
}