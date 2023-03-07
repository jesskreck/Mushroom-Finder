function fetchMushrooms() {
  fetch("https://www.pilzradar.de/api/prRestAPIv3-JessicaKrecker-pilzradar.php")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log(result);
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
  const MushroomCardGallery = document.getElementById("mushroom-card-gallery");


  // close modal on click 
  const close = document.getElementById("close");
  close.addEventListener("click", function () {
    close.style.display = "none";
    document.getElementById("modal").style.display = "none";
  })

  // filter btn-tag
  const btnTag = Array.from(document.getElementsByClassName("btn-tag"));
  btnTag.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      
      if (event.target.classList.contains("is-active")) {
        event.target.classList.remove("is-active");
        createCards(mushrooms);
      } else {
        // remove "is-active" class from all buttons
        btnTag.forEach((btn) => {
          btn.classList.remove("is-active");
        })
        event.target.classList.add("is-active");
        // add "is-active" on clicked button. doesnt matter if you write btn.class... or event.target.class...
        event.target.classList.add("is-active");

        // save filtered mushrooms in variable to create new gallery
        const filtered = mushrooms.filter((mushroom) => {
          return mushroom.Verwendung === event.target.id;
        })
        createCards(filtered);
        }
    }) 
  })


  // build fullscreen modal on click
  MushroomCardGallery.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-B__img")) {
      const pilzId = e.target.parentElement.parentElement.id;
      buildModal(mushrooms[pilzId]);
    }
  });
}



//////////////////////////////////////////////// hamburger menu  ////////////////////////////////////////////////

const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", function () {
  menuToggle.classList.toggle("is-active");
  sidebar.classList.toggle("is-active");
});



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

const buildModal = (pilz) => { 
  document.getElementById("modal").style.display = "block";
  document.getElementById("close").style.display = "block";
  document.getElementById("modalImg").src = "https://www.pilzradar.de/" + pilz[5];
  document.getElementById("modalName").innerText = pilz[2];
  document.getElementById("modalNameLatin").innerText = pilz[3];pilz
  document.getElementById("modalTagVerwendung").innerText = pilz.Verwendung;
  document.getElementById("modalTagVorkommen").innerText = pilz.Vorkommen;
  document.getElementById("modalTagBundesland").innerText = pilz.Bundesland;
  document.getElementById("Sammler").innerText = pilz.Sammler;
  document.getElementById("Landkreis").innerText = pilz.Landkreis;
  document.getElementById("Bundesland").innerText = pilz.Bundesland;
  document.getElementById("Funddatum").innerText = pilz.Funddatum;
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

const accItems = document.getElementsByClassName('acc-item');



for (i = 0; i < accItems.length; i++) {

  accItems[i].addEventListener('click', function () {
    this.classList.toggle('active')
  })
}

///////// search function /////////

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");


function search() {
  // resetting previous search - is there an easier way?
  let regExp = "";
  let matchFound = false;
  for (i = 0; i < accItems.length; i++) {
    if (accItems[i].lastChild.innerHTML.match(regExp)) {
      accItems[i].lastChild.innerHTML = accItems[i].lastChild.textContent.replace(regExp, "<mark>$&</mark>");
      accItems[i].classList.remove('active');
    };
  }

  // save new search term
  let input = document.getElementById("search-input").value;

  // add markup and open item
  if (input !== "") {
    regExp = new RegExp(input, 'gi');
    for (i = 0; i < accItems.length; i++) {      
      if (accItems[i].lastChild.innerHTML.match(regExp)) {
        accItems[i].lastChild.innerHTML = accItems[i].lastChild.textContent.replace(regExp, "<mark>$&</mark>");
        accItems[i].classList.add('active');
        matchFound = true;
      }
    }
  }

  if (!matchFound) {
    const searchField = document.getElementById("search-field");
    
  }
};

// call search() with button and enter-key
searchBtn.addEventListener("click", search);
searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    search();
  }
});