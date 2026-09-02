document.addEventListener('DOMContentLoaded', initializeApplication);

function initializeApplication() {
  // Protect the application
  requireLogin();

  const user = getCurrentUser();

  if (!user) {
    return;
  }

  initializeStore();

  // User Information
  document.querySelector('.user-name').textContent = user.fullName;

  document.querySelector('.user-role').textContent = formatRole(user.role);

  document.querySelector('.avatar').textContent = user.fullName.charAt(0).toUpperCase();

  // Logout
  const logoutButton = document.getElementById('btnLogout');

  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }

  // Load Dashboard
  loadDashboard();
}

/**
 * Highlight Active Menu
 */
function setActiveMenu(menuId) {
  document.querySelectorAll('.nav-menu li').forEach((item) => {
    item.classList.remove('active');
  });

  const menu = document.getElementById(menuId);

  if (menu) {
    menu.classList.add('active');
  }
}

/**
 * Display Friendly Role Names
 */
function formatRole(role) {
  switch (role) {
    case 'ADMINISTRATOR':
      return 'Administrator';

    case 'MANAGER':
      return 'Manager';

    case 'ENGINEER':
      return 'Engineer';

    default:
      return role;
  }
}
