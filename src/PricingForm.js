import React, { useState } from 'react';

const OptionPricingForm = () => {
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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Underlying Price:
        <input type="number" value={underlyingPrice} onChange={handleUnderlyingPriceChange} />
      </label>
      <br />
      <label>
        Strike Price:
        <input type="number" value={strikePrice} onChange={handleStrikePriceChange} />
      </label>
      <br />
      <label>
        Expiration Date:
        <input type="date" value={expirationDate} min={getCurrentDate()} onChange={handleExpirationDateChange} />
      </label>
      {timeToExpiration}
      <br />
      <label>
        Dividend Yield (in decimal form):
        <input type="number" step="0.01" value={dividendYield} onChange={handleDividendYieldChange} />
      </label>
      <br />
      <label>
        Option Price:
        <input type="number" value={optionPrice} onChange={handleOptionPriceChange} />
      </label>
      <br />
      <label>
        Option Type:
        <select value={optionType} onChange={handleOptionTypeChange}>
          <option value="call">CALL</option>
          <option value="put">PUT</option>
        </select>
      </label>
      <br />
      <button type="submit">Calculate Greeks and IV</button>
    </form>
  );
};

export default OptionPricingForm;