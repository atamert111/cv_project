const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.top-buttons');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});
