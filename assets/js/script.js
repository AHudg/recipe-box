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

// var inputs = prompt("What are your ingredients?");

// // splice the inputs by ','
// var splitInputs = inputs.split(',');
// console.log(splitInputs);

// // var ingrArray = splice in %2C%20
// var hexInputs = "";
// for (var i = 0; i < splitInputs.length; i++) {
//     if (i === splitInputs.length-1) {
//         var hexInputs = hexInputs + splitInputs[i];
//     } else {
//         var hexInputs = hexInputs + splitInputs[i] + "%2C%20";
//     };
// }
// console.log(hexInputs);


// var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + hexInputs + "&app_id=1d67f783&app_key=4f2864d94a10bc0430788affdb03e6f6";

//     fetch(apiUrl)
//         .then(function(response) {
//             if (response.ok) {
//                 response.json().then(function(data) {
//                     console.log(data)
//                 });
//             } else {
//                 alert("Error.");
//             }
//         });