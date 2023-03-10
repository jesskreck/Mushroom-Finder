function toggleMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("is-active");
    sidebar.classList.toggle("is-active");
  });
}

toggleMenu();