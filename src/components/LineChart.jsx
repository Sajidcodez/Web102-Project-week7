import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const DataChart = ({ list, isCelsius }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (list && list.length > 0) {
      // Extract timestamps and temperatures from the weather data
      const labels = list.slice(0, 40).map(forecast => { // Show all available data points
        const dateObj = new Date(forecast.dt_txt);
        const americanDate = dateObj.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
        const time24 = parseInt(forecast.dt_txt.split(" ")[1].split(":")[0]);
        const period = time24 >= 12 ? 'PM' : 'AM';
        const time12 = time24 > 12 ? time24 - 12 : time24 === 0 ? 12 : time24 === 12 ? 12 : time24;
        return `${americanDate} ${time12} ${period}`; // Format: MM-DD 12 PM
      });
      const temperatures = list.slice(0, 40).map(forecast => {
        const celsius = forecast.main.temp;
        if (isCelsius) {
          return Math.round(celsius * 10) / 10;
        } else {
          return Math.round((celsius * 9/5 + 32) * 10) / 10;
        }
      });

      setChartData({
        labels: labels,
        datasets: [
          {
            label: `Temperature (${isCelsius ? '°C' : '°F'})`,
            data: temperatures,
            fill: false,
            borderColor: 'rgb(139, 92, 246)',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            tension: 0.4,
            pointBackgroundColor: 'rgb(139, 92, 246)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
          },
        ],
      });
    }
  }, [list, isCelsius]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(209, 213, 219)',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'rgb(209, 213, 219)',
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'rgb(209, 213, 219)',
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.1)',
        },
      },
    },
  };

  return (
    <div className='bg-violet-100/20 p-6 md:p-10 mb-20 rounded-xl'>
      <h2 className='text-white mb-4'>Temperature Trend</h2>
      <div>
        {chartData ? <Line data={chartData} options={options} /> : <p>Loading chart...</p>}
      </div>
    </div>
  );
};

export default DataChart;
