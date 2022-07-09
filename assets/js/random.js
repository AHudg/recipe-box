// code to get random recipe by title 
postEl = document.querySelector("#container");

var apiKey = "";

function getAPIdata (recipeInput) { 

    // this url gives a random recipe by title
    var url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + recipeInput + "&app_id=f060c488&app_key=8d00a9731a468460c3a7966ff703a4f7";
 
    fetch(url)
        .then(function(response) {
            // Convert to JSON object
            return response.json();
        })
        .then(function(data) {
           console.log(data);
           
           displayData(data);
        })
}

function displayData(data) {
    // var formEl = document.querySelector("#form");
    // postEl.removeChild(formEl);
    // create the html to hold the content
    // var divRow = document.createElement("div");
    // divRow.setAttribute("class", "row small-up-2 medium-up3");
    // // used css to add flex-box, functionality in foundation??? did not understand grid - that is up next; 
    // divRow.setAttribute('id', "flex-container");
    // postEl.appendChild(divRow);
    
    for (var i=0; i < 4; i++){
        var recipeName = data.hits[i].recipe.label;
        var recipeUrl = data.hits[i].recipe.shareAs; // can do shareAs OR url
        var img = data.hits[i].recipe.images.THUMBNAIL["url"];
        var servings = data.hits[i].recipe.yield;
        //var caloriesData = data.hits[i].recipe.calories;
        //caloriesData = caloriesData/servings; 
        var ingredients = data.hits[i].recipe.ingredients.length;


        // var divColumn = document.createElement("div");
        // divColumn.setAttribute("class", "column");
        // divRow.appendChild(divColumn); 
        
        var card = document.createElement("div");
        card.setAttribute('class','card small-11 medium-5');
        // card.classList.add("card small-11 medium-5");

        var cardDivider = document.createElement("div");
        cardDivider.setAttribute("class", "card-divider");
        cardDivider.textContent = recipeName;
        card.appendChild(cardDivider);

        var imgContainer = document.createElement("a");
        imgContainer.setAttribute("href", recipeUrl);
        imgContainer.setAttribute("target", "_blank");
        var imgContent = document.createElement("img");
        imgContent.setAttribute("src", img);
        imgContainer.appendChild(imgContent);
        card.appendChild(imgContainer);

        var cardSection = document.createElement("div");
        cardSection.setAttribute("class", "card-section");
        var servingsEl = document.createElement("p");
        servingsEl.textContent = "Servings: " + servings + " | ";
        cardSection.appendChild(servingsEl);
        var ingredientsEl = document.createElement("p");
        ingredientsEl.textContent = "Ingredients: " + ingredients;
        cardSection.appendChild(ingredientsEl);
        
        card.appendChild(cardSection);
        // divColumn.appendChild(card);
        $('#listElements').append(card);
    }
}

function getuserInput () {
    // clear the current screen
    $('#container').empty();
    $('#container').removeClass('landingPage');
    $('#listElements').empty();

    $('#container').addClass("container");

    postEl.innerHtml =""; 
    var formEl = document.createElement("form");
    formEl.setAttribute("id", "form");
    formEl.setAttribute('class','cell small-12 grid-x')
    postEl.appendChild(formEl);

    // var gridContainerEl = document.createElement("div");
    // gridContainerEl.setAttribute("class", "grid-container");
    // formEl.appendChild(gridContainerEl);

    // var gridXEl = document.createElement("div");
    // gridXEl.setAttribute("class", "grid-x grid-padding-x");
    // gridContainerEl.appendChild(gridXEl);

    // var cellEl = document.createElement("div");
    // cellEl.setAttribute("class", "medium-6 cell");
    // gridXEl.appendChild(cellEl);
    
    var labelEl = document.createElement("label");
    labelEl.textContent = "Find a Recipe"
    labelEl.setAttribute('class','cell small-4')
    formEl.appendChild(labelEl);

    var inputEl = document.createElement("input");
    inputEl.setAttribute("id", "recipe-input");
    inputEl.setAttribute("placeholder", "chicken enchiladas");
    inputEl.setAttribute('class','cell small-8');
    formEl.appendChild(inputEl);

    var buttonEl = document.createElement("button");
    // buttonEl.setAttribute("class", "button hollow");
    buttonEl.setAttribute("id", "button");
    buttonEl.setAttribute('class','cell small-11 searchBtn')
    buttonEl.textContent = "Find it for Me!";
    formEl.appendChild(buttonEl);

    buttonEl.addEventListener('click', function (event) {
        event.preventDefault();
        var form = document.querySelector("#recipe-input");
        var input = form.value.trim().replace(" ", "%20");;
       getAPIdata(input);
    });    
}

// could do this by listening to the whole document and making sure buttons have the correct id's
// if var buttonId === "whatever", run this code
//document.addEventListener('click', function (event) {
//         event.preventDefault();
        
//         getRecipe();
  
// });

$('#recipe').click(getuserInput);
$('#container').on('click','#recipe',getuserInput);