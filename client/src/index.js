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
  const { icon, description } = weatherData.weather[0];
  const { temp, humidity } = weatherData.main;
  const { speed } = weatherData.wind;
  const cityName = document.querySelector(".city");
  cityName.innerHTML = `weather in ${name}`;
  const tempElement = document.querySelector(".temp");
  tempElement.innerHTML = `${Math.round(temp)} °C`;
  const iconElement = document.querySelector(".icon");
  iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png";
  const descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = `${description}`;
  const humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  const speedElement = document.querySelector(".wind");
  speedElement.innerHTML = `Wind speed: ${speed} Km/h`;
}
function getCityName() {
  const search = document.querySelector(".search-bar");
  const btn = document.querySelector("button");
  btn.addEventListener("click", () => {
    const loading = document.querySelector(".loading");
    loading.classList.add("hide");
    searchValue = search.value;
    displayWeather(searchValue);
  });
}

getCityName();
