function fetchMushrooms() {
  fetch("https://www.pilzradar.de/api/prRestAPIv3-JessicaKrecker-pilzradar.php")
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log("Fetch result:", result);
      controllerFunctionPF(result);
      addEventsOnPF(result);
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchMushrooms();

const controllerFunctionPF = (mushrooms) => {
  createCards(mushrooms);
  createTags(mushrooms);
}

const addEventsOnPF = (mushrooms) => {
  closeModal(mushrooms);
  filterWithTags(mushrooms);
  openModal(mushrooms);
}

function createCards(array) {
  const MushroomCardGallery = document.getElementById("mushroom-card-gallery");
  MushroomCardGallery.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    // create individual cards
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

function closeModal() {
  // close modal on click
  const close = document.getElementById("close");
  close.addEventListener("click", () => {
    displayNone()
  });

  function displayNone() {
    const close = document.getElementById("close");
    close.style.display = "none";
    document.getElementById("modal").style.display = "none";
  }
}

function createTags(mushrooms) {
  const verwendung = document.getElementById("verwendung");
  let set = new Set();
  for (let i = 0; i < mushrooms.length; i++) {
    set = set.add(mushrooms[i].Verwendung);
  }
  for (let item of set) {
    let tag = document.createElement("div");
    tag.classList.add("btn-tag");
    verwendung.append(tag);
    tag.innerText = item;
    tag.id = item;
  }
}

function filterWithTags(mushrooms) {
  // activate each tag button 
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
        });
        event.target.classList.add("is-active");
        // add "is-active" on clicked button. doesnt matter if you write btn.class... or event.target.class...
        event.target.classList.add("is-active");

        // save filtered mushrooms in variable to create new gallery
        const filtered = mushrooms.filter((mushroom) => {
          return mushroom.Verwendung === event.target.id;
        });
        createCards(filtered);
      }
    });
  });
}

function openModal(mushrooms) {
  // fill fullscreen modal with details
  function fillModalDetails(mushroom) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("close").style.display = "block";
    document.getElementById("modalImg").src = "https://www.pilzradar.de/" + mushroom[5];
    document.getElementById("modalName").innerText = mushroom[2];
    document.getElementById("modalNameLatin").innerText = mushroom[3];
    document.getElementById("modalTagVerwendung").innerText = mushroom.Verwendung;
    document.getElementById("modalTagVorkommen").innerText = mushroom.Vorkommen;
    document.getElementById("modalTagBundesland").innerText = mushroom.Bundesland;
    document.getElementById("Sammler").innerText = mushroom.Sammler;
    document.getElementById("Landkreis").innerText = mushroom.Landkreis;
    document.getElementById("Bundesland").innerText = mushroom.Bundesland;
    document.getElementById("Funddatum").innerText = mushroom.Funddatum;
  };

  // open modal on click
  const MushroomCardGallery = document.getElementById("mushroom-card-gallery");
  MushroomCardGallery.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-B__img")) {
      const pilzId = e.target.parentElement.parentElement.id;
      // console.log(e.target.parentElement.parentElement.id);
      fillModalDetails(mushrooms[pilzId]);
    }
  });
}

