
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
        console.log(data)
        let date= Date(data.dt)
        console.log(date)
        let temperature= data.main.temp
        console.log(temperature)
        let icon = data.weather.icon
        console.log(icon)
        let windSpeed= data.wind.speed
        console.log(windSpeed)

    }

    async function getForecast (getGeolocation) {
        let location = await getGeolocation(cityName);
        
        let lat= location[0];
        
        let lon= location[1];
        
        let response = await fetch (`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=d43a4a832d05fcc903147c37afc29523`);
        let data = await response.json();
        console.log(data)
        
    }

    getGeolocation(cityName)
    .then(getCurrentWeather(getGeolocation))
    .then(getForecast(getGeolocation))
    .then()
    
})



// todo check if buttons can be made when pulling data from localstorage
// todo currently 'cityName cannot be accessed. scope globally using IDs?
// todo will that pull user input before the submit button has been

// iterate over local storage keys
// for each key, create button with saved value being button text

// add event listener for buttons
// on button click, push value of button to form input and run formSubmit?
