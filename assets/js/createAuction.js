import { createAuction } from "./api.js";

export function initCreateAuctionPage() {
  document.addEventListener("DOMContentLoaded", () => {
    setupCreateAuctionForm();
  });
}

export function setupCreateAuctionForm() {
  const createAuctionForm = document.getElementById("createAuctionForm");

  createAuctionForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("auctionTitle").value.trim();
    const imageUrl = document
      .querySelector('input[placeholder="Image URL 1"]')
      .value.trim();
    const imageAlt = document
      .querySelector('input[placeholder="Image ALT text"]')
      .value.trim();
    const category = document.querySelector(".form-select").value.trim();
    const endsAt = document
      .querySelector('input[type="datetime-local"]')
      .value.trim();
    const description = document
      .querySelector('textarea[placeholder="Enter a description"]')
      .value.trim();

    if (!title || !imageUrl || !endsAt || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    const media = [{ url: imageUrl, alt: imageAlt || "Auction image" }];
    const tags = category ? [category] : [];

    try {
      await createAuction(title, description, endsAt, media, tags);
      alert("Auction created successfully!");
      createAuctionForm.reset();
    } catch (error) {
      console.error("Error creating auction:", error);
      alert("An error occurred while creating the auction. Please try again.");
    }
  });
}
