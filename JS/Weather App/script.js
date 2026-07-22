document.addEventListener("DOMContentLoaded", () => {
  const input_city = document.getElementById("input-city");
  const btn = document.getElementById("btn");
  const displayCity = document.getElementById("city-name");
  const displayTemp = document.getElementById("temperature");
  const description = document.getElementById("description");
  const error_msg = document.getElementById("error-msg");
  const weatherinfo = document.getElementById("weather-info");

  let API_KEY = "17ab14394fe29245d39b74c617066da0"; //env variables
  btn.addEventListener("click", async () => {
    let city = input_city.value.trim();
    if (!city) return;
    try {
      const weatherData = await fetchData(city);
      displayData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log("URL:", url);
    console.log(typeof response);
    console.log("RESPONSE:", response);
    if (!response.ok) {
      throw new Error("City not found!");
    }

    let data = await response.json();
    return data;
  }

  function displayData(weatherData) {
    console.log(weatherData);
    const { name, main, weather } = weatherData;
    displayCity.textContent = `${name}`;
    displayTemp.textContent = `Temperature: ${main.temp} degree Celsius`
    description.textContent = `Description: ${weather[0].description}`;

    weatherinfo.classList.remove("hidden");
    error_msg.classList.add("hidden");
  }
  function showError() {
    error_msg.classList.remove("hidden");
    weatherinfo.classList.add("hidden");
  }
});
