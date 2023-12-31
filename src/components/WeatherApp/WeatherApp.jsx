import React, { useState } from 'react'
import './WeatherApp.css'


import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import api_key from '../../util/util'

function WeatherApp() {

    const [wicon, setWicon] = useState(cloud_icon);
    const [temperature, setTemperature] = useState();
    const [humidity, setHumidity] = useState();
    const [windSpeed, setWindSpeed] = useState();
    const [location, setLocation] = useState('')
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`

    const search = async (event) => {
        if (event.key === 'Enter') {
            let data;
            try {
                let response = await fetch(url);
                if(!response.ok) throw new Error(response.error);
                data = await response.json();
            } catch (e) {
                console.error(e);
                return
            }
            setTemperature(Math.floor(data.main?.temp));
            setHumidity(data.main?.humidity);
            setWindSpeed(Math.floor(data.wind?.speed));
            setLocation(data.name);
            if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
                setWicon(clear_icon)
            } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
                setWicon(cloud_icon)
            } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
                setWicon(drizzle_icon)
            } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
                setWicon(drizzle_icon)
            } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
                setWicon(rain_icon)
            } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
                setWicon(rain_icon)
            } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
                setWicon(snow_icon)
            } else {
                setWicon(clear_icon)
            }
        }
    }
    return (
        <div className="container">
            <div className="top-bar">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyUp={search}
                    type="text" className='cityInput' placeholder='search' />

            </div>
            <div className="weather-image">
                <img src={wicon} alt="cloud icon" />
            </div>
            <div className="weather-temp">{temperature}°c</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="humidity icon" />
                    <div className="data">
                        <div className="humidity-percent">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="wind icon" />
                    <div className="data">
                        <div className="wind-rate">{windSpeed}km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WeatherApp