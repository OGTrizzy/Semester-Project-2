import { placeBid } from "./api.js";

/**
 * handle logic for auction
 * @param {string} listingId
 * @param {number} bidAmount
 * @returns {Promise<void>}
 */
export async function addBid(listingId, bidAmount) {
  if (!listingId || !bidAmount || bidAmount <= 0) {
    throw new Error("Invalid listing ID or bid amount.");
  }

  try {
    await placeBid(listingId, bidAmount);
    return true;
  } catch (error) {
    console.error("Failed to place bid:", error);
    throw new Error(`Failed to place bid: ${error.message}`);
  }
}
