// WIP - Placeholder chart of BTC/USD
// PLAN - Visually illustrate correlations (Premium VS X_Param)

// ETL:
// Extracted with AlphaVantage API
// Processed / Transformed with JQ (CLI)
// Loaded with PapaParse -> Recharts

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Papa from 'papaparse';

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // load data from CSV using PapaParse
    Papa.parse('btc.csv', {
      download: true,
      header: false,
      complete: function(results) {
        // convert parsed data to array of objects
        const data = results.data.map(d => ({
          date: new Date(d[0]),
          price: Number(d[1])
        }));
        setData(data);
      }
    });
  }, []);

  const formatXAxis = (date) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date instanceof Date && !isNaN(date) ? date.toLocaleDateString('en-GB', options) : '';
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      const price = `$${payload[0].value.toFixed(2)}`;
      return (
        <div className="custom-tooltip">
          <div>{formattedDate}</div>
          <div>{price}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <LineChart width={1000} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={formatXAxis} reversed={true} />
      <YAxis dataKey="price" tick={{ fontSize: 12 }} />
      <Tooltip content={<CustomTooltip />} wrapperStyle={{ backgroundColor: 'white', padding: '10px' }} />
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
    </LineChart>
  );
};

export default Chart;
