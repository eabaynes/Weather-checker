const OpenWeatherAPIkey= "d43a4a832d05fcc903147c37afc29523"
// Handle API requests and prepare output to be sent out to other modules
const baseURL = "https://api.openweathermap.org"

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
// variable from City input
    const cityName = event.target.city.value
// variable from State ID input
    const stateID = event.target.state.value

// todo check API key error, try to get this to return a response
   function getGeolocation (cityName,stateID) {

        const geoResponse= fetch(`${baseURL}/geo/1.0/direct?q=${cityName},${stateID}&appid=${OpenWeatherAPIkey}`)
        .then( function (response){
        
        return geoResponse.json();
    })
    .then(function storeInput(){
        const saveValueObj= {
            "city": cityName,
            "state": stateID
        }
        localStorage.setItem(cityName, JSON.stringify(saveValueObj));
    })
    }

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