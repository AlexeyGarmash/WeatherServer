var express = require("express");
var app = express();
var request = require('request-promise');
var Forecast = require("./forecast.js");
var Geocode = require("./geocode.js")
var jsonObject = null;
/*var options = {
    method: 'GET',
    uri: 'https://api.openweathermap.org/data/2.5/forecast',
    json: true,
    qs: {
        id: 524901,
        lat: ,
        lon: ,
        appid: '67118f8b8d7c58b83f3b201105bfc1a7',
        units: 'metric'
    }
}*/



app.use(express.json());

app.get('/test', function(req, res){
	res.send("<h2>Привет Express!</h2>");

	console.log("GET request");

	
});

app.post('/five', function(req, res){
	console.log("POST request");
	request({
    method: 'GET',
    uri: 'https://api.openweathermap.org/data/2.5/forecast',
    json: true,
    qs: {
        lat: req.body.lat,
        lon: req.body.lon,
        appid: '67118f8b8d7c58b83f3b201105bfc1a7',
        units: 'metric', 
        lang: 'ru'
    }
})
    .then(function (response) {

        jsonObject = JSON.parse(JSON.stringify(response));
        var jsonResponse = Forecast.getForecastBlocksJSON(jsonObject);
        res.send(jsonResponse);
    })
    .catch(function (err) {
        console.log(err);
    });
});

app.post('/current', function(req, res){
	console.log("POST request");
	request({
    method: 'GET',
    uri: 'https://api.openweathermap.org/data/2.5/weather',
    json: true,
    qs: {
        lat: req.body.lat,
        lon: req.body.lon,
        appid: '67118f8b8d7c58b83f3b201105bfc1a7',
        units: 'metric',
        lang: 'ru'
    }
})
    .then(function (response) {

        jsonObject = JSON.parse(JSON.stringify(response));
        var jsonResponse = Forecast.getForecastNowJSON(jsonObject);
        res.send(jsonResponse);
    })
    .catch(function (err) {
        console.log(err);
    });
});

app.post('/location', function(req, res){
    console.log("POST request");
    request({
    method: 'GET',
    uri: 'https://maps.googleapis.com/maps/api/geocode/json',
    json: true,
    qs: {
        address: req.body.address,
        key: 'AIzaSyD1FOnKqyWR67WLd5muuyxqBDFn18B4Wto',
        language: 'ru'
    }
})
    .then(function (response) {

        jsonObject = JSON.parse(JSON.stringify(response));
        var jsonResponse = Geocode.getLocationJSON(jsonObject);
        res.send(jsonResponse);
    })
    .catch(function (err) {
        console.log(err);
    });
});


app.listen(3000), console.log("Listening on port 3000")
