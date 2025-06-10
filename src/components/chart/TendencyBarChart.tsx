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
  data: number[];
  name: string;
  labels?: string[];
}

const TendencyBarChart = ({
  data,
  name,
  labels = ['월정액', '데이터', '속도', '음성통화', '문자'],
}: TendencyBarChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: name,
        data,
        backgroundColor: 'rgba(253, 140, 0, 0.6)',
        borderWidth: 0,
        categoryPercentage: 0.4,
        barPercentage: 0.6,
      },
    ],
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
        display: false,
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
      {/* 차트 */}
      <div style={{ height: 320 }}>
        <Bar data={chartData} options={options} />
      </div>

      {/* 커스텀 범례 */}
      <div className="text-center mt-2 text-xs text-gray-700">
        <div className="inline-flex items-center gap-2 justify-center">
          <div
            style={{
              width: 8,
              height: 8,
              backgroundColor: 'rgba(253, 140, 0, 0.6)',
            }}
          />
          <span style={{ fontSize: '10px' }}>{name}</span>
        </div>
      </div>
    </div>
  );
};

export default TendencyBarChart;
