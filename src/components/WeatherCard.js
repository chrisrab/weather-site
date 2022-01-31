import React from 'react'
import { TiWeatherSunny } from 'react-icons/ti'
import './WeatherCard.css'

const WeatherCard = ({ day, date, temp, description }) => {
  return (
    <div className="weather-container">
      <h3 className="day">{day}</h3>
      <p className="date">{date}</p>
      <TiWeatherSunny className="weather-icon" />
      <p className="temp">{temp}</p>
      <p className="description">{description}</p>
    </div>
  )
}

export default WeatherCard
