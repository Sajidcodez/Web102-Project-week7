# Codepath project requirements grading ReadMe.MD is inside of the src folder 

# 🌤️ Weather Check - Weather Forecast Application Part 2 - Final

A beautiful, modern weather forecast application built with React and Vite. Get real-time weather data, 5-day forecasts, and interactive charts for any city in the world!

## ✨ Features

### 📍 Location Search
- Search for weather information by city name
- Instant weather data updates for any location worldwide
- Debounced search to optimize API calls

### 🌡️ Temperature Display
- **Real-time current temperature** with weather icon and description
- **5-day forecast** with detailed weather information
- **Toggle between Celsius and Fahrenheit** - Switch temperature units anytime
- Min/Max temperature tracking

### 📊 Data Visualization
- **Temperature Trend Chart** - Beautiful line chart showing temperature changes over 5 days
- **Temperature Comparison Chart** - Colorful bar chart for easy temperature comparison
- All charts display data at 3-hour intervals with:
  - MM-DD date format
  - 12-hour time format (12 AM, 3 AM, 6 AM, 9 AM, 12 PM, etc.)
  - Interactive tooltips and responsive design

### 📋 Detailed Weather Information
- City name and country
- Current date and time
- Weather description
- Humidity levels
- Wind speed
- Visibility distance
- Minimum and maximum temperatures

### 🎨 Beautiful UI
- Dark theme with violet accent colors
- Tailwind CSS styling for modern appearance
- Responsive design for desktop and mobile
- Smooth animations and transitions
- Welcome modal with user onboarding

### 🗂️ Navigation
- **Dashboard** - View current weather and forecast
- **Search** - Find weather for different cities
- **About** - Detailed weather information for the current location

## 🛠️ Technology Stack

- **Frontend Framework:** React 19.1.1
- **Build Tool:** Vite 7.1.12
- **Styling:** Tailwind CSS 3.4.3
- **Routing:** React Router DOM 7.9.4
- **HTTP Client:** Axios 1.6.8
- **Charts:** Chart.js 4.5.1 + react-chartjs-2 5.3.1
- **CSS Processing:** PostCSS 8.5.6 + Autoprefixer 10.4.21

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Web102-Project-week7
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file with your OpenWeatherMap API key
```
VITE_APP_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5174`

## 📖 How to Use

1. **Get Started:** Click the "Get Started" button on the welcome modal
2. **Search for a City:** Click the search icon in the sidebar and enter a city name
3. **View Weather Data:** 
   - See current temperature, weather icon, and description in the cards
   - Browse the forecast table for upcoming weather
   - Check the temperature charts for trends
4. **Switch Units:** Click the "Switch to °F" or "Switch to °C" button anytime
5. **View Details:** Click "About" in the sidebar to see detailed weather information

## 🌐 API Integration

This application uses the **OpenWeatherMap Forecast API** to fetch real-time weather data:
- Endpoint: `https://api.openweathermap.org/data/2.5/forecast`
- Units: Metric (Celsius)
- 5-day forecast with 3-hour intervals (40 data points)

## 📁 Project Structure

```
src/
├── components/
│   ├── About.jsx          # Detailed weather information page
│   ├── BarChart.jsx       # Temperature comparison chart
│   ├── Card.jsx           # Reusable card component
│   ├── FetchData.jsx      # Main dashboard with API integration
│   ├── Header.jsx         # Navigation sidebar
│   ├── Icons.jsx          # Weather icon mappings
│   └── LineChart.jsx      # Temperature trend chart
├── App.jsx                # Main app component with routing
├── index.css              # Global styles with Tailwind
└── main.jsx               # React entry point
```

## 🎯 Key Components

- **FetchData:** Manages API calls, temperature conversions, and displays current weather
- **LineChart:** Visualizes temperature trends over time
- **BarChart:** Compares temperatures across different time periods
- **About:** Shows comprehensive weather details for the selected location
- **Header:** Navigation and search functionality

## 💡 Features Highlight

✅ Real-time weather data from OpenWeatherMap  
✅ Beautiful, interactive charts with Chart.js  
✅ Responsive design for all devices  
✅ Temperature unit conversion (°C/°F)  
✅ Debounced API calls for performance  
✅ Welcome modal with instructions  
✅ Detailed forecast table with MM-DD-YYYY formatting  
✅ Clean, modern UI with Tailwind CSS  

## 📝 License

This project is open source and available under the MIT License.
