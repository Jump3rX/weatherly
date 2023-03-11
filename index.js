"use strict";
const searchWeather = document.querySelector(".search-btn");
const resultsContainer = document.querySelector(".results-container");
const myLocationBtn = document.querySelector(".current-location-btn");
let apiK = "da2b913513d21c808ccb02adf676f12b";

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
};

searchWeather.addEventListener("click", function (e) {
  e.preventDefault();
  let locationValue = document.querySelector("#location").value;
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${locationValue}&appid=${apiK}`
  )
    .then((res) => res.json())
    .then((data) => getWeather(data[0].lat, data[0].lon));
});

myLocationBtn.addEventListener("click", function (e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(myPos);
});

function myPos(position) {
  //console.log(position.coords.latitude, position.coords.longitude);
  getWeather(position.coords.latitude, position.coords.longitude);
}

function getWeather(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiK}`
  )
    .then((res) => res.json())
    .then((data) => showResults(data));
}
function showResults(data) {
  resultsContainer.innerHTML = "";
  let html = `
  <div class="card">
  <div class="card-header">
    <h3 class="card-title">Weather in ${data.name}</h3>
  </div>
  <div class="card-body">
    <div class="weather-info">
      <img
        src=" https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt="weather icon"
        class="weather-icon"
      />
      <div class="temperature">
        <span class="current-temp">${toCel(data.main.temp)}</span>
        <span class="unit">°C</span>
      </div>
    </div>
    <div class="description">${data.weather[0].description}</div>
    <div class="details">
      <div class="detail">
        <span class="label">Wind:</span>
        <span class="value">${speedConvert(data.wind.speed)} km/h</span>
      </div>
      <div class="detail">
        <span class="label">Humidity:</span>
        <span class="value">${data.main.humidity}%</span>
      </div>
    </div>
  </div>
</div>
</div>
  
  `;
  resultsContainer.insertAdjacentHTML("afterbegin", html);
}

function toCel(x) {
  return (x - 273.15).toFixed(1);
}

function speedConvert(speed) {
  return (speed * 3.6).toFixed(1);
}
