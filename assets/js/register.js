import { API_AUTH_REGISTER } from "./constants.js";

export async function registerUser({ name, email, password }) {
  try {
    const body = {
      name,
      email,
      password
    };

    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message || "Registration failed.");
    }

    const data = await response.json();
    alert("Registration successful! Redirecting to homepage. You can now log in.");
    window.location.href = "../index.html";
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    alert(error.message);
  }
}

export function onRegister(event) {
  event.preventDefault();

  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!name || !email || !password || !confirmPassword) {
    return alert("All fields are required.");
  }

  if (password !== confirmPassword) {
    return alert("Passwords do not match.");
  }

  registerUser({ name, email, password });
}
document.getElementById("registerForm").addEventListener("submit", onRegister);