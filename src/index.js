// get h3 for current forecast- date
let dateID = document.getElementById("today-date")
// get li for current weather-temp
let tempID = document.getElementById("today-temp")
// icon will be more complicated- src to openweather needed
// get li for current weater-wind
let windID = document.getElementById("today-wind")
// get li for current weather-humidity
let humID = document.getElementById("today-hum")

// pull all divs that will hold forecast by class name
let forecastDivs = document.getElementsByClassName("bg-slate-700")

// handle click event- retreive weather data and change html elements
document.querySelector('form').addEventListener('submit',function formSubmit (event) {
    event.preventDefault();

    const cityName = event.target.city.value

    $('span#city-searched').text(cityName)

    async function getGeolocation(cityName) {
        
        let response= await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=d43a4a832d05fcc903147c37afc29523`);
        let data= await response.json();
        let latitude = await data[0].lat
        let longitude = await data[0].lon
        return [latitude, longitude]
    }

    async function getCurrentWeather (getGeolocation) {
        let location = await getGeolocation(cityName);
        
        let lat= location[0];
        
        let lon= location[1];
        
        let response = await fetch (`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=d43a4a832d05fcc903147c37afc29523`);
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

    async function getForecast (getGeolocation) {
        let location = await getGeolocation(cityName);
        
        let lat= location[0];
        
        let lon= location[1];
        
        let response = await fetch (`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=d43a4a832d05fcc903147c37afc29523`);
        let data = await response.json();
        let containsNoon = []
        for (let i=0; i<data.list.length; i++) {

            if (data.list[i].dt_txt.includes("12:00:00")){
                (containsNoon.push(data.list))}
        }
        return containsNoon
        
    }

    async function changeCurrent (getCurrentWeather) {
        let data = await getCurrentWeather(getGeolocation);

        // let icon= data[2]

        dateID.innerText = data[0]
        tempID.innerText = "Temperature: " + data[1]
        windID.innerText = "Wind: " + data [3] +"mph"
        humID.innerText = "Humidity: " + data[4] + "%"


    }

    async function changeForecast(getForecast) {
        let data = await getForecast(getGeolocation)
        console.log(data)
    }

    getGeolocation(cityName)
    .then(getCurrentWeather(getGeolocation))
    .then(getForecast(getGeolocation))
    .then(changeCurrent(getCurrentWeather))
    .then(changeForecast(getForecast))
    
})

// todo check if buttons can be made when pulling data from localstorage
// todo currently 'cityName cannot be accessed. scope globally using IDs?
// todo will that pull user input before the submit button has been

// iterate over local storage keys
// for each key, create button with saved value being button text

// add event listener for buttons
// on button click, push value of button to form input and run formSubmit?
