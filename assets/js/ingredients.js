// set inputs into an empty array; 
var inputs=[];
// var savedRecipes =[];
var ulEl = $('<ul>');
ulEl.addClass("cell small-11 grid-x");

// create input search bar
var ingredient = $("<input>");
// ingredient.attr('type','text');
ingredient.attr('id','ingredientInput');
ingredient.attr('name','ingredient');
ingredient.attr('placeholder',"What's in your pantry?");
ingredient.addClass('cell small-8 align-self-middle');

var search=document.createElement('button');
$(search).attr('type','submit')
$(search).attr('id','searchIngredients')
$(search).addClass('cell small-11 searchBtn');
search.innerHTML = 'Search';

var pageLoad = function(){
    // clear the current screen
    
    $('#container').empty();
    $('#container').removeClass('landingPage grid-y');
    $('#container').addClass('grid-x container')
    $('#container').attr('style','height:35vh');
    $('#listElements').empty();
    $('#listElements').addClass("listRecipes");
    $('#listElements').attr('style','height: 60vh');

    var labelEl = $('<label>').attr('for','ingredient');
    labelEl.text("Ingredients:");
    labelEl.addClass("cell small-4 align-self-middle");

    $('#container').append(labelEl);
    $('#container').append(ingredient);

    // create initial addIngredient button
    var addIngredient=document.createElement('button');
    $(addIngredient).attr('type','submit')
    $(addIngredient).addClass('cell small-11 addIngredientBtn');
    addIngredient.innerHTML = 'Add ingredient';

    $('#container').append(addIngredient)
    $('#container').append(ulEl);
    $('#container').append(search)
};

var addItem = function(){
    var ingredientInput = $(ingredient).val();


    if (!ingredientInput){
        return; 
    }

    if (inputs.length>=9){
        $('.addIngredientBtn').attr('data-open','ingError');
        $('.addIngredientBtn').removeAttr('data-close','ingError');
        var errH = $("<h1>Uh Oh!</h1>");
        var firstP = $(" <p class='lead'>Please do not add more than nine ingredients.</p>");
        var secondP = $("<p>Hope the search is going well!</p>");
        $("#ingError").append(errH, firstP, secondP);
        return;
    }

    if(inputs.length<9){
        $('.addIngredientBtn').attr('data-close','ingError');
        $('.addIngredientBtn').removeAttr('data-open','ingError');
       
    }

    inputs.push(ingredientInput);
    $(ingredient).val('')

    for(var i=0; i < inputs.length; i++){
       
        var liEl = $('<li>');
        liEl.attr('id', i );
        liEl.addClass('cell small-4')
       
        var deleteIcon = $('<span>')
        deleteIcon.addClass('cell deleteBtn');
        deleteIcon.html("&times")
        
        $(liEl).text(inputs[i]);
 
    }
    $(ulEl).append(liEl);
    $(liEl).append(deleteIcon);
    
}

var startSearch = function(){
    var inputsString = inputs.toString();
    // splice the inputs by ','
    var splitInputs = inputsString.split(',');

    // var ingrArray = splice in %2C%20
    var hexInputs = "";
    for (var i = 0; i < splitInputs.length; i++) {
        if (i === splitInputs.length-1) {
            var hexInputs = hexInputs + splitInputs[i];
        } else {
            var hexInputs = hexInputs + splitInputs[i] + "%2C%20";
        };
    }

    if (!hexInputs){
        return;
    }

    var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + hexInputs + "&app_id=1d67f783&app_key=4f2864d94a10bc0430788affdb03e6f6";

    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          catchUrl();
        });
      } 
    })
    .catch(function(error) {
        // 404 error
        $('#listElements').empty();
        var errH2 = $("<h1>Error 404</h1>");
        var firstP2 = $(" <p> Page Not Found.</p>");
        $('#listElements').append(errH2, firstP2);
    });

    async function catchUrl(){
        try {
            var response = await fetch(apiUrl, {
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
};

$('#listElements').on('click','.radio',function(){
    var inputVal = $(this).val();

    if (inputVal === 'no'){
        // savingRecipes();
        $(this).val('yes');

        var modalNumber = $(this).parent().children().attr('data-open');

        var info = {
            recipeName: $(this).parent().children().children(".card-name").text(),
            recipeUrl: $(this).parent().children().children('.card-image').attr('href'),
            img: $(this).parent().children().children(".card-image").children().attr('src'),
            servings: $(this).parent().children().children('.card-section').children(".card-servings").text(),
            caloriesData: $(modalNumber).children("div").children("modalCalories"),
            ingredientsNum: $(this).parent().children().children('.card-section').children(".card-ingLength").text(), 
            ingredientsList: $(modalNumber).children("ul")
        }

        console.log(info);
        savedRecipes = JSON.parse(localStorage.getItem("input"));

        if (!savedRecipes) {
            savedRecipes = [];
        };

        savedRecipes.push(info);
        localStorage.setItem('input',JSON.stringify(savedRecipes));

    } else {
        $(this).val('no');
        console.log($(this));
        savedRecipes = JSON.parse(localStorage.getItem("input"));

        savedRecipes.splice($(this)[0].id,1);

        console.log(savedRecipes);

        localStorage.setItem('input',JSON.stringify(savedRecipes));
    }
    
    
});

$('#ingredients').click(pageLoad);

$('#container').on('click','#ingredients',pageLoad);

$('#container').on('click','.addIngredientBtn',addItem);

$('#container').on('keypress','#ingredientInput',function(event){
    if (event.which === 13){
        event.preventDefault();     
        addItem();
    }
})

$('#container').on('click','.deleteBtn',function(){
    // gets text associated with this click
    var getText = $(this).parent().text();

    // takes the &times to get raw text
    newText = getText.slice(0, -1);
     
    // removes from array the item once it is clicked

    if(inputs.length === 1){
        inputs=[];
    }

    // deletes the item from the array if the text matches 
    for (var i = 0; i < inputs.length; i++) {
  
        if (inputs[i] === newText) {
            inputs.splice(i, 1);
        }
    }
    // removes item from page
    $(this).parent().remove()
});


$('#container').on('click','.searchBtn',function(){
    // $(listElements).empty()
    startSearch();
});


