const Countries = ({ selectedCountry }) => {
  return (
    <div>
      <h2>{selectedCountry.name.common}</h2>
      <p>Capital: {selectedCountry.capital}</p>
      <p>Area: {selectedCountry.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(selectedCountry.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={selectedCountry.flags.png}
        alt={`Flag of ${selectedCountry.name.common}`}
        style={{ width: "200px" }}
      />
      <h4>Weather in {selectedCountry.capital} </h4>
    </div>
  );
};
export default Countries;
