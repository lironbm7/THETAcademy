import React, { useState, useEffect } from 'react';
import axios from 'axios';

// מחיר ההון
// Risk Free Rate

function RiskFree() {
  const [riskFreeRate, setRiskFreeRate] = useState('');

  useEffect(() => {
    const url = `https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey=${process.env.ALPHA_APIKEY}`;

    axios.get(url)
      .then(response => {
        const rate = response.data.data[0].value;
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
    <div>
      <label htmlFor="riskFreeRate">Risk Free Rate:</label>
      <input
        type="number"
        id="riskFreeRate"
        name="riskFreeRate"
        value={riskFreeRate}
        onChange={handleRiskFreeRateChange}
      />
    </div>
  );
}

export default RiskFree;