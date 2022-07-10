// set inputs into an array; 
var inputs = [];
var savedRecipes =[];
var ulEl = $('<ul>');
ulEl.addClass("cell small-11 grid-x");

// create input search bar
var ingredient = $("<input>");
// ingredient.attr('type','text');
ingredient.attr('id','ingredient');
ingredient.attr('name','ingredient');
ingredient.attr('placeholder',"What's in your pantry?");
ingredient.addClass('cell small-8 align-self-middle');

var search=document.createElement('button');
$(search).attr('type','submit')
$(search).addClass('cell small-11 searchBtn');
search.innerHTML = 'Search';

var firstTime = false;

var pageLoad = function(){
    // clear the current screen
    $('#container').empty();
    $('#container').removeClass('landingPage grid-y');
    $('#container').addClass('grid-x container')
    $('#container').attr('style','height:35vh');
    $('#listElements').empty();


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
};

var addItem = function(){
    var ingredientInput = $(ingredient).val();

    if (!ingredientInput){
        return; 
    }
    if (inputs.length>8){
        // only allows for 9 user inputs
        return;

    }

    inputs.push(ingredientInput);
    $(ingredient).val('')

    for(var i=0; i < inputs.length; i++){
       
        var liEl = $('<li>');
        liEl.attr('id',i );
        liEl.addClass('cell small-4')

        var deleteIcon = $('<span>')
        deleteIcon.addClass('cell deleteBtn');
        deleteIcon.html("&times")
        
        $(liEl).text(inputs[i]);
        if (!firstTime) {
            firstTime = true;
            $('#container').append(ulEl);
            $('#container').append(search)
        }
    
    }
    $(ulEl).append(liEl);
    $(liEl).append(deleteIcon);
    
}

$('#container').on('click','.addIngredientBtn',addItem);

$('#container').on('keypress',ingredient,function(event){
    if (event.which === 13){
        event.preventDefault();
        addItem();
    }
})

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
                if (response.ok) {
                    response.json().then(function(data) {
                        nameArray = [];
                        // labelArray = [];
                        yieldArray = [];
                        urlArray = [];
                        ingLengthArray = [];
                        thumbnailArray = [];

                       
                         for (var i = 0; i<4; i++){ // not sure why this was 8 - Madalyne
                             var name = data.hits[i].recipe.label;
                             nameArray.push(name);
                            //  var label = data.hits[i].recipe.healthLabels;
                            //  labelArray.push(label);

                             var yieldAmount = data.hits[i].recipe.yield;
                             yieldArray.push(yieldAmount);
                             var thumb = data.hits[i].recipe.image;
                             thumbnailArray.push(thumb);
                             var recipeUrl = data.hits[i].recipe.url  
                             urlArray.push(recipeUrl);
                             var ingredientsLength = data.hits[i].recipe.ingredients.length;
                             ingLengthArray.push(ingredientsLength);

                         }
                         
                         getRecipe(data);
                         
                    });
                } else {
                    alert("Error.");
                }
            });

};


