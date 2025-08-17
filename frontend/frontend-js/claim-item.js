document.getElementById("claimForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const itemId = localStorage.getItem("claimedItemId"); // retrieve saved itemId

  const formData = {
    claimant_name: e.target.name.value,
    index_number: e.target.index.value,
    phone_contact: e.target.phone.value,
    email: e.target.email.value,
    level: e.target.level.value,
    course_of_study: e.target.course.value
    };

  try {
    const res = await fetch(`http://localhost:8020/api/items/claim/${itemId}`, {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    document.getElementById("message").textContent = data.message;

    if (data.success) {
      localStorage.removeItem("claimedItemId");
      setTimeout(() => {
        window.location.href = "view-items.html";
      }, 2000);
    }
  } catch (error) {
    document.getElementById("message").textContent = "Error submitting claim.";
  }
});