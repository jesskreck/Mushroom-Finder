function fetchMushrooms() {
  fetch("https://www.pilzradar.de/api/prRestAPIv3-JessicaKrecker-pilzradar.php")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log("Fetch result:", result);
      controllerFunction(result);
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchMushrooms();




//////////////////////////////////////////////// Controller & Events ////////////////////////////////////////////////

// note: prob unncessary now but was holding createCards(), createTags(), addEvents() before - all of them moved to pilzfundeFuntions.js
const controllerFunction = (mushrooms) => {
  toggleMenu(mushrooms);
}

// for comparison - here as function declaration:
// function controllerFunction(mushrooms) {
//   toggleMenu(mushrooms);
// }
 


function toggleMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("is-active");
    sidebar.classList.toggle("is-active");
  });
}

