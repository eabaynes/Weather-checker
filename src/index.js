// OpenWeatherAPIkey=d43a4a832d05fcc903147c37afc29523
// Handle API requests and prepare output to be sent out to other modules
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?'
// todo= handle form submission
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const cityName = event.target.city.value
    console.log(cityName)
    const stateID = event.target.state.value
    console.log(stateID)

})