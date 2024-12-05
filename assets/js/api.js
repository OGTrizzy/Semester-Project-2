import { API_AUCTION_LISTINGS, API_PROFILE, API_KEY, API_AUCTION_CREATE } from "./constants.js";

/**
 * get all listings from api
 * @returns {Promise<Array>} - array of auction listings
 */
export async function fetchListings() {
  try {
    const response = await fetch(API_AUCTION_LISTINGS);
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
  return [...listings].sort(
    (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
  );
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
          "Authorization": `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
      },
  });

  if (!response.ok) {
      throw new Error("Failed to fetch user profile");
  }

  return await response.json();
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
      throw new Error("Try logging in igjen.");
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
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
              "X-Noroff-API-Key": API_KEY,
          },
          body: JSON.stringify(body),
      });

      if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(`Failed to update user profile: ${errorDetails.message || response.statusText}`);
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
export async function createAuction(title, description, endsAt, media, tags = []) {
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
      throw new Error(`Failed to create auction: ${errorDetails.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating auction:", error);
    throw error;
  }
}