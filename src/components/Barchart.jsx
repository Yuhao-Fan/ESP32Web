import { h } from 'preact';
import Chart from 'chart.js/auto';
import {Bar} from 'react-chartjs-2';
const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export function BarChartComponent() {
  return (
    <Bar data={data} options={options} />
  );
}
