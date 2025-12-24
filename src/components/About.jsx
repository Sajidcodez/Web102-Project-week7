import icons from './Icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const About = ({ city, list, currentWeather }) => {
    const [isCelsius, setIsCelsius] = useState(false);
    const navigate = useNavigate();

    const convertTemp = (celsius) => {
        if (isCelsius) {
            return Math.round(celsius * 10) / 10;
        } else {
            return Math.round((celsius * 9/5 + 32) * 10) / 10;
        }
    };

    const tempUnit = isCelsius ? '°C' : '°F';

    return (
        <div className='text-gray-100 flex flex-col justify-center h-screen w-screen items-center align-center'>
            {
                (city !== null && list !== null && currentWeather !== null) && <h2 className='text-3xl pb-14'>Today's weather</h2>
            }
            {
                (city !== null && list !== null && currentWeather !== null) && (
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-center gap-4'>
                            <button 
                                onClick={() => navigate('/')}
                                className='bg-violet-600 hover:bg-violet-700 text-white font-bold px-4 py-2 rounded-lg transition'
                            >
                                ← Back to Dashboard
                            </button>
                            <button 
                                onClick={() => setIsCelsius(!isCelsius)}
                                className='bg-violet-600 hover:bg-violet-700 text-white font-mono px-4 py-2 rounded-lg transition'
                            >
                                {isCelsius ? 'Switch to °F' : 'Switch to °C'}
                            </button>
                        </div>
                        <div className='grid grid-cols-2 bg-violet-100/20 rounded-xl w-5/6 p-10 pl-14 text-md font-mono leading-8 items-center justify-start'>
                            <div className='col-span-1'>
                                <p>City: <span>{city.name}</span></p>
                                <p>Country: <span>{city.country}</span></p>
                                <p>Current Temperature: <span>{convertTemp(currentWeather.main.temp)}{tempUnit}</span></p>
                                <p>Description: <span>{currentWeather.weather[0].description}</span></p>
                                <p>Humidity: <span>{currentWeather.main.humidity}%</span></p>
                                <p>Minimum temperature: <span>{convertTemp(currentWeather.main.temp_min)}{tempUnit}</span></p>
                                <p>Maximum temperature: <span>{convertTemp(currentWeather.main.temp_max)}{tempUnit}</span></p>
                                <p>Visibility: <span>{(currentWeather.visibility / 1000).toFixed(2)} km</span></p>
                                <p>Wind speed: <span>{currentWeather.wind.speed} m/s</span></p>
                            </div>
                            <div className='col-span-1 text-center'>
                                <span className='text-8xl'>{icons[currentWeather.weather[0].main]}</span>
                                <p>{currentWeather.weather[0].description}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default About;
