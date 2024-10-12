// Menu 
const menu = document.querySelector(".hhpk__links");
const menuButton = document.querySelector(".hhpk__icons");
const overlay = document.querySelector("#overlay");

menuButton.addEventListener('click', () => {
    menu.classList.toggle("hhpk__open");
    menuButton.classList.toggle("open");
    overlay.classList.toggle("show");
});


overlay.addEventListener('click', () => {
    menu.classList.toggle("hhpk__open");
    menuButton.classList.toggle("open");
    overlay.classList.toggle("show");
});