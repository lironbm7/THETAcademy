// Throwaway code, messing with the API testing boundaries and recharts

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExampleChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=${process.env.ALPHA_APIKEY}');
      const timeSeries = response.data['Time Series (Daily)'];
      const chartData = [];

      for (const date in timeSeries) {
        const closePrice = parseFloat(timeSeries[date]['4. close']);
        chartData.push({ date, closePrice });
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="closePrice" stroke="#8884d8" />
    </LineChart>
  );
};

export default ExampleChart;
