import './App.css'
import Header from './components/Header'
import WeatherCard from './components/WeatherCard'
import { useState, useEffect } from 'react'

const axios = require('axios').default

function App() {
  const [weather, setWeather] = useState({})
  const [fetched, setFetched] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [userLocation, setUserLocation] = useState('Solihull')
  const [callFailed, setCallFailed] = useState(false)

  const APIkey = '12513b03b28619fe07e82d44fc8bef0b'

  useEffect(() => {
    async function fetchAPI() {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${userLocation}&appid=${APIkey}&units=metric`
        )
        setWeather(response.data)
        setFetched(true)
      } catch (error) {
        console.error(error)
        setCallFailed(true)
      }
    }

    fetchAPI()
  }, [userLocation])

  if (fetched) {
    console.log(weather)
  }

  if (callFailed === true) {
    alert(
      'Please enter an applicable city, check your spelling or put a country code after the location, such as "Birmingham, UK"'
    )
    setCallFailed(false)
  }

  const getMiddayWeather = () => {
    let weatherArray = weather.list
    let filtered = []
    if (weatherArray) {
      weatherArray.forEach(element => {
        if (element.dt_txt.includes(`12:00:00`) === true) {
          filtered.push(element)
        }
      })
    }
    return filtered
  }

  const date = new Date()
  let whatDay = date.getDay()
  let day = ''

  const getDay = number => {
    switch (number) {
      case 0:
        day = 'Sunday'
        break
      case 1:
        day = 'Monday'
        break
      case 2:
        day = 'Tuesday'
        break
      case 3:
        day = 'Wednesday'
        break
      case 4:
        day = 'Thursday'
        break
      case 5:
        day = 'Friday'
        break
      case 6:
        day = 'Saturday'
        break
      case 7:
        day = 'Sunday'
        break
      case 8:
        day = 'Monday'
        break
      case 9:
        day = 'Tuesday'
        break
      case 10:
        day = 'Wednesday'
        break
      case 11:
        day = 'Thursday'
        break
      default:
        day = 'No idea'
    }

    return day
  }

  if (!fetched) {
    return <div></div>
  } else {
    return (
      <div>
        <Header />
        <div className="search-box-container">
          <input
            className="search-box"
            type="text"
            placeholder="Search"
            onChange={event => {
              setSearchTerm(event.target.value)
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                setUserLocation(searchTerm)
              }
            }}
          />
        </div>
        <h3 className="location">{weather.city.name + ', ' + weather.city.country}</h3>
        <div className="weather-cards-container">
          <WeatherCard
            day="Today"
            date={getMiddayWeather()[0].dt_txt}
            temp={Math.round(getMiddayWeather()[0].main.temp) + 'ºc'}
            description={getMiddayWeather()[0].weather[0].main}
          />
          <WeatherCard
            day={getDay(whatDay + 1)}
            date={getMiddayWeather()[1].dt_txt}
            temp={Math.round(getMiddayWeather()[1].main.temp) + 'ºc'}
            description={getMiddayWeather()[1].weather[0].main}
          />
          <WeatherCard
            day={getDay(whatDay + 2)}
            date={getMiddayWeather()[2].dt_txt}
            temp={Math.round(getMiddayWeather()[2].main.temp) + 'ºc'}
            description={getMiddayWeather()[2].weather[0].main}
          />
          <WeatherCard
            day={getDay(whatDay + 3)}
            date={getMiddayWeather()[2].dt_txt}
            temp={Math.round(getMiddayWeather()[2].main.temp) + 'ºc'}
            description={getMiddayWeather()[2].weather[0].main}
          />
          <WeatherCard
            day={getDay(whatDay + 4)}
            date={getMiddayWeather()[3].dt_txt}
            temp={Math.round(getMiddayWeather()[3].main.temp) + 'ºc '}
            description={getMiddayWeather()[3].weather[0].main}
          />
        </div>
      </div>
    )
  }
}

export default App
