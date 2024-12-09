import { getUserWallet } from "./api.js"; // Importer getUserWallet fra api.js

document.addEventListener("DOMContentLoaded", async () => {
  const authButtonsContainer = document.getElementById("authButtons");
  const accessToken = localStorage.getItem("accessToken");

  const categories = [
    "Cars",
    "Car parts",
    "Moped",
    "MC",
    "House",
    "Furniture",
    "Market",
    "Other",
  ];

  const categoryButton = document.querySelector(".btn-outline-secondary");
  const categoryDropdown = document.createElement("ul");
  categoryDropdown.className = "dropdown-menu";

  categories.forEach((category) => {
    const categoryItem = document.createElement("li");
    categoryItem.innerHTML = `<a class="dropdown-item" href="../pages/category.html?category=${encodeURIComponent(
      category
    )}">${category}</a> 
        <div class="b-line-normal"></div>`;
    categoryDropdown.appendChild(categoryItem);
  });

  categoryButton.addEventListener("click", () => {
    if (categoryDropdown.style.display === "block") {
      categoryDropdown.style.display = "none";
    } else {
      categoryDropdown.style.display = "block";
    }
  });

  categoryButton.parentElement.appendChild(categoryDropdown);

  if (accessToken) {
    // user is logged in
    const username = localStorage.getItem("name");
    if (username) {
      try {
        const walletAmount = await getUserWallet();
        authButtonsContainer.innerHTML = `
            <li class="nav-item">
              <a class="nav-link text-decoration-none" href="../pages/profile.html">Profile</a>
            </li>
            <li class="nav-item">
              <p class="nav-link text-decoration-none">
                Wallet: ${walletAmount} NOK
              </p>
            </li>
            <li class="nav-item">
              <a class="nav-link text-decoration-none" id="logoutButton" href="#">Logout</a>
            </li>
          `;
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
      }
    }

    // Logout btn eventlistener
    document.getElementById("logoutButton").addEventListener("click", () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("name");
      alert("You have been logged out.");
      location.href = "/";
      location.reload();
    });
  } else {
    // User not logged in
    authButtonsContainer.innerHTML = `
      <li class="nav-item">
        <a class="nav-link text-decoration-none" href="./pages/register.html">Register</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-decoration-none" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
      </li>
    `;
  }
});
