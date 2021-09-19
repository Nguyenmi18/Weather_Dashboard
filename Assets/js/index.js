var currentDay = 
var searchForm = document.getElementById('searchForm');
var userInput = document.getElementById('searchInput');
var currentWeatherContainer = document.getElementById('today');
var forecastContainer = document.getElementById('forecast');

function handleFormSubmit(event) {
	event.preventDefault();

	var value = userInput.value;
	coordApi(value);
	userInput.value = "";

}

function coordApi(city) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9048d2755fa394cb41b1cf6a63f3f430`)
	.then(function (response) {
		return response.json()
	})
	.then(function (data) {
		oneCall(data);
	})
};

function oneCall(coords){
	var lat = coords.coord.lat;
	var lon = coords.coord.lon;
	var cityName = coords.name;

	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=9048d2755fa394cb41b1cf6a63f3f430`).then(function(response){
		return response.json()
	}).then(function(data){
		renderCurrentWeather(data.current, cityName);
		// renderForecast(data.daily);
	})

};

function renderCurrentWeather(current, city){
	console.log(current)g

	var temp = current.temp
	var wind = current.wind_speed
	var humidity= current.humidity
	var uvIndex=current.uvi
	var iconurl = `http://openweathermap.org/img/w/${current.weather[0].icon}.png`;

	var card = document.createElement('div');
	var cardbody= document.createElement('div');
	var tittle = document.createElement('h5');
	var img= document.createElement('img');[]
	var tempElement = document.createElement('p');
	var windElement = document.createElement('p');
	var humidityElement = document.createElement('p');
	var uviElement = document.createElement('p');

	card.setAttribute('class', 'card');
	cardbody.setAttribute('class', 'card-body');
	card.append(cardbody); 

	tittle.setAttribute ('class','card-title');
	img.setAttribute ('src', iconurl );
	tempElement.setAttribute ('class','card-text');
	windElement.setAttribute ('class','card-text');
	humidityElement.setAttribute ('class','card-text');
	uviElement.setAttribute ('class','card-text');
	
	//add text content to title show cityname and date (get date from moment.js)
	tittle.textContent = `${cityName} `

	
}



searchForm.addEventListener("submit", handleFormSubmit)