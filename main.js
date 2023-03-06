function fetchMushrooms() {
  fetch("https://www.pilzradar.de/api/prRestAPIv3-JessicaKrecker-pilzradar.php")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      // console.log(result);
      controllerFunction(result);

      // ab hier testing
      // buildDetailsPage(result);
      // checkSpeisepilz(result);
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchMushrooms();



//////////////////////////////////////////////// Controller & Events ////////////////////////////////////////////////

const controllerFunction = (mushrooms) => {
  createCards(mushrooms);
  createTags(mushrooms);
  addEvents(mushrooms);
}


const addEvents = (mushrooms) => {

  let cardsVisible = document.querySelectorAll(".card-B");
  console.log("visible", cardsVisible);

  // close modal on click 
  const close = document.getElementById("close");
  close.addEventListener("click", function () {
    close.style.display = "none";
    document.getElementById("modal").style.display = "none";
  })

  // filter Speisepilze
  // const speisepilzFilter = document.getElementById("Speisepilz");
  // speisepilzFilter.addEventListener("click", (event) => {
  //   console.log(event.target.id);
  //   const filtered = mushrooms.filter((mushroom) => {
  //     return mushroom.Verwendung === event.target.id;
  //   })
  //   console.log(filtered);
  //   createCards(filtered);
  // })

  // filter btn-tag
  const btnTag = Array.from(document.getElementsByClassName("btn-tag"));
  console.log(btnTag);
  btnTag.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      console.log(event.target.id);
      const filtered = mushrooms.filter((mushroom) => {
        return mushroom.Verwendung === event.target.id;
      })
      console.log(filtered);
      createCards(filtered);
    }) 
  })

  
  // build fullscreen modal on click
  // const cards = document.querySelectorAll(".card-B");
  // console.log(cards);
  cardsVisible.forEach((card) => {
    console.log("hier bin ich");
    card.addEventListener("click", (e) => {
      console.log("ID ist:", e.target.parentElement.parentElement.id)

      const pilzId = e.target.parentElement.parentElement.id;
      console.log("Alle Infos:", mushrooms[pilzId]);

      buildModal(mushrooms[pilzId])
    })
  })
}



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
  const MushroomCardGallery = document.getElementById("mushroom-card-gallery");
  MushroomCardGallery.innerHTML = "";
  for (let i = 0; i < array.length; i++) {

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

    // add #id. With card.id = array[i][0] it would give the full id from the API. With only i we get the index of that extract.
    card.id = i;
  }
}


//////////////////////////////////////////////// filling detail page  ////////////////////////////////////////////////

const buildModal = (blub) => {
  console.log("test");
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



////// ALTE FUNKTIONEN ZUM ERSTELLEN DER DETAIL CARDS / MODALS
// document.querySelectorAll(".card-B").forEach(item => {
//   item.addEventListener("click", buildDetailsPage);})

// function buildDetailsPage(array) {
//   // CONDITION MISSING - only do following if array[i] matches card.id
//   for (let i = 0; i < array.length; i++) {
//     const main = document.getElementById("main");
//     const modal = document.createElement("article");
//     main.append(modal);
//     modal.classList.add("modal");

//     // add image
//     const modalImg = document.createElement("div");
//     modal.append(modalImg);
//     modalImg.classList.add("modal__img");
//     const img = document.createElement("img");
//     modalImg.append(img);
//     img.src = "https://www.pilzradar.de/" + array[i][5];

//     // add names
//     const h1 = document.createElement("h1");
//     modal.append(h1);
//     h1.innerText = array[i][2];
//     const h3 = document.createElement("h3");
//     modal.append(h3);
//     h3.innerText = array[i][3];

//     // generating tags
//     const tagHolder = document.createElement("div");
//     modal.append(tagHolder);
//     tagHolder.classList.add("modal__tag-holder");
//     // // try to build this as a loop instead of having the three generated after each other
//     const tagVerwendung = document.createElement("div");
//     tagHolder.append(tagVerwendung);
//     tagVerwendung.classList.add("btn-tag");
//     tagVerwendung.innerText = array[i][8];
//     const tagVorkommen = document.createElement("div");
//     tagHolder.append(tagVorkommen);
//     tagVorkommen.classList.add("btn-tag");
//     tagVorkommen.innerText = array[i][7];
//     const tagBundesland = document.createElement("div");
//     tagHolder.append(tagBundesland);
//     tagBundesland.classList.add("btn-tag");
//     tagBundesland.innerText = array[i][4];

//     // adding description
//     const description = document.createElement("p");
//     modal.append(description);
//     description.innerText =
//       "gefunden von " + array[i][9] + " in " + array[i][6] + " (" + array[i][4] + ") " + "am " + array[i][1];

//   }
// }


//////////////////////////////////////////////// creating tags ////////////////////////////////////////////////



function createTags(array) {
  const verwendung = document.getElementById("verwendung");
  let set = new Set();
  for (let i = 0; i < array.length; i++) {
    set = set.add(array[i].Verwendung);
  };
  for (let item of set) {
    let tag = document.createElement("div");
    tag.classList.add("btn-tag");
    verwendung.append(tag);
    tag.innerText = item;
    tag.id = item;
  }
}



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










//////////////////////////////////////////////// wissen.html  ////////////////////////////////////////////////
///////// accordion fills with content /////////


function buildAccordion(array) {
  const accContainer = document.getElementById("acc-container");
  for (let i = 0; i < array.length; i++) {
    const accordion = document.createElement("div");
    accContainer.append(accordion);
    accordion.classList.add("accordion");

    const title = document.createElement("h2");
    accordion.append(title);
    title.innerText = array[i].Name;

    Object.keys(array[i]).forEach(key => {
      if (key !== "Name") {
        const accItem = document.createElement("div");
        accordion.append(accItem);
        accItem.classList.add("acc-item");

        const question = document.createElement("div");
        accItem.append(question);
        question.classList.add("question");
        question.innerText = key;

        const answer = document.createElement("div");
        accItem.append(answer);
        answer.classList.add("answer");
        answer.innerText = array[i][key];
      }
    });
  }
}

buildAccordion(pilzwissen);


///////// accordion clickable /////////

const accordion = document.getElementsByClassName('acc-item');

for (i = 0; i < accordion.length; i++) {

  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active')
  })
}