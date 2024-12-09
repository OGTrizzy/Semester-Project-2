import { fetchAuctionById } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    console.error("No post ID provided in URL");
    return;
  }

  try {
    const post = await fetchAuctionById(postId);
    console.log(post);

    const mainImage = document.getElementById("main-image");
    mainImage.src = post.data.media[0]?.url || "";
    mainImage.alt = post.data.media[0]?.alt || "Auction Item";

    document.getElementById("item-title").textContent = post.data.title;
    document.getElementById("item-description").textContent =
      post.data.description || "No description available";

    document.getElementById("highest-bid").textContent = `${
      post.data._count.bids || 0
    } NOK`;
    document.getElementById("seller-phone").textContent = "+47 98765432";

    const endsAt = new Date(post.data.endsAt); // im gonna be honest, i had help with this part and i think i understand it but not quite
    document.getElementById("ends-at").textContent = endsAt.toLocaleString();
    const timeRemaining = Math.max(0, endsAt - Date.now());

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById(
      "time-remaining"
    ).textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } catch (error) {
    console.error("Failed to load post details:", error);
  }
});
