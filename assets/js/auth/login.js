import { loginUser } from "./auth.js";

export async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userData = await loginUser(email, password);

    const accessToken = userData?.data?.accessToken;
    const name = userData?.data?.name;

    if (accessToken && name) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", name);
      alert("Login successful!");
      location.reload();
      const loginModal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      );
      if (loginModal) loginModal.hide();
    } else {
      throw new Error("accessToken or name not found in API response");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert(`Login failed: ${error.message}`);
  }
}

export function initLoginForm() {
  document.getElementById("loginForm").addEventListener("submit", handleLogin);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLoginForm);
} else {
  initLoginForm();
}
