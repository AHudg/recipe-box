// set inputs into an array; 
var inputs = [];

var ulEl = $('<ul>');

// create input search bar
var ingredient = document.createElement("input");

var pageLoad = function(){
    // clear the current screen
    $('#container').empty();
    $('listElements').empty();

    ingredient.setAttribute('id','ingredient');
    ingredient.setAttribute('name','ingredient');
    ingredient.setAttribute('placeholder','Type your ingredient of choice here');
    ingredient.setAttribute('class','cell inputs')

    $('#container').append(ingredient)
    $('#container').addClass('container')

    // create initial addIngredient button
    var addIngredient=document.createElement('button');
    $(addIngredient).attr('type','submit')
    $(addIngredient).addClass('cell addIngredientBtn');
    addIngredient.innerHTML = 'Add ingredient';

    $('#container').append(addIngredient)

    $(ulEl).attr('style','list-style:none');
    $('#container').append(ulEl);

    var search=document.createElement('button');
    $(search).attr('type','submit')
    $(search).addClass('cell searchBtn');
    search.innerHTML = 'Search';
    $('#container').append(search)

};

$('#ingredients').click(pageLoad);

var addItem = function(){
    var ingredientInput = $(ingredient).val();
    if (!ingredientInput){
        return; 
    }
    inputs.push(ingredientInput);
    $(ingredient).val('')
    for(var i=0; i < inputs.length; i++){
       
        var liEl = $('<li>');
        liEl.attr('id',i );
        liEl.addClass('list')
        var deleteBtn = $('<button>');
        $(deleteBtn).attr('type','submit');
        $(deleteBtn).addClass('cell deleteBtn');

        var deleteIcon = $('<span>')
        deleteBtn.append(deleteIcon);
        deleteIcon.html("&times")
        
        $(liEl).text(inputs[i]);
    }
    $(ulEl).append(liEl);
    $(liEl).append(deleteBtn);
    displaySearch(liEl);
}


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
        $(cardEl).addClass('cell card');
        $('#listElements').append(cardEl);
        
        var nameEl = $('<p>');
        var labelEl = $('<p>');
        var imgEl = $('<p>');
        var servingsEl = $('<p>');
      
        var img = document.createElement("img");
        img.src =thumbnailArray[i];
        $(img).attr('id','image')

        $(cardEl).append(nameEl, imgEl, servingsEl, labelEl);

        $(imgEl).append(img);
        $(nameEl).text('Name: ' + nameArray[i]);
        $(labelEl).text('Labels: ' + labelArray[i]);
        $(servingsEl).text('Servings: '+ yieldArray[i]);
}
};

