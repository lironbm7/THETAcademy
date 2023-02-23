import React, { useState, useEffect } from 'react';
import NumberInput from './NumberInput';
import greeks from 'greeks';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Button
} from '@mui/material';

const last_known_rate = 4.33;

const OptionPricingForm = () => {
  let [riskFreeRate, setRiskFreeRate] = useState('');
  let [underlyingPrice, setUnderlyingPrice] = useState('');
  let [strikePrice, setStrikePrice] = useState('');
  let [expirationDate, setExpirationDate] = useState('');
  let [timeToExpiration, setTimeToExpiration] = useState('');
  let [dividendYield, setDividendYield] = useState('');
  let [optionPrice, setOptionPrice] = useState('');
  let [optionType, setOptionType] = useState('call');
  let [impliedVolatility, setImpliedVolatility] = useState('');

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

  const handleRiskFreeRateChange = (event) => {
    setRiskFreeRate(event.target.value);
  }

  const handleImpliedVolatilityChange = (event) => {
    setImpliedVolatility(event.target.value);
  }

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
        setRiskFreeRate(last_known_rate);
      });
  }, []);


  function handleSubmit(event) {
    event.preventDefault();

    // handling empty fields
    if(!dividendYield) { dividendYield = 0 }
    if(!riskFreeRate) { riskFreeRate = last_known_rate }

    console.log(greeks.bs.blackScholes(underlyingPrice, strikePrice, timeToExpiration/365, impliedVolatility/100, riskFreeRate, optionType).toFixed(4))
    console.log("DELTA:", greeks.getDelta(underlyingPrice, strikePrice, timeToExpiration/365, impliedVolatility/100, riskFreeRate/100, optionType).toFixed(4));
  }

  return (
  <form onSubmit={handleSubmit}>
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: 'auto' }}>
      <NumberInput
        label="Underlying Price"
        value={underlyingPrice}
        onChange={handleUnderlyingPriceChange}
        variant="outlined"
        margin="normal"
        required
      />
      <NumberInput
        label="Strike Price"
        value={strikePrice}
        onChange={handleStrikePriceChange}
        variant="outlined"
        margin="normal"
        required
      />
      <NumberInput
        label="Option Price"
        type="number"
        value={optionPrice}
        onChange={handleOptionPriceChange}
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        label="Expiration Date"
        type="date"
        value={expirationDate}
        min={new Date(getCurrentDate())}
        onChange={handleExpirationDateChange}
        variant="outlined"
        margin="normal"
        required
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              ({timeToExpiration} Days To Expiry)
            </InputAdornment>
          ),
        }}
      />
      <NumberInput
        label="Implied Volatility %"
        type="number"
        id="impliedVolatility"
        value={impliedVolatility}
        onChange={handleImpliedVolatilityChange}
        variant="outlined"
        margin="normal"
        required
      />
      <NumberInput
        label="Dividend Yield (decimal)"
        type="number"
        step="0.01"
        value={dividendYield}
        onChange={handleDividendYieldChange}
        variant="outlined"
        margin="normal"
      />
      <NumberInput
        label="Interest %"
        type="number"
        id="riskFreeRate"
        value={riskFreeRate}
        onChange={handleRiskFreeRateChange}
        variant="outlined"
        margin="normal"
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