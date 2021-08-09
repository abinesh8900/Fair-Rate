const topHeader = document.getElementById("main-header");
const navMenu = document.getElementById("menu-btn");
const showNav = document.getElementById("show-nav");
const mainBody = document.getElementById("main");

window.addEventListener("scroll", function () {
  topHeader.classList.toggle("sticky-nav", window.scrollY > 0);
});

navMenu.addEventListener("click", function () {
  navMenu.classList.toggle("active");
  showNav.classList.toggle("hidden");
  mainBody.classList.toggle("menu-is-open");
});
