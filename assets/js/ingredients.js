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
$(search).attr('data-close','trythis');
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
    console.log(inputs.length)
    if (inputs.length>=9){
        $('.addIngredientBtn').attr('data-open','ingError');
        $('.addIngredientBtn').removeAttr('data-close','ingError');
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

                       
                         for (var i = 0; i<8; i++){
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

var getRecipe = function(){
    for(var i=0; i<8; i++){
        $('#listElements').addClass("listRecipes");
        $('#listElements').attr('style','height: 60vh');

        var card = $('<div>');
        $(card).addClass('cell small-11 medium-5 card');
        $('#listElements').append(card);

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


