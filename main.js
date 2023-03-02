function fetchMushrooms() {
  fetch("https://www.pilzradar.de/api/prRestAPIv3-JessicaKrecker-pilzradar.php")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log(result);
      createCards(result);
      createTags(result);

      // ab hier testing
      checkSpeisepilz(result);
      activateFilters;
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchMushrooms();

//////////////////////////////////////////////// hamburger menu  ////////////////////////////////////////////////

const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", function () {
  menuToggle.classList.toggle("is-active");
  sidebar.classList.toggle("is-active");
});

//////////////////////////////////////////////// creating gallery with images  ////////////////////////////////////////////////

// function createGallery(array) {
//   const gallery = document.getElementById("gallery");
//   for (let i = 0; i < array.length; i++) {
//     const img = document.createElement("img");
//     let imgURL = "https://www.pilzradar.de/" + array[i][5];
//     img.setAttribute("src", imgURL);
//     gallery.append(img);
//   }
// }

//////////////////////////////////////////////// creating cards ////////////////////////////////////////////////

function createCards(array) {
  for (let i = 0; i < array.length; i++) {
    const MushroomCardGallery = document.getElementById(
      "mushroom-card-gallery"
    );
    const card = document.createElement("article");
    MushroomCardGallery.append(card);
    card.classList.add("card-B");

    // create header
    const header = document.createElement("div");
    card.append(header);
    header.classList.add("card-B__HEADER");

    // set database image as background image
    const a = document.createElement("a");
    card.append(a);
    const cardImage = document.createElement("div");
    a.append(cardImage);
    cardImage.classList.add("card-B__img");
    let imgURL = "https://www.pilzradar.de/" + array[i][5];
    cardImage.style.cssText += `background-image:url(${imgURL})`;
    
    // add link to details page to image 
    a.setAttribute("href", "details.html");

    // fill footer with details
    const footer = document.createElement("div");
    card.append(footer);
    footer.classList.add("card-B__FOOTER");
    const name = document.createElement("h2");
    footer.append(name);
    name.innerText = array[i][2];
    const description = document.createElement("div");
    footer.append(description);
    description.innerText =
      "von " + array[i][9] + " in " + array[i][6] + " (" + array[i][4] + ")";
    
    // add #id
    card.id = array[i][0];
  }
}



//////////////////////////////////////////////// creating tags ////////////////////////////////////////////////

function createTags(array)
{
  const verwendung = document.getElementById("verwendung");
  let set = new Set();
  for (let i = 0; i < array.length; i++)
  {
    set = set.add(array[i].Verwendung);
  };
  for (let item of set)
  {
    let tag = document.createElement("div");
    tag.classList.add("btn-tag");
    verwendung.append(tag);
    tag.innerText = item;
    tag.id = item;
  } 
}



// function makeTagAsButton(array) {
//   const buttons = document.querySelectorAll(".btn-tag");
//   console.log(buttons);
//   for (i = 0; i < buttons.length; i++)
//   {
//     buttons[i].id = "btnFilter" + i;
//   };
// }



//////////////////////////////////////////////// filter  ////////////////////////////////////////////////



SpeisepilzFilter.addEventListener("click", showOnlySpeisepilze);

function checkSpeisepilz(array) {
  if (array.Verwendung == "Speisepilz")
    return true;
  else
    return false;  
}

function showOnlySpeisepilze(array) {
  let Speisepilze = array.filter(checkSpeisepilz);
  console.log("erfolg");
  createCards(Speisepilze);
}


const SpeisepilzFilter = document.getElementById("Speisepilz");





function buildDetailsPage(array) {
  
}


















//////////////// Get location and pilzfreund
// const cards = document.getElementById("cards");

// for (let i = 0; i < pilzradar.length; i++) {
//   const mushroom = document.createElement("div");
//   cards.append(mushroom);
//   const name = document.createElement("h2");
//   mushroom.append(name);
//   name.innerText = pilzradar[i][2];
//   const location = document.createElement("p");
//   mushroom.append(location);
//   location.innerText = pilzradar[i].Landkreis + ", " + pilzradar[i].Bundesland;
// }
