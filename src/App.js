import React, { useState } from "react";
const apiWeather = {
  key: "04b7b92ed43d34ae58570af5464ca9b9",
  base: "https://api.openweathermap.org/data/2.5/"
}

const apiBackground = {
  key: "30087312-ca3d726e99fae171801bd37ea",
  base: "https://pixabay.com/api/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [backgroundImg, setBackgroundImg] = useState('')

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${apiWeather.base}weather?q=${query}&units=metric&APPID=${apiWeather.key}`)
        .then(response => response.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
      fetch(`${apiBackground.base}?key=${apiBackground.key}&q=${query}&image_type=photo`)
        .then(response => response.json())
        .then(result => {
          setBackgroundImg(result.hits[0].largeImageURL)
          console.log(result.hits[0].largeImageURL);
        })
        /* style={{ background: `url(${backgroundImg})` }} */
    }
  }

  const dateBuilder = (d) => {
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} de ${year}`

    /* let date = String(new window.Date())
       date = date.slice(3,15)*/
  }

  const translation = {
    Thunderstorm: 'Tormenta',
    Drizzle: 'Llovizna',
    Rain: 'Lluvia',
    Snow: 'Nieve',
    Mist: 'Bruma',
    Smoke: 'Humo',
    Haze: 'Neblina',
    Dust: 'Polvo',
    Fog: 'Niebla',
    Sand: 'Arena',
    Ash: 'Ceniza',
    Squall: 'Chubasco',
    Tornado: 'Tornado',
    Clear: 'Despejado',
    Clouds: 'Nubes'
  }

  return (
    <div className='app'
    /* {(typeof weather.main !== 'undefined')
        ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}  */
        style={(typeof weather.main !== 'undefined')
        ? { backgroundImage: `url(${backgroundImg})` } 
        : { backgroundImage: `url('https://www.findingtheuniverse.com/wp-content/uploads/2017/01/Blue2Bhour2BFinland_by_Laurence2BNorah.jpg')` } } >
      <main>
        <div className="searchBox">
          <input type="text"
            className="searchBar"
            placeholder="Busca el tiempo de hoy..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.name !== 'undefined') ? (
          <div>
            <div className="locationBox">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weatherBox">
              <div className="temp">
                {Math.round(weather.main.temp)}ºC
              </div>
              <div className="weather">
                {translation[weather.weather[0].main]}
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
