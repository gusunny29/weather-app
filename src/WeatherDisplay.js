import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import { WbSunny, Grain, Cloud, Air, Opacity } from "@mui/icons-material";
import WeatherChart from "./WeatherChart";

const getWeatherMessage = (temperature, humidity, windSpeed) => {
  if (temperature >= 60 && temperature <= 75) {
    return { message: "Nice Day", icon: <WbSunny /> };
  }
  if (humidity >= 25 && humidity <= 75) {
    return { message: "Chance of rain", icon: <Grain /> };
  }
  if (windSpeed > 15) {
    return { message: "Windy", icon: <Air /> };
  }
  return { message: "Weather conditions not ideal", icon: <Cloud /> };
};

const WeatherDisplay = ({ data, location, selectedDay }) => {
  // Parse the selectedDay string into a Date object
  const selectedDate = new Date(selectedDay);

  // Find the day data corresponding to the selectedDay
  const selectedDayData = data.days.find((day) => {
    // Extract the date part without the time component
    const dayDateWithoutTime = day.datetime.split("T")[0];
    const dayDate = new Date(dayDateWithoutTime);

    // Strip the time component from selectedDate
    const selectedDateWithoutTime = selectedDate.toISOString().split("T")[0];
    const datePassed = new Date(selectedDateWithoutTime);

    // Compare the dates
    return dayDate.getTime() === datePassed.getTime();
  });

  // If the selected day data is not found, handle the error
  if (!selectedDayData) {
    return (
      <Typography variant="h6">
        No data available for the selected day as day has already passed
      </Typography>
    );
  }

  // Find the index of the selected day data
  const selectedDayIndex = data.days.indexOf(selectedDayData);
  const nextWeekDayIndex = (selectedDayIndex + 7) % data.days.length;

  // Get the day data for the day of the week after the selected day
  const nextWeekDayData = data.days[nextWeekDayIndex];
  const nextWeekDayOfWeek = new Date(
    nextWeekDayData.datetime,
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  // Use the selected day data and next week's data to display weather information
  const selectedDayWeather = getWeatherMessage(
    selectedDayData.temp,
    selectedDayData.humidity,
    selectedDayData.windspeed,
  );
  const selectedDayOfWeek = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const nextWeekDayWeather = getWeatherMessage(
    nextWeekDayData.temp,
    nextWeekDayData.humidity,
    nextWeekDayData.windspeed,
  );

  const selectedDayFormatted = new Date(
    selectedDayData.datetime,
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  const nextWeekDayFormatted = new Date(
    nextWeekDayData.datetime,
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" textAlign="center" mb={2}>
          <Typography variant="h5">{location}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" textAlign="center" mb={2}>
          <Typography variant="h6">
            This {selectedDayOfWeek} ({selectedDayFormatted})
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography>{selectedDayWeather.message}</Typography>
          {selectedDayWeather.icon}
        </Box>
        <Box display="flex" alignItems="center">
          <Typography>{`Wind Speed: ${selectedDayData.windspeed ?? "N/A"} mph`}</Typography>
          <Air />
        </Box>
        <Box display="flex" alignItems="center">
          <Typography>{`Humidity: ${selectedDayData.humidity ?? "N/A"}%`}</Typography>
          <Opacity />
        </Box>
        <Box display="flex" alignItems="center">
          <Typography>{`Percentage of Precipitation: ${selectedDayData.precipprob ?? "N/A"} %`}</Typography>
          <Grain />
        </Box>
        <WeatherChart day={selectedDayData} />
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" textAlign="center" mb={2}>
          <Typography variant="h6">
            Next {nextWeekDayOfWeek} ({nextWeekDayFormatted})
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography>{nextWeekDayWeather.message}</Typography>
          {nextWeekDayWeather.icon}
        </Box>
        <Box display="flex" alignItems="center">
          <Typography>{`Wind Speed: ${nextWeekDayData.windspeed ?? "N/A"} mph`}</Typography>
          <Air />
        </Box>
        <Box display="flex" alignItems="center">
          <Typography>{`Humidity: ${nextWeekDayData.humidity ?? "N/A"}%`}</Typography>
          <Opacity />
        </Box>
        <Box display="flex" alignItems="center">
          <Typography>{`Percentage of Precipitation: ${nextWeekDayData.precipprob ?? "N/A"} %`}</Typography>
          <Grain />
        </Box>
        <WeatherChart day={nextWeekDayData} />
      </Grid>
    </Grid>
  );
};

export default WeatherDisplay;
