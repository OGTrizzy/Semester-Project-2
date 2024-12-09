import { getUserProfile, updateUserProfile } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const profileImage = document.getElementById("profileImage");
  const profileUsername = document.getElementById("profileUsername");
  const bioInput = document.getElementById("bio");
  const profileImageUrl = document.getElementById("profileImageUrl");
  const updateProfileButton = document.getElementById("updateProfile");

  const name = localStorage.getItem("name");

  if (!name) {
    alert("User is not logged in or name is missing.");
    window.location.href = "../index.html";
    return;
  }

  try {
    const userData = await getUserProfile();
    const avatarUrl = userData?.data.avatar?.url || "";
    const bioText = userData?.data.bio || "";

    profileImage.src = avatarUrl;
    profileUsername.textContent = name;
    bioInput.value = bioText;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    alert("Could not load profile data.");
  }

  updateProfileButton.addEventListener("click", async () => {
    const newImageUrl = profileImageUrl.value;
    const newBio = bioInput.value;

    try {
      await updateUserProfile(newBio, newImageUrl);

      profileImage.src = newImageUrl;
      bioInput.value = newBio;

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  });
});
