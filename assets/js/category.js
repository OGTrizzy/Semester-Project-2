import { fetchListingsByTag } from "./api.js";

export function initCategoryPage() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", handleCategoryPageLoad);
  } else {
    handleCategoryPageLoad();
  }
}

/**
 * handles the rendering of auctions
 */
async function handleCategoryPageLoad() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  const categoryContainer = document.getElementById("categoryListings");
  const categoryTitle = document.getElementById("categoryTitle");

  if (!category) {
    console.error("No category specified in the URL.");
    displayMessage(categoryContainer, "No category selected.");
    return;
  }

  categoryTitle.textContent = category;

  try {
    const filteredListings = await fetchListingsByTag(category);

    if (!filteredListings || filteredListings.length === 0) {
      displayMessage(
        categoryContainer,
        `No listings found for category: ${category}`
      );
    } else {
      renderListings(filteredListings, categoryContainer);
    }
  } catch (error) {
    console.error("Error loading filtered listings:", error);
    displayMessage(
      categoryContainer,
      `Error loading listings for category: ${category}`
    );
  }
}

/**
 * displays messages in specific container
 * @param {HTMLElement} container
 * @param {string} message
 */
function displayMessage(container, message) {
  container.innerHTML = `<p>${message}</p>`;
}

/**
 * render the filtered listings in the container
 * @param {Array} listings
 * @param {HTMLElement} container
 */
function renderListings(listings, container) {
  container.innerHTML = listings
    .map(
      (listing) => `
      <div class="col-md-3 mb-4 m-h-300">
        <div class="card auction-post-styles">
          <img 
            class="auction-image card-img-top" 
            src="${
              listing.media[0]?.url ||
              "../assets/images/placeholder-image-person-jpg.jpg"
            }" 
            alt="${listing.title}">
          <div class="card-body">
            <h5 class="card-title">${listing.title}</h5>
            <p class="card-text">Ends: ${new Date(
              listing.endsAt
            ).toLocaleDateString()}</p>
            <a href="./postInfo.html?id=${
              listing.id
            }" class="btn btn-primary">View Auction</a>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

initCategoryPage();

export { handleCategoryPageLoad, displayMessage, renderListings };
