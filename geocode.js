function getLat(item){
	return item.results[0].geometry.location.lat;
}

function getLon(item){
	return item.results[0].geometry.location.lng;
}

function getCityName(jsonObj){
  	
  	var cityName = null;
  	var addressComponents = jsonObj.results[0].address_components;
    addressComponents.forEach(function(item, i, addressComponents) {
    	var types = item.types;
    	types.forEach(function(type, ind, types) {
    	if(type == "locality" || type == "administrative_area_level_4"){
    		cityName = item.long_name;
    	}
    });
  });
    return cityName;
}

function getCountryName(jsonObj){
	var countryName = null;
  	var addressComponents = jsonObj.results[0].address_components;
    addressComponents.forEach(function(item, i, addressComponents) {
    	var types = item.types;
    	types.forEach(function(type, ind, types) {
    	if(type == "country" ){
    		countryName = item.long_name;
    	}
    });
  });
    return countryName;
}

function getPlaceId(jsonObj){
	return jsonObj.results[0].place_id;
}

module.exports.getLocationJSON = function(jsonObj){

	console.log(JSON.stringify(jsonObj));
	var lat = getLat(jsonObj);
	var lon = getLon(jsonObj);
	var city = getCityName(jsonObj);
	var country = getCountryName(jsonObj);
	var status = jsonObj.status;
	var id = getPlaceId(jsonObj);

	var responseObj = {
		id, lat, lon, city, country, status
	}
	var jsonStr = JSON.stringify(responseObj);
	
	return jsonStr;
}