document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("claimedItemsGrid");

    try {
        const res = await fetch("http://localhost:8020/api/items");
        const data = await res.json();

        if (data.success) {
            grid.innerHTML = ""; // Clear existing content

            const claimedItems = data.items.filter(item => item.claimed);

            if (claimedItems.length === 0) {
                grid.innerHTML = "<p style='text-align: center; color: var(--text-light);'>No claimed items found yet.</p>";
            } else {
                claimedItems.forEach(item => {
                    const card = document.createElement("div");
                    card.classList.add("item-card");

                    card.innerHTML = `
                        <img src="http://localhost:8020/uploads/${item.item_image}" alt="${item.item_name}">
                        <div class="card-content">
                            <h3>${item.item_name}</h3>
                            <p><strong>Description:</strong> ${item.description}</p>
                            <p><strong>Location:</strong> ${item.location_found}</p>
                            <p><strong>Date Found:</strong> ${item.date_found}</p>
                            <p class="claimed-status">✔ Claimed by ${item.claimed_by_name}</p>
                        </div>
                    `;

                    grid.appendChild(card);
                });
            }
        } else {
            grid.innerHTML = `<p class="message error">${data.message || "Failed to fetch items."}</p>`;
        }
    } catch (err) {
        console.error("Error fetching claimed items:", err);
        grid.innerHTML = `<p class="message error">Failed to connect to the server. Please try again later.</p>`;
    }
});