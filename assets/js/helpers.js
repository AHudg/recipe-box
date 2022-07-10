function displayData(data) {
    
    
    for (var i=0; i < 4; i++){
        // collects info from api
        var recipeName = data.hits[i].recipe.label;
        var recipeUrl = data.hits[i].recipe.shareAs; 
        var img = data.hits[i].recipe.images.THUMBNAIL["url"];
        var servings = data.hits[i].recipe.yield;
        var caloriesData = data.hits[i].recipe.calories;
        caloriesData = Math.round(caloriesData/servings); 
        var ingredientsNum = data.hits[i].recipe.ingredients.length;
        var ingredientsList = data.hits[i].recipe.ingredients;
        
        // populate card data
        
        var card = document.createElement("div");

        card.setAttribute('class','card small-11 medium-5');   
        var modalClickEl = document.createElement("div");
        var cardDivider = document.createElement("div");
        cardDivider.setAttribute("class", "card-divider card-name");
        cardDivider.textContent = "Name: " + recipeName;
        card.appendChild(modalClickEl);
        modalClickEl.appendChild(cardDivider);

        var imgContent = document.createElement("img");
        imgContent.setAttribute("src", img);
        modalClickEl.appendChild(imgContent);

        var cardSection = document.createElement("div");
        cardSection.setAttribute("class", "card-section");
        var servingsEl = document.createElement("p");
        servingsEl.textContent = "Servings: " + servings + " | ";
        cardSection.appendChild(servingsEl);
        servingsEl.setAttribute('class','card-servings')
        var ingredientsEl = document.createElement("p");
        ingredientsEl.textContent = "Ingredients: " + ingredientsNum;
        ingredientsEl.setAttribute('class','card-ingLength')
        cardSection.appendChild(ingredientsEl);
        
        modalClickEl.appendChild(cardSection);
        
        $('#listElements').append(card);


        // sets the card to open the specific modal
        var modalNum = 'modal-recipe-' + i;
        modalClickEl.setAttribute("data-open", modalNum);

        // populate the modal data
        var modalDiv = document.getElementById(modalNum);
        var radioHome = document.createElement('label');
        card.append(radioHome);
        radioHome.setAttribute("for", "accept");
        var radioInput =document.createElement('input')
        card.append(radioInput);
        radioInput.setAttribute('type','checkbox');
        radioInput.setAttribute('name','accept');
        radioInput.setAttribute('value','no');
        radioInput.setAttribute('class','radio');
        
        // populate the modal 
        var modalDivId = "#" + modalNum;
        var modalDiv = document.querySelector(modalDivId);
        // clear modal content
        modalDiv.innerHTML = "";
        modalButton = document.createElement('button');
        modalButton.setAttribute('class','close-button');
        modalButton.setAttribute('id','programatic-close');
        modalButton.toggleAttribute('data-close')
        modalButton.setAttribute('type','button');
        modalDiv.append(modalButton);
        modalSpan = document.createElement('span');
        modalSpan.innerHTML ='&times;';
        modalButton.append(modalSpan)

        var recipeTitelEl = document.createElement("h2");
        recipeTitelEl.textContent = "Name: " + recipeName;
        modalDiv.appendChild(recipeTitelEl);

        var imgContainer = document.createElement("a");
        imgContainer.setAttribute("href", recipeUrl);
        imgContainer.setAttribute("target", "_blank");
        var imgContent = document.createElement("img");
        imgContent.setAttribute("src", img);
        imgContainer.appendChild(imgContent);
        modalDiv.appendChild(imgContainer);

        var modalSection = document.createElement("div");
        var servingsEl = document.createElement("p");
        servingsEl.textContent = "Servings: " + servings;
        modalSection.appendChild(servingsEl);
        var caloriesEl = document.createElement("p");
        caloriesEl.textContent = "Calories per serving: " + caloriesData;
        modalSection.appendChild(caloriesEl);
        modalDiv.appendChild(modalSection);

        var ingredientsDiv = document.createElement("div");
        var ingredientsUlEl = document.createElement("ul");
        ingredientsDiv.appendChild(ingredientsUlEl);
     
        for (var j=0; j<ingredientsList.length; j++){
            var ingredientLi = document.createElement("li");
            ingredientLi.textContent = ingredientsList[j]["text"];
            ingredientsUlEl.appendChild(ingredientLi);
        }
        modalDiv.appendChild(ingredientsDiv);

        // get the beer pairing
        var beerPairingEl = document.createElement("p");
        beerPairingEl.setAttribute("id", recipeName); 
        modalDiv.appendChild(beerPairingEl);

        // call beer API
        getBeer(recipeName);
    }
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