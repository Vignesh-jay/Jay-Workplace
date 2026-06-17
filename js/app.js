document.addEventListener("DOMContentLoaded", () => {

    initializeStore();

    loadDashboard();

});

function setActiveMenu(menuId){

document.querySelectorAll('.nav-menu li')
    .forEach(item => item.classList.remove('active'));

document
    .getElementById(menuId)
    .classList.add('active');

}