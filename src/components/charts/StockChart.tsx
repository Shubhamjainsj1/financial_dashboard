'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HistoricalData } from '@/lib/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StockChartProps {
  data: HistoricalData[];
  symbol: string;
  color?: string;
}

const StockChart: React.FC<StockChartProps> = ({ 
  data, 
  symbol, 
  color = '#3B82F6' 
}) => {
  const chartData = {
    labels: data.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: `${symbol} Price`,
        data: data.map(item => item.price),
        borderColor: color,
        backgroundColor: `${color}20`,
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 6,
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: color,
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `$${context.parsed.y.toFixed(2)}`;
          }
        }
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          }
        }
      },
      y: {
        display: true,
        grid: {
          color: '#E5E7EB',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return '$' + value.toFixed(0);
          }
        }
      },
    },
  };

  return (
    <div className="w-full h-64 md:h-80">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StockChart;
