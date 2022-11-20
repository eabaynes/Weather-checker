
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

    async function getWeather (getGeolocation) {
        let location = await getGeolocation(cityName);
        console.log(location)
        let lat= location[0];
        console.log(lat)
        let lon= location[1];
        console.log(lon)
        let response = await fetch (`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d43a4a832d05fcc903147c37afc29523`);
        let data = await response.json();
        return data
    }
    getGeolocation(cityName).then(getWeather(getGeolocation))
    
})


// const longitude= geoResponse.lon
// const latitude= geoResponse.lat

// todo check if buttons can be made when pulling data from localstorage
// todo currently 'cityName cannot be accessed. scope globally using IDs?
// todo will that pull user input before the submit button has been
// $('document').ready(function checkStorage(){
//     localStorage.getItem(cityName).forEach( function makeButtons(){
//         const thisCity= this.cityName
//         console.log(thisCity)
        // const savedCity = localStorage.getItem(cityName).city
        // const savedState = localStorage.getItem
        // $('section#history').append('<button class=""')

//     }
//     )
// })
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=d43a4a832d05fcc903147c37afc29523