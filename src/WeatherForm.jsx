import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const WeatherForm = ({ onSubmit, days }) => {

  const daysOptions = days.map((dateString, index) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    return (
      <MenuItem key={index} value={formattedDate}>
        {date.toDateString()}
      </MenuItem>
    );
  });
  
  const [location, setLocation] = useState('');
  const [day, setDay] = useState(daysOptions[0].props.value);  
  const [timeFilter, setTimeFilter] = useState('All Day');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ location, day, timeFilter });
  };

  return (
    <Box mt={3}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <TextField
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="day-label">Day</InputLabel>
          <Select
            labelId="day-label"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            label="Day"
          >
            {daysOptions}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="time-filter-label">Time Filter</InputLabel>
          <Select
            labelId="time-filter-label"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            label="Time Filter"
          >
            <MenuItem value="All Day">All Day</MenuItem>
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Afternoon">Afternoon</MenuItem>
            <MenuItem value="Night">Night</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">Get Weather</Button>
      </form>
    </Box>
  );
};

export default WeatherForm;
