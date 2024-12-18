import {
  API_AUCTION_LISTINGS,
  API_PROFILE,
  API_KEY,
  API_AUCTION_CREATE,
  API_AUCTION_SINGLE,
  API_AUCTION_BIDS,
} from "./constants.js";

/**
 * get all listings from api
 * @returns {Promise<Array>} - array of auction listings
 */
export async function fetchListings() {
  try {
    const response = await fetch(
      API_AUCTION_LISTINGS + "?_bids=true&_active=true"
    );
    if (!response.ok) throw new Error("Failed to fetch auction listings.");

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
}

/**
 * sort by date
 * @param {Array} listings
 * @returns {Array}
 */
export function sortByEndingSoon(listings) {
  const activeListings = listings.filter(
    (listing) => new Date(listing.endsAt) > new Date()
  );
  return activeListings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
}

/**
 * sort listings by when created
 * @param {Array} listings
 * @returns {Array}
 */
export function sortByNewest(listings) {
  return [...listings].sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );
}

/**
 * @returns {Promise<object>}user data
 */
export async function getUserProfile() {
  const accessToken = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name");

  if (!accessToken || !name) {
    throw new Error("Try logging in again.");
  }

  const response = await fetch(`${API_PROFILE}/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return await response.json();
}

/**
 * gets user wallet balance
 * @returns {Promise<number>}
 */
export async function getUserWallet() {
  try {
    const profileData = await getUserProfile();
    const walletAmount = profileData?.data?.credits || 0;
    return walletAmount;
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    throw error;
  }
}

/**
 * @param {string} bio
 * @param {string} avatar
 * @returns {Promise<object>}
 */
export async function updateUserProfile(bio, avatarUrl) {
  const accessToken = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name");

  if (!accessToken || !name) {
    throw new Error("Try logging in again.");
  }

  const body = {
    avatar: {
      url: avatarUrl || "",
      alt: "User avatar",
    },
    bio: bio || "",
  };

  const profileEndpoint = `${API_PROFILE}/${name}`;

  try {
    const response = await fetch(profileEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to update user profile: ${
          errorDetails.message || response.statusText
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

/**
 * create new acution
 * @param {string} title
 * @param {string} description
 * @param {string} endsAt
 * @param {Array} media
 * @param {Array} tags - categories
 * @returns {Promise<object>}
 */
export async function createAuction(
  title,
  description,
  endsAt,
  media,
  tags = []
) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("You must be logged in to create an auction.");
  }

  const body = {
    title,
    description,
    endsAt,
    media,
    tags,
  };

  try {
    const response = await fetch(API_AUCTION_CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to create auction: ${
          errorDetails.message || response.statusText
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating auction:", error);
    throw error;
  }
}

/**
 * Fetch listings filtered by tag
 * @param {string} tag - The tag to filter by
 * @returns {Promise<Array>} - Array of auction listings with the specified tag
 */
export async function fetchListingsByTag(tag) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}?_tag=${tag}`);
    if (!response.ok) throw new Error("Failed to fetch filtered listings.");

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching filtered listings:", error);
    throw error;
  }
}

/**
 * get details id
 * @param {string} id
 * @returns {Promise<object>}
 */
export async function fetchAuctionById(id) {
  try {
    const url = API_AUCTION_SINGLE(id) + "?_bids=true";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch post details.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw error;
  }
}

/**
 * place a bid on auction
 * @param {string} listingId
 * @param {number} bidAmount
 * @returns {Promise<object>}
 */
export async function placeBid(listingId, bidAmount) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("You must be logged in to place a bid.");
  }

  const body = {
    amount: bidAmount,
  };

  try {
    const response = await fetch(API_AUCTION_BIDS(listingId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to place bid: ${errorDetails.message || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
}
