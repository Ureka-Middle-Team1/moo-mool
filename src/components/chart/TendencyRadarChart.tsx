'use client';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);


interface TendencyRadarChartProps {
  isRounded: boolean;
  data: number[];
  name: string;
  labels?: string[];
}


const TendencyRadarChart = ({
  isRounded,
  data,
  name,
  labels = ['월정액', '데이터', '속도', '음성통화', '문자'],
}: TendencyRadarChartProps) => {
  const chartData = {
  labels,
  datasets: [
    {
      label: '기준값',
      data: [100, 100, 100, 100, 100],
      fill: true,
      backgroundColor: 'rgba(200, 200, 255, 0.2)',
      borderColor: 'rgba(200, 200, 255, 0.3)',
      borderWidth: 1,
      pointRadius: 0,
    },
    {
      label: name,
      data,
      fill: true,
      backgroundColor: 'rgba(253, 140, 0, 0.2)',
      borderColor: 'rgba(253, 140, 0, 0.8)',
      borderWidth: 1.5,
      pointRadius: 0,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      beginAtZero: true,
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
        color: '#888',
        backdropColor: 'transparent',
        font: {
          size: 8,
          weight: 400,
        },
        padding: 18,
        z: 1,
        display: true,
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        circular: false,
      },
      angleLines: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      pointLabels: {
        color: '#666',
        font: {
          size: 12,
          weight: 500,
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeOutQuart',
  } as const,
};





  return (
    <div className="w-full h-[320px]">
      <Radar data={chartData} options={options} />
    </div>
  );
};


export default TendencyRadarChart;
