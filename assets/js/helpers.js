function extractData(data) {
    // empties the cards from page to page
    $('#listElements').html('');

    // if the data put into this object has property hits then run...
    if (data.hits) {
            for (var i=0; i < 4; i++){
                // collects info from api

                var servings = data.hits[i].recipe.yield;

                var extractedData = {
                    recipeName: data.hits[i].recipe.label,
                    recipeUrl: data.hits[i].recipe.shareAs,
                    img: data.hits[i].recipe.images.REGULAR["url"],
                    servings: servings,
                    caloriesData: Math.round(data.hits[i].recipe.calories / servings),
                    ingredientsNum: data.hits[i].recipe.ingredients.length,
                    ingredientsList:  data.hits[i].recipe.ingredients
                }
                displayData(extractedData,i);
            };
    // if the data is the same length as the localStorage then its populating localStorage information
    } else {
        var savedRecipes = JSON.parse(localStorage.getItem("input"));
        for (var i = 0; i < savedRecipes.length; i++) {
            var extractedData = {
                recipeName: savedRecipes[i].recipeName,
                recipeUrl: savedRecipes[i].recipeUrl,
                img: savedRecipes[i].img,
                servings: savedRecipes[i].servings,
                caloriesData: savedRecipes[i].caloriesData,
                ingredientsNum: savedRecipes[i].ingredientsNum, 
                ingredientsList: savedRecipes[i].ingredientsList
            };
            displayData(extractedData,i);
            $('.radio').attr('checked',true);
            $('.radio').attr('value','yes');

            // if more than 4 saved allow links to be clickable
            if(savedRecipes.length>4){
                $('.card-image').removeClass('false')
            };           
        };
    };
};

var displayData = function(extractedData,i){    
    // CARDS
    // creates the card and sets the cell length
    var card = document.createElement("div");
    card.setAttribute('class','card small-11 medium-5 grid-x'); 
    $('#listElements').append(card);

    // creates the clickable area to populate the modal
    var modalClickEl = document.createElement("div");
    modalClickEl.setAttribute('class','cell small-12');
    card.appendChild(modalClickEl);

    // sets the card to open the specific modal
    var modalNum = 'modal-recipe-' + i;
    modalClickEl.setAttribute("data-open", modalNum);
    modalClickEl.setAttribute('class','grid-x text-center');

    // card name
    var cardDivider = document.createElement("div");
    cardDivider.setAttribute("class", "small-12 card-name");
    cardDivider.textContent = extractedData.recipeName;
    modalClickEl.appendChild(cardDivider);

    // creates an <a> reference to hide the url to save to localStorage
    var imgContainer = document.createElement("a");
    imgContainer.setAttribute("href", extractedData.recipeUrl);
    imgContainer.setAttribute("target", "_blank");
    imgContainer.setAttribute("class", "small-12 card-image false");
    modalClickEl.appendChild(imgContainer);


    // creates the <img> within the <a>
    var imgContent = document.createElement("img");
    imgContent.setAttribute("src", extractedData.img);
    imgContainer.appendChild(imgContent);

    // card servings
    var servingsEl = document.createElement("p");
    servingsEl.setAttribute('class','cell small-12 card-servings');
    servingsEl.textContent = "Servings: " + extractedData.servings;
    modalClickEl.appendChild(servingsEl);

    // card ingredients length
    var ingredientsEl = document.createElement("p");
    ingredientsEl.setAttribute('class','cell small-12 card-ingLength');
    ingredientsEl.textContent = "Ingredients: " + extractedData.ingredientsNum;
    modalClickEl.appendChild(ingredientsEl);
    
    // creates label for checkbox
    var radioHome = document.createElement('label');
    radioHome.textContent = "Save Recipe to Favorite:";
    radioHome.setAttribute("for", "accept");
    radioHome.setAttribute('class','cell small-6 card-label');
    card.append(radioHome);

    // creates checkbox input unchecked
    var radioInput = document.createElement('input');
    radioInput.setAttribute('type','checkbox');
    radioInput.setAttribute('name','accept');
    radioInput.setAttribute('value','no');
    radioInput.setAttribute('class','cell small-12 radio card-radio');
    card.append(radioInput);
    
    if (i < 4) {
    // MODAL
    // grabs the modal associated with the card based on code in lines 47-48
    var modalDiv = document.getElementById(modalNum);
    var modalDivId = "#" + modalNum;
    var modalDiv = document.querySelector(modalDivId);

    // // clear modal content
    modalDiv.innerHTML = "";

    // creates a button to close the modal
    var modalButton = document.createElement('button');
    modalButton.setAttribute('type','button');
    modalButton.setAttribute('class','close-button');
    modalButton.setAttribute('id','programatic-close');
    modalButton.toggleAttribute('data-close');
    modalDiv.append(modalButton);

    // creates the x to indicate the close page area
    var modalSpan = document.createElement('span');
    modalSpan.innerHTML ='&times;';
    modalButton.append(modalSpan);

    // create a div to call grid-x on for modal formatting
    var modalGrid = document.createElement("div");
    modalGrid.setAttribute('class','grid-x');
    modalDiv.appendChild(modalGrid);

    // <a> modal
    var imgContainer = document.createElement("a");
    imgContainer.setAttribute("href", extractedData.recipeUrl);
    imgContainer.setAttribute("target", "_blank");
    imgContainer.setAttribute('class','cell small-5 modal-image');
    modalGrid.appendChild(imgContainer);

    // <img> for the modal
    var imgContent = document.createElement("img");
    imgContent.setAttribute("src", extractedData.img);
    imgContainer.appendChild(imgContent);

    // modal section for all text
    var modalText = document.createElement("div");
    modalText.setAttribute('class','cell small-7 grid-x');
    modalGrid.appendChild(modalText);

    // modal name
    var recipeTitelEl = document.createElement("h2");
    recipeTitelEl.textContent = extractedData.recipeName;
    recipeTitelEl.setAttribute('class','cell small-12 modal-name');
    modalText.appendChild(recipeTitelEl);

    // modal servings
    var servingsEl = document.createElement("p");
    servingsEl.textContent = "Servings: " + extractedData.servings;
    servingsEl.setAttribute('class','cell small-12 modal-servings');
    modalText.appendChild(servingsEl);

    // modal calories
    var caloriesEl = document.createElement("p");
    caloriesEl.textContent = "Calories per serving: " + extractedData.caloriesData;
    caloriesEl.setAttribute('class','cell small-12 modal-calories');
    modalText.appendChild(caloriesEl);

    // modal <ul> for listed ingredients
    var ingredientsUlEl = document.createElement("ul");
    ingredientsUlEl.setAttribute('class','cell small-12 modal-ul');
    modalDiv.appendChild(ingredientsUlEl);
     
        for (var j=0; j<extractedData.ingredientsList.length; j++){
            var ingredientLi = document.createElement("li");
            ingredientLi.textContent = extractedData.ingredientsList[j].text;
            ingredientLi.setAttribute('class','modal-listItem');
            ingredientsUlEl.appendChild(ingredientLi);
        };

    // get the beer pairing
    var beerPairingEl = document.createElement("p");
    beerPairingEl.setAttribute("id", extractedData.recipeName); 
    beerPairingEl.setAttribute('class','cell small-12 modal-beer');
    modalDiv.appendChild(beerPairingEl);

    // call beer API
    getBeer(extractedData.recipeName);
    };
};

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

//makes links on images unclickable currently - can remove later
$('#listElements').on('click','.false',function() {
        return false;
})

