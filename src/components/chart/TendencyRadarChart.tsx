'use client';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface TendencyRadarChartProps {
  isRounded: boolean;
  data: number[];
  labels?: string[];
}

const TendencyRadarChart = ({
  isRounded,
  data,
  labels = ['SNS', 'Youtube', 'Chat', 'Calling', 'Books', 'Saving']
}: TendencyRadarChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: '나의 선호도',
        data,
        fill: true,
        backgroundColor: 'rgba(253, 207, 86, 0.2)',
        borderColor: 'rgb(253, 207, 86)',
        pointBackgroundColor: 'rgb(253, 207, 86)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(253, 207, 86)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        pointLabels: {
          font: {
            family: 'Pretendard-Regular',
            size: 15,
            weight: 'bold' as const
          },
          color: '#EB453F'
        },
        grid: {
          color: 'rgba(241, 145, 187, 0.2)',
          lineWidth: 10
        },
        angleLines: {
          color: 'rgba(241, 145, 187, 0.4)'
        },
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent',
          color: '#F191BB'
        }
      }
    },
    elements: {
      line: {
        borderWidth: 4,
        tension: isRounded ? 0.4 : 0
      },
      point: {
        radius: 6,
        hoverRadius: 8
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce',
      animateScale: true,
      animateRotate: true
    } as const
  };

  return (
    <div className="w-full h-[400px]">
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default TendencyRadarChart;
