// code to get random recipe by title 
postEl = document.querySelector("#container");

function getAPIdata (recipeInput) { 

    // this url gives a random recipe by title
    var url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + recipeInput + "&app_id=f060c488&app_key=8d00a9731a468460c3a7966ff703a4f7&random=true";
 
    fetch(url)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        
        response.json().then(function(data) {
          catchUrl();
        });
      } 
    })
    .catch(function(error) {
        // 404 error
        $('#listElements').empty();
        var divErr = $("<div class='error grix-x text-center'>")
        var errH2 = $("<h1>Error 404</h1>");
        var firstP2 = $(" <p> Page Not Found.</p>");
        $('#listElements').append(divErr);
        $(divErr).append(errH2, firstP2);
    });
    
    async function catchUrl(){
        try {
            var response = await fetch(url, {
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
            var divErr = $("<div class='error grix-x text-center'>")
            var errH2 = $("<h1>Uh Oh!</h1>");
            var firstP2 = $(" <p> Something went wrong.</p>");
            var secondP2 = $("<p>Please make sure everything is spelled properly.</p>");
            var secondP3 = $("<p>Please try again.</p>");
            $('#listElements').append(divErr);
            $(divErr).append(errH2,firstP2,secondP2,secondP3);
            return;
          }
    };
};

function getuserInput () {
    // clear the current screen
    $('#container').empty();
    $('#container').removeClass('landingPage grid-y');
    $('#container').addClass("grid-x container");
    $('#listElements').empty();
    $('#listElements').addClass("listRecipes");

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
    buttonEl.setAttribute('class','cell small-11 searchBtn')
    buttonEl.setAttribute('data-close','ingError');
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