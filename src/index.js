let now = new Date();

      let h4 = document.querySelector("h4");

      let hours = now.getHours();
      let minutes = now.getMinutes();
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[now.getDay()];
      h4.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather(response) {
  let temperatureElement = document.querySelector("#mainTemperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#cityName");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#weatherCondition");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
}
function search(city) {
  let apiKey = "6511feaf6052a299a513c2648fd44984";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}
&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
//Implementing weather search based on Current location button//

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionData);
}

function showPositionData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "6511feaf6052a299a513c2648fd44984";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);}

  let locationButton = document.querySelector("button");
locationButton.addEventListener("click", getCurrentLocation);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
 search(cityInput.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);





