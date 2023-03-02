import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({
    main: {
      temp: 20,
    },
    weather: [
      {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04d",
      },
    ],
    wind: {
      speed: 2.68,
      deg: 90,
      gust: 2.68,
    },
  });
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`;
  console.log(apiUrl);

  useEffect(() => {
    console.log("effect");
    axios.get(apiUrl).then((response) => {
      console.log("promise fulfilled");
      setWeather(response.data);
      console.log(response.data);
    });
  },[]);
  console.log(weather);

  // useEffect(() => {
  //   fetch(apiUrl)
  //     .then((res) => res.json())
  //     .then((data) => setWeather(data))
  //     console.log(weather)
  // });
  // console.log(weather)
  const temp = (weather.main.temp - 273.15).toFixed(2);
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {temp} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>languages:</h3>
      {Object.keys(country.languages).map((key) => (
        <li key={key}>{country.languages[key]}</li>
      ))}
      <br></br>
      <img src={country.flags.png} />
      <Weather country={country} />
    </div>
  );
};

const Filter = ({ setFilter }) => {
  return (
    <div>
      find countries{" "}
      <input onChange={setFilter} placeholder="filter" v-model="keyWord" />
    </div>
  );
};

const Countries = ({ fillist }) => {
  const [click, setClick] = useState(false);
  const [clickCountry, setClickCountry] = useState({});

  const setToClick = (country) => () => {
    setClick(true);
    setClickCountry(country);
  };

  if (fillist.length === 1) {
    return (
      <div>
        {fillist.map((country) => (
          <Country key={country.name.common} country={country} />
        ))}
      </div>
    );
  } else if (fillist.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (fillist.length > 1 && fillist.length <= 10) {
    if (click) {
      return (
        <div>
          <Country key={clickCountry.name.common} country={clickCountry} />
        </div>
      );
    } else {
      return (
        <div>
          {fillist.map((country) => (
            <p key={country.name.common}>
              {country.name.common}
              <button onClick={setToClick(country)}>show</button>{" "}
            </p>
          ))}
        </div>
      );
    }
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [keyWord, setKeyWord] = useState("");

  const setFilter = (event) => {
    setKeyWord(event.target.value);
  };

  useEffect(() => {
    // console.log('effect')
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      // console.log('promise fulfilled')
      setCountries(response.data);
    });
  }, [0]);
  // console.log('render', persons.length, 'persons')

  const fillist = countries.filter(
    (p) => p.name.common.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1
  );
  // alert(countries.length)
  return (
    <div>
      <Filter setFilter={setFilter} />
      <Countries fillist={fillist} />
    </div>
  );
}

export default App;
