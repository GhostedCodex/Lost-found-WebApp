document.getElementById("lostItemForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(this));

  try {
    const res = await fetch("http://localhost:8020/api/lost-items/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message || "Something went wrong!");

    if (data.success) {
      window.location.href = "dashboard.html";
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to connect to server.");
  }
});