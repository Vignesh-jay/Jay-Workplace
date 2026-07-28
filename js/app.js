document.addEventListener('DOMContentLoaded', () => {
  if (!isLoggedIn()) {
    window.location = 'login.html';

    return;
  }

  initializeStore();

  const user = getCurrentUser();

  document.querySelector('.user-name').textContent = user.fullName;

  document.querySelector('.user-role').textContent = user.role;

  document.querySelector('.avatar').textContent = user.fullName.charAt(0).toUpperCase();

  loadDashboard();
});

function setActiveMenu(menuId) {
  document.querySelectorAll('.nav-menu li').forEach((item) => item.classList.remove('active'));

  document.getElementById(menuId).classList.add('active');
}
