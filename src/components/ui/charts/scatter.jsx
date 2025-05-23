
// scatter.tsx
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';


// Register necessary chart components
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

// Chart configuration
const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Generate random data
const data = {
  datasets: [
    {
      label: 'A dataset',
      data: Array.from({ length: 100 }, () => ({
        x: faker.number.int({ min: -100, max: 100 }),
        y: faker.number.int({ min: -100, max: 100 }),
      })),
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

// Exportable Scatter chart component
export const ScatterGraph = () => {
  return <Scatter options={options} data={data} />;
};
