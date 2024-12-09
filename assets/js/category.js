import { fetchListingsByTag } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const categoryContainer = document.getElementById("categoryListings");
  const categoryTitle = document.getElementById("categoryTitle");

  if (category) {
    categoryTitle.textContent = category;
  } else {
    categoryTitle.textContent = "Unknown Category"; //this is nice to have in case of anything
  }

  if (!category) {
    console.error("No category specified in the URL.");
    categoryContainer.innerHTML = "<p>No category selected.</p>";
    return;
  }

  try {
    const filteredListings = await fetchListingsByTag(category);

    if (filteredListings.length === 0) {
      categoryContainer.innerHTML = `<p>No listings found for category: ${category}</p>`;
    } else {
      renderListings(filteredListings, categoryContainer);
    }
  } catch (error) {
    console.error("Error loading filtered listings:", error);
    categoryContainer.innerHTML = `<p>Error loading listings for category: ${category}</p>`;
  }
});

/**
 * get a list of auctions
 * @param {Array} listings
 * @param {HTMLElement} container
 */
function renderListings(listings, container) {
  container.innerHTML = listings
    .map(
      (listing) => `
      <div class="col-md-3 mb-4">
        <div class="card">
          <img class="auction-image" src="${
            listing.media[0]?.url || ""
          }" class="card-img-top" alt="${listing.title}">
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
