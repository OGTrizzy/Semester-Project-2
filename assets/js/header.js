document.addEventListener('DOMContentLoaded', () => {
    const authButtonsContainer = document.getElementById('authButtons'); // HUSK: Oppdater HTML med denne ID-en!
    const accessToken = localStorage.getItem('accessToken');
  
    if (accessToken) {
      // Brukeren er logget inn
      authButtonsContainer.innerHTML = `
        <li class="nav-item">
          <a class="nav-link text-decoration-none" href="./pages/profile.html">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-decoration-none" id="logoutButton" href="#">Logout</a>
        </li>
      `;
  
      // Logout-knappens event listener
      document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        alert('You have been logged out.');
        location.reload();
      });
    } else {
      // Brukeren er ikke logget inn
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