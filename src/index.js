let now = new Date();
function formatDate(currently) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currently.getDay()];
  //let months = ["January","February","March", "April","May","June","July","August", "September","October", "November","December" ];
  //let month = months[currently.getMonth()];
  //let date = currently.getDate();
  //let year = currently.getFullYear();
  let hours = currently.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currently.getMinutes();
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
let lan;
let lon;
let locationName;

function showCurrentTemperature(response) {
  displayLocation.innerHTML = response.data.name;
  temp = response.data.main.temp;
  let roundTemp = Math.round(temp);
  console.log(temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${roundTemp}°C`;
  console.log(response);
}
function gimmeLocation(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#location-input");
  // displayLocation.innerHTML = locationInput.value;
  let city = locationInput.value;
  console.log(city);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

let locationSearch = document.querySelector("#location-search");
locationSearch.addEventListener("submit", gimmeLocation);

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  let celsiusTemp = Math.round(temp);
  temperature.innerHTML = `${celsiusTemp}°C`;
}
let convertCelsius = document.querySelector("#metric");
convertCelsius.addEventListener("click", showCelsius);

function showFarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  let farenheitTemp = Math.round(temp * (9 / 5) + 32);
  temperature.innerHTML = `${farenheitTemp}°F `;
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
