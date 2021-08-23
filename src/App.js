import "./App.css";
import { useState, useEffect } from "react";
import TodayList from "./components/TodayList";
import InfoBox from "./components/InfoBox";
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
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState();

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then();
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
      <div>
        <h1> Transfer Tracker</h1>
        <div className="app__header">
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
          <InfoBox title="Overall" total={"Average"} cases={"26%"} />
          <InfoBox title="Lowest" total={"Metro"} cases={"12%"} />
          <InfoBox title="Highest" total={"Telegraph"} cases={"46%"} />
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
