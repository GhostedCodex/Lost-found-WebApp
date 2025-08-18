// This function needs to be global to be accessible by the inline onclick attribute
function claimItem(itemId) {
    // Save the id so the claim-item page knows which item is being claimed
    localStorage.setItem("claimedItemId", itemId);
    window.location.href = "claim-item.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("itemsGrid");

    try {
        const res = await fetch("http://localhost:8020/api/items");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        
        // Clear the grid (removes the loader)
        grid.innerHTML = "";

        if (data.success) {
            const unclaimedItems = data.items.filter(item => !item.claimed);

            if (unclaimedItems.length === 0) {
                grid.innerHTML = `<p class="error-message" style="background-color: #eef; color: #555;">No unclaimed items found at the moment.</p>`;
                return;
            }

            unclaimedItems.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("card");

                // Format the date for better readability
                const formattedDate = new Date(item.date_found).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                });

                card.innerHTML = `
                    <img src="http://localhost:8020/uploads/${item.item_image}" alt="${item.item_name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x220.png?text=No+Image';">
                    <div class="card-content">
                        <h3>${item.item_name}</h3>
                        <p><strong>Location:</strong> ${item.location_found || 'Not specified'}</p>
                        <p><strong>Date Found:</strong> ${formattedDate}</p>
                        <p><strong>Reporter:</strong> ${item.reporter_name}</p>
                    </div>
                    <button onclick="claimItem(${item.id})">Claim This Item</button>
                `;

                grid.appendChild(card);
            });
        } else {
             throw new Error(data.message || "Failed to load items.");
        }
    } catch (error) {
        console.error("Error fetching items:", error);
        // Display an error message to the user
        grid.innerHTML = `<p class="error-message">Could not load items. Please try again later.</p>`;
    }
});