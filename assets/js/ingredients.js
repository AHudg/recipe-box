

// create input search bar
var ingredient = document.createElement("input");
ingredient.setAttribute('type','text');
ingredient.setAttribute('id','ingredient');
ingredient.setAttribute('name','ingredient');
ingredient.setAttribute('placeholder','Type your ingredient of choice here');
ingredient.setAttribute('class','cell inputs')

$('#top').append(ingredient)

// create initial addIngredient button
var addIngredient=document.createElement('button');
$(addIngredient).attr('type','submit')
$(addIngredient).addClass('cell addIngredientBtn');
addIngredient.innerHTML = 'Add ingredient';

$('#top').append(addIngredient)

var ulEl = $('<ul>');
$(ulEl).attr('style','list-style:none');
$('#top').append(ulEl);
// set inputs into an array; 
var inputs = [];



var addItem = function(){
    var ingredientInput = $(ingredient).val();
    inputs.push(ingredientInput);
    $(ingredient).val('')
    display();
    console.log(inputs)
}

$('#top').on('click','.addIngredientBtn',addItem);

$('#top').on('keypress',ingredient,function(event){
    if (event.which === 13){
        event.preventDefault();
        addItem();
    }
})

var display = function(){
    for(var i=0; i < inputs.length; i++){
        var liEl = $('<li>');
        // var deleteBtn = $('<button>');
        // $(deleteBtn).attr('type','submit');
        // $(deleteBtn).addClass('cell deleteBtn');
        // $(deleteBtn).text('Delete');
        $(liEl).text(inputs[i]);

        
    }
    $(ulEl).append(liEl);
    // $(ulEl).append(deleteBtn);

}

var hEl = $('<h4>');
$(hEl).text('Once you have completed your inputs, click the button below to run a search.')
$('#top').append(hEl)
var search=document.createElement('button');
$(search).attr('type','submit')
$(search).addClass('cell searchBtn');
search.innerHTML = 'Search';
$('#top').append(search)

$('#top').on('click','.searchBtn',function(){
    startSearch();
});
   
var startSearch = function(){
    var inputsString = inputs.toString();
    // splice the inputs by ','
    var splitInputs = inputsString.split(',');
    console.log(splitInputs);

    // var ingrArray = splice in %2C%20
    var hexInputs = "";
    for (var i = 0; i < splitInputs.length; i++) {
        if (i === splitInputs.length-1) {
            var hexInputs = hexInputs + splitInputs[i];
        } else {
            var hexInputs = hexInputs + splitInputs[i] + "%2C%20";
        };
    }
    console.log(hexInputs);


    var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + hexInputs + "&app_id=1d67f783&app_key=4f2864d94a10bc0430788affdb03e6f6";

        fetch(apiUrl)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        console.log(data)
                        nameArray = [];
                        labelArray = [];
                        timeArray = [];
                        yieldArray = [];
                        thumbnailArray = [];
                       
                         for (var i = 0; i<8; i++){
                             var name = data.hits[i].recipe.label;
                             nameArray.push(name);
                             var label = data.hits[i].recipe.healthLabels;
                             labelArray.push(label);
                             var time = data.hits[i].recipe.totalTime;
                             timeArray.push(time);
                             var yieldAmount = data.hits[i].recipe.yield;
                             yieldArray.push(yieldAmount);
                             var thumb = data.hits[i].recipe.image;
                             thumbnailArray.push(thumb);           
                         }
             
                         getRecipe(data);
                         
                    });
                } else {
                    alert("Error.");
                }
            });


};

var getRecipe = function(){
    for(var i=0; i<8; i++){
        var cardEl = $('<card>');
        $(cardEl).addClass('cell');
        $('#bottom').append(cardEl);
        
        var p1 = $('<p>');
        var p2 = $('<p>');
        var p3 = $('<p>');
        var p4 = $('<p>');
        var p5 = $('<p>');
      
        var img = document.createElement("img");
        img.src =thumbnailArray[i];

        $(cardEl).append(p5, p4, p1, p2, p3);

        $(p4).append(img);
        $(p1).text('Name: ' + nameArray[i]);
        $(p3).text('Labels: ' + labelArray[i]);
        $(p2).text('Total Time: '+ timeArray[i]);
        $(p5).text('Yield: '+ yieldArray[i]);
        

}
};
//  $('.deleteBtn').on('click',function(){
  
    
// }); 
