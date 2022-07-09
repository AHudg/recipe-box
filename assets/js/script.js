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
    landingRecipe.attr('id','random');
    landingRecipe.addClass('cell landingText');

    // $('#container').append(landingImage);
    $('#container').append(landingFavorites);
    $('#container').append(landingIngredient);
    $('#container').append(landingRecipe);
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
// opens the favorites function
$('#container').on('click','#favorites',favorites);
