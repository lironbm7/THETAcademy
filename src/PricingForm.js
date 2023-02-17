import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const OptionPricingForm = () => {
  const [riskFreeRate, setRiskFreeRate] = useState('');
  const [underlyingPrice, setUnderlyingPrice] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [timeToExpiration, setTimeToExpiration] = useState('');
  const [dividendYield, setDividendYield] = useState('');
  const [optionPrice, setOptionPrice] = useState('');
  const [optionType, setOptionType] = useState('call');

  const handleUnderlyingPriceChange = (event) => {
    setUnderlyingPrice(event.target.value);
  };

  const handleStrikePriceChange = (event) => {
    setStrikePrice(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const today = new Date();
    const timeDiff = selectedDate.getTime() - today.getTime();
    const daysToExpiration = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setExpirationDate(event.target.value);
    setTimeToExpiration(daysToExpiration);
  };

  const handleDividendYieldChange = (event) => {
    setDividendYield(event.target.value);
  };

  const handleOptionPriceChange = (event) => {
    setOptionPrice(event.target.value);
  };

  const handleOptionTypeChange = (event) => {
    setOptionType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create function that calculates Greeks and IV here
  };

  const getCurrentDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    return `${today.getFullYear()}-${month}-${day}`;
  };

  useEffect(() => {
    const url = `https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey=${process.env.ALPHA_APIKEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const rate = data.data[0].value;
        setRiskFreeRate(rate);
      })
      .catch(error => {
        setRiskFreeRate('');
      });
  }, []);

  const handleRiskFreeRateChange = (event) => {
    setRiskFreeRate(event.target.value);
  }  

  return (
  <form onSubmit={handleSubmit}>
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: 'auto' }}>
      <TextField
        label="Underlying Price"
        type="number"
        value={underlyingPrice}
        onChange={handleUnderlyingPriceChange}
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        label="Strike Price"
        type="number"
        value={strikePrice}
        onChange={handleStrikePriceChange}
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        label="Expiration Date"
        type="date"
        value={expirationDate}
        min={getCurrentDate()}
        onChange={handleExpirationDateChange}
        variant="outlined"
        margin="normal"
        required
        InputLabelProps={{ shrink: true }}
      />
      <Typography variant="body2" color="textSecondary" style={{ marginBottom: '16px' }}>
        {timeToExpiration}
      </Typography>
      <TextField
        label="Dividend Yield (decimal)"
        type="number"
        step="0.01"
        value={dividendYield}
        onChange={handleDividendYieldChange}
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        label="Option Price"
        type="number"
        value={optionPrice}
        onChange={handleOptionPriceChange}
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        label="Interest %"
        type="number"
        id="riskFreeRate"
        value={riskFreeRate}
        onChange={handleRiskFreeRateChange}
        variant="outlined"
        margin="normal"
        required
      />
      <FormControl variant="outlined" margin="normal">
        <InputLabel id="option-type-label">Option Type</InputLabel>
        <Select
          labelId="option-type-label"
          id="option-type"
          value={optionType}
          onChange={handleOptionTypeChange}
          label="Option Type"
        >
          <MenuItem value="call">CALL</MenuItem>
          <MenuItem value="put">PUT</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
        Calculate Greeks and IV
      </Button>
    </div>
  </form>
  );
};

export default OptionPricingForm;