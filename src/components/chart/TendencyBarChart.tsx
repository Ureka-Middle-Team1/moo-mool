'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type TooltipItem,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface TendencyBarChartProps {
  data: number[] | [number[], number[]];
  name: string;
  labels?: string[];
}

const TendencyBarChart = ({
  data,
  name,
  labels = ['월정액', '데이터', '속도', '음성통화', '문자'],
}: TendencyBarChartProps) => {
  
  
  const datasets =
    Array.isArray(data[0])
      ? [
          {
            label: name,
            data: (data as [number[], number[]])[0],
            backgroundColor: 'rgba(253, 140, 0, 0.6)',
            borderWidth: 0,
            categoryPercentage: 0.4,
            barPercentage: 0.6,
          },
          {
            label: '내 요금제',
            data: (data as [number[], number[]])[1],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderWidth: 0,
            categoryPercentage: 0.4,
            barPercentage: 0.6,
          },
        ]
      : [
          {
            label: name,
            data: data as number[],
            backgroundColor: 'rgba(253, 140, 0, 0.6)',
            borderWidth: 0,
            categoryPercentage: 0.4,
            barPercentage: 0.6,
          },
        ];

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    indexAxis: 'y' as const,
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: 24,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' as const,
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          display: false,
        },
        grid: {
          borderDash: [4, 1],
          lineWidth: 1,
          color: 'rgba(0, 0, 0, 0.2)',
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          font: {
            size: 10,
          },
          boxWidth: 10,
          boxHeight: 10,
        },
        onClick: () => {},
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const label = context.dataset.label || '';
            const value = context.parsed.x;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div style={{ height: 320 }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TendencyBarChart;
