import { fetchListings, sortByEndingSoon, sortByNewest } from "./api.js";
import { calculateHighestBid } from "./highestBid.js";

export async function initHomePage() {
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
}

/**
 * render a list of auctions
 * @param {Array} listings
 * @param {HTMLElement} container
 */
export function renderListings(listings, container) {
  if (!container) {
    console.error("Container element not found.");
    return;
  }

  container.innerHTML = listings
    .map((listing) => {
      const highestBid = calculateHighestBid(listing.bids);
      const formattedPrice = highestBid.toLocaleString("no-NO", {
        style: "currency",
        currency: "NOK",
      });

      return `
        <div class="col-md-3 mb-4 m-h-300">
          <div class="card auction-post-styles">
            <img class="auction-image" src="${
              listing.media[0]?.url ||
              "/Semester-Project-2/assets/images/placeholder-image-person-jpg.jpg"
            }" class="card-img-top" alt="${listing.title}">
            <div class="card-body">
              <h5 class="card-title">${listing.title}</h5>
              <p class="card-text">Ends: ${new Date(
                listing.endsAt
              ).toLocaleDateString()}</p>
              <p class="card-text">Price: ${formattedPrice}</p>
              <a href="./pages/postInfo.html?id=${
                listing.id
              }" class="btn btn-primary w-100">View Auction</a>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}
