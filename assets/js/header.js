document.addEventListener('DOMContentLoaded', () => {
    const authButtonsContainer = document.getElementById('authButtons');
    const accessToken = localStorage.getItem('accessToken');
  
    if (accessToken) {
      // user is logged in
      authButtonsContainer.innerHTML = `
        <li class="nav-item">
          <a class="nav-link text-decoration-none" href="./pages/profile.html">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-decoration-none" id="logoutButton" href="#">Logout</a>
        </li>
      `;
  
      // Logout btn eventlistener
      document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        alert('You have been logged out.');
        location.href('/');
        location.reload();
      });
    } else {
      //User not logged in
      authButtonsContainer.innerHTML = `
        <li class="nav-item">
          <a class="nav-link text-decoration-none" href="./pages/register.html">Register</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-decoration-none" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
        </li>
      `;
    }
  });  