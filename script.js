$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(renderPosition, showError);
  } else {
    $("#weather").html("Geolocation is not supported by this browser.");
  }
});

function renderPosition (position) {
     $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=14da167a50a14629564d97636a10e421", function(json) {
        var html = "";
        var tempF = (json.main.temp * 1.8) - 459.67;
        var tempC = (json.main.temp - 273.15);
        var hum = json.main.humidity;
        html += json.name;
        html += "<div class='line'></div>";
        html += "<div class='temp-f'>" + tempF.toFixed(0) + "\xB0" + " F </div>";
        html += "<div class='temp-c no-display'>" + tempC.toFixed(0) + "\xB0" + " C </div>";
        html += hum + "% Humidity";
        html += "<div class='line'></div>";
        html += json.weather[0].description;
        html += "<br><img src='http://openweathermap.org/img/w/" + json.weather[0].icon + ".png'>"
        $("#weather").html(html);
        $("#weather").toggleClass("initialize");
        $(".temp-c").on("click", function(){
          $('.temp-c').toggleClass('no-display');
          $('.temp-f').toggleClass('no-display');
        });
        $(".temp-f").on("click", function(){
          $('.temp-f').toggleClass('no-display');
          $('.temp-c').toggleClass('no-display');
        });
      });
    }

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            $("#weather").html("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            $("#weather").html("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            $("#weather").html("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            $("#weather").html("An unknown error occurred.");
            break;
    }
}
