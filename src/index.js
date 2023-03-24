// get h3 for current forecast- date
let dateID = document.getElementById("today-date")
// get li for current weather-temp
let tempID = document.getElementById("today-temp")
// icon will be more complicated- src to openweather needed
// get li for current weater-wind
let windID = document.getElementById("today-wind")
// get li for current weather-humidity
let humID = document.getElementById("today-hum")
// get li for icon
let iconID = document.getElementById("today-icon")
// src for icon
const baseIconUrl = "https://openweathermap.org/img/w/"
// reusable .png for icon
const iconExtension = ".png"
// pull all divs that will hold forecast by class name
let forecastDivs = document.getElementsByClassName("bg-slate-700")
// get html element for saved cities
let savedCities = document.getElementById("history")
// local storage array
let savedCitiesArray = []

// function to get saved cities from local storage on page load
document.addEventListener('DOMContentLoaded', function getSavedCities () {
    // get saved cities from local storage
    let storedCities = localStorage.getItem("savedCities")
    // if there are no saved cities, return
    if (!storedCities) {
        return
    }
    // parse saved cities into an array
    savedCitiesArray = JSON.parse(storedCities)
    // loop through saved cities array
    for (let i=0; i<savedCitiesArray.length; i++) {
        // create a button for each saved city
        let savedCityButton = document.createElement("button")
        // add class to button
        savedCityButton.classList.add("bg-slate-400", "text-white", "font-semibold", "py-2", "px-4", "border", "border-white", "rounded", "m-2")
        // add text to button
        savedCityButton.innerText = savedCitiesArray[i]
        // append button to saved cities div
        savedCities.appendChild(savedCityButton)
        // add event listener to button
        savedCityButton.addEventListener("click", function () {
            // get city name from button
            let cityName = savedCityButton.innerText
            // paste the city name into the input field
            document.querySelector('input').value = cityName
        })
    }
});

// handle click event- retreive weather data and change html elements
document.querySelector('form').addEventListener('submit',function formSubmit (event) {
    event.preventDefault();
    // get city name from form
    const cityName = event.target.city.value

    $('span#city-searched').text(cityName)
    // function to get geolocation from openweather api
    async function getGeolocation(cityName) {
        
        let response= await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=d43a4a832d05fcc903147c37afc29523`);
        let data= await response.json();
        let latitude = await data[0].lat
        let longitude = await data[0].lon
        return [latitude, longitude]
    }
    // function to get current weather from openweather api
    async function getCurrentWeather (getGeolocation) {
        let location = await getGeolocation(cityName);
        
        let lat= location[0];
        
        let lon= location[1];
        
        let response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=d43a4a832d05fcc903147c37afc29523`);
        let data = await response.json();

        let unixStamp = data.dt

        let milliseconds = unixStamp* 1000

        let dateObject = new Date(milliseconds)

        let date = dateObject.toLocaleDateString()

        let temperature= data.main.temp

        let icon = data.weather.icon

        let windSpeed= data.wind.speed

        let humidity= data.main.humidity

        return [date, temperature, icon, windSpeed,humidity]

    }
    // function to get noon 5-day forecast from openweather api
    async function getForecast (getGeolocation) {
        let location = await getGeolocation(cityName);
        
        let lat= location[0];
        
        let lon= location[1];
        
        let response = await fetch (`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=d43a4a832d05fcc903147c37afc29523`);
        let data = await response.json();
        let containsNoon = []
        // filter out all data that does not contain 12:00:00
        for (let i=0; i<data.list.length; i++) {
            if (data.list[i].dt_txt.includes("12:00:00")) {
                containsNoon.push(data.list[i])
            }
        }
        return containsNoon
    }

    // function to filter only needed elements from forecast data
    async function filterForecast (getForecast) {
        let data = await getForecast(getGeolocation);
        let filteredData = []
        for (let i=0; i<data.length; i++) {
            let unixStamp = data[i].dt
            let milliseconds = unixStamp* 1000
            let dateObject = new Date(milliseconds)
            let date = dateObject.toLocaleDateString()
            let temperature= data[i].main.temp
            let icon = data[i].weather.icon
            let windSpeed= data[i].wind.speed
            let humidity= data[i].main.humidity
            filteredData.push([date, temperature, icon, windSpeed,humidity])
        }
        return filteredData
    }

    // function to change current weather html elements
    async function changeCurrent (getCurrentWeather) {
        let data = await getCurrentWeather(getGeolocation);

        dateID.innerText = "Today: " + data[0]
        tempID.innerText = "Temperature: " + data[1]
        windID.innerText = "Wind: " + data [3] +"mph"
        humID.innerText = "Humidity: " + data[4] + "%"
        iconID.src = baseIconUrl + data.icon + iconExtension



    }

    // function to change forecast html elements
    async function changeForecast(filterForecast) {
        let data = await filterForecast(getForecast);
        for (let i=0; i<data.length; i++) {
            let date = data[i][0]
            let temperature = data[i][1]
            let windSpeed = data[i][3]
            let humidity = data[i][4]
            forecastDivs[i].innerHTML = `
            <h3 class="text-2xl font-semibold">${date}</h3>
            <p class="text-xl">Temp: ${temperature}°F</p>
            <p class="text-xl">Wind: ${windSpeed} mph</p>
            <p class="text-xl">Humidity: ${humidity}%</p>
            `
        }
    }

    // function to make a save button in the search form
    function makeSaveButton () {
        // check if the city is already saved
        if (localStorage.getItem(cityName)) {
            return
        }
        // create save button
        let saveButton = document.createElement("button")
        // add classes to button
        saveButton.classList.add("bg-white", "text-black", "rounded", "p-1", "m-3", "border-2", "border-solid", "border-black")
        saveButton.innerText = "Save City"
        saveButton.id = "save-button"
        document.querySelector('form').appendChild(saveButton)

        // add event listener to save button
        saveButton.addEventListener('click', function saveCity (event) {
            event.preventDefault();
            // push the city name to saved cities array
            savedCitiesArray.push(cityName)
            // save the array to local storage
            localStorage.setItem('savedCities', JSON.stringify(savedCitiesArray))
            // create a button for the saved city
            let savedCityButton = document.createElement("button")
            // add classes to button
            savedCityButton.classList.add("bg-slate-400", "text-black", "rounded", "p-1", "m-3", "border-2", "border-solid", "border-black")
            savedCityButton.innerText = cityName
            // add button to saved cities div
            savedCities.appendChild(savedCityButton)

            // add event listener to saved city button to paste city name into search form
            savedCityButton.addEventListener('click', function pasteCity (event) {
                event.preventDefault();
                // paste city name into search form
                cityNameInput.value = cityName
            })
        })
    }


    // call functions
    getGeolocation(cityName)
    .then(getCurrentWeather(getGeolocation))
    .then(getForecast(getGeolocation))
    .then(changeCurrent(getCurrentWeather))
    .then(filterForecast(getForecast))
    .then(changeForecast(filterForecast))
    .then(makeSaveButton())
    .catch(err => console.log(err))
    
})
