import icons from './Icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const About = ({ city, list }) => {
    const [isCelsius, setIsCelsius] = useState(true);
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
                (city !== null && list !== null) && <h2 className='text-3xl pb-14'>Today's weather</h2>
            }
            {
                (city !== null && list !== null) && (
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
                                <p>Date and time: <span>{list[0].dt_txt}</span></p>
                                <p>Description: <span>{list[0].weather[0].description}</span></p>
                                <p>Humidity: <span>{list[0].main.humidity}</span></p>
                                <p>Temperature: <span>{convertTemp(list[0].main.temp)}{tempUnit}</span></p>
                                <p>Minimum temperature: <span>{convertTemp(list[0].main.temp_min)}{tempUnit}</span></p>
                                <p>Maximum temperature: <span>{convertTemp(list[0].main.temp_max)}{tempUnit}</span></p>
                                <p>Visibility: <span>{list[0].visibility}</span></p>
                                <p>Wind speed: <span>{list[0].wind.speed}</span></p>
                            </div>
                            <div className='col-span-1 text-center'>
                                <span className='text-8xl'>{icons[list[0].weather[0].main]}</span>
                                <p>{list[0].weather[0].description}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default About;
