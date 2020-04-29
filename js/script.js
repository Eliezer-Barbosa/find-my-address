// wait until the page is ready to be load
$(document).ready(function() {
    // when the page loads, wait 10 seconds to display the weather info
    setInterval(function() { 
        $(".weather-section").fadeOut("slow")
        getWeather(); 
        $(".weather-section").fadeIn("slow")
    }, 8000);

    // when the focus in out of the textCep  input, this function is activated
    $("#txtCep").focusout(function() {
        // this variable gets the cep input value
        var cep = $("#txtCep").val();

        // if cep is not null, empty
        if (cep != "") {
            // regex pattern of a valid cep: any number from 0 to 9, size 8. sample: 03945080
            var validateCep = /^[0-9]{8}$/;
            // check if the cep given is valid according to regex
            if (validateCep.test(cep)) {
                // making request to the cep API, passing the cep given
                var urlStr = "https://viacep.com.br/ws/"+ cep +"/json/";
                // adding a callback function to the url, to get the response in case the cep is not found
                $.getJSON(urlStr + "?callback=?", function(data) {
                    // if the cep was nit found, the API returns an erro as response
                    if (!("erro" in data)) {
                        // setting input fields with data from API 
                        $("#txtCidade").val(data.localidade);
                        $("#txtEstado").val(data.uf);
                        $("#txtBairro").val(data.bairro);
                        $("#txtRua").val(data.logradouro);
                        $("#txtComplemento").val(data.complemento);
                    } else {
                        // cep was not found
                        document.getElementById("message").
                        // show a message to the user
                        innerHTML = `Cep ${cep} not found...Please try again.`
                        // clear all fields after 2 seconds
                        setTimeout(clearFields, 2000);
                        // clear message after 3 seconds
                        setTimeout(clearMessage, 3000);
                    }
                });
            } else {
                // cep was given in an invalid format
                document.getElementById("message").
                innerHTML = `Cep ${cep} is not valid...Please try again.`
                setTimeout(clearFields, 2000);
                setTimeout(clearMessage, 3000);
            }
        } else {
            clearFields()
        }
    });
});

function clearMessage() {
    document.getElementById('message').innerHTML = "";
}

function clearRandomCep() {
    document.getElementById('randomCep').innerHTML = "";
}

function clearFields() {
    document.getElementById('txtCep').value = "";
    document.getElementById('txtCidade').value = "";
    document.getElementById('txtEstado').value = "";
    document.getElementById('txtBairro').value = "";
    document.getElementById('txtRua').value = "";
    document.getElementById('randomCep').innerHTML = "";
    setSeriousHeader()
}

function setSeriousHeader() {
    document.getElementById("header").innerHTML = "Find My Address!"
    var html = document.getElementsByClassName('jumbotron')[0];
    html.style.cssText = "background-color: 3b7fb6";
}

// array of valid ceps to get started 
function getRandomCep() {
    var ceps = [
        '45055750',
        '58090837',
        '53070570',
        '45611018',
        '89803480',
        '67100220',
        '04291060',
        '03254410',
        '08122080',
        '79081722'
    ]
    // get a random cep from the array
    const random = Math.floor(Math.random() * 10);
    document.getElementById("randomCep").innerHTML = ceps[random]
    // clear cep after 10 seconds
    setTimeout(clearRandomCep, 10000);
}

// display a random chuck norris joke from the API
function setJokeHeader() {
    document.getElementById("header").innerHTML = 'Find my <s>Address</s> Chuck Joke!'
    var html = document.getElementsByClassName('jumbotron')[0];
    html.style.cssText = "background-color: #1e374f";
}

function getJoke() {
    // making a request to get jokes of dev category from the chuck norris API
    const joke = fetch('https://api.icndb.com/jokes/random?category=dev');
        joke.then(data => data.json()).then(data => {
        console.log(data)
        console.log('joke id: ' + data.value.id)
        console.log("joke content: " + data.value.joke)
        document.getElementById("randomCep").innerHTML = data.value.joke
        setJokeHeader()
    })
}

function getWeather() {
    const key = '2fbfcfef506a175319fdea263706efa3'
    // Ireland locations array
    let locations = ['Cork','Limerick','Dublin','Galway','Belfast',
    'Kilkenny','Sligo','Drogheda','Ennis','Kinsale','Wicklow',
    'Swords','Athlone','Bray','Cobh','Navan','Naas','Shannon','Cashel','Carlow']
    // getting a random location from the locations array
    let actual_location = locations[Math.floor(Math.random() * locations.length)]
    // getting weather info of the given location
    const weather = 
        fetch(`http://api.weatherstack.com/current?access_key=${key}&query=${actual_location}`);
        weather.then(data => data.json()).then((data => {
            console.log(data)
            document.getElementById("weather-location").innerHTML = data.request.query
            document.getElementById("weather-description").innerHTML = data.current.weather_descriptions
            document.getElementById("weather-degree").innerHTML = data.current.temperature + '&deg'
        }))
}
