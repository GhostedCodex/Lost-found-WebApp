document.addEventListener("DOMContentLoaded", () => {
    const lostItemForm = document.getElementById("lostItemForm");
    const msgDiv = document.getElementById("msg");

    lostItemForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        // Clear previous messages
        msgDiv.textContent = "";
        msgDiv.className = "message";

        // Efficiently create a JSON object from form data
        const formData = Object.fromEntries(new FormData(this));

        try {
            const res = await fetch("http://localhost:8020/api/lost-items/report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Show success message
                msgDiv.textContent = data.message || "Report submitted successfully! Redirecting...";
                msgDiv.classList.add("success");
                
                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    window.location.href = "dashboard.html"; // Or another appropriate page
                }, 2000);

            } else {
                // Show error message from server
                msgDiv.textContent = data.message || "Something went wrong!";
                msgDiv.classList.add("error");
            }
        } catch (err) {
            console.error("Error:", err);
            // Show network or server connection error
            msgDiv.textContent = "Failed to connect to the server. Please try again later.";
            msgDiv.classList.add("error");
        }
    });
});