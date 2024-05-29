import React, { useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import WeatherForm from "./WeatherForm";
import WeatherDisplay from "./WeatherDisplay";
import "./App.css";

const API_KEY = "UTVCFZ5J9ZR7PWDS6494MT9DC";
const GEOCODING_API_KEY = "e53a8c118d8c4c09ac694fc3fc4063e7";

const App = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);

  // Function to get the next 7 days
  const getNext7Days = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      days.push(nextDay);
    }
    return days;
  };

  const next7Days = getNext7Days();

  const fetchWeatherData = async ({ location, day, timeFilter }) => {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}&contentType=json`,
      );

      // Filter the weather data based on the selected time filter
      let filteredData = response.data.days;
      if (timeFilter !== "All Day") {
        filteredData = filteredData.map((day) => ({
          ...day,
          hours: day.hours.filter((hour) => {
            const hourOfDay = parseInt(
              hour.datetime.substring(
                hour.datetime.indexOf("T") + 1,
                hour.datetime.indexOf(":"),
              ),
            );
            switch (timeFilter) {
              case "Morning":
                return hourOfDay >= 4 && hourOfDay < 12;
              case "Afternoon":
                return hourOfDay >= 12 && hourOfDay < 18;
              case "Night":
                return hourOfDay >= 18 && hourOfDay < 24;
              default:
                return true;
            }
          }),
        }));
      }

      // Update state with the filtered weather data
      setSelectedDay(day);
      setWeatherData({ days: filteredData });
      setError(null);
    } catch (err) {
      setError("Unable to fetch weather data.");
    }
  };

  const fetchLocation = async ({ location }) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${GEOCODING_API_KEY}`,
      );

      setLocation(response.data.results[0].formatted);
    } catch (err) {
      setError("Unable to fetch city and state data.");
    }
  };

  const handleLocationSubmit = (loc) => {
    fetchLocation(loc);
    fetchWeatherData(loc);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Meetup Weather Forecast
      </Typography>
      <WeatherForm onSubmit={handleLocationSubmit} days={next7Days} />
      {error && <Typography color="error">{error}</Typography>}
      {weatherData && (
        <WeatherDisplay
          data={weatherData}
          location={location}
          selectedDay={selectedDay}
        />
      )}
    </Container>
  );
};

export default App;
