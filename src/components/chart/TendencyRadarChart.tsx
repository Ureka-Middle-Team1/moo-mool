'use client';

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const TendencyRadarChart = () => {
  const data = {
    labels: ['SNS', 'Youtube', 'Chat', 'Calling', 'Books', 'Saving'],
    datasets: [
      {
        label: '나의 선호도',
        data: [55, 93, 40, 72, 20, 10],
        fill: true,
        backgroundColor: 'rgba(253, 207, 86, 0.2)',
        borderColor: 'rgb(253, 207, 86)',
        pointBackgroundColor: 'rgb(253, 207, 86)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(253, 207, 86)',
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
      tension: 0.4
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
      <Radar data={data} options={options} />
    </div>
  );
};

export default TendencyRadarChart;
