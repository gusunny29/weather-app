import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherChart = ({ day }) => {
  const hours = day.hours || []; // Ensure hours is always an array

  const data = {
    labels: hours.map(hour => hour.datetime),
    datasets: [
      {
        label: 'Temperature (°F)',
        data: hours.map(hour => hour.temp),
        fill: true,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Humidity (%)',
        data: hours.map(hour => hour.humidity),
        fill: false,
        borderColor: 'rgba(153,102,255,1)',
      },
      {
        label: 'Wind Speed (MPH)',
        data: hours.map(hour => hour.windspeed),
        fill: false,
        borderColor: 'rgba(255,159,64,1)',
      },
    ],
  };
  
  const options = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          callback: function(value, index, values) {
            // Extract the hour part from the datetime string
            const timeString = data.labels[index];
            const hour = parseInt(timeString.substring(0, 2), 10);

            let timeOfDay = 'AM';
            let hourFormatted = hour;
            if (hour === 0) {
              hourFormatted = 12;
            } else if (hour === 12) {
              timeOfDay = 'PM';
            } else if (hour > 12) {
              hourFormatted = hour - 12;
              timeOfDay = 'PM';
            }

            return `${hourFormatted} ${timeOfDay}`;
          }
        },
      },
    },
  };


  return <Line data={data} options={options}/>;
};

export default WeatherChart;