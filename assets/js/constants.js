export const API_BASE = "https://v2.api.noroff.dev";

export const API_KEY = "161185a7-1308-4868-82d4-e4c5b4cf63d2";

export const API_AUTH = `${API_BASE}/auth`;
export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUCTION = `${API_BASE}/auction`;

export const API_PROFILE = `${API_AUCTION}/profiles`; // Get profile
export const API_AUCTION_LISTINGS = `${API_AUCTION}/listings`; // Get all auction listings
export const API_AUCTION_SINGLE = (id) => `${API_AUCTION}/listings/${id}`; // Get a single auction by ID
export const API_AUCTION_BIDS = (id) => `${API_AUCTION}/listings/${id}/bids`; // Get bids for a specific auction
export const API_AUCTION_CREATE = `${API_AUCTION}/listings`; // Create a new auction listing
export const API_AUCTION_BID = (id) => `${API_AUCTION}/listings/${id}/bids`; // Place a bid on a specific auction
export const API_AUCTION_MEDIA = `${API_AUCTION}/media`; // Media upload for auctions
