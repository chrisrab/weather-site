import React from 'react'
import { TiWeatherSunny, TiWeatherShower, TiWeatherCloudy, TiWeatherSnow } from 'react-icons/ti'
import './WeatherCard.css'

const WeatherCard = ({ day, date, temp, description }) => {
  let icon = ''

  const getWeatherIcon = (description) => {
    switch (description) {
      case 'Clouds':
        icon = <TiWeatherCloudy />
        break
      case 'Clear':
        icon = <TiWeatherSunny />
        break
      case 'Snow':
        icon = <TiWeatherSnow />
        break
      case 'Rain':
        icon = <TiWeatherShower />
        break
      case 4:
        description = 'Thursday'
        break
      case 5:
        description = 'Friday'
        break
      default:
        description = 'No idea'
    }

    return icon
  }

  return (
    <div className="weather-container">
      <h3 className="weather">{day}</h3>
      <p className="date">{date}</p>
      <p className="weather-icon">{getWeatherIcon(description)}</p>
      <p className="temp">{temp}</p>
      <p className="description">{description}</p>
    </div>
  )
}

export default WeatherCard
