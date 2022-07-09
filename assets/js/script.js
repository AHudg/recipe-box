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
    $('#background').removeClass("secondary-background");
    $('#container').removeClass("container");

    $('#background').addClass("background");
    $('#container').addClass("grid-y text-center align-center");
    var titleLanding = $('<h2>');
    $('#container').append(titleLanding);
    titleLanding.text('Recipe Box');
    titleLanding.addClass('cell align-center landingText');
}

landingPage()

$('#home').click(landingPage);
$('.closeHamburger').click(closeHamburger);
$('#hamburgerIcon').click(openHamburger);
$('.nav').click(closeHamburger);