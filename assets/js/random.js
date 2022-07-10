// code to get random recipe by title 
postEl = document.querySelector("#container");



function getAPIdata (recipeInput) { 

    // this url gives a random recipe by title
    var url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + recipeInput + "&app_id=f060c488&app_key=8d00a9731a468460c3a7966ff703a4f7";
 
    fetch(url).then(function(response) {
        if (response.ok){
            response.json().then(function(data) {
                extractData(data);
            });
        } else {
            // do something with 404 error
            alert("Error: recipe not found");
        }
    })
    .catch(function(error) {
        // do something with unable to connect
        alert("Unable to connect");
    });
    console.log(recipeInput)
}



function getuserInput () {
    // clear the current screen
    $('#container').empty();
    $('#container').removeClass('landingPage grid-y');
    $('#container').addClass("grid-x container");
    $('#container').attr('style','height:15vh');
    $('#listElements').empty();
    $('#listElements').addClass("listRecipes");
    $('#listElements').attr('style','height:80vh');

    postEl.innerHtml =""; 
    var formEl = document.createElement("form");
    formEl.setAttribute("id", "form");
    formEl.setAttribute('class','cell small-12 grid-x')
    postEl.appendChild(formEl);
    
    var labelEl = document.createElement("label");
    labelEl.textContent = "Find a Recipe"
    labelEl.setAttribute('class','cell small-4')
    formEl.appendChild(labelEl);

    var inputEl = document.createElement("input");
    inputEl.setAttribute("id", "recipe-input");
    inputEl.setAttribute("placeholder", "chicken enchiladas");
    inputEl.setAttribute('class','cell small-7');
    formEl.appendChild(inputEl);

    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("id", "button");
    buttonEl.setAttribute('class','cell small-11 recipeBtn')
    buttonEl.textContent = "Find it for Me!";
    formEl.appendChild(buttonEl);

    buttonEl.addEventListener('click', function (event) {
        event.preventDefault();
        var form = document.querySelector("#recipe-input");
        var input = form.value.trim().replaceAll(" ", "%20");;
       getAPIdata(input);
    });    
}


$('#recipe').click(getuserInput);

$('#container').on('click','#recipe',getuserInput);

$('#container').on('keypress','#recipe-input',function(event){
    if (event.which === 13){
        event.preventDefault();
        var form = document.querySelector("#recipe-input");
        var input = form.value.trim().replaceAll(" ", "%20");;
        getAPIdata(input);
    }
})