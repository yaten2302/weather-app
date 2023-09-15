const arrow = document.querySelector(".arrow"),
  userInput = document.querySelector("input"),
  getImg = document.querySelector("img"),
  tempValue = document.querySelector(".temp-value"),
  tempLike = document.querySelector(".temp-like"),
  locationNameDisplay = document.querySelector(".location-name"),
  temperatureValue = document.querySelector(".temperature-value"),
  humidityValue = document.querySelector(".humidity-value"),
  getLocation = document.querySelector(".get_location"),
  displayWeather = document.querySelector(".display-weather");

const apiKey = "7f4306aa6e1a26c434fce9f7e5f32c20";

userInput.addEventListener("keydown", (e) => {
  if (userInput.value && e.keyCode === 13) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        getLocation.style.display = "none";
        displayWeather.style.display = "block";
        arrow.addEventListener("click", () => {
          getLocation.style.display = "block";
          displayWeather.style.display = "none";
          userInput.value = "";
        });

        if (data.main.temp < 0) getImg.src = "./images/Snow.png";
        else getImg.src = `./images/${data.weather[0].main}.png`;

        tempValue.innerHTML = `${data.main.temp.toFixed(0)}&degC`;
        tempLike.innerHTML = data.weather[0].main;
        locationNameDisplay.innerHTML = `${data.name}, ${data.sys.country}`;

        temperatureValue.innerHTML = `${data.main.temp.toFixed(0)}&degC`;
        humidityValue.innerHTML = `${data.main.humidity}%`;
      })
      .catch((error) => (getImg.src = "./images/404.png"));
  }
});
