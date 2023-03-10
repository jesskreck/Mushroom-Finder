const loadWissenPage = (mushrooms) => {
    buildAccordion(mushrooms);
    addEventsOnWissen(mushrooms);
}

loadWissenPage(pilzwissen);




function buildAccordion(array) {
    const accContainer = document.getElementById("acc-container");
    for (let i = 0; i < array.length; i++) {
        
        // creating one accordion for each mushroom inside array
        const accordion = document.createElement("div");
        accContainer.append(accordion);
        accordion.classList.add("accordion");

        const title = document.createElement("h2");
        accordion.append(title);
        title.innerText = array[i].Name;

        // TO DO - correct forEach() here and get rid of object.keys below
        // if (!array[i].Name) {
        //     console.log("made it here");

        //     array.forEach(element => {
        //     console.log("made it further");
        //     const accItem = document.createElement("div");
        //     accordion.append(accItem);
        //     accItem.classList.add("acc-item");

        //     const question = document.createElement("div");
        //     accItem.append(question);
        //     question.classList.add("question");
        //     question.innerText = key;

        //     const answer = document.createElement("div");
        //     accItem.append(answer);
        //     answer.classList.add("answer");
        //     answer.innerText = array[i][key];
        //     });
        // }


        // creating and filling content of accordion items inside accordions with specific question and answer
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



function search() {

    const accItems = document.getElementsByClassName('acc-item');

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

    // TBA error message - not ready yet
    if (!matchFound) {
        const searchField = document.getElementById("search-field");

    }
};



function addEventsOnWissen() {

    // make accordion clickable
    const accItems = document.getElementsByClassName('acc-item');
    for (i = 0; i < accItems.length; i++) {
        accItems[i].addEventListener('click', function (e) {
            this.classList.toggle('active')
        })
    }

    // call search() with button and enter-key
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");

    searchBtn.addEventListener("click", search);

    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            search();
        }
    });

}

