document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById("reportForm");
    const msgDiv = document.getElementById("msg");

    reportForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Clear previous messages
        msgDiv.textContent = "";
        msgDiv.className = "message";

        const formData = new FormData();
        formData.append("item_name", document.getElementById("item_name").value);
        formData.append("description", document.getElementById("description").value);
        formData.append("location_found", document.getElementById("location_found").value);
        formData.append("date_found", document.getElementById("date_found").value);
        formData.append("reporter_name", document.getElementById("reporter_name").value);
        formData.append("reporter_index", document.getElementById("reporter_index").value);

        const fileInput = document.getElementById("item_image");
        if (fileInput.files.length > 0) {
            formData.append("item_image", fileInput.files[0]);
        }

        try {
            const res = await fetch("http://localhost:8020/api/items/report", {
                method: "POST",
                body: formData // No Content-Type header needed; the browser sets it for FormData
            });

            const data = await res.json();

            if (res.ok) {
                msgDiv.textContent = data.message || "Item reported successfully!";
                msgDiv.classList.add("success");
                reportForm.reset(); // Clear the form fields on success
            } else {
                msgDiv.textContent = data.message || "Failed to report item.";
                msgDiv.classList.add("error");
            }
        } catch (err) {
            console.error("Error:", err);
            msgDiv.textContent = "An error occurred. Could not connect to the server.";
            msgDiv.classList.add("error");
        }
    });
});