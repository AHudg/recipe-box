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

    savedRecipes = JSON.parse(localStorage.getItem("Favorites"));

    if (savedRecipes) {
        for(var i=0; i<savedRecipes.length; i++){
            var cardEl = $('<div>');
            $(cardEl).addClass('cell small-11 medium-5 card');
            $('#listElements').append(cardEl);
            
            var nameEl = $("<p class='card-name'>");
            var labelEl = $("<p class='card-label'>")
            var imgEl = $("<p class='card-img'>");
            var servingsEl = $("<p class='card-servings'>");
          
            var img = document.createElement("img");
            img.src =thumbnailArray[i];
            $(img).attr('id','image');
    
            $(cardEl).append(nameEl, imgEl, servingsEl, labelEl);
            $(imgEl).append(img);
            $(nameEl).text('Name: ' + nameArray[i]);
            $(labelEl).text('Labels: ' + labelArray[i]);
            $(servingsEl).text('Servings: '+ yieldArray[i]);
    
            var radioHome = $('<label>');
            cardEl.append(radioHome);
            radioHome.attr("for", "accept");
            var radioInput = $('<input>');
            cardEl.append(radioInput);
            radioInput.attr('type','checkbox');
            radioInput.attr('name','accept');
            radioInput.attr('value','no');
            radioInput.addClass('radio');
            console.log(nameEl);
        };
    };
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

                    
                    for (var i = 0; i<8; i++){
                        var name = data.hits[i].recipe.label;
                        nameArray.push(name);
                        //  var label = data.hits[i].recipe.healthLabels;
                        //  labelArray.push(label);
                        console.log(data);
                        var yieldAmount = data.hits[i].recipe.yield;
                        yieldArray.push(yieldAmount);
                        var thumb = data.hits[i].recipe.image;
                        thumbnailArray.push(thumb);
                        var recipeUrl = data.hits[i].recipe.url  
                        urlArray.push(recipeUrl);
                        var ingredientsLength = data.hits[i].recipe.ingredients.length;
                        ingLengthArray.push(ingredientsLength);

                    }
                    
                    for(var i=0; i<8; i++){
                        var cardEl = $('<div>');
                        $(cardEl).addClass('cell small-11 medium-5 card');
                        $('#listElements').append(cardEl);
                        
                        var nameEl = $("<p class='card-name'>");
                        // var labelEL = $("<p class='card-label'>")
                        var imgEl = $("<p class='card-img'>");
                        var servingsEl = $("<p class='card-servings'>");
                        var ingLengthEl = $("<p class='card-ingLength'>");
                
                
                        var img = document.createElement("img");
                        img.src =thumbnailArray[i];
                        $(img).attr('id','image')
                        
                        var urlEl = $('<p>')
                        urlEl.attr('id','card-url')
                        urlEl.src = urlArray[i];
                        var link = urlEl.src
                
                        // append labelEl here if decide to use
                        $(cardEl).append(nameEl, imgEl, servingsEl,ingLengthEl);
                        $(imgEl).append(img);
                        $(nameEl).text('Name: ' + nameArray[i]);
                        // $(labelEl).text('Labels: ' + labelArray[i]);
                        $(servingsEl).text('Servings: '+ yieldArray[i]);
                        $(ingLengthEl).text('How many ingredients' +ingLengthArray[i]);
                
                
                        var radioHome = $('<label>');
                        cardEl.append(radioHome);
                        radioHome.attr("for", "accept");
                        var radioInput = $('<input>');
                        cardEl.append(radioInput);
                        radioInput.attr('type','checkbox');
                        radioInput.attr('name','accept');
                        radioInput.attr('value','no');
                        radioInput.addClass('radio');
                    }                        
                });
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
