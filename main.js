function fetchMushrooms() {
  fetch("https://www.pilzradar.de/api/prRestAPIv3-JessicaKrecker-pilzradar.php")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      const pilze = result
      console.log(result);
      createCards(result);
      createTags(result);
      addEvents(pilze)

      // ab hier testing
      // buildDetailsPage(result);
      // checkSpeisepilz(result);
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
    // card.id = array[i][0];
    card.id = i;
  } 
}


//////////////////////////////////////////////// filling detail page  ////////////////////////////////////////////////

// document.querySelectorAll(".card-B").forEach(item => {
//   item.addEventListener("click", buildDetailsPage);
// });





const addEvents = (pilze) => {
  // add exit function here
  // const modal = document.querySelector(".modal")
  // modal.addEventListener("click", () => {
    
  // })

  const cards = document.querySelectorAll(".card-B")
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      console.log("ID ist:", e.target.parentElement.parentElement.id)

      const pilzInfos = e.target.parentElement.parentElement.id;
      console.log("Alle Infos:", pilze[pilzInfos]);

      buildModal(pilze[pilzInfos])
    })
  })

  const close = document.getElementById("close");
  close.addEventListener("click", function () {
    close.style.display = "none";
    document.getElementById("modal").style.display = "none";
  });
}

const buildModal = (blub) => {
  document.getElementById("modal").style.display = "block";
  document.getElementById("close").style.display = "block";
  document.getElementById("modalImg").src = "https://www.pilzradar.de/" + blub[5];
  document.getElementById("modalName").innerText = blub[2];
  document.getElementById("modalNameLatin").innerText = blub[3];
  document.getElementById("modalTagVerwendung").innerText = blub.Verwendung;
  document.getElementById("modalTagVorkommen").innerText = blub.Vorkommen;
  document.getElementById("modalTagBundesland").innerText = blub.Bundesland;
  document.getElementById("Sammler").innerText = blub.Sammler;
  document.getElementById("Landkreis").innerText = blub.Landkreis;
  document.getElementById("Bundesland").innerText = blub.Bundesland;
  document.getElementById("Funddatum").innerText = blub.Funddatum;
}
  


// ALTE FUNKTION
function buildDetailsPage(array) {
  // CONDITION MISSING - only do following if array[i] matches card.id
  for (let i = 0; i < array.length; i++) {
    const main = document.getElementById("main");
    const modal = document.createElement("article");
    main.append(modal);
    modal.classList.add("modal");

    // add image
    const modalImg = document.createElement("div");
    modal.append(modalImg);
    modalImg.classList.add("modal__img");
    const img = document.createElement("img");
    modalImg.append(img);
    img.src = "https://www.pilzradar.de/" + array[i][5];
    
    // add names
    const h1 = document.createElement("h1");
    modal.append(h1);
    h1.innerText = array[i][2];
    const h3 = document.createElement("h3");
    modal.append(h3);
    h3.innerText = array[i][3];

    // generating tags
    const tagHolder = document.createElement("div");
    modal.append(tagHolder);
    tagHolder.classList.add("modal__tag-holder");
    // // try to build this as a loop instead of having the three generated after each other
    const tagVerwendung = document.createElement("div");
    tagHolder.append(tagVerwendung);
    tagVerwendung.classList.add("btn-tag");
    tagVerwendung.innerText = array[i][8];
    const tagVorkommen = document.createElement("div");
    tagHolder.append(tagVorkommen);
    tagVorkommen.classList.add("btn-tag");
    tagVorkommen.innerText = array[i][7];
    const tagBundesland = document.createElement("div");
    tagHolder.append(tagBundesland);
    tagBundesland.classList.add("btn-tag");
    tagBundesland.innerText = array[i][4];

    // adding description
    const description = document.createElement("p");
    modal.append(description);
    description.innerText =
      "gefunden von " + array[i][9] + " in " + array[i][6] + " (" + array[i][4] + ") " + "am " + array[i][1];
    
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


// const SpeisepilzFilter = document.getElementById("Speisepilz");
// SpeisepilzFilter.addEventListener("click", showOnlySpeisepilze);














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
