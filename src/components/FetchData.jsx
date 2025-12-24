import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from './Card';
import icons from './Icons';
import LineChart from './LineChart';
import BarChart from './BarChart';

const FetchData = ({ search, list, setList, city, setCity, currentWeather, setCurrentWeather }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isCelsius, setIsCelsius] = useState(false);

    const API_KEY = import.meta.env.VITE_APP_API_KEY;

    const convertTemp = (celsius) => {
        if (isCelsius) {
            return Math.round(celsius * 10) / 10;
        } else {
            return Math.round((celsius * 9/5 + 32) * 10) / 10;
        }
    };

    const tempUnit = isCelsius ? '°C' : '°F';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch current weather
                const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`;
                const currentResponse = await axios.get(currentURL);
                setCurrentWeather(currentResponse.data);
                
                // Fetch 5-day forecast
                const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${API_KEY}&units=metric`;
                const forecastResponse = await axios.get(forecastURL);
                console.log(forecastResponse);
                if (Array.isArray(forecastResponse.data.list)) {
                    setList(forecastResponse.data.list);
                } 
                if (forecastResponse.data.city) {
                    setCity(forecastResponse.data.city);
                }
            } catch (error) {
                setError('Error fetching data. Please try again later.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        const displayDebounceFn = setTimeout(() => {
            if (search) {
                fetchData();
            }
        }, 1000);
        return () => clearTimeout(displayDebounceFn);
    }, [search, API_KEY]);

    return (
        <div className='w-full min-h-screen text-gray-100 overflow-x-hidden flex-1'>
            {loading && <p className='p-6'>Loading...</p>}
            {error && <p className='p-6 text-red-400'>{error}</p>}
            {list && currentWeather && (
                <div className='w-full flex flex-col p-4 md:p-6'>
                    <div className='flex justify-end mb-4'>
                        <button 
                            onClick={() => setIsCelsius(!isCelsius)}
                            className='bg-violet-600 hover:bg-violet-700 text-white font-mono px-4 py-2 rounded-lg transition text-sm md:text-base'
                        >
                            {isCelsius ? 'Switch to °F' : 'Switch to °C'}
                        </button>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-2 md:p-4'>
                        <Card data={city.name} title={`${city.name} ${city.country}`} />
                        <Card data={`${convertTemp(currentWeather.main.temp)}${tempUnit}`} title="Current Temp" />
                        <Card data={icons[currentWeather.weather[0].main]} title="Weather"  />
                        <Card data={currentWeather.weather[0].description} title="Description" />
                    </div>
                    <div className='flex flex-col lg:flex-row gap-6 lg:gap-10 w-full'>
                        <div className='flex flex-col text-center gap-3 bg-violet-100/20 p-4 md:p-6 lg:p-10 mb-20 rounded-xl overflow-x-auto flex-1 min-w-0'>
                            <div className='grid grid-cols-5 gap-2 pb-2 font-mono text-xs sm:text-sm md:text-base whitespace-nowrap md:whitespace-normal'>
                                <p>Date</p>
                                <p>Time</p>
                                <p>Temp</p>
                                <p>Weather</p>
                                <p>Description</p>
                            </div>
                            {list.map((forecast, index) => (
                                <Link 
                                    to={`/detail/${forecast.dt}`}
                                    key={index} 
                                    className='grid grid-cols-5 gap-2 hover:bg-violet-500/30 p-2 rounded-lg transition cursor-pointer text-xs sm:text-sm md:text-base whitespace-nowrap md:whitespace-normal'
                                > 
                                    <p>{new Date(forecast.dt_txt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</p>
                                    <p>{forecast.dt_txt.split(" ")[1]}</p>
                                    <p>{convertTemp(forecast.main.temp)}{tempUnit}</p>
                                    <p>{icons[forecast.weather[0].main]}</p>
                                    <p className='truncate'>{forecast.weather[0].description}</p>
                                </Link>
                            ))}
                        </div>
                        <div className='flex flex-col gap-6 w-full lg:w-1/2'>
                            <LineChart list={list} isCelsius={isCelsius} />
                            <BarChart list={list} isCelsius={isCelsius} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FetchData; 

