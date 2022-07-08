

// create input search bar
var ingredient = document.createElement("input");
ingredient.setAttribute('type','text');
ingredient.setAttribute('id','ingredient');
ingredient.setAttribute('name','ingredient');
ingredient.setAttribute('placeholder','Type your ingredient of choice here');
ingredient.setAttribute('class','cell inputs')

$('#top').append(ingredient)

// create initial search button
var search=document.createElement('button');
$(search).attr('type','submit')
$(search).addClass('cell searchBtn');
search.innerHTML = 'Search';

$('#top').append(search)

var ulEl = $('<ul>');
$(ulEl).attr('style','list-style:none');
$('#top').append(ulEl);
// set inputs into an array; 
var inputs = [];

$('#top').on('click','.searchBtn',function(){

    var ingredientInput = $(ingredient).val();
    inputs.push(ingredientInput);
    
    display();
   
});

var display = function(){
    for(var i=0; i < inputs.length; i++){
        var liEl = $('<li>');
        // var deleteBtn = $('<button>');
        // $(deleteBtn).attr('type','submit')
        // $(deleteBtn).addClass('cell deleteBtn');
        // $(deleteBtn).text('Delete')
        $(liEl).text(inputs[i]);

        
    }
    $(ulEl).append(liEl);
    // $(ulEl).append(deleteBtn);

}

// // var inputs = prompt("What are your ingredients?");
// var inputsString = inputs.toString();
// // splice the inputs by ','
// var splitInputs = inputsString.split(',');
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




 // $('.deleteBtn').on('click',function(){
  
    
// }); 
