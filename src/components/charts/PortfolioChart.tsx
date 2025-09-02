'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioItem {
  symbol: string;
  value: number;
  color: string;
}

interface PortfolioChartProps {
  portfolioData: PortfolioItem[];
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ portfolioData }) => {
  const data = {
    labels: portfolioData.map(item => item.symbol),
    datasets: [
      {
        label: 'Portfolio Allocation',
        data: portfolioData.map(item => item.value),
        backgroundColor: portfolioData.map(item => item.color),
        borderColor: portfolioData.map(item => item.color),
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function(context: any) {
            const total = portfolioData.reduce((sum, item) => sum + item.value, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%',
  };

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative">
      <div className="h-64 w-full">
        <Doughnut data={data} options={options} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total Value</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;
