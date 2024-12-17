import { fetchAuctionById } from "./api.js";
import { addBid } from "./bidding.js";
import { calculateHighestBid } from "./highestBid.js";

export async function initAuctionDetailsPage() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    console.error("No post ID provided in URL");
    return;
  }

  try {
    const post = await fetchAuctionById(postId);
    displayAuctionDetails(post);
    setupBidForm(postId);
    setupViewBidsButton(post);
  } catch (error) {
    console.error("Failed to load post details:", error);
  }
}

/**
 * displays auction details on the page
 * @param {object} post
 */
export function displayAuctionDetails(post) {
  const mainImage = document.getElementById("main-image");
  mainImage.src = post.data.media[0]?.url || "";
  mainImage.alt = post.data.media[0]?.alt || "Auction Item";

  document.getElementById("item-title").textContent = post.data.title;
  document.getElementById("item-description").textContent =
    post.data.description || "No description available";

  const highestBid = calculateHighestBid(post.data.bids);
  document.getElementById("highest-bid").textContent = `${highestBid} NOK`;

  const endsAt = new Date(post.data.endsAt);
  document.getElementById("ends-at").textContent = endsAt.toLocaleString();

  const timeRemaining = calculateTimeRemaining(endsAt);
  document.getElementById("time-remaining").textContent = timeRemaining;

  document.getElementById("seller-phone").textContent = "+47 98765432";
}

/**
 * sets up the form to submit bids
 * @param {string} postId
 */
export function setupBidForm(postId) {
  const bidForm = document.getElementById("bid-form");
  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const bidAmount = parseFloat(document.getElementById("bid-amount").value);

    try {
      const success = await addBid(postId, bidAmount);
      if (success) {
        document.getElementById("highest-bid").textContent = `${bidAmount} NOK`;
        alert("Bid submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to submit bid. Please try again.");
    }
  });
}

/**
 * sets up the button to view bids
 * @param {object} post
 */
export function setupViewBidsButton(post) {
  const viewBidsBtn = document.getElementById("view-bids-btn");
  const bidCount = post.data._count.bids || 0;
  viewBidsBtn.textContent = `${bidCount} bids`;

  viewBidsBtn.addEventListener("click", () => {
    renderBidsList(post.data.bids);
    const bidsModal = new bootstrap.Modal(document.getElementById("bidsModal"));
    bidsModal.show();

    const bidsModalElement = document.getElementById("bidsModal");
    bidsModalElement.addEventListener("hidden.bs.modal", () => {
      document.body.classList.remove("modal-open");
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
    });
  });
}

/**
 * calculates the remaining time
 * @param {Date} endsAt
 * @returns {string}
 */
export function calculateTimeRemaining(endsAt) {
  const timeRemaining = Math.max(0, endsAt - Date.now());
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

/**
 * renders a list of bids
 * @param {Array} bids
 */
export function renderBidsList(bids) {
  const bidsList = document.getElementById("bids-list");
  bidsList.innerHTML = "";

  if (!bids || bids.length === 0) {
    const noBids = document.createElement("li");
    noBids.className = "list-group-item text-muted";
    noBids.textContent = "No bids have been made on this listing yet.";
    bidsList.appendChild(noBids);
    return;
  }

  bids.forEach((bid) => {
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";

    const profileImage = document.createElement("img");
    profileImage.src = bid.bidder.avatar.url || "default-avatar.png";
    profileImage.alt = bid.bidder.name || "Bidder";
    profileImage.className = "rounded-circle me-2";
    profileImage.style.width = "40px";
    profileImage.style.height = "40px";

    const bidderInfo = document.createElement("span");
    bidderInfo.textContent = `${bid.bidder.name} - ${bid.amount} NOK`;

    const bidTime = document.createElement("span");
    bidTime.className = "badge bg-primary rounded-pill";
    bidTime.textContent = new Date(bid.created).toLocaleString();

    listItem.appendChild(profileImage);
    listItem.appendChild(bidderInfo);
    listItem.appendChild(bidTime);
    bidsList.appendChild(listItem);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initAuctionDetailsPage();
  });
} else {
  initAuctionDetailsPage();
}
