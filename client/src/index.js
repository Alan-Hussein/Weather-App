/*Script*/
const apiKey = "74f45b044cd91e20595ef7944b7337a3";
async function fetchWeather(city) {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        apiKey
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      alert("No Weather Found");
    }
  } catch (err) {
    console.log(err);
  }
}
async function displayWeather(city) {
  const weatherData = await fetchWeather(city);
  const { name } = weatherData;
  const { icon, main } = weatherData.weather[0];
  const { temp, humidity } = weatherData.main;
  const { speed } = weatherData.wind;
  const cityName = document.querySelector(".city");
  cityName.innerHTML = `Weather in ${name}`;
  const tempElement = document.querySelector(".temp");
  tempElement.innerHTML = `${Math.round(temp)} °C`;
  const iconElement = document.querySelector(".icon");
  iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png";
  const descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = `${main}`;
  const humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  const speedElement = document.querySelector(".wind");
  speedElement.innerHTML = `Wind speed: ${speed} Km/h`;
  changeBackgroundImage(main);
}
function getCityName() {
  const search = document.querySelector(".search-bar");
  const btn = document.querySelector("button");
  btn.addEventListener("click", () => {
    city = search.value;
    displayWeather(city);
  });
}
async function changeBackgroundImage(description) {
  if (description == "Rain") {
    document.body.style.cssText =
      ' background-image: url("../src/assets/rain.gif"); background-position-y: bottom; background-position-x: bottom;  ';
  }
  if (description == "Clouds") {
    document.body.style.cssText =
      ' background-image: url("../src/assets/img5.jpg");';
  }
  if (description == "Clear") {
    document.body.style.cssText =
      ' background-image: url("../src/assets/clearsky.jpg");  background-position-y: top; ';
  }
}
function main() {
  try {
    getCityName();
  } catch (err) {
    alert(err);
  }
}
main();
