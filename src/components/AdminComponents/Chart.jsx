import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'react-chartjs-2';

const Chart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Monthly Sales',
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

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