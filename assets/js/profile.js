import { getUserProfile } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const profileImage = document.getElementById("profileImage");
  const profileUsername = document.getElementById("profileUsername");
  const bioInput = document.getElementById("bio");

  const name = localStorage.getItem('name');

  if (!name) {
    alert("User is not logged in or name is missing.");
    window.location.href = "../index.html";
    return;
  }

  try {
    const userData = await getUserProfile();
    profileImage.src = userData.avatar || "placeholder.jpg";
    profileUsername.textContent = name;
    bioInput.value = userData.bio || "";
  } catch (error) {
    console.error("Error fetching user profile:", error);
    alert("Could not load profile data.");
  }
});
