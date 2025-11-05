import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from './Card';
import icons from './Icons';
import LineChart from './LineChart';
import BarChart from './BarChart';

const FetchData = ({ search, list, setList, city, setCity }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isCelsius, setIsCelsius] = useState(true);

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
                const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${API_KEY}&units=metric`;
                const response = await axios.get(URL);
                console.log(response);
                if (Array.isArray(response.data.list)) {
                    setList(response.data.list);
                } 
                if (response.data.city) {
                    setCity(response.data.city);
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
        <div className='flex min-h-screen w-screen text-gray-100 overflow-hidden'>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {list && (
                <div className='w-screen flex flex-col p-6'>
                    <div className='flex justify-end mb-4'>
                        <button 
                            onClick={() => setIsCelsius(!isCelsius)}
                            className='bg-violet-600 hover:bg-violet-700 text-white font-mono px-4 py-2 rounded-lg transition'
                        >
                            {isCelsius ? 'Switch to °F' : 'Switch to °C'}
                        </button>
                    </div>
                    <div className='grid grid-col-1 md:grid-cols-4 gap-6 p-4'>
                        <Card data={city.name} title={`${city.name} ${city.country}`} />
                        <Card data={`${convertTemp(list[0].main.temp)}${tempUnit}`} title="Current Temp" />
                        <Card data={icons[list[0].weather[0].main]} title="Weather"  />
                        <Card data={list[0].weather[0].description} title="Description" />
                    </div>
                    <div className='flex flex-row gap-10'>
                        <div className='flex flex-col text-center gap-3 bg-violet-100/20 p-6 md:p-10 mb-20 rounded-xl'>
                            <div className='grid grid-cols-5 pb-2 font-mono text-xl'>
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
                                    className='grid grid-cols-5 hover:bg-violet-500/30 p-2 rounded-lg transition cursor-pointer'
                                > 
                                    <p>{new Date(forecast.dt_txt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</p>
                                    <p>{forecast.dt_txt.split(" ")[1]}</p>
                                    <p>{convertTemp(forecast.main.temp)}{tempUnit}</p>
                                    <p>{icons[forecast.weather[0].main]}</p>
                                    <p>{forecast.weather[0].description}</p>
                                </Link>
                            ))}
                        </div>
                        <div>
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

