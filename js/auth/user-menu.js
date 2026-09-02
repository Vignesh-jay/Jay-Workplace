const menuButton = document.getElementById('userMenuButton');
const dropdown = document.getElementById('userDropdownMenu');
const arrow = document.getElementById('userMenuArrow');

if (menuButton && dropdown) {
  menuButton.addEventListener('click', (event) => {
    event.stopPropagation();

    dropdown.classList.toggle('show');

    if (arrow) {
      arrow.classList.toggle('rotate');
    }
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('show');

    if (arrow) {
      arrow.classList.remove('rotate');
    }
  });

  dropdown.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}
