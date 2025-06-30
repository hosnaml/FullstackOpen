import axios from "axios";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const apiKey = import.meta.env.VITE_WEATHER_KEY

const getCountries = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const getWeather = (city) =>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    return axios.get(weatherUrl).then(response => response.data);
}
export default { 
    getCountries: getCountries,
    getWeather: getWeather
}