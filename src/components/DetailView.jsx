import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import icons from './Icons';

const DetailView = ({ list }) => {
    const { timestamp } = useParams();
    const navigate = useNavigate();
    const [isCelsius, setIsCelsius] = useState(true);

    const convertTemp = (celsius) => {
        if (isCelsius) {
            return Math.round(celsius * 10) / 10;
        } else {
            return Math.round((celsius * 9/5 + 32) * 10) / 10;
        }
    };

    const tempUnit = isCelsius ? '°C' : '°F';

    // Find the specific forecast item based on timestamp
    const forecastItem = list?.find(item => item.dt.toString() === timestamp);

    if (!forecastItem) {
        return (
            <div className='text-gray-100 flex flex-col justify-center h-screen w-screen items-center'>
                <h2 className='text-3xl mb-4'>Forecast not found</h2>
                <button 
                    onClick={() => navigate('/')}
                    className='bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-lg transition'
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const date = new Date(forecastItem.dt_txt);

    return (
        <div className='text-gray-100 flex flex-col min-h-screen w-screen p-6'>
            <div className='flex justify-between items-center mb-6'>
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

            <div className='flex flex-col items-center'>
                <h1 className='text-4xl font-bold mb-8'>Detailed Weather Forecast</h1>
                
                <div className='bg-violet-100/20 rounded-xl p-8 max-w-4xl w-full'>
                    {/* Main Weather Display */}
                    <div className='text-center mb-8'>
                        <div className='text-9xl mb-4'>{icons[forecastItem.weather[0].main]}</div>
                        <h2 className='text-3xl font-bold mb-2'>{forecastItem.weather[0].main}</h2>
                        <p className='text-xl text-gray-300 capitalize'>{forecastItem.weather[0].description}</p>
                    </div>

                    {/* Date and Time */}
                    <div className='border-t border-violet-300/30 pt-6 mb-6'>
                        <h3 className='text-2xl font-bold mb-4'>Date & Time</h3>
                        <div className='grid grid-cols-2 gap-4 text-lg'>
                            <div>
                                <p className='text-gray-400'>Full Date</p>
                                <p className='font-mono'>{date.toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</p>
                            </div>
                            <div>
                                <p className='text-gray-400'>Time</p>
                                <p className='font-mono'>{date.toLocaleTimeString('en-US')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Temperature Details */}
                    <div className='border-t border-violet-300/30 pt-6 mb-6'>
                        <h3 className='text-2xl font-bold mb-4'>Temperature</h3>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                            <div className='bg-violet-900/30 p-4 rounded-lg text-center'>
                                <p className='text-gray-400 text-sm'>Current</p>
                                <p className='text-3xl font-bold'>{convertTemp(forecastItem.main.temp)}{tempUnit}</p>
                            </div>
                            <div className='bg-violet-900/30 p-4 rounded-lg text-center'>
                                <p className='text-gray-400 text-sm'>Feels Like</p>
                                <p className='text-3xl font-bold'>{convertTemp(forecastItem.main.feels_like)}{tempUnit}</p>
                            </div>
                            <div className='bg-violet-900/30 p-4 rounded-lg text-center'>
                                <p className='text-gray-400 text-sm'>Min</p>
                                <p className='text-3xl font-bold'>{convertTemp(forecastItem.main.temp_min)}{tempUnit}</p>
                            </div>
                            <div className='bg-violet-900/30 p-4 rounded-lg text-center'>
                                <p className='text-gray-400 text-sm'>Max</p>
                                <p className='text-3xl font-bold'>{convertTemp(forecastItem.main.temp_max)}{tempUnit}</p>
                            </div>
                        </div>
                    </div>

                    {/* Atmospheric Conditions */}
                    <div className='border-t border-violet-300/30 pt-6 mb-6'>
                        <h3 className='text-2xl font-bold mb-4'>Atmospheric Conditions</h3>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-lg'>
                            <div>
                                <p className='text-gray-400'>Pressure</p>
                                <p className='font-mono'>{forecastItem.main.pressure} hPa</p>
                            </div>
                            <div>
                                <p className='text-gray-400'>Humidity</p>
                                <p className='font-mono'>{forecastItem.main.humidity}%</p>
                            </div>
                            <div>
                                <p className='text-gray-400'>Sea Level</p>
                                <p className='font-mono'>{forecastItem.main.sea_level || 'N/A'} hPa</p>
                            </div>
                            <div>
                                <p className='text-gray-400'>Ground Level</p>
                                <p className='font-mono'>{forecastItem.main.grnd_level || 'N/A'} hPa</p>
                            </div>
                            <div>
                                <p className='text-gray-400'>Visibility</p>
                                <p className='font-mono'>{(forecastItem.visibility / 1000).toFixed(1)} km</p>
                            </div>
                        </div>
                    </div>

                    {/* Wind Information */}
                    <div className='border-t border-violet-300/30 pt-6 mb-6'>
                        <h3 className='text-2xl font-bold mb-4'>Wind</h3>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-lg'>
                            <div>
                                <p className='text-gray-400'>Speed</p>
                                <p className='font-mono'>{forecastItem.wind.speed} m/s</p>
                            </div>
                            <div>
                                <p className='text-gray-400'>Direction</p>
                                <p className='font-mono'>{forecastItem.wind.deg}°</p>
                            </div>
                            <div>
                                <p className='text-gray-400'>Gust</p>
                                <p className='font-mono'>{forecastItem.wind.gust || 'N/A'} m/s</p>
                            </div>
                        </div>
                    </div>

                    {/* Cloud and Rain Information */}
                    <div className='border-t border-violet-300/30 pt-6'>
                        <h3 className='text-2xl font-bold mb-4'>Precipitation & Clouds</h3>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-lg'>
                            <div>
                                <p className='text-gray-400'>Cloud Coverage</p>
                                <p className='font-mono'>{forecastItem.clouds.all}%</p>
                            </div>
                            <div>
                                <p className='text-gray-400'>Rain (3h)</p>
                                <p className='font-mono'>{forecastItem.rain?.['3h'] || 0} mm</p>
                            </div>
                            <div>
                                <p className='text-gray-400'>Probability of Precipitation</p>
                                <p className='font-mono'>{Math.round(forecastItem.pop * 100)}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailView;
