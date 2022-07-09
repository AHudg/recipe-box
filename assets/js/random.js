// code to get random recipe by title 
postEl = document.querySelector("#container");



function getAPIdata (recipeInput) { 

    // this url gives a random recipe by title
    var url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + recipeInput + "&app_id=f060c488&app_key=8d00a9731a468460c3a7966ff703a4f7";
 
    fetch(url).then(function(response) {
        if (response.ok){
            response.json().then(function(data) {
                displayData(data);
            });
        } else {
            // do something with 404 error
            alert("Error: recipe not found");
        }
    })
    .catch(function(error) {
        // do something with unable to connect
        alert("Unable to connect");
    });
}

function displayData(data) {
    
    
    for (var i=0; i < 4; i++){
        var recipeName = data.hits[i].recipe.label;
        var recipeUrl = data.hits[i].recipe.shareAs; 
        var img = data.hits[i].recipe.images.THUMBNAIL["url"];
        var servings = data.hits[i].recipe.yield;
        var caloriesData = data.hits[i].recipe.calories;
        caloriesData = Math.round(caloriesData/servings); 
        var ingredientsNum = data.hits[i].recipe.ingredients.length;
        var ingredientsList = data.hits[i].recipe.ingredients;
        
        // populate the other data to collect here
        
        var card = document.createElement("div");
        card.setAttribute('class','card small-11 medium-5');
        // set the open modal 
        var modalNum = 'modal-recipe-' + i;
        card.setAttribute("data-open", modalNum);
    

        var cardDivider = document.createElement("div");
        cardDivider.setAttribute("class", "card-divider");
        cardDivider.textContent = recipeName;
        card.appendChild(cardDivider);

        var imgContainer = document.createElement("a");
        imgContainer.setAttribute("href", recipeUrl);
        imgContainer.setAttribute("target", "_blank");
        var imgContent = document.createElement("img");
        imgContent.setAttribute("src", img);
        imgContainer.appendChild(imgContent);
        card.appendChild(imgContainer);

        var cardSection = document.createElement("div");
        cardSection.setAttribute("class", "card-section");
        var servingsEl = document.createElement("p");
        servingsEl.textContent = "Servings: " + servings + " | ";
        cardSection.appendChild(servingsEl);
        var ingredientsEl = document.createElement("p");
        ingredientsEl.textContent = "Ingredients: " + ingredientsNum;
        cardSection.appendChild(ingredientsEl);
        
        card.appendChild(cardSection);
        
        $('#listElements').append(card);

        // populate the modal 
        var modalDivId = "#" + modalNum;
        var modalDiv = document.querySelector(modalDivId);
        var recipeTitelEl = document.createElement("h2");
        recipeTitelEl.textContent = recipeName;
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

function getuserInput () {
    // clear the current screen
    $('#container').empty();
    $('#container').removeClass('landingPage');
    $('#listElements').empty();

    $('#container').addClass("container");

    postEl.innerHtml =""; 
    var formEl = document.createElement("form");
    formEl.setAttribute("id", "form");
    formEl.setAttribute('class','cell small-12 grid-x')
    postEl.appendChild(formEl);
    
    var labelEl = document.createElement("label");
    labelEl.textContent = "Find a Recipe"
    labelEl.setAttribute('class','cell small-4')
    formEl.appendChild(labelEl);

    var inputEl = document.createElement("input");
    inputEl.setAttribute("id", "recipe-input");
    inputEl.setAttribute("placeholder", "chicken enchiladas");
    inputEl.setAttribute('class','cell small-8');
    formEl.appendChild(inputEl);

    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("id", "button");
    buttonEl.setAttribute('class','cell small-11 searchBtn')
    buttonEl.textContent = "Find it for Me!";
    formEl.appendChild(buttonEl);

    buttonEl.addEventListener('click', function (event) {
        event.preventDefault();
        var form = document.querySelector("#recipe-input");
        var input = form.value.trim().replaceAll(" ", "%20");;
       getAPIdata(input);
    });    
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






$('#recipe').click(getuserInput);
$('#container').on('click','#recipe',getuserInput);