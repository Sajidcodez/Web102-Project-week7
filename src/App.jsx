import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About';
import FetchData from './components/FetchData';
import Header from './components/Header';

function App() {
  const [search, setSearch] = useState("");
  const [list, setList] = useState(null);
  const [city, setCity] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  
  return (
    <div className='min-h-screen w-screen bg-[url("/src/assets/sky.jpg")] bg-cover'>
      {showWelcome && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-violet-900/90 rounded-lg p-8 max-w-md text-center text-white shadow-2xl'>
            <h1 className='text-4xl mb-4'>🌤️ Weather Check</h1>
            <p className='text-lg mb-6 text-gray-200'>Welcome to your personal weather forecast app!</p>
            <div className='text-left bg-violet-800/50 rounded-lg p-4 mb-6 text-sm leading-6'>
              <p className='font-bold mb-3 text-violet-300'>How to get started:</p>
              <ol className='list-decimal list-inside space-y-2 text-gray-300'>
                <li>Click the search icon in the sidebar</li>
                <li>Enter a city name (e.g., "New York", "London")</li>
                <li>View real-time weather data, forecasts, and charts</li>
                <li>Switch between Celsius and Fahrenheit anytime</li>
              </ol>
            </div>
            <p className='text-sm text-gray-300 mb-6'>Get accurate 5-day forecasts with live weather updates!</p>
            <button 
              onClick={() => setShowWelcome(false)}
              className='bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-lg transition w-full'
            >
              Get Started
            </button>
          </div>
        </div>
      )}
      <BrowserRouter>
        <div className='flex flex-row justify-start'>
          <Header search={search} setSearch={setSearch} />
          <Routes >
            <Route path='/' element={<FetchData search={search} setSearch={setSearch} list={list} setList={setList} city={city} setCity={setCity} />} />
            <Route path='/search' element={<FetchData search={search} setSearch={setSearch} list={list} city={city} setList={setList} setCity={setCity} />} />
            <Route path='/about' element={<About city={city} list={list} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
