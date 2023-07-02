const weatherBtn = document.querySelector(".get_weather_btn"),
    userInput = document.querySelector(".user-input"),
    getLocationSection = document.querySelector(".get_location"),
    container = document.querySelector(".container"),
    getWeather = document.querySelector(".get_weather"),
    arrowBack = document.querySelector(".arrow-back"),
    title = document.querySelector(".title");



/* User Enters Location */
userInput.addEventListener("keydown", weather = (e) => {

    if (e.keyCode === 13) {

        title.insertAdjacentHTML("afterend", `<p class="fetching_details">Fetching Details...</p>`);
        getLocationSection.style.height = "350px";

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&APPID=YOUR_API_KEY`)
            .then(res =>
                res.json()
            )

            .then(data => {
                getLocationSection.style.display = "none";
                container.innerHTML += `
                <div class="get_weather">
                    <div class="title get_location_title">
                        <i class="uil uil-arrow-left arrow-back"></i>
                        <h1>Weather App</h1>
                    </div>

                    <div class="weather_content">
                        <img class="weather_image">
                        <h1 class="temperature">${(data.main.temp - 273).toFixed(0)}\xB0C</h1>

                        <div class="weather_location">
                            <i class="uil uil-location-point"></i>
                            <p>${userInput.value}</p>
                        </div>

                        <div class="other_weather_details">
                            <div class="feels_like">
                                <i class="uil uil-temperature-half"></i>
                                <div class="temp_details">
                                    <p>${(data.main.feels_like - 273).toFixed(0)}\xB0C</p>
                                    <p>Feels Like</p>
                                </div>
                            </div>

                            <div class="humidity">
                                <i class="uil uil-tear"></i>
                                <div class="temp_details">
                                    <p>${data.main.humidity}</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                document.querySelector("i").addEventListener("click", () => {
                    document.querySelector(".get_location").style.display = "flex";
                    document.querySelector(".get_weather").style.display = "none";
                });

                if (data.weather[0].main == "Mist") {
                    document.querySelector(".weather_image").src = "images/Mist.png";
                }

                else if (data.weather[0].main == "Clouds") {
                    document.querySelector(".weather_image").src = "images/Clouds.png";
                }

                else if (data.weather[0].main == "Rain") {
                    document.querySelector(".weather_image").src = "images/Rain.png";
                }

                else if (data.weather[0].main == "Snow") {
                    document.querySelector(".weather_image").src = "images/Snow.png";
                }

                else {
                    document.querySelector(".weather_image").src = "images/Clear.png";
                };
            })

            .catch(err => container.innerHTML += `
            <div class="location_error">
                <div class="title get_location_title">
                    <i class="uil uil-arrow-left arrow-back"></i>
                    <h1>Weather App</h1>
                </div>
                <p>Not Found :(</p>
                <img class="error_image" src="images/404.png">
            </div>
            `
            );
    };
});



/* Get User Location */
weatherBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(

        (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=YOUR_API_KEY`)

                .then(response =>
                    response.json()
                )

                .then(cityData => {


                    title.insertAdjacentHTML("afterend", `<p class="fetching_details">Fetching Details...</p>`);
                    getLocationSection.style.height = "350px";

                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY`)

                        .then(res =>
                            res.json()
                        )

                        .then(data => {
                            getLocationSection.style.display = "none";
                            container.innerHTML += `
                <div class="get_weather">
                    <div class="title get_location_title">
                        <i class="uil uil-arrow-left arrow-back"></i>
                        <h1>Weather App</h1>
                    </div>

                    <div class="weather_content">
                        <img class="weather_image">
                        <h1 class="temperature">${(data.main.temp - 273).toFixed(0)}\xB0C</h1>

                        <div class="weather_location">
                            <i class="uil uil-location-point"></i>
                            <p>${cityData.city}</p>
                        </div>

                        <div class="other_weather_details">
                            <div class="feels_like">
                                <i class="uil uil-temperature-half"></i>
                                <div class="temp_details">
                                    <p>${(data.main.feels_like - 273).toFixed(0)}\xB0C</p>
                                    <p>Feels Like</p>
                                </div>
                            </div>

                            <div class="humidity">
                                <i class="uil uil-tear"></i>
                                <div class="temp_details">
                                    <p>${data.main.humidity}</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                            if (data.weather[0].main == "Mist") {
                                document.querySelector(".weather_image").src = "images/Mist.png";
                            }

                            else if (data.weather[0].main == "Clouds") {
                                document.querySelector(".weather_image").src = "images/Clouds.png";
                            }

                            else if (data.weather[0].main == "Rain") {
                                document.querySelector(".weather_image").src = "images/Rain.png";
                            }

                            else if (data.weather[0].main == "Snow") {
                                document.querySelector(".weather_image").src = "images/Snow.png";
                            }

                            else {
                                document.querySelector(".weather_image").src = "images/Clear.png";
                            };
                        })


                        .catch(err => container.innerHTML += `
            <div class="location_error">
                <div class="title get_location_title">
                    <i class="uil uil-arrow-left arrow-back"></i>
                    <h1>Weather App</h1>
                </div>
                <p>Not Found :(</p>
                <img class="error_image" src="images/404.png">
            </div>
            `);

                });
        },

        (error) => {
            getLocationSection.innerHTML = `
            <h1 class="title">Weather App</h1>
            <p class="location_denied">User Denied Location</p>
            <input type="text" class="user-input" placeholder="Enter Location">
            <div class="or_btn"></div>
            <button class="get_weather_btn">Get Device Location</button>
            `;
            getLocationSection.style.height = "350px";
        });
});