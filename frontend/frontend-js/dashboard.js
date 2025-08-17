// Load user data from localStorage
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("You are not logged in.");
  window.location.href = "register.html";
} else {
  document.getElementById("userFullName").textContent = user.full_name;
  document.getElementById("userIndex").textContent = user.index_number;
}

// Logout function
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "register.html";
});