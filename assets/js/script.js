var openHamburger = function(event) {
    console.log(event.target);
    $('.hamburger').attr('style','transform: translateY(0)');
};

var closeHamburger = function() {
    $('.hamburger').attr('style','transform: translateX(-300px)');
};

var landingPage = function() {
    $('#container').addClass("grid-y text-center align-center");
    var titleLanding = $('<h2>');
    $('#container').append(titleLanding);
    titleLanding.text('Recipe Box');
    titleLanding.addClass('landingText');
}

landingPage();

$('.closeHamburger').click(closeHamburger);
$('#hamburgerIcon').click(openHamburger);