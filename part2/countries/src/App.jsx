import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import Countries from "./components/countries";
import Weather from "./components/Weather";

const App = () => {
  const [filter, setfilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [error, setError] = useState(null);

  const handleNameFilter = (event) => {
    setfilter(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (error) {
    return <div>{error}</div>;
  }

  useEffect(() => {
    countriesService
      .getCountries()
      .then((response) => {
        setCountries(response);
      })
      .catch((error) => {
        setError("Error fetching countries data");
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);

      countriesService
        .getWeather(filteredCountries[0].capital)
        .then((response) => {
          setWeather(response);
        })
        .catch((error) => {
          setError("Error fetching countries data");
          console.error("Error:", error);
        });
    } else {
      setSelectedCountry(null);
    }
  }, [filter]);

  return (
    <div>
      <div>
        Find countries <input value={filter} onChange={handleNameFilter} />
      </div>
      <div>
        {filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}

        {selectedCountry && <Countries selectedCountry={selectedCountry} />}
        {weather && <Weather weather={weather} />}

        {filteredCountries.length <= 10 &&
          !selectedCountry &&
          filteredCountries.map((country) => (
            <div key={country.name.common}>
              <p>{country.name.common}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
