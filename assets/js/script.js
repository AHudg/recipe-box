$(document).foundation(); // this is the code to run the modal

var openHamburger = function(event) {
    $('.hamburger').attr('style','transform: translateY(0)');
};

var closeHamburger = function() {
    if ($(window).width() > 768) {
        $('.hamburger').attr('style','transform: translateX(-'+ $('#hamburger').width() +'px)');
    } else {
        $('.hamburger').attr('style','transform: translateX(-100vw)');
    };
};

var landingPage = function() {
    // clear the current screen
    $('#container').empty();
    $('#container').removeClass("container grid-x");
    $('#container').addClass("grid-y text-center align-center align-middle landingPage");

    $('#listElements').empty();

    $('#background').removeClass("secondary-background");
    $('#background').addClass("background");

    // transparent-background image of recipe box to populate favorites goes here
    // var landingImage = $('<img>');
    // landingImage.attr("src='../assets/images/recipeBox.psd'");

    var landingFavorites = $('<a>');
    landingFavorites.text('Favorites');
    landingFavorites.attr('id','favorites');
    landingFavorites.addClass('cell landingText');

    var landingIngredient = $('<a>');
    landingIngredient.text('Search by Ingredient');
    landingIngredient.attr('id','ingredients');
    landingIngredient.addClass('cell landingText');

    var landingRecipe = $('<a>');
    landingRecipe.text('Search by Recipe');
    landingRecipe.attr('id','recipe');
    landingRecipe.addClass('cell landingText');

    var landingRandom = $('<a>');
    landingRandom.text('Random Recipes');
    landingRandom.attr('id','random');
    landingRandom.addClass('cell landingText');

    // $('#container').append(landingImage);
    $('#container').append(landingFavorites);
    $('#container').append(landingIngredient);
    $('#container').append(landingRecipe);
    $('#container').append(landingRandom);

}

