import React, { useState, useEffect } from 'react';
import {TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Button } from '@mui/material';
import NumberInput from './NumberInput';
import greeks from 'greeks';
import bs from 'black-scholes';
import iv from 'implied-volatility';

const last_known_rate = 4.5;  // hard coded fed rate, use online data or a scraping method if you'd like to

const getCurrentDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  return `${today.getFullYear()}-${month}-${day}`;
};

function formatNumber(num, decimals=4) {
  const formattedNum = num.toFixed(decimals);
    return Number(formattedNum);
}

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

  const isFormValid = () => {
    return optionPrice || impliedVolatility;
  }

  function handleSubmit(event) {
    event.preventDefault();

    // definitions; if null, create later using getImpliedVolatility or blackScholes methods
    let implied_volatility = impliedVolatility;
    let option_price = optionPrice;

    // form validation
    if (!isFormValid()) {
      alert('Please fill in either the Option Price or Implied Volatility field.');
      return;
    }

    // handling empty fields
    if(!dividendYield) { dividendYield = 0 }
    if(!riskFreeRate) { riskFreeRate = last_known_rate }

    // if provided option_price but not IV%, calculate IV%
    if (!implied_volatility && option_price) {
      implied_volatility = formatNumber(iv.getImpliedVolatility(optionPrice, underlyingPrice, strikePrice, timeToExpiration/365, riskFreeRate/100, optionType)) * 100;
      setImpliedVolatility(implied_volatility);
    } else if(implied_volatility && !option_price) {
      option_price = formatNumber(bs.blackScholes(underlyingPrice, strikePrice, timeToExpiration/365, impliedVolatility/100, riskFreeRate/100, optionType), 2);
      setOptionPrice(option_price);
    }

    // syntactic sugar for the greeks calculations
    const tte = timeToExpiration/365;
    const ivp = impliedVolatility/100;
    const rfp = riskFreeRate/100;

    // greeks
    const delta = formatNumber(greeks.getDelta(underlyingPrice, strikePrice, tte, ivp, rfp, optionType));
    const theta = formatNumber(greeks.getTheta(underlyingPrice, strikePrice, tte, ivp, rfp, optionType));
    const gamma = formatNumber(greeks.getGamma(underlyingPrice, strikePrice, tte, ivp, rfp));
    const vega = formatNumber(greeks.getVega(underlyingPrice, strikePrice, tte, ivp, rfp));
    const rho = formatNumber(greeks.getRho(underlyingPrice, strikePrice, tte, ivp, rfp, optionType));

    // print everything for debugging purposes
    console.log(`Underlying: ${underlyingPrice}$, Strike: ${strikePrice}$, Premium: ${optionPrice}$, DTE: ${timeToExpiration}, IV: ${impliedVolatility}%, Rate: ${riskFreeRate}%, Type: ${optionType.toUpperCase()}`)
    console.log(`Delta: ${delta}, Theta: ${theta}, Vega: ${vega}, Gamma: ${gamma}, Rho: ${rho}`)
  }

  const containerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: '20px',
    marginRight: '20px',
    backgroundColor: 'white',
  };

  return (
  <div style={containerStyle} className="calc-container">
    <form onSubmit={handleSubmit}>
      <div className="form-section">
      <FormControl variant="outlined" margin="normal">
          <InputLabel id="option-type-label">Option Type</InputLabel>
          <Select
            labelId="option-type-label"
            id="option-type"
            value={optionType}
            onChange={handleOptionTypeChange}
            label="Option Type" >
            <MenuItem value="call">CALL</MenuItem>
            <MenuItem value="put">PUT</MenuItem>
          </Select>
        </FormControl>
        <NumberInput
          label="Underlying Price"
          value={underlyingPrice}
          onChange={handleUnderlyingPriceChange}
          required
        />
        <NumberInput
          label="Strike Price"
          value={strikePrice}
          onChange={handleStrikePriceChange}
          required
        />
        <NumberInput
          label="Option Price (Premium)"
          value={optionPrice}
          onChange={handleOptionPriceChange}
        />
        <NumberInput
          label="Implied Volatility %"
          id="impliedVolatility"
          value={impliedVolatility}
          onChange={handleImpliedVolatilityChange}
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
                ({timeToExpiration} DTE)
              </InputAdornment>
            ),
          }}
        />
        <NumberInput
          label="Dividend Yield (decimal)"
          value={dividendYield}
          onChange={handleDividendYieldChange}
        />
        <NumberInput
          label="Interest %"
          id="riskFreeRate"
          value={riskFreeRate}
          onChange={handleRiskFreeRateChange}
        />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
          Calculate Greeks and IV
        </Button>
      </div>
    </form>
  </div>
  );
};

export default OptionPricingForm;