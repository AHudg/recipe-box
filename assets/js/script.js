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
    $('#listElements').empty();
    $('#listElements').addClass('recipeFormat');

    savedRecipes = JSON.parse(localStorage.getItem("input"));

    if (savedRecipes) {
        for(var i=0; i<savedRecipes.length; i++){
            var info = {
                name: savedRecipes[i].name,
                // label: $(this).parent().children('.card-label').text(),
                image: savedRecipes[i].image,
                servings: savedRecipes[i].servings,
                howManyIng: savedRecipes[i].howManyIng, 
                urlLink: savedRecipes[i].urlLink
            }

            var card = $('<div>');
            $(card).addClass('cell small-11 medium-5 card');
            $('#listElements').append(card);
    
            var cardDivider = $('<div>');
            cardDivider.addClass('card-divider card-name');
            cardDivider.text('Name: ' + info.name);
    
            var imgContainer = $('<a>');
            imgContainer.addClass('card-image');
            imgContainer.attr('href', info.urlLink);
            imgContainer.attr("target", "_blank");
            imgContainer.addClass('false');
    
            var imgContent = $('<img>');
            imgContent.attr('src',info.image);
            imgContainer.append(imgContent)
    
            var cardSection = $('<div>');
            cardSection.addClass('card-section');
    
            var servingsEl = $("<p class='card-servings'>");
            $(servingsEl).text('Servings: '+ info.servings + ' | ');
            cardSection.append(servingsEl);
            
            var ingredientsEl = $("<p class='card-ingLength'>");
            ingredientsEl.text('Ingredients:' + info.howManyIng);
            cardSection.append(ingredientsEl);
    
            // var labelEL = $("<p class='card-label'>")
            
            // append labelEl here if decide to use
            $(card).append(cardDivider,imgContainer, cardSection);
         
            var radioHome = $('<label>');
            card.append(radioHome);
            radioHome.attr("for", "accept");
            var radioInput = $('<input checked>');
            card.append(radioInput);
            radioInput.attr('type','checkbox');
            radioInput.attr('name','accept');
            radioInput.attr('value','yes');
            radioInput.attr('id',i);
            radioInput.addClass('radio');
        };
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
                    nameArray = [];
                    // labelArray = [];
                    yieldArray = [];
                    thumbnailArray = [];
                    urlArray = [];
                    ingLengthArray = [];

                    
                    for (var i = 0; i<4; i++){
                        var name = data.hits[i].recipe.label;
                        nameArray.push(name);
                        //  var label = data.hits[i].recipe.healthLabels;
                        //  labelArray.push(label);
                        
                        var yieldAmount = data.hits[i].recipe.yield;
                        yieldArray.push(yieldAmount);
                        var thumb = data.hits[i].recipe.image;
                        thumbnailArray.push(thumb);
                        var recipeUrl = data.hits[i].recipe.url  
                        urlArray.push(recipeUrl);
                        var ingredientsLength = data.hits[i].recipe.ingredients.length;
                        ingLengthArray.push(ingredientsLength);

                    }
                    
                    for(var i=0; i<4; i++) {
                        $('#listElements').addClass("listRecipes");
                        $('#listElements').attr('style','height: 60vh');
                        
                        var card = $('<div>');
                        $(card).addClass('cell small-11 medium-5 card');
                        $('#listElements').append(card);
                        
                        var modal = $('<div>');
                        $(card).append(modal);
                        
                        var cardDivider = $('<div>');
                        cardDivider.addClass('card-divider card-name');
                        cardDivider.text('Name: ' + nameArray[i]);
                        
                        //Madalyne: not linking image anymore
                        var imgContainer = $('<a>');
                        imgContainer.addClass('card-image');
                        imgContainer.attr('href', urlArray[i]);
                        imgContainer.attr("target", "_blank");
                        imgContainer.addClass('false');
                
                        var imgContent = $('<img>');
                        imgContent.attr('src',thumbnailArray[i]);
                        imgContainer.append(imgContent);
                
                        var cardSection = $('<div>');
                        cardSection.addClass('card-section');
                
                        var servingsEl = $("<p class='card-servings'>");
                        $(servingsEl).text('Servings: '+ yieldArray[i] + ' | ');
                        cardSection.append(servingsEl);
                
                        var ingredientsEl = $("<p class='card-ingLength'>");
                        ingredientsEl.text('Ingredients:' + ingLengthArray[i]);
                        cardSection.append(ingredientsEl);
                
                        // var labelEL = $("<p class='card-label'>")
                        
                        // append labelEl here if decide to use
                        $(modal).append(cardDivider,imgContainer, cardSection);
                     
                        var radioHome = $('<label>');
                        card.append(radioHome);
                        radioHome.attr("for", "accept");
                        var radioInput = $('<input>');
                        card.append(radioInput);
                        radioInput.attr('type','checkbox');
                        radioInput.attr('name','accept');
                        radioInput.attr('value','no');
                        radioInput.addClass('radio');
                        

                        // modal code here
                        var recipeName = data.hits[i].recipe.label;
                        var recipeUrl = data.hits[i].recipe.shareAs; 
                        var img = data.hits[i].recipe.images.THUMBNAIL["url"];
                        var servings = data.hits[i].recipe.yield;
                        var caloriesData = data.hits[i].recipe.calories;
                        caloriesData = Math.round(caloriesData/servings); 
                    
                        var ingredientsList = data.hits[i].recipe.ingredients;

                        var modalNum = 'modal-recipe-' + i;
                        modal.attr("data-open", modalNum);

                        // populate the modal data
                        var modalDiv = document.getElementById(modalNum);

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

                    }                        
                })
            } else {
                alert("Error.");
            }
        });
}

closeHamburger()
landingPage()

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
