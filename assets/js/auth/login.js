import { loginUser } from "./auth.js";

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const userData = await loginUser(email, password);
    console.log('API response:', userData);

    const accessToken = userData?.data?.accessToken;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      alert("Login successful!");
      location.reload();
      const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      if (loginModal) loginModal.hide();
    } else {
      throw new Error('accessToken not found in API response');
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert(`Login failed: ${error.message}`);
  }
}

document.getElementById('loginForm').addEventListener('submit', handleLogin);
