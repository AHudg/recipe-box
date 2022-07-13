$(document).foundation();

var openHamburger = function(event) {
    $('.hamburger').attr('style','transform: translateY(0)');
};

var closeHamburger = function() {
    // if ($(window).width() > 768) {
    //     $('.hamburger').attr('style','transform: translateX(-'+ $('#hamburger').width() +'px)');
    // } else {
    $('.hamburger').attr('style','transform: translateX(-100vw)');
    // };
};

var landingPage = function() {
    // clear the current screen
    $('#container').empty();
    $('#container').removeClass("container grid-x");
    $('#container').addClass("grid-y text-center align-center align-middle landingPage");

    $('#listElements').empty();

    $('#background').removeClass("secondary-background");
    $('#background').addClass("background");

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

    var landingDiv = $('<div>');
    landingDiv.addClass('grid-y landingPosition');

    $(landingDiv).append(landingFavorites);
    $(landingDiv).append(landingIngredient);
    $(landingDiv).append(landingRecipe);
    $(landingDiv).append(landingRandom);
    $('#container').append(landingDiv);

}

var favorites = function() {
    $('#container').empty();
    $('#container').removeClass('landingPage container');
    $('#listElements').empty();
    $('#listElements').addClass('recipeFormat');

    // get localStorage data
    savedRecipes = JSON.parse(localStorage.getItem("input"));

    // if localStorage exist...
    if (savedRecipes && savedRecipes.length != 0) {
            extractData(savedRecipes);
    } else {
        $('#listElements').empty();
        var divErr = $("<div class='error grix-x text-center'>")
        var errH2 = $("<h1>No favorites saved yet!</h1>");
        $('#listElements').append(divErr);
        $(divErr).append(errH2);
    }
};

var random = function() {
    $('#container').empty();
    $('#container').removeClass('landingPage container');
    $('#listElements').empty();
    $('#listElements').addClass('recipeFormat');

    var ranUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=1d67f783&app_key=4f2864d94a10bc0430788affdb03e6f6&diet=balanced&random=true";
    
    fetch(ranUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          extractData(data);
        });
      } 
    })
    .catch(function(error) {
        // 404 error
        $('#listElements').empty();
        var divErr = $("<div class='error grix-x text-center'>")
        var errH2 = $("<h1>Error 404</h1>");
        var firstP2 = $(" <p> Page Not Found.</p>");
        $('#listElements').append(divErr);
        $(divErr).append(errH2, firstP2);
    });
};
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
