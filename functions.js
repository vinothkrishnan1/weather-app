let cityField = document.querySelector('#cityField');
let submitButton = document.querySelector('#submitButton');
let cityDisplay = document.querySelector('#cityDisplay');
let temperatureDisplay = document.querySelector('#temperatureDisplay');
let loginForm = document.querySelector("#loginForm");
const apiKey = "ae9581d583e08b72f4fbaa62c08d35ee";
let container = document.querySelector(".container");
let weatherIcons = document.querySelector("img");
let weatherCondition = document.querySelector("#weatherCondition");
let liveLocation = document.querySelector("#liveLocation");
const allIcons = {
    "01d": "sun.png",
    "01n": "sun.png",
    "02d": "cloudy.png",
    "02n": "cloudy.png",
    "03d": "scattered clouds.png",
    "03n": "scattered clouds.png",
    "04d": "broken clouds.png",
    "04n": "broken clouds.png",
    "09d": "shower rain.png",
    "09n": "shower rain.png",
    "10d": "rain.png",
    "10n": "rain.png",
    "11d": "storm.png",
    "11n": "storm.png",
    "13d": "snowy.png",
    "13n": "snowy.png",
    "50d": "foog.png",
    "50n": "foog.png"
};
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let word = cityField.value;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${word}&appid=${apiKey}&units=metric`).then((response) => {
        console.log(response);
        let code = (response.data.weather[0].icon);
        cityField.value = null;
        cityField.blur();
        if (code[(code.length) - 1] === 'd') {
            cityDisplay.textContent = response.data.name;
            temperatureDisplay.innerHTML = Math.floor(response.data.main.temp) + "&deg;C";
            container.style.backgroundImage = "url('blue-sky-background.jpg')";
            weatherIcons.src = `${allIcons[code]}`;
            weatherCondition.textContent = response.data.weather[0].description;
        }
        else if (code[(code.length) - 1] === 'n') {
            cityDisplay.textContent = response.data.name;
            temperatureDisplay.innerHTML = Math.floor(response.data.main.temp) + "&deg;C";
            container.style.backgroundImage = "url('rylan-hill-3o6NXErKXwo-unsplash.jpg')";
            weatherIcons.src = `${allIcons[code]}`;
            weatherCondition.textContent = response.data.weather[0].description;
        }
    })
})
    let latitudes;
    let longitudes;
    function showPosition(position) {
        latitudes = position.coords.latitude;
        longitudes = position.coords.longitude;
    }
    navigator.geolocation.getCurrentPosition(showPosition);
    liveLocation.addEventListener("click", () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitudes}&lon=${longitudes}&appid=${apiKey}&units=metric`).then((response) => {
            let code = (response.data.weather[0].icon);
            if (code[(code.length) - 1] === 'd') {
                cityDisplay.textContent = response.data.name;
                temperatureDisplay.innerHTML = Math.floor(response.data.main.temp) + "&deg;C";
                container.style.backgroundImage = "url('blue-sky-background.jpg')";
                weatherIcons.src = `${allIcons[code]}`;
                weatherCondition.textContent = response.data.weather[0].description;
            }
            else if (code[(code.length) - 1] === 'n') {
                cityDisplay.textContent = response.data.name;
                temperatureDisplay.innerHTML = Math.floor(response.data.main.temp) + "&deg;C";
                container.style.backgroundImage = "url('rylan-hill-3o6NXErKXwo-unsplash.jpg')";
                weatherIcons.src = `${allIcons[code]}`;
                weatherCondition.textContent = response.data.weather[0].description;
            }
        })
    
})