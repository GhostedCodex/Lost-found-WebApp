async function fetchLostItems() {
  try {
    const res = await fetch("http://localhost:8020/api/lost-items/list");
    const lostItems = await res.json();

    const grid = document.getElementById("lostItemsGrid");
    grid.innerHTML = "";

    if (!lostItems.length) {
      grid.innerHTML = "<p>No lost items reported yet.</p>";
      return;
    }

    lostItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${item.item_name}</h3>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Lost Location:</strong> ${item.lost_location || "Not specified"}</p>
        <p><strong>Lost Date:</strong> ${item.lost_date || "Not specified"}</p>
        <p><strong>Reported By:</strong> ${item.reporter_name} (${item.reporter_index})</p>
        <p><strong>Contact:</strong> ${item.reporter_contact || "Not provided"}</p>
      `;

      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching lost items:", err);
    document.getElementById("lostItemsGrid").innerHTML = "<p>Failed to load lost items.</p>";
  }
}

fetchLostItems();