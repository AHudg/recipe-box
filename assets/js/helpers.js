function extractData(data) {
    var savedRecipes = JSON.parse(localStorage.getItem("input"));
    if (data.length === savedRecipes.length) {
        for (var i = 0; i < savedRecipes.length; i++) {
            var extractedData = {
                recipeName: savedRecipes[i].name,
                recipeUrl: savedRecipes[i].urlLink,
                img: savedRecipes[i].image,
                servings: savedRecipes[i].servings,
                // add calories
                ingredientsNum: savedRecipes[i].howManyIng, 
                // add ingredients list
            };
            displayData(extractedData,i);
        };
    } else {
        for (var i=0; i < 4; i++){
            console.log(data);
            // collects info from api
            var extractedData = {
                recipeName: data.hits[i].recipe.label,
                recipeUrl: data.hits[i].recipe.shareAs,
                img: data.hits[i].recipe.images.THUMBNAIL["url"],
                servings: data.hits[i].recipe.yield,
                // caloriesData: Math.round(data.hits[i].recipe.calories/servings),
                ingredientsNum: data.hits[i].recipe.ingredients.length,
                ingredientsList:  data.hits[i].recipe.ingredients
            }
            
            displayData(extractedData,i);
        };
    }
}

var displayData = function(extractedData,i){
    // CARDS
    // creates the card and sets the cell length
    var card = document.createElement("div");
    card.setAttribute('class','card small-11 medium-5'); 
    $('#listElements').append(card);

    // creates the clickable area to populate the modal
    var modalClickEl = document.createElement("div");
    card.appendChild(modalClickEl);

    // sets the card to open the specific modal
    var modalNum = 'modal-recipe-' + i;
    modalClickEl.setAttribute("data-open", modalNum);

    // card name
    var cardDivider = document.createElement("div");
    cardDivider.setAttribute("class", "card-divider card-name");
    cardDivider.textContent = extractedData.recipeName;
    modalClickEl.appendChild(cardDivider);

    // creates an <a> reference to hide the url to save to localStorage
    var imgContainer = document.createElement("a");
    imgContainer.setAttribute("href", extractedData.recipeUrl);
    imgContainer.setAttribute("target", "_blank");
    imgContainer.setAttribute("class", "card-image false");
    modalClickEl.appendChild(imgContainer);

    // creates the <img> within the <a>
    var imgContent = document.createElement("img");
    imgContent.setAttribute("src", extractedData.img);
    imgContainer.appendChild(imgContent);

    // creates the card section to hold the general text (servings/ingredients list)
    var cardSection = document.createElement("div");
    cardSection.setAttribute("class", "card-section");
    modalClickEl.appendChild(cardSection);

    // card servings
    var servingsEl = document.createElement("p");
    servingsEl.setAttribute('class','card-servings')
    servingsEl.textContent = "Servings: " + extractedData.servings + " | ";
    cardSection.appendChild(servingsEl);

    // card ingredients length
    var ingredientsEl = document.createElement("p");
    ingredientsEl.setAttribute('class','card-ingLength');
    ingredientsEl.textContent = "Ingredients: " + extractedData.ingredientsNum;
    cardSection.appendChild(ingredientsEl);
    
    // creates label for checkbox
    var radioHome = document.createElement('label');
    radioHome.setAttribute("for", "accept");
    card.append(radioHome);

    // creates checkbox input
    var radioInput =document.createElement('input')
    radioInput.setAttribute('type','checkbox');
    radioInput.setAttribute('name','accept');
    radioInput.setAttribute('value','no');
    radioInput.setAttribute('class','radio');
    card.append(radioInput);
    
    // MODAL
    // grabs the modal associated with the card based on code in lines 47-48
    var modalDiv = document.getElementById(modalNum);
    var modalDivId = "#" + modalNum;
    var modalDiv = document.querySelector(modalDivId);

    // clear modal content
    modalDiv.innerHTML = "";

    // creates a button to close the modal
    modalButton = document.createElement('button');
    modalButton.setAttribute('class','close-button');
    modalButton.setAttribute('id','programatic-close');
    modalButton.setAttribute('type','button');
    modalButton.toggleAttribute('data-close')
    modalDiv.append(modalButton);

    // creates the x to indicate the close page area
    modalSpan = document.createElement('span');
    modalSpan.innerHTML ='&times;';
    modalButton.append(modalSpan);

    // modal name
    var recipeTitelEl = document.createElement("h2");
    recipeTitelEl.textContent = extractedData.recipeName;
    modalDiv.appendChild(recipeTitelEl);

    // <a> modal
    var imgContainer = document.createElement("a");
    imgContainer.setAttribute("href", extractedData.recipeUrl);
    imgContainer.setAttribute("target", "_blank");
    modalDiv.appendChild(imgContainer);

    // <img> for the modal
    var imgContent = document.createElement("img");
    imgContent.setAttribute("src", extractedData.img);
    imgContainer.appendChild(imgContent);

    // modal section for servings and calories
    var modalSection = document.createElement("div");
    modalDiv.appendChild(modalSection);

    // modal servings
    var servingsEl = document.createElement("p");
    servingsEl.textContent = "Servings: " + extractedData.servings;
    modalSection.appendChild(servingsEl);

    // modal calories
    var caloriesEl = document.createElement("p");
    caloriesEl.textContent = "Calories per serving: " + extractedData.caloriesData;
    modalSection.appendChild(caloriesEl);

    // // creates a <div> for the <ul>
    // var ingredientsDiv = document.createElement("div");
    // modalDiv.appendChild(ingredientsDiv);

    // modal <ul> for listed ingredients
    var ingredientsUlEl = document.createElement("ul");
    modalDiv.appendChild(ingredientsUlEl);
     
        for (var j=0; j<extractedData.ingredientsList.length; j++){
            var ingredientLi = document.createElement("li");
            ingredientLi.textContent = extractedData.ingredientsList[j]["text"];
            ingredientsUlEl.appendChild(ingredientLi);
        }


    // get the beer pairing
    var beerPairingEl = document.createElement("p");
    beerPairingEl.setAttribute("id", extractedData.recipeName); 
    modalDiv.appendChild(beerPairingEl);

    // call beer API
    getBeer(extractedData.recipeName);
}

function getBeer (recipeName){
    var modalDivBeerEl = document.getElementById(recipeName);
    var beerApiUrl = "https://api.punkapi.com/v2/beers/random";
    var beerPairing = "";

    fetch(beerApiUrl).then(function(response) {
        if (response.ok){
            response.json().then(function(data) {
                var name = data[0].name;
                var tagline = data[0].tagline;
                beerPairing = "Your recommended beer pairing is: " + name + ": " + tagline;
                modalDivBeerEl.textContent = beerPairing;
                return;
            });
        }
    });
    beerPairing = "Unable to find a beer";
    modalDivBeerEl.textContent = beerPairing;
}