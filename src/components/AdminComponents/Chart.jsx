import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'react-chartjs-2';

const Chart = () => {
  
  return (
    <div className="chart-container">
      <LineChart data={data} options={options}>
        <Line />
        <XAxis />
        <YAxis />
        <Grid />
      </LineChart>
    </div>
  );
};

export default Chart;