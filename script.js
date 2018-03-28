var API_KEY = '125b5b7e19fe4a20a4d60fbb38552fce';
var far = false;
var wd;

function displayTerm(cTemp, f){
  if(f) return Math.round((cTemp * 9) /5 +32) + " °F";
  return Math.round(cTemp) + ' °C';
};

function render(wd, far){
  var currentLocation = wd.name;
  var currentWeather = wd.weather[0].description;
  var currentTemp = displayTerm(wd.main.temp, far);
  var high = displayTerm(wd.main.temp_max, far);
  var low = displayTerm(wd.main.temp_min, far);
  var icon = wd.weather[0].icon;
      
      $('#currentLocation').html(currentLocation);
      $('#currentTemp').html(currentTemp);
      $('#currentWeather').html(currentWeather);
      $('#high-low').html(high + '/' + low);
      
      var iconSrc = "http://openweathermap.org/img/w/" + icon + '.png';
      $('#currentTemp').prepend("<img src=" + iconSrc + ">");
}

$(function(){
  
  var loc;
  $.getJSON('https://ipinfo.io', function(d){
    console.log('assigning the data...')
    var loc = d.loc.split(',');
    console.log(loc);
    
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + loc[0] + '&lon=' + loc[1] + '&APPiD=' + API_KEY, function(apiData){
      wd = apiData;
      
      render(apiData, far);
      
      $('#toggle').click(function(){
        far = !far;
        render(wd, far)
      })
    })
  })
})
