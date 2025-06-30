const Weather = ({ weather }) => {
  return (
    <div>
      <p> Temperature {weather.main.temp} Celicius </p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};
export default Weather;
