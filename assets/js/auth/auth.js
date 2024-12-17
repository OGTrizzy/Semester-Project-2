import { API_AUTH_LOGIN, API_AUTH_REGISTER } from "../constants.js";

export async function loginUser(email, password) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}

export async function registerUser(name, email, password) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to register. Please check your input.");
    }

    return await response.json();
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
}
