// Runs searchWeather function when return key is pressed
$("#search-form").on("submit", function(event) {
    event.preventDefault();
    var searchInput = $("#form1").val();
    
    console.log(searchInput);
    
    searchWeather(searchInput);
});

// Runs searchWeather function when Search button is clicked
$("#search-button").on("click", function(event) {
    event.preventDefault();
    var searchInput = $("#form1").val();
    
    console.log(searchInput);
    
    searchWeather(searchInput);
});


function searchWeather(searchInput) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=8a0b187f58134a2e51bff5ae31b7377e&units=imperial",
        method: "GET"
    }).then(function (apiResponse) {
        console.log("todayForecastData", apiResponse);

    // if (history) {
    //    window.localStorage.setItem("history", JSON.stringify(history));
    //    history.push(searchInput)
    //    makeRow (searchInput)
    // }


    var city = $("<h4>").text(apiResponse.name + " (" + new Date().toLocaleDateString() + ")")
    var weatherCard = $("<div>").addClass("weather-card") // use this to style card (Flexbox)
    var temperature = $("<div>").addClass("feature-weather-stats").text("Temp: " + apiResponse.main.temp + "\u00B0F")
    var humidity = $("<div>").addClass("feature-weather-stats").text("Humidity: " + apiResponse.main.humidity + "%")

    
    $("#today-weather").append(city, temperature, humidity)

    searchForecast (searchInput);
    })
}

function searchForecast(searchInput) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=8a0b187f58134a2e51bff5ae31b7377e&units=imperial",
        method: "GET"
    }).then(function (data) {
        console.log("forecastData", data);
    
    for (var i=0; i<data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("09:00:00") !== -1) {
            var cardCity = $("<h5>").text(data.city.name + " (" + new Date (data.list[i].dt_txt))
            var forecastTemp = $("<p>").text(data.list[i].main.temp + "\u00B0F")
            var forecastHumidity = $("<p>").text(data.list[i].main.humidity + "%")



            $("#forecast").append(cardCity, forecastTemp, forecastHumidity);



        }
    }

    })
}

// UV is it's own ajax call that takes in latitude and longitude
// Add local storage based on search --> put in
// Create buttons using function that says to create row with buttons containing searched city names (think <ul> with list items in it)

// var history = JSON.parse(window.localStorage.getItem("history")) || [];

