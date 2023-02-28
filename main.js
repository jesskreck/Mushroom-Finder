function fetchMushrooms() {
    fetch("https://www.pilzradar.de/api/prRestAPIv3-JessicaKrecker-pilzradar.php")
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            createGallery(result);
            createCards(result);
        })
        .catch(function (error) {
            console.log(error);
        })
}

fetchMushrooms();



//////////////////////////////////////////////////// creating gallery with images  ////////////////////////////////////////////////////


function createGallery(array) {
    const gallery = document.getElementById("gallery");
    for (let i = 0; i < array.length; i++) {
        const img = document.createElement("img");
        let imgURL = "https://www.pilzradar.de/" + array[i][5];
        img.setAttribute("src", imgURL);
        gallery.append(img);
    }
}


//////////////////////////////////////////////////// creating cards ////////////////////////////////////////////////////

function createCards(array) {
    for (let i = 0; i < array.length; i++) {
        const MushroomCardGallery = document.getElementById("mushroom-card-gallery");
        const card = document.createElement("article");
        MushroomCardGallery.append(card);
        card.classList.add("card-B");

        // header
        const header = document.createElement("div");
        card.append(header);
        header.classList.add("card-B__HEADER");
        
        // background image
        const a = document.createElement("a");
        card.append(a);
        const cardImage = document.createElement("div");
        a.append(cardImage);
        cardImage.classList.add("card-B__img");
        let imgURL = "https://www.pilzradar.de/" + array[i][5];
        console.log(imgURL);
        cardImage.style.cssText += `background-image:url(${imgURL})`;     // .style.backgroundImage = URL war nicht möglich, weil Variable dort nicht eingetragen werden konnte
        
        // footer
        const footer = document.createElement("div");
        card.append(footer);
        footer.classList.add("card-B__FOOTER");
        const name = document.createElement("h2");
        footer.append(name);
        name.innerText = array[i][2];
        const description = document.createElement("div");
        footer.append(description);
        description.innerText = "von " + array[i][9] + " in " + array[i][6] + " (" + array[i][4] + ")";
    }
}








//////////////// Get location and pilzfreund
const cards = document.getElementById("cards")

for (let i = 0; i < pilzradar.length; i++) {
    const mushroom = document.createElement("div");
    cards.append(mushroom);
    const name = document.createElement("h2");
    mushroom.append(name);
    name.innerText = pilzradar[i][2];
    const location = document.createElement("p");
    mushroom.append(location);
    location.innerText = pilzradar[i].Landkreis + ", " + pilzradar[i].Bundesland;
    
}