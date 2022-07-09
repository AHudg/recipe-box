var openHamburger = function(event) {
    console.log(event.target);
    $('.hamburger').attr('style','transform: translateY(0)');
};

var closeHamburger = function() {
    $('.hamburger').attr('style','transform: translateX(-300px)');
};

var landingPage = function() {
    // clear the current screen
    $('#container').empty();
    $('#listElements').empty();

    $('#container').addClass("grid-y text-center align-center");
    var titleLanding = $('<h2>');
    $('.background').append(titleLanding);
    titleLanding.text('Recipe Box');
    titleLanding.addClass('cell align-center landingText');
}

landingPage()

$('#home').click(landingPage);
$('.closeHamburger').click(closeHamburger);
$('#hamburgerIcon').click(openHamburger);
$('.nav').click(closeHamburger);