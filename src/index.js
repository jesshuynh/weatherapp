let now = new Date();
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  //let months = ["January","February","March", "April","May","June","July","August", "September","October", "November","December" ];
  //let month = months[currently.getMonth()];
  //let date = currently.getDate();
  //let year = currently.getFullYear();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
let currentTime = document.querySelector("h3");
currentTime.innerHTML = `${formatDate(now)}`;

let displayLocation = document.querySelector("div.location");
let units = "metric";
let apiKey = "469896382cb665ae26fd863f7be6bd25";
let temp;
//temp is temp in celsius so no need to call it celsiusTemp
let lan;
let lon;
let locationName;
let celsiusTemp;

function showCurrentTemperature(response) {
  displayLocation.innerHTML = response.data.name;
  temp = response.data.main.temp;
  let roundTemp = Math.round(temp);
  console.log(temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${roundTemp}`;
  console.log(response);
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function gimmeLocation(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}
function submitCity(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#location-input");
  let city = locationInput.value;
  gimmeLocation(city);
}
let submission = document.querySelector("#location-search");
submission.addEventListener("submit", submitCity);
function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  convertCelsius.classList.add("active");
  convertFarenheit.classList.remove("active");
  let celsiusTemp = Math.round(temp);
  temperature.innerHTML = celsiusTemp;
}
let convertCelsius = document.querySelector("#metric");
convertCelsius.addEventListener("click", showCelsius);

function showFarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  convertCelsius.classList.remove("active");
  convertFarenheit.classList.add("active");
  let farenheitTemp = Math.round(temp * (9 / 5) + 32);
  temperature.innerHTML = farenheitTemp;
}
let convertFarenheit = document.querySelector("#imperial");
convertFarenheit.addEventListener("click", showFarenheit);

function gimmeCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
  //   displayLocation.innerHTML = locationName;
}
function locationPress() {
  navigator.geolocation.getCurrentPosition(gimmeCurrentLocation);
}
let locationCurrent = document.querySelector("#current-location");
locationCurrent.addEventListener("click", locationPress);

gimmeLocation("San Francisco");
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class ="col-2">
<div class="forecast-date"${day}>
</div>
<img src="http://openweathermap.org/img/wn/10d@2x.png" alt="forecast weather" width="100">
<p class="forecast-temp">
<span class="forecast-temp-max"> 18 </span>
<span class="forecast-temp-min">12 </span>
</p></div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
