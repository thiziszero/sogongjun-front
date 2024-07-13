import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { NFTData } from '../Interfaces/response';

ChartJS.register(ArcElement, Tooltip, Legend);

interface KeywordChartProps {
  data: NFTData[];
}

const KeywordChart: React.FC<KeywordChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.keyword),
    datasets: [
      {
        label: '검색 횟수',
        data: data.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '인기 검색 키워드',
      },
    },
    cutout: '50%',
  };

  return <Doughnut data={chartData} options={options} />;
};

export default KeywordChart;