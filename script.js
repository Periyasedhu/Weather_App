const searchBtn = document.querySelector("#search-button");
const weatherDay = document.querySelector("#weather-info");
const loadingSpinner = document.getElementById("loading-spinner");
const errorMessage = document.getElementById("error-message");
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function showLoadingSpinner() {
  loadingSpinner.style.display = "block";
}

function hideLoadingSpinner() {
  loadingSpinner.style.display = "none";
}
function showError(message) {
  errorMessage.textContent = message;
}
function clearError() {
  errorMessage.textContent = "";
}

searchBtn.addEventListener("click", function () {
  const locationInput = document.getElementById("location").value;
  const locationDisplay = document.getElementById("location-display");
  locationDisplay.textContent = `Location: ${locationInput}`;
  clearError();
  showLoadingSpinner();

  // Make an API request to fetch weather data
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=f5f18c7250514dc481555511231310&q=${locationInput}&days=7&aqi=no&alerts=no`
  )
    .then((response) => response.json())
    .then((data) => {
      //  want to display data for the next 7days
      const forecastDays = data.forecast.forecastday.slice(0, 7);
      console.log(forecastDays);
      weatherDay.innerHTML = "";
      forecastDays.forEach((Data) => {
        const date = new Date(Data.date);
        const day = daysOfWeek[date.getDay()];

        const html = `
          <div class="day">
            <h3>${day}</h3>
            <h4>${Data.date}</h4>

            <h4>${Data.day.maxtemp_c}&degC - ${Data.day.mintemp_c}&degC</h4>
            <p class="speed">Max wind speed: ${Data.day.maxwind_kph} km/h</p>
            <p class="precipitation">Humidity: ${Data.day.avghumidity}%</p>
            <h3 class="condition">Pressure: ${Data.day.totalprecip_mm} mm</h3>
          </div>`;

        weatherDay.insertAdjacentHTML("beforeend", html);
      });
      weatherDay.style.opacity = 1;
      hideLoadingSpinner();
    })
    .catch((error) => {
      weatherDay.style.opacity = 0;

      console.error("Error fetching weather data: ", error);
      showError(
        `Error fetching weather data for  ${locationInput}, Please try again....`
      );
      hideLoadingSpinner();
    });
  document.getElementById("location").value = "";
});
