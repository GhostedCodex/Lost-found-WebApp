document.getElementById("reportForm").addEventListener("submit", async (e) => {
  e.preventDefault();

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
      body: formData
    });

    const data = await res.json();
    document.getElementById("msg").innerText = data.message;
  } catch (err) {
    console.error("Error:", err);
    document.getElementById("msg").innerText = "Failed to report item";
  }
});