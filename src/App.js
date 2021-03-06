import "./App.css";
import { useState, useEffect } from "react";
import TodayList from "./components/TodayList";
import NewsLocations from "./components/NewsLocations";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState("");

  const onCountryChange = async (e) => {
    setCountry(e.target.value);

    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json)
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });

    console.log("HERERERERER", countryInfo);
  };

  // This runs once when the code loads, and then not gain until the trigger is fired
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, [countries]);

  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <h1> COVID Tracker</h1>
          Chosen: {country}
          <div>
            <FormControl style={{ width: "200px", margin: "20px" }}>
              <InputLabel>Select country</InputLabel>
              <Select onChange={onCountryChange} value={country}>
                {countries.map((x) => (
                  <MenuItem value={x.value} key={x.name}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="app__stats">
          <InfoBox title="COVID cases" total={2000} cases={129} />
          <InfoBox title="COVID cases" total={2000} cases={129} />
          <InfoBox title="COVID cases" total={2000} cases={129} />
        </div>

        <div className="app__news_locations">
          <h2>Locations</h2>
          <Map />
          <NewsLocations />
        </div>

        <br />
      </div>

      <Card className="app__right">
        <CardContent>
          <div className="app__todays_news">
            <h2>Today's News</h2>
            <TodayList />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
