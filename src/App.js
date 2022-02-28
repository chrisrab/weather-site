import './App.css'
import Header from './components/Header'
import WeatherCard from './components/WeatherCard'
import { useState, useEffect } from 'react'

require('dotenv').config()

const axios = require('axios').default

function App() {
  const [weather, setWeather] = useState({})
  const [fetched, setFetched] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [userLocation, setUserLocation] = useState('Solihull')
  const [callFailed, setCallFailed] = useState(false)
  const [API, setAPI] = useState(null)

  const APIkey = API

  useEffect(() => {
    async function fetchAPI() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${userLocation}&appid=${APIkey}&units=metric`
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

  useEffect(() => {
    axios.get('http://localhost:8000/api').then((res) => setAPI(res.data))
  }, [])

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
      weatherArray.forEach((element) => {
        if (element.dt_txt.includes(`12:00:00`) === true) {
          filtered.push(element)
        }
      })
    }
    return filtered
  }

  let day = ''

  const getDay = (number) => {
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

  const getCorrectDay = (d) => {
    let date = new Date(d)
    let day = date.getDay()
    console.log(day)
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
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setUserLocation(searchTerm)
              }
            }}
          />
        </div>
        <h3 className="location">{weather.city.name + ', ' + weather.city.country}</h3>
        <div className="weather-cards-container">
          {getMiddayWeather().map((d) => (
            <WeatherCard
              day={getDay(getCorrectDay(d.dt_txt))}
              date={d.dt_txt}
              temp={Math.round(d.main.temp) + 'ºc'}
              description={d.weather[0].main}
              key={day}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App
