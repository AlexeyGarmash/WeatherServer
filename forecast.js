

function getTemp(item){
	return item.main.temp;
}

function getHumidity(item){
	return item.main.humidity;
}

function getWeatherDescription(item){
  var str = item.weather[0].description;
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

function getDateWithTime(item){
	return item.dt_txt;
}

function getDate(item){
	var dateTime = getDateWithTime(item);
	return dateTime.split(' ')[0];
}

function getTime(item){
	var dateTime = getDateWithTime(item);
	return dateTime.split(' ')[1];
}

function getDayOfWeek(item){
	var date = new Date(getDate(item));
	var days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
	return days[date.getDay()];
	//return date.toLocaleString('ru-Ru', {weekday: 'short'});//всё равно на англ возвращает
}

function getWeatherIconURL(item){
	var weatherIcon = item.weather[0].icon;
	return "http://openweathermap.org/img/w/"+weatherIcon+".png";//${weatherIcon} not working...hm
}

function getWindDirectionDeg(item){
	return item.wind.deg;
}

function getNamedWindDirection(item){
	var deg = getWindDirectionDeg(item);
	var directions = ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "Ю", "СЗ", "С"];
	return directions[Math.round(((deg % 360) / 45)) | 0];
}

function getWindSpeed(item){
	return item.wind.speed;
}
function getTimeFromDate(date){
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
}

function getSunriseTime(item){
  var timeStamp = item.sys.sunrise;
  var date = new Date(timeStamp*1000);
  return getTimeFromDate(date);
}

function getSunsetTime(item){
  var timeStamp = item.sys.sunset;
  var date = new Date(timeStamp*1000);
  return getTimeFromDate(date);
}

function getLat(item){
  return item.coord.lat;
}

function getLon(item){
  return item.coord.lon;
}

function getWeatherBlock (item) {

	  var tempr = getTemp(item);
    var hum = getHumidity(item);
    var descrip = getWeatherDescription(item);
    var datetime = getDateWithTime(item);
    var dateShort = getDate(item);
    var timeShort = getTime(item);
    var speedWind = getWindSpeed(item);
    var directWind = getNamedWindDirection(item);
    var weatherIconURL = getWeatherIconURL(item);
    var dayWeek = getDayOfWeek(item);

    var weatherPart = {
      descrip, tempr, hum, speedWind, directWind, weatherIconURL,
    }
   	var block = {
   		 weatherPart, datetime, dateShort, timeShort,  dayWeek
   	};
   	return block;
}



function getForecastBlocks(jsonObj) {

	var list_ = [];
	var jsonList = jsonObj.list;
    jsonList.forEach(function(item, i, jsonList) {
    	var block = getWeatherBlock(item);
    	list_.push(block);
    });
    return list_;
}

module.exports.getForecastBlocksJSON = function (jsonObj) {
	console.log(jsonObj);
	var blocks = getForecastBlocks(jsonObj);
	return JSON.stringify(blocks);
}

function getForecastNow(item){
    var tempr = getTemp(item);
    var hum = getHumidity(item);
    var descrip = getWeatherDescription(item);
    var speedWind = getWindSpeed(item);
    var directWind = getNamedWindDirection(item);
    var weatherIconURL = getWeatherIconURL(item);
    var sunriseTime = getSunriseTime(item);
    var sunsetTime = getSunsetTime(item);
    var lat = getLat(item);
    var lon = getLon(item);
    var coord = {
      lat, lon
    }

    var weatherPart = {
      descrip, tempr, hum, speedWind, directWind, weatherIconURL,
    }

    var block = {
      weatherPart, sunriseTime, sunsetTime, coord
    };
    return block;
}

module.exports.getForecastNowJSON = function(jsonObj){
  console.log(jsonObj);
  var forecastNow = getForecastNow(jsonObj);
  return JSON.stringify(forecastNow);
}