var favorites = function() {
    $('#container').empty();
    $('#container').removeClass('landingPage container');
    $('#container').attr('style','height:0vh;')
    $('#listElements').empty();
    $('#listElements').attr('style','height:95vh; overflow-y: scroll;')
    $('#listElements').addClass('recipeFormat');

    // get localStorage data
    savedRecipes = JSON.parse(localStorage.getItem("input"));

    // if localStorage exist...
    if (savedRecipes) {
        // for(var i=0; i<savedRecipes.length; i++){
        //     // for the length 
        //     var info = {
        //         name: savedRecipes[i].name,
        //         // label: $(this).parent().children('.card-label').text(),
        //         image: savedRecipes[i].image,
        //         servings: savedRecipes[i].servings,
        //         howManyIng: savedRecipes[i].howManyIng, 
        //         urlLink: savedRecipes[i].urlLink
        //     }

            extractData(savedRecipes);
            // // creates the card and sets the cell length
            // var card = $('<div>');
            // $(card).addClass('cell small-11 medium-5 card');
            // $('#listElements').append(card);
            
            // // creates the clickable area to populate the modal
            // var modal = $('<div>');
            // $(card).append(modal); 
            
            // // card name
            // var cardDivider = $('<div>');
            // cardDivider.addClass('card-divider card-name');
            // cardDivider.text(info.name);
    
            // // creates an <a> reference to hide the url to save to localStorage
            // var imgContainer = $('<a>');
            // imgContainer.addClass('card-image');
            // imgContainer.attr('href', info.urlLink);
            // imgContainer.attr("target", "_blank");
            // imgContainer.addClass('false');
    
            // // creates the image within the <a> for the recipe card image
            // var imgContent = $('<img>');
            // imgContent.attr('src',info.image);
            // imgContainer.append(imgContent)
    
            // // creates the card section to hold the general text (servings / ingredients number)
            // var cardSection = $('<div>');
            // cardSection.addClass('card-section');
    
            // // card servings
            // var servingsEl = $("<p class='card-servings'>");
            // $(servingsEl).text('Servings: '+ info.servings + ' | ');
            // cardSection.append(servingsEl);
            
            // // card ingredients length
            // var ingredientsEl = $("<p class='card-ingLength'>");
            // ingredientsEl.text('Ingredients:' + info.howManyIng);
            // cardSection.append(ingredientsEl);
    
            // // var labelEL = $("<p class='card-label'>")
            // // append labelEl here if decide to use

            // // append to the modal clickable area
            // $(modal).append(cardDivider,imgContainer, cardSection);
         
            // // checkbox label
            // var radioHome = $('<label>');
            // radioHome.attr("for", "accept");
            // card.append(radioHome);

            // // checkbox itself
            // var radioInput = $('<input checked>');
            // radioInput.addClass('radio');
            // radioInput.attr('type','checkbox');
            // radioInput.attr('name','accept');
            // radioInput.attr('value','yes');
            // radioInput.attr('id',i);
            // card.append(radioInput);

            // // populate the modal data
            // var modalNum = 'modal-recipe-' + i;
            // modal.attr("data-open", modalNum);
            // var modalDiv = document.getElementById(modalNum);

            // // // clear modal content
            // // modalDiv.innerHTML = "";

            // // sets the recipe name on modal
            // var recipeTitelEl = document.createElement("h2");
            // recipeTitelEl.textContent = info.name;
            // modalDiv.appendChild(recipeTitelEl);

            // // sets the <a> link that relocates to the recipe website
            // var imgContainer = document.createElement("a");
            // imgContainer.setAttribute("href", info.urlLink);
            // imgContainer.setAttribute("target", "_blank");

            // // sets the <img> for the picture
            // var imgContent = document.createElement("img");
            // imgContent.setAttribute("src", info.image);

            // imgContainer.appendChild(imgContent);
            // modalDiv.appendChild(imgContainer);

            
            // var modalSection = document.createElement("div");
            // var servingsEl = document.createElement("p");
            // servingsEl.textContent = "Servings: " + info.servings;
            // modalSection.appendChild(servingsEl);
            
            // // no calories Data - Madalyne
            // // var caloriesEl = document.createElement("p");
            // // caloriesEl.textContent = "Calories per serving: " + caloriesData;
            // // modalSection.appendChild(caloriesEl);
            // modalDiv.appendChild(modalSection);

            
            // no ingredients array - Madalyne
            // var ingredientsDiv = document.createElement("div");
            // var ingredientsUlEl = document.createElement("ul");
            // ingredientsDiv.appendChild(ingredientsUlEl);
        
            // for (var j=0; j<ingredientsList.length; j++){
            //     var ingredientLi = document.createElement("li");
            //     ingredientLi.textContent = ingredientsList[j]["text"];
            //     ingredientsUlEl.appendChild(ingredientLi);
            // }
            // modalDiv.appendChild(ingredientsDiv);
        // };
    } else {
        alert("No localStorage");
        // append text that says "NO LOCALSTORAGE"
    }
};

var random = function() {
    $('#container').empty();
    $('#container').removeClass('landingPage container');
    $('#listElements').empty();
    $('#listElements').addClass('recipeFormat');
    var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=1d67f783&app_key=4f2864d94a10bc0430788affdb03e6f6&diet=balanced&random=true";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayData(data);                    
                })
            } else {
                alert("Error.");
            }
        });
}


closeHamburger();
landingPage();

// runs this script when home on the hamburger is clicked
$('#home').click(landingPage);
// opens the hamburger upon hamburgerIcon click
$('#hamburgerIcon').click(openHamburger);
// close hamburger with the &times
$('.closeHamburger').click(closeHamburger);
// close hamburger with any click
$('.nav').click(closeHamburger);
// opens the favorite recipes from hamburger menu
$('#favorites').click(favorites);
// opens the favorites function
$('#container').on('click','#favorites',favorites);
// opens the random recipe from hamburger menu
$('#random').click(random);
// opens the random recipe from landing page
$('#container').on('click','#random',random);
