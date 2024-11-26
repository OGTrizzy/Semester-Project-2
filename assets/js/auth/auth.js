import { API_AUTH_LOGIN, API_AUTH_REGISTER } from '../constants.js';

/**
 * Function to handle user login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} - Response data or error
 */
export async function loginUser(email, password) {
    try {
    const response = await fetch(API_AUTH_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Function to handle user registration
 * @param {string} name - User full name
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} - Response data or error
 */
export async function registerUser(name, email, password) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to register. Please check your input.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
