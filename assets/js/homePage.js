import { fetchListings, sortByEndingSoon, sortByNewest } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const latestRow = document.getElementById("latestListings");
  const endingSoonRow = document.getElementById("endingSoonListings");
  const newestRow = document.getElementById("newestListings");

  try {
    const listings = await fetchListings();

    const latestListings = listings.slice(0, 4);
    const endingSoonListings = sortByEndingSoon(listings).slice(0, 4);
    const newestListings = sortByNewest(listings).slice(0, 16);

    renderListings(latestListings, latestRow);
    renderListings(endingSoonListings, endingSoonRow);
    renderListings(newestListings, newestRow);
  } catch (error) {
    console.error("Error loading listings:", error);
  }
});

/**
 * render a list of auctions
 * @param {Array} listings
 * @param {HTMLElement} container
 */
function renderListings(listings, container) {
  container.innerHTML = listings
    .map((listing) => {
      const price =
        listing.bids && listing.bids.length > 0
          ? listing.bids[listing.bids.length - 1].amount
          : 0;

      const formattedPrice = price.toLocaleString("no-NO", {
        style: "currency",
        currency: "NOK",
      });

      return `
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
              <p class="card-text">Price: ${formattedPrice}</p> <!-- Vis prisen her -->
              <a href="./pages/postInfo.html?id=${
                listing.id
              }" class="btn btn-primary">View Auction</a>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}
