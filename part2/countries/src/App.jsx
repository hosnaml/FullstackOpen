import { useState, useEffect } from "react";
import countriesService from "./services/countries";

const App = () => {
  const [filter, setfilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  const handleNameFilter = (event) => {
    setfilter(event.target.value);
  };

  useEffect(() => {
    countriesService
      .getAll()
      .then((response) => {
        setCountries(response);
      })
      .catch((error) => {
        setError("Error fetching countries data");
        console.error("Error:", error);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div>
        Find countries <input value={filter} onChange={handleNameFilter} />
      </div>
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          <div>
            <h2>{filteredCountries[0].name.common}</h2>
            <p>Capital: {filteredCountries[0].capital}</p>
            <p>Area: {filteredCountries[0].area} km²</p>
            <h3>Languages:</h3>
            <ul>
              {Object.values(filteredCountries[0].languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img
              src={filteredCountries[0].flags.png}
              alt={`Flag of ${filteredCountries[0].name.common}`}
              style={{ width: "200px" }}
            />
          </div>
        ) : (
          filteredCountries.map((country) => (
            <div key={country.name.common}>
              <p>{country.name.common}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
