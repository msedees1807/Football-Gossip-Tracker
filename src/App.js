import "./App.css";
import { useState, useEffect } from "react";
import TodayList from "./components/TodayList";
import NewsLocations from "./components/NewsLocations";

function App() {
  const [countries, setCountries] = useState(["UK", "USA", "SPAIN", "ITALY"]);

  // This runs once when the code loads, and then not gain until the trigger is fired
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => {
            name: country.country;
            value: country.countryInfo.iso2;
          });
          setCountries(countries);
        });
    };

    getCountriesData();
  }, [countries]);

  return (
    <div className="App">
      <div className="app__header">
        <h1>Football Gossip Tracker</h1>

        {countries.map((x) => {
          <p>{x}</p>;
        })}
      </div>

      <div className="app__todays_news">
        <h2>Today's News</h2>
        <TodayList />
      </div>

      <div className="app__news_locations">
        <h2>Locations</h2>
        <NewsLocations />
      </div>
    </div>
  );
}

export default App;
