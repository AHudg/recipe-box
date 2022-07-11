

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
            extractData(savedRecipes);
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
    var ranUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=1d67f783&app_key=4f2864d94a10bc0430788affdb03e6f6&diet=balanced&random=true";

    fetch(ranUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                extractData(data)                 
            })
        } else {
            alert("Error.");
        }
    });

    async function catchUrl(){
        try {
            var response = await fetch(url, {
              method: 'GET',
              headers: {
                accept: 'application/json',
              },
            });


            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
              }
          
            var data = await response.json();
            extractData(data);
    
         
          } catch (err) {
            $('#listElements').empty();
            var errH2 = $("<h1>Uh Oh!</h1>");
            var firstP2 = $(" <p> Something went wrong.</p>");
            var secondP2 = $("<p>Please make sure everything is spelled properly.</p>");
            $('#listElements').append(errH2, firstP2, secondP2);
            return;
          }
    };
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