var getRecipe = function(data){
    for(var i=0; i<4; i++){ // changed to 4 to only get 4 recipes - Madalyne
        var cardEl = $('<div>');
        $(cardEl).addClass('cell small-11 medium-5 card');
        $('#listElements').append(cardEl);
        
        var nameEl = $("<p class='card-name'>");
        // var labelEL = $("<p class='card-label'>")
        var imgEl = $("<p class='card-img'>");
        var servingsEl = $("<p class='card-servings'>");
        var ingLengthEl = $("<p class='card-ingLength'>");


        $('#listElements').addClass("listRecipes");
        $('#listElements').attr('style','height: 60vh');


        var card = $('<div>');
        $(card).addClass('cell small-11 medium-5 card');
        $('#listElements').append(card);


        var img = document.createElement("img");
        img.src =thumbnailArray[i];
        $(img).attr('id','image')
        
        var urlEl = $('<p>')
        urlEl.attr('id','card-url')
        urlEl.src = urlArray[i];
        // var link = urlEl.src
        

        var cardDivider = $('<div>');
        cardDivider.addClass('card-divider card-name');
        cardDivider.text('Name: ' + nameArray[i]);


        var imgContainer = $('<a>');
        imgContainer.addClass('card-image');
        imgContainer.attr('href', urlArray[i]);
        imgContainer.attr("target", "_blank");
        imgContainer.addClass('false');

        var imgContent = $('<img>');
        imgContent.attr('src',thumbnailArray[i]);
        imgContainer.append(imgContent)

        var cardSection = $('<div>');
        cardSection.addClass('card-section');

        var servingsEl = $("<p class='card-servings'>");
        $(servingsEl).text('Servings: '+ yieldArray[i] + ' | ');
        cardSection.append(servingsEl);

        var ingredientsEl = $("<p class='card-ingLength'>");
        ingredientsEl.text('Ingredients:' + ingLengthArray[i]);
        cardSection.append(ingredientsEl);

        // var labelEL = $("<p class='card-label'>")
        
        // append labelEl here if decide to use
        $(card).append(cardDivider,imgContainer, cardSection);
     
        var radioHome = $('<label>');
        card.append(radioHome);
        radioHome.attr("for", "accept");
        var radioInput = $('<input>');
        card.append(radioInput);
        radioInput.attr('type','checkbox');
        radioInput.attr('name','accept');
        radioInput.attr('value','no');
        radioInput.addClass('radio');

        // modal code here
        var recipeName = data.hits[i].recipe.label;
        var recipeUrl = data.hits[i].recipe.shareAs; 
        var img = data.hits[i].recipe.images.THUMBNAIL["url"];
        var servings = data.hits[i].recipe.yield;
        var caloriesData = data.hits[i].recipe.calories;
        caloriesData = Math.round(caloriesData/servings); 
        var ingredientsNum = data.hits[i].recipe.ingredients.length;
        var ingredientsList = data.hits[i].recipe.ingredients;

        var modalNum = 'modal-recipe-' + i;
        cardEl.attr("data-open", modalNum);

        // populate the modal data
        var modalDiv = document.getElementById(modalNum);

        var recipeTitelEl = document.createElement("h2");
        recipeTitelEl.textContent = recipeName;
        modalDiv.appendChild(recipeTitelEl);

        var imgContainer = document.createElement("a");
        imgContainer.setAttribute("href", recipeUrl);
        imgContainer.setAttribute("target", "_blank");
        var imgContent = document.createElement("img");
        imgContent.setAttribute("src", img);
        imgContainer.appendChild(imgContent);
        modalDiv.appendChild(imgContainer);

        var modalSection = document.createElement("div");
        var servingsEl = document.createElement("p");
        servingsEl.textContent = "Servings: " + servings;
        modalSection.appendChild(servingsEl);
        var caloriesEl = document.createElement("p");
        caloriesEl.textContent = "Calories per serving: " + caloriesData;
        modalSection.appendChild(caloriesEl);
        modalDiv.appendChild(modalSection);

        var ingredientsDiv = document.createElement("div");
        var ingredientsUlEl = document.createElement("ul");
        ingredientsDiv.appendChild(ingredientsUlEl);
     
        for (var j=0; j<ingredientsList.length; j++){
            var ingredientLi = document.createElement("li");
            ingredientLi.textContent = ingredientsList[j]["text"];
            ingredientsUlEl.appendChild(ingredientLi);
        }
        modalDiv.appendChild(ingredientsDiv);

        // get the beer pairing
        var beerPairingEl = document.createElement("p");
        beerPairingEl.setAttribute("id", recipeName); 
        modalDiv.appendChild(beerPairingEl);

        // call beer API
        getBeer(recipeName);
    }
};

$('#listElements').on('click','.radio',function(){
    var inputVal = $(this).val();
    if (inputVal === 'no'){
        // savingRecipes();
        $(this).val('yes');
        var info = {
            name: $(this).parent().children('.card-name').text(),
            // label: $(this).parent().children('.card-label').text(),
            image: $(this).parent().children('.card-image').children().attr('src'),
            servings: $(this).parent().children().children('.card-servings').text(),
            howManyIng:$(this).parent().children().children('.card-ingLength').text(), 
            urlLink:$(this).parent().children('.card-image').attr('href')
        }

        if (!savedRecipes) {
            savedRecipes = [];
        };

        savedRecipes.push(info);
        localStorage.setItem('input',JSON.stringify(savedRecipes));

    } else {
        $(this).val('no');
        savedRecipes = JSON.parse(localStorage.getItem("input"));

        savedRecipes.splice($(this)[0].id,1);

        localStorage.setItem('input',JSON.stringify(savedRecipes));
    }
    
});


function getBeer (recipeName){
    var modalDivBeerEl = document.getElementById(recipeName);
    var beerApiUrl = "https://api.punkapi.com/v2/beers/random";
    var beerPairing = "";

    fetch(beerApiUrl).then(function(response) {
        if (response.ok){
            response.json().then(function(data) {
                var name = data[0].name;
                var tagline = data[0].tagline;
                beerPairing = "Your recommended beer pairing is: " + name + ": " + tagline;
                modalDivBeerEl.textContent = beerPairing;
                return;
            });
        }
    });
    beerPairing = "Unable to find a beer";
    modalDivBeerEl.textContent = beerPairing;
}

//makes links on images unclickable currently - can remove later
$('#listElements').on('click','.false',function(){
    return false; 
})


$('#ingredients').click(pageLoad);
$('#container').on('click','#ingredients',pageLoad);

$('#container').on('click','.addIngredientBtn',addItem);

$('#container').on('keypress',ingredient,function(event){
    if (event.which === 13){
        event.preventDefault();
        addItem();
    }
})

$('#container').on('click','.deleteBtn',function(){
    var getId = $(this).parent().attr('id');
    // removes from array the item once it is clicked
    
    if(inputs.length === 1){
        inputs=[];
    }
    inputs.splice(getId,1);
    // removes item from page
    $(this).parent().remove()
});

$('#container').on('click','.searchBtn',function(){
    $(listElements).empty()
    startSearch();
});
