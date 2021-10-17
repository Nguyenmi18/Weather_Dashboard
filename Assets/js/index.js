var searchForm = document.getElementById('searchForm');
var userInput = document.getElementById('searchInput');
var currentWeatherContainer = document.getElementById('today');
var forecastContainer = document.getElementById('forecast');

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

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

function oneCall(coords) {
	var lat = coords.coord.lat;
	var lon = coords.coord.lon;
	var cityName = coords.name;

	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=9048d2755fa394cb41b1cf6a63f3f430`).then(function (response) {
		return response.json()
	}).then(function (data) {
		renderCurrentWeather(data.current, cityName, data.timezone);
		renderForecast(data.daily, data.timezone);
	})

};

function renderCurrentWeather(current, city, timezone) {
	console.log(current)
	var day = dayjs().tz(timezone).format('M/D/YYYY')
	var temp = current.temp
	var wind = current.wind_speed
	var humidity = current.humidity
	var uvIndex = current.uvi
	var iconurl = `http://openweathermap.org/img/w/${current.weather[0].icon}.png`;

	var card = document.createElement('div');
	var cardbody = document.createElement('div');
	var tittle = document.createElement('h5');
	var img = document.createElement('img');[]
	var tempElement = document.createElement('p');
	var windElement = document.createElement('p');
	var humidityElement = document.createElement('p');
	var uviElement = document.createElement('p');

	card.setAttribute('class', 'card');
	cardbody.setAttribute('class', 'card-body');
	card.append(cardbody);

	tittle.setAttribute('class', 'card-title');
	img.setAttribute('src', iconurl);
	tempElement.setAttribute('class', 'card-text');
	windElement.setAttribute('class', 'card-text');
	humidityElement.setAttribute('class', 'card-text');
	uviElement.setAttribute('class', 'card-text');

	//add text content to title show cityname and date (get date from moment.js)
	tittle.textContent = `${city} ${day}`
	//append img to title
	tittle.append(img)
	tempElement.textContent = `Temp: ${temp} °F`;
	//add textContent to tempElement 
	//add textContent to windElement
	windElement.textContent = `Wind: ${wind} MPH`
	//add textContent to humdityElement
	humidityElement.textContent = `Humidity: ${humidity}%`
	//add textContent to uvi
	uviElement.textContent = `UV Index ${uvIndex}`
	//append tempElement, WidElement, HumidityElement, uviElement to cardbody
	cardbody.append(tittle, tempElement, windElement, humidityElement, uviElement);

	//set the currentWeatherContainer to empty string
	currentWeatherContainer.innerHTML = ''

	//append the card to the currentWeatherContainer
	currentWeatherContainer.append(card);

}

function renderForecast(daily, timezone){
	var dayOne = dayjs().tz(timezone).add(1,'day').startOf('day').unix()
	var daySix = dayjs().tz(timezone).add(6,'day').startOf('day').unix()
	var forecastHeader = document.createElement('div');
	var forecastTitle = document.createElement('h3')

	forecastHeader.setAttribute('class', 'col-md-12');
	forecastTitle.textContent = '5 Day Forecast';
	forecastHeader.append(forecastTitle);

	forecastContainer.innerHTML = '';
	forecastContainer.append(forecastHeader);

	for (let i = 0; i < daily.length; i++) {
		if(daily[i].dt >= dayOne && daily[i].dt<daySix){

			var unix =  daily.dt
			var iconurl = `http://openweathermap.org/img/w/${daily.weather[0].icon}.png`;
			var temp = daily.temp.day;
			var humidity = daily.humidity
			var wind = daily.wind_speed
		
			//create card elemets for forecast
		
			var columns = document.createElement('div');
			var card = document.createElement('div');
			var tittle = document.createElement('h5');
			var img = document.createElement('img');
			var tempElement = document.createElement('p');
			var windElement = document.createElement('p');
			var humidityElement = document.createElement('p');
		
			columns.append(card)
			card.append(cardbody)
			cardbody.append(tittle, img, tempElement, windElement, humidityElement)
		
			columns.setAttribute('class', 'col-md');
			card.setAttribute('class', 'card bg-primary h-100 text-white')
			cardbody.setAttribute('class', 'card-body p-2');
			tittle.setAttribute('class', 'card-title');
			img.setAttribute('src', iconurl);
			tempElement.setAttribute('class', 'card-text');
			windElement.setAttribute('class', 'card-text');
			humidityElement.setAttribute('class', 'card-text');
		
			tittle.textContent = dayjs.unix(unix).tx(timezone).format('M/D/YYYY')
			img.setAttribute('src', iconurl);
			tempElement.textContent = ``;
			windElement.textContent = ``;
			humidityElement.textContent = ``;
		
			forecastContainer.append(columns)
		}
	}
	

;}


searchForm.addEventListener("submit", handleFormSubmit)