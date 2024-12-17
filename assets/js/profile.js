import { getUserProfile, updateUserProfile } from "./api.js";

export function initUserProfilePage() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
}

async function initialize() {
  const elements = {
    profileImage: document.getElementById("profileImage"),
    profileUsername: document.getElementById("profileUsername"),
    profileBio: document.getElementById("profileBio"),
    bioInput: document.getElementById("bio"),
    profileImageUrl: document.getElementById("profileImageUrl"),
    editProfileButton: document.getElementById("editProfile"),
    saveProfileButton: document.getElementById("saveProfile"),
    editProfileSection: document.getElementById("editProfileSection"),
  };

  const username = localStorage.getItem("name");

  if (!username) {
    alert("User is not logged in or name is missing.");
    window.location.href = "../index.html";
    return;
  }

  try {
    await loadUserProfile(elements, username);
  } catch (error) {
    console.error("Error initializing user profile:", error);
  }

  elements.editProfileButton.addEventListener("click", () =>
    toggleEditSection(elements, true)
  );

  elements.saveProfileButton.addEventListener("click", async () => {
    await saveProfile(elements);
  });
}

/**
 * load the user data
 * @param {object} elements
 * @param {string} username
 */
async function loadUserProfile(elements, username) {
  try {
    const userData = await getUserProfile();
    const avatarUrl = userData?.data.avatar?.url || "";
    const bioText = userData?.data.bio || "No bio available";

    elements.profileImage.src = avatarUrl;
    elements.profileUsername.textContent = username;
    elements.profileBio.textContent = bioText;
    elements.bioInput.value = bioText;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    alert("Could not load profile data.");
  }
}

/**
 * toggle edit panel
 * @param {object} elements
 * @param {boolean} isVisible
 */
function toggleEditSection(elements, isVisible) {
  elements.editProfileSection.style.display = isVisible ? "block" : "none";
  elements.editProfileButton.style.display = isVisible ? "none" : "block";
}

/**
 * save the updated profile
 * @param {object} elements
 */
async function saveProfile(elements) {
  const newImageUrl = elements.profileImageUrl.value.trim();
  const newBio = elements.bioInput.value.trim();

  try {
    await updateUserProfile(newBio, newImageUrl);

    if (newImageUrl) {
      elements.profileImage.src = newImageUrl;
    }
    elements.profileBio.textContent = newBio || elements.profileBio.textContent;

    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile.");
  } finally {
    toggleEditSection(elements, false);
  }
}

initUserProfilePage();

export { initialize, loadUserProfile, toggleEditSection, saveProfile };
