import { API_AUCTION_LISTINGS, API_PROFILE, API_KEY } from "./constants.js";

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
    const response = await fetch(`${API_PROFILE}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
  
    return await response.json();
  }
  
/**
 * @param {string} bio
 * @param {string} avatar
 * @returns {Promise<object>}
 */
export async function updateUserProfile(bio, avatar) {
    try {
      const body = { bio };

      if (avatar && avatar.startsWith("http")) {
        body.avatar = avatar;
      }
  
      const response = await fetch(API_PROFILE, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }